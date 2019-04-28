" =============================================================================
" Filename: autoload/lightline/colorscheme/tar.vim
" Author: tar80
" Last Change: 2018 12/27
" =============================================================================
let s:black   = '#000000'
let s:orange  = '#BB5522'
let s:green   = '#77BB22'
let s:yellow  = '#cccc33'
let s:blue    = '#000080'
let s:magenta = '#9944dd'
let s:cyan    = '#33bbbb'
let s:white   = '#c0c0c0'

let s:p = {'normal': {}, 'inactive': {}, 'insert': {}, 'replace': {}, 'visual': {}, 'tabline': {}}
let s:p.normal.left = [ [ s:cyan, s:white ], [ s:blue, s:white ] ]
let s:p.normal.right = [ [ s:black, s:white ], [ s:black, s:white ], [ s:black, s:white], [ s:cyan, s:yellow] ]
let s:p.inactive.right = [ [ s:black, s:blue ], [ s:black, s:blue ] ]
let s:p.inactive.left =  [ [ s:black, s:blue ], [ s:black, s:blue ] ]
let s:p.insert.left = [ [ s:yellow, s:cyan ], [ s:black, s:blue ] ]
let s:p.replace.left = [ [ s:black, s:green ], [ s:black, s:blue ] ]
let s:p.visual.left = [ [ s:yellow, s:magenta ], [ s:cyan, s:magenta ] ]
let s:p.normal.middle = [ [ s:black, s:white ] ]
let s:p.inactive.middle = [ [ s:black, s:blue ] ]
let s:p.replace.middle = [ [ s:black, s:green ] ]
let s:p.insert.middle = [ [ s:black, s:cyan ] ]
let s:p.visual.middle = [ [ s:black, s:magenta ] ]
let s:p.tabline.left = [ [ s:black, s:white ] ]
let s:p.tabline.tabsel = [ [ s:black, s:green ] ]
let s:p.tabline.middle = [ [ s:white, s:black ] ]
let s:p.tabline.right = [ [ s:green, s:black ] ]
let s:p.normal.error = [ [ s:green, s:orange ] ]
let s:p.normal.warning = [ [ s:yellow, s:orange ] ]

let g:lightline#colorscheme#tar#palette = lightline#colorscheme#fill(s:p)
