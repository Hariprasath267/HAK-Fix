import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getStatusLabel, getCategoryName } from '../../utils/translations.ts';
import { BookingStatus } from '../../types/index.ts';
import {
  Briefcase,
  CheckCircle2,
  Truck,
  Wrench,
  Clock,
  IndianRupee,
  Star,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const {
    providers,
    bookings,
    updateBookingStatus,
    toggleProviderAvailability,
    language,
  } = useApp();

  // Current logged in provider (Suresh Kumar, pro-1 for demo)
  const currentProvider = providers.find((p) => p.id === 'pro-1') || providers[0];
  const [activeTab, setActiveTab] = useState<'incoming' | 'active' | 'completed' | 'schedule'>(
    'incoming'
  );

  // Bookings assigned to THIS provider only
  const providerBookings = bookings.filter((b) => b.providerId === currentProvider.id);
  const incomingRequests = providerBookings.filter((b) => b.status === 'pending');
  const activeJobs = providerBookings.filter(
    (b) => b.status === 'accepted' || b.status === 'on_the_way' || b.status === 'in_progress'
  );
  const completedJobs = providerBookings.filter((b) => b.status === 'completed');

  // Stats
  const totalEarnings = completedJobs.reduce((acc, curr) => acc + curr.estimatedPrice, 0);
  const acceptanceRate = 96;

  const handleAcceptBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'accepted');
  };

  const handleRejectBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
  };

  const handleAdvanceJob = (bookingId: string, currentStatus: BookingStatus) => {
    if (currentStatus === 'accepted') {
      updateBookingStatus(bookingId, 'on_the_way');
    } else if (currentStatus === 'on_the_way') {
      updateBookingStatus(bookingId, 'in_progress');
    } else if (currentStatus === 'in_progress') {
      updateBookingStatus(bookingId, 'completed');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Provider Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentProvider.photoUrl}
              alt={currentProvider.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentProvider.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Partner
                </span>
              </div>
              <div className="text-xs font-semibold text-[#FF7A00] mt-0.5">
                {currentProvider.categoryName} &bull; {currentProvider.city} Hub
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                  {currentProvider.rating} ({currentProvider.reviewCount} reviews)
                </span>
                <span className="text-slate-300">&bull;</span>
                <span>{currentProvider.experienceYears} Years Trade Exp</span>
              </div>
            </div>
          </div>

          {/* Quick Availability Switch */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-900">Daily Availability</div>
              <div className="text-[11px] text-slate-500">
                {currentProvider.availabilityToday ? 'Accepting new bookings' : 'Shift offline'}
              </div>
            </div>
            <button
              onClick={() => toggleProviderAvailability(currentProvider.id)}
              className="text-[#FF7A00] hover:text-[#e66e00] transition-colors cursor-pointer"
              title="Toggle Online/Offline"
            >
              {currentProvider.availabilityToday ? (
                <ToggleRight className="w-10 h-10 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <IndianRupee className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              Total Earnings
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              ₹{totalEarnings + 14200}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">Itemized GST payout</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              Completed Jobs
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {currentProvider.completedJobsCount + completedJobs.length}
            </div>
            <span className="text-[10px] text-blue-600 font-medium">99.2% Satisfaction</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF7A00] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              Incoming Requests
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {incomingRequests.length}
            </div>
            <span className="text-[10px] text-orange-600 font-medium">Pending acceptance</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              Acceptance Rate
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {acceptanceRate}%
            </div>
            <span className="text-[10px] text-purple-600 font-medium">Top Tier Pro Badge</span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'incoming', label: `Incoming Requests (${incomingRequests.length})` },
            { id: 'active', label: `Active Work (${activeJobs.length})` },
            { id: 'completed', label: `Completed Jobs (${completedJobs.length})` },
            { id: 'schedule', label: 'Availability & Areas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0C2340] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Incoming Requests */}
        {activeTab === 'incoming' && (
          <div className="space-y-4">
            {incomingRequests.length > 0 ? (
              incomingRequests.map((bkg) => (
                <div
                  key={bkg.id}
                  className="bg-white rounded-3xl p-6 border-2 border-orange-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800">
                        {bkg.referenceId}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-orange-100 text-[#FF7A00] text-xs font-bold">
                        New Request
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">{bkg.serviceName}</h3>
                    <p className="text-xs text-slate-600">
                      <strong>Customer:</strong> {bkg.customerName} ({bkg.customerPhone})
                    </p>
                    <p className="text-xs text-slate-500">
                      <strong>Address:</strong> {bkg.address}, {bkg.city} - {bkg.pinCode}
                    </p>
                    <div className="text-xs text-slate-500">
                      <strong>Requested Slot:</strong> {bkg.date} ({bkg.timeSlot})
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700 italic border border-slate-200">
                      "{bkg.problemDescription}"
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Estimated Payout
                      </span>
                      <span className="text-xl font-extrabold text-emerald-600">
                        ₹{bkg.estimatedPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRejectBooking(bkg.id)}
                        className="px-3.5 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleAcceptBooking(bkg.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept Job</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">All caught up!</h3>
                <p className="text-xs text-slate-500">
                  No pending incoming requests at the moment. Keep your availability switch ON to receive
                  new customer bookings.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Active Work */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeJobs.length > 0 ? (
              activeJobs.map((bkg) => (
                <div
                  key={bkg.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800">
                        {bkg.referenceId}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                        {getStatusLabel(bkg.status, language).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">{bkg.serviceName}</h3>
                    <p className="text-xs text-slate-600">
                      <strong>Client:</strong> {bkg.customerName} &bull; {bkg.customerPhone}
                    </p>
                    <p className="text-xs text-slate-500">
                      <strong>Location:</strong> {bkg.address}, {bkg.city} - {bkg.pinCode}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Service Total
                      </span>
                      <span className="text-xl font-extrabold text-slate-900">₹{bkg.totalPrice}</span>
                    </div>
                    {bkg.status === 'accepted' && (
                      <button
                        onClick={() => handleAdvanceJob(bkg.id, bkg.status)}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Mark "On The Way"</span>
                      </button>
                    )}
                    {bkg.status === 'on_the_way' && (
                      <button
                        onClick={() => handleAdvanceJob(bkg.id, bkg.status)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Wrench className="w-4 h-4" />
                        <span>Arrived &amp; "Start Work"</span>
                      </button>
                    )}
                    {bkg.status === 'in_progress' && (
                      <button
                        onClick={() => handleAdvanceJob(bkg.id, bkg.status)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Complete Service &amp; Invoice</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
                <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No active work in progress</h3>
                <p className="text-xs text-slate-500">
                  Accept incoming requests above to begin appointments.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Completed Jobs */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedJobs.length > 0 ? (
              completedJobs.map((bkg) => (
                <div
                  key={bkg.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700">
                        {bkg.referenceId}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Completed &amp; Invoiced
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{bkg.serviceName}</h4>
                    <p className="text-xs text-slate-500">
                      Customer: {bkg.customerName} &bull; Completed on {bkg.date}
                    </p>
                    {bkg.review && (
                      <div className="text-xs text-amber-600 font-semibold flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>
                          {bkg.review.rating} Stars: "{bkg.review.comment}"
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-extrabold text-emerald-600">
                      + ₹{bkg.estimatedPrice}
                    </div>
                    <span className="text-[10px] text-slate-400">Settled to Bank</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No completed jobs yet</h3>
                <p className="text-xs text-slate-500">Completed jobs will appear here.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Availability & Service Areas */}
        {activeTab === 'schedule' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">Assigned Metro Areas</h3>
              <p className="text-xs text-slate-500">
                You receive automated dispatch notifications for customers residing within these PIN
                codes and localities:
              </p>
              <div className="space-y-2">
                {currentProvider.serviceAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between"
                  >
                    <span>{area}</span>
                    <span className="text-emerald-600 text-[11px]">Active (Within 8km)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">Standard Work Slots</h3>
              <p className="text-xs text-slate-500">
                Your preferred appointment schedule shown to customers during booking:
              </p>
              <div className="space-y-2">
                {currentProvider.availableSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center justify-between"
                  >
                    <span>{slot}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
