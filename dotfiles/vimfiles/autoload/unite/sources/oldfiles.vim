scriptencoding utf-8
let s:save_cpo = &cpo
set cpo&vim

let s:source = {
\	"name" : "oldfiles",
\	"description" : "show oldfiles",
\}


function! s:source.gather_candidates(args, context)
	let files = filter(copy(v:oldfiles), "filereadable(expand(v:val))")
	return map(files, '{
\		"word" : v:val,
\		"kind" : "file",
\		"action__path" : v:val,
\	}')
endfunction


function! unite#sources#oldfiles#define(...)
	return s:source
endfunction


if expand("%:p") == expand("<sfile>:p")
	call unite#define_source(s:source)
endif


let &cpo = s:save_cpo
unlet s:save_cpo
