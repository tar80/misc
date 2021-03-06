﻿//!*script
/* 状況に応じて連動ビューを設定 */
//
// %si"vSize"  :capturewindowに取り込む前のPPvのサイズ
// %sp"vState" :値が"1"のとき、movingPPv.jsを止める

var paneCount = PPx.Pane.Count;
var tID = PPx.WindowIDName.slice(2);
var ppvSync = PPx.SyncView;

if (!ppvSync) {
  (paneCount === 2)
    // タイトルバー無し
    ? StateSyncView('B000000000')
    // タイトルバー有り
    : StateSyncView('B000000000');

} else {
  // 連動ビューがあれば解除して終了
  PPx.SyncView = 0;
  PPx.Execute('*setcust X_win:V=B000000000');
  // movingPPv on
  PPx.Execute('*string p,vState=');

  if (PPx.Extract('%si"vSize')) {
    // ppvをcapturewindowに取り込む前のサイズに戻す
    PPx.Execute('*setcust _WinPos:V' + tID + '=%si"vSize"');
    PPx.Execute('*string i,vSize=');
  }
}

/* 呼出元の状態に合わせて連動ビューを起動する関数 */
function StateSyncView (tWin) {
  PPx.Execute('*setcust X_win:V=' + tWin);

  switch (paneCount) {
    case 2:
      PPx.Execute('%Oin *ppv -r -bootid:' + tID);
      // capturewindowに取り込む前のサイズを記憶する
      PPx.Execute('*string i,vSize=%*getcust(_WinPos:V' + tID + ')');
      // movingPPv off
      PPx.Execute('*string p,vState=1');
      PPx.Execute('%Oi *capturewindow V' + tID + ' -pane:~ -selectnoactive');
      break;
    default:
      PPx.Execute('%Oi *ppv -r -bootid:' + tID);
      PPx.Execute('*setcust X_vpos=0');
      PPx.Execute('*topmostwindow %NV' + tID + ',1');
      break;
  }
  PPx.Execute('*execute C,*ppvoption sync ' + tID);
}
