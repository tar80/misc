"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'lightline.vim'

"# Options {{{
let g:lightline = {
      \ 'active': {
      \ 'left'  : [['mode', 'paste'],['ale', 'bufstatus']],
      \ 'right' : [['lineinfo'],['percent'],['fileformat', 'fileencoding', 'filetype'],['gitbranch']]
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
      \ 'mode'        : 'Unitemode',
      \ 'ale'         : 'ALEStatus',
      \ 'bufstatus'   : 'Mybufferstatus',
      \ 'gitbranch'   : 'gitbranch#name',
      \ 'fileformat'  : 'LightlineFileformat',
      \ 'filetype'    : 'LightlineFiletype',
      \ 'fileencoding': 'LightlineFileencoding',
      \ },
      \ 'separator': { 'left': '', 'right': '' },
      \ 'subseparator': { 'left': ' ', 'right': ' ' }
      \ }
function! Unitemode()
  return &ft == 'unite' ? '' : lightline#mode()
endfunction
function! ALEStatus()
  let l:count = ale#statusline#Count(bufnr(''))
  let l:errors = l:count.error + l:count.style_error
  let l:warnings = l:count.warning + l:count.style_warning
  return l:count.total != 0 ? '❌ ' . l:errors . ' ' . '⛔ ' . l:warnings : ''
endfunction
function! Mybufferstatus()
  return ('' != LightlineReadonly() ? LightlineReadonly() . ' ' : '') .
       \ ('' != LightlineModified() ? LightlineModified() : '') .
       \ (&ft == 'unite' ? unite#get_status_string() :
       \  '' != expand('%:~:.') ? expand('%:~:.') : '[No Name]')
endfunction
function! LightlineReadonly()
  return &ft !~? 'help' && &readonly ? 'RO |' : ''
endfunction
function! LightlineModified()
  return &modifiable && &modified ? ' ⚡ ' : ''
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

if has('gui_running')
let g:lightline.colorscheme = 'bong'
else
let g:lightline.colorscheme = 'bong16'
endif
"#}}}
