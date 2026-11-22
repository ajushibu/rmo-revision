window.KIT = {
 "title": "Aortic dissection",
 "lede": "Recognise it, sort type A from type B, get the CT, bring the heart rate down before the BP, and call cardiothoracic surgery. Press Next.",
 "flag": "<b>How far to trust this.</b> Written from the recall cards for this topic, which come from the US Point of Care template and standard teaching. Not checked against an Australian guideline here; the Victorian retrieval number is from Adult Retrieval Victoria. Use your hospital protocol for drug doses.",
 "steps": [
  {
   "h": "Recognise it",
   "say": "Think of dissection in any severe chest or back pain, especially with a pulse or BP difference between the arms. Miss it and you may give the anticoagulant that kills.",
   "blocks": [
    {
     "rx": {
      "h": "How it presents: the can't-miss signs",
      "items": [
       "Tearing chest or back pain",
       "Aortic regurgitation murmur",
       "Pulse deficit",
       "Arm BP difference over 20 mmHg"
      ],
      "cls": "stop"
     }
    },
    {
     "rx": {
      "h": "Who gets it",
      "items": [
       "Hypertension (about 70%)",
       "Under 40 → think Marfan, connective tissue disease, bicuspid valve",
       "<b>Also:</b> smoking, family history"
      ]
     }
    }
   ]
  },
  {
   "h": "Type A or type B",
   "say": "One question decides the treatment: does it involve the ascending aorta? Tap the picture to see where each type sits.",
   "blocks": [
    {
     "rx": {
      "h": "Type A vs type B",
      "items": [
       "<b>Type A:</b> involves ascending aorta → urgent surgical repair",
       "<b>Type B:</b> descending only → usually medical; TEVAR if complicated"
      ]
     }
    },
    {
     "embed": {
      "src": "dissection.html?embed=1",
      "title": "Stanford and DeBakey on one straightened aorta",
      "h": 760
     }
    },
    {
     "rx": {
      "h": "Type A: what it can damage",
      "items": [
       "Coronaries → MI",
       "Aortic valve → regurgitation",
       "Carotids → stroke",
       "Tamponade"
      ],
      "cls": "warn"
     }
    },
    {
     "rx": {
      "h": "Complicated type B: branch vessels",
      "items": [
       "Renal → oliguria, failure",
       "Mesenteric (celiac) → gut ischaemia",
       "Spinal → leg weakness, paraplegia",
       "Distal occlusion (Leriche)",
       "All need TEVAR"
      ],
      "cls": "warn"
     }
    }
   ]
  },
  {
   "h": "Tests in the first hour",
   "blocks": [
    {
     "rx": {
      "h": "First-hour work-up",
      "items": [
       "Telemetry",
       "<b>Bloods:</b> FBC, UEC, coags, troponin, D-dimer, group and hold",
       "<b>Tests:</b> ECG, CXR, CT aortogram, echo",
       "Serial BP in both arms; consider an arterial line"
      ]
     }
    },
    {
     "rx": {
      "h": "Which test, and what the others cannot do",
      "items": [
       "<b>Best test:</b> CTA (most sensitive and specific)",
       "<b>D-dimer:</b> high negative predictive value, cannot fully rule it out",
       "<b>CXR:</b> widened mediastinum in about a third",
       "<b>ECG:</b> often normal"
      ]
     }
    }
   ]
  },
  {
   "h": "Treat now",
   "blocks": [
    {
     "rx": {
      "h": "Heart rate and BP: targets and the drug order",
      "items": [
       "<b>Targets:</b> HR under 60, SBP 100-120",
       "<b>First:</b> IV labetalol or esmolol",
       "SBP still over 120 → add nitroprusside or nicardipine",
       "Never a vasodilator without a beta-blocker → reflex tachycardia raises wall stress"
      ],
      "cls": "stop"
     }
    },
    {
     "rx": {
      "h": "If the BP is low",
      "items": [
       "<b>Give:</b> fluids + noradrenaline",
       "<b>Avoid:</b> inotropes",
       "<b>Think:</b> tamponade"
      ],
      "cls": "warn"
     }
    },
    {
     "rx": {
      "h": "Pain",
      "items": [
       "IV morphine",
       "The page gives no dose → use your protocol"
      ]
     }
    },
    {
     "rx": {
      "h": "Who to call",
      "items": [
       "<b>Call:</b> cardiothoracic surgery urgently",
       "Haematology early if on anticoagulation → reversal may be needed",
       "<small>(Victoria: Adult Retrieval Victoria coordinates transfer of critically ill adults and gives phone advice, 1300 36 86 61. Confirm who calls at GV Health.)</small>"
      ]
     }
    }
   ]
  },
  {
   "h": "After, and the long view",
   "blocks": [
    {
     "rx": {
      "h": "Discharge and long-term",
      "items": [
       "Statin, beta-blocker, low-dose aspirin",
       "Stop smoking, control BP, avoid straining"
      ]
     }
    },
    {
     "rx": {
      "h": "Aortic aneurysm: when surgery",
      "items": [
       "<b>Surgery if:</b> over 5.5 cm, or growth over 0.5 cm in 6 months, or over 1 cm in a year",
       "<b>Women:</b> lower threshold (4.5-5 cm, debated)"
      ]
     }
    },
    {
     "rx": {
      "h": "How deadly it is",
      "items": [
       "<b>Type A:</b> surgery 26% mortality vs over 50% medical (IRAD 2000)",
       "<b>Type B:</b> 9% in hospital, 20% at 5 years"
      ]
     }
    }
   ]
  }
 ],
 "opts": [
  [
   "a",
   "Type A: cardiothoracic surgery now"
  ],
  [
   "b",
   "Type B: medical, beta-blocker first"
  ],
  [
   "tevar",
   "Complicated type B: TEVAR"
  ],
  [
   "low",
   "Low BP: fluids, noradrenaline, look for tamponade"
  ]
 ],
 "items": [
  {
   "t": "Tearing chest pain, new diastolic murmur, CT shows a flap in the ascending aorta.",
   "a": "a",
   "why": "Ascending aorta involved means type A: urgent surgical repair."
  },
  {
   "t": "Back pain, flap starts beyond the left subclavian artery, BP 170/95, no organ problems.",
   "a": "b",
   "why": "Descending only and uncomplicated: type B, medical. Beta-blocker first to HR under 60, then SBP 100-120."
  },
  {
   "t": "Type B dissection, urine output falling and creatinine rising.",
   "a": "tevar",
   "why": "Renal branch involvement makes it complicated: TEVAR."
  },
  {
   "t": "Type B dissection, new leg weakness.",
   "a": "tevar",
   "why": "Spinal artery involvement: complicated type B, needs TEVAR."
  },
  {
   "t": "Known dissection, BP 78/40, raised JVP.",
   "a": "low",
   "why": "Low BP: fluids and noradrenaline, avoid inotropes, and think tamponade."
  },
  {
   "t": "Dissection with ST elevation in the inferior leads.",
   "a": "a",
   "why": "The flap has reached the coronary ostium: type A. Do not give antiplatelets or anticoagulants; call cardiothoracic surgery."
  }
 ]
};
