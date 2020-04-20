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
      readLine = fsoUndoLog.ReadLine().replace(/.*\t(.*)/, `Move\t$1\n ->\t${readLine}\n`, 'i');
      result = result + readLine;
    }
    fsoUndoLog.Close();
    // 置換結果を書き出してutf16leで上書きする
    fsoUndoLog = fso.OpenTextFile(logFile, 2, true, -1);
    fsoUndoLog.Write(result);
    fsoUndoLog.Close();
    PPx.Execute(`%On *ppb -c nkf -w16 -Lw --in-place ${logFile}`);
  }
  break;
case 'undo':
  {
    let cmd = '';
    fsoUndoLog = fso.OpenTextFile(logFile, 1, false, -1);
    PPx.SetPopLineMessage('UnDo!');
    do {
      const str = (() => {
        try {
          return fsoUndoLog.ReadLine();
        } catch (e) {
          // ファイルが空なら中止
          (typeof fsoUndoLog.ReadLine === 'undefined')
            ? PPx.SetPopLineMessage('no result.')
            : PPx.Echo(e + '\n' + str);
          fsoUndoLog.Close();
          PPx.Quit(-1);
        }
      })();
      // UNDOログを置換
      result = str.replace(/.*\t(.*)/, '$1 << ', 'i');
      result = result + fsoUndoLog.ReadLine().replace(/.*\t(.*)/, '$1\n', 'i');
      switch (str.slice(0,4)) {
      case 'Move':
        cmd = '-compcmd *script %\'scr\'%\\undo.js,redo';
        break;
      case 'Back':
        {
          const cDir = PPx.Extract('%FDN%\\');
          for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
            if (PPx.Entry(i).state != 1 && (str.replace(/Backup\t(.*)/, '$1' ) == cDir + PPx.Entry(i).Name)) {
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
      PPx.SetPopLineMessage(result);
    } while (!fsoUndoLog.AtEndOfStream);
    fsoUndoLog.Close();
    PPx.Execute(`*file !Undo -min -nocount ${cmd}`);
  }
  break;
}
