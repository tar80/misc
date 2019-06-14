//!*script
// 窓の位置調整
// PPx.Arguments(0:ウインドウタイトル,1:幅,2:高)
PPx.Execute('*windowposition %*findwindowtitle("' + PPx.Arguments(0) + '"),' + PPx.Arguments(1) + ',' + PPx.Arguments(2));
