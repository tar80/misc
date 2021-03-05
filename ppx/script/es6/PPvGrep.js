//!*script
/* grep結果をPPvで閲覧 */
//
// PPx.Arguments() = (0)使用するgrepコマンド, (1)1:オプションの再登録

'use strict';

const arglen = PPx.Arguments.length;

if (!arglen) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

/////////* 初期設定 *////////////

// 使用するコマンド
const use_grep = false;
const use_ripgrep = true;
const use_jvgrep = true;

// grep_option lockは固定。addの値を変更
// grep
const gr = (use_grep === true) ? { 'lock': '-nH', 'add': 'irEC1 --color=always', 'complist': 'GREPOPTION.TXT' } : null;
// ripgrep
const rg = (use_ripgrep === true) ? { 'lock': '-n --no-heading ', 'add': '--color always -Li -C1', 'complist': 'RGOPTION.TXT' } : null;
// jvgrep
const jv = (use_jvgrep === true) ? { 'lock': '-n -r ', 'add': '--color=always -iGI8 -B1', 'complist': 'JVGREPOPTION.TXT' } : null;

//マークなしのときの選択対象(")で括るように
const markless = '"..\\%*name(C,%FD)"';

/////////////////////////////////

const argCmd = PPx.Arguments(0);
const dogrep = (argCmd === 'grep') ? gr : (argCmd === 'rg') ? rg : jv;
{
  const reload_opt = (() => { return ( arglen === 2) ? PPx.Arguments(1) : null; })();
  const check_Mxxx = PPx.Extract('%*getcust(M_grepOptions)').split('\u000D\u000A');
  if (check_Mxxx.length === 3 || reload_opt === '1') {
    if (use_grep === true) {
      PPx.Execute(`*setcust M_grepOptions:grep=*string i,cmd=grep %%: *string i,gopt=${gr.lock}${gr.add} %%: \
      *string e,lock=${gr.lock} %%: *string e,add=${gr.add} %%: *string e,list=${gr.complist} %%: \
      *string e,flen=${gr.lock.length} %%: *string e,blen=${gr.lock.length + gr.add.length}`);
    } else {
      PPx.Execute('*deletecust "M_grepOptions:grep"');
    }
    if (use_ripgrep === true) {
      PPx.Execute(`*setcust M_grepOptions:rg=*string i,cmd=rg %%: *string i,gopt=${rg.lock}${rg.add} %%: \
      *string e,lock=${rg.lock} %%: *string e,add=${rg.add} %%: *string e,list=${rg.complist} %%: \
      *string e,flen=${rg.lock.length} %%: *string e,blen=${rg.lock.length + rg.add.length}`);
    } else {
      PPx.Execute('*deletecust "M_grepOptions:rg"');
    }
    if (use_jvgrep === true) {
      PPx.Execute(`*setcust M_grepOptions:jvgrep=*string i,cmd=jvgrep %%: *string i,gopt=${jv.lock}${jv.add} %%: \
      *string e,lock=${jv.lock} %%: *string e,add=${jv.add} %%: *string e,list=${jv.complist} %%: \
      *string e,flen=${jv.lock.length} %%: *string e,blen${jv.lock.length + jv.add.length}`);
    } else {
      PPx.Execute('*deletecust "M_grepOptions:jvgrep"');
    }
  }
}
// optionボタンの設定
PPx.Execute('*string i,Edit_OptionCmd=*string i,gopt=%%*input("%%se"lock"%%se"add"" \
  -title:"Option  ※%%se"lock"は外さないこと※" -mode:e -select:%%se"flen",%%se"blen" \
  -k *completelist /set /file:"%%\'list\'\\%%se"list"") %%: *setcaption %%se"cmd" %%si"gopt" ※\\=\\\\\\\\');

// 検索文字の入力とエスケープ処理
const str = (esc => {
  try {
    PPx.Execute(`*string i,gopt=${dogrep.lock}${dogrep.add}`);
    return esc = PPx.Extract(`%*script(%'scr'%\\compCode.js,"iOs","""%%","${argCmd} %%si""gopt"" ※\\=\\\\\\\\"," *execute %%%%%%%%M_grepOptions,!${argCmd}")`);
  } catch (e) {
    PPx.Execute('*string i,gopt=');
    PPx.Echo(e);
    PPx.Quit(-1);
  } finally {
    if (esc === '' ) {
      PPx.Execute('*string i,gopt=');
      PPx.Quit(-1);
    }
  }
})();

const tPath = (PPx.EntryMarkCount) ? '%#FCB' : markless;

// grepの結果をutf16lbで出力
PPx.Execute(`*run -noppb -min %si"cmd" %si"gopt" "${str}" ${tPath} | %0ppvw -bootid:w -esc -document -k *string p,grep=1 %%: *find "${str}"`);
