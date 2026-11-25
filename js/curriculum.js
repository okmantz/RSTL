/* The RSTL daily path.
 * A spine of Guided Readings walks through every chapter of the canon and the KJV Apocrypha, grouped into day-sized passages.
 * Handcrafted deep dives (content/daily*.js) are slotted in right after the reading they belong to.
 * The reader's starting season (set in onboarding) decides which block comes first; the rest follow in a fixed order.
 * Guided Readings are assembled from the text itself, the cross-reference data, the book guides, the challenge notes and the question banks. */
import * as B from './bible.js';
import { S } from './store.js';
import { SEASONS, LENSES, TRADS } from '../content/traditions.js';
import { GENRE_Q, LENS_Q, HARD_Q, PRACTICE, STANCE, GENRE_TIP } from '../content/banks.js';
import HARD from '../content/hardnotes.js';
import BOOKS from '../content/books.js';
import DEEP from '../content/daily.js';

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
export function sequence() {
  const ck = S.profile.season;
  if (CACHE && CK === ck) return CACHE;
  const spine = [];
  orderedSeasons().forEach(se => se.books.forEach(([a, z]) => { for (let b = a; b <= z; b++) groups(b).forEach(g => spine.push({ kind: 'gen', sid: se.id, ...g })); }));
  // slot each handcrafted study immediately after the reading that covers its first passage
  const after = new Map();
  DEEP.forEach((u, di) => {
    const p = B.parseRef(u.ref[0]); if (!p) return;
    const at = spine.findIndex(e => e.b === p.b && p.c >= e.c1 && p.c <= e.c2);
    const k = at < 0 ? spine.length - 1 : at;
    (after.get(k) || after.set(k, []).get(k)).push(di);
  });
  const seq = [];
  spine.forEach((e, i) => { seq.push(e); (after.get(i) || []).forEach(di => seq.push({ kind: 'deep', sid: e.sid, di })); });
  CACHE = seq; CK = ck;
  return seq;
}
export const length = () => sequence().length;
export const deepCount = () => DEEP.length;

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
  return e.kind === 'deep' ? DEEP[e.di].t : rangeLabel(e.b, e.c1, e.c2);
}
export const kindAt = i => sequence()[i]?.kind;
export function seasonBlocks() {
  const seq = sequence(), out = [];
  seq.forEach((e, i) => { const last = out[out.length - 1]; if (last && last.sid === e.sid) last.end = i; else out.push({ sid: e.sid, start: i, end: i }); });
  return out.map(o => ({ ...o, n: seasonName(o.sid), sub: SEASONS.find(s => s.id === o.sid).sub, days: o.end - o.start + 1 }));
}

/* ---------- units ---------- */
export function unitAt(i) {
  const e = sequence()[i]; if (!e) return null;
  if (e.kind === 'deep') return { ...DEEP[e.di], deep: true, sid: e.sid, order: i };
  return buildGen(e, i);
}
function pick(arr, n) { return arr[((n % arr.length) + arr.length) % arr.length]; }
function buildGen(e, idx) {
  const m = B.META[e.b], genre = m.s, lens = idx % LENSES.length;
  const trad = TRADS[S.profile.trad] || TRADS.none, tone = S.profile.tone, mins = +S.profile.mins || 15;
  const q = [pick(GENRE_Q[genre], idx + e.b)];
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
    tip: GENRE_TIP[genre], guide: BOOKS[e.b], first: e.c1 === 1, hard,
    q, s: [pick(STANCE, idx), 'Disagree', 'Agree'], p: pick(PRACTICE, idx * 7 + e.b)
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
