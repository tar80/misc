//!*script
/* addhistoryの誤爆防止*/
'use strict';
const rep = /[%"]/g;
const esc = {
  '(^.)': '\\1',
  '"': '""',
  '%': '%%',
  '(.$)': '\\2'
};
const comp = PPx.Extract('%*edittext').replace(rep, (c) => esc[c]);

PPx.Execute(`*addhistory h,"${comp}"`);

