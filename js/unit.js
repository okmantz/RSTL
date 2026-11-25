import { S, save, addXP, markActive } from './store.js';
import * as B from './bible.js';
import { esc, debounce, $, $$ } from './util.js';
import { md, paras } from './ui.js';
import { ic } from './icons.js';
import { checkAch } from './ach.js';
import { keyWords } from './curriculum.js';
import { respondHTML, wireRespond, reactRow, actions as respondActions } from './respond.js';

export const SECTION_LABEL = { c: 'The Comfortable Reading', f: 'The Fracture', d: 'The Dig', v: 'Other Voices', b: 'Beneath the Absolute', q: 'Interrogate', s: 'Where Do You Stand?', p: 'Practice' };

const href = (p) => `#/read/${p.b}/${p.c}${p.v ? '?v=' + p.v : ''}`;
const refLink = r => { const p = B.parseRef(r); return p ? `<a class="pill" href="${href(p)}">${esc(r)}</a>` : ''; };

/** u: unit object. key: storage key. kind: 'daily'|'lesson'. Returns {html, after} */
export function renderUnit(u, key, kind = 'daily', head = '') {
  const st = S.units[key] || {};
  const P = S.profile, mins = +P.mins || 15, gentle = P.tone === 'gentle', hideAuthor = !!P.hideAuthor;
  const refs = u.ref || [];
  const ans = st.a || [];
  const open = (cls, title, inner, o = true, react = '') => `<details class="blk ${cls}" ${o ? 'open' : ''}><summary>${title}</summary><div class="in">${inner}${react}</div></details>`;
  const rx = sec => reactRow(key, sec, u.t);
  const chips = u.gen
    ? `<a class="pill" href="#/read/${u.b}/${u.c1}">${ic('book')} Open in the reader</a>`
    : refs.map(refLink).join('');
  let h = `<article class="unit narrow"><header class="unit-head">${head}<div class="kicker">${esc(u.k || '')}</div><h1>${esc(u.t)}</h1>${u.tag ? `<p class="muted">${md(u.tag)}</p>` : ''}<div class="chips">${chips}</div></header>`;
  if (refs.length || u.gen) h += open('', 'The Text', `<div class="scripture" id="utext"><div class="loading"><div class="spin"></div>Loading passage…</div></div>`);

  if (u.gen) {
    const g = u.guide;
    if (g) h += open('guide', `About ${esc(g[0])}`, `<p><b>${esc(g[2])}.</b> ${esc(g[1])}</p><p>${md(g[3])}</p><p class="muted"><em>${md(g[4])}</em></p>`, u.first && mins >= 15);
    h += open('', 'How to read this', `<p>${md(u.tip)}</p><p class="muted small">Today’s lens: <b>${esc(u.k.split('Lens: ')[1] || '')}</b>. ${esc(u.tag.split('. ').slice(1).join('. '))}</p>`, mins >= 15);
    h += open('dig', 'Words that carry it', `<p class="small muted">Words repeated in this passage. Repetition is often where an author is steering you.</p><div class="words" id="uwords"></div>`, mins >= 30);
    h += open('web', 'Threads to the rest of the Bible', `<div id="uweb"><div class="loading"><div class="spin"></div>Following the references…</div></div>`, mins >= 15, rx('web'));
    if (u.hard?.length) h += open('fracture', 'Where this gets hard', u.hard.map(x => `<h4>${esc(x.title)}</h4>${paras(x.text)}`).join(''), !gentle, rx('hard'));
  } else {
    if (u.c) h += open('', SECTION_LABEL.c, paras(u.c), true, rx('c'));
    if (u.f) h += open('fracture', SECTION_LABEL.f, paras(u.f), !gentle, rx('f'));
    if (u.d) h += open('dig', SECTION_LABEL.d, paras(u.d), mins >= 30 || (mins >= 15 && !gentle), rx('d'));
    if (u.v?.length) h += open('voices', SECTION_LABEL.v, u.v.map(([w, t]) => `<div class="voice"><b>${esc(w)}</b><span>${md(t)}</span></div>`).join(''), mins >= 30);
    if (u.b && !hideAuthor) {
      const [claim, obj] = Array.isArray(u.b) ? u.b : [u.b];
      h += open('bta', SECTION_LABEL.b, `<p class="tiny muted" style="font-family:var(--sans)">From O.K. Mantz, <em>Beneath the Absolute</em>. Offered as a sparring partner, not as settled doctrine.</p>${paras(claim)}${obj ? `<div class="objection"><b>Push back</b>${paras(obj)}</div>` : ''}`, mins >= 30 && !gentle, rx('b'));
    }
  }
  if (u.q?.length) h += open('ask', SECTION_LABEL.q, u.q.map((q, i) => `<div class="qbox"><label for="q-${i}"><i>${i + 1}</i>${md(q)}</label><textarea id="q-${i}" data-ua="${esc(key)}" data-i="${i}" placeholder="Write honestly. No one reads this but you.">${esc(ans[i] || '')}</textarea></div>`).join(''));
  if (u.s) h += open('', SECTION_LABEL.s, `<p>${md(u.s[0])}</p><input type="range" min="1" max="5" step="1" value="${st.s || 3}" data-ustance="${esc(key)}" aria-label="Your stance"><div class="stance-lbl"><span>${esc(u.s[1])}</span><span>${esc(u.s[2])}</span></div><p class="tiny faint mt" id="stance-note">${st.s ? 'Saved. You can revise this any time. Changing your mind is data, not defeat.' : 'Move the slider to record where you stand today.'}</p>`, mins >= 15);
  if (u.p) h += open('prac', SECTION_LABEL.p, paras(u.p), mins >= 15);
  h += respondHTML(key, { title: u.t, ref: refs[0] || (u.gen ? u.t : ''), questions: u.q || [], label: u.t, open: mins >= 15 });
  if (u.src?.length) h += open('', 'Sources & further reading', `<ul class="src">${u.src.map(s => `<li>${md(s)}</li>`).join('')}</ul><p class="tiny faint">Verify quotations and page references against the editions you use; this app paraphrases scholars rather than quoting them.</p>`, false);
  h += `<div id="unit-done" class="mt">${doneHTML(st, kind, key)}</div></article>`;

  const after = async () => {
    const box = $('#utext');
    let texts = [];
    if (box) {
      try {
        if (u.gen) {
          const tr = B.transFor(u.b, P.trans), out = [];
          for (let c = u.c1; c <= u.c2; c++) {
            const ch = await B.chapter(tr, u.b, c); texts.push(...ch);
            out.push(`<h4 class="ph"><a href="#/read/${u.b}/${c}">${esc(B.META[u.b].n)} ${c}</a> <span class="faint">· ${B.TRANS[tr].short}</span></h4>` + ch.map((t, i) => `<p class="v" style="cursor:default"><sup>${i + 1}</sup>${esc(t)}</p>`).join(''));
          }
          box.innerHTML = out.join('');
        } else {
          const out = [];
          for (const r of refs.slice(0, 3)) {
            const p = await B.passage(P.trans, r, 30); if (!p) continue;
            texts.push(...p.verses.map(x => x[1]));
            out.push(`<h4 class="ph"><a href="${href(p)}">${esc(p.label)}</a> <span class="faint">· ${B.TRANS[p.trans].short}</span></h4>` + p.verses.map(([n, t]) => `<p class="v" style="cursor:default"><sup>${n}</sup>${esc(t)}</p>`).join('') + (p.truncated ? `<p class="small"><a href="#/read/${p.b}/${p.c}">Continue reading ${esc(p.label)} →</a></p>` : ''));
          }
          box.innerHTML = out.join('') || '<p class="muted">Passage unavailable.</p>';
        }
      } catch (e) { box.innerHTML = '<p class="muted">Couldn’t load the passage text. Open it in the reader.</p>'; }
    }
    if (u.gen) {
      const w = $('#uwords'); if (w) { const kw = keyWords(texts, 8); w.innerHTML = kw.length ? kw.map(([k, n]) => `<span class="pill">${esc(k)} <span class="faint">×${n}</span></span>`).join('') : '<span class="muted small">No strongly repeated words in this passage.</span>'; }
      webFor(u).catch(() => { const el = $('#uweb'); if (el) el.innerHTML = '<p class="muted small">Cross-references unavailable.</p>'; });
    }
    $$('textarea[data-ua]').forEach(t => t.addEventListener('input', debounce(() => { saveAnswer(t.dataset.ua, +t.dataset.i, t.value); }, 400)));
    $$('input[data-ustance]').forEach(r => r.addEventListener('change', () => { const k = r.dataset.ustance; (S.units[k] ||= {}).s = +r.value; save(); const n = $('#stance-note'); if (n) n.textContent = 'Saved. You can revise this any time. Changing your mind is data, not defeat.'; }));
    wireRespond();
  };
  return { html: h, after };
}

/** top cross-references leaving a gen passage */
async function webFor(u) {
  const el = $('#uweb'); if (!el) return;
  const xr = await B.xrefs(u.b), seen = new Map();
  for (const [k, flat] of Object.entries(xr)) {
    const c = +k.split('.')[0]; if (c < u.c1 || c > u.c2) continue;
    B.unpack(flat).forEach(x => { if (x.b === u.b && x.c >= u.c1 && x.c <= u.c2) return; const kk = x.b + '.' + x.c; const o = seen.get(kk); if (!o || x.w > o.w) seen.set(kk, { ...x, from: k, w: Math.max(x.w, o?.w || 0) }); });
  }
  const top = [...seen.values()].sort((a, b) => b.w - a.w).slice(0, 6);
  if (!top.length) { el.innerHTML = '<p class="muted small">No strong cross-references from this passage in the data.</p>'; return; }
  const rows = [];
  for (const x of top) {
    const txt = await B.snippet(S.profile.trans, x, 190);
    rows.push(`<a class="xl" href="#/read/${x.b}/${x.c}?v=${x.v}"><div class="r"><span>${esc(B.label(x.b, x.c, x.v, x.ve))}</span><span class="faint">${x.w} votes</span></div><div class="t">${esc(txt)}</div></a>`);
  }
  el.innerHTML = `<p class="small muted">Readers have linked these passages to today’s text. Pick two that seem unrelated and ask what they are doing in the same conversation.</p>${rows.join('')}`;
}
function saveAnswer(k, i, v) { const u = (S.units[k] ||= {}); (u.a ||= [])[i] = v; save(); }
const doneHTML = (st, kind, key) => st.done
  ? `<div class="done-banner">${ic('check')} Completed${st.when ? ' · ' + new Date(st.when).toLocaleDateString() : ''}</div>`
  : `<button class="btn pri" data-act="unitDone" data-kind="${kind}" data-key="${esc(key)}">Finish this study · +${kind === 'daily' ? 40 : 30} XP</button><p class="tiny faint mt">Bonus XP for each question you answer in writing.</p>`;
export const unitActions = {
  ...respondActions,
  unitDone(el) {
    const key = el.dataset.key;
    if (!key) return;
    const st = (S.units[key] ||= {}); if (st.done) return;
    st.done = true; st.when = Date.now(); st.kind = el.dataset.kind; save();
    const answered = (st.a || []).filter(x => x && x.trim().length > 12).length;
    const base = el.dataset.kind === 'daily' ? 40 : 30;
    addXP(base + Math.min(answered, 4) * 5, el.dataset.kind === 'daily' ? 'daily study' : 'lesson');
    markActive(); checkAch();
    window.dispatchEvent(new CustomEvent('unit:done', { detail: key }));
    $('#unit-done').innerHTML = doneHTML(st, el.dataset.kind, key);
  }
};
