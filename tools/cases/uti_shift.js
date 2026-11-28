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
          bcult: N('Blood cultures.'), urine_mcs: N('Urine culture before antibiotics.'), ceftri: N('An IV antibiotic: gentamicin (no more than 48 hours) or ceftriaxone if IV is likely to run past 72 hours (eTG).', { alt: ['gent', 'amp'] }),
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
          ceftri: N('An IV antibiotic, because she is vomiting: gentamicin (no more than 48 hours) or ceftriaxone (eTG).', { alt: ['gent', 'amp'] }), gent: G('eTG prefers gentamicin for no more than 48 hours, weight-based, with a creatinine check.'), amp: G('Per protocol.'),
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
          cefalexin: N('A sensitive oral antibiotic to finish the course, per eTG.', { alt: ['trim_oral'] }), trim_oral: G('If sensitive, per protocol.'), nitro: S('Nitrofurantoin does not reach kidney tissue: not for pyelonephritis.'),
          gp: N('GP follow-up.'), dc_now: G('Home once the oral antibiotic is tolerated, with safety-net advice: fever, vomiting, uncontrolled pain.'),
          ceftri: S('Stay on IV unnecessarily.', { alt: [] }), renal_us: S('Not needed: she has responded.')
        },
        ok: { text: 'She goes home with a clear plan and finishes the course.' }, miss: { text: 'She stays an extra two nights on IV antibiotics for no reason.' } }
    ] }
  },
  {
    id: 'c20261127a', from: 'uti1', title: 'Pulling at lines after a hip repair', time: '23:00', where: 'Orthopaedic ward',
    blurb: 'An older man is agitated after hip surgery and the dipstick is positive. Tests looking past the urine to the chest, and not sending a culture.',
    intro: '81-year-old man, day 2 after fixation of a hip fracture. His catheter came out this morning. Tonight he is agitated, pulling at his drip and trying to climb out of bed. The nurse has done a dipstick: nitrite and leucocytes positive. "Can we start something for his urine?"',
    vit: { hr: 98, sbp: 138, dbp: 76, spo2: 91, rr: 22 },
    facts: ['81M, day 2 after hip fracture fixation', 'Catheter out this morning, passing urine, no urinary symptoms he can describe', 'T 37.6, HR 98, BP 138/76, RR 22, SpO2 91% on room air', 'Dipstick: nitrite and leucocytes positive', 'Oxycodone for pain, bowels not open since admission'],
    decisions: [
      { tag: 'uti-real', scene: 'Agitated, T 37.6, RR 22, SpO2 91%, positive dipstick. What do you think?', opts: [
        o('best', 'The dipstick means little in an older man just off a catheter. The fast breathing and low sats point elsewhere: look at the whole patient', 'Bacteriuria is common in older people and after a catheter. New hypoxia is the clue here.'),
        o('poor', 'A catheter UTI: start an antibiotic for his urine', 'He has no urinary symptoms, and the dipstick cannot tell bacteriuria from infection. The chest is the louder sign.'),
        o('poor', 'Post-op delirium: haloperidol and review in the morning', 'Delirium always has a cause. Find it before you sedate.'),
        o('harm', 'Midazolam to settle him so he stops pulling at lines', 'A benzodiazepine worsens delirium and can stop a hypoxic man breathing.')] },
      { tag: 'uti-real', scene: 'What do you check now?', opts: [
        o('best', 'Examine the chest, oxygen to a target of 92 to 96%, chest X-ray, glucose, bladder scan, bowel and drug chart (the oxycodone), pain, and FBC, UEC and CRP', 'Hypoxia, infection elsewhere, retention, constipation, drugs and pain are the common causes of new delirium after surgery. A PE is on the list too after a hip fracture.'),
        o('poor', 'Send the urine for culture and wait for the result', 'It takes a day, will likely grow something, and does not explain the low sats.'),
        o('poor', 'A CT head first', 'Not without a head strike, focal signs or a reason to suspect a bleed.'),
        o('harm', 'Start an antibiotic for the urine now to cover it', 'It treats the wrong problem and delays finding the real one.')] },
      { tag: 'uti-treat', scene: 'The nurse asks: "Shall I at least send a urine culture?" What do you say?', opts: [
        o('best', 'No. Without urinary symptoms a culture will grow bacteria and push us to treat them. Send one if he gets urinary symptoms, or sepsis with no other source', 'Australian stewardship advice (ACSQHC): do not test or treat urine in people without urinary symptoms.'),
        o('poor', 'Yes, just in case', 'A positive result in a man without symptoms leads to antibiotics he does not need.'),
        o('poor', 'Repeat the dipstick in the morning', 'Another dipstick tells you nothing new.'),
        o('harm', 'Send it, and start whatever it grows', 'That is treating asymptomatic bacteriuria.')] },
      { tag: 'uti-real', scene: 'Next morning: the chest X-ray shows left lower lobe consolidation and he is on an antibiotic for hospital-acquired pneumonia. He is calmer. The day team had sent a urine culture: E. coli over 10^8 CFU/L. The nurse asks to add trimethoprim. What do you do?', opts: [
        o('best', 'Do not add it: this is asymptomatic bacteriuria. Document it and tell the team', 'The chest explains the delirium and the fever. A positive culture without urinary symptoms is not treated.'),
        o('poor', 'Add trimethoprim for the urine', 'Two antibiotics for one infection: side effects, C. difficile and resistance, no benefit.'),
        o('poor', 'Change to one antibiotic that covers both', 'There is only one infection to cover. Choose for the chest, per your hospital protocol.'),
        o('harm', 'Add gentamicin', 'Nephrotoxic in an older man after surgery, for a result that needs no treatment.')] }
    ],
    ends: { hi: 'You looked past the dipstick, found the pneumonia, and did not treat his bacteriuria.', mid: 'The chest was found, but the urine took antibiotics it did not need.', lo: 'The urine took the blame and the hypoxia was missed.' },
    hard: { debrief: 'A positive dipstick does not explain delirium. Look at the sats, the chest, the bladder, the bowels and the drug chart, and do not culture urine without urinary symptoms.', steps: [
      { label: 'Late evening', tag: 'uti-real', time: '23:00', window: 'Now: the night call',
        scene: 'Agitated, T 37.6, RR 22, SpO2 91% on room air, positive dipstick, no urinary symptoms, oxycodone, bowels not open. What do you order?',
        first: ['o2', 'chest_exam'], firstWhy: 'He is hypoxic: oxygen and a look at the chest come before the urine.',
        plan: PL(['reg', ['none'], 'Tell your registrar: new hypoxia and delirium after surgery.'], ['spo2', ['q15'], 'Continuous oximetry while he is on new oxygen.'], ['h1', ['m20'], 'Look again in an hour, with the chest X-ray.']),
        orders: {
          o2: N('Nasal prongs to a target of 92 to 96%.', { d: [1] }), chest_exam: N('Listen to the chest: the likely source.'), cxr: N('Chest X-ray.'),
          bsl: N('Glucose.'), bladder_scan: N('Retention after a catheter comes out is common.'), drugchart: N('Oxycodone, sedatives, and a bowel plan.'),
          fbc: G('Full blood count.'), uec: G('Electrolytes and creatinine.'), crp: G('CRP.'), ecg: G('ECG: an arrhythmia, or strain from a PE.'),
          paracet: G('Paracetamol for pain and fever.', { d: [0] }), bcult: G('Blood cultures if the fever climbs or the chest X-ray is clear.'),
          urine_mcs: S('No urinary symptoms: a culture only finds bacteria he already has.'), urine_dip: S('Already done: it started this.'),
          trim_oral: S('An antibiotic for a dipstick.'), cefalexin: S('An antibiotic for a dipstick.'), nitro: S('An antibiotic for a dipstick.'),
          ceftri: S('Not for the urine. If the chest X-ray shows pneumonia, choose from your hospital protocol.'), gent: X('Nephrotoxic and not indicated.'),
          midaz: X('A sedative in a hypoxic, delirious man.'), halo: S('Only for severe distress or danger, after the causes are looked for.'), cthead: S('No head strike or focal signs.'),
          morph: X('More opioid in a delirious, hypoxic older man.', { harmDose: [0, 1] })
        },
        ok: { text: 'Crackles at the left base. The chest X-ray shows left lower lobe consolidation. Bladder scan 180 mL, glucose 7.2. On 2 L by nasal prongs his SpO2 is 94%. The team starts an antibiotic for hospital-acquired pneumonia per protocol.', vit: { spo2: 94, rr: 20 }, facts: ['Left lower lobe consolidation', 'Bladder scan 180 mL', 'Glucose 7.2'] },
        miss: { text: 'He is given trimethoprim for his urine. At 04:00 his SpO2 is 86% and RR 30: a MET call finds a left lower lobe pneumonia.', vit: { spo2: 86, rr: 30 }, facts: ['MET call at 04:00'] } },
      { label: 'Next morning', tag: 'uti-treat', time: '09:00', window: 'The morning round',
        scene: 'Calmer, T 37.1, SpO2 95% on 1 L, on an antibiotic for the chest. The day team had sent a urine culture: E. coli over 10^8 CFU/L. The nurse asks to add trimethoprim. What do you order?',
        plan: PL(['none', ['reg'], 'Improving: no call. Tell the team at the round.'], ['routine', ['spo2'], 'Routine observations as the oxygen is weaned.'], ['am', ['h4'], 'Review on tomorrow\'s round.']),
        orders: {
          team: N('Tell the treating team: the culture is asymptomatic bacteriuria, not a reason for antibiotics. Document it.'),
          drugchart: G('Review the oxycodone and start a bowel plan.'),
          trim_oral: S('Bacteriuria without symptoms is not treated.'), cefalexin: S('Bacteriuria without symptoms is not treated.'), nitro: S('Bacteriuria without symptoms is not treated.'), amox: S('Bacteriuria without symptoms is not treated.'),
          ceftri: S('No extra cover for the urine. The chest antibiotic follows your hospital protocol.'), gent: X('Nephrotoxic, for a result that needs no treatment.'),
          urine_mcs: S('Do not repeat it.'), idc: S('No reason to put the catheter back.')
        },
        ok: { text: 'No antibiotic is added for the urine. He is weaned to room air by the next day and back on the rehabilitation plan.', vit: { spo2: 96, rr: 16 } },
        miss: { text: 'Trimethoprim is added. On day 5 he has diarrhoea and a positive C. difficile test, and his rehabilitation is delayed.' } }
    ] }
  },
  {
    id: 'c20261127b', title: 'Still febrile on day three', time: '10:00', where: 'Medical ward',
    blurb: 'A man with diabetes and pyelonephritis is not better on the right antibiotic. Tests the sepsis start, imaging when there is no response, urgent drainage of an obstructed kidney, and the oral switch.',
    intro: '58-year-old man with type 2 diabetes, admitted 3 days ago with right pyelonephritis. He is on IV ceftriaxone, and the E. coli in his blood and urine is sensitive to it. Today he still spikes to 39.0 with rigors and right loin pain. HR 112, BP 104/62.',
    vit: { hr: 112, sbp: 104, dbp: 62, spo2: 96, rr: 22 },
    facts: ['58M, type 2 diabetes', 'Day 3 of IV ceftriaxone for right pyelonephritis', 'E. coli in blood and urine, sensitive to ceftriaxone', 'Still T 39.0 with rigors, right loin pain', 'HR 112, BP 104/62, creatinine up from 95 to 160'],
    decisions: [
      { tag: 'uti-treat', scene: 'Look back to the night he came in: T 39.1, rigors, HR 118, BP 98/60. What should have come first?', opts: [
        o('best', 'Blood cultures and a urine culture, lactate, UEC and FBC, then an IV antibiotic within the hour and a fluid bolus', 'He met sepsis criteria. Cultures first if they do not delay the antibiotic (ACSQHC Sepsis Clinical Care Standard).'),
        o('ok', 'The antibiotic first, cultures straight after', 'Never delay the antibiotic for cultures, but take them first if you can do it quickly.'),
        o('poor', 'A CT of the kidneys before any antibiotic', 'Imaging comes later. Treat the sepsis first.'),
        o('harm', 'Oral trimethoprim and home', 'He was septic with an upper tract infection in a man with diabetes.')] },
      { tag: 'uti-follow', scene: 'Now, day 3: still febrile and in pain on an antibiotic the organism is sensitive to. What do you think?', opts: [
        o('best', 'Failure to improve by 48 to 72 hours means a complication until proven otherwise: image the kidneys for obstruction, a stone or an abscess', 'The drug is right, so look for a collection or a blocked kidney the drug cannot clear.'),
        o('poor', 'Change to a broader antibiotic', 'The organism is sensitive. A new drug will not drain pus or unblock a kidney.'),
        o('poor', 'Give it another 48 hours', 'He is getting worse: his creatinine is rising.'),
        o('harm', 'Stop the antibiotic to see if it is a drug fever', 'He has a bacteraemia that is not under control.')] },
      { tag: 'uti-follow', scene: 'The ultrasound shows right hydronephrosis with a stone in the upper ureter. What now?', opts: [
        o('best', 'An infected obstructed kidney: urgent urology for drainage (stent or nephrostomy) today, keep the antibiotic, and tell your registrar', 'Antibiotics alone cannot clear an obstructed infected kidney. It needs decompressing urgently (USANZ urosepsis guideline).'),
        o('poor', 'Book an outpatient urology review for the stone', 'This is an emergency, not a clinic problem.'),
        o('poor', 'Strain the urine and wait for the stone to pass', 'Fine for a simple stone, not an infected obstructed kidney.'),
        o('harm', 'Add an NSAID for the pain and keep watching', 'An NSAID with a rising creatinine and sepsis, and the obstruction is still there.')] },
      { tag: 'uti-follow', scene: 'Two days after a stent he is afebrile for 24 hours and eating. The E. coli is sensitive to cefalexin and trimethoprim. What now?', opts: [
        o('best', 'Switch to a sensitive oral antibiotic to finish the course per eTG, and arrange urology follow-up for definitive stone treatment and stent removal', 'Responded, sensitivities known, and the stent must not be forgotten.'),
        o('poor', 'Nitrofurantoin, as it is a good urinary antibiotic', 'It does not reach kidney tissue or blood: not for pyelonephritis or bacteraemia.'),
        o('poor', 'Stay on IV until the stone is treated', 'Unnecessary once he has responded.'),
        o('harm', 'Discharge with no plan for the stent', 'A forgotten stent encrusts and blocks.')] }
    ],
    ends: { hi: 'You imaged when he did not respond, got the kidney drained, and switched to oral with a stent plan.', mid: 'He recovered, but the obstruction was found late.', lo: 'An infected obstructed kidney was treated with antibiotics alone.' },
    hard: { debrief: 'Not better at 48 to 72 hours on the right antibiotic: image. An infected obstructed kidney needs urgent drainage, then a culture-guided oral switch and a stent plan.', steps: [
      { label: 'Day 3, 10:00', tag: 'uti-follow', time: '10:00', window: 'Now: the morning round',
        scene: 'Day 3 of IV ceftriaxone, sensitive E. coli. Still T 39.0, rigors, right loin pain, HR 112, BP 104/62, creatinine 160 (was 95). What do you order?',
        first: ['renal_us', 'bcult'], firstWhy: 'Not responding: image the kidney, and repeat the cultures.',
        plan: PL(['reg', ['none'], 'Tell your registrar: not responding, with a rising creatinine.'], ['q15', ['routine'], 'Close observations: he is septic with a BP of 104.'], ['h1', ['m20'], 'Look again after the bolus and the ultrasound result.']),
        orders: {
          renal_us: N('Ultrasound for obstruction, a stone or an abscess.', { alt: ['ctkub'] }), ctkub: G('A CT KUB also finds the stone.'),
          bcult: N('Repeat blood cultures.'), uec: N('Creatinine and potassium.'), lactate: N('Lactate.'), fbc: G('Full blood count.'), crp: G('CRP.'),
          bolus250: N('A measured bolus.', { alt: ['bolus'] }), bolus: G('A bolus.'), fbal: N('Strict fluid balance.'), bsl: G('Glucose: sepsis and diabetes.'),
          stop_nephro: G('Withhold metformin and other drugs that harm the kidney or build up.', { alt: ['stop_metformin'] }), stop_metformin: G('Withhold metformin with a rising creatinine.'),
          paracet: G('Paracetamol.', { d: [0] }), urine_mcs: G('Repeat the urine culture.'),
          gent: S('The organism is sensitive to what he is on. A new drug will not clear an obstruction.'), amp: S('Not needed: he is on a drug it is sensitive to.'),
          ibup: X('An NSAID with a rising creatinine and sepsis.'), dc_now: X('He is septic.')
        },
        ok: { text: 'The ultrasound shows right hydronephrosis with a 7 mm stone in the upper ureter. Lactate 2.6. After 500 mL his BP is 112/66.', vit: { hr: 106, sbp: 112, dbp: 66 }, facts: ['Right hydronephrosis', '7 mm upper ureteric stone', 'Lactate 2.6'] },
        miss: { text: 'The antibiotic is changed and he waits another day. That night his BP is 82/50 and a MET call is made.', vit: { hr: 128, sbp: 82, dbp: 50 }, facts: ['MET call overnight'] } },
      { label: 'Day 3, 12:00', tag: 'uti-follow', time: '12:00', window: 'The ultrasound result',
        scene: 'Right hydronephrosis with an obstructing upper ureteric stone. Still febrile, BP 112/66 after fluid. What do you order?',
        plan: PL(['reg', ['icu'], 'Your registrar now, with urology: an infected obstructed kidney is an emergency.', true], ['q15', ['routine'], 'Close observations until he is drained.'], ['h1', ['m20'], 'Review after urology has seen him.']),
        orders: {
          urology_urgent: N('Urgent drainage today: a stent or nephrostomy.', { crit: true }), team: G('Tell the treating team.'),
          strain: S('Not while the kidney is infected and blocked.'), urology_ref: S('This is an emergency, not a clinic referral.'),
          ibup: X('An NSAID with sepsis and a rising creatinine.'), dc_now: X('He needs drainage.')
        },
        ok: { text: 'He has a right ureteric stent that evening. Pus drains from the kidney. By the next morning he is afebrile.', vit: { hr: 92, sbp: 118, dbp: 70 }, facts: ['Stent inserted', 'Afebrile the next morning'] },
        miss: { text: 'He stays on antibiotics alone. He becomes more septic overnight and goes to theatre at 02:00 instead.', vit: { hr: 124, sbp: 88, dbp: 52 } } },
      { label: 'Two days later', tag: 'uti-follow', time: '10:00', window: 'The morning round',
        scene: 'Two days after the stent. Afebrile for 24 hours, eating, creatinine back to 105. The E. coli is sensitive to cefalexin and trimethoprim. What do you order?',
        plan: PL(['none', ['reg'], 'Improving: no call needed.'], ['routine', [], 'Routine observations.'], ['am', ['h4'], 'GP follow-up after discharge.']),
        orders: {
          cefalexin: N('A sensitive oral antibiotic to finish the course, per eTG.', { alt: ['trim_oral'] }), trim_oral: G('If sensitive, per eTG.'),
          urology_ref: N('Urology follow-up for the stone and stent removal.'), gp: G('GP follow-up.'), dc_now: G('Home once the oral antibiotic is tolerated, with safety-net advice.'),
          nitro: S('Nitrofurantoin does not reach kidney tissue or blood: not for pyelonephritis.'), ceftri: S('No need to stay on IV.')
        },
        ok: { text: 'He goes home on an oral antibiotic with a date for stone treatment and stent removal.' },
        miss: { text: 'He is sent home with no stent plan. Six months later the stent is encrusted and blocked.' } }
    ] }
  }
  ];
})(window);
