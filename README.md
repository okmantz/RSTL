# RSTL
### Rethinking Spiritual Truth & Literature

A free reading and study app for anyone curious about the Bible and the texts around it. Believer, atheist, questioning, Catholic, Orthodox, Protestant, Lutheran, Pentecostal, something else: you are all welcome, and nothing here asks you to believe anything.

**What you get**

- **A different study every day for about three years.** Over 1,100 days walk through the whole Bible and the Apocrypha. Sixty are handwritten deep dives with cross-references; the rest are guided readings with the text, word patterns, threads to other passages, and the hard questions.
- **A reader that connects everything.** Three translations plus the KJV Apocrypha, with every verse linked to the rest of Scripture by cross-reference.
- **Room to push back.** Steelman an idea, answer in another voice (a sceptic, a believer, a historian, a child), write a prayer or reflection, ask your own questions, reply to your past self, and mark what to dig into later.
- **Study tracks, an argument lab, big questions and a belief map** to test what you hold.
- **More texts to explore:** the Apocrypha, canon history, Second Temple writings, the Church Fathers, other scriptures, ancient Near Eastern texts and literature that argues with the Bible.
- **Five short questions to start.** They set where your path begins and how hard the studies push. Change them any time.

**Private by design.** Everything is stored on your device. No account, no tracking.

**Try it:** open the app, answer the questions, and begin today’s study.

Study content draws on *Beneath the Absolute* by O.K. Mantz, and on the scholarship named in each study. Positions are offered for examination, not endorsement.

---
<sub>Hosting it yourself: copy this folder to the root of a GitHub repo and turn on Pages (Settings → Pages → deploy from branch). It is a plain static site; to run it locally use `python3 -m http.server`. Bible texts are public domain (BSB, KJV, ASV); cross-references are from OpenBible.info (CC-BY).</sub>

## v3 additions

- **Original text**: read any chapter in English, original Hebrew/Greek, word-by-word, or parallel; tap a word for its lemma, morphology, meaning and every occurrence (`#/word/H2617`).
- **Deeper daily studies**: every daily now includes the original-language view, translation-divergence analysis, a cross-reference web, repeated-word analysis, a "pick the verse" exercise, a book dossier facet and sources. About 257 key chapters have hand-written notes.
- **Journal entries**, **profile photo picker**, **onboarding "Other"**, **cleaner Book Guides**, and a **Share this app** section on the profile page.

### Data and attribution

`data/orig/` (about 31 MB, 95 files) holds the original-language text. The whole folder must be uploaded for the Original and Word-by-word modes to work.
Original-language data: STEPBible / Tyndale House Cambridge, CC BY 4.0 (https://github.com/STEPBible/STEPBible-Data).

## v4 additions
- **"Go deeper" layer** for guided readings: a headline thesis, a multi-paragraph analysis with outside scholarship and cross-testament connections, a "Cross-references worth the trip" list (each reference opens in the reader), extra reflection questions, and one interactive exercise per reading (predict, choose, rate, or rewrite). Responses are saved with the day, appear in the Journal, and count toward XP. Content lives in `content/dd_*.js`; `content/dd.js` merges them. Readings without an entry fall back to the standard guided template.
- Cross-chapter references (e.g. "Isaiah 44:28–45:1") now link correctly.
- Fact fixes: 2 Maccabees 12:38-45 range, 2 Esdras 7:48 verse numbering note.
- Backup import now rejects files that aren't RSTL backups. Service worker cache bumped to `rstl-v4`.

## v5 additions
- **Reader controls never clip.** The reader toolbar is now three tidy rows (book + chapter, translation + text size, text view), and the text-view switch, verse-panel tabs and all other segmented controls wrap onto a second line instead of hiding options off-screen on narrow phones. Service worker cache bumped to `rstl-v5`.

## v6 additions: interface redesign
- **New design system** (`css/app.css`): refined dark, light and sepia themes, consistent spacing, radii, elevation, focus rings, custom sliders and selects, WCAG-friendlier muted text colours.
- **New app shell**: icon navigation, one-tap theme switcher, profile chip with level and streak, bottom tab bar with active indicator on phones, reading-progress line, back-to-top button, skip link, page transitions.
- **Keyboard shortcuts**: `/` opens search, `←` / `→` move between chapters or days, `Esc` closes the verse panel.
- **Home dashboard**: today's study, check-in, level, 7-day activity strip, stats, continue and "left open" cards, colour-tinted navigation tiles.
- **Reader**: tidy toolbar card, chapter header with previous/next buttons, comfortable reading width, Old / New / Apocrypha filter on the book list.
- **Study hub** grouped into Courses, Test your thinking, and Other voices; consistent back links and page headers; onboarding with step count; profile settings as clear rows with a visual theme picker.
- Service worker cache bumped to `rstl-v6`.

## v7: Explore

- **Debate engine** (`#/debate`): five structured debates (salvation, resurrection, scripture, Jesus, Exodus). Every position has passages, objections, history, assumptions, strengths and weaknesses, plus a Challenge workbench (test assumptions, spot the fallacy, counterexamples, another perspective). Content in `content/debates/`.
- **Timeline and 3D places** (`#/timeline`, `#/place/:id`): 11 eras, 48 events, and four explorable canvas-3D models (Ur, tabernacle, Solomon's Temple, Herod's Temple) via `js/viewer3d.js`.
- **Ancient texts** (`#/texts`): 46 texts in 7 collections, each split into canonical status, historical evidence, traditional attribution and scholarly uncertainty.
- **My Thinking** (`#/mind`): propositions with evidence profiles, confidence, and periodic Intellectual Evolution reviews.
- **Challenge me** (`#/challenge`): the hardest questions for each tradition, from `content/challenges.js`.
- Design layer in `css/v7.css`. Service worker is `rstl-v7`.
