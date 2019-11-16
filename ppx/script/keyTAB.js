//!*script
/* TABキーで窓移動 */

// syncviewがonならPPc/PPv間でフォーカスをトグル
var xID = PPx.WindowIDName.split('_');
var tPPx = (xID[0] == 'C')
  ? 'V_'
  : 'C_';
var sync = PPx.Extract('%*extract(C,"%%*js(PPx.Result=PPx.SyncView;)")')|0;
if (sync > 0) {
  PPx.Execute('*focus ' + tPPx + xID[1]);
  PPx.Quit(1);
};

var xID = PPx.WindowIDName;
var xList = PPx.Extract('%*ppxlist()').split(',');
if (xList[0] > 1) {
xList.sort(function (a, b) {
  return a < b
  ? -1
  : 1;
  return 0;
});
  for (var item in xList) {
    if (xList[item] == xID)
      break;
  };
  var tID = (xList[Number(item) + 1]) || xList[2];
  PPx.Execute('*focus ' + tID);
} else {
    PPx.Execute('%K"@F6"');
};
