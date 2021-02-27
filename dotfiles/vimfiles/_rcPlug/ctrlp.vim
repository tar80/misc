"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'ctrlp.vim'

"# Options {{{
let g:ctrlp_map = '<leader>;'
" let g:ctrlp_cmd = 'CtrlP'
let g:ctrlp_cmd = 'exe "CtrlP".get(["Buffer", "File"], v:count)'
" let g:loaded_ctrlp = 1
" let g:ctrlp_by_filename = 0
" let g:ctrlp_regexp = 0
let g:ctrlp_match_window = 'bottom,order:ttb,min:12,max:12'
" let g:ctrlp_switch_buffer = 'Et'
let g:ctrlp_reuse_window = 'help\|quickfix'
" let g:ctrlp_tabpage_position = 'ac'
" let g:ctrlp_working_path_mode = 'ra'
let g:ctrlp_root_markers = ['.git']
let g:ctrlp_use_caching = 0
" let g:ctrlp_clear_cache_on_exit = 1
let g:ctrlp_cache_dir = $HOME.'/.cache/ctrlp'
" let g:ctrlp_show_hidden = 0
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/](\.git|node_modules|images|migemo)$',
  \ 'file': '\v\.(exe|dll|gif|png)$',
  \ }
" let g:ctrlp_max_files = 10000
" let g:ctrlp_max_depth = 40
" let g:ctrlp_user_command = ['.git', 'cd %s && git ls-files']
" let g:ctrlp_max_history = &history
" let g:ctrlp_open_new_file = 'v'
let g:ctrlp_open_multiple_files = '10t'
" let g:ctrlp_arg_map = 0
let g:ctrlp_follow_symlinks = 1
" let g:ctrlp_lazy_update = 0
" let g:ctrlp_default_input = 'anystring'
" let g:ctrlp_match_current_file = 1
" let g:ctrlp_types = ['fil', 'buf', 'line']
" let g:ctrlp_abbrev = {}
" let g:ctrlp_key_loop = 0
" let g:ctrlp_prompt_mappings = {
"  \ 'MarkToOpen()': ['<tab>'],
"  \ }
let g:ctrlp_line_prefix = ''
" let g:ctrlp_open_single_match = ['buffer tags', 'buffer']
let g:ctrlp_mruf_max = 100
" let g:ctrlp_mruf_exclude = ''
" let g:ctrlp_mruf_include = ''
" let g:ctrlp_tilde_homedir = 0
" let g:ctrlp_mruf_relative = 0
let g:ctrlp_mruf_default_order = 1
" let g:ctrlp_mruf_case_sensitive = 1
let g:ctrlp_mruf_save_on_update = 0
" let g:ctrlp_bufname_mod = ':t'
" let g:ctrlp_bufpath_mod = ':~:.:h'
" let g:ctrlp_open_func = {}
" let g:ctrlp_status_func = {}
let g:ctrlp_buffer_func = {
  \ 'enter': 'CtrlPEnter',
  \ 'exit': 'CtrlPLeave',
  \ }
function! CtrlPEnter()
  set laststatus=0
  hi CursorLine guifg=purple guibg=#000B00
  hi CtrlPNoEntries guifg=#FF9740
  hi CtrlPMatch guifg=#F2D675
  hi CtrlPLinePre guifg=blue
  hi CtrlPPrtBase guifg=#75C6C3
  hi CtrlPPrtText guifg=#F2D675
  hi CtrlPPrtCursor guifg=#F2D675
  hi Normal guifg=#595857
endfunction
function! CtrlPLeave()
  set laststatus=2
  hi CursorLine guifg=#000B00 guibg=#75C6C3
  hi Normal guifg=#C0C6C9
endfunction

" let g:ctrlp_match_func = {'match': 'ctrlp_matchfuzzy#matcher'}
" let g:ctrlp_path_nolim = 1
" let g:ctrlp_extensions = ['dir',  'file', 'buf']
"}}}
"======================================================================
"# Autocmd {{{
" augroup vimrcCtrlP
" autocmd! FileType ctrlp
" autocmd FileType ctrlp set laststatus=0
" \| autocmd CmdlineLeave <buffer> set laststatus=2
" augroup END
"#}}}
"======================================================================
"# Command{{{
"#}}}
"======================================================================
"# Keys
" nnoremap <silent> <leader>; :<C-u>CtrlPBuffer<CR>
nnoremap <silent> <leader>l :<C-u>CtrlPCurWD<CR>
nnoremap <silent> <leader>o :<C-u>CtrlPMRU<CR>
nnoremap <silent> <leader>r :<C-u>CtrlPDir C:\bin\repository\tar80\misc<CR>
nnoremap <silent> <leader>g :<C-u>call <SID>CtrlPrg()<CR>
function! s:CtrlPrg() abort
    let b:ctrlp_user_command = 'rg %s --column --line-number --no-heading ""'
    let b:ctrlp_use_caching = 0
    CtrlP
endfunction
" nnoremap <Leader>a :call <SID>CallCtrlPBasedOnGitStatus()<Return>
" function! s:CallCtrlPBasedOnGitStatus()
"   let s:git_status = system("git status -s")
"   if v:shell_error == 128
"       execute "CtrlPCurFile"
"   else
"       execute "CtrlPRoot"
"   endif
" endfunction
" nnoremap <silent> sc :<C-u>Commits<CR>
