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

const fs = PPx.CreateObject('Scripting.FileSystemObject');
// 保険。X_saveはフルパスが望ましい
const xSave = PPx.Extract('%*getcust(X_save)');
const logFile = (xSave.search(':') === -1)
  ? PPx.Extract(`%0%\\${xSave}%\\PPXUNDO.LOG`)
  : PPx.Extract(`${xSave}%\\PPXUNDO.LOG`);
let fs_undoLog;
let result = '';

switch (arg) {
// ReDo(Move,RenameのUnDoを処理)
// ディレクトリは対象外
case 'redo':
  {
    let readLine;
    fs_undoLog = fs.OpenTextFile(logFile, 1, false, -1);
    while (!fs_undoLog.AtEndOfStream) {
      readLine = fs_undoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i');
      readLine = fs_undoLog.ReadLine().replace(/.*\t(.*)/, `Move\t$1\n ->\t${readLine}\n`, 'i');
      result = result + readLine;
    }
    fs_undoLog.Close();
    // 置換結果を書き出してutf16leで上書きする
    fs_undoLog = fs.OpenTextFile(logFile, 2, true, -1);
    fs_undoLog.Write(result);
    fs_undoLog.Close();
    PPx.Execute(`%On *ppb -c nkf -w16 -Lw --in-place ${logFile}`);
  }
  break;
case 'undo':
  {
    let cmd = '';
    fs_undoLog = fs.OpenTextFile(logFile, 1, false, -1);
    PPx.SetPopLineMessage('UnDo!');
    do {
      const str = (() => {
        try {
          return fs_undoLog.ReadLine();
        } catch (e) {
          // ファイルが空なら中止
          (typeof str === 'undefined')
            ? PPx.SetPopLineMessage('no result.')
            : PPx.Echo(e + '\n' + str);
          fs_undoLog.Close();
          PPx.Quit(-1);
        }
      })();
      // UNDOログを置換
      result = str.replace(/.*\t(.*)/, '$1 << ', 'i');
      result = result + fs_undoLog.ReadLine().replace(/.*\t(.*)/, '$1\n', 'i');
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
              fs_undoLog.Close();
              PPx.Quit(-1);
            }
          }
          fs_undoLog.ReadLine();
        }
        break;
      default:
        fs_undoLog.Close();
        PPx.SetPopLineMessage('Do Not!!');
        PPx.Quit(-1);
        break;
      }
      PPx.SetPopLineMessage(result);
    } while (!fs_undoLog.AtEndOfStream);
    fs_undoLog.Close();
    PPx.Execute(`*file !Undo -min -nocount ${cmd}`);
  }
  break;
}
