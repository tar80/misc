//!*script
/* マークとハイライトをトグル */
// PPx.Arguments() = [0]Highlight number
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html
'use strict';
const num = PPx.Arguments.length ? PPx.Arguments(0)|0 : 3;
const e = PPx.Entry;
for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  if (PPx.Entry(i).Mark == 1) {
    [e(i).Highlight, e(i).Mark] = [num, 0];
  } else if (PPx.Entry(i).Highlight == num) {
    [e(i).Highlight, e(i).Mark] = [0, 1];
  }
}
