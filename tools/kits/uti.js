window.KIT = {
  title: 'Urinary tract infection',
  lede: 'First ask whether it is really a UTI. A positive dipstick in a confused older person is often not. Then pick cystitis or pyelonephritis and treat to the culture. Press Next.',
  flag: '<b>How far to trust this.</b> The first-line drugs for cystitis and pyelonephritis, the culture rules and the catheter advice are from eTG (Acute cystitis in adults 2025, amended 2026; Acute pyelonephritis and Catheter-associated UTI, accessed 2025), as quoted in the Malleus deck, not read in eTG itself. Doses and durations are left to eTG and your local antibiogram: the practice cases do not fix a dose. The rest is standard teaching.',
  steps: [
    { h: 'Is it really a UTI?', blocks: [
      { rx: { h: 'Symptoms, not just a dipstick', items: ['Lower tract: pain passing urine, frequency, urgency, suprapubic pain.', 'Upper tract: fever, rigors, loin pain, vomiting, feeling unwell.', 'In an older person, a positive dipstick with only confusion and no fever or urinary symptoms is usually asymptomatic bacteriuria. Look for another cause.'] } },
      { rx: { h: 'Do not treat', cls: 'warn', items: ['Asymptomatic bacteriuria, except in pregnancy or before a urological procedure that breaches the lining.', 'A cloudy or smelly urine on its own.', 'A positive urine from a long-term catheter in a patient who is well.', 'If a catheter UTI is suspected, replace the catheter before collecting the urine: the old catheter&rsquo;s biofilm misleads (eTG).'] } },
      { rx: { h: 'Look for the real cause of the confusion', items: ['Glucose, infection somewhere else (chest, skin), pain, constipation, urinary retention, new drugs, low sodium.'] } }] },
    { h: 'Cystitis or pyelonephritis, simple or complicated', blocks: [
      { table: { head: ['Kind', 'Features', 'Approach'], aus: 1, rows: [
        ['Cystitis', 'Lower symptoms, no fever', 'Nitrofurantoin orally first line (only if eGFR 30 or more). No culture unless pregnant, a man, risk factors or recurrence.'],
        ['Pyelonephritis', 'Fever, loin pain, unwell', 'Urine and blood cultures first. Oral amoxicillin with clavulanate if she can take it and is not septic. IV if vomiting or septic: gentamicin for no more than 48 hours, or ceftriaxone if IV is likely to run past 72 hours.'],
        ['Complicated', 'Man, pregnancy, catheter, diabetes, kidney disease, stones', 'Culture always, longer course, look for obstruction.']] } },
      { rx: { h: 'Tests', items: ['Midstream urine culture before antibiotics. Blood cultures if febrile.', 'Pregnancy test in any woman who could be pregnant.', 'Creatinine, white cell count.', 'Imaging (ultrasound or CT) if not improving in 48 to 72 hours, or if you suspect a stone or obstruction.'] } },
      { rx: { h: 'Nitrofurantoin: cystitis only', items: ['Does not reach effective levels in kidney tissue', 'For cystitis only'] } }] },
    { h: 'Treat to the culture', blocks: [
      { rx: { h: 'Antibiotics', items: ['Choose by eTG and your local resistance data. Do not delay for the culture if she is septic.', 'Mild pyelonephritis: an oral antibiotic if she can swallow and keep it down and is not septic: amoxicillin with clavulanate (eTG).', 'Severe: IV antibiotics, then switch to oral when she is improving and the sensitivities are back. eTG prefers gentamicin (or tobramycin) for no more than 48 hours (3 doses), and ceftriaxone instead if IV treatment is likely to run past 72 hours.', 'In men, consider the prostate and use a longer course.'] } },
      { rx: { h: 'Call your registrar if', cls: 'warn', items: ['Septic: low BP, fast pulse, lactate above 2.', 'Pregnant, a transplant patient, or an obstructed kidney.', 'Not improving after 48 hours of the right antibiotic.'] } }] }
  ],
  opts: [['no', 'Do not treat. Look for another cause'], ['cult', 'Culture, then treat'], ['iv', 'IV antibiotics'], ['img', 'Image the kidneys'], ['oral', 'Switch to oral'], ['short', 'Oral antibiotic, short course']],
  items: [
    { t: 'An 86-year-old, confused, afebrile, no urinary symptoms, dipstick positive for nitrite.', a: 'no', why: 'Probably asymptomatic bacteriuria. Look for the real cause of the confusion.' },
    { t: 'A 30-year-old woman with 2 days of dysuria and frequency, no fever.', a: 'short', why: 'Simple cystitis: nitrofurantoin orally first line (if eGFR 30 or more). A culture is not needed unless she is pregnant, has risk factors or it comes back.' },
    { t: 'A woman with fever 38.8, loin pain, vomiting twice.', a: 'iv', why: 'Pyelonephritis she cannot keep tablets down for: cultures, then IV gentamicin (up to 48 hours) or ceftriaxone (eTG).' },
    { t: 'Pyelonephritis, still febrile and in pain after 72 hours of the right antibiotic.', a: 'img', why: 'Not responding: scan for a stone, obstruction or abscess.' },
    { t: 'Pyelonephritis on day 2, afebrile, eating, the culture shows a sensitive E. coli.', a: 'oral', why: 'Switch to a sensitive oral antibiotic and plan the total course.' },
    { t: 'A man with dysuria and fever.', a: 'cult', why: 'A man with a UTI is complicated: culture first, consider the prostate, and treat longer.' }
  ]
};
