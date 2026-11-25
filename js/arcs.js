import { META, OFF, TOTAL, fromG, label, bookHue } from './bible.js';
/**
 * Rainbow cross-reference arcs. items: [{g: globalChapterIndex (target), w: weight}], from: global idx of source (or null for pairs mode)
 * mode 'pairs': items are [{a,b,w}] (global hero)
 */
export function drawArcs(canvas, opts) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth, H = canvas.clientHeight;
  if (!W || !H) return null;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr); ctx.clearRect(0, 0, W, H);
  const pad = 6, barH = 11, base = H - barH - 3;
  const X = g => pad + ((g + 0.5) / TOTAL) * (W - pad * 2);
  // book bar (rainbow along the canon)
  for (let b = 0; b < 66; b++) {
    const g0 = OFF[b], g1 = b < 65 ? OFF[b + 1] : TOTAL;
    const x0 = pad + (g0 / TOTAL) * (W - pad * 2), x1 = pad + (g1 / TOTAL) * (W - pad * 2);
    ctx.fillStyle = `hsl(${bookHue(b)} 48% 58%)`;
    ctx.fillRect(x0, base + 3, Math.max(1, x1 - x0 - 0.6), barH);
  }
  const hits = [];
  const pairs = opts.pairs || (opts.items || []).map(it => ({ a: opts.from, b: it.g, w: it.w }));
  const maxW = Math.max(1, ...pairs.map(p => p.w));
  const dim = opts.dim ? 0.5 : 1;
  pairs.sort((p, q) => p.w - q.w);
  for (const p of pairs) {
    const x1 = X(Math.min(p.a, p.b)), x2 = X(Math.max(p.a, p.b));
    const r = (x2 - x1) / 2; if (r < 0.5) continue;
    const ry = Math.min(r * (opts.flat || 1), base - 4);
    const other = opts.from != null ? p.b : Math.max(p.a, p.b);
    const h = opts.pairs ? Math.round(((p.b - p.a) / TOTAL) * 300) : bookHue(fromG(other).b);
    const strength = Math.min(1, p.w / maxW);
    ctx.beginPath();
    ctx.ellipse((x1 + x2) / 2, base, r, ry, 0, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = `hsla(${h} 56% 62% / ${(opts.pairs ? 0.16 + strength * 0.5 : 0.35 + strength * 0.5) * dim})`;
    ctx.lineWidth = opts.pairs ? 0.6 + strength * 1.2 : 1 + strength * 2.2;
    ctx.stroke();
    if (opts.from != null) hits.push({ x: X(p.b), g: p.b, w: p.w });
  }
  if (opts.from != null) {  // source marker
    const x = X(opts.from);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, base, 3.5, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, base); ctx.lineTo(x, base + 14); ctx.stroke();
  }
  return { hits, X, W, base };
}
/** attach hover/tap tooltip + click handler. returns detach fn */
export function wireArcs(canvas, getModel, onPick) {
  const wrap = canvas.parentElement;
  let tip = wrap.querySelector('.arc-tip'); if (!tip) { tip = document.createElement('div'); tip.className = 'arc-tip'; tip.hidden = true; wrap.appendChild(tip); }
  const nearest = e => {
    const m = getModel(); if (!m) return null;
    const rect = canvas.getBoundingClientRect(), x = e.clientX - rect.left;
    let best = null, bd = 12;
    m.hits.forEach(h => { const d = Math.abs(h.x - x); if (d < bd) { bd = d; best = h; } });
    if (!best) { const g = Math.round(((x - 6) / (rect.width - 12)) * TOTAL - 0.5); if (g >= 0 && g < TOTAL && (e.clientY - rect.top) > rect.height - 18) return { g, bar: true, x }; }
    return best;
  };
  const show = e => {
    const h = nearest(e); if (!h) { tip.hidden = true; return; }
    const { b, c } = fromG(h.g); const rect = canvas.getBoundingClientRect();
    tip.textContent = `${label(b, c)}${h.bar ? '' : ' · ' + h.w + ' ' + (h.w === 1 ? 'vote' : 'votes')}`;
    tip.style.left = Math.max(60, Math.min(rect.width - 60, h.x)) + 'px'; tip.style.top = (canvas.offsetTop + 30) + 'px'; tip.hidden = false;
  };
  canvas.addEventListener('pointermove', show);
  canvas.addEventListener('pointerleave', () => { tip.hidden = true; });
  canvas.addEventListener('click', e => { const h = nearest(e); if (h) { const { b, c } = fromG(h.g); onPick(b, c); } });
}
