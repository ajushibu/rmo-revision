/* Hypercalcaemia: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'hyperca-grade': { n: 'Grade it on the corrected calcium', tab: 1, r: 'Correct for albumin. Moderate is 3.0 to 3.4, severe is 3.5 or more.' },
    'hyperca-fluid': { n: 'Rehydrate first', tab: 2, r: '0.9% saline 4 to 6 L over 24 hours, with a check for overload after each litre.' },
    'hyperca-drug': { n: 'Then lower the calcium', tab: 2, r: 'Zoledronic acid after rehydration, adjusted for the kidney.' },
    'hyperca-cause': { n: 'Find the cause', tab: 3, r: 'PTH, drugs, and cancer screening. Stop calcium, vitamin D and thiazides.' }
  };
  w.RMO_CASES = [
  {
    id: 'hyperca1', title: 'Confused with a lung mass', time: '16:00', where: 'Oncology ward',
    blurb: 'A man with lung cancer who is confused, thirsty and constipated. Tests fluids first, then zoledronic acid.',
    intro: '68-year-old man with known lung cancer. He has had two days of thirst, constipation and confusion. He is dry. The corrected calcium is 3.4 and the creatinine 150 (baseline 90).',
    vit: { hr: 104, sbp: 108, dbp: 64, spo2: 95, rr: 18 },
    facts: ['68M, lung cancer', 'Thirst, constipation, confusion', 'Corrected calcium 3.4, creatinine 150 (baseline 90)', 'Dry mouth, drowsy', 'ECG: short QT'],
    decisions: [
      { tag: 'hyperca-grade', scene: 'Corrected calcium 3.4, confused, with an AKI. How do you grade it?', opts: [
        o('best', 'Moderate, but symptomatic with an AKI: treat now', 'It is in the moderate range, and confusion and AKI make it urgent.'),
        o('poor', 'Mild, repeat tomorrow', 'He is symptomatic.'),
        o('poor', 'Normal for a cancer patient', 'It is a treatable complication.'),
        o('harm', 'Ignore it, he is palliative', 'Treating it improves comfort and may avoid a bad end.')] },
      { tag: 'hyperca-fluid', scene: 'What is your first treatment?', opts: [
        o('best', '0.9% saline, aiming for 4 to 6 L over 24 hours, with a check for overload after each litre, and stop calcium and vitamin D', 'Rehydrate first. It lowers calcium by itself and helps the kidney.', { sbp: 118, hr: 96 }),
        o('poor', 'Zoledronic acid first, fluids after', 'The drug needs a rehydrated patient and kidney function.'),
        o('poor', 'Furosemide to wash out the calcium', 'He is dry. A diuretic makes it worse.'),
        o('harm', 'Oral calcium supplements for his bones', 'Calcium tablets raise the calcium further.')] },
      { tag: 'hyperca-drug', scene: 'After 6 hours of fluid the calcium is 3.2. Next?', opts: [
        o('best', 'Zoledronic acid 4 mg over 15 minutes, dose adjusted to kidney function, with fluids continuing', 'Now rehydrated: add the bisphosphonate.'),
        o('poor', 'Stop the fluids and watch', 'The calcium will not fall enough.'),
        o('poor', 'Give zoledronic acid as a quick push', 'It must run over at least 15 minutes.'),
        o('harm', 'Give a 40 mg dose to hurry it', 'Ten times the dose.')] },
      { tag: 'hyperca-cause', scene: 'What else should be done?', opts: [
        o('best', 'Check the PTH, tell the oncology team, and review the plan for the cancer', 'A low PTH points to cancer: the long-term fix is the cancer plan.'),
        o('poor', 'Do nothing more once the calcium is lower', 'It will come back.'),
        o('poor', 'Restart calcium tablets', 'They raise the level again.'),
        o('harm', 'Cancel oncology follow-up', 'This needs oncology input.')] }
    ],
    ends: { hi: 'Fluids, zoledronic acid and the oncology plan. His calcium is 2.7 by day three and he is clearer.', mid: 'The calcium comes down, but the follow-up plan is thin.', lo: 'He becomes more drowsy and his kidney function worsens.' },
    hard: { debrief: 'Fluids first, then zoledronic acid at the right dose and time, and a cancer plan.', steps: [
      { label: 'The first few hours', tag: 'hyperca-fluid', time: '16:00', window: 'Now: the first few hours',
        scene: 'Corrected calcium 3.4, AKI, dry, confused, short QT. What do you order?',
        first: ['sal_hyd'], firstWhy: 'Rehydration is the first step and the main treatment.',
        plan: PL(['reg', ['none'], 'A symptomatic hypercalcaemia of 3.4 with an AKI: tell your registrar.'], ['spo2ecg', ['q15'], 'Monitor the ECG and check for overload.'], ['h4', ['h1'], 'Reassess the volume status and bloods in a few hours.']),
        orders: {
          sal_hyd: N('Rehydrate, reassessing for overload with each litre.', { d: [0], crit: true, harmDose: [3] }),
          stop_ca_vitd: N('Stop calcium and vitamin D.'), calcium: N('Calcium, albumin and phosphate.'), uec: N('Kidney function.'), mg: G('Magnesium.'),
          pth: N('PTH: low in cancer, high or normal in parathyroid disease.'), ecg: N('Short QT and rhythm.'), fbal: N('Fluid balance.'), hourly_uo: G('Urine output.'),
          weigh: G('Daily weight.'), cxr: G('Chest X-ray: overload.'), spep: G('Myeloma screen.'), haem_ref: G('Oncology input.'),
          zoled: S('Not yet: he is still dry. Zoledronic acid goes in once he is rehydrated (the next step).', { d: [0], harmDose: [1, 2, 3] }),
          stop_nephro: G('Review the chart for nephrotoxins.'), antiemetic: G('Nausea.', { d: [0] }),
          furo: X('He is dry.', { harmDose: [0, 1, 2, 3] }), bolus250: G('A measured bolus is fine for a dry patient.', { alt: ['bolus'] }), bolus: G('A bolus.')
        },
        ok: { text: 'After 3 L of saline he is clearer and the calcium is 3.2. Urine output is 60 mL an hour.', vit: { hr: 94, sbp: 118 }, facts: ['Calcium 3.2'] },
        miss: { text: 'By evening the calcium is 3.6 and he is hard to wake. Creatinine is 190.', vit: { hr: 112, sbp: 98 }, facts: ['Calcium 3.6', 'Creatinine 190'] } },
      { label: 'After fluids', tag: 'hyperca-drug', time: '22:00', window: 'That evening',
        scene: 'He is rehydrated, calcium 3.2, creatinine 125, urine 60 mL an hour. What do you order now?',
        plan: PL(['reg', ['none'], 'Tell your registrar before the zoledronic acid is given.'], ['routine', ['q15'], 'Routine observations, watching for overload.'], ['am', ['h4'], 'Recheck calcium and creatinine tomorrow.']),
        orders: {
          zoled: N('Zoledronic acid after rehydration, adjusted for kidney function.', { d: [0], crit: true, harmDose: [1, 2, 3] }),
          sal_hyd: G('Continue fluids.', { d: [0], harmDose: [3] }), uec: N('Recheck tomorrow.'), calcium: N('Recheck tomorrow.'),
          haem_ref: N('Oncology: the cancer plan.'), fbal: G('Fluid balance.'), pred_ca: S('Steroids are for lymphoma, myeloma or sarcoid, not lung cancer.', { d: [0] }),
          furo: X('Only if overloaded.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'By day three his calcium is 2.7. Oncology plans palliative radiotherapy for the bone.' }, miss: { text: 'The calcium stays at 3.3 and he is no clearer on day three.' } }
    ] }
  },
  {
    id: 'hyperca2', title: 'Stones and a thiazide', time: '11:00', where: 'Medical ward',
    blurb: 'A woman with a mild raised calcium on a thiazide and supplements. Tests when not to over-treat.',
    intro: '62-year-old woman admitted with abdominal pain and constipation. She has had kidney stones before. She takes a thiazide and calcium with vitamin D. Corrected calcium 2.9, PTH raised, creatinine normal.',
    vit: { hr: 78, sbp: 136, dbp: 80, spo2: 98, rr: 14 },
    facts: ['62F, past kidney stones', 'Constipation and abdominal pain, well otherwise', 'Takes a thiazide, calcium and vitamin D', 'Corrected calcium 2.9, PTH raised', 'Creatinine normal'],
    decisions: [
      { tag: 'hyperca-grade', scene: 'Corrected calcium 2.9, mild symptoms. How do you grade it?', opts: [
        o('best', 'Mild: stop the drugs, oral fluids and find the cause', 'Under 3.0 is mild.'),
        o('poor', 'Severe, give a bisphosphonate now', 'Far too strong for 2.9.'),
        o('poor', 'Normal', 'It is above the range.'),
        o('harm', 'Dangerous: start 6 L of saline', 'Not needed at this level.')] },
      { tag: 'hyperca-cause', scene: 'The PTH is raised. What does that suggest?', opts: [
        o('best', 'Primary hyperparathyroidism, with a thiazide and supplements making it worse', 'A high PTH with a high calcium points to the parathyroid.'),
        o('poor', 'Cancer', 'Cancer lowers the PTH.'),
        o('poor', 'A vitamin D overdose', 'It would suppress the PTH.'),
        o('harm', 'Nothing important', 'It matters for the long-term plan.')] },
      { tag: 'hyperca-fluid', scene: 'What do you do today?', opts: [
        o('best', 'Stop the thiazide, calcium and vitamin D, encourage oral fluids, and repeat the calcium tomorrow', 'Remove the contributors and hydrate.'),
        o('poor', 'Continue everything and start IV zoledronic acid', 'Not for a mild rise.'),
        o('poor', 'Add prednisolone', 'Not for parathyroid disease.'),
        o('harm', 'Restrict her fluids', 'It encourages stones and a worse calcium.')] },
      { tag: 'hyperca-cause', scene: 'What is the plan before she leaves?', opts: [
        o('best', 'Endocrine or surgical follow-up for the parathyroid, a kidney ultrasound, and clear advice on fluids and drugs', 'Primary hyperparathyroidism needs a plan.'),
        o('poor', 'Tell her to restart her tablets once home', 'The thiazide and supplements may be the problem.'),
        o('poor', 'No follow-up, the calcium is mild', 'Stones and bone loss are the long-term risks.'),
        o('harm', 'Discharge on a larger vitamin D dose', 'It would raise the calcium.')] }
    ],
    ends: { hi: 'Drugs stopped, fluids and a parathyroid plan. Her calcium is 2.6.', mid: 'She recovers, but the parathyroid follow-up is missed.', lo: 'Her calcium rises again after she restarts the supplements.' },
    hard: { debrief: 'A mild case: stop the contributors, oral fluids, and a plan for the parathyroid. Do not over-treat.', steps: [
      { label: 'The first hours', tag: 'hyperca-fluid', time: '11:00', window: 'Now: the first few hours',
        scene: 'Corrected calcium 2.9, PTH raised, on a thiazide with calcium and vitamin D, well, kidney function normal. What do you order?',
        first: ['stop_diuretic', 'stop_ca_vitd'], firstWhy: 'Remove the contributors first.',
        plan: PL(['none', ['reg'], 'A mild, stable picture: no call needed. Handing over to your registrar is fine.'], ['routine', ['q15'], 'Routine observations.'], ['am', ['h4'], 'Recheck the calcium tomorrow.']),
        orders: {
          stop_diuretic: N('Stop the thiazide: it raises the calcium.'), stop_ca_vitd: N('Stop calcium and vitamin D.'),
          calcium: N('Calcium, albumin and phosphate.'), pth: N('PTH.'), uec: N('Kidney function.'),
          ecg: G('ECG.'), renal_us: G('Kidney ultrasound: stones.'), endo_ref: N('Endocrine follow-up.'),
          fbal: G('Fluid balance.'), maint: S('She is drinking: oral fluids are enough.'),
          zoled: S('Not for a mild rise.', { d: [0], harmDose: [1, 2, 3] }), sal_hyd: S('Large volumes are for moderate or severe.', { d: [0], harmDose: [3] }),
          pred_ca: S('Steroids do not work for hyperparathyroidism.', { d: [0] }), furo: X('Not needed and dehydrating.', { harmDose: [0, 1, 2, 3] }),
          frestrict: X('Restricting fluids.')
        },
        ok: { text: 'By tomorrow her calcium is 2.7. The PTH is raised and endocrinology will see her.', facts: ['Calcium 2.7', 'PTH raised'] },
        miss: { text: 'The calcium is 3.1 by tomorrow because the thiazide and supplements continued.', facts: ['Calcium 3.1'] } },
      { label: 'Before discharge', tag: 'hyperca-cause', time: '09:00', window: 'Next morning',
        scene: 'Calcium 2.6, drinking well, constipation better. What is the plan?',
        plan: PL(['none', ['reg'], 'Stable. No call needed.'], ['routine', ['q15'], 'Routine.'], ['am', ['h4'], 'Recheck in clinic.']),
        orders: {
          endo_ref: N('Endocrine or surgical follow-up for primary hyperparathyroidism.'), calcium: G('Recheck in clinic.'), gp: G('GP follow-up with a calcium check.'),
          renal_us: G('Ultrasound for stones.'), stop_diuretic: G('Keep the thiazide off.'), stop_ca_vitd: G('Keep the supplements off.'),
          zoled: S('Not needed.', { d: [0], harmDose: [1, 2, 3] })
        },
        ok: { text: 'She goes home with clear advice and a parathyroid clinic appointment.' }, miss: { text: 'She goes home on the old tablets and the calcium is 3.0 two weeks later.' } }
    ] }
  }
  ];
})(window);
