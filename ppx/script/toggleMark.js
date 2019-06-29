//!*script
// インクリメンタルサーチ中、検索対象エントリを全てマークトグル
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html
for (var i = 0, l = PPx.EntryDisplayCount; i < l; i = (i+1)|0) {
  if (PPx.Entry(i).Highlight == 1) {
    PPx.Entry(i).Highlight = 0;
    PPx.Entry(i).Mark = 1;
  } else if (PPx.Entry(i).Mark == 1) {
    PPx.Entry(i).Highlight = 1;
    PPx.Entry(i).Mark = 0;
  }
}
