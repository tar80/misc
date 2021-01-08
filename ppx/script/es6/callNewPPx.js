//!*script
/* 新規独立窓呼び出し */
// PPx.Arguments() = (0)有:PPv呼び出し | 無:呼び出し元と同じ 210107更新

'use strict';

const arg = (PPx.Arguments.length) ? 'V': PPx.WindowIDName.slice(0, 1);
const array = [];

switch (arg) {
case 'C':
  array[0] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  PPx.Execute(`*ppc -single -mps -bootid:${callID(array[0])} %FD`);
  break;
case 'V':
  array[0] = 'DEFGHIJKLMNOPQRSTUVW'.split('');
  PPx.Execute(`*ppv -bootid:${callID(array[0])} %R`);
  break;
}

/* 未起動PPxのIDを取得 */
function callID (key) { return key.find(id => PPx.Extract(`%N${arg}${id}`) == ''); }

