/* Acid-base: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'ab-read': { n: 'Read the gas in order', tab: 1, r: 'pH, then which side moved it, then compensation, then the anion gap.' },
    'ab-comp': { n: 'Check compensation, spot a second problem', tab: 1, r: 'If the compensation is off, there is a second disorder.' },
    'ab-gap': { n: 'Anion gap and mixed disorders', tab: 2, r: 'A normal-looking pH can hide two problems. Compare the rise in the gap with the fall in bicarbonate.' },
    'ab-act': { n: 'Treat the patient, not the number', tab: 3, r: 'Treat the cause, give controlled oxygen to retainers, and repeat the gas.' }
  };
  w.RMO_CASES = [
  {
    id: 'ab1', title: 'Drowsy on oxygen', time: '23:30', where: 'Medical ward',
    blurb: 'A COPD patient on high-flow oxygen becomes drowsy. Tests reading a respiratory acidosis and acting on the cause.',
    intro: '74-year-old man with COPD, admitted with a chest infection. He is on a Hudson mask at 8 L/min. The nurse calls: he is drowsy and hard to wake. SpO2 is 99%. A gas is done.',
    vit: { hr: 98, sbp: 140, dbp: 80, spo2: 99, rr: 12 },
    facts: ['74M, COPD, chest infection', 'Hudson mask at 8 L/min, SpO2 99%', 'Drowsy, rate 12', 'Gas: pH 7.24, pCO2 78 mmHg, bicarbonate 34, PaO2 190'],
    decisions: [
      { tag: 'ab-read', scene: 'pH 7.24, pCO2 78, bicarbonate 34. What is this?', opts: [
        o('best', 'Respiratory acidosis, acute on chronic: he retains CO2 and has been made worse', 'Low pH with high CO2. The raised bicarbonate shows he was already a retainer.'),
        o('poor', 'Metabolic acidosis', 'The bicarbonate is high, not low.'),
        o('poor', 'Metabolic alkalosis, from the raised bicarbonate', 'The pH is low, not high. The bicarbonate is compensating.'),
        o('harm', 'A normal gas for COPD, nothing to do', 'A pH of 7.24 with drowsiness is an emergency.')] },
      { tag: 'ab-comp', scene: 'The bicarbonate is 34. How do you interpret it?', opts: [
        o('best', 'A chronic compensation: his kidneys have kept his bicarbonate high for a long time', 'Compensation for a long-standing CO2 rise. The acute rise is what dropped the pH.'),
        o('poor', 'A mistake in the lab', 'It makes sense in a chronic CO2 retainer.'),
        o('poor', 'A second primary alkalosis that needs treatment', 'It is compensation, and treating it will do nothing.'),
        o('harm', 'Give acid to bring it down', 'Never. It is physiological compensation.')] },
      { tag: 'ab-act', scene: 'What is your first action?', opts: [
        o('best', 'Reduce the oxygen to a target of 88 to 92%, call your senior, and repeat the gas in 30 to 60 minutes', 'Too much oxygen drives CO2 up in a retainer. Titrate it down and check again.', { spo2: 92, rr: 14 }),
        o('harm', 'Keep the oxygen and wait for the morning', 'The oxygen is part of the cause.'),
        o('poor', 'Give a sedative to calm him', 'Sedation reduces breathing drive further.'),
        o('harm', 'Turn the oxygen off altogether', 'He may be hypoxic. Reduce it, do not remove it.')] },
      { tag: 'ab-act', scene: 'An hour later the oxygen is titrated. The gas is pH 7.28, pCO2 70. He is a little brighter. What now?', opts: [
        o('best', 'Air-driven nebulisers, steroid and antibiotics, a repeat gas, and tell your senior about non-invasive ventilation if the pH stays under 7.35', 'He is improving but the pH is still low. NIV is the next step if it does not correct.'),
        o('harm', 'Stop all monitoring now', 'The pH is still under 7.35.'),
        o('poor', 'Increase the oxygen again to be safe', 'It would push the CO2 back up.'),
        o('harm', 'Sit him flat and sedate him', 'Flat and sedated makes the ventilation worse.')] }
    ],
    ends: { hi: 'Controlled oxygen, a repeat gas and treatment of the infection. His pH is 7.36 by morning.', mid: 'He recovers, but the pH was slow to correct.', lo: 'His CO2 climbs and he needs ventilating in the night.' },
    hard: { debrief: 'Read the gas, then fix the cause: too much oxygen in a CO2 retainer. Lower the oxygen, repeat the gas, and call for NIV if it does not correct.', steps: [
      { label: 'The first hour', tag: 'ab-act', time: '23:30', window: 'Now: the first hour',
        scene: 'pH 7.24, pCO2 78, bicarbonate 34, drowsy on a Hudson mask at 8 L/min, SpO2 99%. What do you order?',
        first: ['o2'], firstWhy: 'The oxygen is the cause. Titrate it to 88 to 92%.',
        plan: PL(['reg', ['icu', 'met'], 'A drowsy retainer with a pH of 7.24: tell your registrar now.', true], ['spo2', ['spo2ecg', 'q15'], 'Continuous SpO2 while you titrate the oxygen.'], ['h1', ['m20'], 'Repeat the gas after 30 to 60 minutes.']),
        orders: {
          o2: N('Titrate to 88 to 92% with controlled oxygen.', { d: [0, 2], crit: true, harmDose: [3, 4] }),
          abg: N('Repeat the gas in 30 to 60 minutes.'), gcs: G('Watch his conscious level.'),
          salb_neb: G('Air-driven nebulisers, not oxygen-driven.', { d: [2] }), ipra_neb: G('Ipratropium nebuliser.', { d: [0] }),
          pred: G('Prednisolone for the COPD flare.', { d: [2] }), cxr: G('Look at the chest.'), sputum: G('Sputum culture.'),
          niv: G('If the pH stays under 7.35 after an hour of medical treatment, NIV is the next step.'),
          co2alert: G('Record a CO2 retention alert for the next admission.'),
          bsl: G('Glucose in a drowsy patient.'), fbc: G('Full blood count.'), crp: G('CRP.'), uec: G('Electrolytes and kidney function.'),
          morph: X('An opioid lowers breathing drive.', { harmDose: [0, 1] }), midaz: X('A sedative lowers breathing drive.'),
          intub: S('Not yet: try oxygen titration and NIV first.'), o2off: S('He may be hypoxic. Titrate, do not stop.')
        },
        ok: { text: 'With the oxygen titrated to 90%, he wakes. The repeat gas an hour later is pH 7.31, pCO2 66.', vit: { spo2: 90, rr: 16 }, facts: ['Gas: pH 7.31, pCO2 66'] },
        miss: { text: 'An hour later he is unrousable. The gas is pH 7.15, pCO2 96.', vit: { spo2: 99, rr: 8 }, facts: ['Gas: pH 7.15, pCO2 96'] } },
      { label: 'One hour on', tag: 'ab-act', time: '00:45', window: 'The next hour',
        scene: 'pH 7.31, pCO2 66, awake and talking, SpO2 90% on a 28% Venturi. What do you order?',
        plan: PL(['reg', ['none'], 'Update your registrar on the gas and the plan.'], ['spo2', ['q15', 'spo2ecg'], 'Continuous SpO2 until the gas is normal.'], ['h4', ['h1'], 'Repeat the gas in a few hours.']),
        orders: {
          abg: N('Repeat the gas to see the trend.'), salb_neb: G('Air-driven.', { d: [2] }), ipra_neb: G('Ipratropium.', { d: [0] }),
          pred: G('Steroid.', { d: [2] }), niv: S('The pH is improving: NIV is not needed unless it falls again.'),
          co2alert: G('Record the CO2 alert in his notes.'), team: G('Inform the treating team.'),
          o2: N('Keep the target at 88 to 92%.', { d: [0, 2], harmDose: [3, 4] }), morph: X('Reduces breathing drive.', { harmDose: [0, 1] })
        },
        ok: { text: 'By morning his gas is pH 7.38, pCO2 58, and he is on 2 L/min by nasal prongs.' }, miss: { text: 'The oxygen creeps up overnight and the pH falls to 7.25 again.' } }
    ] }
  },
  {
    id: 'ab2', title: 'A normal pH, two problems', time: '19:00', where: 'Emergency department',
    blurb: 'A heavy drinker with vomiting and an almost normal pH. Tests spotting a mixed disorder and the thiamine rule.',
    intro: '48-year-old man with alcohol dependence. He has been vomiting for three days, drinking little and eating nothing. He has abdominal pain and is shaky. The gas is nearly normal, but the numbers do not fit.',
    vit: { hr: 112, sbp: 108, dbp: 64, spo2: 97, rr: 24 },
    facts: ['48M, heavy alcohol use, vomiting for 3 days', 'Gas: pH 7.40, pCO2 33, bicarbonate 21', 'Sodium 138, chloride 85, potassium 3.0', 'Anion gap 32, beta-hydroxybutyrate 5.2', 'Glucose 4.2 mmol/L, lactate 2.8'],
    decisions: [
      { tag: 'ab-read', scene: 'pH 7.40, pCO2 33, bicarbonate 21, anion gap 32. What do you make of it?', opts: [
        o('best', 'A high anion gap acidosis with a hidden metabolic alkalosis from vomiting', 'The gap rose by about 20 and the bicarbonate fell by only 3. Two disorders cancel each other.'),
        o('poor', 'A normal gas, so no concern', 'The anion gap of 32 is far from normal.'),
        o('poor', 'A pure respiratory alkalosis', 'The bicarbonate and the gap say otherwise.'),
        o('harm', 'Ignore the gap and treat the stomach pain', 'The gap tells you why he is unwell.')] },
      { tag: 'ab-gap', scene: 'The ketones are 5.2 and the glucose is 4.2. What is the cause of the gap?', opts: [
        o('best', 'Alcoholic ketoacidosis (starvation and alcohol), with a little lactate', 'Raised ketones with a normal or low glucose in a heavy drinker.'),
        o('poor', 'Diabetic ketoacidosis', 'The glucose is low. This is alcoholic ketoacidosis.'),
        o('poor', 'Renal failure', 'The kidney numbers are not the cause.'),
        o('harm', 'A normal fast, no problem', 'This is dangerous.')] },
      { tag: 'ab-act', scene: 'What do you give first?', opts: [
        o('best', 'Thiamine, then fluids with glucose, and replace the potassium and magnesium', 'Thiamine before glucose, to avoid precipitating Wernicke. Fix the dehydration and electrolytes.', { hr: 98 }),
        o('poor', 'Glucose first, thiamine later', 'Thiamine goes before the glucose.'),
        o('poor', 'Sodium bicarbonate to correct the pH', 'The pH is normal. Bicarbonate is wrong.'),
        o('harm', 'An insulin infusion', 'His glucose is already low: insulin risks hypoglycaemia. This is not diabetic ketoacidosis.')] },
      { tag: 'ab-act', scene: 'Four hours later the potassium is 2.6 after the fluids. What now?', opts: [
        o('best', 'Replace potassium by the safe IV route on a monitor, check and replace magnesium, and recheck', 'Fluids and ketone clearance drive potassium into cells. Replace it safely.'),
        o('harm', 'Wait and recheck in the morning', 'The potassium is low and falling. Replace it.'),
        o('poor', 'Stop the fluids to protect the potassium', 'Fluids are the treatment.'),
        o('harm', '40 mmol of potassium as a push', 'Never push potassium.')] }
    ],
    ends: { hi: 'Thiamine, fluids, potassium and magnesium. His ketones clear by the next morning.', mid: 'He recovers, but thiamine was late.', lo: 'He becomes confused and ataxic after glucose given before thiamine.' },
    hard: { debrief: 'A gas that looks normal but a gap of 32 means two disorders. Thiamine first, then fluids and electrolytes.', steps: [
      { label: 'The first hour', tag: 'ab-act', time: '19:00', window: 'Now: the first hour',
        scene: 'Vomiting, heavy drinker, ketones 5.2, glucose 4.2, potassium 3.0. What do you order?',
        first: ['thiamine'], firstWhy: 'Thiamine goes before any glucose in a heavy drinker.',
        plan: PL(['reg', ['none'], 'A gap of 32 with low potassium: tell your registrar.'], ['spo2ecg', ['q15'], 'Low potassium and a tachycardia: ECG monitoring.'], ['h1', ['m20'], 'Reassess after fluids and recheck the gas.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), thiamine: N('Thiamine first, before glucose.', { d: [0], crit: true }),
          bsl: N('Glucose now and regularly.'), ketones: N('Beta-hydroxybutyrate to follow.'),
          bolus: N('0.9% saline bolus, reassess after each.', { alt: ['bolus250'] }), bolus250: G('A measured bolus.'),
          mg: N('Magnesium and phosphate: low in heavy drinkers.'), kcl_iv: N('Replace the potassium safely.', { d: [0], harmDose: [1, 2, 3] }),
          uec: N('Electrolytes and kidney function.'), abg: G('Repeat gas.'), lactate: G('Lactate.'), serum_osm: G('Osmolality: look for an osmolar gap if you suspect toxic alcohol.'),
          lft: G('Liver function.'), ecg: G('ECG for low potassium.'), antiemetic: G('Treat the vomiting.', { d: [0] }),
          bicarb: X('The pH is normal. Bicarbonate is not indicated.', { harmDose: [0, 1, 2] }),
          insulin_k: X('His glucose is low. Insulin risks hypoglycaemia.', { harmDose: [0, 1, 2, 3, 4] }), furo: X('A diuretic on a dry patient.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'After thiamine, fluids and potassium, his ketones are falling and his heart rate is 92. The potassium is 3.4.', vit: { hr: 92, rr: 18 }, facts: ['Potassium 3.4', 'Ketones 3.5'] },
        miss: { text: 'He becomes confused and unsteady, and cannot follow commands. This looks like Wernicke encephalopathy.', vit: { hr: 118 }, facts: ['Confusion, ataxia'] } },
      { label: 'The next four hours', tag: 'ab-act', time: '23:00', window: 'Next four hours',
        scene: 'Ketones 2.1, potassium 2.6, magnesium 0.5. What do you order?',
        plan: PL(['reg', ['none'], 'Tell your registrar about the low potassium and magnesium.'], ['spo2ecg', ['q15'], 'Monitor with an ECG while the potassium is low.'], ['h4', ['h1'], 'Repeat the potassium and the gas in a few hours.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), kcl_iv: N('Replace the potassium by the IV route, 10 mmol an hour.', { d: [0], crit: true, harmDose: [1, 2, 3] }), mgso4: N('Replace magnesium: the dose is a protocol decision.', { d: [0] }),
          uec: N('Recheck the potassium.'), bsl: G('Glucose checks.'), ketones: G('Repeat ketones.'), thiamine: G('Continue thiamine.', { d: [0] }),
          abg: G('Repeat gas.'), fbal: G('Fluid balance.'), ecg: G('Repeat ECG.'),
          bicarb: X('Not indicated.', { harmDose: [0, 1, 2] }), insulin_k: X('Risks hypoglycaemia.', { harmDose: [0, 1, 2, 3, 4] })
        },
        ok: { text: 'By morning the ketones are 0.4 and the potassium is 3.9. He is eating.' }, miss: { text: 'The potassium falls to 2.2 and he has an episode of VT overnight.', vit: { hr: 130 } } }
    ] }
  }
  ];
})(window);
