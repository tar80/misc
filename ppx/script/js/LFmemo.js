﻿//!*script
/* メモの書き込み */
//
// PPx.Arguments() = (0)filepath (1)color

var arg = (function () {
  var argLength = PPx.Arguments.length;

  if (argLength) {
    return { 'filepath': PPx.Arguments(0), 'enableColor': argLength };
  } else {
    PPx.Echo('引数が異常');
    PPx.Quit(-1);
  }
})();

// メモの書き込み
var memoStr = (function (esc) {
  try {
    // エスケープ処理済みの文字列を読み込む
    return esc = PPx.Extract('"%*script(%\'scr\'%\\compCode.js,"i","""%%","memo..")"');
  } catch (e) {
    PPx.Echo(e);
    PPx.Quit(-1);
  } finally {
    if (esc === '') { PPx.Quit(-1); }
  }
})();

var dirType = PPx.DirectoryType;
var targetPath = (dirType === 4) ? PPx.Extract('%FVD') : arg.filepath;
// 色付け
var dColor = (arg.enableColor !== 2 ) ? 0 : PPx.Arguments(1)|0;
// メモをListfileの形式に置き換える
var onelineMemo = PPx.Extract('"%*now","",A:H' + dColor + ',C:0.0,L:0.0,W:0.0,S:0.0,M:0,T:' + memoStr);

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoTlist = fso.OpenTextFile(targetPath, 8, true, -1);

fsoTlist.WriteLine(onelineMemo);
fsoTlist.Close();

if (dirType === 4) { PPx.Execute('*wait 100,1 %: %K"@F5"'); }

