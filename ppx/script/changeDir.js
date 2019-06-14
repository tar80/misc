//!*script
// 同階層の次(引数があれば前)のディレクトリに移動
// 親ディレクトリの実態がなければ終了
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
PPx.DirectoryType == 1 || PPx.Quit(1);

var fs = PPx.CreateObject('Scripting.FileSystemObject');
var cDir = PPx.Extract('%FDN');
var currentDir = fs.GetFolder(cDir);
// 親ディレクトリがルートorサブディレクトリがなければ終了
if(currentDir.IsRootFolder || currentDir.ParentFolder.SubFolders.count == 1){
  PPx.SetPopLineMessage('!"サブディレクトリがありません');
  PPx.Quit(1);
}
PPx.Arguments.length? change_dir(-1,1,'top'): change_dir(1,-1,'bottom');
function change_dir(valA,valB,termMessage){
  // 同階層のディレクトリのリストを取得
  var subDir = new Enumerator(currentDir.ParentFolder.SubFolders);
  var list = new Array();
  for(subDir.moveFirst(); !subDir.atEnd(); subDir.moveNext()){
    //ディレクトリ属性を考慮してリストに追加
    var subDirName = fs.GetFolder(fs.BuildPath(currentDir.ParentFolder.Path, subDir.item().Name));
    if (subDirName.Attributes <= 17) list.push(subDir.item().Name);
  }
  // 名前順でソート
  list.sort(function(a, b){return a.toLowerCase() < b.toLowerCase()? valA: valB;});
  for(var item in list){
    if(list[item] == currentDir.Name)
      break;
  }
  // 対象ディレクトリを取得
  var tDir = list[Math.max(item - 1, 0)|0];
  // 対象がなければメッセージを表示
  if(list[item - 2] == null) PPx.SetPopLineMessage('!">>' + termMessage);
  PPx.Execute('*jumppath "' + fs.BuildPath(fs.GetParentFolderName(cDir), tDir) + '"');
}
