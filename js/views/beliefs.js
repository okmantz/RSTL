import { S, save, addXP, markActive } from '../store.js';
import { checkAch } from '../ach.js';
import { esc } from '../util.js';
import { md, toast } from '../ui.js';
import { DOMAINS, PROPS, LABELS } from '../../content/beliefs.js';

const avg = (vals, d) => { const ps = PROPS.filter(p => p.d === d && vals[p.id]); return ps.length ? ps.reduce((n, p) => n + vals[p.id], 0) / ps.length : 0; };
function radar(a, b) {
  const n = DOMAINS.length, R = 92, cx = 130, cy = 120;
  const pt = (i, v) => { const ang = -Math.PI / 2 + i * 2 * Math.PI / n, r = R * (v / 5); return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]; };
  const poly = (vals, col, op) => `<polygon points="${DOMAINS.map((d, i) => pt(i, avg(vals, d.id)).join(',')).join(' ')}" fill="${col}" fill-opacity="${op}" stroke="${col}" stroke-width="2"/>`;
  const rings = [1, 2, 3, 4, 5].map(k => `<polygon points="${DOMAINS.map((d, i) => pt(i, k).join(',')).join(' ')}" fill="none" stroke="var(--line)" stroke-width="1"/>`).join('');
  const labels = DOMAINS.map((d, i) => { const [x, y] = pt(i, 5.9); return `<text x="${x}" y="${y}" fill="var(--muted)" font-size="10" text-anchor="middle" dominant-baseline="middle">${esc(d.n)}</text>`; }).join('');
  return `<svg viewBox="0 0 260 240" style="width:100%;max-width:380px;display:block;margin:auto" role="img" aria-label="Belief map radar chart">${rings}${DOMAINS.map((d, i) => { const [x, y] = pt(i, 5); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line)"/>`; }).join('')}${a ? poly(a, '#7aa7ff', .12) : ''}${poly(b, '#e2b96b', .22)}${labels}</svg>`;
}
export async function view() {
  const cur = S.beliefs.cur, snaps = S.beliefs.snaps, last = snaps[snaps.length - 1];
  const html = `<div class="narrow"><a class="small" href="#/study">← Study</a><h1 style="margin-top:6px">Belief Map</h1><p class="muted">${PROPS.length} propositions across ${DOMAINS.length} domains. Answer fast, then save a snapshot. Return in a month, answer again, and see what moved. The goal isn’t to reach any particular map — it’s to know what yours <em>is</em>, and why.</p>
  <div class="card"><div class="between"><b>${snaps.length ? 'Current vs. last snapshot' : 'Your map so far'}</b><span class="tiny faint">${last ? 'Last snapshot: ' + new Date(last.ts).toLocaleDateString() : 'No snapshots yet'}</span></div><div id="radar">${radar(last ? last.v : null, cur)}</div><div class="row" style="justify-content:center"><span class="tiny"><span style="color:#e2b96b">■</span> now</span>${last ? '<span class="tiny"><span style="color:#7aa7ff">■</span> last snapshot</span>' : ''}</div></div>
  <div class="row mt"><button class="btn pri" data-act="snap">Save snapshot · +25 XP</button><a class="btn" href="#/study/beliefs/statement">Draft my statement of belief</a></div>
  ${DOMAINS.map(d => `<div class="sec-h"><h2>${esc(d.n)}</h2><span class="tiny faint">${esc(d.sub || '')}</span></div><div class="card" style="padding-top:4px">${PROPS.filter(p => p.d === d.id).map(p => { const v = cur[p.id], lv = last?.v[p.id]; const dlt = (v && lv) ? v - lv : 0; return `<div class="bel"><p>${md(p.t)}${dlt ? `<span class="delta ${dlt > 0 ? 'up' : 'dn'}">${dlt > 0 ? '▲' : '▼'} ${Math.abs(dlt)}</span>` : ''}</p><div class="likert" data-p="${p.id}">${[1, 2, 3, 4, 5].map(k => `<button class="${v === k ? 'on' : ''}" data-act="bel" data-p="${p.id}" data-v="${k}" title="${LABELS[k - 1]}">${k}</button>`).join('')}</div><div class="stance-lbl tiny mt"><span>${LABELS[0]}</span><span>${LABELS[4]}</span></div></div>`; }).join('')}</div>`).join('')}</div>`;
  return { html };
}
export async function statementView() {
  const cur = S.beliefs.cur;
  const hold = PROPS.filter(p => cur[p.id] >= 4), wrest = PROPS.filter(p => cur[p.id] === 3), deny = PROPS.filter(p => cur[p.id] && cur[p.id] <= 2);
  const lst = a => a.length ? `<ul>${a.map(p => `<li>${md(p.t)}</li>`).join('')}</ul>` : '<p class="muted small">Nothing here yet.</p>';
  const text = `WHAT I CURRENTLY HOLD\n${hold.map(p => '- ' + p.t).join('\n')}\n\nWHAT I AM WRESTLING WITH\n${wrest.map(p => '- ' + p.t).join('\n')}\n\nWHAT I CURRENTLY REJECT\n${deny.map(p => '- ' + p.t).join('\n')}\n\n(${new Date().toLocaleDateString()})`;
  const html = `<div class="narrow"><a class="small" href="#/study/beliefs">← Belief Map</a><h1 style="margin-top:6px">My Statement of Belief</h1><p class="muted">Generated from your Belief Map. A creed you can defend line by line is worth more than one you inherited whole.</p>
  <div class="card"><div class="kicker">What I currently hold (4–5)</div>${lst(hold)}<div class="kicker mt">What I’m wrestling with (3)</div>${lst(wrest)}<div class="kicker mt">What I currently reject (1–2)</div>${lst(deny)}</div>
  <button class="btn mt" data-act="copyText" data-t="${esc(text)}">Copy as text</button></div>`;
  return { html };
}
export const actions = {
  bel(el) {
    S.beliefs.cur[el.dataset.p] = +el.dataset.v; save(); markActive();
    el.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el));
    const last = S.beliefs.snaps[S.beliefs.snaps.length - 1]; document.getElementById('radar').innerHTML = radar(last ? last.v : null, S.beliefs.cur);
  },
  snap() {
    const n = Object.keys(S.beliefs.cur).length; if (n < 8) { toast(`Answer at least 8 propositions first (${n} so far).`); return; }
    S.beliefs.snaps.push({ ts: Date.now(), v: { ...S.beliefs.cur } }); save(); addXP(25, 'belief snapshot'); checkAch(); window.dispatchEvent(new Event('app:rerender'));
  },
  copyText(el) { (navigator.clipboard?.writeText(el.dataset.t) || Promise.reject()).then(() => toast('Copied'), () => toast('Copy failed')); }
};
