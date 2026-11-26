import { S, save, streak, bestStreak, levelInfo } from './store.js';
import * as B from './bible.js';
import ACH from '../content/achievements.js';
import { toast } from './ui.js';
let QN = 14; export const setQN = n => { QN = n; };
export function stats() {
  const keys = Object.keys(S.read);
  const per = {}; keys.forEach(k => { const b = +k.split('.')[0]; per[b] = (per[b] || 0) + 1; });
  const canon = keys.filter(k => +k.split('.')[0] < 66);
  const full = b => B.META[b] && (per[b] || 0) >= B.META[b].v.length;
  const all = (a, z) => { for (let b = a; b <= z; b++) if (!full(b)) return false; return true; };
  let booksDone = 0; B.META.forEach((m, b) => { if (full(b)) booksDone++; });
  const units = Object.entries(S.units);
  const tr = S.units['__tracks'] || {};
  return {
    checkins: Object.values(S.days).filter(d => d.c).length,
    best: bestStreak(), cur: streak(),
    chapters: canon.length, booksDone, apoc: keys.filter(k => +k.split('.')[0] >= 66).length,
    gospels: all(39, 42), torah: all(0, 4),
    xrefs: S.stats.xrefs || 0,
    notes: Object.values(S.notes).filter(n => n.t && n.t.trim()).length, hl: Object.keys(S.hl).length,
    dailies: units.filter(([k, u]) => k.startsWith('daily:') && u.done).length,
    lessons: units.filter(([k, u]) => k.startsWith('lesson:') && u.done).length,
    answers: units.reduce((n, [, u]) => n + (u.a || []).filter(x => x && x.trim().length > 40).length, 0),
    tracksDone: tr.done ? Object.keys(tr.done).length : 0,
    seminar: !!(tr.done && tr.done.seminar),
    args: Object.values(S.args).filter(a => a.tested).length,
    qs: Object.keys(S.qs).filter(k => S.qs[k].s).length, qsAll: Object.keys(S.qs).filter(k => S.qs[k].s).length >= QN,
    snaps: S.beliefs.snaps.length, moved: beliefMoved(),
    voices: Object.keys(S.lib).length,
    dbtPos: Object.values(S.dbt || {}).reduce((n, d) => n + Object.keys(d.seen || {}).length, 0),
    dbtChal: Object.values(S.dbt || {}).reduce((n, d) => n + Object.keys(d.ch || {}).length, 0),
    tlEv: Object.keys(S.tl?.seen || {}).length, places: Object.keys(S.tl?.places || {}).length, txSeen: Object.keys(S.tx?.seen || {}).length,
    props: (S.mind?.props || []).length, reviews: (S.mind?.props || []).reduce((n, p) => n + (p.rev || []).length, 0),
    plansDone: Object.values(S.plans).filter(p => p.done).length,
    resps: Object.values(S.resp).filter(r => (r.steel && Object.values(r.steel).some(v => v && v.trim().length > 3)) || (r.voice && r.voice.t && r.voice.t.trim()) || (r.sit && r.sit.trim())).length,
    steels: Object.values(S.resp).filter(r => r.steel && ['view','obj','chg','say'].every(f => r.steel[f] && r.steel[f].trim().length > 3)).length,
    myqs: S.myq.length,
    reacts: Object.keys(S.react).length,
    level: levelInfo().level
  };
}
function beliefMoved() {
  const sn = S.beliefs.snaps; if (sn.length < 2) return false;
  const a = sn[0].v, z = sn[sn.length - 1].v;
  return Object.keys(z).some(k => a[k] != null && Math.abs(z[k] - a[k]) >= 2);
}
export function checkAch() {
  let s; try { s = stats(); } catch (e) { return; }
  let any = false;
  for (const a of ACH) {
    if (S.ach[a.id]) continue;
    let ok = false; try { ok = a.t(s); } catch (e) { }
    if (ok) { S.ach[a.id] = Date.now(); S.xp += 25; any = true; toast(`Achievement: ${a.n} (+25 XP)`, 'ach'); }
  }
  if (any) save();
}
export { ACH };
