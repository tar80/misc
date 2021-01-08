//!*script
/* コメントの検索 */
// PPx.Arguments() = (0)ハイライトの番号
// ※数字以外を引数にした場合は、1が代入される
//
// エラーが出る場合は、BOMを付けるかコメント行を削除

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(1);
}
// ハイライトを初期化
PPx.Execute('*markentry -highlight:0');

const arg = PPx.Arguments(0)|1;
const word = PPx.Extract('%*script(%\'scr\'%\\compCode.js,"is","""%%","ギュっと絞り込む")');
const ObjEntry = PPx.Entry;
// なんかエラー出るので-1した
const entryCount = PPx.Entry.Count - 1;

for (let i = 1; i <= entryCount; i++) {
  if (ObjEntry(i).Comment.search(word) != -1) {
    PPx.Entry(i).highlight = arg;
  }
}
