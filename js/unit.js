import { S, save, addXP, markActive } from './store.js';
import * as B from './bible.js';
import * as O from './orig.js';
import * as D from './depth.js';
import { esc, debounce, $, $$ } from './util.js';
import { md, paras, plain } from './ui.js';
import { ic } from './icons.js';
import { checkAch } from './ach.js';
import { keyWords } from './curriculum.js';
import { respondHTML, wireRespond, reactRow, actions as respondActions } from './respond.js';

export const SECTION_LABEL = { c: 'The Comfortable Reading', f: 'The Fracture', d: 'The Dig', v: 'Other Voices', b: 'Beneath the Absolute', q: 'Interrogate', s: 'Where Do You Stand?', p: 'Practice' };

const EX_LABEL = { predict: 'Predict, then check', choose: 'Take a side', rewrite: 'Retell it', rate: 'Where do you stand?' };
const ddHTML = d => `<h4>${esc(d.h)}</h4>${paras(d.a)}${d.x?.length ? `<div class="kicker mt">Cross-references worth the trip</div><ul class="xr">${d.x.map(([r, why]) => `<li>${md(r)}<span> — ${md(why)}</span></li>`).join('')}</ul>` : ''}`;
function exHTML(i, key, st) {
  const [type, prompt, a, b] = i, d = st.dd || {}, k = esc(key);
  const ta = (f, label, ph) => `<label class="flabel" for="dd-${f}">${esc(label)}</label><textarea id="dd-${f}" data-dd="${f}" data-k="${k}" placeholder="${esc(ph)}">${esc(d[f] || '')}</textarea>`;
  let h = `<p>${md(prompt)}</p>`;
  if (type === 'predict') h += ta('p1', 'Your prediction', 'Commit to a guess before you look.') + ta('p2', 'After reading: what did you get right, and what surprised you?', 'Come back to this once you have read the passage.');
  else if (type === 'choose') h += `<div class="opts dd-opts">${[['A', a], ['B', b]].map(([v, t]) => `<button class="opt ${d.c === v ? 'on' : ''}" data-act="ddchoose" data-k="${k}" data-v="${v}"><span><b>${v === 'A' ? 'Reading A' : 'Reading B'}</b><span>${md(t)}</span></span><span class="tick">${ic('check')}</span></button>`).join('')}</div>` + ta('t', 'What would the other side say to you?', 'State the strongest objection to the side you picked.');
  else if (type === 'rate') h += `<input type="range" min="1" max="5" step="1" value="${d.r || 3}" data-ddrate="${k}" aria-label="Your answer"><div class="stance-lbl"><span>${esc(a)}</span><span>${esc(b)}</span></div>` + ta('t', 'Why there?', 'One honest sentence is enough.');
  else h += ta('t', 'Your version', 'Write it, then read it back and notice what you added.');
  return h;
}
const href = (p) => `#/read/${p.b}/${p.c}${p.v ? '?v=' + p.v : ''}`;
const refLink = r => { const p = B.parseRef(r); return p ? `<a class="pill" href="${href(p)}">${esc(r)}</a>` : ''; };
const load = (msg) => `<div class="loading sm"><div class="spin"></div>${esc(msg)}</div>`;
const modeOf = () => (['eng', 'orig', 'inter'].includes(S.profile.rmode) ? S.profile.rmode : S.profile.rmode === 'par' ? 'inter' : 'eng');

/** u: unit object. key: storage key. kind: 'daily'|'lesson'. Returns {html, after} */
export function renderUnit(u, key, kind = 'daily', head = '') {
  const st = S.units[key] || {};
  const P = S.profile, mins = +P.mins || 15, gentle = P.tone === 'gentle', hideAuthor = !!P.hideAuthor;
  const refs = u.ref || [];
  const ans = st.a || [];
  const deepen = kind === 'daily';                       // the depth engine runs on daily studies
  const hasText = !!(refs.length || u.gen);
  const open = (cls, title, inner, o = true, react = '', id = '') => `<details class="blk ${cls}" ${id ? `id="${id}"` : ''} ${o ? 'open' : ''}><summary>${title}</summary><div class="in">${inner}${react}</div></details>`;
  const rx = sec => reactRow(key, sec, u.t);
  const chips = u.gen
    ? `<a class="pill" href="#/read/${u.b}/${u.c1}">${ic('book')} Open in the reader</a>${O.hasOrig(u.b) ? `<a class="pill" href="#/read/${u.b}/${u.c1}?m=inter">${ic('eye')} ${O.langOf(u.b)} text</a>` : ''}`
    : refs.map(refLink).join('');
  const lead = u.gen ? (u.ins?.[0]?.h || '') : '';
  let h = `<article class="unit narrow"><header class="unit-head">${head}<div class="kicker">${esc(u.k || '')}</div><h1>${esc(u.t)}</h1>${u.tag ? `<p class="muted">${md(u.tag)}</p>` : ''}<div class="chips">${chips}</div></header>`;
  if (hasText) {
    const mode = modeOf();
    const first = u.gen ? u.b : (B.parseRef(refs[0])?.b ?? 0);
    const seg = O.hasOrig(first) ? `<div class="seg tm" role="tablist" aria-label="Text view">${[['eng', 'English'], ['orig', O.langOf(first)], ['inter', 'Word by word']].map(([id, n]) => `<button role="tab" class="${mode === id ? 'on' : ''}" data-act="utmode" data-m="${id}">${n}</button>`).join('')}</div>` : '';
    h += open('', 'The Text', `${seg}<div class="scripture" id="utext">${load('Loading passage…')}</div><div id="uword"></div>`, true, '', 'blk-text');
  }
  const qsAll = u.q || [];
  const qs = mins >= 30 ? qsAll : qsAll.slice(0, mins >= 15 ? 4 : 2);

  if (u.gen) {
    const g = u.guide;
    if (u.dd) h += open('deepen', 'Go deeper', ddHTML(u.dd), true, rx('dd'), 'blk-dd');
    if (u.dd?.i) h += open('prac exercise', EX_LABEL[u.dd.i[0]] || 'Try this', exHTML(u.dd.i, key, st), true, '', 'blk-ex');
    if (u.ins?.length) h += open('insight', 'Notes on this passage', u.ins.map(x => `<h4>${esc(x.h)}${u.ins.length > 1 ? ` <span class="faint">· ${esc(B.label(u.b, x.c))}</span>` : ''}</h4><p>${md(x.t)}</p>`).join(''), true, rx('ins'));
    if (g) h += open('guide', `About ${esc(g[0])}`, `<p><b>${esc(g[2])}.</b> ${esc(g[1])}</p><p>${md(g[3])}</p><p class="muted"><em>${md(g[4])}</em></p>`, u.first && mins >= 15);
    if (u.facet) h += open('facet', esc(u.facet.title), `<p>${md(u.facet.text)}</p>`, mins >= 15);
    h += open('dig', `In the original`, `<div id="uorig">${load('Reading the ' + (O.hasOrig(u.b) ? O.langOf(u.b) : 'text') + '…')}</div>`, mins >= 15, rx('orig'));
    h += open('', 'How to read this', `<p>${md(u.tip)}</p><p class="muted small">Today’s lens: <b>${esc(u.k.split('Lens: ')[1] || '')}</b>. ${esc(u.tag.split('. ').slice(1).join('. '))}</p>`, mins >= 30);
    h += open('', 'Where the translations split', `<div id="usplit">${load('Comparing translations…')}</div>`, mins >= 30);
    h += open('web', 'Threads to the rest of the Bible', `<div id="uweb">${load('Following the references…')}</div>`, mins >= 15, rx('web'));
    if (u.hard?.length) h += open('fracture', 'Where this gets hard', u.hard.map(x => `<h4>${esc(x.title)}</h4>${paras(x.text)}`).join(''), !gentle, rx('hard'));
    h += open('dig', 'Words that repeat in English', `<p class="small muted">Words repeated in this passage in the translation you read. Repetition is often where an author is steering you.</p><div class="words" id="uwords"></div>`, false);
  } else {
    if (u.c) h += open('', SECTION_LABEL.c, paras(u.c), true, rx('c'));
    if (u.f) h += open('fracture', SECTION_LABEL.f, paras(u.f), !gentle, rx('f'));
    if (u.d) h += open('dig', SECTION_LABEL.d, paras(u.d), mins >= 30 || (mins >= 15 && !gentle), rx('d'));
    if (u.v?.length) h += open('voices', SECTION_LABEL.v, u.v.map(([w, t]) => `<div class="voice"><b>${plain(w)}</b><span>${md(t)}</span></div>`).join(''), mins >= 30);
    if (deepen && hasText) {
      h += open('dig', 'In the original', `<div id="uorig">${load('Reading the original…')}</div>`, mins >= 30);
      h += open('', 'Where the translations split', `<div id="usplit">${load('Comparing translations…')}</div>`, mins >= 30);
      h += open('web', 'Threads to the rest of the Bible', `<div id="uweb">${load('Following the references…')}</div>`, mins >= 30);
    }
    if (u.b && !hideAuthor) {
      const [claim, obj] = Array.isArray(u.b) ? u.b : [u.b];
      h += open('bta', SECTION_LABEL.b, `<p class="tiny muted" style="font-family:var(--sans)">From O.K. Mantz, <em>Beneath the Absolute</em>. Offered as a sparring partner, not as settled doctrine.</p>${paras(claim)}${obj ? `<div class="objection"><b>Push back</b>${paras(obj)}</div>` : ''}`, mins >= 30 && !gentle, rx('b'));
    }
  }
  if (deepen && hasText) h += open('prac', 'Pick the verse', `<div id="upick">${load('Loading…')}</div>`, mins >= 15);
  if (qs.length) h += open('ask', SECTION_LABEL.q, qs.map((q, i) => `<div class="qbox"><label for="q-${i}"><i>${i + 1}</i>${md(q)}</label><textarea id="q-${i}" data-ua="${esc(key)}" data-i="${i}" placeholder="Write honestly. No one reads this but you.">${esc(ans[i] || '')}</textarea></div>`).join(''));
  if (u.s) h += open('', SECTION_LABEL.s, `<p>${md(u.s[0])}</p><input type="range" min="1" max="5" step="1" value="${st.s || 3}" data-ustance="${esc(key)}" aria-label="Your stance"><div class="stance-lbl"><span>${esc(u.s[1])}</span><span>${esc(u.s[2])}</span></div><p class="tiny faint mt" id="stance-note">${st.s ? 'Saved. You can revise this any time. Changing your mind is data, not defeat.' : 'Move the slider to record where you stand today.'}</p>`, mins >= 15);
  if (u.p) h += open('prac', SECTION_LABEL.p, paras(u.p), mins >= 15);
  h += respondHTML(key, { title: u.t, ref: refs[0] || (u.gen ? u.t : ''), questions: qs, label: u.t, open: mins >= 15 });
  if (u.src?.length) h += open('', 'Sources & further reading', `<ul class="src">${u.src.map(s => `<li>${md(s)}</li>`).join('')}</ul><p class="tiny faint">Verify quotations and page references against the editions you use; this app paraphrases scholars rather than quoting them. Original-language data: STEPBible / Tyndale House (CC BY 4.0).</p>`, false);
  h += `<div id="unit-done" class="mt">${doneHTML(st, kind, key)}</div></article>`;

  const after = async () => {
    const box = $('#utext');
    let texts = [], sc = null;
    if (box) {
      try {
        if (deepen || u.gen) sc = await D.loadScope(u, key);
        else sc = await D.loadScope({ ...u, gen: false }, key);
        drawText(box, u, sc, P.trans);
        LAST = { u, key, box };
      } catch (e) { console.error(e); box.innerHTML = '<p class="muted">Couldn’t load the passage text. Open it in the reader.</p>'; }
      if (sc) texts = sc.verses.map(v => v.en[B.transFor(v.b, P.trans)] || v.en.kjv);
    }
    if (u.gen) {
      const w = $('#uwords'); if (w) { const kw = keyWords(texts, 8); w.innerHTML = kw.length ? kw.map(([k, n]) => `<span class="pill">${esc(k)} <span class="faint">×${n}</span></span>`).join('') : '<span class="muted small">No strongly repeated words in this passage.</span>'; }
    }
    if (deepen && hasText) {
      const fill = async (id, fn) => { try { const el = $('#' + id); if (el) el.innerHTML = await fn(u, key); } catch (e) { console.error(e); const el = $('#' + id); if (el) el.innerHTML = '<p class="muted small">Couldn’t load this section.</p>'; } };
      await Promise.all([fill('uorig', D.originalHTML), fill('usplit', D.splitHTML), fill('uweb', D.webHTML), fill('upick', D.pickHTML)]);
      D.wireDepth(key, sc ? sc.verses.slice(0, 45) : []);
    }
    $$('textarea[data-ua]').forEach(t => t.addEventListener('input', debounce(() => { saveAnswer(t.dataset.ua, +t.dataset.i, t.value); }, 400)));
    $$('textarea[data-dd]').forEach(t => t.addEventListener('input', debounce(() => { const u2 = (S.units[t.dataset.k] ||= {}); (u2.dd ||= {})[t.dataset.dd] = t.value; save(); }, 400)));
    $$('input[data-ddrate]').forEach(r => r.addEventListener('change', () => { const u2 = (S.units[r.dataset.ddrate] ||= {}); (u2.dd ||= {}).r = +r.value; save(); }));
    $$('input[data-ustance]').forEach(r => r.addEventListener('change', () => { const k = r.dataset.ustance; (S.units[k] ||= {}).s = +r.value; save(); const n = $('#stance-note'); if (n) n.textContent = 'Saved. You can revise this any time. Changing your mind is data, not defeat.'; }));
    wireRespond();
  };
  return { html: h, after };
}

/* ---------- the passage text (English / original / interlinear) ---------- */
function drawText(box, u, sc, pref) {
  const mode = modeOf(), groups = [];
  sc.verses.forEach(v => { const g = groups[groups.length - 1]; if (g && g.b === v.b && g.c === v.c) g.vs.push(v); else groups.push({ b: v.b, c: v.c, vs: [v] }); });
  const out = groups.map(g => {
    const tr = B.transFor(g.b, pref), lab = B.label(g.b, g.c);
    const canO = mode !== 'eng' && O.hasOrig(g.b) && g.vs.every(v => v.ws);
    const full = g.vs[0].v === 1 && (B.META[g.b].v[g.c - 1] <= g.vs[g.vs.length - 1].v);
    const head = `<h4 class="ph"><a href="#/read/${g.b}/${g.c}${g.vs[0].v > 1 ? '?v=' + g.vs[0].v : ''}">${esc(lab)}${g.vs[0].v > 1 || !full ? ':' + g.vs[0].v + (g.vs.length > 1 ? '–' + g.vs[g.vs.length - 1].v : '') : ''}</a> <span class="faint">· ${canO ? O.langOf(g.b) : B.TRANS[tr].short}</span></h4>`;
    let body;
    if (canO) body = O.chapterHTML(g.b, g.vs.map(v => v.ws), mode, g.vs.map(v => v.en[tr] || v.en.kjv), () => ({ cls: '', badge: '' }), g.vs[0].v, 'uow', g.c).replace(/ data-act="selVerse" tabindex="0"/g, '');
    else body = g.vs.map(v => `<p class="v" style="cursor:default"><sup>${v.v}</sup>${esc(v.en[tr] || v.en.kjv)}</p>`).join('');
    const more = !full && g.vs[0].v === 1 && B.META[g.b].v[g.c - 1] > g.vs[g.vs.length - 1].v ? `<p class="small"><a href="#/read/${g.b}/${g.c}">Continue reading ${esc(lab)} →</a></p>` : '';
    return head + body + more;
  });
  box.innerHTML = out.join('') || '<p class="muted">Passage unavailable.</p>';
  box.classList.toggle('orig-on', mode !== 'eng');
}
let LAST = null;
async function redraw() { if (!LAST) return; const { u, key, box } = LAST; try { const sc = await D.loadScope(u, key); drawText(box, u, sc, S.profile.trans); $('#uword') && ($('#uword').innerHTML = ''); } catch (e) { } }
function saveAnswer(k, i, v) { const u = (S.units[k] ||= {}); (u.a ||= [])[i] = v; save(); }
const doneHTML = (st, kind, key) => st.done
  ? `<div class="done-banner">${ic('check')} Completed${st.when ? ' · ' + new Date(st.when).toLocaleDateString() : ''}</div>`
  : `<button class="btn pri" data-act="unitDone" data-kind="${kind}" data-key="${esc(key)}">Finish this study · +${kind === 'daily' ? 40 : 30} XP</button><p class="tiny faint mt">Bonus XP for each question you answer in writing.</p>`;
export const unitActions = {
  ...respondActions, ...D.depthActions,
  utmode(el) {
    S.profile.rmode = el.dataset.m; save();
    $$('.seg.tm button').forEach(b => b.classList.toggle('on', b === el));
    redraw();
  },
  async uow(el) {
    const b = +el.dataset.b, c = +el.dataset.c, v = +el.dataset.v, i = +el.dataset.i;
    const box = $('#uword'); if (!box) return;
    box.innerHTML = load('Looking up the word…');
    try {
      const [ch, lex] = await Promise.all([O.chapterOrig(b, c), O.lexicon(b)]);
      const w = ch?.[v - 1]?.[i]; if (!w) { box.innerHTML = ''; return; }
      box.innerHTML = `<div class="wpop"><button class="icon-btn sm wpop-x" data-act="uwordx" aria-label="Close word card">${ic('x')}</button><div class="kicker">${esc(B.label(b, c, v))}</div>${O.wordCard(b, w, lex)}</div>`;
      box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } catch (e) { box.innerHTML = '<p class="muted small">Couldn’t load the lexicon.</p>'; }
  },
  ddchoose(el) {
    const k = el.dataset.k, v = el.dataset.v, d = ((S.units[k] ||= {}).dd ||= {});
    d.c = d.c === v ? undefined : v; save();
    el.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === d.c));
  },
  uwordx() { const box = $('#uword'); if (box) box.innerHTML = ''; },
  unitDone(el) {
    const key = el.dataset.key;
    if (!key) return;
    const st = (S.units[key] ||= {}); if (st.done) return;
    st.done = true; st.when = Date.now(); st.kind = el.dataset.kind; save();
    const answered = (st.a || []).filter(x => x && x.trim().length > 12).length;
    const ddw = st.dd ? Math.max(...['t', 'p1', 'p2'].map(f => (st.dd[f] || '').trim().length)) : 0;
    const extra = (st.pk?.why?.trim().length > 12 ? 1 : 0) + (st.thread?.t?.trim().length > 12 ? 1 : 0) + (ddw > 12 ? 1 : 0);
    const base = el.dataset.kind === 'daily' ? 40 : 30;
    addXP(base + Math.min(answered + extra, 5) * 5, el.dataset.kind === 'daily' ? 'daily study' : 'lesson');
    markActive(); checkAch();
    window.dispatchEvent(new CustomEvent('unit:done', { detail: key }));
    $('#unit-done').innerHTML = doneHTML(st, el.dataset.kind, key);
  }
};
