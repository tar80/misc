﻿//!*script
/* 一行編集上で編集中の文字の選択状態を操作する */
//
// PPx.Arguments(0) = "(lparam(wparam))"
// 引数は正規表現で指定する
// PPXMES.DLLが必要
// 参照元:https://egg.5ch.net/test/read.cgi/software/1476708638/409

'use strict';

try {
  const str = PPx.Extract('%*edittext()');
  const reg = new RegExp(PPx.Arguments(0));
  const lparam = [];
  const wparam = [];

  str.replace(reg, (match, p1, p2) => {
    lparam.push(p1.length);
    wparam.push((p2 !== '') ? str.lastIndexOf(p2) : lparam);
  });

  if (lparam[0] === undefined) { throw 'No match.'; }
  PPx.Execute(`*sendmessage %N,177,${wparam[0]},${lparam[0]}`);

} catch (e) {
  PPx.SetPopLineMessage(`selStr: ${e}`);
  PPx.Quit(-1);
}

