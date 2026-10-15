import { Language, BookingStatus, ServiceCategory } from '../types/index.ts';

export const translations = {
  en: {
    brandName: 'HAK fix',
    tagline: 'Local Experts. Easy Bookings. Trusted Service.',
    nav: {
      home: 'Home',
      explore: 'Explore Services',
      howItWorks: 'How It Works',
      becomeProvider: 'Become a Provider',
      myBookings: 'My Bookings',
      login: 'Login / Sign Up',
      bookService: 'Book a Service',
      demoMode: 'Demo Mode (Persistent Local Storage)',
      providerDash: 'Provider Dashboard',
      adminDash: 'Admin Panel',
      switchRole: 'Switch Role',
    },
    hero: {
      headline: "Home Problems? We've Got You.",
      subheadline:
        'Find trusted local professionals and book quality home services in just a few clicks.',
      locationPlaceholder: 'Enter PIN Code (e.g. 600017)',
      serviceSearchPlaceholder: 'What service do you need? (e.g., Tap leak, AC service)',
      searchBtn: 'Search Services',
      describeProblemBtn: 'Describe Your Problem (AI Finder)',
      verifiedBadge: '100% Background Verified Pros',
      pricingBadge: 'Upfront Transparent INR Pricing',
      easyBookingBadge: 'Instant 60-Sec Booking',
      emergencyResponse: '30-Min Emergency Response',
    },
    categories: {
      title: 'Popular Service Categories',
      subtitle:
        'From quick fixes to complete installations, book skilled local experts across your city.',
      viewAll: 'Explore All Services',
      electrical: 'Electrical Services',
      plumbing: 'Plumbing',
      ac_repair: 'AC Repair & Service',
      cleaning: 'Home Cleaning',
      carpentry: 'Carpentry',
      appliance: 'Appliance Repair',
      painting: 'Painting Services',
      pest_control: 'Pest Control',
      from: 'Starting from',
    },
    pros: {
      title: 'Top Rated Local Professionals',
      subtitle: 'Verified by HAK fix, rated 4.8+ by homeowners in your neighborhood.',
      experience: 'years exp',
      startingFrom: 'Starts at',
      verified: 'Verified Expert',
      availableToday: 'Available Today',
      viewProfile: 'View Profile',
      bookNow: 'Book Now',
      reviews: 'reviews',
    },
    howItWorks: {
      title: 'How HAK fix Works',
      subtitle: 'Effortless home maintenance in three transparent steps.',
      step1Title: '1. Choose a Service',
      step1Desc: 'Search or use our AI problem finder to diagnose your exact home issue.',
      step2Title: '2. Select Slot & Expert',
      step2Desc: 'Compare ratings, transparent INR prices, and select a convenient time slot.',
      step3Title: '3. Relax & Pay Post-Work',
      step3Desc: 'Verified technician arrives with required equipment. Track live and review.',
    },
    status: {
      pending: 'Pending',
      accepted: 'Accepted',
      on_the_way: 'On the Way',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    },
    bookingModal: {
      step1: 'Select Service',
      step2: 'Choose Professional',
      step3: 'Date & Time Slot',
      step4: 'Customer Address',
      step5: 'Price Breakdown',
      step6: 'Confirmed!',
      continueBtn: 'Continue',
      backBtn: 'Back',
      confirmBookingBtn: 'Confirm Booking Request',
      totalEstimated: 'Total Estimated',
      serviceBase: 'Service Fee',
      gst: 'GST (18%)',
      emergencyFee: 'Emergency Express Dispatch',
      platformDiscount: 'Welcome Discount',
      bookingSuccessTitle: 'Booking Request Received!',
      bookingSuccessSubtitle: 'Your request is assigned reference',
    },
    aiFinder: {
      badge: 'AI Smart Problem Finder',
      title: 'Describe Your Home Problem',
      subtitle:
        'Type in plain words what is broken or malfunctioning. Our smart diagnosis engine maps your issue instantly.',
      inputPlaceholder:
        'e.g., My kitchen tap is leaking water all over the floor under the sink...',
      diagnoseBtn: 'Diagnose Problem',
      diagnosedCategory: 'Detected Category',
      recommendedFix: 'Recommended Service',
      urgency: 'Urgency Level',
      costEstimate: 'Estimated Cost (INR)',
      preVisitSafety: 'Pre-Visit Safety & Checklist',
      clarifyingQ: 'Clarifying Questions for You',
      disclaimer:
        'Note: AI recommendations are guided suggestions, not official physical diagnoses.',
      proceedToBook: 'Book Recommended Specialist',
    },
  },
  ta: {
    brandName: 'ஹாக் பிக்ஸ் (HAK fix)',
    tagline: 'உள்ளூர் நிபுணர்கள். எளிய முன்பதிவு. நம்பகமான சேவை.',
    nav: {
      home: 'முகப்பு',
      explore: 'சேவைகள்',
      howItWorks: 'எவ்வாறு செயல்படுகிறது',
      becomeProvider: 'நிபுணராக இணையுங்கள்',
      myBookings: 'எனது முன்பதிவுகள்',
      login: 'உள்நுழைவு',
      bookService: 'முன்பதிவு செய்',
      demoMode: 'டெமோ பயன்முறை',
      providerDash: 'நிபுணர் பலகை',
      adminDash: 'நிர்வாக பலகை',
      switchRole: 'பயனர் மாற்றம்',
    },
    hero: {
      headline: 'வீட்டுப் பிரச்சினையா? நாங்கள் தீர்க்கிறோம்.',
      subheadline:
        'நம்பகமான உள்ளூர் கைவினைஞர்களைக் கண்டறிந்து எளிதாக சேவை முன்பதிவு செய்யுங்கள்.',
      locationPlaceholder: 'அஞ்சல் குறியீடு (உதா. 600017)',
      serviceSearchPlaceholder: 'எந்த சேவை தேவை? (உதா: குழாய் கசிவு, ஏசி சர்வீஸ்)',
      searchBtn: 'தேடுக',
      describeProblemBtn: 'பிரச்சினையை விவரிக்கவும் (AI)',
      verifiedBadge: '100% சரிபார்க்கப்பட்ட நிபுணர்கள்',
      pricingBadge: 'முன்பண வெளிப்படையான கட்டணம்',
      easyBookingBadge: 'விரைவான 60-வினாடி முன்பதிவு',
      emergencyResponse: '30-நிமிட அவசர சேவை',
    },
    categories: {
      title: 'பிரபல சேவை பிரிவுகள்',
      subtitle: 'சிறிய பழுதுகள் முதல் முழுமையான அமைப்புகள் வரை உங்கள் நகரத்தில் முன்பதிவு செய்யுங்கள்.',
      viewAll: 'அனைத்து சேவைகளையும் பார்க்க',
      electrical: 'மின்சார சேவைகள்',
      plumbing: 'குழாய் பழுதுபார்ப்பு (Plumbing)',
      ac_repair: 'ஏசி பழுது & சர்வீஸ்',
      cleaning: 'வீட்டு தூய்மைப் பணி',
      carpentry: 'மரவேலைகள் (Carpentry)',
      appliance: 'சாதன பழுதுபார்ப்பு',
      painting: 'வண்ணப்பூச்சு (Painting)',
      pest_control: 'பூச்சிக் கட்டுப்பாடு (Pest Control)',
      from: 'தொடக்கக் கட்டணம்',
    },
    pros: {
      title: 'சிறந்த உள்ளூர் நிபுணர்கள்',
      subtitle: 'HAK fix மூலம் சரிபார்க்கப்பட்டு, 4.8+ மதிப்பீடு பெற்றவர்கள்.',
      experience: 'வருட அனுபவம்',
      startingFrom: 'தொடக்கக் கட்டணம்',
      verified: 'சரிபார்க்கப்பட்ட நிபுணர்',
      availableToday: 'இன்று கிடைக்கும்',
      viewProfile: 'விவரம் பார்க்க',
      bookNow: 'முன்பதிவு செய்',
      reviews: 'மதிப்பீடுகள்',
    },
    howItWorks: {
      title: 'HAK fix எவ்வாறு செயல்படுகிறது',
      subtitle: 'மூன்று எளிய மற்றும் வெளிப்படையான படிகளில் வீட்டுப் பராமரிப்பு.',
      step1Title: '1. சேவையைத் தேர்வு செய்க',
      step1Desc: 'தேடுங்கள் அல்லது உங்கள் வீட்டுப் பிரச்சினையைக் கண்டறிய AI உதவியைப் பயன்படுத்துங்கள்.',
      step2Title: '2. நிபுணர் & நேரத்தைத் தேர்வு செய்க',
      step2Desc: 'மதிப்பீடுகள், விலைகளை ஒப்பிட்டு வசதியான நேரத்தைத் தேர்வு செய்யுங்கள்.',
      step3Title: '3. வேலை முடிந்ததும் கட்டணம் செலுத்துங்கள்',
      step3Desc: 'சரிபார்க்கப்பட்ட நிபுணர் கருவிகளுடன் வருவார். நேரலையாகக் கண்காணிக்கலாம்.',
    },
    status: {
      pending: 'நிலுவையில்',
      accepted: 'ஏற்றுக்கொள்ளப்பட்டது',
      on_the_way: 'வழியில் உள்ளார்',
      in_progress: 'பணியில் உள்ளார்',
      completed: 'நிறைவடைந்தது',
      cancelled: 'ரத்து செய்யப்பட்டது',
    },
    bookingModal: {
      step1: 'சேவை தேர்வு',
      step2: 'நிபுணர் தேர்வு',
      step3: 'தேதி மற்றும் நேரம்',
      step4: 'முகவரி விவரம்',
      step5: 'கட்டண விவரம்',
      step6: 'உறுதி செய்யப்பட்டது!',
      continueBtn: 'தொடரவும்',
      backBtn: 'பின்னே செல்',
      confirmBookingBtn: 'முன்பதிவை உறுதி செய்',
      totalEstimated: 'மொத்த மதிப்பீடு',
      serviceBase: 'சேவைக் கட்டணம்',
      gst: 'ஜிஎஸ்டி வரி (18%)',
      emergencyFee: 'அவசர விரைவு கட்டணம்',
      platformDiscount: 'வரவேற்பு தள்ளுபடி',
      bookingSuccessTitle: 'முன்பதிவு கோரிக்கை பெறப்பட்டது!',
      bookingSuccessSubtitle: 'உங்கள் கோரிக்கை குறிப்பு எண்',
    },
    aiFinder: {
      badge: 'AI அறிவார்ந்த பிரச்சினை கண்டறிதல்',
      title: 'வீட்டுப் பிரச்சினையை விவரிக்கவும்',
      subtitle:
        'என்ன பழுதடைந்துள்ளது என்பதை எளிய சொற்களில் தட்டச்சு செய்யுங்கள். எங்கள் AI அமைப்பு உடனே துல்லியமான நிபுணரை பரிந்துரைக்கும்.',
      inputPlaceholder: 'உதா: சமையலறை சிங்க் அடியில் உள்ள குழாயிலிருந்து தண்ணீர் தொடர்ந்து கசிகிறது...',
      diagnoseBtn: 'பிரச்சினையை ஆராய்க',
      diagnosedCategory: 'கண்டறியப்பட்ட பிரிவு',
      recommendedFix: 'பரிந்துரைக்கப்பட்ட சேவை',
      urgency: 'அவசர நிலை',
      costEstimate: 'மதிப்பிடப்பட்ட கட்டணம் (INR)',
      preVisitSafety: 'பாதுகாப்பு & சரிபார்ப்பு பட்டியல்',
      clarifyingQ: 'கூடுதல் தெளிவுபடுத்தல் வினாக்கள்',
      disclaimer: 'குறிப்பு: AI பரிந்துரைகள் வழிகாட்டுதலுக்கானவை.',
      proceedToBook: 'பரிந்துரைக்கப்பட்ட நிபுணரை முன்பதிவு செய்க',
    },
  },
};

export function getCategoryName(category: ServiceCategory, lang: Language): string {
  const cat = translations[lang].categories;
  switch (category) {
    case 'electrical':
      return cat.electrical;
    case 'plumbing':
      return cat.plumbing;
    case 'ac_repair':
      return cat.ac_repair;
    case 'cleaning':
      return cat.cleaning;
    case 'carpentry':
      return cat.carpentry;
    case 'appliance':
      return cat.appliance;
    case 'painting':
      return cat.painting;
    case 'pest_control':
      return cat.pest_control;
    default:
      return category;
  }
}

export function getStatusLabel(status: BookingStatus, lang: Language): string {
  return translations[lang].status[status] || status;
}
