// Debate: Who was Jesus, and did he claim to be God?
export default {
  id: 'jesus',
  q: `Who was Jesus: a prophet, a messiah, or God incarnate?`,
  intro: `The doctrine that Jesus is fully God and fully human was defined at Nicaea (325) and Chalcedon (451). The question for readers of the New Testament is how much of it the earliest sources already contain, and how the same sources look to Jews, Muslims and historians.`,
  settled: [
    `Jesus was a Jewish teacher from Galilee, baptized by John, who proclaimed the kingdom of God and was crucified by Pilate.`,
    `Within a generation, Christians were praying to and worshipping Jesus, as the Pauline letters show (1 Corinthians 16:22; Philippians 2:6–11).`,
    `The word “Trinity” and the formulas of Nicaea and Chalcedon are not in the New Testament and were worked out in the fourth and fifth centuries.`
  ],
  open: [
    `Whether Jesus himself claimed divine status, and in what sense (the Synoptics rarely say so; John says so repeatedly).`,
    `Whether high Christology arose early within Judaism or later under Greek influence.`,
    `Whether “Son of God” and “Lord” meant “divine” in the first century.`
  ],
  honest: `Honest note: the Gospel of John is the only Gospel where Jesus says plainly “I and the Father are one” and “before Abraham was, I am,” and it is also the latest and most theological. Anyone claiming the Synoptics and John say exactly the same thing is overstating, and anyone claiming the divine claim is simply a late invention must also explain Paul’s early hymns.`,
  press: {
    ath: `Ask what best explains devotion to a crucified man as “Lord” inside a strict monotheism, within twenty years. Whatever your answer, does it fit Philippians 2:6–11?`,
    que: `If a creed was enforced on you, separate the question “did the doctrine develop?” from “is it false?” Position B and C answer differently.`,
    spi: `Many traditions treat holy persons as manifestations of the divine. Is the New Testament claim of that kind, or does it say something unusual? Compare John 1 with Position D.`,
    cat: `Position C says the doctrine developed over centuries. Test your tradition’s account of development against it. What distinguishes Nicaea from a later addition?`,
    ort: `You confess the Chalcedonian definition (or the Oriental alternative). Test the argument that the Synoptics do not clearly teach it by reading Mark 2:5–7 and John 10:30–33.`,
    prot: `You affirm Nicene Christology as biblical. Read Position C’s evidence on “Son of God” and “Lord” before you answer, and decide which texts you rely on.`,
    lut: `Compare how Luther reads John 1 and Philippians 2 against the claim in Position C that these are later layers.`,
    pen: `Many Pentecostal churches (including “Oneness” Pentecostals) differ on the Trinity. Where do you stand, and which texts decide it for you?`,
    oth: `Your tradition holds that God is one without division. Position A says the Trinity is consistent with that; Position D disagrees. What do you find strongest in each?`,
    any: `Decide what you would need to see in an ancient text to conclude that its author thought a human was God.`
  },
  positions: [
    {
      id: 'A', n: `Nicene and Chalcedonian doctrine`, short: `Fully God and fully human`, who: `Athanasius, the councils of Nicaea and Chalcedon; Catholic, Orthodox, Lutheran, Reformed and most Protestant churches`,
      nearTo: ['cat', 'ort', 'prot', 'lut'], farFrom: ['oth', 'ath'],
      claim: `Jesus is the eternal Son, one in being with the Father, who became human. He is one person in two natures, truly God and truly human, and this is what the New Testament teaches in seed form.`,
      pass: [
        [`John 1:1–18`, `“The Word was God… and the Word became flesh.”`],
        [`Philippians 2:5–11`, `Christ Jesus, “in the form of God,” emptied himself, and every knee will bow to him.`],
        [`Colossians 1:15–20`, `All things were created through and for him, and in him all the fullness of God was pleased to dwell.`],
        [`John 20:28`, `Thomas answers, “My Lord and my God!”`]
      ],
      obj: [
        `Jesus says “the Father is greater than I” (John 14:28) and does not know the day or hour (Mark 13:32), which look subordinationist.`,
        `The Greek terms of Nicaea (homoousios, hypostasis) are not in the Bible, and were debated for decades afterward.`,
        `The Synoptic Gospels rarely have Jesus claim divinity in so many words.`
      ],
      hist: [
        [`c. 50–60`, `Paul quotes early hymns (Philippians 2; Colossians 1) that place Jesus within the identity of God.`],
        [`c. 90–110`, `John and Ignatius call him “God.”`],
        [`325`, `Nicaea, against Arius, defines the Son as “of one substance” with the Father.`],
        [`451`, `Chalcedon defines two natures in one person; the Oriental Orthodox churches reject the formula and hold a different one.`]
      ],
      assume: [
        `The New Testament must be read as one canon whose parts illuminate each other.`,
        `Later councils clarify, and do not add to, the apostolic faith.`,
        `Divine incarnation is possible.`
      ],
      explains: [`Why early Christians worshipped Jesus and prayed to him without leaving monotheism.`, `The unity of Johannine and Pauline claims with the Synoptic “authority” of Jesus.`],
      struggles: [`Passages that seem to subordinate the Son to the Father.`, `The fact that it took three centuries of argument to formulate.`],
      args: [
        {
          id: 'a1', claim: `The New Testament applies to Jesus the titles, actions and worship that belong to God alone in Jewish monotheism, so it already teaches his divinity.`,
          ass: [[`Those titles and actions were reserved for God.`, `Jewish writings give exalted roles to angels, Wisdom, and patriarchs without making them gods.`], [`Worship is a clear sign of divine status.`, `Greek “proskuneo” can mean homage, not only worship.`]],
          fal: { n: `Equivocation`, why: `“Divine” moves between “shares in God’s functions” and “is fully God in the later sense.”`, def: `Defenders say Bauckham’s “divine identity” avoids this by tying Jesus to what makes God unique (creator, ruler of all).` },
          ctr: [[`Philo calls the Logos a “second god” and Jewish texts give the angel Michael a leading role, so exalted figures were conceivable without incarnation.`, `Defenders reply that none of these figures were worshipped in the cult or prayed to by name.`]],
          resp: { C: `Critical scholars reply that “Lord” and “Son of God” were titles for kings, and that the process of exaltation was gradual.`, D: `Jews and Muslims say that sharing the roles of God is not being God, and that making a creature a divine partner is the sin of shirk.` }
        },
        {
          id: 'a2', claim: `The Johannine “I am” sayings are a faithful interpretation of who Jesus was, even if they are not verbatim.`,
          ass: [[`John preserves reliable memory, or at least reliably interprets it.`, `Most critical scholars treat John’s speeches as the author’s composition.`], [`An interpretation by a believer is faithful.`, `Interpretation can be creative and not only faithful.`]],
          fal: { n: `Begging the question`, why: `It assumes the interpretation is right in order to show the sayings are faithful.`, def: `Defenders say interpretation is always involved in biography and that “faithful” is argued, not assumed.` },
          ctr: [[`Jesus in the Synoptics speaks in short sayings and parables, while John’s Jesus gives long discourses about himself.`, `Defenders say the Synoptics are selective and John has a theological purpose.`]],
          resp: { C: `Historians say the difference between the Synoptics and John is too great to treat both as historically equal.`, E: `Skeptics say that John shows the end of a development, not the beginning.` }
        }
      ]
    },
    {
      id: 'B', n: `Early high Christology (historical case)`, short: `Devotion to Jesus began very early`, who: `Larry Hurtado, Richard Bauckham, N. T. Wright, Chris Tilling`,
      nearTo: ['prot', 'cat', 'ort', 'pen'], farFrom: ['ath'],
      claim: `Within a few years of his death, Jewish followers of Jesus were worshipping him, praying to him and applying to him the language of God, which is a surprising development inside Jewish monotheism. A very high view of Jesus is early, not a late Greek import.`,
      pass: [
        [`1 Corinthians 8:6`, `Paul reworks the Shema, the Jewish confession of one God, so that “one Lord, Jesus Christ” stands within it.`],
        [`1 Corinthians 16:22`, `The Aramaic prayer “Maranatha” (“Our Lord, come!”) points to very early devotion.`],
        [`Romans 10:9–13`, `“Jesus is Lord” applies to Jesus a text about calling on the name of the LORD (Joel 2:32).`],
        [`Philippians 2:9–11`, `The hymn reworks Isaiah 45:23, which says every knee shall bow to YHWH.`]
      ],
      obj: [
        `Early devotion shows how people felt, not what was true about Jesus.`,
        `Exalted agents (angels, Wisdom, Enoch) show that Jewish monotheism had room for a second figure, so the step to devotion was easier than the argument says.`,
        `The argument works best for Paul. Whether the Synoptic Jesus claims the same is a separate question.`
      ],
      hist: [
        [`1988`, `Hurtado’s *One God, One Lord* argues for a “mutation” in Jewish monotheism.`],
        [`1998`, `Bauckham’s “divine identity” account of early Christology.`],
        [`2003`, `Hurtado’s *Lord Jesus Christ* surveys the evidence for Christ devotion.`],
        [`2010s`, `Debate with Ehrman, whose *How Jesus Became God* (2014) argues for an exaltation Christology.`]
      ],
      assume: [
        `Cultic practice reveals belief.`,
        `A new form of devotion needs a cause in Jesus himself and in his followers’ experience.`,
        `Jewish monotheism was strict enough that worship of a human would need strong reasons.`
      ],
      explains: [`Why the Christ hymns and creedal formulas appear so soon after the crucifixion.`, `Why early Christians were persecuted for refusing emperor worship and for their devotion to Jesus.`],
      struggles: [`The tension with subordinationist texts and with Jewish groups who made angels and ideal men almost divine.`, `Showing that early devotion tracks historical claims by Jesus, not only the community’s experience.`],
      args: [
        {
          id: 'b1', claim: `The earliest Christians, all Jews, worshipped Jesus within a strict monotheism, so the belief cannot be explained as the gradual absorption of pagan ideas.`,
          ass: [[`Early Christian devotion was exclusive and cultic.`, `Prayer and hymns to Jesus are well attested, but “worship” in the sense of sacrifice is not.`], [`Pagan influence would be visible in the earliest evidence.`, `Hellenistic Judaism shared much of the thought-world of its surroundings.`]],
          fal: { n: `Argument from silence`, why: `The absence of obvious pagan terms in Paul is taken as evidence they played no role.`, def: `Defenders point to the Jewish texts Paul cites (Isaiah, Joel, the Psalms).` },
          ctr: [[`Philo, Wisdom of Solomon and Enoch’s Son of Man show that Judaism already had ways to speak of a divine mediator.`, `Defenders say these figures were not objects of devotion, so the cult is the new thing.`]],
          resp: { C: `Critical scholars say the data are compatible with exaltation: a man raised to divine status by God, as in Philippians 2:9.`, D: `Jewish scholars say that devotion to a human falls outside the monotheism they know, and the earliest Jewish Christians were seen as a deviation.` }
        }
      ]
    },
    {
      id: 'C', n: `Exaltation and development`, short: `Jesus became divine in Christian thought, step by step`, who: `James Dunn (in part), Bart Ehrman, Maurice Casey, Adela Yarbro Collins`,
      nearTo: ['que'], farFrom: ['prot', 'pen'],
      claim: `Christology developed in stages: from Jesus as a prophet and messiah, to a human exalted to God’s right hand at the resurrection, to a pre-existent being sent from heaven, to the incarnate God of John and the creeds. Each stage can be traced in the New Testament itself.`,
      pass: [
        [`Romans 1:3–4`, `Jesus “was declared to be the Son of God in power… by his resurrection,” an exaltation formula.`],
        [`Acts 2:36`, `“God has made him both Lord and Christ,” as though he became so at his exaltation.`],
        [`Mark 1:9–11`, `A voice at the baptism says “You are my beloved Son,” which some early readers took as adoption.`],
        [`John 1:1–14`, `The latest Gospel places him at the beginning of creation.`]
      ],
      obj: [
        `The “hymns” in Philippians 2 and Colossians 1 appear to place pre-existence in the 50s, earlier than this scheme says.`,
        `A tidy line of development may be too neat: pre-existence and exaltation language appear together in the same letters.`,
        `The model depends on dating the sources and judging which sayings are early, which is itself contested.`
      ],
      hist: [
        [`1980`, `Dunn’s *Christology in the Making* argues that pre-existence is not clearly stated before John.`],
        [`2014`, `Ehrman’s *How Jesus Became God* argues that the earliest view was exaltation.`],
        [`2nd c.`, `Adoptionist and Docetic groups hold alternatives to the later orthodox view, showing the debate was open.`],
        [`4th c.`, `Arius and Athanasius clash, and Nicaea resolves the question for the majority.`]
      ],
      assume: [
        `Beliefs develop in time, and later layers can be identified.`,
        `Religious language can be read in more than one sense.`,
        `Titles had ordinary meanings in the first century (Messiah, Son of God, Lord).`
      ],
      explains: [`Why different New Testament books give different pictures of Jesus.`, `Why Christian groups argued about Christology for centuries.`],
      struggles: [`Why the “high” formulas appear as early as Paul’s letters.`, `How a development could be so unanimous in a community with a strict monotheism.`],
      args: [
        {
          id: 'c1', claim: `“Son of God” and “Lord” had ordinary meanings (king, messiah, God’s agent) in the first century, so they do not prove a claim to divinity.`,
          ass: [[`The titles were not already freighted with divine meaning when applied to Jesus.`, `Kyrios was also used for YHWH in the Greek Bible, so “Lord” could carry more.`], [`Titles can be read without the Gospel context.`, `John 5:18 and 10:33 say the opponents understood the claim as equality with God.`]],
          fal: { n: `Genetic fallacy`, why: `The origin of a title is treated as fixing what it later means in the community that uses it.`, def: `Defenders say they distinguish the title’s ordinary sense from its later development, and do not claim the second is mistaken.` },
          ctr: [[`Paul applies to Jesus Old Testament texts about YHWH (Romans 10:13).`, `Defenders say this is exaltation: God gives his name to Jesus (Philippians 2:9).`]],
          resp: { A: `Nicene readers say the texts do more than apply a title: they give Jesus the role of creator and judge.`, B: `Hurtado answers that the cultic pattern around Jesus (prayer, hymn, baptism, meal) goes beyond what a title for an agent would account for.` }
        },
        {
          id: 'c2', claim: `The conflicts of the third and fourth centuries (Arius, Sabellius, Paul of Samosata) show that the doctrine of the Trinity was not already agreed.`,
          ass: [[`Disagreement shows the doctrine was not given in the apostolic period.`, `Disagreement can also follow error; Gnostics also disagreed about the apostles.`], [`Heresies were genuine alternatives with biblical support.`, `Orthodox writers said they were distortions of what the church already believed.`]],
          fal: { n: `Non sequitur`, why: `That a debate happened does not show the answer was not contained in earlier sources.`, def: `Defenders say they are not claiming a proof but showing that the question was open.` },
          ctr: [[`Arius appealed to Scripture (Proverbs 8:22, John 14:28), and Nicaea’s answer used a non-biblical term.`, `Nicene readers say the term protected the biblical sense against an evasive reading.`]],
          resp: { A: `Orthodox and Catholic readers say development is clarification under pressure, and that the Church spoke only when forced.`, E: `Skeptics say the process shows doctrine settled by power and politics (Constantine) as much as by argument.` }
        }
      ]
    },
    {
      id: 'D', n: `Jewish and Islamic accounts`, short: `A human messiah or prophet, not God`, who: `Jewish thinkers (Maimonides, Geza Vermes, Amy-Jill Levine); Islamic tradition (Quran 4:171; 5:72–75)`,
      nearTo: ['oth'], farFrom: ['prot', 'cat', 'ort'],
      claim: `Jesus was a Jewish teacher (and for Muslims a prophet and the Messiah), whom later Christians wrongly made divine. Both traditions hold that God is absolutely one, so incarnation and Trinity compromise monotheism.`,
      pass: [
        [`Deuteronomy 6:4`, `The Shema: “The LORD our God, the LORD is one.”`],
        [`Mark 10:17–18`, `Jesus says, “Why do you call me good? No one is good except God alone.”`],
        [`John 17:3`, `Jesus calls the Father “the only true God.”`],
        [`Numbers 23:19`, `“God is not a man, that he should lie.”`]
      ],
      obj: [
        `The New Testament’s own texts (John 20:28; Philippians 2) show the claim arose within a Jewish setting and cannot be treated as only a later Greek import.`,
        `The Quranic portrait draws on texts later than the Gospels and is not an independent historical source for Jesus.`,
        `Jewish critique of the Trinity sometimes assumes Christians mean three gods, which Christian theology denies.`
      ],
      hist: [
        [`2nd c.`, `Jewish writers argue against Christian claims; Rabbinic literature is cautious on the subject.`],
        [`7th c.`, `The Quran calls Jesus “the Messiah, son of Mary, a messenger of God” and rejects “three” (4:171).`],
        [`12th c.`, `Maimonides lists Christianity as a form of idolatry from a strict Jewish view, while recognizing a role for it in history.`],
        [`20th c.`, `Jewish scholars reclaim Jesus as a Jew (Vermes, Levine).`]
      ],
      assume: [
        `Strict divine unity is a core of revelation.`,
        `God does not become human.`,
        `Scripture in one’s own tradition is the standard of judgment.`
      ],
      explains: [`Passages in which Jesus distinguishes himself from the Father.`, `The Jewishness of Jesus and his first followers.`],
      struggles: [`The rapid appearance of Christ devotion among Jews in the first generation.`, `Why Jesus’ followers believed they must worship him.`],
      args: [
        {
          id: 'd1', claim: `Incarnation and Trinity contradict the Shema, so they cannot be what the earliest followers of Jesus meant.`,
          ass: [[`The Shema excludes any complexity within God.`, `Jewish texts also speak of God’s Word, Wisdom and Spirit as distinct yet divine.`], [`The earliest followers were bound by the Shema in the same sense.`, `Paul reworks the Shema (1 Corinthians 8:6), so he evidently thought he was keeping it.`]],
          fal: { n: `Straw man`, why: `It attacks a version of the Trinity (three gods) that orthodox theologians reject.`, def: `Defenders say Christian formulas may be coherent but are not what the Shema’s first hearers would have understood.` },
          ctr: [[`Kabbalah and Philo allow a differentiated divine unity, so unity does not exclude distinctions.`, `Jewish and Islamic writers answer that those are not persons, and the difference matters.`]],
          resp: { A: `Trinitarians say the Shema is kept: one God in three persons, and Paul’s reworking of it is the earliest evidence of how the first Christians read it.`, B: `Historical scholars say that Jewish Christians evidently did not feel they were abandoning the Shema, which is a historical fact about their view.` }
        }
      ]
    },
    {
      id: 'E', n: `Skeptical historical view`, short: `A prophet whom legend turned into a god`, who: `Rudolf Bultmann (in part), Bart Ehrman, Maurice Casey, Hyam Maccoby; a minority, mythicists such as Richard Carrier`,
      nearTo: ['ath'], farFrom: ['prot', 'cat', 'ort', 'lut', 'pen', 'oth'],
      claim: `Jesus was an apocalyptic Jewish prophet who did not think of himself as God. After his death, devotion and Greek-influenced reflection turned him into a divine figure, as happened with other heroes and rulers in the ancient world. (A small minority of skeptics go further and deny he existed; most historians reject that.)`,
      pass: [
        [`Mark 13:32`, `Jesus says no one knows the day or hour, “not even the Son, but only the Father.”`],
        [`Mark 6:5–6`, `He could do no mighty work in Nazareth and “marveled” at their unbelief.`],
        [`Matthew 11:2–6`, `John the Baptist, in prison, asks whether Jesus is “the one who is to come.”`],
        [`Luke 4:16–30`, `Jesus applies a prophecy of Isaiah to himself and is rejected in Nazareth.`]
      ],
      obj: [
        `Mythicism has little support among historians, and the case for a historical Jesus rests on early sources such as Paul and Josephus.`,
        `The comparison to Greco-Roman divinization patterns fits poorly with a Jewish context hostile to deifying humans.`,
        `The theory has to explain why Jews, in particular, would turn a crucified man into a divine figure.`
      ],
      hist: [
        [`1778`, `Reimarus separates the historical Jesus from the apostles’ invention.`],
        [`1906`, `Albert Schweitzer’s *Quest of the Historical Jesus* shows how each age has found its own Jesus.`],
        [`20th c.`, `Bultmann’s form criticism and the Jesus Seminar sort sayings by authenticity.`],
        [`21st c.`, `Ehrman and others argue Jesus is a historical figure and that divinity came later.`]
      ],
      assume: [
        `Naturalism: no incarnation took place.`,
        `Later theology can be traced to cultural influences.`,
        `The earliest layer of the tradition is the one closest to the real Jesus.`
      ],
      explains: [`The sayings in which Jesus distinguishes himself from the Father.`, `The comparable cases of ancient figures who were exalted after death (Apollonius, Hercules, Roman emperors).`],
      struggles: [`The speed of the belief and the rank it reached in a Jewish setting.`, `The fact that early Christians chose to worship him at the cost of persecution.`],
      args: [
        {
          id: 'e1', claim: `Jesus’ sayings about not knowing the hour and about the Father being greater show he did not think he was God.`,
          ass: [[`Those sayings reflect Jesus’ real view.`, `They could reflect his human nature, which Nicene doctrine affirms.`], [`A divine claim would have to be unqualified.`, `Chalcedon’s doctrine says exactly that a divine person can speak as a human.`]],
          fal: { n: `Begging the question`, why: `It assumes that humility and divinity are incompatible, which is what Christian doctrine denies.`, def: `Defenders say the doctrine is not the test: the question is what Jesus meant, not what later councils taught.` },
          ctr: [[`Mark 2:5–7 has Jesus forgive sins and the scribes say, “Who can forgive sins but God alone?”`, `Skeptics say this is an editorial scene; critics answer it shows a claim to divine prerogative.`]],
          resp: { A: `Nicene readers say the texts fit the doctrine of the two natures and that the Synoptics also hold passages with claims to divine authority.`, C: `Critical scholars agree many sayings are not claims to divinity and say high Christology developed later, at different rates.` }
        },
        {
          id: 'e2', claim: `Divinization of heroes and rulers was common in the Greco-Roman world, so the deification of Jesus is no surprise.`,
          ass: [[`The Jewish followers of Jesus shared this culture’s habit.`, `Jewish writers opposed deifying humans (Daniel 3; Philo on Caligula).`], [`The parallels are close.`, `The Gospels differ from stories of heroes in important ways, such as the shameful death.`]],
          fal: { n: `False analogy`, why: `Resemblances are used to claim a common cause, though the differences may matter more.`, def: `Defenders say they only claim a general cultural environment, not direct borrowing.` },
          ctr: [[`Crucifixion was shameful and would be an unlikely path to divinization in Roman culture.`, `Skeptics say the cross was reframed as a victory.`]],
          resp: { A: `Christians note that Jewish believers, who held monotheism most firmly, were the first to worship Jesus.`, B: `Hurtado argues that devotion to Jesus does not follow the pattern of Greco-Roman deification.` }
        }
      ]
    }
  ]
};
