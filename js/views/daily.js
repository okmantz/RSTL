import { S, dayRec } from '../store.js';
import * as B from '../bible.js';
import { renderUnit, unitActions } from '../unit.js';
import { checkinCard, checkinActions } from '../checkin.js';
import { esc, todayISO, dayNumber, mod, addDays, fmtDate, $ } from '../util.js';
import { md } from '../ui.js';
import { bookColor } from '../util.js';
import daily from '../../content/daily.js';

export const actions = { ...checkinActions, ...unitActions };
export async function view({ p1 }) {
  const today = todayISO();
  let iso = p1 || today;
  if (iso > today) { location.hash = '#/daily'; return { html: '' }; }
  const n = dayNumber(iso), idx = mod(n, daily.length), u = daily[idx];
  const lap = Math.floor(n / daily.length);
  const prev = addDays(iso, -1), next = addDays(iso, 1);
  const head = `<div class="between mb0" style="margin-bottom:14px"><a class="btn sm ghost" href="#/daily/${prev}">← ${esc(fmtDate(prev).split(',')[1].trim())}</a><div class="center small muted" style="text-align:center">${iso === today ? '<span class="tag gold">Today</span> ' : ''}${esc(fmtDate(iso))}<br><span class="tiny faint">Study ${idx + 1} of ${daily.length}${lap > 0 ? ' · lap ' + (lap + 1) : ''}</span></div>${iso < today ? `<a class="btn sm ghost" href="#/daily/${next}">${esc(fmtDate(next).split(',')[1].trim())} →</a>` : '<span style="width:80px"></span>'}</div>`;
  const checkin = iso === today ? `<div class="narrow" style="margin-bottom:16px">${checkinCard()}</div>` : '';
  const r = renderUnit(u, 'daily:' + iso, 'daily', head);
  const html = `<div class="narrow">${checkin}</div>${r.html}<div class="narrow mt2" id="thread"></div>`;
  const after = async () => {
    await r.after();
    try {
      const p = B.parseRef(u.ref[0]); if (!p) return;
      const xr = await B.xrefs(p.b); const v0 = p.v || 1;
      let list = B.unpack(xr[`${p.c}.${v0}`] || []);
      if (!list.length) { // fall back: any verse in the chapter with refs
        for (let v = 1; v < 60 && !list.length; v++) list = B.unpack(xr[`${p.c}.${v}`] || []);
      }
      list = list.slice(0, 5); if (!list.length) return;
      const t = S.profile.trans; const rows = [];
      for (const x of list) {
        const txt = await B.snippet(t, x, 200);
        rows.push(`<a class="xcard" style="--c:${bookColor(x.b)}" href="#/read/${x.b}/${x.c}?v=${x.v}"><div class="r"><span>${esc(B.label(x.b, x.c, x.v, x.ve))}</span><span class="w">${x.w} votes</span></div><div class="t">${esc(txt)}</div></a>`);
      }
      $('#thread').innerHTML = `<div class="kicker">Thread of the day</div><h3>What do these have to do with ${esc(B.label(p.b, p.c, v0))}?</h3><p class="muted small">Readers have linked these passages to today’s text. Pick two that seem unrelated and write down what they’re doing in the same conversation.</p>${rows.join('')}`;
    } catch (e) { }
  };
  return { html, after };
}
