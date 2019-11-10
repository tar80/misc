//!*script
/* TABキーで窓移動 */

var xID = PPx.WindowIDName.split('_');
(xID[0] == 'C')
 ? xID.push('V_')
 : xID.push('C_');
// syncviewがonならPPc/PPv間でフォーカスをトグル
var sync = PPx.Extract('%*extract(C,"%%*js(PPx.Result=PPx.SyncView;)")')|0;
if (sync > 0) {
  PPx.Execute('*focus ' + xID[2] + xID[1]);
  PPx.Quit(1);
};
var tID = xID[0] + '_' + String.fromCharCode(xID[1].charCodeAt(0) + 1);
var xList = PPx.Extract('%*ppxlist(-)').split(',');
xList.sort(function (a, b) {
  return a < b
  ? -1
  : 1;
  return 0;
});
var tList = xList.join(',');
if (tList.indexOf(tID) != -1)
  PPx.Execute('*focus ' + tID);
else {
  var index = tList.indexOf(xID[2]);
  var tID = tList.slice(index, index + 3);
  if (tID)
    PPx.Execute('*focus ' + tID);
  else
    PPx.Execute('%K"@F6"');
};
