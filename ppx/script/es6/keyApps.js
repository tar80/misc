﻿//!*script
/* 右クリックメニュー拡張子判別 */
//
// PPx.Arguments() = (0)M_Ccr | M_FileMOVE | M_FileCOPY

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const arg = PPx.Arguments(0);
// auxパスメニュー
// const cdPath = PPx.Extract('%1');
// if (cdPath.match(/aux:.*/)) {
//   PPx.Execute('%M_Caux, C');
//   PPx.Quit(1);
// }

// 拡張子を大文字で取得する
const filetype = (PPx.GetFileInformation(PPx.Extract('%R')) == ':DIR')
  ? 'DIR' : PPx.Extract('%t').toUpperCase();

// 拡張子判別
const contents = {
  dir:  ['DIR'],
  arc: ['7Z', 'CAB', 'LZH', 'MSI', 'RAR', 'ZIP'],
  img:  ['BMP', 'EDG', 'GIF', 'JPEG', 'JPG', 'PNG', 'VCH'],
  doc:  ['AHK', 'INI', 'CFG', 'JS', 'JSON', 'LOG', 'MD', 'TXT', 'VIM']
};

const asgKey = { dir: 'W', arc: 'W', img: 'L', doc: 'R' };
// コンテキストメニューの初期選択キー
const selKey = ['none', 'P'];

Object.keys(contents).forEach(function (key) {
  contents[key].find(ext => {
    if (ext == filetype) {
      return [selKey[0], selKey[1]] = [key, this[key]];
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

/* カレントディレクトリの属性に応じて処理を分岐する */
function Select_menu(list, archive) {
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
    PPx.Execute(`%M_Carc,${archive}`);
    break;
  default:
    PPx.Execute(`*setcust M_Ccr:Ext = ??M_U${selKey[0]} %: %${arg},${selKey[1]}`);
  }
}

