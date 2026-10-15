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
import {
  auth,
  onAuthStateChanged,
  signInWithGoogle,
  loginWithEmail,
  signupWithEmail,
  logoutUser,
  FirebaseUser,
} from '../lib/firebase.ts';
import { pushHistory, popHistory, getBackLabel } from '../utils/navigationHistory.ts';

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

export interface FairFixDiagnosis {
  issueTitle: string;
  severity: 'routine' | 'urgent' | 'emergency';
  confidence: number;
  category: string;
  diagnosisSummary: string;
  requiredParts: Array<{ name: string; brand: string; mrp: number; lockedPrice: number }>;
  laborCharge: number;
  estimatedDurationMins: number;
  antiSurpriseGuarantee: string;
  vanPreStocked: boolean;
}

interface AppContextType {
  // Navigation & Page State
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  pageHistory: ActivePage[];
  goBack: () => void;
  canGoBack: boolean;
  previousPage: ActivePage | null;
  getBackTitle: () => string;
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

  // Firebase Auth & Cloud SQL Sync
  firebaseUser: FirebaseUser | null;
  firebaseIdToken: string | null;
  handleGoogleSignIn: () => Promise<void>;
  handleEmailSignIn: (email: string, pass: string) => Promise<void>;
  handleEmailSignUp: (email: string, pass: string, name: string) => Promise<void>;
  handleSignOut: () => Promise<void>;

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

  // Modals & Flagship Features
  isAiFinderOpen: boolean;
  setIsAiFinderOpen: (open: boolean) => void;
  isFairFixOpen: boolean;
  setIsFairFixOpen: (open: boolean) => void;
  fairFixDiagnosis: FairFixDiagnosis | null;
  setFairFixDiagnosis: (diag: FairFixDiagnosis | null) => void;
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
    lockedPrice?: number;
    requiredParts?: Array<{ name: string; brand: string; lockedPrice: number }>;
  }) => Promise<Booking>;
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

const BOOKINGS_STORAGE_KEY = 'hakfix_bookings_v3';
const PROVIDERS_STORAGE_KEY = 'hakfix_providers_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<ActivePage>('home');
  const [pageHistory, setPageHistory] = useState<ActivePage[]>([]);

  const setCurrentPage = (page: ActivePage) => {
    setCurrentPageState((prevCurrent) => {
      if (prevCurrent !== page) {
        setPageHistory((prevHist) => pushHistory(prevHist, page, prevCurrent) as ActivePage[]);
      }
      return page;
    });
  };

  const goBack = () => {
    setPageHistory((prevHist) => {
      const { previousPage: prevP, nextHistory } = popHistory(prevHist, 'home');
      setCurrentPageState(prevP as ActivePage);
      return nextHistory as ActivePage[];
    });
  };

  const canGoBack = currentPage !== 'home' || pageHistory.length > 0;
  const previousPage = (pageHistory.length > 0 ? pageHistory[pageHistory.length - 1] : (currentPage !== 'home' ? 'home' : null)) as ActivePage | null;
  const getBackTitle = () => getBackLabel(previousPage || 'home');

  const [selectedProviderId, setSelectedProviderId] = useState<string | null>('pro-1');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>('bkg-1');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('customer');

  // Firebase Auth State
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [firebaseIdToken, setFirebaseIdToken] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState({
    id: 'cust-demo-1',
    name: 'Karthik Subramanian',
    email: 'karthik.sub@gmail.com',
    phone: '9840123456',
    role: 'customer' as UserRole,
  });

  // Unique MVP Feature: HAK FairFix™ Anti-Surprise Price Lock Guarantee
  const [isFairFixOpen, setIsFairFixOpen] = useState(false);
  const [fairFixDiagnosis, setFairFixDiagnosis] = useState<FairFixDiagnosis | null>(null);

  // Services
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  // Providers
  const [providers, setProviders] = useState<Provider[]>(() => {
    try {
      const saved = localStorage.getItem(PROVIDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Storage read failed', e);
    }
    return INITIAL_PROVIDERS;
  });

  // Bookings
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
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price_asc' | 'price_desc'>('recommended');

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

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          setFirebaseIdToken(token);

          // Synchronize user to Cloud SQL PostgreSQL database
          const res = await fetch('/api/auth/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: user.displayName || user.email?.split('@')[0],
              role: userRole,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            setCurrentUser({
              id: user.uid,
              name: data.user?.name || user.displayName || user.email?.split('@')[0] || 'Customer',
              email: user.email || 'customer@hakfix.com',
              phone: data.user?.phone || '9840123456',
              role: (data.user?.role as UserRole) || 'customer',
            });
          }

          // Fetch user's bookings from Cloud SQL
          const profileRes = await fetch('/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            if (profileData.bookings && profileData.bookings.length > 0) {
              const mappedSqlBookings: Booking[] = profileData.bookings.map((sb: any) => ({
                id: `sql-${sb.id}`,
                referenceId: sb.bookingReference,
                customerId: user.uid,
                customerName: sb.customerName,
                customerPhone: sb.customerPhone,
                customerEmail: sb.customerEmail,
                address: sb.customerAddress,
                city: 'Chennai',
                pinCode: '600040',
                providerId: sb.providerId || 'pro-1',
                providerName: sb.providerName || 'Certified HAK Specialist',
                providerPhone: '+91 98401 23456',
                providerPhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80',
                category: sb.serviceCategory as ServiceCategory,
                serviceId: 'fairfix-1',
                serviceName: sb.serviceName,
                date: sb.scheduledDate,
                timeSlot: sb.scheduledTime,
                problemDescription: sb.notes || 'HAK FairFix™ Guaranteed Price Lock',
                estimatedPrice: sb.basePrice,
                taxAmount: sb.taxAmount || 0,
                totalPrice: sb.totalPrice,
                status: (sb.status as BookingStatus) || 'accepted',
                createdAt: sb.createdAt,
                updatedAt: sb.createdAt,
              }));

              setBookings((prev) => {
                const existingRefs = new Set(prev.map((b) => b.referenceId));
                const newItems = mappedSqlBookings.filter((b) => !existingRefs.has(b.referenceId));
                return [...newItems, ...prev];
              });
            }
          }
        } catch (err) {
          console.warn('Failed to sync auth with Cloud SQL:', err);
        }
      } else {
        setFirebaseIdToken(null);
      }
    });

    return () => unsubscribe();
  }, [userRole]);

  // Auth Handlers
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      showToast(`Welcome, ${user.displayName || 'Customer'}! Signed in with Google.`, 'success');
      setIsAuthModalOpen(false);
    } catch (error: any) {
      showToast(error.message || 'Google Sign-In failed. Please try again.', 'error');
    }
  };

  const handleEmailSignIn = async (email: string, pass: string) => {
    try {
      const user = await loginWithEmail(email, pass);
      showToast(`Welcome back, ${user.displayName || email.split('@')[0]}!`, 'success');
      setIsAuthModalOpen(false);
    } catch (error: any) {
      showToast(error.message || 'Invalid email or password.', 'error');
    }
  };

  const handleEmailSignUp = async (email: string, pass: string, name: string) => {
    try {
      const user = await signupWithEmail(email, pass, name);
      showToast(`Account created successfully! Welcome, ${name || email.split('@')[0]}!`, 'success');
      setIsAuthModalOpen(false);
    } catch (error: any) {
      showToast(error.message || 'Account registration failed.', 'error');
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      setCurrentUser({
        id: 'guest',
        name: 'Guest Customer',
        email: 'guest@hakfix.com',
        phone: '',
        role: 'customer',
      });
      showToast('Signed out of HAK fix account.', 'info');
    } catch (error: any) {
      showToast('Sign out error', 'error');
    }
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

  // Booking Creation with Cloud SQL insertion
  const createNewBooking = async (params: {
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
    lockedPrice?: number;
    requiredParts?: Array<{ name: string; brand: string; lockedPrice: number }>;
  }): Promise<Booking> => {
    const service = services.find((s) => s.id === params.serviceId) || services[0];
    const provider = providers.find((p) => p.id === params.providerId) || providers[0];
    const pricing = calculatePricing(service.basePrice, params.isEmergency, true);
    const referenceId = generateBookingReference();

    const finalTotalPrice = params.lockedPrice || pricing.totalPrice;

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
      totalPrice: finalTotalPrice,
      status: 'accepted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setSelectedBookingId(newBooking.id);

    // Persist to Cloud SQL PostgreSQL
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(firebaseIdToken ? { Authorization: `Bearer ${firebaseIdToken}` } : {}),
        },
        body: JSON.stringify({
          bookingReference: referenceId,
          userUid: firebaseUser?.uid || null,
          customerName: params.customerName,
          customerEmail: currentUser.email,
          customerPhone: params.customerPhone,
          customerAddress: `${params.address}, ${params.city || 'Chennai'} - ${params.pinCode}`,
          serviceCategory: service.category,
          serviceName: service.name,
          providerId: provider.id,
          providerName: provider.name,
          scheduledDate: params.date,
          scheduledTime: params.timeSlot,
          basePrice: pricing.basePrice,
          emergencyFee: pricing.emergencyFee,
          taxAmount: pricing.taxAmount,
          totalPrice: finalTotalPrice,
          notes: params.problemDescription,
        }),
      });
    } catch (err) {
      console.warn('Booking saved to local state, backend sync failed:', err);
    }

    showToast(`Booking ${referenceId} confirmed with FairFix™ Price Lock!`, 'success');
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
        pageHistory,
        goBack,
        canGoBack,
        previousPage,
        getBackTitle,
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
        firebaseUser,
        firebaseIdToken,
        handleGoogleSignIn,
        handleEmailSignIn,
        handleEmailSignUp,
        handleSignOut,
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
        isFairFixOpen,
        setIsFairFixOpen,
        fairFixDiagnosis,
        setFairFixDiagnosis,
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
