//!*script
/* 状況に応じてSyncViewを設定 */
'use strict';
var paneCount = PPx.Pane.Count;
var tID = PPx.WindowIDName.slice(2);
var sync = PPx.SyncView;
var memSize;    // PPvの起動前のサイズ

if (sync == 0) {
  (paneCount == 2)
    // タイトルバー無し
    ? state_syncview('B100000000')
    // タイトルバー有り
    : state_syncview('B000000000');
} else {
  // 連動ビューがあれば解除して終了
  PPx.SyncView = 0;
  PPx.Execute('*setcust X_win:V=B000000000');
  PPx.Execute('*string i,vState=');
  // PPx.Execute('%KV' + tID + ',"@Q"');
  if (PPx.Extract('%si"vSize') != 0) {
    // capturewindowに取り込む前のサイズに戻す
    PPx.Execute('*setcust _WinPos:V' + tID + '=%si"vSize"');
    PPx.Execute('*string i,vSize=');
  }
};

/* 呼出元の状態に合わせて連動ビューを起動する関数 */
function state_syncview (tWin) {
  PPx.Execute('*setcust X_win:V=' + tWin);
  PPx.Execute('%Oi *ppv -r -bootid:' + tID);
  switch (paneCount) {
    case 2:
      // capturewindowに取り込む前のサイズを記憶する
      memSize = PPx.Extract('%*getcust(_WinPos:VA)');
      PPx.Execute('*string i,vSize=' + memSize);
      PPx.Execute('*string i,vState=1');
    PPx.Execute('%Oi *capturewindow V' + tID + ' -pane:~ -selectnoactive');
      //フォーカスがうまくいかない場合は、ここを調整する
      PPx.Execute('*wait 10,1 %:*focus');
      break;
    default:
      PPx.Execute('*topmostwindow %NV' + tID + ',1');
      break;
  }
  PPx.Execute('*ppvoption sync ' + tID);
};
