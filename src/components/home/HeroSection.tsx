import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getCategoryName } from '../../utils/translations.ts';
import { HakFixLogo } from '../common/HakFixLogo.tsx';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  IndianRupee,
  Clock,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Zap,
  Wrench,
  Wind,
  Hammer,
  BadgeCheck,
} from 'lucide-react';
import { ServiceCategory } from '../../types/index.ts';

export const HeroSection: React.FC = () => {
  const {
    language,
    searchQuery,
    setSearchQuery,
    searchPinCode,
    setSearchPinCode,
    setCurrentPage,
    setSelectedCategory,
    setIsAiFinderOpen,
    providers,
    startBookingForProvider,
  } = useApp();

  const [activeCategoryTab, setActiveCategoryTab] = useState<ServiceCategory>('plumbing');
  const t = translations[language].hero;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('services');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Find preview pro for active category tab
  const previewPro =
    providers.find((p) => p.category === activeCategoryTab) || providers[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0C2340] via-[#0A1C33] to-[#071526] text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background ambient warm and blue glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-[500px] h-[400px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Search Form */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Tagline Pill with Logo Brand Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-orange-400 text-xs font-semibold backdrop-blur-sm shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse"></span>
              <span className="text-slate-200">{translations[language].tagline}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              {t.headline.split('?')[0]}?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
                {t.headline.split('?')[1] || "We've Got You."}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {t.subheadline}
            </p>

            {/* Search Box Card */}
            <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-white/15 shadow-2xl space-y-3">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
                {/* Location / PIN Input */}
                <div className="relative sm:w-1/3">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchPinCode}
                    onChange={(e) => setSearchPinCode(e.target.value)}
                    placeholder={t.locationPlaceholder}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium border-0 focus:ring-2 focus:ring-orange-500 shadow-sm"
                  />
                </div>
                {/* Service Keyword Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.serviceSearchPlaceholder}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium border-0 focus:ring-2 focus:ring-orange-500 shadow-sm"
                  />
                </div>
                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-[#FF7A00] hover:bg-[#e66e00] active:bg-[#cc6200] text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>{t.searchBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* AI Problem Finder Sparkle CTA */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-300 font-medium hidden sm:inline">
                  Unsure which specialist to pick?
                </span>
                <button
                  type="button"
                  onClick={() => setIsAiFinderOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>{t.describeProblemBtn}</span>
                </button>
              </div>
            </div>

            {/* Trust Indicators / Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.verifiedBadge}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <IndianRupee className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{t.pricingBadge}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.emergencyResponse}</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Service Dispatch Hub (Replacing 3D viewer) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl p-6 sm:p-7 bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl space-y-6">
              {/* Header inside Hub */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <HakFixLogo size="sm" variant="white" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    Instant Local Dispatch &bull; Chennai &amp; Bengaluru
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>14 Pros Online Now</span>
                </div>
              </div>

              {/* Category Quick Selector Chips */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Select Required Specialty:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'plumbing' as ServiceCategory, label: 'Plumbing', icon: Wrench, color: 'text-cyan-400' },
                    { id: 'electrical' as ServiceCategory, label: 'Electrical', icon: Zap, color: 'text-amber-400' },
                    { id: 'ac_repair' as ServiceCategory, label: 'AC Repair', icon: Wind, color: 'text-teal-400' },
                    { id: 'carpentry' as ServiceCategory, label: 'Carpentry', icon: Hammer, color: 'text-purple-400' },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategoryTab === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveCategoryTab(cat.id);
                          setSelectedCategory(cat.id);
                        }}
                        className={`p-2.5 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold border-orange-400 shadow-md'
                            : 'bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 border-slate-700'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : cat.color}`} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Verified Pro Preview Spotlight Card */}
              {previewPro && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-3.5 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={previewPro.photoUrl}
                        alt={previewPro.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-400/50 shadow-md shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm sm:text-base text-white">
                            {previewPro.name}
                          </h4>
                          <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-xs text-orange-400 font-semibold">
                          {getCategoryName(previewPro.category, language)} &bull; {previewPro.city}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                          <span className="flex items-center text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                            {previewPro.rating}
                          </span>
                          <span>({previewPro.reviewCount} reviews)</span>
                          <span className="text-slate-500">&bull;</span>
                          <span>{previewPro.experienceYears} yrs exp</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-[10px] font-bold border border-emerald-700/50 shrink-0">
                      Available Today
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {previewPro.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-700/60 text-[10px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Action row */}
                  <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Standard Diagnostic Rate
                      </span>
                      <span className="text-base font-extrabold text-white">
                        ₹{previewPro.startingPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => startBookingForProvider(previewPro.id)}
                      className="px-4 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Specialist</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Hub Guarantee Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  30-Day Re-work Guarantee
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                  Zero Upfront Advance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
