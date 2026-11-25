import { S, save, addXP, dayRec, markActive } from './store.js';
import { todayISO, esc } from './util.js';
import { checkAch } from './ach.js';
import * as B from './bible.js';
import { rerender } from './ui.js';
const hrefOf = r => { const p = B.parseRef(r); return p ? `#/read/${p.b}/${p.c}${p.v ? '?v=' + p.v : ''}` : '#/read'; };
export const MOODS = [
  { id: 'certain', e: '☀️', n: 'Certain', ref: 'Psalm 23', line: 'Certainty is a gift — test it anyway, so it holds weight.' },
  { id: 'hungry', e: '🔥', n: 'Hungry', ref: 'Psalm 63:1-8', line: 'Appetite is where every real search starts.' },
  { id: 'doubting', e: '❓', n: 'Doubting', ref: 'Mark 9:14-29', line: 'The honest prayer of someone who wants to believe and can’t quite manage it.' },
  { id: 'angry', e: '⚡', n: 'Angry at God', ref: 'Job 23', line: 'Scripture has a whole shelf for this: Job, the Psalms of lament, Jeremiah’s lawsuit.' },
  { id: 'numb', e: '🌫️', n: 'Numb', ref: 'Psalm 88', line: 'The one psalm that never turns the corner — it makes room for exactly this.' },
  { id: 'grieving', e: '🕊️', n: 'Grieving', ref: 'John 11:17-37', line: 'Even here the shortest verse in English is about weeping.' },
  { id: 'grateful', e: '🌿', n: 'Grateful', ref: 'Psalm 103', line: 'Let it be specific.' },
  { id: 'rattled', e: '🌪️', n: 'Rattled', ref: 'Genesis 32:22-32', line: 'Jacob was renamed in a fight, and walked away limping. Rattled is a respectable condition.' }
];
export function checkinCard() {
  const today = dayRec().c;
  if (today) {
    const m = MOODS.find(x => x.id === today.m) || MOODS[0];
    return `<div class="card"><div class="between"><div><div class="kicker">Today’s check-in</div><h3 class="mb0">${m.e} ${esc(m.n)}</h3></div><a class="btn sm" href="${hrefOf(m.ref)}">Read: ${esc(m.ref)}</a></div><p class="muted small mt mb0">${esc(m.line)}</p>${today.n ? `<p class="small mt mb0"><em>“${esc(today.n)}”</em></p>` : ''}</div>`;
  }
  return `<div class="card"><div class="kicker">Daily check-in</div><h3>Where is your heart today?</h3><div class="moods">${MOODS.map(m => `<button class="mood" data-act="mood" data-m="${m.id}"><span class="e">${m.e}</span>${esc(m.n)}</button>`).join('')}</div><div id="ci-extra" hidden class="mt"><textarea id="ci-note" placeholder="One honest sentence (optional)" style="min-height:64px"></textarea><button class="btn pri mt" data-act="checkin">Check in · +15 XP</button></div></div>`;
}
export const checkinActions = {
  mood(el) { document.querySelectorAll('.mood').forEach(b => b.classList.toggle('on', b === el)); const x = document.getElementById('ci-extra'); x.hidden = false; x.dataset.m = el.dataset.m; },
  checkin() {
    const x = document.getElementById('ci-extra'); const d = dayRec();
    if (d.c) return;
    d.c = { m: x.dataset.m, n: (document.getElementById('ci-note').value || '').trim().slice(0, 240), t: Date.now() }; save();
    addXP(15, 'check-in'); markActive(); checkAch(); rerender();
  }
};
