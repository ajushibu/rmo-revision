/* Cases for sync_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
was: { n: "Was it syncope?", tab: "1", r: "Brief loss of consciousness from low brain blood flow with fast full recovery. Exclude hypoglycaemia, hypoxia, intoxication, seizure, stroke." },
kind: { n: "Three kinds", tab: "2", r: "Reflex (trigger, warning), orthostatic (on standing, drugs), cardiac (exertion, lying down, no warning, heart disease, abnormal ECG)." },
flags: { n: "Red flags", tab: "3", r: "Exertional or supine syncope, no warning, palpitations, chest pain, breathlessness, heart disease, abnormal ECG, low BP, anaemia, family history of sudden death." },
ecg: { n: "ECG clues", tab: "4", r: "Heart block, long QT, delta wave, Brugada, HCM voltages, ARVC, ischaemia or new arrhythmia." },
tests: { n: "Tests that help", tab: "5", r: "ECG, telemetry, bloods, glucose, troponin, lying and standing BP. Echo for murmur or heart disease; CT head for head strike or anticoagulants." },
drive: { n: "Driving", tab: "7", r: "Austroads private: typical vasovagal fit to drive; single unexplained blackout 6 months; two or more 12 months. The licensing authority decides." }
};
window.RMO_CASES = [
{
id: "c1", title: "Down on the stairs", where: "Emergency department", time: "23:10", blurb: "Exertional syncope in an older man. Tests red flags and aortic stenosis.",
intro: "ED: 74-year-old man collapsed climbing the stairs at home, no warning, came round within a minute. Feels fine now.",
vit: { hr: 76, sbp: 118, dbp: 74, spo2: 97, rr: 16 },
facts: ["74M; hypertension; 'a heart murmur' mentioned years ago", "Exertional breathlessness for months", "Harsh ejection systolic murmur, quiet second sound", "Small cut on the forehead"],
decisions: [
{ tag: "flags", scene: "He feels well and wants to go home. What makes you hesitate?", opts: [
{ q: "best", t: "Exertional syncope with no warning and a murmur: these are red flags for cardiac syncope, likely aortic stenosis", fb: "Exertional syncope with an AS murmur carries a high risk of sudden death." },
{ q: "poor", t: "Nothing: he feels fine, discharge", fb: "Feeling fine now is typical of syncope. The red flags decide the plan." }
] },
{ tag: "tests", scene: "What do you organise?", opts: [
{ q: "best", t: "Admit to telemetry, ECG, troponin, bloods, urgent echo, and CT head because of the head strike if he takes anticoagulants or has neurological signs", reveal: ["Echo: severe aortic stenosis, valve area 0.6 cm²"], fb: "Echo confirms the cause. Telemetry covers arrhythmia meanwhile." },
{ q: "poor", t: "Outpatient Holter monitor", fb: "Exertional syncope with a murmur needs inpatient work-up." }
] },
{ tag: "kind", scene: "Severe aortic stenosis. What do you avoid while he waits?", opts: [
{ q: "best", t: "Large doses of vasodilators (GTN) and dehydration; refer to cardiology for valve intervention", fb: "In severe AS, output is fixed. Vasodilators can drop the BP and cause collapse." },
{ q: "poor", t: "Start a diuretic and GTN patch for breathlessness", fb: "Both can cause hypotension in severe AS." }
] },
{ tag: "drive", scene: "He asks about driving.", opts: [
{ q: "best", t: "No driving until the cause is treated and cardiology clears him; explain his duty to report to the licensing authority", fb: "Cardiac syncope follows the cardiovascular standards; the licensing authority decides." },
{ q: "poor", t: "He can drive tomorrow", fb: "Not with untreated cardiac syncope." }
] }
],
ends: { hi: "You spotted cardiac syncope behind a well-looking patient.", mid: "He was looked after, but a step was missed.", lo: "Review steps 3 and 7 of the Study Kit." }
},
{
id: "c2", title: "The fainting student", where: "Emergency department", time: "21:45", blurb: "A young woman who fainted in a hot queue. Tests the reflex diagnosis and the ECG check.",
intro: "Triage: 20-year-old woman fainted after standing 40 minutes in a hot queue. Felt sweaty and sick first, out for 10 seconds.",
vit: { hr: 78, sbp: 112, dbp: 70, spo2: 99, rr: 14 },
facts: ["20F; no medical history", "Warning symptoms: nausea, sweaty, vision went grey", "No palpitations, no exertion", "Family history: unknown on her father's side"],
decisions: [
{ tag: "ecg", scene: "This sounds vasovagal. What is the one test you must still do?", opts: [
{ q: "best", t: "A 12-lead ECG, looking for long QT, WPW, Brugada, HCM and heart block", reveal: ["ECG normal; QTc 420 ms"], fb: "A normal ECG in a classic story makes cardiac syncope very unlikely." },
{ q: "poor", t: "No tests: it is obviously vasovagal", fb: "The ECG is quick and catches the dangerous young-person diagnoses." }
] },
{ tag: "was", scene: "Anything else to check at the bedside?", opts: [
{ q: "best", t: "Glucose, and a pregnancy test", fb: "Hypoglycaemia mimics syncope, and ectopic pregnancy can present with collapse." },
{ q: "poor", t: "CT head", fb: "Not without head injury, anticoagulants or neurological signs." }
] },
{ tag: "kind", scene: "Everything is normal. What is your advice?", opts: [
{ q: "best", t: "Reflex syncope: explain, avoid long standing in the heat, sit or lie at the first warning, use leg-crossing and hand-grip, and return if it happens with exertion or palpitations", fb: "Education and counter-pressure manoeuvres." },
{ q: "poor", t: "Arrange a tilt-table test and Holter", fb: "Not needed for a single typical vasovagal episode." }
] },
{ tag: "drive", scene: "She asks if she can drive.", opts: [
{ q: "best", t: "Yes: typical vasovagal syncope with a clear trigger that would not happen while driving does not stop private driving", fb: "Austroads: vasovagal and unlikely to occur while driving means fit to drive." },
{ q: "poor", t: "No driving for 6 months", fb: "That applies to blackouts of uncertain cause, not typical vasovagal syncope." }
] }
],
ends: { hi: "A clean, safe reflex syncope work-up with the right advice.", mid: "She went home safely, but one step was over- or under-done.", lo: "Review steps 4 and 7 of the Study Kit." }
},
{
id: "c3", title: "Dizzy on the ward", where: "Medical ward", time: "06:20", blurb: "An older man who keeps nearly fainting on standing. Tests orthostatic hypotension and drugs.",
intro: "Nurse call: 81-year-old man fainted getting out of bed to the toilet. Brief, recovered quickly. Third episode this week.",
vit: { hr: 82, sbp: 104, dbp: 62, spo2: 96, rr: 16 },
facts: ["81M; admitted with a fall; Parkinson disease, heart failure", "New this week: tamsulosin; furosemide increased", "Drinking poorly", "No chest pain or palpitations"],
decisions: [
{ tag: "tests", scene: "What bedside test do you ask for?", opts: [
{ q: "best", t: "Lying and standing BP: lying, immediately on standing, and at 3 minutes", reveal: ["Lying 138/78; standing at 1 minute 96/58; at 3 minutes 92/56; heart rate barely changes"], fb: "A fall of 20 systolic or 10 diastolic is orthostatic hypotension." },
{ q: "poor", t: "CT head", fb: "No head injury or focal signs. Find the mechanism first." }
] },
{ tag: "kind", scene: "BP falls 46 systolic with little rise in heart rate. What fits?", opts: [
{ q: "best", t: "Orthostatic hypotension from drugs (tamsulosin, more furosemide), poor intake, and autonomic failure from Parkinson disease", fb: "A small heart rate rise suggests a neurogenic (autonomic) component." },
{ q: "poor", t: "Vasovagal syncope", fb: "The trigger is standing, and drugs and Parkinson disease explain it." }
] },
{ tag: "kind", scene: "What do you change?", opts: [
{ q: "best", t: "Stop tamsulosin, review the furosemide dose against his fluid status with the team, encourage fluids, stand slowly with help, compression stockings", vit: { sbp: 120, dbp: 70 }, fb: "Treat the causes before thinking about midodrine or fludrocortisone." },
{ q: "harm", t: "Start fludrocortisone tonight", fb: "Fludrocortisone causes fluid retention and can worsen his heart failure. Fix the drugs first, with specialist input." }
] }
],
ends: { hi: "You found the drugs behind the falls and fixed them.", mid: "He improved, but a step added risk.", lo: "Review steps 5 and 6 of the Study Kit." }
},
{
id: "c20261111a", title: "Down on the commode", where: "Medical ward", time: "03:15", blurb: "An older woman with pneumonia faints while straining. Tests whether you sort the kind of syncope before you treat, and the drugs that hurt in aortic stenosis.",
intro: "Nurse call: 83-year-old woman found slumped on the commode, came round within a minute. 'Probably just straining, but can you see her?'",
vit: { hr: 92, sbp: 98, dbp: 60, spo2: 93, rr: 22 },
facts: ["83F; day 2 of community-acquired pneumonia", "Known aortic stenosis: echo 2 years ago 'moderate to severe'", "Usual furosemide and perindopril given this morning; BP usually 130s", "Harsh ejection systolic murmur; fine basal crackles"],
decisions: [
{ tag: "kind", scene: "The nurse thinks it was straining. Which kind of syncope do you work on tonight?", opts: [
{ q: "best", t: "Possible cardiac syncope until shown otherwise: known significant aortic stenosis and a lower BP than usual. Straining may be the trigger, but it does not explain it away", fb: "With known aortic stenosis, syncope is a red flag. Reflex is a diagnosis you reach after cardiac causes are reasonably excluded." },
{ q: "ok", t: "Orthostatic: her diuretic and ACE inhibitor plus being unwell", fb: "A likely contributor, but with aortic stenosis you cannot stop there." },
{ q: "poor", t: "Situational reflex syncope: reassure and go back to bed", fb: "The setting sounds benign, but her valve makes it dangerous." }
] },
{ tag: "tests", scene: "What do you do now?", opts: [
{ q: "best", t: "ECG, telemetry, lying and standing BP if safe, glucose, Hb, electrolytes, troponin, and ask for an inpatient echo (the last one is 2 years old)", reveal: ["ECG: sinus rhythm, LVH, no block. Hb 118. Creatinine up from her baseline."], fb: "Telemetry covers arrhythmia; the echo tells you how tight the valve is now." },
{ q: "poor", t: "Nothing tonight; outpatient echo", fb: "Syncope with known significant AS needs inpatient work-up." }
] },
{ tag: "kind", scene: "She is breathless with crackles; BP 96/58. The day team's plan says: GTN patch tonight and an extra IV furosemide dose. What do you do?", opts: [
{ q: "best", t: "Hold the GTN and tonight's perindopril, do not give a big diuretic dose, and call your registrar. A cautious diuretic only if she is clearly overloaded", vit: { sbp: 104, dbp: 62 }, fb: "In severe AS output is fixed and depends on filling. Vasodilators and over-diuresis can drop the BP and cause another collapse. (Standard teaching; I did not find an Australian source that states it.)" },
{ q: "poor", t: "Give the GTN patch and the furosemide as planned", vit: { sbp: 76, dbp: 46, hr: 108 }, fb: "This is the same mistake as the man on the stairs: both lower filling or afterload, and with a tight valve the BP falls." },
{ q: "poor", t: "Give a 1 litre fluid bolus fast", vit: { spo2: 88, rr: 28 }, fb: "She has crackles. If she is dry, small careful boluses with senior input; not a fast litre." }
] },
{ tag: "flags", reveal: ["Echo next morning: severe aortic stenosis, LV function preserved."], scene: "Echo shows severe aortic stenosis. What next?", opts: [
{ q: "best", t: "Refer to cardiology for valve assessment (surgery or TAVI); syncope in severe AS is a reason to act now", fb: "Symptomatic severe AS (syncope, angina, breathlessness) is an indication for valve intervention." },
{ q: "poor", t: "Restart all her usual medicines and review in clinic in 6 months", fb: "Symptomatic severe AS carries a high risk of sudden death. It needs prompt cardiology review." }
] }
],
ends: { hi: "You found the valve behind the 'straining' and kept the GTN off.", mid: "She was looked after, but one step risked another collapse.", lo: "Review steps 2 and 3 of the Study Kit and replay." }
}
];
