// #!/usr/bin/env node
//
// パスワード暗号化ファイル生成と複合化モジュール
// require('./module/cryptAES256');
// cryptAES256.enc('cryptFilePath', 'keyString', 'passString');
// const password = cryptAES256.dec('cryptFilePath', 'keyString');

'use strict';

const fs = require('fs');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

exports.enc = (cryptFilePath, keyString, passString) => {
  const key = crypto.scryptSync(keyString, 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encPass = cipher.update(Buffer.from(passString));
  const encData = Buffer.concat([iv, encPass, cipher.final()]).toString('base64');

  ((path, data) => {
    fs.writeFile(path, data, (err) => {
      if (err) { throw new Error(err); }
    });
  })(cryptFilePath, encData);

  return;
};

exports.dec = (cryptFilePath, keyString) => {
  const data = fs.readFileSync(cryptFilePath, 'utf8');
  const buff = Buffer.from(data, 'base64');
  const key = crypto.scryptSync(keyString, 'salt', 32);
  const iv = buff.slice(0, 16);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const encData = buff.slice(16);
  const decData = decipher.update(encData);
  return Buffer.concat([decData, decipher.final()]).toString('utf8');
};
