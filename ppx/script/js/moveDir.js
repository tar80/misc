﻿//!*script
/* 同階層の隣合うディレクトリに移動 */
/* 同階層の隣合う同じ拡張子の仮想ディレクトリに移動 */
//
// PPx.Arguments() = (0)有:preview, 無:next
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html

var current = PPx.Extract('%FDVN');
var cd = {};

current.replace(/^(.*)\\((.*\.)?(?!$)(.*))/, function (match, p1, p2, p3, p4) {
  cd = {
    // path: match + '\\',
    par:  p1,
    name: p2,
    ext:  p4.toLowerCase()
  };
  return cd;
});

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoCdPath;      // current_directory
var fsoParentPath;  // parent_directory
var list = [];      // directory_list
var add_list = {};  // function
var e;              // enumerator

switch (PPx.DirectoryType) {
  case 0:
    break;
  case 1:
    fsoCdPath = fso.GetFolder(current);
    fsoParentPath = fsoCdPath.ParentFolder;

    // 親ディレクトリがルートなら終了
    if (fsoCdPath.IsRootFolder) {
      PPx.SetPopLineMessage('!">>root');
      PPx.Quit(1);
    }

    e = new Enumerator(fsoParentPath.SubFolders);

    /* 属性を考慮してリストに追加 */
    add_list = function() {
      var fsoTPath = fso.GetFolder(fso.BuildPath(fsoParentPath.Path, e.item().Name));

      if (fsoTPath.Attributes <= 17) { list.push(e.item().Name); }
    };
    break;
  case 4:
  case 63:
  case 64:
  case 96:
    fsoParentPath = fso.GetFolder(cd.par);

    e = new Enumerator(fsoParentPath.Files);

    /* 拡張子を考慮してリストに追加 */
    add_list = function() {
      var fsoTPath = fso.GetExtensionName(fso.BuildPath(fsoParentPath.Path, e.item().Name)).toLowerCase();

      if (fsoTPath == cd.ext) { list.push(e.item().Name); }
    };
    break;
  default:
    PPx.SetPopLineMessage('!"Not supported.');
    PPx.Quit(1);
    break;
}

(PPx.Arguments.length)
  ? move_path(-1, 1, 'top')
  : move_path(1, -1, 'bottom');

/* パス移動を実行する関数 */
function move_path(valA, valB, termMessage) {
  // 親ディレクトリからリストを取得
  for (e.moveFirst(); !e.atEnd(); e.moveNext()) { add_list(); }

  // リストを名前順でソート
  list.sort(function (a, b) { return (a.toLowerCase() < b.toLowerCase()) ? valA : valB; });

  for (var i = list.length; i--;) { if (list[i] == cd.name) { break; }}

  // 対象エントリ名を取得
  var tEntry = list[Math.max(i - 1, 0)];

  if (list[i - 1] !== undefined) {
    PPx.Execute('*jumppath "' + fso.BuildPath(fsoParentPath.Path, tEntry) + '"');

    // 端ならメッセージを表示
    if (list[i - 2] == undefined) { PPx.SetPopLineMessage('!"<' + termMessage + '>'); }
  }
}
