//!*script
/* 一行編集上で編集中のパス末尾を選択状態にする */
// PPx.Arguments() = [0]"(lparam(wparam))"
// 参照元:http://egg.2ch.net/reg/read.cgi/software/1476708638/409
'use strict';
try {
  const str = PPx.Extract('%*edittext()');
  const reg = new RegExp(PPx.Arguments(0));
  let lparam, wparam;
  str.replace(reg, (match, p1, p2) => [lparam, wparam] = [p1, p2]);
  PPx.Execute(`*sendmessage %N,177,${str.indexOf(wparam)},${lparam.length}`);
} catch (e) {
  PPx.Echo(e);
}
