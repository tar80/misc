//!*script
// PPvの窓サイズをトグル
if(PPx.WindowIDName == 'V_Z'){
  var ppvwidth = PPx.Extract('%*windowrect(,w)');
  var ppcwidth = PPx.Extract('%*windowrect(' + PPx.Extract("%*findwindowclass(\"PaperPlaneCombo\")") + ',w)');
  if(ppvwidth == ppcwidth){
    PPx.Execute('*fitwindow %N~');
    PPx.Execute('*topmostwindow %NVZ,1');
  } else{
    PPx.Execute('*fitwindow %*findwindowclass("PaperPlaneCombo")');
    PPx.Execute('*topmostwindow %NVZ,1');
  }
}
else{
  PPx.Execute('*togglewinsize');
}