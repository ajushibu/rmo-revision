/* Hypokalaemia: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'hypok-cause': { n: 'Grade it and find the cause', tab: 1, r: 'ECG changes or digoxin make a low potassium urgent. Look for gut loss, diuretics and low magnesium.' },
    'hypok-route': { n: 'Oral or IV', tab: 2, r: 'Oral when the gut works and the ECG is normal. IV when severe or symptomatic.' },
    'hypok-safe': { n: 'Give IV potassium safely', tab: 2, r: '10 mmol in 100 mL over an hour, never a push, never added to a running bag.' },
    'hypok-after': { n: 'Magnesium, recheck, cause', tab: 3, r: 'Check magnesium, recheck the potassium, and fix the cause.' },
    'hypok-dig': { n: 'Low potassium on digoxin', tab: 1, r: 'Low potassium lets digoxin bind more. Monitor, hold the digoxin and the diuretic, send a level, replace potassium and magnesium. No reflex amiodarone.' },
    'hypok-aldo': { n: 'High BP with low potassium', tab: 1, r: 'Hypertension with low potassium (even on a diuretic) is a reason to screen for primary aldosteronism: aldosterone and renin once the potassium is corrected.' }
  };
  w.RMO_CASES = [
  {
    id: 'hypok1', title: 'Vomiting on digoxin', time: '22:00', where: 'Medical ward',
    blurb: 'An elderly woman with a gastro illness, on digoxin and furosemide, with a very low potassium and ectopics.',
    intro: '72-year-old woman with atrial fibrillation, on digoxin and furosemide. She has been vomiting and has had diarrhoea for three days. She feels weak and has palpitations. The potassium is back at 2.3.',
    vit: { rhythm: 'sinus+u+pvc+stdep+flat', hr: 96, sbp: 118, dbp: 70, spo2: 97, rr: 16 },
    facts: ['72F, AF on digoxin and furosemide', 'Vomiting and diarrhoea for 3 days', 'Weak, palpitations', 'Potassium 2.3, creatinine 130 (baseline 90)', 'ECG: flat T waves, U waves, frequent ventricular ectopics'],
    decisions: [
      { tag: 'hypok-cause', scene: 'Potassium 2.3, ectopics on the ECG, and she takes digoxin. How do you see this?', opts: [
        o('best', 'Severe and urgent: low potassium raises digoxin toxicity and arrhythmia risk', 'ECG changes plus digoxin make this an emergency.'),
        o('poor', 'Moderate, repeat the blood test first', 'The ECG shows it is real. Treat now.'),
        o('poor', 'Mild, give oral potassium', 'Too low for oral alone, with ectopics.'),
        o('harm', 'Not important, she is just dehydrated', 'This potassium can cause a fatal arrhythmia.')] },
      { tag: 'hypok-route', scene: 'What route do you use?', opts: [
        o('best', 'IV potassium chloride on a cardiac monitor', 'Severe with ECG changes, and she is vomiting: IV on a monitor.', { hr: 92 }),
        o('poor', 'Oral potassium only, she can swallow', 'She is vomiting and the potassium is very low.'),
        o('poor', 'Wait for a magnesium result before giving anything', 'Check magnesium, but start replacing the potassium now.'),
        o('harm', 'Stop all fluids and monitoring to rest her heart', 'Monitoring protects her.')] },
      { tag: 'hypok-safe', scene: 'The nurse asks how to give it. What is the order?', opts: [
        o('best', 'Potassium chloride 10 mmol in 100 mL over 1 hour, peripheral line, premixed bag', 'This is the safe ward rate. Repeat and recheck.'),
        o('harm', '40 mmol over 1 hour to get there faster', 'Faster than 10 mmol an hour needs a monitored setting and senior sign-off.'),
        o('poor', '20 mmol IV push over 5 minutes', 'Never push potassium.'),
        o('harm', 'Add 40 mmol to the running Hartmann bag', 'Never add it to a running bag: the mix is uneven and the dose uncontrolled.')] },
      { tag: 'hypok-after', scene: 'After the first bag the potassium is 2.8. What else do you do?', opts: [
        o('best', 'Check magnesium, withhold furosemide, tell your registrar about the digoxin, and recheck the potassium', 'Replace the magnesium too, fix the cause, and recheck.'),
        o('poor', 'Give another bag and stop there', 'The cause and magnesium are still unaddressed.'),
        o('poor', 'Restart furosemide to help her kidneys', 'The diuretic is losing more potassium.'),
        o('harm', 'Stop the potassium now that it has risen', 'It is still too low.')] }
    ],
    ends: { hi: 'IV potassium on a monitor, magnesium replaced, and the diuretic held. Her potassium is 3.8 by morning.', mid: 'Her potassium recovers, but a slow start left her at risk.', lo: 'She develops a run of ventricular tachycardia while the potassium is still low.' },
    hard: { debrief: 'Severe low potassium on digoxin: IV on a monitor at 10 mmol an hour, never a push, then magnesium and the cause.', steps: [
      { label: 'The first hour', tag: 'hypok-safe', time: '22:00', window: 'Now: the first hour',
        scene: 'Potassium 2.3, ectopics and U waves, on digoxin and furosemide, still vomiting. What do you order?',
        first: ['kcl_iv'], firstWhy: 'Replace it by the safe IV route: this is the treatment.',
        plan: PL(['reg', ['none'], 'Severe low potassium on digoxin: tell your registrar.'], ['spo2ecg', ['q15'], 'She needs a cardiac monitor while the potassium is below 3.'], ['h1', ['m20'], 'Recheck the potassium within hours of the first bag.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), kcl_iv: N('10 mmol in 100 mL over an hour, peripheral line, on a monitor. Repeat and recheck.', { d: [0], crit: true, harmDose: [1, 2, 3] }),
          ecg: N('A 12-lead ECG and a continuous monitor.'), uec: N('Repeat the potassium and creatinine.'),
          mg: N('Check magnesium: low levels stop the potassium from correcting.'),
          stop_diuretic: N('Withhold furosemide while she is losing potassium.'),
          drugchart: G('Check for other drugs that lower potassium.'), antiemetic: G('Treat the vomiting so she can keep fluids.', { d: [0] }),
          bolus250: G('She is dry: a measured bolus.', { alt: ['bolus'] }), bolus: G('Fluid is right; use measured boluses.'),
          fbal: G('Strict fluid balance.'), bsl: G('Glucose check.'), vbg: G('A gas gives a quick potassium and acid-base state.'),
          kcl_oral: S('She is vomiting and the potassium is very low: oral alone is not enough.', { d: [0] }),
          insulin_k: X('Insulin pushes potassium down further.', { harmDose: [0, 1, 2, 3, 4] }), salb_k: X('Salbutamol lowers potassium.', { harmDose: [0, 1, 2] }),
          furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] }), bicarb: X('Bicarbonate lowers potassium.', { harmDose: [0, 1, 2] })
        },
        ok: { text: 'The first bag is in. Her ectopics settle and the potassium is 2.9 at 01:00. Magnesium is 0.5.', vit: { rhythm: 'sinus+u+stdep+flat', hr: 84 }, facts: ['Potassium 2.9', 'Magnesium 0.5 (low)', 'Ectopics settled'] },
        miss: { text: 'At midnight she has a run of ventricular tachycardia that settles by itself. The potassium is still 2.3.', vit: { rhythm: 'sinus+u+pvc+stdep+flat', hr: 130 }, facts: ['Non-sustained VT'] } },
      { label: 'The next step', tag: 'hypok-after', time: '01:00', window: 'Next few hours',
        scene: 'Potassium 2.9, magnesium 0.5, still on the monitor. What do you order?',
        plan: PL(['reg', ['none'], 'Tell your registrar about the magnesium and the digoxin.'], ['spo2ecg', ['q15'], 'Keep the monitor on until the potassium is above 3.'], ['h4', ['h1', 'm20'], 'Recheck within 2 to 4 hours of each bag.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), mgso4: N('Magnesium: the dose is a protocol and senior decision.', { d: [0] }), kcl_iv: N('Another 10 mmol bag, then recheck.', { d: [0], harmDose: [1, 2, 3] }),
          uec: N('Recheck potassium, magnesium and creatinine.'), ecg: G('Repeat ECG.'), stop_diuretic: N('Keep furosemide off.'),
          fbal: G('Fluid balance.'), weigh: G('Daily weight.'), drugchart: G('Review for other causes.'),
          neph_ref: S('Not needed: gut losses and a diuretic explain it.'),
          furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] }), kcl_oral: S('Let her gut settle first.', { d: [0] })
        },
        ok: { text: 'By morning her potassium is 3.8 and magnesium 0.8. The diarrhoea is easing and the diuretic is still off.' }, miss: { text: 'The potassium slips back to 2.6 without magnesium replacement.' } }
    ] }
  },
  {
    id: 'hypok2', title: 'The stoma that never stops', time: '14:00', where: 'Surgical ward',
    blurb: 'A mild low potassium after surgery in a patient with a high-output ileostomy. Tests oral replacement and the real cause.',
    intro: '58-year-old man, day 4 after a bowel resection with an ileostomy. The stoma output is 2.5 L a day. He is eating and drinking and feels well. The potassium is 3.1 with a normal ECG.',
    vit: { rhythm: 'sinus', hr: 82, sbp: 120, dbp: 74, spo2: 98, rr: 15 },
    facts: ['58M, day 4 after bowel resection, new ileostomy', 'Stoma output 2.5 L a day', 'Eating and drinking, no symptoms', 'Potassium 3.1, magnesium 0.55, creatinine 105', 'ECG: normal'],
    decisions: [
      { tag: 'hypok-cause', scene: 'Potassium 3.1, normal ECG, a stoma putting out 2.5 L. What is the likely cause?', opts: [
        o('best', 'Gut losses from the high-output stoma, with low magnesium', 'Ileostomy output carries potassium and magnesium. Fix the output as well as the level.'),
        o('ok', 'Poor intake alone', 'Some, but 2.5 L of stoma output is the main driver.'),
        o('poor', 'Shift from insulin', 'No insulin is involved.'),
        o('harm', 'A lab error', 'The output explains it.')] },
      { tag: 'hypok-route', scene: 'He feels well and is eating. How do you replace it?', opts: [
        o('best', 'Oral potassium per protocol, and check and replace magnesium', 'Mild, working gut, normal ECG: oral. Magnesium is low as well.'),
        o('poor', 'IV potassium 10 mmol an hour for the whole night', 'Not needed for a mild fall and a working gut.'),
        o('poor', 'Do nothing and repeat in a week', 'Replace it. The stoma is still losing.'),
        o('harm', '20 tablets at once to catch up', 'Large oral loads upset the gut and risk a surge.')] },
      { tag: 'hypok-after', scene: 'What else needs to change?', opts: [
        o('best', 'Review the stoma output, fluid and diet, ask the surgical team about slowing the output, replace magnesium and recheck tomorrow', 'The loss keeps going unless the output is treated.'),
        o('poor', 'Replace the potassium and stop there', 'The stoma will undo it.'),
        o('poor', 'Stop oral intake to rest the gut', 'That does not fix a high-output stoma and he may dehydrate.'),
        o('harm', 'Restrict his fluids to 500 mL', 'He will become dehydrated, and his kidneys will suffer.')] }
    ],
    ends: { hi: 'Oral potassium, magnesium and a plan for the stoma. His potassium holds at 3.9.', mid: 'The level rises, but without a plan for the stoma it falls again.', lo: 'He becomes dehydrated and the potassium falls again.' },
    hard: { debrief: 'Mild low potassium with a working gut: oral replacement, magnesium, and a plan for the cause.', steps: [
      { label: 'The afternoon round', tag: 'hypok-route', time: '14:00', window: 'Now: the first hour',
        scene: 'Potassium 3.1, magnesium 0.55, a stoma output of 2.5 L, normal ECG, and he feels well. What do you order?',
        first: ['kcl_oral', 'mgso4'], firstWhy: 'Replace both, by mouth for the potassium. The cause comes next.',
        plan: PL(['none', ['reg'], 'Mild, well, normal ECG: no call needed. Tell the surgical team about the output.'], ['routine', ['q15'], 'Routine observations.'], ['am', ['h4'], 'Recheck in the morning.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), kcl_oral: N('Oral replacement per your hospital protocol.', { d: [0], harmDose: [1] }),
          mgso4: N('Replace magnesium; the dose is a protocol decision.', { d: [0] }), mg: N('Check magnesium and phosphate.'),
          uec: N('Recheck the potassium and creatinine in the morning.'), fbal: N('Strict fluid balance with the stoma output.'),
          weigh: G('Daily weight.'), ecg: G('A baseline ECG.'),
          kcl_iv: S('Not needed when the gut works and the ECG is normal.', { d: [0], harmDose: [1, 2, 3] }),
          bolus250: S('He is not dry.'), bolus: S('He is not dry.'),
          frestrict: X('Restricting fluids in a high-output stoma risks dehydration and kidney injury.'),
          furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'By morning his potassium is 3.7 and magnesium 0.75. The surgical team starts an anti-motility drug and an oral rehydration plan.', facts: ['Potassium 3.7', 'Magnesium 0.75'] },
        miss: { text: 'By morning his potassium is 2.8, and he now feels weak.', facts: ['Potassium 2.8'], vit: { hr: 94 } } },
      { label: 'The plan for tomorrow', tag: 'hypok-after', time: '08:00', window: 'Next morning',
        scene: 'Potassium 3.7, magnesium 0.75, output still 2 L. What is the plan?',
        plan: PL(['none', ['reg'], 'Improving: no call needed.'], ['routine', ['q15'], 'Routine.'], ['am', ['h4'], 'Recheck tomorrow.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), kcl_oral: G('Continue oral replacement while the losses continue.', { d: [0], harmDose: [1] }), uec: N('Recheck tomorrow.'), mg: G('Check magnesium again.'),
          fbal: N('Keep the fluid balance chart.'), weigh: G('Daily weight.'), drugchart: G('Review drugs that add to losses.'),
          kcl_iv: S('Not needed.', { d: [0], harmDose: [1, 2, 3] }), frestrict: X('Restricting fluids risks dehydration.')
        },
        ok: { text: 'His output settles to 1.2 L with treatment and his potassium stays above 3.7.' }, miss: { text: 'Losses continue and the potassium drifts down again.' } }
    ] }
  },
  {
    id: 'c20261117i', fromCard: 'hy4', title: 'Thiazide, vomiting and a high BP', time: '23:00', where: 'Medical admissions unit',
    blurb: 'A man on a thiazide with two days of vomiting, a potassium of 2.6 and a BP that stays high. Tests the first-hour orders and when low potassium points to primary aldosteronism.',
    intro: '52-year-old man with hypertension on hydrochlorothiazide and amlodipine. Two days of vomiting after a takeaway meal. He feels weak and has cramps. The potassium is 2.6. His BP is 168/98 even though he is dry.',
    vit: { rhythm: 'sinus+u+flat', hr: 92, sbp: 168, dbp: 98, spo2: 98, rr: 16 },
    facts: ['52M, hypertension for 6 years: hydrochlorothiazide and amlodipine', 'Vomiting for 2 days, cannot keep fluids down', 'Weak, cramps', 'Potassium 2.6, creatinine 118 (baseline 85), bicarbonate 32', 'ECG: flat T waves and U waves, no ectopics'],
    decisions: [
      { tag: 'hypok-cause', scene: 'Potassium 2.6 with U waves on the ECG. How do you see it, and why is it this low?', opts: [
        o('best', 'Severe with ECG changes: treat now on a monitor. Two losses add up: the thiazide sends more sodium to the collecting duct, and vomiting (volume loss, alkalosis) raises aldosterone', 'Big potassium loss needs both distal sodium and aldosterone. Here he has both.'),
        o('ok', 'Severe, from the vomiting itself', 'Partly. Gastric fluid holds little potassium: most is lost in the urine, driven by the thiazide and aldosterone.'),
        o('poor', 'Mild, oral potassium in the morning', 'Too low, with ECG changes, and he is vomiting.'),
        o('harm', 'Give his usual thiazide tonight to control the BP', 'The thiazide is losing more potassium.')] },
      { tag: 'hypok-safe', scene: 'The nurse asks how to give the potassium. What do you write?', opts: [
        o('best', 'Potassium chloride 10 mmol in 100 mL over 1 hour, premixed, peripheral line, on a cardiac monitor; repeat and recheck', 'The safe ward rate. Faster needs a monitored setting and senior sign-off.', { hr: 88 }),
        o('harm', '40 mmol over 1 hour to catch up', 'Too fast for a general ward line.'),
        o('poor', 'Oral potassium only', 'He is vomiting and the ECG has changed.'),
        o('harm', '20 mmol IV push', 'Never push potassium: it can stop the heart.')] },
      { tag: 'hypok-after', scene: 'The first bag is running. What else goes on the chart in this first hour?', opts: [
        o('best', 'Magnesium and phosphate, withhold the thiazide, review the whole drug chart, ondansetron, a measured saline bolus, a fluid balance chart, a gas and a glucose', 'Low magnesium stops potassium correcting. Stop the vomiting and the drug that loses potassium, and fill him up carefully.'),
        o('ok', 'Withhold the thiazide and recheck the potassium', 'Right, but magnesium and the vomiting are not dealt with.'),
        o('poor', 'Nothing else until the potassium result comes back', 'The first hour is when the other orders matter.'),
        o('harm', 'Furosemide for the high BP', 'A loop diuretic loses even more potassium.')] },
      { tag: 'hypok-aldo', scene: 'Next morning: vomiting stopped, potassium 3.4 after replacement, thiazide off. BP 166/100. What do you think about?', opts: [
        o('best', 'High BP with low potassium (even on a diuretic) is a reason to screen for primary aldosteronism: aldosterone and renin once the potassium is corrected, read with his drugs in mind, and follow-up with his GP or the endocrine team', 'Australian guidance lists hypertension with spontaneous or diuretic-induced low potassium as a screening reason. Low potassium can give a false negative, so correct it first.'),
        o('poor', 'Blame the vomiting and the thiazide, and stop there', 'They explain tonight, but the BP is still high off the thiazide. Screen.'),
        o('poor', 'Start spironolactone now and skip the test', 'Spironolactone upsets the aldosterone to renin ratio. Test first unless a specialist says otherwise.'),
        o('harm', 'Restart the thiazide at a higher dose', 'More potassium loss, and the cause stays hidden.')] }
    ],
    ends: { hi: 'Potassium replaced safely, magnesium and the vomiting dealt with, and an aldosterone to renin ratio sent before he leaves.', mid: 'His potassium recovers, but one first-hour order or the screening step was missed.', lo: 'His potassium stays low and the cause of his hypertension is missed.' },
    hard: { debrief: 'Low potassium on a thiazide with vomiting: IV at 10 mmol an hour on a monitor, then magnesium, the drug chart, the vomiting and the fluids. High BP with low potassium: screen for primary aldosteronism once the potassium is corrected.', steps: [
      { label: 'The first hour', tag: 'hypok-safe', time: '23:00', window: 'Now: the first hour',
        scene: 'Potassium 2.6, U waves, on a thiazide, vomiting, dry, BP 168/98. What do you order?',
        first: ['kcl_iv'], firstWhy: 'Replace it by the safe IV route: this is the treatment.',
        plan: PL(['reg', ['none'], 'Potassium under 3 with ECG changes: tell your registrar.'], ['spo2ecg', ['q15'], 'A cardiac monitor while the potassium is under 3 with ECG changes.'], ['h1', ['m20'], 'Come back after the first bag with a repeat potassium. Every 5 minutes is not needed: the monitor will alarm if the rhythm changes.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), kcl_iv: N('10 mmol in 100 mL over an hour, peripheral line, on a monitor. Repeat and recheck.', { d: [0], crit: true, harmDose: [1, 2, 3] }),
          ecg: N('A 12-lead ECG and a continuous monitor.'), uec: N('Repeat the potassium and creatinine after the bags.'),
          mg: N('Magnesium and phosphate: low magnesium keeps the kidney losing potassium.'),
          stop_diuretic: N('Withhold the thiazide: it is driving the loss.'),
          drugchart: N('Review the whole chart for other drugs that lower potassium or interact.'),
          antiemetic: N('Stop the vomiting: it is one of the two causes and stops oral replacement.', { d: [0] }),
          bolus250: G('He is dry: a measured bolus, then reassess.', { alt: ['bolus'] }), bolus: G('Fluid is right; give measured boluses.'),
          fbal: G('Strict fluid balance: intake, vomit and urine.'), vbg: G('A gas gives a quick potassium and shows the alkalosis.'), bsl: G('Glucose check in a vomiting patient.'),
          arr: S('Right idea for later, but not tonight: low potassium can give a false result. Correct it first.'),
          kcl_oral: S('He is vomiting: oral alone will not work tonight.', { d: [0] }),
          insulin_k: X('Insulin pushes potassium down further.', { harmDose: [0, 1, 2, 3, 4] }), salb_k: X('Salbutamol lowers potassium.', { harmDose: [0, 1, 2] }),
          furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] }), bicarb: X('Bicarbonate lowers potassium and he is already alkalotic.', { harmDose: [0, 1, 2] })
        },
        ok: { text: 'Two bags in. The vomiting has stopped and the potassium is 3.0 at 02:00. Magnesium 0.6.', vit: { rhythm: 'sinus+flat', hr: 84, sbp: 160, dbp: 96 }, facts: ['Potassium 3.0', 'Magnesium 0.6 (low)', 'Vomiting settled'] },
        miss: { text: 'At 02:00 he is still vomiting and the potassium is 2.7. He has new ectopics.', vit: { rhythm: 'sinus+u+pvc+flat', hr: 104 }, facts: ['Potassium 2.7', 'Ventricular ectopics'] } },
      { label: 'The morning', tag: 'hypok-aldo', time: '08:00', window: 'Next morning',
        scene: 'Potassium 3.4, magnesium replaced, eating and drinking, thiazide off. BP 166/100. What is new on the chart?',
        plan: PL(['none', ['reg'], 'Improving: no urgent call. Hand the screening plan to the team.'], ['routine', ['spo2ecg'], 'ECG changes have gone: routine observations.'], ['am', ['h4'], 'Recheck the potassium tomorrow.']),
        orders: { kcl_oral: N('Oral replacement now that he is eating, per your hospital protocol.', { d: [0], harmDose: [1] }),
          arr: N('Screen for primary aldosteronism: high BP with low potassium. Australian guidance: correct the potassium first, and read the result with his drugs in mind.'),
          uec: N('Recheck the potassium tomorrow.'), mg: G('Recheck the magnesium.'), stop_diuretic: N('Keep the thiazide off.'),
          drugchart: G('Note which of his BP drugs can change the ratio for the team.'), endo_ref: G('If the ratio is raised: endocrine hypertension service (can be outpatient).'),
          kcl_iv: S('His gut works now: switch to oral.', { d: [0], harmDose: [1, 2, 3] }), antiemetic: S('The vomiting has stopped.', { d: [0] }),
          bolus: S('He is eating and drinking.'), bolus250: S('He is eating and drinking.'),
          furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'His potassium is 4.1 two days later. The aldosterone to renin ratio comes back raised, and the endocrine team takes over his blood pressure.' },
        miss: { text: 'He goes home on his thiazide. Three months later he is back with a potassium of 2.8 and a BP of 180/105.' } }
    ] }
  },
  {
    id: 'c20261120d', title: 'Weak legs, no diuretic', time: '21:30', where: 'Emergency short-stay unit',
    blurb: 'A woman with hard-to-control blood pressure and a potassium of 2.5, with no vomiting, diarrhoea or diuretic. Tests safe IV potassium when she is not dry, and why low potassium with high BP and no other cause points to primary aldosteronism.',
    intro: '46-year-old woman with leg weakness and cramps for a week. Hypertension for 3 years, on amlodipine and perindopril, still 170s at her GP. No vomiting, no diarrhoea, no diuretic, no laxatives. The potassium is 2.5.',
    vit: { rhythm: 'sinus+u+flat', hr: 78, sbp: 174, dbp: 104, spo2: 99, rr: 14 },
    facts: ['46F, hypertension on amlodipine 10 mg and perindopril', 'Weak legs and cramps for a week', 'No vomiting, diarrhoea, diuretic, laxatives or liquorice', 'Potassium 2.5, sodium 143, bicarbonate 31, creatinine 70, magnesium 0.65', 'ECG: flat T waves and U waves, no ectopics', 'Well hydrated, eating and drinking'],
    decisions: [
      { tag: 'hypok-cause', scene: 'Potassium 2.5 with U waves, and no gut loss or diuretic. How do you see it?', opts: [
        o('best', 'Severe with ECG changes: treat now on a monitor. With no gut loss and no diuretic, the kidney is losing it, and with a high BP that points to too much aldosterone', 'Low potassium + high BP + a high bicarbonate, with no other cause, is the classic picture of mineralocorticoid excess.'),
        o('ok', 'Severe, probably poor diet', 'Diet alone rarely drops it to 2.5. Look for where it is going.'),
        o('poor', 'Mild, oral potassium and home', 'Too low, with ECG changes.'),
        o('harm', 'Add a thiazide for the BP', 'A thiazide loses more potassium.')] },
      { tag: 'hypok-safe', scene: 'She is eating and drinking and is not dry. What do you write for the potassium?', opts: [
        o('best', 'Potassium chloride 10 mmol in 100 mL over 1 hour, premixed, peripheral line, on a cardiac monitor; repeat and recheck. Oral potassium as well once the ECG has settled. No fluid bolus: she is not dry', 'The safe ward rate. She does not need fluid, only potassium, so do not add a bolus out of habit.', { hr: 76 }),
        o('ok', 'The same bag, plus a 500 mL saline bolus as usual', 'The potassium order is right, but she is not dry and her BP is 174/104: the bolus is not needed.'),
        o('poor', 'Oral potassium only, she can swallow', 'With U waves and a potassium of 2.5, start IV on a monitor.'),
        o('harm', '40 mmol added to a litre of saline running at 250 mL an hour', 'Never add potassium to a running bag; the dose is uncontrolled.')] },
      { tag: 'hypok-after', scene: 'The first bag is running. What else goes on the chart now?', opts: [
        o('best', 'Replace the magnesium (0.65), repeat the potassium after the bags, keep the monitor on until the ECG settles, and review the chart for anything that lowers potassium', 'Low magnesium keeps the kidney losing potassium. Recheck before you stop.'),
        o('poor', 'Recheck the potassium in the morning only', 'Recheck after the bags, and replace the magnesium.'),
        o('poor', 'Stop the potassium after one bag if her legs feel better', 'Symptoms are not the target: the level is.'),
        o('harm', 'Salbutamol neb for her cramps', 'Salbutamol drives potassium into cells and lowers it further.')] },
      { tag: 'hypok-aldo', scene: 'Next morning: potassium 3.6 after replacement. BP 168/102. She asks why this happened.', opts: [
        o('best', 'Screen for primary aldosteronism: aldosterone and renin once the potassium is normal. Perindopril can raise renin and hide a positive result, so the team reads it with her drugs in mind or arranges a change before testing. Then endocrine follow-up', 'Australian guidance (AJGP 2020): screen anyone with hypertension and low potassium. Low potassium and ACE inhibitors can both give a false negative.'),
        o('ok', 'Send the aldosterone and renin today while the potassium is still being replaced', 'Right test, but a low potassium can make it falsely normal. Correct it first.'),
        o('poor', 'Start spironolactone for the BP and skip the test', 'That treats it blind and upsets the test. Screen first unless a specialist says otherwise.'),
        o('harm', 'Add hydrochlorothiazide for the BP', 'More potassium loss, and the cause stays hidden.')] }
    ],
    ends: { hi: 'Potassium replaced safely without needless fluid, magnesium fixed, and an aldosterone screen planned the right way.', mid: 'Her potassium recovers, but one step was missed.', lo: 'She goes home with a low potassium and the cause of her hypertension is missed.' },
    hard: { debrief: 'Low potassium with ECG changes: 10 mmol an hour IV on a monitor, plus magnesium and a recheck. Order fluid only if the patient is dry. High BP with low potassium and no other cause: screen for primary aldosteronism once the potassium is corrected.', steps: [
      { label: 'The first hour', tag: 'hypok-safe', time: '21:30', window: 'Now: the first hour',
        scene: 'Potassium 2.5, U waves, magnesium 0.65, BP 174/104, not dry, eating and drinking. What do you order?',
        first: ['kcl_iv'], firstWhy: 'Replace it by the safe IV route: this is the treatment.',
        plan: PL(['reg', ['none'], 'Potassium under 3 with ECG changes: tell your registrar.'], ['spo2ecg', ['q15'], 'A cardiac monitor while the potassium is under 3 with ECG changes.'], ['h1', ['m20'], 'Come back after the first bag with a repeat potassium.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), kcl_iv: N('10 mmol in 100 mL over an hour, peripheral line, on a monitor. Repeat and recheck.', { d: [0], crit: true, harmDose: [1, 2, 3] }),
          ecg: N('A 12-lead ECG and a continuous monitor.'), uec: N('Repeat the potassium after the bags.'),
          mgso4: N('Magnesium is 0.65: replace it. The dose is a protocol and senior decision.', { d: [0] }), mg: G('Magnesium and phosphate again after replacement.'),
          kcl_oral: G('Oral potassium alongside, since her gut works, per your hospital protocol.', { d: [0], harmDose: [1] }),
          drugchart: N('Review the chart for anything that lowers potassium.'),
          vbg: G('A gas gives a quick potassium and shows the alkalosis.'),
          bolus: S('She is not dry and her BP is high: no fluid needed.'), bolus250: S('She is not dry: no fluid needed.'),
          arr: S('Right idea, but not tonight: a low potassium can make the result falsely normal. Correct it first.'),
          antiemetic: S('She is not vomiting.', { d: [0] }),
          insulin_k: X('Insulin pushes potassium down further.', { harmDose: [0, 1, 2, 3, 4] }), salb_k: X('Salbutamol lowers potassium.', { harmDose: [0, 1, 2] }),
          furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] }), bicarb: X('Bicarbonate lowers potassium and she is already alkalotic.', { harmDose: [0, 1, 2] })
        },
        ok: { text: 'Two bags in. Potassium 3.0 at 00:30, U waves fading. Magnesium being replaced.', vit: { rhythm: 'sinus+flat', hr: 74, sbp: 170, dbp: 102 }, facts: ['Potassium 3.0', 'U waves fading'] },
        miss: { text: 'At 00:30 the potassium is still 2.6 and she has new ventricular ectopics.', vit: { rhythm: 'sinus+u+pvc+flat', hr: 92 }, facts: ['Potassium 2.6', 'Ventricular ectopics'] } },
      { label: 'The morning', tag: 'hypok-aldo', time: '08:00', window: 'Next morning',
        scene: 'Potassium 3.6, magnesium 0.8, ECG normal. BP 168/102 on amlodipine and perindopril. What is new on the chart?',
        plan: PL(['none', ['reg'], 'Stable: no urgent call. Hand the screening plan to the team.'], ['routine', ['spo2ecg'], 'The ECG has settled: routine observations.'], ['am', ['h4'], 'Recheck the potassium tomorrow.']),
        orders: { kcl_oral: N('Keep up oral replacement until the cause is treated, per your hospital protocol.', { d: [0], harmDose: [1] }),
          arr: N('Screen for primary aldosteronism now the potassium is near normal (AJGP 2020). Perindopril can raise renin and hide a positive result: the team reads it with that in mind or changes her drugs first.'),
          endo_ref: N('Endocrine hypertension service: spontaneous low potassium with hypertension needs specialist work-up whatever the first result.'),
          uec: N('Recheck the potassium tomorrow.'), drugchart: G('List her BP drugs for the endocrine team: some change the ratio.'),
          mg: G('Recheck the magnesium.'),
          kcl_iv: S('Her ECG has settled and she eats: oral is enough.', { d: [0], harmDose: [1, 2, 3] }),
          bolus: S('Not dry.'), bolus250: S('Not dry.'),
          furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'The aldosterone to renin ratio comes back raised. The endocrine team confirms primary aldosteronism and finds a small adrenal adenoma.' },
        miss: { text: 'She goes home on a thiazide for her BP. Two months later her potassium is 2.4.' } }
    ] }
  },
  {
    id: 'c20261126a', fromCard: 'hy7', title: 'Bigeminy on digoxin at 3 am', time: '03:00', where: 'Cardiology ward',
    blurb: 'An old man with heart failure on digoxin, whose furosemide was doubled two days ago. Telemetry shows bigeminy and a short run of VT; potassium 2.7. Tests why low potassium makes digoxin dangerous, what to order, and the amiodarone trap.',
    intro: '81-year-old man with heart failure and atrial fibrillation, on digoxin and furosemide. His furosemide was doubled two days ago for leg swelling. The telemetry nurse calls at 03:00: ventricular bigeminy for an hour and one 6-beat run of VT. He feels sick and has not eaten today. Potassium 2.7.',
    vit: { rhythm: 'af+pvc+u+stdep', hr: 88, sbp: 112, dbp: 64, spo2: 95, rr: 18 },
    facts: ['81M, heart failure (EF 30%), atrial fibrillation', 'Digoxin daily; furosemide doubled 2 days ago', 'Nausea, off his food today', 'Telemetry: ventricular bigeminy, one 6-beat run of VT', 'Potassium 2.7, creatinine 140 (baseline 100)', 'Magnesium and digoxin level not yet sent'],
    decisions: [
      { tag: 'hypok-dig', scene: 'Potassium 2.7 in a man on digoxin, with bigeminy and a run of VT. Why is this combination so dangerous?', opts: [
        o('best', 'Potassium and digoxin compete for the same site on the Na⁺/K⁺ pump. Low potassium lets more digoxin bind, so sodium and then calcium build up in the heart cells, and they fire on their own: ectopics, VT, VF', 'The low potassium and the digoxin act together. Fix the potassium and stop more digoxin going in.'),
        o('ok', 'Low potassium causes arrhythmias by itself; the digoxin is a side issue', 'Low potassium alone is arrhythmogenic, but here it also makes his digoxin more toxic. Both need action.'),
        o('poor', 'His heart failure is worse: give more furosemide', 'The extra furosemide is what dropped the potassium.'),
        o('harm', 'Give tonight\'s digoxin early to control the AF', 'More digoxin on a low potassium feeds the arrhythmia.')] },
      { tag: 'hypok-safe', scene: 'What do you order now?', opts: [
        o('best', '12-lead ECG and keep him on the monitor; hold the digoxin and the furosemide; send a digoxin level, magnesium and repeat UEC; potassium chloride 10 mmol in 100 mL over 1 hour, peripheral line; tell your registrar', 'Monitor, remove the causes, measure, replace safely, escalate.', { hr: 84 }),
        o('poor', 'Potassium chloride 10 mmol over 1 hour and recheck, and carry on with his usual drugs', 'Right replacement, but the digoxin and the furosemide are still going in.'),
        o('poor', 'Oral potassium in the morning', 'He has a run of VT on telemetry: IV replacement on a monitor, now.'),
        o('harm', '20 mmol potassium chloride IV push to get it up fast', 'Never push potassium.')] },
      { tag: 'hypok-dig', scene: 'The nurse says: "He has had another short run. Shall I get amiodarone ready?"', opts: [
        o('best', 'No reflex amiodarone: it raises digoxin levels. Keep the monitor on, correct the potassium and magnesium, and get your registrar to the bedside. If a dangerous arrhythmia persists, your registrar discusses digoxin antibody (Fab) with toxicology (Poisons Information 13 11 26)', 'Treat the cause. Amiodarone adds to the digoxin problem.'),
        o('ok', 'Wait for the registrar before giving anything', 'Escalating is right; say why amiodarone is a trap here.'),
        o('poor', 'Metoprolol to settle the ectopics', 'A beta blocker adds to digoxin\'s slowing of the AV node and does not treat the cause.'),
        o('harm', 'Yes, start amiodarone now', 'It raises the digoxin level and can make the toxicity worse.')] },
      { tag: 'hypok-after', scene: 'Morning: potassium 3.9, magnesium 0.8 after replacement, no more runs. The digoxin level comes back high. What is the plan?', opts: [
        o('best', 'Keep the digoxin held, tell the treating team, and let them decide when and at what dose to restart once the level falls and his kidney function settles. Review the furosemide dose, add a plan to keep the potassium up, and recheck potassium and magnesium daily', 'A high level, a worse kidney and a doubled diuretic: all three need a plan before the digoxin restarts.'),
        o('poor', 'Restart the digoxin at the same dose now the potassium is normal', 'The level is still high and his kidney function is worse.'),
        o('poor', 'Stop monitoring: the potassium is fixed', 'Keep the monitor while the digoxin level is high.'),
        o('harm', 'Restart the doubled furosemide with no potassium plan', 'That repeats what caused the night.')] }
    ],
    ends: { hi: 'You held the digoxin and the diuretic, replaced potassium and magnesium on a monitor, and avoided amiodarone. No more VT.', mid: 'He settles, but one step was missed.', lo: 'He has a longer run of VT and needs the MET team.' },
    hard: { debrief: 'Low potassium on digoxin: potassium and digoxin compete for the Na⁺/K⁺ pump, so low potassium makes digoxin toxic. Monitor, hold the digoxin and the diuretic, send a digoxin level and magnesium, replace potassium at 10 mmol an hour, tell your registrar. No reflex amiodarone: it raises digoxin levels.', steps: [
      { label: 'The 3 am call', tag: 'hypok-dig', time: '03:00', window: 'Now: the first hour',
        scene: 'Potassium 2.7, bigeminy and a 6-beat run of VT, on digoxin and a doubled dose of furosemide. Nauseated. What do you order?',
        first: ['kcl_iv', 'stop_dig'], firstWhy: 'Replace the potassium and stop more digoxin going in: together they treat the cause.',
        plan: PL(['reg', ['met'], 'A run of VT on digoxin with a potassium under 3: tell your registrar now. Call a MET if he becomes unstable.'], ['spo2ecg', ['q15'], 'Continuous cardiac monitoring.'], ['h1', ['m20'], 'Come back after the first bag with a repeat potassium.']),
        orders: { kcl: S('Too vague: choose oral or IV, and the dose.'), kcl_iv: N('10 mmol in 100 mL over an hour, peripheral line, on a monitor. Repeat and recheck.', { d: [0], crit: true, harmDose: [1, 2, 3] }),
          stop_dig: N('Hold the digoxin: low potassium is letting it bind more.', { crit: true }),
          stop_diuretic: N('Hold the furosemide: it caused the fall.'),
          ecg: N('A 12-lead ECG, and keep the monitor on.'), dig_level: N('A digoxin level (timing per your hospital protocol).'),
          mg: N('Check magnesium: low magnesium adds to the arrhythmia risk and stops potassium correcting.'), uec: N('Repeat potassium and creatinine: his kidney function has worsened.'),
          antiemetic: G('Treat the nausea (it may itself be from the digoxin).', { d: [0] }), vbg: G('A gas gives a quick potassium.'), drugchart: G('Look for other drugs that raise digoxin or lower potassium.'),
          kcl_oral: S('He is nauseated and has VT on telemetry: IV first.', { d: [0], harmDose: [1] }),
          dig_fab: S('Not yet: no sustained dangerous arrhythmia. If one appears, your registrar discusses it with toxicology (Poisons Information 13 11 26).'),
          amio: X('Amiodarone raises digoxin levels and makes the toxicity worse.'),
          metop: X('A beta blocker adds to digoxin\'s AV-node slowing and does not treat the cause.'),
          furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] }),
          insulin_k: X('Insulin pushes potassium down further.', { harmDose: [0, 1, 2, 3, 4] }), salb_k: X('Salbutamol lowers potassium.', { harmDose: [0, 1, 2] }), bicarb: X('Bicarbonate lowers potassium.', { harmDose: [0, 1, 2] })
        },
        ok: { text: 'First bag in. Potassium 3.0 at 04:15, bigeminy settling. Magnesium 0.55. The digoxin level is reported high.', vit: { rhythm: 'af+u', hr: 82 }, facts: ['Potassium 3.0', 'Magnesium 0.55 (low)', 'Digoxin level high'] },
        miss: { text: 'At 04:00 he has a 20-beat run of VT and feels faint. Potassium still 2.7.', vit: { rhythm: 'af+pvc+u+stdep', hr: 104, sbp: 96, dbp: 58 }, facts: ['20-beat run of VT', 'Potassium 2.7'] } },
      { label: 'The amiodarone question', tag: 'hypok-dig', time: '04:30', window: 'Next few hours',
        scene: 'Magnesium 0.55 and a high digoxin level are back. The nurse asks whether to get amiodarone ready in case he has another run. What do you order now?',
        plan: PL(['reg', ['none'], 'A high digoxin level with low magnesium: your registrar needs to know.'], ['spo2ecg', ['q15'], 'Keep the monitor on while the level is high.'], ['h4', ['h1'], 'Recheck potassium and magnesium within 4 hours.']),
        orders: { mgso4: N('Magnesium is 0.55: replace it. The dose is a protocol and senior decision.', { d: [0] }),
          kcl_iv: N('Another 10 mmol bag, then recheck.', { d: [0], harmDose: [1, 2, 3] }), uec: N('Recheck potassium and magnesium.'),
          stop_dig: N('Keep the digoxin held: the level is high.'), stop_diuretic: N('Keep the furosemide held for now.'),
          team: G('Tell the treating team about the level so the digoxin is not restarted by habit.'),
          ecg: G('Repeat ECG.'), kcl_oral: G('Oral potassium alongside once the nausea settles, per your hospital protocol.', { d: [0], harmDose: [1] }),
          dig_fab: S('Not needed while he is stable. Your registrar discusses it with toxicology if a dangerous arrhythmia appears.'),
          amio: X('Amiodarone raises digoxin levels: not a reflex answer to ectopics here.'),
          metop: X('Adds to AV-node slowing.'), furo: X('More potassium loss.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'By 08:00 potassium 3.9 and magnesium 0.8. No more runs. The team holds the digoxin and halves the furosemide.' },
        miss: { text: 'At 06:00 another run of VT. The registrar comes and finds the magnesium was never replaced.' } }
    ] }
  }
  ];
})(window);
