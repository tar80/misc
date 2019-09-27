" Vim syntax file
" Language:     PPxCFG files
" Maintainer:   tar
" Last change:  2019 Jan 14
"======================================================================
" quit when a syntax file was already loaded
if exists ("b:current_syntax")
    finish
endif

" case off
syn case ignore
syn match UncPath "\\\\\p*" contained
"Dos Drive:\Path
syn match CfgDirectory "[a-zA-Z]:\\\p*" contained
"Parameters
syn match CfgParams    "^-|.*"
"Values
syn match CfgValues    "^.\{-\}\s" contains=CfgParams,CfgComment

" String
syn match CfgString    "\".*\"" contains=CfgBlock,CfgDelimiter,CfgValues
syn match CfgString    "'.*'"   contains=CfgBlock,CfgDelimiter,CfgValues

" Block
syn match CfgBlock     "%:"
" Sections
syn match CfgSection   "\[.*\]"
syn match CfgSection   "{\|}"

" Delimiter
syn match CfgDelimiter "=\|,\|;\|<\|>"

" Comments
syn match CfgComment   "^;.*"
syn match CfgComment   "\s;.*"

" Define the default hightlighting.
" Only when an item doesn't have highlighting yet
hi def link CfgBlock     DiffAdd
hi def link CfgDelimiter Statement
hi def link CfgComment   Comment
hi def link CfgSection   Constant
hi def link CfgString    String
hi def link CfgParams    Statement
hi def link CfgValues    PreProc
hi def link CfgDirectory Directory
hi def link UncPath      Directory


let b:current_syntax = "xcfg"
