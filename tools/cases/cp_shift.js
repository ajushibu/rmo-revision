/* Cases for cp_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
first: { n: "The first 10 minutes", tab: "1", r: "ECG within 10 minutes, BP in both arms, IV access, troponin, chest X-ray. ST elevation: activate the STEMI pathway. Suspected ACS: aspirin 300 mg." },
killers: { n: "The six that kill", tab: "2", r: "ACS, aortic dissection, PE, tension pneumothorax, tamponade, oesophageal rupture. Each has a clue and a test." },
dissect: { n: "Dissection before antithrombotics", tab: "2", r: "Tearing pain to the back, arm BP difference over 20, pulse deficit: CT aortogram before heparin or other antithrombotics. Control heart rate and BP with a beta-blocker first." },
pe: { n: "PE work-up", tab: "2", r: "Pleuritic pain, tachycardia, hypoxia and risk factors: Wells score; high probability goes straight to CTPA, with anticoagulation if there is no bleeding risk." },
trop: { n: "Troponin and rule-out", tab: "4", r: "Serial troponin within a validated protocol: ADAPT (0 and 2 hours, TIMI 0, normal ECG) or a 1-2 hour high-sensitivity algorithm. One normal value is not enough early on." },
risk: { n: "Risk and disposition", tab: "5", r: "Australian low risk: under 40, atypical, no known CAD, normal ECG and troponin, symptom-free: no further testing. Intermediate: non-invasive testing within 7 days (up to 14)." },
benign: { n: "Non-cardiac causes and safety-net", tab: "6", r: "Once killers are reasonably excluded, treat the likely cause and give clear return advice for severe pain or pain with breathlessness, sweating, vomiting or fainting." }
};
window.RMO_CASES = [
{
id: "c1", title: "Tearing pain", where: "Emergency department", time: "01:20", blurb: "A hypertensive man with pain through to his back. Tests the dissection trap and BP control.",
intro: "Triage: 66-year-old man, sudden severe pain in the chest going through to his back 40 minutes ago. Sweaty, BP high.",
vit: { hr: 104, sbp: 186, dbp: 98, spo2: 96, rr: 22 },
facts: ["66M; long-standing hypertension, poorly controlled", "Pain 'like something ripped', maximal at onset", "Right arm 186/98, left arm 152/84", "Faint early diastolic murmur"],
decisions: [
{ tag: "first", scene: "He arrives in resus. What do you do in the first 10 minutes?", opts: [
{ q: "best", t: "ECG, BP in both arms, IV access, bloods including troponin, chest X-ray, call your senior, and hold antithrombotics until you know more", fb: "The arm difference and the story already point to dissection. Get the ECG and keep heparin away for now." },
{ q: "ok", t: "ECG and troponin, then decide", fb: "Right start, but the arm difference is already a red flag that changes the next steps." },
{ q: "harm", t: "Aspirin 300 mg, ticagrelor 180 mg and an enoxaparin dose for presumed ACS", vit: { sbp: 160, hr: 118 }, fb: "If this is dissection, antithrombotics can be catastrophic. Exclude it first." }
] },
{ tag: "killers", reveal: ["ECG: sinus tachycardia, non-specific ST changes, no ST elevation"], scene: "The ECG shows no ST elevation. What is the most important diagnosis to exclude now?", opts: [
{ q: "best", t: "Aortic dissection: arrange a CT aortogram now", fb: "Tearing pain to the back, maximal at onset, arm BP difference and a new AR murmur: dissection until proven otherwise." },
{ q: "poor", t: "NSTEMI: send serial troponins and wait", fb: "A non-specific ECG does not explain the arm difference or the back pain." },
{ q: "poor", t: "PE: request a D-dimer", fb: "D-dimer cannot reliably separate the two here, and dissection is the more likely and more urgent diagnosis." }
] },
{ tag: "dissect", scene: "While CT is arranged, how do you manage his BP and heart rate?", opts: [
{ q: "best", t: "Analgesia, then IV beta-blocker (labetalol or esmolol) to heart rate under 60 and systolic 100-120; add a vasodilator only after rate control", vit: { hr: 62, sbp: 118, dbp: 70 }, fb: "Rate first, then pressure. A vasodilator alone causes reflex tachycardia and more wall stress." },
{ q: "harm", t: "GTN infusion alone to bring the BP down", vit: { hr: 128 }, fb: "Vasodilator without a beta-blocker raises the heart rate and the shear force on the aorta." },
{ q: "poor", t: "Leave the BP: it will settle with pain relief", fb: "He needs active rate and BP control while you wait." }
] },
{ tag: "dissect", reveal: ["CT: dissection flap from the aortic root to the arch (Type A)"], scene: "CT shows a Type A dissection. Who do you call?", opts: [
{ q: "best", t: "Cardiothoracic surgery immediately, keep the BP and rate on target, cross-match", fb: "Type A needs emergency surgery. Every hour counts." },
{ q: "poor", t: "Admit under medicine for BP control", fb: "That is Type B management. Type A involves the ascending aorta." },
{ q: "harm", t: "Start heparin to stop clot extending", fb: "Anticoagulation is contraindicated in acute dissection." }
] }
],
ends: { hi: "You caught the dissection before anyone gave an antithrombotic. He goes to theatre in time.", mid: "He made it to surgery, but a step added risk or delay.", lo: "An antithrombotic or a delay put him in danger. Go back to steps 1 and 2 of the Study Kit." }
},
{
id: "c2", title: "Day 3 and breathless", where: "Orthopaedic ward", time: "04:10", blurb: "Pleuritic pain after surgery. Tests PE recognition and the CTPA decision.",
intro: "Nurse call: 47-year-old woman, 3 days after a knee replacement, new sharp chest pain when she breathes in, and short of breath.",
vit: { hr: 114, sbp: 122, dbp: 74, spo2: 91, rr: 24 },
facts: ["47F; total knee replacement 3 days ago", "Taking the combined oral contraceptive pill", "Left calf swollen and tender", "Chest clear; no fever"],
decisions: [
{ tag: "first", scene: "You arrive. First steps?", opts: [
{ q: "best", t: "Oxygen to target, ECG, troponin, blood gas, full set of observations, check her thromboprophylaxis chart", fb: "A fast screen for the killers. The ECG also rules out STEMI." },
{ q: "poor", t: "Prescribe paracetamol and review in the morning", fb: "Tachycardia, hypoxia and pleuritic pain after surgery need assessment now." }
] },
{ tag: "pe", reveal: ["ECG: sinus tachycardia 114, T-wave inversion V1-V3. Troponin mildly raised."], scene: "The ECG shows sinus tachycardia and T inversion in V1-V3. What next?", opts: [
{ q: "best", t: "High probability of PE (post-op, swollen calf, tachycardic): go straight to CTPA; D-dimer adds nothing", fb: "With a high Wells score, D-dimer cannot rule PE out. Image." },
{ q: "ok", t: "Send a D-dimer first", fb: "After surgery the D-dimer is almost always raised and does not help with high probability." },
{ q: "poor", t: "Treat as NSTEMI", fb: "T inversion V1-V3 with tachycardia is a classic right heart strain pattern in PE." }
] },
{ tag: "pe", scene: "CTPA is 2 hours away. She is stable with BP 122/74. What about anticoagulation now?", opts: [
{ q: "best", t: "Discuss bleeding risk with the orthopaedic team, then start therapeutic anticoagulation if acceptable while waiting", fb: "With high probability and a long wait, starting treatment is reasonable if the surgical bleeding risk allows. Make it a joint decision." },
{ q: "poor", t: "Wait for the CT before any decision", fb: "A 2-hour wait with high probability: at least make the bleeding decision now." },
{ q: "harm", t: "Thrombolyse now", fb: "She is not hypotensive. Thrombolysis is for high-risk PE, and recent surgery is a strong contraindication." }
] },
{ tag: "killers", reveal: ["CTPA: bilateral segmental PE, RV/LV ratio normal"], scene: "CTPA confirms PE without RV strain. What do you also do?", opts: [
{ q: "best", t: "Stop the combined pill, continue anticoagulation, tell her team, and plan duration (provoked: about 3 months)", fb: "Remove the oestrogen trigger and document a provoked PE." },
{ q: "poor", t: "Order a thrombophilia screen now", fb: "Not in the acute phase or on anticoagulation, and this one is clearly provoked." }
] }
],
ends: { hi: "PE was recognised, imaged and treated safely, and the trigger removed.", mid: "She was treated, but a step was slow or less safe.", lo: "Several decisions missed or mismanaged the PE. Review the PE kit and step 2 here." }
},
{
id: "c3", title: "The worried 32-year-old", where: "Emergency department", time: "23:15", blurb: "Sharp chest pain in a young man. Tests the troponin protocol and when it is safe to send home.",
intro: "Triage: 32-year-old man, sharp left chest pain for 3 hours, worse when he twists or presses on the area. Very anxious.",
vit: { hr: 92, sbp: 128, dbp: 80, spo2: 99, rr: 16 },
facts: ["32M; no medical history, non-smoker, no family history", "Moved furniture yesterday", "Tender over the left 4th costal cartilage", "Pain now 2/10"],
decisions: [
{ tag: "first", scene: "What happens first, even though this sounds musculoskeletal?", opts: [
{ q: "best", t: "ECG within 10 minutes, observations, and a troponin", fb: "Everyone with chest pain gets an early ECG. A plausible benign story does not skip it." },
{ q: "poor", t: "Skip tests: it is clearly costochondritis", fb: "History alone cannot rule out ACS. A quick ECG and troponin are cheap." }
] },
{ tag: "trop", reveal: ["ECG normal. Troponin at presentation (3 hours after onset): normal."], scene: "ECG and the first troponin are normal. Is that enough?", opts: [
{ q: "best", t: "Repeat the troponin per the hospital's accelerated protocol (for example at 2 hours, with TIMI 0 and a normal ECG)", fb: "That is the ADAPT approach. A protocol-based second value makes the rule-out safe." },
{ q: "ok", t: "Discharge now: 3 hours from onset is probably enough", fb: "Possibly true for some high-sensitivity algorithms, but follow your local protocol rather than guessing." },
{ q: "poor", t: "Admit for 24 hours of observation", fb: "Not needed for a low-risk patient with a negative protocol." }
] },
{ tag: "risk", reveal: ["Second troponin normal; pain gone"], scene: "The repeat troponin is normal and the pain has gone. What next?", opts: [
{ q: "best", t: "He meets the Australian low-risk definition: discharge without further coronary testing, treat the chest-wall pain, and give return advice", fb: "Under 40, atypical, no CAD, normal ECG and troponin, symptom-free: no further testing needed." },
{ q: "poor", t: "Book an outpatient stress test", fb: "Testing low-risk patients adds false positives without benefit." },
{ q: "poor", t: "Request a CT coronary angiogram tonight", fb: "Not indicated at low risk." }
] },
{ tag: "benign", scene: "What do you tell him before he leaves?", opts: [
{ q: "best", t: "Explain the findings, simple analgesia (an NSAID if suitable), and return or call 000 for severe pain or pain with breathlessness, sweating, vomiting or fainting", fb: "Clear explanation reduces anxiety and repeat visits. The safety-net covers what you could have missed." },
{ q: "poor", t: "'Nothing is wrong with your heart, you can ignore any chest pain'", fb: "Too absolute. Always give return advice." }
] }
],
ends: { hi: "Safe rule-out and a clear plan: he goes home reassured.", mid: "He went home safely, but the process skipped a step.", lo: "Too little or too much testing. Review steps 4 and 5 of the Study Kit." }
}
];
