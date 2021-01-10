﻿//!*script
/* undo,redo */
//
// PPx.Arguments(0)=無:undo|他:redo

var arg = (!PPx.Arguments.length) ? 'undo' : 'redo';
// 保険。X_saveはフルパスが望ましい
var xSave = PPx.Extract('%*getcust(X_save)');

var logFile = (xSave.search(':') === -1)
  ? PPx.Extract('%0%\\' + xSave + '%\\PPXUNDO.LOG')
  : PPx.Extract(xSave + '%\\PPXUNDO.LOG');

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoUndoLog;

switch (arg) {
// ReDo(Move,RenameのUnDoを処理)
// ディレクトリは対象外
case 'redo':
  var result = '';
  var readline;

  fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);

  while (!fsoUndoLog.AtEndOfStream) {
    readline = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i');
    readline = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, 'Move\t$1\u000D\u000A ->\t' + readline + '\u000D\u000A', 'i');
    result = result + readline;
  }

  // 置換結果を書き出してutf16leで上書きする
  fsoUndoLog = fso.OpenTextFile(logFile, 2, true, -1);
  fsoUndoLog.Write(result);
  break;
case 'undo':
  PPx.SetPopLineMessage('UnDo!');

  var result = [];
  var cmd = '';

  fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);

  if (fsoUndoLog.AtEndOfLine) {
      fsoUndoLog.Close();
      PPx.SetPopLineMessage('!"empty.');
      PPx.Quit(1);
    }

    // UNDOログを置換
  do {
      fsoUndoLog.ReadLine().replace(/(.*)\t(.*)/, function (match, p1, p2) {
        result.push(p1, p2);
      });

      result.push(fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i'));

    switch (result[0]) {
    case 'Move':
      cmd = '-compcmd *script %\'scr\'%\\undo.js,redo';
      break;
    case 'Back':
      var cDir = PPx.Extract('%FDN%\\');
      for (var i = 0, l = PPx.EntryDisplayCount; i < l; i++) {
        if (PPx.Entry(i).state != 1 && (result[0].replace(/Backup\t(.*)/, '$1' ) == cDir + PPx.Entry(i).Name)) {
          PPx.SetPopLineMessage('Do Not!');
          fsoUndoLog.Close();
          PPx.Quit(-1);
        }
      }
      fsoUndoLog.ReadLine();
      fsoUndoLog.Close();
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

