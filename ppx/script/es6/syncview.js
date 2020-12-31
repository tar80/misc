//!*script
/* 状況に応じて連動ビューを設定 */
// %si"vSize"  :capturewindowに取り込む前のPPvのサイズ
// %si"vState" :値が"1"のとき、movingPPv.jsを止める
// エラーが出るときは、bombを付けるかコメント行を消して下さい。

'use strict';
const paneCount = PPx.Pane.Count;
const tID = PPx.WindowIDName.slice(2);
const xwinV = PPx.Extract('%*getcust(X_win:V)');
const sync = PPx.SyncView;
if (!sync) {
  (paneCount == 2)
    // タイトルバー無し
    ? State_syncview('B100000000')
    // タイトルバー有り
    : State_syncview('B000000000');
} else {
  // 連動ビューがあれば解除して終了
  PPx.SyncView = 0;
  PPx.Execute(`*setcust X_win:V=${xwinV}`);
  // movingPPv on
  PPx.Execute('*string i,vState=');
  if (PPx.Extract('%si"vSize')) {
    // ppvをcapturewindowに取り込む前のサイズに戻す
    PPx.Execute(`*setcust _WinPos:V${tID}=%si"vSize"`);
    PPx.Execute('*string i,vSize=');
  }
}

/* 呼出元の状態に合わせて連動ビューを起動する関数 */
function State_syncview (tWin) {
  PPx.Execute(`*setcust X_win:V=${tWin}`);
  PPx.Execute(`%Oin *ppv -r -bootid:${tID}`);
  switch (paneCount) {
  case 2:
    // capturewindowに取り込む前にPPvのサイズを記憶する
    PPx.Execute(`*string i,vSize=%*getcust(_WinPos:V${tID})`);
    // movingPPv off
    PPx.Execute('*string i,vState=1');
    PPx.Execute(`%Oi *capturewindow V${tID} -pane:~ -selectnoactive`);
    break;
  default:
    PPx.Execute('*setcust X_vpos=0');
    PPx.Execute(`*topmostwindow %NV${tID},1`);
  }
  PPx.Execute(`*ppvoption sync ${tID}`);
}
