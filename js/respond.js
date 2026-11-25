/* Respond: the interactive layer used across RSTL.
 * Every study, question, argument, voice and verse can be answered in several ways:
 *  - Steelman: state your view, argue against it as its best advocate, say what would change your mind
 *  - Voices: answer as a sceptic, a believer, a historian, a pastor, a philosopher, a child, the author…
 *  - Reflect / Pray / Sit: a tradition-aware prompt for a quieter kind of answer
 *  - Ask: add your own questions, which collect in the Journal and can be marked open / partly answered / answered
 *  - Share: copy a discussion guide or your own response, for a friend, a group or a class
 * Plus per-section reactions (Persuaded / Unsettled / Disagree / Dig deeper) that feed a "dig list". */
import { S, save, addXP, markActive, resp, uid } from './store.js';
import { esc, debounce, $, $$ } from './util.js';
import { toast } from './ui.js';
import { ic } from './icons.js';
import { checkAch } from './ach.js';
import { TRADS } from '../content/traditions.js';
import { VOICES, STEEL, REACTIONS } from '../content/banks.js';

const tabState = {};   // key -> current tab (kept only for the page session)
const META = {};       // key -> { title, ref, questions }

const sitInfo = () => (TRADS[S.profile.trad] || TRADS.none).sit;
const filled = o => o && Object.values(o).some(v => typeof v === 'string' && v.trim().length > 3);

export function respondHTML(key, o = {}) {
  META[key] = { title: o.title || '', ref: o.ref || '', questions: o.questions || [] };
  const r = S.resp[key] || {}, st = r.steel || {}, vo = r.voice || {}, label = o.label || o.title || 'this';
  const sit = sitInfo();
  const tab = tabState[key] || 'steel';
  const pane = (id, inner) => `<div class="rpane" data-pane="${id}" ${tab === id ? '' : 'hidden'}>${inner}</div>`;
  const tabs = [['steel', 'Steelman'], ['voice', 'Voices'], ['sit', sit[0]], ['ask', 'Ask'], ['share', 'Share']];
  const vsel = VOICES.find(v => v[0] === vo.who);
  const html = `<details class="blk respond" data-rkey="${esc(key)}" ${o.open === false ? '' : 'open'}><summary>Respond</summary><div class="in">
    <p class="small muted rintro">Go past a one-line answer. Pick any mode, or use several. Everything saves on this device as you type.</p>
    <div class="seg" role="tablist">${tabs.map(([id, n]) => `<button role="tab" class="${tab === id ? 'on' : ''}" data-act="rtab" data-k="${esc(key)}" data-t="${id}">${esc(n)}</button>`).join('')}</div>
    ${pane('steel', `<p class="small muted">State what you think, then argue against it as well as its best advocate would. Nobody sees this but you.</p>${STEEL.map(([f, n, ph]) => `<label class="flabel" for="${esc(key)}-st-${f}">${esc(n)}</label><textarea id="${esc(key)}-st-${f}" data-rk="${esc(key)}" data-rf="steel.${f}" placeholder="${esc(ph)}">${esc(st[f] || '')}</textarea>`).join('')}`)}
    ${pane('voice', `<p class="small muted">Take a seat that is not yours. The point is not to be convinced, but to hear the passage from somewhere else.</p><div class="chipsel">${VOICES.map(([id, n]) => `<button class="pill ${vo.who === id ? 'on' : ''}" data-act="rvoice" data-k="${esc(key)}" data-w="${id}">${esc(n)}</button>`).join('')}</div><p class="vprompt" id="vp-${esc(key)}">${vsel ? esc(vsel[2].replace('{p}', label)) : 'Choose a voice above.'}</p><textarea data-rk="${esc(key)}" data-rf="voice.t" placeholder="Write in that voice…">${esc(vo.t || '')}</textarea>`)}
    ${pane('sit', `<p class="small muted">${esc(sit[1])}</p><textarea data-rk="${esc(key)}" data-rf="sit" placeholder="Take your time. One honest paragraph is plenty.">${esc(r.sit || '')}</textarea>`)}
    ${pane('ask', `<p class="small muted">What do you want to ask this passage, its author, or yourself? Your questions collect in the Journal, where you can come back and mark them open, partly answered, or answered.</p><div class="row"><input type="text" id="rq-${esc(key)}" maxlength="240" placeholder="Write a question…" style="flex:1;min-width:200px"><button class="btn sm pri" data-act="rask" data-k="${esc(key)}">Add</button></div><div class="myq-list" id="rql-${esc(key)}">${askList(key)}</div>`)}
    ${pane('share', `<p class="small muted">Take it into a conversation: a friend, a study group, a class, a pastor or a sceptical uncle.</p><div class="row"><button class="btn sm" data-act="rguide" data-k="${esc(key)}">${ic('users')} Copy discussion guide</button><button class="btn sm" data-act="rcopy" data-k="${esc(key)}">${ic('copy')} Copy my response</button></div>`)}
  </div></details>`;
  return html;
}
function askList(key) {
  const items = S.myq.filter(q => q.src === key);
  if (!items.length) return '';
  return items.map(q => `<div class="myq"><span>${esc(q.t)}</span><button class="icon-btn sm" data-act="rdelq" data-id="${q.id}" aria-label="Remove question">${ic('x')}</button></div>`).join('');
}

/** attach autosave to all respond fields currently in the DOM */
export function wireRespond(root = document) {
  $$('textarea[data-rk]', root).forEach(t => {
    if (t.dataset.wired) return; t.dataset.wired = 1;
    t.addEventListener('input', debounce(() => saveField(t.dataset.rk, t.dataset.rf, t.value), 450));
  });
  $$('input[id^="rq-"]', root).forEach(inp => {
    if (inp.dataset.wired) return; inp.dataset.wired = 1;
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); actions.rask({ dataset: { k: inp.id.slice(3) } }); } });
  });
}
function saveField(key, path, val) {
  const r = resp(key); const [a, b] = path.split('.');
  const before = a === 'steel' ? filled(r.steel) : a === 'voice' ? filled(r.voice) : !!(r.sit && r.sit.trim());
  if (b) (r[a] ||= {})[b] = val; else r[a] = val;
  r.ts = Date.now(); r.ttl = META[key]?.title || r.ttl || '';
  const after = a === 'steel' ? filled(r.steel) : a === 'voice' ? filled(r.voice) : !!(r.sit && r.sit.trim());
  save();
  if (!before && after) { addXP(8, a === 'steel' ? 'steelman' : a === 'voice' ? 'new voice' : 'reflection'); markActive(); checkAch(); }
}

export const actions = {
  rtab(el) {
    const key = el.dataset.k, t = el.dataset.t; tabState[key] = t;
    const root = el.closest('.respond');
    $$('.seg button', root).forEach(b => b.classList.toggle('on', b === el));
    $$('.rpane', root).forEach(p => { p.hidden = p.dataset.pane !== t; });
  },
  rvoice(el) {
    const key = el.dataset.k, w = el.dataset.w, r = resp(key); (r.voice ||= {}).who = w; save();
    const root = el.closest('.respond'); $$('.chipsel .pill', root).forEach(b => b.classList.toggle('on', b === el));
    const v = VOICES.find(x => x[0] === w), lab = META[key]?.title || 'this passage';
    $(`[id="vp-${key}"]`, root).textContent = v[2].replace('{p}', lab);
  },
  rask(el) {
    const key = el.dataset.k, inp = document.getElementById('rq-' + key); const t = (inp?.value || '').trim(); if (!t) return;
    const m = META[key] || {};
    S.myq.unshift({ id: uid(), t: t.slice(0, 240), ref: m.ref || '', src: key, ttl: m.title || '', ts: Date.now(), st: 'open', n: '' });
    save(); inp.value = '';
    document.getElementById('rql-' + key).innerHTML = askList(key);
    addXP(4, 'question'); markActive(); checkAch();
  },
  rdelq(el) {
    const i = S.myq.findIndex(q => q.id === el.dataset.id); if (i < 0) return;
    S.myq.splice(i, 1); save(); const row = el.closest('.myq'); if (row) row.remove();
  },
  rguide(el) {
    const key = el.dataset.k, m = META[key] || {};
    const qs = (m.questions || []).map((q, i) => `${i + 1}. ${q}`).join('\n');
    const text = `DISCUSSION GUIDE: ${m.title}${m.ref ? '\nPassage: ' + m.ref : ''}\n\nBefore you start: read the passage aloud once. Each person says one thing they noticed, without comment from anyone else.\n\nQuestions\n${qs || '(add your own)'}\n\nTo close: where did you change your mind, even slightly? What would you want to read next?\n\nMade with RSTL (Rethinking Spiritual Truth & Literature).`;
    copy(text);
  },
  rcopy(el) {
    const key = el.dataset.k, m = META[key] || {}, r = S.resp[key] || {}, u = S.units[key] || {};
    const out = [`${m.title || key}${m.ref ? ' (' + m.ref + ')' : ''}`];
    (u.a || []).forEach((a, i) => { if (a && a.trim()) out.push(`Answer ${i + 1}: ${a.trim()}`); });
    if (r.steel && filled(r.steel)) STEEL.forEach(([f, n]) => { if (r.steel[f]) out.push(`${n}: ${r.steel[f].trim()}`); });
    if (r.voice?.t) out.push(`As ${VOICES.find(v => v[0] === r.voice.who)?.[1] || 'another voice'}: ${r.voice.t.trim()}`);
    if (r.sit) out.push(`${sitInfo()[0]}: ${r.sit.trim()}`);
    if (out.length === 1) { toast('Write something first.'); return; }
    copy(out.join('\n\n'));
  },
  react(el) {
    const k = el.dataset.k + '#' + el.dataset.sec, v = el.dataset.v; const cur = S.react[k];
    if (cur && cur.v === v) delete S.react[k]; else { S.react[k] = { v, ttl: el.dataset.ttl || '', sec: el.dataset.sec, ts: Date.now() }; if (!cur) { addXP(2, 'reaction'); markActive(); } }
    save(); checkAch();
    $$('button', el.parentElement).forEach(b => b.classList.toggle('on', S.react[k]?.v === b.dataset.v));
  }
};
export async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('Copied to clipboard'); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = 0; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast('Copied to clipboard'); } catch (er) { toast('Copy failed'); } ta.remove(); }
}

/** reaction chips for one section of one item */
export function reactRow(key, sec, ttl = '') {
  const cur = S.react[key + '#' + sec]?.v;
  return `<div class="react" role="group" aria-label="Your reaction">${REACTIONS.map(([v, n]) => `<button class="${cur === v ? 'on' : ''}" data-act="react" data-k="${esc(key)}" data-sec="${sec}" data-v="${v}" data-ttl="${esc(ttl)}">${esc(n)}</button>`).join('')}</div>`;
}
export const hasResponse = r => !!(r && (filled(r.steel) || filled(r.voice) || (r.sit && r.sit.trim())));
