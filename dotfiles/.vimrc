"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================
"# 文字コードの判別
set fileformats=unix,dos,mac
set encoding=utf-8
if has('iconv')
  set fileencodings=ucs-bom,utf-8,iso-2022-jp,euc-jp,utf-16le,utf-16,cp932,default,latin1
else
  set fileencodings=ucs-bom,utf-8,sjis,utf-16le,utf-16,cp932,default,latin1
endif
"# scriptencodingは本来ファイル先頭で指定するべきだが、
"# 内部エンコーディングを変更した場合は再設定の必要があるということ
scriptencoding utf-8

" source $VIM/syntaxinfo.vim

if !has('gui_running')
  "# ColorScheme_cui
  colorscheme bong16
  set title titlestring=Vim
else
  set title titlestring=Gvim
endif

" set shell=C:\bin\Scoop\apps\nyagos\current\nyagos.exe\ --norc
" set shellcmdflag=-c
" set shellpipe=\|&\ tee
" set shellredir=>%s\ 2>&1
" set shellxquote='('
"======================================================================
"# Initial {{{
let $HOME = 'C:\bin\home'
let $MYVIMRC = 'C:\bin\repository\tar80\misc\dotfiles\.vimrc'
let $PATH = 'C:\bin\repository\tar80\misc\nodejs\node_modules\.bin;' . $PATH
" let $NODE_PATH = 'C:\bin\repository\tar80\misc\nodejs\node_modules'
let g:mapleader                 = ';'
let g:no_gvimrc_example         = 1
let g:no_vimrc_example          = 1
let g:loaded_gzip               = 1
let g:loaded_tar                = 1
let g:loaded_tarPlugin          = 1
let g:loaded_zip                = 1
let g:loaded_zipPlugin          = 1
let g:loaded_rrhelper           = 1
let g:loaded_vimball            = 1
let g:loaded_vimballPlugin      = 1
let g:loaded_getscript          = 1
let g:loaded_getscriptPlugin    = 1
let g:loaded_netrw              = 1
let g:loaded_netrwPlugin        = 1
let g:loaded_netrwSettings      = 1
let g:loaded_netrwFileHandlers  = 1
let g:skip_loading_mswin        = 1
"# メニュー
let g:did_install_default_menus = 1
let g:did_install_syntax_menu   = 1
"# 標準のparen ※vim-parenmatchを読み込むのでoff(=1)
let g:loaded_matchparen         = 1
"}}}
"======================================================================
"# Options {{{
"# 編集中ファイルの親ディレクトリをwdに設定
set autochdir
"# ファイル保存初期ディレクトリ
set browsedir =buffer
"# undoファイルのパス
set undofile
set undodir =$HOME/.cache/undolog
"# 未保存ファイルを閉じる時にダイアログを出さない
set confirm
"# viminfoの設定
set viminfo =%2,'30,/10,:200,<200,f1,h,s10,c
"# CursorHoldI,swapfileの待機時間(:default=4000ミリ秒)
set updatetime =10000
"# カレント以外の窓最小高さ
"# set winminheight=2
"# 行番号
set number
"# ルーラー
set ruler
"# タブや改行を表示 (list:表示)
set list
"# 長い行の折り返し
set wrap
"# ステータスのモード表示
set noshowmode
"# スクロール時に端N行残す
set scrolloff =1
"# 行頭のTABはshiftwidthの数だけスペースで補完
set smarttab
set shiftwidth =2
"# TABで挿入する桁数
set softtabstop =2
"# タブ幅
set tabstop<
"# タブをスペースに展開する
set expandtab
"# 検索時に大文字小文字を無視 (noignorecase:無視しない)
set ignorecase
"# 置換時、gオプションをデフォルトで有効にする
set gdefault
set incsearch
set hlsearch
"# 折り返し行のインデントを揃える
set breakindent
"# 折り返しの行頭表示
set showbreak =>>
"# 単語の途中で折り返さない
set linebreak
"# フリーカーソルを有効にするモード（block=矩形）
set virtualedit =block
"# キーコマンドタイムアウト
set timeout timeoutlen =2000 ttimeoutlen =100
"# スペルチェックから日本語を外す
set spelllang +=cjk
"# 8進数無効 <C-a>,<C-x>に影響する為
set nrformats -=octal
"# 行末・行頭の移動を可能にするキー
set whichwrap =<,>,[,],b
"# 2バイト文字記号でカーソル位置がずれないように
set ambiwidth =double
"# マクロ実行中などの画面再描画を行わない
set lazyredraw
"# Windowsでパスの区切りに / を使えるようにする
" set shellslash
"# w,bの移動で認識する文字
set iskeyword +==
"# 起動時のメッセージ非表示
" set shortmess+=I
"# タブライン常時表示
set showtabline =2
"# ヴィジュアルベル off
set visualbell t_vb =
"# 画面最後の行をできる限り表示する
set display =lastline
"# 対応する括弧を指定
set matchpairs +=【:】,[:]
"# 補完メニューの高さ
set pumheight =10
"# 補完メニューオプション
set completeopt =menuone,noselect
" set completeopt =menuone,noselect,popup
" set pvp =height:10,width:60
set completefunc =BingSuggest
"# diffの設定
set diffopt +=vertical,closeoff,iwhite,context:3,indent-heuristic,algorithm:histogram
"# 自動インデント
set autoindent
"# バックスペースでインデントや改行を削除できるようにする
set backspace =indent,eol,start
"# 検索時にファイルの最後まで行った時最初に戻らない
set nowrapscan
"# 括弧入力時に対応する括弧を表示 matchtime=0で非表示
set showmatch matchtime =3
"# コマンドライン補完するときに強化されたものを使う(参照 :help wildmenu)
set wildmenu
set wildmode =longest:full,full
"# テキスト挿入中の自動折り返しを日本語に対応させる
set formatoptions +=mMj
"# どの文字でタブや改行を表示するかを設定
set listchars =tab:\|\ ,extends:<,precedes:>,trail:_,
"# 常にステータス行を表示 (詳細は:he laststatus)
set laststatus =2
"# コマンドラインの高さ (Windows用gvim使用時はgvimrcを編集すること)
set cmdheight =2
"# コマンドをステータス行に表示
" set showcmd
"# バックアップファイルを作成しない
set nobackup
set noswapfile
"#}}}
"======================================================================
"# Plugins{{{
" packadd! matchit
"# cleverf{{{
"# 行を跨がない = 1
let g:clever_f_across_no_line = 0
let g:clever_f_ignore_case    = 1
let g:clever_f_smart_case     = 1
" let g:clever_f_use_migemo     = 1
"# f前方,F後方検索に固定 = 1
let g:clever_f_fix_key_direction  = 0
"# cleverf起動前に設定する必要あり
let g:clever_f_mark_cursor        = 1
let g:clever_f_mark_cursor_color  = "SpellRare"
"# 任意の記号にマッチ
" let g:clever_f_chars_match_any_signs = ';'
"# カーソルの色を消す？※1にすると色が戻らなくなる
let g:clever_f_hide_cursor_on_cmdline = 0
"#}}}
"# vim-plug{{{
"# プラグインの読み込み
let g:plug_shallow = 0

call plug#begin('~/vimfiles')
"# auto
  Plug 'shougo/vimproc.vim', { 'dir': '~/vimfiles/vimproc.vim', 'do': 'make' }
  Plug 'rhysd/clever-f.vim'
  Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
  Plug 'junegunn/fzf.vim'
  " Plug 'ctrlpvim/ctrlp.vim'
  " Plug 'mattn/ctrlp-matchfuzzy'
  Plug 'itchyny/lightline.vim'
  Plug 'itchyny/vim-parenmatch'
  Plug 'itchyny/vim-gitbranch'
  Plug 'kana/vim-operator-user'
  Plug 'kana/vim-operator-replace'
  Plug 'leafCage/yankround.vim'
  Plug 'w0rp/ale'
  Plug 'tyru/caw.vim'
  " Plug 'tpope/vim-fugitive'
  " Plug 'lambdalisue/gina.vim', { 'on': ['Gina'] }
  " Plug 'gorodinskiy/vim-coloresque'
"# manual
  Plug '~/vimfiles/_rcPlug'
  Plug '~/vimfiles/bitmaps'
  Plug '~/vimfiles/autoload'
  Plug '~/vimfiles/colors'
  Plug '~/vimfiles/dict'
  Plug '~/vimfiles/ftplugin'
  Plug '~/vimfiles/syntax'
  Plug '~/vimfiles/vim-autocomplpop'
  Plug '~/vimfiles/vimdoc-ja'
call plug#end()

"# インストール状態をチェック (https://zenn.dev/mattn/articles/565c4ec71f461cbbf5c9)
let s:plugs = get(s:, 'plugs', get(g:, 'plugs', {}))
function! FindPlugin(name) abort
  return has_key(s:plugs, a:name) ? isdirectory(s:plugs[a:name].dir) : 0
endfunction

command! -nargs=1 UsePlugin if !FindPlugin(<args>) | finish | endif

runtime! _rcPlug/*.vim
"#}}}}}}
"======================================================================
"# Autocmd {{{
"# imLineColor{{{
augroup vimrcImLineColor
  autocmd!
  "# 挿入モードで一定時間キー入力がなければ着色
  autocmd CursorHoldI * setlocal cursorline
  "# 挿入モード中にフォーカスが外れたら着色
  autocmd FocusLost,BufLeave * execute (mode() == 'i') ? 'setlocal cursorline' : ''
  "# 挿入モードを抜ける時に色を戻す
  autocmd BufEnter,CursorMovedI,InsertLeave * setlocal nocursorline
augroup END
"}}}
"# vimrcAU{{{
augroup vimrcAU
  autocmd!
  "# 通常時はrelativenumber
  autocmd CmdLineLeave * setlocal relativenumber
  "# insertmodeを抜けるときにime off
  autocmd InsertLeave * setlocal iminsert =0
augroup END

" autocmd vimrcAU BufNew * call timer_start(0, { -> s:bufnew() })
" function! s:bufnew()
"     if &buftype == "terminal" && &filetype == ""
"         set filetype=terminal
"     endif
" endfunction

"# filetype
"# 改行時の自動コメントアウト停止
autocmd vimrcAU FileType * setlocal formatoptions -=r
autocmd vimrcAU FileType * setlocal formatoptions -=o
autocmd vimrcAU FileType javascript  call s:set_js()
autocmd vimrcAU FileType xcfg setlocal dictionary=~/vimfiles/dict/xcfg.dict
" autocmd vimrcAU FileType terminal call timer_start(0, { -> feedkeys("\<C-w>" . "\<C-w>")})
function s:set_js() abort
  iab ppx PPx
  setlocal dictionary =~/vimfiles/dict/javascript.dict,~/vimfiles/dict/ppx.dict
endfunction

"# Diff起動時の設定
" autocmd vimrcAU QuitPre * call s:quit_diff()
autocmd vimrcAU VimEnter,FilterWritePre * call s:set_diff()
function s:set_diff() abort
  if &diff
    let g:diff_translations = 0
    syntax off
    highlight Normal guifg=#3C3C40
  endif
endfunction
" function s:quit_diff() abort
"   if &diff
"     DiffExit
"   endif
" endfunction
"#}}}}}}
"======================================================================
"# Command{{{
"# 編集中バッファの差分を表示
command! Difforg vert new | set bt=nofile | r ++edit # | 0d_ | diffthis | wincmd p | diffthis
"# 隣のバッファとdiff
command! Diff syntax off | highlight Normal guifg=#3C3C40 | diffthis | wincmd p | diffthis | wincmd h
command! DiffExit syntax enable | diffoff
"# <C-x><C-u>ユーザー補完にBingサジェストを割り当てる
function! BingSuggest(findstart, base)
  if a:findstart
      let s:line = getline('.')
      let s:start = col('.') - 1
      while s:start > 0 && s:line[s:start - 1] =~ '\S'
          let s:start -= 1
      endwhile
      return s:start
  else
      let s:ret = system('curl -s -G --data-urlencode "q='
                  \ . a:base . '" "https://www.bing.com/osjson.aspx"')
      let s:res = split(substitute(s:ret,'\[\|\]\|"',"","g"),",")
      return s:res
  endif
endfunction
"#}}}
"======================================================================
"# Keys{{{
"# general{{{
"# 検索ハイライトoff
noremap <silent>, :<C-u>nohlsearch<cr>
"# スペースでﾊﾞｯﾌｧ移動制御
noremap <space> <C-w>
noremap <nowait> <Space><Space> <C-w><C-w>
"# F3で行番号切り替え
noremap <silent><F3> :<C-u>setlocal relativenumber!<CR>
"# F12でラップ状態の切り替え
noremap <silent> <F12> :<C-u>call <SID>setWrap()<CR>
function s:setWrap()
  let s:wr = &wrap ? 'nowrap' : 'wrap'
  if &diff
    execute 'wincmd p | setlocal' s:wr '| wincmd p | setlocal' s:wr
  else
    execute 'setlocal' s:wr
  endif
  unlet s:wr
endfunction
"#}}}
"# normal_mode{{{
"# 行分割
nnoremap <space>j i<CR><ESC>
"# 行末までヤンク
nnoremap Y y$
"# コマンドモードでは行番号表示
nnoremap <silent> : :<C-u>call <SID>setNum()<CR>
function s:setNum()
  setlocal norelativenumber
  redraw
  call feedkeys(':','n')
endfunction

"# vimrc
nnoremap <silent> <F5> :<C-u>source $MYVIMRC<CR>
nnoremap <F9> :<C-u>tabnew<CR>:edit $MYVIMRC<CR>

"# ppx
nnoremap <silent> <C-TAB> :<C-u>!Start C:/bin/ppx/ppcw.exe -r<CR>
nnoremap <F6> :<C-u>tabnew<CR>:edit C:/bin/repository/tar80/misc/ppx/xTest.js<CR>
nnoremap <C-F6> :<C-u>!start C:/bin/ppx/ppcw.exe -r -k *script \%'myrepo'\%\ppx\xTest.js<CR>
nnoremap <silent> <C-F9> :<C-u>!start C:/bin/ppx/ppcw.exe -noactive -r -k *ifmatch Px*,\%*name(,%) \%:*setcust @%:p \%:*linemessage load %<CR>:echo "call ppx! *setting load*"<CR>
"#}}}
"# command_mode{{{
cnoremap <F12> <C-u>rviminfo ~/_xxxinfo<CR>:
cnoremap <C-a> <HOME>
"#}}}
"# insert_mode{{{
noremap! <expr> <F4> <SID>ToggleShellslash()
function s:ToggleShellslash()
  if &shellslash
    echo '\noshellslash\'
    setlocal noshellslash
  else
    echo '/shellslash/'
    setlocal shellslash
  endif
  return ''
endfunction
noremap! <C-j> <Down>
noremap! <C-k> <Up>
noremap! <C-l> <Delete>
inoremap <C-b> <Left>
inoremap <C-f> <Right>
inoremap <S-Delete> <C-o>d$
"# completion
inoremap <expr> ( col('.') == col('$') ? "()<Left>" : "("
inoremap <expr> { col('.') == col('$') ? "{}<Left>" : "{"
inoremap <expr> ) (strpart(getline('.'), col('.') -2, 2) == '()') ? "\<Right>" : ")"
inoremap <expr> } (strpart(getline('.'), col('.') -2, 2) == '{}') ? "\<Right>" : "}"
" inoremap <expr> ' <SID>QuoteBehavior("'")
" function! s:QuoteBehavior(tKey)
"   if col('.') == col('$')
"        \ && (char2nr(strpart(getline('.'),col('.') -2, 1)) == 32
"        \ || strpart(getline('.'),col('.') -2, 1) == '('
"        \ || strpart(getline('.'),col('.') -2, 1) == '[')
"     return a:tKey . a:tKey . "\<Left>"
"   elseif (strpart(getline('.'),col('.') -2, 2) == '()'
"        \ || strpart(getline('.'),col('.') -2, 2) == '[]')
"     return a:tKey . a:tKey . "\<Left>"
"   else
"     return a:tKey
"   endif
" endfunction
"# omni
" inoremap <expr> . empty(&omnifunc) ? "." : pumvisible() ? ".<C-x><C-o><C-p><Down>" : ".<C-x><C-o><Down>"
"# TABの挙動
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : <SID>ComplTabKey()
function! s:ComplTabKey()
  const s:chr = strpart(getline('.'),col('.') -2, 1)
  if s:chr == "/"
    set csl =slash
  elseif s:chr == "\\"
    set csl =backslash
  else
    unlet s:chr
    return "\<TAB>"
  endif
    unlet s:chr
    return "\<C-x>\<C-f>"
endfunction
"#}}}
"# visual_mode{{{
"# 範囲を括る
vnoremap <space>" c"<C-r>""<ESC>
vnoremap <space>' c'<C-r>"'<ESC>
vnoremap <space>( c(<C-r>")<ESC>
vnoremap <space>[ c[<C-r>"]<ESC>
vnoremap <space>{ c{<C-r>"}<ESC>
vnoremap <space>$ c${<C-r>"}<ESC>
"# 範囲インデント処理後に解除しないように
vnoremap < <gv
vnoremap > >gv
"# カーソルを動かさず選択した文字列を検索
vnoremap <silent> g* "vy:<C-u>let @/ = "<C-R>v"<CR>:<C-u>set hls<CR>gv
vnoremap <silent> * "vy:<C-u>let @/ = "\\\<<C-R>v\\\>"<CR>:<C-u>set hls<CR>gv
"#}}}}}}
filetype plugin indent on
