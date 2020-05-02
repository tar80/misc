//!*script
/* 新規独立窓呼び出し */
// PPx.Arguments() = [0]有:PPv呼び出し | 無:呼び出し元と同じ
'use strict';
const arg = (() => {
  if (PPx.Arguments.length != 0) {
    return 'V';
  } else {
    return PPx.WindowIDName.slice(0, 1);
  }
})();

switch (arg) {
case 'C':
  {
    const array = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    PPx.Execute(`*ppc -single -mps -bootid:${callID(array)} %FD`);
  }
  break;
case 'V':
  {
    const array = 'DEFGHIJKLMNOPQRSTUVW'.split('');
    PPx.Execute(`*ppv -bootid:${callID(array)} %R`);
  }
  break;
}

/* 未起動PPxのIDを取得 */
function callID(key) {
  return key.find(id => PPx.Extract(`%N${arg}${id}`) == '');
}
