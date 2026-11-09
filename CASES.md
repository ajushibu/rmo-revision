# Refreshing the on-call cases from weak points

The on-call case pages (`tools/*_shift.html`) report every finished case to the app. The app stores them in `attempts` inside the synced state, so they reach Supabase once the user is signed in. This file is the procedure for turning those attempts into new, targeted cases.

## Where things are

- Case data: `tools/cases/<tool>.js` (one file per on-call page). Each defines `window.RMO_CONCEPTS` (concept tags with a name, the Study Kit tab or step, and a revisit line) and `window.RMO_CASES` (the cases).
- Retired cases stay in the file with `retired: true`. The page hides them; the history still makes sense.
- Synced state: Supabase project `omuzlqabwlzhbrfipwqx` ("margin"), table `public.rmo_revision_state`, column `data`. One row per user; there is one user.
- Analysis script: `scripts/weakpoints.py STATE.json`.
- Deploy: Vercel project `rmo-revision-app` (team `team_8vJGcIw8NX0cCNeva5RhVh0g`), production URL https://rmo-revision-app.vercel.app. A push to `main` usually deploys; if no new deployment appears within a minute, create one with `create_deployment` using `gitSource` `{type: github, org: ajushibu, repo: rmo-revision, ref: main, sha: <commit>}` and confirm it is READY.

## Rules agreed with the user

- The first try at a case counts most; replays show whether the lesson stuck.
- A concept answered poor or harmful on a first try stays weak until it is answered best on a later day.
- A case is mastered after two attempts on different days, each at least 80% with no poor or harmful answers. Mastered cases are retired and replaced.
- Each topic keeps about 3 active cases.

## Procedure

1. Read the state: `select data from public.rmo_revision_state;` with the Supabase `execute_sql` tool. Save the JSON object to a file.
2. Run `python3 scripts/weakpoints.py state.json`. If there are no attempts, stop and say so.
3. For every case marked MASTERED: set `retired: true` on it.
4. For each topic with a retired case, or with WEAK or shaky concepts: write one new case aimed at the weakest concepts. Look at the wrong answers the user actually chose (`chose`) and build the case around that misconception, in a different clinical setting from the original.
5. Case format: copy the shape of existing cases in the same file. 3-5 decisions; each decision has a `tag` that exists in `RMO_CONCEPTS` (add a concept if needed, pointing `tab` at the right Study Kit step); options graded `best`, `ok`, `poor`, `harm` with a short `fb` explaining why; plausible `vit` changes; give the case a unique `id` such as `c20261115a`.
6. Clinical accuracy: Australia first. Check every dose and threshold against an Australian source (ANZCOR, Australian guidelines or consensus statements, NPS MedicineWise, Australian Prescriber, Austroads) with a web search. If a dose cannot be verified, write "per your hospital protocol" instead of a number. Never invent a dose. Plain, short sentences.
7. Check: load each changed case file with node (`global.window={}; require(file)`), and play the page through in Playwright with no page errors.
8. Bump the cache name in `sw.js` (`rmo-vN` to `rmo-vN+1`) so devices pick up the new cases.
9. Commit, push to `main`, confirm the Vercel deployment is READY.
10. Tell the user: their weakest concepts (with the wrong answer they chose), which cases were retired, which new cases were added and where, and any dose that could not be verified.
