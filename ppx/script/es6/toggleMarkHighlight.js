//!*script
/* マークとハイライトをトグル */
//
// PPx.Arguments() = (0)Highlight number
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

'use strict';

const n = PPx.Arguments.length ? PPx.Arguments(0)|0 : 3;
const objEntry = PPx.Entry;

for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  if (objEntry(i).Mark == 1) {
    [objEntry(i).Highlight, objEntry(i).Mark] = [n, 0];
  } else if (objEntry(i).Highlight == n) {
    [objEntry(i).Highlight, objEntry(i).Mark] = [0, 1];
  }
}

