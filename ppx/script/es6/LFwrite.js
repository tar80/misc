//!*script
/* リストファイルの読み書き */
//
// PPx.Arguments() = [0]case [1]filepath

'use strict';

if (PPx.Arguments.length !== 2) { throw new Error('引数が異常'); }

const arg = { 'cmd': PPx.Arguments(0), 'path': PPx.Arguments(1) };
const dirType = PPx.DirectoryType;

const fso = PPx.CreateObject('Scripting.FileSystemObject');
let fsoTlist;

// 該当エントリをリストに書き出す
const SaveMarkedEntry = () => {
  const wd = (dirType !== 4) ? PPx.Extract('%FDN%\\') : '';

  // マークの有無で処理を分岐
  if (!PPx.EntryMarkCount) {
    fsoTlist.WriteLine(wd + PPx.EntryName);
  } else {
    for (let [i, l] = [0, PPx.Entry.Count]; i < l; i++) {
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
    fsoTlist.WriteLine(`;Base=${PPx.Extract('%\'myrepo\'')}|1`);
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

