/* Cases for tachy_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
first: { n: "First moves", tab: "1", r: "Oxygen if low, monitor, IV access, pads on, 12-lead ECG if stable, bloods (K, Mg, creatinine, troponin, glucose, thyroid tests), and call your registrar early." },
adverse: { n: "Stable or unstable?", tab: "2", r: "ANZCOR adverse signs: systolic BP under 90, heart rate over 150, chest pain, heart failure, drowsy or confused, when caused by the rhythm. Unstable means synchronised cardioversion with sedation, not drugs first." },
svt: { n: "Narrow regular: vagal then adenosine", tab: "5", r: "Stable SVT: Valsalva (ideally the modified version), then adenosine 6 mg rapid bolus with a 20 mL flush, then 12 mg, which may be repeated. Verapamil 2.5-5 mg or diltiazem 15-20 mg if adenosine is unsuitable or fails." },
wide: { n: "Wide and regular: treat as VT", tab: "5", r: "A wide regular tachycardia of unknown origin is treated as VT. Treating SVT as VT is less likely to harm than the reverse. Never give verapamil or diltiazem." },
amio: { n: "Amiodarone for stable VT", tab: "5", r: "Stable: amiodarone 300 mg IV over 20-60 minutes, then 900 mg over 24 hours, with expert help and readiness to shock." },
failshock: { n: "When the shock fails", tab: "2", r: "If cardioversion fails, ANZCOR gives amiodarone 300 mg IV over 10-20 minutes, then repeat the shock, then 900 mg over 24 hours." },
torsades: { n: "Torsades: magnesium, not amiodarone", tab: "6", r: "Stop QT-prolonging drugs, correct potassium, magnesium 5 mmol IV over 10 minutes (may repeat once), then 20 mmol over 4 hours. Avoid amiodarone. Any adverse sign: synchronised cardioversion." },
after: { n: "After the rhythm is fixed", tab: "7", r: "Repeat the 12-lead ECG, check potassium and magnesium, find and remove the cause, review the drug chart, and tell your senior or cardiology." }
};
window.RMO_CASES = [
{
id: "c1", title: "Palpitations in the ED", where: "Emergency department", time: "15:10", blurb: "A young woman with a narrow, regular fast rhythm. Tests stable versus unstable, vagal manoeuvres and adenosine.",
intro: "Triage: 28-year-old woman, two hours of sudden palpitations. She feels well otherwise. ECG done.",
vit: { hr: 168, sbp: 118, dbp: 74, spo2: 98, rr: 18 },
facts: ["28F; fit and well; two similar episodes before that stopped on their own", "No chest pain; mildly anxious; two energy drinks today", "ECG: narrow regular rhythm at 168, no clear P waves", "Alert and talking in full sentences"],
decisions: [
{ tag: "first", scene: "You see her in the resus bay. What do you do first?", opts: [
{ q: "best", t: "Monitor, pads on, IV access, 12-lead ECG, bloods (K, Mg, TSH, glucose), and ask about triggers", fb: "She looks stable, but pads and access go on first in case she is not. The 12-lead and bloods take two minutes." },
{ q: "ok", t: "Go straight to adenosine and sort out the rest afterwards", fb: "Reasonable in a stable patient, but you want pads on and an ECG recorded first." },
{ q: "poor", t: "Charge the defibrillator and shock her", fb: "She is comfortable with a normal pressure. A shock needs sedation and is not first line here." },
{ q: "harm", t: "Give IV metoprolol and verapamil together", fb: "Two AV-nodal blockers at once can cause severe bradycardia or asystole." }
] },
{ tag: "adverse", scene: "BP is 118/74, she is comfortable and alert. Is she unstable?", opts: [
{ q: "best", t: "Not unstable: she has no hypotension, chest pain, failure or confusion. Keep pads on and be ready to shock if that changes", fb: "ANZCOR lists a rate over 150 among its adverse signs, but with a normal BP and no other signs, trying vagal manoeuvres then adenosine first is the usual approach. This is a judgement call, so say so to your senior." },
{ q: "poor", t: "Unstable because the rate is over 150: shock her now", fb: "The rate alone, in a comfortable patient with a normal pressure, does not usually mean an immediate shock. Look at the whole patient." },
{ q: "poor", t: "Ignore the rate: it is only palpitations", fb: "A rate of 168 can fail quickly. Stay alert and keep the pads on." }
] },
{ tag: "svt", scene: "She is stable and the rhythm looks like SVT. What is the first treatment?", opts: [
{ q: "best", t: "Modified Valsalva: strain into a 10 mL syringe for 15 seconds, then lie flat and raise the legs for 15 seconds", reveal: ["After the vagal manoeuvre: still 168"], fb: "The modified version works far more often than the standard one (about 43% in the largest trial, against 5-20%), and it is harmless." },
{ q: "ok", t: "Standard Valsalva", reveal: ["After the vagal manoeuvre: still 168"], fb: "Right idea, but it works less often than the modified version." },
{ q: "poor", t: "Adenosine 12 mg straight away", fb: "Start with the harmless step, and start adenosine at 6 mg." },
{ q: "poor", t: "Carotid sinus massage", fb: "ANZCOR names Valsalva, not carotid massage. It is not first choice here." }
] },
{ tag: "svt", scene: "The vagal manoeuvre has not worked. Next?", opts: [
{ q: "best", t: "Adenosine 6 mg rapid IV bolus into a large vein, flush with at least 20 mL, and 12 mg if there is no response", vit: { hr: 82, sbp: 122, dbp: 76 }, reveal: ["After adenosine 6 mg: a few seconds of pause, then sinus rhythm at 82"], fb: "This is the ANZCOR sequence. Adenosine lasts seconds, so it must go in as a fast bolus followed by a fast flush. Warn her that she will feel odd for a moment." },
{ q: "ok", t: "Verapamil 2.5-5 mg IV over 2 minutes", vit: { hr: 90, sbp: 108, dbp: 66 }, fb: "ANZCOR lists it when adenosine is unsuitable or fails. Adenosine comes first." },
{ q: "poor", t: "Adenosine 6 mg as a slow infusion over 2 minutes", fb: "It is broken down in seconds, so a slow infusion does nothing. It needs a rapid bolus and a flush." },
{ q: "harm", t: "Amiodarone 300 mg over 20 minutes", fb: "Not the choice for narrow regular SVT, and it is slow." }
] },
{ tag: "after", scene: "She is back in sinus rhythm at 82 and feels fine. What next?", opts: [
{ q: "best", t: "Repeat the 12-lead ECG (look for a delta wave), explain that it can come back and what triggers it, and arrange cardiology or GP follow-up", fb: "A post-conversion ECG can show pre-excitation, which changes the long-term plan." },
{ q: "poor", t: "Discharge without another ECG, since she looks well", fb: "You would miss a delta wave or other changes." },
{ q: "harm", t: "Start a long-term beta-blocker and verapamil", fb: "Starting two nodal blockers without a plan or an ECG review is not safe." }
] }
],
ends: { hi: "She is in sinus rhythm with a plan. The harmless step came first, and the drug went in the right way.", mid: "She converted, but a step skipped the order or the technique.", lo: "Several decisions missed the stable pathway. Go through steps 2 and 5 of the Study Kit and play again." }
},
{
id: "c2", title: "Wide and fast on the ward", where: "Medical ward 3A", time: "01:30", blurb: "A man with an old heart attack and a wide regular tachycardia that becomes unstable. Tests VT, amiodarone and the shock.",
intro: "Nurse call: 67-year-old man, admitted with a chest infection. Now 'racing heart'. The monitor shows a wide, fast rhythm.",
vit: { hr: 172, sbp: 112, dbp: 70, spo2: 96, rr: 20 },
facts: ["67M; previous anterior MI five years ago; known EF about 35%", "Admitted yesterday with pneumonia; on antibiotics", "ECG: wide regular tachycardia at 172, QRS about 160 ms", "Alert; mild palpitations; no chest pain"],
decisions: [
{ tag: "wide", scene: "The ECG shows a wide, regular rhythm at 172. He has had a heart attack before. How do you treat it?", opts: [
{ q: "best", t: "Treat it as VT: pads on, monitor, call your senior, and prepare for amiodarone or a shock", fb: "In doubt, a wide regular tachycardia is VT. Wrongly treating SVT as VT does less harm than the reverse." },
{ q: "poor", t: "It might be SVT with block: give adenosine", fb: "Adenosine is not the right assumption here. Treat as VT first." },
{ q: "harm", t: "Give IV verapamil: it is a regular tachycardia", fb: "Verapamil and diltiazem should not be used for wide tachycardia of unknown origin, especially with a weak heart. They can cause collapse." }
] },
{ tag: "amio", scene: "He is stable: BP 112/70, comfortable. What drug and how?", opts: [
{ q: "best", t: "Amiodarone 300 mg IV over 20-60 minutes, then 900 mg over 24 hours, with expert help and the pads on", fb: "This is the stable VT route in ANZCOR. Be ready to shock if he deteriorates." },
{ q: "ok", t: "Arrange synchronised cardioversion with sedation straight away", fb: "Acceptable if the drug is slow or he is worsening, but it needs sedation and senior or anaesthetic help." },
{ q: "poor", t: "Lignocaine bolus", fb: "ANZCOR calls it reasonable for stable VT in acute ischaemia and gives no dose. Amiodarone is the usual first drug here." },
{ q: "harm", t: "Diltiazem 15-20 mg IV", fb: "Wide tachycardia of unknown origin and a weak heart: do not give diltiazem." }
] },
{ tag: "adverse", vit: { hr: 176, sbp: 78, dbp: 44, spo2: 92, rr: 26 }, reveal: ["Ten minutes later: drowsy, BP 78/44, cool hands"], scene: "While the amiodarone runs he becomes drowsy and cold. BP is 78/44, rate 176. What now?", opts: [
{ q: "best", t: "Synchronised cardioversion with sedation, with your senior and the anaesthetic team", fb: "Hypotension and drowsiness caused by the rhythm are adverse signs. Stop waiting for the drug." },
{ q: "poor", t: "Give a second amiodarone bolus and reassess in 20 minutes", fb: "Too slow. An unstable patient needs a shock now." },
{ q: "harm", t: "Give 2 litres of fluid and wait", fb: "He has EF 35%. Fluid will not fix a rhythm problem and may cause pulmonary oedema." }
] },
{ tag: "failshock", reveal: ["After the first synchronised shock: still VT at 170, BP 76/40"], scene: "The first shock does not work. He is still in VT with a low pressure. What next?", opts: [
{ q: "best", t: "Amiodarone 300 mg IV over 10-20 minutes, then repeat the synchronised shock, then 900 mg over 24 hours", vit: { hr: 84, sbp: 104, dbp: 62 }, fb: "This is the ANZCOR sequence for a failed shock." },
{ q: "poor", t: "Repeat the same shock again and again without any drug", fb: "ANZCOR adds amiodarone before repeating the shock." },
{ q: "harm", t: "Switch to verapamil", fb: "Never for a wide tachycardia, and especially not with a weak heart and low pressure." }
] },
{ tag: "after", scene: "He is in sinus rhythm at 84, BP 104/62. What is the plan?", opts: [
{ q: "best", t: "12-lead ECG, check K and Mg, troponin, review drugs and the pneumonia as triggers, continue the 24-hour amiodarone, and involve cardiology", fb: "Find the trigger and correct it. VT in a patient with an old MI needs cardiology." },
{ q: "poor", t: "Send him back to a ward bed with normal observations", fb: "He needs continuous monitoring after VT and a shock." },
{ q: "harm", t: "Stop everything now that the rhythm is fixed", fb: "The trigger remains and VT can return." }
] }
],
ends: { hi: "He is in sinus rhythm, monitored and with cardiology involved. Wide and regular meant VT, and you acted on it.", mid: "He survives, but a step delayed the shock or used the wrong drug.", lo: "A dangerous drug or a delay put him at risk. Go through steps 2, 5 and 6 of the Study Kit and play again." }
},
{
id: "c3", title: "Twisting wide beats", where: "Surgical ward 5C", time: "04:20", blurb: "A woman on QT-prolonging drugs with torsades. Tests the magnesium and the amiodarone trap.",
intro: "Nurse call: 58-year-old woman, day 2 after bowel surgery, runs of fast irregular wide beats on the monitor, now dizzy.",
vit: { hr: 150, sbp: 100, dbp: 62, spo2: 96, rr: 18 },
facts: ["58F; two days after bowel surgery; vomiting and a poor intake", "Drug chart: ondansetron, haloperidol and a macrolide antibiotic", "ECG earlier today: QTc 520 ms", "Monitor: runs of twisting wide complexes that start and stop"],
decisions: [
{ tag: "torsades", scene: "The wide beats twist around the baseline and the earlier QTc was long. What is the rhythm and the first priority?", opts: [
{ q: "best", t: "Torsades de pointes: stop the QT-prolonging drugs, put pads on, check K and Mg, and call your senior", fb: "Long QT plus twisting complexes is torsades. Removing the drugs and correcting electrolytes is the base of treatment." },
{ q: "poor", t: "Monomorphic VT: start amiodarone", fb: "The beats twist: it is polymorphic. Amiodarone can make torsades worse." },
{ q: "harm", t: "Give another dose of haloperidol for her distress", fb: "It prolongs the QT further." }
] },
{ tag: "torsades", scene: "What is your first drug?", opts: [
{ q: "best", t: "Magnesium 5 mmol IV over 10 minutes (may repeat once), then 20 mmol over 4 hours", reveal: ["Bloods: K 2.9 mmol/L, Mg 0.5 mmol/L"], fb: "This is the ANZCOR regimen. It works even when the magnesium level is normal." },
{ q: "poor", t: "Lignocaine bolus", reveal: ["Bloods: K 2.9 mmol/L, Mg 0.5 mmol/L"], fb: "The US template lists lignocaine, but ANZCOR does not for torsades. Magnesium is first." },
{ q: "harm", t: "Amiodarone 300 mg IV", reveal: ["Bloods: K 2.9 mmol/L, Mg 0.5 mmol/L"], fb: "ANZCOR says to avoid amiodarone in torsades, because it prolongs the QT and may worsen it." }
] },
{ tag: "torsades", scene: "The bloods show potassium 2.9 and magnesium 0.5. What do you do about them?", opts: [
{ q: "best", t: "Replace potassium and magnesium per your protocol, with continuous monitoring and repeat levels", fb: "Low potassium is a major driver of torsades. Correct it, aiming for a normal range per your hospital protocol." },
{ q: "poor", t: "Replace magnesium only", fb: "Potassium is just as important. Fix both." },
{ q: "harm", t: "Leave electrolytes until the morning", fb: "Torsades can return any minute while the potassium stays low." }
] },
{ tag: "adverse", vit: { hr: 160, sbp: 76, dbp: 40, spo2: 93, rr: 24 }, reveal: ["Torsades is now sustained: drowsy, BP 76/40, still has a pulse"], scene: "The torsades becomes sustained. She is drowsy with BP 76/40 but has a pulse. What now?", opts: [
{ q: "best", t: "Synchronised cardioversion with sedation per your protocol, with senior and anaesthetic help (and if she loses her pulse, move to the arrest algorithm)", vit: { hr: 78, sbp: 108, dbp: 64 }, fb: "ANZCOR says to arrange immediate synchronised cardioversion if adverse signs develop. A pulseless patient follows the cardiac arrest algorithm." },
{ q: "poor", t: "Another magnesium dose and watch", fb: "The magnesium may be repeated once, but with adverse signs she needs the shock now." },
{ q: "harm", t: "Amiodarone 300 mg IV", fb: "Avoid it in torsades." }
] },
{ tag: "after", scene: "She is back in sinus rhythm at 78. How do you keep her safe?", opts: [
{ q: "best", t: "Stop ondansetron, haloperidol and the macrolide (choose alternatives), keep K and Mg normal, repeat the ECG for the QTc, keep her on a monitor and tell your senior", fb: "Remove every QT-prolonging drug you can and keep electrolytes normal. Recheck the QTc." },
{ q: "poor", t: "Stop only the antiemetic", fb: "Several drugs are prolonging the QT. Review the whole chart." },
{ q: "harm", t: "Restart the haloperidol at a lower dose", fb: "Any dose still prolongs the QT in someone who has just had torsades." }
] }
],
ends: { hi: "She is back in sinus rhythm, the culprit drugs are off and the electrolytes are normal. You avoided the amiodarone trap.", mid: "She recovers, but a step gave a drug the guidelines advise against.", lo: "Several decisions put her at risk. Go through step 6 of the Study Kit and play again." }
},
{
id: "c20261113a", title: "Racing on the orthopaedic ward", where: "Orthopaedic ward", time: "23:50", blurb: "A man the day after knee surgery with a narrow, regular rhythm at 188. Tests the whole-patient stability call and how adenosine must be given.",
intro: "Nurse call: 46-year-old man, day 1 after a knee replacement. Heart racing for 20 minutes. The monitor shows a narrow, fast, regular rhythm.",
vit: { hr: 188, sbp: 128, dbp: 80, spo2: 97, rr: 18 },
facts: ["46M; fit; had 'racing heart' episodes at university that stopped on their own", "Pain controlled; drinking well; no chest pain or breathlessness", "ECG: narrow regular rhythm at 188, no visible P waves", "Only IV access: a small 22G cannula in the back of the left hand"],
decisions: [
{ tag: "first", scene: "You arrive at the bedside. What do you do first?", opts: [
{ q: "best", t: "Monitor and pads on, a 12-lead ECG, a larger cannula in the elbow crease, bloods (K, Mg, Hb, troponin), and tell your registrar", fb: "Everything that keeps him safe goes on before any drug: pads in case he worsens, an ECG on record, and access that adenosine can actually reach the heart through." },
{ q: "ok", t: "Ask him to do a Valsalva straight away, then sort out the ECG and access", fb: "Harmless, but you lose the ECG of the rhythm if it stops, and you still need pads and good access." },
{ q: "poor", t: "Chart oral metoprolol and review in an hour", fb: "Too slow, and it skips the assessment. A rate of 188 needs you at the bedside now." },
{ q: "harm", t: "Give IV verapamil and IV metoprolol together to slow him quickly", fb: "Two AV-nodal blockers together can cause profound bradycardia or asystole." }
] },
{ tag: "adverse", scene: "His rate is 188, BP 128/80. He is alert, warm and has no chest pain. Is he unstable?", opts: [
{ q: "best", t: "Not unstable on the whole picture: normal BP, no chest pain, no failure, fully alert. Treat on the stable pathway with pads on, and say to your senior that the rate is over 150", fb: "ANZCOR lists a heart rate over 150 among its adverse signs, but the decision rests on whether the rhythm is harming him. Here nothing else is wrong, so vagal manoeuvres and adenosine come first, with the shock ready if he worsens." },
{ q: "poor", t: "Unstable because the rate is over 150: sedate and shock him now", fb: "This is the same trap as before. A comfortable patient with a normal BP does not usually need an immediate shock. Look at the whole patient, not one number." },
{ q: "poor", t: "Stable, so the pads can come off", fb: "Stable can change in minutes at 188. Keep the pads on." }
] },
{ tag: "svt", reveal: ["After a modified Valsalva: still 188"], scene: "A modified Valsalva has not worked. Adenosine 6 mg is drawn up. How do you give it?", opts: [
{ q: "best", t: "Through the new cannula in the elbow crease: 6 mg as a rapid push, followed at once by a rapid flush of at least 20 mL, with the ECG running", fb: "Adenosine is broken down in seconds. It must reach the heart as one quick bolus, so give it into a large vein close to the heart and chase it with a fast flush." },
{ q: "ok", t: "Through the hand cannula as a rapid push with a rapid flush", fb: "It may work, but a small distal vein delays it. If it fails, you will not know whether the drug or the route failed." },
{ q: "poor", t: "Dilute it in 100 mL and run it over 10 minutes", fb: "It is gone in seconds, so a slow infusion does nothing. The same mistake as a slow injection." },
{ q: "poor", t: "Push it slowly over 2 minutes so he does not feel unwell", fb: "Slow pushes do not work. Warn him that he will feel strange for a few seconds instead." }
] },
{ tag: "svt", reveal: ["After adenosine 6 mg: a brief slowing, then back to 188"], scene: "The 6 mg dose slowed him for a second, then the rate came back. What next?", opts: [
{ q: "best", t: "Adenosine 12 mg the same way (rapid bolus and flush); a further 12 mg may be given if needed", vit: { hr: 84, sbp: 126, dbp: 78 }, reveal: ["After adenosine 12 mg: a short pause, then sinus rhythm at 84"], fb: "This is the ANZCOR sequence: 6 mg, then 12 mg, which may be repeated." },
{ q: "ok", t: "Verapamil 2.5-5 mg IV over 2 minutes", vit: { hr: 92, sbp: 112, dbp: 70 }, fb: "ANZCOR lists it when adenosine is unsuitable or fails, but the 12 mg dose comes first." },
{ q: "poor", t: "Repeat 6 mg, given slowly this time", fb: "The dose should go up to 12 mg, and it must always be fast." },
{ q: "harm", t: "Amiodarone 300 mg IV over 20 minutes", fb: "Not the drug for a stable narrow regular SVT, and you have not finished the adenosine steps." }
] },
{ tag: "after", scene: "He is in sinus rhythm at 84 and feels fine. What next?", opts: [
{ q: "best", t: "Repeat the 12-lead ECG (look for a delta wave), check K and Mg, explain that it can come back, document it, and arrange cardiology or GP follow-up", fb: "A delta wave on the sinus ECG means pre-excitation, which changes the long-term plan. Recurrent episodes suggest a referral for possible ablation." },
{ q: "poor", t: "Nothing more: the rhythm is fixed", fb: "You miss the ECG clues and leave him without a plan if it recurs." },
{ q: "harm", t: "Start regular verapamil and metoprolol together tonight", fb: "Two nodal blockers without a review or a plan is not safe." }
] }
],
ends: { hi: "He is in sinus rhythm. You judged stability on the whole patient and got the adenosine to the heart.", mid: "He converted, but a step judged stability on one number or gave adenosine the slow way.", lo: "Several decisions missed the stable pathway. Go through steps 2 and 5 of the Study Kit and play again." }
},
{
id: "c20261113b", from: "c2", title: "Wide and regular in recovery", where: "Post-anaesthesia recovery", time: "16:40", blurb: "A woman with a weak heart develops a wide regular tachycardia after a hip operation. Tests VT, amiodarone and what to do when the shock fails.",
intro: "Recovery nurse call: 74-year-old woman, one hour after a hip replacement. The monitor has changed to a wide, fast, regular rhythm.",
vit: { hr: 178, sbp: 106, dbp: 64, spo2: 95, rr: 20 },
facts: ["74F; ischaemic cardiomyopathy; EF about 30%", "Spinal anaesthetic; awake and talking", "ECG: wide regular tachycardia at 178, QRS about 170 ms", "Bloods this morning: K 3.3 mmol/L"],
decisions: [
{ tag: "wide", scene: "The registrar on the phone wonders if this is SVT with a bundle branch block. How do you treat it?", opts: [
{ q: "best", t: "As VT until proven otherwise: pads on, monitor, call your senior, and get ready for amiodarone or a shock", fb: "With a weak, scarred heart, a wide regular tachycardia is almost always VT. Treating SVT as VT does less harm than the reverse." },
{ q: "poor", t: "Give adenosine to see what it does", fb: "Not the safe assumption in a patient with known heart disease. Treat it as VT." },
{ q: "harm", t: "Give IV verapamil because it is regular", fb: "Verapamil and diltiazem must not be given for a wide tachycardia of unknown origin, least of all with an EF of 30%. They can cause collapse." }
] },
{ tag: "amio", scene: "She is stable: BP 106/64, alert, no chest pain. Which drug and how?", opts: [
{ q: "best", t: "Amiodarone 300 mg IV over 20-60 minutes, then 900 mg over 24 hours, with expert help, the pads on, and potassium replaced", fb: "The stable VT route in ANZCOR. Correcting the low potassium removes one trigger." },
{ q: "ok", t: "Sedated synchronised cardioversion straight away", fb: "Acceptable if she worsens or the drug is slow, but it needs sedation and anaesthetic help." },
{ q: "harm", t: "Diltiazem 15-20 mg IV", fb: "A wide tachycardia and a weak heart: never diltiazem." }
] },
{ tag: "adverse", vit: { hr: 182, sbp: 80, dbp: 46, spo2: 92, rr: 26 }, reveal: ["Fifteen minutes later: chest tightness, BP 80/46, clammy"], scene: "Halfway through the amiodarone she gets chest tightness and her BP falls to 80/46. What now?", opts: [
{ q: "best", t: "Synchronised cardioversion with sedation, with your senior and the anaesthetist (who is in the recovery room)", fb: "Low BP and chest pain caused by the rhythm are adverse signs. Stop waiting for the drug." },
{ q: "poor", t: "Speed up the amiodarone and recheck in 15 minutes", fb: "Too slow. Adverse signs mean a shock now." },
{ q: "harm", t: "A 1 L fluid bolus and wait", fb: "Fluid does not fix the rhythm, and with an EF of 30% it may cause pulmonary oedema." }
] },
{ tag: "failshock", reveal: ["After the first synchronised shock: still VT at 176, BP 78/44"], scene: "The first shock fails. She is still in VT with a low BP. What next?", opts: [
{ q: "best", t: "Amiodarone 300 mg IV over 10-20 minutes, then repeat the synchronised shock, then 900 mg over 24 hours", vit: { hr: 88, sbp: 102, dbp: 60 }, fb: "This is the ANZCOR sequence when a shock fails." },
{ q: "poor", t: "Keep repeating the same shock with no drug", fb: "ANZCOR adds amiodarone before the next shock." },
{ q: "harm", t: "Give verapamil now that the shock has failed", fb: "Never for a wide tachycardia, and not with a low BP." }
] },
{ tag: "after", scene: "She is in sinus rhythm at 88, BP 102/60. What is the plan?", opts: [
{ q: "best", t: "12-lead ECG, K and Mg to the normal range, troponin, continue the 24-hour amiodarone, a monitored bed, and cardiology review", fb: "Correct the triggers and keep her monitored. VT with a weak heart needs cardiology, who will consider longer-term options such as an ICD." },
{ q: "poor", t: "Back to the orthopaedic ward on routine observations", fb: "She needs continuous monitoring after VT and a shock." },
{ q: "harm", t: "Stop the amiodarone now that she is in sinus rhythm", fb: "The trigger and the scarred heart remain, and VT can come back." }
] }
],
ends: { hi: "She is in sinus rhythm, monitored, with the potassium fixed and cardiology involved. You treated wide and regular as VT.", mid: "She survived, but a step delayed the shock or gave the wrong drug.", lo: "A dangerous drug or a delay put her at risk. Go through steps 2, 5 and 6 of the Study Kit and play again." }
},
{
id: "c20261113c", from: "c3", title: "Twisting on the medical ward", where: "Medical ward", time: "02:10", blurb: "A man on sotalol with diarrhoea and low potassium develops torsades, then loses his pulse. Tests magnesium, the electrolytes and the arrest step.",
intro: "Nurse call: 76-year-old man, day 3 with gastroenteritis. Short runs of wide, twisting beats on the monitor. He says he feels faint.",
vit: { hr: 140, sbp: 104, dbp: 60, spo2: 95, rr: 18 },
facts: ["76M; AF on sotalol; depression on citalopram; furosemide for ankle swelling", "Three days of diarrhoea; eating little", "Admission ECG: QTc 560 ms; heart rate 52", "Monitor: runs of polymorphic wide complexes that twist and stop on their own"],
decisions: [
{ tag: "torsades", scene: "The QTc was long and the beats twist around the baseline. What is it, and what comes first?", opts: [
{ q: "best", t: "Torsades de pointes: pads on, hold the sotalol and citalopram, send K and Mg, and call your senior", fb: "Long QT plus twisting complexes is torsades. Removing the QT-prolonging drugs and fixing the electrolytes is the base of treatment." },
{ q: "poor", t: "Monomorphic VT: start amiodarone", fb: "The beats twist, so it is polymorphic. Amiodarone prolongs the QT and can make torsades worse." },
{ q: "harm", t: "Give his evening sotalol: it is an antiarrhythmic", fb: "Sotalol prolongs the QT and is a common cause of torsades." }
] },
{ tag: "torsades", scene: "What is your first drug?", opts: [
{ q: "best", t: "Magnesium 5 mmol IV over 10 minutes (may repeat once), then 20 mmol over 4 hours", reveal: ["Bloods: K 2.8 mmol/L, Mg 0.55 mmol/L"], fb: "The ANZCOR regimen. It works even when the magnesium level is normal." },
{ q: "poor", t: "Wait for the magnesium level before giving any", reveal: ["Bloods: K 2.8 mmol/L, Mg 0.55 mmol/L"], fb: "Give it now. Magnesium suppresses torsades whatever the level." },
{ q: "harm", t: "Amiodarone 300 mg IV", reveal: ["Bloods: K 2.8 mmol/L, Mg 0.55 mmol/L"], fb: "ANZCOR says to avoid amiodarone in torsades." }
] },
{ tag: "torsades", scene: "Potassium is 2.8 and magnesium 0.55. He has diarrhoea and is on furosemide. What do you do?", opts: [
{ q: "best", t: "Replace potassium and magnesium per your protocol on a monitor, hold the furosemide, treat the fluid losses, and recheck the levels", fb: "The diarrhoea and the diuretic both drained his potassium. Fix the level and the cause." },
{ q: "poor", t: "Oral potassium in the morning", fb: "Too slow while torsades is running." },
{ q: "poor", t: "Replace potassium only", fb: "Low magnesium also drives torsades, and it makes potassium hard to correct." }
] },
{ tag: "adverse", vit: { hr: 0, sbp: 0, dbp: 0, spo2: 0, rr: 0 }, reveal: ["The torsades becomes sustained. He goes limp: no pulse, not breathing normally"], scene: "He goes limp with no pulse. The monitor shows sustained torsades. What now?", opts: [
{ q: "best", t: "Call the arrest team, start CPR, and defibrillate (unsynchronised) as for VF on the cardiac arrest algorithm", vit: { hr: 76, sbp: 98, dbp: 58, spo2: 94, rr: 16 }, reveal: ["After one shock and two minutes of CPR: sinus rhythm with a pulse"], fb: "Pulseless torsades is a shockable arrest rhythm. Synchronised cardioversion is for a patient who still has a pulse." },
{ q: "poor", t: "Synchronised cardioversion with sedation", fb: "He has no pulse. Sedation is not needed and the machine may not sync on twisting complexes. This is a cardiac arrest: CPR and defibrillation." },
{ q: "harm", t: "Give amiodarone and wait for it to work", fb: "Waiting with no pulse costs his brain. Shock first; and in torsades amiodarone is avoided." }
] },
{ tag: "after", scene: "He has a pulse again, in sinus rhythm at 76. How do you keep him safe?", opts: [
{ q: "best", t: "Stop the sotalol and citalopram (cardiology to advise on AF treatment), keep K and Mg normal, repeat the ECG for the QTc, keep him on a monitor in a higher-care bed, and tell your senior and cardiology", fb: "Remove every QT-prolonging drug, keep electrolytes normal, and recheck the QTc. His slow heart rate also lengthens the QT, which cardiology will address." },
{ q: "poor", t: "Restart the sotalol at half the dose tomorrow", fb: "Any dose still prolongs the QT in someone who has just had torsades." },
{ q: "harm", t: "Send him back to a general bed without a monitor", fb: "Torsades can return while the QT is long." }
] }
],
ends: { hi: "He is in sinus rhythm with the culprit drugs stopped and the electrolytes fixed. You knew a pulseless patient needs CPR and a shock.", mid: "He survived, but a step gave a drug the guidelines advise against or used the wrong shock.", lo: "Several decisions put him at risk. Go through step 6 of the Study Kit and play again." }
}
];
