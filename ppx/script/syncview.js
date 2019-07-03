//!*script
/* 状況に応じてSyncViewを設定 */

var paneCount = PPx.Pane.Count;
var tID = PPx.Extract('%n').slice(1);
var sync = PPx.Extract('%*getcust(_others:SyncViewID)');

/* 呼出元の状態に合わせて連動ビューを起動する関数 */
var syncState = function (tWin) {
  PPx.Execute('%Oi *setcust X_win:V=B' + tWin + ' %:*ppv -r -bootid:' + tID);
  if (paneCount == 2) {
    PPx.Execute('%Oi *capturewindow V' + tID + ' -pane:~ -selectnoactive');
    PPx.Execute('%Oi *wait 100,1 %:*focus');
  } else {
    PPx.Execute('%Oi:*ppv -r -bootid:' + tID);
    PPx.Execute('%Oi *topmostwindow %NV' + tID + ',1');
  };
  PPx.Execute('*ppvoption setsync ' + tID);
};

if (!sync) {
  // 左右2窓ならタイトルバー無、それ以外なら有
  paneCount == 2 ? syncState('100000000') : syncState('000000000');
} else {
  // 連動ビューが作動中なら解除して終了
  PPx.SyncView = 0;
  PPx.Execute('%KV%*getcust(_others:SyncViewID),"@Q"');
  PPx.Execute('*setcust X_win:V=B000000000 %:*setcust _others:-|SyncViewID=');
};
