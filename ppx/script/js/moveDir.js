//!*script
/* 同階層の隣合うディレクトリに移動 */
/* 同階層の隣合う同じ拡張子の仮想ディレクトリに移動 */
//
// PPx.Arguments(0) = 0:preview|1:next
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html

var argAction = (!PPx.Arguments.length) ? 0 : PPx.Arguments(0)|0;
var wd = PPx.Extract('%FDVN');
var current = (function (v) {
  wd.replace(/^(.*)\\((.*\.)?(?!$)(.*))/, function (match, p1, p2, p3, p4) {
    v = {
      pwd:  p1,
      name: p2,
      ext:  p4.toLowerCase()
    };
    return;
  });
  return v;
}());

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoWD;          // current_directory
var fsoPWD;         // parent_directory
var list = [];      // directory_list
var add_list = {};  // function
var e;              // enumerator

switch (PPx.DirectoryType) {
  case 0:
    break;
  case 1:
    fsoWD = fso.GetFolder(wd);
    fsoPWD = fsoWD.ParentFolder;

    // 親ディレクトリがルートなら終了
    if (fsoWD.IsRootFolder) {
      PPx.SetPopLineMessage('!"<<root>>');
      PPx.Quit(1);
    }

    e = new Enumerator(fsoPWD.SubFolders);

    /* 属性を考慮してリストに追加 */
    add_list = function () {
      var fsoTPath = fso.GetFolder(fso.BuildPath(fsoPWD.Path, e.item().Name));

      if (fsoTPath.Attributes <= 17) { list.push(e.item().Name); }
    };
    break;
  case 4:
  case 63:
  case 64:
  case 96:
    fsoPWD = fso.GetFolder(current.pwd);

    e = new Enumerator(fsoPWD.Files);

    /* 拡張子を考慮してリストに追加 */
    add_list = function () {
      var fsoTPath = fso.GetExtensionName(fso.BuildPath(fsoPWD.Path, e.item().Name)).toLowerCase();

      if (fsoTPath === current.ext) { list.push(e.item().Name); }
    };
    break;
  default:
    PPx.SetPopLineMessage('!"Not supported.');
    PPx.Quit(1);
    break;
}

(argAction === 0)
  ? MovePath(-1, 1, 'top')
  : MovePath(1, -1, 'bottom');

/* パス移動を実行する関数 */
function MovePath(valA, valB, termMessage) {
  // 親ディレクトリからリストを取得
  for (e.moveFirst(); !e.atEnd(); e.moveNext()) { add_list(); }

  // リストを名前順でソート
  list.sort(function (a, b) { return (a.toLowerCase() < b.toLowerCase()) ? valA : valB; });

  for (var i = list.length; i--;) { if (list[i] === current.name) { break; } }

  // 対象エントリ名を取得
  var tEntry = list[Math.max(i - 1, 0)];

  if (list[i - 1] !== undefined) {
    PPx.Execute('*jumppath "' + fso.BuildPath(fsoPWD.Path, tEntry) + '"');
    // 端ならメッセージを表示
    if (list[i - 2] === undefined) { PPx.SetPopLineMessage('!"<' + termMessage + '>'); }
  }
}
