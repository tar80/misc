//!*script
/* リストファイル上の存在しないファイルをマーク */

'use strict';

const fso = PPx.CreateObject('Scripting.FileSystemObject');
const ObjEntry = PPx.Entry;

for (let [i, l] = [0, ObjEntry.Count]; i < l; i++) {
  if (!(fso.FileExists(ObjEntry(i).Name) || fso.FolderExists(ObjEntry(i).Name))) {
    ObjEntry(i).Mark = 1;
  }
}
