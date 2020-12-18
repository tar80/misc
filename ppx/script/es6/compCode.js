//!*script
'use strict';
/* 記号のエスケープ処理 */
// 引数は''で括る。【"】【%】【\】が指定できる ex) compCode.js,'""%%\\'
const str = `[${PPx.arguments(0).slice(1, -1)}]`;
const rep = new RegExp(str, 'g');
const esc = {
  '"': '""',
  '%': '%%',
  '\\': '\\\\'
};
PPx.Result = PPx.Extract('%*edittext').replace(rep, (c) => esc[c]);
