//!*script
// 新規独立窓呼び出し
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html
for(var i = 67; i < 91; i = (i+1)|0){
  var ppcId = String.fromCharCode(i);
  if(!PPx.Extract('%N' + PPx.Arguments(0) + ppcId)) break;
}
if(PPx.Arguments(0) == 'C'){
  PPx.Execute('*ppc -single -mps -bootid:' + ppcId + ' %1');
} else if(PPx.Arguments(0) == 'V'){
  PPx.Execute('*ppv -bootid:' + ppcId + ' %R');
}
