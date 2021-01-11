//!*script
/* 右クリックメニュー拡張子判別 */
//
// PPx.Arguments() = (0)M_Ccr | M_FileMOVE | M_FileCOPY

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

var arg = PPx.Arguments(0);
// auxパスメニュー
// var cdPath = PPx.Extract('%1');
//
// if (cdPath.match(/aux:.*/)) {
//   PPx.Execute('%M_Caux, C');
//   PPx.Quit(1);
// }

// 拡張子を大文字で取得する
var ext = (PPx.GetFileInformation(PPx.Extract('%R')) == ':DIR')
  ? 'DIR' : PPx.Extract('%t').toUpperCase();

// 拡張子判別
var selKey = new Array(2);
var arc   = ['7Z', 'CAB', 'LZH', 'MSI', 'RAR', 'ZIP'];
var img = ['BMP', 'EDG', 'GIF', 'JPEG', 'JPG', 'PNG', 'VCH'];
var doc   = ['AHK', 'INI', 'CFG', 'JS', 'JSON', 'LOG', 'MD', 'TXT', 'VIM'];

if (ext == 'DIR') {
  selKey = ['dir', 'W'];
} else {
  for (var i = doc.length; i--;) {
    if (ext == arc[i]) {
    // 拡張子, ショートカットキー
      selKey = ['arc', 'W'];
      break;
    } else if (ext == img[i]) {
      selKey = ['img', 'L'];
      break;
    } else if (ext == doc[i]) {
      selKey = ['doc', 'R'];
      break;
    } else
      selKey = ['none', 'S'];
  }
}

if (arg == 'M_Ccr') {
  // 標準メニュー
  Select_menu('J', 'O');
} else {
  // ファイル移動メニュー
  selKey[1] = (arg == 'M_FileMOVE') ? 'M' : 'C';
  Select_menu(selKey[1], selKey[1]);
}

/* カレントディレクトリの属性に応じて処理を分岐する */
function Select_menu(list, arch) {
  switch (PPx.DirectoryType) {
  case 4:
    PPx.Execute('*setcust M_Clist:Ext = ??M_U' + selKey[0] + ' %:%M_Clist,' + list);
    break;
  case 80:
    PPx.Execute('%M_Chttp');
    break;
  case 62:
  case 64:
  case 96:
    PPx.Execute('%M_Carc,' + arch);
    break;
  default:
    PPx.Execute('*setcust M_Ccr:Ext = ??M_U' + selKey[0] + ' %:%' + arg + ',' + selKey[1]);
    break;
  }
}
