//!*script
/* 新規独立窓呼び出し */
//
// PPx.Arguments() = (0)有:PPv呼び出し | 無:呼び出し元と同じ

'use strict';

const arg = (PPx.Arguments.length) ? 'V': PPx.WindowIDName.slice(0, 1);
const arrID = [];

switch (arg) {
  case 'C':
    arrID[0] = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    PPx.Execute(`*ppc -single -mps -bootid:${callID(arrID[0])} %FD`);
    break;
  case 'V':
    arrID[0] = Array.from('DEFGHIJKLMNOPQRSTUVW');
    PPx.Execute(`*ppv -bootid:${callID(arrID[0])} %R`);
    break;
}

/* 未起動PPxのIDを取得 */
function callID (key) { return key.find(id => PPx.Extract(`%N${arg}${id}`) == ''); }

