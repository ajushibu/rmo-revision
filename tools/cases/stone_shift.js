/* Kidney stones and renal colic: concepts and cases (easy + hard) */
(function (w) {
  /* Easy = decisions (multiple choice). Hard = hard.steps (order sheet, ward.js). Both share the same tags, so the weak-point analysis sees one set of concepts. */
  var o = function (q, t, fb, vit) { var r = { q: q, t: t, fb: fb }; if (vit) r.vit = vit; return r; };
  var rule = function (q) { return function (why, x) { var r = { q: q, why: why }; for (var k in x || {}) r[k] = x[k]; return r; }; };
  var N = rule('need'), G = rule('good'), S = rule('skip'), X = rule('harm');
  var PL = function (c, m, r) { return { call: { best: [c[0]], ok: c[1] || [], why: c[2], crit: !!c[3] }, monitor: { best: [m[0]], ok: m[1] || [], why: m[2] }, review: { best: [r[0]], ok: r[1] || [], why: r[2] } }; };
  w.RMO_CONCEPTS = {
    'stone-dx': { n: 'Recognise colic and do not miss the others', tab: 1, r: 'Aortic aneurysm in the over-60s, ectopic pregnancy in women, torsion in the young.' },
    'stone-pain': { n: 'Pain, nausea and the scan', tab: 2, r: 'NSAID first, then an opioid. CT KUB without contrast, ultrasound in pregnancy.' },
    'stone-emerg': { n: 'The infected, blocked kidney', tab: 3, r: 'Fever and a stone is an emergency: antibiotics, fluids and urgent urology.' },
    'stone-go': { n: 'Who goes home', tab: 3, r: 'Small stone, controlled pain, normal kidneys, afebrile: home with a strainer, safety-net advice and follow-up.' }
  };
  w.RMO_CASES = [
  {
    id: 'stone1', title: 'Loin to groin', time: '23:00', where: 'Emergency department',
    blurb: 'A young man writhing in loin pain with blood in his urine. Tests analgesia, the scan and who goes home.',
    intro: '34-year-old man, sudden left loin pain that goes to the groin, with vomiting. He cannot lie still. He is afebrile. The dipstick has blood. The creatinine is normal.',
    vit: { hr: 102, sbp: 152, dbp: 92, spo2: 98, rr: 18 },
    facts: ['34M, sudden left loin to groin pain, vomiting', 'Writhing, afebrile (36.8)', 'Dipstick: blood +++, no nitrite or leucocytes', 'Creatinine 88 (normal)', 'Abdomen soft, no peritonism, no aneurysm signs'],
    decisions: [
      { tag: 'stone-dx', scene: 'Young man, writhing, haematuria, afebrile. What is the likely diagnosis, and what must you not miss?', opts: [
        o('best', 'Renal colic from a stone. Not to miss: testicular torsion and an obstructed infection', 'Look at the testicle, and check for fever and signs of infection.'),
        o('poor', 'Appendicitis', 'The pain pattern is loin to groin.'),
        o('poor', 'A muscle strain', 'Haematuria and writhing are not muscle strain.'),
        o('harm', 'Just anxiety', 'Never.')] },
      { tag: 'stone-pain', scene: 'What do you give first?', opts: [
        o('best', 'An NSAID, an antiemetic, and small IV doses of morphine if the pain is not controlled', 'NSAID is first-line for colic with normal kidneys.', { hr: 92 }),
        o('poor', 'Paracetamol only', 'Too weak for this pain.'),
        o('poor', 'A large 10 mg dose of IV morphine at once', 'Titrate in small steps.'),
        o('harm', 'Oral fluids only', 'He is vomiting.')] },
      { tag: 'stone-pain', scene: 'What imaging do you request?', opts: [
        o('best', 'CT KUB without contrast', 'This shows the stone and any hydronephrosis. Check pregnancy status in women.'),
        o('poor', 'Plain abdominal X-ray only', 'It misses many stones.'),
        o('poor', 'A CT with contrast and delayed phases', 'Not needed for a stone, with more radiation.'),
        o('harm', 'No imaging, discharge him', 'The first episode needs imaging.')] },
      { tag: 'stone-go', scene: 'CT: a 5 mm stone in the lower ureter, mild hydronephrosis. He is afebrile, the creatinine is normal and the pain is controlled. What now?', opts: [
        o('best', 'Discharge with analgesia, a strainer, safety-net advice and urology follow-up', 'Up to 6 mm, most pass within a month; tamsulosin may help a distal stone (eTG). Tell him when to return.'),
        o('poor', 'Admit and give antibiotics', 'No infection.'),
        o('poor', 'Discharge without advice', 'He needs return advice.'),
        o('harm', 'Book him for theatre tonight', 'Not needed.')] }
    ],
    ends: { hi: 'Pain controlled, scan done, and a clear plan. He passes the stone in two days.', mid: 'He is treated, but the advice at discharge was thin.', lo: 'He returns with a fever and an obstructed kidney.' },
    hard: { debrief: 'Control the pain, scan him, and make sure the kidney is not infected and blocked.', steps: [
      { label: 'Pain and tests', tag: 'stone-pain', time: '23:00', window: 'Now: the first hour',
        scene: 'Writhing loin pain, vomiting, haematuria, normal creatinine, afebrile. What do you order?',
        first: ['nsaid_colic', 'antiemetic'], firstWhy: 'Analgesia and antiemetic come first.',
        plan: PL(['reg', ['none'], 'A stable colic: tell your registrar, but you do not need an urgent call.'], ['routine', ['q15'], 'Routine observations.'], ['h1', ['m20'], 'Review the pain after treatment.']),
        orders: {
          nsaid_colic: N('An NSAID is first-line for colic with normal kidneys.', { crit: true }), antiemetic: N('Ondansetron.', { d: [0] }),
          paracet: G('Paracetamol.', { d: [0] }), morph: G('Small IV steps if the pain is not controlled.', { d: [0], harmDose: [1] }),
          urine_dip: N('Dipstick for blood and infection.'), uec: N('Creatinine.'), fbc: G('Full blood count.'), crp: G('CRP.'),
          ctkub: N('CT KUB without contrast.'), strain: N('Strain the urine.'), urine_mcs: G('Urine culture.'),
          bolus250: G('A measured bolus if vomiting and dry.', { alt: ['bolus'] }), bolus: G('A bolus if dry.'), ecg: G('ECG if older or has a risk.'),
          ceftri: S('No sign of infection.'), idc: S('No indication for a catheter.'), cxr: S('Not needed.'),
          ibup: G('Another NSAID option.'), oxyc: S('Start with IV analgesia while vomiting.')
        },
        ok: { text: 'The pain settles within 30 minutes. The CT shows a 5 mm lower ureteric stone with mild hydronephrosis.', vit: { hr: 84, sbp: 130 }, facts: ['CT: 5 mm stone, mild hydronephrosis'] },
        miss: { text: 'An hour later he is still in agony. The scan is delayed and the creatinine is 120.', vit: { hr: 110 }, facts: ['Pain uncontrolled'] } },
      { label: 'Plan for home', tag: 'stone-go', time: '02:00', window: 'In a few hours',
        scene: 'The pain is controlled, he is drinking, afebrile, creatinine normal, and the stone is 5 mm. What do you order?',
        plan: PL(['none', ['reg'], 'A stable stone: discuss with your registrar if you want, but no urgent call.'], ['routine', ['q15'], 'Routine.'], ['am', ['h4'], 'Follow-up in the clinic.']),
        orders: {
          urology_ref: N('Urology follow-up for the stone.'), strain: N('A strainer to catch the stone.'), nsaid_colic: G('A short oral NSAID course, as kidney function is normal.'),
          paracet: G('Paracetamol.', { d: [0] }), tamsulosin: G('A distal stone: tamsulosin 400 micrograms daily for up to 4 weeks may help (eTG; evidence conflicting).'), dc_now: G('Discharge once pain-free and eating, with return advice: fever, uncontrolled pain, vomiting, no urine.'), gp: G('GP follow-up.'),
          ceftri: S('No infection.'), urology_urgent: S('Not urgent: no infection, no obstruction with kidney injury.')
        },
        ok: { text: 'He goes home with a strainer and a clear plan. He passes the stone in two days.' }, miss: { text: 'He returns the next day with a fever of 38.5, vomiting and no urine.' } }
    ] }
  },
  {
    id: 'stone2', title: 'Fever, loin pain and a stone', time: '04:00', where: 'Emergency department',
    blurb: 'A woman with a fever and a blocked, infected kidney. Tests spotting the emergency and calling urology.',
    intro: '52-year-old woman with left loin pain for two days, and rigors since last night. She is flushed and sweaty. Temperature 38.9, pulse 118, BP 98/60. CT shows an 8 mm stone in the upper ureter with hydronephrosis and fat stranding. Creatinine 180 (baseline 80), WCC 22.',
    vit: { hr: 118, sbp: 98, dbp: 60, spo2: 96, rr: 24 },
    facts: ['52F, left loin pain for 2 days, rigors', 'T 38.9, HR 118, BP 98/60, RR 24', 'CT: 8 mm stone, hydronephrosis, fat stranding', 'Creatinine 180 (baseline 80), WCC 22, CRP 210', 'Dipstick: nitrite and blood positive'],
    decisions: [
      { tag: 'stone-emerg', scene: 'Fever, shock signs, a stone and hydronephrosis with a creatinine rise. What is this?', opts: [
        o('best', 'An infected, obstructed kidney: sepsis and an emergency', 'Pus behind a blocked kidney. It will not clear without drainage.'),
        o('poor', 'Pyelonephritis, treat with oral antibiotics', 'It is obstructed and she is septic.'),
        o('poor', 'A simple stone, give an NSAID', 'The NSAID would harm the kidney and she is septic.'),
        o('harm', 'Just constipation', 'Dangerous.')] },
      { tag: 'stone-emerg', scene: 'What do you do in the first hour?', opts: [
        o('best', 'Cultures, IV antibiotics, fluids in boluses, lactate, and call the urology registrar to decompress the kidney', 'Antibiotics and drainage: both are needed.', { sbp: 108, hr: 108 }),
        o('poor', 'Antibiotics and admit for a scan tomorrow', 'The scan is done. She needs drainage now.'),
        o('poor', 'An NSAID and discharge when the pain settles', 'She is septic.'),
        o('harm', 'Wait for the culture result before antibiotics', 'Never delay antibiotics in sepsis.')] },
      { tag: 'stone-pain', scene: 'She is still in pain. What do you give?', opts: [
        o('best', 'Paracetamol and small IV morphine steps. No NSAID, because of the kidney injury and sepsis', 'Opioids and paracetamol are safe here. An NSAID would harm the kidney.'),
        o('ok', 'Paracetamol alone', 'Safe, but unlikely to be enough.'),
        o('poor', 'Nothing until after the stent', 'She needs pain relief now.'),
        o('harm', 'An NSAID, as for any renal colic', 'It would worsen the kidney injury in sepsis.')] },
      { tag: 'stone-go', scene: 'Urology puts in a ureteric stent. Where does she go?', opts: [
        o('best', 'A monitored bed or HDU, with repeat lactate and creatinine, hourly urine output and an antibiotic plan', 'She is septic and has had a procedure.'),
        o('poor', 'The short-stay unit', 'Too low an acuity.'),
        o('poor', 'Home when the pain settles', 'She is septic.'),
        o('harm', 'Stop antibiotics once the stent is in', 'She needs a full course.')] }
    ],
    ends: { hi: 'Antibiotics and drainage within hours. Her creatinine falls and she goes home in four days.', mid: 'She recovers, but drainage was delayed.', lo: 'Her sepsis worsens and she needs ICU.' },
    hard: { debrief: 'An infected, blocked kidney needs antibiotics and drainage together. No NSAID.', steps: [
      { label: 'The first hour', tag: 'stone-emerg', time: '04:00', window: 'Now: the first hour',
        scene: 'Sepsis, an 8 mm stone with hydronephrosis, creatinine 180, WCC 22. What do you order?',
        first: ['bcult', 'ceftri', 'urology_urgent'], firstWhy: 'Antibiotics and drainage: both matter.',
        plan: PL(['reg', ['met', 'icu'], 'Sepsis with an obstructed kidney: call your registrar now.', true], ['spo2', ['spo2ecg', 'q15'], 'Continuous monitoring in a septic patient.'], ['m20', ['m5', 'h1'], 'Reassess after the first bolus.']),
        orders: {
          bcult: N('Blood cultures.'), urine_mcs: N('Urine culture.'),
          ceftri: N('A broad IV antibiotic in the first hour, per your sepsis pathway.', { crit: true, alt: ['gent', 'amp'] }),
          gent: G('A weight-based dose per protocol, with care for the kidney.'), amp: G('Per protocol.'),
          bolus250: N('A measured fluid bolus, reassessed after each.', { alt: ['bolus'] }), bolus: G('A bolus is right.'),
          lactate: N('Lactate.'), urology_urgent: N('Urgent urology: decompress the kidney with a stent or nephrostomy.', { crit: true }),
          uec: N('Creatinine and electrolytes.'), hourly_uo: N('Hourly urine output.'), idc: G('A catheter to monitor urine output.'),
          paracet: G('Paracetamol.', { d: [0] }), morph: G('Small IV doses.', { d: [0], harmDose: [1] }), antiemetic: G('Ondansetron.', { d: [0] }),
          fbc: G('Full blood count.'), crp: G('CRP.'), o2: G('Oxygen if SpO2 is low.', { d: [1] }),
          nsaid_colic: X('An NSAID in sepsis with kidney injury.'), ibup: X('An NSAID.'), oxyc: S('She is septic and may be vomiting.'),
          dc_now: X('Discharge a septic patient.')
        },
        ok: { text: 'Urology stents the ureter at 06:00. Pus drains. By morning the BP is 118/70 and the lactate is 2.3.', vit: { sbp: 118, dbp: 70, hr: 96 }, facts: ['Pus drained at stenting', 'Lactate 2.3'] },
        miss: { text: 'By 07:00 her BP is 78/40 and she needs vasopressors in ICU.', vit: { sbp: 78, dbp: 40, hr: 138 }, facts: ['Lactate 7.5'] } },
      { label: 'After the stent', tag: 'stone-go', time: '10:00', window: 'Later that morning',
        scene: 'Stent in, BP 118/70, lactate 2.3, creatinine 150, urine 50 mL an hour. What is the plan?',
        plan: PL(['reg', ['none'], 'Update your registrar.'], ['spo2ecg', ['spo2', 'q15'], 'Close monitoring for 24 hours.'], ['h4', ['h1'], 'Repeat bloods in a few hours.']),
        orders: {
          lactate: N('Repeat the lactate.'), uec: N('Repeat the creatinine.'), hourly_uo: N('Hourly urine output.'), fbal: G('Fluid balance.'),
          ceftri: G('Continue the antibiotic, guided by the culture.', { alt: [] }), urology_ref: N('Urology plan for the stone itself, after the infection is treated.'),
          nsaid_colic: X('Not with kidney injury.'), dc_now: X('Not today.')
        },
        ok: { text: 'She goes home on day four with a plan for definitive stone treatment.' }, miss: { text: 'The infection returns when the antibiotics are stopped early.' } }
    ] }
  }
  ];
})(window);
