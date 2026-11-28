window.KIT = {
  title: 'Hyponatraemia',
  lede: 'Treat the symptoms first, then the cause. The danger is correcting too fast. Press Next.',
  flag: '<b>How far to trust this.</b> The severity bands are from eTG (Hyponatraemia in adults, 2026). The 3% saline bolus (100 mL over 10 minutes, up to 3 doses), the fluid restriction volume and the 18 mmol/L in 48 hours limit are from eTG 2021, as quoted in the Malleus deck, not read in eTG itself. The 10 in 24 hours limit also matches NSW SESLHD. The regimen for reversing an overcorrection is not checked here: follow your hospital protocol and ask a senior.',
  steps: [
    { h: 'What low sodium means', say: 'Sodium is low because there is too much water, not always too little salt. Play with how much water the kidney can lose.', blocks: [
      { embed: { src: 'hypona_lab.html?embed=water', title: 'Water balance: how much can the kidney get rid of?', h: 900 } }] },
    { h: 'How bad, and what kind', blocks: [
      { table: { head: ['Sodium (mmol/L)', 'Grade', 'Note'], aus: 1, rows: [
        ['130 to 134', 'Mild', 'Often found by chance.'],
        ['120 to 129', 'Moderate', 'Nausea, headache, confusion.'],
        ['Below 120, or any seizure, drowsiness or coma', 'Severe', 'Cerebral symptoms (seizure, drowsiness, coma) make it severe, whatever the number (eTG 2026).']] } },
      { rx: { h: 'Sort it before you treat it', items: ['Serum osmolality (true low-sodium state), urine osmolality and urine sodium.', 'Look at the volume: dry (hypovolaemic), normal (SIADH, adrenal, thyroid) or wet (heart failure, cirrhosis, kidney).', 'Drugs: thiazides, SSRIs, carbamazepine, PPIs. Stop what you can.', 'Check cortisol and thyroid before calling it SIADH.'] } },
      { embed: { src: 'hypona_lab.html?embed=shelf', title: 'Three shelves: low, normal or high osmolality', h: 1000 } },
      { embed: { src: 'hypona_lab.html?embed=fake', title: 'Fake low sodium: sugar and the machine', h: 1000 } },
      { embed: { src: 'hypona_lab.html?embed=path', title: 'Diagnosis game', h: 1000 } },
      { rx: { h: 'Urine results that fit SIADH', items: ['Euvolaemic patient', '<b>Urine concentrated:</b> osmolality inappropriately high (usually over 100 mmol/kg)', 'Urine sodium not low (usually over 30 mmol/L)', 'Normal cortisol and thyroid function', '<small>(Standard teaching.)</small>'] } }] },
    { h: 'Treat by symptoms and by type', blocks: [
      { embed: { src: 'hypona_lab.html?embed=fluid', title: 'Which fluid, and how fast may the sodium rise?', h: 1000 } },
      { rx: { h: 'Severe symptoms: seizure, coma', cls: 'stop', items: ['Hypertonic saline 3%: 100 mL IV over 10 minutes, in a monitored bed. Recheck the sodium and repeat if still symptomatic, up to 3 doses in total (eTG).', '<small>(Some hospitals use 150 mL over 20 minutes, repeated up to twice (NSW SESLHD). Follow your protocol.)</small>', 'Aim for a rise of about 5 mmol/L in the first hour, then stop the 3% saline.', 'Check the glucose. Antiepileptics do not fix this: the sodium does.', 'Call your registrar and critical care.'] } },
      { rx: { h: 'Mild or chronic', items: ['Dry: 0.9% saline. Watch for a sudden rise once the volume is back, because the kidney starts to pass dilute urine.', 'SIADH (euvolaemic, urine concentrated): fluid restriction. Do not give saline: he keeps the water and passes the salt. Restrict to about 500 to 1000 mL a day (or 500 mL less than the daily urine output). If restriction fails, specialist options are urea tablets or a vaptan (tolvaptan) (LITFL).', 'Wet: fluid restriction and treat the heart, liver or kidney.', 'Stop hypotonic IV fluids (glucose 5%, 0.45% saline).'] } }] },
    { h: 'Do not overcorrect', say: 'Raising the sodium too fast can cause osmotic demyelination, days later. It cannot be undone.', blocks: [
      { rx: { h: 'Limits and checks', cls: 'warn', items: ['Do not rise by more than 10 mmol/L in 24 hours (8 if alcohol, malnutrition, liver disease or low potassium), and no more than 18 mmol/L in 48 hours.', 'Check the sodium every 2 to 4 hours while treating (after each bolus in severe cases).', 'Chart urine output hourly: a sudden large dilute urine output means the sodium is about to shoot up.'] } },
      { rx: { h: 'If it is rising too fast', items: ['Stop the hypertonic saline.', 'Ask your registrar about desmopressin and glucose 5% to bring it back (a senior decision, per protocol).'] } },
      { embed: { src: 'hypona_lab.html?embed=sheet', title: 'The path in one picture', h: 900 } }] }
  ],
  opts: [['hyp', '3% saline bolus'], ['fr', 'Fluid restriction'], ['ns', '0.9% saline'], ['stop', 'Stop the drug or fluid'], ['mon', 'Check sodium and urine output']],
  items: [
    { t: 'Sodium 112 with a seizure.', a: 'hyp', why: 'Severe symptoms: 100 mL of 3% saline over 10 minutes, recheck the sodium, and repeat if still symptomatic (up to 3 doses).' },
    { t: 'Sodium 126, euvolaemic, urine osmolality 480, urine sodium 60, mild headache.', a: 'fr', why: 'Looks like SIADH: fluid restriction. Saline would make it worse.' },
    { t: 'Sodium 123 in a vomiting, dry patient with a low BP.', a: 'ns', why: 'Dry patient: 0.9% saline, watching for a sudden diuresis.' },
    { t: 'Sodium 127 on a thiazide and an SSRI, well.', a: 'stop', why: 'Stop the drug that is causing it, and recheck.' },
    { t: 'Sodium has risen from 116 to 123 in 3 hours and he is passing 300 mL an hour of clear urine.', a: 'mon', why: 'He is on course to overshoot. Stop the saline, check sodium hourly and call a senior.' },
    { t: 'Sodium 129, no symptoms, on glucose 5% maintenance.', a: 'stop', why: 'Stop the hypotonic fluid first.' }
  ]
};
