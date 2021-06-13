// #!/usr/bin/env node

'use strict';

const { exec } = require('child_process');

module.exports.list = (ppxDir, cmd, ls2lf, listpath, remotepath) => {
  console.log('loading...');
  const openAUX = () => exec(`${ppxDir}\\ppcw -r -noactive -k *jumppath aux://S_auxRCLONE/${remotepath}`, (err) => {
    if (err) { console.error(err); }
    return console.log('completed.');
  });
  if (/[^:]\\?$/.test(remotepath)) {
    if (/^.*:[^/]/.test(remotepath)) { remotepath = remotepath.replace(/^(.*):(.*)$/,'$1:/$2'); }
    exec(`${ls2lf.path} -j "A:Attr,S:Size,M:ModeTime,F:Name" ${ls2lf.opt} ${listpath} ${cmd} lsjson ${remotepath}`, (err) => {
      if (err) { console.error(err); }
      return openAUX();
    });
  } else {
    exec(`${ls2lf.path} -c "bS W F" --lfdir ${ls2lf.opt} ${listpath} ${cmd} lsl ${remotepath}`, (err) => {
      if (err) { console.error(err); }
      return openAUX();
    });
  }
};

module.exports.get = (ppxDir, cmd, ls2lf, listpath, src, dest) => {
  console.log('copying...');
  exec(`${cmd} copy ${src} ${dest}`, (err) => {
    if (err) { console.error(err); }
    return console.log('completed.');
  });
};

module.exports.makedir = (ppxDir, cmd, ls2lf, listpath, remotepath) => {
  console.log('make directory...');
  exec(`${cmd} mkdir ${remotepath}` , (err) => {
    if (err) { console.error(err); }
    return console.log('completed.');
  });
};

module.exports.deldir = (ppxDir, cmd, ls2lf, listpath, remotepath) => {
  console.log('directory deleting...');
  exec(`${cmd} rmdir ${remotepath}`, (err) => {
    if (err) { console.error(err); }
    return console.log('completed.');
  });
};

module.exports.del = (ppxDir, cmd, ls2lf, listpath, remotepath) => {
  console.log('entry deleting...');
  exec(`${cmd} delete ${remotepath}`, (err) => {
    if (err) { console.error(err); }
    return console.log('completed.');
  });
};

module.exports.cat = (ppxDir, cmd, ls2lf, listpath, remotepath) => {
  console.log('loading...');
  exec(`${cmd} cat ${remotepath} | ${ppxDir}\\ppvw`, (err) => {
    if (err) { console.error(err); }
    return console.log('completed.');
  });
};
