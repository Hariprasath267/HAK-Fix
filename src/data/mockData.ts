import { Provider, ServiceItem, Booking } from '../types/index.ts';

export const INITIAL_SERVICES: ServiceItem[] = [
  // Plumbing
  {
    id: 'plumb-1',
    name: 'Tap, Sink & Faucet Leak Repair',
    category: 'plumbing',
    description: 'Diagnosis and fix for dripping kitchen/bathroom taps, loose fittings, spindle washers or cartridge replacements.',
    basePrice: 299,
    durationMinutes: 45,
    popular: true
  },
  {
    id: 'plumb-2',
    name: 'Concealed Water Pipe & Joint Repair',
    category: 'plumbing',
    description: 'Repair for hidden wall pipeline seepage, pressure testing, CPVC/PVC pipe joint soldering and wall sealing.',
    basePrice: 599,
    durationMinutes: 90
  },
  {
    id: 'plumb-3',
    name: 'Drainage & Toilet Clog Unblocking',
    category: 'plumbing',
    description: 'High-torque mechanical snake cable unblocking for choked floor drains, kitchen sinks, and toilet flush conduits.',
    basePrice: 449,
    durationMinutes: 60,
    popular: true
  },
  // Electrical
  {
    id: 'elec-1',
    name: 'Switchboard, MCB & Short Circuit Repair',
    category: 'electrical',
    description: 'Fixing sparking switches, tripped main breakers, molten wiring repairs, and new modular switchboard installation.',
    basePrice: 249,
    durationMinutes: 45,
    popular: true
  },
  {
    id: 'elec-2',
    name: 'Ceiling Fan Installation & Regulator Repair',
    category: 'electrical',
    description: 'Complete ceiling fan assembly, downrod balancing, capacitor replacement, and stepless electronic regulator setup.',
    basePrice: 299,
    durationMinutes: 45
  },
  {
    id: 'elec-3',
    name: 'Full Home Electrical Health Inspection',
    category: 'electrical',
    description: 'Multi-point safety audit checking earth leakage (ELCB), earthing resistance, load distribution, and wiring insulation.',
    basePrice: 699,
    durationMinutes: 90
  },
  // AC Repair
  {
    id: 'ac-1',
    name: 'AC Jet Servicing & Cooling Coil Deep Clean',
    category: 'ac_repair',
    description: 'High-pressure water jet clean of indoor cooling coils, blower fan, outdoor condenser fins, and drain tray flush.',
    basePrice: 499,
    durationMinutes: 60,
    popular: true
  },
  {
    id: 'ac-2',
    name: 'AC Gas Refill & Leak Testing',
    category: 'ac_repair',
    description: 'Nitrogen pressure leak detection, copper brazing fix, vacuum pump evacuation, and 100% genuine R32/R410A gas top-up.',
    basePrice: 1499,
    durationMinutes: 90,
    popular: true
  },
  // Cleaning
  {
    id: 'clean-1',
    name: 'Full Home Deep Hygiene Cleaning (2-3 BHK)',
    category: 'cleaning',
    description: 'Complete scrubbing of tiled floors, balcony wash, window track vacuuming, cabinet wiping, and hospital-grade sanitization.',
    basePrice: 1999,
    durationMinutes: 240,
    popular: true
  },
  {
    id: 'clean-2',
    name: 'Bathroom & Kitchen Anti-Scale Intensive Scrub',
    category: 'cleaning',
    description: 'Hard-water stain removal from chrome fixtures, glass partition descaling, floor tile buffing, and kitchen exhaust degreasing.',
    basePrice: 799,
    durationMinutes: 120
  },
  // Carpentry
  {
    id: 'carp-1',
    name: 'Door Lock, Latch & Concealed Hinge Repair',
    category: 'carpentry',
    description: 'Mortise lock replacement, Godrej deadbolt installation, hydraulic door closer adjustment, and soft-close cabinet hinge fitment.',
    basePrice: 349,
    durationMinutes: 60,
    popular: true
  },
  {
    id: 'carp-2',
    name: 'Furniture Assembly & Wood Restoration',
    category: 'carpentry',
    description: 'Assembly of flat-pack furniture (IKEA/Pepperfry/Urban Ladder), wooden bed frame reinforcement, and drawer slider replacement.',
    basePrice: 499,
    durationMinutes: 90
  },
  // Appliance
  {
    id: 'app-1',
    name: 'Washing Machine Drum & Motor Diagnostics',
    category: 'appliance',
    description: 'Resolving spin cycle failure, drain pump blockage, unbalance vibration, water inlet valve error, and belt replacement.',
    basePrice: 399,
    durationMinutes: 60,
    popular: true
  },
  {
    id: 'app-2',
    name: 'Refrigerator Cooling & Defrost Thermostat Fix',
    category: 'appliance',
    description: 'Fixing frost accumulation, compressor relay failure, door magnetic gasket air leaks, and inverter PCB troubleshooting.',
    basePrice: 449,
    durationMinutes: 60
  },
  // Painting
  {
    id: 'paint-1',
    name: 'Interior Wall Touch-up & Water Seepage Sealing',
    category: 'painting',
    description: 'Dampness treatment with waterproof putty primer, crack mesh filling, and two coats of washable luxury emulsion finish.',
    basePrice: 999,
    durationMinutes: 180
  },
  // Pest Control
  {
    id: 'pest-1',
    name: 'Herbal Cockroach & Pest Gel Treatment',
    category: 'pest_control',
    description: '100% odorless Bayer herbal gel micro-dots across kitchen hinges, pantry shelves, drains, and 90-day warranty coverage.',
    basePrice: 699,
    durationMinutes: 45,
    popular: true
  }
];

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'pro-1',
    name: 'Suresh Kumar',
    category: 'electrical',
    categoryName: 'Electrical Services',
    photoUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 142,
    experienceYears: 8,
    startingPrice: 249,
    serviceAreas: ['T. Nagar', 'Anna Nagar', 'Adyar', 'Kodambakkam', 'Mylapore'],
    city: 'Chennai',
    pinCodes: ['600017', '600040', '600020', '600024', '600004'],
    isVerified: true,
    isBackgroundChecked: true,
    phone: '+91 98401 23456',
    email: 'suresh.fix@hakfix.in',
    bio: 'Government licensed Grade-A Wireman with 8+ years specializing in residential load audits, 3-phase balancing, and rapid short-circuit fault rectification.',
    skills: ['MCB Diagnostics', 'Inverter Wiring', 'LED False Ceiling', 'Heavy Load Appliances', 'Earth Pit Check'],
    includedInPrice: [
      'Standard 45-min on-site diagnostic inspection',
      'Basic wire stripping, terminal tightening & fuse testing',
      '30-day post-service workmanship warranty'
    ],
    additionalChargesInfo: 'Replacement switches, wires, conduits, or contactors are charged at standard MRP with tax invoice.',
    availabilityToday: true,
    availableSlots: ['09:00 AM - 11:00 AM', '01:00 PM - 03:00 PM', '04:00 PM - 06:00 PM', '06:00 PM - 08:00 PM'],
    completedJobsCount: 389,
    coordinates: { lat: 13.0418, lng: 80.2341 },
    reviews: [
      {
        id: 'rev-1',
        bookingId: 'HAK-10291',
        customerName: 'Priya Narayanan',
        rating: 5,
        comment: 'Suresh arrived in 25 minutes during an emergency power trip. Quickly isolated the melted bathroom geyser switch. Highly professional!',
        date: '2 days ago'
      },
      {
        id: 'rev-2',
        bookingId: 'HAK-09823',
        customerName: 'Anand Venkatesh',
        rating: 5,
        comment: 'Neat wiring, very courteous, explained the root cause clearly. Fair pricing with original bills provided.',
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'pro-2',
    name: 'Rajesh Selvam',
    category: 'plumbing',
    categoryName: 'Plumbing Services',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 98,
    experienceYears: 6,
    startingPrice: 299,
    serviceAreas: ['Adyar', 'Besant Nagar', 'Thiruvanmiyur', 'Velachery', 'OMR'],
    city: 'Chennai',
    pinCodes: ['600020', '600090', '600041', '600042', '600096'],
    isVerified: true,
    isBackgroundChecked: true,
    phone: '+91 97902 34567',
    email: 'rajesh.selvam@hakfix.in',
    bio: 'Specialist in high-pressure concealed plumbing leaks, Grohe/Kohler luxury fixtures, and motor pressure pump installations.',
    skills: ['Concealed Leak Detection', 'Drain Snake Cleaning', 'Water Tank Ball Valve', 'Mixer Diverter Repair', 'PVC/CPVC Plumbing'],
    includedInPrice: [
      'Comprehensive leak diagnostic inspection',
      'Washer replacements, Teflon tape sealing & joint tightening',
      '45-day warranty against water seepage'
    ],
    additionalChargesInfo: 'New tap fittings, heavy-duty valves, or pipe section extensions billed based on pre-approved catalog rate.',
    availabilityToday: true,
    availableSlots: ['10:00 AM - 12:00 PM', '02:00 PM - 04:00 PM', '05:00 PM - 07:00 PM'],
    completedJobsCount: 274,
    coordinates: { lat: 13.0012, lng: 80.2565 },
    reviews: [
      {
        id: 'rev-3',
        bookingId: 'HAK-11029',
        customerName: 'Kavitha Ramesh',
        rating: 5,
        comment: 'Fixed our stubborn bathroom sink blockage in less than 30 minutes without spilling a drop of water. Clean work!',
        date: '3 days ago'
      }
    ]
  },
  {
    id: 'pro-3',
    name: 'Mohammed Imran',
    category: 'ac_repair',
    categoryName: 'AC Repair & Servicing',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 165,
    experienceYears: 9,
    startingPrice: 499,
    serviceAreas: ['Anna Nagar', 'Kilpauk', 'Shenoy Nagar', 'Mogappair', 'Ambattur'],
    city: 'Chennai',
    pinCodes: ['600040', '600010', '600030', '600037', '600053'],
    isVerified: true,
    isBackgroundChecked: true,
    phone: '+91 94443 87654',
    email: 'imran.ac@hakfix.in',
    bio: 'HVAC certified cooling engineer. Expert in Daikin, Voltas, Hitachi, and LG inverter split units. Uses imported high-pressure jet wash kits.',
    skills: ['Pressure Jet Servicing', 'Freon R32 Gas Top-up', 'Capillary Tube Unblocking', 'PCB Motherboard Repair', 'Compressor Testing'],
    includedInPrice: [
      'Full indoor + outdoor unit foam jet cleaning',
      'Air filter sterilization and blower fan wash',
      'Cooling grill temperature measurement report'
    ],
    additionalChargesInfo: 'Gas charging (if pressure below recommended PSI) or PCB component repairs are quoted before commencement.',
    availabilityToday: true,
    availableSlots: ['09:30 AM - 11:30 AM', '12:00 PM - 02:00 PM', '04:00 PM - 06:00 PM'],
    completedJobsCount: 420,
    coordinates: { lat: 13.085, lng: 80.2101 },
    reviews: [
      {
        id: 'rev-4',
        bookingId: 'HAK-08761',
        customerName: 'Vikram Sundaram',
        rating: 5,
        comment: 'My AC was blowing warm air. Imran detected a tiny copper tube micro-leak, brazed it and recharged gas. Now cooling at 18 degrees effortlessly!',
        date: 'Yesterday'
      }
    ]
  },
  {
    id: 'pro-4',
    name: 'Meenakshi Cleaners (Lead: Meena D.)',
    category: 'cleaning',
    categoryName: 'Home Cleaning',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 114,
    experienceYears: 7,
    startingPrice: 799,
    serviceAreas: ['Velachery', 'Thoraipakkam', 'Sholinganallur', 'Perungudi', 'Madipakkam'],
    city: 'Chennai',
    pinCodes: ['600042', '600097', '600119', '600096', '600091'],
    isVerified: true,
    isBackgroundChecked: true,
    phone: '+91 98840 91823',
    email: 'meena.cleaning@hakfix.in',
    bio: 'Professional team of 3-4 trained cleaners with heavy-duty Taski industrial chemicals, single-disc floor scrubbers, and UV upholstery vacuum.',
    skills: ['Single-Disc Tile Buffing', 'Hard Water Stain Removal', 'Kitchen Degreasing', 'Sofa Fabric Shampooing', 'Balcony Water Jet'],
    includedInPrice: [
      'All commercial machines, microfiber wipers & chemicals included',
      'Bathroom tiles descaling, chrome fixture polish',
      'Floor sanitization with eco-friendly germicide'
    ],
    additionalChargesInfo: 'Deep balcony moss stripping or empty flat terrace wash available at nominal add-on fees.',
    availabilityToday: false,
    availableSlots: ['08:30 AM - 12:30 PM (Tomorrow)', '02:00 PM - 06:00 PM (Tomorrow)'],
    completedJobsCount: 310,
    coordinates: { lat: 12.9815, lng: 80.218 },
    reviews: [
      {
        id: 'rev-5',
        bookingId: 'HAK-11923',
        customerName: 'Deepak Nathan',
        rating: 5,
        comment: 'Transformed our newly rented 3BHK flat. Every bathroom tile and kitchen chimney was scrubbed spotless. Worth every rupee.',
        date: '4 days ago'
      }
    ]
  },
  {
    id: 'pro-5',
    name: 'Murugan Asari',
    category: 'carpentry',
    categoryName: 'Carpentry & Furniture Repair',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 76,
    experienceYears: 12,
    startingPrice: 349,
    serviceAreas: ['Mylapore', 'Royapettah', 'Alwarpet', 'Gopalapuram', 'Mandaveli'],
    city: 'Chennai',
    pinCodes: ['600004', '600014', '600018', '600086', '600028'],
    isVerified: true,
    isBackgroundChecked: true,
    phone: '+91 98412 87612',
    email: 'murugan.carpenter@hakfix.in',
    bio: 'Master craftsman with 12+ years experience. Expert in solid teak wood restorations, modular kitchen soft-close runners, and concealed lock fitting.',
    skills: ['Lock & Latches Fitting', 'Modular Kitchen Hinges', 'Wood Planing & Resizing', 'Plywood Reinforcement', 'Wardrobe Sliding Track'],
    includedInPrice: [
      'Door shaving / height adjustment to prevent floor scraping',
      'Basic screw tightening, hinge alignment and lubrication',
      '30-day alignment guarantee'
    ],
    additionalChargesInfo: 'Hardware components such as Godrej locks, telescopic channels, or handles can be provided or customer supplied.',
    availabilityToday: true,
    availableSlots: ['11:00 AM - 01:00 PM', '03:00 PM - 05:00 PM', '06:00 PM - 08:00 PM'],
    completedJobsCount: 195,
    coordinates: { lat: 13.0336, lng: 80.2678 },
    reviews: [
      {
        id: 'rev-6',
        bookingId: 'HAK-12841',
        customerName: 'Sanjay Krishnan',
        rating: 5,
        comment: 'Fixed our heavy main door that was jamming during the monsoon. Realigned hinges and replaced the deadbolt smoothly.',
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'pro-6',
    name: 'Dinesh Balan',
    category: 'appliance',
    categoryName: 'Appliance Repair',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 88,
    experienceYears: 7,
    startingPrice: 399,
    serviceAreas: ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'BTM Layout'],
    city: 'Bengaluru',
    pinCodes: ['560038', '560034', '560102', '560066', '560068'],
    isVerified: true,
    isBackgroundChecked: true,
    phone: '+91 99002 45678',
    email: 'dinesh.appliance@hakfix.in',
    bio: 'Specialized in front-load / top-load washing machines (IFB, Bosch, Samsung) and frost-free refrigerators.',
    skills: ['Drum Bearing Replacement', 'Drain Motor Repair', 'Sensor Testing', 'Inverter Board Troubleshooting', 'Thermostat Calibration'],
    includedInPrice: [
      'Comprehensive error code & motor circuit diagnosis',
      'Filter cleaning & water pressure check',
      'Detailed repair estimate before any component swap'
    ],
    additionalChargesInfo: 'Spare parts are original OEM components with 90-day manufacturer warranty.',
    availabilityToday: true,
    availableSlots: ['10:00 AM - 12:00 PM', '02:00 PM - 04:00 PM', '05:00 PM - 07:00 PM'],
    completedJobsCount: 220,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    reviews: [
      {
        id: 'rev-7',
        bookingId: 'HAK-13092',
        customerName: 'Rohit Shenoy',
        rating: 5,
        comment: 'Resolved the loud vibration on my Bosch washing machine. Replaced the shock absorbers on the spot. Great service!',
        date: '5 days ago'
      }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-1',
    referenceId: 'HAK-92814',
    customerId: 'cust-demo-1',
    customerName: 'Karthik Subramanian',
    customerPhone: '9840123456',
    customerEmail: 'karthik.sub@gmail.com',
    address: 'Flat 4B, Emerald Heights, 2nd Main Road, T. Nagar',
    city: 'Chennai',
    pinCode: '600017',
    providerId: 'pro-1',
    providerName: 'Suresh Kumar',
    providerPhone: '+91 98401 23456',
    providerPhoto: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
    category: 'electrical',
    serviceId: 'elec-1',
    serviceName: 'Switchboard, MCB & Short Circuit Repair',
    date: '2026-10-15',
    timeSlot: '04:00 PM - 06:00 PM',
    problemDescription: 'Main living room switchboard started sparking when turning on the water heater. Need urgent diagnosis.',
    estimatedPrice: 249,
    taxAmount: 45,
    totalPrice: 294,
    status: 'in_progress',
    createdAt: '2026-10-15T09:30:00.000Z',
    updatedAt: '2026-10-15T15:45:00.000Z'
  },
  {
    id: 'bkg-2',
    referenceId: 'HAK-78401',
    customerId: 'cust-demo-1',
    customerName: 'Karthik Subramanian',
    customerPhone: '9840123456',
    customerEmail: 'karthik.sub@gmail.com',
    address: 'Flat 4B, Emerald Heights, 2nd Main Road, T. Nagar',
    city: 'Chennai',
    pinCode: '600017',
    providerId: 'pro-2',
    providerName: 'Rajesh Selvam',
    providerPhone: '+91 97902 34567',
    providerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    category: 'plumbing',
    serviceId: 'plumb-1',
    serviceName: 'Tap, Sink & Faucet Leak Repair',
    date: '2026-10-16',
    timeSlot: '10:00 AM - 12:00 PM',
    problemDescription: 'Under-sink kitchen flexi-hose has developed a continuous drip, dripping into lower cabinet.',
    estimatedPrice: 299,
    taxAmount: 54,
    totalPrice: 353,
    status: 'accepted',
    createdAt: '2026-10-15T08:15:00.000Z',
    updatedAt: '2026-10-15T08:45:00.000Z'
  },
  {
    id: 'bkg-3',
    referenceId: 'HAK-61029',
    customerId: 'cust-demo-1',
    customerName: 'Karthik Subramanian',
    customerPhone: '9840123456',
    customerEmail: 'karthik.sub@gmail.com',
    address: 'Flat 4B, Emerald Heights, 2nd Main Road, T. Nagar',
    city: 'Chennai',
    pinCode: '600017',
    providerId: 'pro-3',
    providerName: 'Mohammed Imran',
    providerPhone: '+91 94443 87654',
    providerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    category: 'ac_repair',
    serviceId: 'ac-1',
    serviceName: 'AC Jet Servicing & Cooling Coil Deep Clean',
    date: '2026-10-10',
    timeSlot: '12:00 PM - 02:00 PM',
    problemDescription: 'Master bedroom split AC cooling poorly and blowing musty odor.',
    estimatedPrice: 499,
    taxAmount: 90,
    totalPrice: 589,
    status: 'completed',
    createdAt: '2026-10-09T14:20:00.000Z',
    updatedAt: '2026-10-10T14:00:00.000Z',
    review: {
      rating: 5,
      comment: 'Excellent service! The AC cools like brand new now and technician cleaned up the entire work area before leaving.',
      submittedAt: '2026-10-10T15:00:00.000Z'
    }
  }
];
