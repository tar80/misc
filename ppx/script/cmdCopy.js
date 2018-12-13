//!*script
// %'work'=workspace
var Tdir = PPx.Pane.Count == 2? '%2%\\':'%\'work\'';
var mSize = PPx.EntryMarkCount == 0? PPx.EntrySize : PPx.EntryMarkSize;
(mSize > 5000)? a = 'on': a = 'off';
PPx.Execute('*ppcfile !copy,' + Tdir + ',/qstart /min /nocount /preventsleep /same:7 /sameall /burst:' + a);
