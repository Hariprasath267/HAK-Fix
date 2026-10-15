import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  CheckCircle2,
  ShieldCheck,
  IndianRupee,
  Calendar,
  Send,
} from 'lucide-react';

export const BecomeProviderPage: React.FC = () => {
  const { showToast, setUserRole, setCurrentPage } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('electrical');
  const [experience, setExperience] = useState('5');
  const [city, setCity] = useState('Chennai');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Please enter your full name and 10-digit phone number.', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Application received! Our onboarding officer will contact you within 24 hours.', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#FF7A00] font-bold text-xs uppercase tracking-wider">
            Partner with HAK fix
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Grow Your Independent Trade Business
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Join 500+ top-earning electricians, plumbers, and technicians. Get continuous job bookings in your neighborhood with guaranteed weekly payouts.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">₹40,000 - ₹80,000 / mo</h3>
            <p className="text-xs text-slate-500 mt-1">
              Top technicians earn predictable income with transparent per-job billing and zero commission on repeat client tips.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF7A00] flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Flexible Work Schedule</h3>
            <p className="text-xs text-slate-500 mt-1">
              You are in control. Switch your status online or offline anytime directly from the Provider Dashboard.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Insurance &amp; Tool Financing</h3>
            <p className="text-xs text-slate-500 mt-1">
              Get accident insurance coverage while on-site and subsidized access to professional diagnostic tools.
            </p>
          </div>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our trade verification supervisor will call {phone} to schedule your quick 15-minute technical onboarding audit.
              </p>
              <button
                onClick={() => {
                  setUserRole('provider');
                  setCurrentPage('provider-dashboard');
                }}
                className="mt-3 px-5 py-2.5 rounded-xl bg-[#0C2340] hover:bg-[#102C52] text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Preview the Provider Dashboard (Demo)
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Technician Onboarding Form</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh V."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9840123456"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Trade</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="ac_repair">AC Repair</option>
                    <option value="cleaning">Home Cleaning</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="appliance">Appliance Repair</option>
                    <option value="painting">Painting</option>
                    <option value="pest_control">Pest Control</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience (Years)</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="2">2 - 4 Years</option>
                    <option value="5">5 - 8 Years</option>
                    <option value="10">8+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi NCR</option>
                  </select>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Partner Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
