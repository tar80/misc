//!*script
/* 背景透過用 */
// PPx.Arguments() = [0]0-100 ;透過度

var tID;
var xID = PPx.WindowIDName;
var soft;    // 透過弱
var hard;    // 透過強

tID = (xID == ('C_A'||'C_B') && PPx.Pane.Count <= 2)
  ? 'n#' : 'n';
if (PPx.Arguments.length) {
  PPx.Execute('*customize X_bg:O_%' + tID + '=' + PPx.Arguments(0));
  PPx.Execute('*setcust _User:u_opa=0');
} else {
  soft = 80;
  hard = 60;
  PPx.Execute('*RotateCustomize X_bg:O_%%' + tID + ', 100, ' + soft + ', ' + hard);
  // PPx.Execute('*RotateExecute u_opa, *customize X_bg:O_%' + tID + '=100, *customize X_bg:O_%' + tID + '=' + soft + ', *customize X_bg:O_%' + tID + '=' + hard);
}
