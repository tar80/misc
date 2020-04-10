//!*script
/* TABキーで窓移動 */
'use strict';
const xID = PPx.WindowIDName.split('_');
const tPPx = (xID[0] == 'C') ? 'V_' : 'C_';
const sync = PPx.Extract(`%*extract(C${xID[1]},"%%*js(PPx.Result=PPx.SyncView;)")`)|0;

// syncviewがonならPPc/PPv間でフォーカスをトグル
if (sync > 0) {
  PPx.Execute(`*focus ${tPPx}${xID[1]}`);
  PPx.Quit(1);
}

const xList = PPx.Extract('%*ppxlist()').split(',');
let tID = xList[xList.indexOf(xID.join('_')) + 1];

if (xList[0] > 1) {
  xList.sort((a, b) =>  a < b ? -1 : 1);
  // リストの端なら最初に戻る
  if (!tID || tID == 'csA') {
    tID = xList[2];
  }
  if (tID.indexOf('B_') == 0) {
    // PPbならckwをフォーカス
    // PPx.Execute('*focus #%*findwindowclass(CkwWindowClass)')
    PPx.Execute('%K"@F6"');
    PPx.Quit(1);
  } else {
    PPx.Execute(`*focus ${tID}`);
  }
} else {
  PPx.Execute('%K"@F6"');
}
