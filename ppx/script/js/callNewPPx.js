//!*script
/* 新規独立窓呼び出し */
//
// PPx.Arguments() = (0)有:PPv呼び出し, 無:呼び出し元と同じ
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html

var arg = (PPx.Arguments.length) ? 'V' : PPx.WindowIDName.slice(0, 1);
var arrID = [];

switch (arg) {
case 'C':
  arrID = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  PPx.Execute('*ppc -single -mps -bootid:' + callID() + ' %FD');
  break;
case 'V':
  arrID = 'DEFGHIJKLMNOPQRSTUVW'.split('');
  PPx.Execute('*ppv -bootid:' + callID() + ' %R');
  break;
}

/* 未起動PPxのIDを取得 */
function callID() {
  for (var i = 0, l = (arrID.length - 1); i <= l; i++) {
    if (!PPx.Extract('%N' + arg + arrID[i])) { return arrID[i]; }
  }
}
