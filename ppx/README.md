#セットアップの手順
---

1. [ppx](https://github.com/tar80/misc/archive/master.zip)を解凍してコピー
- 各種ライブラリ導入
  - 7-zip32  [FrostMoonProject](http://www16.atpages.jp/rayna/soft.html)
  - unrar [rarlab](http://www.rarlab.com/rar_add.htm)
  - unrar32  [GitHub](https://github.com/rururutan/unrar32)
  - bregonig [K.Takata](http://k-takata.o.oo7.jp/mysoft/bregonig.html)
  - openSSL [Indy](https://indy.fulgan.com/SSL/)
- ppxモジュール導入  
　- [Paper Plane xUI Message Module](http://toro.d.dooo.jp/slppx.html#ppxmes)
  - [Paper Plane xUI Window Module](http://toro.d.dooo.jp/slppx.html#ppxwin)
  - [Paper Plane xUI Text Module](http://toro.d.dooo.jp/slppx.html#ppxtext)
  - [Paper Plane xUI Script Module](http://toro.d.dooo.jp/slppx.html#ppxscr)
- setup.exeを実行
- Px設定ファイルをマークし下記コマンドを実行<br>`%Ons %"設定ファイル読み込み"%Q"読み込ませるPxファイルをマークしてください" *ifmatch Px*.cfg %:PPCUSTW CA %FDC %:*closeppx`
