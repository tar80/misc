//!*script
/* リストファイルのエントリからパスを生成 */
//
// PPx.Arguments() = (0)実行するコマンドライン, (1)1＝重複パスの実行
//
// function Exe_edit() のエディタの起動オプション設定が必要
// 起動オプションは、ファイルパス= ${path}, 行数= ${line}で指定。``で全体を括る

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const arg = [PPx.Arguments(0), (PPx.Arguments.length != 2) ? 0 : PPx.Arguments(1)|0];
const rep = [];

const waitTime = (arg[1] == 1) ? 0 : 300;

function Exe_edit (path, line, duplicate) {
  switch(arg[0]) {
  case 'gvim':
    rep[0] = PPx.Extract('%hs0').replace(/\\/g, '');
    PPx.Execute(`%Oi gvim --remote-tab-silent +"${line}-1 /${rep[0]}/" "${path}"`);
    break;
  case 'ppv':
    PPx.Execute(`%Oi *ppv -bootid:C ${path}`);
    break;
  case 'sed':
    if (typeof rep[0] == 'undefined') {
      rep[0] = PPx.Extract('"s#%*script(%\'scr\'%\\compcode.js,"is","""%%","[検索文字#置換文字] ※\\=\\\\\\\\")#g"');
    }

    if (!duplicate) { PPx.Execute(`%Oi copy ${path} ${path}_back`); }

    PPx.Execute(`%Oi sed -i -r ${line}${rep[0]} ${path}`);
    break;
  default:
    break;
  }
}

const markEntry = PPx.Extract('%#FDC').split(' ');
const markCount = PPx.EntryMarkCount;
const ObjEntry = PPx.Entry;

const entryInfo = new Decode_entry();

PPx.Entry.Index = ObjEntry.FirstMark;

entryInfo.forEach(value => {
  // 同一パスを判別してエディタを開く
  if (arg[1] == 1 || !Object.values(value)[2]) {
    Exe_edit(Object.values(value)[0], Object.values(value)[1], Object.values(value)[2]);
    PPx.Sleep(waitTime);
  }
  ObjEntry.NextMark;
});

/* リストファイルの行情報からオブジェクトを生成する関数 */
function Decode_entry (info = []) {
  const fso = PPx.CreateObject('Scripting.FileSystemObject');

  // マークの有無でループの初期値を設定
  const n = (markCount != 0) ? 1 : 0;
  let exist = {};

  PPx.Entry.Index = ObjEntry.FirstMark;

  for (let i = n; i <= markCount; i++) {
    // 空白行の判定
    if (fso.FileExists(ObjEntry.Name)) {
      let en = markEntry[i - n];
      // リストファイルのshortname項目を該当の行番号と見立てる
      let sn = (ObjEntry.ShortName.slice(0, 1).match(/[0-9]/) != null) ? ObjEntry.ShortName : 1;
      let d = ((isDup) => {
        isDup = (exist[ObjEntry.Name]) ? true : false;
        exist[ObjEntry.Name] = true;
        return isDup;
      })();
      info.push({path: en, line: sn, dup: d});
    }
    ObjEntry.NextMark;
  }
  return info;
}

