// Question and prompt banks used by the generated Guided Readings (js/curriculum.js), the Reader, and the Respond panel.
// Genres match the `s` field in data/meta.json.

export const GENRE_TIP = {
  law: 'Torah mixes story and law. Ask who is telling the story and for whom. Legal texts record a community’s ideals, which is not always what it practised.',
  history: 'Biblical history writing is selective and theological. Expect a point of view, and read for what the author is arguing as well as for what happened.',
  wisdom: 'Wisdom and poetry speak in images and in generalisations. Proverbs describe tendencies, Job and Ecclesiastes argue with them, and the Psalms pray in every key.',
  prophets: 'Prophets mostly addressed their own time: kings, courts, temples. Read for the situation first and the later reuse second.',
  gospels: 'The Gospels are ancient biographies written to persuade as well as to record. Read each on its own terms before harmonising them.',
  acts: 'Acts is Luke’s account of the early movement, written decades later with its own themes. Compare it with Paul’s own letters wherever you can.',
  epistles: 'A letter is one half of a conversation. Reconstruct the situation from the reply, and ask which instructions were tied to it and which were meant to travel.',
  apocalypse: 'Apocalyptic literature uses vision and symbol to speak to people under pressure. It is more about unmasking than about timetables.',
  apocrypha: 'These books come from the centuries between the Testaments. Some belong to the Catholic and Orthodox canons, all are witnesses to Second Temple Judaism, and the New Testament sometimes echoes them.'
};

export const GENRE_Q = {
  law: [
    'Who is speaking in this passage, and who is listening? How do you know?',
    'What does this passage assume its first readers already knew?',
    'Whose perspective is missing from this account? What would they say?',
    'If this were your only passage, what picture of God would you form? What picture of people?',
    'What here sounds like the surrounding ancient world, and what sounds different?',
    'Is anything described as good, commanded or approved that you find troubling? Does the text itself seem troubled by it?',
    'What does this passage take for granted about family, land, purity or power?',
    'Where does the narrator hold back from judging? What do you make of that restraint?'
  ],
  history: [
    'What does this account include and leave out? Whose interests does the telling serve?',
    'Does the narrator approve of what happens here, or only report it? How can you tell?',
    'How does this episode connect to the story before it and after it?',
    'Which character is easiest to overlook here? What would their version be?',
    'Where is God active in this account, and where is God silent?',
    'How would a historian and a preacher each use this passage differently?',
    'What does this passage say about power: who has it, who loses it, and how?',
    'What does this story cost the people who are not its heroes?'
  ],
  wisdom: [
    'Is this a description of how life is, a command for how to live, or a prayer? Does the answer change how you read it?',
    'Which line here do you find most true? Which do you find hard to believe?',
    'Does any other part of Scripture answer, soften or contradict this passage?',
    'What experience of life would make this ring true? What experience would make it ring false?',
    'Who is speaking, and from what situation? How would it sound from a different mouth?',
    'What does this passage assume about God’s justice? Does that assumption survive suffering?',
    'What image carries the weight here? What does it do that plain statement could not?',
    'If you could add one honest line, what would it be?'
  ],
  prophets: [
    'What specific situation is the prophet addressing? What is the charge, and who is accused?',
    'Is this judgment, hope, or both? How does the text move between them?',
    'How do later writers, including the New Testament, reuse these words? Do they honour the original setting?',
    'Who is the prophet speaking for, and how does he know? What would a false prophet look like here?',
    'What injustice is named here, and what would the same charge look like today?',
    'What does the prophet do with God’s anger? Is it presented as justice, as grief, or as something else?',
    'Which images are meant literally and which as poetry? How would you decide?',
    'What does this passage say to the powerful? What does it say to the powerless?'
  ],
  gospels: [
    'What does this scene show about Jesus, and what does it show about the people around him?',
    'How does another Gospel tell this story, if it does? What differs, and why might it?',
    'Which detail here would be easy to read past? What does it do?',
    'Who in this scene misunderstands, and what exactly do they misunderstand?',
    'What would a first-century Jewish listener have heard that a modern reader misses?',
    'What does Jesus ask for here, of whom, and at what cost?',
    'What claim is being made about Jesus, and what kind of evidence is offered for it?',
    'What does this passage ask you to do, believe or leave behind?'
  ],
  acts: [
    'What is the church doing here, and how does it decide? Who has authority, and how is it exercised?',
    'What changes in this passage? Who is included, who is excluded, and what is left behind?',
    'How does Luke narrate the work of the Spirit here? What would count as evidence?',
    'How does this story compare with what Paul says in his own letters about the same events?',
    'What risk do the characters take, and what do they stand to lose?',
    'Is this passage describing what happened, prescribing what should happen, or both?',
    'Who is at the margins of this story, and how does the narrative treat them?',
    'How does this passage use Scripture to justify what is happening?'
  ],
  epistles: [
    'What problem in this community is the author answering? What can you reconstruct from the reply alone?',
    'What is the argument here, step by step? Where does the logic turn?',
    'Which word or phrase does the most work, and could it be translated another way?',
    'What would the first hearers, listening to this read aloud, have understood?',
    'What is the author certain about, and what does he leave open?',
    'How has this passage been used in history, for good and for ill?',
    'Which instruction here is tied to its situation, and which is meant to travel? How do you decide?',
    'If the recipients wrote back, what would they say?'
  ],
  apocalypse: [
    'What would this image have meant to a first-century reader living under Rome?',
    'Which symbols come from earlier Scripture? What do they carry from there?',
    'Is this meant to predict, to console, to resist, or all three?',
    'What is being unmasked here, and what is being promised?',
    'Who is the intended audience, and what danger are they in?',
    'How have readers across history applied this text to their own moment? What do those readings share?',
    'What does this passage say about the fate of evil, and who gets to decide?',
    'What would it mean to take this seriously without treating it as a timetable?'
  ],
  apocrypha: [
    'Why might this book have been included in some canons and excluded from others?',
    'What does this book assume that the Hebrew Bible does not say outright?',
    'Which New Testament passage seems to echo this one, and in which direction does the influence run?',
    'What does this book add to your picture of Judaism between the Testaments?',
    'How does this passage handle suffering, faithfulness or the afterlife compared with Job, Daniel or Ecclesiastes?',
    'If this text were in your Bible, what would change? If it is not, what would you lose?',
    'Does the author claim to speak for God, for tradition, or only for himself?',
    'What does this passage show about how ordinary people lived under foreign rule?'
  ]
};

export const LENS_Q = [
  [ // Historian
    'What was happening politically and socially when this was written? How might that shape what is said and what is left out?',
    'What do we actually know about the author, and what do we only assume?',
    'What does archaeology, or a parallel text from the ancient world, add to this passage?',
    'Would an early manuscript or translation read differently here? Does it matter?',
    'What would a contemporary eyewitness not have cared about that you care about?'
  ],
  [ // Literary
    'Read it aloud. Where does the rhythm change, and what happens there?',
    'Which word or image repeats? What happens each time it comes back?',
    'Where does the passage begin and end, and why there? What changes if you start one verse earlier or later?',
    'What is left unsaid? What gaps is the reader invited to fill?',
    'If this were a scene in a novel, who would be the point-of-view character, and what would they know?'
  ],
  [ // Theologian
    'What does this passage claim about God that you could state in one sentence? Would you defend it?',
    'What does it claim about human nature? What would follow if that were true?',
    'Which doctrine is this passage often used to support? Does it support it by itself?',
    'Where does this passage stretch or complicate a tidy doctrine?',
    'What does this text say or imply about suffering, justice or mercy?'
  ],
  [ // Ethicist
    'What action does this passage commend or condemn? Would you?',
    'Who benefits from this passage being read one way rather than another?',
    'What would it look like to take this passage seriously at work or at home?',
    'Is anyone harmed by this passage’s logic? How should that figure in how we read it?',
    'Where do conscience and text pull apart here, and which should give way?'
  ],
  [ // Sceptic
    'What is the strongest objection a thoughtful sceptic would raise here? Can it be answered without special pleading?',
    'Which claim in this passage could in principle be checked? Which could not?',
    'Does the passage argue, assert or narrate? Does that change how much weight it should carry?',
    'If you found a similar claim in a tradition you do not follow, how would you treat it?',
    'What would you have to assume in order to accept this passage? Are those assumptions reasonable?'
  ],
  [ // Contemplative
    'Read the passage three times. What stays with you after the third?',
    'Which single phrase would you carry with you today?',
    'What is this passage not trying to explain? What does it simply set before you?',
    'Where do you feel resistance as you read? Stay with it for a minute and say what it is.',
    'What would it be like to read this with no goal of getting anything out of it?'
  ]
];

export const HARD_Q = [
  'Which argument against your own view of this passage have you avoided taking seriously?',
  'What would you have to give up if you accepted the opposite reading?',
  'If you are wrong about this passage, who pays the price?',
  'Name the reading you find most offensive. What is the best case for it?',
  'Where are you reading this only to confirm what you already think?',
  'What would a friend who disagrees with you about everything say about your reading?',
  'Is your reading of this passage one you chose, or one you were handed?',
  'What would count as evidence against your reading? Have you looked for it?',
  'State your view the way your opponent would state it. Would they sign it?',
  'What is the most uncomfortable implication of your reading, and why are you not worried about it?',
  'Which verse in this passage do you read fastest? Slow down there.',
  'What do you want this passage to say? Does it?'
];

export const PRACTICE = [
  'Copy out the passage by hand, slowly. Underline one word you would otherwise have skipped.',
  'Summarise the passage in one sentence. Then summarise it in one sentence for someone who disagrees with it.',
  'Read it aloud once, and notice where your voice changes.',
  'Follow one of the cross-references below, then write one line on what it adds or changes.',
  'Write down one question about this passage that you are afraid to ask.',
  'Tell someone about this passage today in two sentences, and notice what you leave out.',
  'Sit in silence for two minutes after reading. Write the first thing that comes.',
  'Find the strongest verse and the weakest verse, by your own lights, and explain the difference.',
  'Rewrite the passage’s main claim as a headline. Would you trust the headline?',
  'Pair this passage with a poem, song or news story from this week. What do they say to each other?',
  'Read the passage in a second translation (use the translation buttons in the Reader) and note the first difference.',
  'List what you know for certain about this passage, what you believe, and what you are only guessing.',
  'Write a margin note in the Reader for the verse that bothers you most.',
  'Read the passage as though hearing it for the first time. What surprises you?',
  'Do one small thing today that the passage, read plainly, would ask of you. Or write why you will not.',
  'Ask a friend what they think this passage means, and listen without correcting them.',
  'Write the passage’s opening line from the point of view of someone it affects.',
  'Choose one phrase to carry through the day, and check tonight whether it held.'
];

export const STANCE = [
  'This passage means today what it meant to its first readers.',
  'This passage is best read as history.',
  'This passage carries truth as story or poetry without needing to be literal.',
  'This passage is morally instructive for people today.',
  'The author of this passage is a reliable guide to what happened.',
  'I could explain this passage fairly to someone who rejects it.',
  'This passage has been misused more often than it has been used well.',
  'My own tradition reads this passage correctly.',
  'A reader with no faith could take this passage seriously.',
  'This passage is harder than it first appears.',
  'This passage reveals something true about human beings.',
  'If God exists, this passage reveals something true about God.',
  'Everyone should read this passage at least once.',
  'I understand this passage better than I did when I started.'
];

export const PROV = [
  'Who is speaking here, and who is listening?',
  'Read this verse as the first line of a story. What comes next?',
  'What does this verse assume that it does not say?',
  'Which word would you challenge a translator on?',
  'Who benefits if this verse is true?',
  'What would change if this verse said the opposite?',
  'Read it as a sceptic, then as a believer. What differs?',
  'What question is this verse answering?',
  'Where else in Scripture have you heard something like this? Does it agree?',
  'What would you ask the author about this verse?',
  'How might this verse be misused? How might it be used well?',
  'What does this verse ask of you, if anything?',
  'What is the smallest change in wording that would change the meaning?',
  'What are the verses before and after doing here?'
];

// Voices for the Respond panel. {p} is replaced by the passage or topic label.
export const VOICES = [
  ['sk', 'The Sceptic', 'Respond to {p} as a thoughtful sceptic. Take it seriously enough to find where it is weakest.'],
  ['bl', 'The Believer', 'Respond to {p} as a devout believer who has read the critics. What do you hold on to, and why?'],
  ['hi', 'The Historian', 'Respond as a historian who cares only what can be shown. What can be said about {p}, and what must be left open?'],
  ['pr', 'The Pastor or Priest', 'Respond as a pastor who must preach on {p} to a grieving congregation on Sunday. What do you say, and what do you leave out?'],
  ['ph', 'The Philosopher', 'Respond as a philosopher: reconstruct the argument in {p} and test its premises.'],
  ['ot', 'Another Tradition', 'Respond as a reader from a different tradition, whether Jewish, Muslim, Buddhist or secular. What do you recognise in {p}, and what seems foreign?'],
  ['ch', 'The Child', 'Respond as a child who asks the plain question about {p} that everyone else is too polite to ask.'],
  ['au', 'The Author', 'Respond as the author or editor of {p}. What were you trying to do, and what did you not foresee?'],
  ['su', 'The Sufferer', 'Respond as someone in the middle of loss or injustice. What does {p} offer you, and what does it fail to?']
];

export const STEEL = [
  ['view', 'My view, in one sentence', 'Where I currently stand on this.'],
  ['obj', 'The strongest case against it', 'Argue it as if you were its best advocate. No strawmen.'],
  ['chg', 'What would change my mind', 'Be specific: evidence, an argument, an experience.'],
  ['say', 'What I would say to someone who disagrees', 'In a way they might actually hear.']
];

export const REACTIONS = [
  ['pers', 'Persuaded'],
  ['unset', 'Unsettled'],
  ['disg', 'Disagree'],
  ['dig', 'Dig deeper']
];
