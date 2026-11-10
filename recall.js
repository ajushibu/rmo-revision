/* Recall items per topic. t = subtopic, k = the key point you should be able to say,
   p = priority (1 must know, 2 good to know, 3 detail), g = section in recall order (R recognise, A assess and investigate, T treat now, C complications and traps, F after and follow-up); items are listed in recall order within a section, s = source: p = the Point of Care page,
   a = ANZCOR 11.9 (Australia), b = both. sg = suggestions you can add. */
window.RECALL = {
"chest-pain": { items: [
{id:"cp2",g:"R",p:1,s:"p",t:"The six that kill",k:"ACS, aortic dissection, PE, tension pneumothorax, tamponade, oesophageal rupture."},
{id:"cp10",g:"R",p:2,s:"p",t:"Features that raise the chance of ACS",k:"Pressure, exertional, eased by rest, radiation to both arms (LR about 2.6), sweating, over 20 minutes."},
{id:"cp5",g:"R",p:1,s:"p",t:"Dissection clues",k:"Sudden tearing pain to the back, maximal at onset, arm BP difference over 20 mmHg, pulse deficit, new AR murmur. CT aortogram before antithrombotics."},
{id:"cp1",g:"A",p:1,s:"a",t:"First 10 minutes",k:"ECG within 10 minutes of first contact, BP in both arms, IV access, troponin, chest X-ray. ST elevation: STEMI pathway. Suspected ACS: aspirin 300 mg."},
{id:"cp3",g:"A",p:1,s:"a",t:"Accelerated rule-out",k:"Serial troponin in a validated protocol: ADAPT is 0 and 2 hours with TIMI 0 and no ischaemic ECG changes; 1-2 hour high-sensitivity algorithms per your hospital."},
{id:"cp11",g:"A",p:2,s:"p",t:"Troponin is not the same as MI",k:"Injury is above the 99th percentile; MI needs ischaemia too. Type 2 MI: supply and demand mismatch. Look at the rise and fall."},
{id:"cp4",g:"A",p:1,s:"a",t:"Australian low-risk definition",k:"Under 40, atypical symptoms, no known CAD, normal troponin and ECG, symptom-free: no further coronary testing."},
{id:"cp7",g:"A",p:2,s:"a",t:"Intermediate risk plan",k:"Non-invasive testing ideally within 7 days, acceptable up to 14."},
{id:"cp13",g:"A",p:3,s:"p",t:"Stress test contraindications",k:"Acute MI or unstable angina, uncontrolled arrhythmia, PE, severe aortic stenosis, myocarditis or pericarditis, dissection."},
{id:"cp6",g:"C",p:1,s:"p",t:"History cannot rule out ACS",k:"Atypical presentations in women, older people and diabetes. GTN response does not prove cardiac pain."},
{id:"cp8",g:"C",p:2,s:"b",t:"When not to give GTN",k:"Low BP, inferior MI with RV involvement (do V4R), recent PDE-5 inhibitor (sildenafil 24 hours; tadalafil longer)."},
{id:"cp9",g:"T",p:2,s:"a",t:"Oxygen in chest pain",k:"Only if saturations are under 93% (88-92% target in COPD)."},
{id:"cp12",g:"T",p:3,s:"p",t:"Non-cardiac causes and treatments",k:"Costochondritis (analgesia), reflux (PPI), pill oesophagitis, shingles (antiviral), biliary colic (ultrasound, LFTs), panic (exclusion)."}
], sg: [
{id:"cps2",g:"R",p:3,s:"p",t:"Boerhaave syndrome",k:"Pain after forceful vomiting, sometimes surgical emphysema; CT, nil by mouth, surgical review. (My suggestion.)"},
{id:"cps1",g:"A",p:2,s:"p",t:"HEART score components",k:"History, ECG, Age, Risk factors, Troponin, each 0-2. Low (0-3), moderate (4-6), high (7-10). (My suggestion from standard teaching.)"}
]},

"acs-and-mi": { items: [
{id:"mi1",g:"R",p:1,s:"p",t:"STEMI criteria",k:"ST elevation 1 mm or more in two contiguous leads; V2-V3 2 mm men, 1.5 mm women. Also posterior (ST depression V1-V4), aVR elevation with widespread depression, new LBBB with symptoms."},
{id:"mi13",g:"R",p:2,s:"p",t:"Type 1 vs type 2 MI",k:"Type 1: plaque rupture. Type 2: supply and demand mismatch (sepsis, fast AF, anaemia, PE). Treat the cause."},
{id:"mi7",g:"A",p:1,s:"a",t:"NSTEACS angiography timing",k:"Very high risk within 2 hours; high (GRACE over 140, dynamic changes, troponin rise) within 24 hours; intermediate (GRACE 109-140) within 72 hours."},
{id:"mi6",g:"C",p:1,s:"p",t:"RV infarct",k:"Inferior STEMI with low BP, raised JVP, clear lungs; ST elevation in V4R. Fluid, avoid GTN."},
{id:"mi8",g:"C",p:1,s:"p",t:"Mechanical complications",k:"New murmur with pulmonary oedema or shock: papillary muscle or septal rupture. Sudden tamponade: free wall rupture. Urgent echo and surgery."},
{id:"mi15",g:"C",p:3,s:"p",t:"Post-angiography low BP",k:"Think bleeding (groin or retroperitoneal), re-infarction, tamponade, arrhythmia. Fluid, ECG, Hb, bedside echo, call cardiology."},
{id:"mi14",g:"C",p:3,s:"p",t:"Post-MI pericarditis",k:"Aspirin and colchicine; avoid other NSAIDs early after MI."},
{id:"mi4",g:"T",p:1,s:"a",t:"Aspirin dose",k:"300 mg chewed or dissolved, then 100-150 mg daily. (US page: 325 then 81.)"},
{id:"mi5",g:"T",p:1,s:"a",t:"P2Y12 choice",k:"Ticagrelor 180 then 90 twice daily, or prasugrel 60 then 10 daily (not over 75, under 60 kg, prior stroke or TIA). Clopidogrel 300-600 then 75 with lysis or oral anticoagulation."},
{id:"mi9",g:"T",p:2,s:"a",t:"Anticoagulation",k:"Unfractionated heparin or enoxaparin (enoxaparin may be preferred). Do not switch between them."},
{id:"mi10",g:"T",p:2,s:"a",t:"Oxygen",k:"Only if saturations are under 93%."},
{id:"mi2",g:"T",p:1,s:"a",t:"PCI or fibrinolysis",k:"Within 12 hours: primary PCI if within 90 minutes of first medical contact, otherwise fibrinolysis if no contraindications."},
{id:"mi3",g:"T",p:1,s:"a",t:"Failed lysis",k:"ST resolution 50% or less at 60-90 minutes, or instability: transfer for rescue PCI. After successful lysis: angiography within 24 hours."},
{id:"mi11",g:"F",p:2,s:"a",t:"Secondary prevention",k:"Aspirin indefinitely, DAPT up to 12 months, highest tolerated statin (LDL under 1.8), beta-blocker if EF 40% or less, ACE inhibitor where indicated, cardiac rehab for all."},
{id:"mi12",g:"F",p:2,s:"a",t:"ACS with atrial fibrillation",k:"Clopidogrel with the oral anticoagulant; keep triple therapy short."}
], sg: [
{id:"mis1",g:"T",p:2,s:"p",t:"Contraindications to fibrinolysis",k:"Any prior intracranial haemorrhage, ischaemic stroke within 3 months, active bleeding, suspected dissection, recent head trauma or neurosurgery. (My suggestion from standard teaching; check your protocol.)"},
{id:"mis2",g:"F",p:3,s:"p",t:"CABG over PCI",k:"Left main, three-vessel, or two-vessel disease including the proximal LAD."}
]},

"pericarditis": { items: [
{id:"pc12",g:"R",p:3,s:"p",t:"Commonest cause",k:"Viral (coxsackie B). Usually self-limiting."},
{id:"pc1",g:"R",p:1,s:"p",t:"Diagnosis: two of four",k:"Pleuritic pain better leaning forward, friction rub, widespread concave ST elevation with PR depression, new or worse effusion (ESC criteria)."},
{id:"pc2",g:"R",p:1,s:"p",t:"Pericarditis vs STEMI on ECG",k:"Pericarditis: widespread, concave, PR depression, reciprocal change only in aVR. STEMI: territorial, reciprocal depression, Q waves. In doubt: treat as STEMI."},
{id:"pc10",g:"R",p:2,s:"p",t:"ECG stages",k:"1 ST elevation, 2 back to baseline in about a week, 3 T inversion, 4 normal over weeks to months."},
{id:"pc3",g:"A",p:1,s:"p",t:"High-risk features (admit)",k:"Fever, high white cells, effusion over 2 cm, tamponade signs, raised troponin, immunocompromised, anticoagulated, trauma, NSAID failure."},
{id:"pc6",g:"C",p:1,s:"p",t:"Early post-MI pericarditis",k:"Aspirin plus colchicine. Avoid other NSAIDs and steroids early after MI."},
{id:"pc11",g:"C",p:2,s:"p",t:"Dressler syndrome",k:"Autoimmune pericarditis weeks to months after MI or cardiac surgery."},
{id:"pc5",g:"T",p:1,s:"b",t:"NSAID choice",k:"Ibuprofen with food at the lowest effective dose (Australian review: 400 mg three times daily; US page 600-800 mg), tapered once symptoms and CRP settle. Aspirin instead after MI or with CAD."},
{id:"pc4",g:"T",p:1,s:"a",t:"Colchicine dose and duration",k:"0.5 mg twice daily for 3 months (Australian tablets are 0.5 mg; once daily if under 70 kg). Halves recurrence."},
{id:"pc9",g:"T",p:2,s:"a",t:"PPI cover",k:"Over 65, previous ulcer, or on aspirin, steroids or anticoagulants."},
{id:"pc7",g:"T",p:2,s:"p",t:"Steroids",k:"Second line: NSAID failure or contraindication, autoimmune, uraemic. They increase recurrence. Never in bacterial pericarditis."},
{id:"pc8",g:"F",p:2,s:"a",t:"Return to sport",k:"No strenuous exercise until symptoms resolve and ECG and CRP normalise; competitive athletes at least 3 months."}
], sg: [
{id:"pcs2",g:"C",p:3,s:"p",t:"Myopericarditis",k:"Pericarditis with raised troponin: admit, echo, cardiology, longer exercise restriction."},
{id:"pcs1",g:"T",p:2,s:"p",t:"Colchicine interactions",k:"Clarithromycin, some azoles, verapamil, ciclosporin; reduce in kidney impairment. (My suggestion from standard teaching.)"}
]},

"pericardial-effusion-and-tamponade": { items: [
{id:"tm1",g:"R",p:1,s:"p",t:"Speed over size",k:"A small effusion that collects fast (after a procedure) can cause tamponade; a large slow one may not."},
{id:"tm2",g:"R",p:1,s:"p",t:"Most useful signs",k:"Breathlessness, tachycardia, raised JVP, pulsus paradoxus over 10 mmHg. Low BP and Beck triad are late and insensitive."},
{id:"tm7",g:"R",p:2,s:"p",t:"Measuring pulsus with a cuff",k:"Pressure where sounds appear only in expiration minus pressure where they are heard throughout. Over 10 mmHg is pulsus; under 10 makes tamponade very unlikely."},
{id:"tm11",g:"R",p:3,s:"p",t:"ECG and X-ray",k:"Electrical alternans (16-21%), low voltage. Big globular heart on X-ray."},
{id:"tm3",g:"A",p:1,s:"p",t:"Echo signs",k:"Effusion, RV diastolic collapse, RA systolic collapse, plethoric IVC, swinging heart."},
{id:"tm8",g:"A",p:2,s:"p",t:"Causes",k:"Procedures, pericarditis, cancer (lung, breast, lymphoma), uraemia, hypothyroidism, autoimmune, radiation, blood."},
{id:"tm9",g:"A",p:2,s:"p",t:"Fluid tests",k:"Cell count, protein, LDH, Gram stain and culture, TB tests, cytology."},
{id:"tm10",g:"C",p:2,s:"p",t:"After cardiac surgery",k:"Drains suddenly stop, BP falls, CVP rises: clot tamponade. Call the surgeon; re-opening may be needed."},
{id:"tm4",g:"T",p:1,s:"p",t:"The only fix",k:"Pericardiocentesis. Do not delay it in an unstable patient."},
{id:"tm5",g:"T",p:1,s:"p",t:"What to avoid",k:"Diuretics, vasodilators, and intubation if at all possible (positive pressure lowers venous return)."},
{id:"tm6",g:"T",p:1,s:"p",t:"Blood in the sac",k:"Dissection, free wall rupture or trauma: cardiothoracic surgery, not just a needle."}
], sg: [
{id:"tms1",g:"F",p:2,s:"p",t:"Recurrent malignant effusion",k:"Consider a pericardial window, matched to goals of care."}
]},

"hypertensive-urgency-and-emergency": { items: [
{id:"ht1",g:"R",p:1,s:"p",t:"Urgency vs emergency",k:"Both usually over 180/120. Emergency = organ damage (brain, eyes, heart, aorta, kidneys, blood). Urgency = none; mild headache allowed."},
{id:"ht7",g:"R",p:1,s:"p",t:"Pregnancy",k:"Over 20 weeks or postpartum with high BP: pre-eclampsia until proven otherwise. Call obstetrics."},
{id:"ht2",g:"A",p:1,s:"p",t:"The ward BP call",k:"See the patient, re-measure properly, look for organ damage, treat pain, retention, anxiety and missed tablets. No IV drugs for a well patient."},
{id:"ht8",g:"A",p:2,s:"p",t:"Organ damage work-up",k:"ECG, troponin, creatinine, urinalysis, FBC and film (MAHA), chest X-ray, fundoscopy, CT head if neurological, CT aortogram if dissection suspected."},
{id:"ht12",g:"C",p:3,s:"p",t:"PRES",k:"Headache, seizures, confusion, visual loss; MRI shows parieto-occipital oedema."},
{id:"ht3",g:"T",p:1,s:"p",t:"How fast in an emergency",k:"No more than 25% in the first hour, then about 160/100 over 2-5 hours, then normal over days. Too fast causes stroke and kidney injury."},
{id:"ht9",g:"T",p:2,s:"p",t:"Urgency targets",k:"Under 160/100 over hours, then under 130/90 over days, with oral drugs and GP follow-up."},
{id:"ht10",g:"T",p:2,s:"p",t:"IV options and cautions",k:"Labetalol (bolus or infusion), GTN infusion, hydralazine (unpredictable). Nicardipine is not stocked everywhere in Australia: check your formulary."},
{id:"ht4",g:"T",p:1,s:"p",t:"Dissection target",k:"Beta-blocker first (labetalol or esmolol); systolic under 120 and heart rate under 60 within an hour. Never a vasodilator alone."},
{id:"ht5",g:"T",p:1,s:"p",t:"ACS and pulmonary oedema",k:"GTN; systolic under 140 within an hour. Avoid beta-blockers in pulmonary oedema or shock."},
{id:"ht6",g:"T",p:1,s:"p",t:"Stimulant toxicity",k:"Benzodiazepines first; avoid a beta-blocker alone. Call the Poisons Information Centre 13 11 26."},
{id:"ht11",g:"F",p:2,s:"p",t:"Secondary causes",k:"Drugs (NSAIDs, steroids, pill, stimulants), sleep apnoea, renal artery stenosis, primary aldosteronism, phaeochromocytoma, thyroid, Cushing, coarctation."}
], sg: [
{id:"hts1",g:"C",p:2,s:"p",t:"Why not sublingual nifedipine",k:"Unpredictable, sometimes severe BP drops. (My suggestion from standard teaching.)"}
]},

"syncope-and-loss-of-consciousness": { items: [
{id:"sy1",g:"R",p:1,s:"p",t:"Definition and mimics",k:"Brief LOC from low brain blood flow with fast full recovery. Exclude hypoglycaemia, hypoxia, intoxication, seizure, stroke."},
{id:"sy4",g:"R",p:1,s:"p",t:"Three kinds",k:"Reflex (about 60%), orthostatic (15%), cardiac (15%). If reflex or orthostatic is not clear: think cardiac."},
{id:"sy11",g:"R",p:3,s:"p",t:"Seizure vs syncope",k:"Prolonged confusion afterwards suggests seizure. Tongue biting and incontinence occur in both."},
{id:"sy2",g:"A",p:1,s:"p",t:"Red flags for cardiac syncope",k:"Exertional or supine, no warning, palpitations, chest pain, breathlessness, heart disease, abnormal ECG, family history of sudden death."},
{id:"sy-h1",g:"A",p:1,s:"p",from:["h1794306715277"],t:"Can't-miss causes of syncope",k:"Arrhythmia, aortic stenosis, PE, bleeding (GI bleed, ruptured AAA, ectopic pregnancy), seizure, stroke."},
{id:"sy3",g:"A",p:1,s:"p",t:"ECG hunt",k:"Heart block or pauses, long QT, delta wave (WPW), Brugada, HCM voltages, ARVC epsilon wave, ischaemia, new arrhythmia."},
{id:"sy6",g:"A",p:1,s:"p",t:"Lying and standing BP",k:"Lying, immediately on standing, and at 3 minutes. Fall of 20 systolic or 10 diastolic is orthostatic hypotension."},
{id:"sy7",g:"A",p:2,s:"p",t:"Tests for everyone",k:"ECG, glucose, FBC, electrolytes, troponin; telemetry if admitted. Pregnancy test in women of child-bearing age."},
{id:"sy8",g:"A",p:2,s:"p",t:"When to image",k:"Echo for a murmur, heart disease or abnormal ECG. CT head for head strike with anticoagulants or focal signs. Carotid Doppler rarely helps."},
{id:"sy9",g:"A",p:2,s:"p",t:"Orthostatic causes",k:"Diuretics, vasodilators, alpha-blockers, beta-blockers, dehydration, autonomic failure (Parkinson disease, diabetes, amyloid)."},
{id:"sy10",g:"T",p:2,s:"p",t:"Treatment by type",k:"Reflex: education, counter-pressure. Orthostatic: stop culprit drugs, fluids, stockings; midodrine or fludrocortisone by specialist. Cardiac: treat the cause."},
{id:"sy5",g:"F",p:1,s:"a",t:"Driving (Austroads, private)",k:"Typical vasovagal unlikely while driving: fit. Single blackout of uncertain cause: 6 months. Two or more over 24 hours apart: 12 months. Licensing authority decides."}
], sg: [
{id:"sys1",g:"R",p:2,s:"p",t:"Bleeding as a cause",k:"Melaena, ruptured AAA, ectopic pregnancy can present as syncope. (My suggestion.)"}
]},

"acute-decompensated-heart-failure": { items: [
{id:"hf3",g:"R",p:1,s:"p",t:"Warm or cold, wet or dry",k:"Warm and wet: IV diuretic (most common). Warm and dry: look for another cause. Cold and wet: shock, ICU. Cold and dry: senior review, stop diuretics, consider cautious fluid."},
{id:"hf1",g:"R",p:1,s:"b",t:"Spotting cardiogenic shock",k:"Systolic under 90 for over 30 minutes, cold and clammy, narrow pulse pressure, confusion, rising lactate, poor urine. Call your senior and ICU; stop the beta-blocker and vasodilators."},
{id:"hf14",g:"R",p:2,s:"p",t:"NT-proBNP and exam findings",k:"NT-proBNP under 300 makes ADHF unlikely. S3 (LR 11) and JVP (LR 5) are the most useful signs; crackles are not specific. Oedema on CXR has LR 12."},
{id:"hf9",g:"A",p:1,s:"p",t:"Common triggers",k:"Salt, fluid and missed tablets; ischaemia; arrhythmia (AF); hypertension; NSAIDs, steroids, verapamil or diltiazem; infection; kidney injury; alcohol or cocaine; valve disease; iatrogenic IV fluid."},
{id:"hf6",g:"C",p:1,s:"p",t:"Creatinine rising during diuresis",k:"Usually haemodynamic, not damage. If still congested, keep diuresing and trust the exam. Sweet spot: bicarbonate rising, creatinine stable."},
{id:"hf10",g:"C",p:2,s:"p",t:"Diuretic resistance",k:"At 80 mg IV twice daily without enough output: cardiology, furosemide infusion, add a thiazide (metolazone), or acetazolamide if alkalotic with K above 4 (ADVOR)."},
{id:"hf11",g:"C",p:2,s:"p",t:"Potassium and magnesium",k:"Check daily and replace early; loop diuretics waste both. Keep spironolactone going to hold potassium."},
{id:"hf8",g:"C",p:1,s:"a",t:"When to hold back drugs in hospital",k:"ARNI, ACE inhibitor, ARB or MRA: caution if systolic under 95, K over 5.0 or eGFR under 20; reduce if K 5.5-6.0, withhold if over 6.0. Beta-blocker: caution if HR under 55 or systolic under 95."},
{id:"hf2",g:"T",p:1,s:"b",t:"Acute pulmonary oedema: first steps",k:"Sit up, oxygen if hypoxic, CPAP or NIV if oxygen is not enough or CO2 rises, GTN if BP allows (infusion from about 5-10 mcg/min), IV furosemide. Avoid morphine."},
{id:"hf4",g:"T",p:1,s:"p",t:"Starting dose of IV loop diuretic",k:"About twice the home oral dose, given IV (higher with kidney disease). An Australian ED handbook gives furosemide 80 mg IV, or the usual dose IV."},
{id:"hf5",g:"T",p:1,s:"p",t:"The 1-hour and 3-4 hour checks",k:"Urine within an hour, or check for shock and double the dose. At 3-4 hours, less than halfway to goal: double; otherwise repeat. Second dose by early afternoon."},
{id:"hf7",g:"T",p:1,s:"a",t:"The four pillars for HFrEF",k:"ARNI preferred (or ACE inhibitor, 36-hour washout before ARNI; ARB last-line), a proven beta-blocker (bisoprolol, carvedilol, metoprolol succinate, nebivolol), MRA, SGLT2 inhibitor (dapagliflozin or empagliflozin). Start all as soon as clinically possible."},
{id:"hf12",g:"F",p:2,s:"a",t:"IV iron criteria",k:"Ferritin under 100 µg/L, or 100-299 with TSAT under 20%: IV ferric carboxymaltose. Oral iron does not work in heart failure."},
{id:"hf13",g:"F",p:2,s:"a",t:"Discharge plan",k:"Oral diuretic when symptoms and JVP improve, ideally tested for 24 hours. Daily weights: 2 kg change in 2 days, contact the GP within 24 hours. Review within 1-2 weeks. Uptitrate the pillars at least twice before discharge."},
{id:"hf15",g:"F",p:3,s:"p",t:"Devices",k:"After 3-6 months of full therapy: ICD if EF under 35% (US criteria); CRT if EF under 35% with QRS over 150 ms, especially LBBB. Cardiology decides."}
], sg: [
{id:"hfs1",g:"R",p:2,s:"p",t:"HFrEF, HFmrEF and HFpEF cut-offs",k:"EF 40% or less, 41-49%, and 50% or more. The four pillars are proven in HFrEF; empagliflozin should also be considered in HFmrEF and HFpEF."},
{id:"hfs2",g:"A",p:2,s:"p",t:"New heart failure work-up",k:"Ischaemic: ECG, troponin, stress test or angiogram. Non-ischaemic: lipids, HbA1c, iron studies, TSH, and others by suspicion; cardiac MRI if unclear."},
{id:"hfs3",g:"T",p:3,s:"p",t:"Loop diuretic equivalents",k:"40 mg oral furosemide is about 1 mg bumetanide. Oral furosemide is roughly half as potent as IV (my addition from standard teaching)."}
]},

"aortic-dissection": { items: [
{id:"ad3",g:"R",p:1,s:"p",t:"The presentation and the can't-miss signs",k:"Tearing chest or back pain, aortic regurgitation murmur, pulse deficit, arm BP difference over 20 mmHg."},
{id:"ad9",g:"R",p:2,s:"p",t:"Risk factors, and the under-40 patient",k:"Hypertension in about 70%. Under 40: think Marfan, connective tissue disease, bicuspid valve. Also smoking and family history."},
{id:"ad1",g:"R",p:1,s:"p",t:"Type A vs Type B and what each needs",k:"Type A involves the ascending aorta: urgent surgical repair. Type B is descending only: usually medical, TEVAR if complicated."},
{id:"ad10",g:"A",p:2,s:"p",t:"First-hour work-up",k:"Telemetry; CBC, BMP, coags, troponin, D-dimer, type and screen; ECG, CXR, CTA, echo. Serial bilateral BPs, consider an arterial line."},
{id:"ad4",g:"A",p:1,s:"p",t:"Which test, and what the others can't do",k:"CTA is the most sensitive and specific. D-dimer has a high negative predictive value but cannot fully rule it out. CXR widened mediastinum in about a third. ECG often normal."},
{id:"ad7",g:"C",p:2,s:"p",t:"Complications of Type A",k:"Coronaries (MI), aortic valve (regurgitation), carotids (stroke), tamponade."},
{id:"ad8",g:"C",p:2,s:"p",t:"Complicated Type B: branch vessels",k:"Renal (oliguria, failure), mesenteric (celiac), spinal (leg weakness, paraplegia), distal occlusion (Leriche). These need TEVAR."},
{id:"ad5",g:"T",p:1,s:"p",t:"Who to call and when",k:"Cardiothoracic surgery urgently. Involve haematology early if on anticoagulation (reversal may be needed)."},
{id:"ad12",g:"T",p:3,s:"p",t:"Pain control",k:"IV morphine. The page gives no dose, so use your protocol."},
{id:"ad2",g:"T",p:1,s:"p",t:"BP and heart-rate targets, and drug order",k:"HR under 60, SBP 100-120. IV labetalol or esmolol first; add nitroprusside or nicardipine if SBP stays over 120. Never a vasodilator without a beta-blocker (reflex tachycardia raises wall stress)."},
{id:"ad6",g:"T",p:1,s:"p",t:"Hypotension in dissection",k:"Fluids and norepinephrine, avoid inotropes. Think tamponade."},
{id:"ad11",g:"F",p:2,s:"p",t:"Discharge and long term",k:"Statin, beta-blocker, low-dose aspirin. Stop smoking, control BP, avoid straining."},
{id:"ad14",g:"F",p:3,s:"p",t:"Aneurysm surgery thresholds",k:"Over 5.5 cm, growth over 0.5 cm in 6 months or over 1 cm in a year. Women lower (4.5-5 cm, debated)."},
{id:"ad13",g:"F",p:3,s:"p",t:"Outcome numbers",k:"Type A surgery 26% mortality vs over 50% medical (IRAD 2000). Type B: 9% in hospital, 20% at 5 years."}
], sg: [
{id:"ads3",g:"R",p:3,s:"p",t:"DeBakey types 1, 2, 3",k:"1 ascending and descending, 2 ascending only, 3 descending only."},
{id:"ads2",g:"A",p:2,s:"p",t:"Aortic dissection risk score (ADD-RS)",k:"Counts high-risk conditions, high-risk pain features and high-risk exam findings (0-3 points). Used to decide between D-dimer and straight to CTA. (My suggestion.)"},
{id:"ads1",g:"C",p:2,s:"p",t:"Why no anticoagulant or thrombolytic if dissection is possible",k:"They can extend the bleed. Rule dissection out before giving them to a patient with tearing pain. (My suggestion from standard teaching, not on the page.)"}
]},

"pulmonary-embolism-and-vte": { items: [
{id:"pe12",g:"R",p:2,s:"p",t:"Risk factors by strength",k:"Fracture or major surgery (OR over 10). OCP, hospitalised, previous VTE, cancer, sepsis (2-9). Bed rest, long travel, age, obesity, smoking, cirrhosis, CKD (under 2). Virchow: stasis, vessel injury, hypercoagulability."},
{id:"pe11",g:"R",p:2,s:"p",t:"Why the heart fails",k:"Pressure in the RV rises, cardiac output falls, SVR rises, the septum bows into the LV and further cuts filling. Massive PE is a common cause of PEA arrest."},
{id:"pe6",g:"A",p:1,s:"p",t:"Rule-out pathway: Wells, PERC, D-dimer",k:"Low PE probability: PERC or D-dimer. Moderate or high: imaging. D-dimer under 500 with moderate probability or under 1000 with low probability rules it out. Age-adjusted cut-off is age x 10."},
{id:"pe10",g:"A",p:2,s:"p",t:"What the ECG shows",k:"Normal in 20%. Tachycardia is the commonest (28%). T-wave inversion V1-V4, S1Q3T3 (about 8%), new RBBB, ST elevation in aVR."},
{id:"pe9",g:"A",p:2,s:"p",t:"Signs of RV strain",k:"Echo: enlarged RV, moderate or severe TR, McConnell's sign, flat septum. CT: RV/LV over 0.9. Troponin up, NT-proBNP over 500."},
{id:"pe1",g:"A",p:1,s:"p",t:"The three risk classes",k:"High: arrest or SBP under 90 not from another cause (PESI IV+). Intermediate: RV strain or troponin without hypotension (high if both, low if only one). Low: neither."},
{id:"pe14",g:"C",p:3,s:"p",t:"Special situations",k:"Cancer: LMWH beats warfarin (CLOT). DOACs less reliable with malabsorption or BMI over 40. Subsegmental PE with low recurrence risk needs no anticoagulation. A negative leg Doppler does not rule out PE."},
{id:"pe4",g:"T",p:1,s:"p",t:"Which anticoagulant first",k:"LMWH if stable with normal kidneys; otherwise UFH bolus and infusion. Thrombolysis only if high risk. Heparin stops new clot; the body dissolves the old clot."},
{id:"pe2",g:"T",p:1,s:"p",t:"Massive PE: respect the RV",k:"Avoid big fluid boluses (about 500 mL at most if hypotensive). Avoid intubation: positive pressure drops venous return and the patient can collapse. HFNC instead. If you must intubate: ketamine, epinephrine at the bedside."},
{id:"pe3",g:"T",p:1,s:"p",t:"Crashing PE: what you do",k:"Call the PE response team. Epinephrine, consider pulmonary vasodilators (NO or epoprostenol), thrombolysis or thrombectomy, and think ECMO. Pads and crash cart nearby."},
{id:"pe5",g:"T",p:1,s:"p",t:"Absolute contraindications to tPA",k:"Haemorrhagic stroke, ischaemic stroke in the last 3 months, AVM, recent brain or spine surgery, head trauma with fracture or brain injury in 3 weeks, serious active bleeding."},
{id:"pe7",g:"T",p:2,s:"p",t:"Relative contraindications to tPA",k:"CNS tumour, major surgery in 2-3 weeks, platelets under 100, INR over 1.7, fibrinogen under 150, oral anticoagulant, BP over 180/110, age over 75, advanced cirrhosis."},
{id:"pe15",g:"T",p:3,s:"p",t:"Thrombolysis evidence",k:"PEITHO: in intermediate-risk PE no long-term benefit but more major bleeding and haemorrhagic stroke. Lyse in massive PE to prevent immediate death."},
{id:"pe8",g:"F",p:2,s:"p",t:"Switching to an oral anticoagulant",k:"Apixaban 10 mg twice daily for 7 days then 5 mg twice daily. Treat 3 months if provoked; indefinite if unprovoked with low bleeding risk, or if cancer."},
{id:"pe13",g:"F",p:2,s:"p",t:"Provoked vs unprovoked follow-up",k:"Unprovoked: about 10% recurrence in year 1 off treatment, then 5% a year. Age-appropriate cancer screening. No thrombophilia testing in the acute phase (exception: high concern for antiphospholipid syndrome)."}
], sg: [
{id:"pes3",g:"R",p:3,s:"p",t:"Proximal vs distal DVT",k:"Iliac, femoral and popliteal clots carry the PE risk; below the knee less so. May-Thurner: left iliac vein compressed by the right iliac artery."},
{id:"pes2",g:"A",p:2,s:"p",t:"Imaging choice in pregnancy and kidney disease",k:"CT pulmonary angiogram is first line; V/Q scan is an alternative when contrast or radiation is a problem. (My suggestion from standard teaching.)"},
{id:"pes1",g:"T",p:1,s:"p",t:"Australian anticoagulant choice and dosing (eTG)",k:"Not checked against Australian guidance. Look up the current eTG regimen before you rely on the apixaban dosing above. (My suggestion.)"}
]},

"atrial-fibrillation": { items: [
{id:"af2",g:"A",p:1,s:"p",t:"CHA2DS2-VASc points",k:"Heart failure 1, hypertension 1, age 75+ 2, diabetes 1, stroke or TIA 2, vascular disease 1, age 65-74 1, female 1."},
{id:"af1",g:"A",p:1,s:"p",t:"Who gets anticoagulated",k:"CHA2DS2-VASc 2 or more in men, 3 or more in women (stroke risk 2% a year or more)."},
{id:"af13",g:"A",p:2,s:"p",from:["h1794308278402"],t:"Bleeding scores: fix risks, do not withhold",k:"Do not use a bleeding score (HAS-BLED) to withhold anticoagulation. Find and fix the modifiable risks: uncontrolled hypertension, alcohol, NSAIDs, antiplatelets, anaemia, labile INR."},
{id:"af4",g:"T",p:1,s:"p",t:"Rate control: target and first-line drugs",k:"Target under 110 (under 80 if LV dysfunction or symptoms). Beta-blocker or diltiazem/verapamil. No non-dihydropyridine CCB with moderate or severe LV systolic dysfunction."},
{id:"af5",g:"T",p:1,s:"p",t:"Second-line rate control and the WPW trap",k:"Digoxin (slow, about 2 hours), amiodarone. In pre-excited AF (WPW) AV-nodal blockers are contraindicated: procainamide instead."},
{id:"af8",g:"T",p:2,s:"p",t:"Who benefits from rhythm control",k:"Symptomatic despite rate control, first episode, heart failure (especially HFrEF), young, athletes, patient preference."},
{id:"af6",g:"T",p:1,s:"p",t:"Electrical cardioversion technique",k:"Sedate, anteroposterior pads, synchronise to the QRS, start about 100 J biphasic. Never defibrillate AF."},
{id:"af9",g:"T",p:2,s:"p",t:"Drug cardioversion and the structural-heart rule",k:"Flecainide or propafenone only without structural heart disease or coronary disease. Amiodarone, dofetilide or ibutilide otherwise."},
{id:"af3",g:"F",p:1,s:"p",from:["h1794308329681"],t:"DOACs first line, and warfarin only for",k:"DOAC for non-valvular AF. Warfarin (INR 2-3) for moderate to severe mitral stenosis, mechanical valves, or CrCl under 15 if apixaban not possible. Aspirin alone is not enough."},
{id:"af-h2",g:"F",p:1,s:"a",from:["h1794308325768"],t:"DOACs in cirrhosis",k:"DOACs are contraindicated in cirrhosis. Australian apixaban product information: contraindicated in liver disease with coagulopathy and clinically relevant bleeding risk, including severe (Child-Pugh C); caution in mild or moderate. Check the product information for rivaroxaban and dabigatran."},
{id:"af7",g:"F",p:2,s:"p",t:"DOAC doses (US page)",k:"Apixaban 5 mg twice daily (2.5 if two of: 80+, 60 kg or less, creatinine 1.5+). Rivaroxaban 20 mg with food (15 if CrCl 15-50). Edoxaban 60 (30). Dabigatran 150 twice daily (110). Check Australian product information."},
{id:"af14",g:"F",p:3,s:"p",t:"After PCI",k:"Stop aspirin early (1-4 weeks) and keep an anticoagulant plus a P2Y12 inhibitor, rather than triple therapy."},
{id:"af10",g:"F",p:2,s:"p",t:"Keeping sinus rhythm",k:"Class Ic (avoid in CAD or structural disease), amiodarone, sotalol, dofetilide, dronedarone. No antiarrhythmic in advanced conduction disease without pacing."},
{id:"af11",g:"F",p:2,s:"p",t:"Catheter ablation",k:"Pulmonary vein isolation. Works best in paroxysmal AF (70-80%), heart failure, young symptomatic patients. Keep anticoagulation based on the score, not the rhythm."},
{id:"af12",g:"F",p:2,s:"p",t:"Risk-factor modification",k:"Weight loss 10% or more, exercise 210 minutes a week, BP under 130/80, treat sleep apnoea, alcohol under 3 drinks a week, stop smoking, glycaemic control. Caffeine restriction not advised."},
{id:"af-h1",g:"C",p:1,s:"p",from:["h1794308709478"],t:"Why an AV-nodal blocker goes in before flecainide",k:"Flecainide slows the atria (flutter about 300 to 220) so the AV node can now pass every beat 1 to 1, and the ventricles race at about 220. Give the AV-nodal blocker first."},
{id:"af-h3",g:"C",p:1,s:"p",from:["h1794310065418"],t:"Why AV-nodal blockers are dangerous in pre-excited AF",k:"The AV node has a speed limiter; the accessory pathway (delta wave) does not. Blocking the node sends the fast atrial rate down the accessory pathway and the ventricles can go dangerously fast. Avoid beta-blockers, verapamil, diltiazem and digoxin; if unstable, synchronised shock."},
{id:"af15",g:"F",p:3,s:"p",t:"AF burden and stroke timing",k:"Episodes over 17-24 hours carry significant risk. Over twofold risk from 1 hour. Risk highest in the 5 days after an episode."}
], sg: [
{id:"afs2",g:"C",p:1,s:"a",t:"AF over 48 hours: anticoagulate before cardioversion",k:"Do not cardiovert (shock or drug) unless fully anticoagulated or a TOE shows no clot (ANZCOR 11.9)."},
{id:"afs1",g:"T",p:1,s:"a",t:"Unstable AF: synchronised cardioversion",k:"Adverse signs (low BP, chest pain, heart failure, confusion, very fast rate) mean cardioversion with sedation, not drugs first (ANZCOR 11.9)."},
{id:"afs3",g:"T",p:2,s:"b",t:"Australian version of the rate-control order",k:"Open the AF Study Kit (Australia first) in this app: it compares the US page with Australian guidance."}
]},

"bradycardia": { items: [
{id:"br13",g:"R",p:3,s:"p",t:"Definitions",k:"Bradycardia is under 60 but symptoms usually start under 50. Sick sinus syndrome is SA node dysfunction. Junctional rhythm starts in the AV node. Athletes and sleep can be physiological."},
{id:"br7",g:"R",p:1,s:"p",t:"The four heart blocks",k:"First degree: long fixed PR. Mobitz I: PR lengthens then a drop. Mobitz II: fixed PR, sudden drops. Complete: atria and ventricles independent."},
{id:"br1",g:"R",p:1,s:"a",t:"Who is unstable (adverse signs)",k:"Systolic BP under 90, heart rate under 40, ventricular arrhythmia, heart failure. The US page also lists confusion, chest pain and breathlessness."},
{id:"br8",g:"R",p:1,s:"a",t:"Asystole-risk markers",k:"Recent asystole, Mobitz II, complete block with a broad QRS or rate under 40, a pause over 3 seconds: pads on and call cardiology even if the patient looks well."},
{id:"br11",g:"A",p:2,s:"p",t:"First-hour work-up",k:"Telemetry, 12-lead ECG, CBC, BMP (potassium), TSH, troponin, echo. Check prior ECG, the drug chart and prior heart disease."},
{id:"br4",g:"A",p:1,s:"p",t:"The four can't-miss causes",k:"Acute coronary syndrome (especially inferior MI), complete heart block, beta-blocker or calcium-channel blocker toxicity, hyperkalaemia."},
{id:"br10",g:"A",p:2,s:"p",t:"Reversible causes to look for",k:"Drugs (beta-blockers, CCBs, amiodarone, opioids, SSRIs), hyperkalaemia, hypothyroidism, hypothermia, raised intracranial pressure, infection (Lyme, endocarditis), ischaemia, vagal tone."},
{id:"br6",g:"C",p:1,s:"p",t:"Where atropine won't work",k:"Complete heart block (especially wide QRS), block below the AV node, and a transplanted heart. The page also warns about acute MI."},
{id:"br9",g:"C",p:2,s:"p",t:"Node vs below: why they behave differently",k:"The node tires gradually (warning, atropine helps). The wires below conduct or fail suddenly (no warning, atropine fails). See the Heart block pages in this app."},
{id:"br2",g:"T",p:1,s:"b",t:"Atropine dose",k:"Australia: 500-600 mcg IV every 3-5 minutes up to 3 mg. US page says 1 mg a dose. Too low a dose can slow the heart further."},
{id:"br3",g:"T",p:1,s:"a",t:"If atropine fails",k:"Adrenaline 2-10 mcg/min, or transcutaneous pacing at 70-80 a minute starting near 30 mA until capture. Capture = a QRS after every spike plus a pulse; chest twitching proves nothing."},
{id:"br5",g:"T",p:1,s:"b",t:"Beta-blocker or CCB toxicity",k:"Glucagon, or insulin with glucose and potassium, and much higher adrenaline doses. Call the Poisons Information Centre 13 11 26. The glucagon dose is not in the Australian source: use toxicology guidance."},
{id:"br12",g:"F",p:2,s:"p",t:"Permanent pacemaker indications",k:"Symptomatic sinus bradycardia (with or without pauses), complete heart block, symptomatic second-degree block, syncope from bradycardia. Correct reversible causes first; involve EP."}
], sg: [
{id:"brs1",g:"A",p:2,s:"p",t:"Hyperkalaemia on the ECG and how it is treated",k:"Peaked T, wide QRS, loss of P waves; IV calcium, insulin with glucose, per your protocol. (My suggestion from standard teaching.)"},
{id:"brs2",g:"C",p:2,s:"p",t:"Inferior MI with bradycardia",k:"Treat both together: ACS pathway, atropine reasonable, pace early, avoid nitrates when hypotensive. (My suggestion.)"},
{id:"brs3",g:"T",p:3,s:"p",t:"Sedation for pacing",k:"The US page suggests fentanyl then midazolam; ANZCOR names none. Use your hospital protocol and senior help."}
]},

"tachyarrhythmias-rapid-response": { items: [
{id:"tc1",g:"R",p:1,s:"a",t:"Is the patient unstable? Adverse signs",k:"Systolic BP under 90, heart rate over 150, chest pain, heart failure, drowsy or confused. Unstable = synchronised cardioversion with sedation."},
{id:"tc3",g:"R",p:1,s:"p",t:"The four boxes",k:"Narrow regular: sinus, flutter, AVNRT/AVRT. Narrow irregular: AF, MAT. Wide regular: VT. Wide irregular: AF with block, pre-excited AF, torsades."},
{id:"tc10",g:"R",p:2,s:"p",t:"Causes of sinus tachycardia",k:"Pain, anxiety, hypovolaemia, fever, heart failure, ACS, PE, hypoxia, alcohol withdrawal, thyroid, caffeine, drugs. Treat the cause; never shock it."},
{id:"tc11",g:"A",p:2,s:"p",t:"First minute at the bedside",k:"Oxygen if low, monitor, IV, pads, 12-lead ECG, bloods (K, Mg, troponin, lactate, TSH), call your senior. No pulse: arrest algorithm."},
{id:"tc7",g:"C",p:1,s:"a",t:"Pre-excited AF: what to avoid",k:"No adenosine, digoxin, verapamil or diltiazem. Electrical cardioversion is usually safest."},
{id:"tc4",g:"T",p:1,s:"a",t:"Narrow regular, stable: the sequence",k:"Valsalva, then adenosine 6 mg, then 12 mg (flush at least 20 mL), then verapamil 2.5-5 mg or diltiazem 15-20 mg if adenosine is unsuitable."},
{id:"tc8",g:"T",p:2,s:"a",t:"Modified Valsalva technique",k:"Strain into a 10 mL syringe for 15 seconds, then lie flat with legs raised 45 degrees for 15 seconds. Converts about 43% vs 5-20% for standard Valsalva."},
{id:"tc9",g:"T",p:2,s:"a",t:"Narrow irregular (AF): stable plan",k:"Metoprolol 5 mg IV (not with wheeze or decompensated heart failure) or digoxin 250-500 mcg. Over 48 hours: no cardioversion unless anticoagulated or TOE clear."},
{id:"tc5",g:"T",p:1,s:"a",t:"Wide regular: treat as VT",k:"Amiodarone 300 mg over 20-60 minutes then 900 mg over 24 hours. Never verapamil or diltiazem."},
{id:"tc6",g:"T",p:1,s:"a",t:"Torsades",k:"Stop QT drugs, correct potassium, magnesium 5 mmol IV over 10 minutes (may repeat once), then 20 mmol over 4 hours. Avoid amiodarone. Adverse signs: shock. The US page's '2-4 mg' looks like a typo for grams."},
{id:"tc2",g:"T",p:1,s:"a",t:"If the shock fails",k:"Amiodarone 300 mg IV over 10-20 minutes, repeat the shock, then 900 mg over 24 hours."},
{id:"tc12",g:"T",p:3,s:"p",t:"Sedation for shocks",k:"The US page suggests fentanyl 50 mcg and midazolam 1-2 mg. ANZCOR names no drug or dose: use your protocol and senior or anaesthetic help."},
{id:"tc13",g:"T",p:3,s:"p",t:"Respiratory support ladder",k:"Non-rebreather, then HFNC, then NIPPV (BiPAP for COPD, CPAP for heart failure), then intubate. Watch PaCO2 and pH."}
], sg: [
{id:"tcs1",g:"T",p:1,s:"p",t:"Adenosine: side effects and cautions",k:"Brief chest tightness and a pause are expected; warn the patient. Avoid in pre-excited AF. (My suggestion from standard teaching.)"},
{id:"tcs3",g:"T",p:3,s:"a",t:"Lignocaine in VT during acute MI",k:"ANZCOR calls it reasonable for stable sustained monomorphic VT with ischaemia, and gives no dose."},
{id:"tcs2",g:"F",p:2,s:"p",t:"After conversion",k:"Repeat the 12-lead (delta wave?), check K and Mg, find the cause, tell your senior or cardiology. (My suggestion.)"}
]}
};
