import React from 'react';
import {
  ShieldCheck,
  IndianRupee,
  Clock,
  ThumbsUp,
  Award,
  Headphones,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: '100% Background-Verified Experts',
      desc: 'Government ID verification, police criminal background checks, and trade licensing verified for every technician.',
    },
    {
      icon: IndianRupee,
      title: 'Transparent Standard INR Rate Cards',
      desc: 'No hidden surge pricing or arbitrary technician bargaining. Pre-approved rate cards with itemized tax invoices.',
    },
    {
      icon: Award,
      title: '30-Day Post-Service Warranty',
      desc: 'If the exact same issue re-occurs within 30 days of completion, our technician will re-inspect and fix it free of charge.',
    },
    {
      icon: Clock,
      title: 'Punctual & Rapid Dispatch',
      desc: 'Real-time arrival tracking. Over 96% of appointments commence within the confirmed 2-hour arrival window.',
    },
    {
      icon: ThumbsUp,
      title: 'Genuine OEM Replacement Spares',
      desc: 'Original brand components used for AC, refrigerator, washing machine, and electrical repairs with warranty cards.',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Help Desk',
      desc: 'Real support specialists available via phone and chat to mediate any questions, adjustments, or rescheduling.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#FF7A00] font-bold text-xs uppercase tracking-wider">
            Why Choose HAK fix
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Setting the Benchmark for On-Demand Home Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            We eliminate the anxiety of finding reliable tradesmen with standardized quality controls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF7A00] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
