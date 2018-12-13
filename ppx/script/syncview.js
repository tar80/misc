//!*script
// いろんなケースのsyncview
if(PPx.SyncView == 0){
  if(PPx.Pane.Count == 2){
    PPx.Execute('*string i,vID=Z');
    PPx.Execute('%Oi *setcust X_win:V=B100000000 %:*ppv -r -bootid:%si\"vID\"');
    //PPx.Execute('*fitwindow %N~,%NVZ');
    //PPx.Execute('*topmostwindow %NVZ,1');
    PPx.Execute('*ppvoption sync %si\"vID\"');
    PPx.Execute('*wait 100,1');
    PPx.Execute('*capturewindow V%si\"vID\" -pane:~ -selectnoactive');
  } else if(PPx.extract("%n") == "CX"){
    PPx.Execute('*string i,vID=X');
    PPx.Execute('%Oi *setcust X_win:V=B100000000 %:*ppv -r -bootid:%si\"vID\"');
    PPx.Execute('*topmostwindow %NVX,1');
    PPx.Execute('*ppvoption sync %si\"vID\"');
  } else{
    PPx.Execute('*string i,vID=Y');
    ppvid = "V" + PPx.Extract('%si\"vID\"')
    PPx.Execute('%Oi *setcust X_win:V=B000000000 %:*ppv -r -bootid:%si\"vID\"');
    PPx.Execute('*topmostwindow %N' + ppvid + ',1');
    PPx.Execute('*ppvoption sync %si\"vID\"');
  }
} else{
  PPx.SyncView = 0;
  PPx.Execute('%KV%si\"vID\",\"@Q\"');
  PPx.Execute('*setcust X_win:V=B000000001');
}
