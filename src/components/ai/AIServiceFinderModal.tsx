import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations } from '../../utils/translations.ts';
import { diagnoseProblem } from '../../utils/aiServiceEngine.ts';
import { AIServiceDiagnosis } from '../../types/index.ts';
import {
  Sparkles,
  X,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Send,
  Wrench,
  IndianRupee,
} from 'lucide-react';

export const AIServiceFinderModal: React.FC = () => {
  const {
    isAiFinderOpen,
    setIsAiFinderOpen,
    language,
    setSelectedCategory,
    startBookingForProvider,
    providers,
    services,
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [diagnosis, setDiagnosis] = useState<AIServiceDiagnosis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const t = translations[language].aiFinder;

  if (!isAiFinderOpen) return null;

  const samplePrompts = [
    'My kitchen tap is leaking water under the sink',
    'Main bedroom switchboard sparking and MCB tripping',
    'AC blowing warm air and outdoor unit is vibrating',
    'Main front door lock is jammed and scraping floor',
    'Cockroach infestation behind refrigerator and kitchen cabinets',
  ];

  const handleDiagnose = (queryToUse?: string) => {
    const text = queryToUse !== undefined ? queryToUse : inputQuery;
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = diagnoseProblem(text);
      setDiagnosis(result);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleProceedToBooking = () => {
    if (!diagnosis) return;
    setIsAiFinderOpen(false);
    const matchedProvider =
      providers.find((p) => p.category === diagnosis.matchedCategory) || providers[0];
    const matchedService =
      services.find((s) => s.category === diagnosis.matchedCategory) || services[0];
    setSelectedCategory(diagnosis.matchedCategory);
    startBookingForProvider(matchedProvider.id, matchedService.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0C2340] via-[#102C52] to-[#0A1C33] p-6 text-white relative">
          <button
            onClick={() => setIsAiFinderOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-[#FF7A00] text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              {t.badge}
            </span>
            <span className="text-xs text-blue-200 font-medium">NLP Diagnostics Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h3>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1">{t.subtitle}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Input & Quick Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Describe What Happened:
            </label>
            <div className="relative">
              <textarea
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={t.inputPlaceholder}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm text-slate-900 placeholder:text-slate-400 resize-none"
              />
              <button
                onClick={() => handleDiagnose()}
                disabled={!inputQuery.trim() || isAnalyzing}
                className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.diagnoseBtn}</span>
                  </>
                )}
              </button>
            </div>
            {/* Quick Sample Chips */}
            <div className="mt-2.5">
              <span className="text-[11px] font-medium text-slate-500 mr-1.5">Try sample:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputQuery(prompt);
                      handleDiagnose(prompt);
                    }}
                    className="text-[11px] text-slate-600 bg-slate-100 hover:bg-orange-50 hover:text-[#FF7A00] border border-slate-200 px-2.5 py-1 rounded-lg transition-colors text-left cursor-pointer"
                  >
                    "{prompt.slice(0, 38)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnosis Result Card */}
          {diagnosis && (
            <div className="border border-orange-100 rounded-2xl bg-orange-50/40 p-5 space-y-4 animate-in fade-in">
              {/* Category & Urgency Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-orange-100">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    {t.diagnosedCategory}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-base text-slate-900">
                      {diagnosis.categoryTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-100 text-[#FF7A00] text-xs font-bold">
                      {diagnosis.confidence}% Match
                    </span>
                  </div>
                </div>
                {/* Urgency Pill */}
                <div
                  className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    diagnosis.urgency === 'high'
                      ? 'bg-rose-100 text-rose-700 border border-rose-300'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                  }`}
                >
                  {diagnosis.urgency === 'high' ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{diagnosis.urgencyText}</span>
                </div>
              </div>

              {/* Recommended Service & Estimated Cost */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-blue-600" />
                    {t.recommendedFix}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {diagnosis.recommendedService}
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                    {t.costEstimate}
                  </span>
                  <p className="text-sm font-bold text-emerald-600 mt-1">
                    ₹{diagnosis.estimatedCostRange.min} - ₹{diagnosis.estimatedCostRange.max}
                    <span className="text-[11px] font-normal text-slate-500 ml-1">
                      (based on standard job)
                    </span>
                  </p>
                </div>
              </div>

              {/* Clarifying Questions */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  {t.clarifyingQ}
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 pl-5 list-disc">
                  {diagnosis.clarifyingQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

              {/* Pre-Visit Checklist */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 space-y-2">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  {t.preVisitSafety}
                </span>
                <ul className="space-y-1 text-xs text-amber-900/90 pl-5 list-disc">
                  {diagnosis.preVisitTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-slate-500 italic">{t.disclaimer}</p>

              {/* Action Button */}
              <button
                onClick={handleProceedToBooking}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{t.proceedToBook}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
