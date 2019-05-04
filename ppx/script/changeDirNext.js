//!*script
// 同階層の隣のディレクトリに移動
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
// 親ディレクトリの実態がなければ終了
if(PPx.DirectoryType != 1) PPx.Quit(1);

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var cDir = PPx.Extract('%FDN');
var currentDir = fso.GetFolder(cDir);
// 親ディレクトリがルートorサブディレクトリがなければ終了
if(currentDir.IsRootFolder || currentDir.ParentFolder.SubFolders.count == 1){
  PPx.SetPopLineMessage('!"サブディレクトリがありません');
  PPx.Quit(1);
}
// 同階層のディレクトリのリストを取得
var e = new Enumerator(currentDir.ParentFolder.SubFolders);
var flds = new Array();
for(e.moveFirst(); !e.atEnd(); e.moveNext()){
  //ディレクトリ属性を考慮してリストに追加
  var en = fso.GetFolder(fso.BuildPath(currentDir.ParentFolder.Path, e.item().Name));
  if (en.Attributes <= 17) flds.push(e.item().Name);
}
// 名前順でソート
flds.sort(function(a, b){return a.toLowerCase() < b.toLowerCase()? 1: -1;});
for(var item in flds){
  if(flds[item] == currentDir.Name)
    break;
}
// 次のディレクトリを取得
var nextDir = flds[Math.max(item - 1, 0)];
// 最終ディレクトリならメッセージを表示
if(flds[item - 2] == null) PPx.SetPopLineMessage('!">>bottom');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(cDir), nextDir) + '"');
