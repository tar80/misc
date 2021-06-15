// #!/usr/bin/env node
//
// cmd = shell command
// arg = {
//  ppxDir: PPx install directory,
//  ls2lf: { path: install path, opt: commandline option },
//  order: aux command,
//  listfile: listfile path,
//  path1: 1st path,
//  path2: 2nd path
//  };

'use strict';

const { exec } = require('child_process');

module.exports.list = (cmd, arg) => {
  console.log('Module: in progress...');
  exec(`${arg.ls2lf.path} -j "A:Attr,S:Size,M:ModeTime,F:Name" ${arg.ls2lf.opt} ${arg.listfile} ${cmd} lsjson ${arg.path1}`, (err) => {
    if (err) { throw new Error(err); }
    exec(`${arg.ppxDir}\\ppcw -r -bootid:A -noactive -k *jumppath aux://S_aux${cmd}/${arg.path1}`, (err) => {
      if (err) { throw new Error(err); }
      return;
    });
  });
};

module.exports.get = (cmd, arg) => {
  console.log('Module: copying...');
  exec(`${cmd} copy ${arg.path1} ${arg.path2}`, (err) => {
    if (err) { throw new Error(err); }
    return;
  });
};

module.exports.makedir = (cmd, arg) => {
  console.log('Module: make directory...');
  exec(`${cmd} mkdir ${arg.path1}` , (err) => {
    if (err) { throw new Error(err); }
    return;
  });
};

module.exports.deldir = (cmd, arg) => {
  console.log('Module: directory deleting...');
  exec(`${cmd} rmdir ${arg.path1}`, (err) => {
    if (err) { throw new Error(err); }
    return;
  });
};

module.exports.del = (cmd, arg) => {
  console.log('Module: entry deleting...');
  exec(`${cmd} delete ${arg.path1}`, (err) => {
    if (err) { throw new Error(err); }
    return;
  });
};

module.exports.cat = (cmd, arg) => {
  console.log('Module: in progress...');
  exec(`${cmd} cat ${arg.path1} | ${arg.ppxDir}\\ppvw`, (err) => {
    if (err) { throw new Error(err); }
    return;
  });
};
