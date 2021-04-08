//!*script
/* マークとハイライトをトグル */
//
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

for (var i = 0, l = PPx.EntryDisplayCount; i < l; i++) {
  var thisEntry = PPx.Entry(i);

  if (thisEntry.Mark === 1) {
    thisEntry.Mark = 0;
  } else if (thisEntry.Highlight || thisEntry.State > 3) {
    thisEntry.Mark = 1;
  }
}

