//!*script
/* IDを考慮してPPx終了 */

// AUX窓なら終了
if (PPx.Extract('%1').match(/aux:\/\/.+/)) {
  PPx.Execute('*execute CY, %j"%*getcust(_User:pk1)');
  PPx.Execute('*closeppx CY');
  PPx.Quit(1);
}

// C_A以外の窓から終了
var xID = (function (id) {
  if (id === 'C_A') {
      var list = PPx.Extract('%*ppxlist(-)').split(',');
      list.sort(function (a, b) { return a < b ? 1 : -1; });
    return list[0];
  } else {
    return id;
  }
})(PPx.WindowIDName);

var tID = xID.slice(2);
var sync = PPx.Extract('%*extract(C' + tID + ',"%%*js(PPx.Result=PPx.SyncView;)")')|0;

if (sync > 0) {
  PPx.Execute('*setcust X_win:V=B000000000');
  PPx.Execute('*execute C' + tID + ',*ppvoption sync off');
  // 連動ビューがcapturewindowなら元のサイズに戻す
  if (PPx.Extract('%si"vSize') !== 0) {
    PPx.Execute('*setcust _WinPos:V' + tID + '=%si"vSize"');
    PPx.Execute('*string i,vSize=');
  }
  PPx.Quit(1);
} else if (xID === 'C_X') {
  PPx.Execute('*customize XC_celD=_AUTO,_AUTO,3,7');
}
PPx.Execute('*closeppx ' + xID);

