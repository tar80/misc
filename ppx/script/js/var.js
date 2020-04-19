//!*script
/* 変数一覧 */
PPx.Echo(
  '%W: ' + PPx.Extract('%W') +
  '\n%n:  ' + PPx.Extract('%n') +
  '\n%n#: ' + PPx.Extract('%n#') +
  '\n%FD:  ' + PPx.Extract('%FD') +
  '\n%FDV: ' + PPx.Extract('%FDV') +
  '\n%FDS: ' + PPx.Extract('%FDS') +
  '\n%*mousepos(x): ' + PPx.Extract('%*mousepos(x)') +
  '\n%*mousepos(y): ' + PPx.Extract('%*mousepos(y)') +
  '\n%*cursorpos(x): ' + PPx.Extract('%*cursorpos(x)') +
  '\n%*cursorpos(y): ' + PPx.Extract('%*cursorpos(y)') +
  '\n%*clippedtext(): ' + PPx.Extract('%*clippedtext()')
);
