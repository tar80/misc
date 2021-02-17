"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'unite.vim'

"# Options {{{
let g:unite_ignore_source_files = ['history_unite.vim','bookmark.vim']
let g:unite_force_overwrite_statusline = 0
"g:unite_quick_match_table =
"g:unite_data_directory =
let g:unite_redraw_hold_candidates = 1000
"let g:unite_enable_auto_select = 1
"g:unite_restore_alternate_file = 1
"g:unite_source_buffer_time_format = "(%H:%M:%S %Y/%m/%d)"
"g:unite_source_file_async_command = "ls -a"
"g:unite_source_bookmark_directory =
let g:unite_source_rec_min_cache_files = 20
let g:unite_source_rec_max_cache_files = 5000
let g:unite_source_rec_async_command   = ['fd', '-HL', '-c never', '--exclude ".git"']
"let g:unite_source_rec_find_args = ['','']
" let g:unite_source_rec_git_command = ['git', 'ls-files']
let g:unite_source_grep_command = "rg"
let g:unite_source_grep_recursive_opt = ""
let g:unite_source_grep_default_opts = "--no-heading --color never -Line"
"let e_source_grep_search_word_highlight = "Search"
let g:unite_source_grep_encoding = "utf-8"
"let g:unite_source_grep_separator= "--"
"let g:unite_source_vimgrep_search_word_highlight =a"Search"
" let g:unite_source_find_command = "find"
" let g:unite_source_find_default_opts = "-L"
"let g:unite_source_find_default_expr = "-name "
"let g:unite_source_line_enable_highlight = "0"
"let g:unite_source_alias_aliases = {}
"let g:unite_source_menu_menus  {}
"let g:unite_source_process_enable_confirm = 1
"let g:unite_source_output_shellcmd_colors =
"let g:unite_kind_jump_list_after_jump_scroll = 25
"let g:unite_kind_file_preview_max_filesize = 1000000
"let g:unite_kind_openable_persist_open_blink_time = "250m"
"let g:unite_converter_file_directory_width = 45
let g:unite_matcher_fuzzy_max_input_length = 20
let g:neoyank#limit = 20
"
"# カスタムプロファイル
call unite#custom#source('line,grep', 'matchers', 'matcher_vigemo')
call unite#custom#source('file,file_rec,file_rec/async', 'matchers', ['converter_tail', 'matcher_fuzzy'])
call unite#custom#source('file,file_rec,file_rec/async', 'max_candidates', 40)
call unite#custom#source('file_rec,file_rec/async', 'ignore_pattern',
      \ '\(\.bmp$\|\.png$\|\.jpg$\|\.jpg$\|\.gif$\|\.wav$\|\.mp3$\|\.mp4$\|\.sys$\|\.gid$\|\.hlp$\|\.dat$\|\.diff$\|\.dll$\|\.jax$\|\.zip\|\.7z\|\.git/\)')
call unite#custom#profile('default', 'context', {
      \ 'start_insert' : 1,
      \ 'no_split' : 1,
      \ 'buffer_name' : ""
      \ })
"# Unite file_rec/git(rootを固定)
function s:UniteRepo()
  lcd C:/bin/repository/tar80/misc
  Unite -buffer-name=repogitory file_rec/git:--cached:--others:--exclude-standard
endfunction
"}}}
"======================================================================
"# Autocmd {{{
augroup vimrcUnite
  autocmd!
  autocmd FileType unite call <SID>unite_my_settings()
  function! s:unite_my_settings()
    imap <silent><buffer><expr> <C-s> unite#do_action('split')
    imap <silent><buffer><expr> <C-v> unite#do_action('vsplit')
  endfunction
augroup END
"#}}}
"======================================================================
"# Keys
"# 全般{{{
nnoremap <silent> <leader>u :<C-u>Unite<CR>
nnoremap <silent> <leader>; :<C-u>Unite -buffer-name=files buffer file<CR>
nnoremap <silent> <leader>o :<C-u>Unite -buffer-name=oldfiles oldfiles<CR>
nnoremap <silent> <leader>m :<C-u>Unite -buffer-name=marks mark<CR>
nnoremap <silent> <leader>r :<C-u>call <SID>UniteRepo()<CR>
nnoremap <silent> <leader>g :<C-u>Unite -tab -no-start-insert -buffer-name=grep -previewheight=20 grep<CR>
nnoremap <silent> <leader>l :<C-u>Unite -buffer-name=line line<CR>
noremap <silent> <C-z> :<C-u>Unite -winwidth=60 -direction=botright
  \ -split -vertical -no-restore history/yank<CR>
"#}}}
"----------------------------------------------------------------------
"# insert_mode{{{
inoremap <silent><expr> <C-z> unite#start_complete(
   \ ['history/yank'], {'winwidth':60, 'split':1, 'vertical':1, 'restore':0})
"#}}}
