/* /bin /bin.usr-is-merged /boot /container_info.json /dev /etc /home /lib /lib.usr-is-merged /lib64 /lost+found /media /mnt /nix /old_root /opt /proc /root /run /sbin /sbin.usr-is-merged /srv /sys /tmp /usr /var Metabolic acidosis: concepts and cases (easy + hard) fonts/ icons/ scripts/ tools/ */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'macid-gap': { n: 'High gap or normal gap', tab: 1, r: 'Work out the anion gap: sodium minus chloride minus bicarbonate.' },
    'macid-cause': { n: 'Find and treat the cause', tab: 2, r: 'Lactate, ketones, kidney, toxins for a high gap. Diarrhoea and saline for a normal gap.' },
    'macid-bic': { n: 'Be careful with bicarbonate', tab: 3, r: 'It is rarely first-line. Never a 100 mL push.' },
    'macid-call': { n: 'When to call', tab: 3, r: 'pH under 7.2, lactate above 4, or shock not responding.' }
  };
  w.RMO_CASES = [
  {
    id: 'macid1', title: 'Lactate 6.8', time: '20:00', where: 'Medical ward',
    blurb: 'A septic man with a high lactate and a pH of 7.24. Tests the gap, the cause and the temptation to give bicarbonate.',
    intro: '71-year-old man, day 1 of a pneumonia. He has become unwell: confused, hot and fast. The nurse calls. Gas: pH 7.24, pCO2 26, bicarbonate 11, lactate 6.8. Sodium 134, chloride 97.',
    vit: { hr: 122, sbp: 88, dbp: 50, spo2: 91, rr: 30 },
    facts: ['71M, pneumonia, day 1 of oral antibiotics', 'Confused, T 39.1, HR 122, BP 88/50, RR 30', 'Gas: pH 7.24, pCO2 26, bicarbonate 11, lactate 6.8', 'Sodium 134, chloride 97 (gap 26)', 'Creatinine 160 (baseline 95)'],
    decisions: [
      { tag: 'macid-gap', scene: 'Sodium 134, chloride 97, bicarbonate 11. What is the anion gap and what does it mean?', opts: [
        o('best', 'About 26: a high-gap acidosis, here from lactate', '134 minus 97 minus 11 is 26. Lactate fits.'),
        o('ok', 'About 10: normal gap', 'Check the sum again: 134 − 97 − 11 = 26.'),
        o('poor', 'The gap does not matter in sepsis', 'It tells you the acid is lactate and not something else.'),
        o('harm', 'Ignore it and treat the pH', 'Treat the cause.')] },
      { tag: 'macid-cause', scene: 'What is the main treatment?', opts: [
        o('best', 'Treat the sepsis: cultures, antibiotics within the hour, fluid in measured boluses, oxygen, and call your registrar', 'Fix the sepsis and the lactate falls.', { sbp: 100, hr: 112 }),
        o('ok', 'Fluids only, antibiotics in the morning', 'Antibiotics cannot wait.'),
        o('poor', 'Antibiotics only, no fluids', 'He needs both.'),
        o('harm', '100 mL of 8.4% bicarbonate as a push', 'Never a push. It does not treat lactate and drops the potassium.')] },
      { tag: 'macid-bic', scene: 'The registrar asks if you would give bicarbonate for the pH of 7.24. What do you say?', opts: [
        o('best', 'No. Treat the cause first. A pH of 7.24 from lactate does not need bicarbonate', 'Bicarbonate does not fix lactate and can cause harm.'),
        o('ok', 'Yes, 50 mL slowly', 'Not at this pH, and not before fluid and antibiotics.'),
        o('poor', 'Yes, 100 mL straight away', 'Never a push.'),
        o('harm', 'Yes, and a second 100 mL later', 'Bicarbonate overload.')] },
      { tag: 'macid-call', scene: 'After 1 L of fluid his BP is 94/56 and the lactate is 5.9. What do you do?', opts: [
        o('best', 'Call your registrar and ICU outreach: shock is not responding', 'Lactate above 4 and a low BP after the first fluid: escalate.'),
        o('ok', 'Give another litre and re-check in 4 hours', 'More fluid is reasonable, but he needs a senior now.'),
        o('poor', 'Wait for the morning team', 'Delay increases mortality.'),
        o('harm', 'Stop the antibiotics until the culture result', 'Never.')] }
    ],
    ends: { hi: 'Early antibiotics, fluids and a senior review. His lactate is 2.1 by morning.', mid: 'He improves, but the escalation was slow.', lo: 'His shock worsens and he reaches ICU late.' },
    hard: { debrief: 'A high gap acidosis from lactate: treat the sepsis, give fluids and antibiotics in the first hour, and call. Bicarbonate is not the answer.', steps: [
      { label: 'The first hour', tag: 'macid-cause', time: '20:00', window: 'Now: the first hour',
        scene: 'Sepsis from pneumonia, BP 88/50, lactate 6.8, pH 7.24. What do you order?',
        first: ['bcult', 'ceftri', 'bolus250'], firstWhy: 'Cultures, antibiotics and fluid. Any can go first, but all three in the hour.',
        plan: PL(['reg', ['met', 'icu'], 'Lactate above 4 and a low BP: call your registrar now.', true], ['spo2ecg', ['spo2'], 'Continuous monitoring of a shocked, hypoxic patient.'], ['m20', ['m5', 'h1'], 'Reassess after the first bolus.']),
        orders: {
          bcult: N('Blood cultures before antibiotics if it does not delay them.'),
          ceftri: N('An IV antibiotic within the hour, per your sepsis pathway and local guidelines.', { crit: true, alt: ['benpen', 'amp'] }), benpen: G('Another reasonable community-acquired pneumonia choice, per local protocol.'), amp: G('Per hospital protocol.'),
          bolus250: N('A measured bolus of 250 to 500 mL, reassessed after each.', { alt: ['bolus'] }), bolus: G('A bolus is right; reassess after each.'),
          lactate: N('Repeat the lactate after the fluid.'), abg: G('Repeat the gas.'), uec: N('Kidney function and electrolytes.'),
          o2: G('Oxygen to keep SpO2 above 92%.', { d: [1] }), fbc: G('Full blood count.'), crp: G('CRP.'), cxr: G('Chest X-ray.'),
          urine_mcs: G('Urine culture as another source.'), idc: G('A catheter to measure urine output hourly.'), hourly_uo: G('Hourly urine output.'), fbal: G('Fluid balance.'),
          bicarb: S('Not first-line for lactate, and never a push.', { harmDose: [1, 2] }),
          morph: X('Opioids drop the BP and mask the signs.', { harmDose: [0, 1] }), furo: X('Diuretic in shock.', { harmDose: [0, 1, 2, 3] }), ibup: X('An NSAID in shock with AKI.')
        },
        ok: { text: 'After antibiotics and 1 L of fluid his BP is 104/60 and the lactate is 4.2.', vit: { sbp: 104, dbp: 60, hr: 108 }, facts: ['Lactate 4.2'] },
        miss: { text: 'Two hours later his BP is 76/40 and he needs vasopressors in ICU.', vit: { sbp: 76, dbp: 40, hr: 138 }, facts: ['Lactate 8.1'] } },
      { label: 'Two hours on', tag: 'macid-call', time: '22:00', window: 'The next hour',
        scene: 'BP 104/60, lactate 4.2, urine 20 mL an hour, creatinine 190. What do you order?',
        plan: PL(['reg', ['icu'], 'Update your registrar. ICU outreach is also reasonable.'], ['spo2ecg', ['spo2'], 'Keep continuous monitoring.'], ['h1', ['m20'], 'Repeat the lactate in an hour.']),
        orders: {
          lactate: N('Repeat the lactate.'), uec: N('Repeat the creatinine.'), hourly_uo: N('Hourly urine output.'), fbal: G('Fluid balance.'),
          bolus250: G('More fluid if still dry, reassessing.', { alt: ['bolus'] }), bolus: G('Reassess first.'),
          stop_nephro: G('Review the chart for nephrotoxins.'), stop_raas: G('Hold ACE inhibitors and diuretics.'),
          neph_ref: S('Not yet, the kidney injury is likely sepsis-related.'), bicarb: S('Not indicated.', { harmDose: [1, 2] }),
          gent: X('Aminoglycosides and a kidney injury.'), ibup: X('NSAID.')
        },
        ok: { text: 'By midnight the lactate is 2.4 and the urine is 40 mL an hour.' }, miss: { text: 'The lactate stays at 4.5 and urine falls to 10 mL an hour overnight.' } }
    ] }
  },
  {
    id: 'macid2', title: 'Four days of diarrhoea', time: '10:00', where: 'Medical ward',
    blurb: 'A woman with prolonged diarrhoea, a normal gap acidosis, low potassium and metformin on the chart.',
    intro: '45-year-old woman with type 2 diabetes, on metformin and ramipril. She has had diarrhoea for four days. She is weak and dry. Gas: pH 7.26, pCO2 31, bicarbonate 14. Sodium 136, chloride 112, potassium 2.9, creatinine 150 (baseline 80).',
    vit: { hr: 108, sbp: 100, dbp: 60, spo2: 98, rr: 22 },
    facts: ['45F, type 2 diabetes, on metformin and ramipril', 'Diarrhoea for 4 days, dry', 'Gas: pH 7.26, pCO2 31, bicarbonate 14', 'Sodium 136, chloride 112, potassium 2.9 (gap 10)', 'Creatinine 150 (baseline 80), lactate 1.6'],
    decisions: [
      { tag: 'macid-gap', scene: 'Sodium 136, chloride 112, bicarbonate 14. What does the gap tell you?', opts: [
        o('best', 'About 10: a normal gap acidosis, from losing bicarbonate in the stool', '136 − 112 − 14 = 10. Diarrhoea and chloride shift fit.'),
        o('ok', 'A high gap from lactate', 'The lactate is normal and the gap is 10.'),
        o('poor', 'A pure respiratory problem', 'The pCO2 is low, as compensation.'),
        o('harm', 'The gap is irrelevant', 'It points to the cause.')] },
      { tag: 'macid-cause', scene: 'What is the plan?', opts: [
        o('best', 'Hartmann fluid for the dehydration, replace the potassium safely, stop metformin and ramipril, and send a stool culture', 'Replace what is lost, fix the potassium, and stop the drugs that harm the kidney.', { sbp: 108, hr: 100 }),
        o('ok', 'Large volumes of 0.9% saline', 'Plenty of chloride makes the acidosis worse. Hartmann is balanced.'),
        o('poor', 'Sodium bicarbonate infusion first', 'Fluids and potassium come first.'),
        o('harm', 'Continue metformin and ramipril and give loperamide', 'Metformin and ramipril are risks in AKI and acidosis.')] },
      { tag: 'macid-bic', scene: 'The pH is 7.26. The student asks if she needs bicarbonate. What do you say?', opts: [
        o('best', 'No. Replace fluid and potassium, treat the cause, and recheck the gas', 'The acidosis improves as the losses are replaced.'),
        o('ok', 'Yes, 50 mL slowly', 'Not needed at this pH.'),
        o('poor', 'Yes, 100 mL push to be quick', 'Never a push.'),
        o('harm', 'Yes, because the pH is below 7.35', 'The pH is not the threshold for bicarbonate.')] },
      { tag: 'macid-call', scene: 'She has C. difficile on the stool test and creatinine 190 next morning. What now?', opts: [
        o('best', 'Isolate her, start C. difficile treatment per local guidelines, keep the drugs held, and tell your registrar about the creatinine', 'Treat the cause and escalate the kidney injury.'),
        o('ok', 'Wait and see for another day', 'The kidney injury is worsening.'),
        o('poor', 'Restart metformin to control glucose', 'Not while her kidneys are failing.'),
        o('harm', 'Add loperamide for comfort', 'Slowing the gut in C. difficile risks megacolon.')] }
    ],
    ends: { hi: 'Fluids, potassium and the right drugs held. The acidosis resolves in two days.', mid: 'She recovers, but a slow start left her kidney function lagging.', lo: 'The potassium falls further and the kidney injury worsens.' },
    hard: { debrief: 'A normal gap acidosis from diarrhoea: balanced fluids, potassium, stop the drugs that add risk, and find the cause.', steps: [
      { label: 'The first hour', tag: 'macid-cause', time: '10:00', window: 'Now: the first hour',
        scene: 'Diarrhoea for four days, dry, pH 7.26, potassium 2.9, creatinine 150, on metformin and ramipril. What do you order?',
        first: ['maint', 'kcl_iv'], firstWhy: 'Replace fluid and potassium; the drugs come next.',
        plan: PL(['reg', ['none'], 'A new AKI with a low potassium: tell your registrar.'], ['spo2ecg', ['q15'], 'Low potassium: an ECG and close observation.'], ['h4', ['h1', 'm20'], 'Recheck bloods and the gas in a few hours.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), maint: N('Hartmann: balanced fluid that does not add chloride.', { alt: ['bolus250'] }), bolus250: G('A measured bolus if she is hypotensive.'),
          kcl_iv: N('Replace the potassium safely, 10 mmol an hour.', { d: [0], harmDose: [1, 2, 3] }),
          stop_metformin: N('Stop metformin with an AKI and an acidosis.', { crit: true }), stop_raas: N('Hold ramipril.'),
          stool: N('Stool culture and C. difficile test.'), uec: N('Repeat electrolytes and creatinine.'), mg: G('Check magnesium.'),
          abg: G('Repeat gas.'), lactate: G('Lactate.'), ecg: G('ECG: low potassium.'), fbal: G('Fluid balance.'), bsl: G('Glucose.'),
          urine_lytes: G('Urine electrolytes help to confirm a gut cause.'), hourly_uo: G('Urine output.'),
          bicarb: S('Not indicated at this pH.', { harmDose: [1, 2] }), bolus: S('Large 0.9% volumes add chloride. Hartmann is better.'),
          furo: X('She is already dry.', { harmDose: [0, 1, 2, 3] }), ibup: X('An NSAID in AKI.')
        },
        ok: { text: 'After fluids and potassium her BP is 112/68, potassium 3.5 and bicarbonate 18.', vit: { sbp: 112, dbp: 68, hr: 96 }, facts: ['Potassium 3.5', 'Bicarbonate 18'] },
        miss: { text: 'Her potassium falls to 2.4 and her ECG shows U waves.', vit: { hr: 118 }, facts: ['Potassium 2.4'] } },
      { label: 'The next day', tag: 'macid-call', time: '08:00', window: 'Next morning',
        scene: 'C. difficile positive, creatinine 190, potassium 3.6, bicarbonate 19. What do you order?',
        plan: PL(['reg', ['none'], 'Tell your registrar about the C. difficile and the creatinine.'], ['routine', ['q15'], 'Routine observations.'], ['am', ['h4'], 'Review again tomorrow.']),
        orders: {
          stop_metformin: N('Keep metformin off.'), stop_raas: N('Keep ramipril off.'), uec: N('Repeat bloods.'), fbal: G('Fluid balance.'), maint: G('Hartmann.'),
          team: G('Tell the ward team so she is put on contact precautions.'), neph_ref: S('Not yet: she is improving.'),
          bicarb: S('Not needed.', { harmDose: [1, 2] })
        },
        ok: { text: 'The diarrhoea settles, creatinine is 130 by day four.' }, miss: { text: 'The diarrhoea continues and her kidney function worsens.' } }
    ] }
  },
  {
    id: 'c20261120e', fromCard: 'ma17', title: 'Normal gap, high potassium', time: '16:30', where: 'Medical ward',
    blurb: 'A man with diabetic kidney disease on perindopril and spironolactone, now on trimethoprim, with a normal-gap acidosis and a potassium of 6.1. Tests why low aldosterone action holds back both potassium and acid.',
    intro: '68-year-old man with type 2 diabetes, kidney disease (eGFR 38) and heart failure, on perindopril and spironolactone. Started trimethoprim 3 days ago for a urine infection. Admitted for a fall. Afternoon bloods: sodium 137, chloride 113, bicarbonate 17, potassium 6.1, creatinine 165 (baseline 150). Sample not haemolysed.',
    vit: { rhythm: 'sinus', hr: 72, sbp: 138, dbp: 76, spo2: 97, rr: 16 },
    facts: ['68M, type 2 diabetes, kidney disease (eGFR 38), heart failure', 'Perindopril, spironolactone, metformin; trimethoprim started 3 days ago', 'Sodium 137, chloride 113, bicarbonate 17, potassium 6.1 (not haemolysed)', 'Creatinine 165 (baseline 150), glucose 9, lactate 1.2', 'ECG: no peaked T waves, normal QRS', 'Not dry, not overloaded'],
    decisions: [
      { tag: 'macid-gap', scene: 'Sodium 137, chloride 113, bicarbonate 17. What is the gap and what does it tell you?', opts: [
        o('best', 'About 7: a normal-gap acidosis, with a high potassium', '137 − 113 − 17 = 7. Bicarbonate has been lost or acid not excreted, and chloride has risen in its place.'),
        o('ok', 'A high-gap acidosis from kidney failure', 'Check the sum: the gap is 7. Kidney failure gives a high gap mostly when it is advanced; here something else is going on.'),
        o('poor', 'No acidosis: a bicarbonate of 17 is normal for kidney disease', 'It is low, and it comes with a high potassium. That pairing is the clue.'),
        o('harm', 'Ignore the gas, just treat the potassium', 'The gas and the potassium have the same cause.')] },
      { tag: 'macid-cause', scene: 'Normal gap, high potassium, no diarrhoea. What is the cause?', opts: [
        o('best', 'Too little aldosterone action (type 4 renal tubular acidosis): diabetic kidney disease lowers it, and perindopril, spironolactone and trimethoprim all block it, so the kidney holds back both potassium and acid', 'Aldosterone makes the collecting duct pass out potassium and hydrogen ions. Block it and both build up.'),
        o('ok', 'His kidney disease alone', 'It contributes, but at an eGFR of 38 the drugs are the part you can fix tonight.'),
        o('poor', 'Diarrhoea', 'He has none. A normal gap with a low potassium points to the gut; a normal gap with a high potassium points to aldosterone.'),
        o('harm', 'Not enough potassium in his diet: carry on', 'Nothing about this needs more potassium.')] },
      { tag: 'macid-call', scene: 'Potassium 6.1, ECG normal. What do you do now?', opts: [
        o('best', 'Moderate high potassium: tell your registrar, ECG and monitor, withhold spironolactone and perindopril, stop the trimethoprim and choose another antibiotic, shift the potassium with insulin and glucose per your protocol with glucose checks, and recheck in 2 hours', 'Treat the level and remove the causes. The ECG is normal, so calcium is not needed now.'),
        o('ok', 'Withhold the drugs and recheck in the morning', 'Removing the cause is right, but 6.1 needs treatment and a recheck within hours.'),
        o('poor', 'Calcium gluconate and nothing else', 'Calcium protects the heart when the ECG changes; it does not lower the potassium.'),
        o('harm', 'Carry on with the trimethoprim; it is only 3 more days', 'Trimethoprim blocks potassium excretion the same way amiloride does.')] },
      { tag: 'macid-bic', scene: 'The student asks whether to give a bicarbonate push for the bicarbonate of 17.', opts: [
        o('best', 'No. Stop the drugs and treat the potassium; the acidosis improves as aldosterone action returns. If it stays low, long-term oral bicarbonate is a decision for the renal team', 'There is no emergency here. An IV push adds sodium and fluid to a man with heart failure.'),
        o('ok', 'Yes, 50 mL slowly to help the potassium', 'Bicarbonate is not a first-line potassium treatment; the drugs and insulin with glucose do more.'),
        o('poor', 'Yes, 100 mL push', 'Never a push.'),
        o('harm', 'Yes, an infusion until the bicarbonate is normal', 'Sodium and fluid overload in heart failure.')] }
    ],
    ends: { hi: 'You saw the normal gap and high potassium as one problem, stopped the three drugs, and treated the potassium.', mid: 'His potassium came down, but one step was missed.', lo: 'His potassium keeps rising on the drugs and he needs urgent renal input.' },
    hard: { debrief: 'Normal gap plus a high potassium means too little aldosterone action. Stop the drugs that block it (ACE inhibitor, spironolactone, trimethoprim), treat the potassium, and leave bicarbonate to the renal team.', steps: [
      { label: 'The first hour', tag: 'macid-call', time: '16:30', window: 'Now: the first hour',
        scene: 'Potassium 6.1, ECG normal, bicarbonate 17, gap 7, on perindopril, spironolactone and trimethoprim. What do you order?',
        first: ['ecg'], firstWhy: 'The ECG decides how urgent this is and whether calcium is needed.',
        plan: PL(['reg', ['none'], 'Potassium over 6: tell your registrar.'], ['spo2ecg', ['q15'], 'A cardiac monitor while the potassium is over 6.'], ['h1', ['m20'], 'Glucose check after the insulin and a repeat potassium within 2 hours.']),
        orders: { ecg: N('A 12-lead ECG and a monitor.', { crit: true }),
          stop_raas: N('Withhold spironolactone and perindopril: both block aldosterone action.', { crit: true }),
          drugchart: N('Stop the trimethoprim: it blocks potassium excretion like amiloride. Choose another antibiotic.'),
          insulin_k: N('Insulin with glucose to shift the potassium (moderate, 6.0 to 6.4).', { d: [0], harmDose: [1, 2, 3, 4] }),
          bsl: N('Glucose checks after the insulin: the low can come late.'),
          uec: N('Repeat the potassium and creatinine in about 2 hours.'),
          vbg: G('A gas gives a quick potassium and the bicarbonate.'),
          salb_k: G('An extra shift if needed.', { d: [0], harmDose: [1, 2] }),
          resonium: G('A binder helps remove potassium over hours, per your hospital protocol.', { d: [0], harmDose: [1, 2] }),
          stop_metformin: G('Reasonable to hold metformin while his kidney function is worse and he is acidotic.'),
          cefalexin: G('An alternative for the urine infection, guided by the culture and eTG.'),
          ca_gluc: S('The ECG is normal: calcium is for ECG changes.', { harmDose: [3] }),
          bicarb: S('Not first-line here, and he has heart failure.', { harmDose: [1, 2] }),
          trim_oral: X('Trimethoprim is raising his potassium.'),
          kcl_iv: X('He has too much potassium.', { harmDose: [0, 1, 2, 3] }), kcl_oral: X('He has too much potassium.', { harmDose: [0, 1] }),
          ibup: X('An NSAID worsens the kidney and the potassium.')
        },
        ok: { text: 'Two hours later the potassium is 5.5, glucose 6.8. ECG unchanged.', vit: { hr: 70 }, facts: ['Potassium 5.5', 'Glucose 6.8'] },
        miss: { text: 'At 19:00 the potassium is 6.6 and the T waves are peaking.', vit: { hr: 60 }, facts: ['Potassium 6.6', 'Peaked T waves'] } },
      { label: 'The next morning', tag: 'macid-bic', time: '08:00', window: 'Next morning',
        scene: 'Potassium 5.3, bicarbonate 18, gap 7, creatinine 158. Drugs held. What is the plan?',
        plan: PL(['none', ['reg'], 'Improving: no urgent call. Hand over the drug plan.'], ['routine', ['q15'], 'The ECG is normal: routine observations.'], ['am', ['h4'], 'Recheck tomorrow.']),
        orders: { uec: N('Recheck the potassium, bicarbonate and creatinine.'),
          stop_raas: N('Keep spironolactone and perindopril held until the team and renal decide how to restart.'),
          neph_ref: N('Renal team: a long-term plan for his potassium and acidosis, including whether he needs oral bicarbonate or a binder.'),
          team: G('Tell the treating team why the drugs are held, so they are not restarted by habit.'),
          drugchart: G('Make sure the trimethoprim is off the chart.'),
          bicarb: S('An IV dose is not needed; long-term oral treatment is a renal decision.', { harmDose: [1, 2] }),
          bolus: S('He has heart failure and is not dry.'),
          kcl_oral: X('He has too much potassium.', { harmDose: [0, 1] })
        },
        ok: { text: 'Three days later the potassium is 4.9 and the bicarbonate 20. Renal restart perindopril at a low dose and leave the spironolactone off.' },
        miss: { text: 'The drugs are restarted at the same doses on discharge. He is back in 2 weeks with a potassium of 6.8.' } }
    ] }
  },
  {
    id: 'c20261126b', fromCard: 'ma3', title: 'A normal gap in a man with cirrhosis', time: '01:30', where: 'Gastroenterology ward',
    blurb: 'A man with alcohol-related cirrhosis passes melaena overnight. The gap looks normal until you correct it for an albumin of 18. Tests the albumin trap, the lactate and the bleed behind it.',
    intro: '58-year-old man with alcohol-related cirrhosis, admitted with ascites. The nurse calls at 01:30: two large black stools, he is clammy and his heart rate is up. Gas and bloods: pH 7.29, pCO2 30, bicarbonate 17, sodium 131, chloride 102, albumin 18, lactate 4.6.',
    vit: { rhythm: 'sinus', hr: 114, sbp: 94, dbp: 56, spo2: 96, rr: 24 },
    facts: ['58M, alcohol-related cirrhosis, ascites', 'Two melaena stools tonight, clammy', 'HR 114, BP 94/56 (usual 110s systolic), RR 24', 'Gas: pH 7.29, pCO2 30, bicarbonate 17, lactate 4.6', 'Sodium 131, chloride 102, albumin 18 g/L', 'Hb 92 (yesterday 118), INR 1.8, creatinine 110'],
    decisions: [
      { tag: 'macid-gap', scene: 'Sodium 131, chloride 102, bicarbonate 17, albumin 18. What is the gap, and what kind of acidosis is this?', opts: [
        o('best', 'The gap is 12, which looks normal, but the albumin is 18. Corrected gap = 12 + 0.25 × (40 − 18) = 17.5: a high-gap acidosis', 'Albumin is the main unmeasured anion. Each 10 g/L fall hides about 2.5 of gap. Australian labs report g/L, so use 0.25 (LITFL).'),
        o('ok', 'A gap of 12 is normal, but check the lactate anyway', 'Checking the lactate is right, but the reasoning is wrong: the gap is not normal once you correct it.'),
        o('poor', 'A normal-gap acidosis: look for diarrhoea or saline', 'That is the trap. A low albumin makes a high gap look normal.'),
        o('harm', 'pH 7.29 is close enough: review in the morning', 'He is bleeding and his lactate is 4.6.')] },
      { tag: 'macid-cause', scene: 'Lactate 4.6. What is driving it?', opts: [
        o('best', 'Poor perfusion from the bleed (heart rate 114, BP below his usual, Hb down 26), made worse because a cirrhotic liver clears lactate slowly. Treat the bleed', 'The liver problem makes the lactate rise higher and fall slower, but the cause tonight is blood loss.'),
        o('ok', 'Infection: send cultures and give antibiotics', 'Infection is common in cirrhosis and antibiotic cover is usual in a GI bleed, but the numbers here point to blood loss first.'),
        o('poor', 'Cirrhotic patients always run a high lactate; ignore it', 'A slow-clearing liver does not explain 4.6 with a falling Hb and a fast heart.'),
        o('harm', 'His lactate is from alcohol; give a fluid bolus and go back to bed', 'He is bleeding. Leaving him is dangerous.')] },
      { tag: 'macid-call', scene: 'What do you do now?', opts: [
        o('best', 'Tell your registrar now. Two large-bore cannulas, group and hold (crossmatch), FBC, coags, UEC, LFT, repeat gas. Blood per your hospital protocol, measured fluid only while blood comes. Antibiotic cover per your hospital protocol. Urgent gastroenterology for endoscopy', 'An upper GI bleed in cirrhosis with a rising lactate is an emergency.'),
        o('ok', 'Give 2 L of saline and recheck in the morning', 'He needs blood and endoscopy, not litres of saline into ascites and a dilute Hb.'),
        o('poor', 'Recheck the gas in 4 hours', 'Too slow for an active bleed.'),
        o('harm', 'Start his usual enoxaparin prophylaxis', 'Anticoagulant into an active bleed.')] },
      { tag: 'macid-bic', scene: 'The nurse asks if bicarbonate would help the pH of 7.29.', opts: [
        o('best', 'No. The acid is lactate from poor perfusion: it falls as the bleed is controlled and he is resuscitated', 'Treat the cause. Bicarbonate does not fix a lactic acidosis.'),
        o('ok', 'Only if the pH falls below 7.2', 'Even then, the decision belongs to the senior team; the fix is the bleed.'),
        o('poor', '50 mL to help his heart', 'No benefit here and it adds sodium to a man with ascites.'),
        o('harm', '100 mL push', 'Never a push.')] }
    ],
    ends: { hi: 'You corrected the gap, saw the lactate as blood loss, and got him blood and an endoscopy. A bleeding varix is banded.', mid: 'He reaches endoscopy, but a step was missed on the way.', lo: 'The "normal" gap delays the call and he becomes shocked before the scope.' },
    hard: { debrief: 'In cirrhosis, sepsis or malnutrition, correct the anion gap for albumin: AG + 0.25 × (40 − albumin in g/L). A normal-looking gap can hide a lactic acidosis. Here the lactate came from a GI bleed: escalate, blood, coags, endoscopy, no bicarbonate.', steps: [
      { label: 'The 1:30 call', tag: 'macid-gap', time: '01:30', window: 'Now: the first hour',
        scene: 'Melaena twice, HR 114, BP 94/56. pH 7.29, bicarbonate 17, gap 12, albumin 18, lactate 4.6, Hb 92 (was 118), INR 1.8. What do you order?',
        first: ['gh', 'ivc'], firstWhy: 'Access and blood ready: the gap and the lactate both point to an active bleed.',
        plan: PL(['reg', ['met'], 'Upper GI bleed in cirrhosis with a lactate over 4: tell your registrar now.', true], ['q15', ['spo2ecg'], 'Observations every 15 minutes while he is bleeding.'], ['m20', ['h1', 'm5'], 'Back within 20 minutes with a repeat set of observations.']),
        orders: { ivc: N('Two large-bore cannulas.', { crit: true }), gh: N('Group and hold, and crossmatch.', { crit: true }),
          fbc: N('Repeat Hb.'), coags: N('INR 1.8: repeat coags.'), uec: N('Kidney function: bleeding in cirrhosis can tip him into kidney injury.'),
          vbg: N('A repeat gas and lactate after resuscitation.'), lactate: G('Trend the lactate.'), lft: G('Liver function.'),
          gastro_urgent: N('Urgent gastroenterology: endoscopy for a likely variceal bleed.', { crit: true }),
          transfuse: G('Blood per your hospital protocol, with a restrictive target in GI bleeding.', { d: [0] }),
          bolus250: G('A measured bolus while blood comes.', { alt: ['bolus'] }), bolus: G('Fluid is reasonable in small amounts until blood arrives.'),
          ceftri: G('Antibiotic cover is usual in a cirrhotic GI bleed, per your hospital protocol.'),
          bcult: G('Cultures before antibiotics.'), fbal: G('Fluid balance and stool chart.'), limits: G('Check his goals of care.'),
          bicarb: X('Lactate from blood loss: bicarbonate does not fix it.', { harmDose: [0, 1, 2] }),
          enox: X('Anticoagulant into an active bleed.', { harmDose: [0, 1] }), ibup: X('An NSAID worsens bleeding and kidney injury in cirrhosis.')
        },
        ok: { text: 'Two units in. Your registrar starts the variceal bleed drugs per your hospital protocol. At 03:00: HR 96, BP 108/64, lactate 2.9, bicarbonate 20. Gastro will scope at 04:00.', vit: { hr: 96, sbp: 108, dbp: 64, rr: 20 }, facts: ['Lactate 2.9', 'Bicarbonate 20', 'Endoscopy at 04:00'] },
        miss: { text: 'At 02:30 he vomits blood. HR 132, BP 78/40. A MET call is made.', vit: { hr: 132, sbp: 78, dbp: 40, rr: 28 }, facts: ['Haematemesis', 'BP 78/40'] } },
      { label: 'Before the scope', tag: 'macid-bic', time: '03:00', window: 'Next hour',
        scene: 'Lactate 2.9, bicarbonate 20, pH 7.34. The nurse asks about bicarbonate "to finish fixing the gas", and whether to give a large saline load before the scope. What do you order now?',
        plan: PL(['reg', ['none'], 'Keep your registrar updated before the scope.'], ['q15', ['spo2ecg'], 'Still bleeding risk: 15-minute observations.'], ['h1', ['m20'], 'Repeat gas and Hb in an hour.']),
        orders: { vbg: N('Repeat gas and lactate: the trend shows if resuscitation is working.'), fbc: N('Hb after the units.'),
          calcium: G('Albumin, calcium and phosphate: needed to keep correcting the gap.'), fbal: G('Fluid balance.'),
          transfuse: G('More blood only per your hospital protocol and Hb.', { d: [0] }),
          bicarb: X('The lactate is falling with resuscitation: bicarbonate adds sodium and does not help.', { harmDose: [0, 1, 2] }),
          maint: S('Maintenance crystalloid is not the fix: blood and the scope are. Big crystalloid loads worsen ascites and dilute the Hb.'), bolus: S('He is responding: no large saline load.'),
          enox: X('Anticoagulant into a bleed.', { harmDose: [0, 1] })
        },
        ok: { text: 'At endoscopy a bleeding varix is banded. By morning lactate 1.6, corrected gap normal.' },
        miss: { text: 'After a large saline load his Hb falls to 70 and his abdomen is tighter. The scope is delayed.' } }
    ] }
  }
  ];
})(window);
