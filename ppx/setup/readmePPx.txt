※※※セットアップの手順

1, ppxフォルダ内のファイルをコピー
2, 各種ライブラリ導入 ※ppxフォルダ内に旧verのdllを用意
	7-zip32 FrostMoonProject(http://www16.atpages.jp/rayna/soft.html)
	unrar rarlab(http://www.rarlab.com/rar_add.htm)
	unrar32 GitHub(https://github.com/rururutan/unrar32)
	bregonig.dll K.Takata(http://k-takata.o.oo7.jp/mysoft/bregonig.html)
	SSL Indy(https://indy.fulgan.com/SSL/)
3, ppxモジュール導入 message,window,text,script
4, Gdriveから設定ファイルを落とす
5, setup.exeを実行
6, このフォルダをppxのインストールフォルダに配置して読み込ませるPxファイルを
   マークし下記コマンドを実行

%Ons %"設定ファイル読み込み"%Q"読み込ませるPxファイルをマークしてください" *ifmatch Px*.cfg %:PPCUSTW CA %FDC %:*closeppx

※PPXDEF.CFGへ直接書き込むと初期化エラーが発生するので追記はNG