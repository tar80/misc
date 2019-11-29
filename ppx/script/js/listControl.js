//!*script
/* リストファイルの読み書き */
// PPx.Arguments(0)=case, (1)=filepath, (2)=comment

try {
  var arg = [PPx.Arguments(0), PPx.Arguments(1)];
} catch (e) {
  PPx.Echo(e);
  PPx.Quit(-1);
};

/* エントリをリストに書き出す関数 */
var write_mark_path = function () {
  var cDir = (PPx.DirectoryType != 4)
    ? PPx.Extract('%FDN%\\')
    : '';
  // マークの有無で処理を分岐
  if (!PPx.EntryMarkCount) {
    fs_tList.WriteLine(cDir + PPx.EntryName);
  } else {
    for (var i = 0, l = PPx.Entry.Count; i < l; i = (i+1)|0) {
      if (PPx.Entry(i).Mark == 1) {
        fs_tList.WriteLine(cDir + PPx.Entry(i).Name);
        PPx.Entry(i).Mark = 0;
      }
    }
  }
  fs_tList.Close();
};

var fs = PPx.CreateObject('Scripting.FileSystemObject');
switch (arg[0]) {
    // git関連のリザルト
  case 'git':
    var fs_tList = fs.OpenTextFile(arg[1], 2, true, -1);
    fs_tList.WriteLine(';ListFile');
    fs_tList.WriteLine(';Base=' + PPx.Extract('%\'repo\'') + '|1');
    fs_tList.Close();
    break;
  // 一行メモ
  case 'memo':
    try {
      arg.push(PPx.Arguments(2));
    } catch (e) {
      PPx.Echo('メモがありません');
      PPx.Quit(1);
    };
    var tList = (PPx.DirectoryType == 4)
      ? '%FVD'
      : arg[1];
    var fs_tList = fs.OpenTextFile(PPx.Extract(tList), 8, true, -1);
    var str = PPx.Extract('"%*now",T:' + arg[2]);
    fs_tList.WriteLine(str);
    fs_tList.Close();
    break;
  // 新規リストファイル
  case 'listfile':
    var fs_tList = fs.OpenTextFile(arg[1], 2, true, -1);
    fs_tList.WriteLine(';ListFile');
    write_mark_path();
    break;
    // 指定されたリストに追記
  default:
    var fs_tList = fs.OpenTextFile(arg[1], 8, true, -1);
    write_mark_path();
    break;
};
