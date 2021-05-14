//!*script
/* リストファイル上の存在しないファイルをマーク */

'use strict';

const fso = PPx.CreateObject('Scripting.FileSystemObject');
const objEntry = PPx.Entry;

for (let [i, l] = [0, objEntry.Count]; i < l; i++) {
  if (!(fso.FileExists(objEntry(i).Name) || fso.FolderExists(objEntry(i).Name))) {
    objEntry(i).Mark = 1;
  }
}
