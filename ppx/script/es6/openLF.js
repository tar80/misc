//!*script
/* リストファイルのエントリからパスを生成 */
// PPx.Arguments() = (0)実行するコマンドライン
// function Exe_edit() のエディタの起動オプション設定が必要
// 起動オプションは、ファイルパス= ${path}, 行数= ${line}で指定。``で全体を括る
//
// エラーが出る場合は、BOMを付けるかコメント行を削除

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const arg = PPx.Arguments(0);

function Exe_edit (path, line) {
  switch(arg) {
  case 'gvim':
    PPx.Execute(`%Oi gvim --remote-tab-silent +${line} "${path}"`);
    break;
  case 'vscode':
    //動作未確認
    PPx.Execute(`vscode -g ${path}:${line}`);
    break;
  default:
    break;
  }
}

const fso = PPx.CreateObject('Scripting.FileSystemObject');

/* リストファイルの行情報からオブジェクトを生成する関数 */
function Decode_entry (info = []) {
  const pDir = PPx.Extract('%FD%\\');
  const ObjEntry = PPx.Entry;
  const markCount = PPx.EntryMarkCount;
  // マークの有無でループの初期値を設定
  let i = (markCount != 0) ? 1 : 0;
  PPx.Entry.Index = ObjEntry.FirstMark;
  for (; i <= markCount; i++) {
    // 空白行の判定
    if (fso.FileExists(ObjEntry.Name)) {
      // リストファイルのshortname項目を該当の行番号と見立てる
      let sn = (ObjEntry.ShortName.slice(0, 1).match(/[0-9]/) != null) ? `${ObjEntry.ShortName}` : '1';
      info.push({path: pDir + ObjEntry.Name, line: sn, number: ObjEntry.Index});
    }
    ObjEntry.NextMark;
  }
  return info;
}

const entryInfo = new Decode_entry();

// マーク順を無視してリストの並びでソート
entryInfo.sort((a, b) => { return a.number < b.number ? -1 : 1; });

let lastPath;

entryInfo.forEach(value => {
  // 同一パスを判別してエディタを開く
  if (Object.values(value)[0] != lastPath) {
    lastPath = Object.values(value)[0];
    Exe_edit(Object.values(value)[0], Object.values(value)[1]);
    PPx.Sleep('300');
  }
});

