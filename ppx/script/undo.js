//!*script
/* undo,redo */
// PPx.Arguments(0)=case [無:undo, 他:redo]

try {
  var arg = (!PPx.Arguments.length) ? 'undo' : 'redo';
} catch (e) {
  PPx.Echo(e);
  PPx.Quit(-1);
};

var fs = PPx.CreateObject('Scripting.FileSystemObject');
// 保険。X_saveはフルパスが望ましい
var xSave = PPx.Extract('%*getcust(X_save)');
var logFile = (xSave.search(':') === -1)
  ? PPx.Extract('%0%\\' + xSave + '%\\PPXUNDO.LOG')
  : PPx.Extract(xSave + '%\\PPXUNDO.LOG');
var xSave;

switch (arg) {
  // ReDo(Move,RenameのUnDoを処理)
  // PPxの仕様上?ディレクトリは対象外
  case 'redo':
    var fs_undoLog = fs.OpenTextFile(logFile, 1, false, -1);
    while (!fs_undoLog.AtEndOfStream) {
      var result = fs_undoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i');
      result = fs_undoLog.ReadLine().replace(/.*\t(.*)/, 'Move\t$1\n ->\t' + result + '\n', 'i');
    }
    fs_undoLog.Close();
    // 置換結果を書き出してutf16leで上書きする
    var fs_undoLog = fs.OpenTextFile(logFile, 2, true, -1);
    fs_undoLog.Write(result);
    fs_undoLog.Close();
    PPx.Execute('%On *ppb -c nkf -w16 -Lw --in-place ' + logFile);
    break;
  case 'undo':
    var fs_undoLog = fs.OpenTextFile(logFile, 1, false, -1);
    var cmd = '';
    PPx.SetPopLineMessage('UnDo!');
    do {
      try {
        var str = fs_undoLog.ReadLine();
      } catch (e) {
        // ファイルが空なら中止
        (typeof str === 'undefined')
          ? PPx.SetPopLineMessage('no result.')
          : PPx.Echo(e + '\n' + str);
        fs_undoLog.Close();
        PPx.Quit(-1);
      };
      // UNDOログを置換
      var result = str.replace(/.*\t(.*)/, '$1 << ', 'i');
      result = result + fs_undoLog.ReadLine().replace(/.*\t(.*)/, '$1\n', 'i');
      switch (str.slice(0,4)) {
        case 'Move':
          cmd = ' -compcmd *JSCRIPT "undo.js,redo"';
          break;
        case 'Back':
          var cDir = PPx.Extract('%FDN%\\');
          var count = PPx.EntryDisplayCount;
          for (i = 0; i < count; i = (i+1)|0) {
            if (PPx.Entry(i).state != 1 && str.replace(/Backup\t(.*)/, '$1' ) == cDir + PPx.Entry(i).Name) {
              PPx.SetPopLineMessage('Do Not!!');
              fs_undoLog.Close();
              PPx.Quit(-1);
            };
          };
          fs_undoLog.ReadLine();
          break;
        default:
          fs_undoLog.Close();
          PPx.SetPopLineMessage('Do Not!!');
          PPx.Quit(-1);
          break;
      };
      PPx.SetPopLineMessage(result);
    } while (!fs_undoLog.AtEndOfStream);
    fs_undoLog.Close();
    PPx.Execute('*file !Undo -min -nocount' + cmd);
    break;
};
