/* Cases for tamp_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
what: { n: "Speed over size", tab: "1", r: "Fast small effusions cause tamponade; slow large ones may not. The right ventricle collapses first." },
signs: { n: "Signs of tamponade", tab: "2", r: "Breathless, tachycardic, raised JVP, pulsus paradoxus over 10 mmHg. Low BP and Beck triad are late and insensitive." },
echo: { n: "Bedside echo", tab: "3", r: "Effusion, RV diastolic collapse, plethoric IVC, swinging heart. Tamponade is clinical plus echo." },
drain: { n: "Drain it", tab: "4", r: "Pericardiocentesis is the only fix. Small fluid bolus as a bridge; no diuretics or vasodilators; avoid intubation. Blood from dissection, rupture or trauma: surgery." },
cause: { n: "Find the cause", tab: "5", r: "Procedures, pericarditis, cancer, uraemia, hypothyroidism, autoimmune, radiation, blood. Send fluid for cells, protein, LDH, Gram stain, culture, TB tests and cytology." }
};
window.RMO_CASES = [
{
id: "c1", title: "After the pacemaker", where: "Cardiology ward", time: "02:50", blurb: "Low BP hours after a lead was placed. Tests fast recognition and drainage.",
intro: "Nurse call: 79-year-old woman, pacemaker inserted this afternoon. Now dizzy, BP falling.",
vit: { hr: 112, sbp: 84, dbp: 68, spo2: 95, rr: 24 },
facts: ["79F; dual-chamber pacemaker 10 hours ago", "On apixaban (restarted tonight)", "JVP raised to the ear", "Heart sounds soft"],
decisions: [
{ tag: "signs", scene: "Low BP with a narrow pulse pressure, raised JVP, soft heart sounds, after a lead was placed. What do you suspect?", opts: [
{ q: "best", t: "Tamponade from a lead perforation: measure pulsus, call your senior and cardiology, bedside echo now", fb: "A procedure plus this picture is tamponade until proven otherwise." },
{ q: "poor", t: "Over-sedation: wait for it to wear off", fb: "Raised JVP and soft sounds do not fit." },
{ q: "harm", t: "Furosemide for the raised JVP", vit: { sbp: 70, dbp: 58 }, fb: "Diuretics reduce filling in tamponade." }
] },
{ tag: "echo", reveal: ["Echo: 1.2 cm effusion with RV diastolic collapse; IVC plethoric"], scene: "Only a 1.2 cm effusion, but the RV is collapsing. Is that tamponade?", opts: [
{ q: "best", t: "Yes: a small effusion that collected quickly can tamponade. Arrange urgent pericardiocentesis and withhold apixaban", fb: "Speed matters more than size." },
{ q: "poor", t: "No: tamponade needs a large effusion", fb: "Not after a procedure: small and fast is enough." }
] },
{ tag: "drain", scene: "Cardiology is 20 minutes away. While waiting?", opts: [
{ q: "best", t: "Small fluid bolus, monitor, crossmatch, check coagulation; no diuretic, no vasodilator, avoid intubation", vit: { sbp: 92, dbp: 70 }, fb: "Support filling and prepare. Drainage is the fix." },
{ q: "harm", t: "Intubate to protect her airway", vit: { sbp: 52, dbp: 40 }, fb: "Positive pressure ventilation lowered her venous return and BP sharply." }
] },
{ tag: "drain", reveal: ["Pericardiocentesis: 180 mL of blood; BP 118/72"], scene: "Drained 180 mL of blood and the BP recovers. What now?", opts: [
{ q: "best", t: "Leave the drain, monitor output, repeat echo, keep anticoagulation off, and tell the pacing team about a possible lead perforation", fb: "Ongoing bleeding needs watching and the lead may need review." },
{ q: "poor", t: "Remove the drain and restart apixaban tonight", fb: "Too soon; bleeding may recur." }
] }
],
ends: { hi: "Fast recognition and drainage. She recovers.", mid: "She survived, but a step cost BP or time.", lo: "Review steps 1, 2 and 4 of the Study Kit." }
},
{
id: "c2", title: "The slow effusion", where: "Oncology ward", time: "20:40", blurb: "A large effusion in a woman with cancer. Tests signs, echo and the fluid tests.",
intro: "Ward call: 58-year-old woman with metastatic lung cancer, increasingly breathless over a week, now can't lie flat.",
vit: { hr: 118, sbp: 102, dbp: 86, spo2: 93, rr: 26 },
facts: ["58F; metastatic lung adenocarcinoma", "Breathless for a week, worse tonight", "JVP raised; heart sounds quiet", "Chest X-ray: large globular heart"],
decisions: [
{ tag: "signs", scene: "BP 102/86, heart rate 118. Which bedside test helps most right now?", opts: [
{ q: "best", t: "Measure pulsus paradoxus with the cuff, then bedside echo", reveal: ["Pulsus paradoxus 22 mmHg"], fb: "Pulsus over 10 is sensitive; under 10 makes tamponade very unlikely." },
{ q: "poor", t: "Wait for all three Beck signs before acting", fb: "Beck triad is rarely complete." }
] },
{ tag: "echo", reveal: ["Echo: 3 cm effusion, RA and RV collapse, swinging heart"], scene: "Echo shows a 3 cm effusion with collapse. Plan?", opts: [
{ q: "best", t: "Urgent pericardiocentesis, with a drain left in", vit: { hr: 94, sbp: 120, dbp: 74 }, fb: "Tamponade physiology: drain." },
{ q: "poor", t: "Start colchicine and recheck tomorrow", fb: "Colchicine does not help malignant effusions, and she has tamponade now." }
] },
{ tag: "cause", scene: "What do you send the fluid for?", opts: [
{ q: "best", t: "Cytology, cell count, protein, LDH, Gram stain and culture, TB tests", fb: "Cytology confirms malignancy; the others exclude infection." },
{ q: "poor", t: "Nothing: we know it is cancer", fb: "Infection and TB can coexist, and the result guides treatment." }
] },
{ tag: "cause", scene: "Two weeks later the effusion is building again. What is the likely next step?", opts: [
{ q: "best", t: "Discuss a pericardial window or other definitive drainage with cardiothoracic surgery and oncology, in line with her goals of care", fb: "Recurrent malignant effusions often need a window, and the plan should match her wishes." },
{ q: "poor", t: "Repeat needle drainage every few days indefinitely", fb: "Not sustainable; consider a definitive procedure." }
] }
],
ends: { hi: "Good signs, quick drainage and a sensible long-term plan.", mid: "She was helped, but a step was missed.", lo: "Review steps 2, 3 and 5 of the Study Kit." }
},
{
id: "c3", title: "Low BP after cardiac surgery", where: "Cardiac surgical ward", time: "04:15", blurb: "Day 1 after bypass surgery with drains that suddenly stopped. Tests clot tamponade.",
intro: "Nurse call: 70-year-old man, day 1 after CABG. Chest drains were draining well and suddenly stopped. BP falling.",
vit: { hr: 124, sbp: 82, dbp: 64, spo2: 94, rr: 24 },
facts: ["70M; CABG yesterday", "Chest drains: 600 mL in 4 hours, then nothing for 1 hour", "CVP rising", "Cool peripheries"],
decisions: [
{ tag: "what", scene: "Drains suddenly stopped, BP falling, CVP rising. What is likely?", opts: [
{ q: "best", t: "Clot tamponade: blood is collecting but the drains are blocked", fb: "Sudden cessation after heavy drainage, with falling BP and rising CVP, is classic." },
{ q: "poor", t: "Bleeding has stopped: good news", fb: "Not with a falling BP and rising CVP." }
] },
{ tag: "drain", scene: "Who do you call?", opts: [
{ q: "best", t: "The cardiothoracic surgeon now: he may need re-opening", fb: "After cardiac surgery, clotted blood often cannot be drained with a needle. Surgery is the fix." },
{ q: "poor", t: "Request an outpatient echo", fb: "This is an emergency." }
] },
{ tag: "drain", scene: "While the surgeon is on the way?", opts: [
{ q: "best", t: "Fluid and blood products as advised, crossmatch, check coagulation and platelets, and avoid diuretics and vasodilators", vit: { sbp: 90, dbp: 68 }, fb: "Support filling and correct bleeding until surgery." },
{ q: "harm", t: "Start a GTN infusion for the high CVP", vit: { sbp: 66, dbp: 50 }, fb: "Vasodilators reduce filling and BP in tamponade." }
] }
],
ends: { hi: "You recognised clot tamponade and got the surgeon fast.", mid: "He made it back to theatre, but a step added risk.", lo: "Review step 4 of the Study Kit." }
}
];
