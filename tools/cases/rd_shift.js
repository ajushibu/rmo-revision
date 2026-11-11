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
 }
];
