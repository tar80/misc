//!*script
/* 状況に応じて連動ビューを設定 */
//
// %si"vSize"  :capturewindowに取り込む前のPPvのサイズ
// %si"vState" :値が"1"のとき、movingPPv.jsを止める

var paneCount = PPx.Pane.Count;
var tID = PPx.WindowIDName.slice(2);
var sync = PPx.SyncView;

if (!sync) {
  (paneCount == 2)
    // タイトルバー無し
    ? State_syncview('B100000000', ' -min')
    // タイトルバー有り
    : State_syncview('B000000000', '');

} else {
  // 連動ビューがあれば解除して終了
  PPx.SyncView = 0;
  PPx.Execute('*setcust X_win:V=B000000000');
  // movingPPv on
  PPx.Execute('*string i,vState=');

  if (PPx.Extract('%si"vSize')) {
    // ppvをcapturewindowに取り込む前のサイズに戻す
    PPx.Execute('*setcust _WinPos:V' + tID + '=%si"vSize"');
    PPx.Execute('*string i,vSize=');
  }
}

/* 呼出元の状態に合わせて連動ビューを起動する関数 */
function State_syncview (tWin, optMin) {
  PPx.Execute('*setcust X_win:V=' + tWin);
  PPx.Execute('%Oi *ppv -r -bootid:' + tID + optMin);

  switch (paneCount) {
    case 2:
      // capturewindowに取り込む前のサイズを記憶する
      PPx.Execute('*string i,vSize=%*getcust(_WinPos:V' + tID + ')');
    // movingPPv off
      PPx.Execute('*string i,vState=1');
      PPx.Execute('%Oai *capturewindow V' + tID + ' -pane:~ -selectnoactive');
      break;
    default:
      PPx.Execute('*setcust X_vpos=0');
      PPx.Execute('*topmostwindow %NV' + tID + ',1');
      break;
  }
  PPx.Execute('*ppvoption sync ' + tID);
}
