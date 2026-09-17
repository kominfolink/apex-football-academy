import React from 'react';
import { AcademyProvider } from './context/AcademyContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsTicker } from './components/StatsTicker';
import { ProgramsSection } from './components/ProgramsSection';
import { TacticalBoard } from './components/TacticalBoard';
import { ScheduleSection } from './components/ScheduleSection';
import { CoachesSection } from './components/CoachesSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { RegistrationModal } from './components/RegistrationModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { InvoicePrintModal } from './components/InvoicePrintModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

export function App() {
  return (
    <AcademyProvider>
      <div className="min-h-screen bg-[#070B09] text-gray-100 flex flex-col selection:bg-[#00FF87] selection:text-black">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Flow */}
        <main className="flex-1">
          <HeroSection />
          <StatsTicker />
          <ProgramsSection />
          <TacticalBoard />
          <ScheduleSection />
          <CoachesSection />
          <FacilitiesSection />
          <GallerySection />
          <TestimonialsSection />
          <FAQSection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Interactive Floating Concierge & Alerts */}
        <FloatingConcierge />

        {/* Modals & Portal Overlays */}
        <RegistrationModal />
        <PaymentGatewayModal />
        <InvoicePrintModal />
        <AdminDashboard />
      </div>
    </AcademyProvider>
  );
}

export default App;
