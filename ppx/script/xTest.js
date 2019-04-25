//!*script
// 変数確認用
var fd = PPx.Extract('%FD%\\');
//PPx.Echo();
//PPx.SetPopLineMessage();
// PPx.SetPopLineMessage(PPx.Extract("%NC"));
PPx.EntryHighlight = PPx.Arguments(0);

//PPx.Echo(PPx.Extract(PPx.Entry(0).Name));
//ディレクトリの種類
// PPx.Echo(PPx.DirectoryType);
// 書庫のあるディレクトリの抽出
//PPx.SetPopLineMessage(PPx.Extract("%*regexp(\"%FD\",\"s/^(.*)\\\\.*(zip|rar)$/$1/\")"))
// 書庫名の抽出//PPx.SetPopLineMessage(PPx.Extract("%*regexp(\"%FDC\",\"s/^(.*\\\\.*?(zip)).*/$2/\")"))
// コメント
//PPx.Execute("*linemessage %*comment(1)");
// 反対窓カレントディレクトリ
//PPx.SetPopLineMessage(PPx.GetFileInformation(fn))
// PPx ID
//PPx.SetPopLineMessage("IDname:" + PPx.WindowIDName);
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
