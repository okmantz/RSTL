import { S } from '../store.js';
import { esc } from '../util.js';
import { ic } from '../icons.js';
import { CATS, byId } from '../../content/resources.js';
import { TRADS } from '../../content/traditions.js';

const item = ([t, m, d, o]) => {
  const inner = `<b>${esc(t)}</b><span class="m">${esc(m)}</span><p>${esc(d)}</p>`;
  if (o?.rd != null) return `<a class="res-item" href="#/read/${o.rd}">${inner}<span class="go">Read in the app ${ic('arrowR')}</span></a>`;
  if (o?.u) return `<a class="res-item" href="${esc(o.u)}" target="_blank" rel="noopener noreferrer">${inner}<span class="go">${esc(o.s || 'Open')} ${ic('external')}</span></a>`;
  return `<div class="res-item">${inner}</div>`;
};
const cat = c => `<section class="res-cat" id="${c.id}"><div class="kicker">${esc(c.sub)}</div><h2>${esc(c.n)}</h2>${c.note ? `<p class="small muted">${esc(c.note)}</p>` : ''}${c.items.map(item).join('')}</section>`;
export async function view({ p1 }) {
  if (p1 && byId[p1]) return { html: `<div class="narrow"><a class="small" href="#/study/resources">${ic('arrowL')} All resources</a>${cat(byId[p1])}</div>`, title: byId[p1].n };
  const mine = (TRADS[S.profile.trad] || TRADS.none).res.map(id => byId[id]).filter(Boolean);
  const rest = CATS.filter(c => !mine.includes(c));
  const html = `<div class="narrow"><a class="small" href="#/study">${ic('arrowL')} Study</a><h1 style="margin-top:8px">Explore more texts</h1><p class="muted">Canon, Apocrypha, the Jewish and early Christian world, other scriptures, and literature that argues with the Bible. Items marked <i>Read in the app</i> open in the reader; the rest link out to free editions or institutions. Descriptions are brief on purpose, and dates are approximate.</p>
  ${mine.length ? `<div class="sec-h"><h2>Suggested for you</h2></div><div class="grid g2">${mine.map(c => `<a class="card" href="#/study/resources/${c.id}"><h3>${esc(c.n)}</h3><p class="muted small mb0">${esc(c.sub)}</p></a>`).join('')}</div>` : ''}
  <div class="sec-h"><h2>All collections</h2></div><div class="grid g2">${rest.map(c => `<a class="card" href="#/study/resources/${c.id}"><h3>${esc(c.n)}</h3><p class="muted small mb0">${esc(c.sub)}</p></a>`).join('')}</div></div>`;
  return { html, title: 'Resources' };
}
export const actions = {};
