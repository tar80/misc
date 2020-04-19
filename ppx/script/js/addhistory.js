//!*script
/* addhistoryの誤爆防止 */
var rep = /[%"]/g;
var esc = {
  '"': '""',
  '%': '%%'
};

var comp = PPx.Extract('%*edittext').replace(rep, function (c) {
  return esc[c]
});
PPx.Execute('*addhistory h,"' + comp + '"');


