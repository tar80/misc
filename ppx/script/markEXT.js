//!*script
/* カーソル下エントリの拡張子でマークトグル */

if (!PPx.EntryMarkCount)
  PPx.Execute('*markentry *.%t');
else
  PPx.Execute('*unmarkentry *');

