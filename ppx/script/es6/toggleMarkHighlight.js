//!*script
/* マークとハイライトをトグル */
//
// PPx.Arguments() = (0)Highlight number
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

'use strict';

const n = PPx.Arguments.length ? PPx.Arguments(0)|0 : 3;
const ObjEntry = PPx.Entry;

for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  if (ObjEntry(i).Mark == 1) {
    [ObjEntry(i).Highlight, ObjEntry(i).Mark] = [n, 0];
  } else if (ObjEntry(i).Highlight == n) {
    [ObjEntry(i).Highlight, ObjEntry(i).Mark] = [0, 1];
  }
}

