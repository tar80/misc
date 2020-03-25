//!*script
/* 新規独立窓呼び出し */
// PPx.Arguments(0)=V:PPv|無:呼び出し元と同じ
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html
'use strict';
var arg;
var cID;

try {
  if (PPx.Arguments(0)) {
    arg = 'V';
  }
} catch (e) {
  arg = PPx.WindowIDName.slice(0, 1);
}

switch (arg) {
case 'C':
  PPx.Execute('*ppc -single -mps -bootid:' + load_id() + ' %FD');
  break;
case 'V':
  PPx.Execute('*ppv -bootid:' + load_id() + ' %R');
  break;
}
/* 未起動のIDを探す関数 */
// PPc[C]から順番に起動状態を確認(CharCode=67はアルファベットのC)
function load_id() {
  cID = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (var i = 0; i <= 25; i = (i+1)|0) {
    if (!PPx.Extract('%N' + arg + cID[i])) {
      return cID[i];
    }
  }
}
