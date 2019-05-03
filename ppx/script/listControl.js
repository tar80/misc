//!*script
// 文字コードを指定してリストを作成
// 引数:PPx.Arguments([0:charset, 1:command])
// %si"ppp" = 処理元ディレクトリ
var as = new ActiveXObject('ADODB.Stream');
var arg = PPx.Arguments.Length == 2? PPx.Arguments(1): "listfile";
// command別の処理
switch(arg){
    // git関連のリザルト
  case 'git':
    list_write(
      '\;Listfile\n\;Base=' + PPx.Extract('%\'repo\'') + '|1'
      ,PPx.Extract('%*regexp("%0","s/\\\\/\\\\\\\\/g")') + '\\list\\Gitresult.xlf'
    );
    break;
    // 新規リストファイル
  case 'listfile':
    list_write('\;listfile\n',PPx.Extract('%si"ppp"'));
    write_mark_path(PPx.Extract('%si"ppp"'));
    break;
    // ReDo 文字コードの問題でうまく動かない
  // case 'redo':
  //   var undoLog = PPx.Extract('%0%\\%*getcust(X_save)%\\PPXUNDO.LOG');
  //   list_load(undoLog);
  //   var list = "";
  //   for(i = 0; i < as.size / 30;i++){
  //     as.readText(-2).replace(/.*\t(.*)/, '','i');
  //     target = as.readText(-2).replace(/.*\t(.*)/, '$1','i');
  //     unite = as.readText(-2).replace(/.*\t(.*)/, 'Backup\t' + target + '\n ->\t$1\nDelete\t' + target + '\n','i');
  //     list = list + unite;
  //   }
  //   as.close();
  //   list_write(list,undoLog);
 break;
    // PPcのUNDO履歴
  case 'undo':
    var undoLog = PPx.Extract('%0%\\%*getcust(X_save)%\\PPXUNDO.LOG');
    list_load(undoLog);
    // ログを置換
    PPx.SetPopLineMessage('UnDo!');
    for(i = 0; i < as.size / 30;i++){
      str = as.readText(-2).replace(/.*\t(.*)/, '$1 < ','i');
      str = str + as.readText(-2).replace(/.*\t(.*)/, '($1)\n','i');
      as.readText(-2);
      PPx.SetPopLineMessage(str);
    }
    PPx.Execute('*file !Undo /min /nocount');
    // PPx.Execute('*file !Undo /min /nocount /compcmd *JSCRIPT "listControl.js,utf-16,redo"');
    break;
    // 追記
  default:
    write_mark_path(PPx.Extract('%si"ppp"'));
    break;
}
// 書き込み
function list_write(form, tFile){
  as.type = 2;
  as.charset = PPx.Arguments.Length? PPx.Arguments(0): 'utf-16';
  as.open();
  as.writeText(form);
  as.saveToFile(tFile, 2);
  as.close();
}
// 読み込み
function list_load(tFile){
  as.type = 2;
  as.charset = PPx.Arguments.Length? PPx.Arguments(0): 'utf-16';
  as.open();
  as.loadFromFile(tFile);
}
// マークパス書き込み
function write_mark_path(tFile){
  var Count = PPx.Entry.Count;
  var cDir = PPx.DirectoryType != 4? PPx.Extract('%FDN%\\'): "";
  // マークがなければカーソルのあるファイルをマークする
  if(!PPx.EntryMarkCount) PPx.EntryMark = 1;
  as.mode = 3;    // 読み書き権限
  as.type = 2;    // テキストデータとして扱う
  as.charset = PPx.Arguments.Length? PPx.Arguments(0): 'utf-16';
  as.open();
  as.loadFromFile(tFile);
  as.position =as.size;
  for(var i = 0; i < Count; i++){
    if(PPx.Entry(i).Mark == 1){
      as.writeText(cDir + PPx.Entry(i).Name + '\n');
    }
  }
  as.saveToFile(tFile, 2);
  as.close();
}
