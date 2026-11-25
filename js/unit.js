import { S, save, addXP, markActive } from './store.js';
import * as B from './bible.js';
import { esc, debounce, $, $$ } from './util.js';
import { md, paras, toast } from './ui.js';
import { checkAch } from './ach.js';

export const SECTION_LABEL = { c: 'The Comfortable Reading', f: 'The Fracture', d: 'The Dig', v: 'Other Voices', b: 'Beneath the Absolute', q: 'Interrogate', s: 'Where Do You Stand?', p: 'Practice' };

/** u: unit object. key: storage key. kind: 'daily'|'lesson'. Returns {html, after} */
export function renderUnit(u, key, kind = 'daily', head = '') {
  const st = S.units[key] || {};
  const refs = u.ref || [];
  const chips = refs.map(r => { const p = B.parseRef(r); return p ? `<a class="pill" href="#/read/${p.b}/${p.c}${p.v ? '?v=' + p.v : ''}">${esc(r)}</a>` : ''; }).join('');
  const ans = st.a || [];
  const open = (cls, title, inner, o = true) => `<details class="blk ${cls}" ${o ? 'open' : ''}><summary>${title}</summary><div class="in">${inner}</div></details>`;
  let h = `<article class="unit narrow"><header class="unit-head">${head}<div class="kicker">${esc(u.k || '')}</div><h1>${esc(u.t)}</h1>${u.tag ? `<p class="muted">${md(u.tag)}</p>` : ''}<div class="chips">${chips}</div></header>`;
  if (refs.length) h += open('', 'The Text', `<div class="scripture" id="utext"><div class="loading"><div class="spin"></div>Loading passage…</div></div>`);
  if (u.c) h += open('', SECTION_LABEL.c, paras(u.c));
  if (u.f) h += open('fracture', SECTION_LABEL.f, paras(u.f));
  if (u.d) h += open('dig', SECTION_LABEL.d, paras(u.d));
  if (u.v?.length) h += open('voices', SECTION_LABEL.v, u.v.map(([w, t]) => `<div class="voice"><b>${esc(w)}</b><span>${md(t)}</span></div>`).join(''));
  if (u.b) {
    const [claim, obj] = Array.isArray(u.b) ? u.b : [u.b];
    h += open('bta', SECTION_LABEL.b, `<p class="tiny muted" style="font-family:var(--sans)">From O.K. Mantz, <em>Beneath the Absolute</em> — offered as a sparring partner, not as settled doctrine.</p>${paras(claim)}${obj ? `<div class="objection"><b>Push back</b>${paras(obj)}</div>` : ''}`);
  }
  if (u.q?.length) h += open('ask', SECTION_LABEL.q, u.q.map((q, i) => `<div class="qbox"><label for="q-${i}"><i>${i + 1}</i>${md(q)}</label><textarea id="q-${i}" data-ua="${esc(key)}" data-i="${i}" placeholder="Write honestly. No one reads this but you.">${esc(ans[i] || '')}</textarea></div>`).join(''));
  if (u.s) h += open('', SECTION_LABEL.s, `<p>${md(u.s[0])}</p><input type="range" min="1" max="5" step="1" value="${st.s || 3}" data-ustance="${esc(key)}" aria-label="Your stance"><div class="stance-lbl"><span>${esc(u.s[1])}</span><span>${esc(u.s[2])}</span></div><p class="tiny faint mt" id="stance-note">${st.s ? 'Saved. You can revise this any time — changing your mind is data, not defeat.' : 'Move the slider to record where you stand today.'}</p>`);
  if (u.p) h += open('prac', SECTION_LABEL.p, paras(u.p));
  if (u.src?.length) h += open('', 'Sources & further reading', `<ul class="src">${u.src.map(s => `<li>${md(s)}</li>`).join('')}</ul><p class="tiny faint">Verify quotations and page references against the editions you use; this app paraphrases scholars rather than quoting them.</p>`, false);
  h += `<div id="unit-done" class="mt">${doneHTML(st, kind, key)}</div></article>`;
  const after = async () => {
    const box = $('#utext'); if (box) {
      try {
        const out = [];
        for (const r of refs.slice(0, 3)) {
          const p = await B.passage(S.profile.trans, r, 26); if (!p) continue;
          out.push(`<h4 style="font-family:var(--sans);font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin:10px 0 4px"><a href="#/read/${p.b}/${p.c}${p.v ? '?v=' + p.v : ''}">${esc(p.label)}</a> <span class="faint">· ${B.TRANS[p.trans].short}</span></h4>` + p.verses.map(([n, t]) => `<p class="v" style="cursor:default"><sup>${n}</sup>${esc(t)}</p>`).join('') + (p.truncated ? `<p class="small"><a href="#/read/${p.b}/${p.c}">Continue reading ${esc(p.label)} →</a></p>` : ''));
        }
        box.innerHTML = out.join('') || '<p class="muted">Passage unavailable.</p>';
      } catch (e) { box.innerHTML = '<p class="muted">Couldn’t load the passage text. Open it in the reader.</p>'; }
    }
    $$('textarea[data-ua]').forEach(t => t.addEventListener('input', debounce(() => { saveAnswer(t.dataset.ua, +t.dataset.i, t.value); }, 400)));
    $$('input[data-ustance]').forEach(r => r.addEventListener('change', () => { const k = r.dataset.ustance; (S.units[k] ||= {}).s = +r.value; save(); const n = $('#stance-note'); if (n) n.textContent = 'Saved. You can revise this any time — changing your mind is data, not defeat.'; }));
  };
  return { html: h, after };
}
function saveAnswer(k, i, v) { const u = (S.units[k] ||= {}); (u.a ||= [])[i] = v; save(); }
const doneHTML = (st, kind, key) => st.done
  ? `<div class="done-banner">✓ Completed${st.when ? ' · ' + new Date(st.when).toLocaleDateString() : ''}</div>`
  : `<button class="btn pri" data-act="unitDone" data-kind="${kind}" data-key="${esc(key)}">Finish this study · +${kind === 'daily' ? 40 : 30} XP</button><p class="tiny faint mt">Bonus XP for each question you answer in writing.</p>`;
export const unitActions = {
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
