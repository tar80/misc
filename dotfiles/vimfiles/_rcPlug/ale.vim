"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'ale'

"# Options {{{
let g:airline#extensions#ale#enabled = 0
let g:ale_disable_lsp = 1
" let g:ale_change_sign_column_color = 0
" let g:ale_echo_cursor = 1
" let g:ale_echo_delay = 10
let g:ale_lint_delay = 1000
let g:ale_linters = {
      \  'javascript': ['eslint'],
      \  'lua': ['luacheck'],
      \}
let g:ale_fixers = {
      \  'javascript': ['eslint', 'remove_trailing_lines', 'trim_whitespace'],
      \  'lua': ['luafmt'],
      \}
"# When you modify a buffer.
let g:ale_lint_on_text_changed = 1
"# On leaving insert mode.
let g:ale_lint_on_insert_leave = 0
"# When you open a new or modified buffer.
let g:ale_lint_on_enter = 0
"# When you save a buffer.
let g:ale_lint_on_save = 0
"# When the filetype changes for a buffer.
let g:ale_lint_on_filetype_changed = 1
"# By updating loclist.
" let g:ale_set_loclist = 1
"# By updating quickfix.
" let g:ale_set_quickfix = 0
"# By setting error highlights.
" let g:ale_set_highlights = 1
"# By creating signs in the sign column.
" let g:ale_set_signs = 1
"# By echoing messages based on your cursor.
" let g:ale_echo_cursor = 0
"# By inline text based on your cursor.
" let g:ale_virtualtext_cursor = 0
"# By displaying the preview based on your cursor.
" let g:ale_cursor_detail = 0
"# By showing balloons for your mouse cursor.
let g:ale_set_balloons = 0
"# カラム幅の固定
let g:ale_sign_column_always = 1
let g:ale_sign_error    = '❌ '
let g:ale_sign_warning  = '⛔ '
" let g:ale_linter_aliases = {'html': ['html', 'javascript', 'css']}
"#}}}
"======================================================================
"# Keys
nmap <silent> [e <Plug>(ale_previous_wrap)
nmap <silent> ]e <Plug>(ale_next_wrap)
nmap <space>lf <plug>(ale_fix)
