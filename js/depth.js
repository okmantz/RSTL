/* The depth engine for daily studies.
 * Everything here is computed from real data that ships with the app: the three English translations, the Hebrew/Greek word data,
 * the lexicons and the cross-reference table. Nothing is templated prose.
 *  - key words (curated notes first, then distinctive repeated words)
 *  - words that occur only once in the whole text, and words appearing here for the first time
 *  - where a repeated word falls across the passage
 *  - where the three translations split most, with the differing words marked
 *  - the cross-reference web, with a "connect two" exercise
 *  - pick-the-verse exercises
 */
import { S, save } from './store.js';
import * as B from './bible.js';
import * as O from './orig.js';
import { esc, $, $$, debounce } from './util.js';
import { toast } from './ui.js';

const MAXV = 45;
let VERSES = [];
/* ---------- scope: which verses does this study cover? ---------- */
export function scopeOf(u) {
  const segs = [];
  if (u.gen) { for (let c = u.c1; c <= u.c2; c++) segs.push({ b: u.b, c, v1: 1, v2: 999 }); return segs; }
  for (const r of (u.ref || []).slice(0, 3)) {
    const p = B.parseRef(r); if (!p) continue;
    if (p.v) segs.push({ b: p.b, c: p.c, v1: p.v, v2: p.ve || p.v });
    else if (p.c2) for (let c = p.c; c <= Math.min(p.c2, p.c + 3); c++) segs.push({ b: p.b, c, v1: 1, v2: 30 });
    else segs.push({ b: p.b, c: p.c, v1: 1, v2: 30 });
  }
  return segs;
}
const cache = new Map();
/** Loads text + original words for every verse in scope. */
export async function loadScope(u, key) {
  if (cache.has(key)) return cache.get(key);
  const segs = scopeOf(u), out = [];
  for (const s of segs) {
    const ap = B.META[s.b].t === 'AP';
    const en = {};
    for (const t of ap ? ['kjv'] : Object.keys(B.TRANS)) en[t] = await B.chapter(t, s.b, s.c);
    let ws = null;
    if (O.hasOrig(s.b)) { try { ws = await O.chapterOrig(s.b, s.c); } catch (e) { ws = null; } }
    const n = (en.kjv || en.bsb || []).length;
    for (let v = s.v1; v <= Math.min(s.v2, n) && out.length < MAXV * 3; v++) out.push({ b: s.b, c: s.c, v, en: Object.fromEntries(Object.entries(en).map(([t, a]) => [t, a[v - 1] || ''])), ws: ws ? ws[v - 1] || [] : null });
  }
  const res = { segs, verses: out, b: segs[0]?.b ?? u.b };
  cache.set(key, res); if (cache.size > 6) cache.delete(cache.keys().next().value);
  return res;
}
const refTxt = v => B.label(v.b, v.c, v.v);

/* ---------- key words ---------- */
const NEVER = new Set(['H0430', 'H3068', 'H0559', 'H1961', 'H0935', 'H5414', 'H6213', 'H3947', 'H1121', 'H3478', 'H3027', 'G2316', 'G3004', 'G1510', 'G2424', 'G5547', 'G2192', 'G1096', 'G2064', 'G3956', 'G4160', 'G0846', 'G3588']);
const base = id => (id || '').slice(0, 5);
function stats(verses, b, lex) {
  const m = new Map(); const TOK = O.isNT(b) ? O.TOKENS.g : O.TOKENS.h;
  verses.forEach((v, vi) => (v.ws || []).forEach(w => {
    const id = w[3]; if (!id || !lex[id] || w[5] === 't') return;
    if (O.isFunction(w, b) || NEVER.has(base(id))) return;
    let e = m.get(id); if (!e) { e = { id, n: 0, vs: [], w, row: lex[id], proper: O.isProper(w, b) }; m.set(id, e); }
    e.n++; e.vs.push(vi);
  }));
  const list = [...m.values()].map(e => {
    const idf = Math.max(0, Math.log(TOK / (e.row[4] + 1)) - 2.2);
    const cur = O.curated(e.id) ? 2.4 : 1;
    return { ...e, score: (e.n >= 2 ? e.n : 0.7) * idf * cur * (e.proper ? 0.15 : 1) };
  });
  return list;
}
const gl = w => w[2].replace(/^[<\[]|[>\]]$/g, '');
function sparkHTML(e, verses) {
  const per = verses.map(() => 0); e.vs.forEach(i => per[i]++);
  const max = Math.max(...per);
  return `<div class="spark" role="img" aria-label="Where ${esc(e.row[2])} falls in the passage">${per.map((n, i) => `<i style="height:${n ? 18 + Math.round(n / max * 30) : 3}px" class="${n ? 'on' : ''}" title="${esc(refTxt(verses[i]))}${n ? ': ' + n + '×' : ''}"></i>`).join('')}</div><div class="spark-l"><span>${esc(refTxt(verses[0]))}</span><span>${esc(refTxt(verses[verses.length - 1]))}</span></div>`;
}
export async function originalHTML(u, key) {
  const sc = await loadScope(u, key), b = sc.b;
  if (!O.hasOrig(b)) return `<p class="muted small">The Apocrypha survives mostly in Greek (with some Hebrew and Aramaic fragments), and its manuscripts differ from one another in ways that need a specialist apparatus. This app’s original-text data covers the 66 books of the Protestant canon. The translation section below still applies.</p>`;
  const lex = await O.lexicon(b), L = O.langOf(b);
  const vs = sc.verses.filter(v => v.ws && v.ws.length);
  if (!vs.length) return `<p class="muted small">Original-language data didn’t load. Open the passage in the reader and choose <b>Original</b>.</p>`;
  const st = stats(vs, b, lex);
  const picked = [...st].sort((a, c) => c.score - a.score).filter(e => e.score > 0).slice(0, 5);
  const cards = picked.map(e => O.lemmaCard(b, e.id, e.row, `${e.n}× here`)).join('');
  const hapax = st.filter(e => e.row[4] === 1 && !e.proper).slice(0, 5);
  const firsts = st.filter(e => !e.proper && e.row[4] >= 8 && e.row[5] && O.refOf(e.row[5]).b === b && sc.verses.some(v => O.refLabel(e.row[5]) === refTxt(v))).sort((a, c) => c.row[4] - a.row[4]).slice(0, 3);
  const lw = [...st].filter(e => e.n >= 3 && !e.proper).sort((a, c) => c.n - a.n || c.score - a.score)[0];
  const chip = e => `<span class="pill hx" title="${esc(e.row[3] || '')}"><span class="${O.isNT(b) ? '' : 'he'}" lang="${O.isNT(b) ? 'grc' : 'he'}" dir="${O.isNT(b) ? 'ltr' : 'rtl'}">${esc(e.row[0])}</span> ${esc(e.row[2])} <a class="faint" href="#/read/${vs[e.vs[0]].b}/${vs[e.vs[0]].c}?v=${vs[e.vs[0]].v}&m=inter">${esc(refTxt(vs[e.vs[0]]))}</a></span>`;
  const first = sc.segs[0], href = `#/read/${first.b}/${first.c}?m=inter${first.v1 > 1 ? '&v=' + first.v1 : ''}`;
  return `<p class="small muted">${L} text: ${O.isNT(b) ? 'the Greek New Testament, with differences between the modern critical text and the text behind the KJV marked' : 'the Leningrad Codex (Masoretic Text), with scribal readings marked'}. Words below are chosen by how distinctive they are in this passage, not by how common they are in English. <a href="${href}">Read it in ${L} →</a></p>
  ${cards ? `<div class="lgrid">${cards}</div>` : '<p class="muted small">No strongly distinctive words in this passage.</p>'}
  ${lw ? `<div class="kicker mt">Where “${esc(lw.row[2])}” falls · ${lw.n}×</div>${sparkHTML(lw, vs)}<p class="tiny faint">A repeated word is an author steering you. Notice where it clusters and where it goes quiet.</p>` : ''}
  ${hapax.length ? `<div class="kicker mt">Words that occur only here in the entire ${O.isNT(b) ? 'Greek New Testament' : 'Hebrew Bible'}</div><div class="words">${hapax.map(chip).join('')}</div><p class="tiny faint">A word with one occurrence has no parallels to compare. Translators guess from related languages and context, so check how different translations handle it.</p>` : ''}
  ${firsts.length ? `<div class="kicker mt">First appearance</div><div class="words">${firsts.map(e => `<span class="pill hx"><span class="${O.isNT(b) ? '' : 'he'}" lang="${O.isNT(b) ? 'grc' : 'he'}" dir="${O.isNT(b) ? 'ltr' : 'rtl'}">${esc(e.row[0])}</span> ${esc(e.row[2])} <span class="faint">×${e.row[4]} later</span></span>`).join('')}</div><p class="tiny faint">The first time a word enters ${O.isNT(b) ? 'the New Testament' : 'the Bible'} sets the associations every later use inherits.</p>` : ''}`;
}

/* ---------- translations ---------- */
const ARCH = { thee: 'you', thou: 'you', thy: 'your', thine: 'your', ye: 'you', hath: 'has', hast: 'have', doth: 'does', dost: 'do', unto: 'to', saith: 'says', shalt: 'shall', wilt: 'will', art: 'are', wast: 'was', wert: 'were', cometh: 'comes', goeth: 'goes', saying: 'say', said: 'say', spake: 'spoke', whom: 'who', whosoever: 'whoever', lo: 'behold', behold: 'behold', yea: 'yes', nay: 'no', wherefore: 'why', whither: 'where', thence: 'there', hither: 'here' };
const STOP = new Set('the a an of and to in that he his it is for with as on be by but not they them this which will shall have has was are were from you your their him her i my me we us our all so if then there had do does did at or no who what when also upon into than those these'.split(' '));
const toks = t => t.toLowerCase().replace(/[^a-z\s'’-]/g, ' ').split(/\s+/).map(w => w.replace(/['’]s$/, '')).map(w => ARCH[w] || w).filter(w => w && w.length > 1 && !STOP.has(w));
const jac = (a, c) => { const A = new Set(a), C = new Set(c); let i = 0; A.forEach(x => { if (C.has(x)) i++; }); return (A.size + C.size - i) ? i / (A.size + C.size - i) : 1; };
export async function splitHTML(u, key) {
  const sc = await loadScope(u, key);
  if (B.META[sc.b].t === 'AP') return `<p class="muted small">The Apocrypha is available here only in the KJV, so there is nothing to compare.</p>`;
  const rows = sc.verses.map((v, i) => { const T = Object.keys(v.en).map(t => toks(v.en[t])); if (T.some(x => x.length < 4)) return null; const sim = (jac(T[0], T[1]) + jac(T[0], T[2]) + jac(T[1], T[2])) / 3; return { v, i, T, sim }; }).filter(Boolean);
  if (!rows.length) return `<p class="muted small">The three translations agree closely across this passage.</p>`;
  const top = rows.sort((a, c) => a.sim - c.sim).slice(0, 2).sort((a, c) => a.i - c.i);
  const ids = Object.keys(B.TRANS), tr = (S.units[key]?.tr) || {};
  const html = top.map(r => {
    const sets = r.T.map(a => new Set(a));
    const row = ids.map((t, k) => {
      const other = new Set([...sets.filter((_, j) => j !== k).flatMap(x => [...x])]);
      const marked = esc(r.v.en[t]).replace(/[A-Za-z][A-Za-z’'-]*/g, w => { const n = toks(w)[0]; return n && !other.has(n) ? `<mark>${w}</mark>` : w; });
      return `<div class="split-r"><b>${B.TRANS[t].short}</b><span>${marked}</span><button class="pill ${tr[r.v.v] === t ? 'on' : ''}" data-act="trpick" data-k="${esc(key)}" data-v="${r.v.v}" data-t="${t}">I’d defend this</button></div>`;
    }).join('');
    const ori = O.hasOrig(r.v.b) ? ` <a href="#/read/${r.v.b}/${r.v.c}?v=${r.v.v}&m=inter">See the ${O.langOf(r.v.b)} →</a>` : '';
    return `<div class="split"><div class="between"><b class="kicker">${esc(refTxt(r.v))}</b><span class="tiny faint">${Math.round((1 - r.sim) * 100)}% of the content words differ</span></div>${row}<p class="tiny faint mb0">Highlighted words appear in only one rendering.${ori}</p></div>`;
  }).join('');
  return `<p class="small muted">These are the verses where the BSB, KJV and ASV disagree most once old-fashioned wording is set aside. Disagreements like these are where translators made interpretive decisions. Choose the rendering you would defend, then check the original.</p>${html}`;
}

/* ---------- cross-reference web ---------- */
export async function webHTML(u, key) {
  const sc = await loadScope(u, key), b = sc.b;
  if (b > 65) return `<p class="muted small">Cross-reference data covers the 66 canonical books.</p>`;
  const xr = await B.xrefs(b), seen = new Map();
  const inScope = (c, v) => sc.verses.some(x => x.c === c && x.v === v);
  for (const [k, flat] of Object.entries(xr)) {
    const [c, v] = k.split('.').map(Number); if (!inScope(c, v)) continue;
    B.unpack(flat).forEach(x => { if (x.b === b && sc.verses.some(s => s.c === x.c && s.v === x.v)) return; const kk = x.b + '.' + x.c + '.' + x.v; const o = seen.get(kk); if (!o || x.w > o.w) seen.set(kk, { ...x, from: k }); });
  }
  const pool = [...seen.values()].sort((a, c) => c.w - a.w);
  if (!pool.length) return '<p class="muted small">No strong cross-references from this passage in the data.</p>';
  // strongest, plus the furthest jump across the canon so the set is not all neighbours
  const top = pool.slice(0, 5);
  const far = pool.find(x => Math.abs(x.b - b) > 20 && !top.includes(x)); if (far) top.push(far);
  const th = S.units[key]?.thread || {};
  const rows = [];
  for (const x of top) {
    const id = x.b + '.' + x.c + '.' + x.v, txt = await B.snippet(S.profile.trans, x, 190);
    rows.push(`<div class="xl ${th.a === id || th.b === id ? 'sel' : ''}" data-id="${id}"><a class="xl-main" href="#/read/${x.b}/${x.c}?v=${x.v}"><div class="r"><span>${esc(B.label(x.b, x.c, x.v, x.ve))}</span><span class="faint">${x.w} votes</span></div><div class="t">${esc(txt)}</div></a><button class="pill sm" data-act="xpick" data-k="${esc(key)}" data-id="${id}">${th.a === id || th.b === id ? 'Chosen' : 'Connect'}</button></div>`);
  }
  return `<p class="small muted">Readers have linked these passages to today’s text${far ? '; the last may be a long jump across the canon' : ''}. <b>Choose two</b> that seem unrelated and write what they are doing in the same conversation.</p>${rows.join('')}<div id="thread-box" ${th.a && th.b ? '' : 'hidden'}><label class="flabel" for="thread-t">What links them?</label><textarea id="thread-t" data-tk="${esc(key)}" placeholder="One honest sentence is enough. What does each passage change about the other?">${esc(th.t || '')}</textarea></div>`;
}

/* ---------- pick the verse ---------- */
export async function pickHTML(u, key) {
  const sc = await loadScope(u, key), vs = sc.verses.slice(0, MAXV);
  if (vs.length < 3) return '';
  const pk = S.units[key]?.pk || {};
  const row = (kind, title) => `<div class="pickrow"><b>${title}</b><div class="chipsel">${vs.map((v, i) => `<button class="pill sm ${pk[kind] === i ? 'on' : ''}" data-act="pickv" data-k="${esc(key)}" data-kind="${kind}" data-i="${i}" title="${esc(v.en.bsb || v.en.kjv).slice(0, 80)}">${v.v}</button>`).join('')}</div><p class="pick-t small" id="pk-${kind}">${pk[kind] !== undefined && vs[pk[kind]] ? `<b>${esc(refTxt(vs[pk[kind]]))}.</b> ${esc(vs[pk[kind]].en[S.profile.trans] || vs[pk[kind]].en.kjv)}` : ''}</p></div>`;
  return `<p class="small muted">Two choices, no right answers. Tap a verse number to choose it (hover or long-press to preview).</p>${row('hold', 'The verse that carries the weight')}${row('hard', 'The verse you would most want to argue with')}<label class="flabel" for="pk-why">Why these two?</label><textarea id="pk-why" data-pk="${esc(key)}" placeholder="What would be lost if the first were removed? What would the author say to the second?">${esc(pk.why || '')}</textarea>`;
}
export function wireDepth(key, verses) {
  $$('textarea[data-tk]').forEach(t => t.addEventListener('input', debounce(() => { ((S.units[key] ||= {}).thread ||= {}).t = t.value; save(); }, 400)));
  $$('textarea[data-pk]').forEach(t => t.addEventListener('input', debounce(() => { ((S.units[key] ||= {}).pk ||= {}).why = t.value; save(); }, 400)));
  VERSES = verses;
}
export const depthActions = {
  trpick(el) {
    const k = el.dataset.k, v = el.dataset.v; const st = ((S.units[k] ||= {}).tr ||= {});
    st[v] = st[v] === el.dataset.t ? undefined : el.dataset.t; save();
    el.closest('.split').querySelectorAll('button[data-act=trpick]').forEach(b => b.classList.toggle('on', st[v] === b.dataset.t));
  },
  xpick(el) {
    const k = el.dataset.k, id = el.dataset.id; const th = ((S.units[k] ||= {}).thread ||= {});
    if (th.a === id) th.a = th.b, th.b = undefined; else if (th.b === id) th.b = undefined;
    else if (!th.a) th.a = id; else if (!th.b) th.b = id; else { th.a = th.b; th.b = id; }
    save();
    $$('.xl').forEach(x => { const on = x.dataset.id === th.a || x.dataset.id === th.b; x.classList.toggle('sel', on); const bt = x.querySelector('button'); if (bt) bt.textContent = on ? 'Chosen' : 'Connect'; });
    const bx = $('#thread-box'); if (bx) bx.hidden = !(th.a && th.b);
  },
  pickv(el) {
    const k = el.dataset.k, kind = el.dataset.kind, i = +el.dataset.i; const pk = ((S.units[k] ||= {}).pk ||= {});
    pk[kind] = pk[kind] === i ? undefined : i; save();
    el.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.i === pk[kind]));
    const v = VERSES[i], p = $('#pk-' + kind);
    if (p) p.innerHTML = pk[kind] === undefined || !v ? '' : `<b>${esc(refTxt(v))}.</b> ${esc(v.en[S.profile.trans] || v.en.kjv)}`;
  }
};
