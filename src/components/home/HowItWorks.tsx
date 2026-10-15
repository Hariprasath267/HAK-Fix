import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations } from '../../utils/translations.ts';
import {
  Search,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { language, setIsAiFinderOpen, setCurrentPage } = useApp();
  const t = translations[language].howItWorks;

  const steps = [
    {
      num: '01',
      title: t.step1Title,
      desc: t.step1Desc,
      icon: Search,
      accent: 'from-blue-600 to-indigo-600',
    },
    {
      num: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      icon: CalendarCheck,
      accent: 'from-orange-500 to-amber-600',
    },
    {
      num: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      icon: ShieldCheck,
      accent: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#0C2340] font-bold text-xs uppercase tracking-wider">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-lg transition-all"
              >
                {/* Step number badge */}
                <span className="text-4xl font-extrabold text-slate-100 select-none absolute top-6 right-6">
                  {step.num}
                </span>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.accent} text-white flex items-center justify-center shadow-md mb-6`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#0C2340] via-[#102C52] to-[#0A1C33] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Have an immediate emergency repair?</h3>
            <p className="text-xs text-slate-300">
              Our 30-minute express dispatch is ready for sparking wires, heavy tap leaks, and AC breakdowns.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAiFinderOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
            >
              Ask AI Problem Finder
            </button>
            <button
              onClick={() => setCurrentPage('services')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors cursor-pointer"
            >
              Explore All Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
