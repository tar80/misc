//!*script
/* リストファイルから取得した情報をコマンドに渡す */
//
// PPx.Arguments(0) = 実行するコマンドライン名
// PPx.Arguments(1) ＝1:重複パスの実行
//
// コマンドラインは、 オブジェクトcmd[]内に記述する
// 変数は、ファイルパス= ${path}, ショートネーム= ${shortname},
// 行数= ${number}, 重複パス実行= ${duplicate}, 検索語= ${search_word}で指定。``で全体を括る

'use strict';

if (!PPx.Arguments.length) { throw new Error('引数が足りません'); }

const arg = { 'cmd': PPx.Arguments(0), 'exeDup': (PPx.Arguments.length !== 2) ? 0 : PPx.Arguments(1)|0 };
const cmd = {};
// 関数の引数には(path, shortname, number, duplicate)が指定できる
// returnより前の部分は初回のみ実行される
cmd['gvim'] = () => {
  return (path, shortname, number) => {
    PPx.Execute(`%Oi gvim --remote-tab-silent +"${number}-1 /${search_word}/" "${path}"`);
    PPx.Execute('*wait 100,1');
  };
};

cmd['ppv'] = () => {
  return path => {
    PPx.Execute(`%Oi *ppv -bootmax:k ${path}`);
    PPx.Execute('*wait 100,1');
  };
};

cmd['sed'] = () => {
  const rep = PPx.Extract('"s#%*script(%\'scr\'%\\compCode.js,"is","""%%","[検索文字#置換文字] ※\\=\\\\\\\\")#g"');
  return (path, shortname, number, duplicate) => {
    if (!duplicate) { PPx.Execute(`%Oi copy ${path} ${path}_back %&`); }
    PPx.Execute(`%Oi sed -i -r ${number}${rep} ${path}`);
  };
};

const objEntry = PPx.Entry;
// ヘッダ情報から検索語を取得
const search_word = (() => {
  let word = '';
  const reg = /result\s=>\s(.*)/;
  for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
    const isMatch = objEntry(i).Comment.match(reg);
    if (isMatch) {
      word = String(isMatch[1]).replace(/\\\(/g, '(');
      break;
    }
  }
  return word;
})();

// コマンド実行初回
const exec = cmd[arg.cmd]();

const markEntry = PPx.Extract('%#;FDC').split(';');
const markCount = PPx.EntryMarkCount;
// マークの有無でループの初期値を設定
const n = (!markCount) ? 0 : 1;
// ShortNameチェック用
const reg = new RegExp(/^[0-9]*/);
// 重複エントリチェック用
let exist = {};

const fso = PPx.CreateObject('Scripting.FileSystemObject');

PPx.Entry.Index = objEntry.FirstMark;

for (let i = n; i <= markCount; i++) {
  // 空白行の判定
  if (fso.FileExists(objEntry.Name)) {
    // フルパスの取得
    let entryPath = markEntry[i - n];
    // ShortNameの取得
    let entrySN = objEntry.ShortName;
    // ShortNameを数値と見なして取得
    let entryNum = (reg.test(entrySN)) ? entrySN|0 : 1;
    // 重複エントリの判別
    let entryDup = ((isDup) => {
      isDup = exist[entryPath] || false;
      exist[entryPath] = true;
      return isDup;
    })();

    // 同一パスを判別してコマンドに渡す
    if (arg.exeDup === 1 || !entryDup) {
      // コマンド実行
      exec(entryPath, entrySN, entryNum, entryDup);
    }
  }
  objEntry.NextMark;
}

