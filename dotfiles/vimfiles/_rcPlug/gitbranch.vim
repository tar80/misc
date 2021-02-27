"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'vim-gitbranch'

"# Command
command! -nargs=? Gitdiff call <SID>gitDiffCmd(<f-args>)
function s:gitDiffCmd(...) abort
  if exists('b:gitbranch_path')
    let s:root = substitute(b:gitbranch_path, '.git/HEAD', '', '')
    let s:hash = ((a:0) ==# '1') ? a:1 : 'HEAD~'
    let s:path = strpart(expand('%:p'), len(s:root))
    let s:path = substitute(s:path, '\\', '/', 'g')
    let g:diff_translations = 0
    vertical new | set bt=nofile | execute 'r! git cat-file -p ' . s:hash . ':' . s:path | 0d_ | diffthis | wincmd p | diffthis
    unlet s:hash s:root s:path
  else
    echo 'not a git repository.'
  endif
  return ''
    syntax off
    highlight Normal guifg=#202026
endfunction
"======================================================================
"# Keys
nnoremap <silent> <space>gv :Gitdiff<CR>
nnoremap <silent> <space>gw :<C-u>call <SID>isGitbranch()<CR>
function s:isGitbranch() abort
  if exists('b:gitbranch_path')
    write | terminal ++hidden ++close git add '%:p'
  endif
endfunction

