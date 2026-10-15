import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations } from '../../utils/translations.ts';
import { HakFixLogo } from './HakFixLogo.tsx';
import {
  Wrench,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Clock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setCurrentPage, setSelectedCategory } = useApp();
  const t = translations[language];

  return (
    <footer className="bg-[#0A121E] text-slate-300 pt-16 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#0071E3]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Feature Pillars in Apple 3D glass tiles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80">
          <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-start gap-4">
            <div className="p-2.5 rounded-2xl bg-blue-500/15 text-[#2997FF] border border-blue-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-tight">100% Verified Pros</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                Background-checked, identity verified, and skills certified before onboarding.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-start gap-4">
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-tight">30-Day Warranty</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                Free re-work assurance on all booked electrical, plumbing, and AC jobs.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-start gap-4">
            <div className="p-2.5 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-500/20 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-tight">Rapid Dispatch</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                Emergency technicians can arrive within 30-45 minutes in metro zones.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-start gap-4">
            <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-tight">Transparent INR Rates</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                Upfront rate cards with zero hidden travel charges or surprise fees.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <HakFixLogo size="md" variant="white" showTagline={false} />
            <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-sm font-normal">
              {t.tagline} On-demand marketplace connecting homeowners with top-rated local technicians. Instant scheduling, transparent INR pricing, and live arrival tracking.
            </p>
            <div className="mt-5 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2997FF] shrink-0" />
                <span>Anna Salai, T. Nagar, Chennai, Tamil Nadu 600017</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 98401 23456 (24/7 Helpline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>support@hakfix.in</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Service Categories
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('electrical');
                    setCurrentPage('services');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Electrical Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('plumbing');
                    setCurrentPage('services');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Plumbing Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('ac_repair');
                    setCurrentPage('services');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  AC Servicing &amp; Gas Top-up
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('cleaning');
                    setCurrentPage('services');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Deep Home Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('carpentry');
                    setCurrentPage('services');
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-slate-400"
                >
                  Carpentry &amp; Lock Repair
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('services')} className="hover:text-white cursor-pointer text-slate-400">
                  Explore All Providers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('my-bookings')} className="hover:text-white cursor-pointer text-slate-400">
                  My Bookings
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('how-it-works')} className="hover:text-white cursor-pointer text-slate-400">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('become-provider')} className="hover:text-white cursor-pointer text-slate-400">
                  Join as Technician
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin-dashboard')} className="hover:text-white cursor-pointer text-slate-400">
                  Admin Verification Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Metro Coverage
            </h5>
            <div className="space-y-1.5 text-xs text-slate-400 font-normal">
              <p className="font-semibold text-slate-200">Chennai:</p>
              <p>T. Nagar, Anna Nagar, Adyar, Velachery, OMR, Mylapore</p>
              <p className="font-semibold text-slate-200 pt-2">Bengaluru:</p>
              <p>Indiranagar, Koramangala, HSR Layout, Whitefield</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} HAK fix Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Verified Local Experts</span>
            <span className="text-[#2997FF]">&bull;</span>
            <span className="text-emerald-400 font-medium">100% Safe Home Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
