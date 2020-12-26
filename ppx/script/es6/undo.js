//!*script
/* undo,redo */
// PPx.Arguments(0)=無:undo|他:redo
'use strict';
const arg = (() => {
  try {
    return (!PPx.Arguments.length) ? 'undo' : 'redo';
  } catch (e) {
    PPx.Echo(e);
    PPx.Quit(-1);
  }
})();

const fso = PPx.CreateObject('Scripting.FileSystemObject');
// 保険。X_saveはフルパスが望ましい
const xSave = PPx.Extract('%*getcust(X_save)');
const logFile = (xSave.search(':') === -1)
  ? PPx.Extract(`%0%\\${xSave}%\\PPXUNDO.LOG`)
  : PPx.Extract(`${xSave}%\\PPXUNDO.LOG`);
let fsoUndoLog;
let result = '';

switch (arg) {
// ReDo(Move,RenameのUnDoを処理)
// ディレクトリは対象外
case 'redo':
  {
    let readLine;
    fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);
    while (!fsoUndoLog.AtEndOfStream) {
      readLine = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i');
      readLine = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, `Move\t$1\u000D\u000A ->\t${readLine}\u000D\u000A`, 'i');
      result = result + readLine;
    }
    fsoUndoLog.Close();
    // 置換結果を書き出してutf16leで上書きする
    fsoUndoLog = fso.OpenTextFile(logFile, 2, true, -1);
    fsoUndoLog.Write(result);
    fsoUndoLog.Close();
  }
  break;
case 'undo':
  {
    let cmd = '';
    fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);
    PPx.SetPopLineMessage('UnDo!');
    do {
      // UNDOログを置換
      const result = [];
      try {
        fsoUndoLog.ReadLine().replace(/(.*)\t(.*)/, (match, p1, p2) => {
          result.push(p1, p2);
        });
        result.push(fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i'));
      } catch (e) {
        // ファイルが空なら中止
        (typeof fsoUndoLog.ReadLine === 'undefined')
          ? PPx.SetPopLineMessage('Not Exist.')
          : PPx.Echo(e);
        fsoUndoLog.Close();
        PPx.Quit(-1);
      }
      switch (result[0]) {
      case 'Move':
        cmd = '-compcmd *script %\'scr\'%\\undo.js,redo';
        break;
      case 'Back':
        {
          const cDir = PPx.Extract('%FDN%\\');
          for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
            if (PPx.Entry(i).state != 1 && (result[0].replace(/Backup\t(.*)/, '$1' ) == cDir + PPx.Entry(i).Name)) {
              PPx.SetPopLineMessage('Do Not!');
              fsoUndoLog.Close();
              PPx.Quit(-1);
            }
          }
          fsoUndoLog.ReadLine();
        }
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


