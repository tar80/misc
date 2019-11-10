//!*script
/* 新規独立窓呼び出し */
// PPx.Arguments(0)=V:PPv|無:呼び出し元と同じ
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html

try {
if (PPx.Arguments(0))
  var arg = 'V';
} catch (e) {
  var arg = PPx.WindowIDName.slice(0, 1);
};

switch (arg) {
  case 'C':
    PPx.Execute('*ppc -single -mps -bootid:' + load_id() + ' %FD');
    break;
  case 'V':
    PPx.Execute('*ppv -bootid:' + load_id() + ' %R');
    break;
};
/* 未起動のIDを探す関数 */
// PPc[C]から順番に起動状態を確認(i=67はアルファベットのC)
function load_id() {
  for (var i = 67; i < 91; i = (i+1)|0) {
    var cID = String.fromCharCode(i);
    if (!PPx.Extract('%N' + arg + cID))
      return cID;
  };
};
