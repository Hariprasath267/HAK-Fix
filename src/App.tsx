import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { Footer } from './components/common/Footer.tsx';
import { HeroSection } from './components/home/HeroSection.tsx';
import { CategoriesGrid } from './components/home/CategoriesGrid.tsx';
import { RecommendedPros } from './components/home/RecommendedPros.tsx';
import { HowItWorks } from './components/home/HowItWorks.tsx';
import { WhyChooseUs } from './components/home/WhyChooseUs.tsx';
import { Testimonials } from './components/home/Testimonials.tsx';
import { FAQSection } from './components/home/FAQSection.tsx';
import { ServiceSearchPage } from './components/search/ServiceSearchPage.tsx';
import { ProfessionalProfilePage } from './components/profile/ProfessionalProfilePage.tsx';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard.tsx';
import { BookingTrackingPage } from './components/tracking/BookingTrackingPage.tsx';
import { ProviderDashboard } from './components/provider/ProviderDashboard.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import { HowItWorksPage } from './components/pages/HowItWorksPage.tsx';
import { BecomeProviderPage } from './components/pages/BecomeProviderPage.tsx';
import { BookingFlowModal } from './components/booking/BookingFlowModal.tsx';
import { AIServiceFinderModal } from './components/ai/AIServiceFinderModal.tsx';
import { FairFixModal } from './components/fairfix/FairFixModal.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';
import { ToastContainer } from './components/common/ToastContainer.tsx';

const MainRouter: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-[#0071E3] selection:text-white">
      {/* Top Navigation with Brand Logo */}
      <Navbar />

      {/* Main Page Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection />
            <CategoriesGrid />
            <RecommendedPros />
            <HowItWorks />
            <WhyChooseUs />
            <Testimonials />
            <FAQSection />
          </>
        )}
        {currentPage === 'services' && <ServiceSearchPage />}
        {currentPage === 'profile' && <ProfessionalProfilePage />}
        {currentPage === 'my-bookings' && <CustomerDashboard />}
        {currentPage === 'track' && <BookingTrackingPage />}
        {currentPage === 'provider-dashboard' && <ProviderDashboard />}
        {currentPage === 'provider-bookings' && <ProviderDashboard />}
        {currentPage === 'provider-profile' && <ProviderDashboard />}
        {currentPage === 'admin-dashboard' && <AdminDashboard />}
        {currentPage === 'how-it-works' && <HowItWorksPage />}
        {currentPage === 'become-provider' && <BecomeProviderPage />}
      </main>

      {/* Global Modals & Notifications */}
      <BookingFlowModal />
      <AIServiceFinderModal />
      <FairFixModal />
      <AuthModal />
      <ToastContainer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
