/* Profile pictures: initial monogram, geometric emblems on six palettes, or an uploaded photo (resized, stored on this device only). */
import { S, save } from './store.js';
import { esc } from './util.js';

export const PALETTES = [
  ['Ink', '#1d2433', '#3b4a6b', '#c9d6f2'],
  ['Ember', '#4a1f1a', '#b8532f', '#ffe6d5'],
  ['Moss', '#17332a', '#3f8a6a', '#dcf5e8'],
  ['Dusk', '#2a1f45', '#7a5cc4', '#ece4ff'],
  ['Gold', '#3a2d10', '#c79a2e', '#fff3cf'],
  ['Slate', '#20262c', '#59656f', '#e8edf1']
];
/* 24px grid, monoline, drawn for this app */
export const EMBLEMS = {
  mono: null,
  mountain: '<path d="M3 19 9.5 7l4 7 2-3L21 19z"/><path d="M9.5 7 11 10"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>',
  wave: '<path d="M3 9c2.5-3 4.5-3 7 0s4.5 3 7 0 3-2 4-1.5"/><path d="M3 15c2.5-3 4.5-3 7 0s4.5 3 7 0 3-2 4-1.5"/>',
  book: '<path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5z"/><path d="M12 6.5v13"/>',
  star: '<path d="M12 3.5l2.4 5.4 5.8.6-4.4 3.9 1.3 5.7L12 16l-5.1 3.1 1.3-5.7L3.8 9.5l5.8-.6z"/>',
  flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.5 1 2 2 2-.5-3 .5-5 1-8z"/>',
  eye: '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.8"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5 13.6 13.6 8.5 15.5 10.4 10.4z"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19 13 11"/>',
  key: '<circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H21M17 12v3M20 12v2"/>',
  tree: '<path d="M12 21v-7"/><path d="M12 14c-4 0-6-2.5-6-5.5S8.5 3 12 3s6 2.5 6 5.5S16 14 12 14z"/><path d="M12 11l-2-2M12 9l2-1.5"/>',
  hex: '<path d="M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3z"/><path d="M12 8l3.5 2v4L12 16l-3.5-2v-4z"/>'
};
export const EMBLEM_IDS = Object.keys(EMBLEMS).filter(k => EMBLEMS[k]);

const av = () => S.profile.avatar || { k: 'mono', p: 0, img: '' };
const initial = () => ((S.profile.name || '').trim()[0] || 'R').toUpperCase();

/** Returns the avatar element as HTML. size: 'sm' | 'md' | 'lg' */
export function avatarHTML(size = 'md', over = null) {
  const a = over || av(), pal = PALETTES[a.p] || PALETTES[0];
  if (a.img) return `<span class="av av-${size}" style="background-image:url('${a.img.replace(/'/g, '%27')}')" role="img" aria-label="Your photo"></span>`;
  const st = `background:linear-gradient(145deg,${pal[1]},${pal[2]});color:${pal[3]}`;
  const inner = a.k !== 'mono' && EMBLEMS[a.k] ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${EMBLEMS[a.k]}</svg>` : `<span class="av-i">${esc(initial())}</span>`;
  return `<span class="av av-${size}" style="${st}" role="img" aria-label="Your avatar">${inner}</span>`;
}
export function pickerHTML() {
  const a = av();
  return `<div class="av-pick">
  <div class="kicker">Style</div>
  <div class="av-styles">${['mono', ...EMBLEM_IDS].map(k => `<button class="av-opt ${!a.img && a.k === k ? 'on' : ''}" data-act="avk" data-k="${k}" aria-label="${k === 'mono' ? 'Initial' : k}">${avatarHTML('sm', { k, p: a.p, img: '' })}</button>`).join('')}</div>
  <div class="kicker mt">Colour</div>
  <div class="av-pals">${PALETTES.map((p, i) => `<button class="av-pal ${!a.img && a.p === i ? 'on' : ''}" data-act="avp" data-p="${i}" style="background:linear-gradient(145deg,${p[1]},${p[2]})" aria-label="${p[0]}" title="${p[0]}"></button>`).join('')}</div>
  <div class="row mt"><label class="btn sm" style="cursor:pointer">Upload a photo<input type="file" id="av-file" accept="image/*" hidden></label>${a.img ? '<button class="btn sm ghost" data-act="avclear">Remove photo</button>' : ''}</div>
  <p class="tiny faint mb0 mt">Photos are resized and kept on this device only.</p></div>`;
}
/** center-crop to a square and downscale */
export function resizeImage(file, px = 256) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      const s = Math.min(im.width, im.height), c = document.createElement('canvas'); c.width = c.height = px;
      c.getContext('2d').drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, px, px);
      URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', 0.82));
    };
    im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('image')); };
    im.src = url;
  });
}
export function setAvatar(patch) { S.profile.avatar = { ...av(), ...patch }; save(); }
