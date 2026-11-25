/* Original-language layer: Hebrew (OT, Westminster Leningrad Codex text) and Greek (NT, Nestle-Aland / Textus Receptus variants).
 * Word data: STEPBible TAHOT / TAGNT (Tyndale House Cambridge & STEPBible.org, CC BY 4.0). Lexicons: TBESH / TBESG (same source).
 * Word record: [surface, translit, gloss, lemmaId, morph, flag, note?]
 *   flag: '' normal · 'q' Qere reading · 't' Psalm title · 'k' only in the Textus Receptus (KJV) · 'n' only in the modern critical text
 *         'v' the Textus Receptus reads differently here · 'o' other editions only */
import { esc } from './util.js';
import { plain } from './ui.js';
import * as B from './bible.js';
import KEYS from '../content/keywords.js';

const BASE = 'data/orig/';
let IDX = null;
const chunks = new Map(), pend = new Map(), lexes = {};
export const hasOrig = b => b >= 0 && b < 66;
export const isNT = b => b >= 39 && b < 66;
export const langOf = b => (isNT(b) ? 'Greek' : 'Hebrew');
const getJSON = async u => { const r = await fetch(u); if (!r.ok) throw new Error('missing ' + u); return r.json(); };

/** One chapter: array of verses, each an array of word records (or null if unavailable). */
export async function chapterOrig(b, c) {
  if (!hasOrig(b)) return null;
  IDX ||= await getJSON(BASE + 'index.json');
  const ent = (IDX[b] || []).find(([a, z]) => c >= a && c <= z); if (!ent) return null;
  const name = ent[2];
  if (!chunks.has(name)) {
    if (!pend.has(name)) pend.set(name, getJSON(BASE + name).then(d => { chunks.set(name, d); pend.delete(name); return d; }));
    await pend.get(name);
  }
  return chunks.get(name)[String(c)] || null;
}
/** Lexicon rows: lemmaId -> [lemma, translit, gloss, definition, count, first 'b.c.v', refs[]] */
export async function lexicon(b) {
  const k = isNT(b) ? 'g' : 'h';
  if (!lexes[k]) lexes[k] = getJSON(`${BASE}lex${k}.json`);
  return lexes[k];
}
export const TOKENS = { h: 305000, g: 138000 };

/* ---------- helpers ---------- */
export const simple = id => { const m = /^([HG])(\d{4})/.exec(id || ''); return m ? m[1] + (+m[2]) : ''; };
const keyOf = id => { const m = /^([HG])(\d{4})/.exec(id || ''); return m ? m[1] + m[2] : ''; };
export const curated = id => KEYS[keyOf(id)] || null;
export const refOf = s => { const [b, c, v] = s.split('.').map(Number); return { b, c, v }; };
export const refLabel = s => { const r = refOf(s); return B.label(r.b, r.c, r.v); };
export const refHref = s => { const r = refOf(s); return `#/read/${r.b}/${r.c}?v=${r.v}`; };

/* ---------- morphology (decoded for humans) ---------- */
const H_STEM = { q: 'Qal', N: 'Niphal', p: 'Piel', P: 'Pual', h: 'Hiphil', H: 'Hophal', t: 'Hithpael', o: 'Polel', O: 'Polal', r: 'Hithpolel', m: 'Poel', M: 'Poal', k: 'Palel', K: 'Pulal', Q: 'Qal passive', l: 'Pilpel', L: 'Polpal', f: 'Hithpalpel', D: 'Nithpael', j: 'Pealal', i: 'Pilel', u: 'Hothpaal', c: 'Tiphil', v: 'Hishtaphel', w: 'Nithpalel', y: 'Nithpoel', z: 'Hithpoel' };
const A_STEM = { q: 'Peal', p: 'Pael', a: 'Aphel', h: 'Haphel' };
const H_TYPE = { p: 'perfect', q: 'sequential perfect', i: 'imperfect', w: 'wayyiqtol (narrative)', h: 'cohortative', j: 'jussive', v: 'imperative', r: 'active participle', s: 'passive participle', a: 'infinitive absolute', c: 'infinitive construct' };
const H_GEN = { m: 'masc.', f: 'fem.', b: 'masc./fem.', c: 'common' }, H_NUM = { s: 'sg.', p: 'pl.', d: 'dual' }, H_STATE = { a: 'absolute', c: 'construct', d: 'determined' };
const H_PART = { a: 'affirmation', d: 'definite article', e: 'exhortation', i: 'interrogative', j: 'interjection', m: 'demonstrative', n: 'negative', o: 'object marker', r: 'relative' };
const H_PRON = { d: 'demonstrative', f: 'indefinite', i: 'interrogative', p: 'personal', r: 'relative' };
const ORD = { 1: '1st', 2: '2nd', 3: '3rd' };
function hebSeg(sg, aram) {
  const t = sg[0], r = sg.slice(1);
  const gn = s => [H_GEN[s[0]], H_NUM[s[1]], H_STATE[s[2]]].filter(Boolean).join(' ');
  switch (t) {
    case 'R': return 'preposition'; case 'C': return 'conjunction'; case 'D': return 'adverb';
    case 'T': return H_PART[r[0]] || 'particle';
    case 'N': { const k = { c: 'common noun', g: 'gentilic noun', p: 'proper name' }[r[0]] || 'noun'; const g = gn(r.slice(1)); return g ? `${k}, ${g}` : k; }
    case 'A': { const k = { a: 'adjective', c: 'cardinal number', g: 'gentilic', o: 'ordinal number' }[r[0]] || 'adjective'; const g = gn(r.slice(1)); return g ? `${k}, ${g}` : k; }
    case 'P': return `${H_PRON[r[0]] || ''} pronoun${r.slice(1) ? ', ' + [ORD[r[1]], H_GEN[r[2]], H_NUM[r[3]]].filter(Boolean).join(' ') : ''}`.trim();
    case 'S': { const k = r[0]; if (k === 'p') return 'pronominal suffix' + (r.slice(1) ? ': ' + [ORD[r[1]], H_GEN[r[2]], H_NUM[r[3]]].filter(Boolean).join(' ') : ''); return { d: 'directional he', h: 'paragogic he', n: 'paragogic nun' }[k] || 'suffix'; }
    case 'V': {
      const stem = (aram ? A_STEM : H_STEM)[r[0]] || `stem ${r[0]}`, ty = H_TYPE[r[1]] || '';
      const rest = r.slice(2);
      if ('rs'.includes(r[1] || '')) return ['verb', stem, ty, [H_GEN[rest[0]], H_NUM[rest[1]], H_STATE[rest[2]]].filter(Boolean).join(' ')].filter(Boolean).join(' · ');
      if ('ac'.includes(r[1] || '')) return ['verb', stem, ty].join(' · ');
      return ['verb', stem, ty, [ORD[rest[0]], H_GEN[rest[1]], H_NUM[rest[2]]].filter(Boolean).join(' ')].filter(Boolean).join(' · ');
    }
    default: return sg;
  }
}
const G_CASE = { N: 'nominative', G: 'genitive', D: 'dative', A: 'accusative', V: 'vocative' }, G_GEN = { M: 'masc.', F: 'fem.', N: 'neut.' }, G_NUM = { S: 'sg.', P: 'pl.' };
const G_TENSE = { P: 'present', I: 'imperfect', F: 'future', A: 'aorist', R: 'perfect', L: 'pluperfect' };
const G_VOICE = { A: 'active', M: 'middle', P: 'passive', E: 'middle/passive', D: 'deponent', O: 'passive deponent', N: 'middle deponent', Q: 'passive deponent', X: '' };
const G_MOOD = { I: 'indicative', S: 'subjunctive', O: 'optative', M: 'imperative', N: 'infinitive', P: 'participle' };
const G_PRON = { P: 'personal', R: 'relative', C: 'reciprocal', D: 'demonstrative', K: 'correlative', I: 'interrogative', X: 'indefinite', Q: 'correlative/interrogative', F: 'reflexive', S: 'possessive' };
const G_SIMPLE = { CONJ: 'conjunction', PREP: 'preposition', ADV: 'adverb', INJ: 'interjection', COND: 'conditional', PRT: 'particle', ARAM: 'Aramaic word', HEB: 'Hebrew word' };
function cgn(s) { return [G_CASE[s[0]], G_GEN[s[1]], G_NUM[s[2]]].filter(Boolean).join(' '); }
function greekMorph(m) {
  if (!m) return '';
  const p = m.split('-'), pos = p[0];
  if (G_SIMPLE[pos]) return G_SIMPLE[pos] + (p[1] ? ({ N: ', negative', I: ', interrogative', K: ', correlative' }[p[1]] || '') : '');
  if (pos === 'V') {
    const t = /^(2?)([PIFARL])([AMPEDONQX])([ISOMNP])$/.exec(p[1] || ''); if (!t) return m;
    const out = ['verb', (t[1] ? 'second ' : '') + G_TENSE[t[2]], G_VOICE[t[3]], G_MOOD[t[4]]].filter(Boolean);
    const tail = p[2] || '';
    if (t[4] === 'P' && tail) out.push(cgn(tail)); else if (tail) out.push([ORD[tail[0]], G_NUM[tail[1]]].filter(Boolean).join(' '));
    return out.join(' · ');
  }
  if (pos === 'N') return 'noun' + (p[1] ? ', ' + cgn(p[1]) : '') + ({ P: ' (person)', L: ' (place)', T: ' (title)', G: ' (gentilic)' }[p[2]] || '');
  if (pos === 'A') return 'adjective' + (p[1] ? ', ' + cgn(p[1]) : '');
  if (pos === 'T') return 'article' + (p[1] ? ', ' + cgn(p[1]) : '');
  if (G_PRON[pos]) { const r = p[1] || ''; const person = /^[123]/.test(r) ? ORD[r[0]] + ' person ' : ''; const rest = person ? r.slice(1) : r; return `${G_PRON[pos]} pronoun` + (r ? ', ' + (person + cgn(rest.length === 2 ? rest[0] + 'x' + rest[1] : rest)).replace(/\s+/g, ' ').trim() : ''); }
  return m;
}
export function parseMorph(w, b) {
  const m = w[4]; if (!m) return '';
  if (isNT(b)) return greekMorph(m);
  const aram = m[0] === 'A'; const segs = m.slice(1).split('/');
  return segs.map(s => hebSeg(s, aram)).join(' + ');
}
/** is this word a function word (article, preposition, conjunction, pronoun, particle, suffix…)? */
export function isFunction(w, b) {
  const m = w[4] || '';
  if (isNT(b)) { const pos = m.split('-')[0]; return !['N', 'V', 'A'].includes(pos) && !(pos === 'ADV' && false); }
  const segs = m.slice(1).split('/'); const main = segs.filter(s => !/^[RCTSD]/.test(s))[0] || segs[segs.length - 1] || '';
  return !/^[NVA]/.test(main);
}
export const isProper = (w, b) => isNT(b) ? /^N-[A-Z]{3}-[PLG]/.test(w[4] || '') || /^N-PRI/.test(w[4] || '') : /N[pg]/.test(w[4] || '');

/* ---------- rendering ---------- */
const FLAG_NOTE = {
  q: 'Qere: the scribal margin tells readers to say a different word than the one written. This is the spoken form most translations follow.',
  k: 'This word is in the Textus Receptus (the Greek text behind the KJV) but is not in the modern critical text (Nestle-Aland).',
  n: 'This word is in the modern critical text (Nestle-Aland) but not in the Textus Receptus behind the KJV.',
  v: 'The Textus Receptus (KJV) reads differently here.',
  o: 'This word appears only in other editions of the Greek text.',
  t: 'Part of the psalm’s heading (in the Hebrew text it is numbered as its own verse).'
};
/** STEPBible gloss conventions: <x> = a word with no English counterpart, [x] = English added by the translators. */
export const glossHTML = g => esc(g || '').replace(/&lt;\.?([^&]*?)&gt;/g, '<i class="un">$1</i>').replace(/\[([^\]]*)\]/g, '<i class="ad">$1</i>');
export const glossText = g => (g || '').replace(/<\.?([^>]*)>/g, '($1)').replace(/\[([^\]]*)\]/g, '$1');
/** Lexicon definitions arrive as raw dictionary entries; keep the readable meaning, drop headword forms and citation lists. */
export function cleanDef(d, max = 200) {
  if (!d) return '';
  const parts = String(d).split(/\s·\s|·\s/).map(x => x.trim()).filter(Boolean);
  const keep = [];
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i];
    if (i === 0 && /,|\(/.test(p) && p.length < 60) continue;
    if (/^\[.*\]$/.test(p) || /^\[in (LXX|NT)/.test(p)) continue;
    if (/^__/.test(p) || /\b[1-3]?[A-Z][a-z]{1,3}\.\d/.test(p) || /\bp\. \d/.test(p) || /^This entry/.test(p)) break;
    p = p.replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim(); if (p) keep.push(p);
  }
  let t = keep.join('; ') || String(d).replace(/\s+/g, ' ');
  if (t.length > max) t = t.slice(0, max).replace(/\s+\S*$/, '') + '…';
  return t;
}
const dirOf = b => (isNT(b) ? 'ltr' : 'rtl');
const langAttr = b => (isNT(b) ? 'grc' : 'he');
const wcls = w => 'ow' + (w[5] && w[5] !== 'q' && w[5] !== 't' ? ' ow-' + w[5] : '') + (w[5] === 'q' ? ' ow-q' : '');

function badgeHTML(n, hn, note, bm, ic) {
  return `<span class="badge">${n ? `<b title="${n} connections">${n}</b>` : ''}${hn ? `<b class="flag" title="Challenge note">${ic('flag')}</b>` : ''}${note ? `<b title="You wrote a note">${ic('pen')}</b>` : ''}${bm ? `<b title="Bookmarked">${ic('bookmark')}</b>` : ''}</span>`;
}
/** Render a chapter in one of: 'orig' | 'inter' | 'par'. `meta(v)` returns { cls, badge } for the shared verse chrome. */
export function chapterHTML(b, verses, mode, english, meta, start = 1, act = 'ow', cnum = 0) {
  const dir = dirOf(b), lang = langAttr(b);
  const at = (v, j) => `data-act="${act}" data-b="${b}" data-c="${cnum}" data-v="${v}" data-i="${j}"`;
  return verses.map((ws, i) => {
    const v = i + start, m = meta(v);
    const words = ws.map((w, j) => {
      const t = w[5] === 't' ? ' ttl' : '';
      if (mode === 'inter') return `<button class="iw${t}${w[5] && w[5] !== 't' ? ' iw-' + w[5] : ''}" ${at(v, j)}><span class="o" lang="${lang}">${esc(w[0])}</span><span class="t">${esc(w[1])}</span><span class="g">${glossHTML(w[2])}</span></button>`;
      return `<span class="${wcls(w)}${t}" ${at(v, j)} role="button" tabindex="0" lang="${lang}">${esc(w[0])}</span>`;
    }).join(mode === 'inter' ? '' : ' ');
    if (mode === 'inter') return `<div class="v iv${m.cls}" data-v="${v}" data-act="selVerse" tabindex="0"><div class="ivn"><sup>${v}</sup>${m.badge}</div><div class="iwrap" dir="${dir}">${words}</div></div>`;
    if (mode === 'par') return `<div class="v pv${m.cls}" data-v="${v}" data-act="selVerse" tabindex="0"><div class="pvo" dir="${dir}" lang="${lang}"><sup>${v}</sup>${words}</div><div class="pve"><sup>${v}</sup>${esc(english[i] || '')}${m.badge}</div></div>`;
    return `<p class="v ov${m.cls}" data-v="${v}" data-act="selVerse" tabindex="0" dir="${dir}" lang="${lang}"><sup>${v}</sup>${words}${m.badge}</p>`;
  }).join('');
}
/** Word-by-word table for a single verse (used in the verse sheet). */
export function verseTable(b, ws) {
  return `<div class="wtab" dir="ltr">${ws.map((w, j) => `<button class="wrow${w[5] && w[5] !== 'q' && w[5] !== 't' ? ' ow-' + w[5] : ''}" data-act="ow" data-v="*" data-i="${j}"><span class="o" lang="${langAttr(b)}" dir="${dirOf(b)}">${esc(w[0])}</span><span class="t">${esc(w[1])}</span><span class="g">${glossHTML(w[2])}</span><span class="s">${esc(simple(w[3]))}</span></button>`).join('')}</div>`;
}
function occurrences(row, limit = 40) {
  const refs = row[6] || [], all = row[4] <= 40;
  const list = refs.slice(0, limit).map(r => `<a class="pill" href="${refHref(r)}">${esc(refLabel(r))}</a>`).join('');
  return `<p class="kicker mt">${all ? (row[4] === 1 ? 'Its only occurrence' : `All ${row[4]} occurrences`) : 'A few places it appears'}</p><div class="words">${list}</div>`;
}
/** The full card for one tapped word. lex = lexicon map for the testament. */
export function wordCard(b, w, lex) {
  const row = lex && lex[w[3]] || null, sn = simple(w[3]), dir = dirOf(b), lang = langAttr(b);
  const cur = curated(w[3]);
  const parse = parseMorph(w, b);
  const first = row ? row[5] : '';
  const rarity = row ? (row[4] === 1 ? '<span class="tag gold">appears once in the entire text</span>' : row[4] <= 5 ? `<span class="tag gold">rare · ${row[4]} uses</span>` : '') : '';
  return `<div class="wcard">
    <div class="wc-top"><div class="wc-o" dir="${dir}" lang="${lang}">${esc(w[0].replace(/[\s·.,;]+$/, ''))}</div><div class="wc-m"><div class="wc-t">${esc(w[1])}</div><div class="wc-g">“${esc(glossText(w[2]))}” <span class="faint">in this verse</span></div></div></div>
    <div class="row" style="gap:6px;margin:8px 0">${sn ? `<span class="tag">${esc(sn)}</span>` : ''}<span class="tag">${langOf(b)}</span>${rarity}${w[5] && FLAG_NOTE[w[5]] ? `<span class="tag">${{ q: 'Qere', t: 'psalm heading', k: 'KJV text only', n: 'not in KJV text', v: 'KJV differs', o: 'other editions' }[w[5]]}</span>` : ''}</div>
    ${parse ? `<p class="small mb0"><b>Grammar.</b> ${esc(parse)}</p>` : ''}
    ${w[5] && FLAG_NOTE[w[5]] ? `<p class="small muted mt">${esc(FLAG_NOTE[w[5]])}${w[6] ? ' <span class="faint">Editions: ' + esc(w[6]) + '</span>' : ''}</p>` : ''}
    ${row ? `<div class="wc-lex"><div class="kicker">Dictionary form</div><p class="mb0"><span class="wc-l" dir="${dir}" lang="${lang}">${esc(row[0])}</span> <span class="faint">${esc(row[1])}</span> · <b>${esc(row[2])}</b></p>${row[3] ? `<p class="small muted mt mb0">${esc(cleanDef(row[3], 260))}</p>` : ''}<p class="small muted mt mb0">Occurs <b>${row[4].toLocaleString()}×</b> in the ${isNT(b) ? 'Greek New Testament' : 'Hebrew Bible'}${first ? `; first in <a href="${refHref(first)}">${esc(refLabel(first))}</a>` : ''}.</p></div>` : ''}
    ${cur ? `<div class="wc-note"><div class="kicker">Why it matters</div><p class="mb0">${plain(cur)}</p></div>` : ''}
    ${row ? occurrences(row) : ''}
  </div>`;
}
/** compact lemma card for the daily "In the original" section */
export function lemmaCard(b, lemId, row, stats) {
  const cur = curated(lemId), sn = simple(lemId), dir = dirOf(b), lang = langAttr(b);
  const first = row[5];
  return `<div class="lcard"><div class="lc-h"><span class="lc-o" dir="${dir}" lang="${lang}">${esc(row[0])}</span><span class="lc-t">${esc(row[1])}</span><span class="tag">${esc(sn)}</span></div>
  <div class="lc-g"><b>${esc(row[2])}</b>${stats ? ` <span class="faint">· ${stats}</span>` : ''}</div>
  ${cur ? `<p class="lc-n">${plain(cur)}</p>` : row[3] ? `<p class="lc-d">${esc(cleanDef(row[3]))}</p>` : ''}
  <div class="lc-f faint">${row[4].toLocaleString()}× in the ${isNT(b) ? 'Greek NT' : 'Hebrew Bible'}${first ? ` · first: <a href="${refHref(first)}">${esc(refLabel(first))}</a>` : ''}${row[4] <= 40 ? ` · <a href="#/word/${encodeURIComponent(lemId)}">all uses</a>` : ''}</div></div>`;
}
export { FLAG_NOTE, dirOf, langAttr };
