/* Cases for brady_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
first: { n: "First moves", tab: "aus", r: "Oxygen if hypoxic, monitor, IV access, 12-lead ECG, pads on if unstable, bloods (K, creatinine, glucose, troponin, TSH), a drug chart check, and tell your registrar. Hypoxia is a common cause, so check oxygenation first." },
adverse: { n: "Is it unstable or at risk?", tab: "triage", r: "ANZCOR adverse signs: systolic BP under 90, heart rate under 40, ventricular arrhythmia, heart failure. Asystole-risk markers even when well: recent asystole, Mobitz II, complete block with a broad QRS or rate under 40, a pause over 3 seconds." },
blocks: { n: "Reading heart block", tab: "block", r: "First degree: long, fixed PR. Mobitz I: PR lengthens until a beat drops. Mobitz II: PR fixed, beats drop without warning, and it can jump to complete block. Complete: atria and ventricles beat independently with a slow escape rhythm." },
atropine: { n: "Atropine", tab: "aus", r: "Australia (ANZCOR 11.9): 500-600 mcg IV, repeated every 3-5 minutes up to 3 mg total. The US template says 1 mg per dose. Do not use it after a heart transplant. Low doses can paradoxically slow the heart, so do not under-dose." },
tox: { n: "Beta-blocker or calcium-channel blocker toxicity", tab: "drill", r: "Think of it when bradycardia and low BP follow a dose, especially with kidney injury. Call senior help and the Poisons Information Centre (13 11 26). ANZCOR mentions glucagon or insulin with glucose and potassium, and notes that much higher adrenaline doses may be needed." },
pace: { n: "Pacing and adrenaline", tab: "aus", r: "If atropine fails: adrenaline 2-10 mcg/min, titrated to a stable rate and mean pressure around 70, or transcutaneous pacing in demand mode at 70-80 a minute, starting near 30 mA and increasing until electrical capture. Check for a QRS after every spike and a pulse: chest twitching alone is not capture." },
cause: { n: "Reversible causes", tab: "aus", r: "Look for drugs (beta-blockers, calcium-channel blockers, digoxin, amiodarone, opioids), hyperkalaemia, ischaemia (especially inferior MI), hypothyroidism, hypothermia, raised intracranial pressure and infection. Treat the cause while you support the rate." },
acs: { n: "Inferior MI with a slow rate", tab: "triage", r: "Treat the bradycardia and the MI together: monitor, pads, ACS pathway, cardiology for reperfusion. Avoid nitrates when hypotensive and avoid beta-blockers. Atropine is a reasonable trial, but be ready to pace early." },
restart: { n: "After the crisis", tab: "drill", r: "Stop the culprit drugs and review the dose against kidney function before restarting anything. A cause found and fixed is not an indication for a pacemaker." },
ppm: { n: "When a pacemaker is needed", tab: "block", r: "Mobitz II and complete heart block that are not reversible usually need a permanent pacemaker. Reversible causes (drugs, hyperkalaemia, ischaemia) are corrected first. Cardiology or electrophysiology decide." }
};
window.RMO_CASES = [
{
id: "c1", title: "Two drugs, one kidney", where: "Medical ward 6B", time: "02:40", blurb: "Slow, drowsy and hypotensive on two rate-slowing drugs with kidney injury. Tests toxicity, atropine and escalation.",
intro: "Nurse call: 79-year-old woman, admitted two days ago with a vomiting illness. She is drowsy and her heart rate is in the 30s.",
vit: { hr: 34, sbp: 78, dbp: 44, spo2: 93, rr: 16 },
facts: ["79F; atrial fibrillation and hypertension", "Cool and clammy; drowsy but rouses to voice", "ECG: slow narrow-complex rhythm at 34, no clear P waves", "Creatinine 240 umol/L (baseline 90); glucose 12 mmol/L"],
decisions: [
{ tag: "first", scene: "You arrive at the bedside. What do you do in the first ten minutes?", opts: [
{ q: "best", t: "Oxygen to the target, monitor and pads, IV access, 12-lead ECG, bloods (K, creatinine, glucose, troponin, TSH), look at the drug chart, and call your registrar", vit: { spo2: 95 }, fb: "She is unstable: BP under 90 and rate under 40. Support, get help and look for the cause at the same time. The drug chart is the fastest clue." },
{ q: "ok", t: "Give atropine straight away and sort out the rest afterwards", fb: "Reasonable for an unstable patient, but you lose the cause. The drug chart and bloods take two minutes." },
{ q: "poor", t: "Request an echocardiogram before doing anything else", fb: "An echo does not help in the first ten minutes. She needs monitoring, access and treatment now." },
{ q: "harm", t: "Reassure the nurse: slow rates are common at her age. Repeat the observations in the morning", fb: "BP 78/44 and a rate of 34 in a drowsy patient is an emergency, not a normal finding of age." }
] },
{ tag: "cause", reveal: ["Drug chart: metoprolol 100 mg twice daily and diltiazem SR 180 mg daily, both given tonight"], scene: "The chart shows both a beta-blocker and diltiazem, given this evening, and her kidneys are impaired. What is the most likely cause?", opts: [
{ q: "best", t: "Beta-blocker and calcium-channel blocker effect, made worse by the kidney injury", fb: "Two drugs that slow the AV node, plus a clearance problem, in a patient admitted because of vomiting. This is the first thing to treat as the cause." },
{ q: "ok", t: "An inferior MI: do an ECG and troponin as well", fb: "Reasonable to exclude, and you have already sent a troponin. The drug story is the stronger lead." },
{ q: "poor", t: "Sick sinus syndrome", fb: "Possible later, but not when two nodal blockers were given tonight with a creatinine of 240." },
{ q: "poor", t: "Hypothyroidism", fb: "A cause to check, but it rarely explains an acute drop like this." }
] },
{ tag: "atropine", scene: "BP is 78/44 and the rate is 34. What is your first drug?", opts: [
{ q: "best", t: "Atropine 500-600 mcg IV, repeated every 3-5 minutes up to 3 mg total", vit: { hr: 42, sbp: 82, dbp: 48 }, fb: "This is the Australian first-line dose (ANZCOR 11.9). The US template says 1 mg a dose; both cap at 3 mg total." },
{ q: "ok", t: "Start transcutaneous pacing at once", fb: "Acceptable if drugs fail or are unavailable, but pacing is uncomfortable and usually needs senior help and analgesia. Try the drug first." },
{ q: "poor", t: "Atropine 100 mcg, to be safe", fb: "Under-dosing is a trap. Very low doses can slow the heart further. Give the full 500-600 mcg." },
{ q: "harm", t: "Wait: this is a drug effect and will wear off", fb: "She has adverse signs now. Waiting is how patients arrest." }
] },
{ tag: "tox", reveal: ["After 1.2 mg of atropine: HR 40, BP 80/46, still drowsy"], scene: "After 1.2 mg of atropine she is barely better: rate 40, BP 80/46. Two blockers are on board. What now?", opts: [
{ q: "best", t: "Call your senior and ICU, ring the Poisons Information Centre (13 11 26), start an adrenaline infusion (2-10 mcg/min, higher may be needed), consider IV glucagon, and have pads on for pacing", vit: { hr: 58, sbp: 98, dbp: 58 }, fb: "ANZCOR notes that much higher doses may be needed with beta-blocker therapy and mentions glucagon or insulin with glucose. This is now a toxicology case. Glucagon dosing is not on the page: use your toxicology guidance." },
{ q: "ok", t: "Start adrenaline 2-10 mcg/min and arrange ICU", vit: { hr: 52, sbp: 90, dbp: 54 }, fb: "A sound second-line step. Add toxicology advice because standard doses may not be enough." },
{ q: "poor", t: "Keep giving atropine beyond 3 mg until the rate rises", fb: "3 mg is the ceiling. Past that you get side effects and no extra benefit." },
{ q: "harm", t: "Restart a small dose of metoprolol so her AF rate does not shoot up when she recovers", fb: "The beta-blocker is part of the problem. Restarting it now would deepen the bradycardia." }
] },
{ tag: "restart", scene: "Next morning she is in a monitored bed, rate 70s and BP 118/70, with creatinine falling. What happens to her AF drugs?", opts: [
{ q: "best", t: "Keep both stopped, review doses against her kidney function, and plan rate control with cardiology input", fb: "Both drugs stay off until the kidneys recover, and any restart is at a reviewed dose, one drug at a time." },
{ q: "poor", t: "Restart both at the old dose now that she looks better", fb: "The same dose with the same kidneys will reproduce the problem." },
{ q: "poor", t: "Book a pacemaker, since she had a slow rate", fb: "A drug cause was found and fixed. A pacemaker is not the answer to a reversible cause." }
] }
],
ends: { hi: "She recovers, the culprit drugs are off and the plan is safe. You found the cause, not just the number.", mid: "She survives, but a step cost her time or stability. Revisit the atropine dose and the escalation order.", lo: "Several decisions left her exposed. Go through the Australia first and Shock or drug tabs in the Study Kit, then play again." }
},
{
id: "c2", title: "Inferior and slow", where: "Emergency department", time: "20:15", blurb: "Chest pain, a slow rate and ST elevation in the inferior leads. Tests ACS, heart block, atropine and pacing.",
intro: "Triage: 61-year-old man, 90 minutes of central chest pain, sweaty and grey. Heart rate is 38 and the BP is low. ECG done.",
vit: { hr: 38, sbp: 84, dbp: 50, spo2: 95, rr: 20 },
facts: ["61M; smoker; no previous heart disease; takes no regular medicines", "Central chest pain 90 minutes, sweaty and pale", "ECG: ST elevation in II, III and aVF", "Chest clear; JVP not raised; alert"],
decisions: [
{ tag: "acs", scene: "ST elevation inferiorly with a rate of 38 and BP 84/50. What is your first set of actions?", opts: [
{ q: "best", t: "Monitor and pads, IV access, aspirin per your ACS pathway, call cardiology now for reperfusion, and treat the bradycardia at the same time", fb: "Two problems, one patient. Reperfusion is time-critical, and the slow rate is the thing that can kill him in the next minutes." },
{ q: "poor", t: "Treat only the bradycardia and call cardiology later", fb: "Delaying the cardiology call delays reperfusion. Call early; treat in parallel." },
{ q: "harm", t: "Give sublingual GTN for the chest pain", vit: { sbp: 70, dbp: 40 }, fb: "He is hypotensive, and inferior MI can involve the right ventricle. Nitrates can drop the pressure further." }
] },
{ tag: "blocks", reveal: ["ECG review: P waves at 90 a minute with no relation to the QRS complexes at 38"], scene: "On closer review the P waves march on at 90 and the QRS complexes come at 38 with no relation to them. What is this?", opts: [
{ q: "best", t: "Complete (third-degree) heart block: the atria and ventricles are beating independently", fb: "That is the picture of complete block. It is common with inferior MI and often reversible, but he needs a plan if it does not respond." },
{ q: "poor", t: "Mobitz I (Wenckebach)", fb: "Mobitz I has a PR that lengthens before a dropped beat. Here the P waves and QRS complexes are unrelated." },
{ q: "poor", t: "Sinus bradycardia, so atropine will fix it", fb: "Sinus bradycardia has a P before every QRS. Here they are dissociated." }
] },
{ tag: "atropine", scene: "He has adverse signs. What do you give first?", opts: [
{ q: "best", t: "Atropine 500-600 mcg IV as a trial while the pads go on, and expect that it may fail", vit: { hr: 40, sbp: 84, dbp: 50 }, fb: "ANZCOR names atropine first-line. In block above the His bundle, as in inferior MI, it can work, but it is unreliable in complete block, so do not rely on it and do not delay pacing." },
{ q: "ok", t: "Go straight to transcutaneous pacing", fb: "Acceptable and sometimes right, since pacing is the definitive bridge. It is uncomfortable, so you still need a plan for analgesia." },
{ q: "poor", t: "Repeat atropine up to 3 mg before considering anything else", fb: "Several doses of atropine in complete block can waste minutes. Move on if the first fails." },
{ q: "harm", t: "Give IV metoprolol for the ischaemic pain", vit: { hr: 30, sbp: 70, dbp: 42 }, fb: "A beta-blocker in a patient with high-grade block and low pressure is dangerous." }
] },
{ tag: "pace", reveal: ["After atropine 600 mcg twice: HR 40, BP 80/48"], scene: "After two doses of atropine the rate is 40 and the BP 80/48. What next?", opts: [
{ q: "best", t: "Transcutaneous pacing (demand mode, 70-80 a minute, start around 30 mA and increase until capture) with analgesia per protocol, adrenaline 2-10 mcg/min if pacing is delayed, and ask cardiology for transvenous pacing and PCI", vit: { hr: 70, sbp: 96, dbp: 58 }, fb: "This is the ANZCOR sequence: atropine, then pacing or adrenaline. Cardiology secure the long-term answer." },
{ q: "ok", t: "Start adrenaline 2-10 mcg/min and arrange the cath lab", vit: { hr: 52, sbp: 92, dbp: 56 }, fb: "A reasonable bridge if pacing is not ready. Pacing is more direct for complete block." },
{ q: "poor", t: "Give atropine to a total of 3 mg and reassess", fb: "In complete block with a failed first response, more atropine rarely changes the result." },
{ q: "harm", t: "Wait for the cath lab to be ready and do nothing in the meantime", vit: { hr: 32, sbp: 72, dbp: 40 }, fb: "He can arrest during the wait. Bridge him with pacing or adrenaline." }
] },
{ tag: "pace", scene: "The pacer is firing at 70 a minute and you can see chest-wall twitching. How do you know you have capture?", opts: [
{ q: "best", t: "A wide QRS after every pacing spike on the monitor, and a pulse or pulse-oximeter waveform that matches the paced rate", reveal: ["Capture confirmed: QRS after each spike, pulse 70, BP 98/60"], fb: "External pacing also makes skeletal muscle twitch, so twitching proves nothing. Electrical and mechanical capture both need to be checked." },
{ q: "poor", t: "Chest-wall twitching means the heart is being paced", fb: "Muscle twitching happens whether or not the heart captures." },
{ q: "harm", t: "Turn the pacer off because it hurts him", fb: "Treat the pain with analgesia and keep the pacer on. He is pacemaker-dependent right now." }
] }
],
ends: { hi: "He is paced and perfused with the cath lab on its way. You treated both problems at once.", mid: "He stays alive, but a step slowed his reperfusion or his rate support.", lo: "Several decisions put him at risk. Go back to the Heart block and Australia first tabs in the Study Kit, then play again." }
},
{
id: "c3", title: "Fine, and not fine", where: "Medical assessment unit", time: "11:00", blurb: "A well-looking man with a block that can kill. Tests risk markers, pads, hyperkalaemia and the pacemaker decision.",
intro: "Pager: 72-year-old man, a faint at home yesterday, now sitting up on the trolley and feeling fine. The monitor shows a slow rhythm with dropped beats.",
vit: { hr: 46, sbp: 128, dbp: 76, spo2: 97, rr: 14 },
facts: ["72M; hypertension and chronic kidney disease", "One episode of syncope yesterday; no chest pain or breathlessness now", "Takes ramipril and spironolactone", "Telemetry: intermittent dropped beats"],
decisions: [
{ tag: "adverse", scene: "He feels well and the BP is 128/76. What is your plan?", opts: [
{ q: "best", t: "Keep him on continuous monitoring with pads on, 12-lead ECG, bloods including potassium, review his drugs, and call cardiology: a block like this can progress to asystole even when he looks well", fb: "No adverse signs yet, but some rhythms carry an asystole risk on their own. Watching closely and preparing is the right level of care." },
{ q: "poor", t: "Observe on the ward with four-hourly observations", fb: "Too little. If this block progresses, he could arrest between observations." },
{ q: "poor", t: "Discharge him with GP follow-up", fb: "He has had a syncopal episode and a high-grade rhythm. He needs inpatient monitoring." },
{ q: "harm", t: "Send him home because he feels fine", fb: "Feeling well does not exclude a block that can fail suddenly." }
] },
{ tag: "blocks", reveal: ["12-lead ECG: constant PR of 160 ms with intermittent dropped QRS complexes; QRS 140 ms"], scene: "The ECG shows a constant PR of 160 ms, with QRS complexes that disappear now and then without warning. QRS is wide. What is it?", opts: [
{ q: "best", t: "Mobitz type II second-degree heart block", fb: "Fixed PR with sudden dropped beats is Mobitz II. It is usually below the AV node and can jump to complete block, so ANZCOR counts it as an asystole-risk marker." },
{ q: "poor", t: "Mobitz type I (Wenckebach)", fb: "Mobitz I has a PR that lengthens before each dropped beat. Here the PR is fixed." },
{ q: "poor", t: "First-degree block", fb: "First-degree block has every beat conducting with a long PR. Here some beats do not conduct." },
{ q: "poor", t: "Complete heart block", fb: "In complete block no beats conduct. Here some do." }
] },
{ tag: "atropine", vit: { hr: 32, sbp: 92, dbp: 58 }, reveal: ["Now dizzy and grey: HR 32, BP 92/58"], scene: "While you are looking at the ECG he turns grey and dizzy. The rate is 32 and BP 92/58. What do you do?", opts: [
{ q: "best", t: "Pads on and pacing prepared at once, atropine 500-600 mcg as a trial while that happens, and cardiology called urgently", fb: "He now has adverse signs. Atropine may fail in a block below the AV node, so do not wait for it: prepare to pace." },
{ q: "ok", t: "Go straight to transcutaneous pacing with analgesia per protocol", fb: "A sound choice for this type of block, which atropine often does not fix." },
{ q: "poor", t: "Give atropine up to 3 mg and wait to see", fb: "In this kind of block atropine often fails. Waiting through several doses wastes time." },
{ q: "harm", t: "Lie him flat and re-check in ten minutes", fb: "Positioning does not fix a failing conduction system." }
] },
{ tag: "cause", reveal: ["Bloods: K 6.9 mmol/L; creatinine 210 umol/L; ramipril and spironolactone on the chart"], scene: "The bloods return with a potassium of 6.9 and a creatinine of 210. He takes ramipril and spironolactone. How does that change things?", opts: [
{ q: "best", t: "Treat the hyperkalaemia per your protocol (including IV calcium and insulin with glucose), stop ramipril and spironolactone, and keep the pacing ready", vit: { hr: 62, sbp: 110, dbp: 68 }, fb: "Hyperkalaemia can cause block and bradycardia, and is reversible. Fix it while you stay ready to pace." },
{ q: "poor", t: "Book a permanent pacemaker, since this is a block", fb: "Premature. A reversible cause has been found. Treat it and reassess the rhythm first." },
{ q: "harm", t: "Continue his regular medicines so his blood pressure stays controlled", fb: "Ramipril and spironolactone are driving the potassium up. Stop them." }
] },
{ tag: "ppm", reveal: ["Next day: K 4.6; ECG still shows intermittent Mobitz II"], scene: "A day later the potassium is normal, but the Mobitz II persists. What is the plan?", opts: [
{ q: "best", t: "Refer to cardiology or electrophysiology for a permanent pacemaker", fb: "When the cause is corrected and Mobitz II persists, it is an indication for a permanent pacemaker. Cardiology decide the details." },
{ q: "poor", t: "The cause is fixed, so discharge him with GP follow-up", fb: "The block remains. Without a pacemaker he stays at risk." },
{ q: "poor", t: "Discharge on a beta-blocker to protect the heart", fb: "A beta-blocker in a patient with a high-grade block is the wrong direction." }
] }
],
ends: { hi: "He is monitored, the potassium is fixed and a pacemaker is on its way. You got the risk marker right when he looked well.", mid: "He is safe now, but at one point the plan was less careful than it needed to be.", lo: "A patient who looked well nearly came to harm. Go back to the Heart block and Is it unstable tabs in the Study Kit, then play again." }
}
];
