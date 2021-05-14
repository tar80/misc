//!*script
/* 新規独立窓呼び出し */
//
// PPx.Arguments(0) = 1:PPv呼び出し | 無:呼び出し元と同じ

'use strict';

const argID = (PPx.Arguments.length) ? 'V' : PPx.WindowIDName.slice(0, 1);
// 未起動PPxのIDを取得
const GetID = (key) => key.find(chr => PPx.Extract(`%N${argID}${chr}`) == '');
// grepリストファイル上のパスを取得
const GetPath = () => {
  if (PPx.Extract('%se"grep"') !== '1') { return '%R'; }
  const selText = PPx.extract('%*script(%\'scr\'%\\compCode.js,"s","""")');
  return selText.replace(/^([^:].*):\d*:.*/, (match, p1) => `%*extract(C"%%FD")%\\${p1}`);
};

({
  'C': () => {
    const arrChr = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    return PPx.Execute(`*ppc -single -mps -bootid:${GetID(arrChr)} %FD`);
  },
  'V': () => {
    PPx.Echo('V');
    const arrChr = Array.from('DEFGHIJKLMNOPQRSTUVW');
    return PPx.Execute(`*ppv -bootid:${GetID(arrChr)} ${GetPath()}`);
  }
})[argID]();

