//!*script
/* 背景透過用 */

var soft = 85;
var hard = 70;
var xID = PPx.WindowIDName;
var tID;
if (xID == ('C_A'||'C_B') && PPx.Pane.Count <= 2)
  tID = 'n#';
else
  tID ='n';
PPx.Execute('*RotateExecute u_opa, *customize X_bg:O_%' + tID + '=100, *customize X_bg:O_%' + tID + '=' + soft + ', *customize X_bg:O_%' + tID + '=' + hard);
