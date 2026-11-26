// Explorable 3D places for the timeline. Geometry is schematic: proportions follow the sources named in each note,
// and every part says how firm (or how conjectural) the evidence is. Orientation: entrance faces the viewer (east), north is to the right.
import { Scene } from '../js/viewer3d.js';
import { MORE, MORE_ORDER } from './places_more.js';

const stone = '#c9b48a', mud = '#b08a5a', dark = '#7a6a52', gold = '#d6a93a', bronze = '#a8703a', linen = '#e9e2cf', purple = '#7a4c8a', blue = '#4a78b8', grass = '#3d4a35', sand = '#8a7a5a', cedar = '#8a5a34';

function ground(s, w, d, color = sand, y = -2) { s.box(null, [-w / 2, y, -d / 2], [w, 2, d], color, { bg: true, edge: false }); }

/* ---------------- Ur ---------------- */
function ur() {
  const s = new Scene(); ground(s, 82, 66);
  s.box('court', [-45, 0, -38], [90, 1, 76], '#9c8a64', { edge: false, lay: 1 });
  s.box('base', [-16, 1, -11.5], [32, 11, 23], mud);
  s.box('mid', [-11, 12, -8], [22, 8, 16], '#bb9560');
  s.box('top', [-6.5, 20, -5], [13, 6, 10], '#c6a06a');
  s.box('shrine', [-3.2, 26, -2.4], [6.4, 5.5, 4.8], blue);
  s.pyramid('shrine', [-3.6, 31.5, -2.8], [7.2, 5.6], 2, '#3a5f98');
  s.stairs('stairs', [-2.2, 1, 27.5], 'z-', 4.4, 11, 1, 1.45, '#a08558'); // central stair: low end in front, high end at the gate
  s.stairs('stairs', [-16, 1, 11.5], 'x+', 3.2, 10, 1, 1.4, '#a08558');
  s.stairs('stairs', [16, 1, 11.5], 'x-', 3.2, 10, 1, 1.4, '#a08558');
  s.box('gate', [-3.5, 1, 11.5], [7, 12, 2.2], '#8a6a3c');
  s.box('court', [-30, 1, -30], [8, 3, 14], '#a89468'); s.box('court', [22, 1, 16], [8, 3, 12], '#a89468');
  s.pin('base', [-16, 6, 0], 1); s.pin('stairs', [0, 5, 20], 2); s.pin('shrine', [0, 33, 0], 3); s.pin('court', [-30, 5, -23], 4); s.pin('gate', [0, 13, 11], 5);
  return s;
}
const URP = {
  base: ['Mud-brick core and baked-brick skin', 'Ur-Nammu (c. 2100 BCE) built a solid core of sun-dried mud brick and faced it with baked bricks set in bitumen. Woolley estimated about 720,000 bricks. The solid mass is firmly attested; its original height is not, because only the lowest stage survives.', ['Genesis 11:3–4']],
  stairs: ['The three stairways', 'Three flights of stairs, one axial and two running up the face of the first stage, met at a gate-tower. The triple-stair plan is well established in the excavated remains and in later restorations.', ['Genesis 28:12']],
  shrine: ['The summit shrine', 'Texts describe a temple on top for the moon god Nanna (Sîn). Nothing of it survives, so its shape and colour are a reconstruction. The blue roof follows Woolley’s guess and later discussion of glazed brick.', ['Genesis 11:4']],
  court: ['The temple precinct', 'The ziggurat stood inside a walled sacred precinct with storehouses, courtyards and the temples of Nanna’s household. Offerings, grain and records passed through it, so the ziggurat was part of an economy as well as a place of worship.', ['Genesis 11:31']],
  gate: ['The gate-tower', 'The stairs converge at a gate on the first terrace. Access to the upper levels was restricted to the priesthood.', []]
};
const URN = 'Schematic reconstruction of the Great Ziggurat of Ur after Leonard Woolley’s excavations (1920s–30s). Dimensions are rounded. Later rulers, notably Nabonidus in the 6th century BCE, rebuilt it, and how many stages it had is debated.';

/* ---------------- Tabernacle (cubit = 1 unit) ---------------- */
function tabernacle() {
  const s = new Scene(); ground(s, 78, 128);
  const wall = (x, z, w, d) => s.box('court', [x, 0, z], [w, 5, d], linen, { a: 0.55 });
  wall(-25, -50, 50, 0.5); wall(-25, -50, 0.5, 100); wall(24.5, -50, 0.5, 100); wall(-25, 49.5, 15, 0.5); wall(10, 49.5, 15, 0.5);
  s.box('gate', [-10, 0, 49.4], [20, 5, 0.7], '#6a2f6a', { a: 0.9 });
  s.box('tent', [-5, 0, -40], [10, 10, 30], '#d9b36a', { a: 0.34, edge: true });
  s.box('veil', [-4.7, 0, -30.2], [9.4, 10, 0.5], purple, { a: 0.95 });
  s.box('altar', [-2.5, 0, 14], [5, 3, 5], bronze); s.box('altar', [-2.9, 3, 13.6], [5.8, 0.4, 5.8], bronze);
  s.cyl('laver', [0, 0, -1], 1.7, 1.4, '#c58a3a');
  s.box('ark', [-1.25, 0.1, -38], [2.5, 1.5, 1.5], gold); s.box('cherubim', [-1.2, 1.6, -38], [0.7, 1.2, 1.4], gold); s.box('cherubim', [0.5, 1.6, -38], [0.7, 1.2, 1.4], gold);
  s.box('table', [2.4, 0, -22], [1.5, 1.5, 3], gold);
  s.cyl('lamp', [-3, 0, -22], 0.5, 3.5, gold, { sides: 8 }); s.box('lamp', [-3.9, 3.2, -22.5], [1.8, 0.4, 1], gold);
  s.box('incense', [-0.5, 0, -27.5], [1, 2, 1], gold);
  s.pin('gate', [0, 6.5, 50], 1); s.pin('altar', [0, 5, 16.5], 2); s.pin('laver', [0, 3.4, -1], 3); s.pin('tent', [-6, 11.5, -25], 4);
  s.pin('table', [3.2, 2.8, -20.5], 5); s.pin('veil', [0, 11.5, -30], 6); s.pin('ark', [0, 3.5, -37.3], 7); s.pin('court', [-25, 6.5, 20], 8);
  return s;
}
const TABP = {
  gate: ['The gate', 'A 20-cubit screen of blue, purple and scarlet yarn and fine linen closed the east end of the court (Exodus 27:16). Every worshipper entered here.', ['Exodus 27:16']],
  altar: ['Altar of burnt offering', 'Acacia wood overlaid with bronze, five cubits square and three high, with horns at the corners (Exodus 27:1–8). Sacrifice happened in the open court, not in the tent.', ['Exodus 27:1–8', 'Leviticus 1']],
  laver: ['The bronze basin', 'Priests washed hands and feet before serving (Exodus 30:17–21). Its dimensions are not given, so the size here is a placeholder.', ['Exodus 30:17–21']],
  tent: ['The tent', 'Thirty cubits long and ten wide and high, built of gold-covered acacia frames hung with layers of linen, goat hair, ram skin and fine leather (Exodus 26). It is drawn semi-transparent so the interior shows.', ['Exodus 26']],
  table: ['Table, lampstand and incense altar', 'In the Holy Place stood the table of the bread of the Presence, the seven-branched lampstand and the altar of incense (Exodus 25:23–40; 30:1–10). Only priests entered.', ['Exodus 25:23–40', 'Exodus 30:1–10']],
  lamp: ['The lampstand', 'Beaten from a single piece of gold, with seven lamps (Exodus 25:31–40).', ['Exodus 25:31–40']],
  incense: ['Altar of incense', 'A small gold altar before the veil. Incense rose daily (Exodus 30:7–8).', ['Exodus 30:1–10']],
  veil: ['The veil', 'A woven curtain with cherubim separated the Holy Place from the Holy of Holies (Exodus 26:31–33). At the crucifixion the Gospels report that the temple veil tore (Matthew 27:51).', ['Exodus 26:31–33', 'Hebrews 9:1–12']],
  ark: ['The ark and mercy seat', 'A gold-covered chest holding the tablets, with a gold cover (the mercy seat) and two cherubim (Exodus 25:10–22). Once a year the high priest entered (Leviticus 16).', ['Exodus 25:10–22', 'Leviticus 16']],
  cherubim: ['The cherubim', 'Two winged figures of beaten gold on the mercy seat (Exodus 25:18–20). The Hebrew Bible does not describe their faces; Ezekiel 10 gives a very different cherub.', ['Exodus 25:18–20']],
  court: ['The court', 'One hundred cubits by fifty, fenced with linen hangings five cubits high on bronze-footed pillars (Exodus 27:9–18).', ['Exodus 27:9–18']]
};
const TABN = 'Schematic model built directly from the measurements in Exodus 25–27 and 30. One cubit is about 45 cm. Whether a portable sanctuary like this existed in the late second millennium BCE is disputed; many scholars see the account as shaped by later temple memory (a priestly ideal), while others defend it as an early tent-shrine. Comparable tent-shrines are attested in the ancient Near East.';

/* ---------------- Solomon's Temple (cubits) ---------------- */
function solomon() {
  const s = new Scene(); ground(s, 130, 180);
  s.box('court', [-45, 0, -75], [90, 1.2, 150], '#a79672', { edge: false, lay: 1 });
  s.box('court', [-45, 1.2, 74], [38, 3, 1.5], '#9c8a64'); s.box('court', [7, 1.2, 74], [38, 3, 1.5], '#9c8a64');
  s.box('court', [-45, 1.2, -75], [1.5, 3, 150], '#9c8a64'); s.box('court', [43.5, 1.2, -75], [1.5, 3, 150], '#9c8a64'); s.box('court', [-45, 1.2, -75], [90, 3, 1.5], '#9c8a64');
  const y0 = 1.2;
  s.box('holy', [-10, y0, -30], [20, 30, 40], '#d8c7a0', { a: 1 });            // the nave (hekhal) 40 long
  s.box('debir', [-10, y0, -50], [20, 20, 20], '#e2d3ac');                        // holy of holies 20 cubes
  s.box('house', [-10, y0 + 20, -50], [20, 10, 20], '#d8c7a0');
  s.box('porch', [-10, y0, 10], [20, 30, 10], '#e0d0aa');
  s.box('chambers', [-15, y0, -50], [5, 5, 60], '#c4b088'); s.box('chambers', [-16, y0 + 5, -50], [6, 5, 60], '#c4b088'); s.box('chambers', [-17, y0 + 10, -50], [7, 5, 60], '#c4b088');
  s.box('chambers', [10, y0, -50], [5, 5, 60], '#c4b088'); s.box('chambers', [10, y0 + 5, -50], [6, 5, 60], '#c4b088'); s.box('chambers', [10, y0 + 10, -50], [7, 5, 60], '#c4b088');
  s.box('chambers', [-10, y0, -55], [20, 5, 5], '#c4b088'); s.box('chambers', [-10, y0 + 5, -56], [20, 5, 6], '#c4b088'); s.box('chambers', [-10, y0 + 10, -57], [20, 5, 7], '#c4b088');
  s.gable('house', [-10, y0 + 30, -50], [20, 60], 5, cedar);
  s.cyl('pillars', [-6.5, y0, 25.5], 1.8, 18, bronze); s.cyl('pillars', [-6.5, y0 + 18, 25.5], 2.4, 5, '#c58a3a'); s.cyl('pillars', [6.5, y0, 25.5], 1.8, 18, bronze); s.cyl('pillars', [6.5, y0 + 18, 25.5], 2.4, 5, '#c58a3a');
  s.box('cherubim', [-5, y0, -48], [3.2, 10, 3], gold); s.box('cherubim', [1.8, y0, -48], [3.2, 10, 3], gold);
  s.box('altar', [-10, y0, 36], [20, 10, 20], bronze);
  s.cyl('sea', [0, y0 + 3, 62], 5, 5, '#c58a3a', { sides: 18 }); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; s.box('sea', [Math.cos(a) * 4.3 - .7, y0, 62 + Math.sin(a) * 4.3 - .7], [1.4, 3, 1.4], bronze); }
  [[-28, 38], [-28, 50], [-28, 62], [28, 38], [28, 50], [28, 62]].forEach(([x, z]) => { s.box('lavers', [x - 2, y0, z - 2], [4, 3, 4], bronze); s.cyl('lavers', [x, y0 + 3, z], 1.8, 2, '#c58a3a', { sides: 10 }); });
  s.pin('porch', [0, 33, 15], 1); s.pin('pillars', [0, 28, 25.5], 2); s.pin('holy', [0, 22, -6], 3); s.pin('debir', [0, 14, -42], 4); s.pin('chambers', [-17, 18, -20], 5); s.pin('altar', [0, 13, 46], 6); s.pin('sea', [0, 10, 62], 7); s.pin('lavers', [-28, 8, 50], 8);
  return s;
}
const SOLP = {
  porch: ['The porch (ulam)', 'Twenty cubits wide and ten deep (1 Kings 6:3). 2 Chronicles 3:4 gives its height as 120 cubits, which most scholars read as a textual corruption (or exaggeration); the model uses the height of the nave.', ['1 Kings 6:3', '2 Chronicles 3:4']],
  pillars: ['Jachin and Boaz', 'Two freestanding bronze pillars, eighteen cubits high with five-cubit capitals, cast by Huram of Tyre (1 Kings 7:15–22). Their meaning is unknown: names, symbols of stability or divine presence. 2 Chronicles 3:15 says 35 cubits, another unresolved number.', ['1 Kings 7:15–22', '2 Chronicles 3:15–17']],
  holy: ['The nave (hekhal)', 'Forty cubits long, twenty wide, thirty high, lined with cedar and overlaid with gold, containing the gold altar of incense, ten lampstands and the table (1 Kings 6:17–22; 7:48–49).', ['1 Kings 6:14–22', '1 Kings 7:48–50']],
  debir: ['The inner sanctuary (debir)', 'A perfect cube, twenty cubits each way, holding the ark under two ten-cubit cherubim whose wings spanned the room (1 Kings 6:19–28). The shape resembles inner shrines of Syrian temples.', ['1 Kings 6:19–28', '1 Kings 8:6–11']],
  house: ['The house', 'The main structure of the temple, built of dressed stone, cedar and gold, with no sound of tools at the site (1 Kings 6:7).', ['1 Kings 6:1–10']],
  chambers: ['The side chambers', 'Three stories of rooms ran along the north, south and west walls, each story a cubit wider than the one below (1 Kings 6:5–6). They are usually taken as storerooms for temple goods.', ['1 Kings 6:5–10']],
  altar: ['The bronze altar', 'Twenty cubits square and ten high (2 Chronicles 4:1). 1 Kings 6–8 describes the building at length but mentions the altar only briefly; its exact form is uncertain.', ['2 Chronicles 4:1', '1 Kings 8:64']],
  sea: ['The “molten sea”', 'A huge bronze basin ten cubits across and five deep, standing on twelve bronze oxen in four groups of three (1 Kings 7:23–26). Its cosmic symbolism (the waters of chaos tamed) is widely discussed.', ['1 Kings 7:23–26']],
  lavers: ['The ten lavers', 'Ten bronze stands on wheels, five on each side, each holding a basin for rinsing sacrificial animals (1 Kings 7:27–39).', ['1 Kings 7:27–39']],
  cherubim: ['The cherubim', 'Two gold-covered olivewood figures, ten cubits high, with wings of five cubits spanning the debir (1 Kings 6:23–28).', ['1 Kings 6:23–28']],
  court: ['The courts', 'An inner court of three courses of stone and one of cedar beams (1 Kings 6:36) and a great court beyond. The layout drawn here is a guess.', ['1 Kings 6:36', '2 Chronicles 4:9']]
};
const SOLN = 'Schematic reconstruction from 1 Kings 6–7 and 2 Chronicles 3–4, in cubits. No physical remains of Solomon’s Temple have been excavated (the Temple Mount cannot be dug). The long-room layout resembles Iron Age temples at Ain Dara and Tell Tayinat in Syria, which supports the general plan. Whether the biblical account describes a building from c. 960 BCE or an idealized later memory is debated.';

/* ---------------- Herod's Temple Mount (cubits) ---------------- */
function herod() {
  const s = new Scene(); ground(s, 1000, 860, '#7d6c4c');
  s.box('platform', [-300, 0, -470], [600, 40, 940], '#c9b995');                  // Temple Mount platform
  s.box('court', [-300, 40, -470], [600, 0.5, 940], '#d8cdae', { edge: false, lay: 1 });  // Court of the Gentiles
  s.box('stoa', [-300, 40, -470], [70, 55, 940], '#e4d9ba'); s.gable('stoa', [-300, 95, -470], [70, 940], 14, '#8a5a34'); // Royal Stoa (south)
  s.box('solomon', [-230, 40, 430], [460, 38, 40], '#e0d4b2'); s.gable('solomon', [-230, 78, 430], [460, 40], 8, '#8a5a34');
  s.box('porches', [230, 40, -470], [40, 36, 900], '#e0d4b2'); s.gable('porches', [230, 76, -470], [40, 900], 8, '#8a5a34');
  s.box('porches', [-230, 40, -470], [460, 36, 40], '#e0d4b2'); s.gable('porches', [-230, 76, -470], [460, 40], 8, '#8a5a34');
  // inner precinct: soreg + chel
  s.box('soreg', [-62, 40, -330], [260, 2, 430], '#bfae86', { lay: 2 }); s.box('soreg', [-62, 42, -330], [260, 3.5, 1.4], '#8a7a5a'); s.box('soreg', [-62, 42, 98], [260, 3.5, 1.4], '#8a7a5a'); s.box('soreg', [-62, 42, -330], [1.4, 3.5, 430], '#8a7a5a'); s.box('soreg', [196, 42, -330], [1.4, 3.5, 430], '#8a7a5a');
  s.box('women', [0, 42, -62], [135, 6, 135], '#d9ceb0', { lay: 3 });                         // court of the women
  s.box('israel', [0, 48, -103], [135, 8, 41], '#d4c8a8', { lay: 4 });                        // court of Israelites + priests
  s.box('priests', [0, 56, -145], [135, 8, 42], '#cfc19e', { lay: 5 });
  s.box('altar', [47, 64, -190], [32, 14, 32], '#b98b52');
  s.box('sanct', [0, 64, -290], [100, 150, 100], '#efe6cc'); s.box('sanct', [-15, 64, -290 + 70], [130, 120, 30], '#efe6cc');
  s.box('holiest', [20, 214, -290], [60, 14, 60], gold, { edge: true }); s.gable('holiest', [20, 228, -290], [60, 60], 6, gold);
  s.box('antonia', [300, 40, -470], [150, 70, 110], '#9a8a66'); [[300, -470], [440, -470], [300, -370], [440, -370]].forEach(([x, z]) => s.box('antonia', [x - 10, 110, z], [20, 40, 20], '#8a7a56'));
  s.box('wall', [-300, 0, -472], [600, 82, 4], '#d8cbaa'); s.box('wall', [-300, 40, -470], [600, 3, 2], '#b9a984');
  s.stairs('arch', [-300, 0, -540], 'z+', 60, 14, 3, 4, '#bfae86'); s.box('arch', [-300, 0, -490], [60, 40, 20], '#c9b995');
  s.box('gate', [-310, 0, -150], [14, 40, 40], '#a99978');
  s.pin('platform', [0, 18, 470], 1); s.pin('stoa', [-285, 120, 0], 2); s.pin('solomon', [0, 110, 450], 3); s.pin('soreg', [196, 52, 0], 4); s.pin('women', [67, 58, -5], 5); s.pin('altar', [63, 90, -174], 6); s.pin('sanct', [50, 150, -190], 7); s.pin('holiest', [50, 245, -260], 8); s.pin('antonia', [370, 170, -415], 9); s.pin('wall', [0, 96, -472], 10); s.pin('arch', [-270, 52, -520], 11);
  return s;
}
const HERP = {
  platform: ['The enlarged platform', 'Herod the Great (from c. 20 BCE) enlarged the mount to roughly 36 acres, one of the largest ancient sacred platforms, by building massive retaining walls and filling or vaulting the space behind them. John 2:20 says the temple had taken 46 years by Jesus’ day. The Herodian wall stones, some weighing hundreds of tons, are well preserved.', ['John 2:20']],
  stoa: ['The Royal Stoa', 'A huge basilica-style hall along the south wall, described by Josephus as four rows of columns carrying a high roof (Antiquities 15.411–416). It housed the money-changers and officials; it is the likely setting for the traders in the Gospel accounts.', ['Matthew 21:12–13', 'John 2:13–16']],
  solomon: ['Solomon’s Porch and the colonnades', 'Cloisters ran along the east and the other sides. Jesus walked in “Solomon’s Porch” in winter and the early church met there (John 10:22–23; Acts 3:11; 5:12).', ['John 10:22–23', 'Acts 3:11', 'Acts 5:12']],
  porches: ['Northern and western porticoes', 'Double colonnades lined the north and west edges. Josephus gives their breadth and height (War 5.190–192).', []],
  soreg: ['The Soreg and the warning stones', 'A low stone balustrade fenced the inner courts. Notices in Greek and Latin warned Gentiles not to go further on pain of death. Two such inscriptions have been found: one in 1871 and a fragment in 1935. Compare Acts 21:28–29 and Ephesians 2:14.', ['Acts 21:27–29', 'Ephesians 2:14']],
  women: ['The Court of the Women', 'The first inner court, open to Jewish women and men. Its treasury boxes are the likely setting of the widow’s offering (Mark 12:41–44), and the “Beautiful Gate” of Acts 3:2 is often identified with a gate on its edge. Locating that gate is uncertain.', ['Mark 12:41–44', 'Acts 3:2']],
  israel: ['Court of the Israelites', 'A narrow strip where Jewish men stood to watch the sacrifices (Mishnah, Middot 2:6). Dimensions follow Middot and differ slightly from Josephus.', []],
  priests: ['Court of the Priests', 'Only priests entered here to tend the altar and the sanctuary.', []],
  altar: ['The altar', 'Built of unhewn stones and 32 cubits square at the base according to the Mishnah (Middot 3:1). Daily offerings for the nation were made here (Exodus 29:38–42).', ['Exodus 29:38–42']],
  sanct: ['The sanctuary (naos)', 'A tall rectangular building with a broad porch front, plated in gold and white stone so that, said Josephus, it blazed like a snow-covered mountain in the sun (War 5.222). Its inner rooms followed the plan of the First Temple.', ['Luke 1:8–11']],
  holiest: ['The Holy of Holies', 'In the Second Temple it was reportedly empty: the ark was gone (see Jeremiah 3:16 and 2 Maccabees 2:4–8) and the high priest entered once a year on the Day of Atonement. Pompey entered in 63 BCE and, according to Josephus, found it empty (War 1.152).', ['Hebrews 9:1–7', 'Leviticus 16']],
  antonia: ['The Antonia fortress', 'A Roman garrison fort at the northwest corner overlooking the temple courts. The soldiers who rescued Paul came down from it (Acts 21:31–36). Its precise form is debated.', ['Acts 21:31–36']],
  wall: ['The western retaining wall', 'The Western Wall is part of the lower Herodian western retaining wall. Its upper courses are later. After the Roman destruction of 70 CE it became the central pilgrimage point for Jews.', []],
  arch: ['Robinson’s Arch and the street', 'A monumental staircase at the southwest corner rose to the Royal Stoa. Pilgrims came up from the shops and plaza below. The Romans threw down the arch’s voussoirs in 70 CE, and they lay where they fell.', []],
  gate: ['The Huldah gates', 'Two tunnelled gates in the south wall (the Double and Triple Gates) led up to the courts. Pilgrims passed through immersion baths (mikva’ot) uncovered nearby.', ['Acts 2:41']]
};
const HERN = 'Schematic model of the Second Temple complex after Josephus (War 5, Antiquities 15) and the Mishnah (Middot). Josephus and the Mishnah differ on several measurements and the Temple Mount cannot be excavated, so details of the inner courts are reconstruction. Scale is in cubits (about 50 cm), simplified to rectangles.';

export const PLACES = {
  ...MORE,
  ur: { id: 'ur', n: 'The Great Ziggurat of Ur', era: 'mesopotamia', sub: 'c. 2100 BCE · Mesopotamia', icon: 'mountain', note: URN, parts: URP, build: ur, yaw: -0.7, pitch: 0.42, intro: 'The best-preserved ziggurat of the world Abraham’s family is said to have left (Genesis 11:31). The Babel story (Genesis 11:1–9) is usually read against buildings like this.' },
  tabernacle: { id: 'tabernacle', n: 'The Tabernacle', era: 'israelite', sub: 'As described in Exodus', icon: 'scroll', note: TABN, parts: TABP, build: tabernacle, yaw: -0.55, pitch: 0.62, intro: 'The portable sanctuary of the wilderness traditions, rebuilt here directly from the measurements in Exodus.' },
  solomon: { id: 'solomon', n: 'Solomon’s Temple', era: 'israelite', sub: 'First Temple · 10th–6th c. BCE', icon: 'temple', note: SOLN, parts: SOLP, build: solomon, yaw: -0.65, pitch: 0.45, intro: 'The First Temple, standing until the Babylonians burned it in 586 BCE. Reconstructed from the biblical measurements.' },
  herod: { id: 'herod', n: 'Herod’s Temple Mount', era: 'roman', sub: 'Second Temple · 20 BCE–70 CE', icon: 'columns', note: HERN, parts: HERP, build: herod, yaw: -0.75, pitch: 0.36, intro: 'The Jerusalem of Jesus and Paul: the great platform, the courts, and the sanctuary the Romans destroyed in 70 CE.' }
};
export const PLACE_ORDER = ['ur', 'tabernacle', 'gate6', 'solomon', 'babylon', 'qumran', 'bethesda', 'herod', 'tomb', 'artemis'];
