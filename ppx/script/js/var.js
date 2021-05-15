//!*script
/* 変数一覧 */

PPx.Echo(
  '%W:\t' + PPx.Extract('%W') +
  '\n%n:\t' + PPx.Extract('%n') +
  '\n%n#:\t' + PPx.Extract('%n#') +
  '\n%n#:\t' + PPx.Extract('%N') +
  '\n%n#:\t' + PPx.Extract('%N.') +
  '\n%FD:\t' + PPx.Extract('%FD') +
  '\n%FDV:\t' + PPx.Extract('%FDV') +
  '\n%FDS:\t' + PPx.Extract('%FDS') +
  '\n%linkedpath(%FDC):\t' + PPx.Extract('%*linkedpath(%FDC)') +
  '\n%*mousepos(x):\t' + PPx.Extract('%*mousepos(x)') +
  '\n%*mousepos(y):\t' + PPx.Extract('%*mousepos(y)') +
  '\n%*cursorpos(x):\t' + PPx.Extract('%*cursorpos(x)') +
  '\n%*cursorpos(y):\t' + PPx.Extract('%*cursorpos(y)') +
  '\n%*ppxlist():\t' + PPx.Extract('%*ppxlist()') +
  '\n%*RESULT(DirectoryType):\t' + PPx.DirectoryType +
  '\n%*RESULT(exists,%FDC):\t' + PPx.Extract('%*RESULT(exists,%FDC)') +
  '\n%*clippedtext():\t' + PPx.Extract('%*clippedtext()')
);
