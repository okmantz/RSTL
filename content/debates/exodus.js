// Debate: Did the Exodus and conquest happen?
export default {
  id: 'exodus',
  q: `Did the Exodus and the conquest of Canaan happen?`,
  intro: `Exodus and Joshua tell of Israel’s slavery in Egypt, escape through the sea, forty years in the wilderness and a campaign that destroys the cities of Canaan. Archaeology of the last century has made this one of the sharpest tests of how the Bible and history relate.`,
  settled: [
    `No Egyptian text mentions Israel’s enslavement, the plagues, or an escape of a large group, and there is no archaeological trace of a mass wilderness encampment.`,
    `The Merneptah Stele (c. 1208 BCE) names “Israel” as a people in Canaan: the earliest known mention outside the Bible.`,
    `Early Israelite highland villages appear in the 12th–11th c. BCE with a material culture continuous with Canaanite lowland culture, and without signs of a sudden invasion.`
  ],
  open: [
    `Whether a small group of Egyptian-connected people (perhaps the origin of the Exodus memory) joined the early Israelite population.`,
    `Whether the Joshua accounts preserve any historical memory of destruction (Hazor) or are mostly later theological writing.`,
    `How to weigh the absence of evidence in the wilderness, where little would be expected to survive.`
  ],
  honest: `Honest note: on the archaeology, the mainstream position is that the Exodus and conquest did not happen as narrated. That is not a fringe or anti-religious view; it is held by most archaeologists, including many believers. Defenders of historicity are a minority, and arguments for the traditional picture need to say why the usual expectations of evidence do not apply.`,
  press: {
    ath: `Do not stop at “it did not happen.” Ask why a people would remember an escape from slavery as foundational, and what that says about the origins of the story.`,
    que: `If you were taught that archaeology proves the Bible, you were probably told something false. Compare Positions A and D, and ask what survives of the story’s meaning.`,
    spi: `Does the story matter as myth for you? Compare Position D’s reading of it as foundation myth with how you read other traditions’ stories.`,
    cat: `The Church has long read the Exodus allegorically (baptism, Easter). Does that make the historical question matter less to you, and should it?`,
    ort: `The Exodus is central to Orthodox Paschal liturgy. Does the liturgy depend on historical events, or on the typology? Test Position D against your tradition’s own reading.`,
    prot: `If your confidence in the Bible rests on historical accuracy, Position A needs to answer the archaeological evidence honestly. If it rests on something else, what is it?`,
    lut: `Luther read the Old Testament as testimony to Christ. How does that frame the historical question, and does it make Position D more or less tolerable?`,
    pen: `You expect God to act in history. Does the absence of evidence for the Exodus trouble that, or is it beside the point? Compare Positions A and C.`,
    oth: `The Exodus is central to the Jewish Passover, and Muslims honor Musa (Moses). How does your tradition hold historical doubt together with a story told as memory?`,
    any: `Ask what would convince you either way, and whether the same standard applies to other ancient migrations and origin stories.`
  },
  positions: [
    {
      id: 'A', n: `Traditional historicity`, short: `It happened substantially as told`, who: `Kenneth Kitchen, James Hoffmeier, Bryant Wood, many evangelical scholars`,
      nearTo: ['prot', 'pen'], farFrom: ['ath', 'que'],
      claim: `The Exodus and the conquest happened in broad outline. Egyptian local color in the stories, evidence of Semitic populations in the Delta, and the Bible’s own claim to history make this the best reading, and the absence of evidence is not evidence of absence.`,
      pass: [
        [`Exodus 12:37–41`, `Six hundred thousand men on foot, besides women and children, leave Egypt.`],
        [`1 Kings 6:1`, `The temple was begun “in the four hundred and eightieth year after the people of Israel came out of Egypt” (early date, c. 1446 BCE).`],
        [`Joshua 6:1–21`, `The walls of Jericho fall and the city is taken.`],
        [`Deuteronomy 26:5–9`, `A confession recited at the offering of firstfruits recalls the descent into Egypt and the deliverance.`]
      ],
      obj: [
        `No Egyptian record mentions the plagues, the slavery of a Semitic nation, or a large exit, and the large numbers (Exodus 12:37) would have left clear traces in Sinai.`,
        `Jericho and Ai were not occupied cities at the time of the conquest as dated by either chronology.`,
        `The early date (1446) and the late date (c. 1250) have both been proposed, and neither fits the archaeological record without strain.`
      ],
      hist: [
        [`Antiquity`, `Jewish and Christian tradition treats the Exodus as history; Josephus retells it.`],
        [`1930s`, `John Garstang and later Kathleen Kenyon dig at Jericho; Kenyon’s conclusions (1950s) leave little to support the conquest as told.`],
        [`1996`, `Kitchen’s case for a Ramesside setting, and Hoffmeier’s studies of Egyptian background (*Israel in Egypt*, 1996).`],
        [`21st c.`, `Debate continues over the “conquest” in the Joshua narratives and the Merneptah Stele.`]
      ],
      assume: [
        `The Bible is a reliable historical record unless shown otherwise.`,
        `The archaeological record is incomplete, especially for nomads and for Egyptian records of embarrassing events.`,
        `A God who acts in history can leave a footprint that does not look like normal archaeology.`
      ],
      explains: [`Why the Bible gives so much detail of Egyptian names and places, and why Israel remembered slavery.`, `Why a people’s identity centers on an escape from servitude.`],
      struggles: [`The lack of archaeological confirmation for the number, the route, and the destruction of Jericho and Ai.`, `The conflict between the Joshua accounts of total conquest and the Judges accounts of continued coexistence.`],
      args: [
        {
          id: 'a1', claim: `Absence of evidence is not evidence of absence, especially for a nomadic group in a desert.`,
          ass: [[`The evidence one would expect would not survive.`, `For a few thousand people in Sinai that may be true; for six hundred thousand men (Exodus 12:37), it is not.`], [`The Egyptian records would have mentioned it.`, `Egyptian records rarely record humiliations, so silence there is weak evidence.`]],
          fal: { n: `Argument from ignorance`, why: `The claim moves from not having found evidence to saying it may exist, without saying why it would be found.`, def: `Defenders say the point is limited: lack of proof does not disprove, and they offer positive arguments (Egyptian names and settings).` },
          ctr: [[`Archaeologists have found traces of far smaller and less well-documented groups, such as the Neolithic hunters of the Sinai region.`, `Defenders say the Sinai has been surveyed only partly, and identification is uncertain.`]],
          resp: { B: `Minimalists say that where evidence should be found and is not (Jericho, Ai, Kadesh Barnea at the right dates), absence is informative.`, D: `Mainstream archaeologists say the combined silences are more than coincidence: the claim of absence is cumulative.` }
        },
        {
          id: 'a2', claim: `Egyptian background details in Exodus (names, the Delta setting, brick-making, slave labor) fit the Ramesside period, which shows it preserves memory.`,
          ass: [[`These details are specific to the period.`, `Many are generic to Egypt, and the text could have been composed with later knowledge of Egypt.`], [`An accurate setting implies accurate events.`, `A historical novel can have accurate setting and invented events.`]],
          fal: { n: `Non sequitur`, why: `Accurate details show an author who knew Egypt, not that the main event occurred.`, def: `Defenders say they are cumulative evidence, to be weighed with others.` },
          ctr: [[`The city Pi-Ramesses (Exodus 1:11) is named, and it was built around 1270 BCE, and abandoned c. 1100.`, `Defenders say that fits a 13th century Exodus; critics say it shows a story shaped no earlier than that, and probably later, as in the 7th century when the Delta was well known to Israel.`]],
          resp: { B: `Moderate scholars say a small group with Egyptian memories is the likely origin of the tradition, which is consistent with the details.`, D: `Literary scholars say the details show the author’s world, not the world of the events.` }
        }
      ]
    },
    {
      id: 'B', n: `Historical kernel (small group)`, short: `A small group, and a memory that grew`, who: `Richard Elliott Friedman, Nadav Na’aman, Ronald Hendel, James Hoffmeier (in part), William Dever (a version)`,
      nearTo: ['cat', 'ort', 'lut', 'que'], farFrom: [],
      claim: `The story is based on a real but small event: a group of Semitic people (perhaps the Levites or a related clan) left Egypt and joined the early Israelites, bringing a memory that became the nation’s story. The numbers, miracles and conquest are later amplification.`,
      pass: [
        [`Exodus 15:1–18`, `The Song of the Sea, widely seen as one of the oldest poems in the Bible, celebrates the escape.`],
        [`Exodus 6:16–25`, `Levitical genealogies and Egyptian names (Moses, Phinehas, Hophni) suggest a Levite link to Egypt.`],
        [`Deuteronomy 26:5–9`, `The creedal recital of origin: a “wandering Aramean” and deliverance from Egypt.`],
        [`Hosea 12:9, 13`, `An 8th-century prophet already knows the tradition of the Exodus and Moses.`]
      ],
      obj: [
        `The kernel hypothesis cannot be tested: it fits the evidence by being small enough to leave no trace, which makes it hard to refute.`,
        `The Song of the Sea’s date is debated, and some place it in the 10th–6th c.`,
        `Egyptian names among Levites show Egyptian contact, not an exodus.`
      ],
      hist: [
        [`1940s`, `Martin Noth’s traditio-historical studies treat the Exodus as one of the earliest themes of the Pentateuch.`],
        [`1990s–2000s`, `Friedman (*Who Wrote the Bible?* and *The Exodus*, 2017) suggests the Levites came from Egypt.`],
        [`2000s`, `Hendel and others argue for “cultural memory” with a kernel in the Hyksos period or Ramesside Egypt.`],
        [`21st c.`, `Archaeologists describe the Exodus as a story that may preserve a distant memory without being literal.`]
      ],
      assume: [
        `Stories of national founding typically contain memory of something.`,
        `Oral tradition can preserve and transform small events.`,
        `The story’s persistence suggests an origin.`
      ],
      explains: [`Why the Exodus is so central and early in Israelite tradition (Hosea, Amos), and why there is Egyptian color in it.`, `Why archaeology sees continuity with Canaanite culture, yet the Bible remembers coming from elsewhere.`],
      struggles: [`It can never be confirmed, so it risks being unfalsifiable.`, `It does not explain the specific details (names, the route, the sea crossing).`],
      args: [
        {
          id: 'b1', claim: `The Exodus tradition is too embarrassing and too central to have been invented from nothing: nations rarely claim to descend from slaves.`,
          ass: [[`National founding stories avoid shame.`, `Many peoples celebrate humble origins as a form of identity, and the “slave” story may serve theology (God of the oppressed).`], [`The Exodus tradition is early.`, `Its early attestation (Hosea) is 8th century, five centuries after the supposed event.`]],
          fal: { n: `Argument from embarrassment (criterion of dissimilarity misapplied)`, why: `Embarrassment is treated as proof of historicity, though a legend can be built around a humble origin because it is useful.`, def: `Defenders say they do not claim proof, only that the probability is raised.` },
          ctr: [[`Rome’s story of descent from a Trojan refugee and a she-wolf’s foster child, or Athens’ autochthony, are founding myths with no kernel of history.`, `Defenders say those are not stories of slavery, which is rarer.`]],
          resp: { A: `Traditionalists welcome the point and ask why it should stop at a kernel.`, D: `Minimalists say the story’s function (identity and ideology after the monarchy) explains it better than a historical origin.` }
        },
        {
          id: 'b2', claim: `Egyptian names and Levite connections show some people in early Israel came from Egypt.`,
          ass: [[`Names like Moses, Phinehas and Hophni are Egyptian in origin.`, `They are, but Egyptian names were common among Semites in Egypt and also appear in Canaan through contact.`], [`These names belong to the Exodus generation.`, `They are attributed to it in later texts, so the argument is circular.`]],
          fal: { n: `Circular reasoning`, why: `The Levitical genealogies are used both as evidence for the Exodus and as products of an Exodus tradition.`, def: `Defenders say Egyptian names are not what a later tradition would invent for founders.` },
          ctr: [[`Egyptian names appear in Canaan and Israel throughout the Late Bronze and Iron Age because of Egyptian rule over Canaan until c. 1150.`, `Defenders say that weakens, but does not remove, the argument.`]],
          resp: { A: `Traditionalists say these are small pieces of a larger picture they find coherent.`, C: `Revolt or indigenous theorists say Egyptian rule over Canaan explains the names without any exodus.` }
        }
      ]
    },
    {
      id: 'C', n: `Indigenous emergence (revolt or settlement)`, short: `Israel arose within Canaan`, who: `George Mendenhall, Norman Gottwald, Israel Finkelstein, William Dever (partly), Avraham Faust`,
      nearTo: ['que'], farFrom: ['prot', 'pen'],
      claim: `Israel did not conquer Canaan from outside. Early Israelites were largely local people (Canaanites, pastoralists, displaced villagers) who settled the highlands at the end of the Bronze Age and gradually formed a distinct identity.`,
      pass: [
        [`Judges 1:19–36`, `A list of cities Israel could not take, which contradicts the sweeping conquest of Joshua.`],
        [`Joshua 24:2, 14–15`, `Joshua says the ancestors served other gods beyond the River and in Egypt.`],
        [`Judges 5`, `The Song of Deborah lists tribes fighting together in the highlands, without a wilderness crossing.`],
        [`Joshua 9`, `The Gibeonites make a treaty and live among Israel, showing coexistence.`]
      ],
      obj: [
        `The Bible’s tradition that Israel came from elsewhere requires explanation, and “indigenous” does not account for it.`,
        `The evidence for Israelite ethnic identity (no pig bones, collar-rim jars) is debated, and the distinct cultural features may not be exclusive.`,
        `Revolt models (Mendenhall, Gottwald) depend on sociological assumptions about peasant revolt for which there is little direct evidence.`
      ],
      hist: [
        [`1950s`, `Albright’s conquest model, based on destruction layers, dominates.`],
        [`1962`, `Mendenhall proposes a peasants’ revolt; Gottwald elaborates it as a social revolution.`],
        [`1988`, `Finkelstein’s *The Archaeology of the Israelite Settlement* surveys the highland villages.`],
        [`2010s`, `Faust and others study the ethnic markers and population movements of Iron I.`]
      ],
      assume: [
        `The best evidence is material remains, not later texts.`,
        `Peoples usually form from local populations, not from invasions.`,
        `Religious identity can be constructed after the fact.`
      ],
      explains: [`The continuity of pottery and architecture with Canaanite culture, and the lack of destruction layers across the highlands.`, `The tension between Joshua and Judges in the Bible itself.`],
      struggles: [`Why such an identity forms around memory of slavery and a god from the south (Judges 5:4; Habakkuk 3:3).`, `The origin of the worship of YHWH, who may have come from the southern desert (Edom, Midian).`],
      args: [
        {
          id: 'c1', claim: `The material culture of the early highland villages is continuous with Canaanite culture, so the people were not invaders.`,
          ass: [[`Material culture reflects ethnic identity.`, `Pots do not equal people; groups can adopt a local culture.`], [`The villages are Israelite.`, `That identification itself rests on the Merneptah Stele and later texts.`]],
          fal: { n: `Hasty generalization`, why: `Continuity in some pottery and architecture is taken to show continuity in the whole population.`, def: `Defenders say they use many lines of evidence (settlement patterns, language, diet) that agree.` },
          ctr: [[`Some features, such as the absence of pig bones and the four-room house, point to a distinct group.`, `Defenders say these may be ecological or economic, not ethnic.`]],
          resp: { A: `Traditionalists say that continuity with Canaan is not what one would expect if a new people had arrived with new customs.`, B: `Kernel scholars say a small group could join a native population without changing its material culture.` }
        },
        {
          id: 'c2', claim: `The accounts in Joshua and Judges contradict each other, showing the conquest narrative is a later literary construction.`,
          ass: [[`Joshua claims a complete conquest.`, `Joshua also notes that land remained (13:1–6), so even it is mixed.`], [`Contradiction shows a late layer.`, `Ancient texts can hold two views at once.`]],
          fal: { n: `Affirming the consequent`, why: `Contradiction would follow from late composition, but it could also follow from other causes, such as hyperbole in war reports.`, def: `Defenders say they compare explanations and note ancient war rhetoric as itself a literary feature.` },
          ctr: [[`Ancient Near Eastern war reports (Merneptah, Mesha) claim total destruction while describing partial results.`, `Defenders say this supports the view that “conquest” is rhetoric, which is their point.`]],
          resp: { A: `Traditionalists answer that Joshua’s totalizing language is hyperbole of the kind found in ANE annals, and that Judges describes the long process.`, D: `Literary scholars add that the conquest account serves a purpose in the late monarchy or exile.` }
        }
      ]
    },
    {
      id: 'D', n: `Literary and theological memory`, short: `A founding story, written later`, who: `Thomas Römer, Mark Smith, Jan Assmann (cultural memory), Israel Finkelstein and Neil Silberman, Thomas Thompson`,
      nearTo: ['que', 'ath', 'spi'], farFrom: ['prot', 'pen'],
      claim: `The Exodus and conquest are best read as a foundational narrative composed mainly in the 8th–6th centuries BCE, shaped by Assyrian and Babylonian pressure and by Judean concerns, and meant to say who Israel is, not to report events.`,
      pass: [
        [`Deuteronomy 7:1–6`, `Commands to destroy the nations are phrased in the idiom of Assyrian treaty and loyalty oaths.`],
        [`2 Kings 22–23`, `King Josiah’s reform and the discovery of the book of the law (c. 622 BCE) frame the likely time of writing.`],
        [`Exodus 1:11`, `Pithom and Ramesses are named, cities known from the Delta, which suggest a writer who knew the region.`],
        [`Hosea 11:1`, `“Out of Egypt I called my son”: Israel’s story as a story of God’s love, not a record.`]
      ],
      obj: [
        `Late composition does not exclude earlier memory, and some details look older than the 7th century.`,
        `The view can overstate the Assyrian parallels and ignore earlier sources.`,
        `If the story is “only” literary, it must explain why it was believed to describe a real past.`
      ],
      hist: [
        [`1970s`, `Thomas Thompson and John Van Seters challenge the historicity of the patriarchal and Exodus narratives.`],
        [`2001`, `Finkelstein and Silberman’s *The Bible Unearthed* popularizes the view that the story was shaped in the 7th century.`],
        [`2000s`, `Assmann’s “mnemohistory” studies how the Exodus has been remembered and used.`],
        [`2010s`, `Römer and Smith examine how Egyptian and Assyrian influence shaped Israel’s texts.`]
      ],
      assume: [
        `Texts reflect the time in which they were written, not the time they describe.`,
        `Archaeology and texts should be compared, not harmonized.`,
        `Cultural memory shapes the past to serve present needs.`
      ],
      explains: [`Why the story’s themes (oppression, liberation, obedience, the land) fit the 7th-century experience of Judah under empire.`, `How the Exodus functions as a foundation for law, worship and ethics.`],
      struggles: [`How a story so deeply rooted could arise without some earlier basis.`, `The danger of replacing one grand narrative (historical) with another (ideological).`],
      args: [
        {
          id: 'd1', claim: `The accounts of Exodus and Joshua serve the interests of late-monarchy Judah, which makes them more likely to be propaganda than memory.`,
          ass: [[`A narrative that serves a purpose is therefore not history.`, `Many true histories also serve purposes.`], [`The composition is mostly 7th century.`, `Dating is debated, and some scholars argue for earlier sources.`]],
          fal: { n: `Genetic fallacy`, why: `The motive for telling the story is treated as proof that it is untrue.`, def: `Defenders say they do not argue from motive alone but from the lack of external evidence.` },
          ctr: [[`National histories always serve interests, and historians still extract data from them.`, `Defenders say the extraction is what the “kernel” theory does, and that this one finds little to extract.`]],
          resp: { A: `Traditionalists say this approach prefers silence to testimony and that Israel’s own records deserve a hearing.`, B: `Kernel scholars say the story may be both purposeful and rooted in memory.` }
        },
        {
          id: 'd2', claim: `A story can be true in meaning and theology even if it is not history.`,
          ass: [[`The meaning does not depend on the event.`, `For Paul and for Jewish liturgy, the claim that God acted in history is part of the meaning.`], [`Faith can survive the loss of historicity.`, `For some readers it cannot, which is why the question matters.`]],
          fal: { n: `Motte-and-bailey`, why: `The claim retreats from “it happened” to “it means something” when pressed, though the story asserted the first.`, def: `Defenders say it is a clear statement of what kind of text this is, not a retreat.` },
          ctr: [[`Paul (1 Corinthians 15:14) says that if the resurrection did not happen, faith is futile, and the Exodus is the parallel founding event of the older covenant.`, `Defenders say the cases differ: Paul’s claim is a first-century one about a recent event.`]],
          resp: { A: `Traditionalists say a God who “acts in history” in the Bible’s own terms cannot be preserved by treating the acts as symbols.`, B: `Moderate scholars agree that the story is meaningful and note that it can preserve a real kernel.` }
        }
      ]
    },
    {
      id: 'E', n: `Skeptical or secular view`, short: `A myth, like other founding myths`, who: `Many secular historians and archaeologists; Hector Avalos, Israel Finkelstein (in his skeptical modes); popular skeptics`,
      nearTo: ['ath'], farFrom: ['prot', 'cat', 'ort', 'lut', 'pen', 'oth'],
      claim: `The Exodus and conquest are legends, comparable to the origin myths of other peoples, and the biblical writers had no historical knowledge of these events. The stories of divine violence in Joshua are a moral problem for any believer who takes them as God’s will.`,
      pass: [
        [`Exodus 7:14–12:30`, `The ten plagues are presented as the deeds of a God who kills Egypt’s firstborn.`],
        [`Joshua 10:40`, `“He left none remaining, but devoted to destruction all that breathed.”`],
        [`Numbers 31:15–18`, `Moses commands the killing of all but virgin girls after a war with Midian.`],
        [`Deuteronomy 20:16–17`, `Cities of the peoples are to be devoted to destruction.`]
      ],
      obj: [
        `The view risks treating all ancient national stories as worthless, though they preserve valuable evidence of how people understood themselves.`,
        `It must account for Israel’s early identity and for the Merneptah Stele without any such story.`,
        `Moral judgments about the text are not historical arguments, and it needs to distinguish them.`
      ],
      hist: [
        [`18th c.`, `Deists and critics challenge the plausibility of the plagues and the Exodus numbers.`],
        [`20th c.`, `Archaeology (Kenyon, Finkelstein) removes support for the conquest as told.`],
        [`1990s`, `The “minimalist” school (Davies, Lemche, Thompson) argues for a late and imaginative origin of Israel’s history.`],
        [`2010s`, `Public debate about the Bible and archaeology grows with popular books and documentaries.`]
      ],
      assume: [
        `Claims about divine intervention require ordinary evidence.`,
        `Origin myths are typically legendary.`,
        `Morality is not derived from a divine command.`
      ],
      explains: [`Why there is no evidence of a mass exodus, plagues or the destruction of the cities.`, `Why the book of Joshua is morally unsettling when read as a divine command.`],
      struggles: [`The existence of the Merneptah Stele and of a real Israel in the 13th century.`, `Why a legend would produce a law and ethical code with enduring influence.`],
      args: [
        {
          id: 'e1', claim: `Since there is no evidence outside the Bible for the plagues, the exodus or the conquest, the sensible conclusion is that they did not occur.`,
          ass: [[`If it had occurred, we would have independent evidence.`, `Sources for the period are sparse; defenders say it is a poor test.`], [`A single source is not enough.`, `That is the standard for historians of all ancient events, not only the Bible.`]],
          fal: { n: `Argument from silence`, why: `The absence of evidence is treated as conclusive, which holds only when evidence should exist.`, def: `Defenders say it is not only silence: the positive evidence (settlement patterns, Jericho, Ai) goes against the story.` },
          ctr: [[`Egyptians did not record defeats and the Egyptian Delta has been poorly preserved.`, `Defenders say that explains some silence, not all.`]],
          resp: { A: `Traditionalists say the standard is applied unevenly and that every ancient event relies on few sources.`, D: `Literary scholars add that the question of why the story was written is more productive than proving it false.` }
        },
        {
          id: 'e2', claim: `A God who commands the destruction of the Canaanites is a morally troubling God, so the text cannot be a revelation of a perfectly good being.`,
          ass: [[`The commands are historical commands.`, `If the conquest never happened as told, the commands are not a record of divine acts but a literary construct.`], [`Violence is always wrong.`, `Many ethical systems accept some violence, and the question is the standard.`]],
          fal: { n: `Equivocation`, why: `“God commanded it” moves between “the text says so” and “it occurred,” which are different claims.`, def: `Defenders say the moral problem applies to the text as scripture regardless of whether it happened.` },
          ctr: [[`Some Jewish and Christian interpreters read these commands as hyperbole or as symbolic of the struggle against evil.`, `Skeptics say that is an apologetic move, and defenders say it is a reading with ancient roots.`]],
          resp: { A: `Traditionalists defend the conquest as judgment on wicked nations and note that it was a limited and special case.`, B: `Kernel scholars say the conquest accounts are largely theological and that the moral problem lies in their reception, not in an event.` }
        }
      ]
    }
  ]
};
