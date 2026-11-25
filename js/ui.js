import { esc, $ } from './util.js';
import { linkRefs } from './bible.js';
import { ic } from './icons.js';
let box;
export function toast(msg, kind) {
  if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
  const t = document.createElement('div'); t.className = 'toast' + (kind === 'ach' ? ' ach-t' : ''); t.textContent = msg; box.appendChild(t);
  setTimeout(() => { t.style.opacity = 0; t.style.transition = 'opacity .4s'; setTimeout(() => t.remove(), 450); }, kind === 'ach' ? 4200 : 2200);
  while (box.children.length > 3) box.firstChild.remove();
}
/** inline markdown-lite: **bold**, *italic*, [t](url), scripture refs auto-linked */
export function md(s) {
  let h = esc(s);
  h = h.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  h = linkRefs(h);
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\n]+?)\*/g, '$1<em>$2</em>');
  return h;
}
export const paras = arr => (Array.isArray(arr) ? arr : [arr]).filter(Boolean).map(p => `<p>${md(p)}</p>`).join('');
export const loading = (msg = 'Loading…') => `<div class="loading"><div class="spin"></div>${esc(msg)}</div>`;
export const icon = n => ic({ read: 'book', daily: 'sun', study: 'cap' }[n] || n);
export function applyPrefs(S) {
  document.documentElement.dataset.theme = S.profile.theme;
  document.documentElement.style.setProperty('--rs', S.profile.size + 'px');
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = { dark: '#0c0d10', light: '#f7f5f0', sepia: '#f1e7d2' }[S.profile.theme] || '#0a0c11';
}

export const rerender = () => window.dispatchEvent(new Event('app:rerender'));
