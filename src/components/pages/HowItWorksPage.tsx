import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Sparkles, Calendar, ShieldCheck, ArrowLeft } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setIsBookingModalOpen, setIsFairFixOpen, goBack, getBackTitle } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14 subtle-photo-backdrop">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Back navigation */}
        <div>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#0071E3]" />
            <span>{getBackTitle()}</span>
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#0071E3] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Clear, Predictable, Reliable
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How HAK fix Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Booking a trusted tradesperson should take seconds, not hours of phone calls, guesswork, or surprise repair bills.
          </p>
        </div>

        {/* Detailed 3-Step Walkthrough */}
        <div className="space-y-6">
          <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0C2340] text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
              1
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-lg text-slate-900">Choose Service or FairFix™ Pre-Dispatch Scan</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Browse our standardized catalog across Electrical, Plumbing, AC Repair, Cleaning, Carpentry, Appliance, Painting, and Pest Control. With our exclusive <strong>FairFix™ Pre-Dispatch Scanner</strong>, you can scan your defect upfront to lock in genuine OEM spare parts pricing before technician dispatch.
              </p>
            </div>
          </div>

          <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0071E3] text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
              2
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-lg text-slate-900">Select Verified Expert with Pre-Stocked Van</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review verified professional ratings, trade certifications, customer testimonials, and transparent price locks. The technician arrives with required replacement parts pre-loaded in their service vehicle.
              </p>
            </div>
          </div>

          <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
              3
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-lg text-slate-900">Track Arrival, Inspect, &amp; Enjoy 30-Day Guarantee</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Follow your technician's status live in real-time. Review the completed repair, pay only after you are 100% satisfied, and enjoy automatic 30-day warranty protection.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-3 rounded-full apple-btn-3d text-white font-bold text-sm shadow-lg cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Service in 60 Seconds</span>
          </button>
          <button
            onClick={() => setIsFairFixOpen(true)}
            className="px-6 py-3 rounded-full btn-3d-secondary text-slate-800 font-bold text-sm shadow-sm cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#0071E3]" />
            <span>Try FairFix™ Diagnostic Scanner</span>
          </button>
        </div>
      </div>
    </div>
  );
};
