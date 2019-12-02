//!*script
/* 背景透過用 */

var tID;
var xID = PPx.WindowIDName;
var soft;    // 透過弱
var hard;    // 透過強

(xID == ('C_A'||'C_B') && PPx.Pane.Count <= 2)
  ? tID = 'n#'
  : tID = 'n';
try {
  PPx.Execute('*customize X_bg:O_%' + tID + '=' + PPx.Arguments(0));
  PPx.Execute('*setcust _User:u_opa=0');
} catch (e) {
  soft = 80;
  hard = 60;
  PPx.Execute('*RotateExecute u_opa, *customize X_bg:O_%' + tID + '=100, *customize X_bg:O_%' + tID + '=' + soft + ', *customize X_bg:O_%' + tID + '=' + hard);
};
