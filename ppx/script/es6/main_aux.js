//!*script
//

'use strict';

if (PPx.Arguments.length < 6) {
  PPx.Echo('aux: Error Invalid Arguments.');
  PPx.Quit(-1);
}

/////////* 初期設定 *////////////

const ls2lf = {
  'path': '%0%\\auxcmd\\ls2lf.exe',
  /* オプション指定(--show:結果表示, --append:追記, --lfdir:階層表示) */
  'opt': ''
};

/////////////////////////////////

const arg = {
  cmd: PPx.Arguments(0),
  order: PPx.Arguments(1),
  listfile: PPx.Arguments(2),
  path1: PPx.Arguments(3),
  path2: PPx.Arguments(4),
  ppcID: PPx.Arguments(5)
};

const log = (msg => `*execute C,*logwindow "aux: ${msg}`);

({
  'rclone': () => {
    PPx.Execute(log(`get ready ${arg.path1}`));

    // PPx.Execute(`*script %'scr'%\\module\\_rclone.js,${ls2lf.path},${ls2lf.opt},${arg.cmd},${arg.order},${arg.listfile},${arg.path1},${arg.path2},${ppcID}`);
    PPx.Execute(
      '*run -min %0%\\ppbw.exe -c' +
    ` ${ls2lf.path} -j "A:Attr,S:Size,M:ModeTime,F:Name" ${ls2lf.opt} ${arg.listfile} ${arg.cmd} lsjson ${arg.path1}` +
    ` %%& *execute ${arg.ppcID},*jumppath aux://S_auxRCLONE/${arg.path1}` +
    ` %%& ${log('completed.')}`
    );
  },
  'git': () => {}
})[PPx.Arguments(0)]();
