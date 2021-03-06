﻿//!*script
/* IDを考慮してPPx終了 */

'use strict';

// C_A以外の窓から終了
const ppxID = (() => {
  let winID = PPx.WindowIDName;
  if (winID === 'C_A') {
    let list = PPx.Extract('%*ppxlist(-)').split(',');
    list.sort((a, b) => (a < b) ? 1 : -1);
    winID = list[0];
  }
  return winID;
})();

const targetID = ppxID.slice(2);
const ppvSync = PPx.Extract(`%*extract(C${targetID},"%%*js(PPx.Result=PPx.SyncView;)")`)|0;

if (ppvSync > 0) {
  PPx.Execute('*setcust X_win:V=B000000000');
  PPx.Execute(`*execute C${targetID},*ppvoption sync off`);
  // 連動ビューがcapturewindowなら元のサイズに戻す
  if (PPx.Extract('%si"vSize') !== 0) {
    PPx.Execute(`*setcust _WinPos:V${targetID}=%si"vSize"`);
    PPx.Execute('*string i,vSize=');
  }
  PPx.Quit(1);
} else if (ppxID === 'C_X') {
  PPx.Execute('*customize XC_celD=_AUTO,_AUTO,3,7');
}

PPx.Execute(`*closeppx ${ppxID}`);
