/* Acute kidney injury: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'aki-find': { n: 'Spotting AKI and its stage', tab: 1, r: 'Compare with the baseline. Creatinine rise or low urine output both count.' },
    'aki-cause': { n: 'Pre, intrinsic or post-renal cause', tab: 2, r: 'Look at volume, drugs and obstruction before ordering tests.' },
    'aki-first': { n: 'First-hour actions', tab: 3, r: 'Stop the nephrotoxins, scan the bladder, dipstick, fluid only if dry.' },
    'aki-call': { n: 'When to escalate', tab: 4, r: 'High potassium, overload, acidosis, active sediment and infected obstruction all need a call.' }
  };
  w.RMO_CASES = [
  {
    id: 'aki1', title: 'Dry after the knee', time: '07:30', where: 'Orthopaedic ward',
    blurb: 'An elderly man on day 2 after a knee replacement whose urine has dried up. Tests the cause and the first hour.',
    intro: '78-year-old man, day 2 after a total knee replacement. He takes ramipril and furosemide and has had ibuprofen and diclofenac for pain. He has had little to drink. The nurse calls: urine output is 120 mL over the last 12 hours and his BP is 96/58.',
    vit: { hr: 104, sbp: 96, dbp: 58, spo2: 96, rr: 18 },
    facts: ['78M, day 2 after total knee replacement', 'Home: ramipril, furosemide. Ward: regular ibuprofen', 'Urine output 120 mL in 12 hours', 'Dry mouth, JVP not seen, chest clear, no oedema', 'Creatinine 185 micromol/L today (baseline 88), potassium 5.3'],
    decisions: [
      { tag: 'aki-find', scene: 'The creatinine was 88 on admission and is 185 now. How do you describe this?', opts: [
        o('best', 'Stage 2 AKI: about twice his baseline, with low urine output', 'Right. 185 against 88 is about 2.1 times baseline. Low urine output supports it.'),
        o('ok', 'AKI of uncertain stage until I see the trend', 'Careful, but the baseline is known. Stage it now so you act at the right level.'),
        o('poor', 'Chronic kidney disease, nothing acute', 'The baseline was normal, so the rise is new.'),
        o('harm', 'Normal for a post-op patient, repeat tomorrow', 'A doubling of creatinine is never normal, and waiting costs kidney function.')] },
      { tag: 'aki-cause', scene: 'He looks dry. Which part of his drug chart is most likely behind this?', opts: [
        o('best', 'Ramipril, furosemide and ibuprofen together on a dry patient', 'This combination (ACE inhibitor, diuretic and NSAID) is a classic cause of pre-renal AKI.'),
        o('ok', 'Only the ibuprofen', 'It contributes, but the combination matters. Review all three.'),
        o('poor', 'The antibiotic prophylaxis from theatre', 'One dose is unlikely. The drugs he is on now fit better.'),
        o('harm', 'None of them, he just needs more furosemide', 'Furosemide in a dry, hypotensive patient makes this worse.')] },
      { tag: 'aki-first', scene: 'What do you do in the next 15 minutes?', opts: [
        o('best', 'Withhold ramipril, furosemide and ibuprofen, give a measured fluid bolus and reassess, start a urine output chart', 'Remove the cause and treat the dryness, reassessing after each bolus so you do not overload him.', { sbp: 110, dbp: 66, hr: 96 }),
        o('ok', 'Withhold the three drugs and encourage oral fluids', 'Good first step but too slow for a BP of 96 with low urine output.'),
        o('poor', 'Give a large fluid load, no reassessment', 'Fluid without reassessment risks overload in an older man.'),
        o('harm', 'Give furosemide to make urine', 'A diuretic in a dry patient drops the BP and the kidney function further.', { sbp: 88, dbp: 50 })] },
      { tag: 'aki-call', scene: 'Two hours later his BP is 118/70 and he has passed 200 mL. Creatinine and potassium are unchanged. What now?', opts: [
        o('best', 'Keep the drugs off, repeat bloods in the morning, and tell your registrar at handover', 'Responding to treatment: keep monitoring, and make sure the drug hold is written on the chart.'),
        o('ok', 'Call the renal team now', 'Not wrong, but he is responding and has no dangerous complication.'),
        o('poor', 'Restart ramipril because his BP has recovered', 'Not until the creatinine has settled. Restart is a later decision.'),
        o('harm', 'Stop monitoring urine output', 'The output chart is how you know he is recovering.')] }
    ],
    ends: { hi: 'Fluid, the three drugs held, and a watch on his urine. Creatinine is back to 100 within three days.', mid: 'He recovers, but a slow start meant a longer stay.', lo: 'His kidneys take longer to recover and his creatinine is still high when he goes home.' },
    hard: { debrief: 'Dry, three drugs that lower filtration pressure: withhold them, give fluid in measured amounts, reassess, and chart urine output.', steps: [
      { label: 'The first hour', tag: 'aki-first', time: '07:30', window: 'Now: the first hour',
        scene: 'Stage 2 AKI, BP 96/58, dry, urine output 120 mL in 12 hours, on ramipril, furosemide and ibuprofen. What do you order?',
        first: ['stop_raas', 'stop_diuretic', 'stop_nsaid2', 'bolus250'], firstWhy: 'Remove the cause and restore volume. Either can go first.',
        plan: PL(['reg', ['none'], 'AKI with hypotension: tell your registrar, but you do not need a MET call.'], ['q15', ['routine'], 'Obs every 15 minutes while his BP is low. Chart the hourly urine output too: it tells you if the fluid is working.'], ['h1', ['m20'], 'Reassess after each bolus and at an hour.']),
        orders: {
          stop_raas: N('Ramipril lowers the pressure that drives filtration: withhold it.'),
          stop_diuretic: N('Furosemide on a dry patient: withhold it.'),
          stop_nsaid2: N('NSAIDs narrow the kidney arteriole: withhold them and write it on the chart.', { crit: true }),
          bolus250: N('A measured bolus of 250 to 500 mL, reassessed after each, treats the dryness.', { alt: ['bolus'] }), bolus: G('A bolus is right; 250 mL steps with reassessment are safer in the elderly.'),
          urine_dip: N('Dipstick for blood and protein: rules in or out an intrinsic cause.'),
          bladder_scan: G('Quick, and obstruction is the cause you must not miss.'),
          uec: G('Repeat the creatinine and potassium after fluid and the drug hold.'),
          lyingstanding: G('Assesses volume status.'),
          hourly_uo: G('Urine output is the early sign of recovery.'),
          fbal: G('Strict fluid balance chart.'),
          ecg: G('Potassium is 5.3: a baseline ECG is reasonable.'),
          renal_us: S('Not yet: no sign of obstruction, and he is likely dry. Image if he does not respond.'),
          idc: S('A catheter adds infection risk. Use a scan first; only catheterise if retention.'),
          furo: X('A diuretic on a dry, hypotensive patient makes it worse.', { harmDose: [0, 1, 2, 3] }),
          ibup: X('More NSAID injures the kidney.'), maint: S('Not a replacement for measured boluses.'),
          cxr: S('No chest signs.'), ctpa: S('No reason for a CT with contrast: it adds a nephrotoxin.'),
          gent: X('Aminoglycosides are nephrotoxic and there is no infection here.')
        },
        ok: { text: 'After 750 mL in three boluses his BP is 118/70. He has passed 250 mL in two hours. The dipstick is negative and the potassium is 5.3.', vit: { sbp: 118, dbp: 70, hr: 88 }, facts: ['Dipstick: no blood or protein', 'Responds to 750 mL of fluid'] },
        miss: { text: 'An hour later his BP has dropped to 86/50 and he has passed 20 mL. His creatinine climbs overnight to 260.', vit: { sbp: 86, dbp: 50, hr: 118 }, facts: ['Creatinine 260 overnight'] } },
      { label: 'Next day', tag: 'aki-call', time: '07:30', window: 'The next morning',
        scene: 'Creatinine is 140, potassium 4.8, BP 126/74, urine output 60 mL an hour. What is the plan for the day?',
        plan: PL(['none', ['reg'], 'Recovering: no call needed. Handing over to your registrar is fine.'], ['routine', ['q15', 'spo2'], 'Routine obs now he is stable.'], ['am', ['h4'], 'Review again the next morning, with bloods.']),
        orders: {
          stop_raas: N('Keep ramipril off until the creatinine has settled.'), stop_diuretic: N('Keep furosemide off while he is recovering; review the need later.'), stop_nsaid2: N('Keep NSAIDs off. Use paracetamol.'),
          paracet: G('Paracetamol for pain.', { d: [0] }),
          uec: N('Repeat bloods in the morning to confirm recovery.'), fbal: G('Keep the balance chart until it settles.'), weigh: G('Daily weights.'),
          neph_ref: S('Not needed: he is recovering and the cause is clear.'), renal_us: S('The cause is clear; not needed unless he fails to recover.'),
          ibup: X('The NSAID that hurt his kidney.'), maint: S('He is drinking; stop IV fluids once he is euvolaemic.')
        },
        ok: { text: 'His creatinine is 105 on day four and his ramipril is restarted at a lower dose with a creatinine check.' }, miss: { text: 'The creatinine climbs again after the NSAID is restarted.' } }
    ] }
  },
  {
    id: 'aki2', title: 'Full bladder, slow urine', time: '02:00', where: 'Surgical ward',
    blurb: 'An elderly man with a rising creatinine and a swollen lower abdomen. Tests obstruction, catheter and potassium.',
    intro: '82-year-old man, day 3 after a hernia repair, on a PCA with morphine. He has known prostate enlargement. The nurse calls: he is restless, has passed 40 mL in 12 hours, and his lower abdomen is firm.',
    vit: { hr: 98, sbp: 156, dbp: 90, spo2: 95, rr: 18 },
    facts: ['82M, day 3 after inguinal hernia repair', 'Known BPH. Morphine PCA', 'Urine output 40 mL in 12 hours', 'Suprapubic dullness and tenderness', 'Creatinine 240 (baseline 95), potassium 6.1'],
    decisions: [
      { tag: 'aki-cause', scene: 'Restless, tender suprapubic mass, almost no urine. What is the most likely cause?', opts: [
        o('best', 'Post-renal: urinary retention from BPH and opioids', 'A known prostate, morphine and a distended bladder: retention first.'),
        o('ok', 'Pre-renal from dryness', 'Possible, but the firm lower abdomen points to retention.'),
        o('poor', 'Glomerulonephritis', 'No blood, protein or systemic signs.'),
        o('harm', 'Nothing urgent, wait for the morning round', 'Obstruction is reversible and the longer it lasts, the more kidney is lost.')] },
      { tag: 'aki-first', scene: 'What do you do first?', opts: [
        o('best', 'Bladder scan, then insert a catheter and measure the volume', 'Confirm and relieve it at once.', { hr: 92 }),
        o('ok', 'Send a renal ultrasound first', 'It would show it, but a bladder scan at the bedside is faster.'),
        o('poor', 'Give a litre of fluid', 'This is not a dry patient; fluid will not help a blocked bladder.'),
        o('harm', 'Give furosemide to wash it out', 'A diuretic does nothing against an obstruction.')] },
      { tag: 'aki-call', scene: 'The catheter drains 1.4 L. His potassium is 6.1 and the ECG is normal. What next?', opts: [
        o('best', 'Hourly urine output, repeat bloods in a few hours, and treat the potassium per protocol if it stays high', 'Watch for post-obstructive diuresis and recheck the potassium.'),
        o('poor', 'Remove the catheter now that it has drained', 'Too early: he needs a trial of void after the cause is treated.'),
        o('poor', 'Stop the observations, the problem is solved', 'He may diurese heavily and become dry.'),
        o('harm', 'Give 10 units of insulin on its own to push the potassium down', 'Insulin without glucose risks severe hypoglycaemia. Relieve the obstruction first and recheck the potassium.')] }
    ],
    ends: { hi: 'The bladder is drained, the creatinine falls over a day and the catheter stays for a trial of void.', mid: 'He recovers, but you were slow to relieve the obstruction.', lo: 'His kidneys take much longer to recover.' },
    hard: { debrief: 'Check for retention in every AKI. Bladder scan, catheter, hourly urine output and watch the potassium.', steps: [
      { label: 'The first 15 minutes', tag: 'aki-first', time: '02:00', window: 'Now',
        scene: 'Firm suprapubic mass, 40 mL of urine in 12 hours, creatinine 240, potassium 6.1. What do you order?',
        first: ['bladder_scan', 'idc'], firstWhy: 'Confirm and relieve the obstruction.',
        plan: PL(['reg', ['none'], 'Tell your registrar about the potassium and the AKI.'], ['spo2ecg', ['q15'], 'Potassium 6.1: a monitored bed with an ECG. Chart hourly output as well, for post-obstructive diuresis.'], ['h1', ['m20'], 'Recheck the volume drained and the output within the hour.']),
        orders: {
          bladder_scan: N('Quickest way to confirm retention.', { alt: ['idc'] }),
          idc: N('Relieve the retention. Record the volume drained.', { crit: true }),
          ecg: N('Potassium 6.1: check for ECG changes.'),
          uec: N('Repeat the potassium after the retention is relieved.'),
          hourly_uo: G('Watch for post-obstructive diuresis.'), stop_nsaid2: G('Make sure none are charted.'),
          drugchart: G('The morphine PCA contributed: ask the team to review the opioid.'),
          renal_us: G('Ultrasound later for hydronephrosis.'),
          fbal: G('Strict fluid balance.'),
          urine_dip: G('Dipstick and a urine culture, as the bladder was blocked.'),
          bolus250: S('Not dry: fluid will not help a blocked bladder.'), furo: X('A diuretic does not treat an obstruction.', { harmDose: [0, 1, 2, 3] }),
          ca_gluc: S('Not needed with a normal ECG and a potassium of 6.1: relieve the obstruction first.', { harmDose: [] }),
          insulin_k: S('Hold: the potassium may fall once the obstruction is relieved. Recheck first.', { harmDose: [] }),
          morph: X('More opioid worsens retention.'), oxyc: X('More opioid worsens retention.')
        },
        ok: { text: 'The scan shows 1.4 L. After the catheter the urine output is 300 mL an hour and he is calmer. His potassium falls to 5.4.', vit: { hr: 88, sbp: 142, dbp: 84 }, facts: ['Catheter drained 1.4 L', 'Potassium 5.4 after relief'] },
        miss: { text: 'Two hours later he is vomiting and drowsy. The potassium is 6.6 and his ECG has peaked T waves.', vit: { hr: 112, sbp: 170, dbp: 98 }, facts: ['Potassium 6.6, peaked T waves'] } },
      { label: 'After the catheter', tag: 'aki-call', time: '04:00', window: 'Two hours later',
        scene: 'He is passing 400 mL an hour. BP is 128/74 and HR 96. What do you order for the rest of the night?',
        plan: PL(['none', ['reg'], 'Stable, with a plan in place. Handover to the day team.'], ['routine', ['q15'], 'Routine obs, with the hourly urine output on the chart: he may lose a lot of fluid.'], ['h4', ['h1'], 'Review with bloods in a few hours.']),
        orders: {
          hourly_uo: N('Watch for a large post-obstructive diuresis.'), uec: N('Repeat bloods in a few hours.'), fbal: N('Strict fluid balance.'), lyingstanding: G('Check for dryness.'),
          renal_us: G('Ultrasound to look for hydronephrosis.'), urology_ref: G('Review the cause of the retention and plan a trial of void.'),
          bolus250: G('Replace if he becomes dry. Do not match every millilitre.'),
          ca_gluc: S('Not needed.'), idc: S('The catheter is already in.'), furo: X('He is already diuresing.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'By morning the output settles and the creatinine is 150. Urology plan a trial of void.' }, miss: { text: 'He dries out with a large diuresis and his creatinine climbs again.' } }
    ] }
  }
  ];
})(window);
