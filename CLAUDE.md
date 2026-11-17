# RMO Revision

Static PWA (no build step) for an Indian-trained doctor preparing to work as an RMO in Australia. Hash router in `app.js`, content in `data.js` and `recall.js`, study tools in `tools/`, case data in `tools/cases/`.

- Clinical content is Australia-first: check doses against Australian sources and say plainly what could not be verified.
- Refreshing on-call cases from the user's weak points: follow `CASES.md`.
- Bump the cache name in `sw.js` whenever files change, then push to `main` and confirm the Vercel deployment.
- Recall checklists (`recall.js`): every item has a section `g` (R recognise, A assess and investigate, T treat now, C complications and traps, F after and follow-up) and items are listed in the order you would think them through on the ward, not by importance. Mark must-know items with `p: 1`. Source `s: "k"` means written from the topic's Study Kit (name any Australian source inside `k`). Each card's `t` is a full question that its `k` fully answers (see "Card question rule" in `CASES.md`). Write `k` as short lines separated by `\n` (one idea per line, `Label: text` for a bold label, `→` for order or cause and effect, a line starting with `(` is a small note); never drop a number, dose or source note to make it shorter.
- Card context (`ctx`) and "Make this a case" requests (`caseReq`) sync in the state: process them with `scripts/requests.py` and the last section of `CASES.md`.
- Highlights saved in study tools and the user's 'what I missed' notes live in the synced state (`highlights`, `notes`). Turn highlights into recall cards with `CASES.md` (second half).
- Looks: `look.js` sets `data-look` (paper, night, classic) on the app and on every tool; app tokens live in `style.css`, tool tokens and the case-player layout in `tools/look.css`, case-player behaviour in `tools/shift-ui.js`. A new tool must load `../look.js` and `look.css` after its own styles (a `_shift.html` also loads `shift-ui.js` last), use the shared variable names (`--bg --surface --ink --muted --line --n-tint --display --body --mono`), and must not load web fonts. Add new tool files to `sw.js`.
