//!*script
/* 一行編集上で編集中の文字の選択状態を操作する */
//
// PPx.Arguments(0) = "(lparam(wparam))"
// 引数は正規表現で指定する
// PPXMES.DLLが必要
// 参照元:https://egg.5ch.net/test/read.cgi/software/1476708638/409

try {
  var str = PPx.Extract('%*edittext()');
  var reg = new RegExp(PPx.Arguments(0));
  var param = (function (s, m) {
    return {
      l: m[1].length,
      w: (m[2] !== '') ? s.lastIndexOf(m[2]) : m[1].length
    };
  })(str, str.match(reg));

  if (param.l === undefined) { throw 'selStr: no match.'; }
  PPx.Execute('*sendmessage %N,177,' + param.w + ',' + param.l);

  // var wparam;
  // var lparam;
  // 
  // str.replace(reg, function (match, p1, p2) {
  //   lparam = p1.length;
  //   wparam = (p2 != '') ? str.lastIndexOf(p2) : lparam;
  // });
  // 
  // if (lparam === undefined) { throw 'No match.'; }
  // PPx.Execute('*sendmessage %N,177,' + wparam + ',' + lparam);

} catch (e) {
  PPx.SetPopLineMessage('selStr: ' + e);
  PPx.Quit(-1);
}

