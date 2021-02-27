"# vim:ts=4:tw=0:foldmethod=marker:foldcolumn=3:
"======================================================================

UsePlugin 'yankround.vim'

"# Options {{{
"# このディレクトリ以下に履歴を永続化したファイルが作られる。
let g:yankround_dir ="~/.cache/yankround"
"# 取得する履歴の限界値。
"let g:yankround_max_history =30
"# 文字列長がこれより長いレジスタの内容は記録されない。0にすると無効。
"g:yankround_max_element_length =512000
"# 非0 だと、yankroundによって貼り付けた、置き換え可能な文字列が
"# g:yankround_region_hl_groupnameによってハイライトされる。
let g:yankround_use_region_hl = 1
"# g:yankround_use_region_hlが 非0 のとき、このグループ名のハイライトに
"# よって貼り付けた文字列がハイライトされる。カーソルを動かすまで有効。
"# また、YankRoundRegionのハイライトを書き換えることで見た目を変更することも可能。
"# 既定値: "YankRoundRegion"
"例: >
"  autocmd ColorScheme * highlight YankRoundRegion guibg=Orange
" let g:yankround_region_hl_groupname = 'StatusLine'
let g:yankround_region_hl_groupname = 'ParenMatch'
"}}}
"======================================================================
"# Keys {{{
nmap p <Plug>(yankround-p)
xmap p <Plug>(yankround-p)
nmap P <Plug>(yankround-P)
nmap gp <Plug>(yankround-gp)
xmap gp <Plug>(yankround-gp)
nmap gP <Plug>(yankround-gP)
nmap <C-p> <Plug>(yankround-prev)
nmap <C-n> <Plug>(yankround-next)
"#}}}
