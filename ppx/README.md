## 構成

 - cfg/ PPx設定ファイル
 - script/ PPx Script
 - PPXUKEYS.txt キーバインド補完リスト用
 - PPXUSCRIPT.txt コマンド補完リスト用

### セットアップの手順

1. [ppx](https://github.com/tar80/misc/archive/master.zip)を解凍してコピー
- 各種ライブラリ導入
  - 7-zip32  [FrostMoonProject](http://www16.atpages.jp/rayna/soft.html)
  - unrar [rarlab](http://www.rarlab.com/rar_add.htm)
  - unrar32  [rururutan](https://github.com/rururutan/unrar32)
  - unlha32  [Micco's HomePage](https://micco.mars.jp/mysoft/unlha32.htm)
  - unbypass [TORO's HomePage](http://toro.d.dooo.jp/slplugin.html#unbypass)
  - bregonig [K.Takata's WebPage](http://k-takata.o.oo7.jp/mysoft/bregonig.html)
  - openSSL [Indy](https://indy.fulgan.com/SSL/)
  - migemo [KaoriYa](https://www.kaoriya.net/software/cmigemo/)
- susieプラグイン導入
  - axpathlist2 [属性DBによる...](http://artisticimitation.web.fc2.com/adbtest/) 
  - edgh [TAKABO SOFT](http://takabosoft.com/edge/tool)
  - ifcms [Nilposoft](http://nilposoft.info/susie-plugin/index.html#ifcms)
  - ifapd [走矢灯](http://kt.sakura.ne.jp/~timeflow/MENU.HTM)
  - iftwic [TORO's HomePage](http://toro.d.dooo.jp/slplugin.html#iftwic)
  - ifvch [ぽかんらぼ](https://www.pokanchan.jp/dokuwiki/software/spi)
- ppxモジュール導入
  - [Paper Plane xUI Message Module](http://toro.d.dooo.jp/slppx.html#ppxmes)
  - [Paper Plane xUI Window Module](http://toro.d.dooo.jp/slppx.html#ppxwin)
  - [Paper Plane xUI Text Module](http://toro.d.dooo.jp/slppx.html#ppxtext)
  - [Paper Plane xUI Script Module](http://toro.d.dooo.jp/slppx.html#ppxscr)
- setup.exeを実行
- Px設定ファイルをマークし下記コマンドを実行<br>`%Ons %"設定ファイル読み込み"%Q"読み込ませるPxファイルをマークしてください" *ifmatch Px*.cfg %:PPCUSTW CA %FDC %:*closeppx`
