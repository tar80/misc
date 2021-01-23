//!*script
/* 初期化後再設定 */

'use strict';

const pDir = PPx.Extract('%FD');
const cfgPath = [];
const l = PPx.EntryMarkCount;
const ObjEntry = PPx.Entry;

PPx.Entry.Index = ObjEntry.FirstMark;

for (let i = 1; i <= l; i++) {
  cfgPath.push(`*wait 120,1 %%: PPCUSTW CA ${ObjEntry.Name}`);
  ObjEntry.NextMark;
}

PPx.Execute('PPCUSTW CINIT');
PPx.Execute(`*setcust _Command:reset=*cd ${pDir} %%: ${cfgPath.join(' %%: ')}`);
PPx.Execute('*reset');
