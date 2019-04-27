//!*script
// いろんなケースのsyncview
if(PPx.SyncView == 0){
  if(PPx.Pane.Count == 2){
    PPx.Execute('%Oi *string i,vID=Z');
    PPx.Execute('%Oi *setcust X_win:V=B100000000 %:*ppv -r -bootid:Z %:*capturewindow VZ -pane:~ -selectnoactive');
    PPx.Execute('%Oi *wait 100,1 %:*focus');
  } else if(PPx.extract('%n') == 'CX'){
    PPx.Execute('%Oi *string i,vID=X');
    PPx.Execute('%Oi *setcust X_win:V=B100000000 %:*ppv -r -bootid:X %:*topmostwindow %NVX,1');
  } else{
    PPx.Execute('%Oi *string i,vID=Y');
    PPx.Execute('%Oi *setcust X_win:V=B000000000 %:*ppv -r -bootid:Y %:*topmostwindow %NVY,1');
    var ppvid = 'V' + PPx.Extract('%si"vID"');
  }
  PPx.Execute('*ppvoption sync %si"vID"');
} else{
  PPx.SyncView = 0;
  PPx.Execute('%KV%si"vID","@Q"');
  PPx.Execute('*setcust X_win:V=B000000001');
}
