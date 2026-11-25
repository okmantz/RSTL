// Onboarding + personalization config. Nothing here is a doctrinal claim about any tradition;
// it only sets a starting point (what to suggest first, and how to phrase a few prompts).

export const TRADS = {
  ath: {
    n: 'Atheist or agnostic', start: 'origins', tracks: ['canon', 'trial', 'mountains'], voices: ['gilgamesh', 'hume', 'akhnai'], res: ['ane', 'scholar', 'second', 'lit'],
    hello: 'You are welcome here as a reader, not a convert. Texts are read as history, literature and moral argument first. Nothing asks you to believe anything.',
    sit: ['Reflect', 'Write what this passage asks of a reader, any reader, and whether you would grant it.'],
    tq: [
      'Read it as an ancient text: who wrote it, for whom, and with what agenda? What would you say about it if it came from another culture’s scripture?',
      'What in this passage still carries moral or literary weight for you, whatever you think of its claims?',
      'Which part of this would a believer find most important, and do you understand why?',
      'What kind of evidence would you need to take the central claim of this passage seriously? Is that a fair standard?',
      'How does this text compare with its closest neighbours in the ancient Near East or Greco-Roman world?',
      'If this passage were wrong, what would it be wrong about: history, metaphysics, ethics, or all three?'
    ]
  },
  que: {
    n: 'Questioning or deconstructing', start: 'songs', tracks: ['trial', 'faith', 'canon'], voices: ['kierk', 'dostoevsky', 'weil'], res: ['scholar', 'canon', 'second', 'lit'],
    hello: 'Doubt is treated as a legitimate way to read, not a problem to be solved. You will find lament, protest and uncomfortable texts early, and no pressure to resolve them.',
    sit: ['Reflect', 'Write which part of this still has a hold on you, and which part has let go.'],
    tq: [
      'Which part of this passage did you inherit without examining? Which part survives your questions?',
      'What did you once hear about this text that you no longer believe? What replaced it?',
      'Is there anything here you would keep even if you were wrong about everything else?',
      'What would it cost you to take this passage seriously? What would it cost you to dismiss it?',
      'Who taught you to read this passage, and what did they need it to say?',
      'If a friend asked what this passage means to you today, what would you honestly tell them?'
    ]
  },
  cat: {
    n: 'Catholic', start: 'gospels', tracks: ['canon', 'jesus', 'trinity'], voices: ['didache', 'ignatius', 'wisdom', 'maccabees'], res: ['apocrypha', 'fathers', 'canon', 'scholar'],
    hello: 'The full Catholic canon is here, including the deuterocanonical books, alongside the Church Fathers and the questions historians ask. Tradition and critical scholarship are both treated as serious conversation partners.',
    sit: ['Pray it', 'Write this passage back to God as prayer, thanksgiving or petition, in your own words.'],
    tq: [
      'Where have you heard this text in the liturgy or lectionary? Does hearing it there change what you notice here?',
      'How did the Church Fathers read this passage? Where would a modern historian agree, and where push back?',
      'What does the Church teach on this text, and what does the text itself say before any teaching is applied?',
      'Is there a Marian, sacramental or communal dimension to this passage? Is it in the text, or brought to it?',
      'How does this passage speak to the relation between Scripture and Tradition?',
      'Which saint or spiritual writer has read this passage in a way that helps you? Does their reading hold up against the text?'
    ]
  },
  ort: {
    n: 'Orthodox (Eastern or Oriental)', start: 'gospels', tracks: ['trinity', 'canon', 'jesus'], voices: ['ignatius', 'origen', 'justin'], res: ['fathers', 'apocrypha', 'canon', 'scholar'],
    hello: 'The Septuagint, the Fathers and the larger canons are part of the library here. Liturgical and typological reading sits beside historical criticism, and neither is asked to silence the other.',
    sit: ['Pray it', 'Write this passage back to God as prayer or lament, in your own words.'],
    tq: [
      'How is this passage used in the liturgy, the hymns or the icons of your tradition? What does that use emphasise?',
      'How would the Fathers read this typologically, with Christ at the centre of the Old Testament? Where would a historian read it differently?',
      'Does the Septuagint reading differ from the Hebrew or modern translations here? What follows from that?',
      'What does this passage say about the transformation of the person, not only about belief?',
      'Where does this text point beyond itself to the mystery of God rather than to a definition?',
      'How do you hold the received reading and a critical reading together? Which pulls harder here?'
    ]
  },
  prot: {
    n: 'Protestant (evangelical, Baptist, Reformed, non-denominational)', start: 'church', tracks: ['jesus', 'faith', 'canon'], voices: ['didache', 'justin', 'bonhoeffer'], res: ['canon', 'nt-greek', 'scholar', 'fathers'],
    hello: 'The text comes first, in three translations, with every verse linked to the rest of Scripture. Hard passages are named openly, and positions you may not share are laid out at full strength.',
    sit: ['Pray it', 'Write this passage back to God as prayer, confession or petition, in your own words.'],
    tq: [
      'If this passage were your only source, what would you conclude? What do you add from your tradition or your pastor?',
      'What does the plain sense say, and what did the original audience hear? Are they the same?',
      'Where does this passage press against a doctrine you hold? Do you change the doctrine, or the reading?',
      'How does this passage fit within the whole story of Scripture, from creation to new creation?',
      'What would obedience to this passage look like this week, specifically?',
      'Which other passages would a thoughtful believer from a different denomination bring to bear on this one?'
    ]
  },
  lut: {
    n: 'Lutheran, Anglican or mainline Protestant', start: 'church', tracks: ['faith', 'jesus', 'canon'], voices: ['bonhoeffer', 'kierk', 'origen'], res: ['canon', 'apocrypha', 'fathers', 'scholar'],
    hello: 'Law and gospel, sacrament and Word, and the long conversation with the Fathers all have room here. Scholarship is treated as a gift to faith, not a threat to it.',
    sit: ['Pray it', 'Write this passage back to God as prayer or confession, in your own words.'],
    tq: [
      'Where does this passage speak as Law, convicting or commanding, and where as Gospel, freeing and promising?',
      'How does this passage speak of grace, and how of response? Which does your tradition stress, and does the text agree?',
      'How have the creeds and confessions of your tradition read this passage? Do they read it fairly?',
      'Is there a sacramental or liturgical echo here, in baptism, table or word?',
      'Where would this passage make the church uncomfortable if read aloud without comment?',
      'How would a historical-critical reading and a devotional reading differ here, and can both be true?'
    ]
  },
  pen: {
    n: 'Pentecostal or charismatic', start: 'church', tracks: ['jesus', 'last', 'faith'], voices: ['didache', 'justin', 'thomas'], res: ['nt-greek', 'canon', 'fathers', 'scholar'],
    hello: 'Acts, the gifts and experience of the Spirit are taken seriously as part of the biblical story, and so are the questions scholars and sceptics ask. Testing everything is itself a biblical instruction.',
    sit: ['Pray it', 'Write this passage back to God as prayer, praise or petition, in your own words.'],
    tq: [
      'Does this passage describe something you have experienced, or something you expect? How would you test an experience against it?',
      'What does this passage say about the Spirit, and what does it say about order and discernment?',
      'How would a first-century reader have heard this, and how does that compare with how it is used in worship today?',
      'Where does your experience of God confirm this text, and where does it raise questions the text does not answer?',
      'What testimony, yours or someone else’s, would you set beside this passage? What would a sceptic ask about it?',
      'What would it mean to read this passage with the whole church across history and not only with your own movement?'
    ]
  },
  oth: {
    n: 'Jewish, Muslim or another faith', start: 'origins', tracks: ['mountains', 'canon', 'ethics'], voices: ['quran112', 'akhnai', 'rabia'], res: ['jewish', 'world', 'ane', 'scholar'],
    hello: 'Many of these texts are shared, contested or answered by your own tradition. They are read here with that conversation in view, and with respect for how you already read them.',
    sit: ['Reflect', 'How would someone in your tradition pray over or meditate on a passage like this? Try writing in that voice.'],
    tq: [
      'How does your tradition read this text or its closest parallel? Where do the readings converge, and where do they part?',
      'What would a scholar from your tradition find missing, or misframed, in how this passage is usually taught in churches?',
      'Which story, figure or law in this passage appears in your own scriptures or commentary, and how is it told there?',
      'Where does this passage share a moral intuition with your tradition, and where does it differ?',
      'How would you explain this passage to a neighbour who has never read it?',
      'What would you want a Christian reader of this passage to understand about how it sounds to you?'
    ]
  },
  spi: {
    n: 'Spiritual, not religious', start: 'songs', tracks: ['mountains', 'ethics', 'faith'], voices: ['gita', 'dhammapada', 'tao'], res: ['world', 'second', 'lit', 'scholar'],
    hello: 'The Bible is read here alongside other wisdom traditions, without requiring you to accept a creed. Take what holds weight and examine the rest.',
    sit: ['Sit with it', 'Read it once more, slowly. What does it stir, apart from any doctrine?'],
    tq: [
      'What in this passage speaks to you apart from doctrine? What do you decline to accept, and why?',
      'Where does this passage echo wisdom you have met in another tradition? Where is it genuinely different?',
      'What practice, such as silence, service or fasting, does this passage imply? Would you try it?',
      'Which images here work for you as metaphor, and which seem to demand literal belief?',
      'What do you lose if you read this only as inspiration? What do you lose if you read it only as law?',
      'How does this passage treat suffering, desire or attachment compared with texts you already love?'
    ]
  },
  none: {
    n: 'Not sure, or prefer not to say', start: 'gospels', tracks: ['canon', 'jesus', 'trial'], voices: ['enoch', 'gilgamesh', 'kierk'], res: ['canon', 'apocrypha', 'scholar', 'lit'],
    hello: 'No label needed. You will get a balanced start: the text, the history behind it, and the strongest arguments on several sides.',
    sit: ['Reflect', 'Write what this passage asks of a reader, and what you make of that.'],
    tq: [
      'What do you notice that you think a first-time reader would miss?',
      'Which view of this passage have you heard most often? Which have you never heard?',
      'What would change your reading of this passage?',
      'What is the strongest objection to how you currently read this?',
      'What would you want to ask the author?',
      'If someone with the opposite background read this next to you, what would they stress?'
    ]
  }
};

export const TRAD_ORDER = ['ath', 'que', 'spi', 'cat', 'ort', 'prot', 'lut', 'pen', 'oth', 'none'];

export const GOALS = {
  read: 'Read the text for myself',
  test: 'Test what I believe',
  hist: 'Understand the history and context',
  faith: 'Deepen my faith',
  doubt: 'Work through doubts',
  explore: 'Explore other texts and traditions'
};

export const TONES = {
  gentle: ['Gently', 'Curious, not confrontational. Hard sections stay folded until you open them.'],
  honest: ['Honestly', 'Name the tensions plainly, and leave the decision to me.'],
  hard: ['Hard', 'Do not let me off easy. Push on every claim, including mine.']
};

export const MINS = {
  5: ['5 minutes', 'The passage and one question.'],
  15: ['15 minutes', 'The passage, the main reading and a few questions.'],
  30: ['30 minutes or more', 'Everything: context, voices, cross-references and responses.']
};

// Seasons: each is a block of the 3-year path. `books` is [first, last] book index (inclusive).
export const SEASONS = [
  { id: 'origins', n: 'Origins', sub: 'Genesis', books: [[0, 0]] },
  { id: 'gospels', n: 'The Gospels', sub: 'Matthew to John', books: [[39, 42]] },
  { id: 'songs', n: 'Songs and Questions', sub: 'Job to Song of Solomon', books: [[17, 21]] },
  { id: 'law', n: 'Law and Wilderness', sub: 'Exodus to Deuteronomy', books: [[1, 4]] },
  { id: 'church', n: 'Acts and the Letters', sub: 'Acts to Philemon', books: [[43, 56]] },
  { id: 'nation', n: 'Nation and Empire', sub: 'Joshua to Esther', books: [[5, 16]] },
  { id: 'prophets', n: 'The Prophets', sub: 'Isaiah to Malachi', books: [[22, 38]] },
  { id: 'between', n: 'Between the Testaments', sub: 'The Apocrypha', books: [[66, 79]] },
  { id: 'ending', n: 'Hebrews to Revelation', sub: 'Hebrews to Revelation', books: [[57, 65]] }
];

// Lenses rotate through the generated daily studies so no two days ask the same kind of question.
export const LENSES = [
  ['The Historian', 'Who wrote this, for whom, and what was happening?'],
  ['The Literary Reader', 'How is it built: voice, repetition, structure, silence?'],
  ['The Theologian', 'What does it claim about God, humanity and the world?'],
  ['The Ethicist', 'What does it ask of people, and is that good?'],
  ['The Sceptic', 'What would a fair-minded doubter press on?'],
  ['The Contemplative', 'What is there to notice before there is anything to argue?']
];
