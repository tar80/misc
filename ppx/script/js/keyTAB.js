﻿//!*script
//
/* TABキーで窓移動 */

// syncviewがonならPPc/PPv間でフォーカスをトグル
var xID = PPx.WindowIDName.split('_');
var tID;
var tPPx = (xID[0] == 'C') ? 'V_' : 'C_';
var sync = PPx.Extract('%*extract(C' + xID[1] + ',"%%*js(PPx.Result=PPx.SyncView;)")')|0;

// syncviewがonならPPc/PPv間でフォーカスをトグル
if (sync) {
  PPx.Execute('*focus ' + tPPx + xID[1]);
  PPx.Quit(1);
}

// PPbを省いた起動リストを取得
var xList = PPx.Extract('%*ppxlist()').split(',');

if (xList[0] > 1) {
  xList.sort(function (a, b) { return a < b ? -1 : 1; });

  xID = xID.join('_');

  for (var i = xList.length; i--;) {
    if (xList[i] == xID) {
      tID = xList[i + 1];
      break;
    }
  }

  if (!tID || tID == 'csA') {
    // リストの端なら最初に戻る
    tID = xList[2];
  }

  if (tID.indexOf('B_') == 0) {
    // PPbならckwをフォーカス
    // PPx.Execute('*focus #%*findwindowclass(CkwWindowClass)')
    PPx.Execute('%K"@F6"');
    PPx.Quit(1);
  } else {
    PPx.Execute('*focus ' + tID);
  }
} else {
  // 一枚表示なら反対窓起動
  PPx.Execute('%K"@F6"');
}
