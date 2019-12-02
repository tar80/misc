//!*script
/* TABキーで窓移動 */

// syncviewがonならPPc/PPv間でフォーカスをトグル
var xID = PPx.WindowIDName.split('_');
var xList = PPx.Extract('%*ppxlist()').split(',');
var tID;
var tPPx = (xID[0] == 'C')
  ? 'V_'
  : 'C_';
var sync = PPx.Extract('%*extract(C' + xID[1] + ',"%%*js(PPx.Result=PPx.SyncView;)")')|0;

if (sync > 0) {
  PPx.Execute('*focus ' + tPPx + xID[1]);
  PPx.Quit(1);
};

if (xList[0] > 1) {
  xList.sort(function (a, b) {
    return a < b ? -1 : 1;
    return 0;
  });
  xID = xID.join('_');
  for (var i = xList.length; i=(i-1)|0;) {
    if (xList[i] == xID) {
      tID = xList[(i + 1)|0];
      break;
    }
  }
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
    PPx.Execute('*focus ' + tID);
  }
} else {
  PPx.Execute('%K"@F6"');
};
