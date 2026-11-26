import { S, save, addXP, markActive } from '../store.js';
import { ic } from '../icons.js';
import { esc, $, $$ } from '../util.js';
import { md, pageHead } from '../ui.js';
import { ctx } from '../ctx.js';
import { ERAS, EVENTS, byId as evById } from '../../content/timeline.js';
import { byId as dbById } from '../../content/debates.js';
import { PLACES, PLACE_ORDER } from '../../content/places.js';
import { mountViewer } from '../viewer3d.js';

/* piecewise year scale: more room for the centuries the Bible’s own story occupies */
const STOPS = [[-3500, 0], [-1500, .16], [-500, .5], [0, .74], [500, 1]];
const pos = y => { y = Math.max(-3500, Math.min(500, y)); for (let i = 1; i < STOPS.length; i++) if (y <= STOPS[i][0]) { const [a, p] = STOPS[i - 1], [b, q] = STOPS[i]; return p + (q - p) * (y - a) / (b - a); } return 1; };
const yearAt = f => { for (let i = 1; i < STOPS.length; i++) if (f <= STOPS[i][1]) { const [a, p] = STOPS[i - 1], [b, q] = STOPS[i]; return a + (b - a) * (f - p) / (q - p); } return 500; };
const fmtY = y => y < 0 ? `${Math.abs(Math.round(y))} BCE` : `${Math.round(y)} CE`;
const pc = f => (f * 100).toFixed(2) + '%';
const pickTrad = () => S.profile.trad || 'none';

function eventHTML(e) {
  const era = ERAS.find(x => x.id === e.era);
  const lit = ([t, id, note]) => `<div class="item">${id ? `<a href="#/texts/${id}" class="stretch"><h3>${esc(t)} ${ic('chevron')}</h3><p>${esc(note)}</p></a>` : `<div><h3>${esc(t)}</h3><p>${esc(note)}</p></div>`}</div>`;
  const d = e.debate && dbById[e.debate];
  return `<article class="ev" style="--c:${era.c}"><div class="kicker">${esc(era.n)} · ${esc(e.yl)}</div><h2>${esc(e.t)}</h2><p class="lead">${md(e.s)}</p>
  <div class="row mb">${e.place ? `<a class="btn pri sm" href="#/place/${e.place}">${ic('cube')} Explore in 3D</a>` : ''}${d ? `<a class="btn sm" href="#/debate/${d.id}">${ic('debate')} ${esc(d.q)}</a>` : ''}</div>
  <details class="blk" open><summary>${ic('book')} Biblical passages</summary><div class="in"><div class="list">${e.ps.map(([r, n]) => `<div class="item"><div><h3>${md(r)}</h3><p>${md(n)}</p></div></div>`).join('')}</div></div></details>
  <details class="blk" open><summary>${ic('mountain')} Archaeology and inscriptions</summary><div class="in"><div class="list">${e.ar.map(([n, t]) => `<div class="item"><div><h3>${md(n)}</h3><p>${md(t)}</p></div></div>`).join('')}</div></div></details>
  <details class="blk"><summary>${ic('scroll')} Contemporary literature</summary><div class="in"><div class="list">${e.lit.map(lit).join('')}</div></div></details>
  <details class="blk" open><summary>${ic('scale')} Competing explanations</summary><div class="in"><div class="cx">${e.cx.map(([l, t]) => `<div class="card"><b>${md(l)}</b><p class="small mb0">${md(t)}</p></div>`).join('')}</div><p class="tiny faint mt mb0">Listed side by side, not ranked. Where one view is held by most scholars, the entry says so.</p></div></details></article>`;
}
export async function view({ p1 }) {
  const first = p1 && evById[p1];
  const places = PLACE_ORDER.map(id => PLACES[id]);
  const html = `<div class="tl-page">${pageHead({ back: 'Explore', backTo: '#/study', kicker: 'Interactive timeline', title: 'The world the Bible grew in', sub: 'Eleven eras from Mesopotamia to the councils. Tap an event to see its passages, the archaeology, the literature of the time and the competing explanations. Drag the scrubber to see who was alive when.' })}
  <div class="card tl-card"><div class="tl-axis">${[-3000, -1000, -500, 0, 500].map(y => `<span style="left:${pc(pos(y))}">${fmtY(y)}</span>`).join('')}</div>
    <div class="tl-ladder" id="tl-ladder">${ERAS.map(er => { const evs = EVENTS.filter(e => e.era === er.id); return `<div class="tl-row" style="--c:${er.c}"><span class="tl-name" style="${pos(er.from) > .62 ? `right:${pc(1 - pos(er.to))};text-align:right` : `left:${pc(pos(er.from))}`}">${esc(er.n)}</span><div class="tl-bar" style="left:${pc(pos(er.from))};width:${pc(pos(er.to) - pos(er.from))}"></div>${evs.map(e => `<button class="tl-dot" data-act="tlOpen" data-id="${e.id}" style="left:${pc(pos(e.y))}" aria-label="${esc(e.t)}, ${esc(e.yl)}" title="${esc(e.t)} (${esc(e.yl)})"></button>`).join('')}</div>`; }).join('')}<div class="tl-cur" id="tl-cur" style="left:${pc(pos(-1000))}"></div></div>
    <div class="tl-scrub"><label for="tl-r" class="tiny faint">Scrub through time</label><input type="range" id="tl-r" min="0" max="1000" value="${Math.round(pos(-1000) * 1000)}" aria-label="Year"><b id="tl-y">1000 BCE</b></div><div id="tl-live" class="tl-live small"></div></div>
  <div id="tl-detail" class="mt">${first ? eventHTML(first) : `<div class="card center muted"><p class="mb0">${ic('timeline')} Choose an event above or from the list below.</p></div>`}</div>
  <div class="sec-h"><h2>Explore places in 3D</h2></div><div class="grid g-wide">${places.map(P => `<a class="card dcard" href="#/place/${P.id}"><span class="tile-ic">${ic('temple')}</span><div class="kicker">${esc(P.sub)}</div><h3>${esc(P.n)}</h3><p class="muted small mb0">${esc((P.intro || '').split('. ')[0])}.</p></a>`).join('')}</div>
  <div class="sec-h"><h2>All events</h2></div>${ERAS.map(er => `<section class="tl-grp" style="--c:${er.c}"><h3>${esc(er.n)}</h3><p class="small muted">${esc(er.blurb)}</p><div class="chips">${EVENTS.filter(e => e.era === er.id).map(e => `<button class="chipb" data-act="tlOpen" data-id="${e.id}"><b>${esc(e.t)}</b><span>${esc(e.yl)}</span></button>`).join('')}</div></section>`).join('')}</div>`;
  const after = () => {
    const r = $('#tl-r'), cur = $('#tl-cur'), yEl = $('#tl-y'), live = $('#tl-live');
    const upd = () => { const f = r.value / 1000, y = yearAt(f); cur.style.left = pc(f); yEl.textContent = fmtY(y);
      const eras = ERAS.filter(e => y >= e.from && y <= e.to), near = [...EVENTS].sort((a, b) => Math.abs(a.y - y) - Math.abs(b.y - y)).slice(0, 3);
      live.innerHTML = `<div><span class="faint">Active:</span> ${eras.map(e => `<span class="tag" style="--c:${e.c}">${esc(e.n)}</span>`).join(' ') || '<span class="faint">no era in this window</span>'}</div><div class="mt"><span class="faint">Nearest events:</span> ${near.map(e => `<button class="lnk" data-act="tlOpen" data-id="${e.id}">${esc(e.t)} <span class="faint">(${esc(e.yl)})</span></button>`).join(' · ')}</div>`; };
    r.addEventListener('input', upd); upd();
    if (first) { markSeen(first.id); }
  };
  return { html, after, title: 'Timeline' };
}
function markSeen(id) { if (!S.tl.seen[id]) { S.tl.seen[id] = Date.now(); save(); addXP(4, 'event explored'); markActive(); } }

/* ---------- 3D place ---------- */
let VIEW = null, PLACE = null;
export async function placeView({ p1 }) {
  const P = PLACES[p1]; if (!P) return { html: '<div class="narrow"><p>Place not found.</p><a class="btn" href="#/timeline">Timeline</a></div>' };
  const keys = Object.keys(P.parts);
  const html = `<div class="narrow wide">${pageHead({ back: 'Timeline', backTo: '#/timeline', kicker: `${P.sub} · 3D`, title: esc(P.n), sub: md(P.intro || P.sub) })}
  <div class="viewer-wrap"><canvas id="v3d" class="viewer" tabindex="0" aria-label="Interactive 3D model of ${esc(P.n)}. Drag to rotate, scroll or pinch to zoom, tap a part to read about it."></canvas>
    <div class="viewer-ctl"><button class="btn sm" data-act="plRot" data-d="-0.5" aria-label="Rotate left">${ic('rotate')}</button><button class="btn sm" data-act="plZoom" data-f="1.2" aria-label="Zoom in">+</button><button class="btn sm" data-act="plZoom" data-f="0.83" aria-label="Zoom out">−</button><button class="btn sm" data-act="plAuto" id="pl-auto" aria-label="Toggle auto-rotation">${ic('pause')}</button><button class="btn sm" data-act="plReset">Reset</button></div></div>
  <div id="pl-info" class="card mt press"><div class="kicker">Tap a part</div><p class="mb0 muted">Drag to turn the model, scroll to zoom, and tap any numbered pin or building to read what it was, and how firm the evidence is.</p></div>
  <div class="chips mt">${keys.map(k => `<button class="chipb" data-act="plPart" data-k="${esc(k)}"><b>${esc(P.parts[k][0])}</b></button>`).join('')}</div>
  <div class="callout mt"><b>About this model.</b> ${md(P.note)}</div></div>`;
  const after = () => {
    const c = $('#v3d'); PLACE = P; if (!S.tl.places[P.id]) { S.tl.places[P.id] = Date.now(); save(); addXP(6, 'place explored'); markActive(); }
    VIEW = mountViewer(c, P.build(), { yaw: P.yaw, pitch: P.pitch, auto: true, onSelect: showPart });
    ctx.cleanup.push(() => { VIEW?.destroy(); VIEW = null; });
  };
  return { html, after, title: P.n };
}
function showPart(k) {
  const d = PLACE?.parts?.[k]; if (!d) return; const [t, x, refs] = d;
  $('#pl-info').innerHTML = `<div class="kicker">${esc(PLACE.n)}</div><h3>${esc(t)}</h3><p>${md(x)}</p>${refs?.length ? `<div class="row">${refs.map(r => `<span class="tag">${md(r)}</span>`).join('')}</div>` : ''}`;
  $$('.chipb[data-k]').forEach(b => b.classList.toggle('on', b.dataset.k === k));
}
export const actions = {
  tlOpen(el) {
    const e = evById[el.dataset.id]; if (!e) return; $('#tl-detail').innerHTML = eventHTML(e); markSeen(e.id);
    try { history.replaceState(null, '', '#/timeline/' + e.id); } catch (x) { }
    $('#tl-detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  plPart(el) { VIEW?.select(el.dataset.k); },
  plRot(el) { VIEW?.rotate(+el.dataset.d); },
  plZoom(el) { VIEW?.zoomBy(+el.dataset.f); },
  plReset() { VIEW?.reset(); },
  plAuto(el) { VIEW?.setAuto(!VIEW.auto); el.innerHTML = ic(VIEW?.auto ? 'pause' : 'play'); }
};
