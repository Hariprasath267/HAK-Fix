import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations } from '../../utils/translations.ts';
import {
  calculatePricing,
  validateBookingForm,
} from '../../utils/bookingRules.ts';
import { ServiceCategory } from '../../types/index.ts';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Wrench,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Info,
} from 'lucide-react';

export const BookingFlowModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    services,
    providers,
    selectedProviderId,
    selectedCategory,
    currentUser,
    createNewBooking,
    openBookingTracking,
    language,
  } = useApp();

  const [step, setStep] = useState(1);
  const [chosenCategory, setChosenCategory] = useState<ServiceCategory>(
    selectedCategory || 'electrical'
  );
  const [chosenServiceId, setChosenServiceId] = useState<string>('');
  const [chosenProviderId, setChosenProviderId] = useState<string>(
    selectedProviderId || providers[0]?.id || ''
  );
  const [chosenDate, setChosenDate] = useState<string>('2026-10-16');
  const [chosenTimeSlot, setChosenTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [customerName, setCustomerName] = useState(currentUser.name || 'Karthik Subramanian');
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '9840123456');
  const [address, setAddress] = useState('Flat 4B, Emerald Heights, 2nd Main Road');
  const [pinCode, setPinCode] = useState('600017');
  const [city, setCity] = useState('Chennai');
  const [problemDescription, setProblemDescription] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const t = translations[language].bookingModal;

  useEffect(() => {
    if (selectedCategory) {
      setChosenCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const categoryServices = services.filter((s) => s.category === chosenCategory);
    if (categoryServices.length > 0 && (!chosenServiceId || !categoryServices.some(s => s.id === chosenServiceId))) {
      setChosenServiceId(categoryServices[0].id);
    }
  }, [chosenCategory, services]);

  useEffect(() => {
    if (selectedProviderId) {
      setChosenProviderId(selectedProviderId);
    }
  }, [selectedProviderId]);

  if (!isBookingModalOpen) return null;

  const currentService = services.find((s) => s.id === chosenServiceId) || services[0];
  const currentProvider = providers.find((p) => p.id === chosenProviderId) || providers[0];
  const pricing = calculatePricing(currentService?.basePrice || 399, isEmergency, true);

  const handleNextFromStep4 = () => {
    const validation = validateBookingForm({
      customerName,
      customerPhone,
      address,
      pinCode,
      serviceId: chosenServiceId,
      date: chosenDate,
      timeSlot: chosenTimeSlot,
    });
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    setValidationErrors({});
    setStep(5);
  };

  const handleConfirmBooking = async () => {
    const finalValidation = validateBookingForm({
      customerName,
      customerPhone,
      address,
      pinCode,
      serviceId: chosenServiceId,
      date: chosenDate,
      timeSlot: chosenTimeSlot,
    });
    if (!finalValidation.isValid) {
      setValidationErrors(finalValidation.errors);
      setStep(4);
      return;
    }

    try {
      const created = await createNewBooking({
        serviceId: chosenServiceId,
        providerId: chosenProviderId,
        date: chosenDate,
        timeSlot: chosenTimeSlot,
        customerName,
        customerPhone,
        address,
        pinCode,
        city,
        problemDescription: problemDescription || 'General diagnostic inspection requested.',
        isEmergency,
      });
      setConfirmedBookingRef(created.referenceId);
      setConfirmedBookingId(created.id);
      setStep(6);
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => {
    setIsBookingModalOpen(false);
    setStep(1);
    setConfirmedBookingRef(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0C2340] text-white p-7 relative border-b border-white/10">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5 text-[#2997FF] text-xs font-semibold uppercase tracking-widest">
            <Wrench className="w-4 h-4" />
            <span>HAK fix Booking Concierge</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            {step === 6 ? t.step6 : 'Schedule Service'}
          </h3>

          {/* Stepper Dots (1 to 5) */}
          {step <= 5 && (
            <div className="mt-4 flex items-center justify-between gap-1.5 max-w-md">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`h-1.5 w-full rounded-full transition-all ${
                      s <= step ? 'bg-[#0071E3]' : 'bg-slate-700'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-medium hidden sm:inline ${
                      s === step ? 'text-[#2997FF] font-semibold' : 'text-slate-500'
                    }`}
                  >
                    Step {s}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-7">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">Step 1: Choose Service Category &amp; Job</h4>
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'electrical', label: 'Electrical' },
                  { id: 'plumbing', label: 'Plumbing' },
                  { id: 'ac_repair', label: 'AC Repair' },
                  { id: 'cleaning', label: 'Cleaning' },
                  { id: 'carpentry', label: 'Carpentry' },
                  { id: 'appliance', label: 'Appliance' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setChosenCategory(cat.id as ServiceCategory)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      chosenCategory === cat.id
                        ? 'bg-[#0071E3] text-white shadow-sm font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Specific Services in Category */}
              <div className="space-y-2 mt-3.5">
                {services
                  .filter((s) => s.category === chosenCategory)
                  .map((srv) => (
                    <label
                      key={srv.id}
                      onClick={() => setChosenServiceId(srv.id)}
                      className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        chosenServiceId === srv.id
                          ? 'border-[#0071E3] bg-blue-50/50 shadow-xs ring-1 ring-[#0071E3]/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="serviceSelection"
                          checked={chosenServiceId === srv.id}
                          onChange={() => setChosenServiceId(srv.id)}
                          className="mt-1 text-[#0071E3] focus:ring-[#0071E3]"
                        />
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{srv.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5 font-normal">{srv.description}</div>
                          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                            <span>Approx {srv.durationMinutes} mins</span>
                            {srv.popular && (
                              <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-slate-900">₹{srv.basePrice}</span>
                        <div className="text-[10px] text-slate-400">Base fee</div>
                      </div>
                    </label>
                  ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-full apple-btn-3d text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>{t.continueBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Professional */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                Step 2: Choose Assigned Professional
              </h4>
              <p className="text-xs text-slate-500">
                Pick a certified expert available in your metropolitan zone.
              </p>
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {providers
                  .filter((p) => p.category === chosenCategory || providers.length < 4)
                  .map((pro) => (
                    <label
                      key={pro.id}
                      onClick={() => setChosenProviderId(pro.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        chosenProviderId === pro.id
                          ? 'border-[#0071E3] bg-blue-50/50 shadow-xs ring-1 ring-[#0071E3]/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="providerSelection"
                          checked={chosenProviderId === pro.id}
                          onChange={() => setChosenProviderId(pro.id)}
                          className="text-[#0071E3] focus:ring-[#0071E3]"
                        />
                        <img
                          src={pro.photoUrl}
                          alt={pro.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-sm text-slate-900">{pro.name}</span>
                            {pro.isVerified && (
                              <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500 font-normal">
                            ★ {pro.rating} ({pro.reviewCount} reviews) &bull; {pro.experienceYears} yrs exp
                          </div>
                          <div className="text-[11px] text-[#0071E3] font-medium">
                            Areas: {pro.serviceAreas.slice(0, 3).join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                          {pro.availabilityToday ? 'Available Today' : 'Next Available'}
                        </span>
                      </div>
                    </label>
                  ))}
              </div>
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 font-medium text-xs flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.backBtn}</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-full apple-btn-3d text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>{t.continueBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Slot */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                Step 3: Select Date &amp; Arrival Time Slot
              </h4>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Date:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'Today', date: '2026-10-15', sub: 'Urgent' },
                    { label: 'Tomorrow', date: '2026-10-16', sub: 'Preferred' },
                    { label: 'Saturday', date: '2026-10-17', sub: 'Weekend' },
                  ].map((d) => (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => setChosenDate(d.date)}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        chosenDate === d.date
                          ? 'border-[#0071E3] bg-blue-50/80 text-blue-950 font-semibold shadow-xs ring-1 ring-[#0071E3]/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{d.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{d.date}</div>
                      <span className="text-[10px] text-[#0071E3] font-semibold">{d.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Available Slots:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    '09:00 AM - 11:00 AM',
                    '11:00 AM - 01:00 PM',
                    '02:00 PM - 04:00 PM',
                    '04:00 PM - 06:00 PM',
                    '06:00 PM - 08:00 PM',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setChosenTimeSlot(slot)}
                      className={`p-3 rounded-2xl border text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                        chosenTimeSlot === slot
                          ? 'border-[#0071E3] bg-blue-50/80 text-blue-950 font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#0071E3]" />
                        <span>{slot}</span>
                      </div>
                      {chosenTimeSlot === slot && (
                        <CheckCircle2 className="w-4 h-4 text-[#0071E3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emergency Express Dispatch Toggle */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Emergency 30-Min Dispatch (+ ₹150)
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Priority assignment for active leaks or power outages.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                  className="w-4 h-4 text-[#0071E3] rounded-md focus:ring-[#0071E3]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 font-medium text-xs flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.backBtn}</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-full apple-btn-3d text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>{t.continueBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Customer Details & Address */}
          {step === 4 && (
            <div className="space-y-3.5">
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                Step 4: Customer &amp; Address Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Karthik Subramanian"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 ${
                      validationErrors.customerName ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.customerName && (
                    <p className="text-[10px] text-rose-600 mt-0.5">
                      {validationErrors.customerName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (10 Digits) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9840123456"
                      maxLength={10}
                      className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-xs text-slate-900 ${
                        validationErrors.customerPhone ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {validationErrors.customerPhone && (
                    <p className="text-[10px] text-rose-600 mt-0.5">
                      {validationErrors.customerPhone}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Complete Street Address &amp; Flat/Door No. *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 4B, Emerald Heights, 2nd Main Road"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 ${
                    validationErrors.address ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                  }`}
                />
                {validationErrors.address && (
                  <p className="text-[10px] text-rose-600 mt-0.5">{validationErrors.address}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    6-Digit PIN Code *
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="600017"
                    maxLength={6}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 ${
                      validationErrors.pinCode ? 'border-rose-500 bg-rose-50' : 'border-slate-300'
                    }`}
                  />
                  {validationErrors.pinCode && (
                    <p className="text-[10px] text-rose-600 mt-0.5">{validationErrors.pinCode}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi NCR</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Describe Specific Problem (Optional)
                </label>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="e.g. Dripping continuous stream under the sink basin..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>
              <div className="pt-3.5 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 font-medium text-xs flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.backBtn}</span>
                </button>
                <button
                  onClick={handleNextFromStep4}
                  className="px-6 py-2.5 rounded-full apple-btn-3d text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Review Booking</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Review Summary & Pricing */}
          {step === 5 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                Step 5: Review Booking Summary &amp; Pricing
              </h4>
              <div className="bg-slate-50/80 rounded-2xl p-4.5 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Selected Service
                    </span>
                    <div className="text-sm font-bold text-slate-900">{currentService?.name}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Assigned Expert
                    </span>
                    <div className="text-xs font-semibold text-[#0071E3]">
                      {currentProvider?.name} (★ {currentProvider?.rating})
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 font-normal">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{chosenDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{chosenTimeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      {address}, {city} - {pinCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown Card */}
              <div className="bg-white rounded-2xl p-4.5 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>{t.serviceBase}</span>
                  <span>₹{pricing.basePrice}</span>
                </div>
                {pricing.emergencyFee > 0 && (
                  <div className="flex items-center justify-between text-blue-700 font-medium">
                    <span>{t.emergencyFee}</span>
                    <span>+ ₹{pricing.emergencyFee}</span>
                  </div>
                )}
                {pricing.platformDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-medium">
                    <span>{t.platformDiscount}</span>
                    <span>- ₹{pricing.platformDiscount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-600">
                  <span>{t.gst}</span>
                  <span>₹{pricing.taxAmount}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-sm text-slate-900">
                  <span>{t.totalEstimated}</span>
                  <span className="text-[#0071E3] text-base">₹{pricing.totalPrice}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-normal">
                <Info className="w-4 h-4 text-[#0071E3] shrink-0" />
                <span>
                  Initial status will be set to <strong>Pending</strong> upon confirmation until the
                  technician accepts. Pay post-inspection.
                </span>
              </div>

              <div className="pt-3.5 flex items-center justify-between">
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 font-medium text-xs flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.backBtn}</span>
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="px-6 py-2.5 rounded-full apple-btn-3d text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.confirmBookingBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation Screen */}
          {step === 6 && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">{t.bookingSuccessTitle}</h4>
                <p className="text-xs text-slate-500 mt-1">{t.bookingSuccessSubtitle}</p>
                <div className="inline-block px-4 py-1.5 mt-2.5 rounded-full bg-blue-50 border border-blue-200 text-[#0071E3] font-mono font-extrabold text-base tracking-wider">
                  {confirmedBookingRef}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-xs text-slate-600 space-y-1.5 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                    Pending Provider Acceptance
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Appointment:</span>
                  <span className="font-semibold text-slate-800">
                    {chosenDate} ({chosenTimeSlot})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Total:</span>
                  <span className="font-bold text-emerald-600">₹{pricing.totalPrice}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center max-w-sm mx-auto">
                <button
                  onClick={() => {
                    closeModal();
                    if (confirmedBookingId) openBookingTracking(confirmedBookingId);
                  }}
                  className="w-full py-2.5 px-5 rounded-full apple-btn-3d text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Track Status Live</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 px-4 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
