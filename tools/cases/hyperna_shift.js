/* Hypernatraemia: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'hyperna-cause': { n: 'Sort the cause and the volume', tab: 1, r: 'Water loss, a drive problem or diabetes insipidus. Check if he is shocked.' },
    'hyperna-fix': { n: 'Replace the water', tab: 2, r: 'Saline if shocked, oral or enteral water if he can, glucose 5% if not.' },
    'hyperna-limit': { n: 'Do not correct too fast', tab: 2, r: 'No more than 10 mmol/L in 24 hours for a chronic case. Check every 4 to 6 hours.' },
    'hyperna-di': { n: 'Spot diabetes insipidus', tab: 3, r: 'A large volume of dilute urine with a high sodium. Desmopressin is a senior decision.' }
  };
  w.RMO_CASES = [
  {
    id: 'hyperna1', title: 'Dry in the nursing home', time: '09:00', where: 'Medical ward',
    blurb: 'An elderly woman with a urinary infection, a sodium of 158 and a low BP. Tests shock first, then slow water.',
    intro: '84-year-old woman from a nursing home with a urinary infection. She has barely drunk for three days and is confused. The sodium is 158. BP 92/50, pulse 108.',
    vit: { hr: 108, sbp: 92, dbp: 50, spo2: 96, rr: 18 },
    facts: ['84F, nursing home, urinary infection', 'Poor intake for 3 days, confused, dry', 'Sodium 158, creatinine 150, glucose 7.2', 'BP 92/50, pulse 108', 'Urine dipstick: nitrite and leucocytes positive'],
    decisions: [
      { tag: 'hyperna-cause', scene: 'Sodium 158, dry, confused and hypotensive. What is the first problem to fix?', opts: [
        o('best', 'The shock: 0.9% saline in measured boluses, then replace the water', 'Restore perfusion first, then replace the free water.'),
        o('ok', 'Start glucose 5% at once', 'Perfusion first, free water second.'),
        o('poor', 'Wait until the sodium is rechecked', 'She is shocked: act now.'),
        o('harm', 'Give furosemide to clear the sodium', 'She is dry. A diuretic makes it worse.')] },
      { tag: 'hyperna-fix', scene: 'After 500 mL her BP is 110/64. How do you replace the water?', opts: [
        o('best', 'Oral or enteral water if she can drink, and glucose 5% IV if not, with the sodium checked every 4 to 6 hours', 'Replace water gradually and check often.', { sbp: 112, hr: 96 }),
        o('ok', 'Keep giving 0.9% saline', 'It adds sodium and does not replace the free water.'),
        o('poor', 'Glucose 5% 3 L over 6 hours', 'Far too fast.'),
        o('harm', '3% saline to boost her pressure', 'Hypertonic saline in hypernatraemia.')] },
      { tag: 'hyperna-limit', scene: 'The sodium at 21:00 is 146 (it was 158 at 09:00). What do you do?', opts: [
        o('best', 'Slow the water, recheck in 2 hours, watch her neuro status and tell your registrar', 'A fall of 12 in 12 hours is faster than the limit.'),
        o('ok', 'Carry on as before', 'It is already too fast.'),
        o('poor', 'Give extra water to finish the job', 'It risks cerebral oedema.'),
        o('harm', 'Stop checking, she looks better', 'You must keep watching.')] },
      { tag: 'hyperna-cause', scene: 'What else needs treating?', opts: [
        o('best', 'The urinary infection, with cultures and an antibiotic per protocol, and the reason she could not drink', 'Treat the trigger and fix access to fluid.'),
        o('ok', 'Only the sodium', 'The infection and the drink problem will bring it back.'),
        o('poor', 'Nothing, the dipstick is not important', 'It is the likely trigger.'),
        o('harm', 'Restrict her fluids', 'The opposite of what she needs.')] }
    ],
    ends: { hi: 'Fluid first, water slowly, and the cause treated. Her sodium is 142 on day three.', mid: 'She recovers, but the sodium fell faster than it should.', lo: 'She develops a seizure from cerebral oedema after too rapid a fall.' },
    hard: { debrief: 'Shock first with saline, then slow water, with frequent sodium checks and the trigger treated.', steps: [
      { label: 'The first hour', tag: 'hyperna-fix', time: '09:00', window: 'Now: the first hour',
        scene: 'Sodium 158, BP 92/50, pulse 108, a urinary infection. What do you order?',
        first: ['bolus250', 'bolus'], firstWhy: 'Restore perfusion first, then replace the free water.',
        plan: PL(['reg', ['none'], 'A sodium of 158 with hypotension: tell your registrar.'], ['q15', ['routine', 'spo2'], 'Observations every 15 minutes while she is shocked.'], ['h1', ['m20'], 'Reassess after each bolus and recheck the sodium in a few hours.']),
        orders: {
          bolus250: N('A measured saline bolus, reassessed after each.', { alt: ['bolus'] }), bolus: G('A bolus is right.'),
          freewater: N('Free water after perfusion: oral or enteral first, glucose 5% IV if she cannot drink.', { d: [0], harmDose: [1, 2] }),
          uec: N('Repeat the sodium and creatinine every 4 to 6 hours.'), bcult: G('Blood cultures.'), urine_mcs: N('Urine culture.'),
          bsl: G('Glucose.'), fbal: N('Strict fluid balance.'), hourly_uo: G('Urine output.'), weigh: G('Weight.'),
          ceftri: G('An antibiotic per protocol.', { alt: [] }), serum_osm: G('Serum osmolality.'),
          hyp_saline: X('Hypertonic saline in a patient with a high sodium.', { harmDose: [0, 1, 2, 3] }),
          furo: X('She is dry.', { harmDose: [0, 1, 2, 3] }), frestrict: X('Restricting fluids in a dry patient.')
        },
        ok: { text: 'After 500 mL of saline her BP is 112/64. By 21:00 the sodium is 148 and she is brighter.', vit: { sbp: 112, dbp: 64, hr: 96 }, facts: ['Sodium 148 at 21:00'] },
        miss: { text: 'By evening she is confused, her BP is 84/46 and the sodium is 161.', vit: { sbp: 84, dbp: 46, hr: 120 }, facts: ['Sodium 161'] } },
      { label: 'The evening', tag: 'hyperna-limit', time: '21:00', window: 'The next few hours',
        scene: 'Sodium 146 (158 twelve hours ago), BP 118/68, drinking. What do you order?',
        plan: PL(['reg', ['none'], 'Tell your registrar that the sodium fell by 12 in 12 hours.'], ['routine', ['q15'], 'Routine observations, neuro checks.'], ['h4', ['h1', 'm20'], 'Recheck the sodium in 2 to 4 hours.']),
        orders: {
          uec: N('Recheck the sodium in 2 to 4 hours.', { crit: true }), gcs: N('Neuro observations: cerebral oedema risk.'),
          fbal: G('Fluid balance.'), freewater: S('The fall is already fast: slow the water.', { d: [0] }),
          bolus: S('She is not shocked now.'), hyp_saline: X('Hypertonic saline would overshoot the other way.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'You slow the water. By morning the sodium is 143 and she is alert.' }, miss: { text: 'Overnight the sodium falls to 138 and she has a seizure.' } }
    ] }
  },
  {
    id: 'hyperna2', title: 'Thirsty after surgery', time: '15:00', where: 'Neurosurgical ward',
    blurb: 'A man after pituitary surgery with a very large urine output and a rising sodium. Tests spotting diabetes insipidus.',
    intro: '48-year-old man, day 1 after pituitary surgery. He is very thirsty and has passed 3.5 L of urine in 8 hours. The sodium has climbed to 152. Urine osmolality 150.',
    vit: { hr: 92, sbp: 126, dbp: 74, spo2: 98, rr: 16 },
    facts: ['48M, day 1 after pituitary surgery', 'Thirsty, urine 3.5 L in 8 hours', 'Sodium 152 (was 141), serum osmolality 318', 'Urine osmolality 150, glucose 6.4', 'Alert, drinking'],
    decisions: [
      { tag: 'hyperna-di', scene: 'A high sodium, huge dilute urine, day 1 after pituitary surgery. What is the likely diagnosis?', opts: [
        o('best', 'Central diabetes insipidus', 'High serum osmolality with inappropriately dilute urine after pituitary surgery.'),
        o('ok', 'SIADH', 'It would give a low sodium and concentrated urine.'),
        o('poor', 'Osmotic diuresis from glucose', 'The glucose is 6.4.'),
        o('harm', 'Overhydration', 'He is dry, not wet.')] },
      { tag: 'hyperna-fix', scene: 'He is drinking freely. What do you do?', opts: [
        o('best', 'Let him drink and replace water, chart the urine hourly, check the sodium every 4 hours and call your registrar', 'Replace the water and watch.'),
        o('ok', 'Restrict his fluids', 'Never in diabetes insipidus.'),
        o('poor', 'Give 0.9% saline 2 L', 'It adds sodium and does not replace the water.'),
        o('harm', 'Give furosemide to clear it', 'Worsens the dehydration.')] },
      { tag: 'hyperna-di', scene: 'The registrar suggests desmopressin. What is your role?', opts: [
        o('best', 'Agree the dose and plan with the registrar and the surgical team, then chart it and check the sodium', 'It is a senior and endocrine decision, with the dose per protocol.'),
        o('ok', 'Give it yourself with any dose', 'A dose error can cause a dangerous low sodium.'),
        o('poor', 'Refuse it', 'It treats the cause.'),
        o('harm', 'Give desmopressin and stop checking the sodium', 'Sodium monitoring is essential afterwards.')] },
      { tag: 'hyperna-limit', scene: 'After treatment the sodium is 143 and the urine is 1.2 L. What now?', opts: [
        o('best', 'Keep monitoring the sodium and urine, check cortisol and sodium again in the morning, and arrange endocrine follow-up', 'Pituitary surgery can affect other hormones.'),
        o('ok', 'Stop all monitoring', 'The condition can change after surgery.'),
        o('poor', 'Restrict fluids now that it is controlled', 'He may need them.'),
        o('harm', 'Discharge him tonight', 'Too early.')] }
    ],
    ends: { hi: 'Water replaced, desmopressin agreed and the sodium monitored. He is stable by day three.', mid: 'The sodium settles but with a long wait for the plan.', lo: 'He becomes dehydrated and confused when fluids are restricted.' },
    hard: { debrief: 'Dilute urine and a high sodium after pituitary surgery: replace water, chart the urine, and agree desmopressin with a senior.', steps: [
      { label: 'The first hour', tag: 'hyperna-di', time: '15:00', window: 'Now: the first hour',
        scene: 'Day 1 after pituitary surgery, urine 3.5 L in 8 hours, sodium 152, urine osmolality 150. What do you order?',
        first: ['hourly_uo', 'serum_osm'], firstWhy: 'Confirm it and chart the urine output.',
        plan: PL(['reg', ['none'], 'A new high sodium with a large urine output: tell your registrar.'], ['routine', ['q15'], 'Routine observations.'], ['h4', ['h1', 'm20'], 'Recheck the sodium within a few hours.']),
        orders: {
          hourly_uo: N('Hourly urine output.'), serum_osm: N('Serum osmolality.'), urine_lytes: N('Urine osmolality and sodium.'),
          uec: N('Sodium every 4 hours.'), fbal: N('Strict fluid balance.'), freewater: N('Let him drink; glucose 5% IV if he cannot.', { d: [0], harmDose: [1, 2] }),
          endo_ref: N('Endocrine input on desmopressin.'), desmo: G('A senior decision. Agree it with your registrar and the surgical team.'),
          bsl: G('Glucose.'), cortisol: G('Cortisol: pituitary surgery can affect it.'), weigh: G('Daily weight.'),
          frestrict: X('Restricting fluids in diabetes insipidus.'), hyp_saline: X('Hypertonic saline.', { harmDose: [0, 1, 2, 3] }),
          bolus: S('He is not shocked and saline adds sodium.'), furo: X('A diuretic worsens it.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'The registrar agrees a desmopressin dose. By 21:00 his urine is 120 mL an hour and the sodium is 146.', facts: ['Sodium 146 at 21:00'] },
        miss: { text: 'By evening he has passed 6 L of urine and the sodium is 160. He is confused.', vit: { hr: 112 }, facts: ['Sodium 160'] } },
      { label: 'The next day', tag: 'hyperna-limit', time: '08:00', window: 'Next morning',
        scene: 'Sodium 143, urine 1.1 L overnight, cortisol pending. What is the plan?',
        plan: PL(['none', ['reg'], 'Stable. A handover to the endocrine team.'], ['routine', ['q15'], 'Routine.'], ['h4', ['am'], 'Recheck the sodium regularly today.']),
        orders: {
          uec: N('Sodium every 4 to 6 hours today.'), hourly_uo: G('Keep the urine chart.'), fbal: G('Fluid balance.'), endo_ref: N('Endocrine follow-up.'),
          cortisol: G('Check the cortisol result.'), weigh: G('Daily weight.'), frestrict: X('Restricting fluids.'), hyp_saline: X('Hypertonic saline.', { harmDose: [0, 1, 2, 3] })
        },
        ok: { text: 'He is stable and the endocrine team sets a follow-up plan.' }, miss: { text: 'The sodium creeps up again overnight.' } }
    ] }
  }
  ];
})(window);
