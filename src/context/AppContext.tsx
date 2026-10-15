import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Booking,
  BookingStatus,
  Language,
  Provider,
  ServiceCategory,
  ServiceItem,
  UserRole,
} from '../types/index.ts';
import { INITIAL_BOOKINGS, INITIAL_PROVIDERS, INITIAL_SERVICES } from '../data/mockData.ts';
import {
  calculatePricing,
  canCancelBooking,
  generateBookingReference,
  getNextStatus,
} from '../utils/bookingRules.ts';

export type ActivePage =
  | 'home'
  | 'services'
  | 'profile'
  | 'book'
  | 'confirmation'
  | 'my-bookings'
  | 'track'
  | 'provider-dashboard'
  | 'provider-bookings'
  | 'provider-profile'
  | 'admin-dashboard'
  | 'how-it-works'
  | 'become-provider';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Navigation & Page State
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  selectedProviderId: string | null;
  setSelectedProviderId: (id: string | null) => void;
  selectedBookingId: string | null;
  setSelectedBookingId: (id: string | null) => void;
  selectedCategory: ServiceCategory | null;
  setSelectedCategory: (cat: ServiceCategory | null) => void;

  // Language & Role
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
  };

  // Data
  services: ServiceItem[];
  providers: Provider[];
  bookings: Booking[];

  // Search & Filter State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPinCode: string;
  setSearchPinCode: (pin: string) => void;
  minRatingFilter: number;
  setMinRatingFilter: (r: number) => void;
  maxPriceFilter: number;
  setMaxPriceFilter: (p: number) => void;
  availabilityFilter: 'all' | 'today';
  setAvailabilityFilter: (a: 'all' | 'today') => void;
  sortBy: 'recommended' | 'rating' | 'price_asc' | 'price_desc';
  setSortBy: (sort: 'recommended' | 'rating' | 'price_asc' | 'price_desc') => void;

  // Modals
  isAiFinderOpen: boolean;
  setIsAiFinderOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;

  // Actions
  createNewBooking: (params: {
    serviceId: string;
    providerId: string;
    date: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
    address: string;
    pinCode: string;
    city: string;
    problemDescription: string;
    isEmergency?: boolean;
  }) => Booking;
  updateBookingStatus: (bookingId: string, nextStatus: BookingStatus) => void;
  advanceBookingStatusDemo: (bookingId: string) => void;
  cancelBooking: (bookingId: string, reason: string) => boolean;
  submitReview: (bookingId: string, rating: number, comment: string) => void;
  toggleProviderVerification: (providerId: string) => void;
  toggleProviderAvailability: (providerId: string) => void;
  startBookingForProvider: (providerId: string, serviceId?: string) => void;
  openBookingTracking: (bookingId: string) => void;
  openProviderProfile: (providerId: string) => void;

  // Notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BOOKINGS_STORAGE_KEY = 'hakfix_bookings_v2';
const PROVIDERS_STORAGE_KEY = 'hakfix_providers_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>('pro-1');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>('bkg-1');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [currentUser, setCurrentUser] = useState({
    id: 'cust-demo-1',
    name: 'Karthik Subramanian',
    email: 'karthik.sub@gmail.com',
    phone: '9840123456',
    role: 'customer' as UserRole,
  });

  // Services
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  // Providers with localStorage fallback
  const [providers, setProviders] = useState<Provider[]>(() => {
    try {
      const saved = localStorage.getItem(PROVIDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return INITIAL_PROVIDERS;
  });

  // Bookings with localStorage fallback
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return INITIAL_BOOKINGS;
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPinCode, setSearchPinCode] = useState('');
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(3000);
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'today'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price_asc' | 'price_desc'>(
    'recommended'
  );

  // Modals
  const [isAiFinderOpen, setIsAiFinderOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(PROVIDERS_STORAGE_KEY, JSON.stringify(providers));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }, [providers]);

  // Update current user when role toggles for demo convenience
  useEffect(() => {
    if (userRole === 'provider') {
      setCurrentUser({
        id: 'pro-1',
        name: 'Suresh Kumar',
        email: 'suresh.fix@hakfix.in',
        phone: '+91 98401 23456',
        role: 'provider',
      });
    } else if (userRole === 'admin') {
      setCurrentUser({
        id: 'admin-1',
        name: 'Admin Desk (HAK fix)',
        email: 'admin@hakfix.in',
        phone: '+91 98888 77777',
        role: 'admin',
      });
    } else {
      setCurrentUser({
        id: 'cust-demo-1',
        name: 'Karthik Subramanian',
        email: 'karthik.sub@gmail.com',
        phone: '9840123456',
        role: 'customer',
      });
    }
  }, [userRole]);

  // Booking Creation
  const createNewBooking = (params: {
    serviceId: string;
    providerId: string;
    date: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
    address: string;
    pinCode: string;
    city: string;
    problemDescription: string;
    isEmergency?: boolean;
  }): Booking => {
    const service = services.find((s) => s.id === params.serviceId) || services[0];
    const provider = providers.find((p) => p.id === params.providerId) || providers[0];
    const pricing = calculatePricing(service.basePrice, params.isEmergency, true);
    const referenceId = generateBookingReference();

    const newBooking: Booking = {
      id: `bkg-${Date.now()}`,
      referenceId,
      customerId: currentUser.id,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      customerEmail: currentUser.email,
      address: params.address,
      city: params.city || 'Chennai',
      pinCode: params.pinCode,
      providerId: provider.id,
      providerName: provider.name,
      providerPhone: provider.phone,
      providerPhoto: provider.photoUrl,
      category: service.category,
      serviceId: service.id,
      serviceName: service.name,
      date: params.date,
      timeSlot: params.timeSlot,
      problemDescription: params.problemDescription,
      estimatedPrice: pricing.basePrice,
      taxAmount: pricing.taxAmount,
      totalPrice: pricing.totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setSelectedBookingId(newBooking.id);
    showToast(`Booking ${referenceId} confirmed! Status is currently Pending.`, 'success');
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, nextStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: nextStatus, updatedAt: new Date().toISOString() } : b
      )
    );
    showToast(`Booking status updated to ${nextStatus.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const advanceBookingStatusDemo = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;
    const next = getNextStatus(booking.status);
    if (next) {
      updateBookingStatus(bookingId, next);
    } else {
      showToast('Booking has already reached its final status.', 'info');
    }
  };

  const cancelBooking = (bookingId: string, reason: string): boolean => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return false;
    const check = canCancelBooking(booking.status);
    if (!check.allowed) {
      showToast(check.reason || 'Cannot cancel booking at this stage.', 'error');
      return false;
    }
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'cancelled',
              cancellationReason: reason,
              updatedAt: new Date().toISOString(),
            }
          : b
      )
    );
    showToast(`Booking ${booking.referenceId} has been cancelled.`, 'info');
    return true;
  };

  const submitReview = (bookingId: string, rating: number, comment: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const reviewObj = {
      rating,
      comment,
      submittedAt: new Date().toISOString(),
    };

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, review: reviewObj } : b))
    );

    // Also update provider rating and review list
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === booking.providerId) {
          const newReviews = [
            {
              id: `rev-${Date.now()}`,
              bookingId,
              customerName: booking.customerName,
              rating,
              comment,
              date: 'Just now',
            },
            ...p.reviews,
          ];
          const avgRating = Number(
            (
              newReviews.reduce((acc, curr) => acc + curr.rating, 0) / newReviews.length
            ).toFixed(1)
          );
          return {
            ...p,
            rating: avgRating,
            reviewCount: newReviews.length,
            reviews: newReviews,
          };
        }
        return p;
      })
    );
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const toggleProviderVerification = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, isVerified: !p.isVerified } : p))
    );
    showToast('Provider verification status updated.', 'info');
  };

  const toggleProviderAvailability = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId ? { ...p, availabilityToday: !p.availabilityToday } : p
      )
    );
    showToast('Daily availability schedule toggled.', 'info');
  };

  const startBookingForProvider = (providerId: string, serviceId?: string) => {
    setSelectedProviderId(providerId);
    if (serviceId) {
      const srv = services.find((s) => s.id === serviceId);
      if (srv) setSelectedCategory(srv.category);
    }
    setIsBookingModalOpen(true);
  };

  const openBookingTracking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setCurrentPage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProviderProfile = (providerId: string) => {
    setSelectedProviderId(providerId);
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProviderId,
        setSelectedProviderId,
        selectedBookingId,
        setSelectedBookingId,
        selectedCategory,
        setSelectedCategory,
        language,
        setLanguage,
        userRole,
        setUserRole,
        currentUser,
        services,
        providers,
        bookings,
        searchQuery,
        setSearchQuery,
        searchPinCode,
        setSearchPinCode,
        minRatingFilter,
        setMinRatingFilter,
        maxPriceFilter,
        setMaxPriceFilter,
        availabilityFilter,
        setAvailabilityFilter,
        sortBy,
        setSortBy,
        isAiFinderOpen,
        setIsAiFinderOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        createNewBooking,
        updateBookingStatus,
        advanceBookingStatusDemo,
        cancelBooking,
        submitReview,
        toggleProviderVerification,
        toggleProviderAvailability,
        startBookingForProvider,
        openBookingTracking,
        openProviderProfile,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
