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
},
{
id: "c20261111a", title: "Spells on the ward", where: "Medical ward", time: "01:40", blurb: "A young woman labelled anxious, with BP spikes and an adrenal mass. Tests secondary causes and the beta-blocker trap in a different setting.",
intro: "Nurse call: 36-year-old woman, BP 232/128, heart rate 128, pounding headache and drenched in sweat. 'She has PRN metoprolol charted. Can I give it?'",
vit: { hr: 128, sbp: 232, dbp: 128, spo2: 98, rr: 20 },
facts: ["36F; GP diagnosed 'panic attacks' 3 months ago", "Spells of headache, sweating and a pounding heart; BP 128/80 between spells", "CT abdomen today for flank pain: 4 cm right adrenal mass", "PRN oral metoprolol charted by day team for heart rate over 120"],
decisions: [
{ tag: "cause", scene: "Spells of headache, sweating and palpitations, BP spikes, and an adrenal mass. What are you thinking?", opts: [
{ q: "best", t: "Phaeochromocytoma until proven otherwise: the classic triad plus an adrenal mass", fb: "Headache, sweating and palpitations in spells is the classic triad. An adrenal mass is itself a reason to test for phaeochromocytoma (Medicine Today, Australia)." },
{ q: "ok", t: "Probably a panic attack, but I will look for a cause later", fb: "Panic is possible, but with spells and an adrenal mass the cause has to be excluded first." },
{ q: "poor", t: "Nothing more: she already has a diagnosis of anxiety", fb: "Same trap as before: an existing label stops you looking. Young, paroxysmal hypertension with a mass needs a secondary cause excluded." }
] },
{ tag: "drug", scene: "She is still 230/128 and 128 a minute. The nurse has the metoprolol ready.", opts: [
{ q: "best", t: "Hold the metoprolol. No beta-blocker before alpha-blockade. See her, look for organ damage, and call your registrar and ICU about a titratable IV agent per your hospital protocol", fb: "Beta-blockade before alpha-blockade leaves alpha stimulation unopposed and can precipitate a hypertensive crisis (Medicine Today, Australia)." },
{ q: "harm", t: "Give the metoprolol as charted: the heart rate is the problem", vit: { hr: 112, sbp: 256, dbp: 142 }, fb: "Unopposed alpha: the BP climbs. This is the same trap as the stimulant case. A fast heart rate with catecholamine excess is not treated with a beta-blocker alone." },
{ q: "poor", t: "Give a dose of IV hydralazine and recheck in the morning", vit: { hr: 140, sbp: 150, dbp: 84 }, fb: "Unpredictable, untitrated, and you have not looked for organ damage or called for help." }
] },
{ tag: "cause", reveal: ["ECG: sinus tachycardia, no ischaemia. Troponin normal. No neurological signs. Spell settles: BP 148/88."], scene: "The spell settles. Which test confirms or excludes the diagnosis?", opts: [
{ q: "best", t: "Plasma free metanephrines (or 24-hour urine metanephrines), and refer to endocrinology", fb: "First-line in Australia: fasting plasma free metanephrines, or 24-hour urine metanephrines. Levels over three times the upper limit are rarely false positive." },
{ q: "ok", t: "Aldosterone to renin ratio only", fb: "Worth doing in hypertension with an adrenal mass, but on its own it misses phaeochromocytoma." },
{ q: "poor", t: "No test needed: send her to the surgeons for the mass", fb: "Biochemistry first. Most adrenal masses are not phaeochromocytomas (about 5% are), and surgery without preparation is dangerous if it is one." }
] },
{ tag: "drug", reveal: ["Plasma metanephrines over 4 times the upper limit. Endocrinology plan surgery."], scene: "Endocrinology plan adrenalectomy. In what order do the tablets go in before theatre?", opts: [
{ q: "best", t: "Alpha-blocker first (phenoxybenzamine or prazosin, dose per endocrinology), and a beta-blocker only after adequate alpha-blockade if the heart rate needs it", fb: "Alpha-blockade starts 1 to 2 weeks before surgery; the beta-blocker comes after (Medicine Today, Australia)." },
{ q: "harm", t: "Beta-blocker first to settle the heart rate, then add the alpha-blocker", fb: "Wrong order. Beta first can trigger a crisis." }
] }
],
ends: { hi: "You saw past the anxiety label and kept the beta-blocker in the drawer.", mid: "She is safe, but one step risked a crisis or missed the cause.", lo: "Review steps 4 and 6 of the Study Kit, then replay." }
}
];
