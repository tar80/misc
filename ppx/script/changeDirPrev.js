//!*script
// 同階層の隣のディレクトリに移動
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
// 親フォルダの実態がなければ終了
if(PPx.DirectoryType != 1) PPx.Quit(1);

var fso = PPx.CreateObject("Scripting.FileSystemObject");
var fn = PPx.Extract("%FDN");
var currentDir = fso.GetFolder(fn);

// 親フォルダがルートorサブフォルダがなければ終了
if(currentDir.IsRootFolder || currentDir.ParentFolder.SubFolders.count == 1){
  PPx.SetPopLineMessage("サブフォルダがありません");
  PPx.Quit(1);
}
// 同階層のフォルダのリストを取得
e = new Enumerator(currentDir.ParentFolder.SubFolders);
flds = new Array();
for(e.moveFirst(); !e.atEnd(); e.moveNext()){
  //フォルダ属性を考慮してリストに追加
  fuga = fso.GetFolder(fso.BuildPath(currentDir.ParentFolder.Path, e.item().Name));
  if (fuga.Attributes <= 17) flds.push(e.item().Name);
}
// 名前順でソート
flds.sort(function(a, b){return a.toLowerCase() > b.toLowerCase()?1:-1;});
for(i = 0; i < flds.length; i++){
  if(flds[i] == currentDir.Name)
    break;
}
// 前のフォルダを取得
prevDir = flds[Math.max(i-1, 0)];
// 最初のフォルダ
if(flds[i-2] == null) PPx.SetPopLineMessage('|<');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(fn), prevDir) + '"');
