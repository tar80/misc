//!*script
// リストファイル上の存在しないファイルをマーク
var fso = PPx.CreateObject('Scripting.FileSystemObject');
for(var i = 0,l = PPx.Entry.Count; i < l; ++i){
  var fn = PPx.Entry(i).Name;
  if(!(fso.FileExists(fn) || fso.FolderExists(fn))){
    PPx.Entry(i).Mark = 1;
  }
}
