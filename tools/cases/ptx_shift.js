/* Cases for ptx_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
 "type": {
  "n": "Types and clues",
  "tab": "1",
  "r": "Primary: young, tall, thin. Secondary: lung disease. Tension: shock. Confirm with an X-ray or ultrasound, but never delay a tension."
 },
 "tens": {
  "n": "Tension",
  "tab": "2",
  "r": "Clinical diagnosis: shock, absent air entry on one side. Decompress with a 14 to 16 gauge cannula, then a chest drain."
 },
 "stable": {
  "n": "Stable pneumothorax",
  "tab": "3",
  "r": "Small and quiet: observe. Large or symptomatic: aspirate. Failure or secondary: small-bore drain and admit."
 },
 "drain": {
  "n": "Drain basics",
  "tab": "4",
  "r": "Water seal below the chest, no clamping a bubbling tube, no routine suction. A silent tube plus a worse patient means check it."
 },
 "after": {
  "n": "Removal and advice",
  "tab": "5",
  "r": "Remove when the lung is up and the leak has stopped. Advise on smoking, recurrence, flying and diving."
 }
};
window.RMO_CASES = [
 {
  "id": "c1",
  "title": "Tall and breathless",
  "where": "Emergency department",
  "time": "19:10",
  "blurb": "A young man with a large, stable pneumothorax. Tests aspiration and follow-up.",
  "intro": "23-year-old man, sudden right-sided chest pain and breathlessness. Looks comfortable at rest, but breathless on stairs.",
  "vit": {
   "hr": 96,
   "sbp": 128,
   "dbp": 76,
   "spo2": 96,
   "rr": 20
  },
  "facts": [
   "23M, tall and thin, smokes",
   "Reduced air entry on the right, no shock",
   "CXR: large right pneumothorax",
   "No lung disease"
  ],
  "decisions": [
   {
    "tag": "type",
    "scene": "What type of pneumothorax is it?",
    "opts": [
     {
      "q": "best",
      "t": "Primary spontaneous: young, tall, no lung disease",
      "fb": "The classic picture."
     },
     {
      "q": "poor",
      "t": "Tension: he needs a needle at once",
      "fb": "He is not shocked: it is not a tension."
     }
    ]
   },
   {
    "tag": "stable",
    "scene": "Large and symptomatic, but stable. What is the first step?",
    "opts": [
     {
      "q": "best",
      "t": "Needle aspiration with a 14 to 16 gauge cannula under local anaesthetic",
      "fb": "As safe and effective as a chest drain, with a shorter stay (NSW ACI).",
      "vit": {
       "spo2": 98,
       "rr": 16
      }
     },
     {
      "q": "poor",
      "t": "Large-bore chest drain straight away",
      "fb": "Not necessary in a stable primary pneumothorax."
     }
    ]
   },
   {
    "tag": "stable",
    "scene": "After aspiration, what do you do?",
    "opts": [
     {
      "q": "best",
      "t": "Repeat the chest X-ray and observe for a few hours; if the lung is up and he is symptom-free, arrange discharge with early review",
      "fb": "2 to 6 hours of observation is adequate if symptom-free."
     },
     {
      "q": "poor",
      "t": "Discharge straight away without a repeat X-ray",
      "fb": "You need to confirm the result."
     }
    ]
   },
   {
    "tag": "after",
    "scene": "Advice at discharge?",
    "opts": [
     {
      "q": "best",
      "t": "Stop smoking, return if worse, follow your hospital advice on flying and diving",
      "fb": "Counselling reduces recurrence risk."
     },
     {
      "q": "poor",
      "t": "No advice needed",
      "fb": "Recurrence is common."
     }
    ]
   }
  ],
  "ends": {
   "hi": "Right classification, aspiration and follow-up.",
   "mid": "He recovered, but a step was missed.",
   "lo": "Review steps 1, 3 and 5 of the Study Kit."
  }
 },
 {
  "id": "c2",
  "title": "Hypotensive after the line",
  "where": "Intensive care",
  "time": "02:30",
  "blurb": "Sudden shock after a central line. Tests tension pneumothorax.",
  "intro": "Nurse call: 64-year-old man, central line inserted on the right 30 minutes ago. Suddenly breathless and hypotensive.",
  "vit": {
   "hr": 142,
   "sbp": 70,
   "dbp": 40,
   "spo2": 78,
   "rr": 36
  },
  "facts": [
   "64M; subclavian line attempt",
   "Absent air entry on the right",
   "Distended neck veins",
   "On a ventilator: rising airway pressures"
  ],
  "decisions": [
   {
    "tag": "tens",
    "scene": "What is the diagnosis?",
    "opts": [
     {
      "q": "best",
      "t": "Tension pneumothorax from the line",
      "fb": "Shock, absent air entry and high airway pressures after a line."
     },
     {
      "q": "poor",
      "t": "Anaphylaxis to the line",
      "fb": "No signs of allergy."
     }
    ]
   },
   {
    "tag": "tens",
    "scene": "What do you do first?",
    "opts": [
     {
      "q": "best",
      "t": "Call for help and do immediate needle decompression, followed by a chest drain, without waiting for imaging",
      "fb": "Decompress at once. Follow your hospital protocol for the site.",
      "vit": {
       "sbp": 102,
       "spo2": 93,
       "hr": 118
      }
     },
     {
      "q": "poor",
      "t": "Send for a chest X-ray first",
      "fb": "He may arrest while waiting.",
      "vit": {
       "sbp": 50,
       "spo2": 62
      }
     },
     {
      "q": "harm",
      "t": "Give a large fluid bolus and observe",
      "fb": "Fluids will not fix a tension."
     }
    ]
   },
   {
    "tag": "drain",
    "scene": "After decompression, what do you arrange?",
    "opts": [
     {
      "q": "best",
      "t": "A chest drain, a confirmatory chest X-ray, and a review of the line position",
      "fb": "Decompression is temporary. The drain is the definitive step."
     },
     {
      "q": "poor",
      "t": "Remove the cannula and observe",
      "fb": "The tension can recur."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You treated a tension pneumothorax on the clinical picture and drained it.",
   "mid": "He survived, but a step cost time.",
   "lo": "Review steps 2 and 4 of the Study Kit."
  }
 },
 {
  "id": "c3",
  "title": "The drain that went quiet",
  "where": "Respiratory ward",
  "time": "23:50",
  "blurb": "A drain that stopped bubbling. Tests tube care.",
  "intro": "Nurse call: 66-year-old man with COPD, a right chest drain for a secondary pneumothorax placed this morning. The tube stopped bubbling and he is more breathless.",
  "vit": {
   "hr": 112,
   "sbp": 140,
   "dbp": 82,
   "spo2": 88,
   "rr": 28
  },
  "facts": [
   "66M; COPD",
   "Drain in the right chest with water seal",
   "No swing, no bubbling; tubing kinked under the patient",
   "Increasing breathlessness"
  ],
  "decisions": [
   {
    "tag": "drain",
    "scene": "What do you do first?",
    "opts": [
     {
      "q": "best",
      "t": "Check the tube for a kink, blockage or disconnection and the bottle position, and reposition",
      "fb": "A blocked or kinked tube must be fixed first.",
      "vit": {
       "spo2": 90
      }
     },
     {
      "q": "poor",
      "t": "Clamp the drain to see if it stops",
      "fb": "Never clamp a drain on a patient who may still have an air leak.",
      "vit": {
       "spo2": 84
      }
     },
     {
      "q": "poor",
      "t": "Wait for the morning review",
      "fb": "He is deteriorating."
     }
    ]
   },
   {
    "tag": "drain",
    "scene": "After repositioning nothing changes and he gets worse. What now?",
    "opts": [
     {
      "q": "best",
      "t": "Call your senior urgently, examine for tension, get a chest X-ray, and consider flushing or replacing the drain",
      "fb": "A blocked drain can cause a tension pneumothorax.",
      "vit": {
       "spo2": 92
      }
     },
     {
      "q": "poor",
      "t": "Apply high suction",
      "fb": "Suction risks re-expansion pulmonary oedema and is not routine."
     }
    ]
   },
   {
    "tag": "after",
    "scene": "Two days later the lung is up and there is no air leak. What next?",
    "opts": [
     {
      "q": "best",
      "t": "Remove the drain with your senior or the team, repeat the chest X-ray, and advise on smoking, recurrence and flying",
      "fb": "Remove when the lung is up and no leak."
     },
     {
      "q": "poor",
      "t": "Leave the drain in for another week",
      "fb": "No reason once resolved."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You fixed the tube, ruled out tension and planned removal.",
   "mid": "He recovered, but you were slow to check the tube.",
   "lo": "Review step 4 of the Study Kit."
  }
 }
];
