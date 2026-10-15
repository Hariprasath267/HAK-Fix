export type ServiceCategory =
  | 'electrical'
  | 'plumbing'
  | 'ac_repair'
  | 'cleaning'
  | 'carpentry'
  | 'appliance'
  | 'painting'
  | 'pest_control';

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'on_the_way'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type UserRole = 'customer' | 'provider' | 'admin';

export type Language = 'en' | 'ta';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  basePrice: number; // in INR
  durationMinutes: number;
  popular?: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Provider {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryName: string;
  photoUrl: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  startingPrice: number; // in INR
  serviceAreas: string[];
  city: string;
  pinCodes: string[];
  isVerified: boolean;
  isBackgroundChecked: boolean;
  phone: string;
  email: string;
  bio: string;
  skills: string[];
  includedInPrice: string[];
  additionalChargesInfo: string;
  availabilityToday: boolean;
  availableSlots: string[];
  reviews: Review[];
  completedJobsCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Booking {
  id: string;
  referenceId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  city: string;
  pinCode: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  providerPhoto: string;
  category: ServiceCategory;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  problemDescription: string;
  estimatedPrice: number;
  taxAmount: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  cancellationReason?: string;
  review?: {
    rating: number;
    comment: string;
    submittedAt: string;
  };
}

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
