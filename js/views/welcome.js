import { S, save } from '../store.js';
import { esc, todayISO, $ } from '../util.js';
import { ic } from '../icons.js';
import { rerender } from '../ui.js';
import { TRADS, TRAD_ORDER, GOALS, TONES, MINS, SEASONS } from '../../content/traditions.js';

let step = 0, D = null;
const SUB = {
  ath: 'No belief assumed. Texts read as history and literature.', que: 'Doubting, deconstructing, or unsure what you think.', spi: 'Spiritual, not tied to one tradition.',
  cat: 'Includes the deuterocanonical books.', ort: 'Eastern or Oriental; larger canons and the Fathers.', prot: 'Evangelical, Baptist, Reformed, non-denominational.',
  lut: 'Lutheran, Anglican, Methodist and other mainline churches.', pen: 'Pentecostal, charismatic, Spirit-led churches.', oth: 'Jewish and Muslim readers, with the Hebrew Bible and the Quran in conversation.', other: 'Hindu, Buddhist, Sikh, Baha’i, humanist, or anything else. Tell us in your own words.', none: 'Skip this question. Start with the default path.'
};
function init() {
  const p = S.profile;
  D = { trad: p.onboarded ? p.trad : '', tradOther: p.tradOther || '', goals: [...(p.goals || [])], tone: p.tone || 'honest', mins: +p.mins || 15, name: p.name || '', season: '' };
  step = 0;
}
const N = 5;
const prog = () => `<div class="prog" aria-hidden="true">${Array.from({ length: N + 1 }, (_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`;
const opt = (on, act, data, t, s, icon) => `<button class="opt ${on ? 'on' : ''}" data-act="${act}" ${data}>${icon ? ic(icon) : ''}<span><b>${esc(t)}</b>${s ? `<span>${esc(s)}</span>` : ''}</span><span class="tick">${ic('check')}</span></button>`;
const nav = (canNext = true, last = false) => `<div class="between mt2">${step > 0 ? `<button class="btn ghost" data-act="wizBack">${ic('arrowL')} Back</button>` : '<span></span>'}<button class="btn pri" data-act="${last ? 'wizFinish' : 'wizNext'}" ${canNext ? '' : 'disabled'}>${last ? 'Begin' : 'Continue'} ${ic('arrowR')}</button></div>`;

export async function view({ q }) {
  if (!D || q.redo) { init(); if (q.redo) history.replaceState(null, '', '#/welcome'); }
  let h = '';
  if (step === 0) h = `<div class="kicker">Welcome to RSTL</div><h1>Rethinking Spiritual Truth &amp; Literature</h1><p class="muted">A place to read Scripture and the texts around it closely, and to question, challenge and respond as you go. Five short questions set your starting point. None is a test, and you can change every answer later.</p>
    <h3 style="margin-top:26px">Where are you starting from?</h3><div class="opts">${TRAD_ORDER.map(t => opt(D.trad === t, 'wizTrad', `data-v="${t}"`, TRADS[t].n, SUB[t])).join('')}</div>
    ${D.trad === 'other' ? `<label class="flabel" for="wiz-other">In your own words (optional)</label><input type="text" id="wiz-other" maxlength="80" placeholder="e.g. Buddhist, Hindu, humanist, still working it out" value="${esc(D.tradOther)}">` : ''}${nav(!!D.trad)}`;
  if (step === 1) h = `<h1>What brings you here?</h1><p class="muted">Pick up to three.</p><div class="opts">${Object.entries(GOALS).map(([k, v]) => opt(D.goals.includes(k), 'wizGoal', `data-v="${k}"`, v, '')).join('')}</div>${nav(D.goals.length > 0)}`;
  if (step === 2) h = `<h1>How should the studies treat you?</h1><p class="muted">This sets how much of the hard material is open when you start.</p><div class="opts">${Object.entries(TONES).map(([k, v]) => opt(D.tone === k, 'wizTone', `data-v="${k}"`, v[0], v[1])).join('')}</div>${nav()}`;
  if (step === 3) h = `<h1>How much time do you have most days?</h1><p class="muted">You can always open more. This only decides what starts open.</p><div class="opts">${Object.entries(MINS).map(([k, v]) => opt(D.mins === +k, 'wizMins', `data-v="${k}"`, v[0], v[1])).join('')}</div>${nav()}`;
  if (step === 4) {
    const t = TRADS[D.trad] || TRADS.none; if (!D.season) D.season = t.start;
    h = `<h1>Where should the path begin?</h1><p class="muted">The daily path covers the whole canon and the Apocrypha, about three years. Every day is different. We suggest <b>${esc(SEASONS.find(s => s.id === t.start).n)}</b> for you; pick another if you like.</p>
    <div class="opts">${SEASONS.map(s => opt(D.season === s.id, 'wizSeason', `data-v="${s.id}"`, s.n, s.sub)).join('')}</div>
    <label class="flabel" for="wiz-name">Your first name (optional, stays on this device)</label><input type="text" id="wiz-name" maxlength="40" value="${esc(D.name)}" autocomplete="given-name">${nav(true, false)}`;
  }
  if (step === 5) {
    const t = TRADS[D.trad] || TRADS.none, all = (await import('../../content/tracks.js')).default;
    const tr = t.tracks.map(id => all.find(x => x.id === id)).filter(Boolean);
    h = `<div class="kicker">Your starting point</div><h1>${D.name ? esc(D.name) + ', here is' : 'Here is'} where we begin</h1><p>${esc(t.hello)}</p>
    <div class="card mt"><div class="kicker">First, the daily path</div><p class="mb0">Starts with <b>${esc(SEASONS.find(s => s.id === D.season).n)}</b>. ${esc(TONES[D.tone][1])} ${esc(MINS[D.mins][1])}</p></div>
    ${tr.length ? `<div class="card mt"><div class="kicker">Suggested tracks</div>${tr.map(x => `<div class="jr-row"><span>${esc(x.title)}</span><span class="faint">${x.lessons.length} lessons</span></div>`).join('')}</div>` : ''}
    <p class="small muted mt">Everything is on this device. Nothing is sent anywhere. You can retake this from your profile.</p>${nav(true, true)}`;
  }
  const html = `<div class="wiz">${prog()}${h}</div>`;
  const after = () => { const n = $('#wiz-name'); if (n) n.addEventListener('input', () => { D.name = n.value; }); const o = $('#wiz-other'); if (o) { o.addEventListener('input', () => { D.tradOther = o.value; }); } };
  return { html, after, title: 'Welcome' };
}
const go = n => { step = n; rerender(); scrollTo(0, 0); };
export const actions = {
  wizTrad(el) { D.trad = el.dataset.v; D.season = ''; rerender(); },
  wizGoal(el) { const v = el.dataset.v, i = D.goals.indexOf(v); if (i >= 0) D.goals.splice(i, 1); else if (D.goals.length < 3) D.goals.push(v); rerender(); },
  wizTone(el) { D.tone = el.dataset.v; rerender(); },
  wizMins(el) { D.mins = +el.dataset.v; rerender(); },
  wizSeason(el) { D.season = el.dataset.v; rerender(); },
  wizNext() { const o = $('#wiz-other'); if (o) D.tradOther = o.value; go(step + 1); }, wizBack() { go(Math.max(0, step - 1)); },
  wizFinish() {
    const p = S.profile, t = TRADS[D.trad] || TRADS.none;
    const seasonChanged = D.season !== p.season || !p.onboarded;
    Object.assign(p, { onboarded: true, trad: D.trad || 'none', tradOther: D.trad === 'other' ? (D.tradOther || '').trim() : '', goals: D.goals, tone: D.tone, mins: D.mins, name: D.name.trim(), season: D.season || t.start });
    if (seasonChanged || !p.start) p.start = todayISO();
    save(); D = null; location.hash = '#/';
  }
};
