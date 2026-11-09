/* Cases for acs_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
stemi: { n: "Reading the STEMI", tab: "1", r: "ST elevation 1 mm or more in two contiguous leads (V2-V3: 2 mm men, 1.5 mm women). Inferior STEMI: always do V4R." },
reperf: { n: "PCI or fibrinolysis", tab: "2", r: "Within 12 hours: primary PCI if possible within 90 minutes of first contact, otherwise fibrinolysis. ST resolution 50% or less at 60-90 minutes: rescue PCI." },
drugs: { n: "Drugs at the door", tab: "3", r: "Aspirin 300 mg; ticagrelor or prasugrel (clopidogrel with lysis or anticoagulation); heparin or enoxaparin; oxygen only if saturations under 93%; GTN unless low BP, RV infarct or PDE-5 inhibitor." },
rv: { n: "RV infarct", tab: "6", r: "Inferior STEMI with low BP, raised JVP and clear lungs: fluid, and no GTN or other vasodilator." },
nste: { n: "NSTEACS timing", tab: "4", r: "Very high risk: within 2 hours. High (GRACE over 140, dynamic changes, troponin rise): within 24 hours. Intermediate: within 72 hours." },
comp: { n: "Post-MI complications", tab: "6", r: "New murmur with pulmonary oedema or shock: papillary muscle or septal rupture, urgent echo and surgery. Sudden tamponade: free wall rupture." },
secondary: { n: "Secondary prevention", tab: "7", r: "Aspirin indefinitely, DAPT up to 12 months, highest tolerated statin (LDL under 1.8), beta-blocker if EF 40% or less, ACE inhibitor where indicated, cardiac rehab for all." }
};
window.RMO_CASES = [
{
id: "c1", title: "Three hours from a cath lab", where: "Rural hospital ED", time: "02:15", blurb: "Inferior STEMI far from PCI. Tests RV infarct, the PCI or lysis choice and rescue PCI.",
intro: "You are the only doctor in a rural ED. 63-year-old man, 90 minutes of crushing chest pain. Nearest PCI centre is 3 hours by road or retrieval.",
vit: { hr: 58, sbp: 92, dbp: 60, spo2: 95, rr: 18 },
facts: ["63M; smoker, diabetes", "Crushing central pain radiating to the jaw", "ECG: ST elevation II, III, aVF; ST depression I, aVL", "Chest clear, JVP raised"],
decisions: [
{ tag: "rv", scene: "Inferior STEMI, BP 92/60, raised JVP, clear chest. Before anything else?", opts: [
{ q: "best", t: "Record V4R, avoid GTN, and give a cautious fluid bolus if the BP drops", reveal: ["V4R: 1.5 mm ST elevation"], fb: "Inferior STEMI with low BP, raised JVP and clear lungs suggests RV involvement. GTN could crash the pressure." },
{ q: "harm", t: "Sublingual GTN for the pain", vit: { sbp: 70, dbp: 44 }, fb: "With RV infarction, the RV depends on preload. GTN dropped his BP." },
{ q: "poor", t: "Furosemide for the raised JVP", fb: "The raised JVP is from the failing RV, not overload. Diuretics worsen it." }
] },
{ tag: "drugs", scene: "Which antiplatelets and oxygen now? Saturations are 95%.", opts: [
{ q: "best", t: "Aspirin 300 mg; no routine oxygen at 95%; P2Y12 choice depends on the reperfusion plan", fb: "Aspirin for all; oxygen only below 93%. If he is lysed, the P2Y12 is clopidogrel." },
{ q: "poor", t: "High-flow oxygen for everyone with chest pain", fb: "Australian guidance: oxygen only if saturations are under 93%." }
] },
{ tag: "reperf", scene: "PCI is 3 hours away. He has no contraindications to fibrinolysis. What is the plan?", opts: [
{ q: "best", t: "Fibrinolysis now with clopidogrel and an anticoagulant, then arrange transfer", vit: { hr: 66, sbp: 104, dbp: 66 }, fb: "PCI cannot happen within 90 minutes of first contact, and he is within 12 hours: fibrinolysis." },
{ q: "poor", t: "Transfer for primary PCI without lysis", fb: "A 3-hour delay loses heart muscle when lysis is available now." },
{ q: "poor", t: "Ticagrelor 180 mg with fibrinolysis", fb: "With fibrinolysis, Australian guidance uses clopidogrel." }
] },
{ tag: "reperf", reveal: ["75 minutes after lysis: ST elevation down by only 30%, still in pain"], scene: "At 75 minutes ST elevation has fallen by only 30% and he still has pain. Next?", opts: [
{ q: "best", t: "Failed lysis: urgent transfer for rescue PCI", fb: "50% or less ST resolution at 60-90 minutes means failed reperfusion. Rescue PCI." },
{ q: "harm", t: "Give a second dose of the fibrinolytic", fb: "Repeat lysis is not the recommended path; bleeding risk is high. Transfer for rescue PCI." },
{ q: "poor", t: "Wait until morning and repeat the ECG", fb: "Every hour of ongoing occlusion costs muscle." }
] }
],
ends: { hi: "You avoided the GTN trap, lysed in time and sent him for rescue PCI when lysis failed.", mid: "He reached PCI, but a step cost time or BP.", lo: "Several decisions cost heart muscle. Review steps 1-3 of the Study Kit." }
},
{
id: "c2", title: "Troponin on a rising curve", where: "Cardiology ward", time: "21:30", blurb: "An NSTEMI in a woman on apixaban. Tests risk timing, anticoagulation and the P2Y12 choice.",
intro: "Ward call: 72-year-old woman admitted with chest pain earlier. The second troponin has risen sharply and the ECG now shows ST depression.",
vit: { hr: 88, sbp: 142, dbp: 82, spo2: 96, rr: 16 },
facts: ["72F; AF on apixaban, hypertension", "Pain now settled", "Troponin 45 then 380 ng/L", "ECG: new 1.5 mm ST depression V4-V6"],
decisions: [
{ tag: "nste", scene: "Rising troponin with new dynamic ST depression, now pain-free and stable. How urgent is angiography?", opts: [
{ q: "best", t: "High risk: angiography within 24 hours; tell cardiology tonight", fb: "Dynamic changes and a troponin rise put her in the 24-hour group." },
{ q: "poor", t: "Routine: outpatient stress test", fb: "She has an NSTEMI with dynamic changes. That is high risk." },
{ q: "ok", t: "Within 2 hours, as an emergency", fb: "Reserved for very high risk: ongoing pain, shock, arrhythmia or heart failure. Watch for these." }
] },
{ tag: "drugs", scene: "She takes apixaban. What antithrombotic plan do you set tonight?", opts: [
{ q: "best", t: "Aspirin; discuss with cardiology about withholding apixaban and when to start heparin; if a P2Y12 is needed, clopidogrel", fb: "With oral anticoagulation, clopidogrel is the P2Y12 of choice, and stacking anticoagulants needs a plan." },
{ q: "harm", t: "Add enoxaparin on top of her usual apixaban", fb: "Double anticoagulation risks serious bleeding." },
{ q: "poor", t: "Prasugrel 60 mg load", fb: "With oral anticoagulation, Australian guidance uses clopidogrel, not prasugrel or ticagrelor." }
] },
{ tag: "drugs", scene: "Her saturations are 96% on air. Oxygen?", opts: [
{ q: "best", t: "No supplemental oxygen; recheck if saturations fall below 93%", fb: "Routine oxygen does not help when saturations are 93% or more." },
{ q: "poor", t: "4 L via nasal prongs as routine", fb: "Not recommended in Australia without hypoxia." }
] },
{ tag: "secondary", reveal: ["Angiography: one stent to the LAD; EF 55%"], scene: "She is stented. What discharge plan fits Australian guidance?", opts: [
{ q: "best", t: "Apixaban plus clopidogrel, a short period of aspirin decided by cardiology, highest tolerated statin, cardiac rehab referral, no NSAIDs", fb: "Keep triple therapy short. EF is normal, so a beta-blocker is not mandatory by Australian guidance." },
{ q: "poor", t: "Aspirin, ticagrelor and apixaban for 12 months", fb: "Triple therapy with ticagrelor for a year carries a high bleeding risk." }
] }
],
ends: { hi: "Right timing, a safe antithrombotic plan and full secondary prevention.", mid: "She did well, but one decision added bleeding or ischaemic risk.", lo: "The antithrombotic plan was unsafe. Review steps 3, 4 and 7 of the Study Kit." }
},
{
id: "c3", title: "Day 4 and a new murmur", where: "Coronary care unit", time: "03:40", blurb: "Sudden pulmonary oedema after an MI. Tests mechanical complications.",
intro: "Nurse call: 68-year-old man, day 4 after an inferior STEMI treated with PCI. Suddenly breathless and grey.",
vit: { hr: 118, sbp: 88, dbp: 54, spo2: 86, rr: 30 },
facts: ["68M; inferior STEMI day 4, stent to RCA", "Was walking the ward yesterday", "New loud pansystolic murmur at the apex", "Crackles to the mid zones"],
decisions: [
{ tag: "comp", scene: "Sudden pulmonary oedema, low BP and a new pansystolic murmur on day 4. What is happening?", opts: [
{ q: "best", t: "A mechanical complication (papillary muscle rupture with acute MR, or septal rupture): urgent echo and call cardiology and cardiothoracic surgery", fb: "New murmur plus sudden failure after MI is a surgical emergency." },
{ q: "poor", t: "Re-infarction: repeat troponin and wait", fb: "The new murmur points to a mechanical problem that needs echo now." },
{ q: "poor", t: "Hospital-acquired pneumonia", fb: "Crackles with a new murmur and shock is cardiac until proven otherwise." }
] },
{ tag: "comp", scene: "While echo is coming: oxygenation and BP support?", opts: [
{ q: "best", t: "Oxygen and NIV for the pulmonary oedema, careful diuretic, and ICU for BP support; avoid large GTN doses with this BP", vit: { spo2: 92, rr: 24 }, fb: "Support breathing and perfusion. Definitive treatment is surgical." },
{ q: "harm", t: "Large fluid bolus for the low BP", vit: { spo2: 80 }, fb: "He is flooded. Fluid worsens the pulmonary oedema." }
] },
{ tag: "stemi", reveal: ["Echo: flail posterior mitral leaflet, severe MR"], scene: "Echo shows a flail leaflet and severe MR. Which coronary territory fits?", opts: [
{ q: "best", t: "Inferior MI: the posteromedial papillary muscle has a single blood supply, usually from the RCA", fb: "That is why papillary muscle rupture is more common after inferior MI." },
{ q: "poor", t: "Anterior MI only", fb: "Free wall rupture is more often anterior; papillary rupture is more often inferior." }
] },
{ tag: "secondary", scene: "Before he goes to theatre, what is easy to forget about his antiplatelets?", opts: [
{ q: "best", t: "Tell the surgeons exactly which antiplatelets and when they were last given", fb: "Ticagrelor and clopidogrel raise surgical bleeding; the team needs the times." },
{ q: "poor", t: "Nothing: surgery can go ahead regardless", fb: "Antiplatelet timing changes bleeding risk and surgical planning." }
] }
],
ends: { hi: "You recognised a surgical emergency fast and handed over the key details.", mid: "He made it to surgery, but a step added risk.", lo: "The complication was missed or mismanaged. Review step 6 of the Study Kit." }
}
];
