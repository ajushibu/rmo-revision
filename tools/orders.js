/* Shared ward order catalogue for the order-sheet cases (ward.js).
   id: stable key used by case files. n: name shown. c: category (for Browse). s: other names people type.
   doses: choices shown once the order is placed; the case decides which are right.
   Doses here are choices, not advice: each case file says which source it was checked against. */
window.RMO_ORDERS = [
  // Bedside and monitoring
  { id: 'sit_up', c: 'Bedside', n: 'Sit the patient upright', s: 'position posture sit up' },
  { id: 'gcs', c: 'Bedside', n: 'Neuro observations (GCS)', s: 'glasgow coma scale neuro obs conscious' },
  { id: 'bsl', c: 'Bedside', n: 'Capillary blood glucose', s: 'bgl bsl finger prick glucose sugar' },
  { id: 'pef', c: 'Bedside', n: 'Peak expiratory flow', s: 'pef peak flow' },
  { id: 'fbal', c: 'Bedside', n: 'Strict fluid balance chart', s: 'input output chart i/o intake' },
  { id: 'weigh', c: 'Bedside', n: 'Daily weights', s: 'weight weigh' },
  { id: 'idc', c: 'Bedside', n: 'Indwelling urinary catheter', s: 'idc catheter urinary foley' },
  { id: 'drugchart', c: 'Bedside', n: 'Review the drug chart', s: 'medication chart meds review prescriptions' },
  { id: 'ivc', c: 'Bedside', n: 'Insert IV cannula', s: 'cannula ivc drip access line' },
  { id: 'technique', c: 'Bedside', n: 'Check inhaler and spacer technique', s: 'inhaler technique education puffer' },
  { id: 'chest_exam', c: 'Bedside', n: 'Examine the chest again', s: 'auscultate listen examination' },

  // Bloods
  { id: 'fbc', c: 'Bloods', n: 'Full blood count', s: 'fbc cbc haemoglobin hb white cells' },
  { id: 'uec', c: 'Bloods', n: 'Electrolytes, urea and creatinine', s: 'uec euc u&e renal function kidney potassium sodium' },
  { id: 'lft', c: 'Bloods', n: 'Liver function tests', s: 'lft liver' },
  { id: 'crp', c: 'Bloods', n: 'CRP', s: 'c-reactive protein inflammatory markers' },
  { id: 'trop', c: 'Bloods', n: 'Troponin', s: 'hs troponin cardiac enzymes' },
  { id: 'bnp', c: 'Bloods', n: 'NT-proBNP', s: 'bnp natriuretic peptide' },
  { id: 'ddimer', c: 'Bloods', n: 'D-dimer', s: 'd dimer' },
  { id: 'coags', c: 'Bloods', n: 'Coagulation studies', s: 'inr aptt coags pt' },
  { id: 'lactate', c: 'Bloods', n: 'Lactate', s: 'lactate' },
  { id: 'bcult', c: 'Bloods', n: 'Blood cultures', s: 'cultures sepsis' },
  { id: 'vbg', c: 'Bloods', n: 'Venous blood gas', s: 'vbg venous gas blood gas' },
  { id: 'abg', c: 'Bloods', n: 'Arterial blood gas', s: 'abg arterial gas blood gas' },
  { id: 'mg', c: 'Bloods', n: 'Magnesium and phosphate', s: 'mg magnesium phosphate po4' },
  { id: 'gh', c: 'Bloods', n: 'Group and hold', s: 'type and screen crossmatch g&h' },
  { id: 'sputum', c: 'Bloods', n: 'Sputum culture', s: 'mcs sputum' },
  { id: 'resp_pcr', c: 'Bloods', n: 'Respiratory viral PCR swab', s: 'flu covid rsv swab nasopharyngeal' },
  { id: 'tft', c: 'Bloods', n: 'Thyroid function tests', s: 'tsh thyroid' },
  { id: 'iron', c: 'Bloods', n: 'Iron studies', s: 'ferritin iron' },

  // Imaging and ECG
  { id: 'ecg', c: 'Imaging and ECG', n: '12-lead ECG', s: 'ecg ekg electrocardiogram' },
  { id: 'cxr', c: 'Imaging and ECG', n: 'Chest X-ray', s: 'cxr chest xray film' },
  { id: 'ctpa', c: 'Imaging and ECG', n: 'CT pulmonary angiogram', s: 'ctpa ct chest pe scan' },
  { id: 'echo', c: 'Imaging and ECG', n: 'Echocardiogram', s: 'echo tte ultrasound heart' },
  { id: 'pocus', c: 'Imaging and ECG', n: 'Bedside lung ultrasound', s: 'pocus ultrasound b lines' },
  { id: 'cthead', c: 'Imaging and ECG', n: 'CT head', s: 'ct brain' },
  { id: 'legus', c: 'Imaging and ECG', n: 'Leg Doppler ultrasound', s: 'dvt duplex doppler' },

  // Oxygen and breathing support
  { id: 'o2', c: 'Oxygen and breathing', n: 'Oxygen', s: 'o2 oxygen nasal prongs mask venturi hudson', doses: [
    'Nasal prongs, titrate to SpO2 88 to 92%',
    'Nasal prongs, titrate to SpO2 92 to 96%',
    'Venturi mask 28%, titrate to SpO2 88 to 92%',
    'Hudson mask 8 L/min, no target',
    'Non-rebreather mask 15 L/min'] },
  { id: 'o2off', c: 'Oxygen and breathing', n: 'Stop oxygen', s: 'remove oxygen cease o2 off' },
  { id: 'niv', c: 'Oxygen and breathing', n: 'Non-invasive ventilation (BiPAP)', s: 'niv bipap bilevel' },
  { id: 'cpap', c: 'Oxygen and breathing', n: 'CPAP', s: 'cpap continuous positive airway pressure' },
  { id: 'hfno', c: 'Oxygen and breathing', n: 'High-flow nasal oxygen', s: 'hfno optiflow airvo high flow' },
  { id: 'intub', c: 'Oxygen and breathing', n: 'Intubation', s: 'ett intubate ventilate' },

  // Drugs
  { id: 'salb_mdi', c: 'Drugs', n: 'Salbutamol by puffer and spacer', s: 'ventolin reliever puffer pmdi inhaler bronchodilator', doses: [
    '2 puffs (200 micrograms) every 4 hours',
    '4 puffs (400 micrograms) once',
    '12 puffs (1200 micrograms) every 20 minutes for the first hour'] },
  { id: 'salb_neb', c: 'Drugs', n: 'Salbutamol nebuliser', s: 'ventolin neb nebulised bronchodilator', doses: [
    '2.5 mg, oxygen-driven',
    '5 mg, oxygen-driven',
    '5 mg, air-driven, with nasal prong oxygen alongside',
    'Continuous: 2 x 5 mg nebules back to back, oxygen-driven'] },
  { id: 'ipra_mdi', c: 'Drugs', n: 'Ipratropium by puffer and spacer', s: 'atrovent anticholinergic puffer', doses: [
    '2 puffs once',
    '8 puffs (21 micrograms each) every 20 minutes for the first hour'] },
  { id: 'ipra_neb', c: 'Drugs', n: 'Ipratropium nebuliser', s: 'atrovent neb anticholinergic', doses: [
    '250 micrograms',
    '500 micrograms'] },
  { id: 'pred', c: 'Drugs', n: 'Prednisolone oral', s: 'steroid corticosteroid pred', doses: ['5 mg', '25 mg', '50 mg', '100 mg'] },
  { id: 'hydrocort', c: 'Drugs', n: 'Hydrocortisone IV', s: 'steroid corticosteroid iv', doses: ['100 mg IV'] },
  { id: 'mgso4', c: 'Drugs', n: 'Magnesium sulfate IV', s: 'magnesium mg iv', doses: ['Dose per hospital protocol (senior decision)'] },
  { id: 'adr_im', c: 'Drugs', n: 'Adrenaline IM', s: 'epinephrine epipen anaphylaxis', doses: ['0.5 mg (0.5 mL of 1:1000) IM', '1 mg IV push'] },
  { id: 'furo', c: 'Drugs', n: 'Furosemide IV', s: 'frusemide lasix diuretic loop', doses: ['10 mg IV', '40 mg IV', '80 mg IV', '250 mg IV'] },
  { id: 'gtn', c: 'Drugs', n: 'GTN sublingual', s: 'glyceryl trinitrate nitrate spray nitroglycerin', doses: ['400 micrograms spray, repeat if systolic BP stays over 100', 'GTN patch only'] },
  { id: 'gtn_inf', c: 'Drugs', n: 'GTN infusion', s: 'glyceryl trinitrate infusion nitrate drip' },
  { id: 'morph', c: 'Drugs', n: 'Morphine IV', s: 'opioid analgesia pain', doses: ['2.5 mg IV', '10 mg IV'] },
  { id: 'oxyc', c: 'Drugs', n: 'Oxycodone oral', s: 'endone opioid analgesia pain' },
  { id: 'paracet', c: 'Drugs', n: 'Paracetamol', s: 'panadol analgesia pain', doses: ['1 g oral'] },
  { id: 'ibup', c: 'Drugs', n: 'Ibuprofen', s: 'nsaid nurofen anti-inflammatory analgesia' },
  { id: 'stop_nsaid', c: 'Drugs', n: 'Cease NSAIDs and record the reaction', s: 'stop cease withhold ibuprofen nurofen nsaid allergy adverse reaction alert' },
  { id: 'midaz', c: 'Drugs', n: 'Midazolam IV', s: 'sedation benzodiazepine' },
  { id: 'diaz', c: 'Drugs', n: 'Diazepam oral', s: 'benzodiazepine valium anxiety sedation' },
  { id: 'halo', c: 'Drugs', n: 'Haloperidol', s: 'antipsychotic sedation agitation' },
  { id: 'nalox', c: 'Drugs', n: 'Naloxone IV', s: 'narcan opioid reversal' },
  { id: 'amox', c: 'Drugs', n: 'Amoxicillin oral', s: 'antibiotic penicillin' },
  { id: 'benpen', c: 'Drugs', n: 'Benzylpenicillin IV plus doxycycline', s: 'antibiotic pneumonia cap' },
  { id: 'ceftri', c: 'Drugs', n: 'Ceftriaxone IV', s: 'antibiotic cephalosporin' },
  { id: 'enox', c: 'Drugs', n: 'Enoxaparin', s: 'clexane lmwh anticoagulant heparin', doses: ['40 mg subcut daily (prophylaxis)', '1.5 mg/kg subcut daily (treatment)'] },
  { id: 'metop', c: 'Drugs', n: 'Metoprolol', s: 'beta blocker' },
  { id: 'kcl', c: 'Drugs', n: 'Potassium replacement', s: 'kcl potassium chloride' },
  { id: 'ics', c: 'Drugs', n: 'Start a preventer (inhaled corticosteroid)', s: 'ics budesonide fluticasone preventer symbicort seretide' },
  { id: 'pred_home', c: 'Drugs', n: 'Finish the prednisolone course at home', s: 'steroid course discharge stop date' },
  { id: 'nrt', c: 'Drugs', n: 'Nicotine replacement and quit support', s: 'quit smoking nrt patch cessation' },
  { id: 'vacc', c: 'Drugs', n: 'Influenza and pneumococcal vaccines', s: 'vaccination flu vaccine' },

  // Fluids
  { id: 'fluids_stop', c: 'Fluids', n: 'Stop IV fluids', s: 'cease halt maintenance fluids drip iv fluids off' },
  { id: 'bolus', c: 'Fluids', n: 'Sodium chloride 0.9% 500 mL bolus', s: 'normal saline bolus fluid challenge' },
  { id: 'maint', c: 'Fluids', n: 'Hartmann\'s maintenance fluids', s: 'compound sodium lactate maintenance' },
  { id: 'frestrict', c: 'Fluids', n: 'Fluid restriction 1.5 L a day', s: 'restrict fluids' },

  // Calls, referrals and plans
  { id: 'limits', c: 'Calls and plans', n: 'Clarify treatment limits (goals of care)', s: 'nfr resus status not for resuscitation acp goals of care' },
  { id: 'team', c: 'Calls and plans', n: 'Inform the treating team', s: 'surgeons orthopaedic team admitting team' },
  { id: 'cardio', c: 'Calls and plans', n: 'Cardiology referral', s: 'cardiology cardiologist' },
  { id: 'physio', c: 'Calls and plans', n: 'Physiotherapy referral', s: 'physio' },
  { id: 'rehab', c: 'Calls and plans', n: 'Pulmonary rehabilitation referral', s: 'rehab pulmonary' },
  { id: 'gp', c: 'Calls and plans', n: 'GP review within a few days', s: 'follow up general practitioner' },
  { id: 'aap', c: 'Calls and plans', n: 'Written asthma action plan', s: 'asthma plan action plan' },
  { id: 'o2rx', c: 'Calls and plans', n: 'Prescribe oxygen with a target range on the chart', s: 'oxygen prescription target chart' },
  { id: 'co2alert', c: 'Calls and plans', n: 'Record a CO2 retention alert', s: 'hypercapnia alert card' },
  { id: 'homeneb', c: 'Calls and plans', n: 'Home nebuliser', s: 'nebuliser home machine' },
  { id: 'dc_now', c: 'Calls and plans', n: 'Discharge home now', s: 'discharge send home' }
];
