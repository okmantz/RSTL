import { S, save, addXP, markActive, uid } from '../store.js';
import { ic } from '../icons.js';
import { esc, $, $$, todayISO, fmtDate } from '../util.js';
import { md, pageHead, toast } from '../ui.js';

const DAY = 864e5;
const P = id => S.mind.props.find(p => p.id === id);
const cadOf = p => p.cad || S.mind.cad || 30;
const last = p => (p.rev?.length ? p.rev[p.rev.length - 1].ts : p.created);
export const dueAt = p => last(p) + cadOf(p) * DAY;
export const dueProps = () => S.mind.props.filter(p => Date.now() >= dueAt(p)).sort((a, b) => dueAt(a) - dueAt(b));
const dShort = ts => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
const ago = ts => { const d = Math.floor((Date.now() - ts) / DAY); return d < 1 ? 'today' : d < 60 ? d + ' days ago' : Math.round(d / 30) + ' months ago'; };
const points = p => [{ ts: p.created, c: p.c0 ?? p.conf, k: 'start' }, ...(p.rev || []).map(r => ({ ts: r.ts, c: r.conf, k: 'review' }))];
const LISTS = [
  ['sup', 'Supporting evidence', 'A passage, a historical source, an argument you find strong', 'good'],
  ['ctr', 'Counterevidence', 'The best objection or the fact that cuts against it', 'bad'],
  ['ass', 'Assumptions', 'What has to be true for your reasoning to work', 'warn'],
  ['alt', 'Counterarguments', 'How someone who disagrees would explain the same evidence', 'blue'],
  ['open', 'Open questions', 'What you still do not know', 'violet']
];
const SEEDS = ['The resurrection of Jesus is a historical event', 'The Bible is without error', 'Jesus claimed to be divine', 'Salvation is by faith alone', 'The Exodus happened roughly as told', 'A good God and the existence of suffering are compatible', 'The Gospels are reliable history', 'Hell is eternal conscious punishment'];
const confWord = c => c >= 90 ? 'almost certain' : c >= 70 ? 'confident' : c >= 55 ? 'leaning yes' : c > 45 ? 'undecided' : c > 25 ? 'leaning no' : c > 10 ? 'doubtful' : 'almost certainly not';

function chart(p) {
  const pts = points(p); if (pts.length < 2) return `<p class="small muted mb0">One point so far. After your first review this becomes a line showing how your confidence has moved.</p>`;
  const W = 600, H = 150, pad = 26, t0 = pts[0].ts, t1 = Math.max(pts[pts.length - 1].ts, t0 + DAY), X = t => pad + (W - 2 * pad) * (t - t0) / (t1 - t0), Y = c => H - pad - (H - 2 * pad) * c / 100;
  const d = pts.map((q, i) => (i ? 'L' : 'M') + X(q.ts).toFixed(1) + ' ' + Y(q.c).toFixed(1)).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" class="trend" role="img" aria-label="Confidence over time: ${pts.map(q => q.c + '% on ' + dShort(q.ts)).join(', ')}"><line x1="${pad}" x2="${W - pad}" y1="${Y(50)}" y2="${Y(50)}" class="g"/><text x="${pad}" y="${Y(100) + 4}" class="t">100</text><text x="${pad}" y="${Y(0)}" class="t">0</text><path d="${d}" class="ln"/>${pts.map(q => `<circle cx="${X(q.ts).toFixed(1)}" cy="${Y(q.c).toFixed(1)}" r="4.5" class="pt"/>`).join('')}<text x="${pad}" y="${H - 4}" class="t">${dShort(t0)}</text><text x="${W - pad}" y="${H - 4}" class="t" text-anchor="end">${dShort(t1)}</text></svg>`;
}
const card = p => { const due = Date.now() >= dueAt(p), pts = points(p), mv = pts.length > 1 ? p.conf - pts[0].c : 0;
  return `<a class="card pcard" href="#/mind/${p.id}"><div class="between"><span class="tag ${due ? 'gold' : ''}">${due ? ic('bell') + ' Review due' : 'Next review ' + dShort(dueAt(p))}</span><b class="conf-n">${p.conf}%</b></div><h3>${esc(p.t)}</h3><div class="bar thin"><i style="width:${p.conf}%"></i></div><p class="tiny faint mb0 mt">${confWord(p.conf)} · ${p.rev?.length || 0} review${p.rev?.length === 1 ? '' : 's'}${mv ? ` · moved ${mv > 0 ? '+' : ''}${mv} since you began` : ''}</p></a>`; };

/* ---------- list ---------- */
export async function view() {
  const props = S.mind.props, due = dueProps();
  const html = `${pageHead({ back: 'Explore', backTo: '#/study', kicker: 'My Thinking', title: 'Your belief and argument laboratory', sub: 'State a proposition. Build its evidence profile honestly: what supports it, what cuts against it, what you are assuming. Rate your confidence. Then come back, and let the app ask whether you still think so.' })}
  ${due.length ? `<div class="card glow press"><div class="kicker">${ic('bell')} Intellectual evolution: ${due.length} due</div><p class="small muted">Time to revisit ${due.length > 1 ? 'these conclusions' : 'this conclusion'}. Four questions each, about five minutes.</p><div class="list">${due.map(p => `<a class="item" href="#/mind/${p.id}/review"><span class="n">${ic('bell')}</span><div><h3>${esc(p.t)}</h3><p>Last looked at ${ago(last(p))} · you said ${p.conf}%</p></div></a>`).join('')}</div></div>` : ''}
  <div class="sec-h"><h2>Propositions</h2><a class="btn pri sm" href="#/mind/new">${ic('plus')} New</a></div>
  ${props.length ? `<div class="grid g2">${props.map(card).join('')}</div>` : `<div class="card center"><p class="muted">Nothing here yet. Start with something you actually have a view on.</p><div class="chips" style="justify-content:center">${SEEDS.slice(0, 4).map(s => `<a class="chipb" href="#/mind/new?t=${encodeURIComponent(s)}"><b>${esc(s)}</b></a>`).join('')}</div></div>`}
  ${props.length ? `<div class="card mt"><div class="kicker">Ideas</div><div class="chips">${SEEDS.filter(s => !props.some(p => p.t === s)).slice(0, 5).map(s => `<a class="chipb" href="#/mind/new?t=${encodeURIComponent(s)}"><b>${esc(s)}</b></a>`).join('')}</div></div>` : ''}
  <div class="card mt"><div class="between wrap"><div><b>Review cadence</b><p class="small muted mb0">How often the app asks you to revisit a conclusion.</p></div><select id="m-cad" aria-label="Review cadence">${[[14, 'Every 2 weeks'], [30, 'Monthly'], [60, 'Every 2 months'], [90, 'Quarterly'], [180, 'Twice a year']].map(([v, n]) => `<option value="${v}" ${S.mind.cad === v ? 'selected' : ''}>${n}</option>`).join('')}</select></div></div>
  <div class="grid g2 mt"><a class="card dcard" href="#/study/beliefs"><span class="tile-ic">${ic('map')}</span><h3>Belief Map</h3><p class="muted small mb0">Snapshot a broad set of positions and measure drift.</p></a><a class="card dcard" href="#/study/lab"><span class="tile-ic">${ic('scale')}</span><h3>Argument Lab</h3><p class="muted small mb0">Test famous arguments premise by premise.</p></a></div>`;
  const after = () => { $('#m-cad').onchange = e => { S.mind.cad = +e.target.value; save(); toast('Saved'); }; };
  return { html, after, title: 'My Thinking' };
}

/* ---------- new ---------- */
export async function newView({ q }) {
  const html = `<div class="narrow">${pageHead({ back: 'My Thinking', backTo: '#/mind', kicker: 'New proposition', title: 'What do you think is true?', sub: 'Write it as a claim that could be wrong. “The resurrection is a historical event” works; “Jesus is wonderful” does not.' })}
  <div class="card"><label class="lbl" for="m-t">Proposition</label><textarea id="m-t" rows="3" placeholder="e.g. The resurrection of Jesus is a historical event">${esc(q.t || '')}</textarea>
  <label class="lbl mt" for="m-c">Confidence right now: <b id="m-cv">50%</b> <span id="m-cw" class="faint">undecided</span></label><input type="range" id="m-c" min="0" max="100" value="50"><div class="between tiny faint"><span>certainly false</span><span>certainly true</span></div>
  <div class="row mt"><button class="btn pri" data-act="mindCreate" data-from="${esc(q.from || '')}">Create and build the evidence profile</button></div></div></div>`;
  const after = () => { const c = $('#m-c'); c.oninput = () => { $('#m-cv').textContent = c.value + '%'; $('#m-cw').textContent = confWord(+c.value); }; $('#m-t').focus(); };
  return { html, after, title: 'New proposition' };
}

/* ---------- one proposition ---------- */
export async function propView({ p1 }) {
  const p = P(p1); if (!p) return { html: '<div class="narrow"><p>Proposition not found.</p><a class="btn" href="#/mind">My Thinking</a></div>' };
  const due = Date.now() >= dueAt(p);
  const html = `<div class="narrow">${pageHead({ back: 'My Thinking', backTo: '#/mind', kicker: `Since ${dShort(p.created)}${p.from ? ' · from a debate' : ''}`, title: esc(p.t) })}
  <div class="card"><label class="lbl" for="m-c">Confidence: <b id="m-cv">${p.conf}%</b> <span id="m-cw" class="faint">${confWord(p.conf)}</span></label><input type="range" id="m-c" min="0" max="100" value="${p.conf}" data-id="${p.id}"><div class="between tiny faint"><span>certainly false</span><span>certainly true</span></div></div>
  <div class="card mt ${due ? 'glow press' : ''}"><div class="between wrap"><div><b>${due ? 'Review due' : 'Next review ' + dShort(dueAt(p))}</b><p class="small muted mb0">${due ? 'Do you still believe this?' : `Last looked at ${ago(last(p))}.`}</p></div><a class="btn ${due ? 'pri' : ''}" href="#/mind/${p.id}/review">${ic('trend')} Review now</a></div></div>
  ${LISTS.map(([k, n, ph, tone]) => `<section class="card mt ev-l tone-${tone}"><div class="kicker">${n}</div>${(p[k] || []).length ? `<ul class="ul">${p[k].map((x, i) => `<li><span>${md(x)}</span><button class="x" data-act="mindDel" data-id="${p.id}" data-l="${k}" data-i="${i}" aria-label="Remove">×</button></li>`).join('')}</ul>` : `<p class="small faint">${ph}.</p>`}<div class="add"><input type="text" id="add-${k}" placeholder="Add…" aria-label="Add to ${n}"><button class="btn sm" data-act="mindAdd" data-id="${p.id}" data-l="${k}">Add</button></div></section>`).join('')}
  <div class="sec-h"><h2>How your thinking has moved</h2></div><div class="card">${chart(p)}</div>
  ${(p.rev || []).length ? `<div class="list mt">${[...p.rev].reverse().map(r => `<details class="blk"><summary>${dShort(r.ts)} · ${r.conf}% · ${({ yes: 'still believe', less: 'less sure', more: 'more sure', no: 'changed my mind' })[r.still] || ''}</summary><div class="in">${r.ev ? `<p><b>New evidence:</b> ${md(r.ev)}</p>` : ''}${r.opp ? `<p><b>The opposing view, restated:</b> ${md(r.opp)}</p>` : ''}${r.conv ? `<p class="mb0"><b>What would change my mind:</b> ${md(r.conv)}</p>` : ''}</div></details>`).join('')}</div>` : ''}
  <div class="between mt2 wrap"><a class="btn" href="#/debate">${ic('debate')} Find a debate on this</a><button class="btn ghost" data-act="mindRemove" data-id="${p.id}">Delete proposition</button></div></div>`;
  const after = () => {
    const c = $('#m-c'); c.oninput = () => { $('#m-cv').textContent = c.value + '%'; $('#m-cw').textContent = confWord(+c.value); };
    c.onchange = () => { p.conf = +c.value; p.adj = todayISO(); save(); };
    $$('.add input').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') i.nextElementSibling.click(); }));
  };
  return { html, after, title: p.t };
}

/* ---------- review ---------- */
export async function reviewView({ p1 }) {
  const p = P(p1); if (!p) return { html: '<p>Not found.</p>' };
  const lr = (p.rev || []).slice(-1)[0];
  const html = `<div class="narrow">${pageHead({ back: 'Back', backTo: '#/mind/' + p.id, kicker: 'Intellectual evolution', title: 'Revisit this conclusion', sub: `On ${dShort(last(p))} you said <b>${p.conf}%</b> (${confWord(p.conf)}).` })}
  <div class="card tone-warn"><b>${esc(p.t)}</b></div>
  <div class="card mt"><div class="kicker">1. Do you still believe this?</div><div class="seg" id="r-still">${[['yes', 'Still do'], ['more', 'More sure'], ['less', 'Less sure'], ['no', 'No longer']].map(([v, n], i) => `<button class="${i === 0 ? 'on' : ''}" data-act="mindStill" data-v="${v}">${n}</button>`).join('')}</div>
    <label class="lbl mt" for="m-c">Your confidence now: <b id="m-cv">${p.conf}%</b></label><input type="range" id="m-c" min="0" max="100" value="${p.conf}"></div>
  <div class="card mt"><div class="kicker">2. Have you met evidence that changes your position?</div><textarea id="r-ev" rows="3" placeholder="A text, a fact, an argument, a conversation… or honestly: nothing new."></textarea></div>
  <div class="card mt"><div class="kicker">3. Can you now state the opposing position more accurately?</div>${(p.alt || []).length ? `<p class="small muted">Last time you recorded: ${p.alt.map(x => '“' + md(x) + '”').join(' · ')}</p>` : ''}<textarea id="r-opp" rows="4" placeholder="Write it the way its best defender would, so they would say: yes, that is what I think."></textarea></div>
  <div class="card mt"><div class="kicker">4. What would convince you to change your mind?</div>${lr?.conv ? `<p class="small muted">Last time you said: “${md(lr.conv)}”. Has that happened?</p>` : ''}<textarea id="r-conv" rows="3" placeholder="Be specific. If nothing could, say so, and ask whether that is a conviction or a habit."></textarea></div>
  <div class="row mt"><button class="btn pri lg" data-act="mindSave" data-id="${p.id}">Save this review</button><a class="btn" href="#/mind/${p.id}">Cancel</a></div></div>`;
  const after = () => { const c = $('#m-c'); c.oninput = () => { $('#m-cv').textContent = c.value + '%'; }; };
  return { html, after, title: 'Review' };
}

const rer = () => window.dispatchEvent(new Event('app:rerender'));
export const actions = {
  mindCreate(el) {
    const t = $('#m-t').value.trim(); if (!t) { toast('Write the proposition first'); return; }
    const c = +$('#m-c').value, p = { id: uid(), t, conf: c, c0: c, created: Date.now(), sup: [], ctr: [], ass: [], alt: [], open: [], rev: [], from: el.dataset.from || '' };
    S.mind.props.unshift(p); save(); addXP(10, 'proposition created'); markActive(); location.hash = '#/mind/' + p.id;
  },
  mindAdd(el) { const p = P(el.dataset.id), i = $('#add-' + el.dataset.l), v = i.value.trim(); if (!p || !v) return; (p[el.dataset.l] ||= []).push(v); save(); rer(); setTimeout(() => $('#add-' + el.dataset.l)?.focus(), 80); },
  mindDel(el) { const p = P(el.dataset.id); p?.[el.dataset.l]?.splice(+el.dataset.i, 1); save(); rer(); },
  mindRemove(el) { if (!confirm('Delete this proposition and its history?')) return; S.mind.props = S.mind.props.filter(p => p.id !== el.dataset.id); save(); location.hash = '#/mind'; },
  mindStill(el) { $$('#r-still button').forEach(b => b.classList.toggle('on', b === el)); },
  mindSave(el) {
    const p = P(el.dataset.id); if (!p) return;
    const still = $('#r-still .on')?.dataset.v || 'yes', conf = +$('#m-c').value;
    (p.rev ||= []).push({ ts: Date.now(), conf, still, ev: $('#r-ev').value.trim(), opp: $('#r-opp').value.trim(), conv: $('#r-conv').value.trim() });
    p.conf = conf; save(); addXP(20, 'conclusion revisited'); markActive(); toast('Review saved'); location.hash = '#/mind/' + p.id;
  }
};
