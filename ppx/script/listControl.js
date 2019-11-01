//!*script
/* リストファイルの読み書き */
// PPx.Arguments(0)=case
// %si"ppp" = 処理元ディレクトリ

/* エントリをリストに書き出す関数 */
var write_mark_path = function () {
  var cDir = (PPx.DirectoryType != 4 ? PPx.Extract('%FDN%\\') : '');
  // マークの有無で処理を分岐
  if (!PPx.EntryMarkCount)
    fs_tList.WriteLine(cDir + PPx.EntryName);
  else {
    for (var i = 0, l = PPx.Entry.Count; i < l; i = (i+1)|0) {
      if (PPx.Entry(i).Mark == 1) {
        fs_tList.WriteLine(cDir + PPx.Entry(i).Name);
        PPx.Entry(i).Mark = 0;
      };
    };
  };
  fs_tList.Close();
};

var fs = PPx.CreateObject('Scripting.FileSystemObject');
try {var arg = PPx.Arguments(0)} catch (e) {var arg = ''};
// command別の処理
switch (arg) {
    // git関連のリザルト
  case 'git':
    var fs_tList = fs.OpenTextFile(PPx.Extract('%si"ppp"'), 2, true, -1);
    fs_tList.WriteLine(';ListFile');
    fs_tList.WriteLine(';Base=' + PPx.Extract('%\'repo\'') + '|1');
    fs_tList.Close();
    break;
    // 新規リストファイル
  case 'listfile':
    var fs_tList = fs.OpenTextFile(PPx.Extract('%si"ppp"'), 2, true, -1);
    fs_tList.WriteLine(';ListFile');
    write_mark_path();
    break;
    // ReDo(MoveのUnDoのみ処理)
  case 'redo':
    var tFile = PPx.Extract('%0%\\%*getcust(X_save)%\\PPXUNDO.LOG');
    var fs_undoLog = fs.OpenTextFile(PPx.Extract(tFile), 1, false, -1);
    var result = '';
    while (!fs_undoLog.AtEndOfStream) {
      var str = fs_undoLog.ReadLine().replace(/.*\t(.*)/, '$1', 'i');
      var form = fs_undoLog.ReadLine().replace(/.*\t(.*)/, 'Move\t$1\n ->\t' + str + '\n', 'i');
      var result = result + form;
    }
    fs_undoLog.Close();
    var fs_undoLog = fs.OpenTextFile(PPx.Extract(tFile), 2, true, -1);
    fs_undoLog.Write(result);
    PPx.Execute('%On *ppb -c nkf -w16 -Lw --in-place ' + tFile);
    break;
    // PPcのUNDO履歴
  case 'undo':
    var tFile = PPx.Extract('%0%\\%*getcust(X_save)%\\PPXUNDO.LOG');
    var fs_undoLog = fs.OpenTextFile(PPx.Extract(tFile), 1, false, -1);
    var cmd = '';
    PPx.SetPopLineMessage('UnDo!');
    // UNDOログを置換
    while (!fs_undoLog.AtEndOfStream) {
      var str = fs_undoLog.ReadLine();
      var result = str.replace(/.*\t(.*)/, '$1 << ', 'i');
      var result = result + fs_undoLog.ReadLine().replace(/.*\t(.*)/, '$1\n', 'i');
      if (str.slice(0,4) == 'Move')
        cmd = ' /compcmd *JSCRIPT "listControl.js,redo"';
      else
        fs_undoLog.ReadLine();
      PPx.SetPopLineMessage(result);
    };
    fs_undoLog.Close();
    PPx.Execute('*file !Undo /min /nocount' + cmd);
    break;
  case 'memo':
    var tList = (PPx.DirectoryType == 4 ? '%FVD' : '%0\\list\\worklist.xlf');
    var fs_tList = fs.OpenTextFile(PPx.Extract(tList), 8, true, -1);
    var str = PPx.Extract('"%*now",T:%si"ppp"');
    fs_tList.WriteLine(str);
    fs_tList.Close();
    break;
    // 指定されたリストに追記
  default:
    var fs_tList = fs.OpenTextFile(PPx.Extract('%si"ppp"'), 8, true, -1);
    write_mark_path();
    break;
};
// // 書き込み
// var as = new ActiveXObject('ADODB.Stream');
// function list_write(form, tFile){
//   as.type = 2;
//   as.charset = enc;
//   as.open();
//   as.writeText(form);
//   as.saveToFile(tFile, 2);
//   as.close();
// }
// // 読み込み
// function list_load(tFile){
//   as.type = 2;
//   as.charset = enc;
//   as.open();
//   as.loadFromFile(tFile);
// }
