//!*script
/* リストファイル上の存在しないファイルをマーク */

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var objEntry = PPx.Entry;

for (var i = 0, l = PPx.Entry.Count; i < l; i++) {
  if (!(fso.FileExists(ObjEntry(i).name) || fso.FolderExists(ObjEntry(i).name))) {
    objEntry(i).Mark = 1;
  }
}
