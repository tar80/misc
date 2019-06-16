//!*script
// ケース毎のMoveコマンド
// PPx.Arguments(0)=0:detail|1:quick
var opDir = PPx.Extract('%2');
var tDir; // 対象DIRパス
var cmd;  // 詳細コピースイッチ
// 対象パスを設定
if(!PPx.GetFileInformation(opDir)){
  var tDir = PPx.Extract("%\'work\'").replace("/\//g,'\\'");
  var cmd = 'move';
} else{
  var tDir = '%2';
  var cmd = PPx.Arguments.count == 0? 'move': '!move';
}
// カレントディレクトリの属性をみて処理を分岐
switch(PPx.Extract(PPx.DirectoryType)){
    // 書庫
  case '63':
  case '64':
  case '96':
    PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + tDir + '%} %@');
    break;
    // リストファイル
  case '4':
    PPx.Execute('*ppcfile ' + cmd + ',' + tDir + ',/qstart /nocount /preventsleep /same:5 /sameall /undolog /compcmd %K\"@^\\D\"');
    break;
  default:
    // その他
    PPx.Execute('*ppcfile ' + cmd + ',' + tDir + ',/qstart /nocount /preventsleep /same:7 /sameall /undolog');
    break;
}
