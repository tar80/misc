//!*script
/* 状況に応じて連動ビューを設定 */
// %si"vSize"  :capturewindowに取り込む前のPPvのサイズ
// %si"vState" :値が"1"のとき、カーソルを避けるようにPPvの位置を変える
'use strict';
const paneCount = PPx.Pane.Count;
const tID = PPx.WindowIDName.slice(2);
const sync = PPx.SyncView;

if (sync == 0) {
  (paneCount == 2)
    // タイトルバー無し
    ? State_syncview('B100000000')
    // タイトルバー有り
    : State_syncview('B000000000');
} else {
  // 連動ビューがあれば解除して終了
  PPx.SyncView = 0;
  PPx.Execute('*setcust X_win:V=B000000000');
  PPx.Execute('*string i,vState=');
  if (PPx.Extract('%si"vSize') != 0) {
    // ppvをcapturewindowに取り込む前のサイズに戻す
    PPx.Execute(`*setcust _WinPos:V${tID}=%si"vSize"`);
    PPx.Execute('*string i,vSize=');
  }
}

// 呼出元の状態に合わせて連動ビューを起動
function State_syncview (tWin) {
  PPx.Execute(`*setcust X_win:V=${tWin}`);
  PPx.Execute(`%Oi *ppv -r -min -bootid:${tID}`);
  switch (paneCount) {
  case 2:
    {
      // capturewindowに取り込む前にPPvのサイズを記憶する
      PPx.Execute('*string i,vSize=%*getcust(_WinPos:VA)');
      PPx.Execute('*string i,vState=1');
      PPx.Execute(`%Oi *capturewindow V${tID} -pane:~ -selectnoactive`);
    }
    break;
  default:
    PPx.Execute('*setcust X_vpos=0');
    PPx.Execute(`*topmostwindow %NV${tID},1`);
    PPx.Execute('*focus V');
  }
  PPx.Execute(`*ppvoption sync ${tID}`);
  //フォーカスがうまくいかない場合は、ここを調整する
  // PPx.Execute('*focus');
}
