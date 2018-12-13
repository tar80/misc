//!*script
// リストファイルを作ったり追記する
// %si"ppp" = 処理元ディレクトリ
if(PPx.EntryMarkCount == 0) PPx.Quit(1);

var fso = PPx.CreateObject("Scripting.FileSystemObject");
var cDir = PPx.Extract("%FDN%\\");
var pList = fso.OpenTextFile(PPx.Extract('%si"ppp"'),8,true,-1);
var Count = PPx.Entry.Count;
var arg = PPx.Arguments.count == 0? "": PPx.Arguments(0);

switch(arg){
case 'listfile':
  pList.WriteLine(';ListFile');
default:
  break;
}
if(PPx.DirectoryType == 4){
  for(i = 0; i < Count; i++){
    if(PPx.Entry(i).Mark == 1){
      pList.WriteLine(PPx.Entry(i).Name);
    }
  }
} else{
  for(i = 0; i < Count; i++){
    if(PPx.Entry(i).Mark == 1){
      pList.WriteLine(cDir + PPx.Entry(i).Name);
    }
  }
}
