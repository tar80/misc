if(exists("g:lightline"))

    let s:black  = '#000900'
    let s:gray2  = '#1C1C21'
    let s:gray3  = '#3C3C40'
    let s:gray4  = '#616163'
    let s:white  = '#B7B8B9'
    let s:red    = '#D5648E'
    let s:green  = '#9FCA7E'
    let s:yellow = '#CEC461'
    let s:blue   = '#7082C7'
    let s:purple = '#A659A4'
    let s:cyan   = '#76ADC0'
    let s:orange = '#D1934C'
    let s:plum   = '#E54661'
    let s:navy1  = '#020F1D'
    let s:navy2  = '#12153D'
    let s:brown  = '#200909'

    let s:p = {'normal': {}, 'inactive': {}, 'insert': {}, 'replace': {}, 'visual': {}, 'tabline': {}}

    let s:p.normal.left = [ [ s:gray2, s:gray4 ], [ s:plum, s:gray3 ], [ s:gray4, s:gray2 ] ]
    let s:p.normal.right = [ [ s:black, s:gray4 ], [ s:black, s:gray3 ], [ s:gray4, s:gray2 ], [ s:blue, s:gray2 ] ]
    let s:p.normal.middle = [ [ s:gray4, s:gray2 ] ]
    let s:p.normal.error = [ [ s:gray2, s:plum ] ]
    let s:p.normal.warning = [ [ s:gray2, s:yellow ] ]

    let s:p.insert.left = [ [ s:gray2, s:cyan ], [ s:plum, s:gray3 ], [ s:cyan, s:gray2 ] ]
    let s:p.insert.right = [ [ s:gray2, s:cyan ], [ s:black, s:gray3 ], [ s:gray4, s:gray2 ], [ s:blue, s:gray2 ] ]

    let s:p.replace.left = [ [ s:gray2, s:yellow ], [ s:plum, s:gray3 ], [ s:yellow, s:gray2 ] ]
    let s:p.replace.right = [ [ s:gray2, s:yellow ], [ s:black, s:gray3 ], [ s:gray4, s:gray2 ], [ s:blue, s:gray2 ] ]

    let s:p.visual.left = [ [ s:gray2, s:purple ], [ s:plum, s:gray3 ], [ s:purple, s:gray2 ] ]
    let s:p.visual.right = [ [ s:gray2, s:purple ], [ s:black, s:gray3 ], [ s:gray4, s:gray2 ], [ s:blue, s:gray2 ] ]

    let s:p.inactive.left =  [ [ s:gray4, s:gray2 ], [ s:plum, s:gray3 ], [ s:gray4, s:gray2 ] ]
    let s:p.inactive.right = [ [ s:gray4, s:gray2 ], [ s:gray4, s:gray2 ] ]
    let s:p.inactive.middle = [ [ s:gray4, s:gray2 ] ]

    let s:p.tabline.left = [ [ s:gray4, s:gray2 ] ]
    let s:p.tabline.middle = [ [ s:gray4, s:gray2 ] ]
    let s:p.tabline.right = [ [ s:gray4, s:black ] ]
    let s:p.tabline.tabsel = [ [ s:white, s:gray3 ] ]

    let g:lightline#colorscheme#gulatton#palette = lightline#colorscheme#fill(s:p)
endif
