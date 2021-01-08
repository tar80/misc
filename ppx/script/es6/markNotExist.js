//!*script
/* リストファイル上の存在しないファイルをマーク */

'use strict';
const fso = PPx.CreateObject('Scripting.FileSystemObject');
const entry = PPx.Entry;
for (let [i, l] = [0, entry.Count]; i < l; i++) {
  if (!(fso.FileExists(entry(i).Name) || fso.FolderExists(entry(i).Name))) {
    entry(i).Mark = 1;
  }
}
