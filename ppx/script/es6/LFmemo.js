//!*script
/* メモの書き込み */
//
// PPx.Arguments() = (0)filepath (1)color

'use strict';

const arg = (() => {
  const argLength = PPx.Arguments.length;
  if (!argLength) { throw new Error('引数が異常'); }

  return { 'filepath': PPx.Arguments(0), 'enableColor': argLength };
})();

// メモの書き込み
const msg = (() => {
  try {
    // エスケープ処理済みの文字列を読み込む
    const res = PPx.Extract('"%*script(%\'scr\'%\\compCode.js,"i","""%%","memo..")"');
    return res || PPx.quit(-1);
  } catch (err) {
    throw new Error(err);
  }
})();

const dirType = PPx.DirectoryType;
const targetPath = (dirType === 4) ? PPx.Extract('%FVD') : arg.filepath;
// 色付け
const dColor = (arg.enableColor !== 2 ) ? 0 : PPx.Arguments(1)|0;
// メモをListfileの形式に置き換える
const onelineMemo = PPx.Extract(`"%*now","",A:H${dColor},C:0.0,L:0.0,W:0.0,S:0.0,M:0,T:${msg}`);

const fso = PPx.CreateObject('Scripting.FileSystemObject');
const fsoTlist = fso.OpenTextFile(targetPath, 8, true, -1);

fsoTlist.WriteLine(onelineMemo);
fsoTlist.Close();

if (dirType === 4) { PPx.Execute('*wait 100,1 %: %K"@F5"'); }
