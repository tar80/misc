//!*script
// いろんなケースのsyncview
if(!PPx.SyncView){
  // 左右2窓ならVZを起動
  if(PPx.Pane.Count == 2) sync_state('Z','100000000');
  // 呼出元がCXならVX、それ以外ならVYを起動
  else PPx.Extract('%n') == 'CX'? sync_state('X','100000000'): sync_state('Y','000000000');
} else{
  // 連動ビューが作動中なら解除して終了
  PPx.SyncView = 0;
  PPx.Execute('%KV%*getcust(_others:SyncViewID),"@Q"');
  PPx.Execute('*setcust X_win:V=B000000001 %:*setcust _others:-|SyncViewID=');
}
// 呼出元の状態に合わせて連動ビューを設定
function sync_state(tID,tWin){
  PPx.Execute('%Oi *setcust X_win:V=B' + tWin + ' %:*ppv -r -bootid:' + tID);
  if(tID == 'Z'){
    PPx.Execute('%Oi *capturewindow VZ -pane:~ -selectnoactive');
    PPx.Execute('%Oi *wait 100,1 %:*focus');
  } else{
    PPx.Execute('%Oi *topmostwindow %NV' + tID + ',1');
  }
  PPx.Execute('*ppvoption setsync ' + tID);
}
