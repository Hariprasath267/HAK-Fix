import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations } from '../../utils/translations.ts';
import { HakFixLogo } from './HakFixLogo.tsx';
import {
  Calendar,
  User,
  ShieldCheck,
  Briefcase,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { UserRole } from '../../types/index.ts';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    goBack,
    canGoBack,
    getBackTitle,
    language,
    setLanguage,
    userRole,
    setUserRole,
    currentUser,
    firebaseUser,
    handleSignOut,
    setIsAuthModalOpen,
    setIsBookingModalOpen,
    setIsFairFixOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: any) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoggedIn = !!firebaseUser || currentUser.email !== 'guest@hakfix.com';

  return (
    <div className="sticky top-0 z-50 px-3 sm:px-6 py-2.5 transition-all">
      {/* Apple-style floating pill navigation bar with frosted glass */}
      <nav className="max-w-7xl mx-auto rounded-full bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_8px_32px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all">
        {/* Left: Brand Logo & Back Button */}
        <div className="flex items-center gap-2 shrink-0">
          {canGoBack && (
            <button
              onClick={goBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/90 text-slate-800 text-xs font-semibold border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
              title={getBackTitle()}
              aria-label="Go back"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0071E3]" />
              <span className="hidden sm:inline font-semibold">{getBackTitle()}</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-left focus:outline-none cursor-pointer transition-transform hover:scale-[1.02] shrink-0"
            aria-label="HAK fix home"
          >
            <HakFixLogo size="sm" showTagline={false} />
          </button>
        </div>

        {/* Center: Apple Segmented Pill Navigation */}
        <div className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200/70 shadow-inner space-x-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 'services'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.nav.explore}
          </button>
          <button
            onClick={() => setIsFairFixOpen(true)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 transition-all cursor-pointer flex items-center gap-1.5 border border-blue-200/60 shadow-xs"
            title="Anti-Surprise Price Lock Guarantee"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>FairFix™ Diagnostic</span>
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 'how-it-works'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.nav.howItWorks}
          </button>
          <button
            onClick={() => handleNavClick('my-bookings')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'my-bookings'
                ? 'bg-white text-[#0071E3] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>{t.nav.myBookings}</span>
          </button>
        </div>

        {/* Right Action Tools: Language, Customer Login, & High-Contrast 3D Booking CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector: English / தமிழ் */}
          <div className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 shadow-inner">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer ${
                language === 'ta'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tamil (தமிழ்)"
            >
              TA
            </button>
          </div>

          {/* Customer Authentication & Profile Menu */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold shadow-xs cursor-pointer transition-all"
                aria-expanded={profileDropdownOpen}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#38BDF8] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <span className="hidden sm:inline max-w-[110px] truncate text-slate-900">
                  {currentUser.name || 'Customer'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* High-contrast solid white Apple Glass dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.22)] py-2 z-50 text-slate-900 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{currentUser.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {currentUser.email}
                    </div>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0071E3] text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Customer Account</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('my-bookings');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 font-medium cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#0071E3]" />
                      <span>My Bookings & Invoices</span>
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('track');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 font-medium cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Live Dispatch Tracking</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsFairFixOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 font-medium cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#0071E3]" />
                      <span>FairFix™ Price Lock Guarantee</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Partner Portals
                    </div>
                    <button
                      onClick={() => {
                        setUserRole('provider');
                        handleNavClick('provider-dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Technician Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserRole('admin');
                        handleNavClick('admin-dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Admin Management Console</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        handleSignOut();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer Login</span>
            </button>
          )}

          {/* Book A Service CTA Button - High Contrast 3D Tactile Button */}
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full apple-btn-3d text-white text-xs sm:text-sm font-bold cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4 text-white shrink-0" />
            <span className="text-white">{t.nav.bookService}</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 md:hidden focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-2xl p-4 space-y-3 animate-in fade-in">
          {canGoBack && (
            <button
              onClick={() => {
                goBack();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200/80 flex items-center gap-2 border border-slate-200 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#0071E3]" />
              <span>{getBackTitle()}</span>
            </button>
          )}

          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {t.nav.explore}
            </button>
            <button
              onClick={() => {
                setIsFairFixOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 flex items-center justify-between"
            >
              <span>FairFix™ Diagnostic & Price Lock</span>
              <Sparkles className="w-4 h-4 text-[#0071E3]" />
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('my-bookings')}
              className="text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-[#0071E3] hover:bg-blue-50 flex items-center justify-between"
            >
              <span>{t.nav.myBookings}</span>
              <Calendar className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {!isLoggedIn && (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Customer Login / Register</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsBookingModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full apple-btn-3d text-white font-bold text-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-white">{t.nav.bookService}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
