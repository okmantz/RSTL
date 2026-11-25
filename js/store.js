import { todayISO, addDays, debounce } from './util.js';
const KEY = 'beneath-the-deep.v1';
const defaults = () => ({
  v: 1,
  profile: { name: '', emoji: '🕯️', theme: 'dark', trans: 'bsb', size: 19, joined: Date.now() },
  xp: 0, days: {}, read: {}, notes: {}, hl: {}, bm: {}, units: {}, args: {},
  beliefs: { cur: {}, snaps: [] }, qs: {}, ach: {}, lib: {}, plans: {}, last: null, stats: { xrefs: 0 }
});
function load() {
  const d = defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const o = JSON.parse(raw); Object.assign(d, o); d.profile = Object.assign(defaults().profile, o.profile || {}); d.beliefs = Object.assign({ cur: {}, snaps: [] }, o.beliefs || {}); d.stats = Object.assign({ xrefs: 0 }, o.stats || {}); }
  } catch (e) { /* private mode or corrupt: start fresh in memory */ }
  return d;
}
export let S = load();
const flush = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };
export const save = debounce(flush, 200);
addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
addEventListener('pagehide', flush);
export function replaceAll(obj) { S = Object.assign(defaults(), obj); S.profile = Object.assign(defaults().profile, obj.profile || {}); flush(); return S; }
export function resetAll() { S = defaults(); flush(); return S; }

/* ---------- XP, levels, streaks ---------- */
export const TITLES = ['Seeker', 'Wanderer', 'Questioner', 'Wrestler', 'Pilgrim', 'Student of the Deep', 'Sage', 'Watchman', 'Elder', 'Knight of Faith', 'Beneath the Absolute'];
export function levelInfo(xp = S.xp) {
  const L = Math.floor(Math.sqrt(xp / 60)) + 1;
  const lo = 60 * (L - 1) ** 2, hi = 60 * L ** 2;
  return { level: L, title: TITLES[Math.min(L - 1, TITLES.length - 1)], pct: Math.round(((xp - lo) / (hi - lo)) * 100), toNext: hi - xp };
}
export function dayRec(iso = todayISO()) { return (S.days[iso] ||= { x: 0 }); }
let toastFn = () => { }, achFn = () => { };
export const hook = (t, a) => { toastFn = t; achFn = a; };
export function addXP(n, why) {
  const before = levelInfo().level;
  const d = dayRec(); d.x = (d.x || 0) + n; d.a = 1; S.xp += n; save();
  toastFn(`+${n} XP${why ? ' · ' + why : ''}`);
  const after = levelInfo();
  if (after.level > before) toastFn(`Level ${after.level}: ${after.title}`, 'ach');
  achFn();
}
export function markActive() { const d = dayRec(); d.a = 1; save(); }
export function streak() {
  let n = 0, d = todayISO();
  if (!S.days[d]?.a) d = addDays(d, -1);
  while (S.days[d]?.a) { n++; d = addDays(d, -1); }
  return n;
}
export function bestStreak() {
  const keys = Object.keys(S.days).filter(k => S.days[k].a).sort();
  let best = 0, run = 0, prev = null;
  for (const k of keys) { run = prev && addDays(prev, 1) === k ? run + 1 : 1; best = Math.max(best, run); prev = k; }
  return best;
}
export const key = (b, c, v) => `${b}.${c}${v ? '.' + v : ''}`;
