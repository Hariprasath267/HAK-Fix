import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setUserRole, setCurrentPage, showToast } =
    useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleDemoLogin = (role: 'customer' | 'provider' | 'admin') => {
    setUserRole(role);
    setIsAuthModalOpen(false);
    if (role === 'provider') {
      setCurrentPage('provider-dashboard');
      showToast('Logged in as Suresh Kumar (Licensed Electrician)', 'success');
    } else if (role === 'admin') {
      setCurrentPage('admin-dashboard');
      showToast('Logged in as HAK fix Administrator', 'success');
    } else {
      setCurrentPage('home');
      showToast('Logged in as Karthik Subramanian (Customer)', 'success');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole('customer');
    setIsAuthModalOpen(false);
    showToast(`Welcome, ${fullName || email.split('@')[0] || 'Customer'}!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0C2340] text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
            HAK fix Accounts
          </span>
          <h3 className="text-xl font-bold tracking-tight mt-1">
            {isSignUp ? 'Create Customer Account' : 'Sign In to HAK fix'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access your bookings, track live technicians, and download invoices.
          </p>
        </div>

        {/* Quick Demo Role Logins */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              Quick One-Click Demo Logins:
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-orange-100 text-xs font-semibold text-slate-800 border border-orange-200 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Log in as Customer (Karthik S.)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('provider')}
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-amber-100 text-xs font-semibold text-slate-800 border border-amber-200 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  <span>Log in as Provider (Suresh - Electrician)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-emerald-100 text-xs font-semibold text-slate-800 border border-emerald-200 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Log in as Administrator Desk</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3 pt-2">
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
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
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
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
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
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
            >
              {isSignUp ? 'Create Free Account' : 'Sign In with Email'}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-[#FF7A00] font-semibold hover:underline cursor-pointer"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
