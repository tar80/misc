﻿//!*script
/* マークとハイライトをトグル */
// PPx.Arguments(0)=Highlight number
// 参照元:http://hoehoetukasa.blogspot.com/2015/08/blog-post.html

var num = Number(PPx.Arguments(0));
for (var i = 0, l = PPx.EntryDisplayCount; i < l; i = (i+1)|0) {
  if (PPx.Entry(i).Mark == 1) {
    PPx.Entry(i).Highlight = num;
    PPx.Entry(i).Mark = 0;
  } else if (PPx.Entry(i).Highlight == num) {
    PPx.Entry(i).Highlight = 0;
    PPx.Entry(i).Mark = 1;
  };
};
