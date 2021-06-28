//!*script
/* コメントの検索 */
//
// PPx.Arguments(0) = 'filter' | ハイライトの番号
// ※文字列filter、数字以外を引数にした場合は、1が代入される
// 要compCode.js
// 210414 引数に'filter'を指定した場合、絞り込み検索が行われる

'use strict';

if (!PPx.Arguments.length) { throw new Error('引数が足りません'); }

const arg = PPx.Arguments(0);
const searchWord = PPx.Extract('%*script(%\'scr\'%\\compCode.js,"is","""%%","Search Comment.. ※正規表現")') || PPx.Quit(-1);
const entryCount = PPx.Entry.Count;

if (arg === 'filter') {
  for (let [i, l] = [entryCount, 0]; i > l; i--) {
    const objEntry = PPx.Entry(i - 1);
    if (objEntry.Comment.search(searchWord) === -1) { objEntry.Hide; }
  }
  // 背景画像が設定されていたら表示更新
  if (PPx.Extract('%*getcust(X_bg:P_%n)') !== '"') { PPx.Execute('%K"@^F5"'); }
} else {
  // ハイライトを初期化
  PPx.Execute('*markentry -highlight:0');
  for (let [i ,l] = [0, entryCount]; i < l; i++) {
    const objEntry = PPx.Entry(i);
    if (objEntry.Comment.search(searchWord) !== -1) {
      objEntry.Highlight = arg;
    }
  }
}
