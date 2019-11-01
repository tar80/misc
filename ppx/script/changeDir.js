//!*script
/* 同階層の隣合うディレクトリに移動 */
/* 同階層の隣合う同じ拡張子の仮想ディレクトリに移動 */
// PPx.Arguments(0)=1:preview, 無:next
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html

var fs = PPx.CreateObject('Scripting.FileSystemObject');
var path = PPx.Extract('%FDVN');
var cDirName = path.replace(/^(.*\\)(?!$)(.*)/, '$2');
var list = [];
switch (PPx.Extract(PPx.DirectoryType)) {
  case '1':
    var cDir = path;
    var fs_cDir = fs.GetFolder(cDir);
    var fs_parentDir = fs_cDir.ParentFolder
    // 親ディレクトリがルートなら終了
    if (fs_cDir.IsRootFolder) {
      PPx.SetPopLineMessage('!">>root');
      PPx.Quit(1);
    };
    var e = new Enumerator(fs_parentDir.SubFolders);
    /* 属性を考慮してリストに追加 */
    var get_list = function() {
      var fs_tPath = fs.GetFolder(fs.BuildPath(fs_parentDir.Path, e.item().Name));
      if (fs_tPath.Attributes <= 17)
        list.push(e.item().Name);
    };
    break;
  case '4':
  case '63':
  case '64':
  case '96':
    var ext = path.replace(/^(.*\.)(?!$)(.*)/, '$2').toLowerCase();
    var cDir = path.replace(/^(.*)\\.*\.(?!$).*/, '$1');
    var fs_parentDir = fs.GetFolder(cDir);
    var e = new Enumerator(fs_parentDir.Files);
    /* 拡張子を考慮してリストに追加 */
    var get_list = function() {
      var fs_tPath = fs.GetExtensionName(fs.BuildPath(fs_parentDir.Path, e.item().Name)).toLowerCase();
      if (fs_tPath == ext)
        list.push(e.item().Name);
    };
    break;
  default:
      PPx.SetPopLineMessage('!"非対応ディレクトリ');
      PPx.Quit(1);
    break;
};
PPx.Arguments.length ? change_path(-1, 1, 'top')
                     : change_path(1, -1, 'bottom');

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
    if (list[item] == cDirName)
      break;
  };
  // 対象エントリ名を取得
  var tEntry = list[Math.max(item - 1, 0)|0];
  // 端ならメッセージを表示
  if (list[item - 2] == null)
    PPx.SetPopLineMessage('!">>' + termMessage);
  list[item - 1] == null ? PPx.Quit(1)
                         : PPx.Execute('*jumppath "' + fs.BuildPath(fs_parentDir.Path, tEntry) + '"');
};
