//!*script
// PPvの窓サイズをトグル
if(PPx.WindowIDName == "V_Z"){
  ppvwidth = PPx.Extract("%*windowrect(,w)");
  ppcwidth = PPx.Extract("%*windowrect(" + PPx.Extract('%*findwindowclass("PaperPlaneCombo")') +",w)");
  if (ppvwidth == ppcwidth){
    PPx.Execute('*fitwindow %N~');
    PPx.Execute('*topmostwindow %NVZ,1');
  } else {
    PPx.Execute('*fitwindow %*findwindowclass("PaperPlaneCombo")');
    PPx.Execute('*topmostwindow %NVZ,1');
  }
}
else {
  PPx.Execute('*togglewinsize');
}