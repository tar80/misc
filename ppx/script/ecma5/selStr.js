//!*script
/* 一行編集上で編集中のパス末尾を選択状態にする */
// PPx.Arguments(0)="(lparam(wparam))"
// 参照元:http://egg.2ch.net/reg/read.cgi/software/1476708638/409
'use strict';
var str = PPx.Extract('%*edittext()');
var wparam;
var lparam;
var reg;

try {
  reg = new RegExp(PPx.Arguments(0));
  str.replace(reg, function (match, p1, p2) {
    wparam = p2;
    lparam = p1;
  });
  PPx.Execute('*sendmessage %N,177,' + str.indexOf(wparam) + ',' + lparam.length);
} catch (e) {
  PPx.Echo(e);
}
