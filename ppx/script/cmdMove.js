//!*script
var opDir = PPx.Extract("%2"); //反対窓
var tDir; // 対象DIRパス
var cmd;  // 詳細コピースイッチ
// 対象パスを設定
if(!PPx.GetFileInformation(opDir)){
  tDir = PPx.Extract("%\'work\'").replace(/\//g,'\\');
    cmd = "move";
  } else{
    tDir = "%2";
  cmd = PPx.Arguments.count == 0? "move": "!move";
  }
// カレントディレクトリの属性をみて処理を分岐
switch(PPx.Extract(PPx.DirectoryType)){
  // 書庫
  case '63':
  case '64':
  case '96':
    PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + tDir + '%} %@');
    break;
  // リスト
  case '4':
    PPx.Execute('*ppcfile ' + cmd + ',' + tDir + ',/qstart /nocount /preventsleep /same:5 /sameall /undolog /compcmd %K\"@^\\D\"');
    break;
  default:
    // レポジトリ
    if(PPx.Extract("%1%\\").indexOf(PPx.Extract("%'repo'%\\")) >= 0){
      PPx.Execute('%Orn *ppb -c git mv ' + PPx.Extract("%FC") + ' ' + tDir);
    } else{
      // その他
      PPx.Execute('*ppcfile ' + cmd + ',' + tDir + ',/qstart /nocount /preventsleep /same:7 /sameall /undolog');
    break;
    }
}
