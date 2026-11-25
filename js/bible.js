import { esc, hue } from './util.js';
export let META = [];
export let OFF = [];        // global chapter offset for canonical books (0..65)
export const TOTAL = 1189;  // canonical chapters
export const TRANS = {
  bsb: { id: 'bsb', name: 'Berean Standard Bible', short: 'BSB', note: 'Modern English · public domain' },
  kjv: { id: 'kjv', name: 'King James Version (1769, with Apocrypha)', short: 'KJV', note: 'Classic English · public domain' },
  asv: { id: 'asv', name: 'American Standard Version (1901)', short: 'ASV', note: 'Highly literal · public domain' }
};
let ALIAS = new Map(), REF_RE = null;
export async function init() {
  META = await (await fetch('data/meta.json')).json();
  let c = 0; OFF = [];
  META.slice(0, 66).forEach(m => { OFF.push(c); c += m.v.length; });
  buildAliases();
}
const norm = s => s.toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ').trim()
  .replace(/^iii /, '3 ').replace(/^ii /, '2 ').replace(/^i /, '1 ');
function buildAliases() {
  ALIAS = new Map();
  META.forEach(m => ALIAS.set(norm(m.n), m.i));
  const extra = {
    gen: 0, ex: 1, exod: 1, exo: 1, lev: 2, num: 3, deut: 4, dt: 4, josh: 5, judg: 6, jdg: 6, '1 sam': 8, '2 sam': 9, '1 kgs': 10, '2 kgs': 11, '1 kings': 10, '2 kings': 11, '1 chr': 12, '2 chr': 13,
    neh: 15, esth: 16, ps: 18, psalm: 18, pss: 18, psalms: 18, prov: 19, eccl: 20, ecc: 20, qoheleth: 20, song: 21, 'song of songs': 21, canticles: 21, 'song of sol': 21, isa: 22, jer: 23, lam: 24, ezek: 25, dan: 26, hos: 27, obad: 30, mic: 32, nah: 33, hab: 34, zeph: 35, hag: 36, zech: 37, mal: 38,
    matt: 39, mt: 39, mk: 40, lk: 41, jn: 42, rom: 44, '1 cor': 45, '2 cor': 46, gal: 47, eph: 48, phil: 49, col: 50, '1 thess': 51, '2 thess': 52, '1 tim': 53, '2 tim': 54, phlm: 56, philem: 56, heb: 57, jas: 58, '1 pet': 59, '2 pet': 60, '1 jn': 61, '2 jn': 62, '3 jn': 63, rev: 65, revelation: 65, apocalypse: 65,
    '1 esd': 66, '2 esd': 67, '4 ezra': 67, tob: 68, jdt: 69, wis: 71, 'wisdom': 71, wisdom_of_solomon: 71, sir: 72, ecclus: 72, ecclesiasticus: 72, 'ben sira': 72, bar: 73, sus: 75, '1 macc': 78, '2 macc': 79, '1 maccabees': 78, '2 maccabees': 79, 'prayer of manasseh': 77
  };
  Object.entries(extra).forEach(([k, v]) => ALIAS.set(k, v));
  const names = [...ALIAS.keys()].sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+'));
  REF_RE = new RegExp(`\\b((?:${names.join('|')})\\.?)\\s+(\\d{1,3})(?::(\\d{1,3})(?:[–-](\\d{1,3}))?)?`, 'gi');
}
export const bookIndex = name => ALIAS.get(norm(name));
export function label(b, c, v, ve) {
  const n = META[b]?.n || '?';
  if (!c) return n;
  if (META[b].v.length === 1 && v) return `${n} ${v}${ve && ve > v ? '–' + ve : ''}`;
  return `${n} ${c}${v ? ':' + v : ''}${ve && ve > v ? '–' + ve : ''}`;
}
/** parse "John 3:16", "1 Cor 15:3-8", "Psalm 22", "Genesis 1-2", "Jude 14" */
export function parseRef(s) {
  if (!s) return null;
  s = String(s).trim().replace(/[–—]/g, '-');
  const m = s.match(/^((?:[1-4]|i{1,3})\s*)?([a-z][a-z .']*?)\.?\s*(?:(\d+)(?::(\d+))?(?:-(\d+))?)?$/i);
  if (!m) return null;
  const b = ALIAS.get(norm(((m[1] || '') + m[2]).replace(/\s+/g, ' ')));
  if (b === undefined) return null;
  let c = m[3] ? +m[3] : 1, v = m[4] ? +m[4] : 0, t = m[5] ? +m[5] : 0, c2 = 0, ve = 0;
  if (m[4]) ve = t; else if (t) c2 = t;
  if (META[b].v.length === 1 && m[3] && !m[4]) { v = c; c = 1; ve = t; c2 = 0; }
  if (c > META[b].v.length) c = META[b].v.length;
  return { b, c, v, ve: ve > v ? ve : 0, c2, whole: !m[3] };
}
/** replace scripture references inside already-escaped text with reader links */
export function linkRefs(html) {
  if (!REF_RE) return html;
  return html.split(/(<a [^>]*>.*?<\/a>)/gi).map(part => {
    if (part.startsWith('<a ')) return part;
    return part.replace(REF_RE, (all, name, ch, v, ve) => {
      const b = ALIAS.get(norm(name)); if (b === undefined) return all;
      let c = +ch, vv = v ? +v : 0;
      if (META[b].v.length === 1 && !v) { vv = c; c = 1; }
      if (c < 1 || c > META[b].v.length) return all;
      return `<a class="ref" href="#/read/${b}/${c}${vv ? '?v=' + vv : ''}">${all}</a>`;
    });
  }).join('');
}
/* ---------- data ---------- */
const cache = new Map();
const pending = new Map();
export function transFor(b, pref) { return META[b]?.t === 'AP' ? 'kjv' : pref; }
export async function book(t, i) {
  const k = `${t}/${i}`;
  if (cache.has(k)) return cache.get(k);
  if (pending.has(k)) return pending.get(k);
  const p = fetch(`data/bible/${k}.json`).then(r => { if (!r.ok) throw new Error('missing ' + k); return r.json(); }).then(d => { cache.set(k, d); pending.delete(k); return d; });
  pending.set(k, p); return p;
}
export async function chapter(t, b, c) { const bk = await book(t, b); return bk[c - 1] || []; }
const xcache = new Map();
export async function xrefs(b) {
  if (b > 65) return {};
  if (xcache.has(b)) return xcache.get(b);
  const d = await fetch(`data/xrefs/${b}.json`).then(r => r.ok ? r.json() : {}).catch(() => ({}));
  xcache.set(b, d); return d;
}
export function unpack(flat) {
  const out = [];
  for (let i = 0; i < flat.length; i += 5) out.push({ b: flat[i], c: flat[i + 1], v: flat[i + 2], ve: flat[i + 3] ? flat[i + 2] + flat[i + 3] : 0, w: flat[i + 4] });
  return out;
}
export const gIndex = (b, c) => OFF[b] + c - 1;
export function fromG(g) { let b = 0; while (b < 65 && OFF[b + 1] <= g) b++; return { b, c: g - OFF[b] + 1 }; }
/** passage object with text: {label,b,c,v,ve,verses:[[n,text]]} */
export async function passage(t, ref, cap = 28) {
  const r = typeof ref === 'string' ? parseRef(ref) : ref; if (!r) return null;
  const tr = transFor(r.b, t);
  const ch = await chapter(tr, r.b, r.c);
  const v1 = r.v || 1, v2 = r.v ? (r.ve || r.v) : Math.min(ch.length, v1 + cap - 1);
  const verses = []; for (let n = v1; n <= Math.min(v2, ch.length) && verses.length < cap; n++) verses.push([n, ch[n - 1]]);
  return { ...r, trans: tr, label: label(r.b, r.c, r.v, r.ve), verses, truncated: !r.v && ch.length > cap };
}
export async function snippet(t, x, max = 230) {
  const tr = transFor(x.b, t);
  const ch = await chapter(tr, x.b, x.c); let s = [];
  const end = x.ve && x.ve - x.v < 3 ? x.ve : x.v;
  for (let n = x.v; n <= end; n++) if (ch[n - 1]) s.push(ch[n - 1]);
  let txt = s.join(' '); if (txt.length > max) txt = txt.slice(0, max).replace(/\s+\S*$/, '') + '…';
  return txt;
}
/* ---------- full-text search ---------- */
const searchIdx = {};
export async function searchAll(t, q, onProgress) {
  const nb = t === 'kjv' ? 80 : 66;
  if (!searchIdx[t]) {
    const all = new Array(nb); let done = 0, next = 0;
    const worker = async () => { while (next < nb) { const i = next++; all[i] = await book(t, i); onProgress && onProgress(++done / nb); } };
    await Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]);
    searchIdx[t] = all;
  }
  const phrase = /^"(.+)"$/.exec(q.trim());
  const toks = phrase ? [phrase[1].toLowerCase()] : q.toLowerCase().split(/\s+/).filter(Boolean);
  const out = [];
  for (let i = 0; i < nb && out.length < 400; i++) {
    searchIdx[t][i].forEach((ch, ci) => ch.forEach((txt, vi) => {
      if (out.length >= 400) return;
      const low = txt.toLowerCase();
      if (toks.every(k => low.includes(k))) out.push({ b: i, c: ci + 1, v: vi + 1, t: txt });
    }));
  }
  return { out, toks };
}
export function highlight(txt, toks) {
  let h = esc(txt);
  toks.forEach(k => { const re = new RegExp('(' + esc(k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'); h = h.replace(re, '<mark>$1</mark>'); });
  return h;
}
export const bookHue = b => hue(Math.min(b, 65));
