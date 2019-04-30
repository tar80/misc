if(exists("g:lightline"))

    let s:gray1     = '#000b00'    " ”G‚ê‰HF
    let s:gray2     = '#2B2B2B'    " ˜XF
    let s:gray3     = '#595857'    " –n
    let s:gray4     = '#727171'    " “İF
    let s:gray5     = '#COC6C9'    " ŠDÂ
    let s:red       = '#E9546B'    " åKåNF
    let s:green     = '#98D98E'    " á—Î
    let s:yellow    = '#F2D675'    " ‰©…å
    let s:blue      = '#9093E0'    " ‡—z‰ÔÂ
    let s:purple    = '#CC7EB1'    " ÒŠ—F
    let s:cyan      = '#75C6C3'    " ”’ŒQ
    let s:orange    = '#FF9740'    " ’W‹€—t
    let s:plum      = '#F73B70'    " ”~d
    let s:navy      = '#17184B'    " “S®
    let s:brown     = '#250D00'    " •’h

    let s:p = {'normal': {}, 'inactive': {}, 'insert': {}, 'replace': {}, 'visual': {}, 'tabline': {}}

    let s:p.normal.left = [ [ s:gray2, s:gray4 ], [ s:gray4, s:gray2 ] ]
    let s:p.normal.right = [ [ s:gray1, s:gray3 ], [ s:gray1, s:gray3 ], [ s:gray4, s:gray2 ], [ s:green, s:gray2 ] ]
    let s:p.normal.middle = [ [ s:gray4, s:gray2 ] ]
    let s:p.normal.error = [ [ s:gray2, s:red ] ]
    let s:p.normal.warning = [ [ s:gray2, s:yellow ] ]

    let s:p.insert.left = [ [ s:gray2, s:cyan ], [ s:cyan, s:gray2 ] ]
    let s:p.insert.right = [ [ s:gray2, s:cyan ], [ s:gray1, s:gray3 ], [ s:gray4, s:gray2 ], [ s:green, s:gray2 ] ]

    let s:p.replace.left = [ [ s:gray2, s:yellow ], [ s:yellow, s:gray2 ] ]
    let s:p.replace.right = [ [ s:gray2, s:yellow ], [ s:gray1, s:gray3 ], [ s:gray4, s:gray2 ], [ s:green, s:gray2 ] ]

    let s:p.visual.left = [ [ s:gray2, s:purple ], [ s:purple, s:gray2 ] ]
    let s:p.visual.right = [ [ s:gray2, s:purple ], [ s:gray1, s:gray3 ], [ s:gray4, s:gray2 ], [ s:green, s:gray2 ] ]

    let s:p.inactive.left =  [ [ s:gray4, s:gray2 ], [ s:gray4, s:gray2 ] ]
    let s:p.inactive.right = [ [ s:gray4, s:gray2 ], [ s:gray4, s:gray2 ] ]
    let s:p.inactive.middle = [ [ s:gray4, s:gray2 ] ]

    let s:p.tabline.left = [ [ s:gray4, s:gray2 ] ]
    let s:p.tabline.middle = [ [ s:gray4, s:gray2 ] ]
    let s:p.tabline.right = [ [ s:gray4, s:gray2 ] ]
    let s:p.tabline.tabsel = [ [ s:yellow, s:gray3 ] ]

    let g:lightline#colorscheme#bong#palette = lightline#colorscheme#fill(s:p)
endif
