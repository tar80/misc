﻿//!*script
/* 選択された2ファイル間でファイル名を交換する */

var nameA;    // ファイル名
var entry;    // PPx.Entry
var a;        // firstmark
var b;        // nextmark
var tempName;
/* エントリのファイル名に関する情報を取得する関数 */
var Info_entry = function () {
  this.name = PPx.Extract('%*name(X,' + entry.name + ')');
  this.ext = PPx.Extract('%*name(T, '+ entry.name + ')');
  this.filename = this.name + '.' + this.ext;
};

switch (PPx.EntryMarkCount) {
case 0:
case 1:
  if (PPx.Pane.Count == 2 && PPx.Execute('%Q%"Swap Filename!""反対窓エントリとファイル名交換"') == 0) {
    nameA = PPx.Extract('%X');
    PPx.Execute('*rename %FXN.%FT,%~FXN.%FT');
    PPx.Execute('*execute ~,*rename %~FXN.%~FT,' + nameA + '.%~FT');
  }
  break;
case 2:
  if (PPx.Execute('%Q%"Swap Filename""マークしたエントリ名を入れ替えます"') == 0) {
    entry = PPx.Entry;
    entry.FirstMark;
    a = new Info_entry();
    entry.NextMark;
    b = new Info_entry();
    // 一時的にFirstMarkの名前に__renを付加
    tempName = a.name + '__ren.' + a.ext;
    PPx.Execute('*rename ' + a.filename + ',' + tempName);
    // 同名ファイルなら拡張子を交換
    if (a.name == b.name) {
      PPx.Execute('*rename ' + b.filename + ',' + b.name + '.' + a.ext);
      PPx.Execute('*rename ' + tempName + ',' + a.name + '.' + b.ext);
    } else {
      // エントリのファイル名を交換
      PPx.Execute('*rename ' + b.filename + ',' + a.name + '.' + b.ext);
      PPx.Execute('*rename ' + tempName + ',' + b.name + '.' + a.ext);
    }
  }
  break;
default:
  PPx.SetPopLineMessage('mark<2 :反対窓カーソル位置とファイル名交換');
  PPx.SetPopLineMessage('mark=2 :マークしたエントリのファイル名交換');
  PPx.Quit(1);
}
PPx.Execute('*unmarkentry *');
