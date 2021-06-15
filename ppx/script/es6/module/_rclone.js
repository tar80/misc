//!*script

'use strict';

const arg = {
  ls2lf: { path: PPx.Arguments(0), opt: PPx.Arguments(1) },
  cmd: PPx.Arguments(2),
  order: PPx.Arguments(3),
  listfile: PPx.Arguments(4),
  path1: PPx.Arguments(5),
  path2: PPx.Arguments(6),
  ppcID: PPx.Arguments(7)
};

const func = {};
const log = (msg) => `*execute ${arg.ppcID},*logwindow "Module: ${msg}`;

func['list'] = (arg) => {
  PPx.Execute(log('in progress...'));
  PPx.Execute(
    '*run -min %0%\\ppbw -c' +
    ` ${arg.ls2lf.path} -j "A:Attr,S:Size,M:ModeTime,F:Name" ${arg.ls2lf.opt} ${arg.listfile} ${arg.cmd} lsjson ${arg.path1}` +
    ` %%& *execute ${arg.ppcID},*jumppath aux://S_aux${arg.cmd}/${arg.path1}` +
    ` %%& ${log('completed.')}`
  );
  return;
};

func['get'] = (arg) => {
  PPx.Execute(log('entry copying...'));
  PPx.Execute(`*run -min %0%\\ppbw -c ${arg.cmd} copy ${arg.path1} ${arg.path2} %&`);
  return;
};

func['makedir'] = (arg) => {
  PPx.Execute(log('directory making...'));
  PPx.Execute(`*run -min %0%\\ppbw -c ${arg.cmd} mkdir ${arg.path1} %&`);
  return;
};

func['deldir'] = (arg) => {
  PPx.Execute(log('directory deleting...'));
  PPx.Execute(`*run -min %0%\\ppbw -c ${arg.cmd} rmdir ${arg.path1} %&`);
  return;
};

func['del'] = (arg) => {
  PPx.Execute(log('entry deleting...'));
  PPx.Execute(`*run -min %0\\ppbw -c ${arg.cmd} delete ${arg.path1} %&`);
  return;
};

func['cat'] = (arg) => {
  PPx.Execute(log('entry receiving...'));
  PPx.Execute(`*run -min -noppb cmd /c ${arg.cmd} cat ${arg.path1} | %0%\\ppvw %&`);
  return;
};

func[arg.order](arg);
