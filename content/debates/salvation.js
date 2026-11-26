// Debate: Is salvation through faith alone?
export default {
  id: 'salvation',
  q: `Is salvation through faith alone?`,
  intro: `Paul says a person is “justified by faith apart from works of the law” (Romans 3:28). James says a person is “justified by works and not by faith alone” (James 2:24). Five serious traditions of reading read those two sentences very differently, and the differences shaped the Reformation, the split between East and West, and a good deal of modern scholarship.`,
  settled: [
    `Paul’s letters were written before the Gospels, and Galatians and Romans argue that Gentiles need not take on the Jewish law to belong to God’s people.`,
    `The Greek verb dikaioō, usually translated “justify,” has a legal and covenantal range, and the word “alone” does not appear in the Greek of Romans 3:28. Luther added *allein* in his German translation and defended it as a matter of idiom.`,
    `Augustine’s late-fourth-century reading of Paul, written against Pelagius, shaped nearly all Western debate afterward.`
  ],
  open: [
    `What Paul meant by “works of the law”: moral effort in general, or the Jewish boundary markers (circumcision, food laws, Sabbath).`,
    `Whether “justify” means “declare righteous” (a verdict) or “make righteous” (a transformation).`,
    `Whether Paul and James are answering the same question.`
  ],
  honest: `Honest note: on the narrow historical questions, most scholars of every stripe now agree that Paul’s opponents were pressing Jewish identity markers, which makes the older picture of a medieval-style “works-righteousness” in the first century hard to defend as stated. That does not settle the theological question of what to say about faith and works today, and each position below keeps something the others struggle to reproduce.`,
  press: {
    ath: `Do not stop at “it is just religion.” Ask what claim about human nature each position makes (that people can or cannot repair themselves), and whether you reject the claim or only the vocabulary.`,
    que: `If you left a tradition that stressed “faith alone,” test whether you rejected the doctrine or the culture that enforced it. Position C and D may sound different from what you were taught.`,
    spi: `Every position here treats trust as central but disagrees on whether practice, sacrament or transformation is part of it. Which of those do you already assume?`,
    cat: `Read Position A at its strongest before you answer it. Why did Paul bother to say “apart from works” if works already count? Then ask what the Council of Trent actually condemned (Position B’s own account will help).`,
    ort: `Position B and A both frame salvation as a legal problem to be solved. Does the New Testament frame it that way as much as your tradition says it does not? Test the claim against Romans 3–5.`,
    prot: `Position A is yours. Read Position D first: if the “works of the law” were Jewish identity markers, how much of the classic argument against Rome still depends on Paul? Then read James 2 without harmonizing it away.`,
    lut: `You hold justification as the article on which the church stands or falls. Test it against Position C: if salvation is participation in Christ, is a forensic verdict the whole picture, or a part of it?`,
    pen: `You have been taught faith and the Spirit. Where does the text separate faith, the gift of the Spirit and ongoing works (Galatians 3:2–5; 5:6; Ephesians 2:8–10)? Positions A and C answer differently.`,
    oth: `In your tradition, law and mercy are held together without a doctrine of imputed righteousness. Is that a stronger or weaker answer to Paul’s question than any here?`,
    any: `Try this: write one sentence saying what a person must do, believe or receive to be accepted by God, then see which position that sentence matches.`
  },
  positions: [
    {
      id: 'A', n: `Faith alone (Protestant)`, short: `Justification by faith alone`, who: `Luther, Calvin, Melanchthon; Reformed, Lutheran, Baptist and most evangelical traditions`,
      nearTo: ['prot', 'lut', 'pen'], farFrom: ['cat', 'ort'],
      claim: `God declares sinners righteous because of Christ’s righteousness, received through faith alone, apart from anything the person does. Good works follow as the fruit of faith, never its ground.`,
      pass: [
        [`Romans 3:21–28`, `The righteousness of God is “through faith in Jesus Christ for all who believe,” and a person is justified “apart from works of the law.”`],
        [`Galatians 2:16`, `Paul says three times in one verse that justification is not by works of the law but by faith in Christ.`],
        [`Romans 4:1–8`, `Abraham “believed God, and it was credited to him as righteousness,” before circumcision and before the law (Genesis 15:6).`],
        [`Ephesians 2:8–9`, `“By grace you have been saved through faith… not a result of works.”`]
      ],
      obj: [
        `James 2:14–26 says faith without works is dead and that a person is justified by works and not by faith alone. Reformers answer that James is describing faith’s evidence, but the verb he uses is “justify.”`,
        `The Greek does not say “alone,” and many Fathers read “faith” as faithful life, which Paul himself describes as “faith working through love” (Galatians 5:6).`,
        `Judgment passages (Matthew 25:31–46; Romans 2:6–8; 2 Corinthians 5:10) say people are judged by what they have done.`
      ],
      hist: [
        [`4th–5th c.`, `Augustine insists that grace precedes all human merit; his emphasis on God’s initiative is the seed of the doctrine.`],
        [`1515–1517`, `Luther comes to read “the righteousness of God” in Romans 1:17 as a gift, not a demand. The indulgence controversy brings it into the open.`],
        [`1530s–1540s`, `Melanchthon and Calvin sharpen the doctrine: forensic justification, imputed righteousness, sanctification as a distinct second thing.`],
        [`1999`, `The Lutheran World Federation and the Catholic Church sign a Joint Declaration on the Doctrine of Justification, saying the old condemnations no longer apply to the shared teaching.`]
      ],
      assume: [
        `Salvation is first of all a legal problem: sinners stand guilty before a holy judge.`,
        `A real transfer of status is possible: the judge can credit one person’s righteousness to another.`,
        `Assurance is possible, and is part of the good news, because the verdict does not depend on my performance.`
      ],
      explains: [`Why Paul so insists on grace, and why the gospel could be offered to Gentiles with no entry requirements.`, `The universal experience of moral failure: if salvation depended on my record, no one could be sure.`],
      struggles: [`The weight Jesus, James and Paul himself give to judgment according to works.`, `How a purely declarative verdict yields real transformation, and why Paul sometimes uses language of union and new creation (Galatians 2:20; 2 Corinthians 5:17).`],
      args: [
        {
          id: 'a1', claim: `If salvation required any human contribution, grace would no longer be grace (Romans 11:6), so justification must be by faith alone.`,
          ass: [[`“Faith” is not itself a contribution or work.`, `If faith counts as a human act that earns something, the argument collapses into the position it opposes.`], [`Paul’s contrast is between grace and works in general, not only works of the Jewish law.`, `If it is only boundary markers, the argument proves less: it shows Gentiles need not be circumcised, not that effort never counts.`]],
          fal: { n: `Equivocation`, why: `“Works” moves from Torah-observance (Galatians) to any moral effort (the argument’s conclusion) without showing Paul means the second.`, def: `Defenders say Romans 4 and 11:6 explicitly widen the contrast to anything that would be “wages” rather than a gift.` },
          ctr: [[`A parent who gives a child a gift on the condition that they hold out their hands has still given a gift.`, `Defenders agree, and say that is exactly what faith is: empty hands. Critics reply that then “alone” does no work, since hands that open also move.`]],
          resp: { B: `Catholic theology agrees that nothing earns the first grace. It denies that the justified are merely declared righteous, and holds that grace enables meritorious cooperation: merit is itself a gift (Trent, session 6).`, C: `The Orthodox accept that nothing earns salvation, but find the grace/works frame itself the problem: salvation is communion with God, to which both faith and love belong.`, D: `Romans 11:6 sits within an argument about Israel and the Gentiles; the question is who belongs to the covenant people, not what a conscience needs to stand before a judge.` }
        },
        {
          id: 'a2', claim: `James and Paul do not contradict: Paul speaks of how a person is declared righteous, James of how that faith is shown.`,
          ass: [[`James uses “justify” in the sense of “vindicate” or “show to be righteous.”`, `If James means the same thing Paul does, the two verses contradict unless “faith” changes meaning too.`], [`Both authors use “faith” to mean the same thing.`, `James’ “faith” (assent that even demons share, 2:19) may be a different thing from Paul’s trust.`]],
          fal: { n: `Special pleading`, why: `The harmonization is adopted because the doctrine requires it, not because the texts show it. Another reading (that they disagree) is not seriously entertained.`, def: `Defenders point to Abraham: both authors cite Genesis 15:6 and Genesis 22 and plainly mean different moments in his story.` },
          ctr: [[`Luther himself called James “an epistle of straw” and thought it conflicted with Paul.`, `Later Lutherans backed off that judgment. Critics say it shows how hard the harmonization is, defenders that the first reaction was the more honest one.`]],
          resp: { B: `Catholic exegesis reads James as saying that works, done in grace, contribute to justification; that is the plain sense, and the Reformers had to explain it away.`, D: `Historical criticism often allows that James and Paul could be in tension, or that James is arguing against a misreading of Paul’s slogan, not against Paul.` }
        }
      ]
    },
    {
      id: 'B', n: `Faith formed by love (Catholic)`, short: `Faith and works in grace`, who: `Augustine, Aquinas, the Council of Trent; the Catholic Church`,
      nearTo: ['cat'], farFrom: ['prot', 'pen', 'lut'],
      claim: `Justification is the real transformation of the sinner by God’s grace received through faith and baptism, and it is nourished and increased by love, the sacraments and works done in grace. Faith comes first, but it is a living faith.`,
      pass: [
        [`James 2:14–26`, `“A person is justified by works and not by faith alone.” Faith without works is “dead.”`],
        [`Galatians 5:6`, `“The only thing that counts is faith working through love.”`],
        [`Matthew 25:31–46`, `The final judgment turns on what was done for “the least of these.”`],
        [`1 Corinthians 13:2`, `Even faith that moves mountains is nothing without love.`]
      ],
      obj: [
        `Paul’s “not of works” (Ephesians 2:8–9; Romans 4) seems to rule out any contribution at all, and Trent’s language of merit can sound like one.`,
        `Medieval practice (indulgences, penances) looked to Reformers like a system of earning; the Council of Trent tightened teaching but did not end that suspicion.`,
        `If justification can be lost and regained through the sacrament of penance, assurance of salvation is hard to sustain on Romans 8:38–39.`
      ],
      hist: [
        [`c. 400–430`, `Augustine: grace heals the will; works of love are the fruit of the Spirit given within us.`],
        [`13th c.`, `Aquinas systematizes grace, merit and the infused virtues of faith, hope and charity.`],
        [`1547`, `The Council of Trent (session 6) defines justification as sanctification and renewal, condemns the view that faith alone justifies in the sense of faith without charity, and affirms that all merit is a gift.`],
        [`1999 and after`, `Joint Declaration with Lutherans: both affirm justification by grace through faith; the remaining differences are described as differences of emphasis within a common doctrine.`]
      ],
      assume: [
        `Salvation is a healing and transformation as well as a pardon: grace changes the person.`,
        `God’s sovereign grace and human response are not rivals: the first enables the second.`,
        `The Church’s sacraments are the ordinary means by which grace is given and restored.`
      ],
      explains: [`The judgment-by-works passages and the plain sense of James 2.`, `Why moral transformation is expected and why faith without love is called worthless.`],
      struggles: [`Paul’s sharp contrast between grace and works, which Catholic readers must soften.`, `The development of penance, merit and indulgences, which are hard to find in the New Testament.`],
      args: [
        {
          id: 'b1', claim: `James 2:24 is the only passage that uses the phrase “faith alone,” and it denies that justification is by faith alone.`,
          ass: [[`James and Paul are both talking about the same kind of justification before God.`, `If James means “shown to be righteous,” the argument needs more than a verbal match.`], [`The Greek verb means the same thing in both authors.`, `Dikaioō has declarative and demonstrative senses; the argument needs the second to be excluded.`]],
          fal: { n: `Appeal to a proof-text`, why: `One verse is set against the larger argument of Romans and Galatians without showing why James’ sentence should govern Paul’s.`, def: `Defenders say it is not one verse: the whole letter of James and Jesus’ teaching on judgment say the same.` },
          ctr: [[`Paul says Abraham was justified by faith before he did anything (Romans 4:2–3).`, `Catholic readers reply that Paul means the first justification, James the increase of justification: not contradictory but different stages.`]],
          resp: { A: `Protestants say James is attacking dead orthodoxy (demonic belief, 2:19), not Paul. The justification James speaks of is the public vindication of a justified person.`, C: `Orthodox readers agree that James protects the truth that faith and life cannot be separated, but would not frame the answer in terms of merit.` }
        },
        {
          id: 'b2', claim: `The Church’s long continuity shows that “faith alone” was a sixteenth-century novelty.`,
          ass: [[`Doctrinal continuity is a reliable guide to the apostolic meaning.`, `If development can distort as well as deepen, continuity alone does not settle the exegetical question.`], [`The Fathers consistently denied that faith alone justifies.`, `Some Fathers (Ambrosiaster, Origen on Romans 3:28, Chrysostom) say things close to the Reformers.`]],
          fal: { n: `Appeal to tradition`, why: `Age and continuity are offered as evidence for truth, although a long-lived reading can be a long-lived error.`, def: `Defenders reply that Scripture itself says tradition passes on the apostolic faith (2 Thessalonians 2:15) and that the Reformers also appeal to Augustine.` },
          ctr: [[`Ambrosiaster and Origen say that a person is justified by faith “without the works of the law.”`, `Catholic scholars say they mean the ritual law, as the New Perspective now does; the Reformers read the same text as covering all works.`]],
          resp: { A: `The Reformers did not claim that no one before them said anything like it; they claimed to recover Paul against late medieval distortions, which Catholic historians also acknowledge.`, D: `Historical critics add that “faith alone” and “works of the law” were also not the first-century categories, so both Reformers and Trent answered later questions.` }
        }
      ]
    },
    {
      id: 'C', n: `Participation and theosis (Orthodox)`, short: `Salvation as union with God`, who: `Irenaeus, Athanasius, Gregory Palamas; Eastern and Oriental Orthodox churches`,
      nearTo: ['ort'], farFrom: ['prot', 'lut'],
      claim: `Salvation is healing, and sharing in the divine life: the Son of God became human so that humans might become partakers of the divine nature (2 Peter 1:4). Faith, baptism, repentance and love are all parts of one lifelong movement toward union with God, not separate transactions.`,
      pass: [
        [`2 Peter 1:3–4`, `Believers become “partakers of the divine nature.”`],
        [`John 17:20–23`, `Jesus prays that his followers will be one in him as he is in the Father.`],
        [`Romans 6:3–11`, `Baptism is union with Christ’s death and resurrection, not only a verdict.`],
        [`Galatians 2:20`, `“It is no longer I who live, but Christ who lives in me.”`]
      ],
      obj: [
        `The language of “becoming gods” (Athanasius) seems to blur the line between Creator and creature, and Orthodox thought answers with the distinction between essence and energies, which is not itself in the New Testament.`,
        `Paul’s argument in Romans 3–5 does seem to concern guilt and verdict, which the Orthodox read as one image among many.`,
        `The Eastern emphasis on ancestral (not inherited) guilt reads Romans 5:12 differently from the Latin Church, and the translation of the Greek *eph’ hō* is disputed.`
      ],
      hist: [
        [`2nd c.`, `Irenaeus: “the Word of God became what we are so that he might make us what he is.” Salvation is recapitulation.`],
        [`4th c.`, `Athanasius, On the Incarnation: the Word became human so that humans might be deified. The Cappadocians develop it.`],
        [`14th c.`, `Gregory Palamas distinguishes God’s unknowable essence from his energies, which are truly shared.`],
        [`19th–20th c.`, `Orthodox theologians (Lossky, Florovsky, Meyendorff) present theosis as a critique of Western juridical models, which some historians call overdrawn.`]
      ],
      assume: [
        `The central human problem is death and corruption more than guilt.`,
        `Human nature is made for communion with God and can be healed.`,
        `Salvation is participatory and synergistic: God’s grace and human cooperation are not competitors.`
      ],
      explains: [`The Johannine and Pauline language of union, indwelling and new creation.`, `Why early Christian writers talk so much about the incarnation, resurrection and sacraments as saving events.`],
      struggles: [`The forensic vocabulary Paul uses in Romans and Galatians, which it treats as secondary.`, `The distance between the New Testament’s Jewish categories and the Greek metaphysics of essence and energies.`],
      args: [
        {
          id: 'c1', claim: `The early church read salvation as participation in the divine life long before the Latin model of guilt and satisfaction appeared.`,
          ass: [[`Early means more authoritative for interpreting the apostles.`, `If later development can be legitimate, the earliest reading is not automatically the best.`], [`Eastern Fathers spoke with one voice about theosis.`, `Many Western Fathers (Augustine too) also speak of deification; the contrast with the East is overstated by some modern writers.`]],
          fal: { n: `Genetic fallacy`, why: `Where an idea came from, or when, is treated as proof of its truth or of its absence from the New Testament.`, def: `Defenders say it is not the date but the apostolic continuity of Irenaeus, who knew those who knew John.` },
          ctr: [[`Latin writers such as Augustine, Aquinas and Calvin also teach union with Christ.`, `Orthodox readers agree and say the difference is where the weight falls, not that others lack the theme.`]],
          resp: { A: `Reformed theologians (Calvin on union with Christ) say participation is real but follows from justification and does not replace it.`, D: `Historians agree that theosis language is early but note that its metaphysical categories are later than Paul, whose union language is more apocalyptic and communal.` }
        },
        {
          id: 'c2', claim: `Reading Paul’s “justification” as a courtroom verdict is a Western lens, not Paul’s own frame.`,
          ass: [[`Paul’s images are best understood as one set among many.`, `If courtroom language is central in Romans, the argument fails on its own ground.`], [`The Eastern lens is less anachronistic than the Western.`, `Each tradition reads Paul through later questions, including the Eastern one.`]],
          fal: { n: `Tu quoque`, why: `It points out that the other side has a lens, but does not show that the Eastern lens is truer.`, def: `Defenders concede the point and add that the New Testament’s variety of images supports their breadth.` },
          ctr: [[`Romans 3–5 is full of forensic terms: justify, condemn, impute, acquit.`, `Orthodox readers say Paul uses them with a covenantal and participatory meaning that the West narrowed.`]],
          resp: { A: `Protestants reply that the courtroom is not an alternative image but the ground of all the others: without forgiveness the union is not possible.`, B: `Catholic theologians partly agree: Trent speaks of renewal of the inner person, and recent Catholic writing uses the language of divinization.` }
        }
      ]
    },
    {
      id: 'D', n: `Historical-critical reading`, short: `Paul in his own Jewish context`, who: `E. P. Sanders, James Dunn, N. T. Wright (as a believing scholar), Krister Stendahl, Pamela Eisenbaum`,
      nearTo: ['que'], farFrom: ['prot', 'pen'],
      claim: `Paul was not asking how a guilty individual finds a gracious God, but how Gentiles belong to God’s covenant people without becoming Jews. “Works of the law” are mostly the Jewish identity markers, and “justification” is largely about who is in the family.`,
      pass: [
        [`Galatians 2:11–16`, `The context is a table-fellowship dispute at Antioch: who may eat with whom.`],
        [`Romans 3:27–30`, `“Is God the God of Jews only?” The argument ends with one God justifying both circumcised and uncircumcised.`],
        [`Philippians 3:4–9`, `Paul’s former life as a zealous Pharisee is not described as a guilty conscience (compare “as to righteousness under the law, blameless”).`],
        [`Acts 15`, `The Jerusalem meeting decides which requirements to place on Gentile believers.`]
      ],
      obj: [
        `Romans 1–3 and 7 look to many readers like a statement about universal guilt, not only about the law’s boundary markers.`,
        `Sanders’ “covenantal nomism” has been criticized for flattening the variety of Second Temple Judaism (some texts do stress merit and reward).`,
        `Historical reconstruction can be accused of replacing one confessional lens with another: the “new perspective” has its own theological appeal.`
      ],
      hist: [
        [`1963`, `Stendahl’s “The Apostle Paul and the Introspective Conscience of the West” argues that Luther’s anxious conscience was read back into Paul.`],
        [`1977`, `E. P. Sanders’ *Paul and Palestinian Judaism* shows that Second Temple Judaism was not a religion of works-righteousness.`],
        [`1983`, `James Dunn coins “the new perspective on Paul.”`],
        [`1990s–`, `Wright, Gaventa, Eisenbaum and others debate the “apocalyptic” and “radical new perspective” readings.`]
      ],
      assume: [
        `The best reading of Paul is the one that fits his first-century Jewish situation.`,
        `Later theological questions (assurance, merit) should not be read back into the text.`,
        `Paul remained a Jew and addressed Gentile inclusion, not the abolition of Judaism.`
      ],
      explains: [`Why Paul’s letters are so concerned with Jew and Gentile, circumcision and table fellowship.`, `Why first-century Jewish sources do not look like the legalism Luther opposed.`],
      struggles: [`The universal anthropology of Romans 1–3 and 7, which many see as about all humans.`, `How to say what Paul means for readers who are not Gentiles waiting to be admitted to a Jewish movement.`],
      args: [
        {
          id: 'd1', claim: `Second Temple Judaism was a religion of grace within the covenant, so Luther’s Paul, opposing works-righteousness, is a misreading.`,
          ass: [[`Sanders’ account of “covenantal nomism” fairly represents first-century Judaism.`, `If some texts do stress earning (e.g., 4 Ezra), the contrast with Luther is weaker.`], [`Paul’s opponents held the typical covenantal view.`, `His opponents were Christian teachers, not the whole of Judaism.`]],
          fal: { n: `Hasty generalization`, why: `A varied literature is summarized as one pattern, then used to say what a particular letter must mean.`, def: `Defenders say Sanders sampled widely and that scholars of many kinds (including Jews) agree on the main point.` },
          ctr: [[`4 Ezra (c. 100 CE) says the righteous are rewarded for their deeds and that few will be saved.`, `Critics of the new perspective cite this; defenders reply that 4 Ezra is a response to the destruction of the temple that expresses despair, not the norm.`]],
          resp: { A: `Reformed scholars (Carson, Schreiner, Westerholm) say the new perspective is right about context but wrong that Paul has no argument about human inability; Romans 1–3 and 7 say so.`, B: `Catholic scholars welcome the new perspective as showing that Trent was not opposing a Jewish legalism but a late medieval one.` }
        },
        {
          id: 'd2', claim: `Paul’s concern was Gentile inclusion, not individual guilt: “justification” is a boundary question.`,
          ass: [[`Paul’s argument is primarily social, not psychological.`, `If Romans 1–3 and 7 are really about universal sin, the social frame is at most half the picture.`], [`The two concerns can be separated.`, `They may be one for Paul: the Gentile problem is a sin problem, and vice versa.`]],
          fal: { n: `False dichotomy`, why: `It presents “inclusion” and “guilt” as alternatives when Paul may be treating them together.`, def: `Defenders say they give both a place but insist the social question is the more basic.` },
          ctr: [[`Romans 7’s “wretched man” is not a Gentile asking to be let in but someone who knows the law and fails.`, `Many scholars now read Romans 7 as Paul describing humanity under sin from a Christian vantage, which fits both lenses.`]],
          resp: { A: `Reformation readers say you cannot have the first without the second: the boundary markers are the symptom of a deeper problem, human sin.`, C: `Orthodox readers add that Paul’s corporate language (Adam, Christ, body) suits a participatory reading better than either an individualist or a boundary one.` }
        }
      ]
    },
    {
      id: 'E', n: `Skeptical or nonreligious reading`, short: `A human system of status and effort`, who: `Nietzsche, Albert Schweitzer (in part), Bart Ehrman, Hector Avalos, many secular humanists`,
      nearTo: ['ath'], farFrom: ['cat', 'ort', 'prot', 'lut', 'pen', 'oth'],
      claim: `“Salvation” answers problems (guilt, death, cosmic judgment) that the doctrine itself creates. Whether by faith, works or participation, the debate describes how early Christian communities defined membership and moral formation, not how anyone is rescued from a real threat.`,
      pass: [
        [`Romans 5:12–19`, `The argument depends on a historical Adam through whom sin and death entered the world.`],
        [`1 Corinthians 15:12–19`, `Paul says the whole hope depends on a bodily resurrection: if Christ was not raised, faith is futile.`],
        [`Galatians 1:6–9`, `Paul’s anathema shows that “the gospel” was already a contested boundary line in the first generation.`]
      ],
      obj: [
        `The skeptical reading must still explain why this particular set of ideas moved so many people and shaped moral life so deeply.`,
        `Calling the doctrine a human construction describes its origin but does not show it is false (the genetic fallacy applies here too).`,
        `Many nonreligious thinkers also hold that moral failure and the need for forgiveness are real human problems, which gives the theology something to be about.`
      ],
      hist: [
        [`18th c.`, `Enlightenment critics (Hume, Reimarus, Lessing) begin treating Paul and the Gospels as human compositions open to historical study.`],
        [`19th c.`, `Nietzsche calls the Pauline gospel a revaluation of weakness; Feuerbach argues that “God” projects human ideals.`],
        [`20th c.`, `Psychology and sociology of religion (Freud, Durkheim, Weber) interpret guilt and salvation as social and psychological functions.`],
        [`21st c.`, `Cognitive science of religion asks why humans find ideas of moral accounting and afterlife judgment natural.`]
      ],
      assume: [
        `Claims about supernatural rescue need independent evidence, and none has been shown.`,
        `Religious doctrines are best explained by their history, psychology and social function.`,
        `Moral life and meaning can be grounded without appeal to divine verdicts.`
      ],
      explains: [`Why every tradition builds an elaborate system around guilt, purity and status, and why those systems differ.`, `Why the New Testament contains disagreement from the very beginning (Galatians 2; James 2).`],
      struggles: [`Why the experience of forgiveness has been so transformative for many people.`, `How to account for the moral seriousness of the doctrine: it makes real demands that cost people their comfort and, sometimes, their lives.`],
      args: [
        {
          id: 'e1', claim: `Because the New Testament authors themselves disagree about faith and works, the doctrine cannot be a revelation from a single divine source.`,
          ass: [[`Revelation would be univocal.`, `Believers who accept human authors and genuine development deny this premise.`], [`Paul and James actually disagree.`, `That is the very question the debate is about; assuming it answers it.`]],
          fal: { n: `Begging the question`, why: `The conclusion (no divine source) is assumed in the claim that revelation must not contain tension.`, def: `Defenders say every inspired-text theory must say what inspiration permits, and the Bible’s own variety (four Gospels) is evidence against univocal dictation.` },
          ctr: [[`Jewish tradition holds that the Hebrew Bible contains tension that rabbis preserved on purpose, as part of ongoing argument.`, `Skeptics reply that preserved disagreement is an interesting feature of a human library, not evidence for divine inspiration.`]],
          resp: { A: `Reformed theology says apparent tension is a call to read more carefully; the unity is in the gospel, and later Lutherans (the Formula of Concord) handled James accordingly.`, D: `Historical critics agree there is diversity in the New Testament and add that diversity does not decide whether any of it speaks truly about God.` }
        },
        {
          id: 'e2', claim: `The doctrine of salvation answers a problem (original guilt) that the doctrine itself created.`,
          ass: [[`Human guilt is an artifact of religious teaching.`, `Many people independently feel guilt, shame and the need for repair; the claim must explain those.`], [`Alternative explanations (psychology, social control) are sufficient.`, `Sufficiency is not shown, only offered.`]],
          fal: { n: `Genetic fallacy`, why: `Explaining where an idea comes from is taken as showing it is false or unnecessary.`, def: `Defenders concede the logical point and say the argument shifts the burden: if natural causes explain the belief, no extra premise is needed.` },
          ctr: [[`Secular therapies and justice systems also work with guilt, repair and forgiveness.`, `Skeptics say that shows these are human needs; believers say it points to something beneath them.`]],
          resp: { A: `Protestants say the doctrine did not invent guilt: Paul says the law merely reveals what is already in every conscience (Romans 2:14–15).`, C: `Orthodox writers shift the problem from guilt to death and corruption, which the skeptic’s “guilt-invention” argument does not touch.` }
        }
      ]
    }
  ]
};
