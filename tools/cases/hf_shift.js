/* Cases for hf_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
apo: { n: "Acute pulmonary oedema", tab: "1", r: "Sit up, oxygen if hypoxic, CPAP or NIV if oxygen is not enough or CO2 rises, GTN if BP allows, IV furosemide. Avoid morphine and IV fluid." },
profile: { n: "Warm or cold, wet or dry", tab: "3", r: "Perfusion (warm hands, pulse pressure, mental state, lactate, urine) and congestion (JVP, oedema, orthopnoea, crackles). Cold and wet is cardiogenic shock until proven otherwise: senior and ICU now." },
trigger: { n: "Finding the trigger", tab: "2", r: "Salt, fluid and missed tablets; ischaemia; arrhythmia (AF); high BP; NSAIDs, steroids, verapamil or diltiazem; infection; kidney injury; alcohol or cocaine; valve disease. ECG and troponin on admission." },
diuresis: { n: "A diuresis day", tab: "4", r: "IV loop at about twice the home dose in the morning. Urine within 1 hour. At 3-4 hours, less than halfway to goal: double the dose. Second dose by early afternoon. Goal about 2 L negative in HFrEF, 1 L in HFpEF (US template)." },
creat: { n: "Creatinine and electrolytes", tab: "5", r: "A modest creatinine rise while still congested is expected: keep diuresing and trust the exam. Replace potassium and magnesium early; spironolactone helps hold potassium." },
resist: { n: "Diuretic resistance", tab: "5", r: "At 80 mg IV twice daily without enough output: cardiology input, furosemide infusion, add a thiazide (metolazone), or acetazolamide if alkalotic with potassium above 4." },
hold: { n: "When to hold back drugs", tab: "6", r: "Shock: stop the beta-blocker and vasodilators. ARNI, ACE inhibitor, ARB or MRA: caution if systolic under 95, potassium over 5.0 or eGFR under 20; withhold if potassium over 6.0. Beta-blocker: caution if heart rate under 55 or systolic under 95." },
gdmt: { n: "The four pillars", tab: "6", r: "HFrEF: ARNI (or ACE inhibitor), a proven beta-blocker, MRA and SGLT2 inhibitor, all started as soon as clinically possible. Uptitrate at least twice before discharge, aiming for about half the target dose." },
home: { n: "Iron and going home", tab: "7", r: "IV iron if ferritin under 100 µg/L, or 100-299 with TSAT under 20%; oral iron does not work. Oral diuretic when symptoms and JVP improve. Daily weights: 2 kg change in 2 days means contact the GP within 24 hours. Review within 1-2 weeks." }
};
window.RMO_CASES = [
{
id: "c1", title: "Flooded at 3 am", where: "Medical ward 4B", time: "03:05", blurb: "A woman drowning in her own lungs with a very high BP. Tests pulmonary oedema, the trigger and the next morning's plan.",
intro: "Nurse call: 74-year-old woman, suddenly very short of breath, sitting bolt upright, frothy pink sputum. Saturations 82%.",
vit: { hr: 118, sbp: 196, dbp: 108, spo2: 82, rr: 32 },
facts: ["74F; hypertension; HFpEF on her last echo (EF 55%)", "Admitted yesterday with a urinary infection", "Crackles to the mid zones, JVP raised", "Fluid chart: 3 litres of IV fluid in 24 hours"],
decisions: [
{ tag: "apo", scene: "She is fighting for breath with a BP of 196/108. What do you do first?", opts: [
{ q: "best", t: "Sit her up, high-flow oxygen, call for CPAP or NIV, GTN sublingual then an infusion, IV furosemide, and call your registrar", vit: { spo2: 91, sbp: 168, dbp: 96, rr: 26 }, fb: "Acute pulmonary oedema with high BP: CPAP or NIV and a vasodilator do the most, quickly. Furosemide follows." },
{ q: "ok", t: "IV furosemide 80 mg and oxygen, then reassess in an hour", vit: { spo2: 86 }, fb: "Right drug, but she needs CPAP or NIV and GTN now. An hour is too long at 82%." },
{ q: "harm", t: "IV morphine for her distress", vit: { spo2: 79, rr: 14 }, fb: "Morphine is avoided in pulmonary oedema; it can worsen breathing." },
{ q: "harm", t: "Stop the IV fluids? No: she is septic, give another 500 mL bolus", vit: { spo2: 76 }, fb: "She is already flooded. More fluid worsens the oedema." }
] },
{ tag: "apo", reveal: ["On CPAP 10 cmH2O: SpO2 93%, BP 160/94"], scene: "On CPAP her saturations are 93% and BP 160/94. How do you run the GTN?", opts: [
{ q: "best", t: "GTN infusion starting around 5-10 mcg/min, increased to effect while watching the BP, and stopped if the systolic falls too far", fb: "Titrate to BP. CPAP itself lowers BP, so watch both together." },
{ q: "poor", t: "No GTN: CPAP is enough", fb: "With a BP of 160/94 and pulmonary oedema, a vasodilator still helps unload the heart." },
{ q: "harm", t: "GTN infusion at a fixed high rate without BP checks", fb: "GTN can drop the BP sharply. Start low and titrate." }
] },
{ tag: "trigger", scene: "She settles. What tipped her over?", opts: [
{ q: "best", t: "3 litres of IV fluid in a day into a stiff (HFpEF) heart, plus high BP: stop maintenance fluid, review the fluid chart, ECG and troponin", fb: "Iatrogenic fluid is a common trigger on the wards. Treat the cause as well as the oedema." },
{ q: "ok", t: "The urinary infection alone", fb: "Infection contributes, but the fluid chart is the strongest clue." },
{ q: "poor", t: "A new MI: start a heparin infusion", fb: "Check ECG and troponin first. There is no evidence of ACS yet." }
] },
{ tag: "diuresis", scene: "Next morning she is off CPAP, still with ankle oedema and a raised JVP. She takes no diuretics at home. What is the plan for today?", opts: [
{ q: "best", t: "IV furosemide early in the morning (40 mg for a diuretic-naive patient is reasonable), strict fluid balance, daily weight, check output at 3-4 hours and redose by early afternoon", fb: "Bolus early, check, redose before mid-afternoon. With HFpEF, aim for about 1 litre negative (US template)." },
{ q: "poor", t: "Give a dose at 6 pm when the ward round finishes", fb: "Late doses keep the patient up all night and leave decisions to the night team." },
{ q: "poor", t: "No more diuretics: she is off CPAP", fb: "She is still congested. Keep going until symptoms and JVP improve." }
] },
{ tag: "home", scene: "Three days later she is euvolaemic. What does she need before going home?", opts: [
{ q: "best", t: "An oral diuretic plan she has tried for 24 hours, daily weights with the 2 kg in 2 days rule, BP control, and review within 1-2 weeks", fb: "A tested oral dose, clear self-monitoring and early follow-up reduce readmission." },
{ q: "poor", t: "Discharge on IV-equivalent furosemide with no follow-up booked", fb: "Untested doses and no early review are how patients come back." },
{ q: "poor", t: "Tell her to weigh herself monthly", fb: "Daily weights catch fluid early. A 2 kg change in 2 days is the trigger to call." }
] }
],
ends: { hi: "She survives the night, the trigger is fixed and she goes home with a plan.", mid: "She recovers, but a step was slower or less safe than it should be.", lo: "Several steps put her at risk. Go back to steps 1, 2 and 4 of the Study Kit and play again." }
},
{
id: "c2", title: "The slow diuresis", where: "Cardiology ward", time: "08:30", blurb: "A day of diuresis that is not working. Tests the dose, the 3-hour check, creatinine and electrolytes.",
intro: "Ward round: 68-year-old man with HFrEF (EF 25%), admitted overnight with 4 kg of weight gain, orthopnoea and oedema to the thighs.",
vit: { hr: 88, sbp: 128, dbp: 76, spo2: 93, rr: 20 },
facts: ["68M; ischaemic cardiomyopathy, EF 25%", "Home: furosemide 40 mg twice daily, bisoprolol 5 mg, sacubitril-valsartan, spironolactone, dapagliflozin", "Warm hands, JVP to the ear, sacral and thigh oedema", "Creatinine 110 µmol/L, potassium 4.1, Mg 0.75"],
decisions: [
{ tag: "profile", scene: "Warm hands, BP 128/76, JVP to the ear, oedema to the thighs. Which profile and which dose?", opts: [
{ q: "best", t: "Warm and wet: IV furosemide about twice his home dose (80 mg IV now), strict fluid balance, daily weights", fb: "His home dose is 40 mg twice daily. About double, given IV, is the usual start." },
{ q: "ok", t: "Warm and wet: IV furosemide 40 mg", fb: "Right profile, but a dose at or below his home dose often does too little." },
{ q: "harm", t: "Cold and wet: start dobutamine", fb: "He is warm and well perfused. Inotropes are for low output." }
] },
{ tag: "diuresis", reveal: ["11:30, three hours after 80 mg IV: 300 mL of urine"], scene: "Three hours after the dose he has passed 300 mL. Today's goal is 2 litres negative. Next step?", opts: [
{ q: "best", t: "Double the dose: 160 mg IV now, before early afternoon", fb: "Less than halfway to goal at 3-4 hours means double the dose. Do it early." },
{ q: "poor", t: "Repeat 80 mg at 8 pm", fb: "Too late and too little. He will not reach goal and will be up all night." },
{ q: "poor", t: "Wait until tomorrow's round", fb: "A whole day lost. Act on the 3-hour check." }
] },
{ tag: "creat", reveal: ["Day 3: creatinine 138 µmol/L (from 110). Still orthopnoeic, JVP still raised, oedema to the knees. Weight down 2.5 kg."], scene: "Day 3: creatinine has risen from 110 to 138. He is still clearly congested. What now?", opts: [
{ q: "best", t: "Keep diuresing: he is still wet. Recheck daily and trust the examination", fb: "A modest rise during decongestion rarely means kidney damage. Stopping leaves him overloaded." },
{ q: "poor", t: "Stop all diuretics until the creatinine is back to baseline", fb: "He stays congested and the kidneys stay congested too." },
{ q: "harm", t: "Give a litre of fluid to 'protect the kidneys'", fb: "He is overloaded. Fluid makes things worse." }
] },
{ tag: "creat", reveal: ["Potassium 3.3 mmol/L, magnesium 0.6 mmol/L"], scene: "Potassium is 3.3 and magnesium 0.6. What do you do?", opts: [
{ q: "best", t: "Replace both per protocol, keep the spironolactone going, and recheck tomorrow", fb: "Loop diuretics waste both. Low K and Mg raise arrhythmia risk, especially with a weak heart." },
{ q: "poor", t: "Replace potassium only", fb: "Low magnesium makes potassium hard to correct and adds arrhythmia risk." },
{ q: "poor", t: "Stop the spironolactone", fb: "It helps hold potassium and is one of his life-saving drugs." }
] },
{ tag: "resist", reveal: ["Day 4: on 80 mg IV twice daily, output only 1.2 litres a day, still congested"], scene: "Day 4: on 80 mg IV twice daily he still only passes about 1.2 litres a day and remains wet. Next?", opts: [
{ q: "best", t: "Discuss with cardiology: furosemide infusion, add a thiazide such as metolazone, or acetazolamide if he is alkalotic with potassium above 4", fb: "These are the standard steps for diuretic resistance. Watch electrolytes closely when you add a thiazide." },
{ q: "ok", t: "Increase to 120 mg IV twice daily", fb: "Reasonable, but get cardiology involved and consider combination therapy." },
{ q: "poor", t: "Accept it and discharge on his home dose", fb: "He will be back within days." }
] }
],
ends: { hi: "He decongests, his electrolytes stay safe, and the plan moved quickly each day.", mid: "He improves, but a day was lost somewhere.", lo: "Diuresis stalled or became unsafe. Go back to steps 4 and 5 of the Study Kit and play again." }
},
{
id: "c3", title: "Cold hands", where: "Emergency department", time: "22:40", blurb: "A man with HFrEF who is cold, confused and hypotensive. Tests cardiogenic shock, holding drugs and restarting them safely.",
intro: "ED call: 79-year-old man with known heart failure, breathless and drowsy. His hands are cold and the BP is low.",
vit: { hr: 112, sbp: 82, dbp: 64, spo2: 90, rr: 26 },
facts: ["79M; HFrEF, EF 20%", "Home: bisoprolol 10 mg, sacubitril-valsartan, spironolactone, empagliflozin, furosemide", "Cool mottled knees, confused, urine output poor", "Lactate 4.2, creatinine 180 µmol/L (baseline 120)"],
decisions: [
{ tag: "profile", scene: "Cold, confused, BP 82/64 with a narrow pulse pressure, lactate 4.2, JVP raised. What is this and what do you do?", opts: [
{ q: "best", t: "Cold and wet: possible cardiogenic shock. Call your senior and ICU now, monitor, IV access, ECG and troponin", fb: "Poor perfusion plus congestion. ICU decides on inotropes or vasopressors." },
{ q: "poor", t: "Warm and wet: give 80 mg IV furosemide and admit to the ward", fb: "Cold peripheries, confusion and a lactate of 4.2 are signs of poor perfusion. This is not a ward patient." },
{ q: "harm", t: "Give a 1 litre fluid bolus for the low BP", vit: { spo2: 84, rr: 32 }, fb: "He is congested with a failing heart. A large bolus can push him into pulmonary oedema." }
] },
{ tag: "hold", scene: "What do you do with his regular drugs tonight?", opts: [
{ q: "best", t: "Withhold the bisoprolol, sacubitril-valsartan and any vasodilator; review spironolactone and empagliflozin with the kidney injury", fb: "In shock, the beta-blocker and BP-lowering drugs come off. They are restarted carefully once he is stable." },
{ q: "poor", t: "Give all his usual evening tablets", fb: "Bisoprolol and sacubitril-valsartan will lower an already low pressure." },
{ q: "harm", t: "Start GTN for his breathlessness", vit: { sbp: 70, dbp: 48 }, fb: "A vasodilator in a hypotensive, poorly perfused patient worsens shock." }
] },
{ tag: "trigger", reveal: ["ECG: new ST depression; troponin rising"], scene: "The ECG shows new ST depression and the troponin is rising. What does that change?", opts: [
{ q: "best", t: "Ischaemia may be the trigger: tell cardiology now about an ACS with cardiogenic shock", fb: "ACS is a common cause of sudden decompensation and needs cardiology's decision on angiography." },
{ q: "poor", t: "Troponin is always raised in heart failure: ignore it", fb: "A rising troponin with new ECG changes needs action." }
] },
{ tag: "gdmt", reveal: ["Day 6: off inotropes, warm, BP 104/68, heart rate 84, potassium 4.6, eGFR 40"], scene: "Day 6: he is warm, off support, BP 104/68, potassium 4.6, eGFR 40. What about his heart failure drugs?", opts: [
{ q: "best", t: "Restart them at low doses, one or two at a time, checking BP, potassium and kidney function, aiming to uptitrate before discharge", fb: "Stopping life-saving drugs for good worsens survival. Restart carefully within the caution limits." },
{ q: "poor", t: "Leave them all off to be safe", fb: "Patients discharged without these drugs do worse at one year." },
{ q: "harm", t: "Restart everything at the full previous doses tonight", fb: "Too much too soon after shock risks hypotension and hyperkalaemia." }
] },
{ tag: "home", reveal: ["Iron studies: ferritin 80 µg/L, TSAT 15%"], scene: "Before discharge, iron studies show ferritin 80 µg/L and TSAT 15%. What do you recommend?", opts: [
{ q: "best", t: "IV ferric carboxymaltose: he meets the Australian criteria (ferritin under 100)", fb: "IV iron improves symptoms and exercise capacity. Oral iron is not absorbed well in heart failure." },
{ q: "poor", t: "Oral ferrous sulfate", fb: "Hepcidin blocks absorption; oral iron does not work in heart failure." },
{ q: "poor", t: "No treatment: his haemoglobin is normal", fb: "Iron deficiency matters in heart failure even without anaemia." }
] }
],
ends: { hi: "He survives the shock, the cause is found and his drugs are back on safely.", mid: "He recovers, but a decision added risk or delay.", lo: "Several decisions worsened his shock. Go back to steps 1, 3 and 6 of the Study Kit and play again." }
}
];
