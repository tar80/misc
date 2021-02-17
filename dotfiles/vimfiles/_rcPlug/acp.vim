"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'vim-autocomplpop'

"# Options {{{
" let g:acp_enableAtStarup = 1
let g:acp_completeOption        = '.,w,b,k,i'
" let g:acp_behaviorKeywordCommand = "\<C-n>"
" let g:acp_behaviorKeywordLength = 2
let g:acp_behaviorFileLength    = 3
let g:acp_behaviorRubyOmniMethodLength  = -1
let g:acp_behaviorRubyOmniSymbolLength  = -1
let g:acp_behaviorPythonOmniLength      = -1
"#}}}
"======================================================================
"# Keys
nnoremap <expr> <F2> <SID>toggleACP()
inoremap <expr> <F2> <SID>toggleACP()
function s:toggleACP()
  if g:acp_behaviorKeywordLength != 2 && &ft != 'unite'
    let g:acp_behaviorKeywordLength = 2
    let g:acp_behaviorFileLength    = 3
    echo 'ACP ON'
  else
    let g:acp_behaviorKeywordLength = -1
    let g:acp_behaviorFileLength    = -1
    echo 'ACP OFF'
  endif
  return ''
endfunction
"#}}}
