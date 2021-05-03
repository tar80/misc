//!*script
/* 右クリックメニュー拡張子判別 */
//
// PPx.Arguments() = (0)M_Ccr | M_FileMOVE | M_FileCOPY

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

// auxパスメニュー
// var cdPath = PPx.Extract('%1');
//
// if (cdPath.match(/aux:.*/)) {
//   PPx.Execute('%M_Caux, C');
//   PPx.Quit(1);
// }

var arg = PPx.Arguments(0);
// 拡張子を大文字で取得する
var ext = (PPx.GetFileInformation(PPx.Extract('%R')) === ':DIR')
  ? 'DIR' : PPx.Extract('%t').toUpperCase();
// 拡張子判別
var selKey = (function () {
  var filetype = new RegExp(ext);
  var cnts = {
    arc:  ['7Z', 'CAB', 'LZH', 'MSI', 'RAR', 'ZIP'],
    img:  ['BMP', 'EDG', 'GIF', 'JPEG', 'JPG', 'PNG', 'VCH'],
    doc:  ['AHK', 'INI', 'CFG', 'JS', 'JSON', 'LOG', 'MD', 'TXT', 'VIM']
  }
  if (ext === 'DIR') {
    return { type: 'dir', chr: 'W' };
  } else if (filetype.test(cnts['arc'])) {
    return { type: 'arc', chr: 'W' };
  } else if (filetype.test(cnts['img'])) {
    return { type: 'img', chr: 'L' };
  } else if (filetype.test(cnts['doc'])) {
    return { type: 'doc', chr: 'R' };
  } else {
    return { type: 'none', chr: 'S' }
  }
})();

if (arg == 'M_Ccr') {
  // 標準メニュー
  Select_menu('J', 'O');
} else {
  // ファイル移動メニュー
  selKey.chr = (arg == 'M_FileMOVE') ? 'M' : 'C';
  Select_menu(selKey.chr, selKey.chr);
}

/* カレントディレクトリの属性に応じて処理を分岐する */
function Select_menu(list, archive) {
  switch (PPx.DirectoryType) {
    case 4:
      PPx.Execute('*setcust M_Clist:Ext = ??M_U' + selKey.type + ' %:%M_Clist,' + list);
      break;
    case 80:
      PPx.Execute('%M_Chttp');
      break;
    case 62:
    case 64:
    case 96:
      PPx.Execute('%M_Carc,' + archive);
      break;
    default:
      PPx.Execute('*setcust M_Ccr:Ext = ??M_U' + selKey.type + ' %:%' + arg + ',' + selKey.chr);
      break;
  }
}

