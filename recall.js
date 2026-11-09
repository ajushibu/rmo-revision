/* Recall items per topic. t = subtopic, k = the key point you should be able to say,
   p = priority (1 must know, 2 good to know, 3 detail), s = source: p = the Point of Care page,
   a = ANZCOR 11.9 (Australia), b = both. sg = suggestions you can add. */
window.RECALL = {
"aortic-dissection": { items: [
{id:"ad1",p:1,s:"p",t:"Type A vs Type B and what each needs",k:"Type A involves the ascending aorta: urgent surgical repair. Type B is descending only: usually medical, TEVAR if complicated."},
{id:"ad2",p:1,s:"p",t:"BP and heart-rate targets, and drug order",k:"HR under 60, SBP 100-120. IV labetalol or esmolol first; add nitroprusside or nicardipine if SBP stays over 120. Never a vasodilator without a beta-blocker (reflex tachycardia raises wall stress)."},
{id:"ad3",p:1,s:"p",t:"The presentation and the can't-miss signs",k:"Tearing chest or back pain, aortic regurgitation murmur, pulse deficit, arm BP difference over 20 mmHg."},
{id:"ad4",p:1,s:"p",t:"Which test, and what the others can't do",k:"CTA is the most sensitive and specific. D-dimer has a high negative predictive value but cannot fully rule it out. CXR widened mediastinum in about a third. ECG often normal."},
{id:"ad5",p:1,s:"p",t:"Who to call and when",k:"Cardiothoracic surgery urgently. Involve haematology early if on anticoagulation (reversal may be needed)."},
{id:"ad6",p:1,s:"p",t:"Hypotension in dissection",k:"Fluids and norepinephrine, avoid inotropes. Think tamponade."},
{id:"ad7",p:2,s:"p",t:"Complications of Type A",k:"Coronaries (MI), aortic valve (regurgitation), carotids (stroke), tamponade."},
{id:"ad8",p:2,s:"p",t:"Complicated Type B: branch vessels",k:"Renal (oliguria, failure), mesenteric (celiac), spinal (leg weakness, paraplegia), distal occlusion (Leriche). These need TEVAR."},
{id:"ad9",p:2,s:"p",t:"Risk factors, and the under-40 patient",k:"Hypertension in about 70%. Under 40: think Marfan, connective tissue disease, bicuspid valve. Also smoking and family history."},
{id:"ad10",p:2,s:"p",t:"First-hour work-up",k:"Telemetry; CBC, BMP, coags, troponin, D-dimer, type and screen; ECG, CXR, CTA, echo. Serial bilateral BPs, consider an arterial line."},
{id:"ad11",p:2,s:"p",t:"Discharge and long term",k:"Statin, beta-blocker, low-dose aspirin. Stop smoking, control BP, avoid straining."},
{id:"ad12",p:3,s:"p",t:"Pain control",k:"IV morphine. The page gives no dose, so use your protocol."},
{id:"ad13",p:3,s:"p",t:"Outcome numbers",k:"Type A surgery 26% mortality vs over 50% medical (IRAD 2000). Type B: 9% in hospital, 20% at 5 years."},
{id:"ad14",p:3,s:"p",t:"Aneurysm surgery thresholds",k:"Over 5.5 cm, growth over 0.5 cm in 6 months or over 1 cm in a year. Women lower (4.5-5 cm, debated)."}
], sg: [
{id:"ads1",p:2,s:"p",t:"Why no anticoagulant or thrombolytic if dissection is possible",k:"They can extend the bleed. Rule dissection out before giving them to a patient with tearing pain. (My suggestion from standard teaching, not on the page.)"},
{id:"ads2",p:2,s:"p",t:"Aortic dissection risk score (ADD-RS)",k:"Counts high-risk conditions, high-risk pain features and high-risk exam findings (0-3 points). Used to decide between D-dimer and straight to CTA. (My suggestion.)"},
{id:"ads3",p:3,s:"p",t:"DeBakey types 1, 2, 3",k:"1 ascending and descending, 2 ascending only, 3 descending only."}
]},

"pulmonary-embolism-and-vte": { items: [
{id:"pe1",p:1,s:"p",t:"The three risk classes",k:"High: arrest or SBP under 90 not from another cause (PESI IV+). Intermediate: RV strain or troponin without hypotension (high if both, low if only one). Low: neither."},
{id:"pe2",p:1,s:"p",t:"Massive PE: respect the RV",k:"Avoid big fluid boluses (about 500 mL at most if hypotensive). Avoid intubation: positive pressure drops venous return and the patient can collapse. HFNC instead. If you must intubate: ketamine, epinephrine at the bedside."},
{id:"pe3",p:1,s:"p",t:"Crashing PE: what you do",k:"Call the PE response team. Epinephrine, consider pulmonary vasodilators (NO or epoprostenol), thrombolysis or thrombectomy, and think ECMO. Pads and crash cart nearby."},
{id:"pe4",p:1,s:"p",t:"Which anticoagulant first",k:"LMWH if stable with normal kidneys; otherwise UFH bolus and infusion. Thrombolysis only if high risk. Heparin stops new clot; the body dissolves the old clot."},
{id:"pe5",p:1,s:"p",t:"Absolute contraindications to tPA",k:"Haemorrhagic stroke, ischaemic stroke in the last 3 months, AVM, recent brain or spine surgery, head trauma with fracture or brain injury in 3 weeks, serious active bleeding."},
{id:"pe6",p:1,s:"p",t:"Rule-out pathway: Wells, PERC, D-dimer",k:"Low PE probability: PERC or D-dimer. Moderate or high: imaging. D-dimer under 500 with moderate probability or under 1000 with low probability rules it out. Age-adjusted cut-off is age x 10."},
{id:"pe7",p:2,s:"p",t:"Relative contraindications to tPA",k:"CNS tumour, major surgery in 2-3 weeks, platelets under 100, INR over 1.7, fibrinogen under 150, oral anticoagulant, BP over 180/110, age over 75, advanced cirrhosis."},
{id:"pe8",p:2,s:"p",t:"Switching to an oral anticoagulant",k:"Apixaban 10 mg twice daily for 7 days then 5 mg twice daily. Treat 3 months if provoked; indefinite if unprovoked with low bleeding risk, or if cancer."},
{id:"pe9",p:2,s:"p",t:"Signs of RV strain",k:"Echo: enlarged RV, moderate or severe TR, McConnell's sign, flat septum. CT: RV/LV over 0.9. Troponin up, NT-proBNP over 500."},
{id:"pe10",p:2,s:"p",t:"What the ECG shows",k:"Normal in 20%. Tachycardia is the commonest (28%). T-wave inversion V1-V4, S1Q3T3 (about 8%), new RBBB, ST elevation in aVR."},
{id:"pe11",p:2,s:"p",t:"Why the heart fails",k:"Pressure in the RV rises, cardiac output falls, SVR rises, the septum bows into the LV and further cuts filling. Massive PE is a common cause of PEA arrest."},
{id:"pe12",p:2,s:"p",t:"Risk factors by strength",k:"Fracture or major surgery (OR over 10). OCP, hospitalised, previous VTE, cancer, sepsis (2-9). Bed rest, long travel, age, obesity, smoking, cirrhosis, CKD (under 2). Virchow: stasis, vessel injury, hypercoagulability."},
{id:"pe13",p:2,s:"p",t:"Provoked vs unprovoked follow-up",k:"Unprovoked: about 10% recurrence in year 1 off treatment, then 5% a year. Age-appropriate cancer screening. No thrombophilia testing in the acute phase (exception: high concern for antiphospholipid syndrome)."},
{id:"pe14",p:3,s:"p",t:"Special situations",k:"Cancer: LMWH beats warfarin (CLOT). DOACs less reliable with malabsorption or BMI over 40. Subsegmental PE with low recurrence risk needs no anticoagulation. A negative leg Doppler does not rule out PE."},
{id:"pe15",p:3,s:"p",t:"Thrombolysis evidence",k:"PEITHO: in intermediate-risk PE no long-term benefit but more major bleeding and haemorrhagic stroke. Lyse in massive PE to prevent immediate death."}
], sg: [
{id:"pes1",p:1,s:"p",t:"Australian anticoagulant choice and dosing (eTG)",k:"Not checked against Australian guidance. Look up the current eTG regimen before you rely on the apixaban dosing above. (My suggestion.)"},
{id:"pes2",p:2,s:"p",t:"Imaging choice in pregnancy and kidney disease",k:"CT pulmonary angiogram is first line; V/Q scan is an alternative when contrast or radiation is a problem. (My suggestion from standard teaching.)"},
{id:"pes3",p:3,s:"p",t:"Proximal vs distal DVT",k:"Iliac, femoral and popliteal clots carry the PE risk; below the knee less so. May-Thurner: left iliac vein compressed by the right iliac artery."}
]},

"atrial-fibrillation": { items: [
{id:"af1",p:1,s:"p",t:"Who gets anticoagulated",k:"CHA2DS2-VASc 2 or more in men, 3 or more in women (stroke risk 2% a year or more)."},
{id:"af2",p:1,s:"p",t:"CHA2DS2-VASc points",k:"Heart failure 1, hypertension 1, age 75+ 2, diabetes 1, stroke or TIA 2, vascular disease 1, age 65-74 1, female 1."},
{id:"af3",p:1,s:"p",t:"DOACs first line, and warfarin only for",k:"DOAC for non-valvular AF. Warfarin (INR 2-3) for moderate to severe mitral stenosis, mechanical valves, or CrCl under 15 if apixaban not possible. Aspirin alone is not enough."},
{id:"af4",p:1,s:"p",t:"Rate control: target and first-line drugs",k:"Target under 110 (under 80 if LV dysfunction or symptoms). Beta-blocker or diltiazem/verapamil. No non-dihydropyridine CCB with moderate or severe LV systolic dysfunction."},
{id:"af5",p:1,s:"p",t:"Second-line rate control and the WPW trap",k:"Digoxin (slow, about 2 hours), amiodarone. In pre-excited AF (WPW) AV-nodal blockers are contraindicated: procainamide instead."},
{id:"af6",p:1,s:"p",t:"Electrical cardioversion technique",k:"Sedate, anteroposterior pads, synchronise to the QRS, start about 100 J biphasic. Never defibrillate AF."},
{id:"af7",p:2,s:"p",t:"DOAC doses (US page)",k:"Apixaban 5 mg twice daily (2.5 if two of: 80+, 60 kg or less, creatinine 1.5+). Rivaroxaban 20 mg with food (15 if CrCl 15-50). Edoxaban 60 (30). Dabigatran 150 twice daily (110). Check Australian product information."},
{id:"af8",p:2,s:"p",t:"Who benefits from rhythm control",k:"Symptomatic despite rate control, first episode, heart failure (especially HFrEF), young, athletes, patient preference."},
{id:"af9",p:2,s:"p",t:"Drug cardioversion and the structural-heart rule",k:"Flecainide or propafenone only without structural heart disease or coronary disease. Amiodarone, dofetilide or ibutilide otherwise."},
{id:"af10",p:2,s:"p",t:"Keeping sinus rhythm",k:"Class Ic (avoid in CAD or structural disease), amiodarone, sotalol, dofetilide, dronedarone. No antiarrhythmic in advanced conduction disease without pacing."},
{id:"af11",p:2,s:"p",t:"Catheter ablation",k:"Pulmonary vein isolation. Works best in paroxysmal AF (70-80%), heart failure, young symptomatic patients. Keep anticoagulation based on the score, not the rhythm."},
{id:"af12",p:2,s:"p",t:"Risk-factor modification",k:"Weight loss 10% or more, exercise 210 minutes a week, BP under 130/80, treat sleep apnoea, alcohol under 3 drinks a week, stop smoking, glycaemic control. Caffeine restriction not advised."},
{id:"af13",p:3,s:"p",t:"Bleeding scores",k:"HAS-BLED is not used on its own to withhold anticoagulation; it identifies bleeding risks you can fix."},
{id:"af14",p:3,s:"p",t:"After PCI",k:"Stop aspirin early (1-4 weeks) and keep an anticoagulant plus a P2Y12 inhibitor, rather than triple therapy."},
{id:"af15",p:3,s:"p",t:"AF burden and stroke timing",k:"Episodes over 17-24 hours carry significant risk. Over twofold risk from 1 hour. Risk highest in the 5 days after an episode."}
], sg: [
{id:"afs1",p:1,s:"a",t:"Unstable AF: synchronised cardioversion",k:"Adverse signs (low BP, chest pain, heart failure, confusion, very fast rate) mean cardioversion with sedation, not drugs first (ANZCOR 11.9)."},
{id:"afs2",p:1,s:"a",t:"AF over 48 hours: anticoagulate before cardioversion",k:"Do not cardiovert (shock or drug) unless fully anticoagulated or a TOE shows no clot (ANZCOR 11.9)."},
{id:"afs3",p:2,s:"b",t:"Australian version of the rate-control order",k:"Open the AF Study Kit (Australia first) in this app: it compares the US page with Australian guidance."}
]},

"bradycardia": { items: [
{id:"br1",p:1,s:"a",t:"Who is unstable (adverse signs)",k:"Systolic BP under 90, heart rate under 40, ventricular arrhythmia, heart failure. The US page also lists confusion, chest pain and breathlessness."},
{id:"br2",p:1,s:"b",t:"Atropine dose",k:"Australia: 500-600 mcg IV every 3-5 minutes up to 3 mg. US page says 1 mg a dose. Too low a dose can slow the heart further."},
{id:"br3",p:1,s:"a",t:"If atropine fails",k:"Adrenaline 2-10 mcg/min, or transcutaneous pacing at 70-80 a minute starting near 30 mA until capture. Capture = a QRS after every spike plus a pulse; chest twitching proves nothing."},
{id:"br4",p:1,s:"p",t:"The four can't-miss causes",k:"Acute coronary syndrome (especially inferior MI), complete heart block, beta-blocker or calcium-channel blocker toxicity, hyperkalaemia."},
{id:"br5",p:1,s:"b",t:"Beta-blocker or CCB toxicity",k:"Glucagon, or insulin with glucose and potassium, and much higher adrenaline doses. Call the Poisons Information Centre 13 11 26. The glucagon dose is not in the Australian source: use toxicology guidance."},
{id:"br6",p:1,s:"p",t:"Where atropine won't work",k:"Complete heart block (especially wide QRS), block below the AV node, and a transplanted heart. The page also warns about acute MI."},
{id:"br7",p:1,s:"p",t:"The four heart blocks",k:"First degree: long fixed PR. Mobitz I: PR lengthens then a drop. Mobitz II: fixed PR, sudden drops. Complete: atria and ventricles independent."},
{id:"br8",p:1,s:"a",t:"Asystole-risk markers",k:"Recent asystole, Mobitz II, complete block with a broad QRS or rate under 40, a pause over 3 seconds: pads on and call cardiology even if the patient looks well."},
{id:"br9",p:2,s:"p",t:"Node vs below: why they behave differently",k:"The node tires gradually (warning, atropine helps). The wires below conduct or fail suddenly (no warning, atropine fails). See the Heart block pages in this app."},
{id:"br10",p:2,s:"p",t:"Reversible causes to look for",k:"Drugs (beta-blockers, CCBs, amiodarone, opioids, SSRIs), hyperkalaemia, hypothyroidism, hypothermia, raised intracranial pressure, infection (Lyme, endocarditis), ischaemia, vagal tone."},
{id:"br11",p:2,s:"p",t:"First-hour work-up",k:"Telemetry, 12-lead ECG, CBC, BMP (potassium), TSH, troponin, echo. Check prior ECG, the drug chart and prior heart disease."},
{id:"br12",p:2,s:"p",t:"Permanent pacemaker indications",k:"Symptomatic sinus bradycardia (with or without pauses), complete heart block, symptomatic second-degree block, syncope from bradycardia. Correct reversible causes first; involve EP."},
{id:"br13",p:3,s:"p",t:"Definitions",k:"Bradycardia is under 60 but symptoms usually start under 50. Sick sinus syndrome is SA node dysfunction. Junctional rhythm starts in the AV node. Athletes and sleep can be physiological."}
], sg: [
{id:"brs1",p:2,s:"p",t:"Hyperkalaemia on the ECG and how it is treated",k:"Peaked T, wide QRS, loss of P waves; IV calcium, insulin with glucose, per your protocol. (My suggestion from standard teaching.)"},
{id:"brs2",p:2,s:"p",t:"Inferior MI with bradycardia",k:"Treat both together: ACS pathway, atropine reasonable, pace early, avoid nitrates when hypotensive. (My suggestion.)"},
{id:"brs3",p:3,s:"p",t:"Sedation for pacing",k:"The US page suggests fentanyl then midazolam; ANZCOR names none. Use your hospital protocol and senior help."}
]},

"tachyarrhythmias-rapid-response": { items: [
{id:"tc1",p:1,s:"a",t:"Is the patient unstable? Adverse signs",k:"Systolic BP under 90, heart rate over 150, chest pain, heart failure, drowsy or confused. Unstable = synchronised cardioversion with sedation."},
{id:"tc2",p:1,s:"a",t:"If the shock fails",k:"Amiodarone 300 mg IV over 10-20 minutes, repeat the shock, then 900 mg over 24 hours."},
{id:"tc3",p:1,s:"p",t:"The four boxes",k:"Narrow regular: sinus, flutter, AVNRT/AVRT. Narrow irregular: AF, MAT. Wide regular: VT. Wide irregular: AF with block, pre-excited AF, torsades."},
{id:"tc4",p:1,s:"a",t:"Narrow regular, stable: the sequence",k:"Valsalva, then adenosine 6 mg, then 12 mg (flush at least 20 mL), then verapamil 2.5-5 mg or diltiazem 15-20 mg if adenosine is unsuitable."},
{id:"tc5",p:1,s:"a",t:"Wide regular: treat as VT",k:"Amiodarone 300 mg over 20-60 minutes then 900 mg over 24 hours. Never verapamil or diltiazem."},
{id:"tc6",p:1,s:"a",t:"Torsades",k:"Stop QT drugs, correct potassium, magnesium 5 mmol IV over 10 minutes (may repeat once), then 20 mmol over 4 hours. Avoid amiodarone. Adverse signs: shock. The US page's '2-4 mg' looks like a typo for grams."},
{id:"tc7",p:1,s:"a",t:"Pre-excited AF: what to avoid",k:"No adenosine, digoxin, verapamil or diltiazem. Electrical cardioversion is usually safest."},
{id:"tc8",p:2,s:"a",t:"Modified Valsalva technique",k:"Strain into a 10 mL syringe for 15 seconds, then lie flat with legs raised 45 degrees for 15 seconds. Converts about 43% vs 5-20% for standard Valsalva."},
{id:"tc9",p:2,s:"a",t:"Narrow irregular (AF): stable plan",k:"Metoprolol 5 mg IV (not with wheeze or decompensated heart failure) or digoxin 250-500 mcg. Over 48 hours: no cardioversion unless anticoagulated or TOE clear."},
{id:"tc10",p:2,s:"p",t:"Causes of sinus tachycardia",k:"Pain, anxiety, hypovolaemia, fever, heart failure, ACS, PE, hypoxia, alcohol withdrawal, thyroid, caffeine, drugs. Treat the cause; never shock it."},
{id:"tc11",p:2,s:"p",t:"First minute at the bedside",k:"Oxygen if low, monitor, IV, pads, 12-lead ECG, bloods (K, Mg, troponin, lactate, TSH), call your senior. No pulse: arrest algorithm."},
{id:"tc12",p:3,s:"p",t:"Sedation for shocks",k:"The US page suggests fentanyl 50 mcg and midazolam 1-2 mg. ANZCOR names no drug or dose: use your protocol and senior or anaesthetic help."},
{id:"tc13",p:3,s:"p",t:"Respiratory support ladder",k:"Non-rebreather, then HFNC, then NIPPV (BiPAP for COPD, CPAP for heart failure), then intubate. Watch PaCO2 and pH."}
], sg: [
{id:"tcs1",p:1,s:"p",t:"Adenosine: side effects and cautions",k:"Brief chest tightness and a pause are expected; warn the patient. Avoid in pre-excited AF. (My suggestion from standard teaching.)"},
{id:"tcs2",p:2,s:"p",t:"After conversion",k:"Repeat the 12-lead (delta wave?), check K and Mg, find the cause, tell your senior or cardiology. (My suggestion.)"},
{id:"tcs3",p:3,s:"a",t:"Lignocaine in VT during acute MI",k:"ANZCOR calls it reasonable for stable sustained monomorphic VT with ischaemia, and gives no dose."}
]}
};
