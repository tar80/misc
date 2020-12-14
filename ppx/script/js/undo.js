﻿//!*script
/* undo,redo */
// PPx.Arguments(0)=無:undo|他:redo

try {
  var arg = (!PPx.Arguments.length)
    ? 'undo'
    : 'redo';
} catch (e) {
  PPx.Echo(e);
  PPx.Quit(-1);
}

var fso = PPx.CreateObject('Scripting.FileSystemObject');
// 保険。X_saveはフルパスが望ましい
var xSave = PPx.Extract('%*getcust(X_save)');
var logFile = (xSave.search(':') === -1)
  ? PPx.Extract('%0%\\' + xSave + '%\\PPXUNDO.LOG')
  : PPx.Extract(xSave + '%\\PPXUNDO.LOG');
var fsoUndoLog;
var result = '';

switch (arg) {
// ReDo(Move,RenameのUnDoを処理)
// ディレクトリは対象外
case 'redo':
  var readline;
  fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);
  while (!fsoUndoLog.AtEndOfStream) {
    readline = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i');
    readline = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, 'Move\t$1\n ->\t' + readline + '\n', 'i');
    result = result + readline;
  }
  fsoUndoLog.Close();
  // 置換結果を書き出してutf16leで上書きする
  fsoUndoLog = fso.OpenTextFile(logFile, 2, true, -1);
  fsoUndoLog.Write(result);
  fsoUndoLog.Close();
  PPx.Execute('%On *ppb -c nkf -w16 -Lw --in-place ' + logFile);
  break;
case 'undo':
  var cmd = '';
  var result =[];
  fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);
  PPx.SetPopLineMessage('UnDo!');
  do {
    try {
      fsoUndoLog.ReadLine().replace(/(.*)\t(.*)/, function (match, p1, p2) {
        result.push(p1, p2);
      });
    result.push(fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i'));
    } catch (e) {
      // ファイルが空なら中止
      (typeof result[0] === 'undefined')
        ? PPx.SetPopLineMessage('Not Exist.')
        : PPx.Echo(e);
      fsoUndoLog.Close();
      PPx.Quit(-1);
    }
    switch (result[0]) {
      case 'Move':
        cmd = ' -compcmd *script %\'scr\'%\\undo.js,redo';
        break;
      case 'Back':
        var cDir = PPx.Extract('%FDN%\\');
        for (var i = 0, l = PPx.EntryDisplayCount; i < l; i = (i+1)|0) {
          if (PPx.Entry(i).state != 1 && (result[0].replace(/Backup\t(.*)/, '$1' ) == cDir + PPx.Entry(i).Name)) {
            PPx.SetPopLineMessage('Do Not!');
            fsoUndoLog.Close();
            PPx.Quit(-1);
          }
        }
        fsoUndoLog.ReadLine();
        break;
      default:
        fsoUndoLog.Close();
        PPx.SetPopLineMessage('Do Not!!');
        PPx.Quit(-1);
        break;
    }
    PPx.Execute('*linemessage Dist: ' + result[1] + '%bnSend: ' + result[2]);
  } while (!fsoUndoLog.AtEndOfStream);
  fsoUndoLog.Close();
  PPx.Execute('*file !Undo -min -nocount' + cmd);
  break;
}
