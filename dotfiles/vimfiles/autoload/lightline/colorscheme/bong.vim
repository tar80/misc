if(exists("g:lightline"))

    let s:gray1     = '#000B00'    " 濡れ羽色
    let s:gray2     = '#2B2B2B'    " 蝋色
    let s:gray3     = '#595857'    " 墨
    let s:gray4     = '#727171'    " 鈍色
    let s:gray5     = '#COC6C9'    " 灰青
    let s:red       = '#E9546B'    " 薔薇色
    let s:green     = '#98D98E'    " 若緑
    let s:yellow    = '#F2D675'    " 黄水仙
    let s:blue      = '#9093E0'    " 紫陽花青
    let s:purple    = '#CC7EB1'    " 菖蒲色
    let s:cyan      = '#75C6C3'    " 白群
    let s:orange    = '#FF9740'    " 淡朽葉
    let s:plum      = '#F73B70'    " 梅重
    let s:navy      = '#17184B'    " 鉄紺
    let s:brown     = '#250D00'    " 黒檀

    let s:p = {'normal': {}, 'inactive': {}, 'insert': {}, 'replace': {}, 'visual': {}, 'tabline': {}}

    let s:p.normal.left = [ [ s:gray2, s:gray4 ], [ s:red, s:gray3 ], [ s:gray4, s:gray2 ] ]
    let s:p.normal.right = [ [ s:gray1, s:gray3 ], [ s:gray1, s:gray3 ], [ s:gray4, s:gray2 ], [ s:green, s:gray2 ] ]
    let s:p.normal.middle = [ [ s:gray4, s:gray2 ] ]
    let s:p.normal.error = [ [ s:gray2, s:red ] ]
    let s:p.normal.warning = [ [ s:gray2, s:yellow ] ]

    let s:p.insert.left = [ [ s:gray2, s:cyan ], [ s:red, s:gray3 ], [ s:cyan, s:gray2 ] ]
    let s:p.insert.right = [ [ s:gray2, s:cyan ], [ s:gray1, s:gray3 ], [ s:gray4, s:gray2 ], [ s:green, s:gray2 ] ]

    let s:p.replace.left = [ [ s:gray2, s:yellow ], [ s:red, s:gray3 ], [ s:yellow, s:gray2 ] ]
    let s:p.replace.right = [ [ s:gray2, s:yellow ], [ s:gray1, s:gray3 ], [ s:gray4, s:gray2 ], [ s:green, s:gray2 ] ]

    let s:p.visual.left = [ [ s:gray2, s:purple ], [ s:red, s:gray3 ], [ s:purple, s:gray2 ] ]
    let s:p.visual.right = [ [ s:gray2, s:purple ], [ s:gray1, s:gray3 ], [ s:gray4, s:gray2 ], [ s:green, s:gray2 ] ]

    let s:p.inactive.left =  [ [ s:gray4, s:gray2 ], [ s:red, s:gray3 ], [ s:gray4, s:gray2 ] ]
    let s:p.inactive.right = [ [ s:gray4, s:gray2 ], [ s:gray4, s:gray2 ] ]
    let s:p.inactive.middle = [ [ s:gray4, s:gray2 ] ]

    let s:p.tabline.left = [ [ s:gray4, s:gray2 ] ]
    let s:p.tabline.middle = [ [ s:gray4, s:gray2 ] ]
    let s:p.tabline.right = [ [ s:gray4, s:gray1 ] ]
    let s:p.tabline.tabsel = [ [ s:yellow, s:gray3 ] ]

    let g:lightline#colorscheme#bong#palette = lightline#colorscheme#fill(s:p)
endif
