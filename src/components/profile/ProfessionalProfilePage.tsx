import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getCategoryName } from '../../utils/translations.ts';
import { ServiceLocationMap } from '../map/ServiceLocationMap.tsx';
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

export const ProfessionalProfilePage: React.FC = () => {
  const {
    selectedProviderId,
    providers,
    services,
    setCurrentPage,
    startBookingForProvider,
    language,
    goBack,
    getBackTitle,
  } = useApp();

  const provider =
    providers.find((p) => p.id === selectedProviderId) || providers[0] || null;

  if (!provider) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Professional Not Found</h2>
        <button
          onClick={goBack}
          className="mt-4 px-5 py-2.5 rounded-full btn-3d-primary text-xs"
        >
          {getBackTitle()}
        </button>
      </div>
    );
  }

  const categoryServices = services.filter((s) => s.category === provider.category);

  return (
    <div className="min-h-screen py-10 sm:py-16 subtle-photo-backdrop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Back navigation */}
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#0071E3]" />
          <span>{getBackTitle()}</span>
        </button>

        {/* Profile Hero Card */}
        <div className="apple-glass rounded-[2.5rem] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={provider.photoUrl}
                alt={provider.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-white/80 shadow-md"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {provider.name}
                  </h1>
                  {provider.isVerified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Expert
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-[#0071E3]">
                  {getCategoryName(provider.category, language)} &bull; {provider.city} Region
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1 font-normal">
                  <span className="flex items-center text-amber-500 font-semibold">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    {provider.rating} ({provider.reviewCount} reviews)
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    {provider.experienceYears} Years Experience
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-emerald-700 font-semibold">
                    {provider.completedJobsCount}+ Jobs Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Sticky CTA Box */}
            <div className="w-full md:w-auto p-5 rounded-3xl bg-white/90 border border-slate-200/80 shadow-sm text-center space-y-2.5 shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                Indicative Inspection Rate
              </span>
              <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                ₹{provider.startingPrice}
              </div>
              <button
                onClick={() => startBookingForProvider(provider.id)}
                className="w-full px-6 py-2.5 rounded-full btn-3d-primary text-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <div className="text-[11px] text-slate-500 font-medium">
                {provider.availabilityToday ? '✓ Available Today' : '✓ Book for Tomorrow'}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Details: Left Content + Right Side Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Bio */}
            <div className="apple-card-3d p-6 sm:p-7 space-y-3.5">
              <h3 className="font-bold text-base text-slate-900 tracking-tight">About the Professional</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {provider.bio}
              </p>
              {/* Skills Tags */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Specialized Skills &amp; Credentials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {provider.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-blue-50 text-[#0071E3] text-xs font-medium border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What's Included vs Additional Charges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/60 rounded-3xl p-5 border border-emerald-200/70 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>What the Fee Includes</span>
                </div>
                <ul className="space-y-1.5 text-xs text-emerald-950 pl-2">
                  {provider.includedInPrice.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/60 rounded-3xl p-5 border border-amber-200/70 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Additional Charges Policy</span>
                </div>
                <p className="text-xs text-amber-950/90 leading-relaxed font-normal">
                  {provider.additionalChargesInfo}
                </p>
                <p className="text-[11px] text-amber-800 italic pt-1">
                  Technicians provide upfront quote before fitting replacement materials.
                </p>
              </div>
            </div>

            {/* Services Offered Rate Card */}
            <div className="apple-card-3d p-6 sm:p-7 space-y-4">
              <h3 className="font-bold text-base text-slate-900 tracking-tight">
                Services Offered &amp; Standard Rates
              </h3>
              <div className="space-y-2.5">
                {categoryServices.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl border border-slate-200/80 hover:border-[#0071E3]/50 transition-colors flex items-center justify-between gap-4 bg-white/70"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">{srv.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5 font-normal">{srv.description}</div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Est. Duration: {srv.durationMinutes} minutes
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-extrabold text-slate-900">₹{srv.basePrice}</div>
                      <button
                        onClick={() => startBookingForProvider(provider.id, srv.id)}
                        className="mt-1 px-3 py-1 rounded-full btn-3d-secondary text-xs text-[#0071E3]"
                      >
                        Book This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="apple-card-3d p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900 tracking-tight">Customer Reviews</h3>
                <span className="text-xs font-semibold text-slate-500">
                  {provider.reviews.length} Verified Reviews
                </span>
              </div>
              <div className="space-y-3">
                {provider.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{rev.customerName}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 my-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic font-normal">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Coverage Areas, Slots, & Interactive Map */}
          <div className="space-y-6">
            {/* Available Slots */}
            <div className="apple-card-3d p-6 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0071E3]" />
                Available Slots Today / Tomorrow
              </h3>
              <div className="space-y-1.5">
                {provider.availableSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700 font-medium flex items-center justify-between border border-slate-200/50"
                  >
                    <span>{slot}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas & Map */}
            <div className="apple-card-3d p-6 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0071E3]" />
                Service Areas in {provider.city}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {provider.serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl font-medium border border-slate-200/40"
                  >
                    {area}
                  </span>
                ))}
              </div>

              {/* Map Preview */}
              <ServiceLocationMap
                centerLat={provider.coordinates.lat}
                centerLng={provider.coordinates.lng}
                markers={[
                  {
                    id: provider.id,
                    lat: provider.coordinates.lat,
                    lng: provider.coordinates.lng,
                    title: provider.name,
                    subtitle: `${provider.categoryName} • Active Hub`,
                    isPrimary: true,
                  },
                ]}
                className="h-56 w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
