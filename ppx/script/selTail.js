//!*script
/* 一行編集上で編集中のパス末尾を選択状態にする */
// 参照元:http://egg.2ch.net/test/read.cgi/software/1476708638/409

var result = PPx.Extract('%*edittext()');
var len = result.replace(/(.*\\)(?!$).*/, '$1').length;
PPx.Execute('*sendmessage %N,177,' + len + ',' + result.length);
