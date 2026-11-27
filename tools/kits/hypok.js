window.KIT = {
  title: 'Hypokalaemia',
  lede: 'Find the cause, check magnesium, replace by mouth when you can, and give IV potassium slowly, never as a push. Press Next.',
  flag: '<b>How far to trust this.</b> The IV rate rules (10 mmol in 100 mL over an hour on a ward, never a push, never added to a running bag) follow NSW potassium administration guidance. Oral dosing and the exact ECG-monitoring threshold are not checked here: use your hospital protocol.',
  steps: [
    { h: 'How low, and why', blocks: [
      { table: { head: ['Potassium (mmol/L)', 'Grade', 'What to do'], aus: 1, rows: [
        ['3.0 to 3.4', 'Mild', 'Usually oral replacement. Find the cause.'],
        ['2.5 to 2.9', 'Moderate', 'Oral or IV. ECG. Check magnesium.'],
        ['Below 2.5, or any ECG change or symptoms', 'Severe', 'IV replacement on a monitor. Call your registrar.']] } },
      { rx: { h: 'Causes: ask about these', items: ['Gut losses: vomiting, diarrhoea, a high-output stoma.', 'Kidney losses: furosemide, thiazides, high-dose steroid.', 'Shift into cells: insulin, salbutamol, alkalosis.', 'Low magnesium makes the potassium hard to correct.'] } },
      { rx: { h: 'ECG changes of low potassium', items: ['Flat T waves, ST depression, prominent U waves.', 'Ectopics, then atrial and ventricular arrhythmias, including torsades.', 'Digoxin makes all of this worse: low potassium raises the risk of toxicity.'] } },
      { rx: { h: 'Low potassium on digoxin', cls: 'stop', items: ['Potassium and digoxin compete for the same site on the Na⁺/K⁺ pump, so a low potassium lets more digoxin bind (LITFL).', 'More pumps blocked → sodium builds up in the cell → the Na⁺/Ca²⁺ exchanger clears less calcium → calcium overload → cells fire on their own: ectopics, VT, VF.', 'Do: 12-lead ECG and a monitor, hold the digoxin and the diuretic, send a digoxin level, replace potassium and magnesium, tell your registrar.', 'No reflex amiodarone: it raises digoxin levels (the digoxin dose is usually halved when amiodarone starts).'] } },
      { embed: { src: 'hypok_causes.html?embed=1&tabs=1', title: 'Low potassium: where does it go? (kidney lab, sort the cause, summary)', h: 1000 } }] },
    { h: 'Replace it safely', say: 'The route and the rate matter more than the dose. A push of potassium can stop the heart.', blocks: [
      { rx: { h: 'By mouth when you can', items: ['Mild or moderate with no ECG changes and a working gut: oral potassium chloride, per your hospital protocol.', 'Do not give a large number of tablets at once.'] } },
      { rx: { h: 'Into the vein', cls: 'stop', items: ['Potassium chloride 10 mmol in 100 mL over 1 hour through a peripheral line (NSW).', 'Never an IV push. Never add potassium to the Hartmann bag that is already running.', 'Faster than 10 mmol an hour needs a monitored setting and senior approval.', 'Recheck the potassium after each 20 to 40 mmol, and do not overshoot in kidney failure.'] } }] },
    { h: 'After it is replaced', blocks: [
      { rx: { h: 'Do not stop at the potassium', items: ['Check magnesium and replace it: without it the potassium falls again.', 'Find the cause and fix it: review diuretics, treat the diarrhoea or the stoma output.', 'Recheck the potassium the same day and the next morning.'] } },
      { rx: { h: 'Call your registrar if', cls: 'warn', items: ['Potassium below 2.5 or ECG changes.', 'The patient is on digoxin.', 'The potassium does not rise despite replacement.'] } }] }
  ],
  opts: [['oral', 'Oral replacement'], ['iv', 'IV replacement, premixed bag'], ['mg', 'Check and replace magnesium'], ['stop', 'Review the cause'], ['wait', 'Repeat in the morning']],
  items: [
    { t: 'Potassium 3.2, eating, on furosemide, normal ECG.', a: 'oral', why: 'Mild, gut working, no ECG changes: oral replacement and review the diuretic.' },
    { t: 'Potassium 2.3 with ectopics and U waves, vomiting for two days.', a: 'iv', why: 'Severe with ECG changes: IV replacement on a monitor, and tell your registrar.' },
    { t: 'Potassium keeps falling despite replacement, on a thiazide with a high-output stoma.', a: 'mg', why: 'Low magnesium makes potassium hard to correct. Check and replace it.' },
    { t: 'Potassium 3.3 and creatinine 280 and rising.', a: 'stop', why: 'In kidney failure, replace cautiously and look for the cause before pushing it up.' },
    { t: 'Potassium 3.4, no symptoms, normal ECG, well, no risk factors.', a: 'wait', why: 'Mild, well and no risk factors: a repeat check is enough, with oral replacement if it stays low. Not a night-time emergency.' },
    { t: 'Potassium 2.9, vomiting, cannot keep tablets down. The nurse asks to add 40 mmol to the running Hartmann bag.', a: 'iv', why: 'IV, but never added to a running bag: give a premixed 10 mmol in 100 mL bag over an hour, on its own line.' }
  ]
};
