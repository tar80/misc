//!*script
/* マークとハイライトをトグル */
//
// PPx.Arguments() = (0)Highlight number
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

var n = PPx.Arguments.length ? PPx.Arguments(0)|0 : 3;
var objEntry = PPx.Entry;

for (var i = 0, l = PPx.EntryDisplayCount; i < l; i = (i+1)|0) {
  if (objEntry(i).Mark == 1) {
    objEntry(i).Highlight = n;
    objEntry(i).Mark = 0;
  } else if (objEntry(i).Highlight == n) {
    objEntry(i).Highlight = 0;
    objEntry(i).Mark = 1;
  }
}

