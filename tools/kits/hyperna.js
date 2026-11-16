window.KIT = {
  title: 'Hypernatraemia',
  lede: 'Usually a water problem. Restore perfusion if he is shocked, replace water slowly, and find out why he lost it. Press Next.',
  flag: '<b>How far to trust this.</b> This is standard teaching, not checked against an Australian source here. The correction limit (no faster than 10 mmol/L in 24 hours for a chronic case) and the free-water approach are the usual ones. Confirm the desmopressin dose with your hospital protocol.',
  steps: [
    { h: 'Sort it', blocks: [
      { rx: { h: 'Why is the sodium high?', items: ['Water loss with poor intake: dehydration, fever, elderly or confused patients who cannot reach a drink.', 'Water loss from the kidney: osmotic diuresis (high glucose), diabetes insipidus (after head injury or pituitary surgery, or from lithium or high calcium).', 'Salt gain: hypertonic saline or bicarbonate. Rarely the main cause.'] } },
      { rx: { h: 'Look at the patient', items: ['Is he shocked (low BP, fast pulse)? Treat the shock first with 0.9% saline.', 'Is he confused, weak or fitting? That is a severe case.', 'How much urine, and how concentrated? Large dilute urine suggests diabetes insipidus.'] } },
      { table: { head: ['Sodium (mmol/L)', 'Grade'], rows: [['146 to 150', 'Mild'], ['151 to 159', 'Moderate'], ['160 and above', 'Severe']] } }] },
    { h: 'Replace the water slowly', say: 'Too fast a fall moves water into brain cells and can cause cerebral oedema.', blocks: [
      { rx: { h: 'Order of treatment', items: ['If shocked: 0.9% saline in boluses, until perfused.', 'Then oral or enteral water if he can take it.', 'If he cannot drink: glucose 5% IV, at a rate your senior agrees, and recheck every 4 to 6 hours.', 'Treat the cause: infection, glucose, drugs, calcium.'] } },
      { rx: { h: 'Rate limit', cls: 'warn', items: ['A chronic case (more than 48 hours): fall by no more than 10 mmol/L in 24 hours, about 0.5 an hour.', 'Check the sodium every 4 to 6 hours, more often if it is falling fast.', 'If it falls too fast, slow the water and call a senior.'] } }] },
    { h: 'Diabetes insipidus', blocks: [
      { rx: { h: 'Spot it', items: ['A high sodium with a very large volume of dilute urine (over 3 L a day or 200 mL an hour, urine osmolality below 300 mmol/kg).', 'Central: after head injury, pituitary surgery. Nephrogenic: lithium, hypercalcaemia.'] } },
      { rx: { h: 'Treat it', items: ['Replace water, chart urine output hourly and check the sodium frequently.', 'Central DI responds to desmopressin: a decision for the endocrine or surgical team.', 'Nephrogenic: remove the cause.'] } },
      { rx: { h: 'Call your registrar if', cls: 'warn', items: ['Sodium 160 or more, or confusion or seizures.', 'A big urine output with a rising sodium.'] } }] }
  ],
  opts: [['ns', '0.9% saline'], ['water', 'Oral or enteral water'], ['d5', 'Glucose 5% IV'], ['des', 'Desmopressin, with seniors'], ['slow', 'Slow it down and recheck']],
  items: [
    { t: 'Sodium 158, BP 88/50, pulse 118, dry.', a: 'ns', why: 'Shocked: restore perfusion with 0.9% saline first, then replace the water.' },
    { t: 'Sodium 152, stable, drinking, mildly confused.', a: 'water', why: 'Oral or enteral water is the safest route. Replace slowly and find the cause.' },
    { t: 'Sodium 156, vomiting and cannot drink, normal BP.', a: 'd5', why: 'Glucose 5% IV when he cannot drink, rechecking the sodium every 4 to 6 hours.' },
    { t: 'Sodium 151 after pituitary surgery with 500 mL of dilute urine an hour.', a: 'des', why: 'Looks like central diabetes insipidus. Replace water and ask your seniors about desmopressin.' },
    { t: 'The sodium was 160 twelve hours ago and is 144 now.', a: 'slow', why: 'A fall of 16 in 12 hours is too fast. Slow the water, recheck in 2 hours and tell your registrar.' },
    { t: 'Sodium 149, glucose 28 and a big urine output.', a: 'ns', why: 'An osmotic diuresis with dehydration needs saline first and treating the hyperglycaemia, not just water.' }
  ]
};
