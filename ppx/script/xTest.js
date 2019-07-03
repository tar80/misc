//!*script
// 変数確認用
// var fs = PPx.CreateObject('Scripting.FileSystemObject');
// var as = new ActiveXObject('ADODB.Stream');
// var backupDir ;X_saveの値
// var cDir  ;current directory
// var opDir ;opposite directory
// var tDir  ;target directory
// var filePath ;full path
//ディレクトリの種類
// PPx.Echo(PPx.DirectoryType);
// 書庫のあるディレクトリの抽出
//PPx.SetPopLineMessage(PPx.Extract("%*regexp(\"%FD\",\"s/^(.*)\\\\.*(zip|rar)$/$1/\")"))
// 書庫名の抽出
//PPx.SetPopLineMessage(PPx.Extract("%*regexp(\"%FDC\",\"s/^(.*\\\\.*?(zip)).*/$2/\")"))
// コメント
//PPx.Execute("*linemessage %*comment(1)");
// PPx ID
// PPx.SetPopLineMessage("IDname:" + PPx.WindowIDName);
// PPx 一枚窓のID
//PPx.SetPopLineMessage("comboIDname:" + PPx.ComboIDName);
// PPx一枚窓の数
//PPx.SetPopLineMessage("combo:" + PPx.GetComboItemCount);
// PPx一枚窓のペイン数
//PPx.SetPopLineMessage("pane:" + PPx.Pane.Count);
// PPx.SetPopLineMessage("tab:" + PPx.Pane.Tab.Count);
//PPx.Echo(PPx.SyncView);
// 汎用一時利用パス
//PPx.Echo(PPx.Extract('%si"ppp"'));
// 起動状態のPPXID取得
// var ppxid = new Array();
//   for(var i = 65; i <= 90; i++){
//   var id = String.fromCharCode(i);
//   if(PPx.Extract('%NV' + id)) ppxid.push('V' + id);
//   if(PPx.Extract('%NB' + id)) ppxid.push('B' + id);
//   if(PPx.Extract('%NC' + id)) ppxid.push('C' + id);
// }
// ppxid.sort(function(a, b){return a < b? 1: -1;});
// PPx.SetPopLineMessage(ppxid);
