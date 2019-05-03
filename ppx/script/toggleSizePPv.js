//!*script
// PPvの窓サイズをトグル
// 不要っぽい
/*
if(PPx.WindowIDName == 'V_Z'){
  var ppvWidth = PPx.Extract('%*windowrect(,w)');
  var ppcWidth = PPx.Extract('%*windowrect(' + PPx.Extract("%*findwindowclass(\"PaperPlaneCombo\")") + ',w)');
  if(ppvWidth == ppcWidth){
    PPx.Execute('%Oi *fitwindow %N~');
    PPx.Execute('%Oi *topmostwindow %NVZ,1');
  } else{
    PPx.Execute('%Oi *fitwindow %*findwindowclass("PaperPlaneCombo")');
    PPx.Execute('%Oi *topmostwindow %NVZ,1');
  }
}
else{
  PPx.Execute('*togglewinsize');
}
*/
