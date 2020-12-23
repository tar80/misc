//!*script
/* 右クリックメニュー拡張子判別 */
// PPx.Arguments() = [0]M_Ccr | M_FileMOVE | M_FileCOPY
'use strict';
const arg = (() => {
  try {
    return PPx.Arguments(0);
  } catch (e) {
    PPx.Echo(e);
    PPx.Quit(-1);
  }
})();
const cdPath = PPx.Extract('%1');

// auxパスメニュー
if (cdPath.match(/aux:.*/)) {
  PPx.Execute('%M_Caux, C');
  PPx.Quit(1);
}

// 拡張子を大文字で取得する
const filetype = (PPx.GetFileInformation(PPx.Extract('%R')).slice(1) == 'DIR')
  ? 'DIR' : PPx.Extract('%t').toUpperCase();
// 拡張子判別
const contents = {
  dir:  ['DIR'],
  arch: ['7Z', 'CAB', 'LZH', 'MSI', 'RAR', 'ZIP'],
  img:  ['BMP', 'EDG', 'GIF', 'JPEG', 'JPG', 'PNG', 'VCH'],
  doc:  ['AHK', 'INI', 'CFG', 'JS', 'JSON', 'LOG', 'MD', 'TXT', 'VIM']
};
const asgKey = { dir: 'W', arch: 'W', img: 'L', doc: 'R' };
// コンテキストメニューの初期選択キー
const selKey = ['none', 'P'];

Object.keys(contents).forEach(function (key) {
  contents[key].find(ext => {
    if (ext == filetype) {
      selKey[0] = [key];
      selKey[1] = [this[key]];
      return;
    }
  });
}, asgKey);

if (arg == 'M_Ccr') {
  // 標準メニュー
  Select_menu('J', 'O');
} else {
  // ファイル移動メニュー
  selKey[1] = (arg == 'M_FileMOVE') ? 'M' : 'C';
  Select_menu(selKey[1], selKey[1]);
}

/* カレントディレクトリの属性に応じて処理を分岐する関数 */
function Select_menu(list, arch) {
  switch (PPx.DirectoryType) {
  case 4:
    PPx.Execute(`*setcust M_Clist:Ext = ??M_U${selKey[0]} %: %M_Clist,${list}`);
    break;
  case 80:
    PPx.Execute('%M_Chttp');
    break;
  case 62:
  case 64:
  case 96:
    PPx.Execute(`%M_Carc,${arch}`);
    break;
  default:
    PPx.Execute(`*setcust M_Ccr:Ext = ??M_U${selKey[0]} %: %${arg},${selKey[1]}`);
  }
}
