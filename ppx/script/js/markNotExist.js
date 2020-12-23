//!*script
/* リストファイル上の存在しないファイルをマーク */

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fileName;

for (var i = 0, l = PPx.Entry.Count; i < l; i = (i+1)|0) {
  fileName = PPx.Entry(i).Name;
  if (!(fso.FileExists(fileName) || fso.FolderExists(fileName))) {
    PPx.Entry(i).Mark = 1;
  }
}
