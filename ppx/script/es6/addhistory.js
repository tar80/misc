//!*script
/* addhistoryの誤爆防止 */
'use strict';
const rep = /[%"]/g;
const esc = {
  '"': '""',
  '%': '%%'
};
const comp = PPx.Extract('%*edittext').replace(rep, (c) => esc[c]);

PPx.Execute(`*addhistory h,"${comp}"`);

