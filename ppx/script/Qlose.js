﻿//!*script
/* IDを考慮してPPx終了 */

// AUX窓なら終了
if (PPx.Extract('%1').match(/aux:\/\/.+/)) {
  PPx.Execute('*execute CY, %j"%*getcust(_User:pk1)');
  PPx.Quit(1);
};
// C_A以外の窓から終了
var xID = PPx.WindowIDName;
if (xID == 'C_A') {
  var xList = PPx.Extract('%*ppxlist(-)').split(',');
  xList.sort(function (a, b) {
    return a < b ? 1 : -1;
    return 0;
  });
  var xID = xList[0];
};
var tID = xID.slice(2);
var sync = PPx.Extract('%*extract(C' + tID + ',"%%*js(PPx.Result=PPx.SyncView;)")')|0;
if (sync > 0) {
  PPx.Execute('*setcust X_win:V=B000000000');
  PPx.Execute('*execute C' + tID + ',*ppvoption sync off');
  if (PPx.Extract('%si"vSize') != 0) {
    PPx.Execute('*setcust _WinPos:V' + tID + '=%si"vSize"');
    PPx.Execute('*string i,vSize=');
  };
  PPx.Quit(1);
} else if (xID == 'C_X')
  PPx.Execute('*setcust XC_celD=_AUTO,_AUTO,3,7');
PPx.Execute('*closeppx ' + xID);
