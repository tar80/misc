//!*script
/* 一行編集上で下流側にパス補完 */

var editPath = PPx.Extract('%*edittext()');
var str = editPath.slice(1, 4);
switch (str) {
  case '.\\':
  case ':\\':
    PPx.Execute('%K"@TAB');
    break;
  default:
    editPath = editPath.replace(/.*\s(.*)/, "$1");
    PPx.Execute('*ifmatch "o:e,a:d+","' + editPath + ' %: *replace %*edittext()%\\');
    PPx.Execute('*completelist %: %K"@F4');
    PPx.Execute('*wait 2,1 %: %K"@TAB"');
    break;
};
if (PPx.Extract('%W') == 'パス移動') {
  var result = PPx.Extract('%*edittext()');
  var len = result.replace(/(.*\\)(?!$).*/, '$1').length;
  PPx.Execute('*sendmessage %N,177,' + len + ',' + result.length);
};
