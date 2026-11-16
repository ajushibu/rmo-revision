/* Order-sheet cases: respiratory pilot. Engine: ../ward.js. Orders: ../orders.js.
   Grades per step: need (2 points), good (1), skip (-1, listed waste), harm (-3). Unlisted orders count as "not needed now" (0).
   d = acceptable dose indexes (see orders.js). harmDose = dose indexes that count as harmful. alt = other orders that satisfy this one.
   crit = missing it sends the patient down the worse path (step.miss, and the next step's alt).
   Sources: Australian Asthma Handbook adult ED page (severity, salbutamol, ipratropium, oxygen), Australian Prescriber (prednisolone 50 mg),
   TSANZ via MJA 2015 (oxygen targets), NSW ACI COPD page and a COPD-X summary (controlled oxygen, bronchodilators, prednisolone 40-50 mg, NIV),
   eMedSA ED handbook (furosemide 80 mg IV or usual dose IV; GTN sublingual then infusion; avoid morphine).
   Not verified against an Australian source: the GTN 400 microgram dose, naloxone in hypercapnia, NSAID-triggered asthma (standard teaching),
   the NIV pH threshold in your hospital, and the 40 mg furosemide option. */
window.WARD = {
  concepts: {
    'as-first': 'Severe asthma: the first 15 minutes', 'as-hour': 'Asthma: the first hour', 'as-life': 'Life-threatening asthma', 'as-dc': 'Asthma discharge',
    'co-o2': 'Drowsy COPD patient on oxygen', 'co-niv': 'Respiratory acidosis and NIV', 'co-dc': 'COPD after the flare',
    'po-first': 'Post-op pulmonary oedema: first moves', 'po-after': 'Pulmonary oedema: the next hour'
  },
  cases: [
  {
    id: 'w20261116a', title: 'Wheezy after the painkiller', time: '22:40', where: 'Surgical ward',
    blurb: 'A young man the night after an appendicectomy, wheezy and speaking in phrases. Tests severe asthma, triggers and discharge.',
    intro: '31-year-old man, day 1 after a laparoscopic appendicectomy. Asthma since childhood, uses a reliever most weeks, no preventer. The nurse calls: he became wheezy an hour ago and is now speaking in short phrases.',
    vit: { hr: 122, sbp: 138, dbp: 84, spo2: 91, rr: 30 },
    facts: ['31M, day 1 after appendicectomy', 'Asthma, reliever only, no preventer', 'Speaks in short phrases, using neck muscles', 'Widespread wheeze, SpO2 91% on air', 'Ibuprofen 400 mg given at 21:30 for wound pain, first time he has taken it'],
    steps: [
      {
        label: 'First 15 minutes', tag: 'as-first', time: '22:40', window: 'Now: the first 15 minutes',
        scene: 'He is upright, using his neck muscles, and gets out four or five words per breath. What do you order now?',
        first: ['salb_mdi', 'salb_neb', 'o2'], firstWhy: 'Bronchodilator and oxygen go in together in the first minutes.',
        orders: {
          salb_mdi: { q: 'need', d: [2], crit: true, alt: ['salb_neb'], why: 'Severe asthma (cannot finish a sentence, accessory muscles): 12 puffs by spacer every 20 minutes in the first hour (Asthma Handbook).' },
          salb_neb: { q: 'good', d: [1, 3], why: 'A nebuliser is fine if he cannot use a spacer; a spacer works as well for most.' },
          ipra_mdi: { q: 'need', d: [1], alt: ['ipra_neb'], why: 'Severe asthma: add ipratropium 8 puffs every 20 minutes for the first hour (Asthma Handbook).' },
          ipra_neb: { q: 'good', d: [1], why: 'Nebulised ipratropium 500 micrograms is the alternative to puffs.' },
          o2: { q: 'need', d: [1, 0], harmDose: [], why: 'SpO2 91%: give oxygen to 92 to 96% (TSANZ). He is not a CO2 retainer, so 88 to 92% is too low a target.' },
          pred: { q: 'need', d: [2], why: 'Oral prednisolone early: 50 mg first dose (Australian Prescriber).' },
          stop_nsaid: { q: 'need', why: 'Wheeze started an hour after his first ibuprofen. Stop it and record it: some adults with asthma react to NSAIDs.' },
          drugchart: { q: 'good', why: 'The drug chart is where the trigger was hiding.' },
          spo2: { q: 'good', why: 'Continuous oximetry while he is severe.' },
          rev20: { q: 'good', why: 'Reassess after each round: the answer decides whether you escalate.' },
          reg: { q: 'good', why: 'Severe asthma: let your registrar know now, not at the hour mark.' },
          cxr: { q: 'skip', why: 'Not routine in asthma. Only if you suspect a pneumothorax or pneumonia.' },
          abg: { q: 'skip', why: 'Not needed while he is talking and saturating. A gas matters if he tires or becomes life-threatening.' },
          ddimer: { q: 'skip', why: 'Nothing here points to a clot; a D-dimer after surgery is raised anyway.' },
          ctpa: { q: 'skip', why: 'Widespread wheeze with a clear trigger is asthma, not PE.' },
          amox: { q: 'skip', why: 'No sign of bacterial infection.' }, ceftri: { q: 'skip', why: 'No sign of bacterial infection.' },
          ibup: { q: 'harm', why: 'More NSAID is the likely trigger.' },
          morph: { q: 'harm', why: 'Opioids can tip a tiring asthmatic into respiratory arrest.' },
          midaz: { q: 'harm', why: 'Never sedate a breathless asthmatic.' }, diaz: { q: 'harm', why: 'Never sedate a breathless asthmatic.' },
          metop: { q: 'harm', why: 'Beta-blockers worsen bronchospasm.' }
        },
        ok: { text: 'Twenty minutes and one round later he speaks in short sentences. SpO2 95% on 2 L prongs. Still wheezy.', vit: { hr: 112, spo2: 95, rr: 24 } },
        miss: { text: 'Twenty minutes on he can only manage single words. He looks tired and his chest is getting quieter.', vit: { hr: 134, spo2: 88, rr: 34 }, facts: ['Single words, drowsy, quieter chest'] }
      },
      {
        label: 'The first hour', tag: 'as-hour', time: '23:40', window: 'One hour in',
        scene: 'After three rounds: short sentences, wheeze throughout, SpO2 95% on 2 L. The nurse asks for a plan, and something for his wound pain (4/10).',
        orders: {
          paracet: { q: 'need', d: [0], why: 'Paracetamol is the safe choice for his pain tonight.' },
          salb_mdi: { q: 'good', why: 'Keep salbutamol going, spacing it out as he improves.' },
          salb_neb: { q: 'good', why: 'Keep a bronchodilator going, spacing it out as he improves.' },
          pef: { q: 'good', why: 'A peak flow gives you a number to follow.' },
          spo2: { q: 'good', why: 'Keep monitoring overnight.' },
          reg: { q: 'good', why: 'Update your registrar: improving but still severe.' },
          rev20: { q: 'good', why: 'Keep reassessing; if he is not improving after the first hour, ICU is the next call.' },
          mgso4: { q: 'skip', why: 'For severe attacks not responding, and a senior decision. He is responding.' },
          hydrocort: { q: 'skip', why: 'He can swallow: oral prednisolone works as well.' },
          cxr: { q: 'skip', why: 'Still not needed: improving, no focal signs.' },
          ibup: { q: 'harm', why: 'The likely trigger.' },
          morph: { q: 'skip', why: 'Avoid opioids while he is still wheezy; paracetamol first.' },
          oxyc: { q: 'skip', why: 'Avoid opioids while he is still wheezy; paracetamol first.' },
          midaz: { q: 'harm', why: 'Never sedate a breathless asthmatic.' }, diaz: { q: 'harm', why: 'Never sedate a breathless asthmatic.' },
          dc_now: { q: 'harm', why: 'Still severe. Not tonight.' }
        },
        ok: { text: 'By morning he is speaking in full sentences, SpO2 97% on air.', vit: { hr: 92, spo2: 97, rr: 18 } },
        alt: {
          label: 'Life-threatening', tag: 'as-life', time: '23:00', window: 'Now: he is getting worse',
          scene: 'Single words, drowsy, quiet chest. SpO2 88% on 2 L. HR 134. What do you order now?',
          first: ['met', 'icu', 'salb_neb'], firstWhy: 'Call for help and start continuous nebulisers at once.',
          orders: {
            met: { q: 'need', crit: true, alt: ['icu'], why: 'Drowsy with a quiet chest is life-threatening asthma: MET call or ICU now.' },
            icu: { q: 'good', why: 'ICU now. A MET call does the same.' },
            salb_neb: { q: 'need', d: [3], crit: true, why: 'Life-threatening: continuous nebulised salbutamol, 2 x 5 mg nebules, oxygen-driven (Asthma Handbook).' },
            ipra_neb: { q: 'need', d: [1], why: 'With ipratropium 500 micrograms every 20 minutes for the first hour.' },
            o2: { q: 'need', d: [1], why: 'Oxygen to 92 to 96%.' },
            vbg: { q: 'good', alt: ['abg'], why: 'A gas now: a normal or rising CO2 means he is tiring.' }, abg: { q: 'good', why: 'A gas now: a normal or rising CO2 means he is tiring.' },
            mgso4: { q: 'good', why: 'IV magnesium is reasonable here, as a senior or ICU decision (dose per protocol).' },
            hydrocort: { q: 'good', d: [0], why: 'IV steroid if he cannot swallow.' },
            midaz: { q: 'harm', why: 'Sedation can stop his breathing.' }, morph: { q: 'harm', why: 'Opioids can stop his breathing.' },
            cxr: { q: 'skip', why: 'Not now, unless one side is silent (pneumothorax).' }
          },
          ok: { text: 'ICU arrive in six minutes. With continuous nebulisers he improves slowly and spends the night in HDU.', vit: { hr: 110, spo2: 94, rr: 24 } },
          miss: { text: 'At 23:58 he stops breathing. ICU intubate him on the ward and take him to ICU.', vit: { hr: 140, spo2: 80, rr: 6 } }
        }
      },
      {
        label: 'Going home', tag: 'as-dc', time: '10:00', window: 'Day 3: discharge planning',
        scene: 'Day 3. Off oxygen, wheeze gone, peak flow 85% of his best. He wants to go home tomorrow. What goes in the plan?',
        orders: {
          ics: { q: 'need', why: 'Never send someone home on a reliever alone after a severe attack: start a preventer.' },
          aap: { q: 'need', why: 'A written asthma action plan.' },
          gp: { q: 'need', why: 'GP review within a few days.' },
          pred_home: { q: 'need', why: 'Finish the prednisolone course, about 7 to 10 days in total (Australian Prescriber), with a written stop date.' },
          stop_nsaid: { q: 'good', why: 'Make sure the NSAID reaction is on his alert list and discharge summary.' },
          technique: { q: 'good', why: 'Check his spacer technique before he leaves.' },
          vacc: { q: 'good', why: 'Influenza vaccine if not up to date.' },
          homeneb: { q: 'skip', why: 'A spacer works as well; home nebulisers are not needed.' },
          amox: { q: 'skip', why: 'No infection.' }, cxr: { q: 'skip', why: 'Not needed.' }
        },
        ok: { text: 'He goes home the next day with a preventer, an action plan and a GP appointment.' }
      }
    ],
    debrief: 'Bronchodilator and oxygen first, the trigger on the drug chart, and a preventer before he goes home.'
  },
  {
    id: 'w20261116b', title: 'Sleepy on the mask', time: '03:10', where: 'Respiratory ward',
    blurb: 'A man with COPD and pneumonia who has become drowsy on high-flow oxygen. Tests controlled oxygen, the gas and NIV.',
    intro: '74-year-old man with COPD, admitted two days ago with right lower lobe pneumonia, on IV benzylpenicillin and doxycycline. At midnight his SpO2 was 87% and he was put on a Hudson mask at 8 L/min. The nurse calls: he is much sleepier.',
    vit: { hr: 102, sbp: 148, dbp: 86, spo2: 99, rr: 10 },
    facts: ['74M, COPD, smokes 10 a day', 'Right lower lobe pneumonia, day 2 of antibiotics', 'Hudson mask 8 L/min since midnight', 'Rousable to voice, drifts off mid-sentence', 'Oxycodone 10 mg given at 01:00 for pleuritic pain'],
    steps: [
      {
        label: 'First 15 minutes', tag: 'co-o2', time: '03:10', window: 'Now: the first 15 minutes',
        scene: 'SpO2 99% on 8 L, RR 10, warm and drowsy. What do you order now?',
        first: ['o2'], firstWhy: 'Turn the oxygen down to target first: excess oxygen is what is pushing his CO2 up.',
        orders: {
          o2: { q: 'need', d: [0, 2], harmDose: [3, 4], crit: true, why: 'Controlled oxygen to 88 to 92% by prongs or a 28% Venturi (TSANZ, NSW ACI).' },
          abg: { q: 'need', crit: true, alt: ['vbg'], why: 'An arterial gas now: drowsy COPD on oxygen (COPD-X summary, NSW ACI).' },
          vbg: { q: 'good', why: 'A venous gas shows pH and CO2, but an arterial gas is the standard here.' },
          reg: { q: 'need', alt: ['icu', 'met'], why: 'Drowsy with a slow rate: call your registrar now.' },
          drugchart: { q: 'need', why: 'Oxycodone 10 mg at 01:00 is adding to the drowsiness.' },
          gcs: { q: 'good', why: 'Track his conscious level.' },
          spo2: { q: 'good', why: 'Continuous oximetry while you titrate.' },
          bsl: { q: 'good', why: 'Quick and cheap in any drowsy patient.' },
          nalox: { q: 'good', why: 'If the opioid is contributing and he is hard to rouse, small titrated doses with your registrar (dose not checked here).' },
          o2off: { q: 'harm', why: 'Stopping oxygen completely can drop his oxygen dangerously. Turn it down; do not stop it.' },
          midaz: { q: 'harm', why: 'Sedating a drowsy, hypercapnic patient can stop his breathing.' }, halo: { q: 'harm', why: 'Sedating a drowsy, hypercapnic patient can stop his breathing.' },
          morph: { q: 'harm', why: 'More opioid will make this worse.' }, oxyc: { q: 'harm', why: 'More opioid will make this worse.' },
          cthead: { q: 'skip', why: 'There is a clear cause. Fix the oxygen and check the gas first.' },
          cxr: { q: 'skip', why: 'Done on admission; repeat only if something new appears.' },
          ctpa: { q: 'skip', why: 'Not the question tonight.' }
        },
        ok: { text: 'On a 28% Venturi his SpO2 is 90%. The gas: pH 7.27, PaCO2 72 mmHg, bicarbonate 32, PaO2 62. He opens his eyes to voice.', vit: { spo2: 90, rr: 14, hr: 98 }, facts: ['ABG: pH 7.27, PaCO2 72, HCO3 32, PaO2 62'] },
        miss: { text: 'Twenty minutes later he is hard to rouse. A gas shows pH 7.16 and PaCO2 95 mmHg.', vit: { spo2: 96, rr: 8, hr: 96 }, facts: ['Gas: pH 7.16, PaCO2 95', 'Responds only to pain'] }
      },
      {
        label: 'The gas is back', tag: 'co-niv', time: '03:40', window: 'Next 30 minutes',
        scene: 'pH 7.27 with a CO2 of 72 after 30 minutes of controlled oxygen. Rousable but tired. What now?',
        first: ['niv', 'reg', 'icu'], firstWhy: 'Respiratory acidosis that persists: start NIV and get your senior.',
        orders: {
          niv: { q: 'need', crit: true, why: 'Respiratory acidosis (pH under 7.35 with a high CO2) despite treatment: NIV lowers death in a COPD flare (NSW ACI). Your hospital may use a different pH cut-off.' },
          limits: { q: 'need', why: 'Before NIV: if it fails, is he for intubation? Decide now, with him if he can.' },
          reg: { q: 'need', alt: ['icu'], why: 'NIV is started with your registrar or ICU.' },
          icu: { q: 'good', why: 'Many hospitals run NIV with ICU outreach.' },
          salb_neb: { q: 'need', d: [2], why: 'Bronchodilator, driven by air with prong oxygen alongside, so you do not give him high oxygen through the neb.' },
          ipra_neb: { q: 'good', d: [1], why: 'Ipratropium 500 micrograms nebulised.' },
          pred: { q: 'need', d: [2], why: 'Prednisolone 40 to 50 mg daily (NSW ACI).' },
          abg: { q: 'good', alt: ['vbg'], why: 'Repeat the gas about an hour after starting NIV.' },
          o2: { q: 'good', d: [0, 2], harmDose: [3, 4], why: 'Keep oxygen at 88 to 92%.' },
          cpap: { q: 'skip', why: 'CPAP does not help him blow off CO2. BiPAP does.' },
          hfno: { q: 'skip', why: 'Not the first choice for hypercapnic COPD; NIV is.' },
          midaz: { q: 'harm', why: 'Sedating him to tolerate the mask can stop his breathing.' },
          oxyc: { q: 'harm', why: 'More opioid will push the CO2 higher.' }
        },
        ok: { text: 'One hour on NIV: pH 7.32, PaCO2 64. He is talking and asks for water.', vit: { spo2: 91, rr: 18, hr: 92 } },
        miss: { text: 'An hour later he is no better. ICU review him and take over his care.', vit: { spo2: 90, rr: 26, hr: 110 } },
        alt: {
          label: 'Hard to rouse', tag: 'co-niv', time: '03:30', window: 'Now: he is getting worse',
          scene: 'pH 7.16, PaCO2 95, responds only to pain. What do you order now?',
          first: ['met', 'icu'], firstWhy: 'This is a MET call.',
          orders: {
            met: { q: 'need', crit: true, alt: ['icu'], why: 'Hard to rouse with a pH of 7.16: MET call or ICU now.' },
            icu: { q: 'good', why: 'ICU now. A MET call does the same.' },
            limits: { q: 'need', why: 'Treatment limits decide between NIV, intubation or comfort care.' },
            o2: { q: 'need', d: [0, 2], harmDose: [3, 4], why: 'Oxygen still to 88 to 92%.' },
            niv: { q: 'good', why: 'NIV may still be tried, but at this conscious level ICU decides.' },
            intub: { q: 'good', why: 'ICU’s decision, within his treatment limits.' },
            nalox: { q: 'good', why: 'Reasonable to try if the opioid is contributing (dose not checked here).' },
            midaz: { q: 'harm', why: 'Sedation will stop his breathing.' }
          },
          ok: { text: 'ICU arrive, start NIV and take him to HDU. Twelve hours later his pH is 7.33.', vit: { spo2: 90, rr: 18, hr: 96 } },
          miss: { text: 'He has a respiratory arrest at 04:05 and is intubated on the ward.', vit: { spo2: 78, rr: 4, hr: 50 } }
        }
      },
      {
        label: 'After the flare', tag: 'co-dc', time: '11:00', window: 'Day 5: before discharge',
        scene: 'Off NIV for two days, on 1 L prongs with SpO2 90%. Home in two days. What goes in the plan?',
        orders: {
          o2rx: { q: 'need', why: 'Oxygen prescribed with an 88 to 92% target, so no one repeats the 8 L mask.' },
          co2alert: { q: 'good', why: 'A CO2 retention alert in his notes helps the next team.' },
          gp: { q: 'need', why: 'Early GP follow-up after a flare.' },
          nrt: { q: 'need', why: 'He smokes 10 a day: quit support and nicotine replacement.' },
          rehab: { q: 'good', why: 'Pulmonary rehabilitation after a flare.' },
          vacc: { q: 'good', why: 'Influenza and pneumococcal vaccines.' },
          technique: { q: 'good', why: 'Check his inhaler technique.' },
          pred_home: { q: 'good', why: 'Finish the steroid course with a stop date; many units use about 5 days (follow your protocol).' },
          homeneb: { q: 'skip', why: 'Not needed; puffers with a spacer work.' },
          o2off: { q: 'skip', why: 'Wean, do not stop abruptly; home oxygen needs a formal assessment.' }
        },
        ok: { text: 'He goes home with a target-range oxygen alert, quit support and rehab booked.' }
      }
    ],
    debrief: 'Turn the oxygen down to 88 to 92%, get a gas, check the drug chart, and start NIV for a persisting acidosis.'
  },
  {
    id: 'w20261116c', title: 'Drowning after the hip', time: '02:20', where: 'Orthopaedic ward',
    blurb: 'An elderly woman two days after hip surgery, breathless with crackles, on IV fluids. Tests the first moves in pulmonary oedema.',
    intro: '86-year-old woman, day 2 after a hemiarthroplasty for a fractured neck of femur. Hartmann’s at 125 mL/h since surgery. The nurse calls: she is breathless and cannot lie flat.',
    vit: { hr: 108, sbp: 176, dbp: 94, spo2: 86, rr: 32 },
    facts: ['86F, day 2 after hip hemiarthroplasty', 'Hartmann’s 125 mL/h since surgery: 3.1 L positive', 'Home: perindopril; no diuretic', 'Crackles to the mid-zones, raised JVP', 'Cannot lie flat, sweaty'],
    steps: [
      {
        label: 'First 15 minutes', tag: 'po-first', time: '02:20', window: 'Now: the first 15 minutes',
        scene: 'Breathless at rest, crackles to the mid-zones, BP 176/94. What do you order now?',
        first: ['sit_up', 'o2'], firstWhy: 'Sit her up and give oxygen in the first minute. Everything else follows.',
        orders: {
          sit_up: { q: 'need', why: 'Sit her upright: it eases breathing straight away.' },
          o2: { q: 'need', d: [1, 4], crit: true, why: 'SpO2 86%: oxygen to 92 to 96%. Starting on a non-rebreather and titrating down is fine.' },
          fluids_stop: { q: 'need', crit: true, why: 'Stop the fluids: they are the cause.' },
          furo: { q: 'need', d: [1, 2], crit: true, why: 'IV furosemide. An Australian ED handbook (eMedSA) starts at 80 mg IV, or the usual dose given IV; 40 mg is also accepted here for a frail, diuretic-naive 86-year-old. Check with your registrar.' },
          gtn: { q: 'need', d: [0], why: 'BP 176: sublingual GTN reduces the load on the heart (eMedSA). The 400 microgram dose was not checked against an Australian source.' },
          ecg: { q: 'need', why: 'Look for ischaemia or a new arrhythmia as the trigger.' },
          cxr: { q: 'need', why: 'Confirms oedema and looks for other causes.' },
          reg: { q: 'need', alt: ['met', 'icu'], why: 'Hypoxic pulmonary oedema: call your registrar now.' },
          trop: { q: 'good', why: 'Is this a post-op MI?' },
          uec: { q: 'good', why: 'Kidneys and potassium before and after diuretics.' },
          fbc: { q: 'good', why: 'Post-op anaemia worsens breathlessness.' },
          bnp: { q: 'good', why: 'Supports heart failure if the picture is unclear.' },
          spo2: { q: 'good', why: 'Continuous oximetry.' },
          cpap: { q: 'good', why: 'If oxygen and GTN are not enough, CPAP helps in cardiogenic pulmonary oedema.' },
          ddimer: { q: 'skip', why: 'Always raised after surgery: it cannot help.' },
          ctpa: { q: 'skip', why: 'PE belongs on the list after hip surgery, but crackles, a high JVP, hypertension and 3 L positive point to fluid. Image for PE if this does not fit after treatment.' },
          amox: { q: 'skip', why: 'No sign of pneumonia.' }, benpen: { q: 'skip', why: 'No sign of pneumonia.' },
          salb_neb: { q: 'skip', why: 'Wheeze in pulmonary oedema is not asthma.' },
          bolus: { q: 'harm', why: 'More fluid will drown her.' }, maint: { q: 'harm', why: 'More fluid will drown her.' },
          morph: { q: 'harm', why: 'Avoided in pulmonary oedema: it can worsen breathing (eMedSA).' },
          midaz: { q: 'harm', why: 'Sedation in a hypoxic patient can stop her breathing.' }
        },
        ok: { text: 'Thirty minutes later she has passed 700 mL of urine. SpO2 94% on 2 L prongs, RR 24, BP 148/80.', vit: { hr: 96, sbp: 148, dbp: 80, spo2: 94, rr: 24 },
          facts: ['CXR: upper lobe diversion, small effusions', 'ECG: sinus tachycardia, no acute ST change', 'Troponin 38 ng/L', 'K 3.8, creatinine 104 (82 before surgery)', 'Hb 98'] },
        miss: { text: 'She is worse: pink frothy sputum, SpO2 84% on a non-rebreather, RR 38, BP 182/98.', vit: { hr: 118, sbp: 182, dbp: 98, spo2: 84, rr: 38 }, facts: ['Pink frothy sputum'] }
      },
      {
        label: 'The next hour', tag: 'po-after', time: '03:00', window: 'Next hour',
        scene: 'She is better. The results are back. What do you order for the rest of the night?',
        orders: {
          fbal: { q: 'need', why: 'Strict fluid balance: you need to know what goes in and out.' },
          weigh: { q: 'need', why: 'Daily weights track the fluid better than the chart.' },
          trop: { q: 'good', why: 'Repeat it: a rise and fall would mean a post-op MI.' },
          uec: { q: 'good', why: 'Recheck kidneys and potassium in the morning after the diuretic.' },
          echo: { q: 'good', why: 'New heart failure needs an echo during this admission.' },
          team: { q: 'need', why: 'Tell the orthopaedic team: their fluid plan needs to change.' },
          spo2: { q: 'good', why: 'Keep monitoring overnight.' },
          idc: { q: 'skip', why: 'A catheter adds infection and delirium risk; a fluid chart is usually enough.' },
          kcl: { q: 'skip', why: 'K 3.8 is fine. Recheck after the diuretic.' },
          maint: { q: 'harm', why: 'Restarting fluids undoes the treatment.' }, bolus: { q: 'harm', why: 'More fluid will undo the treatment.' },
          morph: { q: 'harm', why: 'Avoided in pulmonary oedema.' }
        },
        ok: { text: 'By morning she is on 1 L prongs and her weight is down 1.2 kg. The team review her fluids.' },
        alt: {
          label: 'Getting worse', tag: 'po-after', time: '02:40', window: 'Now: she is getting worse',
          scene: 'Pink frothy sputum, SpO2 84% on a non-rebreather, RR 38, BP 182/98. What do you order now?',
          first: ['cpap', 'met', 'icu'], firstWhy: 'CPAP and help, now.',
          orders: {
            met: { q: 'need', crit: true, alt: ['icu'], why: 'Hypoxic on a non-rebreather: MET call or ICU now.' },
            icu: { q: 'good', why: 'ICU now. A MET call does the same.' },
            cpap: { q: 'need', crit: true, alt: ['niv'], why: 'CPAP improves oxygen and work of breathing in cardiogenic pulmonary oedema.' },
            niv: { q: 'good', why: 'BiPAP also works if CPAP is not available.' },
            gtn: { q: 'need', d: [0], alt: ['gtn_inf'], why: 'BP 182: GTN, then an infusion (eMedSA, around 5 to 10 micrograms a minute to start).' },
            gtn_inf: { q: 'good', why: 'GTN infusion with your registrar or ICU.' },
            furo: { q: 'need', d: [1, 2], why: 'IV furosemide if not already given.' },
            fluids_stop: { q: 'need', why: 'Make sure the fluids are off.' },
            limits: { q: 'good', why: 'At 86, check what she would want if CPAP fails.' },
            morph: { q: 'harm', why: 'Avoided in pulmonary oedema.' }, bolus: { q: 'harm', why: 'More fluid will drown her.' },
            midaz: { q: 'harm', why: 'Sedation can stop her breathing.' }
          },
          ok: { text: 'On CPAP and a GTN infusion she settles over the hour and goes to HDU.', vit: { hr: 100, sbp: 150, dbp: 84, spo2: 93, rr: 24 } },
          miss: { text: 'She tires and is intubated by ICU on the ward.', vit: { hr: 124, sbp: 90, dbp: 50, spo2: 78, rr: 8 } }
        }
      }
    ],
    debrief: 'Sit up, oxygen, stop the fluids, IV furosemide and GTN, and call for help early. Morphine and more fluid make it worse.'
  }
  ]
};
