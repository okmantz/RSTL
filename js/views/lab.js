import { S, save, addXP, markActive } from '../store.js';
import { checkAch } from '../ach.js';
import { esc } from '../util.js';
import { md } from '../ui.js';
let L = null; const load = async () => L || (L = (await import('../../content/lab.js')).default);
const NAMES = { 1: 'Accept', 2: 'Unsure', 3: 'Reject' };
function verdict(a, st) {
  const p = st.p || []; const n = a.prem.length; const set = p.filter(Boolean).length;
  if (set < n) return `<div class="verdict"><b>Mark every premise to see where you stand.</b><p class="small muted mb0">${set} of ${n} marked.</p></div>`;
  const rej = p.findIndex(x => x === 3), uns = p.findIndex(x => x === 2);
  if (rej >= 0) return `<div class="verdict no"><b>The argument breaks for you at premise ${rej + 1}.</b><p class="small mb0">${md(a.prem[rej][0])}</p><p class="small muted mt mb0">Before you walk away: is there a <em>weaker</em> version of that premise you would accept? Does the conclusion survive on the weaker version, or only on the stronger one? Defenders of the argument usually retreat exactly here — and critics follow them.</p></div>`;
  if (uns >= 0) return `<div class="verdict mid"><b>Unsettled at premise ${uns + 1}.</b><p class="small mb0">${md(a.prem[uns][0])}</p><p class="small muted mt mb0">An argument is only as strong as its most doubtful premise. What kind of evidence would move you from “unsure” to accept or reject?</p></div>`;
  return `<div class="verdict ok"><b>By your own lights, every premise holds.</b><p class="small mb0">${md(a.valid)}</p><p class="small muted mt mb0">If the argument is valid and you accept every premise, rational consistency asks you to accept the conclusion. If that feels wrong, one of your “accepts” was cheaper than you thought — go back and find it.</p></div>`;
}
export async function view({ p1 }) {
  const labs = await load();
  if (p1) {
    const a = labs.find(x => x.id === p1); if (!a) return { html: '<p>Not found.</p>' };
    const st = S.args[a.id] || {};
    const html = `<div class="narrow"><a class="small" href="#/study/lab">← Argument Lab</a><div class="kicker mt">${esc(a.src)}</div><h1>${esc(a.t)}</h1><p class="muted">${md(a.intro)}</p>
    <div class="card" id="premises">${a.prem.map(([t, note], i) => `<div class="prem"><div class="pn">${i + 1}</div><div><p>${md(t)}</p>${note ? `<p class="note">${md(note)}</p>` : ''}<div class="tri">${[1, 2, 3].map(v => `<button class="${(st.p || [])[i] === v ? 'on' : ''}" data-val="${v}" data-act="prem" data-id="${a.id}" data-i="${i}" data-v="${v}">${NAMES[v]}</button>`).join('')}</div></div></div>`).join('')}
    <div class="prem" style="grid-template-columns:34px 1fr"><div class="pn">∴</div><div><p><b>${md(a.concl)}</b></p></div></div></div>
    <div id="verdict">${verdict({ prem: a.prem, valid: a.valid }, st)}</div>
    <details class="blk mt" open><summary>Where it’s strongest</summary><div class="in">${md(a.strong)}</div></details>
    <details class="blk fracture" open><summary>Where it’s attacked</summary><div class="in">${md(a.weak)}</div></details>
    ${a.src2 ? `<details class="blk"><summary>Read further</summary><div class="in"><ul class="src">${a.src2.map(s => `<li>${md(s)}</li>`).join('')}</ul></div></details>` : ''}</div>`;
    return { html };
  }
  const html = `<a class="small" href="#/study">← Study</a><h1 style="margin-top:6px">Argument Lab</h1><p class="muted narrow" style="margin-left:0">Philosophy’s oldest move: grant nothing for free. For each argument, mark every premise <b>Accept</b>, <b>Unsure</b> or <b>Reject</b>. The Lab shows where the argument breaks <em>for you</em> — and what defenders and critics say about that exact joint.</p>
  <div class="list mt">${labs.map(a => { const st = S.args[a.id] || {}; return `<a class="item ${st.tested ? 'done' : ''}" href="#/study/lab/${a.id}"><span class="n">${st.tested ? '✓' : '⚖'}</span><div><h3>${esc(a.t)}</h3><p>${esc(a.src)} · ${a.prem.length} premises</p></div></a>`; }).join('')}</div>`;
  return { html };
}
export const actions = {
  async prem(el) {
    const labs = await load(); const a = labs.find(x => x.id === el.dataset.id); const st = (S.args[a.id] ||= { p: [] });
    st.p[+el.dataset.i] = +el.dataset.v; save();
    const all = a.prem.every((_, i) => st.p[i]);
    if (all && !st.tested) { st.tested = Date.now(); save(); addXP(20, 'argument tested'); markActive(); checkAch(); }
    el.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el));
    document.getElementById('verdict').innerHTML = verdict({ prem: a.prem, valid: a.valid }, st);
  }
};
