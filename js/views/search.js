import { S } from '../store.js';
import * as B from '../bible.js';
import { esc, $ } from '../util.js';
import { loading } from '../ui.js';
export async function view({ q }) {
  const query = (q && q.q) || '';
  const t = S.profile.trans;
  const html = `<div class="narrow"><h1>Search</h1><form id="sf" class="row"><input type="search" id="sq" value="${esc(query)}" placeholder="Search the text — try love, “no one is good”, or John 3:16" style="flex:1;min-width:200px"><button class="btn pri">Search</button></form><p class="tiny faint">Searching the ${esc(B.TRANS[t].name)}. First search downloads the text (cached afterwards).</p><div id="sr"></div></div>`;
  const after = async () => {
    $('#sf').addEventListener('submit', e => { e.preventDefault(); location.hash = '#/search?q=' + encodeURIComponent($('#sq').value); });
    if (!query.trim()) return;
    const ref = B.parseRef(query);
    const box = $('#sr');
    let pre = ''; if (ref && /\d/.test(query)) pre = `<a class="card glow" style="display:block;margin-bottom:12px" href="#/read/${ref.b}/${ref.c}${ref.v ? '?v=' + ref.v : ''}"><div class="kicker">Go to reference</div><b style="font-family:var(--serif);font-size:1.2rem">${esc(B.label(ref.b, ref.c, ref.v, ref.ve))}</b></a>`;
    box.innerHTML = pre + loading('Searching… 0%');
    const res = await B.searchAll(t, query, p => { const l = box.querySelector('.loading'); if (l) l.lastChild.textContent = `Searching… ${Math.round(p * 100)}%`; });
    const { out, toks } = res;
    box.innerHTML = pre + `<p class="small muted">${out.length >= 400 ? '400+' : out.length} verse${out.length === 1 ? '' : 's'}</p>` + out.slice(0, 200).map(r => `<a class="xcard" style="--c:${B.bookHue(r.b) ? `hsl(${B.bookHue(r.b)} 78% 62%)` : '#ff6b6b'}" href="#/read/${r.b}/${r.c}?v=${r.v}"><div class="r"><span>${esc(B.label(r.b, r.c, r.v))}</span></div><div class="t">${B.highlight(r.t, toks)}</div></a>`).join('') + (out.length > 200 ? '<p class="small faint">Showing the first 200 matches — narrow your search.</p>' : '');
  };
  return { html, after };
}
