import { S, save, addXP, key, markActive } from '../store.js';
import { ic } from '../icons.js';
import * as B from '../bible.js';
import { drawArcs, wireArcs } from '../arcs.js';
import { ctx } from '../ctx.js';
import { esc, $, $$, bookColor, debounce } from '../util.js';
import { toast, md, loading } from '../ui.js';
import { checkAch } from '../ach.js';
import HARD from '../../content/hardnotes.js';
import BOOKS from '../../content/books.js';
import { PROV } from '../../content/banks.js';
import { respondHTML, wireRespond } from '../respond.js';
import * as O from '../orig.js';

let HN = null;
const hardMap = () => {
  if (HN) return HN; HN = {};
  HARD.forEach(([ref, title, text]) => { const p = B.parseRef(ref); if (p) (HN[`${p.b}.${p.c}.${p.v || 1}`] ||= []).push({ title, text, ref }); });
  return HN;
};
let cur = null; // {b,c,verses,xr,trans,sel,ws,lex,mode}
const MODES = [['eng', 'English'], ['orig', 'Original'], ['inter', 'Word by word'], ['par', 'Parallel']];
const SEC = ['Torah', 'History', 'Wisdom & Poetry', 'Prophets'];

/* ---------- library ---------- */
export async function libView() {
  const read = {}; Object.keys(S.read).forEach(k => { const b = +k.split('.')[0]; read[b] = (read[b] || 0) + 1; });
  const card = m => `<a class="bk" style="--c:${bookColor(m.i)}" href="#/read/${m.i}"><b>${esc(m.n)}</b><small>${m.v.length} ch${read[m.i] ? ' · ' + read[m.i] + ' read' : ''}</small><i style="width:${Math.round(((read[m.i] || 0) / m.v.length) * 100)}%"></i></a>`;
  const grp = (t, a, z) => `<div class="sec-h"><h2>${t}</h2></div><div class="bookgrid">${B.META.slice(a, z).map(card).join('')}</div>`;
  const last = S.last;
  const html = `<div class="between"><h1 style="margin:0">Read</h1><a class="btn sm" href="#/search">${'Search the text'}</a></div>
  <form id="goto" class="row mt"><input type="search" id="goto-q" placeholder="Go to… (e.g. John 3:16, Ps 88, 1 Cor 15)" aria-label="Go to reference" style="flex:1;min-width:200px"><button class="btn pri">Go</button></form>
  ${last ? `<a class="card mt glow" href="#/read/${last.b}/${last.c}" style="display:block"><div class="kicker">Continue</div><b style="font-family:var(--serif);font-size:1.2rem">${esc(B.label(last.b, last.c))}</b></a>` : ''}
  <div class="rainbow-rule mt"></div>
  ${grp('Old Testament', 0, 39)}${grp('New Testament', 39, 66)}${grp('Apocrypha / Deuterocanon <span class="tag">KJV</span>', 66, 80)}
  <p class="small faint mt2">Translations: Berean Standard Bible, King James Version (with Apocrypha), American Standard Version — all public domain. Cross-references: OpenBible.info (CC-BY).</p>`;
  const after = () => {
    $('#goto').addEventListener('submit', e => { e.preventDefault(); const p = B.parseRef($('#goto-q').value); if (p) location.hash = `#/read/${p.b}/${p.c}${p.v ? '?v=' + p.v : ''}`; else toast('Couldn’t read that reference — try “John 3:16”.'); });
  };
  return { html, after };
}
export async function bookView({ p1 }) {
  const b = +p1; const m = B.META[b]; if (!m) return { html: '<p>Unknown book.</p>' };
  const read = Object.keys(S.read).filter(k => k.startsWith(b + '.'));
  const g = BOOKS[b];
  const html = `<div class="narrow"><a href="#/read" class="small">← All books</a><h1 style="margin-top:8px">${esc(m.n)}</h1>
  <div class="bar thin"><i style="width:${Math.round(read.length / m.v.length * 100)}%"></i></div><p class="small muted">${read.length} of ${m.v.length} chapters read</p>
  ${g ? `<div class="card mt"><div class="kicker">Book guide</div><p class="small muted" style="margin-bottom:8px"><b>When & who:</b> ${md(g[1])}</p><p class="small muted" style="margin-bottom:8px"><b>Genre:</b> ${esc(g[2])}</p><p style="font-family:var(--serif)">${md(g[3])}</p><p class="small"><b class="kicker" style="display:block;margin-bottom:2px">The hard question</b>${md(g[4])}</p></div>` : ''}
  <div class="chgrid mt" style="--c:${bookColor(b)}">${m.v.map((_, i) => `<a class="ch ${S.read[b + '.' + (i + 1)] ? 'r' : ''}" href="#/read/${b}/${i + 1}">${i + 1}</a>`).join('')}</div></div>`;
  return { html };
}

/* ---------- reader ---------- */
export async function view({ p1, p2, q }) {
  const b = +p1; let c = +p2; const m = B.META[b];
  if (!m) return { html: '<p>Unknown book.</p>' };
  if (c < 1 || c > m.v.length || isNaN(c)) { location.hash = `#/read/${b}/1`; return { html: '' }; }
  const pref = S.profile.trans, trans = B.transFor(b, pref);
  const wantM = q && MODES.some(x => x[0] === q.m) ? q.m : (MODES.some(x => x[0] === S.profile.rmode) ? S.profile.rmode : 'eng');
  const canO = O.hasOrig(b);
  const [verses, xr, ws, lex] = await Promise.all([B.chapter(trans, b, c), B.xrefs(b), canO ? O.chapterOrig(b, c).catch(() => null) : null, canO ? O.lexicon(b).catch(() => null) : null]);
  const mode = canO && ws ? wantM : 'eng';
  cur = { b, c, verses, xr, trans, sel: null, started: Date.now(), ws, lex, mode };
  S.last = { b, c }; save();
  const hm = hardMap();
  const metaFor = v => {
    const k = key(b, c, v), n = (xr[`${c}.${v}`] || []).length / 5, hn = hm[`${b}.${c}.${v}`];
    const note = S.notes[k]?.t, bm = S.bm[k];
    return { cls: S.hl[k] ? ' hl-' + S.hl[k] : '', badge: `<span class="badge">${n ? `<b title="${n} connections">${n}</b>` : ''}${hn ? `<b class="flag" title="Challenge note">${ic('flag')}</b>` : ''}${note ? `<b title="You wrote a note">${ic('pen')}</b>` : ''}${bm ? `<b title="Bookmarked">${ic('bookmark')}</b>` : ''}</span>` };
  };
  const vHTML = mode !== 'eng'
    ? O.chapterHTML(b, ws, mode, verses, metaFor, 1, 'ow', c)
    : verses.map((t, i) => { const v = i + 1, m = metaFor(v); return `<p class="v${m.cls}" data-v="${v}" data-act="selVerse" tabindex="0"><sup>${v}</sup>${esc(t)}${m.badge}</p>`; }).join('');
  const prev = c > 1 ? `#/read/${b}/${c - 1}` : b > 0 ? `#/read/${b - 1}/${B.META[b - 1].v.length}` : null;
  const next = c < m.v.length ? `#/read/${b}/${c + 1}` : b < 79 ? `#/read/${b + 1}/1` : null;
  const isRead = !!S.read[`${b}.${c}`];
  const html = `
  <div class="reader-top">
    <div class="rt-row">
      <a class="btn sm ghost" href="#/read/${b}">${esc(m.n)} ${ic('chevron')}</a>
      <select id="chsel" aria-label="Chapter">${m.v.map((_, i) => `<option value="${i + 1}" ${i + 1 === c ? 'selected' : ''}>Chapter ${i + 1}</option>`).join('')}</select>
    </div>
    <div class="rt-row rt-tools">
      <div class="seg trans" role="group" aria-label="Translation">${Object.values(B.TRANS).map(t => `<button class="${t.id === trans ? 'on' : ''}" aria-pressed="${t.id === trans}" data-act="trans" data-t="${t.id}" title="${esc(t.name)}">${t.short}</button>`).join('')}</div>
      <div class="rt-size"><button class="icon-btn" data-act="fs" data-d="-1" aria-label="Smaller text">A−</button><button class="icon-btn" data-act="fs" data-d="1" aria-label="Larger text">A+</button></div>
    </div>
    ${canO && ws ? `<div class="seg full" role="tablist" aria-label="Text view">${MODES.map(([id, n]) => `<button role="tab" aria-selected="${mode === id}" class="${mode === id ? 'on' : ''}" data-act="rmode" data-m="${id}">${id === 'orig' ? O.langOf(b) : n}</button>`).join('')}</div>` : ''}
  </div>
  <h1 class="reader-title">${esc(m.n)} ${m.v.length > 1 ? c : ''}</h1>
  <p class="small faint">${esc(B.TRANS[trans].name)}${trans !== pref ? ' — the Apocrypha is only available in the KJV' : ''} · tap any verse for its connections${mode !== 'eng' ? ` · tap a ${O.langOf(b)} word for its meaning` : ''}</p>
  ${mode !== 'eng' ? `<p class="tiny faint orig-credit">${O.isNT(b) ? 'Greek: STEPBible TAGNT (Tyndale House), the modern critical text with Textus Receptus variants marked' : 'Hebrew: STEPBible TAHOT (Tyndale House), the Leningrad Codex'} · CC BY 4.0. Verse numbering follows the English text.${mode === 'inter' ? ' Faint words have no English counterpart; italic words are supplied in English.' : ''}</p>` : ''}
  ${b < 66 ? `<div class="arcwrap"><canvas id="arcs" aria-label="Rainbow cross-reference arcs for this chapter"></canvas><div class="cap"><span id="arc-cap">Every arc is a cross-reference from this chapter. Tap one to jump.</span><span class="nw">Genesis ⟶ Revelation</span></div></div>` : `<div class="callout mt">Cross-reference data covers the 66 canonical books. Apocrypha chapters can still be read, highlighted and annotated.</div>`}
  <div class="scripture mt${mode !== 'eng' ? ' orig-on orig-' + mode : ''}" id="verses">${vHTML}</div>
  <div class="between mt2"><div class="row">${prev ? `<a class="btn" href="${prev}">← Previous</a>` : ''}</div><button class="btn ${isRead ? '' : 'pri'}" id="mark" data-act="markRead">${isRead ? ic('check') + ' Read' : 'Mark chapter read'}</button><div class="row">${next ? `<a class="btn" href="${next}">Next →</a>` : ''}</div></div>
  <div id="sentinel" style="height:1px"></div>
  <div class="sheet" id="sheet" role="dialog" aria-label="Verse tools"><div class="sheet-grip"></div><div class="sheet-h"><h3 id="sh-title">Verse</h3><button class="icon-btn" data-act="closeSheet" aria-label="Close">${ic('x')}</button></div><div class="sheet-tabs" id="sh-tabs"></div><div class="sheet-b" id="sh-body"></div></div>`;
  const after = () => {
    ctx.cleanup.push(() => document.body.classList.remove('sheet-open'));
    $('#chsel').addEventListener('change', e => { location.hash = `#/read/${b}/${e.target.value}`; });
    if (b < 66) { drawChapterArcs(null); ctx.resize.push(() => drawChapterArcs(cur.sel)); }
    // auto-mark read after dwell + reaching the end
    const sent = $('#sentinel'); let seen = false;
    if ('IntersectionObserver' in window && !isRead) {
      const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { seen = true; setTimeout(() => { if (cur && cur.b === b && cur.c === c && seen) markRead(true); }, Math.max(0, 9000 - (Date.now() - cur.started))); } else seen = false; });
      io.observe(sent); ctx.cleanup.push(() => io.disconnect());
    }
    const qv = q && q.v ? +q.v : 0;
    if (qv) { const el = $(`.v[data-v="${qv}"]`); if (el) { selectVerse(qv); setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 80); } }
  };
  return { html, after };
}
function setSheetOpen(on) {
  document.body.classList.toggle('sheet-open', !!on);
  window.dispatchEvent(new Event('resize'));   // redraw arcs for the new content width
}
let arcModel = null;
function drawChapterArcs(v) {
  const canvas = $('#arcs'); if (!canvas || !cur) return;
  const { b, c, xr } = cur; const agg = new Map();
  const consider = (flat) => B.unpack(flat).forEach(x => { const g = B.gIndex(x.b, x.c); agg.set(g, (agg.get(g) || 0) + x.w); });
  if (v) consider(xr[`${c}.${v}`] || []); else Object.keys(xr).forEach(k => { if (k.startsWith(c + '.')) consider(xr[k]); });
  const items = [...agg.entries()].map(([g, w]) => ({ g, w }));
  arcModel = drawArcs(canvas, { from: B.gIndex(b, c), items });
  const cap = $('#arc-cap');
  if (cap) cap.textContent = items.length ? `${items.length} chapters connect ${v ? 'to verse ' + v : 'to this chapter'}. Tap an arc’s end to jump there.` : 'No cross-references recorded here.';
  if (!canvas.dataset.wired) { canvas.dataset.wired = 1; wireArcs(canvas, () => arcModel, (bb, cc) => { S.stats.xrefs++; save(); checkAch(); location.hash = `#/read/${bb}/${cc}`; }); }
}
function markRead(auto) {
  if (!cur) return; const k = `${cur.b}.${cur.c}`;
  if (S.read[k]) return; S.read[k] = Date.now(); save();
  addXP(5, 'chapter read'); markActive(); checkAch();
  const btn = $('#mark'); if (btn) { btn.innerHTML = ic('check') + ' Read'; btn.classList.remove('pri'); }
  window.dispatchEvent(new Event('app:plans'));
}
/* ---------- verse sheet ---------- */
function selectVerse(v) {
  if (!cur) return; if (cur.sel !== v) cur.word = null; cur.sel = v;
  $$('#verses .v').forEach(p => p.classList.toggle('sel', +p.dataset.v === v));
  history.replaceState(null, '', `#/read/${cur.b}/${cur.c}?v=${v}`);
  drawChapterArcs(v); openSheet('conn');
}
let tab = 'conn', sort = 'votes';
function openSheet(t) {
  tab = t || tab; const sh = $('#sheet'); sh.classList.add('open'); setSheetOpen(true);
  const { b, c, sel } = cur; const hm = hardMap()[`${b}.${c}.${sel}`];
  $('#sh-title').textContent = B.label(b, c, sel);
  $('#sh-tabs').innerHTML = [['conn', 'Connections'], ...(cur.ws ? [['orig', O.langOf(b)]] : []), ...(cur.word ? [['word', 'Word']] : []), ['note', 'Note & mark'], ['resp', 'Respond'], ...(hm ? [['hard', 'Challenge']] : []), ['cmp', 'Compare']].map(([id, n]) => `<button class="pill ${tab === id ? 'on' : ''}" data-act="sheetTab" data-t="${id}">${n}</button>`).join('');
  const body = $('#sh-body');
  if (tab === 'conn') renderConns(body);
  else if (tab === 'note') renderNote(body);
  else if (tab === 'resp') renderResp(body);
  else if (tab === 'orig') renderOrig(body);
  else if (tab === 'word') renderWord(body);
  else if (tab === 'hard') body.innerHTML = (hm || []).map(h => `<div class="hardnote"><b>${esc(h.title)}</b>${md(h.text)}</div>`).join('');
  else renderCompare(body);
}
async function renderConns(body) {
  const { b, c, sel, xr, trans } = cur;
  let list = B.unpack(xr[`${c}.${sel}`] || []);
  if (!list.length) { body.innerHTML = `<p class="muted">No recorded cross-references for this verse. Try a neighbouring verse — connections cluster around key statements.</p>`; return; }
  if (sort === 'canon') list = [...list].sort((p, q) => (p.b - q.b) || (p.c - q.c) || (p.v - q.v));
  const shown = list.slice(0, 40);
  body.innerHTML = `<div class="row" style="margin-bottom:10px"><span class="small muted">${list.length} connections</span><span class="sp"></span><div class="seg sm" role="group" aria-label="Sort connections"><button class="${sort === 'votes' ? 'on' : ''}" data-act="sort" data-s="votes">Strongest</button><button class="${sort === 'canon' ? 'on' : ''}" data-act="sort" data-s="canon">In order</button></div></div><div id="xlist">${loading('Gathering texts…')}</div>`;
  const rows = await Promise.all(shown.map(async x => { const t = await B.snippet(trans, x, 220); return `<a class="xcard" data-act="xopen" style="--c:${bookColor(x.b)}" href="#/read/${x.b}/${x.c}?v=${x.v}"><div class="r"><span>${esc(B.label(x.b, x.c, x.v, x.ve))}</span><span class="w">${x.w}</span></div><div class="t">${esc(t)}</div></a>`; }));
  if (cur.sel !== sel) return; const el = $('#xlist'); if (el) el.innerHTML = rows.join('') + (list.length > 40 ? `<p class="small faint">Showing the top 40 of ${list.length}.</p>` : '');
}
function renderNote(body) {
  const k = key(cur.b, cur.c, cur.sel), n = S.notes[k]?.t || '', hl = S.hl[k];
  body.innerHTML = `<p class="kicker">Highlight</p><div class="swatches">${[['y', '#e8c34a'], ['g', '#6fcf97'], ['b', '#7aa7ff'], ['p', '#b98cff'], ['r', '#eb6b78']].map(([id, col]) => `<button class="sw ${hl === id ? 'on' : ''}" style="background:${col}" data-act="hl" data-c="${id}" aria-label="Highlight ${id}"></button>`).join('')}<button class="btn sm ghost" data-act="hl" data-c="">Clear</button></div>
  <p class="kicker mt">Your note</p><textarea id="note-t" placeholder="What does this verse do to you? What does it contradict? What would you ask the author?">${esc(n)}</textarea>
  <div class="row mt"><button class="btn sm" data-act="bm">${S.bm[k] ? 'Bookmarked' : 'Bookmark'}</button><button class="btn sm" data-act="copy">Copy verse</button><a class="btn sm" href="#/search?q=${encodeURIComponent(cur.verses[cur.sel - 1].split(/\s+/).slice(0, 5).join(' '))}">Find similar</a></div>`;
  $('#note-t').addEventListener('input', debounce(e => { const had = S.notes[k]?.t?.trim(); S.notes[k] = { t: e.target.value, ts: Date.now() }; if (!e.target.value.trim()) delete S.notes[k]; save(); if (!had && e.target.value.trim()) { addXP(3, 'note'); } checkAch(); refreshBadge(cur.sel); }, 500));
}
function renderResp(body) {
  const { b, c, sel, verses } = cur, lab = B.label(b, c, sel), k = `verse:${b}.${c}.${sel}`;
  const prov = PROV[(b * 7 + c * 3 + sel) % PROV.length];
  body.innerHTML = `<p class="kicker">A provocation</p><p class="vprompt" style="font-size:1.05rem;color:var(--text)">${esc(prov)}</p><p class="small muted" style="font-family:var(--serif)">${esc(verses[sel - 1])}</p>${respondHTML(k, { title: lab, ref: lab, questions: [prov], label: lab })}`;
  wireRespond(body);
}
function renderOrig(body) {
  const { b, c, sel, ws } = cur, w = ws && ws[sel - 1];
  if (!w || !w.length) { body.innerHTML = '<p class="muted">No original-language data for this verse.</p>'; return; }
  const flags = [...new Set(w.map(x => x[5]).filter(f => f && f !== 't'))];
  body.innerHTML = `<p class="small muted">${O.langOf(b)}, read ${O.isNT(b) ? 'left to right' : 'right to left'}. Tap a word for its dictionary entry, grammar and every other place it occurs.</p>${O.verseTable(b, w)}${flags.length ? `<div class="callout mt small">${flags.map(f => `<p class="mb0"><b>${{ q: 'Qere', k: 'KJV text only', n: 'Not in KJV text', v: 'KJV differs', o: 'Other editions' }[f] || f}.</b> ${esc(O.FLAG_NOTE[f] || '')}</p>`).join('')}</div>` : ''}`;
}
function renderWord(body) {
  const { b, word, lex } = cur;
  body.innerHTML = word ? O.wordCard(b, word, lex) : '<p class="muted">Tap a word in the original text.</p>';
}
const ARCHAIC = { thee: 'you', thou: 'you', thy: 'your', thine: 'your', ye: 'you', hath: 'has', doth: 'does', unto: 'to', saith: 'says', shalt: 'shall', wilt: 'will', art: 'are', spake: 'spoke', whom: 'who', lo: 'behold' };
const norm = t => t.toLowerCase().replace(/[^a-z\s'-]/g, ' ').split(/\s+/).filter(Boolean).map(w => ARCHAIC[w] || w);
async function renderCompare(body) {
  body.innerHTML = loading('Comparing translations…');
  const { b, c, sel } = cur; const out = [], sets = [];
  for (const t of Object.values(B.TRANS)) { if (B.META[b].t === 'AP' && t.id !== 'kjv') continue; const ch = await B.chapter(t.id, b, c); const txt = ch[sel - 1] || ''; out.push({ t, txt }); sets.push(new Set(norm(txt))); }
  const html = out.map(({ t, txt }, i) => {
    const others = new Set(sets.filter((_, j) => j !== i).flatMap(x => [...x]));
    const marked = sets.length > 1 ? esc(txt).replace(/[A-Za-z][A-Za-z’'-]*/g, w => { const n = norm(w)[0]; return n && n.length > 3 && !others.has(n) ? `<mark>${w}</mark>` : w; }) : esc(txt);
    return `<div class="voice"><b>${t.short}</b><span>${marked || '—'}</span></div>`;
  }).join('');
  if (cur.sel !== sel) return;
  body.innerHTML = html + `<p class="tiny faint">Highlighted words appear in only one of the translations (old-fashioned forms such as “thou” are treated as “you”). Where they differ, the translators made an interpretive choice.${cur.ws ? ` Check the <a href="#/read/${b}/${c}?v=${sel}&m=inter">${O.langOf(b)}</a>.` : ''}</p>`;
}
function refreshBadge(v) {
  const p = $(`.v[data-v="${v}"]`); if (!p) return; const k = key(cur.b, cur.c, v);
  const n = (cur.xr[`${cur.c}.${v}`] || []).length / 5, hn = hardMap()[`${cur.b}.${cur.c}.${v}`];
  p.querySelector('.badge').innerHTML = `${n ? `<b>${n}</b>` : ''}${hn ? `<b class="flag">${ic('flag')}</b>` : ''}${S.notes[k] ? `<b>${ic('pen')}</b>` : ''}${S.bm[k] ? `<b>${ic('bookmark')}</b>` : ''}`;
  p.className = p.className.replace(/\bhl-\w+/g, '').replace(/\s+/g, ' ').trim() + (S.hl[k] ? ' hl-' + S.hl[k] : '');
}
export const actions = {
  selVerse(el, e) { if (e.target.closest('a')) return; selectVerse(+el.dataset.v); },
  rmode(el) { S.profile.rmode = el.dataset.m; save(); const v = cur?.sel; history.replaceState(null, '', `#/read/${cur.b}/${cur.c}${v ? '?v=' + v : ''}`); window.dispatchEvent(new Event('app:rerender')); },
  ow(el, e) {
    e && e.stopPropagation && e.stopPropagation();
    if (!cur?.ws) return;
    const v = el.dataset.v === '*' ? cur.sel : +el.dataset.v, i = +el.dataset.i;
    const w = cur.ws[v - 1]?.[i]; if (!w) return;
    if (cur.sel !== v) { cur.sel = v; $$('#verses .v').forEach(p => p.classList.toggle('sel', +p.dataset.v === v)); drawChapterArcs(v); }
    cur.word = w; $$('.ow.on,.iw.on').forEach(x => x.classList.remove('on')); if (el.closest('#verses')) el.classList.add('on');
    openSheet('word');
  },
  closeSheet() { $('#sheet')?.classList.remove('open'); setSheetOpen(false); if (cur) { cur.sel = null; $$('#verses .v').forEach(p => p.classList.remove('sel')); drawChapterArcs(null); history.replaceState(null, '', `#/read/${cur.b}/${cur.c}`); } },
  sheetTab(el) { openSheet(el.dataset.t); },
  sort(el) { sort = el.dataset.s; openSheet('conn'); },
  xopen() { S.stats.xrefs = (S.stats.xrefs || 0) + 1; save(); checkAch(); },
  trans(el) { S.profile.trans = el.dataset.t; save(); window.dispatchEvent(new Event('app:rerender')); },
  fs(el) { S.profile.size = Math.max(15, Math.min(30, S.profile.size + 2 * +el.dataset.d)); save(); document.documentElement.style.setProperty('--rs', S.profile.size + 'px'); },
  markRead() { markRead(); },
  hl(el) { const k = key(cur.b, cur.c, cur.sel), col = el.dataset.c; if (col) S.hl[k] = col; else delete S.hl[k]; save(); checkAch(); refreshBadge(cur.sel); openSheet('note'); },
  bm() { const k = key(cur.b, cur.c, cur.sel); if (S.bm[k]) delete S.bm[k]; else S.bm[k] = Date.now(); save(); refreshBadge(cur.sel); openSheet('note'); },
  copy() { const t = `${B.label(cur.b, cur.c, cur.sel)} (${B.TRANS[cur.trans].short}) — ${cur.verses[cur.sel - 1]}`; (navigator.clipboard?.writeText(t) || Promise.reject()).then(() => toast('Copied'), () => toast('Copy failed')); }
};
