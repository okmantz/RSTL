import { S, levelInfo, streak } from '../store.js';
import * as B from '../bible.js';
import { drawArcs } from '../arcs.js';
import { ctx } from '../ctx.js';
import { esc, todayISO, $ } from '../util.js';
import { checkinCard, checkinActions } from '../checkin.js';
import { ACH } from '../ach.js';
import { ic } from '../icons.js';
import * as C from '../curriculum.js';
import { TRADS } from '../../content/traditions.js';

const greet = () => { const h = new Date().getHours(); return h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };
export const actions = { ...checkinActions };
export async function view() {
  const li = levelInfo(), st = streak(), iso = todayISO();
  const { idx } = C.indexFor(iso), u = C.unitAt(idx), done = S.units['daily:' + iso]?.done;
  const trad = TRADS[S.profile.trad] || TRADS.none;
  const last = S.last, lastHref = last ? `#/read/${last.b}/${last.c}` : '#/read/0/1', lastLbl = last ? B.label(last.b, last.c) : 'Genesis 1';
  const recent = Object.entries(S.ach).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([id]) => ACH.find(a => a.id === id)).filter(Boolean);
  const openQ = S.myq.filter(q => (q.st || 'open') !== 'done').length;
  const dig = Object.values(S.react).filter(r => r.v === 'dig' || r.v === 'unset' || r.v === 'disg').length;
  const finished = Object.entries(S.units).filter(([k, x]) => k.startsWith('daily:') && x.done).length;
  const tile = (href, icon, t, p) => `<a class="tile" href="${href}">${ic(icon)}<h3>${t}</h3><p>${p}</p></a>`;
  const html = `
  <section class="hero">
    <div class="kicker">${esc(greet())}${S.profile.name ? ', ' + esc(S.profile.name) : ''}</div>
    <h1 class="hello">Read closely. Ask freely. Answer back.</h1>
    <p>Scripture and the texts around it, wired together by cross-references, with a different study every day and room to push on all of it.</p>
    <div class="row" style="margin-bottom:6px"><a class="btn pri" href="#/daily">${done ? 'Review today’s study' : 'Begin today’s study'}</a><a class="btn" href="${lastHref}">Continue: ${esc(lastLbl)}</a></div>
    <canvas id="hero-arcs" aria-label="Arcs of cross-references between every chapter of the Bible"></canvas>
  </section>
  <div class="grid g2 mt">
    <div class="card glow"><div class="between"><div class="kicker">Today · ${esc(u.k.split(' · ')[0])}</div>${done ? `<span class="tag gold">${ic('check')} Done</span>` : ''}</div><h2 style="margin-top:6px">${esc(u.t)}</h2><p class="muted">${esc(u.deep ? 'Deep dive. ' : 'Guided reading. ') + (u.tag || '').split('. ')[0]}.</p><div class="row"><a class="btn ${done ? '' : 'pri'} sm" href="#/daily">${done ? 'Revisit' : 'Open study'}</a><a class="btn sm ghost" href="#/daily/journey">Your journey</a></div></div>
    ${checkinCard()}
  </div>
  <div class="grid g4 mt">
    <div class="stat"><b>${ic('flame')} ${st}</b><span>day streak</span></div>
    <div class="stat"><b>${finished}</b><span>of ${C.length()} studies finished</span></div>
    <div class="stat"><b>${Object.keys(S.read).length}</b><span>chapters read</span></div>
    <div class="stat"><b>${S.xp}</b><span>XP · level ${li.level}</span></div>
  </div>
  <div class="card mt"><div class="between"><b>${esc(li.title)}</b><span class="small muted">${li.toNext} XP to level ${li.level + 1}</span></div><div class="bar mt"><i style="width:${li.pct}%"></i></div></div>
  ${(openQ || dig) ? `<a class="card mt" style="display:block" href="#/journal?t=${openQ ? 'q' : 'dig'}"><div class="kicker">Left open</div><p class="mb0">${openQ ? `${openQ} of your own question${openQ > 1 ? 's' : ''} still open` : ''}${openQ && dig ? ' · ' : ''}${dig ? `${dig} section${dig > 1 ? 's' : ''} marked to dig into` : ''}. <span class="faint">Open the journal ${ic('arrowR')}</span></p></a>` : ''}
  <div class="sec-h"><h2>Where to dig</h2></div>
  <div class="grid g3">
    ${tile('#/study/tracks', 'compass', 'Study Tracks', 'Multi-lesson courses: canon, God on trial, the Trinity, Jesus, faith, ethics and more.')}
    ${tile('#/study/resources', 'globe', 'Explore More Texts', 'Apocrypha, canon history, the Fathers, other scriptures, literature.')}
    ${tile('#/study/lab', 'scale', 'Argument Lab', 'Test the great arguments premise by premise. See where you break.')}
    ${tile('#/study/questions', 'flame', 'Big Questions', 'Positions, pressure points and the passages that will not cooperate.')}
    ${tile('#/study/beliefs', 'map', 'Belief Map', 'Chart what you hold. Return in a month and see what moved.')}
    ${tile('#/journal', 'journal', 'Journal', 'Everything you have written and asked, and replies to your past self.')}
  </div>
  <p class="small muted mt">${esc(trad.hello)}</p>
  ${recent.length ? `<div class="sec-h"><h2>Recent achievements</h2><a href="#/profile">All →</a></div><div class="grid g2">${recent.map(a => `<div class="ach"><div class="ai">${ic(a.i)}</div><div><h4>${esc(a.n)}</h4><p>${esc(a.d)}</p></div></div>`).join('')}</div>` : ''}`;
  const after = async () => {
    const c = $('#hero-arcs'); if (!c) return;
    try {
      const pairs = (await (await fetch('data/arcs_top.json')).json()).map(([a, b, w]) => ({ a, b, w }));
      const draw = () => drawArcs(c, { pairs, flat: 0.62 }); draw(); ctx.resize.push(draw);
    } catch (e) { }
    c.addEventListener('click', () => { location.hash = '#/read'; });
  };
  return { html, after };
}
