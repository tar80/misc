//!*script
// %'work'=workspace
var Tdir = PPx.Pane.Count == 2?'%2%\\':'%\'work\'';
if(PPx.DirectoryType == 4){
  PPx.Execute('*ppcfile !move,' + Tdir + ',/qstart /min /nocount /preventsleep /same:5 /sameall /undolog /compcmd %K\"@^\\D\"');
} else{
  PPx.Execute('*ppcfile !move,' + Tdir + ',/qstart /min /nocount /preventsleep /same:7 /sameall /undolog');
}