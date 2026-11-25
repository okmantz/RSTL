import { S, save, uid, addXP, markActive } from '../store.js';
import { esc, $, $$, debounce, fmtDate } from '../util.js';
import { ic } from '../icons.js';
import { rerender, toast } from '../ui.js';
import { checkAch } from '../ach.js';
import { copy } from '../respond.js';
import * as B from '../bible.js';
import * as C from '../curriculum.js';
import { VOICES, STEEL } from '../../content/banks.js';
import { TRADS } from '../../content/traditions.js';

const TABS = [['entries', 'Entries'], ['resp', 'Responses'], ['q', 'My questions'], ['dig', 'Dig list'], ['past', 'Past self']];
const ST = { open: 'Open', partial: 'Partly answered', done: 'Answered' }, NEXT = { open: 'partial', partial: 'done', done: 'open' };
const PROMPTS = ['What did I read today that I could not stop thinking about?', 'Where did I disagree with the text, and was I right?', 'What do I believe now that I did not believe a year ago?', 'What question am I afraid to ask out loud?', 'Which passage did I want to skip today, and why?', 'What would I say to the author?'];
const entryRows = () => {
  const list = [...S.journal].sort((a, b) => (b.ts || 0) - (a.ts || 0));
  const form = `<div class="card mt jform" id="jform"><label class="flabel" for="je-title">New entry</label><input type="text" id="je-title" maxlength="120" placeholder="Title (optional)"><textarea id="je-body" rows="6" placeholder="Write freely. This stays on this device." aria-label="Entry text"></textarea><div class="row" style="flex-wrap:wrap;gap:6px"><span class="tiny faint">Try:</span>${PROMPTS.slice(0, 3).map((p, i) => `<button class="pill sm" data-act="jprompt" data-i="${i}">${esc(p)}</button>`).join('')}</div><div class="row mt"><input type="text" id="je-ref" maxlength="60" placeholder="Related passage (optional), e.g. John 3:16" style="flex:1;min-width:180px"><button class="btn pri" data-act="jeadd">Save entry</button></div></div>`;
  const items = list.map(e => `<div class="jitem" id="je-${e.id}"><div class="jh"><span>${esc(e.title || 'Untitled entry')}${e.ref ? ` · <a href="${refHref(e.ref)}">${esc(e.ref)}</a>` : ''}</span><span>${when(e.ts)}${e.up ? ' · edited' : ''}</span></div><div class="jt">${esc(e.body)}</div><div class="row mt"><button class="btn sm ghost" data-act="jeedit" data-id="${e.id}">Edit</button><button class="btn sm ghost" data-act="jedel" data-id="${e.id}">Delete</button></div></div>`).join('');
  return form + (items || `<p class="muted mt">No entries yet. Write about what you read, what bothered you, or what changed your mind.</p>`);
};
const refHref = r => { const p = B.parseRef(r); return p ? `#/read/${p.b}/${p.c}${p.v ? '?v=' + p.v : ''}` : '#/read'; };
const when = ts => ts ? new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
const linkFor = key => {
  if (key.startsWith('daily:')) return `#/daily/${key.slice(6, 16)}`;
  const m = /^lesson:([^:]+):(\d+)/.exec(key); return m ? `#/study/track/${m[1]}/${m[2]}` : '';
};
const titleFor = key => {
  if (key.startsWith('daily:')) { try { const iso = key.slice(6, 16); if (iso < C.startISO()) return fmtDate(iso); return C.titleAt(C.indexFor(iso).idx); } catch (e) { } }
  return S.resp[key]?.ttl || key;
};
const respRows = () => Object.entries(S.resp).filter(([, r]) => r.steel || r.voice?.t || r.sit).sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0)).map(([k, r]) => {
  const parts = [];
  if (r.steel) STEEL.forEach(([f, n]) => r.steel[f] && parts.push(`<b>${esc(n)}</b><br>${esc(r.steel[f])}`));
  if (r.voice?.t) parts.push(`<b>As ${esc(VOICES.find(v => v[0] === r.voice.who)?.[1] || 'another voice')}</b><br>${esc(r.voice.t)}`);
  if (r.sit) parts.push(`<b>${esc(TRADS[S.profile.trad]?.sit[0] || 'Reflection')}</b><br>${esc(r.sit)}`);
  const l = linkFor(k);
  return `<div class="jitem"><div class="jh"><span>${l ? `<a href="${l}">${esc(r.ttl || titleFor(k))}</a>` : esc(r.ttl || k)}</span><span>${when(r.ts)}</span></div><div class="jt">${parts.join('\n\n')}</div></div>`;
}).join('') || `<p class="muted mt">Nothing yet. Open any study and use <b>Respond</b>: steelman an idea, answer in another voice, or write a reflection.</p>`;
const qRows = () => S.myq.map(q => `<div class="jitem"><div class="jh"><span>${q.ref ? esc(q.ref) + ' · ' : ''}${q.ttl ? esc(q.ttl) : 'Free question'}</span><span>${when(q.ts)}</span></div><div class="jt">${esc(q.t)}</div><div class="row mt"><button class="btn sm" data-act="jqst" data-id="${q.id}">${esc(ST[q.st || 'open'])}</button><button class="btn sm ghost" data-act="rdelq" data-id="${q.id}">${ic('x')} Remove</button></div><textarea class="mt" data-jn="${q.id}" placeholder="What you have found so far…" style="min-height:64px">${esc(q.n || '')}</textarea></div>`).join('') || `<p class="muted mt">Add a question below, or from the Ask tab in any study.</p>`;
const digRows = () => {
  const L = { dig: 'Dig deeper', unset: 'Unsettled', disg: 'Disagree' };
  const rows = Object.entries(S.react).filter(([, r]) => L[r.v]).sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0)).map(([k, r]) => { const key = k.split('#')[0], l = linkFor(key); return `<div class="jitem"><div class="jh"><span>${esc(L[r.v])}</span><span>${when(r.ts)}</span></div><div>${l ? `<a href="${l}">${esc(r.ttl || titleFor(key))}</a>` : esc(r.ttl || key)}</div></div>`; });
  return rows.join('') || `<p class="muted mt">At the end of a section, mark it <b>Unsettled</b>, <b>Disagree</b> or <b>Dig deeper</b>. Those come back here as a list of things to follow up.</p>`;
};
const pastRows = () => {
  const out = [];
  Object.entries(S.units).forEach(([k, u]) => (u.a || []).forEach((a, i) => { if (a && a.trim().length > 30) out.push({ id: k + ':' + i, k, a, ts: u.when || 0 }); }));
  out.sort((x, y) => (y.ts || 0) - (x.ts || 0));
  return out.slice(0, 40).map(o => { const reps = S.rep[o.id] || []; const l = linkFor(o.k); return `<div class="jitem"><div class="jh"><span>${l ? `<a href="${l}">${esc(titleFor(o.k))}</a>` : esc(o.k)}</span><span>${o.k.startsWith('daily:') ? esc(o.k.slice(6, 16)) : ''}</span></div><div class="jt">${esc(o.a)}</div>${reps.map(r => `<div class="jt mt" style="border-left:2px solid var(--accent);padding-left:10px"><span class="tiny faint">${when(r.ts)}, replying</span><br>${esc(r.t)}</div>`).join('')}<div class="row mt"><input type="text" id="rep-${esc(o.id)}" placeholder="Reply to your earlier self…" style="flex:1;min-width:180px"><button class="btn sm" data-act="jrep" data-id="${esc(o.id)}">Add reply</button></div></div>`; }).join('') || `<p class="muted mt">Once you have written answers in studies, they appear here and you can reply to what you wrote. Changing your mind is the point.</p>`;
};
export async function view({ q }) {
  const t = TABS.some(x => x[0] === q.t) ? q.t : 'entries';
  const body = t === 'entries' ? entryRows() : t === 'resp' ? respRows() : t === 'q' ? `<div class="row mt"><input type="text" id="jq-new" maxlength="240" placeholder="Write a question…" style="flex:1;min-width:200px"><button class="btn pri sm" data-act="jqadd">Add</button></div>${qRows()}` : t === 'dig' ? digRows() : pastRows();
  const html = `<div class="narrow"><h1>Journal</h1><p class="muted">Everything you have written, asked or reacted to, in one place. It lives on this device.</p>
  <div class="seg">${TABS.map(([id, n]) => `<a role="tab" class="${t === id ? 'on' : ''}" href="#/journal?t=${id}">${esc(n)}</a>`).join('')}</div>${body}
  <div class="hr"></div><div class="row"><button class="btn sm" data-act="jexport">${ic('download')} Export as text</button></div></div>`;
  const after = () => {
    $$('textarea[data-jn]').forEach(x => x.addEventListener('input', debounce(() => { const it = S.myq.find(m => m.id === x.dataset.jn); if (it) { it.n = x.value; save(); } }, 400)));
    const inp = $('#jq-new'); if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); actions.jqadd(); } });
  };
  return { html, after, title: 'Journal' };
}
const readForm = () => ({ title: ($('#je-title')?.value || '').trim().slice(0, 120), body: ($('#je-body')?.value || '').trim(), ref: ($('#je-ref')?.value || '').trim().slice(0, 60) });
export const actions = {
  jprompt(el) { const b = $('#je-body'); if (!b) return; const p = PROMPTS[+el.dataset.i]; b.value = b.value ? b.value + '\n\n' + p + '\n' : p + '\n'; b.focus(); },
  jeadd() {
    const f = readForm(); if (!f.body) { toast('Write something first.'); return; }
    const ed = $('#jform')?.dataset.edit;
    if (ed) { const e = S.journal.find(x => x.id === ed); if (e) { Object.assign(e, f, { up: Date.now() }); } save(); toast('Entry updated'); rerender(); return; }
    S.journal.unshift({ id: uid(), ...f, ts: Date.now() }); save(); addXP(6, 'journal entry'); markActive(); checkAch(); rerender();
  },
  jeedit(el) {
    const e = S.journal.find(x => x.id === el.dataset.id); if (!e) return;
    const f = $('#jform'); f.dataset.edit = e.id; $('#je-title').value = e.title || ''; $('#je-body').value = e.body; $('#je-ref').value = e.ref || '';
    f.querySelector('label').textContent = 'Editing entry'; f.querySelector('[data-act=jeadd]').textContent = 'Save changes'; f.scrollIntoView({ behavior: 'smooth', block: 'center' }); $('#je-body').focus();
  },
  jedel(el) { if (!confirm('Delete this entry? This cannot be undone.')) return; S.journal = S.journal.filter(x => x.id !== el.dataset.id); save(); rerender(); },
  jqst(el) { const q = S.myq.find(m => m.id === el.dataset.id); if (!q) return; q.st = NEXT[q.st || 'open']; save(); el.textContent = ST[q.st]; },
  jqadd() { const i = $('#jq-new'), t = (i?.value || '').trim(); if (!t) return; S.myq.unshift({ id: uid(), t: t.slice(0, 240), ref: '', src: '', ttl: '', ts: Date.now(), st: 'open', n: '' }); save(); addXP(4, 'question'); markActive(); checkAch(); rerender(); },
  jrep(el) { const id = el.dataset.id, i = document.getElementById('rep-' + id), t = (i?.value || '').trim(); if (!t) return; (S.rep[id] ||= []).push({ t, ts: Date.now() }); save(); addXP(5, 'reply to your past self'); markActive(); rerender(); },
  jexport() {
    const L = ['RSTL JOURNAL', 'Exported ' + new Date().toLocaleDateString(), ''];
    L.push('== ENTRIES =='); [...S.journal].sort((a, b) => a.ts - b.ts).forEach(e => L.push(`\n${new Date(e.ts).toLocaleDateString()} · ${e.title || 'Untitled'}${e.ref ? ' (' + e.ref + ')' : ''}\n${e.body}`));
    L.push('\n== RESPONSES =='); Object.entries(S.resp).forEach(([k, r]) => { L.push('\n' + (r.ttl || k)); if (r.steel) STEEL.forEach(([f, n]) => r.steel[f] && L.push(n + ': ' + r.steel[f])); if (r.voice?.t) L.push('As ' + (VOICES.find(v => v[0] === r.voice.who)?.[1] || 'voice') + ': ' + r.voice.t); if (r.sit) L.push('Reflection: ' + r.sit); });
    L.push('\n== MY QUESTIONS =='); S.myq.forEach(q => L.push(`[${ST[q.st || 'open']}] ${q.t}${q.n ? '\n   Notes: ' + q.n : ''}`));
    L.push('\n== ANSWERS TO STUDY QUESTIONS =='); Object.entries(S.units).forEach(([k, u]) => (u.a || []).forEach(a => { if (a && a.trim()) L.push(`${titleFor(k)}: ${a.trim()}`); }));
    const b = new Blob([L.join('\n')], { type: 'text/plain' }), a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'rstl-journal.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
};
