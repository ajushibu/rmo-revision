/* Cases for af_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
first: { n: "First moves and work-up", tab: "aus", r: "Monitor, IV access, 12-lead ECG, bloods (electrolytes including K and Mg, TFTs, troponin, creatinine), and look for the trigger: sepsis, alcohol, thyroid, ischaemia, PE, heart failure. Treating the cause is often the most important step." },
score: { n: "Stroke score (CHA2DS2-VA)", tab: "risk", r: "Australia uses CHA2DS2-VA, with no point for female sex. Score 2 or more: anticoagulate. Score 1: consider. Score 0: do not. A bleeding score is not a reason to withhold anticoagulation; fix the modifiable risks." },
drug: { n: "Choosing the anticoagulant and dose", tab: "dose", r: "DOAC (apixaban, dabigatran, rivaroxaban) over warfarin. Warfarin if CrCl under 30, moderate-severe mitral stenosis or a mechanical valve. Apixaban 2.5 mg twice daily needs 2 of: age 80+, weight 60 kg or less, creatinine 133 umol/L or more. Rivaroxaban 15 mg if CrCl 30-49." },
rate: { n: "Rate control choices", tab: "drill", r: "Stable and good LV function: beta-blocker or diltiazem. LV systolic dysfunction or marginal reserve: amiodarone, not diltiazem or verapamil. Digoxin is slow and an add-on." },
toe: { n: "The 48-hour rule", tab: "cv", r: "AF over 48 hours or of unknown duration: do not cardiovert unless left atrial thrombus is excluded by TOE (or you have anticoagulated for weeks first). Chemical conversion carries the same risk as a shock." },
post: { n: "Anticoagulation after cardioversion", tab: "cv", r: "Anticoagulate for at least 4 weeks (standard teaching; confirm in eTG), then continue by CHA2DS2-VA. Sinus rhythm does not remove the stroke risk." },
unstable: { n: "Recognising unstable AF", tab: "drill", r: "Hypotension, confusion, ischaemic chest pain or acute pulmonary oedema caused by the rate means urgent synchronised electrical cardioversion. Do not wait for a TOE or anticoagulation." },
shock: { n: "Doing the shock", tab: "aus", r: "Pads on, sedation per protocol with senior or anaesthetic help, synchronise to the R wave, start around 100 J biphasic and escalate (the Queensland ambulance protocol uses 100, 150, 200 J). Follow your hospital device protocol." },
wpw: { n: "Pre-excited AF", tab: "drill", r: "Irregular, wide, very fast rhythm in a young person, with a delta wave on an old ECG: no AV-nodal blockers (adenosine, verapamil, diltiazem, beta-blockers, digoxin). Pads on, call your senior and cardiology; electrical cardioversion is the safe default. This is standard teaching; I did not find it in the Australian sources I read." }
};
window.RMO_CASES = [
{
id: "c1", title: "Three days of fluttering", where: "Emergency department", time: "14:20", blurb: "Stable AF, unknown to anyone for three days. Tests the stroke score, the DOAC choice and the 48-hour rule.",
intro: "Triage note: 71-year-old man, three days of palpitations, now a bit short of breath on stairs. ECG done. Please review.",
vit: { hr: 112, sbp: 142, dbp: 88, spo2: 97, rr: 16 },
facts: ["71M; hypertension and type 2 diabetes; no previous stroke or TIA", "ECG: irregularly irregular narrow-complex rhythm, no P waves", "Chest clear; no oedema; not on an anticoagulant", "Weight 90 kg; creatinine 95 umol/L"],
decisions: [
{ tag: "first", scene: "The ECG shows AF. What do you do before you make treatment decisions?", opts: [
{ q: "best", t: "Bloods (electrolytes with K and Mg, TFTs, FBC, creatinine), check for a trigger such as alcohol, infection or thyroid disease, and arrange an echo", fb: "AF is usually a sign of something: thyroid, alcohol, sepsis, ischaemia, valve disease. The creatinine you send now also decides the anticoagulant dose." },
{ q: "ok", t: "Start a rate-control drug and sort out the bloods afterwards", fb: "Reasonable, since he is stable, but bloods are quick and you need creatinine for the dose decision anyway." },
{ q: "poor", t: "Book a TOE and cardioversion for today", fb: "Premature. Stroke risk, anticoagulation and the cause all come first, and he is not unstable." },
{ q: "poor", t: "Reassure him that AF is harmless and send him home", fb: "AF carries a clear stroke risk and a possible cause to find. It is not harmless." }
] },
{ tag: "score", scene: "Score his stroke risk using the Australian CHA2DS2-VA. He is 71, hypertensive and diabetic.", opts: [
{ q: "best", t: "Score 3 (age 65-74, hypertension, diabetes): anticoagulation recommended", fb: "Age 65-74 gives 1, hypertension 1, diabetes 1. A score of 2 or more means anticoagulate." },
{ q: "poor", t: "Score 1 (age only): consider anticoagulation", fb: "Hypertension and diabetes each count. Recount." },
{ q: "poor", t: "Score 0: no anticoagulation because there is no stroke or heart failure", fb: "A previous stroke is only one of the items. Age, hypertension and diabetes all score." },
{ q: "harm", t: "Skip anticoagulation because his HAS-BLED is 2", fb: "The Australian guideline says bleeding scores should not be used to withhold anticoagulation. Fix what is modifiable instead." }
] },
{ tag: "drug", reveal: ["Estimated CrCl about 80 mL/min (Cockcroft-Gault); weight 90 kg; creatinine 95 umol/L"], scene: "He needs an anticoagulant. His creatinine clearance is about 80 mL/min. What do you start?", opts: [
{ q: "best", t: "Apixaban 5 mg twice daily (none of the dose-reduction criteria met)", fb: "Age 71, weight 90 kg and creatinine 95 umol/L: zero of the three reduction criteria. Full dose." },
{ q: "best", t: "Rivaroxaban 20 mg once daily with food", fb: "Also correct: CrCl is above 50, so no dose reduction." },
{ q: "ok", t: "Warfarin, target INR 2 to 3", fb: "It works, but a DOAC is preferred in Australia unless CrCl is under 30, there is moderate-severe mitral stenosis or a mechanical valve." },
{ q: "poor", t: "Apixaban 2.5 mg twice daily to be safe", fb: "Under-dosing leaves him unprotected. Reduce only if two of the three criteria are met." },
{ q: "harm", t: "Aspirin 100 mg daily", fb: "Antiplatelet therapy is not recommended for stroke prevention in AF at any risk level." }
] },
{ tag: "rate", reveal: ["Bedside echo: normal LV function, no valve disease"], scene: "He is stable and the echo shows normal LV function. Heart rate 112. Which rate-control drug?", opts: [
{ q: "best", t: "A beta-blocker (for example metoprolol), titrated to symptoms and heart rate", fb: "First-line rate control with preserved LV function." , vit: { hr: 98 } },
{ q: "ok", t: "Diltiazem", fb: "Acceptable with normal LV function. Both a beta-blocker and diltiazem are first line.", vit: { hr: 100 } },
{ q: "poor", t: "Digoxin alone", fb: "Onset takes hours and rate control on its own is weak. It is an add-on." },
{ q: "harm", t: "IV amiodarone to convert him", fb: "Chemical cardioversion has the same stroke risk as a shock. AF for three days without therapeutic anticoagulation needs a TOE or weeks of anticoagulation first." }
] },
{ tag: "toe", scene: "He says: I start a new job tomorrow, can you shock me back into rhythm tonight?", opts: [
{ q: "best", t: "Not tonight. Over 48 hours means a TOE to exclude thrombus first, or weeks of anticoagulation. Rate control now, and plan cardioversion electively if needed", fb: "This is the 48-hour rule. Cardioversion can dislodge a clot sitting in the left atrial appendage." },
{ q: "ok", t: "Start heparin, then shock tonight", fb: "Heparin for a few hours does not make an AF of unknown duration safe to shock. Without a TOE you need weeks of anticoagulation." },
{ q: "poor", t: "Give one dose of apixaban and shock after the blood level rises", fb: "One dose does not replace weeks of therapeutic cover or a TOE." },
{ q: "harm", t: "Sedate him and shock him now: it usually works", fb: "It often works, and that is exactly how strokes happen around cardioversion in an under-anticoagulated patient." }
] },
{ tag: "post", scene: "Three weeks later he has been electively cardioverted after a TOE and is in sinus rhythm. He asks how long he needs the tablets.", opts: [
{ q: "best", t: "At least 4 weeks after cardioversion, then long term because his CHA2DS2-VA is 3. Sinus rhythm does not remove the risk. Review yearly", fb: "Post-cardioversion duration is the minimum. His score is what decides the long-term plan. The template says at least 10 days; standard teaching is longer, so check eTG." },
{ q: "poor", t: "Stop after 4 weeks: he is back in sinus rhythm", fb: "Recurrence is common and often silent, and the score still says he should be protected." },
{ q: "harm", t: "Stop as soon as the ECG shows sinus rhythm", fb: "The few weeks after cardioversion are when atrial stunning raises clot risk." }
] }
],
ends: { hi: "He goes home on a beta-blocker and apixaban, with an elective plan and a clear explanation of why not tonight.", mid: "He ends up safe, but a few steps skipped a rule you need to know cold.", lo: "Several decisions exposed him to stroke risk. Go back to the Anticoagulate? and Before cardioversion tabs in the Study Kit, then play again." }
},
{
id: "c2", title: "Fast and failing", where: "Medical ward 4B", time: "02:10", blurb: "AF with rapid rate in a patient with heart failure who then becomes unstable. Tests drug choice, the shock and the next-day anticoagulant.",
intro: "Nurse call: 76-year-old woman, day 2 of treatment for pneumonia. Her heart rate has jumped from 90 to 148 and she looks short of breath.",
vit: { hr: 148, sbp: 108, dbp: 66, spo2: 91, rr: 26 },
facts: ["76F; known heart failure with EF 25%; hypertension", "Admission ECG 36 hours ago: sinus rhythm; now irregularly irregular narrow complex at 148", "Crackles both bases; temperature 37.9", "Weight 62 kg; creatinine 118 umol/L; not on an anticoagulant"],
decisions: [
{ tag: "first", scene: "You arrive. What do you do in the first ten minutes?", opts: [
{ q: "best", t: "Sit her up, oxygen to the target, monitor, IV access, 12-lead ECG, bloods (K, Mg, troponin, lactate, creatinine, TFTs), tell your registrar, and look for triggers: sepsis, hypoxia, fluid status", vit: { spo2: 94 }, fb: "She is hypoxic and in a failing, septic-looking state. Basics, help and cause." },
{ q: "ok", t: "Oxygen and the ECG first, then bloods and a call to your senior", vit: { spo2: 94 }, fb: "Safe start, but the call to your senior should not wait." },
{ q: "poor", t: "Give an IV metoprolol bolus for the rate before assessing her", fb: "Beta-blockade in acute decompensated heart failure can drop her output. Assess and decide first." },
{ q: "harm", t: "Give a litre of fluid: she is septic and tachycardic", vit: { spo2: 87, rr: 30 }, fb: "She has crackles and EF 25%. A litre could push her into pulmonary oedema." }
] },
{ tag: "rate", scene: "BP 108/66, AF at 148, EF 25%. Which drug for the rate?", opts: [
{ q: "best", t: "IV amiodarone, with careful blood-pressure monitoring", fb: "Favoured with LV dysfunction and marginal reserve. It can drop the BP when bolused, so give it carefully.", vit: { hr: 140 } },
{ q: "ok", t: "Digoxin load as an add-on, while you treat the sepsis", fb: "Reasonable in heart failure but slow, and not enough on its own at 148.", vit: { hr: 144 } },
{ q: "poor", t: "IV metoprolol", fb: "Negatively inotropic in a patient already in acute failure. Avoid as first move.", vit: { hr: 140, sbp: 96, dbp: 58 } },
{ q: "harm", t: "IV diltiazem", fb: "Diltiazem and verapamil should not be used in LV systolic dysfunction. They can precipitate cardiogenic shock.", vit: { hr: 136, sbp: 82, dbp: 48, spo2: 89 } }
] },
{ tag: "unstable", vit: { hr: 150, sbp: 82, dbp: 50, spo2: 89, rr: 30 }, reveal: ["Now confused; cold hands; BP 82/50"], scene: "Ten minutes later she is confused with cold hands. BP is 82/50 and rate 150.", opts: [
{ q: "best", t: "This is unstable AF: urgent synchronised electrical cardioversion, with your registrar and the anaesthetic or ICU team", fb: "Hypotension and confusion caused by the rate are unstable features. The ECG on admission was sinus rhythm 36 hours ago, so the 48-hour rule is also met." },
{ q: "poor", t: "Another amiodarone dose and reassess in 20 minutes", fb: "Too slow. Unstable AF needs a shock now." },
{ q: "harm", t: "Give 2 litres of fluid and wait", fb: "She has EF 25% and crackles. Fluid will worsen pulmonary oedema and does not treat the cause." },
{ q: "harm", t: "More diltiazem", fb: "Diltiazem is contraindicated in LV systolic dysfunction and will lower the BP further." }
] },
{ tag: "shock", scene: "Pads are on. How do you deliver the shock?", opts: [
{ q: "best", t: "Sedation per protocol with the anaesthetic or ICU team, synchronised mode on (check the sync markers sit on the R wave), start about 100 J biphasic and escalate per protocol", vit: { hr: 88, sbp: 104, dbp: 62, spo2: 94, rr: 22 }, reveal: ["Sinus rhythm restored: HR 88, BP 104/62"], fb: "Sinus rhythm after one shock. In Queensland the ambulance protocol steps 100, 150, 200 J. Follow your hospital device protocol." },
{ q: "ok", t: "Synchronised shock at 200 J straight away", vit: { hr: 90, sbp: 102, dbp: 60, spo2: 94, rr: 22 }, reveal: ["Sinus rhythm restored: HR 90, BP 102/60"], fb: "It works, but start lower and escalate, so you use the least energy needed." },
{ q: "poor", t: "Wait for a TOE before you shock", fb: "She is unstable. Do not delay for a TOE. Her sinus rhythm 36 hours ago also puts onset under 48 hours." },
{ q: "harm", t: "Unsynchronised 200 J: there is no time to sync", fb: "A shock on a T wave can trigger VF. Synchronisation takes a button press." }
] },
{ tag: "score", reveal: ["Estimated CrCl about 35 mL/min; CHA2DS2-VA 4 (heart failure 1, hypertension 1, age 75+ 2)"], scene: "She is in sinus rhythm. Heart failure 1, hypertension 1, age 76 gives CHA2DS2-VA 4. Estimated CrCl 35 mL/min, weight 62 kg, creatinine 118 umol/L. What do you do about anticoagulation?", opts: [
{ q: "best", t: "Start apixaban 5 mg twice daily (age under 80, weight over 60 kg, creatinine under 133: no reduction criteria met) and continue long term", fb: "Score 4 means anticoagulate. CrCl 35 is above 30, so a DOAC is allowed. Apixaban needs two of the three criteria for a reduction, and she has none." },
{ q: "best", t: "Start rivaroxaban 15 mg once daily (CrCl 30-49)", fb: "Also correct. The reduced rivaroxaban dose applies at CrCl 30-49." },
{ q: "ok", t: "Warfarin", fb: "Works, but CrCl is above 30, so a DOAC is preferred." },
{ q: "harm", t: "Nothing: she is back in sinus rhythm", fb: "A score of 4 means anticoagulation, whatever the rhythm. Post-cardioversion stunning raises the clot risk too." },
{ q: "harm", t: "Aspirin", fb: "Antiplatelet therapy is not recommended for stroke prevention in AF." }
] }
],
ends: { hi: "She is in sinus rhythm, anticoagulated, and you treated the pneumonia that probably started it.", mid: "She came through, but a drug choice or a delay cost her stability.", lo: "She nearly got worse with the wrong drug. Go back to the Shock or drug tab in the Study Kit, then play again." }
},
{
id: "c3", title: "Wide, fast and irregular", where: "Emergency resus bay", time: "03:30", blurb: "A young man with an irregular wide-complex tachycardia. Tests the one rule that kills if you forget it.",
intro: "Resus call: 27-year-old man, 40 minutes of rapid palpitations. Fit and well otherwise. ECG shows a very fast, irregular, wide-complex rhythm.",
vit: { hr: 215, sbp: 112, dbp: 70, spo2: 98, rr: 20 },
facts: ["27M, previous short episodes of fast palpitations since his teens; no medicines", "ECG: irregular broad-complex tachycardia, QRS width varies beat to beat", "Chest clear; alert and talking", "Nurse has already drawn up verapamil and adenosine"],
decisions: [
{ tag: "wpw", scene: "He is stable but the rate is 215 and irregular. What do you do first?", opts: [
{ q: "best", t: "Monitor, pads on, IV access, 12-lead ECG, find his old ECGs, and call your senior and cardiology now", fb: "An irregular rate over 200 with varying QRS width in a young man should make you think of AF conducting down an accessory pathway. Pads on, because it can degenerate to VF." },
{ q: "harm", t: "Treat it as SVT: give adenosine 6 mg", vit: { hr: 235, sbp: 98, dbp: 56 }, fb: "Adenosine blocks the AV node and can speed conduction down the accessory pathway. It is not for irregular wide-complex tachycardia." },
{ q: "poor", t: "Treat it as VT and give IV amiodarone", fb: "Irregular and varying QRS width points away from VT. Amiodarone is also usually avoided in pre-excited AF. Think first, ask your senior." }
] },
{ tag: "wpw", reveal: ["Old clinic ECG in his notes: short PR interval and a delta wave"], scene: "His old ECG in the notes shows a short PR and a delta wave. The nurse hands you the verapamil. What do you say?", opts: [
{ q: "best", t: "No verapamil, diltiazem, beta-blocker, digoxin or adenosine. This is pre-excited AF", fb: "AV-nodal blockers can push more impulses down the accessory pathway and trigger VF." },
{ q: "harm", t: "Give the verapamil slowly over 10 minutes", vit: { hr: 240, sbp: 88, dbp: 52 }, fb: "Going slowly does not make it safe. The risk is the drug, not the speed." },
{ q: "harm", t: "Give a beta-blocker instead, as it is gentler", vit: { hr: 235, sbp: 92, dbp: 54 }, fb: "Same problem: it blocks the AV node and leaves the accessory pathway unopposed." }
] },
{ tag: "wpw", scene: "He is still stable. Your senior is on the way. What is the safest plan for restoring rhythm?", opts: [
{ q: "best", t: "Prepare for sedated, synchronised electrical cardioversion as the safe default, and let the senior and cardiology choose any drug option", fb: "Electrical cardioversion avoids the AV-nodal blocker trap. Drug choices in pre-excited AF belong to a senior or cardiologist." },
{ q: "poor", t: "Observe him for 24 hours and see if it settles", fb: "At 215 per minute with a pathway conducting freely, he can deteriorate into VF. Treat." },
{ q: "poor", t: "Give IV amiodarone", fb: "Amiodarone is usually avoided in pre-excited AF too. Cardiology decide." }
] },
{ tag: "unstable", vit: { hr: 230, sbp: 84, dbp: 50, spo2: 96, rr: 24 }, reveal: ["BP falling to 84/50; now drowsy; rate 230"], scene: "Before the senior arrives, his BP falls to 84/50. He is drowsy and the rate is 230.", opts: [
{ q: "best", t: "Sedate and deliver a synchronised shock now", vit: { hr: 74, sbp: 118, dbp: 72, spo2: 98, rr: 16 }, reveal: ["Sinus rhythm: delta wave visible, HR 74"], fb: "Hypotension and drowsiness make this unstable. Shock first." },
{ q: "poor", t: "Wait for cardiology to arrive", fb: "He is unstable now. Waiting risks VF." },
{ q: "poor", t: "Give a 1 litre fluid bolus and recheck", fb: "Fluid will not fix a rate this fast. He needs the shock." }
] },
{ tag: "wpw", scene: "He is in sinus rhythm and feels fine. He asks to go home. What do you do?", opts: [
{ q: "best", t: "Keep him monitored and refer to cardiology and electrophysiology to consider ablation. Do not send him out on an AV-nodal blocker", fb: "The accessory pathway is the problem and ablation is the usual definitive answer." },
{ q: "poor", t: "Discharge on metoprolol with GP follow-up", fb: "The pathway is still there and the first drug you give him may be the one that makes the next episode dangerous." },
{ q: "poor", t: "Discharge with no follow-up: it was a one-off", fb: "He has had episodes since his teens. The risk of a worse episode is real." }
] }
],
ends: { hi: "He is in sinus rhythm, watched by cardiology, and the verapamil stayed in the bag.", mid: "He survives the night, but at one point the plan was less safe than it needed to be.", lo: "A drug from your list nearly caused VF. Go back to the Shock or drug tab in the Study Kit, read the pre-excited AF scenario, and play again." }
},
{
id: "c20261111a", title: "Day 3 and falling", where: "Surgical ward", time: "22:40", blurb: "New fast AF after bowel surgery that becomes unstable. Tests how to deliver the shock, what to do when it fails, and the trigger.",
intro: "MET call: 67-year-old man, day 3 after a bowel resection. New AF at 168, BP 82/50, clammy and confused.",
vit: { hr: 168, sbp: 82, dbp: 50, spo2: 93, rr: 26 },
facts: ["67M; day 3 after right hemicolectomy", "Sinus rhythm on this morning's observations", "Temperature 38.3; abdomen more tender tonight", "Afternoon bloods: K 3.2 mmol/L"],
decisions: [
{ tag: "unstable", scene: "Rate 168, BP 82/50, confused. What is your plan?", opts: [
{ q: "best", t: "Unstable AF: pads on, call your registrar and the anaesthetic or ICU team, prepare for urgent synchronised cardioversion", fb: "Low BP and confusion caused by the rate make this unstable. Onset was today, so the 48-hour rule is met anyway." },
{ q: "poor", t: "IV metoprolol to slow the rate first", vit: { hr: 150, sbp: 72, dbp: 42 }, fb: "A negative inotrope in a hypotensive patient. Unstable AF needs the shock." },
{ q: "poor", t: "Wait for a TOE", fb: "Never delay a shock for TOE when the patient is unstable." }
] },
{ tag: "shock", scene: "The anaesthetist is sedating him. You have the defibrillator. How do you set it up?", opts: [
{ q: "best", t: "Synchronised mode on, check the sync markers sit on each R wave, start around 100 J biphasic and escalate per protocol", fb: "Least energy that works, stepped up if needed. In Queensland the ambulance protocol steps 100, 150, 200 J; follow your hospital device protocol." },
{ q: "ok", t: "Synchronised 200 J for the first shock", fb: "Same as last time: it may work, but start lower and escalate." },
{ q: "harm", t: "Unsynchronised shock to save time", fb: "A shock on the T wave can cause VF. Sync is one button." }
] },
{ tag: "shock", vit: { hr: 160, sbp: 80, dbp: 48, spo2: 93, rr: 26 }, reveal: ["After the first shock: still AF at 160, BP 80/48"], scene: "First shock: still in AF. What next?", opts: [
{ q: "best", t: "Check sync is back on (many defibrillators switch it off after each shock), then shock again at the next energy step; consider changing the pad position", vit: { hr: 98, sbp: 106, dbp: 64, spo2: 95, rr: 20 }, reveal: ["Sinus rhythm 98, BP 106/64"], fb: "Escalate energy; re-select sync before each shock on devices that reset. Check your own hospital's defibrillator." },
{ q: "harm", t: "Shock again straight away at the same energy without checking the mode", fb: "If the device has reset to unsynchronised, this shock can land on a T wave." },
{ q: "poor", t: "Abandon shocks and load digoxin", fb: "Digoxin takes hours. He is unstable now." }
] },
{ tag: "first", scene: "Sinus rhythm, BP 106/64. What now?", opts: [
{ q: "best", t: "Find and fix the trigger: sepsis from a possible anastomotic leak (cultures, lactate, antibiotics, urgent surgical review and imaging), replace potassium and check magnesium, review fluids", fb: "Post-operative AF is usually a sign of something. Fix the cause or it will come back." },
{ q: "poor", t: "Start an amiodarone infusion and leave it at that", fb: "It may hold the rhythm, but it misses the leak and the low potassium." }
] }
],
ends: { hi: "Right shock, right energy, sync re-checked, and the trigger found.", mid: "He is in sinus rhythm, but one step was riskier than it needed to be.", lo: "Review the shock steps in the Study Kit and replay." }
}
];
