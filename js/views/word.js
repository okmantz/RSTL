import * as B from '../bible.js';
import * as O from '../orig.js';
import { S } from '../store.js';
import { esc } from '../util.js';
import { plain } from '../ui.js';

/** #/word/H1234  — everything the app knows about one dictionary word */
export async function view({ p1 }) {
  const id = decodeURIComponent(p1 || ''), nt = id[0] === 'G', b0 = nt ? 39 : 0;
  const lex = await O.lexicon(b0);
  const pad = /^[HG]\d{1,4}$/.test(id) ? id[0] + id.slice(1).padStart(4, '0') : id;
  const id2 = lex[id] ? id : Object.keys(lex).find(k => k === pad || k.startsWith(pad));
  const row = id2 && lex[id2];
  if (!row) return { html: `<div class="narrow"><a href="#/read" class="back">Read</a><h1>Word not found</h1><p class="muted">No dictionary entry for “${esc(id)}”.</p></div>` };
  const lang = nt ? 'grc' : 'he', dir = nt ? 'ltr' : 'rtl', cur = O.curated(id2), refs = row[6] || [];
  const tr = S.profile.trans;
  const items = await Promise.all(refs.map(async r => { const p = O.refOf(r); const t = await B.snippet(tr, { b: p.b, c: p.c, v: p.v, ve: 0 }, 200); return `<a class="xcard" href="${O.refHref(r)}"><div class="r"><span>${esc(O.refLabel(r))}</span></div><div class="t">${esc(t)}</div></a>`; }));
  const html = `<div class="narrow word-page"><a href="#/read" class="back">Read</a>
  <div class="wc-top mt"><div class="wc-o big" dir="${dir}" lang="${lang}">${esc(row[0])}</div><div class="wc-m"><div class="wc-t">${esc(row[1])}</div><div class="wc-g"><b>${esc(row[2])}</b></div></div></div>
  <div class="row mt" style="gap:6px"><span class="tag">${esc(O.simple(id2))}</span><span class="tag">${nt ? 'Greek' : 'Hebrew/Aramaic'}</span><span class="tag">${row[4].toLocaleString()}× in the ${nt ? 'Greek New Testament' : 'Hebrew Bible'}</span></div>
  ${row[3] ? `<p class="mt">${esc(O.cleanDef(row[3], 400))}</p>` : ''}
  ${cur ? `<div class="wc-note mt"><div class="kicker">Why it matters</div><p class="mb0">${plain(cur)}</p></div>` : ''}
  <h2 class="mt2">${refs.length ? (row[4] === 1 ? 'Its only occurrence' : `All ${row[4]} occurrences`) : 'Where it appears'}</h2>
  ${refs.length ? items.join('') : `<p class="muted">This word occurs ${row[4].toLocaleString()} times, too many to list here.${row[5] ? ` Its first occurrence is <a href="${O.refHref(row[5])}">${esc(O.refLabel(row[5]))}</a>.` : ''} Open any verse in the reader and tap the word to see it in context.</p>`}
  <p class="tiny faint mt2">Lexical data: STEPBible / Tyndale House Cambridge (CC BY 4.0), from the Brief Lexicons based on Abbott-Smith and BDB/Strong.</p></div>`;
  return { html, title: row[2] };
}
