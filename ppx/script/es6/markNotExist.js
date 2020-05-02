//!*script
/* リストファイル上の存在しないファイルをマーク */
'use strict';
const fso = PPx.CreateObject('Scripting.FileSystemObject');

for (let [i, l] = [0, PPx.Entry.Count]; i < l; i++) {
  let fileName = PPx.Entry(i).Name;
  if (!(fso.FileExists(fileName) || fso.FolderExists(fileName))) {
    PPx.Entry(i).Mark = 1;
  }
}
