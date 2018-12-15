//!*script
// 変数確認用
//書庫のあるディレクトリの抽出
//PPx.SetPopLineMessage(PPx.Extract("%*regexp(\"%FD\",\"s/^(.*)\\\\.*(zip|rar)$/$1/\")"))
//書庫名の抽出//PPx.SetPopLineMessage(PPx.Extract("%*regexp(\"%FDC\",\"s/^(.*\\\\.*?(zip)).*/$2/\")"))
//
//PPx.Execute("*linemessage %*comment(1) %:*stop");
//PPx.SetPopLineMessage(PPx.Extract('%si"ppp"'));
PPx.SetPopLineMessage("IDname:"+PPx.WindowIDName);
//PPx.SetPopLineMessage("pane:"+PPx.Pane.Count);
//PPx.SetPopLineMessage("combo:"+PPx.GetComboItemCount);
//PPx.SetPopLineMessage("comboIDname:"+PPx.ComboIDName);
//PPx.SetPopLineMessage(PPx.SyncView);
//ppp = PPx.Extract("%*regexp(\"%R\",\"tr/\\//@/\")");
//var upperDir = PPx.Extract("%*regexp(\"%FD\",\"s/^(.*)(\\\\.*$)/$1/\")");
//var frag = PPx.Entry(i).Information.replace(/[\s\S]*Fragments\s+:(\d+).[\s\S]*/g,'$1');
//var fso = PPx.CreateObject("Scripting.FileSystemObject");

//PPx.Echo("test");
