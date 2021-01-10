//!*script
/* リストファイルのエントリからパスを生成 */
//
// PPx.Arguments() = (0)実行するコマンドライン
// function Exe_edit() のエディタの起動オプション設定が必要
// 起動オプションは、ファイルパス= path, 行数= lineで指定

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

var arg = PPx.Arguments(0);

function Exe_edit (path, line) {
  switch(arg) {
  case 'gvim':
    PPx.Execute('%Oi gvim --remote-tab-silent +' + line + ' "' + path + '"');
    break;
  case 'vscode':
    //動作未確認
    PPx.Execute('vscode -g ' + path + ':' + line);
    break;
  default:
    break;
  }
}

var fso = PPx.CreateObject('Scripting.FileSystemObject');

/* リストファイルの行情報からオブジェクトを生成する関数 */
function Decode_entry () {
  var info = [];
  var pDir = PPx.Extract('%FD%\\');
  var ObjEntry = PPx.Entry;
  var markCount = PPx.EntryMarkCount;

  // マークの有無でループの初期値を設定
  var i = (markCount != 0) ? 1 : 0;

  PPx.Entry.Index = ObjEntry.FirstMark;

  for (; i <= markCount; i++) {
    // 空白行の判定
    if (fso.FileExists(ObjEntry.Name)) {
      // リストファイルのshortname項目を該当の行番号と見立てる
      var sn = (ObjEntry.ShortName.slice(0, 1).match(/[0-9]/) != null) ? ObjEntry.ShortName : 1;
      info.push({path: pDir + ObjEntry.Name, line: sn, number: ObjEntry.Index});
    }
    ObjEntry.NextMark;
  }
  return info;
}

var entryInfo = new Decode_entry();

// マーク順を無視してリストの並びでソート
entryInfo.sort(function (a, b) { return a.number < b.number ? -1 : 1; });

var exist = {};

for (i = 0, l = entryInfo.length; i < l; i++) {
  var tmp = entryInfo[i].path;

  // 同一パスを判別してエディタを開く
  if (!exist[tmp]) {
    exist[tmp] = true;
    Exe_edit(entryInfo[i].path, entryInfo[i].line);
    PPx.Sleep('300');
  }
}

