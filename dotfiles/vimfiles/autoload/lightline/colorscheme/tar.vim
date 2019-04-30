" =============================================================================
" Filename: autoload/lightline/colorscheme/tar.vim
" Author: tar80
" Last Change: 2018 12/27
" =============================================================================
let s:black     = '#000b00'    " îGÇÍâHêF
let s:red       = '#E9546B'    " ÂKÂNêF
let s:green     = '#98D98E'    " é·óŒ
let s:yellow    = '#F2D675'    " â©êÖêÂ
let s:blue      = '#9093E0'    " éáózâ‘ê¬
let s:cyan      = '#75C6C3'    " îíåQ
let s:orange    = '#FF9740'    " íWãÄót
let s:magenta   = '#CC7EB1'    " î~èd
let s:white     = '#c0c6c9'    " äDê¬

let s:p = {'normal': {}, 'inactive': {}, 'insert': {}, 'replace': {}, 'visual': {}, 'tabline': {}}
let s:p.normal.left     = [ [ s:black, s:white ], [ s:white, s:black ] ]
let s:p.normal.middle   = [ [ s:white, s:black ] ]
let s:p.normal.right    = [ [ s:black, s:white ], [ s:black, s:white ], [ s:white, s:black ], [ s:green, s:black ] ]
let s:p.inactive.right  = [ [ s:black, s:blue ], [ s:black, s:blue ] ]
let s:p.inactive.middle = [ [ s:black, s:blue ] ]
let s:p.inactive.left   = [ [ s:black, s:blue ], [ s:black, s:blue ] ]
let s:p.insert.left     = [ [ s:black, s:cyan ], [ s:cyan, s:black ] ]
let s:p.insert.middle   = [ [ s:cyan, s:black ] ]
let s:p.insert.right    = [ [ s:black, s:cyan ], [ s:black, s:white ], [ s:white, s:black ], [ s:green, s:black ] ]
let s:p.replace.left    = [ [ s:black, s:yellow ], [ s:yellow, s:black ] ]
let s:p.replace.middle  = [ [ s:white, s:black ] ]
let s:p.replace.right   = [ [ s:black, s:yellow ], [ s:black, s:white ], [ s:white, s:black ], [ s:green, s:black ] ]
let s:p.visual.left     = [ [ s:black, s:magenta ], [ s:magenta, s:black ] ]
let s:p.visual.middle   = [ [ s:white, s:black ] ]
let s:p.visual.right    = [ [ s:black, s:magenta ], [ s:black, s:white ], [ s:white, s:black ], [ s:green, s:black ] ]
let s:p.tabline.left = [ [ s:black, s:white ] ]
let s:p.tabline.tabsel = [ [ s:black, s:yellow ] ]
let s:p.tabline.middle = [ [ s:white, s:black ] ]
let s:p.tabline.right = [ [ s:green, s:black ] ]
let s:p.normal.error = [ [ s:green, s:orange ] ]
let s:p.normal.warning = [ [ s:yellow, s:orange ] ]

let g:lightline#colorscheme#tar#palette = lightline#colorscheme#fill(s:p)
