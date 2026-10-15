import React from 'react';
import { useApp } from '../../context/AppContext.tsx';

export const HowItWorksPage: React.FC = () => {
  const { setIsBookingModalOpen } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#FF7A00] font-bold text-xs uppercase tracking-wider">
            Clear, Predictable, Reliable
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How HAK fix Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Booking a trusted tradesperson should take seconds, not hours of phone calls and guesswork.
          </p>
        </div>

        {/* Detailed 3-Step Walkthrough */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0C2340] text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
              1
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-lg text-slate-900">Choose Your Service or Use AI Diagnosis</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Browse our standardized catalog across Electrical, Plumbing, AC Repair, Cleaning, Carpentry, Appliance, Painting, and Pest Control. If you're not sure what went wrong, use our <strong>"Describe Your Problem"</strong> AI finder to get an instant root-cause analysis and estimated quote.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#FF7A00] text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
              2
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-lg text-slate-900">Select Verified Expert &amp; Convenient Slot</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review verified professional ratings, trade experience, customer testimonials, and transparent pricing. Choose Today (Express 30-min available), Tomorrow, or a weekend window that fits your schedule.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
              3
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="font-bold text-lg text-slate-900">Track Arrival, Inspect, &amp; Enjoy 30-Day Warranty</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Follow your technician's status live in real-time. The verified professional completes the repair using standard safety tools. Review the work, pay only after you are 100% satisfied, and enjoy automatic 30-day warranty protection.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-sm shadow-lg shadow-orange-500/25 cursor-pointer"
          >
            Ready? Book Your Service in 60 Seconds
          </button>
        </div>
      </div>
    </div>
  );
};
