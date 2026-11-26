import { S, save, addXP, markActive } from '../store.js';
import { ic } from '../icons.js';
import { checkAch, setQN } from '../ach.js';
import * as B from '../bible.js';
import { esc, $, debounce } from '../util.js';
import { md } from '../ui.js';
import { respondHTML, wireRespond, reactRow } from '../respond.js';
let Q = null;
const load = async () => { if (!Q) { Q = (await import('../../content/questions.js')).default; setQN(Q.length); } return Q; };
export async function view({ p1 }) {
  const qs = await load();
  if (p1) {
    const q = qs.find(x => x.id === p1); if (!q) return { html: '<p>Not found.</p>' };
    const st = S.qs[q.id] || {};
    const i = qs.indexOf(q);
    const html = `<div class="narrow"><a class="back" href="#/study/questions">Big Questions</a><div class="kicker mt">Big Question ${i + 1} of ${qs.length}</div><h1>${esc(q.q)}</h1>
    <div class="card"><div class="kicker">Why it matters</div><p class="mb0" style="font-family:var(--serif)">${md(q.why)}</p></div>
    <div class="sec-h"><h2>The serious positions</h2></div>
    ${q.pos.map(([n, c, w], k) => `<div class="pos"><h4>${esc(n)}</h4><p>${md(c)}</p>${w ? `<p class="tiny faint mt mb0">${md(w)}</p>` : ''}</div>`).join('')}
    <div class="sec-h"><h2>Where the text pushes back</h2></div><div class="card"><p style="font-family:var(--serif)">${md(q.push)}</p></div>
    <div class="sec-h"><h2>Where do you land?</h2></div>
    <div class="card"><div class="list" id="qpos">${q.pos.map(([n], k) => `<button class="item" style="text-align:left;${st.s === k + 1 ? 'border-color:var(--accent)' : ''}" data-act="qpick" data-id="${q.id}" data-k="${k + 1}"><span class="n">${st.s === k + 1 ? ic('target') : k + 1}</span><div><h3>${esc(n)}</h3></div></button>`).join('')}<button class="item" style="text-align:left;${st.s === 99 ? 'border-color:var(--accent)' : ''}" data-act="qpick" data-id="${q.id}" data-k="99"><span class="n">${st.s === 99 ? ic('target') : ic('help')}</span><div><h3>None of these — or I genuinely don’t know yet</h3></div></button></div>
    <p class="kicker mt">Your reasoning</p><textarea id="qnote" data-id="${q.id}" placeholder="What would change your mind? What is the strongest thing against your own position?">${esc(st.n || '')}</textarea></div>
    <div class="sec-h"><h2>Respond</h2></div>${respondHTML('question:' + q.id, { title: q.q, ref: '', questions: q.pos.map(p => 'Why would a thoughtful person hold: ' + p[0] + '?'), label: q.q })}${reactRow('question:' + q.id, 'q', q.q)}
    <div class="between mt2">${i > 0 ? `<a class="btn" href="#/study/question/${qs[i - 1].id}">← Previous</a>` : '<span></span>'}${i < qs.length - 1 ? `<a class="btn pri" href="#/study/question/${qs[i + 1].id}">Next question →</a>` : ''}</div></div>`;
    const after = () => { wireRespond(); const t = $('#qnote'); t.addEventListener('input', debounce(() => { (S.qs[t.dataset.id] ||= {}).n = t.value; save(); }, 400)); };
    return { html, after };
  }
  const html = `<a class="back" href="#/study">Study</a><h1 style="margin-top:6px">Big Questions</h1><p class="muted narrow" style="margin-left:0">Each question lays out the best case for every serious position — including ones you’ll dislike — then shows where the text itself pushes back. You choose; the app keeps score of nothing except your honesty.</p>
  <div class="list mt">${qs.map((q, i) => `<a class="item ${S.qs[q.id]?.s ? 'done' : ''}" href="#/study/question/${q.id}"><span class="n">${S.qs[q.id]?.s ? ic('check') : i + 1}</span><div><h3>${esc(q.q)}</h3><p>${q.pos.length} positions</p></div></a>`).join('')}</div>`;
  return { html };
}
export const actions = {
  qpick(el) {
    const id = el.dataset.id, k = +el.dataset.k; const st = (S.qs[id] ||= {}); const first = !st.s; st.s = k; st.t = Date.now(); save();
    if (first) { addXP(15, 'took a stance'); markActive(); }
    checkAch(); window.dispatchEvent(new Event('app:rerender'));
  }
};
