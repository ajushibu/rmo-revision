/* Cases for rd_shift. Retire a case with retired: true; add new ones with a unique id. */
window.RMO_CONCEPTS = {
 "look": {
  "n": "First two minutes",
  "tab": "1",
  "r": "Airway, breathing, circulation, disability; call for help early; oxygen only if hypoxic, aiming 92 to 96% (88 to 92% if CO2 retainer)."
 },
 "cause": {
  "n": "Big causes and first move",
  "tab": "2",
  "r": "Wheeze: bronchodilator. Oedema: sit up and CPAP. Tension: decompress. Anaphylaxis: IM adrenaline. Sudden clear chest: think PE."
 },
 "gas": {
  "n": "Reading the gas",
  "tab": "3",
  "r": "Type 1: low O2, normal or low CO2. Type 2: high CO2. High CO2 with low pH is acute. A venous gas cannot show oxygenation."
 },
 "o2": {
  "n": "Oxygen ladder",
  "tab": "4",
  "r": "Controlled oxygen for CO2 retainers; CPAP for oedema; BiPAP for hypercapnic acidosis. Do not sedate."
 },
 "call": {
  "n": "When to call",
  "tab": "5",
  "r": "Drowsy, silent chest, rising CO2 or falling pH, hypotension: call your senior and ICU outreach early and check treatment limits."
 }
};
window.RMO_CASES = [
 {
  "id": "c1",
  "title": "Quiet after the operation",
  "where": "Surgical ward",
  "time": "03:10",
  "blurb": "A drowsy patient on an opioid pump. Tests CO2 retention and sedation.",
  "intro": "Nurse call: 66-year-old man, day 1 after a hip replacement, on a PCA. Hard to wake and breathing slowly.",
  "vit": {
   "hr": 62,
   "sbp": 108,
   "dbp": 64,
   "spo2": 86,
   "rr": 7
  },
  "facts": [
   "66M, hip replacement yesterday",
   "Morphine PCA, 40 mg used overnight",
   "Small pupils, rouses to voice then drifts off",
   "Glucose 6.8"
  ],
  "decisions": [
   {
    "tag": "look",
    "scene": "He is slow, drowsy and hypoxic. What do you do first?",
    "opts": [
     {
      "q": "best",
      "t": "Call for help, stop the PCA, stimulate him, open the airway, give oxygen and support breathing if needed",
      "fb": "Airway and breathing first. The cause (opioid) is obvious but oxygen and ventilation come first.",
      "vit": {
       "spo2": 92,
       "rr": 9
      }
     },
     {
      "q": "poor",
      "t": "Take a full history from the nurse before touching him",
      "fb": "Too slow. He needs help now."
     },
     {
      "q": "harm",
      "t": "Give a benzodiazepine to settle him",
      "fb": "A sedative will deepen respiratory depression.",
      "vit": {
       "spo2": 80,
       "rr": 5
      }
     }
    ]
   },
   {
    "tag": "gas",
    "scene": "An arterial gas on oxygen: pH 7.22, PaCO2 78 mmHg, PaO2 70. What does it show?",
    "opts": [
     {
      "q": "best",
      "t": "Acute type 2 respiratory failure from hypoventilation",
      "fb": "High CO2 with a low pH is acute failure to breathe enough. The oxygen level is only part of the story."
     },
     {
      "q": "poor",
      "t": "Type 1 failure: increase the oxygen",
      "fb": "His problem is ventilation, not oxygen transfer. More oxygen alone will mask it."
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "What treats the cause?",
    "opts": [
     {
      "q": "best",
      "t": "Small titrated doses of naloxone as per your hospital protocol, with the PCA stopped, then reassess breathing",
      "fb": "Reverse enough to restore breathing, not enough to cause severe pain and agitation. Doses per your protocol.",
      "vit": {
       "rr": 14,
       "spo2": 95
      }
     },
     {
      "q": "poor",
      "t": "Wait for the opioid to wear off with oxygen on",
      "fb": "Risky: his CO2 is climbing. Reverse and watch."
     },
     {
      "q": "harm",
      "t": "Large bolus of naloxone to wake him fully",
      "fb": "Can cause severe pain, agitation and, rarely, pulmonary oedema. Titrate.",
      "vit": {
       "hr": 130,
       "sbp": 170
      }
     }
    ]
   },
   {
    "tag": "call",
    "scene": "He wakes but the naloxone wears off in an hour. Plan?",
    "opts": [
     {
      "q": "best",
      "t": "Monitor closely, repeat the gas, review the analgesia plan with the acute pain team, and keep a naloxone plan ready",
      "fb": "The opioid outlasts the antidote. Observe and change the pain plan."
     },
     {
      "q": "poor",
      "t": "Restart the PCA at the same settings",
      "fb": "It will happen again."
     }
    ]
   }
  ],
  "ends": {
   "hi": "Calm, quick and correct: you treated breathing first and reversed the cause carefully.",
   "mid": "He recovered, but a step added risk. Review the gas step.",
   "lo": "Review steps 1, 3 and 4 of the Study Kit."
  }
 },
 {
  "id": "c2",
  "title": "Wheeze that is not asthma",
  "where": "Medical ward",
  "time": "01:30",
  "blurb": "A wheezy, wet patient. Tests cardiac wheeze and CPAP.",
  "intro": "Nurse call: 79-year-old woman, admitted with a UTI and given 2 litres of fluid overnight. Now breathless and wheezy.",
  "vit": {
   "hr": 118,
   "sbp": 168,
   "dbp": 94,
   "spo2": 86,
   "rr": 34
  },
  "facts": [
   "79F; known heart failure",
   "Cannot lie flat, pink frothy sputum",
   "Wheeze and bilateral crackles to the mid-zones",
   "JVP raised; ankles swollen"
  ],
  "decisions": [
   {
    "tag": "look",
    "scene": "She is sitting upright, drowning in her own secretions. First moves?",
    "opts": [
     {
      "q": "best",
      "t": "Call for help, sit her up, high-flow oxygen to bring the SpO2 up, monitor, IV access, ECG",
      "fb": "Treat the hypoxia now and prepare for her heart failure.",
      "vit": {
       "spo2": 91
      }
     },
     {
      "q": "poor",
      "t": "Lay her flat for an ECG",
      "fb": "She cannot tolerate lying flat and will worsen.",
      "vit": {
       "spo2": 80
      }
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "What is your working diagnosis?",
    "opts": [
     {
      "q": "best",
      "t": "Acute pulmonary oedema from fluid overload (cardiac wheeze)",
      "fb": "The wet chest, raised JVP and fluids fit. Wheeze is not always asthma."
     },
     {
      "q": "poor",
      "t": "Asthma: repeated salbutamol",
      "fb": "Wheeze from oedema does not respond to salbutamol alone. Treat the cause."
     }
    ]
   },
   {
    "tag": "o2",
    "scene": "She stays at 88% with a RR of 34 on a non-rebreather. Next step?",
    "opts": [
     {
      "q": "best",
      "t": "CPAP or NIV, with senior and ICU review, and IV diuretic and treatment of the cause as per your acute heart failure protocol",
      "fb": "CPAP improves oxygenation and work of breathing in cardiogenic pulmonary oedema.",
      "vit": {
       "spo2": 95,
       "rr": 26
      }
     },
     {
      "q": "poor",
      "t": "Increase to a simple mask and keep watching",
      "fb": "She needs more support, not a weaker device."
     },
     {
      "q": "harm",
      "t": "Give morphine to ease the breathlessness",
      "fb": "Not routinely recommended and can depress breathing.",
      "vit": {
       "spo2": 80,
       "rr": 30
      }
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "Which fluid decision is right from now on?",
    "opts": [
     {
      "q": "best",
      "t": "Stop the maintenance fluids and review her balance chart",
      "fb": "The fluids drove this. Stop and reassess."
     },
     {
      "q": "poor",
      "t": "Continue the same fluids and add a diuretic on top",
      "fb": "Counter-productive."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You recognised cardiac wheeze and supported her with CPAP.",
   "mid": "She improved, but a step was missed.",
   "lo": "Review steps 2 and 4 of the Study Kit."
  }
 },
 {
  "id": "c3",
  "title": "Hypoxic with a clear chest",
  "where": "Orthopaedic ward",
  "time": "04:40",
  "blurb": "Sudden low saturation on day 3 after surgery. Tests thinking beyond the lungs.",
  "intro": "Nurse call: 58-year-old woman, day 3 after a knee replacement. Suddenly short of breath. SpO2 87%.",
  "vit": {
   "hr": 122,
   "sbp": 100,
   "dbp": 64,
   "spo2": 87,
   "rr": 30
  },
  "facts": [
   "58F; total knee replacement 3 days ago",
   "Left calf swollen and tender",
   "Chest clear, no wheeze, no crackles",
   "No fever"
  ],
  "decisions": [
   {
    "tag": "look",
    "scene": "What do you do first?",
    "opts": [
     {
      "q": "best",
      "t": "Call for help, oxygen to the target range, monitor, IV access, ECG and an arterial gas",
      "fb": "Support first, then find the cause.",
      "vit": {
       "spo2": 92
      }
     },
     {
      "q": "poor",
      "t": "Treat anxiety with a sedative",
      "fb": "Low saturation and tachycardia are not anxiety.",
      "vit": {
       "spo2": 82
      }
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "Chest clear, calf swollen, recent surgery. What do you suspect?",
    "opts": [
     {
      "q": "best",
      "t": "Pulmonary embolism",
      "fb": "Sudden hypoxia with a clear chest after surgery with a swollen calf is PE until proven otherwise."
     },
     {
      "q": "poor",
      "t": "Pneumonia: start antibiotics and wait",
      "fb": "No fever, no focal signs."
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "What is the next step?",
    "opts": [
     {
      "q": "best",
      "t": "Discuss urgently with your senior: risk assessment, imaging as per protocol and anticoagulation unless contraindicated",
      "fb": "She is unwell with a high pre-test probability. Do not wait for imaging if the senior advises starting anticoagulation."
     },
     {
      "q": "poor",
      "t": "Discharge planning with a review tomorrow",
      "fb": "She is unstable."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You looked past the lungs and treated her in the right order.",
   "mid": "She was treated, but a step was slow.",
   "lo": "Review steps 1 and 2 of the Study Kit."
  }
 },
 {
  "id": "c20261115a",
  "from": "c2",
  "title": "Breathless during the second unit",
  "where": "General medical ward",
  "time": "23:40",
  "blurb": "An older woman with heart failure gets wheezy and hypoxic during a blood transfusion. Tests transfusion overload and the fluid trap.",
  "intro": "Nurse call: 81-year-old woman, admitted after a fall with a haemoglobin of 68. Halfway through her second unit of red cells, now breathless and wheezy. \"Should I give her some Ventolin?\"",
  "vit": {
   "hr": 112,
   "sbp": 182,
   "dbp": 96,
   "spo2": 87,
   "rr": 32
  },
  "facts": [
   "81F; heart failure and chronic kidney disease",
   "Second unit of red cells started 50 minutes ago; first unit finished at 21:00",
   "Wheeze and crackles at both bases; JVP raised",
   "Temperature 37.2; no rash, no lip swelling"
  ],
  "decisions": [
   {
    "tag": "look",
    "scene": "She is sitting forward, gasping, with the blood still running. First moves?",
    "opts": [
     {
      "q": "best",
      "t": "Stop the transfusion now and keep the IV line open, call for help, sit her up, give oxygen, monitor, and check her identity against the bag",
      "fb": "Lifeblood: stop the transfusion immediately in any suspected reaction, then assess and support.",
      "vit": {
       "spo2": 89
      }
     },
     {
      "q": "poor",
      "t": "Slow the transfusion down and give salbutamol",
      "fb": "Slowing still adds volume, and salbutamol does not treat the cause."
     },
     {
      "q": "harm",
      "t": "Run the rest of the unit in quickly so she gets her blood, then assess",
      "fb": "More volume into an overloaded circulation.",
      "vit": {
       "spo2": 82,
       "rr": 36
      }
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "High BP, raised JVP, crackles and wheeze during a transfusion. What is the working diagnosis?",
    "opts": [
     {
      "q": "best",
      "t": "Transfusion-associated circulatory overload (TACO): pulmonary oedema from the volume",
      "fb": "Lifeblood: TACO is pulmonary oedema during or up to 12 hours after transfusion. High BP is a constant feature. Older age, heart failure and kidney disease are risk factors."
     },
     {
      "q": "poor",
      "t": "TRALI (transfusion lung injury)",
      "fb": "It can look similar and can coexist, but high BP is infrequent in TRALI and constant in TACO (Lifeblood). Her raised JVP and heart failure fit overload."
     },
     {
      "q": "poor",
      "t": "Asthma or COPD: nebulised salbutamol",
      "fb": "Wheeze is not always the airways. A wet chest with a high JVP is cardiac wheeze."
     }
    ]
   },
   {
    "tag": "o2",
    "scene": "On a non-rebreather she stays at 88% with a RR of 32. Next step?",
    "opts": [
     {
      "q": "best",
      "t": "CPAP or NIV with senior and ICU review, plus IV diuretic and heart failure treatment as per your protocol",
      "fb": "Lifeblood: sit up, oxygen, diuretics and other heart failure therapy; ventilation and ICU in serious cases.",
      "vit": {
       "spo2": 95,
       "rr": 24
      }
     },
     {
      "q": "poor",
      "t": "Keep the non-rebreather on and recheck in an hour",
      "fb": "She is failing on maximal mask oxygen. She needs pressure support now."
     },
     {
      "q": "harm",
      "t": "Lie her flat for a portable chest X-ray first",
      "fb": "She cannot tolerate lying flat and will worsen.",
      "vit": {
       "spo2": 80
      }
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "An hour later she is better. The team still wants her haemoglobin higher. What do you do about the rest of the blood?",
    "opts": [
     {
      "q": "best",
      "t": "Do not restart that unit. Report the reaction to the blood bank as per protocol, and discuss with your senior whether more blood is needed; if so, give it slowly, one unit at a time, with a diuretic considered and close observations",
      "fb": "Lifeblood: in patients at risk, transfuse slowly and consider a diuretic. The volume caused this, so the volume is what you change."
     },
     {
      "q": "poor",
      "t": "Restart the same unit at the old rate and give furosemide on top",
      "fb": "The same trap as running fluids with a diuretic on top: you keep adding the cause and chase it with a drug. Stop or slow the cause first."
     },
     {
      "q": "poor",
      "t": "Restart it and just watch closely",
      "fb": "Watching does not stop the overload. Change the rate and the plan."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You recognised TACO, stopped the cause and supported her breathing.",
   "mid": "She improved, but a step kept the cause going.",
   "lo": "Review steps 2 and 4 of the Study Kit."
  }
 },
 {
  "id": "c20261117c",
  "from": "c2",
  "title": "Wheezy on the renal ward",
  "where": "Renal ward",
  "time": "04:10",
  "blurb": "A man with kidney disease and heart failure, on IV fluids for a day and a half, now wheezy. The salbutamol did nothing. Tests cardiac wheeze, CPAP, stopping the fluids, and when the kidney cannot help.",
  "intro": "Nurse call: 72-year-old man with chronic kidney disease and heart failure, admitted with an AKI after two days of vomiting. On 0.9% saline 125 mL an hour since yesterday afternoon; the vomiting stopped yesterday. Now breathless and wheezy. 'I gave him a salbutamol neb, it didn't help.'",
  "vit": {
   "hr": 112,
   "sbp": 176,
   "dbp": 96,
   "spo2": 87,
   "rr": 32
  },
  "facts": [
   "72M; CKD and heart failure (reduced EF)",
   "IV saline for 36 hours; vomiting stopped yesterday",
   "Wheeze and crackles to the mid-zones; cannot lie flat",
   "JVP raised, sacral oedema; weight up 3 kg since admission",
   "Urine output 20 mL an hour for the last 4 hours"
  ],
  "decisions": [
   {
    "tag": "look",
    "scene": "He is sitting bolt upright and gasping. First moves?",
    "opts": [
     {
      "q": "best",
      "t": "Call for help, sit him up, oxygen to bring the SpO2 up, monitoring, IV access, ECG",
      "fb": "Treat the hypoxia now and get help while you work out the cause.",
      "vit": {
       "spo2": 90
      }
     },
     {
      "q": "poor",
      "t": "Another salbutamol neb and recheck in 30 minutes",
      "fb": "The first one did nothing. Thirty minutes is too long to wait at SpO2 87%.",
      "vit": {
       "spo2": 84,
       "rr": 36
      }
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "What is your working diagnosis?",
    "opts": [
     {
      "q": "best",
      "t": "Acute pulmonary oedema from fluid overload, in a man whose kidneys and heart cannot clear it (cardiac wheeze)",
      "fb": "Fluids, weight gain, raised JVP, crackles and a failed salbutamol neb all point here. Wheeze is not always asthma."
     },
     {
      "q": "poor",
      "t": "A COPD or asthma flare: nebulisers and steroids",
      "fb": "He has no COPD or asthma, and the bronchodilator did nothing. Treat the cause."
     },
     {
      "q": "poor",
      "t": "Pneumonia: start antibiotics",
      "fb": "No fever or focal signs, and the fluid story explains everything."
     }
    ]
   },
   {
    "tag": "o2",
    "scene": "On a non-rebreather he stays at 88% with a RR of 32. Next step?",
    "opts": [
     {
      "q": "best",
      "t": "CPAP or NIV with your senior and ICU outreach, and IV furosemide as per your acute heart failure protocol (his CKD may need a bigger dose)",
      "fb": "CPAP improves oxygenation and work of breathing in cardiogenic pulmonary oedema.",
      "vit": {
       "spo2": 94,
       "rr": 24
      }
     },
     {
      "q": "poor",
      "t": "Change to nasal prongs and keep watching",
      "fb": "He needs more support, not a weaker device.",
      "vit": {
       "spo2": 84
      }
     },
     {
      "q": "harm",
      "t": "Morphine to ease his breathlessness",
      "fb": "Not routinely recommended in pulmonary oedema, and it can depress his breathing.",
      "vit": {
       "spo2": 80,
       "rr": 28
      }
     }
    ]
   },
   {
    "tag": "cause",
    "scene": "The day team charted the saline for his AKI. What do you do with it now?",
    "opts": [
     {
      "q": "best",
      "t": "Stop the IV fluids, chart a strict fluid balance and daily weights, and hand over that the AKI is no longer from dehydration",
      "fb": "The fluid drove this. His vomiting stopped a day ago: he is now overloaded, not dry."
     },
     {
      "q": "poor",
      "t": "Keep the saline running for the kidneys and add furosemide on top",
      "fb": "You would be pouring in what you are trying to remove. Stop the cause."
     },
     {
      "q": "ok",
      "t": "Halve the rate of the saline",
      "fb": "Better, but he is overloaded: he needs none."
     }
    ]
   },
   {
    "tag": "call",
    "scene": "Two hours on CPAP and furosemide: 60 mL of urine, still needing CPAP. What next?",
    "opts": [
     {
      "q": "best",
      "t": "Call your senior and the renal registrar now: fluid overload that does not respond to diuretics in kidney failure may need urgent dialysis. Check his treatment limits",
      "fb": "When the kidneys cannot pass the fluid, dialysis can remove it. This is a renal and senior decision, made early."
     },
     {
      "q": "poor",
      "t": "Repeat the furosemide in the morning and keep the CPAP on overnight",
      "fb": "He is not responding and still on CPAP. Waiting until morning risks a tired, worse patient at 6 am."
     }
    ]
   }
  ],
  "ends": {
   "hi": "You saw past the wheeze, stopped the fluids and called renal early.",
   "mid": "He improved, but a step was missed.",
   "lo": "Review steps 2, 4 and 5 of the Study Kit."
  }
 }
];
