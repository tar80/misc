//!*script
/* ヒストリ(u:ユーザー定義)に基準パスのサブディレクトリを追加する */
// PPx.Arguments(0)=case, (1)=基準となる文字列
'use strict';
// ヒストリの初期化
var histCount = PPx.Extract('%*getcust(_User:u_count)') || 0;
for (var i = 0; i < histCount; i =(i+1)|0) {
  PPx.Execute('*deletehistory u,0');
}

try {
  var arg = [PPx.Arguments(0), PPx.Arguments(1)];
} catch (e) {
  PPx.Echo(e);
  PPx.Quit(-1);
}
switch (arg[0]){
case 'path':
  var fs = PPx.CreateObject('Scripting.FileSystemObject');
  var fs_dir = fs.GetFolder(arg[1]);
  PPx.Execute('*setcust _User:u_count=' + fs_dir.SubFolders.Count);
  var e = new Enumerator(fs_dir.SubFolders);
  for (e.moveFirst(); !e.atEnd(); e.moveNext()) {
    var fs_tPath = fs.GetFolder(fs.BuildPath(fs_dir.Path, e.item().Name));
    PPx.Execute('*addhistory u,' + fs_tPath);
  }
  break;
default:
  break;
}
