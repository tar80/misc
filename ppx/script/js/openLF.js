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
    PPx.Execute('%Oi gvim --remote-tab-silent +"' + line + ' | /%hs0/ " "' + path + '"');
    break;
  case 'ppv':
    PPx.Execute('%Oi *ppv -bootid:C ' + path);
    break;
  case 'sed':
    PPx.Execute('%On *ppb -c sed -i_back -r ' + line + '"s#%*script(%\'scr\'%\\compcode.js,"is","""%%","[検索文字#置換文字] ※\\=\\\\\\\\")#g" %#FDC');
  default:
    break;
  }
}

var markEntry = PPx.Extract('%#FDC').split(' ');
var markCount = PPx.EntryMarkCount;
var ObjEntry = PPx.Entry;
var tmp;

var entryInfo = new Decode_entry();

PPx.Entry.Index = ObjEntry.FirstMark;

for (var i = 0, l = entryInfo.length; i < l; i++) {
  // 同一パスを判別してエディタを開く
  if (!entryInfo[i].dup) {
    Exe_edit(entryInfo[i].path, entryInfo[i].line);
    PPx.Sleep('300');
  }
    ObjEntry.NextMark;
}

/* リストファイルの行情報からオブジェクトを生成する関数 */
function Decode_entry () {
  var fso = PPx.CreateObject('Scripting.FileSystemObject');
  var info = [];

  // マークの有無でループの初期値を設定
  var n = (markCount != 0) ? 1 : 0;

  PPx.Entry.Index = ObjEntry.FirstMark;

  for (var i = n; i <= markCount; i++) {
    // 空白行の判定
    if (fso.FileExists(ObjEntry.Name)) {
      var en = markEntry[i - n];
      // リストファイルのshortname項目を該当の行番号と見立てる
      var sn = (ObjEntry.ShortName.slice(0, 1).match(/[0-9]/) != null) ? ObjEntry.ShortName : 1;
      info.push({path: en, line: sn, number: ObjEntry.Index, dup: Check_dup(en)});
    }
    ObjEntry.NextMark;
  }
  return info;
}

function Check_dup (filepath) {
  var d = (tmp == filepath) ? true : false;
  tmp = filepath;
  return d;
}

