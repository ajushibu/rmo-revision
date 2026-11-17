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
 },
{
 "id": "c20261117g",
 fromCard: "px6",
 "title": "Breathless at the bus stop",
 "where": "Emergency department",
 "time": "19:30",
 "blurb": "A first primary pneumothorax that is large and symptomatic but stable. Tests needle aspiration: the cannula, when to stop, and what follows.",
 "intro": "Triage: 24-year-old woman, sudden left chest pain and breathlessness while running for a bus. Chest X-ray shows a large left pneumothorax.",
 "vit": {
  "hr": 104,
  "sbp": 122,
  "dbp": 76,
  "spo2": 95,
  "rr": 24
 },
 "facts": [
  "24F, smoker, no lung disease",
  "Sudden left pleuritic pain, breathless on walking",
  "Large left pneumothorax on X-ray, trachea central",
  "BP normal, alert, no distress at rest"
 ],
 "decisions": [
  {
   "tag": "type",
   "scene": "How do you classify this?",
   "opts": [
    {
     "q": "best",
     "t": "Primary spontaneous pneumothorax: young, no lung disease, and stable (no tension)",
     "fb": "Primary means no known lung disease. Her BP and trachea say no tension."
    },
    {
     "q": "poor",
     "t": "Tension pneumothorax: decompress now",
     "fb": "She has a normal BP and a central trachea. Not tension."
    },
    {
     "q": "ok",
     "t": "Secondary, because she smokes",
     "fb": "Smoking raises the risk, but without lung disease it is still primary."
    }
   ]
  },
  {
   "tag": "stable",
   "scene": "She is breathless walking to the toilet. What is the plan?",
   "opts": [
    {
     "q": "best",
     "t": "Needle aspiration under local anaesthetic with a 16 to 18 gauge cannula, as a first step for a symptomatic primary pneumothorax",
     "fb": "BTS 2023 (summarised in a 2024 review): aspiration is a first-line option for a symptomatic primary pneumothorax. Older BTS 2010 guidance said 14 to 16 gauge."
    },
    {
     "q": "ok",
     "t": "Observe her without a procedure",
     "fb": "An option for minimal symptoms. She is breathless on walking, so offer aspiration."
    },
    {
     "q": "poor",
     "t": "A large-bore surgical drain straight away",
     "fb": "Not needed first for a stable primary pneumothorax."
    }
   ]
  },
  {
   "tag": "stable",
   "scene": "You are aspirating with a 50 mL syringe. When do you stop?",
   "opts": [
    {
     "q": "best",
     "t": "When you feel resistance, she coughs a lot, or you reach 2.5 L; more than 2.5 L means an ongoing leak, so she usually needs a drain",
     "fb": "A large volume means air is still leaking in. Stop and plan a small-bore drain."
    },
    {
     "q": "poor",
     "t": "Keep going until no more air comes, however long it takes",
     "fb": "Over 2.5 L means a leak: stop."
    },
    {
     "q": "poor",
     "t": "Stop after 500 mL to be safe",
     "fb": "Too little to re-expand a large pneumothorax."
    }
   ]
  },
  {
   "tag": "after",
   "scene": "The lung looks up on the repeat X-ray and she feels well. What next?",
   "opts": [
    {
     "q": "best",
     "t": "Observe for a few hours per your hospital protocol, then home if she stays well, with advice to return if breathless, stop smoking, no flying until a doctor confirms it has resolved, and a respiratory follow-up",
     "fb": "Success means a repeat X-ray showing the lung up and her symptoms gone. Diving needs specialist advice; BTS advises surgery for people who must dive."
    },
    {
     "q": "ok",
     "t": "Admit her overnight anyway",
     "fb": "Not wrong, but a well patient with a successful aspiration can usually go after observation."
    },
    {
     "q": "poor",
     "t": "Home now with no follow-up",
     "fb": "She needs safety-netting and follow-up."
    }
   ]
  }
 ],
 "ends": {
  "hi": "Right patient, right cannula, stopped at the right time, and safe advice.",
  "mid": "She did well, but one step needs review.",
  "lo": "Review step 3 of the Study Kit."
 }
},
{
 "id": "c20261117h",
 fromCard: "px13",
 "title": "Still bubbling on day 5",
 "where": "Respiratory ward",
 "time": "10:00",
 "blurb": "A man with COPD and a secondary pneumothorax whose drain keeps bubbling. Tests when a drain comes out, what not to do, and when to call surgeons.",
 "intro": "Ward round: 67-year-old man with COPD, day 5 with a small-bore chest drain for a secondary pneumothorax. The nurse says it is still bubbling and he asks when it can come out.",
 "vit": {
  "hr": 88,
  "sbp": 134,
  "dbp": 78,
  "spo2": 92,
  "rr": 18
 },
 "facts": [
  "67M, COPD, ex-smoker",
  "Right secondary pneumothorax, drain since day 1",
  "Drain swings and bubbles when he coughs, on water seal",
  "X-ray today: lung nearly up, small apical rim"
 ],
 "decisions": [
  {
   "tag": "drain",
   "scene": "The drain still bubbles. What does that mean, and what do you do with it today?",
   "opts": [
    {
     "q": "best",
     "t": "Air is still leaking from the lung. Keep it on water seal below the chest, and do not clamp a bubbling drain",
     "fb": "Bubbling means an ongoing air leak. Clamping it risks a tension pneumothorax."
    },
    {
     "q": "harm",
     "t": "Clamp it to see if the lung stays up",
     "fb": "Never clamp a bubbling drain."
    },
    {
     "q": "poor",
     "t": "Remove it, since the lung is nearly up",
     "fb": "Not while it is still bubbling: the leak will collapse the lung again."
    }
   ]
  },
  {
   "tag": "drain",
   "scene": "It is day 5 with an ongoing leak. Who do you involve?",
   "opts": [
    {
     "q": "best",
     "t": "Discuss with the respiratory consultant and refer to the thoracic surgeons now: an air leak lasting 5 to 7 days is when surgery should be considered (BTS 2023)",
     "fb": "Many COPD patients are not fit for surgery, so the team may consider other options such as a blood patch or an endobronchial valve."
    },
    {
     "q": "ok",
     "t": "Wait another week and see",
     "fb": "Many leaks do settle, but day 5 is the point to involve surgeons."
    },
    {
     "q": "poor",
     "t": "Add high-pressure suction to force the lung up",
     "fb": "Suction has not been shown to help, and is not routine."
    }
   ]
  },
  {
   "tag": "after",
   "scene": "Day 8: no bubbling for 24 hours and the lung is fully up on X-ray. What now?",
   "opts": [
    {
     "q": "best",
     "t": "Remove the drain with the team (some units clamp first per local protocol), then repeat the chest X-ray",
     "fb": "Remove when the lung is up and the leak has stopped. Clamping before removal varies between units."
    },
    {
     "q": "poor",
     "t": "Leave it in for another week to be sure",
     "fb": "A drain left in longer adds infection and pain."
    },
    {
     "q": "poor",
     "t": "Remove it and skip the X-ray",
     "fb": "Check the lung after removal."
    }
   ]
  },
  {
   "tag": "after",
   "scene": "What does he need to know before going home?",
   "opts": [
    {
     "q": "best",
     "t": "Return at once if breathless or in pain; stop smoking; no flying until a doctor confirms it has resolved; respiratory follow-up, since secondary pneumothorax often comes back",
     "fb": "Secondary pneumothoraces recur more often and are more dangerous with poor lung reserve."
    },
    {
     "q": "poor",
     "t": "Nothing special, it is fixed",
     "fb": "He needs safety-netting and follow-up."
    }
   ]
  }
 ],
 "ends": {
  "hi": "You left a bubbling drain alone, involved surgeons on time, and removed it at the right point.",
  "mid": "He did well, but one step needs review.",
  "lo": "Review steps 4 and 5 of the Study Kit."
 }
}
];
