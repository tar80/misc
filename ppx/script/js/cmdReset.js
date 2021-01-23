//!*script
/* 初期化後再設定 */

var pDir = PPx.Extract('%FD');
var cfgPath = [];
var l = PPx.EntryMarkCount;
var ObjEntry = PPx.Entry;

PPx.Entry.Index = ObjEntry.FirstMark;

for (var i = 1; i <= l; i++) {
  cfgPath.push('*wait 90,1 %%: PPCUSTW CA ' + ObjEntry.Name);
  ObjEntry.NextMark;
}

PPx.Execute('PPCUSTW CINIT');
PPx.Execute('*setcust _Command:reset=*cd ' + pDir + ' %%: ' + cfgPath.join(' %%:'));
PPx.Execute('*reset');
