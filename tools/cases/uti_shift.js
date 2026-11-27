/* Urinary tract infection: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'uti-real': { n: 'Is it really a UTI?', tab: 1, r: 'Symptoms and fever matter. A dipstick alone in a confused older person is usually bacteriuria.' },
    'uti-class': { n: 'Cystitis, pyelonephritis or complicated', tab: 2, r: 'Fever or loin pain is upper. Men, pregnancy, catheters and diabetes are complicated.' },
    'uti-treat': { n: 'Culture first, then antibiotics', tab: 3, r: 'Cultures before antibiotics, IV if septic or vomiting, then switch to oral to the sensitivities.' },
    'uti-follow': { n: 'Review, switch and image if not improving', tab: 3, r: 'Review at 48 hours. Image if not improving.' }
  };
  w.RMO_CASES = [
  {
    id: 'uti1', title: 'Confused with a positive dipstick', time: '19:00', where: 'Medical ward',
    blurb: 'An older woman is confused and the nurse has a positive dipstick. Tests not treating bacteriuria and re-assessing.',
    intro: '86-year-old woman from a nursing home, admitted with a fall. This evening she is more confused. The nurse sends a urine dipstick: nitrite and leucocytes positive. She is afebrile with no urinary symptoms. She asks for nothing. The nurse wants antibiotics.',
    vit: { hr: 88, sbp: 130, dbp: 74, spo2: 96, rr: 16 },
    facts: ['86F, nursing home, fall', 'More confused since the afternoon', 'T 36.9, HR 88, BP 130/74', 'Dipstick: nitrite and leucocytes positive, no urinary symptoms', 'Glucose 6.1, new oxycodone yesterday'],
    decisions: [
      { tag: 'uti-real', scene: 'Confused, afebrile, no urinary symptoms, positive dipstick. What do you think?', opts: [
        o('best', 'Probably asymptomatic bacteriuria. Look for another cause of the confusion', 'Older patients often have bacteriuria. Confusion alone is not enough.'),
        o('poor', 'A UTI. Start antibiotics now', 'No fever or urinary symptoms: it is not enough.'),
        o('poor', 'Nothing is wrong, she is just old', 'The confusion is new and needs a cause.'),
        o('harm', 'Sepsis: call the MET team', 'There are no sepsis features.')] },
      { tag: 'uti-real', scene: 'What do you look for?', opts: [
        o('best', 'Glucose, a drug review (the new oxycodone), constipation, a bladder scan for retention, pain, and any infection elsewhere', 'These are the common causes of new delirium.'),
        o('poor', 'Only the urine culture', 'It will not answer the question.'),
        o('poor', 'A CT head straight away', 'Not without focal signs.'),
        o('harm', 'Sedate her to settle her', 'It makes delirium worse.')] },
      { tag: 'uti-treat', scene: 'The nurse asks again about antibiotics. What do you say?', opts: [
        o('best', 'Not now: antibiotics for bacteriuria cause side effects and resistance. Review her if she gets a fever or urinary symptoms', 'Treat the real cause and watch.'),
        o('poor', 'Give a single dose to be safe', 'There is no benefit and some harm.'),
        o('poor', 'Give a broad-spectrum antibiotic', 'It is wrong.'),
        o('harm', 'Start gentamicin', 'Nephrotoxic, and not needed.')] },
      { tag: 'uti-follow', scene: 'At 07:00 she has a temperature of 38.6, rigors and left loin tenderness. What now?', opts: [
        o('best', 'The picture has changed: cultures, then antibiotics for pyelonephritis, and fluids', 'Now she has fever, loin pain and a positive urine.'),
        o('harm', 'Wait another day', 'She is unwell.'),
        o('poor', 'Only paracetamol', 'She needs treatment.'),
        o('harm', 'Discharge her back to the nursing home', 'Not while she is febrile and confused.')] }
    ],
    ends: { hi: 'You avoided treating bacteriuria, found the constipation and retention, and reassessed when the picture changed.', mid: 'You reached the right place, with unnecessary antibiotics along the way.', lo: 'The delirium was missed because the urine took the blame.' },
    hard: { debrief: 'Do not treat a dipstick. Look for the real cause of delirium, and reassess when the fever appears.', steps: [
      { label: 'Evening', tag: 'uti-real', time: '19:00', window: 'Now: the evening round',
        scene: 'New confusion, afebrile, positive dipstick, no symptoms, new oxycodone. What do you order?',
        first: ['bsl'], firstWhy: 'A glucose is quick and tells you something.',
        plan: PL(['none', ['reg'], 'Stable, afebrile: no call needed. Tell your registrar at handover.'], ['routine', ['q15'], 'Routine observations: she is afebrile and stable. Add delirium checks.'], ['m20', ['h1', 'h4'], 'Review her again in a few hours.']),
        orders: {
          bsl: N('Glucose.'), bladder_scan: N('Retention is a common cause.'), drugchart: N('The new opioid, sedatives and anticholinergics.'),
          uec: G('Electrolytes and creatinine.'), fbc: G('Full blood count.'), crp: G('CRP.'), cxr: G('Chest X-ray: infection elsewhere.'),
          gcs: G('Neuro observations.'), ecg: G('ECG.'), paracet: G('Paracetamol for pain.', { d: [0] }),
          urine_mcs: S('A culture will only grow bacteria she already has.'), urine_dip: S('Already done: it is the dipstick that started this.'),
          ceftri: S('Antibiotics for a dipstick.'), amox: S('Antibiotics for a dipstick.'), trim_oral: S('Antibiotics for a dipstick.'),
          cefalexin: S('Antibiotics for a dipstick.'), nitro: S('Antibiotics for a dipstick.'), gent: X('Nephrotoxic and not indicated.'),
          midaz: X('A sedative worsens delirium.'), halo: S('Not for mild confusion.'), cthead: S('No focal signs.'),
          morph: X('An opioid in a delirious older patient.', { harmDose: [0, 1] })
        },
        ok: { text: 'The bladder scan shows 650 mL: retention from constipation and the new opioid. She is catheterised and given a bowel plan. The confusion settles overnight.', facts: ['Bladder scan 650 mL', 'Retention from opioid and constipation'] },
        miss: { text: 'She receives three days of antibiotics and the retention is missed. She becomes more confused and develops diarrhoea.', facts: ['Antibiotic-associated diarrhoea'] } },
      { label: 'Next morning', tag: 'uti-follow', time: '07:00', window: 'Next morning',
        scene: 'Temperature 38.6, rigors, left loin tenderness, HR 108, BP 112/64. What do you order?',
        plan: PL(['reg', ['none'], 'A new febrile illness in an older patient with retention: tell your registrar.'], ['routine', ['q15'], 'Routine observations with a low threshold to escalate: she is febrile but her BP is holding.'], ['h1', ['m20'], 'Review after the first bolus and the antibiotic.']),
        orders: {
          bcult: N('Blood cultures.'), urine_mcs: N('Urine culture before antibiotics.'), ceftri: N('An IV antibiotic, per protocol and local resistance.', { alt: ['gent', 'amp'] }),
          gent: G('A weight-based dose per protocol, with a creatinine check.'), amp: G('Per protocol.'),
          bolus250: N('A measured bolus.', { alt: ['bolus'] }), bolus: G('A bolus.'), uec: N('Creatinine.'), lactate: G('Lactate.'), fbc: G('Full blood count.'),
          renal_us: G('Ultrasound if she does not improve, to look for obstruction.'), fbal: G('Fluid balance.'), idc: G('A catheter to relieve retention and measure urine.'),
          paracet: G('Paracetamol.', { d: [0] }), nitro: S('Not for pyelonephritis.'), ibup: X('An NSAID in an older patient with an infection.')
        },
        ok: { text: 'By the afternoon her temperature is 37.4 and she is brighter. The culture grows E. coli.' }, miss: { text: 'She becomes septic by the afternoon.' } }
    ] }
  },
  {
    id: 'uti2', title: 'Pyelonephritis, then a switch', time: '10:00', where: 'Emergency ward',
    blurb: 'A young woman with fever, loin pain and vomiting. Tests cultures, pregnancy test, IV start and the oral switch.',
    intro: '34-year-old woman with a day of dysuria, then fever and left loin pain. She has vomited twice and cannot keep tablets down. Temperature 38.8, pulse 106, BP 112/68. She is not sure when her last period was.',
    vit: { hr: 106, sbp: 112, dbp: 68, spo2: 98, rr: 18 },
    facts: ['34F, dysuria for 3 days, now fever and left loin pain', 'Vomited twice, cannot keep tablets down', 'T 38.8, HR 106, BP 112/68', 'Left costovertebral tenderness', 'Last period unsure, dipstick: nitrite, leucocytes, blood'],
    decisions: [
      { tag: 'uti-class', scene: 'Fever, loin pain, vomiting, positive dipstick. What do you call this?', opts: [
        o('best', 'Acute pyelonephritis, to treat with IV antibiotics because she is vomiting', 'Upper tract infection that she cannot take tablets for.'),
        o('poor', 'Cystitis, a three-day oral course', 'It has gone up the tract.'),
        o('poor', 'A kidney stone', 'No colicky pain.'),
        o('harm', 'Asymptomatic bacteriuria', 'She is symptomatic.')] },
      { tag: 'uti-treat', scene: 'What do you do before the first dose?', opts: [
        o('best', 'Urine and blood cultures, a pregnancy test, creatinine, then an IV antibiotic', 'Culture and pregnancy status guide treatment. Do not delay it.'),
        o('ok', 'The antibiotic first, cultures later', 'Culture first if it does not delay.'),
        o('poor', 'A CT of the abdomen first', 'Not needed unless she fails to respond.'),
        o('harm', 'Skip cultures: just treat', 'Cultures guide the oral switch.')] },
      { tag: 'uti-follow', scene: 'At 48 hours she is afebrile, eating, and the culture shows a sensitive E. coli. What now?', opts: [
        o('best', 'Switch to a sensitive oral antibiotic for the rest of the course, and discharge with advice and GP follow-up', 'She has responded and the sensitivities are known.'),
        o('poor', 'Continue the IV for the full course', 'Unnecessary.'),
        o('poor', 'Stop the antibiotic', 'It is too early.'),
        o('harm', 'Switch to a drug the isolate is resistant to', 'Check the sensitivities.')] },
      { tag: 'uti-follow', scene: 'Another patient still has fever and pain at 72 hours on the right antibiotic. What now?', opts: [
        o('best', 'Image the kidneys for a stone, obstruction or abscess, and ask the seniors', 'Failure to respond means a complication until proven otherwise.'),
        o('poor', 'Switch to a different antibiotic only', 'Look for the reason.'),
        o('poor', 'Wait another day', 'She is not improving.'),
        o('harm', 'Stop the antibiotic', 'No.')] }
    ],
    ends: { hi: 'Cultures, IV start, a switch to oral and a safety net. She is home on day three.', mid: 'She recovers, but a delay to cultures left the choice uncertain.', lo: 'A missed pregnancy changes the plan.' },
    hard: { debrief: 'Cultures, a pregnancy test, IV antibiotics because she is vomiting, and a switch to oral to the sensitivities.', steps: [
      { label: 'The first hour', tag: 'uti-treat', time: '10:00', window: 'Now: the first hour',
        scene: 'Pyelonephritis, vomiting, T 38.8, last period unsure. What do you order?',
        first: ['bhcg', 'urine_mcs', 'bcult'], firstWhy: 'Cultures and pregnancy status come before the antibiotic.',
        plan: PL(['reg', ['none'], 'Tell your registrar: a febrile patient who cannot take tablets.'], ['routine', ['q15'], 'Routine observations, with a low threshold to escalate: she is stable.'], ['h4', ['h1', 'm20'], 'Review her after treatment.']),
        orders: {
          bhcg: N('A pregnancy test.', { crit: true }), urine_mcs: N('Urine culture before antibiotics.'), bcult: N('Blood cultures.'),
          uec: N('Creatinine.'), fbc: G('Full blood count.'), crp: G('CRP.'), lactate: G('Lactate if she is unwell.'),
          ceftri: N('An IV antibiotic, because she is vomiting.', { alt: ['gent', 'amp'] }), gent: G('Per protocol with a creatinine check.'), amp: G('Per protocol.'),
          bolus250: G('A measured bolus if she is dry.', { alt: ['bolus'] }), bolus: G('A bolus.'), antiemetic: N('Ondansetron.', { d: [0] }), paracet: G('Paracetamol.', { d: [0] }),
          fbal: G('Fluid balance.'), renal_us: S('Not needed yet. Image if she does not respond in 48 to 72 hours.'),
          nitro: S('Oral drug when she is vomiting.'), trim_oral: S('Oral drug when she is vomiting.'), cefalexin: S('Oral drug when she is vomiting.'),
          ibup: S('She is dry with a kidney infection.'), ctkub: S('Not needed unless she fails to respond.')
        },
        ok: { text: 'Her pregnancy test is negative. By evening she is afebrile and drinking. The urine grows E. coli.', vit: { hr: 88 }, facts: ['Pregnancy test negative', 'E. coli on culture'] },
        miss: { text: 'She is given an oral antibiotic and vomits it. By evening she is still febrile.', vit: { hr: 112 }, facts: ['Still febrile'] } },
      { label: 'At 48 hours', tag: 'uti-follow', time: '10:00', window: 'Two days later',
        scene: 'Afebrile for 24 hours, eating and drinking, E. coli sensitive to oral options. What do you order?',
        plan: PL(['none', ['reg'], 'Improving: no call needed.'], ['routine', ['q15'], 'Routine.'], ['am', ['h4'], 'Follow-up with the GP.']),
        orders: {
          cefalexin: N('A sensitive oral antibiotic to finish the course, per eTG.', { alt: ['trim_oral', 'nitro'] }), trim_oral: G('If sensitive, per protocol.'), nitro: S('Nitrofurantoin does not reach kidney tissue: not for pyelonephritis.'),
          gp: N('GP follow-up.'), dc_now: G('Home once the oral antibiotic is tolerated, with safety-net advice: fever, vomiting, uncontrolled pain.'),
          ceftri: S('Stay on IV unnecessarily.', { alt: [] }), renal_us: S('Not needed: she has responded.')
        },
        ok: { text: 'She goes home with a clear plan and finishes the course.' }, miss: { text: 'She stays an extra two nights on IV antibiotics for no reason.' } }
    ] }
  }
  ];
})(window);
