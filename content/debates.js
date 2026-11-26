// Debate index. Each debate lives in content/debates/<id>.js and is loaded on demand.
// Fields in a debate file: q, intro, settled[], open[], honest, press{tradition->challenge}, positions[].
// Position: id, n, short, who, nearTo[], farFrom[], claim, pass[[ref,why]], obj[], hist[[when,text]], assume[], explains[], struggles[],
//           args[{ id, claim, ass[[assumption, if rejected]], fal{n,why,def}, ctr[[counterexample, reply]], resp{positionId: text} }]
export const DEBATES = [
  { id: 'salvation', q: 'Is salvation through faith alone?', blurb: 'Paul and James, Luther and Trent, theosis and the “new perspective.”', icon: 'key', tags: ['Doctrine', 'Reformation'], ref: 'Romans 3:28' },
  { id: 'resurrection', q: 'Was Jesus’ resurrection a historical event?', blurb: 'The empty tomb, the appearances, and what history can and cannot say.', icon: 'sunrise', tags: ['History', 'Jesus'], ref: '1 Corinthians 15' },
  { id: 'scripture', q: 'What kind of authority does the Bible have?', blurb: 'Inerrancy, Tradition, the Church, criticism and skepticism on how to read Scripture.', icon: 'book', tags: ['Authority', 'Canon'], ref: '2 Timothy 3:16' },
  { id: 'jesus', q: 'Who was Jesus: a prophet, a messiah, or God incarnate?', blurb: 'Nicaea and Chalcedon against the historical, Jewish and Islamic accounts.', icon: 'triad', tags: ['Christology', 'History'], ref: 'Philippians 2:5–11' },
  { id: 'exodus', q: 'Did the Exodus and the conquest happen?', blurb: 'Archaeology, memory and the origins of Israel.', icon: 'mountain', tags: ['Archaeology', 'Old Testament'], ref: 'Exodus 12' }
];
export const byId = Object.fromEntries(DEBATES.map(d => [d.id, d]));
const cache = {};
export const loadDebate = async id => cache[id] || (cache[id] = (await import(`./debates/${id}.js`)).default);
export const LETTER_COLORS = { A: 'var(--accent)', B: 'var(--blue)', C: 'var(--good)', D: 'var(--violet)', E: 'var(--bad)' };
export const FALLACIES = [
  'Equivocation', 'Special pleading', 'Appeal to authority', 'Appeal to tradition', 'Begging the question', 'Circular reasoning', 'Genetic fallacy', 'False dilemma', 'False dichotomy',
  'Hasty generalization', 'Argument from silence', 'Argument from ignorance', 'Straw man', 'Non sequitur', 'Weak analogy', 'False analogy', 'Affirming the consequent', 'Tu quoque', 'Moving the goalposts',
  'Appeal to consequences', 'Presentism', 'Unfalsifiability', 'Motte-and-bailey', 'Appeal to a proof-text', 'Argument from silence reversed', 'Argument from embarrassment (criterion of dissimilarity misapplied)'
];
