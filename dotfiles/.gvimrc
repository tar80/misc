" vim:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================
"" Vim 8.1  Last Change: 30-Dec-2018.
"======================================================================
scriptencoding utf-8
" カラースキーマ
set background=dark
let g:material_theme_style = 'dark'
colorscheme material
"
" IME制御
if has('multi_byte_ime')
  set iminsert=0 imsearch=0
" IMEの状態をカラー表示
  highlight Cursor guifg=NONE guibg=lightgreen
  highlight CursorIM guifg=NONE guibg=Orange
endif
" カーソル点滅抑止
set guicursor=a:ver20-blinkwait1000-blinkon700-blinkoff600
"
" 表示設定
set guioptions-=T
set guioptions-=m
set guioptions+=c
set guioptions-=e
set t_vb=
"
"" フォント設定 ※英語名で指定すると問題が起きにくい
if has('xfontset')
  set guifontset=a14,r14,k14
elseif has('win32') || has('win64')
"   set guifont=Consolas:h14:cANSI:qDRAFT
"   set guifont=RIcty_Diminished:h14:cSHIFTJIS:qDRAFT
  set guifont=NasuM:h12:cSHIFTJIS:qDRAFT
endif
"
" 印刷用フォント
"if has('printer')
"  if has('win32') || has('win64')
"   set printfont=MS_Mincho:h12:cSHIFTJIS
"   set printfont=MS_Gothic:h12:cSHIFTJIS
"  endif
"endif
"
"" Window位置の保存と復帰
let s:infofile = '~/_vimpos'
"
function! s:SaveWindowParam(filename)
  redir => pos
  exec 'winpos'
  redir END
  let pos = matchstr(pos, 'X[-0-9 ]\+,\s*Y[-0-9 ]\+$')
  let file = expand(a:filename)
  let str = []
  let cmd = 'winpos '.substitute(pos, '[^-0-9 ]', '', 'g')
  cal add(str, cmd)
  let l = &lines
  let c = &columns
  cal add(str, 'set lines='. l.' columns='. c)
  silent! let ostr = readfile(file)
  if str != ostr
    call writefile(str, file)
  endif
endfunction
"
augroup SaveWindowParam
  autocmd!
  execute 'autocmd SaveWindowParam VimLeave * call s:SaveWindowParam("'.s:infofile.'")'
augroup END
"
if filereadable(expand(s:infofile))
  execute 'source '.s:infofile
endif
unlet s:infofile
"
