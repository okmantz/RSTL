import { S, save, addXP, markActive } from '../store.js';
import { ic } from '../icons.js';
import * as B from '../bible.js';
import { renderUnit, unitActions } from '../unit.js';
import { checkAch } from '../ach.js';
import { esc, $, mod, bookColor } from '../util.js';
import { md, plain, toast, tile, pageHead } from '../ui.js';

let TR = null;
export const tracks = async () => TR || (TR = (await import('../../content/tracks.js')).default);
const lessonKey = (t, n) => `lesson:${t}:${n}`;
const done = (t, n) => !!S.units[lessonKey(t, n)]?.done;

/* ---------- hub ---------- */
export async function hubView() {
  const T = await tracks();
  let next = null;
  for (const t of T) { const n = t.lessons.findIndex((_, i) => !done(t.id, i)); if (n >= 0 && (t.lessons.some((_, i) => done(t.id, i)) || !next)) { next = { t, n }; if (t.lessons.some((_, i) => done(t.id, i))) break; } }
  const nT = T.reduce((n, t) => n + t.lessons.length, 0);
  const dueN = S.mind.props.filter(p => Date.now() >= (p.rev?.length ? p.rev[p.rev.length - 1].ts : p.created) + (p.cad || S.mind.cad || 30) * 864e5).length;
  const big = (href, icn, t, x, extra = '') => `<a class="card feat" href="${href}"><span class="tile-ic">${ic(icn)}</span><h3>${t}</h3><p>${x}</p>${extra}</a>`;
  const html = `${pageHead({ kicker: 'Explore', title: 'Go deeper', sub: 'Four ways in. Pick whichever question is on your mind.' })}
  <div class="grid g2 feats">
    ${big('#/debate', 'debate', 'Debate engine', 'Is salvation by faith alone? Did the Exodus happen? Every serious position at its strongest, then try to break it.')}
    ${big('#/timeline', 'timeline', 'Timeline and 3D places', 'Mesopotamia to the councils. Walk through ten places: Ur, Babylon, the tabernacle, both temples, Qumran, a city gate, Bethesda, a tomb and Ephesus.')}
    ${big('#/texts', 'scroll', 'Ancient texts', 'Enoch, Gilgamesh, the Mishnah, the Fathers, the Gita, the Quran: what each is, and how sure we are.')}
    ${big('#/mind', 'mind', 'My Thinking', 'Build an evidence profile for what you believe, and let the app ask later whether you still do.', dueN ? `<span class="tag gold">${ic('bell')} ${dueN} review${dueN > 1 ? 's' : ''} due</span>` : '')}
  </div>
  <a class="card glow link-card mt" href="#/challenge"><span class="tile-ic">${ic('target')}</span><div class="lc-b"><div class="kicker">Challenge me</div><b>The hardest questions for your own tradition, and for everyone else’s</b></div><span class="tile-go">${ic('chevron')}</span></a>
  ${next ? `<a class="card link-card mt" href="#/study/track/${next.t.id}/${next.n}"><span class="tile-ic">${ic(next.t.icon || 'compass')}</span><div class="lc-b"><div class="kicker">${next.t.lessons.some((_, i) => done(next.t.id, i)) ? 'Continue your track' : 'Guided course'}</div><b>${esc(next.t.title)}: ${esc(next.t.lessons[next.n].t)}</b></div><span class="tile-go">${ic('chevron')}</span></a>` : ''}
  <div class="sec-h"><h2>Courses and reference</h2></div>
  <div class="grid g-wide">
    ${tile('#/study/tracks', 'compass', 'Study Tracks', `${T.length} courses, ${nT} lessons.`)}
    ${tile('#/study/seminar', 'spark', 'Beneath the Absolute Seminar', 'The book’s argument, claim by claim, with objections.')}
    ${tile('#/study/plans', 'calendar', 'Reading Plans', 'Gospels in 30 days, the Torah, the Hard Texts…')}
    ${tile('#/study/books', 'books', 'Book Guides', 'All 66 books and the Apocrypha, with the hard question each raises.')}
  </div>
  <div class="sec-h"><h2>Sharpen your thinking</h2></div>
  <div class="grid g-wide">
    ${tile('#/study/lab', 'scale', 'Argument Lab', 'Accept, doubt or reject each premise of a famous argument.', 'violet')}
    ${tile('#/study/questions', 'flame', 'Big Questions', 'The best case for every serious position.', 'bad')}
    ${tile('#/study/beliefs', 'map', 'Belief Map', 'Snapshot what you hold and measure the drift.', 'good')}
    ${tile('#/study/library', 'urn', 'Library of Voices', 'Excerpts: Apocrypha, Fathers, Quran, Gita, philosophers.', 'blue')}
    ${tile('#/study/resources', 'globe', 'More Texts and Resources', 'Canon history, translations, further reading.', 'blue')}
    ${tile('#/journal', 'journal', 'Journal', 'Everything you have written and asked.')}
  </div>`;
  return { html, title: 'Explore' };
}
/* ---------- tracks ---------- */
export async function tracksView() {
  const T = (await tracks()).filter(t => t.id !== 'seminar');
  const html = `${pageHead({ back: 'Explore', backTo: '#/study', kicker: 'Courses', title: 'Study Tracks', sub: 'Multi-lesson courses. Each lesson takes about fifteen minutes and ends with questions to answer in your own words.' })}<div class="grid g2">${T.map(t => trackCard(t)).join('')}</div>`;
  return { html };
}
const trackCard = t => { const d = t.lessons.filter((_, i) => done(t.id, i)).length; return `<a class="card" href="#/study/track/${t.id}"><div class="between"><span class="tile-ic">${ic(t.icon)}</span><span class="tag ${d === t.lessons.length ? 'gold' : ''}">${d === t.lessons.length ? ic('check') + ' ' : ''}${d}/${t.lessons.length}</span></div><h3 style="margin-top:14px">${esc(t.title)}</h3><p class="muted small">${esc(t.desc)}</p><div class="bar thin"><i style="width:${Math.round(d / t.lessons.length * 100)}%"></i></div></a>`; };
export async function trackView({ p1, p2 }) {
  const T = await tracks(); const t = T.find(x => x.id === p1); if (!t) return { html: '<p>Track not found.</p>' };
  if (p2 !== undefined && p2 !== '') return lessonView(t, +p2);
  const intro = t.id === 'seminar' ? `<div class="callout mt"><b>About this seminar.</b> <em>Beneath the Absolute</em> (O.K. Mantz, 2024) argues from rationalist and existentialist premises toward a trinitarian “Absolute,” a particular account of sin, soul, evil and Hades, and a practice of trust. Each session below states the book’s claim as fairly as possible, then puts the strongest objections to it. <a href="https://docs.google.com/document/d/1KGguzjj5Cqf5-IV4NsbXGrDJe_r9gxM5ax1mAosU9ro/edit?usp=sharing" target="_blank" rel="noopener">Read the book →</a></div>` : '';
  const html = `<div class="narrow"><a class="back" href="#/study/${t.id === 'seminar' ? '' : 'tracks'}">${t.id === 'seminar' ? 'Study' : 'All tracks'}</a><div class="tile-ic" style="margin:6px 0 16px;width:52px;height:52px">${ic(t.icon)}</div><h1>${esc(t.title)}</h1><p class="muted">${esc(t.desc)}</p>${intro}
  <div class="list mt">${t.lessons.map((l, i) => `<a class="item ${done(t.id, i) ? 'done' : ''}" href="#/study/track/${t.id}/${i}"><span class="n">${done(t.id, i) ? ic('check') : i + 1}</span><div><h3>${esc(l.t)}</h3><p>${esc(l.k || '')}</p></div></a>`).join('')}</div></div>`;
  return { html };
}
async function lessonView(t, n) {
  const l = t.lessons[n]; if (!l) return { html: '<p>Lesson not found.</p>' };
  const head = `<div class="between" style="margin-bottom:12px"><a class="back" href="#/study/track/${t.id}">${esc(t.title)}</a><span class="tag">Lesson ${n + 1} / ${t.lessons.length}</span></div>`;
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
    const html = `<div class="narrow"><a class="back" href="#/study/plans">Plans</a><h1 style="margin-top:6px">${esc(p.n)}</h1><p class="muted">${esc(p.d)}</p><div class="list mt">${p.days.map((d, i) => { const dn = d.ch.every(([b, c]) => S.read[`${b}.${c}`]); return `<div class="item ${dn ? 'done' : ''}" ${i === firstUnread ? 'style="border-color:var(--accent)"' : ''}><span class="n">${dn ? ic('check') : i + 1}</span><div style="flex:1"><h3>Day ${i + 1}${d.w ? ' — ' + esc(d.w) : ''}</h3><p>${d.ch.map(([b, c]) => `<a href="#/read/${b}/${c}">${esc(B.label(b, c))}</a>`).join(' · ')}</p></div></div>`; }).join('')}</div></div>`;
    return { html };
  }
  const html = `<a class="back" href="#/study">Study</a><h1 style="margin-top:6px">Reading Plans</h1><p class="muted">Progress is tracked from the chapters you mark as read — read them in any order.</p><div class="grid g2 mt">${P.map(p => { const { r, n } = planPct(p); return `<a class="card" href="#/study/plans/${p.id}"><h3>${esc(p.n)}</h3><p class="muted small">${esc(p.d)}</p><div class="bar thin"><i style="width:${Math.round(r / n * 100)}%"></i></div><p class="tiny faint mb0 mt">${r} / ${n} chapters</p></a>`; }).join('')}</div>`;
  return { html };
}
/* ---------- book guides ---------- */
const GROUPS = [['all', 'All'], ['ot', 'Old'], ['nt', 'New'], ['ap', 'Apocrypha']];
const SECTIONS = [['Torah', 0, 4], ['Historical books', 5, 16], ['Wisdom and poetry', 17, 21], ['Prophets', 22, 38], ['Gospels and Acts', 39, 43], ['Letters of Paul', 44, 56], ['General letters and Revelation', 57, 65], ['Apocrypha / Deuterocanon', 66, 79]];
const hasHard = g => g && g[4];
export async function booksView() {
  const BOOKS = (await import('../../content/books.js')).default;
  const card = m => { const g = BOOKS[m.i]; const read = Object.keys(S.read).filter(k => k.startsWith(m.i + '.')).length;
    return `<article class="bg-card" data-n="${esc(m.n.toLowerCase())}" data-g="${m.i < 39 ? 'ot' : m.i < 66 ? 'nt' : 'ap'}" style="--c:${bookColor(m.i)}">
      <a class="bg-main" href="#/read/${m.i}"><div class="bg-top"><h3>${esc(m.n)}</h3><span class="tag">${esc(g ? g[2] : '')}</span></div>
      <p class="bg-q"><span class="kicker">The hard question</span>${g ? plain(g[4]) : ''}</p>
      <div class="bg-foot"><span>${m.v.length} ${m.v.length === 1 ? 'chapter' : 'chapters'}</span>${read ? `<span class="faint">${read} read</span>` : ''}</div></a></article>`; };
  const sec = ([t, a, z]) => `<section class="bg-sec" data-sec><h2>${esc(t)}</h2><div class="bg-grid">${B.META.slice(a, z + 1).map(card).join('')}</div></section>`;
  const html = `<div class="bg-page"><a class="back" href="#/study">Study</a><h1 style="margin-top:6px">Book Guides</h1><p class="muted narrow-p">Every book, with its genre and the hard question it raises. Open a book to read its full guide, with date, authorship and orientation.</p>
  <div class="bg-tools"><input type="search" id="bg-q" placeholder="Find a book…" aria-label="Find a book"><div class="seg" role="tablist" aria-label="Filter">${GROUPS.map(([id, n], i) => `<button role="tab" class="${i === 0 ? 'on' : ''}" data-act="bgf" data-g="${id}">${n}</button>`).join('')}</div></div>
  ${SECTIONS.map(sec).join('')}<p class="muted center" id="bg-none" hidden>No book matches.</p></div>`;
  const after = () => {
    let g = 'all';
    const run = () => { const q = $('#bg-q').value.trim().toLowerCase(); let any = false;
      document.querySelectorAll('.bg-card').forEach(c => { const ok = (g === 'all' || c.dataset.g === g) && (!q || c.dataset.n.includes(q)); c.hidden = !ok; if (ok) any = true; });
      document.querySelectorAll('[data-sec]').forEach(s => { s.hidden = !s.querySelector('.bg-card:not([hidden])'); });
      $('#bg-none').hidden = any; };
    $('#bg-q').addEventListener('input', run);
    document.querySelectorAll('[data-act=bgf]').forEach(b => b.addEventListener('click', () => { g = b.dataset.g; document.querySelectorAll('[data-act=bgf]').forEach(x => x.classList.toggle('on', x === b)); run(); }));
  };
  return { html, after };
}
export const actions = {};
