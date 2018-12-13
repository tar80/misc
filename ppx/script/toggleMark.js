//!*script
// インクリメンタルサーチ中、検索対象エントリを全てマークトグル
for (var i = 0; i < PPx.EntryAllCount; i++){
  if (PPx.Entry(i).Highlight == 1) {
    PPx.Entry(i).Highlight = 0;
    PPx.Entry(i).Mark = 1;
  } else if(PPx.Entry(i).Mark == 1){
    PPx.Entry(i).Highlight = 1;
    PPx.Entry(i).Mark = 0;
  }
}
