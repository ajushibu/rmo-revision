/* Hyponatraemia: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'hypona-sort': { n: 'Sort the type and find the cause', tab: 1, r: 'Serum and urine osmolality, urine sodium, volume status, drugs, cortisol and thyroid.' },
    'hypona-sev': { n: 'Severity decides the rush', tab: 2, r: 'Seizure or coma: 3% saline now. Mild or chronic: slow, by cause.' },
    'hypona-treat': { n: 'Treat by type', tab: 2, r: 'Dry gets 0.9% saline, SIADH gets fluid restriction, wet gets restriction and the heart or liver fixed.' },
    'hypona-limit': { n: 'Do not overcorrect', tab: 3, r: 'No more than 10 mmol/L in 24 hours. Check sodium every 2 to 4 hours and watch urine output.' }
  };
  w.RMO_CASES = [
  {
    id: 'hypona1', title: 'Seizure on day 2', time: '03:00', where: 'Surgical ward',
    blurb: 'A post-operative woman has a seizure with a sodium of 113. Tests 3% saline and the correction limit.',
    intro: '66-year-old woman, day 2 after a hysterectomy. She has been on glucose 5% maintenance fluids and has been vomiting. The nurse calls: she has had a seizure, now settling, drowsy. The overnight sodium comes back at 113.',
    vit: { hr: 98, sbp: 130, dbp: 78, spo2: 96, rr: 18 },
    facts: ['66F, day 2 after hysterectomy', 'On glucose 5% maintenance fluid, vomiting', 'One generalised seizure, now drowsy', 'Sodium 113 (it was 134 on admission)', 'Glucose 6.8 mmol/L'],
    decisions: [
      { tag: 'hypona-sev', scene: 'Sodium 113 and a seizure. How urgent is this?', opts: [
        o('best', 'A life-threatening emergency: severe symptoms need hypertonic saline now', 'A seizure from low sodium is severe hyponatraemia, whatever else is true.'),
        o('poor', 'Moderate, start fluid restriction', 'Too slow. She has had a seizure.'),
        o('poor', 'Treat as epilepsy first and wait for the CT', 'The sodium is the cause.'),
        o('harm', 'Give more glucose 5% to improve her fluid status', 'Glucose 5% is free water and makes it worse.')] },
      { tag: 'hypona-treat', scene: 'What is your first treatment?', opts: [
        o('best', '3% saline 150 mL over 20 minutes, stop the glucose 5%, check glucose and call your senior', 'This is the NSW SESLHD regimen. Remove the cause as well.', { hr: 92 }),
        o('poor', '0.9% saline 1 L', 'Too weak for severe symptoms.'),
        o('poor', 'A loading dose of an antiepileptic', 'It does not fix the sodium.'),
        o('harm', '3% saline 150 mL as a push over 2 minutes', 'Too fast: risk of overcorrection.')] },
      { tag: 'hypona-limit', scene: 'After 150 mL of 3% saline, she wakes and the sodium is 117. What next?', opts: [
        o('best', 'Check the sodium again in 20 minutes to 2 hours, repeat the bolus only if still symptomatic, and aim for about 5 mmol/L in the first hour', 'Check after every bolus. The aim is a modest first-hour rise, not a normal sodium.'),
        o('harm', 'Give another 500 mL of 3% to normalise it', 'Far too much. She is already improving.'),
        o('poor', 'Stop checking, she is awake', 'The overcorrection risk is still there.'),
        o('harm', 'Run 3% saline at 100 mL an hour overnight', 'A running infusion invites overcorrection.')] },
      { tag: 'hypona-limit', scene: 'By 08:00 the sodium is 124 and she has passed 600 mL of clear urine in 3 hours. What now?', opts: [
        o('best', 'Stop the saline, check sodium hourly, chart urine output and call your registrar about desmopressin and glucose to hold it', 'A big dilute diuresis is how overcorrection happens. A rise of 11 in 5 hours is too fast.'),
        o('poor', 'Carry on with the same plan', 'The sodium is already rising too fast.'),
        o('poor', 'Give more furosemide to clear the fluid', 'This pushes the sodium up further.'),
        o('harm', 'Stop checking the sodium until the afternoon', 'Overcorrection is the danger now.')] }
    ],
    ends: { hi: 'The seizure stops, the sodium rises gently, and an overshoot is caught in time. She is discharged in three days.', mid: 'She recovers, but the sodium moved faster than it should have.', lo: 'She overcorrects and develops a locked-in state days later.' },
    hard: { debrief: 'A seizure from low sodium needs hypertonic saline in boluses with checks, and the next danger is overcorrection.', steps: [
      { label: 'The first 30 minutes', tag: 'hypona-treat', time: '03:00', window: 'Now: the first 30 minutes',
        scene: 'A seizure, drowsy, sodium 113, glucose 6.8, on glucose 5% maintenance. What do you order?',
        first: ['hyp_saline'], firstWhy: 'A seizure from low sodium: hypertonic saline is the treatment.',
        plan: PL(['met', ['reg', 'icu'], 'Seizure from a very low sodium: call for senior and critical care help now.', true], ['spo2ecg', ['q15'], 'Close observation with continuous monitoring.'], ['m20', ['m5', 'h1'], 'Recheck the sodium after each bolus.']),
        orders: {
          hyp_saline: N('150 mL over 20 minutes, check the sodium after each bolus.', { d: [0], crit: true, harmDose: [2, 3] }),
          fluids_stop: N('Stop the glucose 5% maintenance: it is free water.'),
          bsl: N('Glucose in any seizure.'), uec: N('Repeat the sodium after each bolus.'), serum_osm: G('Confirm a true low-sodium state.'),
          urine_lytes: G('Urine osmolality and sodium, before the saline if you can.'), gcs: G('Neuro observations.'),
          sit_up: G('Airway: recovery position or sit up as drowsy.'), o2: G('Oxygen while drowsy.', { d: [1] }),
          hourly_uo: N('Hourly urine output: a sudden dilute diuresis is how overcorrection starts.'),
          fbal: G('Fluid balance chart.'), antiemetic: G('Treat the vomiting.', { d: [0] }),
          cthead: S('The cause is the sodium. Image if there are focal signs or she does not recover.'),
          midaz: S('The seizure has stopped. Correcting the sodium treats the cause.'),
          maint: X('Hypotonic or maintenance fluids make it worse.'), frestrict_hn: S('Too slow for a seizure.', { d: [1, 2] }),
          bolus: X('0.9% saline is too weak and does not fix a seizure.'), freewater: X('Free water makes the sodium lower.', { harmDose: [0, 1, 2] })
        },
        ok: { text: 'She wakes after the first bolus. The sodium at 03:45 is 117. She is talking and oriented.', vit: { hr: 88 }, facts: ['Sodium 117 after one bolus', 'Awake and oriented'] },
        miss: { text: 'She has a second seizure at 03:30 and her sodium is 113.', vit: { hr: 120, spo2: 90 }, facts: ['Second seizure'] } },
      { label: 'The overshoot', tag: 'hypona-limit', time: '08:00', window: 'Next morning',
        scene: 'Sodium 124, rising fast, 600 mL of clear urine in 3 hours, awake and well. What do you order?',
        plan: PL(['reg', ['icu'], 'Overcorrection risk: tell your registrar now.'], ['spo2ecg', ['q15'], 'Close observation.'], ['h1', ['m20'], 'Recheck the sodium hourly.']),
        orders: {
          uec: N('Sodium hourly while it is moving fast.', { crit: true }), hourly_uo: N('Hourly urine output chart.'),
          desmo: G('A registrar decision: desmopressin can stop the diuresis. Ask before giving it.'),
          freewater: G('Glucose 5% can hold the sodium back, a senior decision.', { d: [0] }),
          urine_lytes: G('Urine osmolality: dilute urine confirms a water diuresis.'), fbal: G('Strict fluid balance.'),
          gcs: G('Neuro observations: watch for new weakness or confusion.'),
          hyp_saline: X('More hypertonic saline would overshoot.', { harmDose: [0, 1, 2, 3] }), bolus: X('Saline adds sodium.'), furo: X('A diuretic pushes the sodium up further.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'You catch the diuresis. The sodium is 126 by noon and 129 by midnight. She is awake and walking.', facts: ['Sodium 126 at noon'] },
        miss: { text: 'By noon her sodium is 133, a rise of 20 in 9 hours. Two days later she cannot move her limbs.', facts: ['Overcorrection'] } }
    ] }
  },
  {
    id: 'hypona2', title: 'Pneumonia and a low sodium', time: '16:00', where: 'Medical ward',
    blurb: 'A man with pneumonia and a sodium of 124, concentrated urine and a mild headache. Tests SIADH and the temptation to give saline.',
    intro: '72-year-old man, day 2 of a pneumonia. He has a mild headache and nausea, no confusion. He looks euvolaemic. The sodium is 124. Urine osmolality 520 mmol/kg, urine sodium 60. He is on glucose 5% maintenance for poor intake.',
    vit: { hr: 88, sbp: 130, dbp: 76, spo2: 95, rr: 20 },
    facts: ['72M, day 2 of pneumonia', 'Mild headache and nausea, not confused', 'Looks euvolaemic: moist mucous membranes, no oedema', 'Sodium 124, urine osmolality 520, urine sodium 60', 'On glucose 5% maintenance fluid'],
    decisions: [
      { tag: 'hypona-sort', scene: 'Euvolaemic, concentrated urine, a high urine sodium, a chest infection. What is the likely cause?', opts: [
        o('best', 'SIADH from the pneumonia, after cortisol and thyroid are checked', 'Euvolaemic with a concentrated urine and a high urine sodium fits SIADH.'),
        o('poor', 'Dehydration', 'He is not dry.'),
        o('poor', 'Heart failure', 'No oedema, no raised JVP.'),
        o('harm', 'Water intoxication from drinking too much, nothing to do', 'The urine is concentrated, so he is not just overdrinking.')] },
      { tag: 'hypona-treat', scene: 'He has mild symptoms. What do you do?', opts: [
        o('best', 'Stop the glucose 5%, start a fluid restriction, and recheck the sodium in a few hours', 'Remove free water and restrict. No hypertonic saline for mild symptoms.'),
        o('poor', 'Start 0.9% saline 1 L', 'In SIADH he keeps the water and passes the salt: the sodium may fall.'),
        o('poor', '3% saline bolus, to be safe', 'It is for severe symptoms and risks overcorrection.'),
        o('harm', 'Increase his glucose 5% to correct the dehydration', 'It adds free water.')] },
      { tag: 'hypona-limit', scene: 'The next morning the sodium is 129. What now?', opts: [
        o('best', 'Continue restriction, treat the pneumonia, and recheck in 12 hours. This rise is fine', 'A rise of 5 in 14 hours is within the limit.'),
        o('poor', 'Stop restricting and give 0.9% saline', 'It would risk another fall and hides the cause.'),
        o('poor', 'Stop checking sodium', 'Recheck until stable.'),
        o('harm', 'Give 3% saline to finish the job', 'He is improving. This risks overshoot.')] }
    ],
    ends: { hi: 'The restriction works and the sodium reaches 135 as the pneumonia clears.', mid: 'The sodium recovers slowly, with extra tests that did not change the plan.', lo: 'The saline lowered his sodium further.' },
    hard: { debrief: 'Euvolaemic with a concentrated urine: SIADH. Stop free water, restrict, find the cause, and avoid saline and hypertonic saline.', steps: [
      { label: 'The afternoon round', tag: 'hypona-treat', time: '16:00', window: 'Now: the first hour',
        scene: 'Sodium 124, mild symptoms, euvolaemic, urine osmolality 520, on glucose 5% maintenance. What do you order?',
        first: ['fluids_stop', 'frestrict_hn'], firstWhy: 'Stop the free water and restrict. Both are first moves.',
        plan: PL(['reg', ['none'], 'Tell your registrar: a new sodium of 124 with symptoms.'], ['routine', ['q15'], 'Routine observations.'], ['h4', ['h1', 'm20'], 'Recheck the sodium within 4 to 6 hours.']),
        orders: {
          fluids_stop: N('Stop the glucose 5%: it is free water.', { crit: true }),
          frestrict_hn: N('Fluid restriction. The volume is a protocol decision.', { d: [1, 2] }),
          serum_osm: N('Confirm a true low state.'), urine_lytes: G('Urine osmolality and sodium: the SIADH test.'),
          tft: G('Check thyroid before calling it SIADH.'), cortisol: G('Check cortisol: adrenal insufficiency looks like SIADH.'),
          uec: N('Recheck the sodium within 4 to 6 hours.'), fbal: G('Fluid balance.'), weigh: G('Daily weight.'),
          lyingstanding: G('Volume check.'), cxr: G('Look at the pneumonia.'), drugchart: G('Look for drugs that cause SIADH.'),
          hyp_saline: X('For mild symptoms it risks overcorrection.', { harmDose: [0, 1, 2, 3] }),
          bolus: S('In SIADH he keeps the water and passes the salt.'), bolus250: S('Same: it may not help.'),
          freewater: X('Free water makes it worse.', { harmDose: [0, 1, 2] }), maint: X('Hypotonic fluids make it worse.')
        },
        ok: { text: 'By midnight the sodium is 126. Cortisol and TSH are normal. SIADH from the pneumonia is the working diagnosis.', facts: ['Sodium 126', 'Cortisol and TSH normal'] },
        miss: { text: 'By midnight the sodium is 121 and he is confused.', vit: { hr: 94 }, facts: ['Sodium 121'] } },
      { label: 'Next morning', tag: 'hypona-limit', time: '08:00', window: 'Next morning',
        scene: 'Sodium 129, better, still on the restriction, pneumonia on treatment. What is the plan?',
        plan: PL(['none', ['reg'], 'Improving: no call needed.'], ['routine', ['q15'], 'Routine.'], ['h4', ['am'], 'Recheck the sodium today and tomorrow.']),
        orders: {
          frestrict_hn: N('Continue restriction.', { d: [1, 2] }), uec: N('Recheck today and tomorrow.'), weigh: G('Daily weight.'), fbal: G('Fluid balance.'),
          hyp_saline: X('He is improving; this would overshoot.', { harmDose: [0, 1, 2, 3] }), bolus: S('Not helpful in SIADH.'),
          freewater: X('Free water.', { harmDose: [0, 1, 2] })
        },
        ok: { text: 'The sodium is 133 by the evening.' }, miss: { text: 'The sodium slips back to 126.' } }
    ] }
  }
  ];
})(window);
