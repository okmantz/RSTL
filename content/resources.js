// Resources: where to go next. `rd` = book index to open in the in-app reader; `u` = external link (site root or well-known stable page).
// Descriptions are deliberately plain. Dates are approximate and scholarly dating is debated.
export const CATS = [
  { id: 'apocrypha', n: 'The Apocrypha', sub: 'Deuterocanonical books (Catholic and Orthodox canons; read by Anglicans and Lutherans for edification)',
    note: 'All fourteen books below are in the app’s KJV text. Open them in the reader and the cross-reference web works on them too.',
    items: [
      ['Tobit', 'c. 225–175 BCE', 'A family story of exile, burial of the dead, a demon, a fish and a journey. Burial of the dead and angelic intercession (12:12) are central.', { rd: 68 }],
      ['Judith', 'c. 150–100 BCE', 'A widow beheads an enemy general. Historically garbled on purpose, probably: it reads like a parable of faithful resistance.', { rd: 69 }],
      ['Wisdom of Solomon', 'c. 30 BCE–50 CE', 'Jewish wisdom speaking Greek philosophy’s language. The Righteous One of chapter 2 is often read next to the Passion story.', { rd: 71 }],
      ['Sirach (Ecclesiasticus)', 'c. 180 BCE', 'Ben Sira’s long book of wisdom, manners and praise. The author names himself at the end (50:27).', { rd: 72 }],
      ['Baruch', '2nd–1st c. BCE', 'Exile, confession, and wisdom identified with the Torah.', { rd: 73 }],
      ['1 Maccabees', 'c. 100 BCE', 'The Hasmonean revolt against Antiochus. Source of Hanukkah’s story.', { rd: 78 }],
      ['2 Maccabees', 'c. 100 BCE', 'The same crisis told as martyrdom and resurrection hope. Compare Hebrews 11:35.', { rd: 79 }],
      ['Prayer of Manasseh', '1st c. BCE–1st c. CE', 'A very short penitential prayer attributed to Judah’s worst king. Appended to the Vulgate.', { rd: 77 }],
      ['Susanna, Bel and the Dragon, Prayer of Azariah', 'Greek additions to Daniel', 'Detective story, satire of idols, and a hymn from the furnace.', { rd: 75 }],
      ['1 and 2 Esdras', '1 Esdras 2nd c. BCE; 2 Esdras c. 100 CE', '2 Esdras (4 Ezra) is a post-70 CE apocalypse wrestling with why Israel suffers while Rome prospers.', { rd: 67 }]
    ] },
  { id: 'canon', n: 'Canon and Manuscripts', sub: 'How the lists of Scripture were made',
    items: [
      ['Septuagint (LXX)', 'Greek Jewish Scriptures, 3rd c. BCE onward', 'The Bible of most New Testament writers. It includes books and readings the Hebrew Masoretic text does not.', { u: 'https://ccat.sas.upenn.edu/nets/edition/', s: 'NETS translation (Penn)' }],
      ['Dead Sea Scrolls', '3rd c. BCE–1st c. CE', 'Manuscripts of nearly every Hebrew Bible book (except Esther), plus Enoch, Jubilees and community writings.', { u: 'https://www.deadseascrolls.org.il', s: 'Digital Library (Israel Museum)' }],
      ['Codex Sinaiticus', '4th c. CE', 'The oldest complete New Testament, with Barnabas and the Shepherd of Hermas attached.', { u: 'https://www.codexsinaiticus.org', s: 'Online edition' }],
      ['Muratorian Fragment', 'late 2nd c. or later (dating disputed)', 'An early list of New Testament books, missing its opening lines.', {}],
      ['Athanasius, Festal Letter 39', '367 CE', 'The first surviving list that names exactly the 27 books of the New Testament.', { u: 'https://www.newadvent.org/fathers/', s: 'New Advent (Fathers)' }],
      ['Council of Trent, Session IV', '1546', 'The Catholic Church’s definition of the canon, including the deuterocanonical books.', {}],
      ['Ethiopian Orthodox canon', 'ongoing tradition', 'Includes 1 Enoch and Jubilees. A reminder that “the Bible” is more than one list.', {}]
    ] },
  { id: 'second', n: 'Second Temple Texts', sub: 'Jewish writings from the centuries around the Bible’s last books',
    items: [
      ['1 Enoch', '3rd c. BCE–1st c. CE', 'The Watchers, the heavenly journeys, the Son of Man. Jude quotes it.', { u: 'https://www.earlyjewishwritings.com', s: 'Early Jewish Writings' }],
      ['Jubilees', '2nd c. BCE', 'Genesis and Exodus retold with a calendar and angelic revelation.', { u: 'https://www.earlyjewishwritings.com', s: 'Early Jewish Writings' }],
      ['Testaments of the Twelve Patriarchs', '2nd c. BCE onward', 'Deathbed speeches of Jacob’s sons, mostly ethical.', {}],
      ['Psalms of Solomon', '1st c. BCE', 'A Pharisaic-era hope for a Davidic Messiah after Pompey’s conquest.', {}],
      ['Josephus: Antiquities and Jewish War', 'late 1st c. CE', 'Our main narrative of first-century Judea. Read with caution: he is a participant with a message.', { u: 'https://www.perseus.tufts.edu', s: 'Perseus Digital Library' }],
      ['Philo of Alexandria', 'c. 20 BCE–50 CE', 'Greek-speaking Jew who reads Torah through Plato. Shows how Scripture and philosophy mixed.', {}],
      ['Qumran: Community Rule, War Scroll', '1st c. BCE–1st c. CE', 'A sect awaiting a final war. Useful for the apocalyptic world of the Gospels.', { u: 'https://www.deadseascrolls.org.il', s: 'Digital Library' }]
    ] },
  { id: 'fathers', n: 'The Early Church', sub: 'Apostolic Fathers, apologists, and the Fathers after Nicaea',
    items: [
      ['Didache', 'c. 50–120 CE', 'Earliest church order: two ways, baptism, Eucharist, itinerant prophets. Short and startling.', { u: 'https://www.earlychristianwritings.com', s: 'Early Christian Writings' }],
      ['1 Clement', 'c. 96 CE', 'Rome writes to Corinth about a quarrel over leaders. Early evidence of church structure.', {}],
      ['Letters of Ignatius', 'c. 110 CE', 'Seven letters from a bishop on the way to execution. Strong on bishops, Eucharist and martyrdom.', {}],
      ['Epistle to Diognetus', '2nd–3rd c.', 'A lyrical defence: Christians are the soul of the world.', {}],
      ['Justin Martyr, Apologies', 'c. 155 CE', 'Describes Sunday worship and argues with Greek philosophy and with Judaism.', { u: 'https://www.newadvent.org/fathers/', s: 'New Advent (Fathers)' }],
      ['Irenaeus, Against Heresies', 'c. 180 CE', 'Main source on Gnostic groups and an early defence of a fourfold Gospel.', {}],
      ['Origen, On First Principles', 'c. 220–230 CE', 'The first systematic theology; also his Hexapla, a six-column Old Testament.', {}],
      ['Athanasius, On the Incarnation', 'c. 335 CE', 'Why God became human. Read it with C. S. Lewis’s introduction.', {}],
      ['Augustine, Confessions', 'c. 400 CE', 'A conversion story told as a prayer; also one of the first autobiographies.', { u: 'https://ccel.org', s: 'Christian Classics Ethereal Library' }],
      ['John Chrysostom, Homilies', 'late 4th c.', 'Preaching that shows how ordinary congregations heard Scripture.', {}]
    ] },
  { id: 'world', n: 'Other Scriptures and Traditions', sub: 'Primary texts, read in translation with their own communities in mind',
    items: [
      ['Qur’an', '7th c. CE', 'Recitation of Muhammad, with retellings of Adam, Abraham, Moses and Jesus. Read Surah 19 (Mary) beside Luke 1.', { u: 'https://quran.com', s: 'Quran.com (several translations)' }],
      ['Hebrew Bible and Talmud on Sefaria', 'ongoing', 'The Tanakh, Mishnah, Talmud and commentaries, with English beside the Hebrew.', { u: 'https://www.sefaria.org', s: 'Sefaria' }],
      ['Bhagavad Gita', 'c. 200 BCE–200 CE', 'A battlefield dialogue about duty, action and devotion.', { u: 'https://www.sacred-texts.com', s: 'Sacred Texts Archive' }],
      ['Dhammapada', 'c. 3rd c. BCE onward', 'Sayings attributed to the Buddha on mind, action and release.', { u: 'https://www.sacred-texts.com', s: 'Sacred Texts Archive' }],
      ['Tao Te Ching', 'c. 4th c. BCE', 'Eighty-one short chapters on the way, power and wu wei.', {}],
      ['Analects of Confucius', 'compiled after c. 479 BCE', 'Teaching on ritual, virtue and the cultivated person.', {}],
      ['Nag Hammadi Library', '2nd–4th c. CE (codices c. 350)', 'Gnostic and related Christian texts: Thomas, Philip, Truth, Apocryphon of John.', { u: 'https://www.gnosis.org/naghamm/nhl.html', s: 'Nag Hammadi Library online' }],
      ['Book of Mormon and other new scriptures', '19th c.', 'Some traditions treat later texts as Scripture. Read them with a member of that tradition if you can.', {}]
    ] },
  { id: 'ane', n: 'The Ancient Near East', sub: 'The world the Bible grew up in',
    items: [
      ['Epic of Gilgamesh', 'Standard version c. 1200 BCE', 'Flood story, a king’s grief, and a plant of life lost to a snake. Compare Genesis 6–9.', { u: 'https://www.sacred-texts.com', s: 'Sacred Texts (E. A. Speiser, G. Smith)' }],
      ['Enuma Elish', 'c. 1100 BCE', 'Babylonian creation epic. Often set beside Genesis 1; scholars disagree about direct dependence.', {}],
      ['Code of Hammurabi', 'c. 1754 BCE', 'Law collection often compared with Exodus 21–23.', {}],
      ['Ugaritic Baal Cycle', 'c. 1400–1200 BCE', 'Canaanite myths whose language echoes in the Psalms.', {}],
      ['Instruction of Amenemope', 'c. 1200 BCE', 'Egyptian wisdom with close parallels to Proverbs 22–24.', {}],
      ['Moabite Stone and Tel Dan Stele', '9th c. BCE', 'Inscriptions that mention Israel and, probably, “the house of David.”', {}]
    ] },
  { id: 'lit', n: 'Literature in Conversation', sub: 'Novels, poems and plays that argue with Scripture',
    items: [
      ['Paradise Lost, John Milton', '1667', 'The most influential retelling of Genesis 1–3.', { u: 'https://www.gutenberg.org', s: 'Project Gutenberg' }],
      ['The Brothers Karamazov, Dostoevsky', '1880', 'Ivan’s “Rebellion” and the Grand Inquisitor ask whether the price of the world’s suffering is too high.', {}],
      ['Moby-Dick, Herman Melville', '1851', 'Job, Jonah and Ecclesiastes under sail.', {}],
      ['The Divine Comedy, Dante', 'c. 1320', 'Medieval theology as an epic poem.', {}],
      ['The Book of Job and J.B., Archibald MacLeish', '1958', 'A modern verse play version of Job.', {}],
      ['Gilead, Marilynne Robinson', '2004', 'A dying pastor’s letter to his young son. Quiet, Reformed, and quietly radical.', {}],
      ['Night, Elie Wiesel', '1956', 'A survivor’s account that rewrote theodicy for many readers.', {}],
      ['The Sparrow, Mary Doria Russell', '1996', 'Jesuits meet an alien civilisation and lose their faith, or find a different one.', {}]
    ] },
  { id: 'scholar', n: 'Scholarship and Study Tools', sub: 'Introductions that treat the text seriously without assuming your conclusion',
    items: [
      ['An Introduction to the New Testament, Raymond E. Brown', '1997', 'Catholic, careful, detailed.', {}],
      ['Misquoting Jesus, Bart D. Ehrman', '2005', 'On textual variants. Read with Metzger’s *Text of the New Testament*.', {}],
      ['The New Testament in Its World, N. T. Wright and Michael Bird', '2019', 'Evangelical Anglican, historical and theological.', {}],
      ['The Bible Unearthed, Finkelstein and Silberman', '2001', 'Archaeological case for a later, smaller early Israel. Contested.', {}],
      ['The Jewish Study Bible', '2004', 'The Tanakh with Jewish commentary. A very different Old Testament.', {}],
      ['Stanford Encyclopedia of Philosophy', 'ongoing', 'Free, peer-reviewed essays on God, evil, miracles, faith and reason.', { u: 'https://plato.stanford.edu', s: 'plato.stanford.edu' }],
      ['Society of Biblical Literature', 'ongoing', 'Free resources and the SBL Greek New Testament.', { u: 'https://www.sbl-site.org', s: 'sbl-site.org' }]
    ] },
  { id: 'nt-greek', n: 'Reading the Languages', sub: 'For those who want to read Hebrew or Greek for themselves',
    items: [
      ['Greek NT interlinear', 'free online', 'Word-by-word Greek with English.', { u: 'https://biblehub.com/interlinear/', s: 'Bible Hub' }],
      ['SBL Greek New Testament', '2010', 'A freely licensed critical text of the Greek New Testament.', { u: 'https://sblgnt.com', s: 'sblgnt.com' }],
      ['Greek for the Rest of Us, William Mounce', '2003', 'A gentle first course for pastors and laypeople.', {}],
      ['Biblical Hebrew Reader, Sefaria', 'ongoing', 'Hebrew text with translation side by side.', { u: 'https://www.sefaria.org', s: 'Sefaria' }],
      ['Septuagint Greek (Swete, NETS)', 'free online', 'See the Greek Old Testament that the New Testament authors read.', { u: 'https://ccat.sas.upenn.edu/nets/edition/', s: 'NETS' }]
    ] },
  { id: 'jewish', n: 'Jewish Readings', sub: 'How the same texts read inside the tradition that first owned them',
    items: [
      ['Mishnah and Talmud', 'c. 200 / c. 500 CE', 'Rabbinic law and argument. Read the story of the Oven of Akhnai (Bava Metzia 59b) for a famous quarrel about authority.', { u: 'https://www.sefaria.org', s: 'Sefaria' }],
      ['Midrash Rabbah', 'c. 400–1000 CE', 'Rabbinic storytelling that fills the gaps in Genesis and Exodus.', {}],
      ['Rashi', '1040–1105', 'The standard medieval commentary on the Torah and Talmud.', { u: 'https://www.sefaria.org', s: 'Sefaria' }],
      ['Maimonides, Guide for the Perplexed', 'c. 1190', 'A rationalist reading of Scripture and a defence of negative theology.', {}],
      ['Abraham Joshua Heschel, The Prophets', '1962', 'Prophets as people who feel God’s pathos, not people who relay rules.', {}],
      ['Jewish Annotated New Testament', '2011', 'The New Testament read by Jewish scholars. A helpful corrective for any reader.', {}]
    ] }
];
export const byId = Object.fromEntries(CATS.map(c => [c.id, c]));
