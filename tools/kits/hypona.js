window.KIT = {
  title: 'Hyponatraemia',
  lede: 'Treat the symptoms first, then the cause. The danger is correcting too fast. Press Next.',
  flag: '<b>How far to trust this.</b> The 3% saline bolus (150 mL over 20 minutes) and the correction limits follow NSW SESLHD hyponatraemia guidance. The fluid restriction volume, and the regimen for reversing an overcorrection, are not checked here: follow your hospital protocol and ask a senior.',
  steps: [
    { h: 'How bad, and what kind', blocks: [
      { table: { head: ['Sodium (mmol/L)', 'Grade', 'Note'], aus: 1, rows: [
        ['130 to 134', 'Mild', 'Often found by chance.'],
        ['125 to 129', 'Moderate', 'Nausea, headache, confusion.'],
        ['Below 125, or any seizure or coma', 'Severe', 'Seizure and coma are the emergency, whatever the number.']] } },
      { rx: { h: 'Sort it before you treat it', items: ['Serum osmolality (true low-sodium state), urine osmolality and urine sodium.', 'Look at the volume: dry (hypovolaemic), normal (SIADH, adrenal, thyroid) or wet (heart failure, cirrhosis, kidney).', 'Drugs: thiazides, SSRIs, carbamazepine, PPIs. Stop what you can.', 'Check cortisol and thyroid before calling it SIADH.'] } }] },
    { h: 'Treat by symptoms and by type', blocks: [
      { rx: { h: 'Severe symptoms: seizure, coma', cls: 'stop', items: ['Hypertonic saline 3%: 150 mL over 20 minutes, check the sodium after each, repeat up to twice (NSW SESLHD).', 'Aim for a rise of about 5 mmol/L in the first hour, then stop the 3% saline.', 'Check the glucose. Antiepileptics do not fix this: the sodium does.', 'Call your registrar and critical care.'] } },
      { rx: { h: 'Mild or chronic', items: ['Dry: 0.9% saline. Watch for a sudden rise once the volume is back, because the kidney starts to pass dilute urine.', 'SIADH (euvolaemic, urine concentrated): fluid restriction. Do not give saline: he keeps the water and passes the salt.', 'Wet: fluid restriction and treat the heart, liver or kidney.', 'Stop hypotonic IV fluids (glucose 5%, 0.45% saline).'] } }] },
    { h: 'Do not overcorrect', say: 'Raising the sodium too fast can cause osmotic demyelination, days later. It cannot be undone.', blocks: [
      { rx: { h: 'Limits and checks', cls: 'warn', items: ['Do not rise by more than 10 mmol/L in 24 hours (8 if alcohol, malnutrition, liver disease or low potassium).', 'Check the sodium every 2 to 4 hours while treating (after each bolus in severe cases).', 'Chart urine output hourly: a sudden large dilute urine output means the sodium is about to shoot up.'] } },
      { rx: { h: 'If it is rising too fast', items: ['Stop the hypertonic saline.', 'Ask your registrar about desmopressin and glucose 5% to bring it back (a senior decision, per protocol).'] } }] }
  ],
  opts: [['hyp', '3% saline bolus'], ['fr', 'Fluid restriction'], ['ns', '0.9% saline'], ['stop', 'Stop the drug or fluid'], ['mon', 'Check sodium and urine output']],
  items: [
    { t: 'Sodium 112 with a seizure.', a: 'hyp', why: 'Severe symptoms: 150 mL of 3% saline over 20 minutes, check the sodium, and repeat as needed.' },
    { t: 'Sodium 126, euvolaemic, urine osmolality 480, urine sodium 60, mild headache.', a: 'fr', why: 'Looks like SIADH: fluid restriction. Saline would make it worse.' },
    { t: 'Sodium 123 in a vomiting, dry patient with a low BP.', a: 'ns', why: 'Dry patient: 0.9% saline, watching for a sudden diuresis.' },
    { t: 'Sodium 127 on a thiazide and an SSRI, well.', a: 'stop', why: 'Stop the drug that is causing it, and recheck.' },
    { t: 'Sodium has risen from 116 to 123 in 3 hours and he is passing 300 mL an hour of clear urine.', a: 'mon', why: 'He is on course to overshoot. Stop the saline, check sodium hourly and call a senior.' },
    { t: 'Sodium 129, no symptoms, on glucose 5% maintenance.', a: 'stop', why: 'Stop the hypotonic fluid first.' }
  ]
};
