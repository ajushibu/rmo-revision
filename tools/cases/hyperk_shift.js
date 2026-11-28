/* Hyperkalaemia: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'hk-grade': { n: 'Grading and the ECG', tab: 1, r: 'Potassium 6.5 or more, or any ECG change, is an emergency.' },
    'hk-protect': { n: 'Protect the heart with calcium', tab: 2, r: 'Calcium gluconate 10 mL of 10% over 2 to 3 minutes, on a monitor, for ECG changes.' },
    'hk-shift': { n: 'Shift the potassium safely', tab: 2, r: 'Insulin with glucose, and a glucose check afterwards: the dip can come late.' },
    'hk-after': { n: 'Remove, recheck, find the cause', tab: 3, r: 'The potassium rebounds. Recheck every 2 hours, find the cause and call renal.' }
  };
  w.RMO_CASES = [
  {
    id: 'hk1', title: 'The missed dialysis', time: '03:30', where: 'Emergency department',
    blurb: 'A dialysis patient who missed two sessions arrives weak, with a slow pulse. Tests calcium, insulin and the dialysis call.',
    intro: '64-year-old man on haemodialysis three times a week. He missed the last two sessions. He arrives weak, nauseated and short of breath. Pulse 44.',
    vit: { rhythm: 'hyperk2', hr: 44, sbp: 150, dbp: 80, spo2: 94, rr: 22 },
    facts: ['64M, end-stage kidney disease, haemodialysis Mon, Wed, Fri', 'Missed two sessions', 'Weak, nauseated, mild breathlessness', 'Potassium 7.4 mmol/L, bicarbonate 14', 'ECG: wide QRS, flat P waves, tall T waves'],
    decisions: [
      { tag: 'hk-grade', scene: 'Potassium 7.4 with a wide QRS and a heart rate of 44. How serious is this?', opts: [
        o('best', 'Life-threatening: an emergency with ECG changes', 'A potassium of 7 or more with a wide QRS is an emergency whatever else is true.'),
        o('poor', 'Severe, but wait for a repeat first', 'The ECG changes mean you treat now. Repeat bloods later.'),
        o('poor', 'Mild: a missed dialysis often does this', 'This is far from mild.'),
        o('harm', 'Probably haemolysis, repeat the sample', 'With a wide QRS, assume it is real and treat.')] },
      { tag: 'hk-protect', scene: 'He is on a monitor with a cannula in. What is your first drug?', opts: [
        o('best', 'Calcium gluconate 10% 10 mL IV over 2 to 3 minutes', 'Right. It stabilises the heart within minutes. Repeat the ECG after 5 to 10 minutes.', { hr: 56 }),
        o('poor', 'Insulin with glucose first', 'This is the second step. The heart comes first.'),
        o('poor', 'Resonium by mouth', 'Too slow when the heart is at risk.'),
        o('harm', 'Sodium bicarbonate 100 mL as a push', 'Bicarbonate has a limited role and a push of 100 mL is wrong.')] },
      { tag: 'hk-shift', scene: 'The ECG is better. Next you shift the potassium. Which regimen?', opts: [
        o('best', '10 units of Actrapid in 50 mL of glucose 50% over 30 minutes, then glucose checks', 'Insulin shifts potassium into cells. Check the glucose before and every 30 minutes for 2 hours.', { hr: 62 }),
        o('poor', '10 units of Actrapid IV with 50 mL of glucose 5%', 'Glucose 5% in that volume gives too little glucose. Use 50%.'),
        o('poor', 'Insulin only, as the glucose is normal', 'He will drop his glucose. Always give the glucose.'),
        o('harm', '50 units of Actrapid with 50 mL of glucose 50%', 'Far too much insulin: dangerous hypoglycaemia.')] },
      { tag: 'hk-after', scene: 'Potassium is 6.3 after treatment. He is anuric. What now?', opts: [
        o('best', 'Call renal for dialysis, recheck the potassium every 2 hours, and keep the glucose checks going', 'The shift is temporary. Dialysis removes the potassium. The rebound risk is real.'),
        o('poor', 'Give more insulin and resin and admit', 'These help but he needs dialysis.'),
        o('poor', 'Discharge when the ECG is normal', 'The ECG may relapse in hours without dialysis.'),
        o('harm', 'Hold dialysis until the morning', 'Waiting leaves a dangerous potassium untreated.')] }
    ],
    ends: { hi: 'Calcium, insulin and glucose, then dialysis. His potassium is 4.9 by morning.', mid: 'He is treated, but the dialysis call was slow.', lo: 'He deteriorates while you wait for dialysis.' },
    hard: { debrief: 'ECG changes mean calcium first. Then shift with insulin and glucose, watch the glucose, and arrange dialysis.', steps: [
      { label: 'The first 15 minutes', tag: 'hk-protect', time: '03:30', window: 'Now: the first 15 minutes',
        scene: 'Potassium 7.4, wide QRS, HR 44, anuric dialysis patient. What do you order?',
        first: ['ca_gluc'], firstWhy: 'Protect the heart first. It does not lower the potassium but it buys time.',
        plan: PL(['reg', ['met', 'icu'], 'ECG changes with bradycardia: get a senior now.'], ['spo2ecg', [], 'Continuous ECG: you need to see the rhythm.'], ['m5', [], 'Repeat the ECG 5 to 10 minutes after the calcium.']),
        orders: { kcl: X('Potassium is already high.'), ca_gluc: N('Calcium gluconate 10 mL of 10% over 2 to 3 minutes, on a monitor, for ECG changes (NSW and Queensland).', { d: [0], crit: true }),
          ecg: N('A 12-lead ECG, repeated 5 to 10 minutes after the calcium.'),
          insulin_k: N('Shift the potassium: 10 units in 50 mL glucose 50% over 30 minutes (NSW), or 5 units with 50 mL glucose 50% over 5 minutes in kidney failure (Queensland).', { d: [0, 1], harmDose: [2, 3, 4] }),
          bsl: N('Glucose before the insulin, then every 30 minutes for 2 hours.'),
          uec: N('Repeat the potassium on a gas sample or lab.'), vbg: G('A gas gives a fast potassium and bicarbonate.'),
          ivc: G('A large vein for the calcium.'),
          salb_k: G('An extra shifter (Queensland: 10 mg nebulised). Not a substitute for insulin and calcium.', { d: [0] }),
          bicarb: S('Only for a severe, persistent acidosis after volume and cause are assessed. Bicarbonate is 14 here: not the first move.', { harmDose: [1, 2] }),
          resonium: G('Removal, but slow. Dialysis is the real answer.', { d: [0] }),
          dialysis: N('A dialysis patient who missed sessions with ECG changes needs dialysis: call now.', { alt: ['neph_ref'] }), neph_ref: G('A call to renal is the step before dialysis.'),
          cxr: G('Look for fluid overload.'),
          furo: S('He is anuric: a loop diuretic will not work.', { harmDose: [] }),
          bolus: X('More fluid in an anuric, breathless patient adds overload.'),
          kcl_iv: X('Potassium is the problem.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'The QRS narrows and the heart rate is 62. The calcium bought time. The renal registrar is on the way.', vit: { rhythm: 'hyperk1', hr: 62 }, facts: ['ECG after calcium: QRS narrower, T waves still tall'] },
        miss: { text: 'Ten minutes later the QRS is wider and he has a sine-wave rhythm. He loses his pulse.', vit: { rhythm: 'sine', hr: 30, sbp: 80, dbp: 40 }, facts: ['Sine-wave rhythm'] } },
      { label: 'Shift and remove', tag: 'hk-after', time: '04:15', window: 'The next 30 minutes',
        scene: 'The ECG has improved. The potassium is 6.9 on repeat. The renal registrar is coming. What do you order next?',
        plan: PL(['reg', ['icu', 'met'], 'Keep your senior and renal informed.'], ['spo2ecg', [], 'Continuous ECG until the potassium is below 6.'], ['h1', ['m20'], 'Recheck the potassium and glucose within the hour, then every 2 hours.']),
        orders: { kcl: X('Potassium is already high.'), insulin_k: N('If not already given: shift the potassium.', { d: [0, 1], harmDose: [2, 3, 4] }), bsl: N('Glucose checks continue: 30 minutes for 2 hours, then hourly.'),
          uec: N('Recheck the potassium: every 2 hours until under 5.5.'), ecg: G('Repeat the ECG.'),
          dialysis: N('Arrange dialysis.', { alt: ['neph_ref'] }), neph_ref: G('Renal team aware.'),
          resonium: G('Removal while dialysis is arranged.', { d: [0] }), ca_gluc: G('Repeat if the ECG changes return.', { d: [0] }),
          stop_raas: G('Check for drugs that raise potassium.'), drugchart: G('Review the chart for potassium-raising drugs.'),
          fbal: G('Fluid balance.'), cxr: G('Look for overload.'),
          bicarb: S('Not first-line; reserved for severe, persistent acidosis.', { harmDose: [1, 2] }),
          furo: S('Anuric: no effect.', { harmDose: [] }), bolus: X('He is anuric and breathless.'), kcl_iv: X('Potassium is already high.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'He is on dialysis by 05:30 and the potassium is 4.8 by morning.' }, miss: { text: 'The potassium rebounds to 7.1 and he needs a second dose of calcium before dialysis starts.' } }
    ] }
  },
  {
    id: 'hk2', title: 'The spironolactone patient', time: '14:00', where: 'Medical ward',
    blurb: 'A patient with a high potassium and a normal ECG after starting a new drug. Tests when not to over-treat.',
    intro: '78-year-old woman admitted with a urinary infection. She takes ramipril and spironolactone. She had trimethoprim for three days. Creatinine has risen to 220 (baseline 110). The lab calls a potassium of 6.2.',
    vit: { rhythm: 'sinus', hr: 76, sbp: 122, dbp: 70, spo2: 97, rr: 16 },
    facts: ['78F, urinary infection, day 3 of trimethoprim', 'Ramipril, spironolactone', 'Creatinine 220 (baseline 110)', 'Potassium 6.2 on the lab', 'ECG: normal, no peaked T waves'],
    decisions: [
      { tag: 'hk-grade', scene: 'Potassium 6.2, ECG normal, sample not haemolysed. How do you grade it?', opts: [
        o('best', 'Moderate hyperkalaemia. Treat, with a monitored bed', '6.0 to 6.4 is moderate: treat and monitor.'),
        o('poor', 'Mild, repeat in the morning', 'Too lax at 6.2 with a rising creatinine.'),
        o('poor', 'Severe, give calcium now', 'Calcium is for ECG changes, and the ECG is normal.'),
        o('harm', 'Ignore it, her ECG is normal', 'A normal ECG does not make 6.2 safe in kidney injury.')] },
      { tag: 'hk-shift', scene: 'What do you give?', opts: [
        o('best', 'Insulin with glucose, withhold ramipril, spironolactone and trimethoprim, and check glucose', 'Shift and remove the cause. The ECG is normal so calcium is not needed now.'),
        o('poor', 'Resonium alone', 'Slow. The potassium is moderate and rising, so a shift is warranted.'),
        o('poor', 'Calcium and a bicarbonate infusion', 'Neither is indicated by a normal ECG and no acidosis.'),
        o('harm', 'Continue all her drugs and give resonium', 'The drugs are causing it.')] },
      { tag: 'hk-after', scene: 'Four hours later the potassium is 5.4. What is the plan?', opts: [
        o('best', 'Keep the drugs off, recheck in a few hours and in the morning, and find the cause of the AKI', 'The cause is the combination plus the AKI. Recheck for rebound.'),
        o('poor', 'Restart ramipril tomorrow', 'Not until the creatinine and potassium are stable.'),
        o('poor', 'Stop monitoring', 'The potassium can rebound as insulin wears off.'),
        o('harm', 'Give potassium-containing fluids', 'Avoid Hartmann’s while the potassium is high: it contains potassium. Use 0.9% saline if fluid is needed (Queensland Health).')] }
    ],
    ends: { hi: 'The drugs are stopped and the potassium falls to 4.9 the next day without a rebound.', mid: 'The potassium settles, but you gave more treatment than she needed.', lo: 'The potassium rebounds overnight.' },
    hard: { debrief: 'No ECG change means no calcium. Withhold the drugs, shift with insulin and glucose, and recheck for rebound.', steps: [
      { label: 'The first hour', tag: 'hk-shift', time: '14:00', window: 'Now: the first hour',
        scene: 'Potassium 6.2 with a normal ECG, creatinine 220, on ramipril, spironolactone and trimethoprim. What do you order?',
        first: ['stop_raas', 'insulin_k'], firstWhy: 'Remove the cause and treat the number. Either can go first, as the ECG is normal.',
        plan: PL(['reg', ['none'], 'Moderate hyperkalaemia in AKI: tell your registrar.'], ['spo2ecg', ['q15'], 'Moderate or severe hyperkalaemia needs a monitored bed.'], ['h1', ['m20'], 'Recheck the potassium within hours.']),
        orders: { kcl: X('Potassium is already high.'), stop_raas: N('Withhold ramipril and spironolactone.', { crit: true }), drugchart: N('Review the chart: trimethoprim also raises potassium.'),
          ecg: N('Check for ECG changes.'), uec: N('Repeat the potassium.'), bsl: N('Glucose check before the insulin.'),
          insulin_k: N('A shift is reasonable at 6.2 and rising in AKI.', { d: [0, 1], harmDose: [2, 3, 4] }),
          resonium: G('Removal.', { d: [0] }), hourly_uo: G('Urine output.'), renal_us: G('Look for obstruction.'),
          bladder_scan: G('Look for retention.'), urine_dip: G('Dipstick.'), neph_ref: G('Renal input for AKI.'),
          ca_gluc: S('The ECG is normal: calcium is for ECG changes.', { harmDose: [] }), bicarb: S('Not indicated without a severe acidosis.', { harmDose: [1, 2] }),
          kcl_iv: X('Potassium is already high.', { harmDose: [0, 1, 2, 3] }), salb_k: S('An extra shifter, not needed at this level.', { d: [0] })
        },
        ok: { text: 'Four hours later the potassium is 5.4 and the creatinine is 205. The glucose stayed between 5 and 8.', facts: ['Potassium 5.4', 'Glucose stable'] },
        miss: { text: 'Overnight the potassium rises to 6.8 and she has peaked T waves.', vit: { rhythm: 'hyperk1', hr: 54 }, facts: ['Potassium 6.8, peaked T waves'] } },
      { label: 'The next day', tag: 'hk-after', time: '08:00', window: 'Next morning',
        scene: 'Potassium 5.0, creatinine 160, BP 118/66. What is the plan?',
        plan: PL(['none', ['reg'], 'Stable and recovering.'], ['routine', ['q15'], 'Routine observations.'], ['am', ['h4'], 'Recheck bloods daily until stable.']),
        orders: { kcl: X('Potassium is already high.'), uec: N('Repeat the potassium and creatinine daily.'), stop_raas: N('Keep the drugs off until the kidneys settle.'),
          urine_mcs: G('Culture to guide the antibiotic: trimethoprim raises potassium.'),
          cefalexin: G('A different antibiotic, per eTG and the culture.'), neph_ref: S('Not needed if she keeps recovering.'),
          kcl_oral: X('She does not need potassium.', { harmDose: [0, 1] })
        },
        ok: { text: 'By day three her potassium is 4.6 and the ramipril is restarted at a lower dose with a potassium check.' }, miss: { text: 'Potassium climbs again once the drug hold is lifted too early.' } }
    ] }
  }
  ];
})(window);
