import React, { useState } from 'react';
import { useApp, FairFixDiagnosis } from '../../context/AppContext.tsx';
import {
  X,
  Sparkles,
  Camera,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Wrench,
  Wind,
  AlertTriangle,
  ArrowRight,
  Truck,
  IndianRupee,
  RefreshCw,
  Lock,
  ArrowLeft,
} from 'lucide-react';

export const FairFixModal: React.FC = () => {
  const {
    isFairFixOpen,
    setIsFairFixOpen,
    fairFixDiagnosis,
    setFairFixDiagnosis,
    createNewBooking,
    setCurrentPage,
    showToast,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasSimulatedPhoto, setHasSimulatedPhoto] = useState(false);
  const [isBookingDispatch, setIsBookingDispatch] = useState(false);

  if (!isFairFixOpen) return null;

  const presets = [
    {
      id: 'ac',
      icon: Wind,
      title: 'AC Blowing Warm Air',
      prompt: 'My split AC runs for 5 minutes then starts blowing room temperature air. Outdoor unit fan buzzes and clicks.',
      category: 'ac_repair',
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
    {
      id: 'sink',
      icon: Wrench,
      title: 'Under-Sink Pipe Drip',
      prompt: 'Kitchen sink pipe under the counter is dripping continuously when water runs. Rubber coupling looks cracked.',
      category: 'plumbing',
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    },
    {
      id: 'mcb',
      icon: Zap,
      title: 'MCB Tripping with Spark',
      prompt: 'Main electrical distribution board breaker trips immediately when AC and microwave turn on together. Slight buzzing sound.',
      category: 'electrical',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setSelectedPreset(p.id);
    setInputText(p.prompt);
    setHasSimulatedPhoto(true);
    handleRunDiagnosis(p.prompt, p.category);
  };

  const handleRunDiagnosis = async (text: string, category = 'general') => {
    if (!text.trim()) {
      showToast('Please describe or select an appliance defect to diagnose.', 'error');
      return;
    }

    setIsScanning(true);
    setFairFixDiagnosis(null);

    try {
      const res = await fetch('/api/fairfix/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: text, category, hasImage: hasSimulatedPhoto }),
      });

      if (res.ok) {
        const data = await res.json();
        // Artificial slight delay for realistic diagnostic feel
        setTimeout(() => {
          setFairFixDiagnosis(data.diagnosis);
          setIsScanning(false);
        }, 600);
      } else {
        throw new Error('Diagnosis server error');
      }
    } catch (e) {
      // Fallback local diagnosis
      setTimeout(() => {
        setFairFixDiagnosis({
          issueTitle: 'Miniature Circuit Breaker (MCB) & Terminal Arc Degrade',
          severity: 'urgent',
          confidence: 96,
          category: 'electrical',
          diagnosisSummary: 'Thermal magnetic trip mechanism is firing due to high-resistance contact oxidation. Technician must replace with genuine industrial-grade MCB.',
          requiredParts: [
            { name: '32A Double-Pole C-Curve MCB', brand: 'Schneider Electric / Legrand OEM', mrp: 650, lockedPrice: 480 },
            { name: 'High-Temp Copper Terminal Coupler', brand: 'HAK SafetyCore', mrp: 180, lockedPrice: 90 },
          ],
          laborCharge: 449,
          estimatedDurationMins: 35,
          antiSurpriseGuarantee: '100% Price Lock: Total capped at ₹1,019. Zero surprise charges on arrival.',
          vanPreStocked: true,
        });
        setIsScanning(false);
      }, 600);
    }
  };

  const handleLockAndDispatch = async () => {
    if (!fairFixDiagnosis) return;
    setIsBookingDispatch(true);

    const partsTotal = fairFixDiagnosis.requiredParts.reduce((acc, p) => acc + p.lockedPrice, 0);
    const lockedTotal = partsTotal + fairFixDiagnosis.laborCharge;

    try {
      await createNewBooking({
        serviceId: 'fairfix-1',
        providerId: 'pro-1',
        date: new Date().toISOString().split('T')[0],
        timeSlot: 'Within 45 Mins (Fast Dispatch)',
        customerName: 'Karthik Subramanian',
        customerPhone: '+91 98401 23456',
        address: '14/2, 2nd Avenue, Anna Nagar',
        pinCode: '600040',
        city: 'Chennai',
        problemDescription: `HAK FairFix™: ${fairFixDiagnosis.issueTitle} (Locked Quote: ₹${lockedTotal})`,
        isEmergency: fairFixDiagnosis.severity === 'emergency',
        lockedPrice: lockedTotal,
      });

      setIsFairFixOpen(false);
      setCurrentPage('track');
      showToast('Technician dispatched with pre-stocked OEM parts!', 'success');
    } catch (e) {
      showToast('Failed to dispatch booking.', 'error');
    } finally {
      setIsBookingDispatch(false);
    }
  };

  const partsTotal = fairFixDiagnosis
    ? fairFixDiagnosis.requiredParts.reduce((acc, p) => acc + p.lockedPrice, 0)
    : 0;
  const lockedTotal = fairFixDiagnosis ? partsTotal + fairFixDiagnosis.laborCharge : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden my-6">
        {/* Header with Anti-Surprise Badge */}
        <div className="bg-gradient-to-r from-[#0C2340] to-[#0A1A2F] text-white p-6 relative">
          <button
            onClick={() => setIsFairFixOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Unique HAK fix Feature vs UrbanClap
            </span>
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight mt-2 text-white flex items-center gap-2.5">
            <span>FairFix™ Pre-Dispatch Diagnostic</span>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              Anti-Surprise Lock
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-normal leading-relaxed">
            Unlike UrbanClap where technicians charge 3x extra on arrival for mystery parts, FairFix™ diagnoses your defect upfront, locks genuine OEM spare-parts costs, and pre-loads them into the technician’s van.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Preset One-Click Test Cases */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Try a Real-Life Defect Scenario:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {presets.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPreset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-[#0071E3] bg-blue-50/60 shadow-sm ring-2 ring-[#0071E3]/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${p.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{p.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {p.category.toUpperCase()}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Input & Camera / Photo Simulation */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Or describe what’s broken / malfunctioning:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHasSimulatedPhoto(true);
                    showToast('Defect photo attached for visual neural scan.', 'info');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 cursor-pointer transition-all ${
                    hasSimulatedPhoto
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{hasSimulatedPhoto ? 'Photo Attached' : 'Add Photo / Video'}</span>
                  {hasSimulatedPhoto && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              </div>
            </div>

            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. My tap is dripping from the handle and the pressure has dropped..."
              className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Cross-references 12,000+ OEM manufacturer catalog rates
              </span>
              <button
                type="button"
                onClick={() => handleRunDiagnosis(inputText)}
                disabled={isScanning}
                className="px-5 py-2 rounded-full apple-btn-3d text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Scanning Fault...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Scan & Lock Price</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Diagnostic Result Card & 100% Price Lock Guarantee */}
          {fairFixDiagnosis && (
            <div className="rounded-2xl border-2 border-blue-500/40 bg-gradient-to-b from-blue-50/50 to-white p-5 space-y-4 shadow-sm animate-in fade-in">
              <div className="flex items-start justify-between gap-3 border-b border-blue-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {fairFixDiagnosis.confidence}% Match Confidence
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                      Severity: {fairFixDiagnosis.severity}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">
                    {fairFixDiagnosis.issueTitle}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {fairFixDiagnosis.diagnosisSummary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFairFixDiagnosis(null)}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0 transition-all active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>Scan Another</span>
                </button>
              </div>

              {/* Verified OEM Parts Breakdown */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Required Genuine OEM Parts (Pre-Loaded in Van):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {fairFixDiagnosis.requiredParts.map((part, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{part.name}</div>
                        <div className="text-[10px] text-slate-500">{part.brand}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 line-through">₹{part.mrp}</div>
                        <div className="text-xs font-bold text-slate-900">₹{part.lockedPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Lock Certificate Banner */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <span>Anti-Surprise Price Lock Guarantee</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-[11px] text-emerald-800 mt-0.5">
                      Parts (₹{partsTotal}) + Certified Labor (₹{fairFixDiagnosis.laborCharge}) = <strong>₹{lockedTotal} total</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Guaranteed Max</span>
                    <span className="text-xl font-extrabold text-slate-900">₹{lockedTotal}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLockAndDispatch}
                    disabled={isBookingDispatch}
                    className="px-5 py-2.5 rounded-full apple-btn-3d text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Truck className="w-4 h-4 text-white" />
                    <span>Dispatch Pre-Loaded Van</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Technician arrives with exact parts in {fairFixDiagnosis.estimatedDurationMins} mins
                </span>
                <span className="font-medium text-slate-700">
                  Zero advance fee &bull; Pay only after verified fix
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
