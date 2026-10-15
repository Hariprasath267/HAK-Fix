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
  ArrowLeft,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#0C2340] text-white p-7 relative border-b border-white/10">
          <button
            onClick={() => setIsAiFinderOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#0071E3] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              {t.badge}
            </span>
            <span className="text-xs text-blue-200 font-medium">Apple Neural Engine</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{t.title}</h3>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-1 font-normal">{t.subtitle}</p>
        </div>

        {/* Modal Body */}
        <div className="p-7 space-y-5">
          {/* Input & Quick Chips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Describe What Happened:
            </label>
            <div className="relative">
              <textarea
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={t.inputPlaceholder}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-[#0071E3] focus:border-[#0071E3] text-sm text-slate-900 placeholder:text-slate-400 resize-none shadow-inner"
              />
              <button
                onClick={() => handleDiagnose()}
                disabled={!inputQuery.trim() || isAnalyzing}
                className="absolute bottom-3 right-3 px-4 py-2 rounded-full apple-btn-3d disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer"
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
            <div className="mt-3">
              <span className="text-[11px] font-medium text-slate-500 mr-1.5">Try sample:</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputQuery(prompt);
                      handleDiagnose(prompt);
                    }}
                    className="text-[11px] text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-[#0071E3] border border-slate-200/80 px-3 py-1 rounded-full transition-colors text-left cursor-pointer"
                  >
                    "{prompt.slice(0, 38)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnosis Result Card */}
          {diagnosis && (
            <div className="border border-blue-100/80 rounded-3xl bg-blue-50/40 p-5 sm:p-6 space-y-4 animate-in fade-in">
              {/* Category & Urgency Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-blue-100">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    {t.diagnosedCategory}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-base text-slate-900 tracking-tight">
                      {diagnosis.categoryTitle}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0071E3] text-xs font-semibold">
                      {diagnosis.confidence}% Match
                    </span>
                  </div>
                </div>
                {/* Urgency Pill */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    diagnosis.urgency === 'high'
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#0071E3]" />
                    {t.recommendedFix}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {diagnosis.recommendedService}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                    {t.costEstimate}
                  </span>
                  <p className="text-sm font-bold text-emerald-600 mt-1">
                    ₹{diagnosis.estimatedCostRange.min} - ₹{diagnosis.estimatedCostRange.max}
                    <span className="text-[11px] font-normal text-slate-500 ml-1">
                      (standard scope)
                    </span>
                  </p>
                </div>
              </div>

              {/* Clarifying Questions */}
              <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 space-y-2">
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
              <div className="bg-amber-50/70 p-4.5 rounded-2xl border border-amber-200/80 space-y-2">
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDiagnosis(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-500" />
                  <span>Back to Problem Input</span>
                </button>
                <button
                  onClick={handleProceedToBooking}
                  className="w-full sm:flex-1 py-3 px-5 rounded-full apple-btn-3d text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
                >
                  <span>{t.proceedToBook}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
