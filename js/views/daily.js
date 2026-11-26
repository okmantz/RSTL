import { S, save } from '../store.js';
import * as B from '../bible.js';
import { renderUnit, unitActions } from '../unit.js';
import { checkinCard, checkinActions } from '../checkin.js';
import { esc, todayISO, addDays, fmtDate, $, bookColor } from '../util.js';
import { ic } from '../icons.js';
import { rerender, toast } from '../ui.js';
import * as C from '../curriculum.js';
import { SEASONS } from '../../content/traditions.js';

export const actions = {
  ...checkinActions, ...unitActions,
  setSeason(el) {
    const sid = el.dataset.sid; S.profile.season = sid; C.restartPath(); save();
    toast('Your path now begins with ' + C.seasonName(sid) + ', starting today.'); location.hash = '#/daily';
  }
};
const short = iso => fmtDate(iso).split(',')[1]?.trim() || iso;

export async function view({ p1 }) {
  const today = todayISO(), start = C.startISO();
  const iso = p1 || today;
  if (iso > today) { location.hash = '#/daily'; return { html: '' }; }
  if (iso < start) return { html: `<div class="narrow card"><h2>Before your start date</h2><p class="muted">Your path began on ${esc(fmtDate(start))}. <a href="#/daily">Go to today</a> or <a href="#/daily/journey">open your journey</a>.</p></div>` };
  const { n, idx, lap } = C.indexFor(iso), u = C.unitAt(idx), L = C.length();
  const prev = addDays(iso, -1), next = addDays(iso, 1);
  const head = `<div class="day-nav">${iso > start ? `<a class="btn sm ghost" href="#/daily/${prev}" data-nav="prev">${ic('arrowL')} ${esc(short(prev))}</a>` : '<span class="sp-btn"></span>'}<div class="mid"><div class="d">${iso === today ? '<span class="tag gold">Today</span> ' : ''}${esc(fmtDate(iso))}</div><div class="tiny faint">Day ${n + 1} · study ${idx + 1} of ${L}${lap > 0 ? ' · lap ' + (lap + 1) : ''} · <a href="#/daily/journey">journey</a></div></div>${iso < today ? `<a class="btn sm ghost" href="#/daily/${next}" data-nav="next">${esc(short(next))} ${ic('arrowR')}</a>` : '<span class="sp-btn"></span>'}</div>`;
  const checkin = iso === today ? `<div style="margin-bottom:22px">${checkinCard()}</div>` : '';
  const r = renderUnit(u, 'daily:' + iso, 'daily', '');
  const html = `<div class="narrow">${head}${checkin}</div>${r.html}`;
  const after = async () => { await r.after(); };
  return { html, after, title: u.t };
}

export async function journeyView() {
  const today = todayISO(), L = C.length(), { idx } = C.indexFor(today);
  const blocks = C.seasonBlocks();
  const doneAt = i => { const d = addDays(C.startISO(), i); return !!S.units['daily:' + d]?.done; };
  const total = Object.entries(S.units).filter(([k, x]) => k.startsWith('daily:') && x.done).length;
  const here = C.sequence()[idx]?.sid;
  const rows = blocks.map(b => {
    let dn = 0; b.at.forEach(i => { if (i <= idx && doneAt(i)) dn++; });
    const hr = here === b.sid;
    return `<div class="card mt"><div class="between"><div><div class="kicker">${hr ? 'You are here' : 'Season'}</div><h3 class="mb0">${esc(b.n)}</h3><div class="small muted">${esc(b.sub)} · ${b.days} studies</div></div><button class="btn sm" data-act="setSeason" data-sid="${b.sid}">${hr ? 'Restart here' : 'Begin here'}</button></div><div class="bar thin mt"><i style="width:${Math.round(dn / b.days * 100)}%"></i></div><div class="tiny faint mt">${dn} of ${b.days} finished on their own day</div></div>`;
  }).join('');
  const nextRows = []; for (let i = 0; i < 10; i++) { const j = (idx + i) % L, d = addDays(today, i); nextRows.push(`<div class="jr-row ${i === 0 ? 'now' : ''}"><span>${esc(C.titleAt(j))}${C.kindAt(j) === 'deep' ? ' <span class="tag gold">Deep dive</span>' : C.kindAt(j) === 'close' ? ' <span class="tag">Close reading</span>' : ''}</span><span class="faint">${esc(short(d))}</span></div>`); }
  const html = `<div class="narrow"><a class="back" href="#/daily">Today</a><h1 style="margin-top:8px">Your journey</h1><p class="muted">${L} different studies, one a day, about ${(L / 365).toFixed(1)} years, and no study comes back until you have been through all of them. ${C.deepCount()} are handwritten deep dives, ${C.closeCount()} are close readings (one tightly focused passage each), and the rest are guided readings built from the text, the cross-references and the book guides. You have finished ${total} so far. After the last day the path begins again with new lenses and questions.</p>
  <div class="sec-h"><h2>Coming up</h2></div><div class="card">${nextRows.join('')}</div>
  <div class="sec-h"><h2>Seasons</h2></div><p class="small muted">Change the order any time. Choosing a season starts it today; what you have already written stays saved.</p>${rows}</div>`;
  return { html, title: 'Journey' };
}
