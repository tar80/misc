//!*script
// %'work'=workspace
var Tdir = PPx.Pane.Count == 2?'%2%\\':'%\'work\'';
if(PPx.DirectoryType == 96){
  PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"âìÄêÊ"%{' + Tdir + '%} %@');
} else if(PPx.DirectoryType == 4){
  PPx.Execute('*ppcfile move,' + Tdir + ',/qstart /nocount /preventsleep /same:5 /sameall /undolog /compcmd %K\"@^\\D\"');
} else{
  PPx.Execute('*ppcfile move,' + Tdir + ',/qstart /nocount /preventsleep /same:7 /sameall /undolog /compcmd %k"^a"');
}