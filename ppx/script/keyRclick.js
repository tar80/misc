//!*script
/* 右クリックメニュー拡張子判別 */
// PPx.Arguments(0)=M_Ccr|M_FileMOVE|M_FileCOPY

var cDir = PPx.Extract('%1');
// auxパスメニュー
if (cDir.match(/aux:.*/)) {
  PPx.Execute('%M_Caux');
  PPx.Quit(1);
};

var arg = PPx.Arguments(0);
var result = [];
// 拡張子を大文字で取得する
var ext = (PPx.GetFileInformation(PPx.Extract('%R')).slice(1) == 'DIR')
  ? 'DIR'
  : PPx.Extract('%t').toUpperCase();
// 拡張子判別
var arc = ['7Z', 'CAB', 'LZH', 'MSI', 'RAR', 'ZIP'];
var doc = ['AHK', 'INI', 'CFG', 'JS', 'JSON', 'LOG', 'MD', 'TXT', 'VIM']
var image = ['BMP', 'EDG', 'GIF', 'JPEG', 'JPG', 'PNG', 'VCH'];
var types = arc.concat(doc, image);
if (ext == 'DIR') {
  var result = ['dir', 'W'];
} else {
  for (var i = types.length; i = (i-1)|0;) {
    if (ext == arc[i]) {
    // 拡張子, ショートカットキー
    var result = ['arc', 'W'];
    break;
    } else if (ext == image[i]) {
    var result = ['image', 'L'];
    break;
    } else if (ext == doc[i]) {
    var result = ['doc', 'R'];
    break;
    } else
    var result = ['none', 'S'];
  }
};

if (arg == 'M_Ccr') {
  // 標準メニュー
  select_menu('J', 'O')
} else {
  // ファイル移動メニュー
  result[1] = (arg == 'M_FileMOVE')
    ? 'M'
    : 'C';
  select_menu(result[1], result[1]);
};

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
  };
};
