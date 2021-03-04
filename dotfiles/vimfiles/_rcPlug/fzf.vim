"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'fzf.vim'

"# Options {{{
let $FZF_DEFAULT_COMMAND = 'fd -HL -c never --exclude ".git" .'
let $FZF_DEFAULT_OPTS = '--reverse --inline-info --preview-window=wrap:sharp
  \ --color=fg:#878787,bg:#000000,hl:#f2ff00,fg+:#d900ff,bg+:#000000,hl+:#f2ff00
  \ --color=info:#00ffee,prompt:#00ffee,pointer:#ff0000,marker:#f2ff00,spinner:#000000,header:#1eff00,border:#d900ff'
" let g:fzf_command_prefix = 'Fzf'
function! s:set_lcd(line) abort
  let s:path = fnamemodify(a:line[0], ':p')
  if isdirectory(s:path)
    call chdir(s:path)
  else
    call chdir(fnamemodify(s:path, ':h'))
  endif
  unlet s:path
endfunction
function! s:git_diff(line) abort
  let g:diff_translations = 0
  syntax off
  highlight Normal guifg=#3C3C40
  execute 'Gitdiff head^' a:line[0]
endfunction
let g:fzf_action = {
  \ 'ctrl-d': function('s:git_diff'),
  \ 'ctrl-w': function('s:set_lcd'),
  \ 'ctrl-t': 'tab split',
  \ 'ctrl-x': 'split',
  \ 'ctrl-v': 'vsplit' }
let g:fzf_layout = { 'down': '50%' }
let g:fzf_preview_window = ['right:60%:hidden', 'ctrl-o']
" [Buffers] Jump to the existing window if possible
let g:fzf_buffers_jump = 1
"#}}}
"======================================================================
"# Autocmd {{{
autocmd! FileType fzf set laststatus=0
 \| autocmd BufLeave <buffer> set laststatus=2
"#}}}
"======================================================================
"# Command{{{
command! -bang Mru
 \ call fzf#run(fzf#wrap(
 \   {'source': v:oldfiles,
 \    'options': ['--multi', '--no-sort', '--prompt', 'MRU> ']},
 \    <bang>0))
command! -bang Files
  \ call fzf#vim#files(
  \   <q-args>, fzf#vim#with_preview({'options': ['--multi', '--prompt', 'Files> ']}, 'right:60%:hidden', 'ctrl-o'),
  \   <bang>0)
command! -bang Myrepo
  \ call fzf#vim#files(
  \   'c:\bin\repository\tar80',
  \   fzf#vim#with_preview({'options': ['--multi', '--prompt', 'Files> ']},
  \   'right:60%:hidden', 'ctrl-o'),
  \   <bang>0)
command! -bang GChanges
  \ call fzf#vim#gitfiles(
  \   '?',
  \   fzf#vim#with_preview({'options': ['--nth=2..']}, 'right:60%:hidden', 'ctrl-o'),
  \   <bang>0)
command! -bang -nargs=* Rg
  \ call fzf#vim#grep(
  \   'rg --column --line-number --no-heading --color=always '.shellescape(<q-args>), 1,
  \   <bang>0 ? fzf#vim#with_preview('down:50%:wrap')
  \           : fzf#vim#with_preview({'options': ['--delimiter=:', '--nth=3..']}, 'down:50%:hidden', 'ctrl-o'),
  \   <bang>0)
"#}}}
"======================================================================
"# Keys
" nnoremap <silent> <leader>; :<C-u>Buffers<CR>
nnoremap <silent> <leader>; :<C-u>Files<CR>
nnoremap <silent> <leader>l :<C-u>Lines<CR>
nnoremap <silent> <leader>o :<C-u>Mru<CR>
nnoremap <silent> <leader>r :<C-u>Myrepo<CR>
nnoremap <silent> <leader>g :<C-u>Rg<CR>
nnoremap <silent> <leader>a :<C-u>GChanges<CR>
nnoremap <silent> <leader>c :<C-u>Commits<CR>
imap <c-x><c-l> <plug>(fzf-complete-line)
"#}}}
