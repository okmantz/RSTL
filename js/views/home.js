import { S, levelInfo, streak } from '../store.js';
import * as B from '../bible.js';
import { drawArcs } from '../arcs.js';
import { ctx } from '../ctx.js';
import { esc, todayISO, addDays, parseISO, $ } from '../util.js';
import { checkinCard, checkinActions } from '../checkin.js';
import { ACH } from '../ach.js';
import { ic } from '../icons.js';
import { tile } from '../ui.js';
import * as C from '../curriculum.js';
import { TRADS } from '../../content/traditions.js';
import { dueProps } from './mind.js';
import { challengesFor, LENS } from '../../content/challenges.js';
import { dayNumber } from '../util.js';

const greet = () => { const h = new Date().getHours(); return h < 5 ? 'Still up' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };
export const actions = { ...checkinActions };
export async function view() {
  const li = levelInfo(), st = streak(), iso = todayISO();
  const { idx } = C.indexFor(iso), u = C.unitAt(idx), done = S.units['daily:' + iso]?.done;
  const trad = TRADS[S.profile.trad] || TRADS.none;
  const due = dueProps(), chs = challengesFor(S.profile.trad || 'none'), chal = chs[((dayNumber(iso) % chs.length) + chs.length) % chs.length];
  const last = S.last, lastHref = last ? `#/read/${last.b}/${last.c}` : '#/read/0/1', lastLbl = last ? B.label(last.b, last.c) : 'Genesis 1';
  const recent = Object.entries(S.ach).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([id]) => ACH.find(a => a.id === id)).filter(Boolean);
  const openQ = S.myq.filter(q => (q.st || 'open') !== 'done').length;
  const dig = Object.values(S.react).filter(r => r.v === 'dig' || r.v === 'unset' || r.v === 'disg').length;
  const finished = Object.entries(S.units).filter(([k, x]) => k.startsWith('daily:') && x.done).length;
  const days7 = Array.from({ length: 7 }, (_, i) => { const d = addDays(iso, i - 6); return { d, on: !!S.days[d]?.a, now: d === iso, l: parseISO(d).toLocaleDateString(undefined, { weekday: 'short' }) }; });
  const activeWeek = days7.filter(x => x.on).length;
  const html = `
  <section class="hero">
    <div class="kicker">${esc(greet())}${S.profile.name ? ', ' + esc(S.profile.name) : ''}</div>
    <h1 class="hello">Read closely. Ask freely. Answer back.</h1>
    <p>Scripture and the texts around it, wired together by cross-references, with a different study every day and room to push on all of it.</p>
    <div class="row" style="margin-bottom:6px"><a class="btn pri lg" href="#/daily">${done ? 'Review today’s study' : 'Begin today’s study'} ${ic('arrowR')}</a><a class="btn lg" href="${lastHref}">${ic('book')} Continue: ${esc(lastLbl)}</a></div>
    <canvas id="hero-arcs" aria-label="Arcs of cross-references between every chapter of the Bible. Tap to open the reader."></canvas>
  </section>
  <div class="grid g2 mt">
    <div class="card glow today"><div class="between"><div class="kicker">Today · ${esc(u.k.split(' · ')[0])}</div>${done ? `<span class="tag gold">${ic('check')} Done</span>` : `<span class="tag">${u.deep ? 'Deep dive' : u.close ? 'Close reading' : 'Guided reading'}</span>`}</div><h2>${esc(u.t)}</h2><p class="muted mb0">${esc((u.tag || '').split('. ')[0])}.</p><div class="row"><a class="btn ${done ? '' : 'pri'} sm" href="#/daily">${done ? 'Revisit' : 'Open study'}</a><a class="btn sm ghost" href="#/daily/journey">Your journey</a></div></div>
    ${checkinCard()}
  </div>
  <div class="sec-h"><h2>Your progress</h2><a href="#/profile">Profile ${ic('arrowR')}</a></div>
  <div class="card">
    <div class="level"><div class="lv" aria-hidden="true">${li.level}</div><div class="lb"><div class="between"><b>${esc(li.title)}</b><span class="small muted">${li.toNext} XP to level ${li.level + 1}</span></div><div class="bar mt" style="margin-top:8px"><i style="width:${li.pct}%"></i></div></div></div>
    <div class="week" role="img" aria-label="${activeWeek} of the last 7 days active">${days7.map(x => `<div class="d ${x.on ? 'on' : ''} ${x.now ? 'now' : ''}"><i>${x.on ? ic('check') : ''}</i>${esc(x.l)}</div>`).join('')}</div>
  </div>
  <div class="grid g4 mt">
    <div class="stat"><b>${ic('flame')} ${st}</b><span>day streak</span></div>
    <div class="stat"><b>${finished}</b><span>of ${C.length()} studies finished</span></div>
    <div class="stat"><b>${Object.keys(S.read).length}</b><span>chapters read</span></div>
    <div class="stat"><b>${S.xp}</b><span>total XP</span></div>
  </div>
  ${(openQ || dig) ? `<a class="card mt link-card" href="#/journal?t=${openQ ? 'q' : 'dig'}"><span class="tile-ic">${ic('journal')}</span><div class="lc-b"><div class="kicker">Left open</div><b>${openQ ? `${openQ} of your own question${openQ > 1 ? 's' : ''} still open` : ''}${openQ && dig ? ' · ' : ''}${dig ? `${dig} section${dig > 1 ? 's' : ''} marked to dig into` : ''}</b></div><span class="tile-go">${ic('chevron')}</span></a>` : ''}
  ${due.length ? `<a class="card mt link-card glow" href="#/mind/${due[0].id}/review"><span class="tile-ic">${ic('bell')}</span><div class="lc-b"><div class="kicker">Revisit a conclusion</div><b>Do you still believe: “${esc(due[0].t)}”?</b></div><span class="tile-go">${ic('chevron')}</span></a>` : ''}
  <a class="card mt link-card" href="#/challenge"><span class="tile-ic">${ic('target')}</span><div class="lc-b"><div class="kicker">Challenge of the day${S.profile.trad && S.profile.trad !== 'none' ? ' · for ' + esc(LENS[S.profile.trad] || '') : ''}</div><b>${esc(chal.title)}</b><p class="small muted mb0">${esc(chal.claim)}</p></div><span class="tile-go">${ic('chevron')}</span></a>
  <div class="sec-h"><h2>Explore</h2><a href="#/study">All ${ic('arrowR')}</a></div>
  <div class="grid g-wide">
    ${tile('#/debate', 'debate', 'Debate engine', 'Every serious position at its strongest. Then try to break it.')}
    ${tile('#/timeline', 'timeline', 'Timeline and 3D places', 'Mesopotamia to the councils, with ten places you can walk around.', 'blue')}
    ${tile('#/texts', 'scroll', 'Ancient texts', 'Enoch to the Quran: what each text is and how sure we are.', 'violet')}
    ${tile('#/mind', 'mind', 'My Thinking', 'Evidence profiles for your beliefs, and periodic review.', 'good')}
  </div>
  <p class="small muted mt">${esc(trad.hello)}</p>
  ${recent.length ? `<div class="sec-h"><h2>Recent achievements</h2><a href="#/profile">All ${ic('arrowR')}</a></div><div class="grid g2">${recent.map(a => `<div class="ach"><div class="ai">${ic(a.i)}</div><div><h4>${esc(a.n)}</h4><p>${esc(a.d)}</p></div></div>`).join('')}</div>` : ''}`;
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
