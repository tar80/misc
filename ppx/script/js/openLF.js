//!*script
/* リストファイルのエントリからパスを生成 */
//
// PPx.Arguments() = (0)実行するコマンドライン, (1)1＝重複パスの実行
//
// function Exe_edit() のエディタの起動オプション設定が必要
// 起動オプションは、ファイルパス= path, 行数= lineで指定

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

var arg = [PPx.Arguments(0), (PPx.Arguments.length != 2) ? 0 : PPx.Arguments(1)|0];
var rep = [];

function Exe_edit (path, line, duplicate) {
  switch(arg[0]) {
  case 'gvim':
    rep[0] = PPx.Extract('%hs0').replace(/\\/g, '');
    PPx.Execute('%Oi gvim --remote-tab-silent +"' + line + '-1 /%hs0/ " "' + path + '"');
    PPx.Sleep(300);
    break;
  case 'ppv':
    PPx.Execute('%Oi *ppv -bootid:C ' + path);
    PPx.Sleep(100);
    break;
  case 'sed':
    if (typeof rep[0] == 'undefined') {
      rep[0] = PPx.Extract('"s#%*script(%\'scr\'%\\compcode.js,"is","""%%","[検索文字#置換文字] ※\\=\\\\\\\\")#g"');
    }

    if (!duplicate) { PPx.Execute('%Oi copy ' + path + ' ' + path + '_back'); }

    PPx.Execute('%Oi sed -i -r ' + line + rep[0] + ' ' + path);
    break;
  default:
    break;
  }
}

var fso = PPx.CreateObject('Scripting.FileSystemObject');

var markEntry = PPx.Extract('%#FDC').split(' ');
var markCount = PPx.EntryMarkCount;
// マークの有無でループの初期値を設定
var n = (markCount != 0) ? 1 : 0;

var exist = {};
var ObjEntry = PPx.Entry;

PPx.Entry.Index = ObjEntry.FirstMark;

for (var i = n; i <= markCount; i++) {
  // 空白行の判定
  if (fso.FileExists(ObjEntry.Name)) {
    var entryPath = markEntry[i - n];

    // リストファイルのshortname項目を該当の行番号と見立てる
    var entryLine = (ObjEntry.ShortName.slice(0, 1).match(/[0-9]/) != null) ? ObjEntry.ShortName : 1;

    // 重複パスの判別
    var entryDup = function (isDup) {
      isDup = (exist[entryPath]) ? true : false;
      exist[entryPath] = true;
      return isDup;
    }();

    // 同一パスを判別してエディタを開く
    if (arg[1] == 1 || !entryDup) {
      Exe_edit(entryPath, entryLine, entryDup);
    }
  }
  ObjEntry.NextMark;
}
