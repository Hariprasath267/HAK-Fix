import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getCategoryName } from '../../utils/translations.ts';
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkle,
} from 'lucide-react';

export const RecommendedPros: React.FC = () => {
  const {
    providers,
    language,
    openProviderProfile,
    startBookingForProvider,
    setCurrentPage,
  } = useApp();
  const t = translations[language].pros;

  return (
    <section className="py-20 sm:py-24 bg-white/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Certified Specialists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 max-w-xl font-normal leading-relaxed">
              {t.subtitle}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('services')}
            className="px-4 py-2 rounded-full btn-3d-secondary text-xs flex items-center gap-1.5 cursor-pointer group"
          >
            <span>View All Professionals</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0071E3] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3D Apple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {providers.slice(0, 6).map((pro) => (
            <div
              key={pro.id}
              className="apple-card-3d p-6 flex flex-col justify-between"
            >
              {/* Header / Profile info */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={pro.photoUrl}
                      alt={pro.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200/80 shadow-sm shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-slate-900 tracking-tight">
                          {pro.name}
                        </h3>
                        {pro.isVerified && (
                          <span title="Verified Professional">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-50 shrink-0" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#0071E3]">
                        {getCategoryName(pro.category, language)}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                          {pro.rating}
                        </span>
                        <span className="text-slate-400">({pro.reviewCount} {t.reviews})</span>
                        <span className="text-slate-300">&bull;</span>
                        <span className="text-slate-500">{pro.experienceYears} {t.experience}</span>
                      </div>
                    </div>
                  </div>
                  {/* Availability Badge */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide shrink-0 ${
                      pro.availabilityToday
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {pro.availabilityToday ? t.availableToday : 'Next Available'}
                  </span>
                </div>

                {/* Bio Snippet */}
                <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed font-normal">
                  {pro.bio}
                </p>

                {/* Service Areas */}
                <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {pro.city}: {pro.serviceAreas.join(', ')}
                  </span>
                </div>

                {/* Skills tags */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {pro.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-xl font-medium border border-slate-200/50 shadow-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Price with 3D tactile buttons */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                    {t.startingFrom}
                  </span>
                  <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                    ₹{pro.startingPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openProviderProfile(pro.id)}
                    className="px-3.5 py-2 rounded-full btn-3d-secondary text-xs"
                  >
                    {t.viewProfile}
                  </button>
                  <button
                    onClick={() => startBookingForProvider(pro.id)}
                    className="px-4 py-2 rounded-full btn-3d-primary text-xs flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.bookNow}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
