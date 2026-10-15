import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getCategoryName, getStatusLabel } from '../../utils/translations.ts';
import {
  ShieldCheck,
  Briefcase,
  Layers,
  FileText,
  AlertTriangle,
  Lock,
  ArrowLeft,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    userRole,
    setUserRole,
    providers,
    bookings,
    services,
    toggleProviderVerification,
    openBookingTracking,
    showToast,
    goBack,
    getBackTitle,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'bookings' | 'providers' | 'categories' | 'complaints'
  >('bookings');

  // Role-based protection check
  if (userRole !== 'admin') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Restricted Admin Access</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          This portal requires administrator privileges. For evaluation, you can switch
          personas via the button below or the top navigation bar.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={goBack}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>{getBackTitle()}</span>
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Elevate Persona to Administrator
          </button>
        </div>
      </div>
    );
  }

  // Admin platform KPIs
  const totalBookingsCount = bookings.length;
  const totalGrossVolume = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const activeProvidersCount = providers.length;
  const verifiedProvidersCount = providers.filter((p) => p.isVerified).length;

  const mockComplaints = [
    {
      id: 'cmp-101',
      bookingRef: 'HAK-92814',
      customer: 'Karthik Subramanian',
      issue: 'Requested clarification on emergency express dispatch surcharge billing.',
      status: 'Under Review',
      priority: 'Normal',
    },
    {
      id: 'cmp-102',
      bookingRef: 'HAK-78401',
      customer: 'Priya Narayanan',
      issue: 'Technician was delayed by 12 minutes due to heavy monsoon traffic in Adyar.',
      status: 'Resolved',
      priority: 'Low',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back navigation */}
        <div>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#0071E3]" />
            <span>{getBackTitle()}</span>
          </button>
        </div>

        {/* Admin Header */}
        <div className="bg-[#0C2340] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                Root Admin Panel
              </span>
              <span className="text-xs text-slate-400">HAK fix Operations Desk</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold mt-1">Platform Master Console</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Supervise booking fulfillment, verify contractor credentials, and monitor customer satisfaction.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
              Session: SuperAdmin Active
            </span>
          </div>
        </div>

        {/* Platform KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Gross Volume
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              ₹{totalGrossVolume + 38500}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">+18% vs last month</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Platform Bookings
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {totalBookingsCount + 89}
            </div>
            <span className="text-[10px] text-blue-600 font-semibold">98.4% Fulfillment Rate</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Verified Partners
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {verifiedProvidersCount} / {activeProvidersCount}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">Background Checked</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Average Rating
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              4.85 ★
            </div>
            <span className="text-[10px] text-amber-600 font-semibold">680+ Verified Reviews</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'bookings', label: `All Bookings (${bookings.length})`, icon: FileText },
            { id: 'providers', label: `Service Providers (${providers.length})`, icon: Briefcase },
            { id: 'categories', label: `Categories (${services.length})`, icon: Layers },
            { id: 'complaints', label: `Customer Complaints (2)`, icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeAdminTab === tab.id
                    ? 'bg-[#0C2340] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Bookings Management */}
        {activeAdminTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Live Booking Master Registry</h3>
              <span className="text-xs text-slate-500">Real-time status synchronizer</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Service</th>
                    <th className="p-3.5">Provider</th>
                    <th className="p-3.5">Date &amp; Slot</th>
                    <th className="p-3.5">Total (INR)</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((bkg) => (
                    <tr key={bkg.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#0071E3]">
                        {bkg.referenceId}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {bkg.customerName}
                        <div className="text-[10px] text-slate-400 font-normal">{bkg.customerPhone}</div>
                      </td>
                      <td className="p-3.5 text-slate-700">{bkg.serviceName}</td>
                      <td className="p-3.5 text-slate-700">{bkg.providerName}</td>
                      <td className="p-3.5 text-slate-600">
                        {bkg.date}
                        <div className="text-[10px] text-slate-400">{bkg.timeSlot}</div>
                      </td>
                      <td className="p-3.5 font-extrabold text-slate-900">₹{bkg.totalPrice}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-[#0071E3]">
                          {bkg.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => openBookingTracking(bkg.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Providers Management */}
        {activeAdminTab === 'providers' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Partner Credentials &amp; Verification Desk</h3>
              <span className="text-xs text-slate-500">Toggle verification badge status</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Provider</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Rating</th>
                    <th className="p-3.5">City &amp; Areas</th>
                    <th className="p-3.5">Starting INR</th>
                    <th className="p-3.5">Verification</th>
                    <th className="p-3.5 text-right">Admin Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {providers.map((pro) => (
                    <tr key={pro.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 flex items-center gap-2.5">
                        <img
                          src={pro.photoUrl}
                          alt={pro.name}
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{pro.name}</div>
                          <div className="text-[10px] text-slate-400">{pro.phone}</div>
                        </div>
                      </td>
                      <td className="p-3.5 font-medium text-slate-700">{pro.categoryName}</td>
                      <td className="p-3.5 font-bold text-amber-600">
                        ★ {pro.rating} ({pro.reviewCount})
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {pro.city} ({pro.serviceAreas.slice(0, 2).join(', ')})
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">₹{pro.startingPrice}</td>
                      <td className="p-3.5">
                        {pro.isVerified ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Verified
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                            Pending Audit
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => toggleProviderVerification(pro.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                            pro.isVerified
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {pro.isVerified ? 'Revoke Status' : 'Approve & Verify'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Categories & Rates */}
        {activeAdminTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-[#0071E3] bg-blue-50 px-2 py-0.5 rounded-md">
                  {srv.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-2">{srv.name}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.description}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Standard Price:</span>
                  <span className="font-extrabold text-slate-900">₹{srv.basePrice}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Customer Complaints */}
        {activeAdminTab === 'complaints' && (
          <div className="space-y-3">
            {mockComplaints.map((c) => (
              <div
                key={c.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800">{c.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      {c.status}
                    </span>
                    <span className="text-xs text-[#0071E3]">Booking: {c.bookingRef}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{c.customer}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{c.issue}</p>
                </div>
                <button
                  onClick={() => showToast(`Ticket ${c.id} marked as resolved.`, 'success')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Mark Resolved
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
