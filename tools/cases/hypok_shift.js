/* /bin /bin.usr-is-merged /boot /container_info.json /dev /etc /home /lib /lib.usr-is-merged /lib64 /lost+found /media /mnt /nix /old_root /opt /proc /root /run /sbin /sbin.usr-is-merged /srv /sys /tmp /usr /var Hypokalaemia: concepts and cases (easy + hard) fonts/ icons/ scripts/ tools/ */
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
        o('ok', 'Moderate, repeat the blood test first', 'The ECG shows it is real. Treat now.'),
        o('poor', 'Mild, give oral potassium', 'Too low for oral alone, with ectopics.'),
        o('harm', 'Not important, she is just dehydrated', 'This potassium can cause a fatal arrhythmia.')] },
      { tag: 'hypok-route', scene: 'What route do you use?', opts: [
        o('best', 'IV potassium chloride on a cardiac monitor', 'Severe with ECG changes, and she is vomiting: IV on a monitor.', { hr: 92 }),
        o('ok', 'Oral potassium only, she can swallow', 'She is vomiting and the potassium is very low.'),
        o('poor', 'Wait for a magnesium result before giving anything', 'Check magnesium, but start replacing the potassium now.'),
        o('harm', 'Stop all fluids and monitoring to rest her heart', 'Monitoring protects her.')] },
      { tag: 'hypok-safe', scene: 'The nurse asks how to give it. What is the order?', opts: [
        o('best', 'Potassium chloride 10 mmol in 100 mL over 1 hour, peripheral line, premixed bag', 'This is the safe ward rate. Repeat and recheck.'),
        o('ok', '40 mmol over 1 hour to get there faster', 'Faster than 10 mmol an hour needs a monitored setting and senior sign-off.'),
        o('poor', '20 mmol IV push over 5 minutes', 'Never push potassium.'),
        o('harm', 'Add 40 mmol to the running Hartmann bag', 'Never add it to a running bag: the mix is uneven and the dose uncontrolled.')] },
      { tag: 'hypok-after', scene: 'After the first bag the potassium is 2.8. What else do you do?', opts: [
        o('best', 'Check magnesium, withhold furosemide, tell your registrar about the digoxin, and recheck the potassium', 'Replace the magnesium too, fix the cause, and recheck.'),
        o('ok', 'Give another bag and stop there', 'The cause and magnesium are still unaddressed.'),
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
        o('ok', 'IV potassium 10 mmol an hour for the whole night', 'Not needed for a mild fall and a working gut.'),
        o('poor', 'Do nothing and repeat in a week', 'Replace it. The stoma is still losing.'),
        o('harm', '20 tablets at once to catch up', 'Large oral loads upset the gut and risk a surge.')] },
      { tag: 'hypok-after', scene: 'What else needs to change?', opts: [
        o('best', 'Review the stoma output, fluid and diet, ask the surgical team about slowing the output, replace magnesium and recheck tomorrow', 'The loss keeps going unless the output is treated.'),
        o('ok', 'Replace the potassium and stop there', 'The stoma will undo it.'),
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
          bolus250: G('Only if he is dry.', { alt: ['bolus'] }), bolus: S('He is not dry.'),
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
        o('ok', '40 mmol over 1 hour to catch up', 'Too fast for a general ward line.'),
        o('poor', 'Oral potassium only', 'He is vomiting and the ECG has changed.'),
        o('harm', '20 mmol IV push', 'Never push potassium: it can stop the heart.')] },
      { tag: 'hypok-after', scene: 'The first bag is running. What else goes on the chart in this first hour?', opts: [
        o('best', 'Magnesium and phosphate, withhold the thiazide, review the whole drug chart, ondansetron, a measured saline bolus, a fluid balance chart, a gas and a glucose', 'Low magnesium stops potassium correcting. Stop the vomiting and the drug that loses potassium, and fill him up carefully.'),
        o('ok', 'Withhold the thiazide and recheck the potassium', 'Right, but magnesium and the vomiting are not dealt with.'),
        o('poor', 'Nothing else until the potassium result comes back', 'The first hour is when the other orders matter.'),
        o('harm', 'Furosemide for the high BP', 'A loop diuretic loses even more potassium.')] },
      { tag: 'hypok-aldo', scene: 'Next morning: vomiting stopped, potassium 3.4 after replacement, thiazide off. BP 166/100. What do you think about?', opts: [
        o('best', 'High BP with low potassium (even on a diuretic) is a reason to screen for primary aldosteronism: aldosterone and renin once the potassium is corrected, read with his drugs in mind, and follow-up with his GP or the endocrine team', 'Australian guidance lists hypertension with spontaneous or diuretic-induced low potassium as a screening reason. Low potassium can give a false negative, so correct it first.'),
        o('ok', 'Blame the vomiting and the thiazide, and stop there', 'They explain tonight, but the BP is still high off the thiazide. Screen.'),
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
  }
  ];
})(window);
