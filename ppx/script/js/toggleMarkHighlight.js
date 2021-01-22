//!*script
/* マークとハイライトをトグル */
//
// PPx.Arguments() = (0)Highlight number
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

var n = PPx.Arguments.length ? PPx.Arguments(0)|0 : 3;
var ObjEntry = PPx.Entry;

for (var i = 0, l = PPx.EntryDisplayCount; i < l; i++) {
  if (ObjEntry(i).Mark == 1) {
    ObjEntry(i).Highlight = n;
    ObjEntry(i).Mark = 0;
  } else if (ObjEntry(i).Highlight == n) {
    ObjEntry(i).Highlight = 0;
    ObjEntry(i).Mark = 1;
  }
}

