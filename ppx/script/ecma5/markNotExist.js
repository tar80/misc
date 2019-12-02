//!*script
/* リストファイル上の存在しないファイルをマーク */
'use strict';
var fs = PPx.CreateObject('Scripting.FileSystemObject');
var fileName;

for (var i = 0, l = PPx.Entry.Count; i < l; i = (i+1)|0) {
  fileName = PPx.Entry(i).Name;
  if (!(fs.FileExists(fileName) || fs.FolderExists(fileName))) {
    PPx.Entry(i).Mark = 1;
  }
};
