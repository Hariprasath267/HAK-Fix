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
  ChevronRight,
  ShieldCheck,
  User,
  Plus,
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
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'on_the_way':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'in_progress':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300 animate-pulse';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0C2340] text-white flex items-center justify-center font-bold text-xl shadow-md">
              <User className="w-7 h-7 text-[#FF7A00]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
                Customer Dashboard
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Welcome back, {currentUser.name}!
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your appointments, track real-time technician arrival, and view warranty history.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-orange-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Service</span>
          </button>
        </div>

        {/* Tab Filters */}
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
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0C2340] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((bkg) => {
              const cancelCheck = canCancelBooking(bkg.status);
              return (
                <div
                  key={bkg.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left: Booking Details */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-xl font-mono text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {bkg.referenceId}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                          bkg.status
                        )}`}
                      >
                        {getStatusLabel(bkg.status, language)}
                      </span>
                      <span className="text-xs text-[#FF7A00] font-semibold">
                        {getCategoryName(bkg.category, language)}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-slate-900">{bkg.serviceName}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        Problem: {bkg.problemDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
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
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                        <strong>Cancelled Reason:</strong> {bkg.cancellationReason}
                      </div>
                    )}

                    {bkg.review && (
                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950">
                        <div className="flex items-center gap-1 text-amber-500 font-bold mb-0.5">
                          {[...Array(bkg.review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                          <span className="text-[11px] text-amber-900 ml-1">Your Verified Review:</span>
                        </div>
                        <p className="italic">"{bkg.review.comment}"</p>
                      </div>
                    )}
                  </div>

                  {/* Right: Pricing & Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Estimated Total (INR)
                      </span>
                      <span className="text-xl font-extrabold text-slate-900">
                        ₹{bkg.totalPrice}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => openBookingTracking(bkg.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#0C2340] hover:bg-[#102C52] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Track Status</span>
                      </button>

                      {cancelCheck.allowed && (
                        <button
                          onClick={() => setCancelModalBookingId(bkg.id)}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}

                      {bkg.status === 'completed' && !bkg.review && (
                        <button
                          onClick={() => setReviewModalBookingId(bkg.id)}
                          className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-[#FF7A00] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
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
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
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
              className="px-4 py-2 rounded-xl bg-[#FF7A00] text-white text-xs font-semibold shadow-md cursor-pointer"
            >
              Book a Service Now
            </button>
          </div>
        )}

        {/* Cancellation Reason Modal */}
        {cancelModalBookingId && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
              <h3 className="font-bold text-base text-slate-900">Cancel Appointment</h3>
              <p className="text-xs text-slate-500">
                Please select the reason for cancelling this booking. Free cancellation applies while
                in pending or accepted status.
              </p>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
              >
                <option value="Change of personal schedule">Change of personal schedule</option>
                <option value="Issue resolved by self">Issue resolved by self</option>
                <option value="Booked another technician">Booked another technician</option>
                <option value="Emergency resolved">Emergency resolved</option>
                <option value="Price concerns">Price concerns</option>
              </select>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setCancelModalBookingId(null)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelSubmit}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rating & Review Modal */}
        {reviewModalBookingId && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
              <h3 className="font-bold text-base text-slate-900">Rate &amp; Review Technician</h3>
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setReviewModalBookingId(null)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSubmit}
                  disabled={!reviewComment.trim()}
                  className="px-4 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] disabled:opacity-50 text-white text-xs font-bold shadow-md cursor-pointer"
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
