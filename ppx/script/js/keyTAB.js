//!*script
//
/* TABキーで窓移動 */

var x = function() {
  var w = PPx.WindowIDName;
  var s = (w.substr(0, 1) === 'C') ? 'V' : 'C';
  return { 'winid': w, 'syncwin': s, 'id': w.substr(2, 1) };
}();
var sync = PPx.Extract('%*extract(C' + x.id + ',"%%*js(PPx.Result=PPx.SyncView;)")')|0;

// syncviewがonならPPc/PPv間でフォーカスをトグル
if (sync) {
  PPx.Execute('*focus ' + x.syncwin + '_' + x.id);
  PPx.Quit(1);
}

// PPbを省いた起動リストを取得
var xList = PPx.Extract('%*ppxlist()').split(',');
var tID;

if (xList[0] > 1) {
  xList.sort(function (a, b) { return a < b ? -1 : 1; });

  for (var i = xList.length; i--;) {
    if (xList[i] == x.winid) {
      tID = xList[i + 1];
      break;
    }
  }

  if (!tID || tID === 'csA') {
    // リストの端なら最初に戻る
    tID = xList[2];
  }

  if (tID.indexOf('B_') === 0) {
    // PPbなら%*NTをフォーカス
    // PPx.Execute('*focus #%*NT');
    PPx.Execute('%K"@F6"');
    PPx.Quit(1);
  } else {
    PPx.Execute('*focus ' + tID);
  }
} else {
  // 一枚表示なら反対窓起動
  PPx.Execute('%K"@F6"');
}
