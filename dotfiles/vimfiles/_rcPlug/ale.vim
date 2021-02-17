"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'ale'

"# Options {{{
let g:ale_linters = {
      \  'javascript': ['eslint'],
      \}
let g:ale_fixers = {
      \  'javascript': ['eslint'],
      \}
"# マウスホバー
let g:ale_set_balloons = 0
"# 開始時チェック
let g:ale_lint_on_enter = 0
"# 保存時チェック
let g:ale_lint_on_save  = 1
"# 変更時チェック
let g:ale_lint_on_text_changed = 0
let g:ale_lint_on_insert_leave = 1
"# カラム幅の固定
" let g:ale_sign_column_always = 1
let g:ale_sign_error    = '❌ '
let g:ale_sign_warning  = '⛔ '
"# セーブ時整形
" let g:ale_fix_on_save = 1
"#}}}
"======================================================================
"# Keys{{{
nmap <silent> [e <Plug>(ale_previous_wrap)
nmap <silent> ]e <Plug>(ale_next_wrap)
"#}}}
