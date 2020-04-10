//!*script
/* リストファイル上の存在しないファイルをマーク */
'use strict';
const fs = PPx.CreateObject('Scripting.FileSystemObject');

for (let [i, l] = [0, PPx.Entry.Count]; i < l; i++) {
  let fileName = PPx.Entry(i).Name;
  if (!(fs.FileExists(fileName) || fs.FolderExists(fileName))) {
    PPx.Entry(i).Mark = 1;
  }
}
