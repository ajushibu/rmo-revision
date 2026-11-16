window.KIT = {
  title: 'Hyperkalaemia',
  lede: 'Protect the heart, shift the potassium, remove it, find the cause. Doses follow NSW and Queensland Health guidance. Press Next.',
  flag: '<b>How far to trust this.</b> Calcium, insulin and glucose, bicarbonate and resin doses are from SESLHD (NSW) and Queensland Health guidance. The two differ on insulin (NSW: 10 units in 50 mL of glucose 50% over 30 minutes; Queensland: 5 to 10 units with 50 mL of glucose 50% over 5 minutes, 5 units in kidney failure or under 50 kg). Use your own hospital protocol.',
  steps: [
    { h: 'How high, and does the ECG show it', blocks: [
      { table: { head: ['Potassium (mmol/L)', 'Grade', 'What to do'], aus: 1, rows: [
        ['5.5 to 5.9', 'Mild', 'Find the cause, stop potassium-raising drugs, repeat.'],
        ['6.0 to 6.4', 'Moderate', 'Treat. Monitored bed (NSW: close observation unit).'],
        ['6.5 and above', 'Severe', 'Treat now, continuous ECG, call your registrar.']] } },
      { rx: { h: 'ECG changes, in the order they appear', items: ['Tall, peaked T waves, then a longer PR and flat P waves.', 'Wide QRS, then a sine wave, then VF or asystole.', 'Any ECG change means treat as an emergency, whatever the number.'] } }] },
    { h: 'Protect, shift, remove', say: 'Calcium protects the heart but does not lower the potassium. Insulin shifts it into cells for a few hours. Removal is what actually lowers the total.', blocks: [
      { rx: { h: '1. Calcium for ECG changes', cls: 'stop', items: ['Calcium gluconate 10% 10 mL (2.2 mmol) IV over 2 to 3 minutes into a large vein, on a monitor.', 'Repeat the ECG after 5 to 10 minutes. It can be repeated if the ECG is still abnormal.', 'It does not lower the potassium: you still need steps 2 and 3.'] } },
      { rx: { h: '2. Shift into the cells', items: ['Insulin with glucose: NSW 10 units Actrapid in 50 mL of glucose 50% over 30 minutes; Queensland 5 to 10 units with 50 mL glucose 50% over 5 minutes (5 units if kidney failure or under 50 kg).', 'Check the glucose first. Then every 30 minutes for 2 hours (NSW) or at least hourly for 6 hours (Queensland): hypoglycaemia can come late.', 'Salbutamol 10 mg nebulised is an extra shifter (Queensland).', 'Sodium bicarbonate 8.4% 50 mL over 5 to 15 minutes only if there is a metabolic acidosis.'] } },
      { rx: { h: '3. Remove', items: ['Resin (Resonium A) 15 g by mouth, up to three or four times a day (NSW), or 15 to 30 g (Queensland).', 'Dialysis for severe hyperkalaemia that does not respond, or in kidney failure.', 'Stop the cause: ACE inhibitor, ARB, spironolactone, trimethoprim, NSAID, potassium supplements.'] } }] },
    { h: 'After treatment', blocks: [
      { rx: { h: 'Do not stop at the first fall', items: ['Recheck the potassium every 2 hours (NSW) or hourly if severe (Queensland) until it is below 5.5.', 'Insulin wears off in a few hours and the potassium can rebound.', 'Find out why: kidney failure, drugs, tissue breakdown (rhabdomyolysis), acidosis, a missed dialysis.'] } },
      { rx: { h: 'Call renal early if', cls: 'warn', items: ['ECG changes, a potassium of 6.5 or more, or a kidney that is not making urine.', 'A dialysis patient who has missed a session.'] } }] }
  ],
  opts: [['ca', 'Calcium gluconate first'], ['ins', 'Insulin with glucose'], ['stop', 'Stop the drug and recheck'], ['call', 'Call renal, prepare for dialysis'], ['hold', 'Repeat in the morning']],
  items: [
    { t: 'Potassium 7.2 with peaked T waves and a wide QRS.', a: 'ca', why: 'ECG changes with a high potassium: calcium gluconate first to protect the heart, then insulin with glucose.' },
    { t: 'Potassium 6.2, a normal ECG, on spironolactone and ramipril, creatinine up.', a: 'ins', why: 'Moderate: insulin with glucose, withhold the drugs, and recheck. A normal ECG does not need calcium.' },
    { t: 'Potassium 5.7, normal ECG, taking trimethoprim and ramipril.', a: 'stop', why: 'Mild: stop the drugs that raise it, find the cause, and recheck.' },
    { t: 'A dialysis patient who missed two sessions: potassium 7.0, sine wave on the ECG.', a: 'call', why: 'Give calcium at once as well, but the real fix is dialysis. Call renal now.' },
    { t: 'Potassium 5.6 on a haemolysed sample, normal ECG, no risk factors.', a: 'hold', why: 'A haemolysed sample can read falsely high. Repeat the sample and do not treat on it alone.' },
    { t: 'Potassium 6.8, 10 mL of calcium gluconate given, ECG still has peaked T waves 10 minutes later.', a: 'ca', why: 'The ECG has not corrected: repeat the calcium and start the shift.' }
  ]
};
