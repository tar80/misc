//!*script
/* TABキーで窓移動 */

// syncviewがonならPPc/PPv間でフォーカスをトグル
var xID = PPx.WindowIDName.split('_');
var tPPx = (xID[0] == 'C')
  ? 'V_'
  : 'C_';
var sync = PPx.Extract('%*extract(C' + xID[1] + ',"%%*js(PPx.Result=PPx.SyncView;)")')|0;
if (sync > 0) {
  PPx.Execute('*focus ' + tPPx + xID[1]);
  PPx.Quit(1);
};

var xList = PPx.Extract('%*ppxlist()').split(',');
if (xList[0] > 1) {
  xList.sort(function (a, b) {
    return a < b ? -1 : 1;
    return 0;
  });
  var xList = xList.join(',');
  var tID = xID[0] + '_' + PPx.Extract('%*regexp(' + xID[1] + ',tr/A-Z/B-ZA/)');
  if (xList.indexOf(tID) == -1) {
    var vID = xList.indexOf('V_');
    if (xID[0] == 'V' || vID == -1) {
      var tID ='C_A';
    } else {
      var tID = xList.slice(vID, (vID + 3)|0);
    };
  };
  PPx.Execute('*focus ' + tID);
} else {
  PPx.Execute('%K"@F6"');
};
