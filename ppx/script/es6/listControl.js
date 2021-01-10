//!*script
/* リストファイルの読み書き */
//
// PPx.Arguments() = [0]case [1]filepath

'use strict';

if (PPx.Arguments.length != 2) {
  PPx.Echo('引数が異常');
  PPx.Quit(-1);
}

const arg = [PPx.Arguments(0), PPx.Arguments(1)];
const dirType = PPx.DirectoryType;

const fso = PPx.CreateObject('Scripting.FileSystemObject');
let fsoTlist;

// 該当エントリをリストに書き出す
const Write_mark_path = function () {
  const cdPath = (dirType != 4) ? PPx.Extract('%FDN%\\') : '';

  // マークの有無で処理を分岐
  if (!PPx.EntryMarkCount) {
    fsoTlist.WriteLine(cdPath + PPx.EntryName);
  } else {
    for (let [i, l] = [0, PPx.Entry.Count]; i < l; i++) {
      if (PPx.Entry(i).Mark == 1) {
        fsoTlist.WriteLine(cdPath + PPx.Entry(i).Name);
        PPx.Entry(i).Mark = 0;
      }
    }
  }
};

switch (arg[0]) {
// git関連のリザルト
case 'git':
  fsoTlist = fso.OpenTextFile(arg[1], 2, true, -1);
  fsoTlist.WriteLine(';ListFile');
  fsoTlist.WriteLine(`;Base=${PPx.Extract('%\'repo\'')}|1`);
  break;
  // 新規リストファイル
case 'new':
  fsoTlist = fso.OpenTextFile(arg[1], 2, true, -1);
  fsoTlist.WriteLine(';ListFile');
  Write_mark_path();
  break;
  // 指定されたリストに追記
default:
  fsoTlist = fso.OpenTextFile(arg[1], 8, true, -1);
  Write_mark_path();
}
fsoTlist.Close();

