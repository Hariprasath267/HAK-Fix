import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    handleGoogleSignIn,
    handleEmailSignIn,
    handleEmailSignUp,
    setUserRole,
    setCurrentPage,
    showToast,
  } = useApp();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await handleEmailSignUp(email, password, fullName);
      } else {
        await handleEmailSignIn(email, password);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantDemoLogin = () => {
    setUserRole('customer');
    setIsAuthModalOpen(false);
    setCurrentPage('my-bookings');
    showToast('Logged in as Karthik Subramanian (Verified Customer)', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0C2340] to-[#0A1A2F] text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            aria-label="Close auth modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Customer Secure Access
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight mt-1 text-white">
            {isSignUp ? 'Create Customer Account' : 'Sign In to HAK fix'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 font-normal leading-relaxed">
            Manage your service bookings, access anti-surprise price guarantees, and track technicians live.
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* 1-Click Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-300 flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              or with email
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Karthik Subramanian"
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl apple-btn-3d text-white font-bold text-xs shadow-md transition-all cursor-pointer mt-2 disabled:opacity-50"
            >
              {isSubmitting
                ? 'Processing...'
                : isSignUp
                ? 'Create Free Account'
                : 'Sign In to Customer Account'}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-[#0071E3] font-semibold hover:underline cursor-pointer"
            >
              {isSignUp ? 'Already registered? Sign In' : "Don't have an account? Sign Up Free"}
            </button>
          </div>

          {/* Instant 1-Click Testing Demo Mode */}
          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleInstantDemoLogin}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center justify-between cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
                <span>Instant 1-Click Test Customer Login</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
