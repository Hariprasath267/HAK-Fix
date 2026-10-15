import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getStatusLabel, getCategoryName } from '../../utils/translations.ts';
import { BookingStatus } from '../../types/index.ts';
import { ServiceLocationMap } from '../map/ServiceLocationMap.tsx';
import {
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  ArrowLeft,
  FastForward,
  AlertCircle,
  Truck,
  Wrench,
} from 'lucide-react';

export const BookingTrackingPage: React.FC = () => {
  const {
    selectedBookingId,
    bookings,
    providers,
    setCurrentPage,
    advanceBookingStatusDemo,
    language,
    showToast,
  } = useApp();

  const booking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Booking Record Not Found</h2>
        <button
          onClick={() => setCurrentPage('my-bookings')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#FF7A00] text-white text-xs font-semibold cursor-pointer"
        >
          Back to My Bookings
        </button>
      </div>
    );
  }

  const assignedProvider = providers.find((p) => p.id === booking.providerId);

  const timelineSteps: Array<{
    status: BookingStatus;
    title: string;
    desc: string;
    icon: React.ElementType;
  }> = [
    {
      status: 'pending',
      title: 'Booking Request Received',
      desc: 'Order placed and dispatched to the nearest verified technician.',
      icon: Clock,
    },
    {
      status: 'accepted',
      title: 'Technician Assigned & Accepted',
      desc: `${booking.providerName} confirmed the job and scheduled arrival.`,
      icon: CheckCircle2,
    },
    {
      status: 'on_the_way',
      title: 'Technician On The Way',
      desc: 'Technician is en route with specialized diagnostic equipment.',
      icon: Truck,
    },
    {
      status: 'in_progress',
      title: 'Service In Progress',
      desc: 'Work is currently ongoing on-site. Safety protocols active.',
      icon: Wrench,
    },
    {
      status: 'completed',
      title: 'Job Completed & Verified',
      desc: 'Work successfully inspected. 30-day warranty now active.',
      icon: ShieldCheck,
    },
  ];

  const getStepIndex = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'accepted':
        return 1;
      case 'on_the_way':
        return 2;
      case 'in_progress':
        return 3;
      case 'completed':
        return 4;
      default:
        return -1;
    }
  };

  const currentIndex = getStepIndex(booking.status);
  const isCancelled = booking.status === 'cancelled';

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={() => setCurrentPage('my-bookings')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#FF7A00] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          {/* Demo Progression Control */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
              Demo Progression Tool:
            </span>
            <button
              onClick={() => advanceBookingStatusDemo(booking.id)}
              disabled={booking.status === 'completed' || isCancelled}
              className="px-3 py-1.5 rounded-xl bg-[#0C2340] hover:bg-[#102C52] disabled:opacity-40 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Simulates live technician progress through the states"
            >
              <FastForward className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Advance Status (Next Step)</span>
            </button>
          </div>
        </div>

        {/* Live Status Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Live Service Status
              </span>
              <div className="flex items-center gap-2.5 mt-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {booking.serviceName}
                </h1>
                <span className="px-2.5 py-1 rounded-xl font-mono text-xs font-bold bg-orange-50 text-[#FF7A00] border border-orange-200">
                  {booking.referenceId}
                </span>
              </div>
            </div>
            {/* Status Pill */}
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Current Phase
              </span>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold inline-block ${
                  isCancelled
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-orange-100 text-[#FF7A00] border border-orange-300'
                }`}
              >
                {getStatusLabel(booking.status, language).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Visual Status Timeline */}
          {isCancelled ? (
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-900">
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">This booking has been cancelled</h4>
                <p className="text-xs text-rose-800 mt-1">
                  Reason: {booking.cancellationReason || 'User requested cancellation before dispatch.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
                <div
                  className="hidden md:block absolute top-1/2 left-0 h-1 bg-[#FF7A00] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${(currentIndex / 4) * 100}%` }}
                />
                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                  {timelineSteps.map((step, idx) => {
                    const Icon = step.icon;
                    const isDone = idx < currentIndex;
                    const isCurrent = idx === currentIndex;
                    return (
                      <div
                        key={step.status}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-orange-50/80 border-[#FF7A00] shadow-md ring-2 ring-orange-500/20'
                            : isDone
                            ? 'bg-white border-emerald-300'
                            : 'bg-white/60 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                              isCurrent
                                ? 'bg-[#FF7A00] text-white'
                                : isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              isCurrent
                                ? 'text-[#FF7A00]'
                                : isDone
                                ? 'text-emerald-600'
                                : 'text-slate-400'
                            }`}
                          >
                            Step {idx + 1}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900">{step.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Assigned Technician Contact & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Technician Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Assigned Local Specialist
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={booking.providerPhoto}
                  alt={booking.providerName}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900">{booking.providerName}</h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xs font-semibold text-[#FF7A00]">
                    {getCategoryName(booking.category, language)}
                  </span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Phone: {booking.providerPhone}
                  </div>
                </div>
              </div>
              {/* Call action */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Calling technician ${booking.providerName} at ${booking.providerPhone}`, 'info');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#0C2340] hover:bg-[#102C52] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>Call Technician</span>
                </button>
              </div>
            </div>

            {/* Appointment & Location Info */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Scheduled Details
              </span>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-slate-500">Date &amp; Slot:</span>
                <span className="font-bold text-slate-900">
                  {booking.date} ({booking.timeSlot})
                </span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="text-slate-500">Service Address:</span>
                <span className="font-semibold text-slate-900 text-right max-w-[200px] truncate">
                  {booking.address}, {booking.city}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 font-bold">Total Estimated (Pay Post-Work):</span>
                <span className="text-base font-extrabold text-emerald-600">
                  ₹{booking.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Map Route / Service Area */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Dispatch Area Map &bull; Live Metro Tracking
            </span>
            <ServiceLocationMap
              centerLat={assignedProvider?.coordinates?.lat || 13.0418}
              centerLng={assignedProvider?.coordinates?.lng || 80.2341}
              markers={[
                {
                  id: 'customer-pin',
                  lat: assignedProvider ? assignedProvider.coordinates.lat + 0.008 : 13.0498,
                  lng: assignedProvider ? assignedProvider.coordinates.lng + 0.005 : 80.2391,
                  title: 'Your Service Address',
                  subtitle: `${booking.address}`,
                  isPrimary: true,
                },
                {
                  id: 'tech-pin',
                  lat: assignedProvider ? assignedProvider.coordinates.lat : 13.0418,
                  lng: assignedProvider ? assignedProvider.coordinates.lng : 80.2341,
                  title: `${booking.providerName} (Technician Base)`,
                  subtitle: `Active Hub`,
                  isPrimary: false,
                },
              ]}
              className="h-64 w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
