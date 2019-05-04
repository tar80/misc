//!*script
var odp = PPx.Extract("%2"); //反対窓
var Tdp; //対象DIRパス
var cmd; //詳細コピースイッチ
if(PPx.GetFileInformation(odp) == ':DIR'){
  Tdp = "%2";
  cmd = PPx.Arguments.count == 0? "move": "!move";
} else{
  Tdp = PPx.Extract("%\'work\'").replace(/\//g,'\\');
    cmd = "move";
  }

switch(PPx.Extract(PPx.DirectoryType)){
  case '63':
  case '64':
  case '96':
    PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + Tdp + '%} %@');
    break;
  case '4':
    PPx.Execute('*ppcfile ' + cmd + ',' + Tdp + ',/qstart /nocount /preventsleep /same:5 /sameall /undolog /compcmd %K\"@^\\D\"');
    break;
  default:
      PPx.Execute('*ppcfile ' + cmd + ',' + Tdp + ',/qstart /nocount /preventsleep /same:7 /sameall /undolog');
    break;
}
