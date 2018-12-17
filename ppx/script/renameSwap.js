//!*script
if(PPx.EntryMarkCount == 2 && PPx.Execute('%Q%"Swap Filename!""マークしたエントリ名を入れ替えます"') == 0){
  var en = PPx.Entry;
  en.FirstMark;
  var nameA = PPx.Extract('%*name(X,' + en.name + ')');
  var extA = PPx.Extract('%*name(T, '+ en.name + ')');
  PPx.Execute('*rename ' + en.name + ',tempRename');
  en.NextMark;
  var nameB = PPx.Extract('%*name(X,' + en.name + ')');
  var extB = PPx.Extract('%*name(T, '+ en.name + ')');
  PPx.Execute('*rename ' + nameB + '.' + extB + ',' + nameA + '.' + extB);
  PPx.Execute('*rename tempRename,' + nameB + '.' + extA);
  //	PPx.Quit(1);
} else if(PPx.EntryMarkCount <= 1 && PPx.Pane.Count == 2 && PPx.Execute('%Q%"Swap Filename!""反対窓エントリとファイル名交換"') == 0){
  var nameA = PPx.Extract('%X');
  PPx.Execute('*rename %FXN.%FT,%~FXN.%FT');
  PPx.Execute('*execute ~,*rename %~FXN.%~FT,' + nameA + '.%~FT');
}
PPx.Execute('*unmarkentry *');
