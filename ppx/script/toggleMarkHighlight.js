//!*script
// マークとハイライトをトグル
for(var i = 0,l = PPx.EntryAllCount; i < l; i++){
  if(PPx.Entry(i).Mark == 1){
    PPx.Entry(i).Mark = 0;
    PPx.Entry(i).Highlight = 2;
  } else if(PPx.Entry(i).Highlight == 2){
    PPx.Entry(i).Highlight = 0;
    PPx.Entry(i).Mark = 1;
  }
}
