"=============================================================================
"    Description: UTF-8化と文字コード自動認識設定
"                 http://www.kawaz.jp/pukiwiki/?vimを改変
"         Author: fuenor <fuenor@gmail.com>
"                 http://sites.google.com/site/fudist/Home/vim-nihongo-ban/vim-utf8
"        Version: 1.3
"=============================================================================
scriptencoding utf-8

" 改行コードの自動認識
set fileformats=unix,dos,mac

let s:cpo_save = &cpo
set cpo&vim

"----------------------------------------
" 内部エンコーディングと文字コード自動認識
"----------------------------------------
" let s:MSWindows = has('win95') + has('win16') + has('win32') + has('win64')
"
" vim.exeと同じディレクトリに特定のファイルが存在する場合は以下のように設定される。
" デフォルトはUTF-8
" --------------------------------------------------------------
" | ファイル名    |                                            |
" |---------------|---------------------------------------------
" | cp932         | 内部エンコーディングをcp932に設定。        |
" --------------------------------------------------------------
" if !has('gui_running') && s:MSWindows
"   set termencoding=cp932
" endif
" if filereadable($VIM . '/cp932')
"   set encoding=cp932
" else
  " デフォルト
  set encoding=utf-8
" endif
"
" fileencodingsのデフォルト設定
if &encoding == 'utf-8'
  set fileencodings=ucs-bom,utf-8,default,latin1
else
  set fileencodings=ucs-bom
endif
"
if has('iconv')
  if &encoding == 'utf-8'
    set fileencodings=ucs-bom,utf-8,iso-2022-jp,euc-jp,cp932,utf-16le,utf-16,latin1
  else
    set fileencodings=ucs-bom,utf-8,ucs-2le,ucs-2,iso-2022-jp,euc-jp,cp932
  endif
  if &enc !=# 'utf-8' && iconv('変換', &enc, 'utf-8') == '変換'
    let &fileencodings=substitute(&fileencodings, ',utf-8', '', 'g')
  endif
  if &enc !=# 'cp932' && iconv('変換', &enc, 'cp932') == '変換'
    let &fileencodings=substitute(&fileencodings, ',cp932', '', 'g')
  endif
  if iconv('変換', &enc, 'euc-jp') == '変換'
    let &fileencodings=substitute(&fileencodings, ',euc-jp', '', 'g')
  endif
  if iconv('変換', &enc, 'iso-2022-jp') == '変換'
    let &fileencodings=substitute(&fileencodings, ',iso-2022-jp', '', 'g')
  endif
"
  " iconvがeucJP-msに対応しているかをチェック
  if iconv("\x87\x64\x87\x6a", 'cp932', 'eucjp-ms') ==# "\xad\xc5\xad\xcb"
    let &fileencodings=substitute(&fileencodings, 'iso-2022-jp', 'iso-2022-jp-3', 'g')
    let &fileencodings=substitute(&fileencodings, 'euc-jp', 'euc-jp-ms', 'g')
  " iconvがJISX0213に対応しているかをチェック
  elseif iconv("\x87\x64\x87\x6a", 'cp932', 'euc-jisx0213') ==# "\xad\xc5\xad\xcb"
    let &fileencodings=substitute(&fileencodings, 'iso-2022-jp', 'iso-2022-jp-3', 'g')
    let &fileencodings=substitute(&fileencodings, 'euc-jp', 'euc-jisx0213', 'g')
  endif
endif
"
let vimrc_set_encoding = 1
"
" 改行コードの自動認識
set fileformats=unix,dos,mac
"
" if exists("loaded_ReCheckFENC")
"   finish
" endif
" let loaded_ReCheckFENC = 1
" "
" " Windowsで日本語を含まない場合は cp932に設定
" if has('autocmd')
"   function! AU_ReCheck_FENC()
"     if &fenc == 'utf-8' && search("[^\x01-\x7e]", 'n') == 0
"       if s:MSWindows
"         let &fileencoding='cp932'
"       else
"         let &fileencoding=&enc
"       endif
"     endif
"   endfunction
"   autocmd BufReadPost * call AU_ReCheck_FENC()
" endif
"
let &cpo = s:cpo_save
unlet s:cpo_save
