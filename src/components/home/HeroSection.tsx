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
    setIsFairFixOpen,
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

  const previewPro =
    providers.find((p) => p.category === activeCategoryTab) || providers[0];

  return (
    <section className="relative overflow-hidden bg-[#0A121E] text-white pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-800/80 subtle-dark-photo-backdrop">
      {/* Precision ambient lighting rings */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-80px] left-1/4 w-[750px] h-[550px] bg-[#0071E3]/20 blur-[130px] rounded-full" />
        <div className="absolute top-28 right-[-50px] w-[650px] h-[500px] bg-[#38BDF8]/14 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Apple-Style Typographic Hierarchy & 3D Search Console */}
          <div className="lg:col-span-6 space-y-7">
            {/* Pill Tag with 3D Specular Border */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-slate-200 text-xs font-medium backdrop-blur-xl shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.35)]">
              <span className="w-2 h-2 rounded-full bg-[#2997FF] shadow-[0_0_10px_#2997FF] animate-pulse"></span>
              <span>{translations[language].tagline}</span>
            </div>

            {/* Apple Headline with Refined Electric Gradient */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              {t.headline.split('?')[0]}?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2997FF] via-[#60A5FA] to-[#BAE6FD]">
                {t.headline.split('?')[1] || "We've Got You."}
              </span>
            </h1>

            {/* Subheadline with breathing room */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal opacity-90">
              {t.subheadline}
            </p>

            {/* 3D Glass Console */}
            <div className="p-4 sm:p-5 rounded-[2rem] bg-white/[0.08] border border-white/[0.18] backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.3)] space-y-3.5">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
                {/* Location / PIN Input */}
                <div className="relative sm:w-1/3">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchPinCode}
                    onChange={(e) => setSearchPinCode(e.target.value)}
                    placeholder={t.locationPlaceholder}
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-white/95 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium border-0 focus:ring-2 focus:ring-[#0071E3] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
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
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-white/95 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium border-0 focus:ring-2 focus:ring-[#0071E3] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
                  />
                </div>
                {/* 3D Primary Button */}
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl btn-3d-primary text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0"
                >
                  <span>{t.searchBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* AI & FairFix Diagnostic Triggers */}
              <div className="pt-2.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-xs text-slate-300 font-normal hidden sm:inline">
                  Defect? Get exact OEM parts cost locked upfront:
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsFairFixOpen(true)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all border border-blue-400/40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>FairFix™ Price Lock</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAiFinderOpen(true)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl btn-3d-dark text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>{t.describeProblemBtn}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Apple Minimalist Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.verifiedBadge}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                <IndianRupee className="w-4 h-4 text-[#2997FF] shrink-0" />
                <span>{t.pricingBadge}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{t.emergencyResponse}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Floating Apple Vision Card Showcase */}
          <div className="lg:col-span-6 relative [perspective:1200px]">
            {/* 3D Tilted Glass Card Stack */}
            <div className="relative rounded-[2.2rem] p-6 sm:p-8 apple-glass-dark transition-all duration-500 hover:[transform:rotateY(0deg)_rotateX(0deg)] [transform:rotateY(-3deg)_rotateX(2deg)]">
              {/* Card Header with Brand Logo & Live Radar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <HakFixLogo size="sm" variant="white" />
                  <span className="text-[11px] text-slate-400 border-l border-slate-700/80 pl-3 hidden sm:inline">
                    Direct Metro Dispatch
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-xs font-medium shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>14 Pros Online Now</span>
                </div>
              </div>

              {/* 3D Segmented Specialty Selector Chips */}
              <div className="pt-4 space-y-2.5">
                <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase block">
                  Select Specialty:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'plumbing' as ServiceCategory, label: 'Plumbing', icon: Wrench, color: 'text-cyan-400' },
                    { id: 'electrical' as ServiceCategory, label: 'Electrical', icon: Zap, color: 'text-amber-400' },
                    { id: 'ac_repair' as ServiceCategory, label: 'AC Repair', icon: Wind, color: 'text-teal-400' },
                    { id: 'carpentry' as ServiceCategory, label: 'Carpentry', icon: Hammer, color: 'text-indigo-400' },
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
                        className={`p-2.5 rounded-2xl text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isActive
                            ? 'btn-3d-primary text-white font-semibold'
                            : 'btn-3d-dark text-slate-300'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : cat.color}`} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3D Elevated Technician Card */}
              {previewPro && (
                <div className="mt-5 p-5 rounded-3xl bg-white/[0.06] border border-white/[0.12] shadow-[0_12px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.22)] space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={previewPro.photoUrl}
                          alt={previewPro.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-white/25 shadow-md shrink-0"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-semibold text-base text-white">
                            {previewPro.name}
                          </h4>
                          <BadgeCheck className="w-4 h-4 text-[#2997FF]" />
                        </div>
                        <span className="text-xs text-[#2997FF] font-medium">
                          {getCategoryName(previewPro.category, language)} &bull; {previewPro.city}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                          <span className="flex items-center text-amber-400 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                            {previewPro.rating}
                          </span>
                          <span className="text-slate-400">({previewPro.reviewCount} reviews)</span>
                          <span className="text-slate-500">&bull;</span>
                          <span className="text-slate-400">{previewPro.experienceYears} yrs exp</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 shrink-0">
                      Available Today
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {previewPro.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-white/[0.06] text-slate-300 border border-white/[0.08] text-[11px] font-normal"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and 3D Action row */}
                  <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                        Standard Diagnostic Rate
                      </span>
                      <span className="text-lg font-bold text-white tracking-tight">
                        ₹{previewPro.startingPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => startBookingForProvider(previewPro.id)}
                      className="px-5 py-2.5 rounded-full btn-3d-primary text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Specialist</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Guarantees Strip */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  30-Day Re-work Guarantee
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2997FF]" />
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
