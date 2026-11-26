// Six more explorable places (schematic, proportions from the sources named in each note).
// Orientation as in places.js: the entrance faces the viewer, north is to the right.
import { Scene } from '../js/viewer3d.js';

const stone = '#c9b48a', mud = '#b08a5a', gold = '#d6a93a', bronze = '#a8703a', blue = '#2f5fa8', sand = '#8a7a5a', cedar = '#8a5a34', limestone = '#d9ceb0';
function ground(s, w, d, color = sand) { s.box(null, [-w / 2, -2, -d / 2], [w, 2, d], color, { bg: true, edge: false }); }

/* ---------------- Babylon: Ishtar Gate and Etemenanki ---------------- */
function babylon() {
  const s = new Scene(); ground(s, 150, 190, '#8a7a56');
  s.box('way', [-9, 0, -90], [18, 0.6, 180], '#b9a57a', { edge: false, lay: 1 });                 // Processional Way
  s.box('wall', [-70, 0, 20], [61, 14, 5], '#9c7a4a'); s.box('wall', [9, 0, 20], [61, 14, 5], '#9c7a4a');
  s.box('gate', [-9, 12, 18], [18, 6, 9], blue);                                                  // arch lintel (schematic)
  s.box('gate', [-22, 0, 16], [13, 26, 13], blue); s.box('gate', [9, 0, 16], [13, 26, 13], blue);
  s.box('gate', [-17, 26, 18], [4, 4, 9], gold); s.box('gate', [13, 26, 18], [4, 4, 9], gold);
  s.box('wall', [-70, 0, -70], [61, 14, 5], '#9c7a4a'); s.box('wall', [9, 0, -70], [61, 14, 5], '#9c7a4a');
  s.box('lions', [-9, 0, -35], [2, 4, 8], gold); s.box('lions', [7, 0, -35], [2, 4, 8], gold); s.box('lions', [-9, 0, -10], [2, 4, 8], gold); s.box('lions', [7, 0, -10], [2, 4, 8], gold);
  s.box('court', [-45, 0, -86], [90, 1, 40], '#a08a60', { edge: false, lay: 1 });
  s.box('zig', [-27, 1, -128], [54, 14, 54], mud); s.box('zig', [-22, 15, -123], [44, 12, 44], '#bb9560');
  s.box('zig', [-17, 27, -118], [34, 12, 34], '#c6a06a'); s.box('zig', [-12, 39, -113], [24, 10, 24], '#cfae78'); s.box('zig', [-8, 49, -109], [16, 8, 16], '#d6b886');
  s.box('top', [-5, 57, -106], [10, 6, 10], blue); s.pyramid('top', [-5.4, 63, -106.4], [10.8, 10.8], 2.6, '#2a4f8a');
  s.stairs('zig', [-3, 1, -73], 'z-', 6, 10, 1.4, 1.6, '#a08558');
  s.pin('gate', [0, 33, 22], 1); s.pin('way', [0, 3, 4], 2); s.pin('lions', [-8, 8, -30], 3); s.pin('zig', [-26, 32, -123], 4); s.pin('top', [0, 66, -101], 5); s.pin('wall', [-50, 18, 22], 6);
  return s;
}
const BABP = {
  gate: ['The Ishtar Gate', 'Built under Nebuchadnezzar II (c. 575 BCE) and faced with glazed bricks of blue with rows of bulls (Adad) and dragons (Marduk). The rebuilt gate is in Berlin’s Pergamon Museum. The gate here is simplified; the excavated version had two pairs of towers and a lower, earlier gate beneath.', ['Daniel 4:29–30']],
  way: ['The Processional Way', 'A paved street about 20 m wide, with glazed walls of lions (Ishtar’s animal) running toward the Esagila temple. It carried the New Year (Akitu) procession of Marduk’s statue. Compare the Babylon of Isaiah 14 and Jeremiah 51, which the prophets knew only by report or from exile.', ['Isaiah 14:4', 'Jeremiah 51:44']],
  lions: ['Lions of Ishtar', 'Striding lions in relief lined the way. Roughly 120 are estimated to have been on the walls. The colour and number here are schematic.', []],
  zig: ['Etemenanki, the “house of the foundation of heaven and earth”', 'A seven-stage ziggurat of mud brick and fired brick about 91 m square at its base, rebuilt in Nebuchadnezzar’s time. It was destroyed (Alexander’s plan to rebuild it was never completed) and only the foundation survives. The seven stages and height come from a cuneiform tablet (the Esagila Tablet) and Herodotus. Many scholars connect it with the story of Babel.', ['Genesis 11:1–9']],
  top: ['The summit shrine', 'The top temple of Marduk is known only from texts, and Herodotus says it held a gilded couch and table. Its colour is conjectural.', []],
  wall: ['The city walls', 'Double walls with moat, said by Herodotus to be wide enough for a chariot to turn on top; this is probably exaggerated. The walls are heavily reconstructed in this model.', ['Jeremiah 51:58']]
};
const BABN = 'Schematic reconstruction of the northern gate and ziggurat area of Babylon from Robert Koldewey’s excavations (1899–1917) and the Esagila Tablet. It is the city the Judean exiles knew. Heights, especially for the ziggurat, rest on texts and are uncertain; the hanging gardens are omitted, because their existence and location are unproven.';

/* ---------------- Six-chamber gate (Megiddo, Hazor, Gezer) ---------------- */
function gate6() {
  const s = new Scene(); ground(s, 80, 80, '#7d6c4c');
  s.box('wall', [-40, 0, -4], [27, 12, 8], stone); s.box('wall', [13, 0, -4], [27, 12, 8], stone);
  s.box('tower', [-13, 0, -17], [8, 18, 34], '#bfae86'); s.box('tower', [5, 0, -17], [8, 18, 34], '#bfae86');
  [[-30, 'a'], [-12, 'b'], [6, 'c']].forEach(([z]) => {});
  const z0 = [-14, -2, 10];
  z0.forEach(z => { s.box('chamber', [-26, 0, z], [13, 7, 6], '#d9c79c'); s.box('chamber', [13, 0, z], [13, 7, 6], '#d9c79c'); });
  s.box('passage', [-5, 0, -17], [10, 0.4, 34], '#b09a6c', { edge: false, lay: 1 });
  s.box('bench', [-4, 0.4, -16], [1, 1, 32], '#8a5a34'); s.box('bench', [3, 0.4, -16], [1, 1, 32], '#8a5a34');
  s.box('plaza', [-20, 0, 18], [40, 0.4, 24], '#a89468', { edge: false, lay: 1 });
  s.box('lintel', [-5, 14, -17], [10, 4, 3], '#bfae86'); s.box('lintel', [-5, 14, 14], [10, 4, 3], '#bfae86');
  s.pin('tower', [0, 22, -10], 1); s.pin('chamber', [-20, 10, -11], 2); s.pin('passage', [0, 4, 0], 3); s.pin('bench', [4, 4, 14], 4); s.pin('plaza', [0, 3, 30], 5); s.pin('wall', [-27, 15, 0], 6);
  return s;
}
const GATP = {
  tower: ['The gate towers', 'A six-chamber gate had a long passage through three pairs of chambers flanked by two towers. Gates of this plan were found at Hazor, Megiddo and Gezer, and 1 Kings 9:15 says Solomon fortified those cities. Their dating (Solomon in the 10th century or a century later, under Omride kings) is a central dispute in the “low chronology” debate.', ['1 Kings 9:15']],
  chamber: ['Guard rooms', 'Small side rooms held the guard, records and storage, and some were used for administration. The count of three on each side is what gives the “six-chamber” name.', []],
  passage: ['The passage', 'A road about 4 m wide ran straight through, with doors at each end. This is where a besieger would meet the strongest defence.', ['Judges 16:2–3']],
  bench: ['Benches of the elders', 'The gate was the place for courts, deals and public announcements. In Ruth 4, Boaz settles a legal matter before ten elders there, and the prophets list injustice “in the gate.” Some gates have stone benches along the inside.', ['Ruth 4:1–11', 'Amos 5:12', 'Genesis 19:1']],
  plaza: ['The open square', 'A paved area just inside served as market and meeting place, such as the “broad place” by the gate in 2 Chronicles 32:6.', ['2 Chronicles 32:6']],
  wall: ['The casemate wall', 'Walls of this period often used a double wall divided into compartments (casemates), also found at Hazor, Gezer and Megiddo, and sometimes used for storage.', []]
};
const GATN = 'Schematic model of the six-chambered city-gate type known from Megiddo, Hazor and Gezer (and Lachish, in a related form). It is a composite, not a single site. The proportions (about 18 m wide by 20 m long) follow Yadin’s Hazor plan. Whether such gates date to Solomon is disputed.';

/* ---------------- Qumran ---------------- */
function qumran() {
  const s = new Scene(); ground(s, 130, 100, '#9a8a64');
  s.box('main', [-30, 0, -20], [34, 8, 32], limestone); s.box('main', [-30, 8, -20], [14, 6, 14], '#d0c3a0');
  s.box('tower', [-30, 0, 12], [12, 14, 12], '#bfae86');
  s.box('scr', [-4, 0, -10], [22, 4, 9], '#e2d6b4');                                          // scriptorium (the “upper room”)
  s.box('scr', [-4, 4, -10], [22, 3, 9], '#cfc29e');
  s.box('assembly', [4, 0, -28], [18, 5, 12], '#d6c9a6');
  s.box('refec', [-30, 0, -34], [26, 5, 12], '#d6c9a6');
  s.box('pools', [-12, 0, 18], [6, 0.3, 14], blue, { edge: true, lay: 2 }); s.box('pools', [-4, 0, 18], [6, 0.3, 14], blue, { edge: true, lay: 2 }); s.box('pools', [4, 0, 18], [6, 0.3, 14], blue, { edge: true, lay: 2 });
  s.box('aq', [-60, 4, 10], [48, 1.5, 2], '#bfae86');
  s.box('pot', [26, 0, 4], [14, 4, 10], '#c58a3a');
  s.box('cave', [52, 12, -40], [10, 10, 12], '#3a2f20'); s.box('cave', [46, 6, -40], [8, 8, 12], '#3a2f20'); s.box('cliff', [44, 0, -50], [32, 30, 18], '#a8946a');
  s.box('ceme', [30, 0, 28], [30, 1, 28], '#b09a6c', { edge: false, lay: 1 });
  s.pin('main', [-14, 15, -4], 1); s.pin('tower', [-24, 16, 18], 2); s.pin('scr', [8, 8, -5], 3); s.pin('pools', [0, 3, 25], 4); s.pin('aq', [-36, 8, 11], 5); s.pin('pot', [33, 6, 9], 6); s.pin('cave', [56, 24, -34], 7); s.pin('ceme', [45, 3, 42], 8);
  return s;
}
const QUMP = {
  main: ['The main building', 'A complex on a marl plateau above the Dead Sea, occupied from the 2nd century BCE to its destruction by Rome in 68 CE. Roland de Vaux excavated it in the 1950s and identified it as an Essene monastery; later scholars have proposed a fortified villa, a pottery works, or a manor, and many accept some community use while rejecting the monastic picture.', []],
  tower: ['The tower', 'A defensive two-storey tower at the northwest corner, with the entrance by a ladder or stairs at the upper level. The building had defensive features, but its military role is debated.', []],
  scr: ['The “scriptorium”', 'De Vaux named a long room with a plastered table-like bench a scriptorium where scrolls were copied. No ink-stained table in situ is certain, and many now think the “tables” were dining furniture from a room above. The scrolls may have been copied elsewhere and carried to the caves.', []],
  pools: ['The water system', 'An elaborate aqueduct brought flood-water to cisterns and stepped pools. Some of the stepped plastered pools are read as ritual baths (miqva’ot), which fits an emphasis on purity, though the number is also explained by the water supply.', ['Leviticus 15:13']],
  aq: ['The aqueduct', 'A channel carrying seasonal flood water from the wadi at the cliffs to the settlement, essential in the desert.', []],
  pot: ['The pottery workshop', 'Kilns and a potter’s area show industrial production, and some of the scroll jars match local manufacture. This is a main reason for doubt about a purely monastic reading.', []],
  cave: ['Cave 4 and the caves', 'Eleven caves held the Dead Sea Scrolls, found between 1947 and 1956. Cave 4 alone yielded fragments of about 580 manuscripts, among them texts of almost every biblical book (except Esther) and the community’s own rules. The first scrolls were found by Bedouin shepherds.', ['Isaiah 40:3']],
  ceme: ['The cemetery', 'Over a thousand graves lie east of the settlement, laid out in rows with bodies buried on their backs and heads to the south. The grave arrangement is unlike other Jewish burials in the region. Mostly men were buried, but women and children were found too.', []]
};
const QUMN = 'Schematic plan after de Vaux’s Period Ib–II and later reassessments (Magen and Peleg, Hirschfeld). Who lived at Qumran and how it relates to the scrolls is unresolved: Essene settlement is the majority view, but it is contested. Dimensions are rounded.';

/* ---------------- Rock-cut tomb of the first century ---------------- */
function tomb() {
  const s = new Scene(); ground(s, 70, 60, '#7d6c4c');
  s.box('hill', [-34, 0, -28], [68, 20, 40], '#b9a57a');                                       // the rock face
  s.box('court', [-14, 0, 12], [28, 0.5, 16], '#c9b995', { edge: false, lay: 1 });
  s.box('door', [-4, 0, 11.8], [8, 7, 0.4], '#3a2f20');                                        // doorway (cut)
  s.cyl('stone', [8, 0, 12.6], 3.5, 1.6, '#cfc09a', { sides: 20 });                            // rolling stone (schematic: a short cylinder)
  s.box('track', [-5, 0, 11.2], [14, 0.4, 1.6], '#8a7a5a', { edge: true });
  s.box('vest', [-6, 0, -8], [12, 5, 16], '#a89468', { a: 0.4 });                              // antechamber, cut transparent
  s.box('bench', [-5.4, 0, -20], [4, 3, 9], '#c9b995'); s.box('bench', [1.4, 0, -20], [4, 3, 9], '#c9b995');
  s.box('arc', [-5.4, 3, -20], [4, 1.4, 9], '#a89468'); 
  s.box('garden', [-34, 0, 14], [20, 1.2, 16], '#3d4a35'); s.box('garden', [14, 0, 14], [20, 1.2, 16], '#3d4a35');
  s.pin('hill', [0, 24, -10], 1); s.pin('door', [0, 9, 12], 2); s.pin('stone', [8, 5.6, 12.6], 3); s.pin('vest', [0, 7, 0], 4); s.pin('bench', [-3.4, 5, -16], 5); s.pin('garden', [-24, 4, 22], 6);
  return s;
}
const TOMP = {
  hill: ['Cut from the rock', 'Wealthy families in Jerusalem cut tombs from the limestone hills outside the walls. The Gospels say Jesus was laid in a new tomb belonging to Joseph of Arimathea, “cut in the rock” (Mark 15:46). A tomb in a garden near the place of crucifixion matches the pattern of tombs in northern Jerusalem.', ['Mark 15:46', 'John 19:41']],
  door: ['The low entrance', 'Tomb entrances were small, so a visitor had to stoop to look in (John 20:5). Many had a short forecourt and a stepped entrance.', ['John 20:5']],
  stone: ['The rolling stone', 'Some first-century tombs, Herod’s family tomb among them, had a round stone that rolled in a groove across the door; most used a square blocking stone. The Gospels mention “a great stone” (Matthew 27:60). The model shows a rolling stone, which is the more dramatic option.', ['Matthew 27:60', 'Mark 16:3–4']],
  vest: ['The antechamber', 'A small room where mourners could stand and prepare the body with spices (John 19:39–40). It is drawn semi-transparent so the inner room shows.', ['John 19:39–40']],
  bench: ['Burial benches', 'Cut benches or niches (arcosolia) along the inner wall held the body, wrapped in linen. After about a year the bones were gathered into a stone ossuary (a custom known from c. 20 BCE to 70 CE), such as the one inscribed for Caiaphas’s family, reported in 1990.', ['Luke 23:53', 'John 20:6–7']],
  garden: ['The garden', 'John says the tomb was in a garden near the crucifixion site (19:41). Gardens and orchards were common beside Jerusalem’s northern tombs.', ['John 19:41']]
};
const TOMN = 'Schematic composite of a Herodian-period rock-cut tomb in the Jerusalem area, after surveys by Kloner and Zissu. It is not a model of any single tomb, and not a claim about the location of Jesus’s tomb, which is a separate question (the Church of the Holy Sepulchre and the Garden Tomb are two traditions).';

/* ---------------- Pool of Bethesda ---------------- */
function bethesda() {
  const s = new Scene(); ground(s, 110, 90, '#7d6c4c');
  s.box('rim', [-34, 0, -22], [68, 2, 44], '#b9a57a'); s.box('water', [-32, 2, -20], [29, 0.2, 40], blue, { a: 0.8, lay: 2 }); s.box('water', [3, 2, -20], [29, 0.2, 40], blue, { a: 0.8, lay: 2 });
  s.box('dike', [-3, 0, -22], [6, 8, 44], '#bfae86');
  const cols = (x, z, w, d) => { for (let i = 0; i <= w / 8; i++) s.cyl('stoa', [x + i * 8, 0, z], 0.8, 9, limestone, { sides: 8 }); };
  cols(-34, -26, 64, 0); cols(-34, 26, 64, 0); 
  s.box('stoa', [-36, 9, -27], [72, 1.2, 4], '#a89468'); s.box('stoa', [-36, 9, 23], [72, 1.2, 4], '#a89468');
  s.box('stoa', [-36, 0, -27], [4, 9, 54], limestone, { a: 0.5 });
  s.gable('stoa', [-36, 10.2, -27], [72, 4], 1.5, '#8a5a34'); s.gable('stoa', [-36, 10.2, 23], [72, 4], 1.5, '#8a5a34');
  s.box('steps', [30, 0, -8], [4, 2, 16], '#a89468');
  s.box('chapel', [-12, 8, -6], [24, 10, 12], limestone, { a: 0.35 });
  s.pin('water', [-18, 4, 0], 1); s.pin('dike', [0, 10, 0], 2); s.pin('stoa', [-20, 12, 25], 3); s.pin('steps', [32, 4, 0], 4); s.pin('rim', [30, 3, 21], 5);
  return s;
}
const BETP = {
  water: ['Two pools', 'Excavations north of the temple mount (1888–1964) uncovered twin rock-cut reservoirs divided by a wall, about 120 m by 60 m in total. They were originally reservoirs for the temple and became a healing sanctuary. John 5:2 says Bethesda has “five roofed colonnades.”', ['John 5:2']],
  dike: ['The central divider', 'A wide dike between the pools carried a colonnade; with the four sides this makes five porticoes, the “five roofed colonnades” of John 5. The “five porticoes” have usually been taken as symbolic, until the excavations showed an actual five-sided plan.', ['John 5:2']],
  stoa: ['The porticoes', 'Colonnades around the reservoirs gave shelter to the sick “blind, lame, and paralysed” (John 5:3). A later Roman-period sanctuary of Asclepius and Serapis was built over part of the site (2nd c. CE), showing that healing continued there under another name.', ['John 5:3', 'John 5:5–9']],
  steps: ['Steps down to the water', 'Stairs with landings let people enter the pools, as at ritual baths (miqva’ot). The healing story says the sick man had no one to put him into the pool “when the water is stirred” (5:7), a verse missing from the oldest manuscripts, with the “stirring” explanation added later.', ['John 5:7']],
  rim: ['The Sheep Gate', 'John places the pool “by the Sheep Gate” (5:2), at the north of the temple area, where animals for sacrifice came in (Nehemiah 3:1).', ['Nehemiah 3:1', 'John 5:2']]
};
const BETN = 'Schematic reconstruction of the Pool of Bethesda (Bethzatha) from Jean Duprat’s 1960s excavations and the Crusader and Byzantine overlay. Colonnade heights are estimates, and the Roman sanctuary of Asclepius is omitted. The reading “Bethesda” (house of mercy) differs from “Bethzatha” and “Bethsaida” in the manuscripts.';

/* ---------------- Temple of Artemis at Ephesus ---------------- */
function artemis() {
  const s = new Scene(); ground(s, 150, 100, '#8a7a56');
  s.box('crep', [-60, 0, -32], [120, 4, 64], '#d8cdae'); s.box('crep', [-58, 4, -30], [116, 4, 60], '#e0d6bb'); s.box('crep', [-56, 8, -28], [112, 3, 56], '#e8dfc6');
  s.stairs('crep', [-6, 0, 32], 'z-', 12, 3, 3.6, 4, '#c9b995');
  const col = (x, z) => s.cyl('cols', [x, 11, z], 1.6, 18, '#f0e8d2', { sides: 10 });
  for (let i = 0; i < 8; i++) { col(-47 + i * 13.4, -24); col(-47 + i * 13.4, 24); }
  for (let j = 1; j < 3; j++) { for (let i = 0; i < 6; i++) { col(-47 + i * 13.4 + 5, -24 + j * 16); } }
  s.box('cella', [-30, 11, -12], [60, 14, 24], '#e0d6bb', { a: 0.55 });
  s.box('statue', [-6, 11, -4], [3, 8, 3], gold);
  s.box('roof', [-52, 29, -28], [104, 3, 56], '#cfc29e'); s.gable('roof', [-52, 32, -28], [104, 56], 6, '#a8703a');
  s.box('altar', [60, 0, -6], [14, 4, 14], bronze);
  s.pin('crep', [-50, 4, 36], 1); s.pin('cols', [-30, 32, 24], 2); s.pin('cella', [0, 26, 0], 3); s.pin('statue', [-4.5, 21, -2.5], 4); s.pin('roof', [0, 40, 0], 5); s.pin('altar', [67, 7, 1], 6);
  return s;
}
const ARTP = {
  crep: ['The platform', 'The Hellenistic temple (rebuilt after an arson in 356 BCE, the night Alexander was born, by a man seeking fame) stood on a stepped platform about 115 m by 55 m. The earlier Croesus-era temple lay beneath, and John Turtle Wood found it in 1869–74.', []],
  cols: ['The columns', 'A double ring of about 127 Ionic columns, some 18 m high, with carved drums at the base of some. Antipater of Sidon listed it among the Seven Wonders. The count and the double rows are from ancient reports and the excavated foundations; the spacing here is simplified.', ['Acts 19:27']],
  cella: ['The cella', 'The inner room housed the cult statue. Its roof may have been open to the sky, as in other Ionic temples, which the model does not show.', []],
  statue: ['Artemis of the Ephesians', 'The statue is best known from Roman copies, a figure with rows of rounded forms on the chest (once read as breasts, now variously as eggs, bees’ nests or bull’s testes). The silversmith Demetrius made models of her shrine (Acts 19:24), and the story says the image had “fallen from heaven” (Acts 19:35), probably a meteorite or old wooden idol.', ['Acts 19:24–35']],
  roof: ['The roof', 'A wooden roof with marble tiles, supported by huge beams, was another element of the ancient fame of the building. Its design is not well known.', []],
  altar: ['The great altar', 'A monumental altar stood east of the temple, where processions ended. Acts 19 shows what the temple meant to the economy of Ephesus: pilgrims, craftsmen and a bank of the goddess. Paul’s preaching in the city cut into the trade, and a riot followed.', ['Acts 19:23–41']]
};
const ARTN = 'Schematic reconstruction after the British Museum excavations (Wood, 1869–74) and later work by Austrian teams, following Pliny and Vitruvius for dimensions. The temple fell to the Goths in 262 CE; a single reconstructed column stands on the site. Treat the column count and arrangement as approximate.';

export const MORE = {
  babylon: { id: 'babylon', n: 'Babylon: the Ishtar Gate and Etemenanki', era: 'exile', sub: 'c. 575 BCE · The city of the exiles', icon: 'columns', note: BABN, parts: BABP, build: babylon, yaw: -0.65, pitch: 0.4, intro: 'The city to which Jerusalem’s elite were taken: the processional way, the blue gate and the great stepped tower behind it.' },
  gate6: { id: 'gate6', n: 'A six-chamber city gate', era: 'monarchy', sub: '10th–9th c. BCE · Megiddo, Hazor, Gezer', icon: 'gate', note: GATN, parts: GATP, build: gate6, yaw: -0.6, pitch: 0.38, intro: 'The place where elders sat and cases were settled, and the first line of defence: a gate of the Solomonic type.' },
  qumran: { id: 'qumran', n: 'Qumran and the Scroll caves', era: 'second', sub: 'c. 100 BCE–68 CE · Dead Sea', icon: 'scroll', note: QUMN, parts: QUMP, build: qumran, yaw: -0.7, pitch: 0.5, intro: 'The desert settlement beside the caves in which the Dead Sea Scrolls were found.' },
  tomb: { id: 'tomb', n: 'A first-century rock-cut tomb', era: 'roman', sub: '1st c. CE · Jerusalem', icon: 'mountain', note: TOMN, parts: TOMP, build: tomb, yaw: -0.5, pitch: 0.45, intro: 'The kind of tomb the Gospels describe: a chamber cut in the rock, a low door, a great stone and a garden.' },
  bethesda: { id: 'bethesda', n: 'The Pool of Bethesda', era: 'roman', sub: '1st c. CE · Jerusalem', icon: 'columns', note: BETN, parts: BETP, build: bethesda, yaw: -0.6, pitch: 0.55, intro: 'Two great pools and five porticoes: the site of John’s healing story beside the Sheep Gate.' },
  artemis: { id: 'artemis', n: 'The Temple of Artemis at Ephesus', era: 'christianity', sub: '4th c. BCE–3rd c. CE · Ephesus', icon: 'temple', note: ARTN, parts: ARTP, build: artemis, yaw: -0.7, pitch: 0.4, intro: 'One of the Seven Wonders, and the setting of Paul’s riot in Acts 19.' }
};
export const MORE_ORDER = ['babylon', 'gate6', 'qumran', 'tomb', 'bethesda', 'artemis'];
