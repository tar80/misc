//!*script
/* 一行編集上で下流側にパス補完 */

var editPath = PPx.Extract('%*edittext');
var str = editPath.slice(1, 4);
switch (str) {
  case '.\\':
  case ':\\':
    PPx.Execute('%K"@TAB');
    break;
  default:
    editPath = editPath.replace(/.*\s(.*)/,"$1");
    PPx.Execute('*ifmatch "o:e,a:d+","' + editPath + '" %:*replace %*edittext%\\ %:*completelist %:%K"@F2@F4@TAB"');
    break;
};
