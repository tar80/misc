//!*script
// 新規独立窓呼び出し
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html
for (var i = 67; i < 91; i++) {
  var ppcid = String.fromCharCode(i);
  if (!PPx.Extract('%NC' + ppcid)){
  PPx.Execute('*ppc -single -mps -bootid:' + ppcid + ' %1');
  PPx.Quit(1);
  }
}
