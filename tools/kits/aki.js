window.KIT = {
  title: 'Acute kidney injury',
  lede: 'Spot it, find the cause, stop the damage, know when to call. Based on the KDIGO approach as adapted by KHA-CARI. Press Next.',
  flag: '<b>How far to trust this.</b> The staging table is standard KDIGO teaching. I could not open the KHA-CARI guideline text itself, so check thresholds against it. Fluid volumes and drug doses are not given on purpose: use your hospital protocol and eTG.',
  steps: [
    { h: 'What counts as AKI', say: 'Compare with the patient\'s own baseline, not a lab reference range. Either the creatinine or the urine output can make the diagnosis.', blocks: [
      { table: { head: ['Stage', 'Creatinine', 'Urine output'], aus: 0, rows: [
        ['1', 'Rise of 26 micromol/L or more in 48 hours, or 1.5 to 1.9 times baseline', 'Under 0.5 mL/kg/h for 6 to 12 hours'],
        ['2', '2.0 to 2.9 times baseline', 'Under 0.5 mL/kg/h for 12 hours or more'],
        ['3', '3 times baseline, or 354 micromol/L or more, or starting dialysis', 'Under 0.3 mL/kg/h for 24 hours, or no urine for 12 hours']] } },
      { rx: { h: 'Two traps', items: ['A small creatinine rise in a frail, low-muscle patient is a bigger fall in kidney function than it looks.', 'A normal creatinine does not rule out AKI in the first day. If urine output has dropped, act now.'] } }] },
    { h: 'Find the cause: before, in or after the kidney', blocks: [
      { rx: { h: 'Before the kidney (most common on the ward)', items: ['Dry: vomiting, diarrhoea, bleeding, poor intake, sepsis, low blood pressure.', 'Drugs that lower filtration pressure: ACE inhibitor or ARB, NSAID and a diuretic together.'] } },
      { rx: { h: 'AKI in a patient with cirrhosis', items: ['Stop nephrotoxins and withhold diuretics. Treat the trigger: infection (including SBP), GI bleeding, low volume.', 'If it does not improve with volume, think of hepatorenal syndrome: albumin with terlipressin (noradrenaline if terlipressin is not suitable), with the liver or renal team (eTG).'] } },
      { rx: { h: 'In the kidney', items: ['Acute tubular injury after a prolonged low BP, contrast or aminoglycoside.', 'Blood and protein on the dipstick with a rash, joint pain or a new drug: think glomerulonephritis, vasculitis or interstitial nephritis. Call renal early.'] } },
      { rx: { h: 'After the kidney', cls: 'warn', items: ['Obstruction: prostate, stone, tumour, blocked catheter. Bladder scan first, then ultrasound.', 'An infected, obstructed kidney is an emergency. It needs drainage, not just antibiotics.'] } }] },
    { h: 'The first hour', say: 'Do these together. None of them is a test result you wait for.', blocks: [
      { rx: { h: 'Do now', items: ['Examine volume status (lying and standing BP, JVP, mucous membranes, oedema) and look at the fluid chart.', 'Withhold the drugs that hurt the kidney or build up when it fails (SAD MANS: sulfonylureas, ACE inhibitor, diuretic, metformin, ARB, NSAID, SGLT2 inhibitor). Check every dose for renal clearance.', 'Urine dipstick, and a bladder scan if there is any chance of retention.', 'Bloods: urea, electrolytes and creatinine, potassium above all; add a gas if unwell.', 'ECG if the potassium is high. Hourly urine output chart; weigh daily.', 'If he is dry, give a measured fluid bolus and reassess after each. If he is wet, do not.'] } },
      { rx: { h: 'Within 24 hours', items: ['Renal ultrasound if the cause is unclear or obstruction is possible.', 'Urine protein to creatinine ratio and urine microscopy if the dipstick shows blood or protein.'] } },
      { rx: { h: 'Not furosemide for a dry patient', items: ['Diuretic does not treat the cause', 'Dry or hypotensive patient → lowers BP and kidney blood flow further'] } }] },
    { h: 'When to call, and when dialysis', blocks: [
      { rx: { h: 'Call your registrar and the renal team for', cls: 'stop', items: ['Potassium that stays high or ECG changes (see the hyperkalaemia kit).', 'Pulmonary oedema, or severe acidosis, or confusion or pericarditis from uraemia.', 'Blood and protein on the dipstick, or a creatinine that keeps climbing despite the first steps.', 'An infected obstructed kidney: urology and ICU at once.'] } },
      { rx: { h: 'Reasons for urgent dialysis (AEIOU)', items: ['Acidosis that will not correct, Electrolytes (potassium) that will not respond, Intoxication with a dialysable toxin, Overload with fluid that will not clear, Uraemic complications.'] } }] }
  ],
  opts: [['dry', 'Fluid bolus, withhold the drugs, reassess'], ['scan', 'Bladder scan now, then catheter if retained'], ['call', 'Call the renal team now'], ['dip', 'Dipstick and urine microscopy, call renal'], ['wait', 'Repeat the creatinine in the morning'], ['uro', 'IV antibiotics, urgent urology to drain']],
  items: [
    { t: 'Day 2 after surgery, on ramipril and ibuprofen. BP 98/60, creatinine 190 from a baseline of 85, dry mucous membranes.', a: 'dry', why: 'Pre-renal from low volume and drugs that drop filtration pressure. Withhold ramipril and ibuprofen, give a measured bolus and reassess.' },
    { t: 'An 80-year-old man, creatinine up 3 times, passed no urine for 10 hours, lower abdomen tender and firm.', a: 'scan', why: 'Obstruction until proven otherwise. A bladder scan takes a minute and a catheter may fix it.' },
    { t: 'Creatinine rising, dipstick 3+ blood and 2+ protein, new rash and joint pain.', a: 'dip', why: 'An active urine sediment with a systemic illness suggests glomerulonephritis or vasculitis. Get microscopy and call renal early.' },
    { t: 'Creatinine 210, potassium 7.0 with peaked T waves, pulmonary oedema, on 4 L oxygen.', a: 'call', why: 'Dangerous potassium and overload: treat the potassium now and call the renal team for dialysis.' },
    { t: 'Creatinine 130 from baseline 75, eating and drinking, urine output 0.7 mL/kg/h, clinically euvolaemic.', a: 'wait', why: 'Stage 1 with no dangerous complication: remove the cause, monitor, and recheck. Do not push fluids on a euvolaemic patient.' },
    { t: 'Flank pain, fever 39 and a creatinine rise, CT shows a 6 mm stone with hydronephrosis.', a: 'uro', why: 'Infected and obstructed: antibiotics and urgent drainage by urology.' }
  ]
};
