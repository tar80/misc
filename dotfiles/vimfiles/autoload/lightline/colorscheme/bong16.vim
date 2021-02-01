" =============================================================================
" Filename: autoload/lightline/colorscheme/bong16.vim
" Author: tar80
" Last Change: 2021 01/29
" =============================================================================
let s:black         = '#000b00'  " 濡れ羽色
let s:red           = '#EC6D71'  " 真朱
let s:green         = '#93CA76'  " 薄萌黄
let s:yellow        = '#EEC362'  " 玉蜀黍色
let s:blue          = '#59B9C6'  " 新橋色
let s:cyan          = '#164A84'  " 紺瑠璃
let s:orange        = '#FF9740'  " 淡朽葉
let s:magenta       = '#CC7EB1'  " 菖蒲色
let s:gray          = '#9079AD'  " 竜胆色
let s:white         = '#EAEDF7'  " 白菫色
let s:darkred       = '#E95464'  " 薔薇色
let s:darkgreen     = '#839B5C'  " 松葉色
let s:darkyellow    = '#FFD768'  " 梔子色
let s:darkblue      = '#84A2D4'  " 青藤色
let s:darkcyan      = '#83CCD2'  " 白群
let s:darkmagenta   = '#BC64A4'  " 若紫
let s:darkwhite     = '#BED2C3'  " 青磁色

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

let g:lightline#colorscheme#bong16#palette = lightline#colorscheme#fill(s:p)
