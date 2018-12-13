//!*script
// TABで窓移動PPc用
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/ppv.html
// 実行元のPPcIDを文字コードに変換
var useppc = PPx.Extract('%n').slice(1).charCodeAt(0) + 1;
// 実行元PPcよりアルファベット順で後のPPcがあればフォーカスを移す
for (var i = useppc; i < 91; i++) {
  ppcid = String.fromCharCode(i);
  if (PPx.Extract('%NC' + ppcid).match(/.+/)) {
    PPx.Execute("*focus C" + ppcid);
    PPx.Quit(-1);
  }
}
// 無ければPPvにフォーカス
for (var i = 65; i < 91; i++) {
  ppvid = String.fromCharCode(i);
  if (PPx.Extract('%NV' + ppvid).match(/.+/)) {
    PPx.Execute("*focus V" + ppvid);
    PPx.Quit(-1);
  }
}
// PPvが無ければ通常のTabの動作
PPx.Execute("%K\"@F6\"");
