//!*script
/* %'work'=workspace */
var odp = PPx.Extract("%2");
var fp = PPx.Extract("%FDC");
var fn = PPx.Extract("%FC");
var Tdp;
var cmd = PPx.Arguments(0) == 0? "copy": "!copy";

switch(PPx.GetFileInformation(odp)){
case ':DIR':
  Tdp = odp;
  break;
case '':
  Tdp = PPx.Extract("%\'work\'").replace(/\//g,'\\');
  cmd = "copy";
  break;
default:
  PPx.Echo('対象がディレクトリではありません');
  PPx.Quit(1);
  break;
}

if(PPx.Arguments(0) >= 2){
  Tdp = PPx.Extract('%*input("' + Tdp +'" -title:"コピー先" -mode:d)%*addchar(\\)');
  if(Tdp != ''){
    var att = PPx.GetFileInformation(fp) == ":DIR"? "/D ": "";
    PPx.Execute('%Orn *ppb -runas -c mklink ' + att + Tdp + fn + ' ' + fp);
  }
} else if(PPx.DirectoryType >= 62){
  PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + Tdp + '%} %@');
} else{
  var bst;
  var mSize = PPx.EntryMarkCount == 0? PPx.EntrySize : PPx.EntryMarkSize;
  (mSize > 5000)? bst = 'on' : bst = 'off';
  PPx.Execute('*ppcfile ' + cmd + ',' + Tdp + ',/qstart /nocount /preventsleep /same:7 /sameall /burst:' + bst);
}
