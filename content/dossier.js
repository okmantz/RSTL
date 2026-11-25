// Per-book dossiers for the daily path. Each entry: [setting, structure, outside sources, a live debate, further reading].
import OT from './dossier_ot.js';
import NT from './dossier_nt.js';
import AP from './dossier_ap.js';

const FACET = ['ctx', 'out', 'ext', 'dbt'];
const all = { ...OT, ...NT, ...AP };
const out = {};
for (const [k, v] of Object.entries(all)) {
  const o = {}; FACET.forEach((f, i) => { o[f] = v[i]; }); o.src = v[4] || []; out[k] = o;
}
export default out;
