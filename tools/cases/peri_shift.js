/* Cases for peri_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
dx: { n: "Making the diagnosis", tab: "1", r: "Two of four: pleuritic pain better leaning forward, friction rub, widespread concave ST elevation with PR depression, new or worse effusion." },
ecg: { n: "Pericarditis or STEMI", tab: "2", r: "Pericarditis: widespread, concave, PR depression, reciprocal change only in aVR. STEMI: one territory, reciprocal depression, Q waves. If in doubt, treat as STEMI." },
risk: { n: "Who to admit", tab: "3", r: "Fever, high white cells, effusion over 2 cm, tamponade signs, raised troponin, immunocompromised, anticoagulated, trauma, or no response to NSAIDs." },
tx: { n: "NSAID plus colchicine", tab: "4", r: "Ibuprofen with food (or aspirin after MI or with CAD), colchicine 0.5 mg twice daily for 3 months, PPI if GI risk. Taper once symptoms and CRP settle." },
special: { n: "Special situations", tab: "6", r: "Early after MI: aspirin and colchicine, no other NSAIDs or steroids. Bacterial or TB: drain and treat. Uraemic: dialysis. Steroids are second line." },
sport: { n: "Exercise", tab: "7", r: "No strenuous exercise until symptoms resolve and ECG and CRP normalise; competitive athletes at least 3 months." }
};
window.RMO_CASES = [
{
id: "c1", title: "Sharp and better leaning forward", where: "Emergency department", time: "00:40", blurb: "A young footballer with chest pain and ST elevation. Tests the ECG call, treatment and return to sport.",
intro: "Triage: 24-year-old man, sharp central chest pain for 1 day, worse lying flat and breathing in. Had a cold last week.",
vit: { hr: 96, sbp: 124, dbp: 76, spo2: 99, rr: 18 },
facts: ["24M; plays semi-professional football", "Pain eased by sitting forward", "Scratchy sound at the left sternal edge", "Temperature 37.6"],
decisions: [
{ tag: "ecg", reveal: ["ECG: concave ST elevation in I, II, aVL, aVF, V2-V6; PR depression; ST depression only in aVR"], scene: "The ECG shows ST elevation in many leads. STEMI or pericarditis?", opts: [
{ q: "best", t: "Pericarditis: widespread concave elevation across territories, PR depression, reciprocal change only in aVR", fb: "That fits pericarditis, with a rub and a positional story. Still check troponin and echo." },
{ q: "poor", t: "STEMI: activate the cath lab", fb: "The pattern crosses territories and has no reciprocal depression. If genuinely unsure, call cardiology rather than guess." }
] },
{ tag: "risk", reveal: ["Troponin normal, CRP 48, white cells 9, echo: trivial effusion"], scene: "Troponin normal, CRP 48, trivial effusion, afebrile. Admit or home?", opts: [
{ q: "best", t: "No high-risk features: treat as an outpatient with review in about a week", fb: "Viral pericarditis without high-risk features can be managed at home." },
{ q: "poor", t: "Admit for 48 hours of observation", fb: "Not needed without high-risk features." }
] },
{ tag: "tx", scene: "What do you prescribe?", opts: [
{ q: "best", t: "Ibuprofen with food (lowest effective dose, tapered once settled) and colchicine 0.5 mg twice daily for 3 months", fb: "NSAID plus colchicine; colchicine roughly halves recurrence." },
{ q: "ok", t: "Ibuprofen alone", fb: "Works for symptoms, but without colchicine recurrence is much more likely." },
{ q: "poor", t: "Prednisolone 1 mg/kg", fb: "Steroids are second line and increase recurrence." }
] },
{ tag: "sport", scene: "He asks when he can play football again.", opts: [
{ q: "best", t: "Not for at least 3 months after symptoms resolve, and only once ECG and CRP are normal", fb: "Australian guidance for competitive athletes." },
{ q: "poor", t: "As soon as the pain goes", fb: "Too early. Exercise can worsen inflammation and recurrence." }
] }
],
ends: { hi: "Right ECG call, right treatment, and a safe return-to-sport plan.", mid: "He did well, but one step was off.", lo: "Review steps 2, 4 and 7 of the Study Kit." }
},
{
id: "c2", title: "Fever and a big heart", where: "Medical ward", time: "03:30", blurb: "Pericarditis with fever and a large effusion. Tests high-risk features and when to drain.",
intro: "Nurse call: 52-year-old man admitted yesterday with pericarditis. Now febrile 38.9 and more breathless.",
vit: { hr: 122, sbp: 104, dbp: 82, spo2: 94, rr: 26 },
facts: ["52M; type 2 diabetes; recent dental infection", "Pericarditis diagnosed yesterday; on ibuprofen and colchicine", "White cells 19; CRP 240", "Chest X-ray: globular heart"],
decisions: [
{ tag: "risk", scene: "Fever, high white cells and a narrow pulse pressure. What are you worried about?", opts: [
{ q: "best", t: "Purulent (bacterial) pericarditis with a growing effusion, possibly tamponade: check pulsus paradoxus and get an urgent echo", fb: "Fever and high white cells change this from viral to possibly bacterial, which can kill." },
{ q: "poor", t: "Drug fever from colchicine", fb: "Assume the dangerous cause first." }
] },
{ tag: "risk", reveal: ["Pulsus paradoxus 16 mmHg. Echo: 2.8 cm effusion with right ventricular diastolic collapse."], scene: "Pulsus 16 mmHg; echo shows a large effusion with RV collapse. Next?", opts: [
{ q: "best", t: "Tamponade: call cardiology for urgent pericardiocentesis, send fluid for Gram stain, culture and TB tests, and start IV antibiotics after cultures", vit: { hr: 98, sbp: 118, dbp: 72 }, fb: "Drainage fixes the haemodynamics and gives the diagnosis." },
{ q: "harm", t: "Furosemide for the breathlessness", vit: { sbp: 86, dbp: 70 }, fb: "Diuretics reduce filling in tamponade and drop the BP." }
] },
{ tag: "special", scene: "Fluid is frankly purulent. Anything else?", opts: [
{ q: "best", t: "Keep the drain in, IV antibiotics, and ask cardiothoracic surgery about further drainage", fb: "Purulent pericarditis often needs ongoing drainage or surgery." },
{ q: "poor", t: "Remove the drain and continue NSAIDs alone", fb: "Purulent pericarditis is not treated like viral pericarditis." }
] },
{ tag: "tx", scene: "What about steroids to settle the inflammation?", opts: [
{ q: "best", t: "No: steroids are avoided in bacterial pericarditis", fb: "Steroids are for autoimmune or refractory cases once infection is excluded." },
{ q: "harm", t: "High-dose prednisolone", fb: "Steroids could worsen an infection." }
] }
],
ends: { hi: "You recognised a dangerous effusion and got it drained and treated.", mid: "He was drained, but a step added risk.", lo: "Review steps 3 and 6 of the Study Kit and the tamponade kit." }
},
{
id: "c3", title: "Pain two days after an MI", where: "Coronary care unit", time: "22:10", blurb: "Pericarditis early after a heart attack. Tests the NSAID trap.",
intro: "Nurse call: 64-year-old woman, day 2 after an anterior STEMI and stent, new sharp pain when breathing in.",
vit: { hr: 88, sbp: 118, dbp: 70, spo2: 97, rr: 18 },
facts: ["64F; anterior STEMI, LAD stent 2 days ago", "On aspirin and ticagrelor", "Pain sharp, worse lying flat", "Friction rub; no new murmur"],
decisions: [
{ tag: "dx", scene: "First, what must you exclude?", opts: [
{ q: "best", t: "Re-infarction or stent thrombosis: ECG compared with the last one, and troponin trend; echo for effusion", fb: "New chest pain after MI is ischaemia until proven otherwise." },
{ q: "poor", t: "Nothing: the rub proves pericarditis", fb: "Rub fits, but re-infarction must be excluded." }
] },
{ tag: "special", reveal: ["ECG unchanged, troponin falling, small effusion only"], scene: "It is early post-MI pericarditis. What do you give?", opts: [
{ q: "best", t: "Higher-dose aspirin as the anti-inflammatory plus colchicine, as cardiology advises; no ibuprofen", fb: "Other NSAIDs and steroids can impair healing of the infarct and raise bleeding risk." },
{ q: "harm", t: "Ibuprofen 600 mg three times daily", fb: "Avoid non-aspirin NSAIDs early after MI." },
{ q: "harm", t: "Prednisolone", fb: "Steroids impair healing after MI." }
] },
{ tag: "special", scene: "Six weeks later she returns with pleuritic pain and fever. What is this likely to be?", opts: [
{ q: "best", t: "Dressler syndrome: an autoimmune pericarditis weeks after MI", fb: "Timing separates it from early post-MI pericarditis." },
{ q: "poor", t: "Viral pericarditis, unrelated", fb: "Possible, but weeks after MI points to Dressler." }
] }
],
ends: { hi: "You excluded re-infarction and avoided the NSAID trap.", mid: "She was fine, but one step added risk.", lo: "Review step 6 of the Study Kit." }
}
];
