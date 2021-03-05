" Vim Color File
" Name:       gulatton.vim
" Maintainer: tar80
" License:    MIT(https://opensource.org/licenses/mit-license.php)
" Based On:   https://github.com/kaicataldo/material.vim

highlight clear

if exists('syntax_on')
  syntax reset
endif

let g:colors_name = 'gulatton'
let g:gulatton_terminal_italics = get(g:, 'gulatton_terminal_italics', 0)

function! s:HL(group, fg, bg, attr)
  let l:attr = a:attr
  if !g:gulatton_terminal_italics && l:attr ==# 'italic'
    let l:attr = ''
  endif

  if empty(l:attr)
    let l:attr = 'none'
  endif

  if !empty(a:fg)
    exec 'hi ' . a:group . ' guifg=' . a:fg
  endif

  if !empty(a:bg)
    exec 'hi ' . a:group . ' guibg=' . a:bg
  endif

  if !empty(a:attr)
    exec 'hi ' . a:group . ' gui=' . l:attr . ' cterm=' . l:attr
  endif
endfunction

" Color Palette
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

" Vim Editor
call s:HL('ColorColumn',        '',        s:gray3,  '')
call s:HL('Cursor',             s:gray2,   s:white,  '')
call s:HL('CursorColumn',       '',        s:gray2,  '')
call s:HL('CursorLine',         s:black,   s:cyan,   'none')
call s:HL('CursorLineNr',       s:green,   s:black,  'none')
call s:HL('Directory',          s:purple,  '',       '')
call s:HL('DiffAdd',            s:cyan,    s:gray4,  'none')
call s:HL('DiffChange',         s:gray4,   s:gray3,  'none')
call s:HL('DiffDelete',         s:gray2,   s:gray2,  'none')
call s:HL('DiffText',           s:green,   s:gray4,  'none')
call s:HL('ErrorMsg',           s:red,     s:black,  'bold')
call s:HL('FoldColumn',         s:yellow,  s:black,  '')
call s:HL('Folded',             s:gray4,   s:black,  '')
call s:HL('IncSearch',          s:yellow,  '',       '')
call s:HL('LineNr',             s:gray4,   '',       '')
call s:HL('LineNrAbove',        s:gray3,   '',       '')
call s:HL('LineNrBelow',        s:gray3,   '',       '')
call s:HL('MatchParen',         s:cyan,    s:black,  'bold')
call s:HL('ModeMsg',            s:green,   '',       '')
call s:HL('MoreMsg',            s:green,   '',       '')
call s:HL('NonText',            s:gray4,   '',       'none')
call s:HL('Normal',             s:white,   s:black,  'none')
call s:HL('Pmenu',              s:white,   s:gray3,  '')
call s:HL('PmenuSbar',          '',        s:gray2,  '')
call s:HL('PmenuSel',           s:gray2,   s:cyan,   '')
call s:HL('PmenuThumb',         '',        s:gray4,  '')
call s:HL('Question',           s:purple,  '',       'none')
call s:HL('Search',             s:orange,  s:brown,  '')
call s:HL('SignColumn',         s:white,   s:black,  '')
call s:HL('SpecialKey',         s:gray3,   s:gray2,   '')
call s:HL('SpellCap',           s:cyan,    s:black,  'undercurl')
call s:HL('SpellBad',           s:plum,    s:black,  'undercurl')
call s:HL('StatusLine',         s:white,   s:gray3,  'none')
call s:HL('StatusLineNC',       s:gray2,   s:gray4,  '')
call s:HL('TabLine',            s:gray4,   s:gray2,  'none')
call s:HL('TabLineFill',        s:gray4,   s:gray2,  'none')
call s:HL('TabLineSel',         s:yellow,  s:gray3,  'none')
call s:HL('Title',              s:green,   '',       'none')
call s:HL('VertSplit',          s:gray4,   s:black,  'none')
call s:HL('Visual',             s:white,   s:gray3,  '')
call s:HL('WarningMsg',         s:red,     '',       '')
call s:HL('WildMenu',           s:gray2,   s:cyan,   '')

" Standard Syntax
call s:HL('Comment',            s:gray4,   '',       'italic')
call s:HL('Constant',           s:orange,  '',       '')
call s:HL('String',             s:green,   '',       '')
call s:HL('Character',          s:green,   '',       '')
call s:HL('Identifier',         s:red,     '',       'none')
call s:HL('Function',           s:purple,  '',       '')
call s:HL('Statement',          s:purple,  '',       'none')
call s:HL('Operator',           s:cyan,    '',       '')
call s:HL('PreProc',            s:cyan,    '',       '')
call s:HL('Include',            s:blue,    '',       '')
call s:HL('Define',             s:purple,  '',       'none')
call s:HL('Macro',              s:blue,    '',       '')
call s:HL('Type',               s:yellow,  '',       'none')
call s:HL('Structure',          s:cyan,    '',       '')
call s:HL('Special',            s:red,     '',       '')
call s:HL('Underlined',         s:blue,    '',       'none')
call s:HL('Error',              s:plum,    s:black,  '')
call s:HL('Todo',               s:orange,   s:black, 'italic')

" CSS
call s:HL('cssAttrComma',       s:white,   '', '')
call s:HL('cssPseudoClassId',   s:yellow,  '', '')
call s:HL('cssBraces',          s:white,   '', '')
call s:HL('cssClassName',       s:yellow,  '', '')
call s:HL('cssClassNameDot',    s:yellow,  '', '')
call s:HL('cssFunctionName',    s:purple,  '', '')
call s:HL('cssImportant',       s:cyan,    '', '')
call s:HL('cssIncludeKeyword',  s:blue,    '', '')
call s:HL('cssTagName',         s:red,     '', '')
call s:HL('cssMediaType',       s:orange,  '', '')
call s:HL('cssProp',            s:white,   '', '')
call s:HL('cssSelectorOp',      s:cyan,    '', '')
call s:HL('cssSelectorOp2',     s:cyan,    '', '')

" Commit Messages (Git)
call s:HL('gitcommitHeader',        s:blue,    '', '')
call s:HL('gitcommitUnmerged',      s:green,   '', '')
call s:HL('gitcommitSelectedFile',  s:green,   '', '')
call s:HL('gitcommitDiscardedFile', s:red,     '', '')
call s:HL('gitcommitUnmergedFile',  s:yellow,  '', '')
call s:HL('gitcommitSelectedType',  s:green,   '', '')
call s:HL('gitcommitSummary',       s:purple,  '', '')
call s:HL('gitcommitDiscardedType', s:red,     '', '')
hi link gitcommitNoBranch           gitcommitBranch
hi link gitcommitUntracked          gitcommitComment
hi link gitcommitDiscarded          gitcommitComment
hi link gitcommitSelected           gitcommitComment
hi link gitcommitDiscardedArrow     gitcommitDiscardedFile
hi link gitcommitSelectedArrow      gitcommitSelectedFile
hi link gitcommitUnmergedArrow      gitcommitUnmergedFile

" HTML
call s:HL('htmlEndTag',             s:purple,   '', '')
call s:HL('htmlLink',               s:red,      '', '')
call s:HL('htmlTag',                s:purple,   '', '')
call s:HL('htmlTitle',              s:white,    '', '')
call s:HL('htmlSpecialTagName',     s:blue,     '', '')
call s:HL('htmlArg',                s:yellow,   '', 'italic')

" Javascript
call s:HL('javaScriptBraces',       s:white,    '', '')
call s:HL('javaScriptNull',         s:orange,   '', '')
call s:HL('javaScriptIdentifier',   s:blue,     '', '')
call s:HL('javaScriptNumber',       s:orange,   '', '')
call s:HL('javaScriptRequire',      s:cyan,     '', '')
call s:HL('javaScriptReserved',     s:blue,     '', '')

" JSON
call s:HL('jsonBraces',             s:white,    '', '')

" Less
call s:HL('lessAmpersand',          s:red,      '', '')
call s:HL('lessClassChar',          s:yellow,   '', '')
call s:HL('lessCssAttribute',       s:white,    '', '')
call s:HL('lessFunction',           s:purple,   '', '')
call s:HL('lessVariable',           s:blue,     '', '')

" Markdown
call s:HL('markdownBold',               s:yellow,   '', 'bold')
call s:HL('markdownBoldDelimiter',      s:cyan,     '', '')
call s:HL('markdownCode',               s:cyan,     '', '')
call s:HL('markdownCodeBlock',          s:cyan,     '', '')
call s:HL('markdownCodeDelimiter',      s:cyan,     '', '')
call s:HL('markdownHeadingDelimiter',   s:green,    '', '')
call s:HL('markdownHeadingRule',        s:gray4,    '', '')
call s:HL('markdownId',                 s:blue,     '', '')
call s:HL('markdownItalic',             s:purple,   '', 'italic')
call s:HL('markdownListMarker',         s:orange,   '', '')
call s:HL('markdownOrderedListMarker',  s:orange,   '', '')
call s:HL('markdownRule',               s:gray4,    '', '')
call s:HL('markdownUrl',                s:blue,     '', '')
call s:HL('markdownUrlTitleDelimiter',  s:green,    '', '')

" Ruby
call s:HL('rubyInterpolation',          s:cyan,     '', '')
call s:HL('rubyInterpolationDelimiter', s:plum,     '', '')
call s:HL('rubyRegexp',                 s:cyan,     '', '')
call s:HL('rubyRegexpDelimiter',        s:plum,     '', '')
call s:HL('rubyStringDelimiter',        s:green,    '', '')

" Sass
call s:HL('sassAmpersand',              s:red,      '', '')
call s:HL('sassClassChar',              s:yellow,   '', '')
call s:HL('sassMixinName',              s:purple,   '', '')
call s:HL('sassVariable',               s:blue,     '', '')

" XML
call s:HL('xmlAttrib',                  s:yellow,   '', 'italic')
call s:HL('xmlEndTag',                  s:purple,   '', '')
call s:HL('xmlTag',                     s:purple,   '', '')
call s:HL('xmlTagName',                 s:purple,   '', '')

" Neovim terminal colors
if has('nvim')
    let g:terminal_color_0 = s:black
    let g:terminal_color_1 = s:red
    let g:terminal_color_2 = s:green
    let g:terminal_color_3 = s:yellow
    let g:terminal_color_4 = s:blue
    let g:terminal_color_5 = s:purple
    let g:terminal_color_6 = s:cyan
    let g:terminal_color_7 = s:white
    let g:terminal_color_8 = s:gray3
    let g:terminal_color_9 = s:red
    let g:terminal_color_10 = s:green
    let g:terminal_color_11 = s:yellow
    let g:terminal_color_12 = s:blue
    let g:terminal_color_13 = s:purple
    let g:terminal_color_14 = s:cyan
    let g:terminal_color_15 = s:gray4
    let g:terminal_color_background = g:terminal_color_0
    let g:terminal_color_foreground = g:terminal_color_7
endif
