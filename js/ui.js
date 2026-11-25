import { esc, $ } from './util.js';
import { linkRefs } from './bible.js';
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
export const icon = n => ({
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  read: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4z"/><path d="M20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7z"/></svg>',
  daily: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  study: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-5 9 5-9 5z"/><path d="M7 10.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-5.5"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
}[n] || '');
export function applyPrefs(S) {
  document.documentElement.dataset.theme = S.profile.theme;
  document.documentElement.style.setProperty('--rs', S.profile.size + 'px');
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = { dark: '#0a0c11', light: '#f6f4ef', sepia: '#f1e6cf' }[S.profile.theme] || '#0a0c11';
}

export const rerender = () => window.dispatchEvent(new Event('app:rerender'));
