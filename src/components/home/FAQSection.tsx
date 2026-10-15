import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does HAK fix verify service professionals?',
      a: 'Every technician on HAK fix undergoes an 8-point vetting process: National ID verification (Aadhaar / Voter ID), physical address check, criminal background verification, minimum 4+ years trade experience check, and hands-on skill assessment with our technical inspectors.',
    },
    {
      q: 'How does transparent INR pricing work? Are there surprise charges?',
      a: 'Our rates are standardized based on the specific job required (e.g., tap leak fix starts at ₹299, switchboard repair at ₹249). The base inspection and labor fee are clearly displayed before you confirm. If any new replacement parts or heavy materials are needed, the technician will present an itemized catalog price for your approval before fitting anything.',
    },
    {
      q: 'Can I cancel or reschedule my booking?',
      a: 'Yes! You can cancel or reschedule any booking free of charge while it is in "Pending" or "Accepted" status directly from your "My Bookings" customer dashboard. Once a technician is "In Progress" on-site, cancellation is disabled.',
    },
    {
      q: 'What is the 30-Day Service Warranty?',
      a: 'We stand 100% behind the craftsmanship of our verified professionals. If the exact same issue reoccurs within 30 days of service completion, simply tap "Request Warranty Re-Inspection" in your dashboard or contact our 24/7 help desk. A technician will return and fix it at zero extra labor cost.',
    },
    {
      q: 'How does the "Describe Your Problem" AI Finder assist me?',
      a: 'If you are unsure whether an issue is plumbing, electrical, or appliance-related, you can type in natural everyday words (e.g., "water dripping from AC", "switchboard spark"). Our smart diagnostic engine analyzes your keywords, pinpoints the likely root cause, provides an instant estimated price range in INR, and presents essential safety tips.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkle className="w-3.5 h-3.5" />
            <span>Support &amp; Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 font-normal">
            Everything you need to know about booking, guarantees, and service safety.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="apple-card-3d bg-slate-50/60 rounded-2xl overflow-hidden transition-all border border-slate-200/70"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 bg-transparent hover:bg-slate-100/50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-900 tracking-tight">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0071E3]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white/70">
                    <p className="pt-3.5 font-normal">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
