//!*script
/* リストファイルから取得した情報をコマンドに渡す */
//
// PPx.Arguments() = (0)実行するコマンドライン名, (1)1＝重複パスの実行
//
// コマンドラインは、 オブジェクトexe_edit内に記述する
// 変数は、ファイルパス= ${path}, ショートネーム= ${shortname},
// 行数= ${number}, 重複パス実行= ${duplicate}, 検索語= ${search_word}で指定。``で全体を括る

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const arg = { 'cmd': PPx.Arguments(0), 'exeDup': (PPx.Arguments.length != 2) ? 0 : PPx.Arguments(1)|0 };
const rep = [];
const exe_edit = {
  // 関数の引数には(path, shortname, number, duplicate)が指定できる
  'gvim': ((path, shortname, number) => {
    PPx.Execute(`%Oi gvim --remote-tab-silent +"${number}-1 /${search_word}/" "${path}"`);
    PPx.Execute('*wait 100,1');
    return;
  }),
  'ppv': (path => {
    PPx.Execute(`%Oi *ppv -r -bootid:C ${path}`);
    PPx.Execute('*wait 100,1');
    return;
  }),
  'sed': ((path, shortname, number, duplicate) => {
    if (typeof rep[0] === 'undefined') {
      rep[0] = PPx.Extract('"s#%*script(%\'scr\'%\\compCode.js,"is","""%%","[検索文字#置換文字] ※\\=\\\\\\\\")#g"');
    }
    if (!duplicate) { PPx.Execute(`%Oi copy ${path} ${path}_back`); }

    PPx.Execute(`%Oi sed -i -r ${number}${rep[0]} ${path}`);
    return;
  })
};

const fso = PPx.CreateObject('Scripting.FileSystemObject');

const markEntry = PPx.Extract('%#;FDC').split(';');
const markCount = PPx.EntryMarkCount;
// マークの有無でループの初期値を設定
const n = (markCount !== 0) ? 1 : 0;

let exist = {};
let entryPath, entrySN, entryNum, entryDup;
const objEntry = PPx.Entry;
// ヘッダ情報から検索語を取得
const search_word = ((w = '') => {
  const reg = /result\s=>\s(.*)/;
  for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
    const t = objEntry(i).Comment.match(reg);
    if (t) {
      w = String(t[1]).replace(/\\\(/g, '(');
      break;
    }
  }
  return w;
})();

const reg = new RegExp(/^[0-9]*/);

PPx.Entry.Index = objEntry.FirstMark;

for (let i = n; i <= markCount; i++) {
  // 空白行の判定
  if (fso.FileExists(objEntry.Name)) {
    // フルパスの取得
    entryPath = markEntry[i - n];

    // ShortNameの取得
    entrySN = objEntry.ShortName;

    // ShortNameを数値と見なして取得
    entryNum = (reg.test(entrySN)) ? entrySN|0 : 1;

    // 重複エントリの判別
    entryDup = ((isDup) => {
      isDup = (exist[entryPath]) ? true : false;
      exist[entryPath] = true;
      return isDup;
    })();

    // 同一パスを判別してコマンドに渡す
    if (arg.exeDup === 1 || !entryDup) {
      exe_edit[arg.cmd](entryPath, entrySN, entryNum, entryDup);
    }
  }
  objEntry.NextMark;
}

