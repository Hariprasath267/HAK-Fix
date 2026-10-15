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
  } = useApp();

  const provider =
    providers.find((p) => p.id === selectedProviderId) || providers[0] || null;

  if (!provider) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Professional Not Found</h2>
        <button
          onClick={() => setCurrentPage('services')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#FF7A00] text-white text-xs font-semibold cursor-pointer"
        >
          Return to Service Listings
        </button>
      </div>
    );
  }

  const categoryServices = services.filter((s) => s.category === provider.category);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back navigation */}
        <button
          onClick={() => setCurrentPage('services')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#FF7A00] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Specialists</span>
        </button>

        {/* Profile Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={provider.photoUrl}
                alt={provider.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-slate-200 shadow-md"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {provider.name}
                  </h1>
                  {provider.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Expert
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-[#FF7A00]">
                  {getCategoryName(provider.category, language)} &bull; {provider.city} Region
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center text-amber-500 font-bold">
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
            <div className="w-full md:w-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 shrink-0">
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                Indicative Inspection Rate
              </span>
              <div className="text-2xl font-extrabold text-slate-900">
                ₹{provider.startingPrice}
              </div>
              <button
                onClick={() => startBookingForProvider(provider.id)}
                className="w-full px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
              <div className="text-[10px] text-slate-500">
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
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-base text-slate-900">About the Professional</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {provider.bio}
              </p>
              {/* Skills Tags */}
              <div className="pt-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Specialized Skills &amp; Credentials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {provider.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-orange-50 text-[#FF7A00] text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What's Included vs Additional Charges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/60 rounded-3xl p-5 border border-emerald-200 space-y-2">
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

              <div className="bg-amber-50/60 rounded-3xl p-5 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Additional Charges Policy</span>
                </div>
                <p className="text-xs text-amber-950/90 leading-relaxed">
                  {provider.additionalChargesInfo}
                </p>
                <p className="text-[11px] text-amber-800 italic pt-1">
                  Technicians provide upfront quote before fitting replacement materials.
                </p>
              </div>
            </div>

            {/* Services Offered Rate Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">
                Services Offered &amp; Standard Rates
              </h3>
              <div className="space-y-2.5">
                {categoryServices.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-orange-300 transition-colors flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">{srv.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{srv.description}</div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Est. Duration: {srv.durationMinutes} minutes
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-extrabold text-slate-900">₹{srv.basePrice}</div>
                      <button
                        onClick={() => startBookingForProvider(provider.id, srv.id)}
                        className="mt-1 px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF7A00] text-xs font-bold transition-colors cursor-pointer"
                      >
                        Book This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">Customer Reviews</h3>
                <span className="text-xs font-semibold text-slate-500">
                  {provider.reviews.length} Verified Reviews
                </span>
              </div>
              <div className="space-y-3">
                {provider.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{rev.customerName}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 my-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
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
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF7A00]" />
                Available Slots Today / Tomorrow
              </h3>
              <div className="space-y-1.5">
                {provider.availableSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700 font-medium flex items-center justify-between"
                  >
                    <span>{slot}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas & Map */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF7A00]" />
                Service Areas in {provider.city}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {provider.serviceAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl font-medium"
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
