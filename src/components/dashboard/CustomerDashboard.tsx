import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getStatusLabel, getCategoryName } from '../../utils/translations.ts';
import { BookingStatus } from '../../types/index.ts';
import { canCancelBooking } from '../../utils/bookingRules.ts';
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Eye,
  CheckCircle2,
  AlertTriangle,
  User,
  Plus,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    bookings,
    currentUser,
    language,
    openBookingTracking,
    cancelBooking,
    submitReview,
    setIsBookingModalOpen,
    goBack,
    getBackTitle,
  } = useApp();

  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('all');
  const [cancelModalBookingId, setCancelModalBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of schedule');
  const [reviewModalBookingId, setReviewModalBookingId] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Filter user bookings
  const userBookings = bookings.filter((b) => b.customerId === currentUser.id);
  const filteredBookings =
    activeTab === 'all'
      ? userBookings
      : userBookings.filter((b) => b.status === activeTab);

  const handleCancelSubmit = () => {
    if (!cancelModalBookingId) return;
    cancelBooking(cancelModalBookingId, cancelReason);
    setCancelModalBookingId(null);
  };

  const handleReviewSubmit = () => {
    if (!reviewModalBookingId) return;
    submitReview(reviewModalBookingId, reviewRating, reviewComment);
    setReviewModalBookingId(null);
    setReviewComment('');
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-700 border-amber-500/25 shadow-xs';
      case 'accepted':
        return 'bg-blue-500/10 text-[#0071E3] border-blue-500/25 shadow-xs';
      case 'on_the_way':
        return 'bg-purple-500/10 text-purple-700 border-purple-500/25 shadow-xs';
      case 'in_progress':
        return 'bg-indigo-500/10 text-indigo-700 border-indigo-500/25 shadow-xs animate-pulse';
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/25 shadow-xs';
      case 'cancelled':
        return 'bg-rose-500/10 text-rose-700 border-rose-500/25 shadow-xs';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="ambient-mesh-bg min-h-screen py-10 sm:py-16 relative">
      {/* Decorative ambient blurred orb */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        {/* Back navigation */}
        <div>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#0071E3]" />
            <span>{getBackTitle()}</span>
          </button>
        </div>

        {/* Apple-style Elevated Header */}
        <div className="apple-glass rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0C2340] to-[#1E3A8A] text-white flex items-center justify-center font-bold text-xl shadow-[0_8px_16px_rgba(12,35,64,0.25)]">
              <User className="w-7 h-7 text-[#2997FF]" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3]">
                Customer Account
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentUser.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
                Manage your appointments, track real-time arrival, and view 30-day warranty history.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="self-start md:self-auto px-5 py-2.5 rounded-full apple-btn-3d text-white font-semibold text-xs flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Service</span>
          </button>
        </div>

        {/* Apple-style Filter Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Bookings' },
            { id: 'pending', label: 'Pending' },
            { id: 'accepted', label: 'Accepted' },
            { id: 'on_the_way', label: 'On the Way' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md font-semibold'
                  : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200/80 shadow-xs'
              }`}
            >
              {tab.label}
              {tab.id !== 'all' && (
                <span className="ml-1.5 opacity-80 text-[10px]">
                  ({userBookings.filter((b) => b.status === tab.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings List - Transformed with Apple 3D depth */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((bkg) => {
              const cancelCheck = canCancelBooking(bkg.status);
              return (
                <div
                  key={bkg.id}
                  className="apple-card-3d bg-white/85 backdrop-blur-xl rounded-[2rem] p-6 sm:p-7 border border-white/90 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left: Booking Details */}
                  <div className="space-y-3.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-xl font-mono text-xs font-semibold bg-slate-100/90 text-slate-700 border border-slate-200/60 shadow-inner">
                        {bkg.referenceId}
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                          bkg.status
                        )}`}
                      >
                        {getStatusLabel(bkg.status, language)}
                      </span>
                      <span className="text-xs text-[#0071E3] font-semibold capitalize">
                        {getCategoryName(bkg.category, language)}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                        {bkg.serviceName}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5 line-clamp-1 font-normal">
                        Problem: {bkg.problemDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {bkg.date} ({bkg.timeSlot})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          Tech: <strong>{bkg.providerName}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{bkg.city} - {bkg.pinCode}</span>
                      </div>
                    </div>

                    {bkg.cancellationReason && (
                      <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/70 text-xs text-rose-800">
                        <strong>Cancelled Reason:</strong> {bkg.cancellationReason}
                      </div>
                    )}

                    {bkg.review && (
                      <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-950">
                        <div className="flex items-center gap-1 text-amber-500 font-bold mb-0.5">
                          {[...Array(bkg.review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                          <span className="text-[11px] text-amber-900 ml-1 font-medium">Your Verified Review:</span>
                        </div>
                        <p className="italic">"{bkg.review.comment}"</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Pricing & 3D Tactile Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                        Estimated Total (INR)
                      </span>
                      <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        ₹{bkg.totalPrice}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => openBookingTracking(bkg.id)}
                        className="px-4 py-2 rounded-full apple-btn-3d text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Track Status</span>
                      </button>

                      {cancelCheck.allowed && (
                        <button
                          onClick={() => setCancelModalBookingId(bkg.id)}
                          className="px-4 py-2 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-semibold border border-slate-200/80 transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}

                      {bkg.status === 'completed' && !bkg.review && (
                        <button
                          onClick={() => setReviewModalBookingId(bkg.id)}
                          className="px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>Leave Review</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="apple-glass rounded-[2rem] p-12 text-center border border-white/80 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0071E3] flex items-center justify-center mx-auto shadow-inner">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No appointments in this view</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                You do not have any bookings under the "{activeTab}" filter. You can book an appointment
                with any top-rated technician anytime.
              </p>
            </div>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2.5 rounded-full apple-btn-3d text-white text-xs font-semibold shadow-md cursor-pointer"
            >
              Book a Service Now
            </button>
          </div>
        )}

        {/* Cancellation Reason Modal */}
        {cancelModalBookingId && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200/80 shadow-2xl space-y-4">
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">Cancel Appointment</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Please select the reason for cancelling this booking. Free cancellation applies while
                in pending or accepted status.
              </p>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
              >
                <option value="Change of personal schedule">Change of personal schedule</option>
                <option value="Issue resolved by self">Issue resolved by self</option>
                <option value="Booked another technician">Booked another technician</option>
                <option value="Emergency resolved">Emergency resolved</option>
                <option value="Price concerns">Price concerns</option>
              </select>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setCancelModalBookingId(null)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelSubmit}
                  className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rating & Review Modal */}
        {reviewModalBookingId && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200/80 shadow-2xl space-y-4">
              <h3 className="font-bold text-lg text-slate-900 tracking-tight">Rate &amp; Review Technician</h3>
              <p className="text-xs text-slate-500">
                Your feedback helps the community discover trustworthy local service providers.
              </p>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rating:</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating ? 'fill-amber-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {reviewRating} out of 5
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Review:</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us about the technician's punctuality, skill, cleanliness, and price transparency..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setReviewModalBookingId(null)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSubmit}
                  disabled={!reviewComment.trim()}
                  className="px-5 py-2 rounded-full apple-btn-3d disabled:opacity-50 text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
