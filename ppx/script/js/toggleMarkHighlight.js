//!*script
/* マークとハイライトをトグル */
//
// PPx.Arguments() = (0)Highlight number
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

var n = PPx.Arguments.length ? PPx.Arguments(0)|0 : 3;
var entry = PPx.Entry;

for (var i = 0, l = PPx.EntryDisplayCount; i < l; i = (i+1)|0) {
  if (entry(i).Mark == 1) {
    entry(i).Highlight = n;
    entry(i).Mark = 0;
  } else if (entry(i).Highlight == n) {
    entry(i).Highlight = 0;
    entry(i).Mark = 1;
  }
}
