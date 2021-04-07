//!*script
/* マークとハイライトをトグル */
//
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

'use strict';


for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  const thisEntry = PPx.Entry(i);
  if (thisEntry.Mark === 1) {
    thisEntry.Mark = 0;
  } else if (thisEntry.Highlight || thisEntry.State > 3) {
    thisEntry.Mark = 1;
  }
}

