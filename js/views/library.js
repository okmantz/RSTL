import { S, save, addXP, markActive } from '../store.js';
import { ic } from '../icons.js';
import { checkAch } from '../ach.js';
import { esc } from '../util.js';
import { md, toast, plain } from '../ui.js';
import { respondHTML, wireRespond, reactRow } from '../respond.js';
let LIB = null; const load = async () => LIB || (LIB = await import('../../content/library.js'));
export async function view({ p1 }) {
  const { default: V, KINDS, SHELF } = await load();
  if (p1) {
    const v = V.find(x => x.id === p1); if (!v) return { html: '<p>Not found.</p>' };
    if (!S.lib[v.id]) { S.lib[v.id] = Date.now(); save(); addXP(8, 'new voice'); markActive(); checkAch(); }
    const html = `<div class="narrow"><a class="small" href="#/study/library">← Library of Voices</a><div class="kicker mt">${esc(KINDS[v.k] || v.k)} · ${esc(v.w)}</div><h1>${esc(v.n)}</h1><p class="muted">${md(v.s)}</p>
    <div class="blk voices" open style="padding:16px 18px"><div class="voice"><b>${esc(v.xl || 'In brief')}</b><span>${md(v.x)}</span></div></div>
    <div class="blk fracture" style="padding:16px 18px;margin-top:12px"><div class="kicker" style="color:var(--bad)">Why this unsettles</div><p style="font-family:var(--serif);margin:6px 0 0">${md(v.why)}</p></div>
    ${v.q ? `<div class="card mt"><div class="kicker">Ask yourself</div><p class="mb0" style="font-family:var(--serif)">${md(v.q)}</p></div>` : ''}
    ${v.l ? `<p class="mt small">Read more: ${v.l.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)} ${ic('external')}</a>`).join(' · ')}</p>` : ''}
    <div class="mt">${respondHTML('voice:' + v.id, { title: v.n, ref: '', questions: v.q ? [v.q] : [], label: v.n })}${reactRow('voice:' + v.id, 'x', v.n)}</div>
    <p class="tiny faint">Summaries here are paraphrase. Quoted words are short, from public-domain translations where named. Always read the primary text itself.</p></div>`;
    return { html, after: () => wireRespond() };
  }
  const html = `<a class="small" href="#/study">← Study</a><h1 style="margin-top:6px">Library of Voices</h1><p class="muted narrow" style="margin-left:0">The Bible didn’t arrive in a vacuum, and it isn’t the only book people have staked their lives on. Read it in conversation with the texts it quotes, the texts it excluded, the texts that answered it, and the traditions that see the same questions from the other side.</p>
  <div class="tabs" id="vtabs">${[['all', 'All'], ...Object.entries(KINDS)].map(([k, n], i) => `<button class="pill ${i === 0 ? 'on' : ''}" data-act="vfilter" data-k="${k}">${esc(n)}</button>`).join('')}</div>
  <div class="grid g2" id="vgrid">${V.map(v => `<a class="card vcard" data-k="${v.k}" href="#/study/voice/${v.id}"><div class="between"><span class="tag">${esc(KINDS[v.k] || v.k)}</span>${S.lib[v.id] ? '<span class="tag gold">read</span>' : ''}</div><h3 style="margin-top:8px">${esc(v.n)}</h3><p class="small faint mb0">${esc(v.w)}</p><p class="muted small mt mb0">${plain(v.s)}</p></a>`).join('')}</div>
  <div class="sec-h"><h2>The Shelf</h2><span class="tiny faint">further reading, real books</span></div>
  <div class="card"><ul class="src">${SHELF.map(s => `<li>${md(s)}</li>`).join('')}</ul></div>`;
  return { html };
}
export const actions = {
  vfilter(el) { document.querySelectorAll('#vtabs .pill').forEach(b => b.classList.toggle('on', b === el)); const k = el.dataset.k; document.querySelectorAll('.vcard').forEach(c => { c.style.display = (k === 'all' || c.dataset.k === k) ? '' : 'none'; }); }
};
