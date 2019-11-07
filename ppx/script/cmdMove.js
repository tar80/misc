//!*script
/* 状況に応じたファイル移動の設定 */
// PPx.Arguments(0)=1:quick

var opDir = PPx.Extract('%2');
var pathState = []; //[0]dest,[1]dialog state
// 対象パスを設定
if (!PPx.GetFileInformation(opDir)) {
  var tDir = PPx.Extract("%\'work\'").replace("/\//g,'\\'");
  var pathState = ['move', ''];
} else {
  var tDir = '%2';
  var pathState = (PPx.Arguments.length == 0)
    ? ['move', '']
    : ['!move', '-min'];
};
// カレントディレクトリの属性に応じて処理を分岐
switch (PPx.Extract(PPx.DirectoryType)) {
  // 書庫
  case '63':
  case '64':
  case '96':
    PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + tDir + '%} %@');
    break;
  // リストファイル
  case '4':
    PPx.Execute('*ppcfile ' + pathState[0] + ',' + tDir + ',' + pathState[1] + ' -qstart -nocount -preventsleep -same:5 -sameall -undolog -compcmd %K\"@^\\D\"');
    break;
  // その他
  default:
    PPx.Execute('*ppcfile ' + pathState[0] + ',' + tDir + ',' + pathState[1] + ' -qstart -nocount -preventsleep -same:0 -sameall -undolog');
    break;
};
