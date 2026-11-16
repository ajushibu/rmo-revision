window.KIT = {
  title: 'Kidney stones and renal colic',
  lede: 'Pain control first, then a scan, then ask one question: is the kidney blocked and infected? If yes, it is an emergency. Press Next.',
  flag: '<b>How far to trust this.</b> This is standard teaching, not checked against an Australian source here. NSAID, opioid and antibiotic doses are left to your hospital protocol: the orders in the practice cases do not fix a dose except for IV morphine and ondansetron.',
  steps: [
    { h: 'Recognise it, and do not miss the others', blocks: [
      { rx: { h: 'The usual picture', items: ['Sudden loin pain that spreads to the groin, comes in waves, and makes him writhe. Nausea and vomiting. Blood in the urine.', 'A urine dipstick with blood in a man with this pain makes a stone very likely.'] } },
      { rx: { h: 'Do not miss', cls: 'warn', items: ['A leaking abdominal aortic aneurysm in a man over 60 with first-time "colic".', 'An ectopic pregnancy or ovarian torsion in a woman: check a pregnancy test.', 'Appendicitis, diverticulitis, testicular torsion.'] } }] },
    { h: 'Treat the pain and image it', blocks: [
      { rx: { h: 'Pain and nausea', items: ['NSAID (such as diclofenac or ketorolac) is first-line if the kidneys are normal and there are no contraindications.', 'Add paracetamol, and IV morphine in small steps if the pain is not controlled.', 'Ondansetron for nausea.'] } },
      { rx: { h: 'Tests', items: ['Urine dipstick and culture, electrolytes and creatinine, full blood count, CRP.', 'CT KUB without contrast is the usual scan. Ultrasound in pregnancy or when you want to avoid radiation.', 'Strain the urine to catch the stone.'] } }] },
    { h: 'The emergency, and where he goes next', blocks: [
      { rx: { h: 'Infection plus a blocked kidney is an emergency', cls: 'stop', items: ['Fever, a fast pulse, a low BP, a high white cell count or a rising creatinine with a stone and hydronephrosis.', 'IV antibiotics and fluids, blood and urine cultures, and a call to urology now to relieve the obstruction (stent or nephrostomy).', 'No NSAID if there is kidney injury or sepsis.'] } },
      { rx: { h: 'A simple stone', items: ['Small stones (about 5 mm or less) often pass: analgesia, fluids, a strainer and urology follow-up.', 'Larger than about 7 to 10 mm, or no progress, or a solitary kidney: urology referral.', 'Safety-net advice: return for fever, uncontrolled pain, vomiting or no urine.'] } }] }
  ],
  opts: [['nsaid', 'NSAID and an antiemetic'], ['ct', 'CT KUB'], ['abx', 'IV antibiotics and call urology'], ['aaa', 'Rule out an aneurysm'], ['dc', 'Discharge with follow-up']],
  items: [
    { t: 'A 34-year-old man in severe loin pain, writhing, with blood on the dipstick, normal creatinine.', a: 'nsaid', why: 'NSAID plus an antiemetic, with a scan to follow. Add an opioid if it is not enough.' },
    { t: 'A 72-year-old man, first episode of loin pain, no haematuria, sweaty and pale.', a: 'aaa', why: 'A leaking aneurysm can look like colic. Get a bedside ultrasound and call your senior.' },
    { t: 'A 52-year-old woman with a stone on CT, temperature 38.9, BP 98/60, creatinine 180.', a: 'abx', why: 'An infected, blocked kidney: IV antibiotics, fluids and urgent urology. No NSAID.' },
    { t: 'A 28-year-old woman with sudden right loin pain, her last period was 7 weeks ago.', a: 'ct', why: 'First a pregnancy test. If positive, the scan is ultrasound, not CT.' },
    { t: 'A 30-year-old with a 4 mm stone, pain controlled on tablets, afebrile, normal creatinine, eating.', a: 'dc', why: 'He can go home with analgesia, a strainer, safety-net advice and urology follow-up.' },
    { t: 'The same man returns with a fever of 38.5 and loin pain.', a: 'abx', why: 'Fever with a stone is an emergency until proven otherwise: antibiotics, cultures and urology.' }
  ]
};
