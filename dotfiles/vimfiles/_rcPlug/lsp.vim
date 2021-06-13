"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'vim-lsp'

"# Options {{{
" let g:lsp_auto_enable = 1
" let g:lsp_preview_keep_focus = 1
" let g:lsp_preview_float = 1
" let g:lsp_preview_autoclose = 1
" let g:lsp_preview_doubletap = [function('lsp#ui#vim#output#focuspreview')]
" let g:lsp_insert_text_enabled = 1
" let g:lsp_text_edit_enabled = 1
" let g:lsp_completion_documentation_enabled = 1
" let g:lsp_completion_documentation_delay = 80
let g:lsp_diagnostics_enabled = 0
let g:lsp_diagnostics_echo_cursor = 1
let g:lsp_diagnostics_echo_delay = 100
" let g:lsp_diagnostics_float_cursor = 0
" let g:lsp_diagnostics_float_delay = 500
" let g:lsp_format_sync_timeout = -1
" let g:lsp_diagnostics_highlights_enabled = 1
" let g:lsp_diagnostics_highlights_insert_mode_enabled = 1
" let g:lsp_diagnostics_highlights_delay = 500
let g:lsp_diagnostics_signs_enabled = 0
let g:lsp_diagnostics_signs_error = {'text': '❌'}
let g:lsp_diagnostics_signs_warning = {'text': '⛔'}
let g:lsp_diagnostics_signs_hint = {'text': '❗'}
let g:lsp_diagnostics_signs_insert_mode_enabled = 1
let g:lsp_diagnostics_signs_delay = 100
" let g:lsp_diagnostics_signs_priority = 10
" let g:lsp_diagnostics_signs_priority_map = {
"        \'LspError': 11,
"        \'LspWarning': 7,
"        \'clangd_LspWarning': 11,
"        \'clangd_LspInformation': 11
"        \}
" let g:lsp_diagnostics_virtual_text_enabled = 1
" let g:lsp_diagnostics_virtual_text_insert_mode_enabled = 0
" let g:lsp_diagnostics_virtual_text_delay = 500
" let g:lsp_diagnostics_virtual_text_prefix = " ‣ "
let g:lsp_document_code_action_signs_enabled = 0
" let g:lsp_document_code_action_signs_hint = {'text': 'A>'}
" let g:lsp_document_code_action_signs_delay = 500
" let g:lsp_tree_incoming_prefix = "⬅️  "
" let g:lsp_use_event_queue = 1
" let g:lsp_document_highlight_enabled = 1
" let g:lsp_document_highlight_delay = 350
" let g:lsp_get_supported_capabilities = [function('lsp#default_get_supported_capabilities')]
" let g:lsp_peek_alignment = "center"
" let g:lsp_preview_max_width = -1
" let g:lsp_preview_max_height = -1
" let g:lsp_signature_help_enabled = 1
" let g:lsp_signature_help_delay = 200
" let g:lsp_show_workspace_edits = 0
" let g:lsp_fold_enabled = 1
" let g:lsp_hover_conceal = 1
" let g:lsp_ignorecase = 'ignorecase'
" let let g:lsp_log_file = ''
" let g:lsp_semantic_enabled = 0
" let g:lsp_text_document_did_save_delay = -1
" g:lsp_snippet_expand = {}
" let g:lsp_completion_resolve_timeout = 200
" let g:lsp_tagfunc_source_methods = ['definition', 'declaration', 'implementation', 'typeDefinition']
" let g:lsp_show_message_request_enabled = 1
" let g:lsp_work_done_progress_enabled = 0
" let g:lsp_show_message_log_level = 'warning'
"}}}
"======================================================================
"# Autocmd
augroup lsp_install
  au!
  autocmd User lsp_buffer_enabled call s:on_lsp_buffer_enabled()
augroup END

function! s:on_lsp_buffer_enabled() abort
  setlocal omnifunc=lsp#complete
  " setlocal signcolumn=yes
  nmap <buffer> gd <plug>(lsp-definition)
  nmap <buffer> <space>lr <plug>(lsp-rename)
  vmap <buffer> <space>lf <plug>(lsp-document-format)
  " inoremap <expr> <cr> pumvisible() ? "\<c-y>\<cr>" : "\<cr>"
endfunction

"======================================================================
"# Command
command! LspDebug let lsp_log_verbose=1 | let lsp_log_file = expand('~/lsp.log')
