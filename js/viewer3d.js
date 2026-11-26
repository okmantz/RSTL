/* RSTL 3D viewer: a tiny dependency-free renderer (canvas 2D, painter's algorithm).
 * Used for the schematic temple and city models on the timeline. Models are built from boxes,
 * cylinders, gables and stairs; every shape belongs to a named "part" the reader can tap.
 * Drag to orbit, scroll or pinch to zoom, tap a numbered pin (or any surface) to read about that part. */

const hex = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };

export class Scene {
  constructor() { this.faces = []; this.pins = []; this.radius = 10; this.target = [0, 0, 0]; }
  /** add a convex solid made of faces (arrays of points); normals are oriented away from the solid's centre */
  solid(part, faces, color, o = {}) {
    const all = faces.flat(); const c = [0, 1, 2].map(i => all.reduce((s, p) => s + p[i], 0) / all.length);
    const rgb = hex(color);
    faces.forEach(f => {
      let n = cross(sub(f[1], f[0]), sub(f[2], f[0])); n = norm(n);
      const fc = [0, 1, 2].map(i => f.reduce((s, p) => s + p[i], 0) / f.length);
      if (dot(n, sub(fc, c)) < 0) n = [-n[0], -n[1], -n[2]];
      this.faces.push({ p: f, n, c: rgb, part, a: o.a ?? 1, bg: !!o.bg, lay: o.bg ? 0 : (o.lay ?? 6), edge: o.edge !== false });
    });
  }
  /** axis-aligned box from its minimum corner [x,y,z] with size [w,h,d] */
  box(part, [x, y, z], [w, h, d], color, o = {}) {
    const X = x + w, Y = y + h, Z = z + d;
    const v = [[x, y, z], [X, y, z], [X, Y, z], [x, Y, z], [x, y, Z], [X, y, Z], [X, Y, Z], [x, Y, Z]];
    const F = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [3, 2, 6, 7], [0, 3, 7, 4], [1, 2, 6, 5]];
    this.solid(part, (o.noTop ? F.filter((_, i) => i !== 3) : F).map(f => f.map(i => v[i])), color, o);
    if (!o.bg) this.grow(x, z, X, Z, Y);
  }
  /** upright cylinder centred on [cx,y,cz] */
  cyl(part, [cx, y, cz], r, h, color, o = {}) {
    const n = o.sides || 14, top = [], bot = [], F = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; top.push([cx + r * Math.cos(a), y + h, cz + r * Math.sin(a)]); bot.push([cx + r * Math.cos(a), y, cz + r * Math.sin(a)]); }
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; F.push([bot[i], bot[j], top[j], top[i]]); }
    F.push(top, bot);
    this.solid(part, F, color, { ...o, edge: o.edge ?? false });
    this.grow(cx - r, cz - r, cx + r, cz + r, y + h);
  }
  /** gabled roof: ridge runs along x; base box from [x,y,z] size [w,.,d]; rises `rise` above y */
  gable(part, [x, y, z], [w, d], rise, color, o = {}) {
    const X = x + w, Z = z + d, m = z + d / 2, T = y + rise;
    const a = [x, y, z], b = [X, y, z], c = [X, y, Z], e = [x, y, Z], r1 = [x, T, m], r2 = [X, T, m];
    this.solid(part, [[a, b, r2, r1], [e, c, r2, r1], [a, e, r1], [b, c, r2], [a, b, c, e]], color, o);
  }
  /** four-sided pyramid / hip from a rectangular base */
  pyramid(part, [x, y, z], [w, d], rise, color, o = {}) {
    const X = x + w, Z = z + d, ap = [x + w / 2, y + rise, z + d / 2];
    const a = [x, y, z], b = [X, y, z], c = [X, y, Z], e = [x, y, Z];
    this.solid(part, [[a, b, ap], [b, c, ap], [c, e, ap], [e, a, ap], [a, b, c, e]], color, o);
  }
  /** staircase of solid treads. dir: 'z+','z-','x+','x-' is the direction you walk UP. start = low corner */
  stairs(part, [x, y, z], dir, width, n, rise, run, color, o = {}) {
    for (let i = 0; i < n; i++) {
      const h = rise * (i + 1);
      if (dir === 'z+') this.box(part, [x, y, z + run * i], [width, h, run], color, o);
      else if (dir === 'z-') this.box(part, [x, y, z - run * (i + 1)], [width, h, run], color, o);
      else if (dir === 'x+') this.box(part, [x + run * i, y, z], [run, h, width], color, o);
      else this.box(part, [x - run * (i + 1), y, z], [run, h, width], color, o);
    }
  }
  pin(part, p, n) { this.pins.push({ part, p, n }); }
  grow(x0, z0, x1, z1, y1) { this.radius = Math.max(this.radius, Math.hypot(Math.max(Math.abs(x0), Math.abs(x1)), Math.max(Math.abs(z0), Math.abs(z1))) * 0.9, y1 * 1.2); }
}

/** split long quads into tiles so the painter's sort stays correct on large platforms */
function refine(scene) {
  if (scene._refined) return; scene._refined = true;
  const T = scene.radius / 5, len = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]), out = [];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  for (const f of scene.faces) {
    if (f.bg || f.p.length !== 4) { out.push(f); continue; }
    const [a, b, c, d] = f.p, n1 = Math.min(14, Math.max(1, Math.ceil(len(a, b) / T))), n2 = Math.min(14, Math.max(1, Math.ceil(len(b, c) / T)));
    if (n1 * n2 === 1) { out.push(f); continue; }
    const P = (u, v) => lerp(lerp(a, b, u), lerp(d, c, u), v);
    for (let i = 0; i < n1; i++) for (let j = 0; j < n2; j++) out.push({ ...f, p: [P(i / n1, j / n2), P((i + 1) / n1, j / n2), P((i + 1) / n1, (j + 1) / n2), P(i / n1, (j + 1) / n2)], edge: false });
  }
  scene.faces = out;
}

/** mount a viewer on a canvas. opts: { onSelect(part), sel, auto }. Returns { destroy, select, setAuto, reset, auto } */
export function mountViewer(canvas, scene, opts = {}) {
  refine(scene);
  const g = canvas.getContext('2d'); let W = 0, H = 0, dpr = 1;
  const st = { yaw: opts.yaw ?? -0.6, pitch: opts.pitch ?? 0.5, zoom: 1, sel: opts.sel || null, auto: opts.auto !== false, touched: false };
  const home = { yaw: st.yaw, pitch: st.pitch };
  const LIGHT = norm([-0.45, 0.85, 0.55]);
  let raf = 0, dirty = true, last = performance.now(), proj = [], drawn = [], pinsXY = [];
  function resize() {
    const r = canvas.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(200, r.width); H = Math.max(200, r.height);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); dirty = true;
  }
  const cs = () => getComputedStyle(canvas);
  function rotV(x, y, z) {
    const cy = Math.cos(st.yaw), sy = Math.sin(st.yaw), cp = Math.cos(st.pitch), sp = Math.sin(st.pitch);
    const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
    return [x1, y * cp - z1 * sp, y * sp + z1 * cp];
  }
  const rot = p => rotV(p[0] - scene.target[0], p[1] - scene.target[1], p[2] - scene.target[2]);
  function draw() {
    const dist = scene.radius * 3.2, focal = Math.min(W, H) * 0.5 * dist / (scene.radius * 1.25) * st.zoom;
    const cx = W / 2, cy = H * 0.56;
    const P = p => { const r = rot(p); const k = focal / (dist - r[2]); return [cx + r[0] * k, cy - r[1] * k, r[2], r]; };
    const style = cs(), ink = style.getPropertyValue('--text').trim() || '#eee', accent = style.getPropertyValue('--accent').trim() || '#d2ae6a';
    const dark = document.documentElement.dataset.theme === 'dark';
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    // ground glow
    const gr = g.createRadialGradient(cx, cy + 10, 10, cx, cy + 10, Math.min(W, H) * 0.62);
    gr.addColorStop(0, dark ? 'rgba(210,174,106,.10)' : 'rgba(120,90,30,.10)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const list = [];
    for (const f of scene.faces) {
      const pts = f.p.map(P); const nv = rotV(f.n[0], f.n[1], f.n[2]);
      const c0 = pts[0][3], toCam = [-c0[0], -c0[1], dist - c0[2]];
      if (f.a >= 1 && dot(nv, toCam) <= 0) continue;
      const depth = pts.reduce((s, q) => s + q[2], 0) / pts.length;
      list.push({ f, pts, nv, depth });
    }
    list.sort((a, b) => (a.f.lay - b.f.lay) || (a.depth - b.depth));
    drawn = list;
    for (const it of list) {
      const { f, pts, nv } = it; const lit = Math.max(0, dot(norm(nv), LIGHT)); const sel = st.sel && f.part === st.sel;
      const k = 0.42 + 0.58 * lit; let [r, gg, b] = f.c.map(v => v * k);
      if (!dark) { r = r * 0.95 + 14; gg = gg * 0.95 + 12; b = b * 0.95 + 8; }
      if (sel) { r = Math.min(255, r * 1.18 + 38); gg = Math.min(255, gg * 1.14 + 30); b = Math.min(255, b * 1.05 + 6); }
      g.globalAlpha = f.a; g.fillStyle = `rgb(${r | 0},${gg | 0},${b | 0})`;
      g.beginPath(); pts.forEach((q, i) => i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.closePath(); g.fill();
      if (f.edge || sel) { g.lineWidth = sel ? 1.6 : 0.8; g.strokeStyle = sel ? accent : (dark ? 'rgba(0,0,0,.45)' : 'rgba(60,40,10,.38)'); g.stroke(); }
      else { g.lineWidth = 0.8; g.strokeStyle = g.fillStyle; g.stroke(); }
      g.globalAlpha = 1;
    }
    // pins
    pinsXY = [];
    scene.pins.forEach((pn, i) => {
      const q = P(pn.p); const sel = st.sel === pn.part; const rr = sel ? 13 : 11;
      pinsXY.push({ x: q[0], y: q[1], part: pn.part, r: rr + 6 });
      g.beginPath(); g.arc(q[0], q[1], rr, 0, 7); g.fillStyle = sel ? accent : (dark ? 'rgba(20,22,28,.92)' : 'rgba(255,253,246,.95)'); g.fill();
      g.lineWidth = 1.6; g.strokeStyle = sel ? accent : (dark ? 'rgba(210,174,106,.85)' : 'rgba(120,90,30,.9)'); g.stroke();
      g.fillStyle = sel ? (dark ? '#1a1408' : '#fff') : ink; g.font = '700 11px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(pn.n ?? String(i + 1), q[0], q[1] + 0.5);
    });
  }
  function frame(t) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(64, t - last); last = t;
    if (st.auto && !st.touched) { st.yaw += dt * 0.00018; dirty = true; }
    if (dirty) { dirty = false; draw(); }
  }
  function hit(x, y) {
    for (const p of pinsXY) if (Math.hypot(p.x - x, p.y - y) <= p.r) return p.part;
    for (let i = drawn.length - 1; i >= 0; i--) {
      const { f, pts } = drawn[i]; if (f.bg || !f.part) continue; let inside = false;
      for (let a = 0, b = pts.length - 1; a < pts.length; b = a++) {
        const [xi, yi] = pts[a], [xj, yj] = pts[b];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
      }
      if (inside) return f.part;
    }
    return null;
  }
  const ptrs = new Map(); let moved = 0, pinch = 0;
  const xy = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const down = e => { canvas.setPointerCapture?.(e.pointerId); ptrs.set(e.pointerId, xy(e)); moved = 0; st.touched = true; if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = Math.hypot(a[0] - b[0], a[1] - b[1]); } };
  const move = e => {
    if (!ptrs.has(e.pointerId)) return; const prev = ptrs.get(e.pointerId), cur = xy(e); ptrs.set(e.pointerId, cur);
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch) st.zoom = Math.max(0.55, Math.min(3.2, st.zoom * d / pinch)); pinch = d; moved += 5; }
    else { const dx = cur[0] - prev[0], dy = cur[1] - prev[1]; moved += Math.abs(dx) + Math.abs(dy); st.yaw += dx * 0.009; st.pitch = Math.max(-0.1, Math.min(1.35, st.pitch + dy * 0.008)); }
    dirty = true;
  };
  const up = e => {
    const had = ptrs.has(e.pointerId); const p = xy(e); ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = 0;
    if (had && moved < 7 && ptrs.size === 0) { const part = hit(p[0], p[1]); if (part) select(part); }
  };
  const wheel = e => { e.preventDefault(); st.zoom = Math.max(0.55, Math.min(3.2, st.zoom * (e.deltaY < 0 ? 1.1 : 0.9))); st.touched = true; dirty = true; };
  const key = e => {
    const s = 0.12; let u = true;
    if (e.key === 'ArrowLeft') st.yaw -= s; else if (e.key === 'ArrowRight') st.yaw += s; else if (e.key === 'ArrowUp') st.pitch = Math.min(1.35, st.pitch + s); else if (e.key === 'ArrowDown') st.pitch = Math.max(-0.1, st.pitch - s);
    else if (e.key === '+' || e.key === '=') st.zoom = Math.min(3.2, st.zoom * 1.12); else if (e.key === '-') st.zoom = Math.max(0.55, st.zoom / 1.12); else u = false;
    if (u) { e.preventDefault(); e.stopPropagation(); st.touched = true; dirty = true; }
  };
  function select(part) { st.sel = part; dirty = true; opts.onSelect?.(part); }
  canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('wheel', wheel, { passive: false }); canvas.addEventListener('keydown', key);
  canvas.addEventListener('dblclick', () => api.reset());
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null; ro?.observe(canvas); window.addEventListener('resize', resize);
  const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)'); if (mq?.matches) st.auto = false;
  resize(); raf = requestAnimationFrame(frame);
  const api = {
    select, destroy() { cancelAnimationFrame(raf); ro?.disconnect(); window.removeEventListener('resize', resize); },
    setAuto(v) { st.auto = v; st.touched = false; }, get auto() { return st.auto && !st.touched; },
    reset() { st.yaw = home.yaw; st.pitch = home.pitch; st.zoom = 1; st.touched = false; dirty = true; },
    zoomBy(f) { st.zoom = Math.max(0.55, Math.min(3.2, st.zoom * f)); dirty = true; },
    rotate(d) { st.yaw += d; st.touched = true; dirty = true; },
    redraw() { dirty = true; }
  };
  return api;
}
