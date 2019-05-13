//!*script
// リストの読み書き
// 引数:PPx.Arguments([0:charset, 1:command])
// %si"ppp" = 処理元ディレクトリ
// var as = new ActiveXObject('ADODB.Stream');
var fs = PPx.CreateObject('Scripting.FileSystemObject');
var arg = PPx.Arguments.Length? PPx.Arguments(0): "";
// var enc = PPx.Arguments(1);
// command別の処理
switch(arg){
    // git関連のリザルト
  case 'git':
    var tList = fs.OpenTextFile(PPx.Extract('%si"ppp"'), 2, true, -1);
    tList.WriteLine(';ListFile');
    tList.WriteLine(';Base=' + PPx.Extract('%\'repo\'') + '|1');
    tList.Close();
    break;
    // 新規リストファイル
  case 'listfile':
    var tList = fs.OpenTextFile(PPx.Extract('%si"ppp"'), 2, true, -1);
    tList.WriteLine(';ListFile');
    write_mark_path();
    break;
    // ReDo MoveのUnDoのみ処理
  case 'redo':
    var tFile = PPx.Extract('%0%\\%*getcust(X_save)%\\PPXUNDO.LOG');
    var undoLog = fs.OpenTextFile(PPx.Extract(tFile), 1, false, -1);
    var result = "";
    while(!undoLog.AtEndOfStream){
      var str = undoLog.ReadLine().replace(/.*\t(.*)/, '$1','i');
      var form = undoLog.ReadLine().replace(/.*\t(.*)/, 'Move\t$1\n ->\t' + str + '\n','i');
      var result = result + form;
    }
    undoLog.Close();
    var undoLog = fs.OpenTextFile(PPx.Extract(tFile), 2, true, -1);
    undoLog.Write(result);
    PPx.Execute('%On *ppb -c nkf -w16 -Lw --in-place ' + tFile);
    break;
    // PPcのUNDO履歴
  case 'undo':
    var tFile = PPx.Extract('%0%\\%*getcust(X_save)%\\PPXUNDO.LOG');
    var undoLog = fs.OpenTextFile(PPx.Extract(tFile), 1, false, -1);
    var cmd = '';
    PPx.SetPopLineMessage('UnDo!');
    // ログを置換
    while(!undoLog.AtEndOfStream){
      var str = undoLog.ReadLine();
      var result = str.replace(/.*\t(.*)/, '$1 < ','i');
      var result = result + undoLog.ReadLine().replace(/.*\t(.*)/, '($1)\n','i');
      if(str.slice(0,4) == 'Move') cmd = ' /compcmd *JSCRIPT "listControl.js,redo"';
      else undoLog.ReadLine();
      PPx.SetPopLineMessage(result);
    }
    undoLog.Close();
    PPx.Execute('*file !Undo /min /nocount' + cmd);
    break;
    // 追記
  default:
    var tList = fs.OpenTextFile(PPx.Extract('%si"ppp"'), 8, true, -1);
    write_mark_path();
    break;
}
// マークパス書き込み
function write_mark_path(){
  var cDir = PPx.DirectoryType != 4? PPx.Extract('%FDN%\\'): "";
  var Count = PPx.Entry.Count;
  // マークがなければカーソルのあるファイルをマークする
  if(!PPx.EntryMarkCount) PPx.EntryMark = 1;
  for(var i = 0; i < Count; i = (i+1)|0){
    if(PPx.Entry(i).Mark == 1){
      tList.WriteLine(cDir + PPx.Entry(i).Name);
      PPx.Entry(i).Mark = 0;
    }
  }
  tList.Close();
}
// // 書き込み
//
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
