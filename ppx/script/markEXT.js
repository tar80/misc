//!*script
// カーソル下エントリの拡張子でマークトグル
if (PPx.EntryMarkCount == 0){
  PPx.Execute('*markentry *.%t');
} else{
  PPx.Execute('*unmarkentry *');
}