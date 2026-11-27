/* Metabolic alkalosis: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'malk-cause': { n: 'Find the cause: urine chloride and the history', tab: 1, r: 'Under 20 means chloride-responsive. A recent diuretic fools the result.' },
    'malk-treat': { n: 'Give chloride, volume and potassium', tab: 2, r: '0.9% saline and potassium for the responsive group, and replace the nasogastric losses.' },
    'malk-resist': { n: 'The resistant group', tab: 2, r: 'High urine chloride, low potassium and hypertension: think aldosterone and investigate.' },
    'malk-after': { n: 'Recheck and call', tab: 3, r: 'Recheck potassium and bicarbonate. Call for pH over 7.55 or ECG changes.' }
  };
  w.RMO_CASES = [
  {
    id: 'malk1', title: 'The nasogastric tube', time: '07:00', where: 'Surgical ward',
    blurb: 'A man with a bowel obstruction and a nasogastric tube putting out litres. Tests the alkalosis and what to replace.',
    intro: '62-year-old man, day 3 of a small bowel obstruction, on a drip and suck. The nasogastric tube drains 2.5 L a day. He has cramps in the hands and is drowsy. Gas: pH 7.53, pCO2 54, bicarbonate 38.',
    vit: { hr: 108, sbp: 104, dbp: 62, spo2: 95, rr: 12 },
    facts: ['62M, small bowel obstruction, day 3', 'Nasogastric tube draining 2.5 L a day', 'Hand cramps, drowsy', 'Gas: pH 7.53, pCO2 54, bicarbonate 38', 'Sodium 132, chloride 82, potassium 2.9, urine chloride 8'],
    decisions: [
      { tag: 'malk-cause', scene: 'Urine chloride is 8. What does this tell you?', opts: [
        o('best', 'Chloride-responsive: he has lost acid and volume through the tube and needs chloride', 'Under 20, no recent diuretic: nasogastric losses.'),
        o('poor', 'Chloride-resistant: look for aldosterone', 'The urine chloride is low, not high.'),
        o('poor', 'A respiratory cause', 'The CO2 is high as compensation.'),
        o('harm', 'It does not matter, the gas is what counts', 'The urine chloride tells you the treatment.')] },
      { tag: 'malk-treat', scene: 'What do you give?', opts: [
        o('best', '0.9% saline in measured boluses, potassium by the safe IV route, magnesium, and replace the nasogastric losses', 'Chloride, volume and potassium. Replace what drains.', { sbp: 114, hr: 96 }),
        o('poor', 'Glucose 5% to hydrate', 'It dilutes the sodium and gives no chloride.'),
        o('poor', 'Furosemide to flush the bicarbonate', 'A diuretic worsens the alkalosis and the dehydration.'),
        o('harm', 'Hydrochloric acid infusion', 'Not for a ward setting.')] },
      { tag: 'malk-treat', scene: 'He is cramping and tingling. What does that suggest?', opts: [
        o('best', 'Low ionised calcium from the alkalosis: check calcium and the ECG, and treat the cause of the alkalosis', 'Alkalosis lowers ionised calcium and causes tetany.'),
        o('poor', 'A muscle strain', 'It is tetany until proven otherwise.'),
        o('poor', 'High calcium', 'The opposite.'),
        o('harm', 'Ignore it', 'Tetany can lead to laryngospasm and arrhythmia.')] },
      { tag: 'malk-after', scene: 'By midday his bicarbonate is 33 and potassium 3.6. What now?', opts: [
        o('best', 'Continue replacing the losses, recheck the bloods, and ask the surgical team about the obstruction plan', 'The cause is the obstruction. Treat it as well.'),
        o('poor', 'Stop the fluids as the bicarbonate has fallen', 'The tube is still draining.'),
        o('poor', 'Remove the tube to stop the losses', 'Not before surgery has decided.'),
        o('harm', 'Restart furosemide', 'It would drive the alkalosis again.')] }
    ],
    ends: { hi: 'Saline, potassium and replaced losses. By the next morning his gas is pH 7.44.', mid: 'He improves, but the potassium took longer to replace.', lo: 'His alkalosis worsens and he develops tetany.' },
    hard: { debrief: 'A chloride-responsive alkalosis: give 0.9% saline and potassium, replace the losses, and treat the obstruction.', steps: [
      { label: 'The morning round', tag: 'malk-treat', time: '07:00', window: 'Now: the first hour',
        scene: 'pH 7.53, bicarbonate 38, potassium 2.9, tube output 2.5 L a day, dry, cramping. What do you order?',
        first: ['bolus', 'kcl_iv'], firstWhy: 'Volume with chloride and potassium are the treatment.',
        plan: PL(['reg', ['none'], 'Tell your registrar and the surgical team: this is a significant alkalosis.'], ['spo2ecg', ['q15'], 'Low potassium with an ECG at risk: monitor.'], ['h1', ['m20'], 'Reassess after the first bolus and recheck bloods.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), bolus: N('0.9% saline gives chloride and volume.', { alt: ['bolus250'] }), bolus250: G('A measured bolus.'),
          kcl_iv: N('Replace the potassium by the safe IV route.', { d: [0], harmDose: [1, 2, 3] }),
          urine_cl: N('Urine chloride confirms a chloride-responsive picture.'),
          mg: N('Magnesium and phosphate.'), calcium: G('Calcium: tetany from the alkalosis.'), uec: N('Repeat electrolytes and creatinine.'),
          fbal: N('Include the nasogastric output.'), ecg: G('ECG for low potassium and calcium.'), abg: G('Repeat gas.'), weigh: G('Daily weight.'),
          team: G('Tell the surgical team: the losses are the cause.'), antiemetic: G('Treat the nausea.', { d: [0] }),
          furo: X('Furosemide worsens the alkalosis and the dehydration.', { harmDose: [0, 1, 2, 3] }),
          bicarb: X('He is already alkalotic.', { harmDose: [0, 1, 2] }), freewater: X('Free water lowers the sodium further.', { harmDose: [0, 1, 2] }),
          morph: S('Opioids slow the gut and may drop breathing drive.', { harmDose: [] })
        },
        ok: { text: 'After saline and potassium his hand cramps ease. By midday bicarbonate is 33 and potassium 3.6.', vit: { sbp: 118, hr: 94 }, facts: ['Potassium 3.6', 'Bicarbonate 33'] },
        miss: { text: 'By midday he has carpopedal spasm and his potassium is 2.5.', vit: { hr: 120 }, facts: ['Potassium 2.5', 'Tetany'] } },
      { label: 'The next morning', tag: 'malk-after', time: '07:00', window: 'Next morning',
        scene: 'Potassium 3.8, bicarbonate 29, tube output 1.4 L. What is the plan?',
        plan: PL(['none', ['reg'], 'Improving. A handover to the surgical team is enough.'], ['routine', ['q15'], 'Routine observations.'], ['am', ['h4'], 'Recheck bloods tomorrow.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), uec: N('Recheck the bloods.'), fbal: N('Keep the balance chart including the tube.'), bolus250: G('Replace measured losses.', { alt: ['bolus'] }), bolus: G('Replace losses.'),
          kcl_iv: G('Continue replacing potassium, rechecking.', { d: [0], harmDose: [1, 2, 3] }), mg: G('Recheck magnesium.'),
          furo: X('Worsens the alkalosis.', { harmDose: [0, 1, 2, 3] }), bicarb: X('He is alkalotic.', { harmDose: [0, 1, 2] })
        },
        ok: { text: 'His gas is pH 7.43 and the surgical team is planning for theatre.' }, miss: { text: 'The alkalosis returns as the losses continue.' } }
    ] }
  },
  {
    id: 'malk2', title: 'High pressure, low potassium', time: '11:00', where: 'Medical ward',
    blurb: 'A woman with resistant hypertension and a persistently low potassium. Tests the chloride-resistant group.',
    intro: '55-year-old woman on three antihypertensives, admitted with weakness. BP 178/102. She takes no diuretic and is not vomiting. Potassium 2.7, bicarbonate 33, urine chloride 50.',
    vit: { hr: 84, sbp: 178, dbp: 102, spo2: 98, rr: 14 },
    facts: ['55F, hypertension on three drugs (no diuretic)', 'Muscle weakness, no vomiting or diarrhoea', 'Potassium 2.7, bicarbonate 33, pH 7.48', 'Urine chloride 50, urine potassium high', 'ECG: flat T waves, U waves'],
    decisions: [
      { tag: 'malk-cause', scene: 'Alkalosis, low potassium, high urine chloride, high blood pressure, no diuretic. What group is this?', opts: [
        o('best', 'Chloride-resistant: look for excess aldosterone, with renin and cortisol', 'High urine chloride with hypertension and low potassium.'),
        o('poor', 'Chloride-responsive from vomiting', 'She is not vomiting and the urine chloride is high.'),
        o('poor', 'A respiratory problem', 'The CO2 is compensation.'),
        o('harm', 'Normal for hypertension', 'Never a normal finding.')] },
      { tag: 'malk-resist', scene: 'What do you do in the first hours?', opts: [
        o('best', 'Replace potassium, check magnesium, take aldosterone and renin before any change in drugs, and ask endocrinology', 'Replace and investigate. Saline will not fix it.'),
        o('poor', 'Give a 2 L saline infusion', 'In this group saline does not help and can raise the BP.'),
        o('poor', 'Stop the potassium to test the levels', 'She is hypokalaemic.'),
        o('harm', 'Add a diuretic to bring the BP down', 'It would lower the potassium further.')] },
      { tag: 'malk-treat', scene: 'Potassium is 2.7 with U waves. How do you replace it?', opts: [
        o('best', 'IV potassium chloride 10 mmol in 100 mL over 1 hour on a cardiac monitor, with oral replacement alongside, and recheck', 'Low potassium with U waves: IV on a monitor, as for any ECG change. Oral can go alongside because her gut works.'),
        o('harm', 'IV push over 5 minutes', 'Never push potassium.'),
        o('poor', 'Wait for the endocrine opinion', 'Replace it now.'),
        o('harm', 'Add potassium to the running saline', 'No, never add it to a running bag.')] },
      { tag: 'malk-after', scene: 'The aldosterone to renin ratio is high. What happens next?', opts: [
        o('best', 'Endocrinology or hypertension clinic: confirm and find the cause, with the drug choice a specialist decision', 'This is a diagnosis for specialists.'),
        o('poor', 'Start spironolactone yourself tonight', 'A specialist decision, after the results are confirmed.'),
        o('poor', 'Discharge without follow-up', 'This needs a plan.'),
        o('harm', 'Ignore it, her BP is easy to control', 'Excess aldosterone damages the heart and kidneys.')] }
    ],
    ends: { hi: 'Replaced, investigated and referred. She is booked for confirmatory testing.', mid: 'The potassium is fixed but the referral is late.', lo: 'The potassium falls again and she is readmitted with an arrhythmia.' },
    hard: { debrief: 'Chloride-resistant alkalosis with hypertension: replace potassium, take the right samples, and refer.', steps: [
      { label: 'The first hours', tag: 'malk-resist', time: '11:00', window: 'Now: the first few hours',
        scene: 'Potassium 2.7, bicarbonate 33, BP 178/102, urine chloride 50, U waves. What do you order?',
        first: ['kcl_oral', 'ecg'], firstWhy: 'Replace the potassium and check the heart.',
        plan: PL(['reg', ['none'], 'Tell your registrar about the potassium with ECG changes.'], ['spo2ecg', ['q15'], 'Monitor the ECG while the potassium is low.'], ['h4', ['h1', 'm20'], 'Recheck the potassium in a few hours.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), kcl_oral: G('Oral replacement alongside the IV, since her gut works.', { d: [0], harmDose: [1] }), kcl_iv: N('Potassium 2.7 with U waves: IV replacement, 10 mmol in 100 mL over an hour, on a monitor.', { d: [0], harmDose: [1, 2, 3], crit: true }),
          ecg: N('ECG for flat T waves and U waves.'), uec: N('Repeat the potassium.'), mg: N('Check magnesium.'),
          urine_lytes: G('Urine potassium helps confirm excess renal loss.'), cortisol: G('Check cortisol for Cushing syndrome.'),
          drugchart: G('Look for steroids, liquorice, and drugs that lower potassium.'), endo_ref: N('Endocrinology: check aldosterone and renin.'),
          abg: G('Gas for the alkalosis.'), bsl: G('Glucose.'), ck: G('CK for weakness.'),
          bolus: S('Saline will not fix it and can raise the BP.'), furo: X('A diuretic lowers potassium further.', { harmDose: [0, 1, 2, 3] }),
          bicarb: X('She is alkalotic.', { harmDose: [0, 1, 2] })
        },
        ok: { text: 'By evening her potassium is 3.3. The endocrine team will see her tomorrow.', facts: ['Potassium 3.3'] },
        miss: { text: 'By evening her potassium is 2.4 and she has runs of ventricular ectopics.', vit: { hr: 98 }, facts: ['Potassium 2.4'] } },
      { label: 'The next day', tag: 'malk-after', time: '08:00', window: 'Next morning',
        scene: 'Potassium 3.4, aldosterone to renin ratio high. What is the plan?',
        plan: PL(['none', ['reg'], 'Stable. A handover to the endocrine team.'], ['routine', ['q15'], 'Routine.'], ['am', ['h4'], 'Recheck bloods daily.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), endo_ref: N('Endocrinology to confirm and plan.'), uec: N('Daily potassium.'), kcl_oral: G('Continue replacement.', { d: [0], harmDose: [1] }),
          mg: G('Magnesium.'), team: G('Hypertension follow-up.'), bolus: S('Not helpful.'), furo: X('Lowers potassium further.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'She is booked for confirmatory testing and discharged with a plan.' }, miss: { text: 'She is discharged with no follow-up and returns months later with a stroke.' } }
    ] }
  }
  ];
})(window);
