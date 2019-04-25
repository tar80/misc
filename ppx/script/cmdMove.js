//!*script
/* %'work'=workspace */
var Tdir = PPx.Pane.Count == 2?'%2%\\':'%*input(%\'work\' -title:"ファイル移動" -mode:d)';
var cmd = PPx.Arguments.count == 0? "move": "!move";

switch(PPx.Extract(PPx.DirectoryType)){
case '63':
case '64':
case '96':
  PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + Tdir + '%} %@');
  break;
case '4':
  PPx.Execute('*ppcfile ' + cmd + ',' + Tdir + ',/qstart /nocount /preventsleep /same:5 /sameall /undolog /compcmd %K\"@^\\D\"');
  break;
default:
  PPx.Execute('*ppcfile ' + cmd + ',' + Tdir + ',/qstart /nocount /preventsleep /same:7 /sameall /undolog');
  break;
}

/*
if(PPx.DirectoryType >= 62){
  PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + Tdir + '%} %@');
} else if(PPx.DirectoryType == 4){
  PPx.Execute('*ppcfile move,' + Tdir + ',/qstart /nocount /preventsleep /same:5 /sameall /undolog /compcmd %K\"@^\\D\"');
} else{
  PPx.Execute('*ppcfile move,' + Tdir + ',/qstart /nocount /preventsleep /same:7 /sameall /undolog /compcmd %k"^a"');
}
*/
