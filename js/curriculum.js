/* The RSTL daily path.
 * A spine of Guided Readings walks through every chapter of the canon and the KJV Apocrypha, grouped into day-sized passages.
 * Handcrafted deep dives (content/daily*.js) and Close Readings (content/cr_*.js, one tightly focused passage each) are
 * slotted in right after the reading they belong to.
 *
 * Every reader gets a personal PATH: the full list of studies in the order they will meet them, saved on the profile
 * (S.profile.path). Day n of the reader's journey is path[n % length], so each day is a different study and nothing repeats
 * until every study has been done. Because the path is stored, adding more studies later never reshuffles days already lived:
 * new studies are appended to the end of the reader's path. Readers who started before Close Readings existed keep every
 * day they have already lived exactly as it was; the new studies fill the days after that.
 * The reader's starting season (set in onboarding) decides which block comes first; the rest follow in a fixed order.
 * Guided Readings are assembled from the text itself, the cross-reference data, the book guides, the challenge notes and the question banks. */
import * as B from './bible.js';
import { S, save } from './store.js';
import { SEASONS, LENSES, TRADS } from '../content/traditions.js';
import { GENRE_Q, LENS_Q, HARD_Q, PRACTICE, STANCE, GENRE_TIP } from '../content/banks.js';
import HARD from '../content/hardnotes.js';
import BOOKS from '../content/books.js';
import DEEP from '../content/daily.js';
import INS from '../content/insight.js';
import DOS from '../content/dossier.js';
import DD from '../content/dd.js';
import CLOSE from '../content/close.js';
import { todayISO } from './util.js';

const CAP = 45, CAP_PS = 30, MAX_CH = 4;
let CACHE = null, CK = '';

const nm = b => B.META[b].n;
export function rangeLabel(b, c1, c2) {
  const n = nm(b);
  if (B.META[b].v.length === 1) return n;
  return c1 === c2 ? `${n} ${c1}` : `${n} ${c1}–${c2}`;
}
function groups(b) {
  const v = B.META[b].v, cap = b === 18 ? CAP_PS : CAP, out = [];
  let i = 0;
  while (i < v.length) {
    let s = v[i], j = i + 1;
    while (j < v.length && s + v[j] <= cap && j - i < MAX_CH) { s += v[j]; j++; }
    out.push({ b, c1: i + 1, c2: j, verses: s }); i = j;
  }
  return out;
}
function orderedSeasons() {
  const start = Math.max(0, SEASONS.findIndex(s => s.id === S.profile.season));
  return [...SEASONS.slice(start), ...SEASONS.slice(0, start)];
}
let HARDIDX = null;
function hardIndex() {
  if (HARDIDX) return HARDIDX; HARDIDX = [];
  HARD.forEach(([ref, title, text]) => { const p = B.parseRef(ref); if (p) HARDIDX.push({ b: p.b, c: p.c, v: p.v || 1, title, text, ref }); });
  return HARDIDX;
}
const gid = e => 'g' + e.b + '.' + e.c1;
/** the spine of Guided Readings in the reader's season order */
function spineOf() {
  const spine = [];
  orderedSeasons().forEach(se => se.books.forEach(([a, z]) => { for (let b = a; b <= z; b++) groups(b).forEach((g, gi) => spine.push({ kind: 'gen', sid: se.id, gi, ...g })); }));
  return spine;
}
/** where, in the spine, a passage belongs: the reading that covers its chapter (or the last reading if none does) */
const slotFor = (spine, p) => { const at = spine.findIndex(e => e.b === p.b && p.c >= e.c1 && p.c <= e.c2); return at < 0 ? spine.length - 1 : at; };
/** the studies this app shipped with before Close Readings, in their original order (kept so existing readers' past days never change) */
let LEG = null, LEGK = '';
function legacySequence() {
  const ck = S.profile.season; if (LEG && LEGK === ck) return LEG;
  const spine = spineOf(), after = new Map();
  DEEP.forEach((u, di) => {
    const p = B.parseRef(u.ref[0]); if (!p) return;
    const k = slotFor(spine, p);
    (after.get(k) || after.set(k, []).get(k)).push(di);
  });
  const seq = [];
  spine.forEach((e, i) => { seq.push({ ...e, id: gid(e) }); (after.get(i) || []).forEach(di => seq.push({ kind: 'deep', sid: e.sid, di, id: 'd' + di })); });
  seq.forEach((e, i) => { e.lg = i; });
  LEG = seq; LEGK = ck; return seq;
}
/* ---------- Close Readings: scope + label for a passage reference ---------- */
export function closeSegs(p) {
  const nv = B.META[p.b].v, segs = [];
  if (p.v && p.ce) {
    segs.push({ b: p.b, c: p.c, v1: p.v, v2: nv[p.c - 1] });
    for (let c = p.c + 1; c < p.ce; c++) segs.push({ b: p.b, c, v1: 1, v2: nv[c - 1] });
    segs.push({ b: p.b, c: p.ce, v1: 1, v2: p.ve || 1 });
  } else if (p.v) segs.push({ b: p.b, c: p.c, v1: p.v, v2: Math.min(p.ve || p.v, nv[p.c - 1]) });
  else for (let c = p.c; c <= Math.min(p.c2 || p.c, nv.length); c++) segs.push({ b: p.b, c, v1: 1, v2: nv[c - 1] });
  return segs;
}
const closeLabel = p => {
  const n = nm(p.b);
  if (p.v && p.ce) return `${n} ${p.c}:${p.v}–${p.ce}:${p.ve || 1}`;
  if (p.v) return B.label(p.b, p.c, p.v, p.ve);
  return p.c2 ? `${n} ${p.c}–${p.c2}` : B.label(p.b, p.c);
};
const closeId = p => 'c' + p.b + '.' + p.c + '.' + (p.v || 0) + (p.ve ? '-' + p.ve : '') + (p.ce ? '@' + p.ce : '') + (p.c2 ? '~' + p.c2 : '');
/** every study, in canonical order for the reader's season: readings, deep dives and close readings interleaved along the Bible */
let CANON = null, CANONK = '';
function canonical() {
  const ck = S.profile.season; if (CANON && CANONK === ck) return CANON;
  const spine = spineOf(), after = new Map(), leg = legacySequence();
  const lg = new Map(leg.map(e => [e.id, e.lg]));
  const put = (k, x) => (after.get(k) || after.set(k, []).get(k)).push(x);
  DEEP.forEach((u, di) => { const p = B.parseRef(u.ref[0]); if (p) put(slotFor(spine, p), { kind: 'deep', di, id: 'd' + di }); });
  CLOSE.forEach((r, ci) => { const p = B.parseRef(r[0]); if (p) put(slotFor(spine, p), { kind: 'close', ci, b: p.b, c1: p.c, v1: p.v || 1, p, id: closeId(p) }); });
  const seq = [];
  spine.forEach((e, i) => { seq.push({ ...e, id: gid(e) }); (after.get(i) || []).forEach(x => seq.push({ ...x, sid: e.sid })); });
  seq.forEach(e => { e.lg = lg.has(e.id) ? lg.get(e.id) : -1; });
  CANON = seq; CANONK = ck; return seq;
}
/** restart the reader's path from today (used when the starting season changes) */
export function restartPath() { S.profile.start = todayISO(); S.profile.seqv = 2; S.profile.path = null; }
/** the reader's personal path as a list of entries */
let SEQ = null, SEQK = null;
export function sequence() {
  const P = S.profile, canon = canonical();
  if (!P.start) return canon;                                           // not started yet: show the canonical order, save nothing
  const byId = new Map(canon.map(e => [e.id, e]));
  if (!Array.isArray(P.path) || P.pseason !== P.season) {
    let ids;
    if (P.seqv !== 2) {                                                 // a reader from before Close Readings: keep the days already lived
      const leg = legacySequence(), lived = Math.max(0, daysBetween(P.start, todayISO()) + 1), frozen = leg.slice(0, Math.min(lived, leg.length)).map(e => e.id), used = new Set(frozen);
      ids = [...frozen, ...canon.filter(e => !used.has(e.id)).map(e => e.id)];
      P.seqv = 2;
    } else ids = canon.map(e => e.id);
    P.path = ids; P.pseason = P.season; save();
  } else {
    // keep the saved order; drop studies that no longer exist; append any studies added since, in canonical order
    const have = new Set(P.path), keep = P.path.filter(id => byId.has(id)), add = canon.filter(e => !have.has(e.id)).map(e => e.id);
    if (add.length || keep.length !== P.path.length) { P.path = [...keep, ...add]; save(); }
  }
  const key = P.path.length + '|' + P.path[0] + '|' + P.path[P.path.length - 1] + '|' + P.season + '|' + canon.length;
  if (SEQ && SEQK === key) return SEQ;
  SEQ = P.path.map(id => byId.get(id)).filter(Boolean); SEQK = key;
  return SEQ;
}
export const length = () => sequence().length;
export const deepCount = () => DEEP.length;
export const closeCount = () => CLOSE.length;

/* ---------- date -> day index ---------- */
const utc = iso => { const [y, m, d] = iso.split('-').map(Number); return Date.UTC(y, m - 1, d); };
export const daysBetween = (a, b) => Math.round((utc(b) - utc(a)) / 864e5);
export function startISO() { return S.profile.start || new Date().toISOString().slice(0, 10); }
export function indexFor(iso) {
  const n = daysBetween(startISO(), iso), L = length();
  return { n, idx: ((n % L) + L) % L, lap: Math.floor(n / L) };
}
export const seasonName = sid => SEASONS.find(s => s.id === sid)?.n || '';

/* ---------- cheap titles (for plan listings) ---------- */
export function titleAt(i) {
  const e = sequence()[i]; if (!e) return '';
  return e.kind === 'deep' ? DEEP[e.di].t : e.kind === 'close' ? CLOSE[e.ci][1] : rangeLabel(e.b, e.c1, e.c2);
}
export const kindAt = i => sequence()[i]?.kind;
/** one row per season, in the order the reader meets them: how many studies it holds and which path positions they sit at */
export function seasonBlocks() {
  const seq = sequence(), by = new Map();
  seq.forEach((e, i) => { const o = by.get(e.sid) || by.set(e.sid, { sid: e.sid, at: [] }).get(e.sid); o.at.push(i); });
  return [...by.values()].map(o => ({ ...o, n: seasonName(o.sid), sub: SEASONS.find(s => s.id === o.sid).sub, days: o.at.length }));
}

/* ---------- units ---------- */
export function unitAt(i) {
  const e = sequence()[i]; if (!e) return null;
  if (e.kind === 'deep') return { ...DEEP[e.di], deep: true, sid: e.sid, order: i };
  if (e.kind === 'close') return buildClose(e);
  return buildGen(e, e.lg >= 0 ? e.lg : i);
}
function pick(arr, n) { return arr[((n % arr.length) + arr.length) % arr.length]; }
function buildGen(e, idx) {
  const m = B.META[e.b], genre = m.s, lens = idx % LENSES.length;
  const trad = TRADS[S.profile.trad] || TRADS.none, tone = S.profile.tone, mins = +S.profile.mins || 15;
  const ins = (INS[e.b] || []).filter(r => r[0] >= e.c1 && r[0] <= e.c2).map(r => ({ c: r[0], h: r[1], t: r[2], q: r[3] }));
  const dos = DOS[e.b] || null;
  const FACETS = [['ctx', 'Historical setting'], ['out', 'How the book is built'], ['ext', 'Outside sources and parallels'], ['dbt', 'A scholarly debate']];
  const fk = FACETS[(e.gi || 0) % FACETS.length];
  const facet = dos && dos[fk[0]] ? { title: fk[1], text: dos[fk[0]] } : null;
  const ddr = (DD[e.b] || []).find(r => r[0] === e.c1) || null;
  const dd = ddr ? { h: ddr[1], a: Array.isArray(ddr[2]) ? ddr[2] : [ddr[2]], x: ddr[3] || [], q: ddr[4] || [], i: ddr[5] || null } : null;
  const q = [];
  if (dd) dd.q.forEach(x => q.push(x));
  ins.forEach(x => { if (x.q) q.push(x.q); });
  q.push(pick(GENRE_Q[genre], idx + e.b));
  if (mins >= 15) q.push(pick(LENS_Q[lens], idx));
  q.push(pick(trad.tq, idx));
  if (tone === 'hard') q.push(pick(HARD_Q, idx + 3));
  if (mins >= 30) q.push(pick(GENRE_Q[genre], idx + e.b + 4));
  const hard = hardIndex().filter(h => h.b === e.b && h.c >= e.c1 && h.c <= e.c2).map(h => ({ title: h.title, text: h.text, ref: h.ref }));
  const mins_read = Math.max(1, Math.round(e.verses * 22 / 180));
  return {
    gen: true, b: e.b, c1: e.c1, c2: e.c2, genre, sid: e.sid, order: idx, lens,
    t: rangeLabel(e.b, e.c1, e.c2),
    k: `${seasonName(e.sid)} · Lens: ${LENSES[lens][0]}`,
    tag: `${e.verses} verses · about ${mins_read} min to read. ${LENSES[lens][1]}`,
    tip: GENRE_TIP[genre], guide: BOOKS[e.b], first: e.c1 === 1, hard, ins, dd, facet, src: dos?.src || [],
    q, s: [pick(STANCE, idx), 'Disagree', 'Agree'], p: pick(PRACTICE, idx * 7 + e.b)
  };
}

/* ---------- Close Readings ----------
 * One tightly focused passage, written by hand: a thesis, the cross-references that matter, two hard questions and an exercise.
 * Entry: [passage, title, analysis (string or [paragraphs]), [[cross-reference, why], …], [questions], [exercise]]
 * The original-language, translation-split, cross-reference and repeated-word sections are computed from the passage itself. */
function buildClose(e) {
  const [, title, ana, xr, qs, ex] = CLOSE[e.ci], p = e.p, m = B.META[p.b], genre = m.s;
  const ord = 5000 + e.ci, lens = ord % LENSES.length;
  const trad = TRADS[S.profile.trad] || TRADS.none, tone = S.profile.tone, mins = +S.profile.mins || 15;
  const seg = closeSegs(p), verses = seg.reduce((n, s) => n + Math.max(0, s.v2 - s.v1 + 1), 0), label = closeLabel(p);
  const dos = DOS[p.b] || null;
  const FACETS = [['ctx', 'Historical setting'], ['out', 'How the book is built'], ['ext', 'Outside sources and parallels'], ['dbt', 'A scholarly debate']];
  const fk = FACETS[e.ci % FACETS.length];
  const facet = dos && dos[fk[0]] ? { title: fk[1], text: dos[fk[0]] } : null;
  const dd = { h: '', a: Array.isArray(ana) ? ana : [ana], x: xr || [], q: qs || [], i: ex || null };
  const q = [...dd.q];
  q.push(pick(GENRE_Q[genre], ord + p.b));
  if (mins >= 15) q.push(pick(LENS_Q[lens], ord));
  q.push(pick(trad.tq, ord));
  if (tone === 'hard') q.push(pick(HARD_Q, ord + 3));
  if (mins >= 30) q.push(pick(GENRE_Q[genre], ord + p.b + 4));
  const inSeg = h => seg.some(s => s.c === h.c && h.v >= s.v1 && h.v <= s.v2);
  const hard = hardIndex().filter(h => h.b === p.b && inSeg(h)).map(h => ({ title: h.title, text: h.text, ref: h.ref }));
  const mins_read = Math.max(1, Math.round(verses * 22 / 180));
  return {
    gen: true, close: true, b: p.b, c1: p.c, c2: seg[seg.length - 1].c, v1: p.v || 1, seg, genre, sid: e.sid, order: ord, lens,
    t: title, ref: null,
    k: `${seasonName(e.sid)} · Close reading · Lens: ${LENSES[lens][0]}`,
    tag: `${label} · ${verses} verse${verses === 1 ? '' : 's'} · about ${mins_read} min to read. ${LENSES[lens][1]}`,
    tip: GENRE_TIP[genre], guide: null, first: false, hard, ins: [], dd, facet, src: [],
    q, s: [pick(STANCE, ord), 'Disagree', 'Agree'], p: pick(PRACTICE, ord * 7 + p.b)
  };
}

/* ---------- stop words for the "words that carry it" analysis ---------- */
const STOP = new Set(('about above after again against also among because been before being between both but came come could does each even every from have having here himself herself into itself just like made make many more most much must never only other over said saith says shall should since some such than that their them then there these they thine this those thou thee thus thy unto upon very were what when where which while whom whose will with within without would your yours ye yea hath doth art are was for and the you his her him she its our out all any can not nor now off one two who how yet may let get got has had did too own same than').split(/\s+/));
export function keyWords(texts, n = 6) {
  const c = new Map();
  texts.join(' ').toLowerCase().replace(/[^a-z’' -]/g, ' ').split(/\s+/).forEach(w => {
    w = w.replace(/^['’-]+|['’-]+$/g, '').replace(/(’|')s$/, '');
    if (w.length < 4 || STOP.has(w)) return; c.set(w, (c.get(w) || 0) + 1);
  });
  return [...c.entries()].filter(([, k]) => k >= 3).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);
}
