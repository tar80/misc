//!*script
/* undo,redo */
// PPx.Arguments(0)=無:undo|他:redo

'use strict';

const arg = (() => { return (!PPx.Arguments.length) ? 'undo' : 'redo'; })();
// 保険。X_saveはフルパスが望ましい
const xSave = PPx.Extract('%*getcust(X_save)');
const logFile = (xSave.search(':') === -1)
  ? PPx.Extract(`%0${xSave}%\\PPXUNDO.LOG`)
  : PPx.Extract(`${xSave}%\\PPXUNDO.LOG`);
const fso = PPx.CreateObject('Scripting.FileSystemObject');
let fsoUndoLog;

switch (arg) {
// ReDo(Move,RenameのUnDoを処理)
// ディレクトリは対象外
case 'redo':
  {
    let result = '';
    let readLine;
    fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);

    while (!fsoUndoLog.AtEndOfStream) {
      readLine = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i');
      readLine = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, `Move\t$1\u000D\u000A ->\t${readLine}\u000D\u000A`, 'i');
      result = result + readLine;
    }

    // 置換結果を書き出してutf16leで上書きする
    fsoUndoLog = fso.OpenTextFile(logFile, 2, true, -1);
    fsoUndoLog.Write(result);
  }
  break;
case 'undo':
  {
    PPx.SetPopLineMessage('UnDo!');

    const result = [];
    let cmd = '';

    fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);

    if (fsoUndoLog.AtEndOfLine) {
      fsoUndoLog.Close();
      PPx.SetPopLineMessage('!"empty.');
      PPx.Quit(1);
    }

    // UNDOログを置換
    do {
      fsoUndoLog.ReadLine().replace(/(.*)\t(.*)/, (match, p1, p2) => { result.push(p1, p2); });

      result.push(fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i'));

      switch (result[0]) {
      case 'Move':
        cmd = '-compcmd *script %\'scr\'%\\undo.js,redo';
        break;
      case 'Back':
        {
          const cDir = PPx.Extract('%FDN%\\');
          const l = PPx.EntryDisplayCount;

          for (let i = 0; i < l; i++) {
            let entry = PPx.Entry(i);
            if (entry.state != 1 && (result[0].replace(/Backup\t(.*)/, '$1' ) == cDir + entry.Name)) {
              PPx.SetPopLineMessage('Do Not!');
              fsoUndoLog.Close();
              PPx.Quit(-1);
            }
          }
          fsoUndoLog.ReadLine();
        }
        fsoUndoLog.Close();
        break;
      default:
        fsoUndoLog.Close();

        PPx.SetPopLineMessage('Do Not!!');
        PPx.Quit(-1);
        break;
      }
      PPx.Execute(`*linemessage Dist: ${result[1]}%bnSend: ${result[2]}`);
    } while (!fsoUndoLog.AtEndOfStream);

    fsoUndoLog.Close();

    PPx.Execute(`*file !Undo -min -nocount ${cmd}`);
  }
  break;
}

