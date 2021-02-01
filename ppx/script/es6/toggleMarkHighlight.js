//!*script
/* マークとハイライトをトグル */
//
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

'use strict';

const ObjEntry = PPx.Entry;

for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  if (ObjEntry(i).Mark == 1) {
    ObjEntry(i).Mark = 0;
  } else if (ObjEntry(i).Highlight) {
    ObjEntry(i).Mark = 1;
  }
}

