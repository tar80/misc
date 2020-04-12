//!*script
/* マークとハイライトをトグル */
// PPx.Arguments() = [0]Highlight number
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html
'use strict';
const n = PPx.Arguments.length ? PPx.Arguments(0)|0 : 3;
const entry = PPx.Entry;
for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  if (PPx.Entry(i).Mark == 1) {
    [entry(i).Highlight, entry(i).Mark] = [n, 0];
  } else if (PPx.Entry(i).Highlight == n) {
    [entry(i).Highlight, entry(i).Mark] = [0, 1];
  }
}
