//!*script
// 新規独立窓呼び出し
// ループはPPx[C]から始める(i=67)
// PPx.Arguments(0)=C|V
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html
for(var i = 67; i < 91; i = (i+1)|0){
  var ppcId = String.fromCharCode(i);
  if(!PPx.Extract('%N' + PPx.Arguments(0) + ppcId)) break;
}
switch(PPx.Arguments(0)){
  case 'C':
  PPx.Execute('*ppc -single -mps -bootid:' + ppcId + ' %1');
    break;
  case 'V':
  PPx.Execute('*ppv -bootid:' + ppcId + ' %R');
    break;
}
