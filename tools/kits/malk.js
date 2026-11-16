window.KIT = {
  title: 'Metabolic alkalosis',
  lede: 'Almost always a story of lost acid or lost chloride, kept going by low potassium and low volume. The urine chloride sorts it. Press Next.',
  flag: '<b>How far to trust this.</b> This is standard teaching, not checked against an Australian source here. The urine chloride cut-off of 20 mmol/L is the usual one. A diuretic in the last day or two makes the urine chloride misleading.',
  steps: [
    { h: 'Spot it and sort it', blocks: [
      { rx: { h: 'What you see', items: ['High pH, high bicarbonate, and a pCO2 that rises about 0.7 for each 1 rise in bicarbonate.', 'Low potassium and low chloride usually come with it.', 'Severe: tetany, weakness, arrhythmia, and slow breathing.'] } },
      { table: { head: ['Urine chloride', 'Group', 'Common causes'], rows: [
        ['Under 20 mmol/L', 'Chloride-responsive (volume depleted)', 'Vomiting, nasogastric losses, past diuretic use'],
        ['Over 20 mmol/L', 'Chloride-resistant', 'Hyperaldosteronism, Cushing, severe potassium loss, current diuretic']] } },
      { rx: { h: 'Trap', cls: 'warn', items: ['A diuretic in the last day or two raises the urine chloride and fools you. Look at the history and drug chart first.'] } }] },
    { h: 'Treat it', blocks: [
      { rx: { h: 'Chloride-responsive', items: ['0.9% saline gives the chloride and the volume the kidney needs to excrete the bicarbonate.', 'Replace the potassium and magnesium: without them it will not correct.', 'Replace nasogastric losses and treat the cause (vomiting, ileus, obstruction).'] } },
      { rx: { h: 'Chloride-resistant', items: ['Treat the cause: potassium replacement, then investigate (aldosterone and renin, cortisol).', 'Saline will not fix it and can raise the blood pressure.', 'Heart failure on a high-dose diuretic: reduce the diuretic if you can, and replace potassium. A senior may add acetazolamide.'] } },
      { rx: { h: 'What not to do', cls: 'stop', items: ['Never give acid or bicarbonate.', 'Do not use glucose 5% or hypotonic fluid: the sodium is already low.'] } }] },
    { h: 'After and when to call', blocks: [
      { rx: { h: 'Follow-up', items: ['Recheck the potassium, bicarbonate and chloride in a few hours and the next morning.', 'Watch the breathing: a high CO2 is part of the compensation, but severe alkalosis suppresses it.', 'Chart fluid balance, including nasogastric output.'] } },
      { rx: { h: 'Call your registrar if', cls: 'warn', items: ['pH over 7.55, or ECG changes, or tetany.', 'Hypertension with low potassium and a high urine chloride: this needs investigating.'] } }] }
  ],
  opts: [['saline', '0.9% saline'], ['k', 'Replace potassium'], ['stop', 'Reduce the diuretic'], ['inv', 'Investigate'], ['acid', 'Acid or bicarbonate']],
  items: [
    { t: 'pH 7.52, bicarbonate 38, a nasogastric tube putting out 2.5 L, urine chloride 8.', a: 'saline', why: 'Chloride-responsive: 0.9% saline and potassium, and replace the nasogastric losses.' },
    { t: 'Potassium 2.7, hypertension on three drugs, alkalosis, urine chloride 50, not on a diuretic.', a: 'inv', why: 'Chloride-resistant: look for hyperaldosteronism with aldosterone and renin. Replace potassium meanwhile.' },
    { t: 'A heart failure patient on high-dose furosemide, bicarbonate 34, potassium 3.0, overloaded.', a: 'stop', why: 'Reduce the diuretic if the oedema allows, and replace the potassium. Saline would add to the overload.' },
    { t: 'Potassium 2.8 with alkalosis in a patient who vomits.', a: 'k', why: 'Replace potassium: the alkalosis will not correct while it is low.' },
    { t: 'pH 7.55, bicarbonate 45, a registrar suggests giving acid.', a: 'saline', why: 'Fix the volume and chloride. Giving acid is almost never needed on a ward.' },
    { t: 'A diuretic was given this morning and the urine chloride is 45 in a vomiting patient.', a: 'saline', why: 'The diuretic raises the urine chloride. This is still a chloride-responsive picture.' }
  ]
};
