//!*script
// 同階層の隣のディレクトリに移動
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
if(PPx.DirectoryType != 1) PPx.Quit(1);

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fn = PPx.Extract('%FDN');
var currentDir = fso.GetFolder(fn);
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
for(var i = 0, l = flds.length; i < l; i++){
  if(flds[i] == currentDir.Name)
    break;
}
// 次のディレクトリを取得
var nextDir = flds[Math.min(i + 1, l - 1)];
// 最終ディレクトリ
if(flds[i + 2] == undefined) PPx.SetPopLineMessage('!">>end');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(fn), nextDir) + '"');

/*
  for(var item in flds){
  if(flds[item] == currentDir.Name)
    break;
}
var nextDir = flds[Math.min(item + 1,flds.length)];
if(flds[item + 2] == undefined) PPx.SetPopLineMessage('!">>end');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(fn), nextDir) + '"');
// ↑だと、item + 1 がうまく動かない理由がわからません
  */