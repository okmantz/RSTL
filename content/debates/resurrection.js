// Debate: Did the resurrection of Jesus happen?
export default {
  id: 'resurrection',
  q: `Was Jesus’ resurrection a historical event?`,
  intro: `Paul says that if Christ has not been raised, Christian faith is futile (1 Corinthians 15:14). Almost every serious scholar agrees that early Christians sincerely believed Jesus had risen. The argument is about what caused that belief, and whether history can ever answer a question like this.`,
  settled: [
    `Jesus of Nazareth was crucified under Pontius Pilate (attested by Josephus and Tacitus as well as the Gospels).`,
    `Within a few years his followers were proclaiming that God had raised him, and Paul preserves a creed he “received” (1 Corinthians 15:3–8), which most scholars date to within a few years of the crucifixion.`,
    `The Gospel accounts of the empty tomb and the appearances differ in details (who, how many, where), and Mark’s oldest ending stops at 16:8.`
  ],
  open: [
    `What happened to Jesus’ body, and whether the tomb was empty.`,
    `What the first “appearances” were: bodily encounters, visions, or something between.`,
    `Whether a historian, working by ordinary method, can say anything about an alleged miracle.`
  ],
  honest: `Honest note: nobody can run the experiment, so every position is an inference to the best explanation of the same few data, and the weight each gives to prior probability (is a miracle possible?) largely decides the outcome. Be wary of anyone who says the evidence alone forces the conclusion; the argument is also a philosophical one about what is possible.`,
  press: {
    ath: `Say what you think happened, concretely: who saw what, and why the movement began where and when it did. Does your account cover the empty-tomb tradition, Paul’s conversion, and the early martyrs, or only some of them?`,
    que: `Is it the resurrection you doubt, or the way it was used to enforce a system? You can hold position C’s reading without the latter.`,
    spi: `Position C treats the resurrection as real experience of transformation, not a lab event. Does that satisfy you, or does it leave out what the first disciples claimed?`,
    cat: `Read Position D carefully: the Gospel accounts do differ. How does your tradition read the differences without losing the claim?`,
    ort: `Orthodox liturgy proclaims the resurrection as the center of faith. If the evidence were ambiguous, what would remain of the claim, and what would you want to say to someone who found it ambiguous?`,
    prot: `Position A’s historical case is the one your tradition favors. Test it against Position B’s strongest objections: the dates of the Gospels, the differing accounts, and the question of method.`,
    lut: `Luther spoke of faith resting on the promise, not on proof. Does the historical case matter to you? Compare Positions A and C.`,
    pen: `You live in an expectation of present miracles. Does that make the resurrection easier to believe, and do skeptics have a reason to say it makes it harder to evaluate?`,
    oth: `Jewish and Muslim readers have their own accounts of Jesus. What would a Jewish or Islamic reader say best explains the data in 1 Corinthians 15?`,
    any: `Write what would persuade you either way, before reading, and check whether any position gives it.`
  },
  positions: [
    {
      id: 'A', n: `Bodily resurrection (traditional)`, short: `God raised Jesus bodily`, who: `N. T. Wright, Gary Habermas, William Lane Craig, Richard Bauckham; Catholic, Orthodox and most Protestant theologians`,
      nearTo: ['cat', 'ort', 'prot', 'lut', 'pen'], farFrom: ['ath'],
      claim: `Jesus was physically raised from the dead on the third day. The best explanation of the empty tomb, the appearances and the rise of the church is that God did what the New Testament says he did.`,
      pass: [
        [`1 Corinthians 15:3–8`, `An early creed: Christ died, was buried, was raised on the third day, and appeared to Cephas, the Twelve, more than five hundred, James and Paul.`],
        [`Luke 24:36–43`, `The risen Jesus shows his hands and feet and eats fish, insisting he is not a ghost.`],
        [`Mark 16:1–8`, `The women find the tomb empty; the earliest Gospel ends with their fear.`],
        [`Acts 2:22–36`, `Peter’s public sermon in Jerusalem, a few weeks later, says that God raised the one they crucified.`]
      ],
      obj: [
        `The Gospel accounts differ on who went to the tomb, what they saw, and where Jesus appeared (Galilee or Jerusalem).`,
        `Miracles are by definition the least probable events, and historians cannot give them the weight they would need.`,
        `Paul lists his own experience (Galatians 1:16) with the others, which suggests the “appearances” were visionary.`
      ],
      hist: [
        [`c. 30–35 CE`, `Paul receives and passes on the creed in 1 Corinthians 15 (written c. 54–55).`],
        [`c. 70–95 CE`, `The four Gospels record empty-tomb and appearance stories in different forms.`],
        [`2nd c.`, `Apologists such as Justin and Tertullian defend the bodily resurrection against Gnostics and Greek critics.`],
        [`20th–21st c.`, `Wright’s *The Resurrection of the Son of God* (2003) and Habermas’ “minimal facts” argue the case in historical terms.`]
      ],
      assume: [
        `A personal God exists who can act in history.`,
        `The testimony of a few early followers can establish an event if no better explanation is available.`,
        `Resurrection in the first century meant bodily resurrection, so the claim is a claim about a body.`
      ],
      explains: [`Why a crushed movement began within weeks, and why it proclaimed a risen, not just a vindicated, Jesus.`, `Why the claim spread among Jews, who had no expectation of an individual resurrection before the end.`],
      struggles: [`The differences among the Gospel accounts, and the late date of some details.`, `The argument that a miracle claim needs far stronger evidence than ordinary historical claims.`],
      args: [
        {
          id: 'a1', claim: `The best explanation of the empty tomb, the appearances and the birth of the church is that Jesus was raised.`,
          ass: [[`The empty tomb is historical (an early tradition, with women as the first witnesses).`, `If the tomb story is a later legend, the argument loses a central datum.`], [`Alternative explanations have been tested and fail.`, `Each naturalistic alternative has defenders; the argument must show all fail, not only the weak versions.`]],
          fal: { n: `False dilemma`, why: `It sets “God raised him” against a few unattractive naturalistic stories, and leaves out the many other explanations nobody has thought of.`, def: `Defenders say they have to compare actual hypotheses, not hypothetical unknowns.` },
          ctr: [[`Other religious movements (Mormonism, Sabbatai Zevi’s followers, Cargo cults) have strong beliefs about extraordinary events.`, `Defenders note that those movements involved claims made at a distance from the events, not within weeks of a public execution; critics respond that the evidence for the speed is itself late.`]],
          resp: { C: `Historians answer that “best explanation” depends on the prior probabilities, which the argument assumes rather than shows, and that the sources are too late and too theological to support a strong historical conclusion.`, D: `Skeptics offer bereavement visions, the transformation of a hope in a vindicated martyr, and the legendary growth of an empty tomb story, none of which needs a miracle.` }
        },
        {
          id: 'a2', claim: `Paul’s list in 1 Corinthians 15 is so early that legendary development cannot explain it.`,
          ass: [[`Legendary growth needs generations.`, `Studies of oral tradition show that stories can change quickly, within months.`], [`Paul’s “appearances” were of the same kind as the Gospel stories.`, `Paul says nothing about the empty tomb, and a vision could fit his list.`]],
          fal: { n: `Argument from silence reversed`, why: `It treats the absence of evidence of change as evidence of no change.`, def: `Defenders say they do not rely on silence but on Paul’s positive claim that he checked with the apostles (Galatians 1:18–19).` },
          ctr: [[`The Gospels’ details of appearances differ and look more developed than Paul’s list.`, `Defenders say the differences are the ordinary marks of independent witnesses; critics say they show growth.`]],
          resp: { B: `Liberal Christian scholars agree Paul’s creed is early but hold that it can mean a vision of the exalted Christ, as Paul’s own experience shows.`, D: `Skeptics note that the early date shows the belief was sincere, not that the belief was caused by the event.` }
        }
      ]
    },
    {
      id: 'B', n: `Spiritual or visionary resurrection (liberal Christian)`, short: `Real, but not a resuscitated body`, who: `Marcus Borg, John Dominic Crossan, Rudolf Bultmann, Rowan Williams (in part)`,
      nearTo: ['que', 'spi', 'lut'], farFrom: ['pen'],
      claim: `The resurrection is real and central, but it is not a resuscitation of a corpse. It names the experience of the first followers that Jesus’ life and cause were vindicated and that he is present in the community, and that experience can be genuine without a physical tomb event.`,
      pass: [
        [`1 Corinthians 15:42–50`, `Paul describes a “spiritual body” and says flesh and blood cannot inherit the kingdom.`],
        [`Galatians 1:15–16`, `God was pleased “to reveal his Son in me”: Paul’s encounter is an inner revelation.`],
        [`Luke 24:13–35`, `Two disciples fail to recognize him until the breaking of bread, and he vanishes.`],
        [`Mark 16:7–8`, `The earliest ending has no appearance, only the promise “he is going before you.”`]
      ],
      obj: [
        `Paul’s word “raised” (egeirō) and the Jewish idea of resurrection are about bodies, and “spiritual body” (soma pneumatikon) means a body animated by spirit, not a non-body.`,
        `If the empty tomb were only a symbol, it is hard to explain why the earliest Christians insisted on it, in a society that took burial seriously.`,
        `The view can sound like a reinterpretation designed to rescue the faith from modern doubt, which is the same worry it levels at others.`
      ],
      hist: [
        [`1835`, `David Friedrich Strauss argues in *Life of Jesus* that the Gospel stories are myth expressing communal faith.`],
        [`1941`, `Bultmann’s call to “demythologize” treats the resurrection as the rise of faith in the preaching.`],
        [`1990s`, `The Jesus Seminar and Crossan/Borg popularize non-literal readings in the public square.`],
        [`2000s`, `Rowan Williams and others defend an “open” resurrection: real, but not available to historical proof.`]
      ],
      assume: [
        `Historical method cannot establish miracles, and the New Testament’s truth does not depend on that.`,
        `Religious experience can be true without a physical event.`,
        `Resurrection language is symbolic language.`
      ],
      explains: [`The variety of the stories and the vision-like quality of some of them.`, `Why the faith has meaning for people who cannot accept miracles.`],
      struggles: [`The fact that the first believers plainly meant a bodily event.`, `The strong tradition of an empty tomb, including its early and awkward witnesses.`],
      args: [
        {
          id: 'b1', claim: `Paul’s “spiritual body” and his own “appearance” show that the earliest experience was visionary, not a resuscitated corpse.`,
          ass: [[`Paul treats his experience as the same as the others’.`, `Paul says Christ appeared “last of all” to him (1 Corinthians 15:8), which may show it was equal or different.`], [`“Spiritual” means non-physical.`, `Greek contrast of pneumatikos and psychikos is about what governs the body, not what it is made of.`]],
          fal: { n: `Equivocation`, why: `“Spiritual body” is used to mean “not physical,” although in context it means “empowered by the Spirit.”`, def: `Defenders say even if the term allows both meanings, Paul’s sentence in 15:50 does contrast flesh with the kingdom.` },
          ctr: [[`Paul’s argument in 1 Corinthians 15 is that the dead body is “sown” and the new body “raised” (vv. 42–44).`, `The visionary reading answers that “sown/raised” is a metaphor for transformation, not a claim about a grave.`]],
          resp: { A: `Traditional readers answer that Paul’s Jewish background made “resurrection” bodily by definition; spiritual means transformed, not immaterial (Wright).`, D: `Skeptics say this position keeps the vocabulary while giving up the claim, which is reasonable but not what the disciples said.` }
        },
        {
          id: 'b2', claim: `Faith in the risen Christ is faith in what Jesus’ life means for the present, and does not depend on what happened to his body.`,
          ass: [[`The meaning can be separated from the event.`, `For Paul, the event is the ground of the meaning (15:14).`], [`Modern people need a non-literal reading to believe.`, `This is a claim about modern people, not about the text.`]],
          fal: { n: `Appeal to consequences`, why: `The reading is preferred because it makes belief easier, which says nothing about what happened.`, def: `Defenders say they are not choosing for convenience but for fidelity to what the text can bear.` },
          ctr: [[`The first martyrs died for a claim that Jesus was alive, not for a symbol.`, `Defenders say martyrs die for ideas all the time and sincerity does not require literalism.`]],
          resp: { A: `Traditional readers say 1 Corinthians 15 refutes it: Paul makes the faith depend on the event.`, C: `Historical critics note that the question of what Paul meant can be separated from the question of what is true, and that this view blurs them.` }
        }
      ]
    },
    {
      id: 'C', n: `Historical-critical agnosticism`, short: `Historians can establish only some points`, who: `E. P. Sanders, Dale Allison, Paula Fredriksen, Géza Vermes, Gerd Lüdemann (skeptical wing)`,
      nearTo: ['que'], farFrom: ['pen'],
      claim: `Historians can establish that Jesus was crucified, that his followers believed he appeared to them, and that the belief arose quickly. Method alone cannot decide what caused it, and most of the Gospel narratives bear marks of later growth.`,
      pass: [
        [`1 Corinthians 15:3–8`, `Our earliest evidence, from a witness who says he met others who had seen him.`],
        [`Mark 16:1–8`, `The oldest ending has an empty tomb and no appearances.`],
        [`Matthew 28:11–15`, `Matthew reports a Jewish counter-story that the disciples stole the body, so the tomb was already a point of debate.`],
        [`John 20:24–29`, `The doubt of Thomas shows that skepticism was part of the early tradition.`]
      ],
      obj: [
        `If historians refuse to reach a conclusion about the cause, they may be treating a methodological limit as a neutral position.`,
        `The agnostic reading can hide a prior commitment (naturalism) behind the word “method.”`,
        `Some of the “facts” (the empty tomb, burial by Joseph of Arimathea) are disputed even within this camp, so the position is less uniform than it looks.`
      ],
      hist: [
        [`1778`, `Reimarus’ posthumous fragments claim the disciples fabricated the resurrection, opening modern historical criticism.`],
        [`19th c.`, `Form criticism and source criticism trace the development of Gospel traditions.`],
        [`1985`, `Sanders’ *Jesus and Judaism* places Jesus as an apocalyptic Jewish prophet.`],
        [`2010s`, `Dale Allison’s *Resurrecting Jesus* surveys the evidence and leaves the question open, giving weight to the appearance traditions.`]
      ],
      assume: [
        `Historical method treats all events as having natural causes unless shown otherwise.`,
        `Ancient narratives were shaped by theology, and the earliest layers matter most.`,
        `Explaining belief is a historical task; deciding whether it is true is a different one.`
      ],
      explains: [`The differences among the Gospel accounts and the development from Mark to John.`, `Why historians who are believers and unbelievers can agree on the same minimal data.`],
      struggles: [`It can seem to dodge the question people actually care about.`, `It has to decide which data count as early, and that is itself contested.`],
      args: [
        {
          id: 'c1', claim: `Historians must treat the resurrection as they treat any other event: examine the sources, test the explanations, and assign probabilities, and by that method the claim is not established.`,
          ass: [[`Method-neutral history is possible.`, `Critics say methodological naturalism is a philosophical commitment, not a neutral tool.`], [`The prior probability of a resurrection is very low.`, `That depends on one’s view of God; Hume’s argument has been challenged by philosophers such as Earman, who think it is circular, and by others who defend it.`]],
          fal: { n: `Begging the question`, why: `A low prior for miracles builds in the conclusion that a miracle claim must lose.`, def: `Defenders say ordinary evidence is all anyone has, and the uniformity of experience is the best guide.` },
          ctr: [[`If a historian had the same evidence for a non-miraculous event, we would accept it.`, `Defenders reply that “same evidence” is just the point: extraordinary events need more.`]],
          resp: { A: `Traditional readers say method cannot exclude possibilities in advance, and the right conclusion depends on whether God exists, so the argument is not neutral.`, D: `Skeptics go further and say the evidence is less than the traditional case claims, because the sources are late and show growth.` }
        },
        {
          id: 'c2', claim: `The Gospels’ empty-tomb and appearance narratives show clear signs of development, so the details cannot be relied upon.`,
          ass: [[`Differences mean unreliability.`, `Differences among eyewitness accounts are normal in courtroom testimony.`], [`Late composition means invention.`, `Late composition may preserve early traditions (Bauckham on eyewitness sources).`]],
          fal: { n: `Hasty generalization`, why: `Some differences are taken to show all details are legendary.`, def: `Defenders say they distinguish a core (burial, empty tomb, appearances) from details.` },
          ctr: [[`Four accounts of the same battle or accident also differ, but we do not say the event was invented.`, `Critics reply that battles are not supernatural, so the standard of evidence is different.`]],
          resp: { A: `Traditional scholars (Bauckham, Keener) argue that the pattern of names and details fits eyewitness memory, and that disagreement is normal.`, D: `Skeptics say the stories grow in the telling in a regular way, from Mark’s fear to John’s feast.` }
        }
      ]
    },
    {
      id: 'D', n: `Naturalistic explanation (skeptical)`, short: `Belief arose by ordinary causes`, who: `Gerd Lüdemann, Bart Ehrman (as a historian), Richard Carrier, Michael Goulder; many secular scholars`,
      nearTo: ['ath'], farFrom: ['cat', 'ort', 'prot', 'lut', 'pen'],
      claim: `The belief that Jesus rose arose from ordinary human causes: grief and visions in a hopeful, apocalyptic community, the growth of an empty-tomb story, and the pressure to make sense of a shattered hope. No supernatural cause is needed.`,
      pass: [
        [`1 Corinthians 15:5–8`, `Paul uses the same verb “appeared” (ōphthē) for his own experience and the others’.`],
        [`Acts 9:3–9`, `Paul’s encounter is told as a light and a voice, which some readers see as a vision.`],
        [`Matthew 28:17`, `“Some doubted” even at the final appearance.`],
        [`John 20:11–16`, `Mary Magdalene fails to recognize him until he speaks.`]
      ],
      obj: [
        `Hallucination theories struggle with group experiences, and with the transformation of James and Paul, who were not obviously hopeful.`,
        `The theory has to postulate the legendary growth of the empty tomb within a few years, in the same city where the body would be known.`,
        `Different skeptics propose different explanations, which shows no single one is clearly best.`
      ],
      hist: [
        [`1778`, `Reimarus: the disciples stole the body and invented the story.`],
        [`19th c.`, `Strauss and Renan propose myth and subjective visions.`],
        [`20th c.`, `Festinger’s cognitive-dissonance studies (When Prophecy Fails) are applied to the disciples.`],
        [`21st c.`, `Ehrman and Lüdemann argue that grief visions and legend suffice.`]
      ],
      assume: [
        `Naturalism: events in the world have natural causes.`,
        `Ancient people, like modern ones, could have vivid experiences of the dead.`,
        `The burden of proof lies on whoever asserts a miracle.`
      ],
      explains: [`Why other religious groups have also had visions and legends.`, `Why the stories differ and develop in a regular direction.`],
      struggles: [`The speed and boldness of the proclamation in Jerusalem, and the willingness to die for it.`, `The conversion of skeptics (James, Paul), and the specificity of the tradition that women found the tomb.`],
      args: [
        {
          id: 'd1', claim: `Grief and bereavement visions are common, so the disciples’ experiences are well explained without a miracle.`,
          ass: [[`The visions were like modern bereavement experiences.`, `Those are typically private, one-person experiences, not group experiences of a body.`], [`The disciples had the expectation that makes such visions likely.`, `Jews did not expect a single person to rise before the end of the age.`]],
          fal: { n: `Weak analogy`, why: `Modern bereavement visions are compared to a claim of shared, repeated, bodily encounter, and the two differ in important ways.`, def: `Defenders say Paul’s account does not describe a body, and the analogy only has to cover what Paul says.` },
          ctr: [[`The tradition says Jesus ate with the disciples, which is different from a vision.`, `Skeptics say those traditions are late and can be legendary.`]],
          resp: { A: `Traditional scholars reply that group visions of a person, shared across many individuals and over weeks, have no modern parallel.`, C: `Agnostic historians agree that visions are possible but think the sources do not let us say more than that.` }
        },
        {
          id: 'd2', claim: `The empty tomb story grew from a tradition that did not originally include it.`,
          ass: [[`Paul’s creed omitted the tomb because it was not yet part of the story.`, `The phrase “was buried… was raised” implies a grave, though it does not mention it explicitly.`], [`Burial by Joseph of Arimathea is an invention.`, `Many historians accept it as unlikely to be invented, since a member of the Sanhedrin is an awkward hero.`]],
          fal: { n: `Argument from silence`, why: `The claim rests on what Paul does not say.`, def: `Defenders say the absence in a short creed is expected, not suspicious.` },
          ctr: [[`Women as first witnesses is an embarrassing detail that early Christians would not invent.`, `Skeptics say they may have been the first to claim a vision, and the detail does not show a miracle.`]],
          resp: { A: `Traditional scholars say the embarrassment of the female witnesses and the Jerusalem setting support an early tomb tradition.`, B: `Liberal Christians agree that the tomb stories may be late and still hold that the resurrection is real.` }
        }
      ]
    },
    {
      id: 'E', n: `Another religious account (Jewish and Islamic)`, short: `Jesus is not raised or divine`, who: `Jewish scholars (Geza Vermes, Pinchas Lapide on a unique view), Islamic tradition (Quran 4:157–158)`,
      nearTo: ['oth'], farFrom: ['prot', 'cat'],
      claim: `Jewish and Muslim traditions each treat Jesus as an important figure and each reject the Christian account of the resurrection. In Jewish thought a resurrection of one man in the middle of history does not fit messianic expectation; in the Quran, Jesus was not killed or crucified but raised to God.`,
      pass: [
        [`Daniel 12:2`, `The Hebrew Bible’s clearest resurrection text speaks of the general resurrection of the dead at the end.`],
        [`Isaiah 26:19`, `A hope of the dead living again, set in the end-time vision.`],
        [`Deuteronomy 21:22–23`, `A hanged man is “cursed,” which Paul takes up in Galatians 3:13 and Jewish readers see as a barrier to the messianic claim.`],
        [`Matthew 27:63–64`, `The authorities fear that the disciples will steal the body: the oldest counter-story.`]
      ],
      obj: [
        `The Jewish objection is theological as much as historical: the messiah did not bring the signs expected of the messianic age.`,
        `The Quranic denial of the crucifixion conflicts with the earliest non-Christian sources (Josephus, Tacitus), which say Jesus was crucified.`,
        `Both traditions are later than the events and arise within debates with Christians.`
      ],
      hist: [
        [`1st–2nd c.`, `Jewish writers reject the claim; the Toledot Yeshu counter-narratives appear later.`],
        [`7th c.`, `The Quran (4:157) says that they did not kill or crucify him, “but it was made to appear so to them.”`],
        [`Medieval`, `Jewish and Muslim polemics (Maimonides, Ibn Hazm) engage the Christian doctrine.`],
        [`20th c.`, `Jewish scholars (Vermes, Levine, Fredriksen) study Jesus as a Jew; Pinchas Lapide argues a Jewish believer can accept the resurrection as an act of God without accepting Christian doctrine.`]
      ],
      assume: [
        `God’s final redemption comes in the last days, not in one man’s death and rising.`,
        `The scriptures of one’s own tradition set the terms for judging claims.`,
        `A messiah is a person who fulfils the signs in the prophets.`
      ],
      explains: [`Why the earliest Jewish objections focus on messianic expectation, not only on history.`, `How the Christian claim looks from within a monotheism that does not accept incarnation.`],
      struggles: [`The positive explanation of why the Jesus movement began as it did.`, `The Islamic account’s conflict with first-century sources on the crucifixion.`],
      args: [
        {
          id: 'e1', claim: `Messianic expectation in Judaism was of a national and cosmic redemption, which Jesus’ death did not bring, so his followers’ claim cannot be right.`,
          ass: [[`The tradition’s expectations were fixed and uniform.`, `Second Temple Judaism had varied messianic ideas, including suffering and dying figures.`], [`The signs of the age were not met.`, `Christian readers say they are fulfilled in stages (already and not yet).`]],
          fal: { n: `Moving the goalposts`, why: `If every new reading of the prophets is allowed on one side and refused on the other, the test is no test.`, def: `Defenders say the standard is the text as the tradition has read it, not later reinterpretation.` },
          ctr: [[`Isaiah 53 describes a suffering servant, which Christians read as messianic.`, `Jewish readers say the servant is Israel, a reading that is attested in the tradition.`]],
          resp: { A: `Christians say the resurrection is the inauguration of the age to come, so the expected signs have begun, not failed.`, D: `Skeptics agree that the Christian claim does not match first-century expectations and note this makes it harder to say the disciples invented it.` }
        },
        {
          id: 'e2', claim: `The Quran’s account that Jesus was not crucified preserves a more faithful memory of what happened.`,
          ass: [[`The Quran preserves independent knowledge of events six centuries earlier.`, `Historians find no independent source behind the claim; it may reflect Docetic or other earlier traditions.`], [`The first-century sources are mistaken or biased.`, `Non-Christian sources (Josephus, Tacitus) also report the crucifixion.`]],
          fal: { n: `Appeal to authority`, why: `The claim depends on the authority of the text, not on independent evidence.`, def: `Defenders say that for a believer, authority is the evidence, and that this is also how Christians reason about the Gospels.` },
          ctr: [[`Josephus (Antiquities 18.64) and Tacitus (Annals 15.44) report that Pilate had him crucified.`, `Islamic scholars reply that those are reports of what people believed, not of what happened.`]],
          resp: { A: `Christian historians say the crucifixion is one of the best-attested events of antiquity.`, C: `Agnostic historians agree that the crucifixion is nearly certain, which does not decide the resurrection.` }
        }
      ]
    }
  ]
};
