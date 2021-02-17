"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'fzf.vim'

"# Options {{{
let $FZF_DEFAULT_COMMAND = 'fd -HL -c never --exclude ".git" .'
let $FZF_DEFAULT_OPTS = '--reverse --inline-info --preview-window=wrap:sharp
  \ --color=fg:#878787,bg:#000000,hl:#f2ff00,fg+:#d900ff,bg+:#000000,hl+:#f2ff00
  \ --color=info:#00ffee,prompt:#00ffee,pointer:#ff0000,marker:#f2ff00,spinner:#000000,header:#1eff00,border:#d900ff'
let g:fzf_layout = { 'down': '~50%' }
let g:fzf_preview_window = ['right:60%:hidden', 'ctrl-o']
" [Buffers] Jump to the existing window if possible
let g:fzf_buffers_jump = 1
"#}}}
"======================================================================
"# Autocmd {{{
augroup vimrcFZF
autocmd! FileType fzf
autocmd FileType fzf set laststatus=0
 \| autocmd BufLeave <buffer> set laststatus=2
augroup END
"#}}}
"======================================================================
"# Command{{{
command! Mru
  \ call fzf#run(
  \   {'source': v:oldfiles,
  \    'options': ['--multi', '--no-sort', '--prompt', 'MRU> '],
  \    'down': '50%'})
command! -bang Files
  \ call fzf#vim#files(
  \   <q-args>, fzf#vim#with_preview({'options': ['--multi', '--prompt', 'Files> ']},'right:60%:hidden', 'ctrl-o'),
  \   <bang>0)
command! -bang Myrepo
  \ call fzf#vim#files(
  \   'c:\bin\repository\tar80', fzf#vim#with_preview({'options': ['--multi', '--prompt', 'Files> ']},'right:60%:hidden', 'ctrl-o'),
  \   <bang>0)
command! -bang GChanges
  \ call fzf#vim#gitfiles(
  \   '?', fzf#vim#with_preview({'options': ['--nth=2..']},'right:60%:hidden', 'ctrl-o'),
  \   <bang>0)
command! -bang -nargs=* Rg
  \ call fzf#vim#grep(
  \   'rg --column --line-number --no-heading --color=always '.shellescape(<q-args>), 1,
  \   <bang>0 ? fzf#vim#with_preview('down:50%:wrap')
  \           : fzf#vim#with_preview({'options': ['--exact', '--delimiter=:', '--nth=3..']}, 'down:50%:hidden', 'ctrl-o'),
  \   <bang>0)
"#}}}
"======================================================================
"# Keys
nnoremap <silent> <leader>; :<C-u>Buffers<CR>
nnoremap <silent> <leader>l :<C-u>Files<CR>
nnoremap <silent> <leader>o :<C-u>Mru<CR>
nnoremap <silent> <leader>m :<C-u>Unite -buffer-name=marks mark<CR>
nnoremap <silent> <leader>r :<C-u>Myrepo<CR>
nnoremap <silent> <leader>g :<C-u>Rg<CR>
nnoremap <silent> <leader>a :<C-u>GChanges<CR>
nnoremap <silent> <leader>c :<C-u>Commits<CR>
noremap <silent> <C-z> :<C-u>Unite -winwidth=60 -direction=botright
  \ -split -vertical -no-restore history/yank<CR>
imap <c-x><c-l> <plug>(fzf-complete-line)
"#}}}
