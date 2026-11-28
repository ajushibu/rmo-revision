window.KIT = {
  title: 'Kidney stones and renal colic',
  lede: 'Pain control first, then a scan, then ask one question: is the kidney blocked and infected? If yes, it is an emergency. Press Next.',
  flag: '<b>How far to trust this.</b> The stone sizes, referral rules, tamsulosin, prevention and imaging are from eTG (Kidney and ureteric stones in adults, 2026), as quoted in the Malleus deck, not read in eTG itself. The rest is standard teaching. NSAID, opioid and antibiotic doses are left to your hospital protocol: the orders in the practice cases do not fix a dose except for IV morphine and ondansetron.',
  steps: [
    { h: 'Recognise it, and do not miss the others', blocks: [
      { rx: { h: 'The usual picture', items: ['Sudden loin pain that spreads to the groin, comes in waves, and makes him writhe. Nausea and vomiting. Blood in the urine.', 'A urine dipstick with blood in a man with this pain makes a stone very likely.'] } },
      { rx: { h: 'Do not miss', cls: 'warn', items: ['A leaking abdominal aortic aneurysm in a man over 60 with first-time "colic".', 'An ectopic pregnancy or ovarian torsion in a woman: check a pregnancy test.', 'Appendicitis, diverticulitis, testicular torsion.'] } }] },
    { h: 'Treat the pain and image it', blocks: [
      { rx: { h: 'Pain and nausea', items: ['NSAID (such as diclofenac or ketorolac) is first-line if the kidneys are normal and there are no contraindications.', 'Add paracetamol, and IV morphine in small steps if the pain is not controlled.', 'Ondansetron for nausea.'] } },
      { rx: { h: 'Tests', items: ['Urine dipstick and culture, electrolytes and creatinine, full blood count, CRP.', 'CT KUB without contrast is the usual scan. Ultrasound in pregnancy or when you want to avoid radiation.', 'Strain the urine to catch the stone.'] } }] },
    { h: 'The emergency, and where he goes next', blocks: [
      { rx: { h: 'Infection plus a blocked kidney is an emergency', cls: 'stop', items: ['Fever, a fast pulse, a low BP, a high white cell count or a rising creatinine with a stone and hydronephrosis.', 'IV antibiotics and fluids, blood and urine cultures, and a call to urology now to relieve the obstruction (stent or nephrostomy).', 'No NSAID if there is kidney injury or sepsis.'] } },
      { rx: { h: 'A simple stone', items: ['Stones up to 6 mm: analgesia and normal fluids, a strainer and follow-up. Most pass within a month (up to 2 mm in about a week, 4 to 6 mm in up to 3 weeks).', 'Refer to urology if larger than 6 mm, pain for more than 2 weeks, or reduced kidney function. Same-day ED or urology: fever or UTI, severe pain, pregnancy, or a single kidney.', 'Distal ureteric stone: tamsulosin 400 micrograms modified-release orally daily for up to 4 weeks may help (evidence conflicting, not TGA-approved for this, can cause postural hypotension). Ask urology first if over 6 mm; refer if not passed by 4 weeks.', 'Prevention: drink at least 2.5 L a day, and do not restrict dietary calcium.', 'Safety-net advice: return for fever, uncontrolled pain, vomiting or no urine.'] } }] }
  ],
  opts: [['nsaid', 'NSAID and an antiemetic'], ['ct', 'CT KUB'], ['abx', 'IV antibiotics and call urology'], ['aaa', 'Rule out an aneurysm'], ['dc', 'Discharge with follow-up'], ['hcg', 'Pregnancy test first']],
  items: [
    { t: 'A 34-year-old man in severe loin pain, writhing, with blood on the dipstick, normal creatinine.', a: 'nsaid', why: 'NSAID plus an antiemetic, with a scan to follow. Add an opioid if it is not enough.' },
    { t: 'A 72-year-old man, first episode of loin pain, no haematuria, sweaty and pale.', a: 'aaa', why: 'A leaking aneurysm can look like colic. Get a bedside ultrasound and call your senior.' },
    { t: 'A 52-year-old woman with a stone on CT, temperature 38.9, BP 98/60, creatinine 180.', a: 'abx', why: 'An infected, blocked kidney: IV antibiotics, fluids and urgent urology. No NSAID.' },
    { t: 'A 28-year-old woman with sudden right loin pain, her last period was 7 weeks ago.', a: 'hcg', why: 'Pregnancy test first: an ectopic pregnancy can look like colic. If positive, the scan is ultrasound, not CT.' },
    { t: 'A 30-year-old man with a 4 mm stone, pain controlled on tablets, afebrile, normal creatinine, eating.', a: 'dc', why: 'He can go home with analgesia, a strainer, safety-net advice and urology follow-up.' },
    { t: 'A man sent home yesterday with a 4 mm stone returns with a fever of 38.5 and loin pain.', a: 'abx', why: 'Fever with a stone is an emergency until proven otherwise: antibiotics, cultures and urology.' }
  ]
};
