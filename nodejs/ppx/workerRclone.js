// #!/usr/bin/env node
//
// argv = [0]node.exe path [1]script path

'use strict';

const { workerData } = require('worker_threads');
const aux = require(__dirname + '/module/aux_command');

if (workerData.path1 === undefined) { throw new Error('path not found.'); }

aux[workerData.order]('rclone', workerData);
