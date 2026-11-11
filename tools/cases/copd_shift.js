/* Cases for copd_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
 "trig": {
  "n": "Why now?",
  "tab": "1",
  "r": "Infection is commonest, but check heart failure, pneumonia, pneumothorax, PE and AF. Ask about treatment limits."
 },
 "o2": {
  "n": "Controlled oxygen",
  "tab": "2",
  "r": "Target 88 to 92% with nasal prongs 0.5 to 2 L/min or a Venturi 24% or 28%. Too much oxygen worsens hypercapnia."
 },
 "drug": {
  "n": "Drugs",
  "tab": "3",
  "r": "Bronchodilators with a spacer or nebuliser; prednisolone 40 to 50 mg daily; antibiotic for purulent sputum per eTG."
 },
 "niv": {
  "n": "NIV",
  "tab": "4",
  "r": "Consider NIV for respiratory acidosis, persistent hypoxaemia, drowsiness or severe breathlessness. Recheck within an hour; failure means ICU."
 },
 "adm": {
  "n": "Admit or discharge",
  "tab": "5",
  "r": "Admit for failure of home treatment, mobility loss, altered mental state, hypoxaemia or a new arrhythmia. Discharge with a plan and rehabilitation."
 }
};
window.RMO_CASES = [
 {
  "id": "c1",
  "title": "Turned up and tuned out",
  "where": "Medical ward",
  "time": "02:20",
  "blurb": "A COPD patient given high-flow oxygen who becomes drowsy. Tests controlled oxygen and NIV.",
  "intro": "Nurse call: 72-year-old man admitted with a COPD flare. Put on a 10 L mask for SpO2 84%. Now he is hard to rouse.",
  "vit": {
   "hr": 102,
   "sbp": 148,
   "dbp": 84,
   "spo2": 99,
   "rr": 9
  },
  "facts": [
   "72M; COPD, ex-smoker, on home inhalers",
   "10 L/min via mask, SpO2 99%",
   "Drowsy, flapping tremor",
   "Not yet had a gas"
  ],
  "decisions": [
   {
    "tag": "o2",
    "scene": "What is the likely problem?",
    "opts": [
     {
      "q": "best",
      "t": "Over-oxygenation causing CO2 retention",
      "fb": "His saturation is above target and he is drowsy with a slow rate."
     },
     {
      "q": "poor",
      "t": "He is improving: sleepy because he is comfortable",
      "fb": "Drowsiness with a slow rate is a warning."
     }
    ]
   },
   {
    "tag": "o2",
    "scene": "What do you do first?",
    "opts": [
     {
      "q": "best",
      "t": "Call for help, change to a Venturi mask or nasal prongs to aim at 88 to 92%, and get an arterial gas",
      "fb": "Lower to the target range and check the gas.",
      "vit": {
       "spo2": 92,
       "rr": 12
      }
     },
     {
      "q": "poor",
      "t": "Take the oxygen off completely",
      "fb": "He was hypoxic: keep oxygen at the target level.",
      "vit": {
       "spo2": 80
      }
     },
     {
      "q": "harm",
      "t": "Increase oxygen to keep him at 99%",
      "fb": "This will raise CO2 further.",
      "vit": {
       "spo2": 100,
       "rr": 6
      }
     }
    ]
   },
   {
    "tag": "niv",
    "scene": "Gas on 28% Venturi: pH 7.21, PaCO2 88 mmHg. What now?",
    "opts": [
     {
      "q": "best",
      "t": "Treat as respiratory acidosis: bronchodilators, steroid, antibiotic if indicated, and start NIV; recheck the gas in an hour",
      "fb": "NIV is indicated for acidosis, with reassessment at one hour.",
      "vit": {
       "rr": 18,
       "spo2": 91
      }
     },
     {
      "q": "poor",
      "t": "Repeat the gas in six hours",
      "fb": "He is acidotic now."
     }
    ]
   },
   {
    "tag": "adm",
    "scene": "NIV fails to improve the pH at one hour. What do you do?",
    "opts": [
     {
      "q": "best",
      "t": "Call ICU, and discuss intubation within the treatment limits agreed with him and his family",
      "fb": "If NIV fails, escalate and respect his wishes."
     },
     {
      "q": "poor",
      "t": "Continue the same settings and review at the morning round",
      "fb": "Failure needs escalation now."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You found the over-oxygenation and escalated at the right time.",
   "mid": "He recovered, but you were slow to ventilate.",
   "lo": "Review steps 2 and 4 of the Study Kit."
  }
 },
 {
  "id": "c2",
  "title": "Green sputum",
  "where": "Emergency department",
  "time": "15:30",
  "blurb": "A typical flare. Tests drug choices and the decision to admit.",
  "intro": "71-year-old man, COPD, more cough and green sputum for three days. Breathless walking to the toilet.",
  "vit": {
   "hr": 104,
   "sbp": 136,
   "dbp": 80,
   "spo2": 86,
   "rr": 26
  },
  "facts": [
   "71M; COPD, 40 pack-years",
   "Wheezy, short sentences",
   "Temp 37.8",
   "Gas on air: pH 7.38, PaCO2 49 mmHg"
  ],
  "decisions": [
   {
    "tag": "o2",
    "scene": "What do you do about oxygen?",
    "opts": [
     {
      "q": "best",
      "t": "Controlled oxygen with nasal prongs or a Venturi, aiming at 88 to 92%",
      "fb": "Give oxygen to the target range only.",
      "vit": {
       "spo2": 90
      }
     },
     {
      "q": "poor",
      "t": "Non-rebreather at 15 L/min",
      "fb": "Too much: he retains CO2.",
      "vit": {
       "spo2": 99,
       "rr": 14
      }
     }
    ]
   },
   {
    "tag": "drug",
    "scene": "Which drugs do you start?",
    "opts": [
     {
      "q": "best",
      "t": "Salbutamol and ipratropium by spacer or nebuliser, oral prednisolone 40 to 50 mg daily, and an antibiotic per eTG for purulent sputum",
      "fb": "These are the core treatments for a flare with purulent sputum.",
      "vit": {
       "rr": 22
      }
     },
     {
      "q": "poor",
      "t": "Antibiotics alone",
      "fb": "Bronchodilators and steroids help the airflow."
     },
     {
      "q": "harm",
      "t": "IV sedation for the breathlessness",
      "fb": "Sedation can cause respiratory failure.",
      "vit": {
       "spo2": 80,
       "rr": 10
      }
     }
    ]
   },
   {
    "tag": "trig",
    "scene": "Which tests help you decide on diagnosis and trigger?",
    "opts": [
     {
      "q": "best",
      "t": "Chest X-ray, ECG, bloods and sputum culture",
      "fb": "Rule out pneumonia, heart failure and arrhythmia."
     },
     {
      "q": "poor",
      "t": "No tests: it is just a flare",
      "fb": "You will miss a mimic."
     }
    ]
   },
   {
    "tag": "adm",
    "scene": "Does he need to be admitted?",
    "opts": [
     {
      "q": "best",
      "t": "Yes if he cannot manage at home or is not responding; here he is breathless walking to the toilet with low saturation, so admit",
      "fb": "Loss of mobility and hypoxaemia meet the admission criteria."
     },
     {
      "q": "poor",
      "t": "Send home with the same inhalers",
      "fb": "He does not meet discharge criteria."
     }
    ]
   }
  ],
  "ends": {
   "hi": "Right oxygen, drugs and decision.",
   "mid": "He was treated, but one choice added risk.",
   "lo": "Review steps 2, 3 and 5 of the Study Kit."
  }
 },
 {
  "id": "c3",
  "title": "Is it really COPD?",
  "where": "Medical ward",
  "time": "23:40",
  "blurb": "A \"COPD\" patient who is wet. Tests looking for the mimic.",
  "intro": "Nurse call: 78-year-old man with COPD admitted with breathlessness and a wheeze, given nebulisers three times. Not improving.",
  "vit": {
   "hr": 108,
   "sbp": 162,
   "dbp": 92,
   "spo2": 89,
   "rr": 30
  },
  "facts": [
   "78M; COPD and hypertension",
   "Orthopnoea, ankle swelling",
   "Wheeze and bilateral basal crackles",
   "JVP raised"
  ],
  "decisions": [
   {
    "tag": "trig",
    "scene": "He is not responding to bronchodilators. What do you consider?",
    "opts": [
     {
      "q": "best",
      "t": "Another cause: heart failure, pneumonia, PE or an arrhythmia",
      "fb": "Failure to respond means look for a mimic."
     },
     {
      "q": "poor",
      "t": "Keep nebulising every 15 minutes",
      "fb": "Not working: change your thinking."
     }
    ]
   },
   {
    "tag": "trig",
    "scene": "Raised JVP, crackles and ankle swelling suggest what?",
    "opts": [
     {
      "q": "best",
      "t": "Acute heart failure (cardiac wheeze) on top of COPD: treat as heart failure, with ECG, BNP and chest X-ray",
      "fb": "Wheeze can come from pulmonary oedema.",
      "vit": {
       "spo2": 92
      }
     },
     {
      "q": "poor",
      "t": "Pneumonia: antibiotics only",
      "fb": "The signs of fluid overload point to heart failure."
     }
    ]
   },
   {
    "tag": "o2",
    "scene": "What do you do about oxygen and support?",
    "opts": [
     {
      "q": "best",
      "t": "Controlled oxygen to 88 to 92%, sit him up, and CPAP or NIV if he is failing, with senior review",
      "fb": "Support breathing while treating heart failure.",
      "vit": {
       "spo2": 91,
       "rr": 24
      }
     },
     {
      "q": "poor",
      "t": "Lay him flat for an ECG",
      "fb": "He cannot tolerate lying flat.",
      "vit": {
       "spo2": 82
      }
     }
    ]
   }
  ],
  "ends": {
   "hi": "You looked past the label and found the heart failure.",
   "mid": "He improved, but you were slow to change tack.",
   "lo": "Review steps 1 and 2 of the Study Kit."
  }
 }
];
