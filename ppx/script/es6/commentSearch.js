//!*script
/* コメントの検索 */
//
// PPx.Arguments(0) = 'filter' | ハイライトの番号
// ※文字列filter、数字以外を引数にした場合は、1が代入される
// 210414 引数に'filter'を指定した場合、絞り込み検索が行われる

'use strict';

const arg = (() => {
  if (PPx.Arguments.length) {
    return (PPx.Arguments(0) === 'filter') ? 'filter' : PPx.Arguments(0)|1;
  } else {
    PPx.Echo('引数が足りません');
    return PPx.Quit(1);
  }
})();

// ハイライトを初期化
PPx.Execute('*markentry -highlight:0');

const word = PPx.Extract('%*script(%\'scr\'%\\compCode.js,"is","""%%","Search Comment.. ※正規表現")') || PPx.Quit(-1);
const entryCount = PPx.Entry.Count;

if (arg === 'filter') {
  for (let [i, l] = [entryCount, 0]; i > l; i--) {
    const objEntry = PPx.Entry(i - 1);
    if (objEntry.Comment.search(word) === -1) {
      objEntry.Hide;
    }
  }
} else {
  for (let [i ,l] = [0, entryCount]; i < l; i++) {
    const objEntry = PPx.Entry(i);
    if(objEntry.Comment.search(word) !== -1) {
      objEntry.Highlight = arg;
    }
  }
}
