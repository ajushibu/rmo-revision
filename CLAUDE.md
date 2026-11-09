# RMO Revision

Static PWA (no build step) for an Indian-trained doctor preparing to work as an RMO in Australia. Hash router in `app.js`, content in `data.js` and `recall.js`, study tools in `tools/`, case data in `tools/cases/`.

- Clinical content is Australia-first: check doses against Australian sources and say plainly what could not be verified.
- Refreshing on-call cases from the user's weak points: follow `CASES.md`.
- Bump the cache name in `sw.js` whenever files change, then push to `main` and confirm the Vercel deployment.
- Recall checklists (`recall.js`): every item has a section `g` (R recognise, A assess and investigate, T treat now, C complications and traps, F after and follow-up) and items are listed in the order you would think them through on the ward, not by importance. Mark must-know items with `p: 1`.
