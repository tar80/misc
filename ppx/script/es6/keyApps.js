//!*script
/* 右クリックメニュー拡張子判別 */
//
// PPx.Arguments() = (0)M_Ccr | M_FileMOVE | M_FileCOPY

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

// auxパスメニュー
// const cdPath = PPx.Extract('%1');
//
// if (cdPath.match(/aux:.*/)) {
//   PPx.Execute('%M_Caux, C');
//   PPx.Quit(1);
// }

const argMenuType = PPx.Arguments(0);
// 拡張子を大文字で取得する
const ext = (PPx.GetFileInformation(PPx.Extract('%R')) === ':DIR')
  ? 'DIR' : PPx.Extract('%t').toUpperCase();

// コンテキストメニューの初期選択キー
const selKey = (() => {
  // 拡張子判別
  const cnts = {
    dir: ['DIR'],
    arc: ['7Z', 'CAB', 'LZH', 'MSI', 'RAR', 'ZIP'],
    img: ['BMP', 'EDG', 'GIF', 'JPEG', 'JPG', 'PNG', 'VCH'],
    doc: ['AHK', 'INI', 'CFG', 'JS', 'JSON', 'LOG', 'MD', 'TXT', 'VIM']
  };
  const asgKey = { dir: 'W', arc: 'W', img: 'L', doc: 'R' };
  for (const key of Object.keys(cnts)) {
    if (~cnts[key].indexOf(ext)) { return { type: key, chr: asgKey[key] }; }
  }
  return { type: 'none', chr: 'P' };
}());

if (argMenuType === 'M_Ccr') {
  // 標準メニュー
  SelectMenu('J', 'O');
} else {
  // ファイル移動メニュー
  selKey.chr = (argMenuType === 'M_FileMOVE') ? 'M' : 'C';
  SelectMenu(selKey.chr, selKey.chr);
}

/* カレントディレクトリの属性に応じて処理を分岐する */
function SelectMenu(list, archive) {
  switch (PPx.DirectoryType) {
    case 4:
      PPx.Execute(`*setcust M_Clist:Ext=??M_U${selKey.type} %: %M_Clist,${list}`);
      break;
    case 80:
      PPx.Execute('%M_Chttp');
      break;
    case 62:
    case 64:
    case 96:
      PPx.Execute(`%M_Carc,${archive}`);
      break;
    default:
      PPx.Execute(`*setcust M_Ccr:Ext=??M_U${selKey.type} %: %${argMenuType},${selKey.chr}`);
  }
}

