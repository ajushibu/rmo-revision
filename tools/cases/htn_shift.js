/* Cases for htn_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
which: { n: "Urgency or emergency", tab: "1", r: "Organ damage makes it an emergency, not the number. Urgency: re-measure, treat the cause, oral drugs." },
organ: { n: "Looking for organ damage", tab: "2", r: "Brain, eyes, heart, aorta, kidneys, blood, pregnancy. ECG, troponin, creatinine, urinalysis, fundoscopy, CT when indicated." },
speed: { n: "How fast to lower", tab: "3", r: "Most emergencies: no more than 25% in the first hour. Dissection: systolic under 120 within an hour. ACS or pulmonary oedema: under 140." },
drug: { n: "Drug for the emergency", tab: "4", r: "Dissection: beta-blocker first. ACS and pulmonary oedema: GTN, no beta-blocker. Stimulants: benzodiazepines first." },
cause: { n: "Secondary causes", tab: "6", r: "Drugs, sleep apnoea, renal artery stenosis, primary aldosteronism, phaeochromocytoma, thyroid, Cushing, coarctation." }
};
window.RMO_CASES = [
{
id: "c1", title: "200 over 110 at midnight", where: "Surgical ward", time: "00:20", blurb: "A classic ward call about a high BP. Tests urgency vs emergency and the urge to treat a number.",
intro: "Nurse call: 72-year-old man, day 1 after a hip replacement, BP 204/108. 'Can you chart something IV?'",
vit: { hr: 96, sbp: 204, dbp: 108, spo2: 96, rr: 18 },
facts: ["72M; hypertension on amlodipine and perindopril", "Day 1 after hip replacement", "Pain 8/10; has not passed urine since 4 pm", "Usual tablets not given today (nil by mouth earlier)"],
decisions: [
{ tag: "which", scene: "BP 204/108. What do you do first?", opts: [
{ q: "best", t: "See him: re-measure properly, check for symptoms and signs of organ damage, and look at pain, bladder and the drug chart", fb: "Most of these calls are urgency with an obvious cause." },
{ q: "harm", t: "Chart IV hydralazine over the phone", vit: { sbp: 128, dbp: 70, hr: 112 }, fb: "An unpredictable IV drug to an unassessed patient can drop the BP too far." },
{ q: "poor", t: "Tell the nurse to recheck in 4 hours", fb: "You need to know whether there is organ damage." }
] },
{ tag: "organ", reveal: ["No chest pain or breathlessness, no confusion, no focal signs. Bladder scan 900 mL."], scene: "No organ damage. Bladder scan 900 mL; pain 8/10. Plan?", opts: [
{ q: "best", t: "Catheterise, treat the pain, give his usual amlodipine and perindopril (if kidney function allows), recheck in an hour", vit: { sbp: 158, dbp: 88, hr: 84 }, fb: "Treat the causes: retention, pain and missed tablets. That is hypertensive urgency managed well." },
{ q: "poor", t: "Start a labetalol infusion", fb: "IV infusions are for emergencies with organ damage." }
] },
{ tag: "speed", scene: "An hour later BP is 158/88. What target do you set?", opts: [
{ q: "best", t: "This is fine for tonight: aim under 160/100 over hours, lower over days with his usual medicines", fb: "Gradual control for urgency." },
{ q: "harm", t: "Push it under 120 tonight with extra doses", fb: "Rapid lowering in an older adapted patient risks stroke and kidney injury." }
] }
],
ends: { hi: "You treated the patient, not the number.", mid: "BP came down, but a step risked over-treatment.", lo: "Review steps 1 and 5 of the Study Kit." }
},
{
id: "c2", title: "Confused and very high", where: "Emergency department", time: "02:30", blurb: "A true hypertensive emergency. Tests organ damage, speed and setting.",
intro: "ED call: 46-year-old man, BP 238/136, headache, blurred vision and now confused.",
vit: { hr: 98, sbp: 238, dbp: 136, spo2: 97, rr: 20 },
facts: ["46M; stopped his antihypertensives 2 months ago", "Headache 2 days, blurred vision, new confusion", "Fundi: swollen discs and flame haemorrhages", "Creatinine 260 µmol/L (no baseline)"],
decisions: [
{ tag: "organ", scene: "Confused, papilloedema, creatinine 260. What is this?", opts: [
{ q: "best", t: "Hypertensive emergency with brain, eye and kidney involvement: ECG, troponin, film for haemolysis, urinalysis, CT head", fb: "Organ damage in several places. Look for each." },
{ q: "poor", t: "Urgency: oral captopril and home", fb: "Confusion and papilloedema are organ damage." }
] },
{ tag: "speed", reveal: ["CT head: no bleed; changes in the occipital lobes (possible PRES)"], scene: "How fast should the BP come down?", opts: [
{ q: "best", t: "IV agent in HDU or ICU with an arterial line, no more than 25% lower in the first hour, then to about 160/100 over the next hours", vit: { sbp: 186, dbp: 108 }, fb: "Controlled lowering protects the brain and kidneys." },
{ q: "harm", t: "Normalise it within the hour", vit: { sbp: 118, dbp: 70 }, fb: "Rapid lowering can cause watershed stroke and worsen the kidney injury." }
] },
{ tag: "drug", scene: "Which IV option is reasonable here?", opts: [
{ q: "best", t: "A titratable infusion your hospital uses (for example labetalol), with ICU or HDU input", fb: "Titratable infusions are safest. Check what your hospital stocks." },
{ q: "poor", t: "Repeated IV hydralazine boluses", fb: "Response and duration are unpredictable." }
] },
{ tag: "cause", scene: "He is 46 and had a crisis. What do you plan for later?", opts: [
{ q: "best", t: "Look for secondary causes: aldosterone to renin ratio, metanephrines, renal artery imaging, sleep apnoea, drugs", fb: "Young age and a crisis are triggers to look for a cause." },
{ q: "poor", t: "Nothing: he just stopped his tablets", fb: "That may be all, but at his age a secondary cause is worth excluding." }
] }
],
ends: { hi: "You recognised the emergency and lowered the BP safely.", mid: "He improved, but a step added risk.", lo: "Review steps 2, 3 and 4 of the Study Kit." }
},
{
id: "c3", title: "Sweaty after the festival", where: "Emergency department", time: "03:50", blurb: "Stimulant toxicity with a high BP. Tests the beta-blocker trap.",
intro: "ED call: 23-year-old, agitated, BP 196/112, heart rate 138, temperature 38.4, after taking pills at a festival.",
vit: { hr: 138, sbp: 196, dbp: 112, spo2: 97, rr: 24 },
facts: ["23M; took 'two pills' 4 hours ago", "Agitated, sweaty, dilated pupils", "Chest tightness on and off", "ECG: sinus tachycardia, no ST elevation"],
decisions: [
{ tag: "drug", scene: "First treatment for his BP and agitation?", opts: [
{ q: "best", t: "Benzodiazepine (per protocol), cooling, IV fluids, and call toxicology advice (Poisons Information Centre 13 11 26)", vit: { hr: 112, sbp: 168, dbp: 98 }, fb: "Sedation treats the cause of the high BP and heart rate." },
{ q: "harm", t: "IV metoprolol for the tachycardia", vit: { sbp: 214, dbp: 124 }, fb: "A beta-blocker alone can leave alpha effects unopposed and raise the BP." }
] },
{ tag: "organ", scene: "He has had chest tightness. What else do you check?", opts: [
{ q: "best", t: "Serial ECG and troponin, creatinine kinase, electrolytes, kidney function, temperature", fb: "Stimulants can cause ischaemia, rhabdomyolysis and hyperthermia." },
{ q: "poor", t: "Nothing: it is just drugs", fb: "Stimulant toxicity can damage the heart and muscles." }
] },
{ tag: "drug", scene: "BP stays 180/110 after benzodiazepines and his chest pain persists. Next?", opts: [
{ q: "best", t: "GTN, more sedation as needed, and senior and toxicology advice", fb: "GTN is a reasonable vasodilator for chest pain with stimulants; avoid beta-blockers alone." },
{ q: "harm", t: "Labetalol bolus", fb: "Beta-blockade in stimulant toxicity is avoided on the US page." }
] }
],
ends: { hi: "You avoided the beta-blocker trap and treated the cause.", mid: "He settled, but one step was risky.", lo: "Review step 4 of the Study Kit." }
}
];
