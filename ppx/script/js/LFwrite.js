//!*script
/* リストファイルの読み書き */
//
// PPx.Arguments() = [0]case [1]filepath

if (PPx.Arguments.length != 2) {
  PPx.Echo('引数が異常');
  PPx.Quit(-1);
}

var arg = { 'cmd': PPx.Arguments(0), 'path': PPx.Arguments(1) };
var dirType = PPx.DirectoryType;

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoTlist;

// 該当エントリをリストに書き出す
var SaveMarkedEntry = function () {
  var wd = (dirType !== 4) ? PPx.Extract('%FDN%\\') : '';

  // マークの有無で処理を分岐
  if (!PPx.EntryMarkCount) {
    fsoTlist.WriteLine(wd + PPx.EntryName);
  } else {
    for (var i = 0, l = PPx.Entry.Count; i < l; i++) {
      if (PPx.Entry(i).Mark === 1) {
        fsoTlist.WriteLine(wd + PPx.Entry(i).Name);
        PPx.Entry(i).Mark = 0;
      }
    }
  }
};

switch (arg.cmd) {
// git関連のリザルト
  case 'git':
    fsoTlist = fso.OpenTextFile(arg.path, 2, true, -1);
    fsoTlist.WriteLine(';ListFile');
    fsoTlist.WriteLine(';Base=' + PPx.Extract('%\'myrepo\'') + '|1');
    break;
    // 新規リストファイル
  case 'new':
    fsoTlist = fso.OpenTextFile(arg.path, 2, true, -1);
    fsoTlist.WriteLine(';ListFile');
    SaveMarkedEntry();
    break;
  // 指定されたリストに追記
  default:
    fsoTlist = fso.OpenTextFile(arg.path, 8, true, -1);
    SaveMarkedEntry();
}

fsoTlist.Close();

