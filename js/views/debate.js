import { S, save, addXP, markActive } from '../store.js';
import { ic } from '../icons.js';
import { esc, $, debounce } from '../util.js';
import { md, pageHead, toast } from '../ui.js';
import { DEBATES, byId, loadDebate, LETTER_COLORS, FALLACIES } from '../../content/debates.js';
import { TRADS } from '../../content/traditions.js';
import { LENS } from '../../content/challenges.js';

const rec = id => (S.dbt[id] ||= { seen: {}, mine: {}, ch: {} });
const trad = () => S.profile.trad || 'none';

const chip = (l, sm) => `<span class="dl${sm ? ' sm' : ''}" style="--c:${LETTER_COLORS[l] || 'var(--accent)'}">${l}</span>`;
const ul = a => `<ul class="ul">${(a || []).map(x => `<li>${md(x)}</li>`).join('')}</ul>`;
const fit = (p, t) => p.nearTo?.includes(t) ? 'near' : p.farFrom?.includes(t) ? 'far' : '';
const badge = k => k === 'near' ? `<span class="tag good">closest to you</span>` : k === 'far' ? `<span class="tag bad">try this first: hardest for you</span>` : '';

/* ---------- index ---------- */
export async function indexView() {
  const html = `${pageHead({ back: 'Explore', backTo: '#/study', kicker: 'Debate engine', title: 'Where serious people disagree', sub: 'Each debate gives every major position its strongest passages, its strongest objections, its history and its hidden assumptions, and then lets you attack the arguments. Not artificial neutrality: intellectual honesty, including where the evidence points one way.' })}
  <div class="grid g-wide">${DEBATES.map(d => { const r = S.dbt[d.id]; const n = r ? Object.keys(r.seen || {}).length : 0;
    return `<a class="card dcard" href="#/debate/${d.id}"><span class="tile-ic">${ic(d.icon)}</span><div class="kicker">${d.tags.map(esc).join(' · ')}</div><h3>${esc(d.q)}</h3><p class="muted small">${esc(d.blurb)}</p><div class="between"><span class="tiny faint">${esc(d.ref)}</span><span class="tag ${n ? 'gold' : ''}">${n}/5 positions read</span></div></a>`; }).join('')}</div>
  <div class="callout mt"><b>How to use this.</b> Read the position you disagree with most first. Then open its Challenge workbench and try to break an argument, not defend it. If you can state the opposing view so its holders would recognize it, you understand the question.</div>`;
  return { html, title: 'Debates' };
}

/* ---------- one debate ---------- */
export async function view({ p1, p2 }) {
  const meta = byId[p1]; if (!meta) return { html: '<div class="narrow"><p>Debate not found.</p><a class="btn" href="#/debate">All debates</a></div>' };
  const D = await loadDebate(p1);
  if (p2 === 'compare') return compareView(meta, D);
  if (p2) return positionView(meta, D, p2);
  const t = trad(), press = D.press?.[t] || D.press?.any;
  const html = `<div class="narrow">${pageHead({ back: 'All debates', backTo: '#/debate', kicker: meta.tags.join(' · '), title: esc(D.q) })}
  ${(Array.isArray(D.intro) ? D.intro : [D.intro]).map(p => `<p>${md(p)}</p>`).join('')}
  <div class="grid g2 mt"><div class="card tone-good"><div class="kicker">Largely settled</div>${ul(D.settled)}</div><div class="card tone-warn"><div class="kicker">Genuinely open</div>${ul(D.open)}</div></div>
  <div class="callout mt">${md(D.honest)}</div>
  ${press ? `<div class="card glow mt press"><div class="kicker">${ic('target')} Challenge for ${t === 'none' ? 'you' : esc(LENS[t] || 'you')}</div><p class="mb0">${md(press)}</p><p class="tiny faint mt mb0">Change your tradition in <a href="#/profile">Profile</a>, or see <a href="#/challenge">challenges for every tradition</a>.</p></div>` : ''}
  <div class="sec-h"><h2>The positions</h2><a href="#/debate/${p1}/compare">Compare side by side ${ic('arrowR')}</a></div>
  <div class="list">${D.positions.map(p => { const seen = S.dbt[p1]?.seen?.[p.id], k = fit(p, t);
    return `<a class="item pos" href="#/debate/${p1}/${p.id}" style="--c:${LETTER_COLORS[p.id]}">${chip(p.id)}<div><h3>${esc(p.n)} ${badge(k)}</h3><p>${esc(p.short)} · <span class="faint">${esc(p.who)}</span></p></div>${seen ? `<span class="tag gold">${ic('check')}</span>` : ''}</a>`; }).join('')}</div>
  <div class="card mt"><div class="kicker">Make it yours</div><p class="small muted">Turn this question into a proposition in My Thinking, with evidence for and against, your confidence, and a reminder to revisit it.</p><a class="btn" href="#/mind/new?t=${encodeURIComponent(D.q.replace(/\?$/, ''))}&from=${p1}">${ic('mind')} Add to My Thinking</a></div></div>`;
  return { html, title: D.q };
}

/* ---------- compare ---------- */
function compareView(meta, D) {
  const rows = [['What it claims', p => md(p.claim)], ['Strongest passage', p => p.pass?.[0] ? `${md(p.pass[0][0])}: ${md(p.pass[0][1])}` : ''], ['Strongest objection', p => md(p.obj?.[0] || '')], ['Core assumption', p => md(p.assume?.[0] || '')], ['Explains well', p => md(p.explains?.[0] || '')], ['Struggles with', p => md(p.struggles?.[0] || '')]];
  const html = `<div class="narrow">${pageHead({ back: D.q, backTo: '#/debate/' + meta.id, kicker: 'Side by side', title: 'Compare the positions' })}
  ${rows.map(([h, f]) => `<section class="cmp"><h2>${h}</h2>${D.positions.map(p => `<div class="cmp-i" style="--c:${LETTER_COLORS[p.id]}">${chip(p.id, 1)}<div><b class="small">${esc(p.n)}</b><p class="small mb0">${f(p)}</p></div></div>`).join('')}</section>`).join('')}</div>`;
  return { html, title: 'Compare: ' + D.q };
}

/* ---------- position ---------- */
let WB = null;
function positionView(meta, D, id) {
  const i = D.positions.findIndex(p => p.id === id), p = D.positions[i]; if (!p) return { html: '<p>Position not found.</p>' };
  const r = rec(meta.id), t = trad(), k = fit(p, t);
  if (!r.seen[id]) { r.seen[id] = Date.now(); save(); addXP(8, 'position studied'); markActive(); }
  const prev = D.positions[i - 1], next = D.positions[i + 1];
  const blk = (title, body, open) => `<details class="blk"${open ? ' open' : ''}><summary>${title}</summary><div class="in">${body}</div></details>`;
  const html = `<div class="narrow"><a class="back" href="#/debate/${meta.id}">${esc(D.q)}</a>
  <div class="pos-h" style="--c:${LETTER_COLORS[id]}">${chip(id)}<div><div class="kicker">Position ${id} ${badge(k)}</div><h1>${esc(p.n)}</h1><p class="muted mb0">${esc(p.who)}</p></div></div>
  <div class="card mt"><p class="lead mb0">${md(p.claim)}</p></div>
  ${blk('Strongest supporting passages', `<div class="list">${p.pass.map(([ref, why]) => `<div class="item"><div><h3>${md(ref)}</h3><p>${md(why)}</p></div></div>`).join('')}</div>`, true)}
  ${blk('Strongest objections', ul(p.obj), true)}
  ${blk('Historical development', `<div class="tl-mini">${p.hist.map(([w, x]) => `<div><b>${md(w)}</b><p>${md(x)}</p></div>`).join('')}</div>`)}
  ${blk('Philosophical assumptions', ul(p.assume))}
  <div class="grid g2 mt"><div class="card tone-good"><div class="kicker">Explains well</div>${ul(p.explains)}</div><div class="card tone-bad"><div class="kicker">Struggles to explain</div>${ul(p.struggles)}</div></div>
  <section class="wb card mt" id="wb"><div class="kicker">${ic('target')} Challenge the argument</div><h2>Try to break it</h2><p class="muted small">Pick one of this position’s own arguments. Test its assumptions, name the fallacy, look for counterexamples, or hear another position answer it.</p><div id="wb-body"></div></section>
  <div class="card mt"><div class="between wrap"><div><b>Where do you stand?</b><p class="small muted mb0">Mark the position you currently find closest, so you can see how that changes.</p></div><button class="btn ${r.mine[id] ? 'pri' : ''}" data-act="dbtMine" data-d="${meta.id}" data-p="${id}">${r.mine[id] ? ic('check') + ' Closest to me' : 'Closest to me'}</button></div></div>
  <div class="between mt2">${prev ? `<a class="btn" href="#/debate/${meta.id}/${prev.id}">← ${prev.id}: ${esc(prev.short)}</a>` : '<span></span>'}${next ? `<a class="btn pri" href="#/debate/${meta.id}/${next.id}">${next.id}: ${esc(next.short)} →</a>` : `<a class="btn" href="#/debate/${meta.id}/compare">Compare all</a>`}</div></div>`;
  const after = () => { WB = { d: meta.id, D, p, arg: p.args[0]?.id, mode: 'ass', who: null }; drawWB(); };
  return { html, after, title: p.n };
}

/* ---------- challenge workbench ---------- */
const hs = s => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const SYN = [['False dilemma', 'False dichotomy'], ['Begging the question', 'Circular reasoning'], ['Argument from silence', 'Argument from ignorance', 'Argument from silence reversed'], ['Weak analogy', 'False analogy'], ['Appeal to authority', 'Appeal to a proof-text'], ['Appeal to tradition', 'Presentism']];
function fopts(arg, key) {
  const right = arg.fal.n, bad = new Set(SYN.filter(g => g.includes(right)).flat()); bad.add(right);
  const pool = FALLACIES.filter(f => !bad.has(f) && !f.includes('(')); let seed = hs(key); const pick = [];
  while (pick.length < 3) { seed = (seed * 1103515245 + 12345) >>> 0; const f = pool[(seed >>> 8) % pool.length]; if (!pick.includes(f)) pick.push(f); }
  return [right, ...pick].sort((a, b) => hs(a + key) - hs(b + key));
}
const MODES = [['ass', 'Test assumptions'], ['fal', 'Spot the fallacy'], ['ctr', 'Counterexamples'], ['resp', 'Another perspective']];
const TRI = { 1: 'Accept', 2: 'Unsure', 3: 'Reject' };
function drawWB() {
  const box = $('#wb-body'); if (!box || !WB) return;
  const { D, p } = WB, a = p.args.find(x => x.id === WB.arg) || p.args[0]; if (!a) { box.innerHTML = '<p class="muted">No arguments here yet.</p>'; return; }
  const key = `${p.id}.${a.id}`, r = rec(WB.d), c = (r.ch[key] ||= {});
  let body = '';
  if (WB.mode === 'ass') {
    const st = c.ass || [];
    body = `<p class="small muted">Which of the hidden assumptions would you grant? Every argument rests on some.</p>` + a.ass.map(([t, rej], i) => `<div class="prem"><div class="pn">${i + 1}</div><div><p>${md(t)}</p><div class="tri">${[1, 2, 3].map(v => `<button class="${st[i] === v ? 'on' : ''}" data-act="wbAss" data-i="${i}" data-v="${v}">${TRI[v]}</button>`).join('')}</div>${st[i] === 3 || st[i] === 2 ? `<p class="note">${st[i] === 3 ? 'If you reject this: ' : 'If this is doubtful: '}${md(rej)}</p>` : ''}</div></div>`).join('');
    const n = st.filter(Boolean).length;
    if (n === a.ass.length) { const rj = st.findIndex(x => x === 3), un = st.findIndex(x => x === 2);
      body += rj >= 0 ? `<div class="verdict no"><b>The argument loses its footing for you at assumption ${rj + 1}.</b><p class="small mb0">That does not make the conclusion false. It means the conclusion needs another route.</p></div>` : un >= 0 ? `<div class="verdict mid"><b>Doubtful at assumption ${un + 1}.</b><p class="small mb0">What evidence would settle it for you?</p></div>` : `<div class="verdict ok"><b>You grant every assumption.</b><p class="small mb0">Then you are committed to taking the argument seriously. Now go to “Counterexamples” and see whether it survives them.</p></div>`; }
  } else if (WB.mode === 'fal') {
    const opts = fopts(a, key), pk = c.fal;
    body = `<p class="small muted">Every argument can be criticized for a flaw in reasoning, fairly or unfairly. Which is the most likely charge?</p><div class="opts">${opts.map(o => `<button class="opt ${pk === o ? (o === a.fal.n ? 'right' : 'wrong') : ''}" ${pk ? 'disabled' : ''} data-act="wbFal" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
    if (pk) body += `<div class="verdict ${pk === a.fal.n ? 'ok' : 'mid'}"><b>${pk === a.fal.n ? 'Right: ' : 'The usual charge is '}${esc(a.fal.n)}.</b><p class="small">${md(a.fal.why)}</p><p class="small mb0"><b>The reply from its defenders:</b> ${md(a.fal.def)}</p></div>`;
  } else if (WB.mode === 'ctr') {
    body = `<p class="small muted">Cases that strain the argument. Read each, then check how a defender would respond.</p>` + a.ctr.map(([x, rp]) => `<details class="blk"><summary>${md(x)}</summary><div class="in"><div class="kicker">A defender replies</div>${md(rp)}</div></details>`).join('');
  } else {
    const keys = Object.keys(a.resp || {}), who = WB.who && keys.includes(WB.who) ? WB.who : keys[0];
    const q = D.positions.find(x => x.id === who);
    body = `<p class="small muted">Ask another position to answer this argument.</p><div class="seg">${keys.map(l => `<button class="${l === who ? 'on' : ''}" data-act="wbWho" data-l="${l}">${l}: ${esc(D.positions.find(x => x.id === l)?.short || '')}</button>`).join('')}</div>
    ${who ? `<div class="card mt" style="--c:${LETTER_COLORS[who]}"><div class="between"><b>${chip(who, 1)} ${esc(q?.n || '')}</b></div><p class="mb0 mt">${md(a.resp[who])}</p></div>` : ''}
    <label class="lbl mt" for="wb-say">Your rebuttal, in your own words</label><textarea id="wb-say" rows="3" placeholder="Does that answer land? What would you say back?">${esc(c.say || '')}</textarea>`;
  }
  box.innerHTML = `<label class="lbl" for="wb-sel">Argument</label><select id="wb-sel">${p.args.map(x => `<option value="${x.id}" ${x.id === a.id ? 'selected' : ''}>${esc(x.claim.length > 96 ? x.claim.slice(0, 94) + '…' : x.claim)}</option>`).join('')}</select>
  <blockquote class="claim">${md(a.claim)}</blockquote><div class="seg wb-modes" role="tablist">${MODES.map(([m, n]) => `<button role="tab" class="${m === WB.mode ? 'on' : ''}" data-act="wbMode" data-m="${m}">${n}</button>`).join('')}</div><div class="wb-pane">${body}</div>`;
  $('#wb-sel').onchange = e => { WB.arg = e.target.value; drawWB(); };
  const say = $('#wb-say'); if (say) say.oninput = debounce(() => { c.say = say.value; save(); }, 400);
}
const curC = () => { const a = WB.p.args.find(x => x.id === WB.arg) || WB.p.args[0]; const key = `${WB.p.id}.${a.id}`; return { a, key, c: (rec(WB.d).ch[key] ||= {}) }; };
const reward = (c, what, xp) => { if (!c['x' + what]) { c['x' + what] = 1; save(); addXP(xp, 'argument challenged'); markActive(); } };
export const actions = {
  wbMode(el) { WB.mode = el.dataset.m; drawWB(); },
  wbWho(el) { WB.who = el.dataset.l; drawWB(); },
  wbAss(el) { const { a, c } = curC(); (c.ass ||= [])[+el.dataset.i] = +el.dataset.v; save(); if (a.ass.every((_, i) => c.ass[i])) reward(c, 'ass', 6); drawWB(); },
  wbFal(el) { const { a, c } = curC(); c.fal = el.dataset.o; save(); reward(c, 'fal', c.fal === a.fal.n ? 6 : 3); drawWB(); },
  dbtMine(el) { const r = rec(el.dataset.d); const wasOn = !!r.mine[el.dataset.p]; r.mine = {}; if (!wasOn) { r.mine[el.dataset.p] = Date.now(); toast('Marked. Return in a few months and see if it moved.'); } save(); window.dispatchEvent(new Event('app:rerender')); }
};
