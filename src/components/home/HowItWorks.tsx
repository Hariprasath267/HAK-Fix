import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations } from '../../utils/translations.ts';
import {
  Search,
  CalendarCheck,
  ShieldCheck,
  Sparkle,
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
      accent: 'from-[#0071E3] to-[#2997FF]',
    },
    {
      num: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      icon: CalendarCheck,
      accent: 'from-indigo-600 to-sky-500',
    },
    {
      num: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      icon: ShieldCheck,
      accent: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section className="py-20 sm:py-24 ambient-mesh-bg border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkle className="w-3.5 h-3.5" />
            <span>Seamless Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 font-normal">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="apple-card-3d relative bg-white/85 backdrop-blur-xl rounded-[2rem] p-7 sm:p-8 border border-white/90"
              >
                {/* Step number badge */}
                <span className="text-5xl font-black text-slate-100 select-none absolute top-6 right-6">
                  {step.num}
                </span>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.accent} text-white flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 3D Glass Banner CTA */}
        <div className="mt-14 rounded-[2rem] apple-glass-dark p-7 sm:p-9 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Have an immediate emergency repair?</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Our 30-minute express dispatch is ready for sparking wires, heavy tap leaks, and AC breakdowns.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAiFinderOpen(true)}
              className="px-6 py-3 rounded-full apple-btn-3d text-white font-semibold text-xs cursor-pointer shadow-md"
            >
              Ask AI Problem Finder
            </button>
            <button
              onClick={() => setCurrentPage('services')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all cursor-pointer"
            >
              Explore All Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
