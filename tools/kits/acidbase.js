window.KIT = {
  title: 'Reading a blood gas',
  lede: 'Four questions, always in the same order. Then treat the patient, not the gas. Press Next.',
  flag: '<b>How far to trust this.</b> The compensation rules are standard teaching formulas, not checked against an Australian source here. Normal ranges differ between labs: use the ones printed on your result.',
  steps: [
    { h: 'Read it in order', blocks: [
      { rx: { h: 'Four questions', items: ['1. Is the pH low (acidaemia, under 7.35) or high (alkalaemia, over 7.45)?', '2. What moved the pH: the CO2 (breathing) or the bicarbonate (metabolic)? Low pH with high CO2 is respiratory. Low pH with low bicarbonate is metabolic.', '3. Is the other side compensating as much as it should? If not, there is a second problem.', '4. In a metabolic acidosis, work out the anion gap: sodium minus chloride minus bicarbonate.'] } },
      { table: { head: ['Primary problem', 'What you see', 'Expected compensation'], rows: [
        ['Metabolic acidosis', 'Low pH, low bicarbonate', 'pCO2 about 1.5 x bicarbonate + 8, give or take 2 (Winter formula)'],
        ['Metabolic alkalosis', 'High pH, high bicarbonate', 'pCO2 rises about 0.7 for each 1 rise in bicarbonate'],
        ['Respiratory acidosis', 'Low pH, high pCO2', 'Bicarbonate up about 1 per 10 in the acute state, 3 to 4 per 10 if chronic'],
        ['Respiratory alkalosis', 'High pH, low pCO2', 'Bicarbonate down about 2 per 10 acute, 4 to 5 per 10 if chronic']] } }] },
    { h: 'Mixed disorders and the gap', say: 'A normal-looking pH can hide two opposite problems.', blocks: [
      { rx: { h: 'If compensation does not fit', items: ['pCO2 lower than expected in a metabolic acidosis: an extra respiratory alkalosis (salicylate, sepsis, pain).', 'pCO2 higher than expected: an extra respiratory acidosis, and the patient may be tiring.', 'A bicarbonate rise much smaller than the anion gap rise: an extra metabolic alkalosis (for example vomiting).'] } },
      { rx: { h: 'Anion gap (about 8 to 12, check your lab)', items: ['High gap: lactate, ketones, kidney failure, toxins (methanol, ethylene glycol, salicylate, metformin).', 'Normal gap: diarrhoea, kidney tubular problems, a large 0.9% saline load.', 'A low albumin lowers the normal gap: adjust.'] } }] },
    { h: 'Then act on the patient', blocks: [
      { rx: { h: 'The number is a clue, not the target', items: ['Treat the cause: infection, ketones, obstruction, overdose, fluid, oxygen.', 'Do not correct a pH with bicarbonate just because it looks bad.', 'In a CO2 retainer, controlled oxygen (target 88 to 92%) matters more than any drug.', 'Repeat the gas after your treatment, usually in 30 to 60 minutes.'] } },
      { rx: { h: 'Call your registrar if', cls: 'warn', items: ['pH under 7.2, or a patient who is tiring or drowsy.', 'A high gap acidosis you cannot explain, or any suspected overdose or toxic alcohol.'] } }] }
  ],
  opts: [['rac', 'Respiratory acidosis'], ['mac', 'Metabolic acidosis'], ['ral', 'Respiratory alkalosis'], ['mal', 'Metabolic alkalosis'], ['mix', 'Mixed disorder']],
  items: [
    { t: 'pH 7.25, pCO2 80, bicarbonate 34, a known COPD patient on oxygen.', a: 'rac', why: 'High CO2 with a low pH is respiratory acidosis. The raised bicarbonate shows it is chronic with an acute worsening.' },
    { t: 'pH 7.28, pCO2 28, bicarbonate 13.', a: 'mac', why: 'Expected pCO2 is 1.5 x 13 + 8 = 27.5: the breathing is compensating as it should.' },
    { t: 'pH 7.50, pCO2 26, bicarbonate 21, breathless after hip surgery.', a: 'ral', why: 'Low CO2 with a high pH. Do not call it anxiety until you have looked for a clot, sepsis and pain.' },
    { t: 'pH 7.52, pCO2 50, bicarbonate 40 after days of vomiting.', a: 'mal', why: 'Expected pCO2 about 40 + 0.7 x 16 = 51: compensation is appropriate.' },
    { t: 'pH 7.40, pCO2 22, bicarbonate 14, anion gap 20, after an overdose.', a: 'mix', why: 'Expected pCO2 is 29. At 22 it is far lower, so there is a respiratory alkalosis on top of a gap acidosis.' },
    { t: 'pH 7.38, pCO2 33, bicarbonate 21, anion gap 32, vomiting and heavy alcohol use.', a: 'mix', why: 'The gap rose by about 20 but the bicarbonate fell by only 3: a metabolic alkalosis from vomiting hides behind a gap acidosis.' }
  ]
};
