import { S, save, addXP, markActive } from '../store.js';
import { ic } from '../icons.js';
import * as B from '../bible.js';
import { renderUnit, unitActions } from '../unit.js';
import { checkAch } from '../ach.js';
import { esc, $, mod, bookColor } from '../util.js';
import { md, toast } from '../ui.js';

let TR = null;
export const tracks = async () => TR || (TR = (await import('../../content/tracks.js')).default);
const lessonKey = (t, n) => `lesson:${t}:${n}`;
const done = (t, n) => !!S.units[lessonKey(t, n)]?.done;

/* ---------- hub ---------- */
export async function hubView() {
  const T = await tracks();
  let next = null;
  for (const t of T) { const n = t.lessons.findIndex((_, i) => !done(t.id, i)); if (n >= 0 && (t.lessons.some((_, i) => done(t.id, i)) || !next)) { next = { t, n }; if (t.lessons.some((_, i) => done(t.id, i))) break; } }
  const html = `<h1>Study</h1><p class="muted narrow" style="margin-left:0">Longer paths for going deeper: courses, arguments, other voices and the texts around the Bible. Each one invites you to question it, and to answer back.</p>
  ${next ? `<a class="card glow mt" style="display:block" href="#/study/track/${next.t.id}/${next.n}"><div class="kicker">${next.t.lessons.some((_, i) => done(next.t.id, i)) ? 'Continue your track' : 'Start here'}</div><h3 class="mb0" style="margin-top:4px">${esc(next.t.title)}: ${esc(next.t.lessons[next.n].t)}</h3></a>` : ''}
  <div class="grid g3 mt">
    <a class="tile" href="#/study/tracks">${ic('compass')}<h3>Study Tracks</h3><p>${T.length} multi-lesson courses, ${T.reduce((n, t) => n + t.lessons.length, 0)} lessons.</p></a>
    <a class="tile" href="#/study/seminar">${ic('spark')}<h3>Beneath the Absolute Seminar</h3><p>The book’s full argument, claim by claim, with objections.</p></a>
    <a class="tile" href="#/study/questions">${ic('flame')}<h3>Big Questions</h3><p>Each with the best case for every serious position.</p></a>
    <a class="tile" href="#/study/lab">${ic('scale')}<h3>Argument Lab</h3><p>Accept, doubt or reject each premise. Watch the conclusion respond.</p></a>
    <a class="tile" href="#/study/beliefs">${ic('map')}<h3>Belief Map</h3><p>Snapshot what you hold. Re-take it. Measure the drift.</p></a>
    <a class="tile" href="#/study/library">${ic('urn')}<h3>Library of Voices</h3><p>Apocrypha, Enoch, early Church, Quran, Gita, Buddha, Confucius, philosophers.</p></a>
    <a class="tile" href="#/study/books">${ic('books')}<h3>Book Guides</h3><p>All 66 books + Apocrypha: date, authorship, genre, and the hard question each raises.</p></a>
    <a class="tile" href="#/study/resources">${ic('globe')}<h3>Explore More Texts</h3><p>Apocrypha, canon history, Second Temple writings, the Fathers, other scriptures, literature.</p></a>
    <a class="tile" href="#/journal">${ic('journal')}<h3>Journal</h3><p>Your responses, questions, dig list, and replies to your past self.</p></a>
    <a class="tile" href="#/study/plans">${ic('calendar')}<h3>Reading Plans</h3><p>Gospels in 30 days, the Torah, Wisdom, the Hard Texts…</p></a>
  </div>`;
  return { html };
}
/* ---------- tracks ---------- */
export async function tracksView() {
  const T = (await tracks()).filter(t => t.id !== 'seminar');
  const html = `<a class="small" href="#/study">← Study</a><h1 style="margin-top:6px">Study Tracks</h1><div class="grid g2 mt">${T.map(t => trackCard(t)).join('')}</div>`;
  return { html };
}
const trackCard = t => { const d = t.lessons.filter((_, i) => done(t.id, i)).length; return `<a class="card" href="#/study/track/${t.id}"><div class="between"><span style="font-size:1.5rem;color:var(--accent)">${ic(t.icon)}</span><span class="tag ${d === t.lessons.length ? 'gold' : ''}">${d}/${t.lessons.length}</span></div><h3 style="margin-top:8px">${esc(t.title)}</h3><p class="muted small">${esc(t.desc)}</p><div class="bar thin"><i style="width:${Math.round(d / t.lessons.length * 100)}%"></i></div></a>`; };
export async function trackView({ p1, p2 }) {
  const T = await tracks(); const t = T.find(x => x.id === p1); if (!t) return { html: '<p>Track not found.</p>' };
  if (p2 !== undefined && p2 !== '') return lessonView(t, +p2);
  const intro = t.id === 'seminar' ? `<div class="callout mt"><b>About this seminar.</b> <em>Beneath the Absolute</em> (O.K. Mantz, 2024) argues from rationalist and existentialist premises toward a trinitarian “Absolute,” a particular account of sin, soul, evil and Hades, and a practice of trust. Each session below states the book’s claim as fairly as possible, then puts the strongest objections to it. <a href="https://docs.google.com/document/d/1KGguzjj5Cqf5-IV4NsbXGrDJe_r9gxM5ax1mAosU9ro/edit?usp=sharing" target="_blank" rel="noopener">Read the book →</a></div>` : '';
  const html = `<div class="narrow"><a class="small" href="#/study/${t.id === 'seminar' ? '' : 'tracks'}">← ${t.id === 'seminar' ? 'Study' : 'All tracks'}</a><div style="font-size:2rem;margin-top:8px;color:var(--accent)">${ic(t.icon)}</div><h1>${esc(t.title)}</h1><p class="muted">${esc(t.desc)}</p>${intro}
  <div class="list mt">${t.lessons.map((l, i) => `<a class="item ${done(t.id, i) ? 'done' : ''}" href="#/study/track/${t.id}/${i}"><span class="n">${done(t.id, i) ? ic('check') : i + 1}</span><div><h3>${esc(l.t)}</h3><p>${esc(l.k || '')}</p></div></a>`).join('')}</div></div>`;
  return { html };
}
async function lessonView(t, n) {
  const l = t.lessons[n]; if (!l) return { html: '<p>Lesson not found.</p>' };
  const head = `<div class="between" style="margin-bottom:12px"><a class="small" href="#/study/track/${t.id}">← ${esc(t.title)}</a><span class="tag">Lesson ${n + 1} / ${t.lessons.length}</span></div>`;
  const r = renderUnit(l, lessonKey(t.id, n), 'lesson', head);
  const nav = `<div class="between narrow mt2">${n > 0 ? `<a class="btn" href="#/study/track/${t.id}/${n - 1}">← Previous</a>` : '<span></span>'}${n < t.lessons.length - 1 ? `<a class="btn pri" href="#/study/track/${t.id}/${n + 1}">Next lesson →</a>` : `<a class="btn" href="#/study/track/${t.id}">Back to track</a>`}</div>`;
  return { html: r.html + nav, after: r.after };
}
export async function checkTrack(key) {
  const m = /^lesson:([^:]+):(\d+)$/.exec(key); if (!m) return;
  const T = await tracks(); const t = T.find(x => x.id === m[1]); if (!t) return;
  if (t.lessons.every((_, i) => done(t.id, i))) {
    const tr = (S.units['__tracks'] ||= { done: {} }); tr.done ||= {};
    if (!tr.done[t.id]) { tr.done[t.id] = Date.now(); save(); addXP(60, 'track complete: ' + t.title); checkAch(); }
  }
}
/* ---------- plans ---------- */
const range = (a, z) => { const o = []; for (let b = a; b <= z; b++) for (let c = 1; c <= B.META[b].v.length; c++) o.push([b, c]); return o; };
const chunk = (arr, n) => { const o = []; for (let i = 0; i < arr.length; i += n) o.push(arr.slice(i, i + n)); return o; };
const HARD21 = [['Genesis 22', 'A father, a knife, a son'], ['Joshua 6', 'Jericho and the ban'], ['Judges 11', 'Jephthah’s vow'], ['Judges 19', 'The darkest chapter'], ['2 Samuel 24', 'Who incited David?'], ['Job 38', 'God answers'], ['Psalm 88', 'No resolution'], ['Psalm 137', 'By the rivers of Babylon'], ['Ecclesiastes 3', 'A time for everything — and no profit'], ['Isaiah 45', 'Light and darkness, peace and calamity'], ['Isaiah 53', 'Whose suffering servant?'], ['Matthew 27', 'The cry and the curse'], ['Mark 16', 'Where the oldest text stops'], ['John 8', 'Before Abraham was'], ['Romans 9', 'Potter and clay'], ['1 Corinthians 15', 'If Christ has not been raised'], ['Galatians 3', 'No male and female?'], ['Hebrews 6', 'No second repentance?'], ['Revelation 13', 'The beast'], ['Deuteronomy 7', 'Devote them to destruction'], ['Deuteronomy 32', 'The sons of God']];
export const PLANS = () => [
  { id: 'hard', n: 'The Hard Texts — 21 days', d: 'The chapters most readers skip, soften or never hear sermons on.', days: HARD21.map(([r, w]) => ({ ch: [B.parseRef(r)].map(p => [p.b, p.c]), w })) },
  { id: 'gospels', n: 'The Four Gospels — 30 days', d: 'All 89 chapters of Matthew, Mark, Luke and John, read as four different portraits.', days: chunk(range(39, 42), 3).map(ch => ({ ch })) },
  { id: 'torah', n: 'The Torah — 47 days', d: 'Genesis to Deuteronomy: creation, covenant, law, and the stories behind them.', days: chunk(range(0, 4), 4).map(ch => ({ ch })) },
  { id: 'wisdom', n: 'Wisdom & Complaint — 59 days', d: 'Job, Psalms, Proverbs, Ecclesiastes — Scripture arguing with itself.', days: chunk([...range(17, 17), ...range(18, 18), ...range(19, 19), ...range(20, 20)], 4).map(ch => ({ ch })) },
  { id: 'prophets', n: 'The Prophets — 55 days', d: 'Isaiah to Malachi: lawsuit, lament, fury, and promise.', days: chunk(range(22, 38), 5).map(ch => ({ ch })) },
  { id: 'nt', n: 'New Testament — 90 days', d: 'Every chapter, three a day.', days: chunk(range(39, 65), 3).map(ch => ({ ch })) },
  { id: 'apoc', n: 'Between the Testaments — 28 days', d: 'The Apocrypha (KJV): Wisdom, Sirach, Maccabees, Tobit, Judith, 2 Esdras…', days: chunk(range2(66, 79), 6).map(ch => ({ ch })) }
];
function range2(a, z) { const o = []; for (let b = a; b <= z; b++) for (let c = 1; c <= B.META[b].v.length; c++) o.push([b, c]); return o; }
const planPct = p => { const all = p.days.flatMap(d => d.ch); const r = all.filter(([b, c]) => S.read[`${b}.${c}`]).length; return { r, n: all.length }; };
export function checkPlans() {
  PLANS().forEach(p => { const { r, n } = planPct(p); if (r === n && !(S.plans[p.id]?.done)) { S.plans[p.id] = { done: Date.now() }; save(); addXP(100, 'plan complete'); checkAch(); } });
}
export async function plansView({ p1 }) {
  const P = PLANS();
  if (p1) {
    const p = P.find(x => x.id === p1); if (!p) return { html: '<p>Plan not found.</p>' };
    const firstUnread = p.days.findIndex(d => d.ch.some(([b, c]) => !S.read[`${b}.${c}`]));
    const html = `<div class="narrow"><a class="small" href="#/study/plans">← Plans</a><h1 style="margin-top:6px">${esc(p.n)}</h1><p class="muted">${esc(p.d)}</p><div class="list mt">${p.days.map((d, i) => { const dn = d.ch.every(([b, c]) => S.read[`${b}.${c}`]); return `<div class="item ${dn ? 'done' : ''}" ${i === firstUnread ? 'style="border-color:var(--accent)"' : ''}><span class="n">${dn ? ic('check') : i + 1}</span><div style="flex:1"><h3>Day ${i + 1}${d.w ? ' — ' + esc(d.w) : ''}</h3><p>${d.ch.map(([b, c]) => `<a href="#/read/${b}/${c}">${esc(B.label(b, c))}</a>`).join(' · ')}</p></div></div>`; }).join('')}</div></div>`;
    return { html };
  }
  const html = `<a class="small" href="#/study">← Study</a><h1 style="margin-top:6px">Reading Plans</h1><p class="muted">Progress is tracked from the chapters you mark as read — read them in any order.</p><div class="grid g2 mt">${P.map(p => { const { r, n } = planPct(p); return `<a class="card" href="#/study/plans/${p.id}"><h3>${esc(p.n)}</h3><p class="muted small">${esc(p.d)}</p><div class="bar thin"><i style="width:${Math.round(r / n * 100)}%"></i></div><p class="tiny faint mb0 mt">${r} / ${n} chapters</p></a>`; }).join('')}</div>`;
  return { html };
}
/* ---------- book guides ---------- */
export async function booksView() {
  const BOOKS = (await import('../../content/books.js')).default;
  const html = `<a class="small" href="#/study">← Study</a><h1 style="margin-top:6px">Book Guides</h1><p class="muted">One paragraph of orientation and one hard question for every book. Open a book in the Reader for the full guide.</p>
  <div class="grid g2 mt">${B.META.map(m => { const g = BOOKS[m.i]; return `<a class="card" style="border-left:4px solid ${bookColor(m.i)}" href="#/read/${m.i}"><h3 class="mb0">${esc(m.n)}</h3><p class="tiny faint">${esc(g ? g[2] : '')}</p><p class="small muted mb0">${g ? md(g[4]) : ''}</p></a>`; }).join('')}</div>`;
  return { html };
}
export const actions = {};
