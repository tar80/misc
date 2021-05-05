//!*script
/* 新規独立窓呼び出し */
//
// PPx.Arguments(0) = 1:PPv呼び出し | 無:呼び出し元と同じ

'use strict';

const arg = (PPx.Arguments.length) ? 'V': PPx.WindowIDName.slice(0, 1);
// 未起動PPxのIDを取得
const id = ((key) => key.find(id => PPx.Extract(`%N${arg}${id}`) == ''));
// grepリストファイル上のパスを取得
const path = (() => {
  if (PPx.Extract('%se"grep"') !== '1') { return '%R'; }
  const seltext = PPx.extract('%*script(%\'scr\'%\\compCode.js,"s","""")');
  return seltext.replace(/^([^:].*):\d*:.*/, (match, p1) => `%*extract(C"%%FD")%\\${p1}`);
});

const callPPx = {
  'C': (() => {
    const arrChr = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return PPx.Execute(`*ppc -single -mps -bootid:${id(arrChr)} %FD`);
  }),
  'V': (() => {
    const arrChr = Array.from('DEFGHIJKLMNOPQRSTUVW');
    return PPx.Execute(`*ppv -bootid:${id(arrChr)} ${path()}`);
  })
};

callPPx[arg]();

