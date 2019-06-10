//!*script
// ファイル名の交換
if(PPx.EntryMarkCount == 2 && PPx.Execute('%Q%"Swap Filename""マークしたエントリ名を入れ替えます"') == 0){
  function mark() {
    this.name = PPx.Extract('%*name(X,' + entry.name + ')');
    this.ext = PPx.Extract('%*name(T, '+ entry.name + ')');
    this.filename = this.name + '.' + this.ext;
  }
  var entry = PPx.Entry;
  entry.FirstMark;
  var a = new mark();
  entry.NextMark;
  var b = new mark();
  // 一時的にFirstMarkの名前に_renを付加
  var tempName = a.name + '_ren.' + a.ext;
  PPx.Execute('*rename ' + a.filename + ',' + tempName);
  // 同名ファイルなら拡張子を交換
  if(a.name == b.name){
    PPx.Execute('*rename ' + b.filename + ',' + b.name + '.' + a.ext);
    PPx.Execute('*rename ' + tempName + ',' + a.name + '.' + b.ext);
  } else{
    // マークが二つなら互いのファイル名を交換
    PPx.Execute('*rename ' + b.filename + ',' + a.name + '.' + b.ext);
    PPx.Execute('*rename ' + tempName + ',' + b.name + '.' + a.ext);
  }
} else if(PPx.EntryMarkCount <= 1 && PPx.Pane.Count == 2 && PPx.Execute('%Q%"Swap Filename!""反対窓エントリとファイル名交換"') == 0){
  var nameA = PPx.Extract('%X');
  PPx.Execute('*rename %FXN.%FT,%~FXN.%FT');
  PPx.Execute('*execute ~,*rename %~FXN.%~FT,' + nameA + '.%~FT');
}
PPx.Execute('*unmarkentry *');
