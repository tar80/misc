//!*script
// リストファイル上の存在しないファイルを消去
var fso = PPx.CreateObject('Scripting.FileSystemObject');
for(var i = 0; i < PPx.Entry.Count; ++i){
  var name = PPx.Entry(i).Name;
  if(!(fso.FileExists(name) || fso.FolderExists(name))){
    PPx.Entry(i).Mark = -1
    }
}