# Beneath the Deep — a rigorous Bible study

A static, no-build web app: a Bible reader with rainbow cross-reference arcs (KJV + Apocrypha, BSB, ASV), a Daily study that rotates through 24 handcrafted deep dives plus a computed "Thread of the Day", 9 study tracks (30 lessons, including an 8-session seminar through *Beneath the Absolute*), Big Questions, an Argument Lab, a Belief Map, a Library of Voices, reading plans, daily check-ins, XP, achievements and a profile. Installable as a PWA. All progress stays in the browser (localStorage).

## Deploy on GitHub Pages (repo root)
1. Unzip and copy **everything** (including the hidden `.nojekyll`) into the root of your repo.
2. Commit and push.
3. Repo → Settings → Pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)`.
4. Open `https://<user>.github.io/<repo>/`.

All paths are relative, so it works under any repo subpath.

## Test locally
`python3 -m http.server 8000` in this folder, then open http://localhost:8000

## Adding content
- Daily studies: `content/daily1.js`, `daily2.js` (add a file and import it in `content/daily.js`). The day's study is `dayNumber mod N`.
- Tracks/lessons: `content/tracks1.js`, `tracks2.js`. Questions, Lab arguments, Library voices: `content/questions.js`, `lab.js`, `library.js`.
- Unit schema: `t` title, `k` kicker, `ref[]`, `tag`, `c` comfortable reading, `f` fracture, `d[]` dig, `v[[who,text]]`, `b[claim,pushback]`, `q[]`, `s[prompt,left,right]`, `p` practice, `src[]`.
- After changing code, bump `VERSION` in `sw.js` so installed copies refresh.

## Credits & licences
Berean Standard Bible, KJV (with Apocrypha) and ASV are public domain, via scrollmapper/bible_databases. Cross-references from OpenBible.info (CC-BY). Scholarly citations are pointers for further reading; verify details against the works themselves.
