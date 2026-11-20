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
 },
 {
  "id": "c20261115a",
  "from": "c1",
  "title": "Talking, but not fine",
  "where": "Medical ward",
  "time": "01:20",
  "blurb": "A woman admitted for cellulitis gets wheezy overnight. The nurse says she is fine because she is talking. Tests severity, doses and reassessment.",
  "intro": "Nurse call: 34-year-old woman, admitted yesterday with leg cellulitis. Known asthma. Wheezy for an hour. \"She's talking to me, so I think she's OK.\"",
  "vit": {
   "hr": 118,
   "sbp": 132,
   "dbp": 80,
   "spo2": 93,
   "rr": 26
  },
  "facts": [
   "34F; asthma, uses her reliever most days, no preventer",
   "Talks, but stops for breath every few words",
   "Neck muscles working; widespread wheeze",
   "SpO2 93% on air; alert and orientated"
  ],
  "decisions": [
   {
    "tag": "sev",
    "scene": "She is talking and alert. How severe is this attack?",
    "opts": [
     {
      "q": "best",
      "t": "Severe: she cannot finish a sentence in one breath, she is using her neck muscles, and her SpO2 is 94% or below on air",
      "fb": "Any one of these makes it severe (Australian Asthma Handbook). Talking is not the test: whole sentences in one breath is."
     },
     {
      "q": "poor",
      "t": "Mild to moderate: she is talking, alert, and her SpO2 is over 92%",
      "fb": "Mild to moderate needs all of: whole sentences in one breath and SpO2 over 94% on air. She has neither."
     },
     {
      "q": "ok",
      "t": "Life-threatening: put out a MET call",
      "fb": "Not life-threatening (she is alert, SpO2 not under 92%, good effort). Getting help early is never wrong, but know the grades."
     }
    ]
   },
   {
    "tag": "bd",
    "scene": "What do you start?",
    "opts": [
     {
      "q": "best",
      "t": "Salbutamol 12 puffs (100 microg each) by spacer and ipratropium 8 puffs (21 microg each) by spacer, both every 20 minutes for the first hour. No oxygen yet: start it if SpO2 falls under 92%",
      "fb": "This is the Asthma Handbook ED plan for severe asthma. Oxygen starts under 92% and is titrated to 92 to 96%.",
      "vit": {
       "hr": 110,
       "spo2": 95,
       "rr": 22
      }
     },
     {
      "q": "poor",
      "t": "Two puffs of her reliever and review in the morning",
      "fb": "Underdosed for a severe attack, and she needs reassessment within the hour.",
      "vit": {
       "spo2": 91,
       "rr": 30
      }
     },
     {
      "q": "poor",
      "t": "High-flow oxygen by non-rebreather to get her SpO2 to 100%",
      "fb": "She does not need oxygen at 93%, and over-oxygenation in adults raises the risk of CO2 retention (Asthma Handbook). Bronchodilators are the treatment."
     }
    ]
   },
   {
    "tag": "steroid",
    "scene": "Which drug do you add now?",
    "opts": [
     {
      "q": "best",
      "t": "Oral prednisolone 37.5 to 50 mg now, then each morning for 5 to 10 days in total",
      "fb": "Australian Asthma Handbook dose. Steroids take hours to work, so give them early, at night too."
     },
     {
      "q": "poor",
      "t": "Leave the steroid for the day team to decide",
      "fb": "Delay makes the next hours worse. Start it now."
     }
    ]
   },
   {
    "tag": "sev",
    "scene": "Forty minutes later she speaks whole sentences in one breath, SpO2 95% on air, HR 104. She wants to sleep. What now?",
    "opts": [
     {
      "q": "best",
      "t": "She is now mild to moderate, but she was severe an hour ago: reassess at one hour, keep salbutamol going as needed, keep her on observations, and escalate if she slips back",
      "fb": "Grade again after treatment. Improvement in the first hour is a good sign, not the end of watching."
     },
     {
      "q": "poor",
      "t": "She is better: stop the observations until the morning",
      "fb": "She was severe 40 minutes ago. Asthma can relapse as the salbutamol wears off."
     }
    ]
   },
   {
    "tag": "home",
    "scene": "Two days later the cellulitis is better and she is going home. What about her asthma?",
    "opts": [
     {
      "q": "best",
      "t": "Start a preventer with an inhaled steroid, check her spacer and inhaler technique, give a written action plan, and arrange GP review",
      "fb": "Reliever most days with no preventer is why this happened. Fix the gap before she leaves."
     },
     {
      "q": "poor",
      "t": "Nothing extra: she came in for cellulitis",
      "fb": "An acute attack in hospital is a marker of poor control. Use the admission to fix it."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You looked past 'she is talking' and graded her right, then treated and rechecked.",
   "mid": "She recovered, but a step was missed. Review the severity grades.",
   "lo": "Review steps 1, 2 and 5 of the Study Kit."
  }
 },
 {
  "id": "c20261117a",
  "from": "c1",
  "title": "Storm night",
  "where": "Emergency department",
  "time": "23:50",
  "blurb": "A man with hay fever and no asthma diagnosis, caught outside before a spring thunderstorm. Tests severity, doses, steroids and what he needs before he leaves.",
  "intro": "Late November, the ED is filling up after an evening thunderstorm. 26-year-old man, hay fever every spring, never told he has asthma. He was walking home in the gusty wind before the storm. Now wheezy and frightened.",
  "vit": {
   "hr": 120,
   "sbp": 134,
   "dbp": 82,
   "spo2": 92,
   "rr": 30
  },
  "facts": [
   "26M; spring hay fever, no asthma diagnosis, no inhalers",
   "Says a few words, then stops for breath",
   "Neck muscles working, tracheal tug; widespread wheeze",
   "SpO2 92% on air; alert"
  ],
  "decisions": [
   {
    "tag": "sev",
    "scene": "He has never had asthma. How do you grade this?",
    "opts": [
     {
      "q": "best",
      "t": "Severe acute asthma (thunderstorm asthma): he cannot finish a sentence in one breath, he is using his neck muscles, and his SpO2 is 94% or below on air",
      "fb": "Any one of these makes it severe (Australian Asthma Handbook). People with hay fever and no asthma diagnosis can get thunderstorm asthma (National Asthma Council)."
     },
     {
      "q": "poor",
      "t": "Not asthma: he has no diagnosis, so this is panic from the storm",
      "fb": "Wheeze, accessory muscles and SpO2 92% are not panic. Thunderstorm asthma hits people with hay fever who have never had asthma."
     },
     {
      "q": "poor",
      "t": "Mild to moderate: his SpO2 is 92%, so he does not even need oxygen",
      "fb": "Not needing oxygen yet does not make it mild. Mild to moderate needs whole sentences and SpO2 over 94%."
     }
    ]
   },
   {
    "tag": "bd",
    "scene": "What do you start?",
    "opts": [
     {
      "q": "best",
      "t": "Salbutamol 12 puffs (100 microg each) by spacer and ipratropium 8 puffs (21 microg each) by spacer, both every 20 minutes for the first hour. Oxygen only if SpO2 falls under 92%, then to 92 to 96%",
      "fb": "This is the Asthma Handbook ED plan for severe asthma.",
      "vit": {
       "hr": 112,
       "spo2": 95,
       "rr": 24
      }
     },
     {
      "q": "poor",
      "t": "Salbutamol 4 puffs once, then back to the waiting room",
      "fb": "Underdosed for a severe attack, and he needs watching, not the waiting room.",
      "vit": {
       "spo2": 90,
       "rr": 32
      }
     },
     {
      "q": "harm",
      "t": "A benzodiazepine for his anxiety",
      "fb": "Sedation can stop a breathless asthmatic breathing.",
      "vit": {
       "spo2": 85,
       "rr": 16
      }
     }
    ]
   },
   {
    "tag": "steroid",
    "scene": "Which drug do you add now?",
    "opts": [
     {
      "q": "best",
      "t": "Oral prednisolone 37.5 to 50 mg now, then each morning for 5 to 10 days in total",
      "fb": "Australian Asthma Handbook dose. A first attack still needs a steroid: it takes hours to work, so give it early."
     },
     {
      "q": "poor",
      "t": "No steroid: the pollen caused it and it will pass",
      "fb": "The airway inflammation does not pass with the storm. Without a steroid he is likely to relapse."
     }
    ]
   },
   {
    "tag": "home",
    "scene": "Two hours later he speaks easily, SpO2 97% on air. He wants to go home. What does he need?",
    "opts": [
     {
      "q": "best",
      "t": "A new asthma diagnosis on his record, a preventer with an inhaled steroid and a reliever, spacer technique checked, a written action plan, GP review in a few days, treatment for his hay fever, and advice to stay inside before and during spring storms",
      "fb": "He is now a person with asthma. The National Asthma Council advises a preventer through the pollen season and a reliever on him at all times."
     },
     {
      "q": "poor",
      "t": "A salbutamol puffer only: it was a one-off storm",
      "fb": "A reliever alone leaves the airway inflammation untreated, and the pollen season is not over."
     },
     {
      "q": "poor",
      "t": "An antihistamine for the hay fever and home",
      "fb": "Hay fever treatment does not treat his asthma, and it is not known to prevent thunderstorm asthma."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You called it asthma, graded it severe and sent him home with a preventer and a plan.",
   "mid": "He recovered, but a step was missed.",
   "lo": "Review steps 1, 2, 3 and 5 of the Study Kit."
  }
 },
 {
  "id": "c20261117b",
  "from": "c20261115a",
  "title": "Good sats, still severe",
  "where": "Emergency department, fast track",
  "time": "18:30",
  "blurb": "A student put in fast track because her SpO2 is 96% and she is talking. Tests that one severe feature is enough, and what a fast heart rate after salbutamol means.",
  "intro": "Triage note: 19-year-old woman, asthma, 'talking in sentences, SpO2 96%, fast track'. When you see her, she is sitting forward and her neck is pulling with every breath.",
  "vit": {
   "hr": 112,
   "sbp": 124,
   "dbp": 76,
   "spo2": 96,
   "rr": 28
  },
  "facts": [
   "19F; asthma, reliever most days, stopped her preventer months ago",
   "Speaks in whole sentences, but clearly working hard",
   "Tracheal tug and intercostal recession; widespread wheeze",
   "SpO2 96% on air; alert"
  ],
  "decisions": [
   {
    "tag": "sev",
    "scene": "She speaks in sentences and her SpO2 is 96%. How severe is this?",
    "opts": [
     {
      "q": "best",
      "t": "Severe: she is using her accessory muscles, with a tracheal tug and obvious distress. Any one severe feature is enough, even with good sats and sentences",
      "fb": "Asthma Handbook: severe is any of these features; mild to moderate needs all of the mild features. Accessory muscles alone make it severe."
     },
     {
      "q": "poor",
      "t": "Mild to moderate: she speaks whole sentences and her SpO2 is over 94%",
      "fb": "Those are two of the features, but her work of breathing is a severe feature. Grade by the worst feature, not the best ones."
     },
     {
      "q": "ok",
      "t": "Life-threatening: put out a MET call",
      "fb": "She is alert, saturating and has good effort, so not life-threatening. Getting help is not wrong, but know the grades."
     }
    ]
   },
   {
    "tag": "bd",
    "scene": "What do you start?",
    "opts": [
     {
      "q": "best",
      "t": "Move her to an acute bed. Salbutamol 12 puffs (100 microg each) and ipratropium 8 puffs (21 microg each) by spacer, both every 20 minutes for the first hour. No oxygen at 96%",
      "fb": "Severe asthma gets the severe plan whatever the SpO2 (Asthma Handbook). Oxygen starts only under 92%.",
      "vit": {
       "hr": 118,
       "spo2": 97,
       "rr": 22
      }
     },
     {
      "q": "poor",
      "t": "Salbutamol 4 puffs and back to fast track",
      "fb": "Underdosed for severe asthma, and fast track is the wrong place for her.",
      "vit": {
       "spo2": 94,
       "rr": 30
      }
     },
     {
      "q": "poor",
      "t": "High-flow oxygen by non-rebreather",
      "fb": "She does not need oxygen at 96%. Bronchodilators are the treatment."
     }
    ]
   },
   {
    "tag": "steroid",
    "scene": "When do you give the steroid?",
    "opts": [
     {
      "q": "best",
      "t": "Now: oral prednisolone 37.5 to 50 mg, then each morning for 5 to 10 days in total",
      "fb": "Australian Asthma Handbook dose. It takes hours to work, so it goes in with the first salbutamol."
     },
     {
      "q": "poor",
      "t": "Only if she is not better after the salbutamol",
      "fb": "Waiting loses hours. Every severe attack gets a steroid early."
     }
    ]
   },
   {
    "tag": "sev",
    "scene": "One hour later: no tug, no recession, whole sentences, SpO2 97% on air. Her heart rate is 118 and her hands shake. What now?",
    "opts": [
     {
      "q": "best",
      "t": "She is now mild to moderate. The fast heart rate and tremor are expected after high-dose salbutamol, not a sign of severity. Space out the salbutamol, keep observing her and reassess before any discharge",
      "fb": "The Asthma Handbook grades severity by speech, work of breathing, SpO2 and conscious state, not by heart rate. Re-grade after treatment, then keep watching."
     },
     {
      "q": "poor",
      "t": "Her heart rate is still high, so she is still severe: call ICU",
      "fb": "Tachycardia and tremor after salbutamol are side effects. Her work of breathing has settled."
     },
     {
      "q": "poor",
      "t": "She looks well: discharge her now",
      "fb": "She was severe an hour ago. Observe her first and follow your ED discharge protocol."
     }
    ]
   },
   {
    "tag": "home",
    "scene": "Later that night she is ready to go. What does she leave with?",
    "opts": [
     {
      "q": "best",
      "t": "Restart a preventer with an inhaled steroid, check her spacer technique, finish the prednisolone course, a written action plan, and GP review within a few days",
      "fb": "Reliever most days with no preventer is why this happened. Fix it before she leaves."
     },
     {
      "q": "poor",
      "t": "A new salbutamol puffer only",
      "fb": "A reliever alone repeats the problem."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You looked past good sats and sentences, graded her severe, and read the heart rate right.",
   "mid": "She recovered, but a step was missed. Review the severity grades.",
   "lo": "Review steps 1, 2 and 5 of the Study Kit."
  }
 },
{
 "id": "c20261117d",
 "from": "c1",
 "title": "Short of words on the orthopaedic ward",
 "where": "Orthopaedic ward",
 "time": "02:10",
 "blurb": "A man two days after ankle surgery, whose preventer was never charted. Tests that talking in phrases is severe, even when he says he is fine.",
 "intro": "Ward call: 31-year-old man, day 2 after fixing a broken ankle. Known asthma. Wheezy for an hour. \"He says he is OK, he is talking to me.\"",
 "vit": {
  "hr": 118,
  "sbp": 132,
  "dbp": 80,
  "spo2": 93,
  "rr": 28
 },
 "facts": [
  "31M; asthma since childhood; preventer and reliever at home",
  "Preventer not charted on admission; no reliever on the ward since surgery",
  "Talks in short phrases, has to stop for breath",
  "SpO2 93% on air; alert; widespread wheeze"
 ],
 "decisions": [
  {
   "tag": "sev",
   "scene": "He says \"I am... OK... just... tight\". How severe is this?",
   "opts": [
    {
     "q": "best",
     "t": "Severe: he cannot finish a sentence in one breath and his SpO2 is 94% or below",
     "fb": "Asthma Handbook: any one severe feature makes it severe. Talking in phrases is not talking in sentences."
    },
    {
     "q": "poor",
     "t": "Moderate: he is talking and alert",
     "fb": "Being able to talk is not the test. He cannot finish a sentence: that is a severe feature."
    },
    {
     "q": "ok",
     "t": "Life-threatening: put out a MET call",
     "fb": "He is alert with good effort and an SpO2 of 93%, so not life-threatening. Calling for help is still reasonable at night."
    }
   ]
  },
  {
   "tag": "bd",
   "scene": "What do you start?",
   "opts": [
    {
     "q": "best",
     "t": "Salbutamol 12 puffs (100 microg each) and ipratropium 8 puffs (21 microg each) by spacer, both every 20 minutes for the first hour. No oxygen yet at 93%; start it if the SpO2 falls under 92%, aiming at 92 to 96%",
     "fb": "Severe asthma gets the severe plan (Asthma Handbook). Oxygen is for an SpO2 under 92%.",
     "vit": {
      "hr": 114,
      "spo2": 95,
      "rr": 24
     }
    },
    {
     "q": "poor",
     "t": "Salbutamol 4 puffs and reassess in the morning",
     "fb": "Underdosed for severe asthma, and the morning is too late.",
     "vit": {
      "spo2": 91,
      "rr": 32
     }
    },
    {
     "q": "poor",
     "t": "High-flow oxygen by non-rebreather and nothing else",
     "fb": "Oxygen is not the treatment, and he does not need it at 93%."
    }
   ]
  },
  {
   "tag": "steroid",
   "scene": "He is on ibuprofen and paracetamol for the ankle. What about a steroid?",
   "opts": [
    {
     "q": "best",
     "t": "Now: oral prednisolone 37.5 to 50 mg, then each morning for 5 to 10 days in total. Ask whether NSAIDs have ever made his asthma worse, and review the ibuprofen",
     "fb": "Every severe attack gets an early steroid (Asthma Handbook dose). Some people with asthma react to NSAIDs, so check his history."
    },
    {
     "q": "poor",
     "t": "Only if he is still wheezy after the salbutamol",
     "fb": "Waiting loses hours. The steroid takes hours to work."
    },
    {
     "q": "poor",
     "t": "IV hydrocortisone instead, because he is post-operative",
     "fb": "He can swallow, and oral prednisolone works as well when the gut works."
    }
   ]
  },
  {
   "tag": "home",
   "scene": "He is better by the morning round. What goes on his discharge plan?",
   "opts": [
    {
     "q": "best",
     "t": "Restart his preventer now and chart a reliever, check his inhaler technique, finish the prednisolone course, a written action plan and GP review within a few days",
     "fb": "The attack came from stopping his preventer. Fix that and the plan before he leaves."
    },
    {
     "q": "poor",
     "t": "A new reliever only",
     "fb": "A reliever alone repeats the problem."
    }
   ]
  }
 ],
 "ends": {
  "hi": "You graded him by his speech, not by his reassurance, and fixed the missing preventer.",
  "mid": "He recovered, but a step was missed. Review the severity grades.",
  "lo": "Review steps 1, 2 and 5 of the Study Kit."
 }
},
{
 "id": "c20261117e",
 "from": "c20261115a",
 "title": "Pregnant, talking, and working hard",
 "where": "Maternity assessment unit",
 "time": "21:40",
 "blurb": "A woman at 28 weeks who is talking and has an SpO2 of 95%, but is using her neck muscles. Tests that one severe feature is enough, and that asthma in pregnancy is treated the same way.",
 "intro": "Midwife call: 27-year-old woman, 28 weeks pregnant, asthma, wheezy since a cold 3 days ago. \"She is chatting with me and her sats are 95%, can she wait for the morning team?\"",
 "vit": {
  "hr": 122,
  "sbp": 118,
  "dbp": 72,
  "spo2": 95,
  "rr": 30
 },
 "facts": [
  "27F, 28 weeks pregnant, first baby",
  "Asthma; stopped her preventer when she found out she was pregnant",
  "Talks in sentences but is sitting forward, neck muscles pulling",
  "SpO2 95% on air; RR 30; widespread wheeze; baby moving normally"
 ],
 "decisions": [
  {
   "tag": "sev",
   "scene": "She talks in sentences and her SpO2 is 95%. How severe is this?",
   "opts": [
    {
     "q": "best",
     "t": "Severe: she is using her accessory muscles. Any one severe feature is enough, even with good sats and sentences",
     "fb": "Asthma Handbook: severe is any severe feature. Grade by the worst feature, not the best ones."
    },
    {
     "q": "poor",
     "t": "Mild to moderate: she is talking and her SpO2 is over 94%",
     "fb": "Those are two mild features, but her work of breathing is a severe feature."
    },
    {
     "q": "poor",
     "t": "Hard to grade in pregnancy, so wait for the obstetric team",
     "fb": "Severity is graded the same way. Treat now and tell the obstetric team."
    }
   ]
  },
  {
   "tag": "bd",
   "scene": "What do you start?",
   "opts": [
    {
     "q": "best",
     "t": "Salbutamol 12 puffs (100 microg each) and ipratropium 8 puffs (21 microg each) by spacer, both every 20 minutes for the first hour. Tell the obstetric team and monitor the baby as per your hospital protocol",
     "fb": "Asthma attacks in pregnancy are treated the same way. Uncontrolled asthma is the bigger risk to the baby than the drugs.",
     "vit": {
      "hr": 116,
      "spo2": 97,
      "rr": 24
     }
    },
    {
     "q": "poor",
     "t": "Hold the salbutamol until the obstetric registrar reviews her, because of the baby",
     "fb": "Delay is the danger. The usual drugs are used in pregnancy.",
     "vit": {
      "spo2": 93,
      "rr": 34
     }
    },
    {
     "q": "poor",
     "t": "Salbutamol 4 puffs as needed",
     "fb": "Underdosed for severe asthma."
    }
   ]
  },
  {
   "tag": "steroid",
   "scene": "The midwife asks if a steroid is safe in pregnancy.",
   "opts": [
    {
     "q": "best",
     "t": "Now: oral prednisolone 37.5 to 50 mg, then each morning for 5 to 10 days in total. It is used in pregnancy, and a severe attack needs it",
     "fb": "Asthma Handbook: treat as for any adult. The steroid takes hours to work, so it goes in early."
    },
    {
     "q": "poor",
     "t": "Avoid steroids in pregnancy and rely on salbutamol",
     "fb": "An untreated severe attack is the greater risk. Give the steroid."
    }
   ]
  },
  {
   "tag": "sev",
   "scene": "One hour later: no neck muscle use, whole sentences, SpO2 97% on air, RR 20. HR 112 with a tremor. What now?",
   "opts": [
    {
     "q": "best",
     "t": "She is now mild to moderate. The fast heart rate and tremor are expected after salbutamol. Space out the salbutamol, keep observing her and her baby, and reassess before any decision to go home",
     "fb": "Re-grade after treatment by speech, effort, SpO2 and conscious state, not heart rate."
    },
    {
     "q": "poor",
     "t": "Still severe because of the heart rate: call ICU",
     "fb": "Tachycardia and tremor after high-dose salbutamol are side effects."
    },
    {
     "q": "poor",
     "t": "She looks well: send her home now",
     "fb": "She was severe an hour ago. Observe her first and follow your protocol."
    }
   ]
  },
  {
   "tag": "home",
   "scene": "Before she goes, what do you sort out?",
   "opts": [
    {
     "q": "best",
     "t": "Restart a preventer with an inhaled steroid (explain it is used in pregnancy), check her spacer technique, finish the prednisolone, a written action plan, and early GP and antenatal review",
     "fb": "Stopping her preventer caused this. Most asthma medicines are continued in pregnancy."
    },
    {
     "q": "poor",
     "t": "A new reliever only, and stay off the preventer until after the birth",
     "fb": "That is how this attack happened."
    }
   ]
  }
 ],
 "ends": {
  "hi": "You graded her by her work of breathing, treated her like any adult, and restarted her preventer.",
  "mid": "She recovered, but a step was missed. Review the severity grades.",
  "lo": "Review steps 1, 2, 3 and 5 of the Study Kit."
 }
},
{
 "id": "c20261120a",
 "from": "c1",
 "title": "Full sentences, 93%",
 "where": "Gastroenterology ward",
 "time": "03:20",
 "blurb": "A woman with gastroenteritis who ran out of her preventer. She talks in full sentences and is not using her neck muscles, but her SpO2 is 93% on air. Tests that the SpO2 alone can make it severe, and what to do with the steroid when she is vomiting.",
 "intro": "Nurse call: 44-year-old woman admitted yesterday with gastroenteritis. Known asthma. Wheezy since midnight. \"She's chatting away in full sentences, but her sats are 93%.\"",
 "vit": {
  "hr": 108,
  "sbp": 124,
  "dbp": 76,
  "spo2": 93,
  "rr": 24
 },
 "facts": [
  "44F; asthma; ran out of her preventer 3 weeks ago",
  "Admitted with gastroenteritis; vomited twice in the last hour",
  "Talks in full sentences; no neck muscle use; no tracheal tug",
  "SpO2 93% on air; widespread wheeze; alert"
 ],
 "decisions": [
  {
   "tag": "sev",
   "scene": "Full sentences, no accessory muscles, alert. SpO2 93% on air. How severe is this?",
   "opts": [
    {
     "q": "best",
     "t": "Severe: an SpO2 of 94% or below is a severe feature on its own, even with full sentences and no neck muscle use",
     "fb": "Asthma Handbook: any one severe feature makes it severe. Grade by the worst feature, not the best ones."
    },
    {
     "q": "poor",
     "t": "Mild to moderate: she talks in full sentences and is not using her neck muscles",
     "fb": "Those are mild features, but the SpO2 of 93% is a severe one. One is enough."
    },
    {
     "q": "poor",
     "t": "Life-threatening: SpO2 under 95%",
     "fb": "Life-threatening means an SpO2 under 90%, exhaustion, drowsiness or a silent chest. She is severe."
    }
   ]
  },
  {
   "tag": "bd",
   "scene": "What do you start?",
   "opts": [
    {
     "q": "best",
     "t": "Salbutamol 12 puffs (100 microg each) and ipratropium 8 puffs (21 microg each) by spacer, both every 20 minutes for the first hour. Oxygen only if the SpO2 falls under 92%, aiming at 92 to 96%",
     "fb": "The severe plan (Asthma Handbook). At 93% she does not need oxygen yet; watch for a fall.",
     "vit": {
      "hr": 112,
      "spo2": 96,
      "rr": 20
     }
    },
    {
     "q": "poor",
     "t": "Hudson mask at 8 L/min to bring her to 100% first, then salbutamol",
     "fb": "Oxygen is not the treatment, and aiming at 100% is not the target. Bronchodilator first."
    },
    {
     "q": "poor",
     "t": "Salbutamol 4 puffs as needed",
     "fb": "Underdosed for severe asthma.",
     "vit": {
      "spo2": 91,
      "rr": 28
     }
    }
   ]
  },
  {
   "tag": "steroid",
   "scene": "She vomited twice in the last hour. What about the steroid?",
   "opts": [
    {
     "q": "best",
     "t": "Give it now. If she cannot keep tablets down, IV hydrocortisone (dose per your hospital protocol), then oral prednisolone 37.5 to 50 mg each morning once she can, for 5 to 10 days in total",
     "fb": "Every severe attack needs an early steroid. The oral dose is from the Asthma Handbook; when the gut cannot take it, use the IV route rather than skip it."
    },
    {
     "q": "ok",
     "t": "Oral prednisolone 50 mg now with an antiemetic, and see if it stays down",
     "fb": "Reasonable if she can keep it down. If she vomits it, switch to IV: do not let the dose be lost."
    },
    {
     "q": "poor",
     "t": "Hold the steroid until the vomiting stops",
     "fb": "That could be a day. The steroid takes hours to work, so it goes in early, by whichever route works."
    }
   ]
  },
  {
   "tag": "home",
   "scene": "Two days later she is well and eating. What goes on her discharge plan?",
   "opts": [
    {
     "q": "best",
     "t": "Restart her preventer with an inhaled steroid and make sure she has a script, check her inhaler and spacer technique, finish the steroid course, a written action plan, and GP review within a few days",
     "fb": "Running out of her preventer started this. Fix the supply and the plan before she leaves."
    },
    {
     "q": "poor",
     "t": "A new reliever only; the gastro was the trigger",
     "fb": "The virus may have tipped her over, but no preventer for 3 weeks set it up. A reliever alone repeats the problem."
    }
   ]
  }
 ],
 "ends": {
  "hi": "You graded her by her SpO2, not her sentences, and kept the steroid going despite the vomiting.",
  "mid": "She recovered, but a step was missed. Review the severity grades.",
  "lo": "Review steps 1, 2 and 5 of the Study Kit."
 }
},
{
 "id": "c20261120b",
 "from": "c20261115a",
 "title": "Still pulling at one hour",
 "where": "Medical admissions unit",
 "time": "23:30",
 "blurb": "A university student talking in sentences with good sats, but with a tracheal tug. After an hour of treatment she is no better. Tests one severe feature, and what to do when the first hour has not worked.",
 "intro": "Nurse call: 19-year-old woman, asthma, wheezy for 2 days after a cold. Sent up from ED an hour ago. \"Her sats are 95% and she's talking to me, but she looks like she's working.\"",
 "vit": {
  "hr": 124,
  "sbp": 122,
  "dbp": 74,
  "spo2": 95,
  "rr": 28
 },
 "facts": [
  "19F; asthma; uses her reliever most days, no preventer",
  "Talks in sentences; tracheal tug and intercostal recession",
  "SpO2 95% on air; RR 28; widespread wheeze; alert",
  "ED gave 4 puffs of salbutamol before she came up"
 ],
 "decisions": [
  {
   "tag": "sev",
   "scene": "Sentences and an SpO2 of 95%, with a tracheal tug and recession. How severe is this?",
   "opts": [
    {
     "q": "best",
     "t": "Severe: she is using her accessory muscles. One severe feature is enough",
     "fb": "Asthma Handbook: a tracheal tug, recession or neck muscle use is a severe feature, whatever the SpO2 and speech."
    },
    {
     "q": "poor",
     "t": "Mild to moderate: she talks in sentences and her SpO2 is over 94%",
     "fb": "Two mild features do not cancel a severe one. Her work of breathing makes this severe."
    },
    {
     "q": "poor",
     "t": "Moderate, because ED already treated her",
     "fb": "Four puffs is not severe treatment, and you grade her as she is now."
    }
   ]
  },
  {
   "tag": "bd",
   "scene": "What do you start?",
   "opts": [
    {
     "q": "best",
     "t": "Salbutamol 12 puffs (100 microg each) and ipratropium 8 puffs (21 microg each) by spacer, both every 20 minutes for the first hour, and tell your registrar she is severe",
     "fb": "The severe plan from the Asthma Handbook. Oxygen only if the SpO2 falls under 92%.",
     "vit": {
      "hr": 128,
      "spo2": 95,
      "rr": 26
     }
    },
    {
     "q": "poor",
     "t": "Another 4 puffs of salbutamol and review in an hour",
     "fb": "Underdosed, and too long to wait for a severe patient."
    }
   ]
  },
  {
   "tag": "steroid",
   "scene": "What about a steroid?",
   "opts": [
    {
     "q": "best",
     "t": "Now: oral prednisolone 37.5 to 50 mg, then each morning for 5 to 10 days in total",
     "fb": "Every severe attack gets an early steroid (Asthma Handbook)."
    },
    {
     "q": "poor",
     "t": "Only if she is still wheezy in the morning",
     "fb": "Too late. The steroid takes hours to work."
    }
   ]
  },
  {
   "tag": "sev",
   "scene": "One hour later: still a tracheal tug, now speaking in short phrases, SpO2 92% on air, RR 30, HR 132 with a tremor. What now?",
   "opts": [
    {
     "q": "best",
     "t": "She is not responding: still severe and tiring. Call your registrar and ICU outreach now, keep the salbutamol going (continuous nebulised if needed), oxygen to 92 to 96%, and IV magnesium sulfate 0.2 mmol/kg (maximum 10 mmol) over 20 minutes with your senior",
     "fb": "No better after the first hour means escalate. The Asthma Handbook lists IV magnesium (0.2 mmol/kg, maximum 10 mmol, over 20 minutes) for severe asthma not responding to repeated bronchodilators.",
     "vit": {
      "hr": 126,
      "spo2": 95,
      "rr": 24
     }
    },
    {
     "q": "poor",
     "t": "The fast heart rate and tremor are from the salbutamol: space out the puffs and review in the morning",
     "fb": "The heart rate is from salbutamol, but her speech, effort and SpO2 are all worse. Re-grade by those, not the heart rate.",
     "vit": {
      "hr": 136,
      "spo2": 89,
      "rr": 34
     }
    },
    {
     "q": "ok",
     "t": "Another hour of 12 puffs every 20 minutes, then reassess",
     "fb": "More bronchodilator is right, but she is getting worse: she needs a senior and ICU outreach now, not in an hour."
    }
   ]
  },
  {
   "tag": "home",
   "scene": "Two days later she is well. What goes on her discharge plan?",
   "opts": [
    {
     "q": "best",
     "t": "Start a preventer with an inhaled steroid, check her spacer technique, finish the prednisolone, a written action plan, and GP review within a few days",
     "fb": "Reliever most days and no preventer is why this happened."
    },
    {
     "q": "poor",
     "t": "A new reliever and a script for more prednisolone in case it happens again",
     "fb": "Repeated steroid courses are not a plan. She needs a preventer."
    }
   ]
  }
 ],
 "ends": {
  "hi": "You graded her by her work of breathing, saw that the first hour had not worked, and escalated.",
  "mid": "She recovered, but a step was missed. Review the severity grades and the escalation step.",
  "lo": "Review steps 1, 2, 3 and 5 of the Study Kit."
 }
}
];
