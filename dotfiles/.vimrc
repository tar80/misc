"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================
"# Vim 8.1  Last Change: 5-may-2019.
"======================================================================
if &compatible
  set nocompatible
endif
"# 文字コードの判別
source ~/vimfiles/encode.vim
"
scriptencoding utf-8
"# Variable
let $HOME='C:/bin/home'
let mapleader=';'
"# 標準のparenを読み込まずにプラグインのparenmatchを読み込む
let g:loaded_matchparen=1
"
" カラースキム
if !has('gui_running')
  colorscheme bong16
endif
"======================================================================
"# Options {{{
"# ファイル保存初期directory
set browsedir=buffer
"# undoファイルをまとめるディレクトリ
set undofile
set undodir=$VIM/.cache/undolog
"# 未保存ファイルを閉じる時、ダイアログを出さない
set confirm
"# viminfoの設定
set viminfo=%2,'30,/10,:200,<200,f1,h,s10
"# Nミリ秒キー入力がなければにスワップファイル自動保存(:default=4000)
set updatetime=10000
"# メニューを読み込まない
set guioptions+=M
"# スクロールバーを読み込まない
set guioptions-=l
set guioptions-=L
set guioptions-=r
set guioptions-=R
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
"# スクロール時にN行残す
set scrolloff=1
"# 行頭のTABはshiftwidthの数だけスペースで補完
set smarttab
set shiftwidth=2
"# TABで挿入する桁数
set softtabstop=4
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
set showbreak=>>
"# 単語の途中で折り返さない
set linebreak
"# フリーカーソルを有効にするモード（block=矩形）
set virtualedit=block
"# キーコマンドタイムアウト
set timeout timeoutlen=2000 ttimeoutlen=100
"# スペルチェックから日本語を外す
set spelllang+=cjk
"# 8進数無効 <C-a>,<C-x>に影響する為
set nrformats-=octal
"# 行末・行頭の移動を可能にするキー
set whichwrap=<,>,[,],b
"# 2バイト文字記号でカーソル位置がずれないように
set ambiwidth=double
"# マクロ実行中などの画面再描画を行わない
set lazyredraw
"# Windowsでパスの区切りに / を使えるようにする
set shellslash
"# w,bの移動で認識する文字
set iskeyword=@,48-57,.
"# 起動時のメッセージ非表示
"set shortmess+=I
"# タブライン常時表示
set showtabline=2
"# ヴィジュアルベル off
set visualbell t_vb=
"# 画面最後の行をできる限り表示する
set display=lastline
"# 対応する括弧を指定
"set matchpairs+=【;】,";"
"# 補完メニューの高さ
set pumheight=10
"# diff縦分割
set diffopt+=vertical,iwhite,context:3
"# 自動インデント
set autoindent
"# バックスペースでインデントや改行を削除できるようにする
set backspace=indent,eol,start
"# 検索時にファイルの最後まで行った時最初に戻らない
set nowrapscan
"# 括弧入力時に対応する括弧を表示 matchtime=0で非表示
set showmatch matchtime=3
"# コマンドライン補完するときに強化されたものを使う(参照 :help wildmenu)
set wildmenu
"# テキスト挿入中の自動折り返しを日本語に対応させる
set formatoptions+=mM
"# どの文字でタブや改行を表示するかを設定
set listchars=tab:<.>,extends:<,precedes:>,trail:_,
"# 常にステータス行を表示 (詳細は:he laststatus)
set laststatus=2
"# コマンドラインの高さ (Windows用gvim使用時はgvimrcを編集すること)
set cmdheight=2
"# コマンドをステータス行に表示
"set showcmd
"# ウインドウにタイトルを付ける
set title titlestring=Vim
"# バックアップファイルを作成しない
set nobackup
set noswapfile
"#}}}
"======================================================================
"# Plugins{{{
"# インストール状態をチェック (https://ryochack.hatenablog.com/entry/2017/04/08/162354)
function s:is_plugged(name)
  if exists('g:plugs') && has_key(g:plugs, a:name) && isdirectory(g:plugs[a:name].dir)
    return 1
  else
    return 0
  endif
endfunction
"
" packadd! matchit
"# cleverf{{{
  "# 行を跨がない = 1
  let g:clever_f_across_no_line = 0
  let g:clever_f_ignore_case = 1
  let g:clever_f_smart_case  = 1
  "# let g:clever_f_use_migemo  = 1
  "# f前方,F後方検索に固定 = 1
  let g:clever_f_fix_key_direction = 0
  "# cleverf起動前に設定する必要あり
  let g:clever_f_mark_cursor = 1
  let g:clever_f_mark_cursor_color = "SpellRare"
  "# 任意の記号にマッチ
  "let g:clever_f_chars_match_any_signs = ';'
  "# カーソルの色を消す？※1にすると色が戻らなくなる
  let g:clever_f_hide_cursor_on_cmdline = 0
"#}}}
"# vim-plug{{{
call plug#begin('~/vimfiles')
"# auto
  Plug 'shougo/vimproc.vim', { 'dir': '~/vimfiles/vimproc.vim', 'do': 'make' }
  Plug 'shougo/unite.vim'
  Plug 'shougo/neoyank.vim'
  Plug 'itchyny/lightline.vim'
  Plug 'itchyny/vim-parenmatch'
  Plug 'itchyny/vim-gitbranch'
  Plug 'tpope/vim-fugitive'
  Plug 'rhysd/clever-f.vim'
  Plug 'tyru/caw.vim'
"# manual
  Plug '~/vimfiles/colors'
  Plug '~/vimfiles/autoload'
  Plug '~/vimfiles/dict'
  Plug '~/vimfiles/ftplugin'
  Plug '~/vimfiles/syntax'
  Plug '~/vimfiles/vimdoc-ja'
call plug#end()
"#}}}
"# Unite{{{
if s:is_plugged('unite.vim')
  let g:unite_ignore_source_files = ['history_unite.vim','bookmark.vim']
  let g:unite_force_overwrite_statusline = 0
  "g:unite_quick_match_table =
  "g:unite_data_directory =
  let g:unite_redraw_hold_candidates = 1000
  "let g:unite_enable_auto_select = 1
  "g:unite_restore_alternate_file = 1
  "g:unite_source_buffer_time_format = "(%H:%M:%S %Y/%m/%d)"
  "g:unite_source_file_async_command = "ls -a"
  "g:unite_source_bookmark_directory = 
  let g:unite_source_rec_min_cache_files = 20
  let g:unite_source_rec_max_cache_files = 5000
  let g:unite_source_rec_async_command = ['findu', '-L']
  "let g:unite_source_rec_find_args = ['','']
  "let g:unite_source_rec_git_command = 
  "let g:unite_source_grep_command = "grep"
  "let g:unite_source_grep_recursive_opt = "-r"
  "let g:unite_source_grep_default_opts = "-inH"
  "let e_source_grep_search_word_highlight = "Search"
  let g:unite_source_grep_encoding = "utf-8"
  "let g:unite_source_grep_separator= "--"
  "let g:unite_source_vimgrep_search_word_highlight =a"Search"
  let g:unite_source_find_command = "findu"
  let g:unite_source_find_default_opts = "-L"
  "let g:unite_source_find_default_expr = "-name "
  "let g:unite_source_line_enable_highlight = "0"
  "let g:unite_source_alias_aliases = {}
  "let g:unite_source_menu_menus  {}
  "let g:unite_source_process_enable_confirm = 1
  "let g:unite_source_output_shellcmd_colors = 
  "let g:unite_kind_jump_list_after_jump_scroll = 25
  "let g:unite_kind_file_preview_max_filesize = 1000000
  "let g:unite_kind_openable_persist_open_blink_time = "250m"
  "let g:unite_converter_file_directory_width = 45
  let g:unite_matcher_fuzzy_max_input_length = 20
  let g:neoyank#limit = 20
  "
  "# カスタムプロファイル
  call unite#custom#source('line,grep', 'matchers', 'matcher_migemo')
  call unite#custom#source('file,file_rec,file_rec/async', 'matchers', ['converter_tail', 'matcher_fuzzy'])
  call unite#custom#source('file,file_rec,file_rec/async', 'max_candidates', 40)
  call unite#custom#source('file_rec,file_rec/async', 'ignore_pattern',
        \ '\(\.bmp$\|\.png$\|\.jpg$\|\.jpg$\|\.gif$\|\.wav$\|\.mp3$\|\.mp4$\|\.sys$\|\.gid$\|\.hlp$\|\.dat$\|\.diff$\|\.dll$\|\.jax$\|\.zip\|\.7z\|\.git/\)')
  call unite#custom#profile('default', 'context', {
        \ 'start_insert' : 1,
        \ 'no_split' : 1,
        \ 'buffer_name' : ""
        \ })
  "# Unite file_rec/git(rootを固定)
  function UniteRepo()
    lcd C:/bin/repository/tar80/misc
    Unite -buffer-name=repogitory file_rec/git:--cached:--others:--exclude-standard
  endfunction
endif
"#}}}
"# lightline{{{
if s:is_plugged('lightline.vim')
  let g:lightline = {
        \ 'active': {
        \ 'left'  : [['mode', 'paste'],['bufstatus']],
        \ 'right' : [['lineinfo'],['percent'],['fileformat','fileencoding','filetype'],['gitbranch']]
        \ },
        \ 'tabline': {
        \ 'left'   : [['tabs']],
        \ 'right'  : [['cd']]
        \ },
        \ 'component': {
        \ 'lineinfo' : '%2v:%3l/%3L',
        \ 'cd'       : '%.35(%{fnamemodify(getcwd(), ":~")}%)',
        \ },
        \ 'component_function' : {
        \ 'mode': 'Unitemode',
        \ 'bufstatus': 'Mybufferstatus',
        \ 'gitbranch': 'gitbranch#name',
        \ 'fileformat': 'LightlineFileformat',
        \ 'filetype': 'LightlineFiletype',
        \ 'fileencoding': 'LightlineFileencoding',
        \ }
        \ }
  function! Unitemode()
    return &ft == 'unite' ? '' : lightline#mode()
  endfunction
  function! Mybufferstatus()
    return ('' != LightlineReadonly() ? LightlineReadonly() . ' ' : '') .
          \  ('' != LightlineModified() ? LightlineModified() : '') .
          \  (&ft == 'unite' ? unite#get_status_string() :
          \   '' != expand('%:p') ? expand('%:p') : '[No Name]')
  endfunction
  function! LightlineReadonly()
    return &ft !~? 'help' && &readonly ? 'RO |' : ''
  endfunction
  function! LightlineModified()
    return &modifiable && &modified ? '+ |' : ''
  endfunction
  function! LightlineFileformat()
    return &ft != 'unite' ? &fileformat : ''
  endfunction
  function! LightlineFileencoding()
    return &ft != 'unite' ? (&fenc !=# '' ? &fenc : &enc) : ''
  endfunction
  function! LightlineFiletype()
    return &ft != 'unite' ? (&filetype !=# '' ? &filetype : 'no ft') : ''
  endfunction
endif
if has('gui_running')
  let g:lightline.colorscheme = 'bong'
else
  let g:lightline.colorscheme = 'bong16'
endif
"#}}}
"}}}
"======================================================================
"# Autocmd {{{
augroup vimrcAU
  autocmd!
augroup END

"# viminfoの初期値をマージ
" autocmd vimrcAU VimEnter * rviminfo ~/_xxxinfo
" autocmd vimrcAU VimLeave * wviminfo

"# 挿入モードで一定時間キー入力がなければ着色
autocmd vimrcAU CursorHoldI * setlocal cursorline
"# 挿入モード中にフォーカスが外れたら着色
autocmd vimrcAU FocusLost * call HighlightIM()
function HighlightIM()
  if mode() == 'i'
    setlocal cursorline
  endif
endfunction
"# 挿入モードを抜ける時に色を戻す
autocmd vimrcAU BufEnter,CursorMovedI,InsertLeave * setlocal nocursorline

"# filetype
autocmd vimrcAU FileType javascript setlocal dictionary=~/vimfiles/dict/javascript.dict
autocmd vimrcAU FileType xcfg setlocal dictionary=~/vimfiles/dict/xcfg.dict
autocmd vimrcAU FileType unite call s:unite_my_settings()
function! s:unite_my_settings()
  imap <silent><buffer><expr> <C-s> unite#do_action('split')
  imap <silent><buffer><expr> <C-v> unite#do_action('vsplit')
endfunction
"# Diff起動時の設定
autocmd vimrcAU VimEnter,FilterWritePre * call SetDiffMode()
function SetDiffMode()
if &diff
  syntax off
  highlight Normal guifg=#777777
endif
endfunction
"#}}}
"======================================================================
"# Command{{{
"# 編集中バッファの差分を表示
command! Difforg vert new | set bt=nofile | r ++edit # | 0d_ | diffthis | wincmd p | diffthis
"# 隣のバッファとdiff
command! Diff syntax off | highlight Normal guifg=#777777 | diffthis | wincmd p | diffthis |wincmd h
command! DiffExit syntax on | highlight Normal guifg=gray | diffoff
"#}}}
"======================================================================
"# Keys
"# 全般{{{
"# 行頭/行末に移動
" noremap <space>h ^
" noremap <space>l $
"# 検索ハイライトoff
noremap <silent>, :nohlsearch<cr>
"# スペースでﾊﾞｯﾌｧ移動制御
noremap <space> <C-w>
noremap <nowait><Space><Space> <C-w><C-w>
"# F12でラップ状態の切り替え
noremap <silent> <F12> :<C-u>call SetWrap()<CR>
function SetWrap()
  if &diff
  if &wrap
      wincmd p | setlocal nowrap | wincmd p | setlocal nowrap
    else
      wincmd p | setlocal wrap | wincmd p | setlocal wrap
    endif
  elseif &wrap
    setlocal nowrap
  else
    setlocal wrap
  endif
endfunction
"#}}}
"# normal_mode{{{
"# 行分割
nnoremap <space>j i<CR><ESC>
"# 誤爆防止(、キーマクロ)
nnoremap q <Nop>
nnoremap <C-q> q
"# 一文字削除をレジスタ履歴に残さない
nnoremap  x "_x
nnoremap  X "_X
"# 行末までヤンク
nnoremap  Y y$
"# vimrc
nnoremap <silent> <F5> :<C-u>source $MYVIMRC<CR>
nnoremap <F9> :<C-u>tabnew<CR>:edit $MYVIMRC<CR>
"# ppx
nnoremap <F6> :<C-u>tabnew<CR>:edit C:/bin/repository/tar80/misc/ppx/xTest.js<CR>
nnoremap <C-F6> :<C-u>!start C:/bin/ppx/ppcw.exe -r -k *script \%'repoppx'\%\xTest.js<CR>
nnoremap <silent> <C-F9> :<C-u>!start C:/bin/ppx/ppcw.exe -noactive -r -k *ifmatch Px*,\%*name(,%) \%:*setcust @%:p \%:*linemessage load %<CR>:echo "call ppx! *setting load*"<CR>
"#}}}
"# command_mode{{{
cnoremap <F12> <C-u>rviminfo ~/_xxxinfo<CR>:
"#}}}
"# insert_mode{{{
noremap! <C-j> <Down>
noremap! <C-k> <Up>
noremap! <C-b> <Left>
noremap! <C-f> <Right>
noremap! <C-s> <Delete>
"# inoremap <C-b> <BS>
inoremap <S-Delete> <C-o>d$
"#}}}
"# visual_mode{{{
"# 範囲を括る
vnoremap <space>" c"<C-r>""<ESC>
vnoremap <space>' c'<C-r>"'<ESC>
vnoremap <space>( c(<C-r>")<ESC>
"# 範囲インデント処理後に解除しないように
vnoremap < <gv
vnoremap > >gv
"#}}}
"# plugins{{{
"# unite
nnoremap <silent> <leader>u :<C-u>Unite<CR>
nnoremap <silent> <leader>; :<C-u>Unite -buffer-name=files buffer file<CR>
nnoremap <silent> <leader>o :<C-u>Unite -buffer-name=oldfiles oldfiles<CR>
nnoremap <silent> <leader>m :<C-u>Unite -buffer-name=marks mark<CR>
nnoremap <silent> <leader>r :<C-u>call UniteRepo()<CR>
nnoremap <silent> <leader>g :<C-u>Unite -tab -no-start-insert -buffer-name=grep -previewheight=20 grep<CR>
nnoremap <silent> <leader>l :<C-u>Unite -buffer-name=line line<CR>
noremap <silent> <C-z> :<C-u>Unite -no-start-insert -winwidth=50 -direction=botright
      \ -split -vertical -no-restore history/yank<CR>
inoremap <silent><expr> <C-z> unite#start_complete(
      \ ['history/yank'], {'winwidth':50, 'split':1, 'vertical':1, 'restore':0})
"# caw
" nmap <leader>s <Plug>(caw:zeropos:toggle)
" nmap <leader>t <Plug>(caw:dollarpos:toggle)
"# migemo
"#}}}
filetype plugin indent on
