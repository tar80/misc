//!*script
/* 右クリックメニュー拡張子判別 */
// PPx.Arguments(0)=M_Ccr|M_FileMOVE|M_FileCOPY
'use strict';

var arg = PPx.Arguments(0);
var cDir = PPx.Extract('%1');
// 拡張子を大文字で取得する
var ext = (PPx.GetFileInformation(PPx.Extract('%R')).slice(1) == 'DIR')
  ? 'DIR'
  : PPx.Extract('%t').toUpperCase();
// 拡張子判別
var result = new Array(2);
var arc = ['7Z', 'CAB', 'LZH', 'MSI', 'RAR', 'ZIP'];
var image = ['BMP', 'EDG', 'GIF', 'JPEG', 'JPG', 'PNG', 'VCH'];
var doc   = ['AHK', 'INI', 'CFG', 'JS', 'JSON', 'LOG', 'MD', 'TXT', 'VIM'];

// auxパスメニュー
if (cDir.match(/aux:.*/)) {
  PPx.Execute('%M_Caux, C');
  PPx.Quit(1);
}

if (ext == 'DIR') {
  // [拡張子, ショートカットキー]
  result = ['dir', 'W'];
} else if (arc.indexOf(ext) != -1) {
  result = ['arc', 'W'];
} else if (image.indexOf(ext) != -1) {
  result = ['image', 'L'];
} else if (doc.indexOf(ext) != -1) {
  result = ['doc', 'R'];
} else {
  result = ['none', 'S'];
}

if (arg == 'M_Ccr') {
  // 標準メニュー
  select_menu('J', 'O');
} else {
  // ファイル移動メニュー
  result[1] = (arg == 'M_FileMOVE')
    ? 'M'
    : 'C';
  select_menu(result[1], result[1]);
}

/* カレントディレクトリの属性に応じて処理を分岐する関数 */
function select_menu(list, arc) {
  switch (PPx.DirectoryType) {
  case 4:
    PPx.Execute('*setcust M_Clist:Ext = ??M_U' + result[0] + ' %:%M_Clist,' + list);
    break;
  case 80:
    PPx.Execute('%M_Chttp');
    break;
  case 62:
  case 64:
  case 96:
    PPx.Execute('%M_Carc,' + arc);
    break;
  default:
    PPx.Execute('*setcust M_Ccr:Ext = ??M_U' + result[0] + ' %:%' + arg + ',' + result[1]);
    break;
  }
}
