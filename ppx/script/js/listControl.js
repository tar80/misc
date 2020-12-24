//!*script
/* リストファイルの読み書き */
// PPx.Arguments() = [0]case [1]filepath

var arg = new Array(2);
var tPath;    // listfile_path
var str;      // memo_strings
var dirType = PPx.DirectoryType;
var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoTlist;
/* エントリをリストに書き出す関数 */
var write_mark_path = function () {
  var cdPath = (dirType != 4) ? PPx.Extract('%FDN%\\') : '';
  // マークの有無で処理を分岐
  if (!PPx.EntryMarkCount) {
    fsoTlist.WriteLine(cdPath + PPx.EntryName);
  } else {
    for (var i = 0, l = PPx.Entry.Count; i < l; i++) {
      if (PPx.Entry(i).Mark == 1) {
        fsoTlist.WriteLine(cdPath + PPx.Entry(i).Name);
        PPx.Entry(i).Mark = 0;
      }
    }
  }
  fsoTlist.Close();
};

try {
  arg = [PPx.Arguments(0), PPx.Arguments(1)];
} catch (e) {
  PPx.Echo(e);
  PPx.Quit(-1);
}

switch (arg[0]) {
// git関連のリザルト
case 'git':
  fsoTlist = fso.OpenTextFile(arg[1], 2, true, -1);
  fsoTlist.WriteLine(';ListFile');
  fsoTlist.WriteLine(';Base=' + PPx.Extract('%\'repo\'') + '|1');
  fsoTlist.Close();
  break;
// 一行メモ
// case 'memo':
//   try {
//     arg.push(PPx.Extract('"%*script(%\'scr\'%\\compCode.js,"i","""%%","memo")"'));
//     // arg.push(PPx.Arguments(2));
//   } catch (e) {
//     PPx.Echo(e);
//     PPx.Quit(-1);
//   } finally {
//     if (arg[2] == '""') { PPx.Quit(-1);}
//   }
//   tPath = (dirType == 4) ? '%FVD' : arg[1];
//   fsoTlist = fso.OpenTextFile(PPx.Extract(tPath), 8, true, -1);
//   str = PPx.Extract('"%*now",T:' + arg[2] + '');
//   fsoTlist.WriteLine(str);
//   fsoTlist.Close();
//     if (dirType == 4) {
//       PPx.Execute('*wait 100,1 %K"@F5');
//     }
//   break;
// 新規リストファイル
case 'new':
  fsoTlist = fso.OpenTextFile(arg[1], 2, true, -1);
  fsoTlist.WriteLine(';ListFile');
  write_mark_path();
  break;
  // 指定されたリストに追記
default:
  fsoTlist = fso.OpenTextFile(arg[1], 8, true, -1);
  write_mark_path();
  break;
}
