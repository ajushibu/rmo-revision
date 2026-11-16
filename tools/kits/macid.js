window.KIT = {
  title: 'Metabolic acidosis',
  lede: 'Work out whether the anion gap is high, find the cause, and treat it. Bicarbonate is rarely the answer. Press Next.',
  flag: '<b>How far to trust this.</b> The approach is standard teaching. The sepsis steps follow general Australian practice, and the antibiotic choice is left to your hospital sepsis pathway. I could not verify a bicarbonate threshold against an Australian source: any use of bicarbonate here is a senior decision.',
  steps: [
    { h: 'High gap or normal gap', blocks: [
      { rx: { h: 'Anion gap = sodium minus chloride minus bicarbonate', items: ['About 8 to 12 is normal. Check your lab.', 'A low albumin lowers the gap, so a gap that looks normal can hide a high-gap acidosis.'] } },
      { table: { head: ['Gap', 'Think of', 'First tests'], rows: [
        ['High', 'Lactate (sepsis, shock), ketones (diabetes, alcohol, starvation), kidney failure, toxins', 'Lactate, ketones, creatinine, osmolality, ECG'],
        ['Normal', 'Diarrhoea, kidney tubular problems, a large 0.9% saline load', 'Urine electrolytes, potassium, stool history']] } },
      { rx: { h: 'Check the breathing is compensating', items: ['Expected pCO2 is about 1.5 x bicarbonate + 8, give or take 2.', 'A rising pCO2 in a tiring patient means he is about to decompensate: call.'] } }] },
    { h: 'Treat the cause', say: 'The acid is a sign. Fixing what makes it fixes the acid.', blocks: [
      { rx: { h: 'High-gap causes', items: ['Sepsis and lactate: cultures, antibiotics within the hour, measured fluid boluses, repeat the lactate.', 'Ketoacidosis: fluids, insulin if diabetic, thiamine if alcohol, potassium watched closely.', 'Kidney failure: treat the cause, call renal if severe.', 'Metformin with a kidney injury: stop it.', 'Toxins or an unexplained gap: call the Poisons Information Centre on 13 11 26 and your senior.'] } },
      { rx: { h: 'Normal-gap causes', items: ['Diarrhoea: replace fluids and potassium. Hartmann is a balanced choice.', 'Large volumes of 0.9% saline add chloride and can worsen it.'] } }] },
    { h: 'Bicarbonate and escalation', blocks: [
      { rx: { h: 'Bicarbonate is rarely first-line', cls: 'warn', items: ['It does not fix lactate or ketones, and can drop the potassium and raise the CO2.', 'Never push 100 mL. If a senior wants it, it goes in slowly, 50 mL of 8.4% over 5 to 15 minutes.', 'It is mainly considered for severe acidosis in kidney injury or with high potassium, as a senior decision.'] } },
      { rx: { h: 'Call early if', cls: 'warn', items: ['pH under 7.2, lactate above 4, or a patient who is tiring.', 'Shock that does not respond to the first boluses.', 'A high gap you cannot explain.'] } }] }
  ],
  opts: [['sep', 'Treat the sepsis'], ['fl', 'Give balanced fluid'], ['stop', 'Stop the drug'], ['tox', 'Call Poisons and your senior'], ['bic', 'Bicarbonate']],
  items: [
    { t: 'Lactate 6.8, BP 88/50, temperature 39, a chest infection.', a: 'sep', why: 'Cultures, antibiotics in the first hour, fluids in boluses, repeat the lactate.' },
    { t: 'Four days of diarrhoea, bicarbonate 14, gap 10, potassium 2.9, dry.', a: 'fl', why: 'Normal-gap acidosis from bowel loss. Replace fluid and potassium. Hartmann is balanced.' },
    { t: 'Acidosis with a creatinine rise in a patient on metformin.', a: 'stop', why: 'Stop the metformin, treat the kidney injury and the cause.' },
    { t: 'Unexplained gap of 28 with a raised osmolar gap and visual blurring.', a: 'tox', why: 'This suggests a toxic alcohol. Poisons Information 13 11 26 and a senior now.' },
    { t: 'pH 7.18, potassium 7.6, creatinine 600, anuric.', a: 'bic', why: 'Severe acidosis with high potassium in kidney failure: bicarbonate may be a senior decision alongside dialysis.' },
    { t: 'pH 7.30, lactate 3, BP normal, drinking, a diarrhoeal illness.', a: 'fl', why: 'Mild: fluids and treat the cause. No bicarbonate.' }
  ]
};
