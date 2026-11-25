import { S, hook, levelInfo, streak } from './store.js';
import * as B from './bible.js';
import { ctx } from './ctx.js';
import { toast, icon, applyPrefs, loading } from './ui.js';
import { checkAch } from './ach.js';
import { unitActions } from './unit.js';
import { $, $$, esc, debounce } from './util.js';

hook(toast, checkAch);
applyPrefs(S);

const V = {
  home: () => import('./views/home.js'), daily: () => import('./views/daily.js'), read: () => import('./views/read.js'),
  study: () => import('./views/study.js'), questions: () => import('./views/questions.js'), lab: () => import('./views/lab.js'),
  beliefs: () => import('./views/beliefs.js'), library: () => import('./views/library.js'), profile: () => import('./views/profile.js'), search: () => import('./views/search.js')
};
const ROUTES = [
  [/^\/?$/, 'home', m => m.view, 'home'],
  [/^\/daily(?:\/(\d{4}-\d{2}-\d{2}))?\/?$/, 'daily', m => m.view, 'daily'],
  [/^\/read\/?$/, 'read', m => m.libView, 'read'],
  [/^\/read\/(\d+)\/?$/, 'read', m => m.bookView, 'read'],
  [/^\/read\/(\d+)\/(\d+)\/?$/, 'read', m => m.view, 'read'],
  [/^\/search\/?$/, 'search', m => m.view, 'read'],
  [/^\/study\/?$/, 'study', m => m.hubView, 'study'],
  [/^\/study\/tracks\/?$/, 'study', m => m.tracksView, 'study'],
  [/^\/study\/seminar\/?$/, 'study', m => (c) => m.trackView({ ...c, p1: 'seminar' }), 'study'],
  [/^\/study\/seminar\/(\d+)\/?$/, 'study', m => (c) => m.trackView({ ...c, p1: 'seminar', p2: c.p1 }), 'study'],
  [/^\/study\/track\/([\w-]+)(?:\/(\d+))?\/?$/, 'study', m => m.trackView, 'study'],
  [/^\/study\/plans(?:\/([\w-]+))?\/?$/, 'study', m => m.plansView, 'study'],
  [/^\/study\/books\/?$/, 'study', m => m.booksView, 'study'],
  [/^\/study\/questions\/?$/, 'questions', m => m.view, 'study'],
  [/^\/study\/question\/([\w-]+)\/?$/, 'questions', m => m.view, 'study'],
  [/^\/study\/lab\/?$/, 'lab', m => m.view, 'study'],
  [/^\/study\/lab\/([\w-]+)\/?$/, 'lab', m => m.view, 'study'],
  [/^\/study\/beliefs\/?$/, 'beliefs', m => m.view, 'study'],
  [/^\/study\/beliefs\/statement\/?$/, 'beliefs', m => m.statementView, 'study'],
  [/^\/study\/library\/?$/, 'library', m => m.view, 'study'],
  [/^\/study\/voice\/([\w-]+)\/?$/, 'library', m => m.view, 'study'],
  [/^\/profile\/?$/, 'profile', m => m.view, 'profile']
];
const ACTIONS = {};
const loaded = new Set();
async function mount(name) {
  const m = await V[name](); if (!loaded.has(name)) { loaded.add(name); Object.assign(ACTIONS, m.actions || {}); }
  return m;
}
const main = $('#main');
let navId = 0;
async function render(keepScroll) {
  const id = ++navId;
  ctx.cleanup.forEach(f => { try { f(); } catch (e) { } }); ctx.cleanup = []; ctx.resize = [];
  const hash = location.hash.slice(1) || '/'; const [path, qs] = hash.split('?');
  const q = Object.fromEntries(new URLSearchParams(qs || ''));
  let hit = null; for (const r of ROUTES) { const m = r[0].exec(path); if (m) { hit = { r, m }; break; } }
  const y = keepScroll ? scrollY : 0;
  if (!hit) { main.innerHTML = `<div class="narrow"><h1>Lost?</h1><p><a href="#/">Go home</a></p></div>`; return; }
  const [, name, pick, tab] = hit.r;
  main.innerHTML = loading();
  try {
    const mod = await mount(name);
    const fn = pick(mod);
    const out = await fn({ p1: hit.m[1], p2: hit.m[2], q });
    if (id !== navId) return;
    if (out.html === '' && !out.after) return;
    main.innerHTML = out.html; main.className = '';
    $$('[data-tab]').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
    if (out.after) await out.after();
    scrollTo(0, y);
    if (!keepScroll) main.focus({ preventScroll: true });
    document.title = (out.title ? out.title + ' · ' : '') + 'Beneath the Deep';
  } catch (e) {
    console.error(e);
    if (id === navId) main.innerHTML = `<div class="narrow card"><h2>Something went wrong</h2><p class="muted">${esc(e.message || e)}</p><p><a class="btn" href="#/">Home</a> <button class="btn" onclick="location.reload()">Reload</button></p></div>`;
  }
}
// global actions
Object.assign(ACTIONS, unitActions);
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const fn = ACTIONS[el.dataset.act];
  if (fn) { if (el.tagName === 'BUTTON') e.preventDefault(); fn(el, e); }
});
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('.v[data-act]')) { e.preventDefault(); ACTIONS[e.target.dataset.act]?.(e.target, e); } });
window.addEventListener('hashchange', () => render(false));
window.addEventListener('app:rerender', () => render(true));
window.addEventListener('unit:done', async e => { if (String(e.detail).startsWith('lesson:')) { try { (await V.study()).checkTrack(e.detail); } catch (er) { } } });
window.addEventListener('app:plans', async () => { try { (await V.study()).checkPlans(); } catch (e) { } });
window.addEventListener('resize', debounce(() => ctx.resize.forEach(f => f()), 150));
function chrome() {
  $('#xp-chip').textContent = ''; refreshChip();
}
function refreshChip() { const li = levelInfo(); $('#xp-chip').textContent = `Lv ${li.level} · 🔥${streak()}`; }
setInterval(refreshChip, 4000);
(async () => {
  main.innerHTML = loading('Opening the library…');
  try { await B.init(); } catch (e) { main.innerHTML = `<div class="narrow card"><h2>Couldn’t load Bible data</h2><p class="muted">If you opened index.html directly from your computer, browsers block local data loading. Host it on GitHub Pages, or run <code>python3 -m http.server</code> in this folder and open http://localhost:8000.</p></div>`; return; }
  chrome(); await render(false); checkAch();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });
})();
