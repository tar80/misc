//!*script
/* コメントの検索 */
//
// PPx.Arguments() = (0)ハイライトの番号
// ※数字以外を引数にした場合は、1が代入される

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(1);
}

// ハイライトを初期化
PPx.Execute('*markentry -highlight:0');

var arg = PPx.Arguments(0)|1;
var word = PPx.Extract('%*script(%\'scr\'%\\compCode.js,"is","""%%","Search Comment..")');
var ObjEntry = PPx.Entry;
var entryCount = PPx.Entry.Count - 1;

for (var i = 1; i <= entryCount; i++) {
  if (ObjEntry(i).Comment.search(word) != -1) {
    PPx.Entry(i).highlight = arg;
  }
}

