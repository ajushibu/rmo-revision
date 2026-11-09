/* Cases for pe_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
first: { n: 'First moves and recognition', tab: 'risk', r: 'Resuscitate and call for help first. In shock with a raised JVP and clear chest, think obstructive: massive PE, tamponade, tension pneumothorax, and use bedside ultrasound. No pulse with an organised rhythm is PEA: start CPR.' },
prob: { n: 'Probability: Wells and PERC', tab: 'test', r: 'PERC needs age under 50 plus seven more criteria and is only for low suspicion. Modified Wells: DVT signs 3, PE most likely 3, HR over 100 1.5, surgery or immobilisation 1.5, previous VTE 1.5, haemoptysis 1, cancer 1. Over 4 is likely.' },
ddimer: { n: 'Using the D-dimer', tab: 'test', r: 'Only when PE is unlikely. From age 50 the cut-off is age x 10, not 500.' },
imaging: { n: 'Choosing imaging', tab: 'test', r: 'PE likely: go straight to CT pulmonary angiogram. V/Q if CT is unsuitable. A negative leg scan does not rule out PE. A D-dimer after surgery is raised anyway.' },
risk: { n: 'Risk class', tab: 'risk', r: 'High: arrest or SBP under 90. Intermediate-high: RV strain and raised troponin. Intermediate-low: one of them. Low: neither.' },
anticoag: { n: 'Choosing treatment', tab: 'risk', r: 'Stable with normal renal function: LMWH. Otherwise a heparin infusion. Thrombolysis is for high risk, not routine in intermediate risk (PEITHO).' },
dispo: { n: 'Monitoring and disposition', tab: 'risk', r: 'Intermediate-high risk: monitored bed with telemetry and clear triggers to call you.' },
rv: { n: 'Protecting the right ventricle', tab: 'rv', r: 'Small fluid bolus at most, noradrenaline early, avoid intubation. If you must: ketamine, noradrenaline running, adrenaline drawn up.' },
lysis: { n: 'Thrombolysis safety', tab: 'lysis', r: 'Run the contraindication list before lysis. Absolute: haemorrhagic stroke, ischaemic stroke within 3 months, known AVM, recent brain or spinal surgery, head trauma with fracture or brain injury within 3 weeks, serious active bleeding.' }
};
window.RMO_CASES = [
{
id: 'c1', title: 'The chest-wall patient', where: 'Medical assessment unit', time: '21:40', blurb: 'A pleuritic chest pain that is probably not a clot. Tests the rule-out pathway.',
intro: 'Pager: 66-year-old man, three days of right-sided pleuritic chest pain after a chest cold. Triage has done an ECG and chest X-ray. Please review.',
vit: { hr: 92, sbp: 138, dbp: 82, spo2: 97, rr: 16 },
facts: ['66M; no history of VTE, cancer or recent surgery', 'Pain worse on breathing in and on pressing the right chest wall', 'Chest clear; calves soft and equal; no leg swelling', 'ECG sinus rhythm, no changes; chest X-ray clear'],
decisions: [
{ tag: 'prob', scene: 'You think PE is possible but not the leading diagnosis. How do you put a number on that?', opts: [
{ q: 'best', t: 'Score him with the modified Wells criteria', fb: 'Every item scores 0: no DVT signs, PE is not the most likely diagnosis (the chest wall tenderness is reproducible), HR under 100, no surgery or immobilisation, no previous VTE, no haemoptysis, no cancer. Wells 0: PE unlikely.' },
{ q: 'poor', t: 'Apply PERC and stop if it is negative', fb: 'PERC needs age under 50, so at 66 he can never be PERC-negative. Wells is the right tool here.' },
{ q: 'poor', t: 'Order a CT pulmonary angiogram', fb: 'Imaging before probability exposes him to contrast and radiation, and most scans in low-probability patients are negative. Score first, then decide.' },
{ q: 'poor', t: 'Send a D-dimer without scoring him', fb: 'A D-dimer only means something against a pre-test probability. Score first.' }
] },
{ tag: 'prob', reveal: ['Wells score 0: PE unlikely'], scene: 'Wells is 0, so PE is unlikely. What next?', opts: [
{ q: 'best', t: 'Send a D-dimer', fb: 'At this probability a negative D-dimer excludes PE and spares him the CT. PERC is not available because he is over 50.' },
{ q: 'poor', t: 'Go straight to CT pulmonary angiogram', fb: 'Safe but unnecessary. At an unlikely probability the D-dimer comes first.' },
{ q: 'poor', t: 'Discharge with analgesia and no test', fb: 'At 66 PERC cannot clear him, so the pathway still needs a D-dimer before you can call PE excluded.' },
{ q: 'harm', t: 'Start therapeutic enoxaparin while you wait', fb: 'Empirical anticoagulation is for high suspicion with a delay to imaging. At Wells 0 you add bleeding risk with no indication.' }
] },
{ tag: 'ddimer', reveal: ['D-dimer 590 ng/mL FEU (lab limit 500)'], scene: 'The D-dimer is back: 590 ng/mL FEU. The lab flags it as above the 500 reference limit.', opts: [
{ q: 'best', t: 'Below the age-adjusted cut-off (66 x 10 = 660): PE excluded at this probability. Treat the chest wall pain.', fb: 'From age 50 the cut-off is age x 10. 590 is under 660 and Wells is unlikely, so PE is excluded. Check your lab\'s units and whether it reports age-adjusted limits.' },
{ q: 'poor', t: 'Above 500, so it is positive: send him for a CT pulmonary angiogram', fb: 'The classic trap. The fixed 500 cut-off is for patients under 50. A scan here adds contrast and radiation for a result that was already negative by the rule.' },
{ q: 'poor', t: 'Repeat the D-dimer in six hours', fb: 'A repeat will not change the answer and delays a decision the rule has already made.' },
{ q: 'harm', t: 'Start anticoagulation anyway, since it is above 500', fb: 'That adds bleeding risk without an indication.' }
] }
],
ends: { hi: 'He goes home with analgesia and safety-net advice. One blood test, no scan, and you can explain why.', mid: 'He ends up in the right place, but you took extra steps or tests to get there.', lo: 'The pathway let you down. Go back to the Test or not tab in the Study Kit and walk it through once.' }
},
{
id: 'c2', title: 'Day 3 after the hip', where: 'Orthopaedic ward 5A', time: '02:30', blurb: 'A likely PE in a stable patient. Tests imaging, risk class and treatment.',
intro: 'Pager: 72-year-old woman, day 3 after a right total hip replacement. New breathlessness and left chest pain. The night nurse is worried.',
vit: { hr: 118, sbp: 128, dbp: 76, spo2: 90, rr: 26 },
facts: ['72F, right total hip replacement 3 days ago, on prophylactic enoxaparin', 'Left pleuritic chest pain; right calf swollen and tender', 'Chest clear; JVP not raised; ECG sinus tachycardia only', 'Weight 68 kg; last eGFR 78 mL/min'],
decisions: [
{ tag: 'first', scene: 'She is alone in the room and frightened. What do you do in the first ten minutes?', opts: [
{ q: 'best', t: 'Oxygen to keep saturation above 90%, continuous monitoring, IV access, bloods (troponin, creatinine, coagulation, group and screen), and tell your registrar', vit: { spo2: 93 }, fb: 'That covers the basics and gets help moving. Troponin and creatinine feed the risk class and the choice of anticoagulant.' },
{ q: 'ok', t: 'Oxygen and monitoring, then work out the cause while her obs settle', vit: { spo2: 93 }, fb: 'A safe start, but you lose time. Bloods and a call to your senior belong in the first ten minutes.' },
{ q: 'poor', t: 'Request a chest X-ray and wait for it before doing anything else', fb: 'A chest X-ray is reasonable but it is not a reason to wait. She is hypoxic and tachycardic and needs monitoring and treatment now.' },
{ q: 'harm', t: 'Reassure her: post-op pain and atelectasis. Paracetamol, chest physio, review in the morning', vit: { hr: 126, spo2: 88 }, fb: 'This is anchoring. Day 3 after a hip replacement with hypoxia, tachycardia and a swollen calf is PE until proven otherwise.' }
] },
{ tag: 'imaging', reveal: ['Wells 9: DVT signs 3 + surgery 1.5 + HR over 100 1.5 + PE most likely 3 (PE likely)'], scene: 'She has oxygen on and a drip running. Your Wells score is 9, so PE is likely. Which test?', opts: [
{ q: 'best', t: 'CT pulmonary angiogram now (renal function is fine)', fb: 'Above 4 you go straight to imaging. A D-dimer would be raised after surgery anyway and could not help you.' },
{ q: 'poor', t: 'D-dimer first', fb: 'PE is likely, so a D-dimer cannot rule it out, and it is almost always raised in the weeks after surgery.' },
{ q: 'poor', t: 'V/Q scan', fb: 'Reasonable when CT is unsuitable, for example in kidney failure or contrast allergy. CT is quicker and also looks for other causes.' },
{ q: 'poor', t: 'Leg ultrasound only', fb: 'A positive scan would justify treatment, but a negative one does not rule out PE, and she is hypoxic. She needs the chest imaged.' }
] },
{ tag: 'risk', vit: { hr: 112, sbp: 124, dbp: 70, spo2: 94, rr: 24 }, reveal: ['CT pulmonary angiogram: bilateral lobar emboli, RV/LV ratio 1.1', 'Troponin raised; BP 124/70, SpO2 94% on 3 L'], scene: 'The scan shows bilateral lobar emboli with an RV/LV ratio of 1.1. Troponin is raised. BP 124/70. Which risk class?', opts: [
{ q: 'best', t: 'Intermediate-high: RV strain plus raised troponin, no hypotension', fb: 'Correct. She has both markers and is not hypotensive.' },
{ q: 'poor', t: 'High risk (massive)', fb: 'High risk needs cardiac arrest or SBP under 90 not explained by other causes. She is normotensive. Over-calling it risks lysis she does not need.' },
{ q: 'poor', t: 'Intermediate-low', fb: 'Intermediate-low is RV strain or troponin, not both. She has both.' },
{ q: 'harm', t: 'Low risk', fb: 'RV strain and a raised troponin put her well above low risk. Under-calling it is the dangerous mistake.' }
] },
{ tag: 'anticoag', scene: 'What treatment do you start?', opts: [
{ q: 'best', t: 'Therapeutic weight-based enoxaparin (renal function normal), and tell the orthopaedic team about the bleeding risk', fb: 'LMWH is the usual choice when she is stable with no renal impairment. The orthopaedic team need to know because the wound and any drain matter.' },
{ q: 'ok', t: 'Unfractionated heparin infusion', fb: 'Reasonable, and preferred when kidneys are poor or lysis may be needed. For a stable patient with normal renal function, LMWH is simpler because you do not need to chase PTT.' },
{ q: 'harm', t: 'Alteplase now', fb: 'Routine thrombolysis in intermediate-risk PE brought more major bleeding without long-term benefit (PEITHO). She is also three days out from major surgery, a relative contraindication.' },
{ q: 'harm', t: 'Aspirin and compression stockings', fb: 'Neither treats an acute PE.' }
] },
{ tag: 'dispo', scene: 'She is on treatment and her obs are slowly settling. Where does she go?', opts: [
{ q: 'best', t: 'Monitored bed with telemetry and clear triggers to call you, such as falling BP or rising oxygen need', fb: 'Intermediate-high patients can deteriorate in the first days. Monitoring and a plan for escalation matter more than the bed number.' },
{ q: 'poor', t: 'Back to the ward on four-hourly observations', fb: 'Too little. A sudden drop in blood pressure could go unnoticed for hours.' },
{ q: 'poor', t: 'Transfer to ICU for lysis', fb: 'Over-treatment. Lysis is not routine in intermediate-risk PE. If she deteriorates it becomes a senior decision.' }
] }
],
ends: { hi: 'She stays monitored, stays anticoagulated, and the orthopaedic team know. A clean night.', mid: 'She does well, but a few of your choices left her less safe than they needed to be.', lo: 'Several decisions put her at risk. Review the Risk class tab in the Study Kit, then play this case again.' }
},
{
id: 'c3', title: 'MET call, 04:50', where: 'Ward 3C', time: '04:50', blurb: 'A collapsing patient with probable massive PE. Tests RV protection and lysis safety.',
intro: 'MET call: 61-year-old man, metastatic colon cancer, day 5 of an admission for pain control. He collapsed on the way back from the toilet. You are the first doctor to arrive.',
vit: { hr: 134, sbp: 76, dbp: 48, spo2: 84, rr: 32 },
facts: ['61M, metastatic colon cancer; 80 kg', 'GCS 14; cold peripheries', 'JVP raised; chest clear both sides; trachea central', 'ECG: sinus tachycardia'],
decisions: [
{ tag: 'first', scene: 'The nurse is holding his hand. What do you do first?', opts: [
{ q: 'best', t: 'Call your registrar and ICU, give high-flow oxygen, put on the monitor and defibrillator pads, get IV access, do an ECG and bring bedside ultrasound', vit: { spo2: 88 }, fb: 'He is shocked and hypoxic. Resuscitate, get help, and look for the cause at the bedside. Pads on because he may arrest.' },
{ q: 'poor', t: 'Take a full history from him first', fb: 'He is shocked. History comes after resuscitation.' },
{ q: 'harm', t: 'Take him to radiology for a CT pulmonary angiogram straight away', vit: { sbp: 68, dbp: 42 }, fb: 'Unstable patients die in scanners. Stabilise first; a bedside echo will tell you whether you need the scan at all.' }
] },
{ tag: 'first', scene: 'BP 76/48, JVP raised, chest clear, trachea central. What kind of shock is this, and what separates the causes?', opts: [
{ q: 'best', t: 'Obstructive shock. Massive PE vs tamponade vs tension pneumothorax, separated by bedside ultrasound', fb: 'A raised JVP with a clear chest and a central trachea fits massive PE, with his cancer and a day of immobility as the setup. Ultrasound shows a dilated RV, a pericardial effusion, or absent lung sliding.' },
{ q: 'poor', t: 'Septic shock: broad-spectrum antibiotics and 2 litres of fluid', fb: 'Sepsis does not explain a raised JVP with a clear chest, and 2 litres would overload a failing RV.' },
{ q: 'harm', t: 'Cardiogenic shock from heart failure: give furosemide', fb: 'Diuresis drops his preload when his failing RV already cannot fill the left side.' }
] },
{ tag: 'rv', reveal: ['Bedside echo: dilated RV, flat septum, small LV, no effusion, lung sliding both sides'], scene: 'Echo shows a dilated RV, a flattened septum, a small underfilled LV, no effusion, and lung sliding on both sides. BP is still 76/48. What about fluids and pressors?', opts: [
{ q: 'best', t: 'A small fluid bolus of about 500 mL at most, then noradrenaline early', vit: { sbp: 84, dbp: 52 }, fb: 'A small bolus is fine, but more fluid overdistends a failing RV. Noradrenaline supports the pressure.' },
{ q: 'ok', t: 'No fluids; start noradrenaline now', vit: { sbp: 86, dbp: 54 }, fb: 'Reasonable and safe. A small cautious bolus is also acceptable.' },
{ q: 'harm', t: 'Give 2 litres rapidly, then reassess', vit: { hr: 142, sbp: 64, dbp: 40, spo2: 82 }, fb: 'Big fluid loads overload the RV, push the septum further into the LV and make the shock worse.' }
] },
{ tag: 'rv', vit: { hr: 130, sbp: 84, dbp: 52, spo2: 88, rr: 30 }, scene: 'He is on high-flow nasal oxygen: SpO2 88%, RR 30, GCS 14. The ICU registrar asks whether to intubate now.', opts: [
{ q: 'best', t: 'Keep high-flow nasal oxygen; avoid intubation unless he is failing', fb: 'Positive pressure cuts venous return and RV output, and induction drugs drop the BP. Patients with massive PE who are intubated often collapse.' },
{ q: 'ok', t: 'If it becomes unavoidable: ketamine induction, noradrenaline running, adrenaline drawn up, pulmonary vasodilators considered', fb: 'That is the safe way to do it if you must. He is not at that point yet.' },
{ q: 'harm', t: 'Intubate now with a standard induction', vit: { hr: 142, sbp: 60, dbp: 36, spo2: 80 }, fb: 'A classic route to arrest: positive pressure and standard induction drugs together strip the preload from a failing RV.' }
] },
{ tag: 'lysis', vit: { hr: 128, sbp: 82, dbp: 50, spo2: 89, rr: 30 }, scene: 'BP 82/50 on noradrenaline. The ICU registrar asks: what is the definitive plan?', opts: [
{ q: 'best', t: 'Start heparin, run the contraindication checklist, and ask ICU and the PE team about options', reveal: ['Chart: ischaemic stroke 6 weeks ago (absolute contraindication to lysis)'], fb: 'The notes show an ischaemic stroke six weeks ago: an absolute contraindication to lysis. That points to catheter or surgical embolectomy. Heparin stops more clot forming meanwhile.' },
{ q: 'harm', t: 'Give alteplase now: he has a massive PE', reveal: ['Chart: ischaemic stroke 6 weeks ago (absolute contraindication to lysis)'], fb: 'You skipped the checklist. His notes record an ischaemic stroke six weeks ago, which is an absolute contraindication. Lysis risks an intracranial bleed in a man who may be saved another way.' },
{ q: 'poor', t: 'Wait for a CT pulmonary angiogram to confirm before deciding', fb: 'He is too unstable to scan. The echo and the clinical picture are enough to act; delay costs him.' }
] },
{ tag: 'first', scene: 'While you are talking he becomes unresponsive. The monitor shows an organised rhythm, but there is no pulse.', vit: { hr: 0, sbp: 0, dbp: 0, spo2: 0, rr: 0 }, opts: [
{ q: 'best', t: 'Start CPR, call the arrest team, give adrenaline per ANZCOR, and say the likely cause is massive PE so the senior can decide on lytics, ECMO or embolectomy', fb: 'Pulseless electrical activity: start compressions now and name the cause, because the cause decides the rescue options.' },
{ q: 'poor', t: 'Check again in two minutes before starting compressions', fb: 'No pulse with an organised rhythm is PEA. Start compressions straight away.' },
{ q: 'harm', t: 'Give a 2 litre fluid bolus first', fb: 'Fluid will not fix PEA from an obstructed RV. Compressions and adrenaline come first.' }
] }
],
ends: { hi: 'He is on his way for catheter-directed treatment with a clear handover. You protected the RV and checked before you lysed.', mid: 'He is alive but the path was bumpy. Some decisions cost him time or stability.', lo: 'He deteriorated and the team lost options. Go back through the RV tab and Lysis drill in the Study Kit, then play again.' }
}
];
