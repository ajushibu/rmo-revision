window.KIT = {
  title: 'Hypercalcaemia',
  lede: 'Rehydrate first, then use a bisphosphonate if it is moderate or severe, and find the cause. Press Next.',
  flag: '<b>How far to trust this.</b> The grading, the 4 to 6 L saline plan and the zoledronic acid order follow the UK Society for Endocrinology guidance. I could not find an Australian source to check them against, so confirm with your hospital protocol and your seniors.',
  steps: [
    { h: 'How high, and how sick', blocks: [
      { rx: { h: 'Use the corrected calcium', items: ['Corrected calcium adjusts for albumin. Always look at the corrected value, not the raw one.', 'Symptoms: thirst, polyuria, constipation, nausea, abdominal pain, confusion, and a short QT interval on the ECG.'] } },
      { table: { head: ['Corrected calcium (mmol/L)', 'Grade', 'What to do'], aus: 0, rows: [
        ['2.6 to 2.9', 'Mild', 'Usually oral fluids and review of the cause.'],
        ['3.0 to 3.4', 'Moderate', 'IV fluids, and treat if symptomatic.'],
        ['3.5 and above', 'Severe', 'Treat now. Call your registrar.']] } },
      { rx: { h: 'Common causes', items: ['Cancer (bone spread, or hormone release by the tumour): most common in hospital.', 'Primary hyperparathyroidism: most common in the community.', 'Drugs: thiazides, calcium and vitamin D supplements, lithium.'] } }] },
    { h: 'Treat it in order', say: 'Fluid first. The drug that lowers calcium needs a rehydrated patient.', blocks: [
      { rx: { h: 'Rehydrate', cls: 'stop', items: ['0.9% saline, aiming for about 4 to 6 L over 24 hours, with a check for overload after each litre.', 'Take care in heart or kidney failure: reduce the volume and tell your seniors.', 'Stop thiazides, calcium and vitamin D.', 'Do not use a loop diuretic unless he is overloaded.'] } },
      { rx: { h: 'Then lower the calcium', items: ['Zoledronic acid 4 mg IV over 15 minutes, after rehydration, and the dose is adjusted for kidney function.', 'It works in 2 to 4 days. Check the kidney function first.', 'Steroids (prednisolone) for lymphoma, myeloma or sarcoid. Not for hyperparathyroidism.'] } }] },
    { h: 'Find the cause', blocks: [
      { rx: { h: 'Tests', items: ['Calcium, albumin, phosphate, kidney function, magnesium.', 'PTH: high or normal points to the parathyroid. A low PTH points to cancer or vitamin D.', 'Serum protein electrophoresis and free light chains for myeloma. Chest X-ray.'] } },
      { rx: { h: 'Call your registrar if', cls: 'warn', items: ['Corrected calcium 3.5 or more, or confusion.', 'ECG changes, or kidney injury.', 'A new cancer is suspected.'] } },
      { rx: { h: 'Mild, with a raised PTH', items: ['Stop contributing drugs', 'Oral fluids', 'Repeat calcium', 'Refer to endocrinology or surgery for primary hyperparathyroidism', 'No bisphosphonate or large-volume saline'] } }] }
  ],
  opts: [['sal', '0.9% saline first'], ['zol', 'Zoledronic acid'], ['stop', 'Stop the drug'], ['pth', 'Check the PTH and cause'], ['oral', 'Oral fluids and review']],
  items: [
    { t: 'Corrected calcium 3.6, confused, dry.', a: 'sal', why: 'Rehydrate with 0.9% saline first. Bisphosphonate comes after.' },
    { t: 'Calcium 3.3 after 6 L of saline over 24 hours and still symptomatic.', a: 'zol', why: 'Rehydrated: now a bisphosphonate (zoledronic acid), adjusted for kidney function.' },
    { t: 'Calcium 2.9, on a thiazide and calcium and vitamin D tablets.', a: 'stop', why: 'Stop the thiazide and the supplements and recheck.' },
    { t: 'Calcium 3.1 with no known cause and a normal chest X-ray.', a: 'pth', why: 'The PTH separates parathyroid disease from other causes.' },
    { t: 'Calcium 2.7, no symptoms, drinking well.', a: 'oral', why: 'Mild: oral fluids and find the cause. IV saline is for moderate or severe.' },
    { t: 'Calcium 3.4 in a patient with heart failure.', a: 'sal', why: 'Saline is still the treatment, but slower, with frequent checks for overload.' }
  ]
};
