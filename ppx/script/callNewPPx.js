//!*script
/* 新規独立窓呼び出し */
// PPx.Arguments(0)=C||V
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html
var arg = PPx.Arguments(0);
// PPc[C]から順番に起動状態を確認(i=67はアルファベットのC)
for (var i = 67; i < 91; i = (i+1)|0) {
  var ppcId = String.fromCharCode(i);
  if (!PPx.Extract('%N' + arg + ppcId))
    break;
};
switch (arg) {
  case 'C':
    PPx.Execute('*ppc -single -mps -bootid:' + ppcId + ' %1');
    break;
  case 'V':
    PPx.Execute('*ppv -bootid:' + ppcId + ' %R');
    break;
};
