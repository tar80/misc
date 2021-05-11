//!*script
/* 新規独立窓呼び出し */
//
// PPx.Arguments(0) = 1:PPv呼び出し | 無:呼び出し元と同じ
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html

var arg = (PPx.Arguments.length) ? 'V' : PPx.WindowIDName.slice(0, 1);

// 未起動PPxのIDを取得
var id = (function (value) {
  for (var i = 0, l = (value.length - 1); i <= l; i++) {
    if (!PPx.Extract('%N' + arg + value[i])) { return value[i]; }
  }
});

// grepリストファイル上のパスを取得
var path = (function () {
  if (PPx.Extract('%se"grep"') !== '1') { return '%R'; }
  var seltext = PPx.extract('%*script(%\'scr\'%\\compCode.js,"s","""")');
  return seltext.replace(/^([^:].*):\d*:.*/, function (match, p1) {
    return '%*extract(C"%%FD")%\\' + p1;
  });
});

var callPPx = {
  'C': (function () {
    var arrChr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return PPx.Execute('*ppc -single -mps -bootid:' + id(arrChr) + ' %FD');
  }),
  'V': (function () {
    var arrChr = 'DEFGHIJKLMNOPQRSTUVW'.split('');
    return PPx.Execute('*ppv -bootid:' + id(arrChr) + ' ' + path());
 })
};

callPPx[arg]();

