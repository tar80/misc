"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'lightline.vim'

"# Options {{{
let g:lightline = {
      \ 'active': {
        \ 'left'  : [['mode', 'paste'],['ale'], ['status']],
        \ 'right' : [['lineinfo'],['percent'],['format', 'enc', 'ftype'],['gitbranch']]
        \ },
        \ 'tabline': {
          \ 'left'   : [['tabs']],
          \ 'right'  : [['wd']]
          \ },
          \ 'component': {
            \ 'lineinfo' : '%2v:%3l/%3L',
            \ 'wd'       : '%.35(%{fnamemodify(getcwd(), ":~")}%)'
            \ },
            \ 'component_function' : {
              \ 'mode'      : 'lightline#mode',
              \ 'ale'       : 'ALEStatus',
              \ 'status'    : 'BS',
              \ 'gitbranch' : 'GB',
              \ 'format'    : 'FF',
              \ 'ftype'     : 'FT',
              \ 'enc'       : 'FE'
              \ },
              \ 'separator': { 'left': '', 'right': '' },
              \ 'subseparator': { 'left': ' ', 'right': ' ' }
              \ }
function! ALEStatus() abort
  let l:count = ale#statusline#Count(bufnr(''))
  let l:errors = l:count.error + l:count.style_error
  let l:warnings = l:count.warning + l:count.style_warning
  return l:count.total != 0 ? '❌ ' . l:errors . ' ' . '⛔ ' . l:warnings : ''
endfunction
function! GB() abort
  let s:sybl = (gitbranch#name() != '') ? '' : ''
  let b:lightline_gitbranch = s:sybl . gitbranch#name()
  unlet s:sybl
  return b:lightline_gitbranch
endfunction
function! BS() abort
  return ('' !=# s:RO() ? s:RO() . ' ' : '') .
        \ ('' !=# s:MOD() ? s:MOD() : '') .
        \ ('' !=# expand('%:~:.') ? expand('%:~:.') : '[No Name]')
endfunction
function! s:RO() abort
  return &ft !~? 'help' && &readonly ? ' |' : ''
endfunction
function! s:MOD() abort
  return &modifiable && &modified ? '⚡ ' : ''
endfunction
function! FE() abort
  return &fenc !=# '' ? &fenc : &enc
endfunction
function! FT() abort
  return &filetype !=# '' ? &filetype : 'no ft'
endfunction
function! FF() abort
  return &fileformat
endfunction

if has('gui_running')
  let g:lightline.colorscheme = 'gulatton'
else
  let g:lightline.colorscheme = 'bong16'
endif
"#}}}
"======================================================================
"# Autocmd {{{
" augroup vimrcLL
"   autocmd!
"   autocmd vimrcLL FileType Gina-status setlocal g:lightline.component_function.gitbranch = Gina()
" augroup END
" function! Gine() abort
"   let b:branch = gina#component#repo#branch()
"   if '' != b:branch
"     let b:staged = gina#component#status#staged()
"     let b:unstaged = gina#component#status#unstaged()
"     let b:conflicted = gina#component#status#conflicted()
"     return printf(
"         \ '%s  s:%s u:%s c:%s',
"         \ branch,
"         \ staged,
"         \ unstaged,
"         \ conflicted,
"         \)
"   else
"     return ''
"   endif
" endfunction
"#}}}
"======================================================================
