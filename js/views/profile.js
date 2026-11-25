import { S, save, levelInfo, streak, bestStreak, replaceAll, resetAll, TITLES } from '../store.js';
import * as B from '../bible.js';
import { ACH, stats, checkAch } from '../ach.js';
import { esc, addDays, todayISO, bookColor, $, debounce } from '../util.js';
import { toast, applyPrefs, md } from '../ui.js';
import { DOMAINS, PROPS } from '../../content/beliefs.js';
import { ic } from '../icons.js';
import { TRADS, TONES, MINS } from '../../content/traditions.js';

export async function view() {
  const li = levelInfo(), s = stats(), st = streak(), best = bestStreak();
  // heatmap: last 15 weeks aligned to Sunday
  const today = todayISO(); const dow = new Date().getDay(); const cells = [];
  const start = addDays(today, -(14 * 7 + dow));
  for (let i = 0; i < 15 * 7; i++) { const d = addDays(start, i); if (d > today) { cells.push('<i style="visibility:hidden"></i>'); continue; } const x = S.days[d]?.x || 0; const l = !S.days[d]?.a ? 0 : x >= 80 ? 4 : x >= 45 ? 3 : x >= 15 ? 2 : 1; cells.push(`<i class="${l ? 'l' + l : ''}" title="${d}: ${x} XP"></i>`); }
  const perBook = {}; Object.keys(S.read).forEach(k => { const b = +k.split('.')[0]; perBook[b] = (perBook[b] || 0) + 1; });
  const notes = Object.entries(S.notes).filter(([, n]) => n.t?.trim()).sort((a, b) => b[1].ts - a[1].ts).slice(0, 12);
  const answers = Object.entries(S.units).flatMap(([k, u]) => (u.a || []).map((t, i) => t && t.trim().length > 20 ? { k, i, t, w: u.when || 0 } : null).filter(Boolean)).sort((a, b) => b.w - a.w).slice(0, 8);
  const unlocked = ACH.filter(a => S.ach[a.id]).length;
  const html = `<div class="narrow">
  <div class="card pad-lg"><div class="row" style="gap:16px"><div class="avatar" id="av">${esc((S.profile.name || 'R').trim()[0].toUpperCase())}</div><div style="flex:1;min-width:180px"><input type="text" id="pname" placeholder="Your name" value="${esc(S.profile.name)}" maxlength="30" style="font-family:var(--serif);font-size:1.3rem;background:transparent;border-color:transparent;padding-left:0"><div class="kicker">Level ${li.level} · ${esc(li.title)}</div></div></div>
  <div class="bar mt"><i style="width:${li.pct}%"></i></div><p class="tiny faint mb0 mt">${S.xp} XP · ${li.toNext} to level ${li.level + 1}</p>
  <div class="grid g4 mt"><div class="stat"><b>${ic('flame')} ${st}</b><span>current streak (best ${best})</span></div><div class="stat"><b>${s.chapters}</b><span>chapters read / 1189</span></div><div class="stat"><b>${s.dailies}</b><span>daily studies</span></div><div class="stat"><b>${s.lessons}</b><span>track lessons</span></div><div class="stat"><b>${s.notes}</b><span>verse notes</span></div><div class="stat"><b>${s.xrefs}</b><span>connections followed</span></div><div class="stat"><b>${s.args}</b><span>arguments tested</span></div><div class="stat"><b>${s.qs}</b><span>questions answered</span></div></div>
  <div class="sec-h"><h2>Activity</h2><span class="tiny faint">last 15 weeks</span></div><div class="card"><div class="heat" style="grid-template-columns:repeat(15,1fr)">${cells.join('')}</div></div>
  <div class="sec-h"><h2>Reading rainbow</h2><span class="tiny faint">${B.META.slice(0, 66).filter(m => (perBook[m.i] || 0) >= m.v.length).length} of 66 books finished</span></div>
  <div class="card"><div style="display:flex;gap:2px;height:46px;align-items:flex-end">${B.META.slice(0, 66).map(m => `<a href="#/read/${m.i}" title="${esc(m.n)}: ${(perBook[m.i] || 0)}/${m.v.length}" style="flex:${m.v.length};min-width:2px;background:var(--surface2);height:100%;position:relative;border-radius:2px;overflow:hidden"><i style="position:absolute;left:0;right:0;bottom:0;height:${Math.round((perBook[m.i] || 0) / m.v.length * 100)}%;background:${bookColor(m.i)}"></i></a>`).join('')}</div><div class="between tiny faint mt"><span>Genesis</span><span>Revelation</span></div></div>
  <div class="sec-h"><h2>Achievements</h2><span class="tiny faint">${unlocked} / ${ACH.length}</span></div>
  <div class="grid g2">${ACH.map(a => `<div class="ach ${S.ach[a.id] ? '' : 'lock'}"><div class="ai">${ic(a.i)}</div><div><h4>${esc(a.n)}</h4><p>${esc(a.d)}</p></div></div>`).join('')}</div>
  <div class="sec-h"><h2>Recent writing</h2><a href="#/journal">Open journal →</a></div>
  ${answers.length || notes.length ? `${answers.map(a => `<div class="note-i"><b>${esc(a.k.startsWith('daily:') ? 'Daily · ' + a.k.slice(6) : 'Lesson')}</b><p>${esc(a.t)}</p></div>`).join('')}${notes.map(([k, n]) => { const [b, c, v] = k.split('.'); return `<div class="note-i"><b><a href="#/read/${b}/${c}?v=${v}">${esc(B.label(+b, +c, +v))}</a></b><p>${esc(n.t)}</p></div>`; }).join('')}` : '<p class="muted">Your verse notes and written answers will collect here.</p>'}
  <div class="sec-h"><h2>Settings</h2></div>
  <div class="card"><div class="kicker">Starting point</div><p class="small muted mt">${esc((TRADS[S.profile.trad] || TRADS.none).n)}. <a href="#/welcome?redo=1">Retake the questionnaire</a> to change it. Your progress stays.</p>
  <div class="kicker mt">How hard the studies push</div><div class="row mt" style="margin-bottom:14px">${Object.entries(TONES).map(([k, v]) => `<button class="pill ${S.profile.tone === k ? 'on' : ''}" data-act="setTone" data-v="${k}">${v[0]}</button>`).join('')}</div>
  <div class="kicker">Time per day</div><div class="row mt" style="margin-bottom:14px">${Object.entries(MINS).map(([k, v]) => `<button class="pill ${+S.profile.mins === +k ? 'on' : ''}" data-act="setMins" data-v="${k}">${v[0]}</button>`).join('')}</div>
  <div class="kicker">Author’s sections</div><div class="row mt" style="margin-bottom:14px"><button class="pill ${S.profile.hideAuthor ? '' : 'on'}" data-act="toggleAuthor">${S.profile.hideAuthor ? 'Hidden' : 'Shown'}: sections from <em>Beneath the Absolute</em></button></div>
  <div class="kicker">Theme</div><div class="row mt" style="margin-bottom:14px">${['dark', 'light', 'sepia'].map(t => `<button class="pill ${S.profile.theme === t ? 'on' : ''}" data-act="theme" data-t="${t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}</div>
  <div class="kicker">Default translation</div><div class="row mt" style="margin-bottom:14px">${Object.values(B.TRANS).map(t => `<button class="pill ${S.profile.trans === t.id ? 'on' : ''}" data-act="settrans" data-t="${t.id}">${t.short} — ${esc(t.note)}</button>`).join('')}</div>
  <div class="kicker">Your data</div><p class="small muted">Everything lives in this browser only — nothing is uploaded. Export a backup to move devices or keep a copy.</p>
  <div class="row"><button class="btn sm" data-act="export">Export backup</button><label class="btn sm" style="cursor:pointer">Import backup<input type="file" accept="application/json" id="imp" hidden></label><button class="btn sm ghost" data-act="reset" style="color:var(--bad)">Erase everything</button></div></div>
  <div class="sec-h"><h2>About</h2></div>
  <div class="card"><p class="small muted">Texts: Berean Standard Bible, KJV with Apocrypha, ASV (public domain). Cross-references: <a href="https://www.openbible.info/labs/cross-references/" target="_blank" rel="noopener">OpenBible.info</a> (CC-BY), packaged via scrollmapper/bible_databases. RSTL’s cross-reference web, daily path and responses run entirely in your browser. Study content draws on <em>Beneath the Absolute</em> by O.K. Mantz and on the scholarship named in each study’s sources. Positions presented are for examination, not endorsement.</p><p class="small mb0"><a href="https://docs.google.com/document/d/1KGguzjj5Cqf5-IV4NsbXGrDJe_r9gxM5ax1mAosU9ro/edit?usp=sharing" target="_blank" rel="noopener">Read Beneath the Absolute ${ic('external')}</a></p></div></div>`;
  const after = () => {
    $('#pname').addEventListener('input', debounce(e => { S.profile.name = e.target.value.trim(); save(); }, 300));
    $('#imp').addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; try { replaceAll(JSON.parse(await f.text())); applyPrefs(S); toast('Backup restored'); window.dispatchEvent(new Event('app:rerender')); } catch (er) { toast('That file isn’t a valid backup'); } });
  };
  return { html, after };
}
export const actions = {
  setTone(el) { S.profile.tone = el.dataset.v; save(); window.dispatchEvent(new Event('app:rerender')); },
  setMins(el) { S.profile.mins = +el.dataset.v; save(); window.dispatchEvent(new Event('app:rerender')); },
  toggleAuthor() { S.profile.hideAuthor = !S.profile.hideAuthor; save(); window.dispatchEvent(new Event('app:rerender')); },
  theme(el) { S.profile.theme = el.dataset.t; save(); applyPrefs(S); window.dispatchEvent(new Event('app:rerender')); },
  settrans(el) { S.profile.trans = el.dataset.t; save(); window.dispatchEvent(new Event('app:rerender')); },
  export() { const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `rstl-backup-${todayISO()}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); },
  reset() { if (confirm('Erase all progress, notes, answers and settings on this device? This cannot be undone.')) { resetAll(); applyPrefs(S); location.hash = '#/'; location.reload(); } }
};
