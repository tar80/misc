//!*script
/* gitmode表示位置調節 */
//
// PPx.Arguments(0) = b|c|e:スクリプト終了後のフォーカス
// ※ 'e'を指定した時は位置調整だけで左右の移動は行わない

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

/////////* 初期設定 *////////////

// 画面の使用領域
const x = { 'start': 10, 'end': 1300 };   // 横軸[始点, 終点]
const y = { 'start': 10, 'end': 720 };    // 縦軸[始点, 終点]

// ppeの配置位置 0=上, 1=下
const ePos = 0;

/////////////////////////////////

const LeftPPc = () => {
  PPx.Execute('*setcust _User:g_git_pos=1');
  PPx.Execute(`*windowposition ${bHWND}, ${w.hor['b']}, ${h.zero}`);
  PPx.Execute(`*windowposition ${cHWND}, ${w.zero}, ${h.vert['c']}`);
  if (eHWND !== 0) { PPx.Execute(`*windowposition ${eHWND}, ${w.zero}, ${h.vert['e']}`); }
};

const RightPPc = () => {
  PPx.Execute('*setcust _User:g_git_pos=2');
  PPx.Execute(`*windowposition ${bHWND}, ${w.zero}, ${h.zero}`);
  PPx.Execute(`*windowposition ${cHWND}, ${w.hor['c']}, ${h.vert['c']}`);
  if (eHWND !==0) { PPx.Execute(`*windowposition ${eHWND}, ${w.hor['c']}, ${h.vert['e']}`); }
};

const arg = (() => {
  const chr = PPx.Arguments(0);
  const flag = PPx.Extract('%*getcust(_User:g_git_pos)')|0;
  const move = () => {
    if (chr === 'e') {
      (flag === 2) ? RightPPc() : LeftPPc();
    } else {
      (flag === 2) ? LeftPPc() : RightPPc();
    }
  };
  const hwnd = {
    'b': (() => bHWND),
    'c': (() => cHWND),
    'e': (() => eHWND)
  };
  return { 'move': move, 'HWND': hwnd[chr] };
})();

const ppcID  = 'C' +  PPx.Extract('%*getcust(_User:g_ppcid)');
const cHWND = PPx.Extract(`%*Extract(%%N${ppcID})`)|0;
// const bHWND = ((id = 0) => {
//   const arrStr = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
//   for (const chr of arrStr) {
//     id = PPx.Extract(`%*Extract(%%NB${chr})`)|0;
//     if (id !== 0) { return id; }
//   }
// })();
const bHWND = PPx.Extract('%*extract(%%NBA)')|0;

if (bHWND === 0 ) {
  PPx.Execute(`*closeppx B* %: *wait 0 %: *ppb -k *selectppx ${ppcID}`);
  PPx.Quit(1);
}

const eHWND = PPx.Extract('%*findwindowclass(PPeditW)')|0;
const eHeight = (eHWND !== 0) ? PPx.Extract(`%*windowrect(${eHWND},h)`) : 0;

PPx.Execute(`*focus #${bHWND}`);

const bRect = { 'wide': PPx.Extract(`%*windowrect(${bHWND},w)`), 'height': PPx.Extract(`%*windowrect(${bHWND},h)`) };

// 窓の位置情報
class Cfield {
  constructor(zero, end, bWH, eWH) {
    this.zero = zero;
    this.end = end;
    this.bWH = bWH|0;
    this.eWH = eWH|0;
    this.length = end - zero;
  }
  get rect() { return { 'wide': this.length - this.bWH, 'length': this.length - this.eWH }; }
  get hor() { return { 'b': this.zero + this.rect.wide, 'c': this.zero + this.bWH }; }
  get vert() { return (ePos === 0)
    ? { 'c': this.zero + this.eWH, 'e': this.zero }
    : { 'c': this.zero, 'e': this.zero + this.rect.length };
  }
}

const w = new Cfield(x.start, x.end, bRect.wide, 0);
const h = new Cfield(y.start, y.end, bRect.height, eHeight);

PPx.Execute(`*windowsize ${cHWND},${w.rect.wide},${h.rect.length}`);
if (eHWND !== 0) { PPx.Execute(`*windowsize ${eHWND},${w.rect.wide},${eHeight}`); }

arg.move();

PPx.Execute(`*pptray -c *focus #${arg.HWND()}`);

