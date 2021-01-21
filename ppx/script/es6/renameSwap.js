﻿//!*script
/* 選択された2ファイル間でファイル名を交換する */
//
// マーク数が二つなら2ファイル間での名前交換。二つ以下なら反対窓のカーソル位置ファイルと交換
// 同名ファイルの場合、拡張子を交換

'use strict';

const ObjEntry = PPx.Entry;

/* エントリのファイル名に関する情報を取得する関数 */
const Info_entry = function () {
  this.name = PPx.Extract(`%*name(X,${ObjEntry.name})`);
  this.ext = PPx.Extract(`%*name(T,${ObjEntry.name})`);
  this.filename = `${this.name}.${this.ext}`;
};

switch (PPx.EntryMarkCount) {
case 0:
case 1:
  {
    if (PPx.Pane.Count == 2 && PPx.Execute('%Q%"Swap Filename!""反対窓エントリとファイル名交換"') == 0) {
      const opName = PPx.Extract('%X');
      PPx.Execute('*rename %FXN.%FT,%~FXN.%FT');
      PPx.Execute(`*execute ~,*rename %~FXN.%~FT,${opName}.%~FT`);
    }
  }
  break;
case 2:
  {
    if (PPx.Execute('%Q%"Swap Filename""マークしたエントリ名を入れ替えます"') == 0) {
      ObjEntry.FirstMark;
      const a = new Info_entry();

      ObjEntry.NextMark;
      const b = new Info_entry();
      // 一時的にFirstMarkの名前に__renを付加
      const tempName = `${a.name}__ren.${a.ext}`;

      PPx.Execute(`*rename ${a.filename},${tempName}`);

      // 同名ファイルなら拡張子を交換
      if (a.name == b.name) {
        PPx.Execute(`*rename ${b.filename},${b.name}.${a.ext}`);
        PPx.Execute(`*rename ${tempName},${a.name}.${b.ext}`);
      } else {
        // エントリのファイル名を交換
        PPx.Execute(`*rename ${b.filename},${a.name}.${b.ext}`);
        PPx.Execute(`*rename ${tempName},${b.name}.${a.ext}`);
      }
    }
  }
  break;
default:
  PPx.SetPopLineMessage('mark<2 :反対窓カーソル位置とファイル名交換');
  PPx.SetPopLineMessage('mark=2 :マークしたエントリのファイル名交換');
  PPx.Quit(1);
}
PPx.Execute('*unmarkentry *');

