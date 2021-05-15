//!*script
/* 選択された2ファイル間でファイル名を交換する */
//
// マーク数が二つなら2ファイル間での名前交換。二つ以下なら反対窓のカーソル位置ファイルと交換します。
// 同名ファイルの場合、拡張子を交換

switch (PPx.EntryMarkCount) {
  case 0:
  case 1:
    if (PPx.Pane.Count === 2 && PPx.Execute('%Q%"Swap Filename!""反対窓エントリとファイル名交換"') === 0) {
      var opName = PPx.Extract('%X');
      PPx.Execute('*rename %FXN.%FT,%~FXN.%FT');
      PPx.Execute('*execute ~,*rename %~FXN.%~FT,' + opName + '.%~FT');
    }
    break;
  case 2:
    var objEntry = PPx.Entry;

    /* エントリのファイル名に関する情報を取得する関数 */
    var InfoEntry = function () {
      this.name = PPx.Extract('%*name(X,"' + objEntry.name + '")');
      this.ext = PPx.Extract('%*name(T,"'+ objEntry.name + '")');
      this.filename = this.name + '.' + this.ext;
    };

    if (PPx.Execute('%Q%"Swap Filename""マークしたエントリ名を入れ替えます"') === 0) {
      objEntry.FirstMark;
      var entry1 = new InfoEntry();

      objEntry.NextMark;
      var entry2 = new InfoEntry();
      // 一時的にFirstMarkの名前に__renを付加
      var tempName = entry1.name + '__ren.' + entry1.ext;

      PPx.Execute('*rename ' + entry1.filename + ',' + tempName);

      // 同名ファイルなら拡張子を交換
      if (entry1.name === entry2.name) {
        PPx.Execute('*rename ' + entry2.filename + ',' + entry2.name + '.' + entry1.ext);
        PPx.Execute('*rename ' + tempName + ',' + entry1.name + '.' + entry2.ext);
      } else {
        // エントリのファイル名を交換
        PPx.Execute('*rename ' + entry2.filename + ',' + entry1.name + '.' + entry2.ext);
        PPx.Execute('*rename ' + tempName + ',' + entry2.name + '.' + entry1.ext);
      }
    }
    break;
  default:
    PPx.SetPopLineMessage('mark < 2 :反対窓カーソル位置とファイル名交換');
    PPx.SetPopLineMessage('mark = 2 :マークしたエントリのファイル名交換');
    PPx.Quit(1);
}

PPx.Execute('*unmarkentry *');

