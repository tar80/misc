//!*script
/* 右クリックメニュー拡張子判別 */
// PPx.Arguments(0)=M_Ccr|M_FileMOVE|M_FileCOPY

var arg = PPx.Arguments(0)
var cDir = PPx.Extract('%1');
var result = [];
// auxパスメニュー
if (cDir.match(/aux:.*/)) {
  PPx.Execute('%M_Caux');
  PPx.Quit(1);
};
// 拡張子を小文字で取得する
var ext = (PPx.GetFileInformation(PPx.Extract('%R')).slice(1) == 'DIR')
  ? 'DIR'
  : PPx.Extract('%t').toLowerCase();
// 拡張子判別
switch (ext) {
  case '7z':
  case 'cab':
  case 'lzh':
  case 'msi':
  case 'rar':
  case 'zip':
    // 拡張子, ショートカットキー
    var result = ['arc', 'W'];
    break;
  case 'bmp':
  case 'edg':
  case 'gif':
  case 'jpeg':
  case 'jpg':
  case 'png':
  case 'vch':
    var result = ['image', 'L'];
    break;
  case 'ahk':
  case 'ini':
  case 'cfg':
  case 'js':
  case 'json':
  case 'log':
  case 'md':
  case 'txt':
  case 'vim':
    var result = ['doc', 'R'];
    break;
  case 'DIR':
    var result = ['dir', 'W'];
    break;
  default:
    var result = ['none', 'S'];
    break;
};
if (arg == 'M_Ccr') {
  // 標準メニュー
  choice_menu('J', 'O')
} else {
  // ファイル移動メニュー
  result[1] = (arg == 'M_FileMOVE')
    ? 'M'
    : 'C';
  choice_menu(result[1], result[1]);
};

/* カレントディレクトリの属性に応じて処理を分岐する関数 */
function choice_menu(list, arc) {
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
