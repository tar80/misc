//!*script
/* 初期化後再設定 */

'use strict';

const pDir = PPx.Extract('%FD');
const cfgPath = [];
const l = PPx.EntryDisplayCount;
const ObjEntry = PPx.Entry;

for (let i = 0; i < l; i++) {
  if (ObjEntry(i).Mark) {
    cfgPath.push(`*wait 120,1 %%: PPCUSTW CA ${ObjEntry(i).Name}`);
  }
}

PPx.Execute('PPCUSTW CINIT');
PPx.Execute(`*setcust _Command:reset=*cd ${pDir} %%: ${cfgPath.join(' %%: ')}`);
PPx.Execute('*reset');
