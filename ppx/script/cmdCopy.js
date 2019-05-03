//!*script
// %'work'=workspace
var opDir = PPx.Extract("%2");
var tDir;
var fp = PPx.Extract("%FDC");
var fn = PPx.Extract("%FC");
var cmd = PPx.Arguments(0) == 0? "copy": "!copy";

switch(PPx.GetFileInformation(opDir)){
case ':DIR':
  tDir = opDir;
  break;
case '':
  tDir = PPx.Extract("%\'work\'").replace(/\//g,'\\');
  cmd = "copy";
  break;
default:
  PPx.Echo('対象がディレクトリではありません');
  PPx.Quit(1);
  break;
}

if(PPx.Arguments(0) >= 2){
  tDir = PPx.Extract('%*input("' + tDir +'" -title:"コピー先" -mode:d)%*addchar(\\)');
  if(tDir != ''){
    var att = PPx.GetFileInformation(fp) == ":DIR"? "/D ": "";
    PPx.Execute('%Orn *ppb -runas -c mklink ' + att + tDir + fn + ' ' + fp);
  }
} else if(PPx.DirectoryType >= 62){
  PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + tDir + '%} %@');
} else{
  var bst;
  var mSize = PPx.EntryMarkCount == 0? PPx.EntrySize : PPx.EntryMarkSize;
  (mSize > 5000)? bst = 'on' : bst = 'off';
  PPx.Execute('*ppcfile ' + cmd + ',' + tDir + ',/qstart /nocount /preventsleep /same:7 /sameall /burst:' + bst);
}
