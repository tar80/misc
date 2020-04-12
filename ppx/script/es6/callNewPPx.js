//!*script
/* 新規独立窓呼び出し */
// PPx.Arguments() = [0]有:PPv呼び出し | 無:呼び出し元と同じ
'use strict';
const arg = (() => {
  try {
    if (PPx.Arguments(0)) { return 'V'; }
  } catch (e) {
    return PPx.WindowIDName.slice(0, 1);
  }
})();

// 未起動PPxのIDを取得
const array = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const callID = array.find(id => PPx.Extract(`%N${arg}${id}`) == '');

switch (arg) {
case 'C':
  PPx.Execute(`*ppc -single -mps -bootid:${callID} %FD`);
  break;
case 'V':
  PPx.Execute(`*ppv -bootid:${callID} %R`);
  break;
}
