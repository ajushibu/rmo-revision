/* Cases for cap_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
 "sev": {
  "n": "Severity",
  "tab": "1",
  "r": "Check red flags and score. Admit if RR over 22, confusion, HR over 100, SBP under 90 or SpO2 under 92%."
 },
 "score": {
  "n": "Scores",
  "tab": "2",
  "r": "CURB-65: above 1 inpatient, above 2 consider HDU or ICU. CORB above 1 suggests intensive-care-level risk."
 },
 "test": {
  "n": "Tests",
  "tab": "3",
  "r": "X-ray, bloods, blood cultures before antibiotics, urine antigens and viral PCR if admitted and sick."
 },
 "abx": {
  "n": "Antibiotics",
  "tab": "4",
  "r": "Mild: amoxicillin 1 g 8-hourly. Moderate: IV benzylpenicillin plus doxycycline. Severe: ceftriaxone plus azithromycin. Check eTG."
 },
 "comp": {
  "n": "Complications",
  "tab": "5",
  "r": "No improvement at 48 hours: reassess. At 5 days: look for empyema or abscess. Repeat X-ray at 6 weeks if abnormal."
 }
};
window.RMO_CASES = [
 {
  "id": "c1",
  "title": "The student who can go home",
  "where": "Emergency department",
  "time": "11:00",
  "blurb": "A well young adult with a lobar pneumonia. Tests severity and safe discharge.",
  "intro": "28-year-old man, five days of cough and fever, right-sided pleuritic pain. Walked in.",
  "vit": {
   "hr": 96,
   "sbp": 122,
   "dbp": 74,
   "spo2": 96,
   "rr": 18
  },
  "facts": [
   "28M; non-smoker, no comorbidities",
   "Right lower zone crackles",
   "CXR: right lower lobe consolidation",
   "Temp 38.4"
  ],
  "decisions": [
   {
    "tag": "sev",
    "scene": "How do you grade it?",
    "opts": [
     {
      "q": "best",
      "t": "Low severity: CORB 0, well, normal observations and a home to go to",
      "fb": "No red flags and a low score."
     },
     {
      "q": "poor",
      "t": "Severe: admit to ICU",
      "fb": "Over-treatment: he is well."
     }
    ]
   },
   {
    "tag": "abx",
    "scene": "What do you prescribe?",
    "opts": [
     {
      "q": "best",
      "t": "Oral amoxicillin 1 g 8-hourly, with the course per eTG (typically 5 to 7 days)",
      "fb": "This is the mild-CAP regimen in Therapeutic Guidelines."
     },
     {
      "q": "poor",
      "t": "IV ceftriaxone and azithromycin",
      "fb": "Too broad for mild CAP."
     }
    ]
   },
   {
    "tag": "comp",
    "scene": "What do you tell him to do if it does not settle?",
    "opts": [
     {
      "q": "best",
      "t": "Review at 48 hours; return sooner if worse, vomiting or short of breath; chest X-ray at about six weeks if abnormal",
      "fb": "Safety net and follow-up."
     },
     {
      "q": "poor",
      "t": "Come back when the antibiotics run out",
      "fb": "Too late if he deteriorates."
     }
    ]
   }
  ],
  "ends": {
   "hi": "Right grade, right antibiotic, good safety net.",
   "mid": "He is safe, but a step was missed.",
   "lo": "Review steps 1, 2 and 4 of the Study Kit."
  }
 },
 {
  "id": "c2",
  "title": "Moderate pneumonia on the ward",
  "where": "Medical ward",
  "time": "19:30",
  "blurb": "A moderate CAP. Tests tests, antibiotics and the 48-hour review.",
  "intro": "Nurse call: 68-year-old man with diabetes admitted with pneumonia. RR 24, SpO2 92% on air, temperature 38.9, BP 118/70.",
  "vit": {
   "hr": 104,
   "sbp": 118,
   "dbp": 70,
   "spo2": 92,
   "rr": 24
  },
  "facts": [
   "68M; type 2 diabetes",
   "CURB-65 score 1",
   "CXR: right lower lobe",
   "No antibiotics given yet"
  ],
  "decisions": [
   {
    "tag": "test",
    "scene": "Before the first dose, what do you do?",
    "opts": [
     {
      "q": "best",
      "t": "Blood cultures, sputum culture, urine antigens; do not delay antibiotics",
      "fb": "Take cultures first only if it will not delay treatment."
     },
     {
      "q": "poor",
      "t": "Wait for the cultures before giving anything",
      "fb": "Do not delay the first dose."
     }
    ]
   },
   {
    "tag": "abx",
    "scene": "Which antibiotics?",
    "opts": [
     {
      "q": "best",
      "t": "IV benzylpenicillin plus doxycycline, as per the current eTG and your hospital protocol, with oxygen if SpO2 is under 92%",
      "fb": "Moderate CAP regimen from the 2011 summary: check the current eTG.",
      "vit": {
       "spo2": 94
      }
     },
     {
      "q": "poor",
      "t": "Oral amoxicillin alone and discharge",
      "fb": "He needs admission."
     }
    ]
   },
   {
    "tag": "comp",
    "scene": "At 48 hours he is improving. What next?",
    "opts": [
     {
      "q": "best",
      "t": "Switch to oral amoxicillin when clinically improving and plan the total course",
      "fb": "Step down when improving."
     },
     {
      "q": "poor",
      "t": "Continue IV antibiotics for the full course",
      "fb": "Unnecessary."
     }
    ]
   }
  ],
  "ends": {
   "hi": "Right tests, right antibiotics and a sensible step-down.",
   "mid": "He recovered, but a step was missed.",
   "lo": "Review steps 3 and 4 of the Study Kit."
  }
 },
 {
  "id": "c3",
  "title": "Septic and hypoxic",
  "where": "Emergency resus bay",
  "time": "04:20",
  "blurb": "A severe pneumonia in an older patient. Tests severity and sepsis.",
  "intro": "77-year-old man from a nursing home: fever, confusion and rapid breathing. He looks grey.",
  "vit": {
   "hr": 128,
   "sbp": 84,
   "dbp": 48,
   "spo2": 85,
   "rr": 36
  },
  "facts": [
   "77M; new confusion",
   "Crackles right base, bronchial breathing",
   "Lactate 4.1",
   "CORB 3"
  ],
  "decisions": [
   {
    "tag": "sev",
    "scene": "How severe is this?",
    "opts": [
     {
      "q": "best",
      "t": "Severe CAP with sepsis: confusion, RR 36, SBP under 90 and low saturation",
      "fb": "Four severity features: this is HDU or ICU level."
     },
     {
      "q": "poor",
      "t": "Moderate: admit to the ward",
      "fb": "Under-calling the risk."
     }
    ]
   },
   {
    "tag": "abx",
    "scene": "What do you start?",
    "opts": [
     {
      "q": "best",
      "t": "Sepsis pathway: oxygen, IV fluids, blood cultures, and ceftriaxone plus azithromycin without delay, and call your senior and ICU",
      "fb": "Severe CAP: broad cover with no delay; confirm per eTG.",
      "vit": {
       "spo2": 92,
       "sbp": 100
      }
     },
     {
      "q": "poor",
      "t": "Oral amoxicillin and observe",
      "fb": "He is septic."
     }
    ]
   },
   {
    "tag": "comp",
    "scene": "He does not improve after fluids. What now?",
    "opts": [
     {
      "q": "best",
      "t": "Escalate to ICU: vasopressors and respiratory support as needed, and review for empyema or another source",
      "fb": "He needs ICU-level care."
     },
     {
      "q": "poor",
      "t": "Continue fluids on the ward and review in the morning",
      "fb": "Not safe."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You recognised severe CAP with sepsis and moved fast.",
   "mid": "He was treated, but antibiotics or escalation were slow.",
   "lo": "Review steps 1, 2 and 4 of the Study Kit."
  }
 }
];
