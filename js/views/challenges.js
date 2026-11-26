import { S, save, addXP, markActive, resp } from '../store.js';
import { ic } from '../icons.js';
import { esc, $, $$, debounce } from '../util.js';
import { md, pageHead } from '../ui.js';
import C, { LENS, challengesFor } from '../../content/challenges.js';

const KEYS = ['cat', 'ort', 'prot', 'lut', 'pen', 'oth', 'ath', 'que', 'spi', 'other', 'none'];
export async function view({ q }) {
  const own = S.profile.trad || 'none', k = KEYS.includes(q.as) ? q.as : own, items = challengesFor(k), mine = k === own;
  const html = `<div class="narrow wide">${pageHead({ back: 'Explore', backTo: '#/study', kicker: 'Challenge me', title: `Hard questions for ${k === 'none' ? 'anyone starting out' : LENS[k]}`, sub: 'Every tradition has a place where it is pressed hardest. These are the strongest objections that people outside it raise, paired with the best reply from inside. Not to unsettle you for its own sake, but because a view that has never met its best opponent has not been tested.' })}
  <div class="chips">${KEYS.map(x => `<a class="chipb ${x === k ? 'on' : ''}" href="#/challenge?as=${x}"><b>${esc(LENS[x].replace(/^an? /, '').replace(/^of /, ''))}</b></a>`).join('')}</div>
  <p class="small muted mt">${mine ? 'Showing challenges for your tradition. Switch above to see what other communities are asked.' : `You are looking at what ${esc(LENS[k])} is asked. Try reading it as someone from that community would, and notice which replies persuade you.`}</p>
  <div class="list mt">${items.map((it, i) => { const key = `ch:${k}:${i}`, r = S.resp[key] || {};
    return `<details class="blk chal" ${i === 0 ? 'open' : ''}><summary><span class="n">${i + 1}</span><span><b>${esc(it.title)}</b><em>${esc(it.claim)}</em></span></summary><div class="in">
    <div class="kicker">The challenge</div><p>${md(it.press)}</p>
    <div class="row">${it.passages.map(p => `<span class="tag">${md(p)}</span>`).join('')}</div>
    <details class="blk inner"><summary>${ic('shield')} The strongest reply from inside the tradition</summary><div class="in"><p class="mb0">${md(it.reply)}</p></div></details>
    <div class="card mt press"><div class="kicker">${ic('speech')} Sit with this</div><p>${md(it.ask)}</p><textarea rows="3" data-k="${key}" placeholder="Your honest answer, in your own words (saved on this device)">${esc(r.say || '')}</textarea></div></div></details>`; }).join('')}</div>
  <div class="grid g2 mt"><a class="card dcard" href="#/debate"><span class="tile-ic">${ic('debate')}</span><h3>Debate engine</h3><p class="muted small mb0">Test these in full structured debates.</p></a><a class="card dcard" href="#/mind"><span class="tile-ic">${ic('mind')}</span><h3>My Thinking</h3><p class="muted small mb0">Record where you land and revisit it later.</p></a></div></div>`;
  const after = () => $$('textarea[data-k]').forEach(t => t.addEventListener('input', debounce(() => { const r = resp(t.dataset.k); const first = !r.say; r.say = t.value; r.ts = Date.now(); save(); if (first && t.value.trim()) { addXP(8, 'challenge answered'); markActive(); } }, 500)));
  return { html, after, title: 'Challenge me' };
}
export const actions = {};
