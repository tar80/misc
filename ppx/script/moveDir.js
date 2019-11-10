//!*script
/* 同階層の隣合うディレクトリに移動 */
/* 同階層の隣合う同じ拡張子の仮想ディレクトリに移動 */
// PPx.Arguments(0)=1:preview|無:next
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html

var fs = PPx.CreateObject('Scripting.FileSystemObject');
var current = PPx.Extract('%FDVN');
var vCurrent;
var dirName;
var ext;
current.replace(/^(.*)\\((.*\.)?(?!$)(.*))/, rep);
/* 置換した文字列を取得する関数 */
function rep(match, p1, p2, p3, p4) {
  vCurrent = p1;
  dirName  = p2;
  ext      = p4.toLowerCase();
};
var list = [];
switch (PPx.DirectoryType) {
  case 1:
    var cDir = current;
    var fs_cDir = fs.GetFolder(cDir);
    var fs_parentDir = fs_cDir.ParentFolder
    // 親ディレクトリがルートなら終了
    if (fs_cDir.IsRootFolder) {
      PPx.SetPopLineMessage('!">>root');
      PPx.Quit(1);
    };
    var e = new Enumerator(fs_parentDir.SubFolders);
    /* 属性を考慮してリストに追加 */
    var add_list = function() {
      var fs_tPath = fs.GetFolder(fs.BuildPath(fs_parentDir.Path, e.item().Name));
      if (fs_tPath.Attributes <= 17)
        list.push(e.item().Name);
    };
    break;
  case 4:
  case 63:
  case 64:
  case 96:
    var cDir = vCurrent;
    var fs_parentDir = fs.GetFolder(cDir);
    var e = new Enumerator(fs_parentDir.Files);
    /* 拡張子を考慮してリストに追加 */
    var add_list = function() {
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
(PPx.Arguments.length)
  ? move_path(-1, 1, 'top')
  : move_path(1, -1, 'bottom');

/* パス移動を実行する関数 */
function move_path(valA, valB, termMessage) {
  // 親ディレクトリからリストを取得
  for (e.moveFirst(); !e.atEnd(); e.moveNext()) {
    add_list();
  };
  // リストを名前順でソート
  list.sort(function (a, b) {
    return (a.toLowerCase() < b.toLowerCase())
      ? valA
      : valB;
    return 0;
  });
  for (var item in list) {
    if (list[item] == dirName)
      break;
  };
  // 対象エントリ名を取得
  var tEntry = list[Math.max(item - 1, 0)|0];
  // 端ならメッセージを表示
  if (list[item - 2] === undefined)
    PPx.SetPopLineMessage('!">>' + termMessage);
  if (list[item - 1] !== undefined)
    PPx.Execute('*jumppath "' + fs.BuildPath(fs_parentDir.Path, tEntry) + '"');
  else
    PPx.Quit(1);
};
