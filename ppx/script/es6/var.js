//!*script
/* 変数一覧 */

'use strict';
PPx.Echo(
  `%W\t ${PPx.Extract('%W')}
 %n\t ${PPx.Extract('%n')}
 %n#\t ${PPx.Extract('%n#')}
 %N\t ${PPx.Extract('%N')}
 %N.\t ${PPx.Extract('%N.')}
 %FD\t ${PPx.Extract('%FD')}
 %FDV\t ${PPx.Extract('%FDV')}
 %FDS\t ${PPx.Extract('%FDS')}
 %linkedpath(%FDC)\t ${PPx.Extract('%*linkedpath(%FDC)')}
 %*mousepos(x)\t ${PPx.Extract('%*mousepos(x)')}
 %*mousepos(y)\t ${PPx.Extract('%*mousepos(y)')}
 %*cursorpos(x)\t ${PPx.Extract('%*cursorpos(x)')}
 %*cursorpos(y)\t ${PPx.Extract('%*cursorpos(y)')}
 %*ppxlist()\t${PPx.Extract('%*ppxlist()')}
 %*clippedtext()\t ${PPx.Extract('%*clippedtext()')} `
);
