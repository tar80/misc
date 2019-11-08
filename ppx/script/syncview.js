//!*script
/* 状況に応じてSyncViewを設定 */

var paneCount = PPx.Pane.Count;
var tID = PPx.Extract('%n').slice(1);
if (!PPx.SyncView) {
  (paneCount == 2)
    // タイトルバー無し
    ? state_syncview('B100000000')
    // タイトルバー有り
    : state_syncview('B000000000');
} else {
  // 連動ビューがあれば解除して終了
  PPx.SyncView = 0;
  PPx.Execute('*string i,vState=');
  PPx.Execute('%KV' + tID + ',"@Q"');
  PPx.Execute('*setcust X_win:V=B000000000');
};

/* 呼出元の状態に合わせて連動ビューを起動する関数 */
function state_syncview (tWin) {
  PPx.Execute('%Oi *setcust X_win:V=' + tWin + ' %: *ppv -r -bootid:' + tID);
  switch (paneCount) {
    case 2:
      PPx.Execute('*string i,vState=2');
    PPx.Execute('%Oi *capturewindow V' + tID + ' -pane:~ -selectnoactive');
      //フォーカスがうまくいかない場合は、ここを調整する
    PPx.Execute('%Oi *wait 100,1 %:*focus');
      break;
    default:
      PPx.Execute('*string i,vState=1');
    PPx.Execute('%Oi *topmostwindow %NV' + tID + ',1');
      break;
  };
  PPx.Execute('*ppvoption sync ' + tID);
};
