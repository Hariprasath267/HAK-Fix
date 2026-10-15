import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getCategoryName } from '../../utils/translations.ts';
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  ArrowRight,
  Clock,
  Sparkles,
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
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#0C2340] text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Tested &amp; Trusted Technicians</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setCurrentPage('services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A00] hover:text-[#e66e00] hover:underline cursor-pointer"
          >
            <span>View All Professionals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Professionals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.slice(0, 6).map((pro) => (
            <div
              key={pro.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between"
            >
              {/* Header / Profile info */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={pro.photoUrl}
                      alt={pro.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-slate-900">{pro.name}</h3>
                        {pro.isVerified && (
                          <span title="Verified Professional">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-50 shrink-0" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#FF7A00]">
                        {getCategoryName(pro.category, language)}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                          {pro.rating}
                        </span>
                        <span>({pro.reviewCount} {t.reviews})</span>
                        <span className="text-slate-300">&bull;</span>
                        <span>{pro.experienceYears} {t.experience}</span>
                      </div>
                    </div>
                  </div>
                  {/* Availability Badge */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      pro.availabilityToday
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {pro.availabilityToday ? t.availableToday : 'Next Available'}
                  </span>
                </div>

                {/* Bio Snippet */}
                <p className="text-xs text-slate-600 mt-3.5 line-clamp-2 leading-relaxed">
                  {pro.bio}
                </p>

                {/* Service Areas */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {pro.city}: {pro.serviceAreas.join(', ')}
                  </span>
                </div>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {pro.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Price */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.startingFrom}</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ₹{pro.startingPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openProviderProfile(pro.id)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {t.viewProfile}
                  </button>
                  <button
                    onClick={() => startBookingForProvider(pro.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] active:bg-[#cc6200] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1 cursor-pointer"
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
