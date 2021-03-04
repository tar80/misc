"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'vim-gitbranch'

"# Command
command! GitrootWD execute 'lcd' <SID>gitRoot()
command! -nargs=* Gitdiff call <SID>gitDiffCmd(<f-args>)

"======================================================================
"# Keys
nnoremap <silent> <space>gv :Gitdiff %<CR>
nnoremap <silent> <space>ga :<C-u>call <SID>gitadd()<CR>

"======================================================================
"# functions
function s:gitadd() abort
  if exists('b:gitbranch_path')
    update | terminal ++hidden ++close git add '%:p'
  endif
endfunction

function s:gitRoot() abort
  try
    return substitute(b:gitbranch_path, '.git/HEAD', '', '')
  catch
    return ''
  endtry
endfunction

function s:gitDiffCmd(...) abort
  let s:root = s:gitRoot()
  if s:root !=# ''
    let s:path = (a:0 ==# '2') ? a:2 : (a:0 ==# '1') ? a:1 : '%'
    let s:path = strpart(fnamemodify(expand(s:path), ':p'), len(s:root))
    let s:path = substitute(s:path, '\\', '/', 'g')
    let s:hash = (a:0 ==# '2') ? a:1 : 'HEAD^'
    let g:diff_translations = 0
    syntax off | highlight Normal guifg=#3C3C40 | diffthis | vertical new | set bt=nofile | execute 'r! git cat-file -p ' . s:hash . ':' . s:path | 0d_ | diffthis | wincmd p
    unlet s:hash s:root s:path
  else
    echo 'not a git repository.'
  endif
  return ''
endfunction
