//!*script
/* 同階層の隣合うディレクトリに移動 */
/* 同階層の同じ拡張子の仮想ディレクトリに移動 */
// PPx.Arguments(0)=1:preview
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html

var fs = PPx.CreateObject('Scripting.FileSystemObject');
var path = PPx.Extract('%FDVN');
var cDir = path.replace(/^(.*)\\.*\.(?!$).*/, '$1');
var fileName = path.replace(/^(.*\\)(?!$)(.*)/, '$2');
var list = [];
switch (PPx.Extract(PPx.DirectoryType)) {
  case '1':
    var currentDir = fs.GetFolder(cDir);
    var parentDir = currentDir.ParentFolder
    // 親ディレクトリがルートorサブディレクトリがなければ終了
    if (currentDir.IsRootFolder || parentDir.SubFolders.count == 1) {
  PPx.SetPopLineMessage('!"サブディレクトリがありません');
      PPx.Quit();
    };
    var e = new Enumerator(parentDir.SubFolders);
    /* 属性を考慮してリストに追加 */
    var get_list = function() {
      var target = fs.GetFolder(fs.BuildPath(parentDir.Path, e.item().Name));
      if (target.Attributes <= 17)
        list.push(e.item().Name);
    };
    PPx.Arguments.length ? change_path(-1, 1, 'top') : change_path(1, -1, 'bottom');
    break;
  case '4':
  case '63':
  case '64':
  case '96':
    var parentDir = fs.GetFolder(cDir);
    var ext = path.replace(/^(.*\.)(?!$)(.*)/, '$2').toLowerCase();
    var e = new Enumerator(parentDir.Files);
    /* 拡張子を考慮してリストに追加 */
    var get_list = function() {
      var target = fs.GetExtensionName(fs.BuildPath(parentDir.Path, e.item().Name)).toLowerCase();
      if (target == ext)
        list.push(e.item().Name);
    };
    PPx.Arguments.length ? change_path(-1, 1, 'top') : change_path(1, -1, 'bottom');
    break;
  default:
      PPx.SetPopLineMessage('!"非対応ディレクトリ');
    break;
};
/* パス移動を実行する関数 */
function change_path(valA, valB, termMessage) {
  // 親ディレクトリからリストを取得
  for (e.moveFirst(); !e.atEnd(); e.moveNext()) {
    get_list();
  };
  // リストを名前順でソート
  list.sort(function (a, b) {
    return (a.toLowerCase() < b.toLowerCase() ? valA : valB);
  });
  for (var item in list) {
    if (list[item] == fileName)
      break;
  };
  // 対象エントリ名を取得
  var tEntry = list[Math.max(item - 1, 0)|0];
  // 端ならメッセージを表示
  if (list[item - 2] == null)
    PPx.SetPopLineMessage('!">>' + termMessage);
  list[item - 1] == null ? PPx.Quit() : PPx.Execute('*jumppath "' + fs.BuildPath(parentDir.Path, tEntry) + '"');
};
