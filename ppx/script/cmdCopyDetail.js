//!*script
// %'work'=workspace
var ws = PPx.Extract("%\'work\'");
var fn = PPx.Extract("%2");
if(PPx.GetFileInformation(fn) == ':DIR'){
  Tdir = fn
  }else if(PPx.GetFileInformation(fn) != ''){
    PPx.Echo('対象がディレクトリではありません');
    PPx.Quit(1)
  }else Tdir = ws

if(PPx.DirectoryType == 96){
  PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"コピー先"%{' + Tdir + '%} %@');
} else{
  var mSize = PPx.EntryMarkCount == 0?PPx.EntrySize : PPx.EntryMarkSize;
  (mSize > 5000) ? a = 'on' : a = 'off';
  PPx.Execute('*ppcfile copy,' + Tdir + ',/qstart /nocount /preventsleep /same:7 /sameall /burst:' + a + ' /compcmd %k"^a"');
}