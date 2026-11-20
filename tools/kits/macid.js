window.KIT = {
  title: 'Metabolic acidosis',
  lede: 'Work out whether the anion gap is high, find the cause, and treat it. Bicarbonate is rarely the answer. Press Next.',
  flag: '<b>How far to trust this.</b> The approach is standard teaching (gap, albumin correction and delta gap checked against the Merck Manual and a published anion gap review, not an Australian guideline). The sepsis steps follow general Australian practice, and the antibiotic choice is left to your hospital sepsis pathway. I could not verify a bicarbonate threshold against an Australian source: any use of bicarbonate here is a senior decision.',
  steps: [
    { h: 'Two ways to get acidotic', say: 'Either acid is added, or bicarbonate is lost. Everything else follows from which one.', blocks: [
      { rx: { h: 'Acid added (high anion gap)', items: ['Lactate (sepsis, shock, a bowel bleed), ketones (diabetes, alcohol, starvation), kidney failure and toxins all add acid.', 'The hydrogen ion eats a bicarbonate. The lactate or ketone that came with it stays in the blood, so the gap rises.'] } },
      { rx: { h: 'Bicarbonate lost (normal anion gap)', items: ['Gut: the stomach makes acid, but everything after it (pancreas, bile, small bowel, colon) makes bicarbonate-rich fluid. Diarrhoea, fistulas, ileostomy and surgical drains lose that bicarbonate.', 'Vomiting loses stomach acid, so it causes an alkalosis, not an acidosis.', 'Kidney: renal tubular acidosis (the tubule cannot make new bicarbonate or get rid of acid), and low aldosterone. Aldosterone is what makes the kidney keep sodium and give up potassium and hydrogen ions, so too little means acid and potassium are held back: a high-potassium, normal-gap acidosis.', 'Bicarbonate lost means chloride rises in its place, so the acidosis is hyperchloraemic and the gap is normal.'] } }] },
    { h: 'High gap or normal gap', blocks: [
      { rx: { h: 'Anion gap = sodium minus chloride minus bicarbonate', items: ['About 8 to 12, but check your lab: some include potassium and quote a different range.', 'It is the unmeasured anions: mostly albumin, plus lactate, ketones and anything else added. Potassium, calcium and magnesium are left out because they are small and steady.', 'A low albumin lowers the normal gap by about 2.5 for every 1 g/dL (10 g/L). Corrected gap = measured gap + 0.25 x (40 - albumin in g/L). A gap that looks normal can hide a high-gap acidosis.'] } },
      { table: { head: ['Gap', 'Think of', 'First tests'], rows: [
        ['High', 'Lactate (sepsis, shock), ketones (diabetes, alcohol, starvation), kidney failure, toxins (methanol, ethylene glycol, salicylate, metformin, paraldehyde)', 'Lactate, ketones, creatinine, glucose, osmolality, ECG'],
        ['Normal', 'Diarrhoea and other gut losses, kidney tubular problems, low aldosterone, a large 0.9% saline load', 'Urine electrolytes, potassium, stool history']] } },
      { rx: { h: 'In liver disease use a lower threshold', items: ['Albumin is low, so the normal gap is lower: a measured gap of 10 may already be high.', 'These patients can bleed (lactate), get hepatorenal syndrome (uraemia) or become septic (lactate). A fixed cut-off of 12 would miss them.'] } },
      { rx: { h: 'Check the breathing is compensating', items: ['Expected pCO2 is about 1.5 x bicarbonate + 8, give or take 2.', 'A rising pCO2 in a tiring patient means he is about to decompensate: call.'] } },
      { embed: { src: 'acidbase_lab.html?embed=ledger', title: 'See the gap move: add acid, or lose bicarbonate from the gut', h: 620 } }] },
    { h: 'Is there a second problem?', say: 'In a high-gap acidosis, add the extra gap back to the bicarbonate.', blocks: [
      { rx: { h: 'Why bother, if the bicarbonate is already lost?', items: ['Each unit of acid that raised the gap used up about one unit of bicarbonate.', 'So the extra gap (gap minus about 12) tells you where the bicarbonate should be: 24 minus the extra gap.', 'If it comes out higher than that, something else was adding bicarbonate: a metabolic alkalosis was there first, for example from vomiting. If it comes out lower, there is a normal-gap acidosis as well.', 'Example: diabetic ketoacidosis with vomiting. Gap 26, bicarbonate 24: extra gap 14, so it should be 10 but comes out at 24. The vomiting alkalosis hid behind the ketoacids.', '(Same sum added back: 24 + 14 = 38; above about 29 counts as high.)'] } },
      { embed: { src: 'acidbase_lab.html?embed=delta', title: 'Try your own numbers: where did the bicarbonate start?', h: 900 } }] },
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
