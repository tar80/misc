﻿//!*script
/* %'work'=workspace */
var fn = PPx.Extract("%2");
var Tdir;
var cmd = PPx.Arguments.count == 0? "copy": "!copy";

switch(PPx.GetFileInformation(fn)){
case ':DIR':
  Tdir = fn;
  break;
case '':
  Tdir = PPx.Extract("%\'work\'");
  cmd = "copy";
  break;
default:
  PPx.Echo('対象がディレクトリではありません');
  PPx.Quit(1);
  break;
}
if(PPx.DirectoryType >= 62){
  PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{' + Tdir + '%} %@');
} else{
  var bst;
  var mSize = PPx.EntryMarkCount == 0? PPx.EntrySize : PPx.EntryMarkSize;
  (mSize > 5000)? bst = 'on' : bst = 'off';
  PPx.Execute('*ppcfile ' + cmd + ',' + Tdir + ',/qstart /nocount /preventsleep /same:7 /sameall /burst:' + bst);
}

/*
if(PPx.GetFileInformation(fn) == ':DIR'){
  Tdir = fn
  }else if(PPx.GetFileInformation(fn) != ''){
    PPx.Echo('対象がディレクトリではありません');
    PPx.Quit(1)
  }else Tdir = ws

if(PPx.DirectoryType >= 62){
  PPx.Execute('%u7-zip64.dll,x -aos -hide "%1" -o%"コピー先"%{' + Tdir + '%} %@');
} else{
  var mSize = PPx.EntryMarkCount == 0?PPx.EntrySize : PPx.EntryMarkSize;
  (mSize > 5000) ? a = 'on' : a = 'off';
  PPx.Execute('*ppcfile copy,' + Tdir + ',/qstart /nocount /preventsleep /same:7 /sameall /burst:' + a + ' /compcmd %k"^a"');
}
 */
