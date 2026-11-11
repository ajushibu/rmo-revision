/* Cases for asth_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
 "sev": {
  "n": "Severity",
  "tab": "1",
  "r": "Mild to moderate: full sentences, SpO2 over 94%. Severe: cannot finish a sentence or SpO2 94% or below. Life-threatening: drowsy, exhausted, cyanosed, poor effort or SpO2 under 92%."
 },
 "bd": {
  "n": "Bronchodilators and oxygen",
  "tab": "2",
  "r": "Salbutamol 4 to 12 puffs (mild), 12 puffs every 20 minutes plus ipratropium 8 puffs (severe), continuous nebulised (life-threatening). Oxygen if under 92%, target 92 to 96%."
 },
 "steroid": {
  "n": "Steroids and magnesium",
  "tab": "3",
  "r": "Oral prednisolone early (Australian Prescriber: 50 mg then 25 mg twice daily). Magnesium is a senior decision with a dose from your protocol."
 },
 "esc": {
  "n": "Escalation",
  "tab": "4",
  "r": "Not improving at one hour, drowsy, silent chest, falling SpO2: call ICU. Look for pneumothorax and anaphylaxis."
 },
 "home": {
  "n": "Discharge",
  "tab": "5",
  "r": "Never discharge on a reliever alone: preventer with an inhaled steroid, action plan, technique check, GP review."
 }
};
window.RMO_CASES = [
 {
  "id": "c1",
  "title": "Out of puffers",
  "where": "Emergency department",
  "time": "22:15",
  "blurb": "A young man who ran out of his reliever. Tests severity, doses and discharge.",
  "intro": "22-year-old man, known asthma, no inhaler for two days. Triage: wheezy, can only say a few words at a time.",
  "vit": {
   "hr": 124,
   "sbp": 130,
   "dbp": 78,
   "spo2": 91,
   "rr": 28
  },
  "facts": [
   "22M; asthma since childhood, used a reliever only",
   "Words only, accessory muscles",
   "Widespread wheeze",
   "SpO2 91% on air"
  ],
  "decisions": [
   {
    "tag": "sev",
    "scene": "How would you classify this attack?",
    "opts": [
     {
      "q": "best",
      "t": "Severe: cannot complete sentences, uses accessory muscles, SpO2 94% or below on air",
      "fb": "Any one of these features is enough to call it severe."
     },
     {
      "q": "poor",
      "t": "Moderate: he is talking",
      "fb": "Words only is severe, not moderate."
     }
    ]
   },
   {
    "tag": "bd",
    "scene": "What do you start?",
    "opts": [
     {
      "q": "best",
      "t": "Salbutamol 12 puffs by spacer every 20 minutes in the first hour, ipratropium 8 puffs by spacer every 20 minutes, and oxygen as his SpO2 is under 92%",
      "fb": "This is the Asthma Handbook plan for a severe attack.",
      "vit": {
       "hr": 116,
       "spo2": 94,
       "rr": 24
      }
     },
     {
      "q": "poor",
      "t": "Two puffs of salbutamol and watch for an hour",
      "fb": "Underdosed for a severe attack."
     },
     {
      "q": "harm",
      "t": "A sedative so he can relax",
      "fb": "Sedation can precipitate respiratory arrest in asthma.",
      "vit": {
       "spo2": 84,
       "rr": 18
      }
     }
    ]
   },
   {
    "tag": "steroid",
    "scene": "Which drug do you add early?",
    "opts": [
     {
      "q": "best",
      "t": "Oral prednisolone, as per your hospital protocol (Australian Prescriber: 50 mg then 25 mg twice daily)",
      "fb": "Steroids take hours, so give them early."
     },
     {
      "q": "poor",
      "t": "Wait for the chest X-ray first",
      "fb": "An X-ray is not needed unless pneumothorax or pneumonia is suspected."
     }
    ]
   },
   {
    "tag": "home",
    "scene": "An hour later he is much better and wants to go home. What do you check?",
    "opts": [
     {
      "q": "best",
      "t": "Speaks easily, SpO2 normal on air, then start or check a preventer with an inhaled steroid, check spacer technique, give a written action plan and GP review",
      "fb": "Improvement is not the same as safe. Close the gap that caused it."
     },
     {
      "q": "poor",
      "t": "Discharge with a salbutamol refill only",
      "fb": "A reliever alone repeats the problem."
     }
    ]
   }
  ],
  "ends": {
   "hi": "Right severity, right doses, right discharge.",
   "mid": "He recovered, but a step was missed.",
   "lo": "Review steps 1, 2 and 5 of the Study Kit."
  }
 },
 {
  "id": "c2",
  "title": "The quiet chest",
  "where": "Emergency resus bay",
  "time": "03:45",
  "blurb": "A silent chest and a drowsy patient. Tests life-threatening asthma.",
  "intro": "38-year-old woman brought in by ambulance. Asthma for years, a cold for three days. She is drowsy, barely speaking.",
  "vit": {
   "hr": 132,
   "sbp": 148,
   "dbp": 90,
   "spo2": 86,
   "rr": 34
  },
  "facts": [
   "38F, drowsy and exhausted",
   "Quiet chest, little air entry",
   "Cyanosed lips",
   "Gas: pH 7.28, PaCO2 52 mmHg"
  ],
  "decisions": [
   {
    "tag": "sev",
    "scene": "What does a quiet chest with drowsiness tell you?",
    "opts": [
     {
      "q": "best",
      "t": "Life-threatening asthma: she is tiring and little air is moving",
      "fb": "Silent chest and drowsiness are life-threatening features."
     },
     {
      "q": "poor",
      "t": "Improving: the wheeze has settled",
      "fb": "The wheeze stopped because the airflow stopped."
     }
    ]
   },
   {
    "tag": "bd",
    "scene": "What do you do immediately?",
    "opts": [
     {
      "q": "best",
      "t": "Oxygen, continuous nebulised salbutamol with ipratropium, IV access, and call ICU and your senior now",
      "fb": "Treat and escalate at the same time.",
      "vit": {
       "spo2": 92,
       "hr": 124
      }
     },
     {
      "q": "poor",
      "t": "Wait for the gas before starting treatment",
      "fb": "Do not delay treatment for a result."
     },
     {
      "q": "harm",
      "t": "Give a benzodiazepine to calm her",
      "fb": "She is exhausted: this can cause arrest.",
      "vit": {
       "spo2": 78,
       "rr": 14
      }
     }
    ]
   },
   {
    "tag": "esc",
    "scene": "Her PaCO2 is 52 mmHg and she is a breathless asthmatic. How do you read it?",
    "opts": [
     {
      "q": "best",
      "t": "A normal or high CO2 in a breathless asthmatic is a sign of tiring: she needs ICU now",
      "fb": "Early in an attack CO2 is low from over-breathing. A normal or rising value means she is tiring."
     },
     {
      "q": "poor",
      "t": "Reassuring: it is nearly normal",
      "fb": "This is the trap."
     }
    ]
   },
   {
    "tag": "steroid",
    "scene": "What else should be prepared?",
    "opts": [
     {
      "q": "best",
      "t": "Oral or IV steroid, senior and ICU decision on magnesium (dose per protocol), and an experienced operator ready for intubation if she tires further",
      "fb": "A senior decides on magnesium; plan the airway early."
     },
     {
      "q": "poor",
      "t": "Plan to treat on the ward overnight",
      "fb": "She needs ICU-level care."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You saw the silent chest and the false reassurance of a normal CO2.",
   "mid": "She was escalated, but later than ideal.",
   "lo": "Review steps 1, 2 and 4 of the Study Kit."
  }
 },
 {
  "id": "c3",
  "title": "Worse after the nebs",
  "where": "Emergency department",
  "time": "01:10",
  "blurb": "A severe asthmatic who suddenly deteriorates. Tests pneumothorax.",
  "intro": "24-year-old man, severe asthma, treated for 40 minutes. He suddenly becomes more breathless and distressed.",
  "vit": {
   "hr": 146,
   "sbp": 82,
   "dbp": 50,
   "spo2": 84,
   "rr": 38
  },
  "facts": [
   "24M, tall and thin",
   "Sudden worsening after a coughing fit",
   "Absent air entry on the right",
   "Distended neck veins"
  ],
  "decisions": [
   {
    "tag": "esc",
    "scene": "What is the cause of the sudden worsening?",
    "opts": [
     {
      "q": "best",
      "t": "Tension pneumothorax",
      "fb": "Sudden worsening, unilateral absent air entry, hypotension and neck veins: treat it clinically."
     },
     {
      "q": "poor",
      "t": "The asthma is simply worse: add more salbutamol",
      "fb": "Unequal air entry with shock points elsewhere."
     }
    ]
   },
   {
    "tag": "esc",
    "scene": "What now?",
    "opts": [
     {
      "q": "best",
      "t": "Needle decompression now by the most experienced person, then a chest drain; do not wait for imaging",
      "fb": "A tension pneumothorax is a clinical diagnosis.",
      "vit": {
       "sbp": 104,
       "spo2": 93,
       "hr": 122
      }
     },
     {
      "q": "poor",
      "t": "Send for a chest X-ray first",
      "fb": "He may arrest while waiting.",
      "vit": {
       "sbp": 60,
       "spo2": 70
      }
     },
     {
      "q": "harm",
      "t": "Start NIV",
      "fb": "Positive pressure will worsen a tension pneumothorax.",
      "vit": {
       "sbp": 50,
       "spo2": 62
      }
     }
    ]
   },
   {
    "tag": "home",
    "scene": "After the drain he is stable. What is the plan?",
    "opts": [
     {
      "q": "best",
      "t": "Admit, keep treating the asthma, repeat the chest X-ray and look after the drain",
      "fb": "He needs admission and a drain plan."
     },
     {
      "q": "poor",
      "t": "Remove the drain once he looks better and discharge",
      "fb": "The lung needs time to re-expand and the drain to be reviewed."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You recognised tension pneumothorax in an asthmatic and acted fast.",
   "mid": "He recovered, but a step cost time.",
   "lo": "Review step 4 of the Study Kit and the pneumothorax kit."
  }
 }
];
