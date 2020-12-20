﻿//!*script
/* 一行編集上で編集中のパス末尾を選択状態にする */
// PPx.Arguments() = [0]"(lparam(wparam))"
// 参照元:http://egg.2ch.net/reg/read.cgi/software/1476708638/409

try {
  var str = PPx.Extract('%*edittext()');
  var reg = new RegExp(PPx.Arguments(0));
  var wparam;
  var lparam;

  str.replace(reg, function (match, p1, p2) {
    lparam = p1.length;
    wparam = (p2 != '') ? str.lastIndexOf(p2) : lparam;
  });
  PPx.Execute('*sendmessage %N,177,' + wparam + ',' + lparam);
} catch (e) {
  PPx.Execute('*linemessage ' + e);
  PPx.Quit(-1);
}
