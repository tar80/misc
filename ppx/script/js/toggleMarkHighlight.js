//!*script
/* マークとハイライトをトグル */
//
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

var ObjEntry = PPx.Entry;

for (var i = 0, l = PPx.EntryDisplayCount; i < l; i++) {
  if (ObjEntry(i).Mark === 1) {
    ObjEntry(i).Mark = 0;
  } else if (ObjEntry(i).Highlight) {
    ObjEntry(i).Mark = 1;
  }
}

