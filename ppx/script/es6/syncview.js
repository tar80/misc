//!*script
/* 状況に応じて連動ビューを設定 */
//
// %si"vSize"  :capturewindowに取り込む前のPPvのサイズ
// %sp"vState" :値が"1"のとき、movingPPv.jsを止める

'use strict';

const paneCount = PPx.Pane.Count;
const targetID = PPx.WindowIDName.slice(2);
const ppvSync = PPx.SyncView;

if (!ppvSync) {
  (paneCount === 2)
    // タイトルバー無し
    ? StateSyncView('B100000000')
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
    PPx.Execute(`*setcust _WinPos:V${targetID}=%si"vSize"`);
    PPx.Execute('*string i,vSize=');
  }
}

/* 呼出元の状態に合わせて連動ビューを起動する関数 */
function StateSyncView (tWin) {
  PPx.Execute(`*setcust X_win:V=${tWin}`);

  switch (paneCount) {
    case 2:
      PPx.Execute(`%Oin *ppv -r -bootid:${targetID}`);
      // capturewindowに取り込む前のサイズを記憶する
      PPx.Execute(`*string i,vSize=%*getcust(_WinPos:V${targetID})`);
      // movingPPv off
      PPx.Execute('*string p,vState=1');
      PPx.Execute(`%Oi *capturewindow V${targetID} -pane:~ -selectnoactive`);
      break;
    default:
      PPx.Execute(`%Oi *ppv -r -bootid:${targetID}`);
      PPx.Execute('*setcust X_vpos=0');
      PPx.Execute(`*topmostwindow %NV${targetID},1`);
      break;
  }
  PPx.Execute(`*execute C,*ppvoption sync ${targetID}`);
}
