//!*script
/* gitmode表示位置調節 */

'use strict';

/////////* 初期設定 *////////////

// 窓の表示位置
const x = [20, 1300];   // 横軸[始点, 終点]
const y = [20, 720];    // 縦軸[始点, 終点]

/////////////////////////////////

const cID  = 'CG';
const cHWND = PPx.Extract(`%*Extract(%%N${cID})`)|0;
const flag = PPx.Extract('%*getcust(_User:g_git_pos)')|0;
// const ppcH = PPx.Extract('%*Extract(%%NCH)')|0;
// const bHWND = ((id = 0) => {
//   const arrStr = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
//   for (const chr of arrStr) {
//     id = PPx.Extract(`%*Extract(%%NB${chr})`)|0;
//     if (id !== 0) { return id; }
//   }
// })();
const bHWND = PPx.Extract('%*extract(%%NBA)')|0;
if (bHWND === 0 ) {
  PPx.Execute(`*closeppx B* %: *wait 0 %: *ppb -k *selectppx ${cID}`);
  PPx.Quit(1);
}

PPx.Execute(`*focus #${bHWND}`);

// gitmodeに使う画面領域
class field {
  constructor(zero, end, bWH) {
    this.zero = zero;
    this.end = end;
    this.bWH = bWH|0;
    this.length = end - zero;
  }
  get rect() { return [this.length / 2, this.length - this.bWH]; }
  get pos() { return [this.zero + this.rect[0], this.zero + this.rect[1], this.zero + this.bWH]; }
}

const ppbWH = [PPx.Extract(`%*windowrect(${bHWND},w)`), PPx.Extract(`%*windowrect(${bHWND},h)`)];
const w = new field(x[0], x[1], ppbWH[0]);
const h = new field(y[0], y[1], ppbWH[1]);

PPx.Execute(`*windowsize ${cHWND},${w.rect[1]},${h.length}`);

if (flag < 2) {
  PPx.Execute('*setcust _User:g_git_pos=2');
  PPx.Execute(`*windowposition ${cHWND}, ${w.pos[2]}, ${h.zero}`);
  PPx.Execute(`*windowposition ${bHWND}, ${w.zero}, ${h.zero}`);
} else {
  PPx.Execute('*setcust _User:g_git_pos=1');
  PPx.Execute(`*windowposition ${cHWND}, ${w.zero}, ${h.zero}`);
  PPx.Execute(`*windowposition ${bHWND}, ${w.pos[1]}, ${h.zero}`);
}

PPx.Execute(`*selectppx ${cID}`);
