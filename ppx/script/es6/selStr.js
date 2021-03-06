﻿//!*script
/* 一行編集上で編集中の文字の選択状態を操作する */
//
// PPx.Arguments(0) = "(lparam(wparam))"
// 引数は正規表現で指定
// lparam:編集中テキストの全体を指定
// wparam:選択部分を指定
// PPXMES.DLLが必要
// 参照元:https://egg.5ch.net/test/read.cgi/software/1476708638/409

'use strict';

try {
  const str = PPx.Extract('%*edittext()');
  const reg = new RegExp(PPx.Arguments(0));
  const param = ((s, m) => ({
    l: m[1].length,
    w: (m[2] !== '') ? s.lastIndexOf(m[2]) : m[1].length
  }))(str, str.match(reg));

  if (param.l === undefined) { throw 'selStr: no match.'; }
  PPx.Execute(`*sendmessage %N,177,${param.w},${param.l}`);

} catch (e) {
  PPx.SetPopLineMessage(`selStr: ${e}`);
  PPx.Quit(-1);
}
