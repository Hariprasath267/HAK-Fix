import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations } from '../../utils/translations.ts';
import { HakFixLogo } from './HakFixLogo.tsx';
import {
  Calendar,
  User,
  Shield,
  Briefcase,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { UserRole } from '../../types/index.ts';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    language,
    setLanguage,
    userRole,
    setUserRole,
    setIsAiFinderOpen,
    setIsBookingModalOpen,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const t = translations[language];

  const handleNavClick = (page: any) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'provider') {
      setCurrentPage('provider-dashboard');
    } else if (newRole === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#0C2340] text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Local Technicians
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Transparent Pricing in INR (₹)</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Chennai &amp; Bengaluru Metro Area</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Live Active Status */}
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Fast Dispatch Available
            </span>
            {/* Quick AI Trigger */}
            <button
              onClick={() => setIsAiFinderOpen(true)}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors font-medium text-[11px] cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>AI Problem Finder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo with exact user uploaded artwork */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-left focus:outline-none cursor-pointer"
            aria-label="HAK fix home"
          >
            <HakFixLogo size="md" showTagline={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'text-[#0C2340] bg-slate-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPage === 'services'
                  ? 'text-[#0C2340] bg-slate-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.explore}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPage === 'how-it-works'
                  ? 'text-[#0C2340] bg-slate-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('become-provider')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPage === 'become-provider'
                  ? 'text-[#0C2340] bg-slate-100 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t.nav.becomeProvider}
            </button>
            <button
              onClick={() => handleNavClick('my-bookings')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'my-bookings'
                  ? 'text-[#FF7A00] bg-orange-50 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#FF7A00]" />
              <span>{t.nav.myBookings}</span>
            </button>
          </nav>

          {/* Right Action Tools: Language, Role Persona, and CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector: English / தமிழ் */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-[#0C2340] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg font-['Noto_Sans_Tamil',sans-serif] transition-all cursor-pointer ${
                  language === 'ta'
                    ? 'bg-white text-[#0C2340] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="தமிழ் (Switch to Tamil)"
              >
                தமிழ்
              </button>
            </div>

            {/* Persona / Role Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors cursor-pointer"
              >
                {userRole === 'customer' && <User className="w-3.5 h-3.5 text-blue-600" />}
                {userRole === 'provider' && <Briefcase className="w-3.5 h-3.5 text-amber-600" />}
                {userRole === 'admin' && <Shield className="w-3.5 h-3.5 text-emerald-600" />}
                <span className="capitalize hidden sm:inline">{userRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Test Persona
                  </div>
                  <button
                    onClick={() => handleRoleChange('customer')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                      userRole === 'customer' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <div>
                        <div>Customer Mode</div>
                        <div className="text-[10px] text-slate-400">Browse &amp; book services</div>
                      </div>
                    </div>
                    {userRole === 'customer' && <span className="text-blue-600">&bull;</span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange('provider')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                      userRole === 'provider' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-amber-600" />
                      <div>
                        <div>Provider Dashboard</div>
                        <div className="text-[10px] text-slate-400">Suresh Kumar (Electrician)</div>
                      </div>
                    </div>
                    {userRole === 'provider' && <span className="text-amber-600">&bull;</span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange('admin')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                      userRole === 'admin' ? 'text-emerald-600 font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div>Admin Console</div>
                        <div className="text-[10px] text-slate-400">Verify pros &amp; platform KPIs</div>
                      </div>
                    </div>
                    {userRole === 'admin' && <span className="text-emerald-600">&bull;</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Book A Service CTA Button */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] active:bg-[#cc6200] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 hover:shadow-lg transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookService}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {t.nav.explore}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('become-provider')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {t.nav.becomeProvider}
            </button>
            <button
              onClick={() => handleNavClick('my-bookings')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FF7A00] font-bold hover:bg-orange-50 flex items-center justify-between"
            >
              <span>{t.nav.myBookings}</span>
              <Calendar className="w-4 h-4" />
            </button>
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsAiFinderOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-semibold text-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Describe Problem (AI Diagnostic)</span>
            </button>
            <button
              onClick={() => {
                setIsBookingModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FF7A00] text-white font-bold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookService}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
