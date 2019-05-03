//!*script
// ファイル名の交換
if(PPx.EntryMarkCount == 2 && PPx.Execute('%Q%"Swap Filename!""マークしたエントリ名を入れ替えます"') == 0){
  var ent = PPx.Entry;
  ent.FirstMark;
  var nameA = PPx.Extract('%*name(X,' + ent.name + ')');
  var extA = PPx.Extract('%*name(T, '+ ent.name + ')');
  // 一時的にファイルAの名前を'tempname'に変更
  PPx.Execute('*rename ' + ent.name + ',tempRename');
  ent.NextMark;
  var nameB = PPx.Extract('%*name(X,' + ent.name + ')');
  var extB = PPx.Extract('%*name(T, '+ ent.name + ')');
  // 同名ファイルなら拡張子を交換
  if(nameA == nameB){
    PPx.Execute('*rename ' + nameB + '.' + extB + ',' + nameB + '.' + extA);
    PPx.Execute('*rename tempRename,' + nameA + '.' + extB);
  } else{
    // マークが二つなら互いのファイル名を交換
    PPx.Execute('*rename ' + nameB + '.' + extB + ',' + nameA + '.' + extB);
    PPx.Execute('*rename tempRename,' + nameB + '.' + extA);
  }
} else if(PPx.EntryMarkCount <= 1 && PPx.Pane.Count == 2 && PPx.Execute('%Q%"Swap Filename!""反対窓エントリとファイル名交換"') == 0){
  var nameA = PPx.Extract('%X');
  PPx.Execute('*rename %FXN.%FT,%~FXN.%FT');
  PPx.Execute('*execute ~,*rename %~FXN.%~FT,' + nameA + '.%~FT');
}
PPx.Execute('*unmarkentry *');
