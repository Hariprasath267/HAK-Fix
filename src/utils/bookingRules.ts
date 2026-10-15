export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'on_the_way'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface PricingBreakdown {
  basePrice: number;
  emergencyFee: number;
  platformDiscount: number;
  taxAmount: number;
  totalPrice: number;
}

export interface BookingValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function calculatePricing(
  basePrice: number,
  isEmergency: boolean = false,
  hasPromo: boolean = false
): PricingBreakdown {
  const safeBase = Math.max(0, Math.round(basePrice));
  const emergencyFee = isEmergency ? 150 : 0;
  const platformDiscount = hasPromo ? Math.min(100, Math.round(safeBase * 0.1)) : 0;
  const subtotal = safeBase + emergencyFee - platformDiscount;
  const taxAmount = Math.round(subtotal * 0.18); // 18% GST standard in India
  const totalPrice = subtotal + taxAmount;
  return {
    basePrice: safeBase,
    emergencyFee,
    platformDiscount,
    taxAmount,
    totalPrice: Math.max(0, totalPrice),
  };
}

export function canCancelBooking(status: BookingStatus): { allowed: boolean; reason?: string } {
  if (status === 'cancelled') {
    return { allowed: false, reason: 'Booking is already cancelled.' };
  }
  if (status === 'completed') {
    return { allowed: false, reason: 'Completed services cannot be cancelled.' };
  }
  if (status === 'in_progress') {
    return { allowed: false, reason: 'Work has already started and cannot be cancelled.' };
  }
  return { allowed: true };
}

export function getNextStatus(current: BookingStatus): BookingStatus | null {
  switch (current) {
    case 'pending':
      return 'accepted';
    case 'accepted':
      return 'on_the_way';
    case 'on_the_way':
      return 'in_progress';
    case 'in_progress':
      return 'completed';
    default:
      return null;
  }
}

export function validateBookingForm(data: {
  customerName?: string;
  customerPhone?: string;
  address?: string;
  pinCode?: string;
  serviceId?: string;
  date?: string;
  timeSlot?: string;
}): BookingValidationResult {
  const errors: Record<string, string> = {};

  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name (at least 2 characters).';
  }

  // 10-digit Indian phone validation (starting with 6-9)
  const phoneClean = (data.customerPhone || '').replace(/\D/g, '');
  if (!phoneClean || phoneClean.length !== 10 || !/^[6-9]/.test(phoneClean)) {
    errors.customerPhone = 'Please enter a valid 10-digit mobile number starting with 6-9.';
  }

  if (!data.address || data.address.trim().length < 6) {
    errors.address = 'Please provide a complete street address and landmark.';
  }

  // Indian PIN code: 6 digits
  const pinClean = (data.pinCode || '').trim();
  if (!/^\d{6}$/.test(pinClean)) {
    errors.pinCode = 'PIN code must be a valid 6-digit number (e.g., 600017).';
  }

  if (!data.serviceId) {
    errors.serviceId = 'Please select a specific service to proceed.';
  }

  if (!data.date) {
    errors.date = 'Please pick a service date.';
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Please select a preferred arrival time slot.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateBookingReference(): string {
  const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `HAK-${random}`;
}
