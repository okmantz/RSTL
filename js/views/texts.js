import { S, save, addXP, markActive } from '../store.js';
import { ic } from '../icons.js';
import { esc, $ } from '../util.js';
import { md, pageHead } from '../ui.js';
import TEXTS, { COLS, UNC, CANON_LBL } from '../../content/texts.js';

const byId = Object.fromEntries(TEXTS.map(t => [t.id, t]));
const col = id => COLS.find(c => c.id === id);
const canonSum = t => { const y = t.canon.filter(c => c[1] === 'yes').map(c => c[0]); return y.length ? 'Canonical for: ' + y.join(', ') : t.canon.length || t.canonNote ? 'Not in the Jewish or Christian canons' : 'Not scripture'; };
const meter = n => `<span class="unc" aria-label="Uncertainty ${n} of 4">${[1, 2, 3, 4].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;
const row = t => `<a class="item tx" href="#/texts/${t.id}"><span class="n">${S.tx.seen[t.id] ? ic('check') : ic(col(t.c).icon)}</span><div><h3>${esc(t.n)}</h3><p>${esc(t.date)} · ${esc(t.genre)}</p></div>${meter(t.unc[0])}</a>`;

export async function hubView({ q }) {
  const c = q.c && col(q.c);
  const list = c ? TEXTS.filter(t => t.c === c.id) : [];
  const html = `${pageHead({ back: 'Explore', backTo: '#/study', kicker: 'Ancient literature and religion', title: 'The texts around the Bible', sub: 'Every text is sorted four ways: whether any community treats it as scripture, what the historical evidence is, who tradition says wrote it, and how certain scholars are. Those are four different questions, and they often get four different answers.' })}
  <div class="tx-search"><input type="search" id="tx-q" placeholder="Search ${TEXTS.length} texts: Enoch, Gilgamesh, Augustine, Quran…" aria-label="Search texts"></div>
  <div id="tx-res" class="list mt" hidden></div>
  <div id="tx-main">
  <div class="chips mt">${[['', 'All collections'], ...COLS.map(x => [x.id, x.n])].map(([id, n]) => `<a class="chipb ${((q.c || '') === id) ? 'on' : ''}" href="#/texts${id ? '?c=' + id : ''}"><b>${esc(n)}</b></a>`).join('')}</div>
  ${c ? `<div class="sec-h"><h2>${esc(c.n)}</h2><span class="tiny faint">${list.length} texts</span></div><p class="muted small">${esc(c.sub)}</p><div class="list">${list.map(row).join('')}</div>`
    : `<div class="grid g-wide mt">${COLS.map(x => { const n = TEXTS.filter(t => t.c === x.id); return `<a class="card dcard" href="#/texts?c=${x.id}"><span class="tile-ic">${ic(x.icon)}</span><h3>${esc(x.n)}</h3><p class="muted small">${esc(x.sub)}</p><span class="tiny faint">${n.length} texts · ${n.slice(0, 3).map(t => esc(t.n.split(' (')[0].split(':')[0])).join(', ')}…</span></a>`; }).join('')}</div>`}
  <div class="card mt"><div class="kicker">How to read the four panels</div><div class="grid g2 small"><p class="mb0"><b>Canonical status</b>: who counts it as scripture. A statement about a community, not about history.</p><p class="mb0"><b>Historical evidence</b>: what survives, in what manuscripts, and how we know.</p><p class="mb0"><b>Traditional attribution</b>: who the tradition says wrote it. Often not who scholars think.</p><p class="mb0"><b>Scholarly uncertainty</b>: how settled the date and authorship are, from 1 (secure) to 4 (very uncertain).</p></div></div></div>`;
  const after = () => {
    const inp = $('#tx-q'), res = $('#tx-res'), main = $('#tx-main');
    inp.addEventListener('input', () => { const v = inp.value.trim().toLowerCase();
      if (!v) { res.hidden = true; main.hidden = false; return; }
      const hit = TEXTS.filter(t => (t.n + ' ' + t.date + ' ' + t.genre + ' ' + t.cult + ' ' + t.s).toLowerCase().includes(v));
      res.hidden = false; main.hidden = true; res.innerHTML = hit.length ? hit.map(row).join('') : `<p class="muted center">No text matches “${esc(inp.value)}”.</p>`; });
  };
  return { html, after, title: 'Texts' };
}

export async function view({ p1 }) {
  const t = byId[p1]; if (!t) return { html: '<div class="narrow"><p>Text not found.</p><a class="btn" href="#/texts">All texts</a></div>' };
  const c = col(t.c), same = TEXTS.filter(x => x.c === t.c), i = same.findIndex(x => x.id === t.id), prev = same[i - 1], next = same[i + 1];
  if (!S.tx.seen[t.id]) { S.tx.seen[t.id] = Date.now(); save(); addXP(4, 'text explored'); markActive(); }
  const link = ([l, u]) => u.startsWith('#') ? `<a class="btn sm" href="${u}">${ic('book')} ${esc(l)}</a>` : `<a class="btn sm" href="${u}" target="_blank" rel="noopener noreferrer">${esc(l)} ${ic('arrowR')}</a>`;
  const html = `<div class="narrow">${pageHead({ back: c.n, backTo: '#/texts?c=' + c.id, kicker: `${t.genre} · ${t.cult}`, title: esc(t.n), sub: esc(t.date) })}
  <div class="card"><p class="lead mb0">${md(t.s)}</p></div>
  <div class="grid g2 mt four">
    <section class="card pane"><div class="kicker">${ic('key')} Canonical status</div>${t.canon.length ? `<div class="cstat">${t.canon.map(([n, v, note]) => `<div class="cs ${v}"><span>${esc(n)}</span><b>${CANON_LBL[v]}</b>${note ? `<em>${esc(note)}</em>` : ''}</div>`).join('')}</div>` : `<p class="small muted">No community treats this text as scripture.</p>`}${t.canonNote ? `<p class="small mt mb0">${md(t.canonNote)}</p>` : ''}</section>
    <section class="card pane"><div class="kicker">${ic('mountain')} Historical evidence</div><p class="small mb0">${md(t.ev)}</p></section>
    <section class="card pane"><div class="kicker">${ic('scroll')} Traditional attribution</div><p class="small mb0">${md(t.trad)}</p></section>
    <section class="card pane"><div class="kicker">${ic('scale')} Scholarly uncertainty</div><div class="between"><b>${UNC[t.unc[0]]}</b>${meter(t.unc[0])}</div><p class="small mt mb0">${md(t.unc[1])}</p></section>
  </div>
  <div class="card mt"><div class="kicker">Why it matters</div><p class="mb0">${md(t.why)}</p></div>
  <div class="sec-h"><h2>Biblical connections</h2></div><div class="list">${t.ties.map(([r, n]) => `<div class="item"><div><h3>${md(r)}</h3><p>${md(n)}</p></div></div>`).join('')}</div>
  <div class="card glow mt press"><div class="kicker">${ic('speech')} Think about it</div><p class="mb0">${md(t.q)}</p></div>
  <div class="row mt">${t.voice ? `<a class="btn sm pri" href="#/study/voice/${t.voice}">${ic('urn')} Read an excerpt in Library of Voices</a>` : ''}${(t.src || []).map(link).join('')}</div>
  <div class="between mt2">${prev ? `<a class="btn" href="#/texts/${prev.id}">← ${esc(prev.n.split(' (')[0])}</a>` : '<span></span>'}${next ? `<a class="btn pri" href="#/texts/${next.id}">${esc(next.n.split(' (')[0])} →</a>` : '<span></span>'}</div></div>`;
  return { html, title: t.n };
}
export const actions = {};
