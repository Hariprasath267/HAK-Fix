export type ServiceCategory =
  | 'electrical'
  | 'plumbing'
  | 'ac_repair'
  | 'cleaning'
  | 'carpentry'
  | 'appliance'
  | 'painting'
  | 'pest_control';

export interface AIServiceDiagnosis {
  query: string;
  matchedCategory: ServiceCategory;
  categoryTitle: string;
  recommendedService: string;
  urgency: 'high' | 'medium' | 'standard';
  urgencyText: string;
  estimatedCostRange: {
    min: number;
    max: number;
  };
  confidence: number;
  clarifyingQuestions: string[];
  preVisitTips: string[];
  explanation: string;
}

interface DiagnosticPattern {
  category: ServiceCategory;
  categoryTitle: string;
  recommendedService: string;
  keywords: string[];
  urgencyKeywords: string[];
  baseCost: [number, number];
  clarifyingQuestions: string[];
  preVisitTips: string[];
  defaultExplanation: string;
}

const KNOWLEDGE_BASE: DiagnosticPattern[] = [
  {
    category: 'plumbing',
    categoryTitle: 'Plumbing Services',
    recommendedService: 'Tap, Pipe & Drainage Repair',
    keywords: [
      'tap', 'leak', 'leaking', 'pipe', 'water', 'basin', 'sink', 'drain', 'clog',
      'blockage', 'flush', 'toilet', 'shower', 'geyser leak', 'overflow', 'plumber',
      'drip', 'faucet', 'motor', 'sump', 'tank'
    ],
    urgencyKeywords: ['burst', 'flooding', 'continuous leak', 'overflowing', 'ceiling drip', 'urgent'],
    baseCost: [299, 699],
    clarifyingQuestions: [
      'Is the water flowing continuously or only when the valve is opened?',
      'Have you closed the main stopcock valve to prevent water damage?',
      'Is the pipe concealed inside the wall or exposed under the sink?'
    ],
    preVisitTips: [
      'Locate and turn off the sub-meter or main water valve if leaking heavily.',
      'Clear bottles, toiletries, or items from under the sink or workspace.',
      'Keep a bucket or dry mop ready to catch dripping residue.'
    ],
    defaultExplanation: 'Diagnosed as a plumbing fixture or pipe joint failure. Our certified plumber will carry diagnostic pressure tools, Teflon seals, and replacement washers.'
  },
  {
    category: 'electrical',
    categoryTitle: 'Electrical Services',
    recommendedService: 'Switchboard, Wiring & Circuit Diagnostics',
    keywords: [
      'spark', 'shock', 'tripping', 'mcb', 'switch', 'socket', 'fuse', 'power cut',
      'short circuit', 'wire', 'wiring', 'fan', 'light', 'chandelier', 'inverter',
      'switchboard', 'voltage', 'current', 'electrician', 'smell', 'burning wire'
    ],
    urgencyKeywords: ['spark', 'burning', 'shock', 'smoke', 'mcb tripping', 'fire hazard'],
    baseCost: [249, 799],
    clarifyingQuestions: [
      'Did you notice any burnt plastic smell or blackened marks near the socket?',
      'Does the circuit breaker trip immediately when a specific appliance is plugged in?',
      'Are other rooms in your home experiencing the same power fluctuation?'
    ],
    preVisitTips: [
      'SAFETY FIRST: Never touch sparking sockets or damp switches with bare hands.',
      'Trip the specific MCB lever down from the distribution board.',
      'Unplug sensitive electronic devices from adjacent outlets.'
    ],
    defaultExplanation: 'Detected an electrical circuit or load defect. Qualified electricians carry insulated tools, digital multimeters, and standard Anchor/Legrand modular switches.'
  },
  {
    category: 'ac_repair',
    categoryTitle: 'AC Repair & Servicing',
    recommendedService: 'AC Cooling, Gas Check & Deep Jet Clean',
    keywords: [
      'ac', 'air conditioner', 'cooling', 'warm air', 'hot air', 'gas leak', 'compressor',
      'noise', 'water dripping', 'remote', 'filter', 'inverter ac', 'split ac', 'window ac',
      'ice', 'coil'
    ],
    urgencyKeywords: ['water pouring', 'gas leak', 'burning smell', 'high heat', 'not turning on'],
    baseCost: [499, 1499],
    clarifyingQuestions: [
      'Is the outdoor unit compressor fan running when AC is switched on?',
      'When was the last complete filter cleaning or gas refill performed?',
      'Do you see ice forming along the indoor cooling copper tubes?'
    ],
    preVisitTips: [
      'Switch off the AC stabilizer or dedicated high-amp power breaker.',
      'Ensure clear ladder access beneath the indoor wall unit.',
      'Keep your warranty card or purchase bill handy if the unit is recent.'
    ],
    defaultExplanation: 'Identified cooling efficiency loss or blocked cooling coils. AC specialists use high-pressure jet wash pumps and manifold gauges for freon gas testing.'
  },
  {
    category: 'cleaning',
    categoryTitle: 'Home Cleaning',
    recommendedService: 'Deep Home, Kitchen & Bathroom Cleaning',
    keywords: [
      'clean', 'cleaning', 'dust', 'deep clean', 'bathroom', 'kitchen', 'balcony',
      'sofa', 'carpet', 'stain', 'mop', 'sanitize', 'disinfect', 'floor scrub', 'tiles'
    ],
    urgencyKeywords: ['party today', 'guest arriving', 'emergency clean', 'flooded house'],
    baseCost: [599, 2499],
    clarifyingQuestions: [
      'How many bedrooms/bathrooms require deep scrubbing?',
      'Do you require fabric vacuum shampooing for sofas or mattresses?',
      'Is electricity and continuous tap water available on the property?'
    ],
    preVisitTips: [
      'Store valuable personal belongings, jewelry, and documents safely in cupboards.',
      'Clear loose kitchen utensils from the kitchen granite slab.',
      'Notify the cleaners in advance if you have indoor pets.'
    ],
    defaultExplanation: 'Matched with deep hygiene cleaning. Our verified team arrives with single-disc floor scrubbers, industrial vacuum cleaners, and eco-friendly disinfectants.'
  },
  {
    category: 'carpentry',
    categoryTitle: 'Carpentry & Furniture Repair',
    recommendedService: 'Door, Lock, Hinge & Furniture Restoration',
    keywords: [
      'door', 'lock', 'hinge', 'wood', 'table', 'chair', 'cupboard', 'wardrobe',
      'drawer', 'bed', 'cabinet', 'latch', 'carpenter', 'broken leg', 'sliding door'
    ],
    urgencyKeywords: ['jammed door', 'lock broken', 'locked out', 'falling cabinet'],
    baseCost: [349, 999],
    clarifyingQuestions: [
      'Is the door jamming against the floor or is the latch misaligned with the frame?',
      'Is the furniture made of solid teak wood, engineered plywood, or particle board?',
      'Do you already have a replacement lock or handle set?'
    ],
    preVisitTips: [
      'Take a quick photo of the defective hinge or latch for precision sizing.',
      'Keep the work area well-lit with clear floor space.',
      'Check if the frame has water seepage or termite damage.'
    ],
    defaultExplanation: 'Assessed as a wood fixture or hardware mechanism issue. Experienced carpenters arrive equipped with planers, drill sets, and high-tensile hardware.'
  },
  {
    category: 'appliance',
    categoryTitle: 'Appliance Repair',
    recommendedService: 'Refrigerator, Washing Machine & Microwave Repair',
    keywords: [
      'fridge', 'refrigerator', 'washing machine', 'microwave', 'oven', 'geyser', 'water heater',
      'chimney', 'dishwasher', 'drum', 'spinning', 'heating', 'not cooling', 'appliance'
    ],
    urgencyKeywords: ['food spoiling', 'sparking', 'burning smell', 'water flooding'],
    baseCost: [399, 1199],
    clarifyingQuestions: [
      'What brand and model is the appliance (e.g., Samsung, LG, IFB)?',
      'Does the digital display show any error code (e.g., E1, dE, 4E)?',
      'Is the motor humming or is there complete silence upon powering on?'
    ],
    preVisitTips: [
      'Note down the model number from the rear or door sticker.',
      'Unplug the appliance power cord if strange buzzing or heat is detected.',
      'Clear wet clothes or food items from inside the unit.'
    ],
    defaultExplanation: 'Diagnosed as a home appliance component malfunction. Certified technicians carry genuine brand-compatible relays, thermostats, and sensors.'
  },
  {
    category: 'painting',
    categoryTitle: 'Painting Services',
    recommendedService: 'Wall Touchup, Waterproofing & Room Painting',
    keywords: [
      'paint', 'painting', 'wall', 'peeling', 'damp', 'seepage', 'texture', 'color',
      'whitewash', 'primer', 'ceiling stain', 'painter', 'waterproof'
    ],
    urgencyKeywords: ['before event', 'heavy peeling', 'mould'],
    baseCost: [999, 4999],
    clarifyingQuestions: [
      'Is the wall exhibiting dampness or bubbling plaster from moisture seepage?',
      'Are you looking for single-wall touchup or full interior room repainting?',
      'Do you have a specific color code or brand preference (e.g., Asian Paints, Berger)?'
    ],
    preVisitTips: [
      'Identify whether the source of dampness is internal or external rainwater.',
      'Move small decorative items away from the walls.',
      'Take daylight photos of the wall to assist color shade matching.'
    ],
    defaultExplanation: 'Identified surface aesthetic or moisture seepage challenge. Professional painters inspect with moisture meters and use dustless sanding machines.'
  },
  {
    category: 'pest_control',
    categoryTitle: 'Pest Control',
    recommendedService: 'Termite, Bedbug & Cockroach Eradication',
    keywords: [
      'pest', 'cockroach', 'termite', 'bedbug', 'bed bug', 'rat', 'rodent', 'ant',
      'mosquito', 'infestation', 'insects', 'bugs', 'pest control'
    ],
    urgencyKeywords: ['infestation', 'biting', 'all over kitchen', 'severe'],
    baseCost: [699, 1899],
    clarifyingQuestions: [
      'Are you seeing pests primarily in the kitchen, wooden furniture, or mattress seams?',
      'Are any children, pregnant individuals, or pets present in the residence?',
      'Has any over-the-counter spray or chalk been applied recently?'
    ],
    preVisitTips: [
      'Cover all open food, cooking oil, and spice containers in air-tight vessels.',
      'Keep pets and infants away during the odorless gel and spray application.',
      'Plan for 2 hours of post-treatment ventilation.'
    ],
    defaultExplanation: 'Targeted pest elimination program. Government-approved, odorless formulations with 90-day re-treatment warranty guarantee.'
  }
];

export function diagnoseProblem(rawText: string): AIServiceDiagnosis {
  const query = (rawText || '').trim().toLowerCase();
  if (!query) {
    return {
      query: '',
      matchedCategory: 'plumbing',
      categoryTitle: 'Plumbing Services',
      recommendedService: 'General Inspection & Fix',
      urgency: 'standard',
      urgencyText: 'Standard Scheduled Service',
      estimatedCostRange: { min: 299, max: 699 },
      confidence: 50,
      clarifyingQuestions: [
        'Could you describe which appliance or room needs attention?',
        'When did you first notice this issue?'
      ],
      preVisitTips: ['Inspect the area and ensure easy access for our technician.'],
      explanation: 'Please provide a few words about what is broken so our AI assistant can pin down the ideal expert.'
    };
  }

  let bestMatch: DiagnosticPattern = KNOWLEDGE_BASE[0];
  let maxScore = -1;
  let isHighUrgency = false;

  for (const pattern of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of pattern.keywords) {
      if (query.includes(kw)) {
        score += kw.length > 5 ? 3 : 2;
      }
    }
    for (const uk of pattern.urgencyKeywords) {
      if (query.includes(uk)) {
        score += 4;
        isHighUrgency = true;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = pattern;
    }
  }

  if (maxScore <= 0) {
    return {
      query: rawText,
      matchedCategory: 'plumbing',
      categoryTitle: 'Multi-Skilled Home Repair',
      recommendedService: 'General Handyman & Diagnostics',
      urgency: 'standard',
      urgencyText: 'Standard Inspection',
      estimatedCostRange: { min: 249, max: 599 },
      confidence: 65,
      clarifyingQuestions: [
        'Does the issue involve water, power circuits, or wooden fixtures?',
        'Is any emergency shut-off required right now?'
      ],
      preVisitTips: [
        'Take a short photo or video to show the technician upon arrival.',
        'Clear the space around the problem area.'
      ],
      explanation: 'Our expert technician will perform a physical multi-point inspection to pinpoint the exact root cause and quote transparent parts costs.'
    };
  }

  const urgency = isHighUrgency ? 'high' : 'standard';
  const urgencyText = isHighUrgency ? 'High Urgency • Priority Dispatch' : 'Standard Scheduled Service';

  return {
    query: rawText,
    matchedCategory: bestMatch.category,
    categoryTitle: bestMatch.categoryTitle,
    recommendedService: bestMatch.recommendedService,
    urgency,
    urgencyText,
    estimatedCostRange: {
      min: bestMatch.baseCost[0],
      max: bestMatch.baseCost[1]
    },
    confidence: Math.min(98, 75 + maxScore * 3),
    clarifyingQuestions: bestMatch.clarifyingQuestions,
    preVisitTips: bestMatch.preVisitTips,
    explanation: bestMatch.defaultExplanation
  };
}
