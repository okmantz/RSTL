import { S, levelInfo, streak, dayRec } from '../store.js';
import * as B from '../bible.js';
import { drawArcs } from '../arcs.js';
import { ctx } from '../ctx.js';
import { esc, todayISO, dayNumber, mod, $ } from '../util.js';
import { checkinCard, checkinActions } from '../checkin.js';
import { ACH } from '../ach.js';
import daily from '../../content/daily.js';
import { icon } from '../ui.js';

const greet = () => { const h = new Date().getHours(); return h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };
export const actions = { ...checkinActions };
export async function view() {
  const li = levelInfo(), st = streak(), iso = todayISO();
  const u = daily[mod(dayNumber(iso), daily.length)], done = S.units['daily:' + iso]?.done;
  const last = S.last;
  const lastHref = last ? `#/read/${last.b}/${last.c}` : '#/read/0/1';
  const lastLbl = last ? B.label(last.b, last.c) : 'Genesis 1';
  const recent = Object.entries(S.ach).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([id]) => ACH.find(a => a.id === id)).filter(Boolean);
  const html = `
  <section class="hero">
    <div class="kicker">${esc(greet())}${S.profile.name ? ', ' + esc(S.profile.name) : ''}</div>
    <h1 class="hello">Go deeper than the comfortable reading.</h1>
    <p>A Bible reader where every verse is wired to the rest of Scripture — and a daily study that doesn’t flinch.</p>
    <div class="row" style="margin-bottom:6px"><a class="btn pri" href="#/daily">${done ? 'Review today’s study' : 'Begin today’s study'}</a><a class="btn" href="${lastHref}">Continue: ${esc(lastLbl)}</a></div>
    <canvas id="hero-arcs" aria-label="Rainbow of cross-references between every chapter of the Bible"></canvas>
  </section>
  <div class="grid g2 mt">
    <div class="card glow"><div class="between"><div class="kicker">Today’s descent</div>${done ? '<span class="tag gold">Done ✓</span>' : ''}</div><h2 style="margin-top:6px">${esc(u.t)}</h2><p class="muted">${esc(u.k)}</p><a class="btn ${done ? '' : 'pri'} sm" href="#/daily">${done ? 'Revisit' : 'Open study'}</a></div>
    ${checkinCard()}
  </div>
  <div class="grid g4 mt">
    <div class="stat"><b>🔥 ${st}</b><span>day streak</span></div>
    <div class="stat"><b>${S.xp}</b><span>XP · level ${li.level}</span></div>
    <div class="stat"><b>${Object.keys(S.read).length}</b><span>chapters read</span></div>
    <div class="stat"><b>${Object.values(S.units).filter(x => x.done).length}</b><span>studies finished</span></div>
  </div>
  <div class="card mt"><div class="between"><b>${esc(li.title)}</b><span class="small muted">${li.toNext} XP to level ${li.level + 1}</span></div><div class="bar mt"><i style="width:${li.pct}%"></i></div></div>
  <div class="sec-h"><h2>Where to dig</h2></div>
  <div class="grid g3">
    <a class="tile" href="#/study/tracks"><div class="ic">🧭</div><h3>Study Tracks</h3><p>Multi-lesson courses: canon, divine violence, the Trinity, the risen Christ, hell, other scriptures…</p></a>
    <a class="tile" href="#/study/seminar"><div class="ic">🌌</div><h3>Beneath the Absolute Seminar</h3><p>Walk through the book’s whole argument — and cross-examine it.</p></a>
    <a class="tile" href="#/study/lab"><div class="ic">⚖️</div><h3>Argument Lab</h3><p>Test the great arguments premise by premise. See where you break.</p></a>
    <a class="tile" href="#/study/questions"><div class="ic">🔥</div><h3>Big Questions</h3><p>Positions, pressure points and the passages that won’t cooperate.</p></a>
    <a class="tile" href="#/study/beliefs"><div class="ic">🗺️</div><h3>Belief Map</h3><p>Chart what you hold. Come back in a month and watch it move.</p></a>
    <a class="tile" href="#/study/library"><div class="ic">🏺</div><h3>Library of Voices</h3><p>Apocrypha, Enoch, Quran, Gita, Dhammapada, Analects, early Church…</p></a>
  </div>
  ${recent.length ? `<div class="sec-h"><h2>Recent achievements</h2><a href="#/profile">All →</a></div><div class="grid g2">${recent.map(a => `<div class="ach"><div class="ai">${a.i}</div><div><h4>${esc(a.n)}</h4><p>${esc(a.d)}</p></div></div>`).join('')}</div>` : ''}`;
  const after = async () => {
    const c = $('#hero-arcs'); if (!c) return;
    try {
      const pairs = (await (await fetch('data/arcs_top.json')).json()).map(([a, b, w]) => ({ a, b, w }));
      const draw = () => drawArcs(c, { pairs, flat: 0.62 });
      draw(); ctx.resize.push(draw);
    } catch (e) { }
    c.addEventListener('click', () => { location.hash = '#/read'; });
  };
  return { html, after };
}
