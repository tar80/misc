﻿//!*script
/* 初期化後再設定 */

'use strict';

const pwd = PPx.Extract('%FD');
PPx.Execute('PPCUSTW CINIT');
PPx.Execute(`*run -d:${pwd} PPCUSTW CA %FDC %&`);
PPx.Execute('*closeppx CW');
