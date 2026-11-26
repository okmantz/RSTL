// Debate: What is the Bible, and what authority does it have?
export default {
  id: 'scripture',
  q: `What kind of authority does the Bible have?`,
  intro: `Christians agree that Scripture matters but disagree about what it is: a text without error, a text that is authoritative within a church, a record of human witness to God, or a library of ancient writings. The answer decides how everything else in the Bible is read.`,
  settled: [
    `The Bible is a library of many books written over roughly a thousand years in Hebrew, Aramaic and Greek, and no original manuscript survives.`,
    `Surviving manuscripts differ, and the differences are tracked in textual criticism: most are trivial; a few (Mark 16:9–20, John 7:53–8:11) affect larger passages.`,
    `Different Christian communities have different canons: Protestants 66 books, Catholics 73, Orthodox churches more, and the Ethiopian Orthodox Church more again.`
  ],
  open: [
    `Whether a book can be fully inspired and still contain errors, or whether error would defeat inspiration.`,
    `Whether the canon is a closed apostolic list or a church’s judgment.`,
    `Who has authority to interpret: the individual, the church, or the scholar.`
  ],
  honest: `Honest note: every position here leans on something outside the Bible to decide what the Bible is: Protestants on Scripture’s self-testimony, Catholics and Orthodox on the Church, critics on historical method. Nobody gets to start from nowhere. The useful question is which foundation you find most defensible, and whether you apply the same standard to every position.`,
  press: {
    ath: `Ask how you decide which parts of an ancient text to take seriously, and whether you apply that standard to non-biblical texts too.`,
    que: `If the way you were taught Scripture failed you, test whether you reject the idea of authority or only one account of it (Position A).`,
    spi: `If you read many scriptures, what makes any one authoritative for you? Is it the same standard you apply to others?`,
    cat: `Read Position A at its strongest. If Scripture and the Church speak with one voice, why did the Church’s canon take until the fourth century, and until Trent for the deuterocanon to be defined?`,
    ort: `Position C says the Church precedes the canon. How do you tell a genuine development from a corruption without a text to check it against?`,
    prot: `You say Scripture alone. Who decided the canon? Position B and C ask you to explain what authority made that decision, and Position D asks you to explain the variants.`,
    lut: `Compare the word “alone” in *sola scriptura* with your tradition’s use of creeds and confessions as authoritative interpretations. Where is the line?`,
    pen: `You treat the Spirit’s present voice as real. How do you test prophecy and experience against the text? Positions A and B give different answers.`,
    oth: `In your tradition, the written and oral law are both authoritative. What does that say about how Position A treats the written text alone?`,
    any: `Pick one passage you find difficult and ask what each position would do with it.`
  },
  positions: [
    {
      id: 'A', n: `Inerrancy and sola scriptura (evangelical)`, short: `Scripture is God’s word, without error`, who: `Warfield, J. I. Packer, the Chicago Statement (1978); Baptist, Reformed and many evangelical churches`,
      nearTo: ['prot', 'pen', 'lut'], farFrom: ['cat', 'ort'],
      claim: `The Bible is the inspired word of God, true and without error in all it affirms, and the final authority for faith and life, interpreted by Scripture itself.`,
      pass: [
        [`2 Timothy 3:16–17`, `“All Scripture is breathed out by God and profitable.”`],
        [`2 Peter 1:20–21`, `Prophecy came as men “spoke from God as they were carried along by the Holy Spirit.”`],
        [`Matthew 5:17–18`, `Jesus says not an iota will pass from the Law.`],
        [`John 10:35`, `“Scripture cannot be broken.”`]
      ],
      obj: [
        `The New Testament quotes the Old loosely, and the Gospels differ on details (the denial of Peter, the cleansing of the temple).`,
        `The word “inerrancy” is not biblical, and the doctrine was formalized in response to nineteenth-century critics.`,
        `The canon is not in the Bible: the claim that Scripture alone is the authority depends on a list the Church drew up.`
      ],
      hist: [
        [`16th c.`, `Luther and Calvin make Scripture the final norm over councils and popes.`],
        [`19th c.`, `Princeton theologians Hodge and Warfield define inerrancy against German criticism.`],
        [`1978`, `The Chicago Statement on Biblical Inerrancy spells out the doctrine.`],
        [`21st c.`, `Debates among evangelicals continue (Enns, Peter Enns’ *Inspiration and Incarnation* (2005); Vanhoozer).`]
      ],
      assume: [
        `God can and does communicate in propositions, and inspiration extends to the text, not only to authors.`,
        `Truth is truth, so a text from a God who cannot lie contains no falsehood.`,
        `The Bible is clear enough on essentials to be its own interpreter.`
      ],
      explains: [`Why the text itself claims such authority, and why Jesus treats Scripture as binding.`, `Why the Reformers could challenge church tradition with the text.`],
      struggles: [`The differences among Gospel accounts and between Kings and Chronicles.`, `The fact that the canon and the text were handed on by the Church and by copyists whose work contains variants.`],
      args: [
        {
          id: 'a1', claim: `Jesus and the apostles treat Scripture as God’s word, so a follower of Jesus should do the same, including its claim to be without error.`,
          ass: [[`Jesus’ attitude to Scripture is the same as the modern doctrine of inerrancy.`, `Jesus also sets his own authority above Moses (Matthew 5:21–48) and treats some laws as concessions (Mark 10:2–9).`], [`“Without error” follows from “God’s word.”`, `That is an inference about what a perfect source must be like, not a statement in the text.`]],
          fal: { n: `Appeal to authority`, why: `The authority of the Bible is argued from the Bible, which presupposes the very thing in question.`, def: `Defenders say every ultimate authority is self-attesting, and that this is only circular in the way any foundation is.` },
          ctr: [[`Mark 2:26 says Abiathar was high priest when David ate the bread, while 1 Samuel 21 says Ahimelech.`, `Defenders propose harmonizations (a different use of the name), and critics say the harmonizations strain.`]],
          resp: { B: `Catholic theology also affirms that Scripture teaches truth “without error” for the sake of salvation, but reads inspiration within the Church’s tradition, not against it.`, D: `Critics say the New Testament authors quote and adapt the Old Testament with freedom that sits poorly with a modern doctrine of inerrancy.` }
        },
        {
          id: 'a2', claim: `Scripture is clear enough in its main teachings that ordinary believers can understand it without a teaching authority.`,
          ass: [[`The clarity of Scripture is a property of the text, not of the interpreter.`, `If equally sincere readers reach opposite conclusions, the “clarity” is in doubt.`], [`The Spirit guides each reader.`, `Many guided readers disagree on baptism, predestination and the Lord’s Supper.`]],
          fal: { n: `Hasty generalization`, why: `Agreement on a few basics is taken to show agreement on everything that matters.`, def: `Defenders say they affirm clarity only on essentials, and that disagreements about secondary matters are expected.` },
          ctr: [[`There are over thirty thousand Protestant denominations (a disputed figure).`, `Defenders say the figure is inflated and that most agree on the creeds.`]],
          resp: { B: `Catholic and Orthodox readers say that disagreement among Protestants shows the need for an authoritative interpreter, a Church.`, E: `Critics note that no text interprets itself and that all readers bring tradition, even those who disown it.` }
        }
      ]
    },
    {
      id: 'B', n: `Scripture and Tradition together (Catholic)`, short: `Scripture, Tradition and Magisterium`, who: `Council of Trent, Vatican II (Dei Verbum), Aquinas, Newman; the Catholic Church`,
      nearTo: ['cat'], farFrom: ['prot', 'pen'],
      claim: `Scripture and sacred Tradition flow from the same source and together form one deposit of faith, which the Church’s teaching office (Magisterium) interprets authentically. Scripture is inspired and teaches truth for the sake of salvation.`,
      pass: [
        [`2 Thessalonians 2:15`, `“Stand firm and hold to the traditions you were taught, whether by our spoken word or by our letter.”`],
        [`Acts 15:28`, `The council says “it seemed good to the Holy Spirit and to us.”`],
        [`1 Timothy 3:15`, `The church is “the pillar and foundation of the truth.”`],
        [`Matthew 16:18–19`, `Jesus gives Peter the keys and the power to bind and loose.`]
      ],
      obj: [
        `Jesus rebukes traditions that nullify the word of God (Mark 7:8–13), which could suggest a standard above tradition.`,
        `Doctrines such as the Immaculate Conception (1854) and papal infallibility (1870) were defined late and are hard to find in Scripture.`,
        `The claim that the Church can authoritatively interpret risks circularity: the Church’s authority is shown from Scripture that the Church interprets.`
      ],
      hist: [
        [`2nd c.`, `Irenaeus appeals to the churches’ apostolic succession as the guarantee of true teaching against Gnostic readings.`],
        [`382–405`, `Local councils and Jerome’s Vulgate fix the canon in the West.`],
        [`1546`, `Trent defines the canon and says the truth is contained in written books and unwritten traditions.`],
        [`1965`, `Dei Verbum says Scripture and Tradition are “bound closely together” and that the Magisterium serves the word of God.`]
      ],
      assume: [
        `Christ founded a church with a continuing teaching authority.`,
        `The Spirit preserves the Church from error in defining faith.`,
        `Revelation was given in a community, and not only a book.`
      ],
      explains: [`How the canon itself was decided, and why the early church needed a rule of faith.`, `Why disagreements can be settled without every reader reinventing the faith.`],
      struggles: [`The tension between Mark 7 and the defense of traditions, and doctrines whose roots are hard to trace.`, `The inconsistency of past church positions, which critics say challenge the claim of unchanging teaching.`],
      args: [
        {
          id: 'b1', claim: `The canon of Scripture was decided by the Church, so Scripture alone cannot be the final authority apart from the Church.`,
          ass: [[`Recognizing a canon is the same as granting authority to it.`, `Protestants argue the Church recognized books that already had apostolic authority.`], [`The Church that decided is the same as the present Catholic Church.`, `Orthodox and Protestants claim continuity with the early church as well.`]],
          fal: { n: `Genetic fallacy`, why: `The authority of a text is judged by who selected it, as though selection decided its status.`, def: `Defenders say the point is not origin alone but that no independent list exists.` },
          ctr: [[`Athanasius’ Festal Letter (367) lists the New Testament books before any council made them binding for all.`, `Catholic readers note it is also a bishop acting as the Church; Protestants say it shows recognition, not creation.`]],
          resp: { A: `Evangelicals answer that the Church recognized, not conferred, the canon, as a child recognizes a mother’s voice.`, C: `Orthodox readers agree that the canon belongs to the Church but reject a single teaching office such as the papacy.` }
        },
        {
          id: 'b2', claim: `Doctrinal development is the continued unfolding of the apostolic faith, not an addition to it (Newman).`,
          ass: [[`There is a criterion that tells genuine development from corruption.`, `Newman’s seven notes can be applied by opponents too, and different traditions apply them differently.`], [`Later definitions were implicit earlier.`, `For some doctrines (Assumption of Mary), explicit evidence is late.`]],
          fal: { n: `Unfalsifiability`, why: `If any later teaching can be called a development, no teaching could count as a corruption.`, def: `Defenders point to the criteria: continuity of principles, assimilation, preservation of type.` },
          ctr: [[`The Church once condemned lending at interest and religious liberty, and later changed.`, `Defenders say moral applications develop while doctrines do not; critics say the line is unclear.`]],
          resp: { A: `Protestants say what was added later cannot bind consciences if it cannot be shown from Scripture.`, D: `Historians accept doctrinal development as a fact but ask whether it is guided, which history alone cannot show.` }
        }
      ]
    },
    {
      id: 'C', n: `Scripture within the life of the Church (Orthodox)`, short: `The Church’s Tradition includes the Bible`, who: `Florovsky, Schmemann, Ware; Eastern and Oriental Orthodox churches`,
      nearTo: ['ort'], farFrom: ['prot'],
      claim: `Scripture is the Church’s book, born in her liturgy and read in her life. Tradition is not a second source but the living Spirit in the whole Church, expressed in the Scriptures, councils, Fathers, liturgy and icons together.`,
      pass: [
        [`John 16:12–13`, `Jesus says the Spirit will guide the disciples into all the truth.`],
        [`Luke 24:25–27`, `The risen Christ interprets Scripture to his disciples as speaking about himself.`],
        [`Acts 8:30–35`, `Philip asks the Ethiopian, “Do you understand what you are reading?”`],
        [`2 Peter 1:20`, `“No prophecy of Scripture comes from someone’s own interpretation.”`]
      ],
      obj: [
        `It is hard to say who speaks for the Church when councils conflict, and which councils count (Ferrara-Florence, Chalcedon).`,
        `“The Church’s Tradition” can seem to become whatever the Church has held, without an outside check.`,
        `The Orthodox churches also disagree among themselves (calendar, jurisdiction, the Oriental/Eastern split).`
      ],
      hist: [
        [`2nd–4th c.`, `The canon emerges through liturgical use and episcopal letters, not a single decree.`],
        [`325–787`, `Seven ecumenical councils define the faith by appeal to Scripture and the Fathers.`],
        [`1054`, `The East–West split, with disputes over the papacy and the filioque.`],
        [`20th c.`, `The “neo-patristic synthesis” (Florovsky, Lossky) restates Tradition against both Latin scholasticism and Protestant scripturalism.`]
      ],
      assume: [
        `The Holy Spirit lives in the whole body of the Church and keeps it in the truth.`,
        `Interpretation is a communal, liturgical and ascetic task.`,
        `There is a consensus of the Fathers that guides reading.`
      ],
      explains: [`How the Bible actually functioned in the early church: read aloud in worship, not as a private book.`, `The lack of a defined canon list in the apostolic age.`],
      struggles: [`Specifying when the Church has spoken definitively.`, `Why the consensus of the Fathers is far from uniform on many passages.`],
      args: [
        {
          id: 'c1', claim: `The Bible cannot be understood outside the community that wrote, preserved and prayed it.`,
          ass: [[`The community that preserved the text is the best interpreter.`, `Communities also preserve errors; the Reformers argued that the church drifted.`], [`An unbroken community exists.`, `Historians point to changes within every tradition.`]],
          fal: { n: `Appeal to tradition`, why: `Continuity is treated as a guarantee of correct reading.`, def: `Defenders say they appeal to the Spirit’s guidance of the Church and not to age.` },
          ctr: [[`Origen’s allegorical reading was later condemned in parts.`, `Defenders say that shows the Church’s discernment at work.`]],
          resp: { A: `Evangelicals reply that the Church must be tested by the apostolic writings, as the Bereans did (Acts 17:11).`, D: `Historians note that early Christian communities read Scripture in diverse and conflicting ways.` }
        },
        {
          id: 'c2', claim: `Scripture should be read typologically, with Christ as its center, as the Fathers did.`,
          ass: [[`The New Testament’s own use of the Old (Matthew, Hebrews, Paul) is a model.`, `Critics say New Testament authors used the methods of their day, which cannot simply be reproduced.`], [`The original sense and the Christological sense are compatible.`, `Where the original author meant something different, one sense must give way.`]],
          fal: { n: `Equivocation`, why: `“Meaning” moves between what the author intended and what the text may signify in the larger story.`, def: `Defenders say Scripture has a divine author whose intention is wider than the human author’s.` },
          ctr: [[`Matthew 2:15 quotes Hosea 11:1, about Israel, as about Jesus.`, `Defenders say Matthew is reading Israel’s story as fulfilled in Jesus, and that this is the point of typology.`]],
          resp: { A: `Evangelicals say typology is valuable when controlled by the grammatical-historical sense.`, D: `Historians say typology is a form of theological reading that the text’s authors did not intend and the historian cannot confirm.` }
        }
      ]
    },
    {
      id: 'D', n: `Historical-critical view`, short: `An anthology of human witness`, who: `Julius Wellhausen, Rudolf Bultmann, Raymond Brown, Bart Ehrman, Walter Brueggemann (in part)`,
      nearTo: ['que'], farFrom: ['prot', 'pen'],
      claim: `The Bible is a collection of human writings composed over centuries by many authors, edited and combined over time, and best understood by asking who wrote each part, to whom, when, and why. Whether it is also revelation is a further question, which history cannot answer.`,
      pass: [
        [`Luke 1:1–4`, `Luke writes after “many have undertaken to compile a narrative,” using sources and investigation.`],
        [`Genesis 1:1–2:4 and Genesis 2:4–25`, `Two creation accounts with different order and style stand side by side.`],
        [`Mark 16:9–20`, `The oldest manuscripts end at 16:8, and the longer ending is a later addition.`],
        [`2 Samuel 24:1 and 1 Chronicles 21:1`, `Who incited David to take the census: God or Satan? The later text revises the earlier.`]
      ],
      obj: [
        `Source theories (J, E, P, D) are hypotheses, and have been revised heavily: the Documentary Hypothesis is no longer a consensus in the form Wellhausen gave it.`,
        `Critics can apply their methods in a biased way, assuming that anything miraculous or prophetic is a later addition.`,
        `A purely historical approach may ignore how the text functions as Scripture in communities.`
      ],
      hist: [
        [`17th c.`, `Spinoza and Richard Simon raise questions about Mosaic authorship.`],
        [`1878`, `Wellhausen’s *Prolegomena* argues for the late date of the Priestly source.`],
        [`20th c.`, `Form, redaction and literary criticism refine the picture; archaeological finds (Dead Sea Scrolls) give a clearer textual history.`],
        [`21st c.`, `Scholars debate the dating of the Pentateuch and the role of the Persian period in shaping it.`]
      ],
      assume: [
        `Texts are best explained by the ordinary processes of composition, transmission and editing.`,
        `Any claim of divine inspiration is a theological claim, outside the historian’s remit.`,
        `Ancient authors, like modern ones, wrote from a perspective and for a purpose.`
      ],
      explains: [`Doublets, tensions, anachronisms and differing theologies within the Bible.`, `The relation between biblical texts and other ancient Near Eastern literature.`],
      struggles: [`Why these texts, and not others, have shaped lives and cultures so powerfully.`, `The risk that “reconstructed” sources are hypotheses treated as facts.`],
      args: [
        {
          id: 'd1', claim: `Discrepancies in the Bible (doublets, contradictions, anachronisms) are best explained by composition from multiple sources.`,
          ass: [[`The discrepancies are real, not only apparent.`, `Many can be harmonized, and the case must show that harmonization fails.`], [`Ancient editors would not have kept the tensions on purpose.`, `Jewish tradition says they did: the tensions were kept as sacred.`]],
          fal: { n: `Affirming the consequent`, why: `If the text has multiple sources, it would show tensions; it shows tensions, so it has multiple sources. Other causes could give the same effect.`, def: `Defenders say they compare explanations and that multiple authorship is the best fit across the whole Pentateuch.` },
          ctr: [[`Alter and Berlin argue that some “doublets” are literary technique, not sign of sources.`, `Critics reply that literary and source readings are not exclusive.`]],
          resp: { A: `Evangelicals offer harmonizations (the two creation accounts as general and specific) and doubt that ancient scribes were so careless.`, B: `Catholic scholars accept source criticism as legitimate (Divino Afflante Spiritu, 1943) and ask what the final form teaches.` }
        },
        {
          id: 'd2', claim: `The Bible should be read like any other ancient book, with the same standards of evidence and the same openness to error.`,
          ass: [[`The Bible is like other ancient books.`, `Believers say it is like them in form and unlike them in origin; the claim assumes the second away.`], [`Readers can set their theology aside.`, `Everyone approaches with assumptions, including secular ones.`]],
          fal: { n: `Begging the question`, why: `If “like any other book” already excludes inspiration, the conclusion follows from the definition.`, def: `Defenders say it is a method, not a metaphysics: the historian studies what can be studied.` },
          ctr: [[`Benjamin Jowett said to read it “like any other book,” and still held it as Scripture.`, `The ideal is possible for some readers and not for others.`]],
          resp: { A: `Evangelicals answer that a text that claims to be God’s word cannot be treated neutrally without already rejecting the claim.`, C: `Orthodox readers add that the Church’s liturgical use is part of what the Bible is, and the historian can only study part of that.` }
        }
      ]
    },
    {
      id: 'E', n: `Skeptical or nonreligious view`, short: `An ancient, fallible and powerful book`, who: `Thomas Paine, Bertrand Russell, Hector Avalos, many secular humanists and scholars`,
      nearTo: ['ath'], farFrom: ['cat', 'ort', 'prot', 'lut', 'pen', 'oth'],
      claim: `The Bible has no special authority as revelation. It is a significant human artifact, containing wisdom and cruelty, history and legend, and should be judged by the same moral and rational standards as any other text.`,
      pass: [
        [`Deuteronomy 20:16–18`, `A command to destroy the Canaanite cities without leaving anything that breathes.`],
        [`Leviticus 25:44–46`, `Instruction on buying and owning slaves from the surrounding nations.`],
        [`Psalm 137:8–9`, `A cry for the dashing of Babylon’s infants against the rock.`],
        [`Ephesians 6:5`, `Slaves are told to obey their earthly masters.`]
      ],
      obj: [
        `The Bible has also been the source of movements for abolition, civil rights, and care of the poor, which a purely negative judgment must account for.`,
        `Selecting troubling passages can ignore the contexts and genres in which they were written, as skeptics also say of believers who select comforting ones.`,
        `The standard of “modern morality” is also historical, and the Bible is part of its history.`
      ],
      hist: [
        [`18th c.`, `Deists and critics (Paine’s *Age of Reason*, 1794) attack the Bible’s claims to inspiration.`],
        [`19th c.`, `Darwin, Feuerbach and higher criticism undermine traditional views.`],
        [`20th c.`, `Russell’s “Why I Am Not a Christian” (1927) and other essays make the moral case.`],
        [`21st c.`, `The New Atheists and secular biblical scholars press the same case; scholars like Avalos study biblical violence.`]
      ],
      assume: [
        `Authority comes from reasons and evidence, not from a claim to inspiration.`,
        `Moral progress is real, and shows up in the ways modern ethics differs from ancient texts.`,
        `The burden of proof is on those who claim supernatural origin.`
      ],
      explains: [`The presence of morally troubling material in a text claimed to be divine.`, `Why the Bible resembles other ancient literature in genre, law and myth.`],
      struggles: [`The Bible’s historic role in moral reform, and in the formation of Western literature and law.`, `The depth of lives lived by it, which suggests more than a mere artifact.`],
      args: [
        {
          id: 'e1', claim: `A text that commands or accepts genocide and slavery cannot be the word of a perfectly good God.`,
          ass: [[`The passages mean what they appear to mean in the plain reading.`, `Scholars debate whether the conquest texts are hyperbole (ANE war rhetoric) or ever happened.`], [`A perfectly good God would not permit such texts at all.`, `Believers argue that revelation is progressive and accommodated to its time.`]],
          fal: { n: `Presentism`, why: `Ancient texts are judged by standards that did not yet exist.`, def: `Defenders say the argument is about a claim to divine perfection, and perfection cannot be indexed to an era.` },
          ctr: [[`The same Bible contains the prophets’ denunciation of injustice and Jesus’ command to love enemies.`, `Skeptics say that variety proves it is a human library with human moral development.`]],
          resp: { A: `Evangelicals say the conquest was a limited act of judgment and hyperbolic in language, and that the slavery laws regulate and limit an existing practice.`, D: `Historical critics say the conquest accounts may be later theological writing, not history, which changes the moral question but does not remove it.` }
        },
        {
          id: 'e2', claim: `Because the Bible was written by humans and shows ordinary signs of human composition, there is no reason to treat it as revelation.`,
          ass: [[`Human authorship excludes divine authorship.`, `Believers say God works through human authors, as in any theology of inspiration.`], [`Revelation, if it existed, would look different.`, `The claim depends on an expectation of how a deity would communicate.`]],
          fal: { n: `False dichotomy`, why: `It treats human authorship and divine inspiration as mutually exclusive.`, def: `Defenders say the point is not that they are exclusive but that the second needs evidence the first does not.` },
          ctr: [[`The Quran is held by Muslims to be uncreated and was received by a human Muhammad.`, `Skeptics say every tradition makes such claims and all of them cannot be right.`]],
          resp: { B: `Catholics say Dei Verbum affirms that God is the author and the human writers true authors, as in the incarnation.`, D: `Historians say the argument is rhetorical, as historical method can neither prove nor refute inspiration.` }
        }
      ]
    }
  ]
};
