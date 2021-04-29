//!*script
/* 初期化後再設定 */

var pDir = PPx.Extract('%FD');
var cfgPath = [];
var l = PPx.EntryDisplayCount;
var ObjEntry = PPx.Entry;

for (var i = 0; i < l; i++) {
  if (ObjEntry(i).Mark) {
    cfgPath.push('*wait 120,1 %%: PPCUSTW CA ' + ObjEntry(i).Name);
  }
}

PPx.Execute('PPCUSTW CD %\'cfg%\'%\\Px_@user.cfg -mask:"_User" %&');
PPx.Execute('PPCUSTW CINIT %&');
PPx.Execute('*setcust _Command:reset=*cd ' + pDir + ' %%: ' + cfgPath.join(' %%: '));
PPx.Execute('*reset');
