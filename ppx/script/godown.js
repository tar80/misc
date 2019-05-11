//!*script
var eText = PPx.Extract('%*edittext');
var str = eText.slice(1,4);
switch(str){
  case '.\\':
  case ':\\':
    PPx.Execute('%K"@TAB');
    break;
  default:
    eText = eText.replace(/.*\s(.*)/,"$1");
    PPx.Execute('*ifmatch "o:e,a:d+","' + eText + '" %:*replace %*edittext%\\ %:*completelist %:%K"@F2@F4@TAB"');
    break;
}
