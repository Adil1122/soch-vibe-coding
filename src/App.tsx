import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIsVibeCoding } from './components/WhatIsVibeCoding';
import { Roadmap } from './components/Roadmap';
import { Modules } from './components/Modules';
import { WhyChooseUs } from './components/WhyChooseUs';
import { VibeShift } from './components/VibeShift';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { VideoModal } from './components/VideoModal';
import { IntegrationModal } from './components/IntegrationModal';
import { AdminDashboard } from './components/AdminDashboard';

function LandingPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [activeVideoData, setActiveVideoData] = useState({
    title: 'What is Vibe Coding?',
    subtitle: 'Learn how developers combine software engineering fundamentals with modern AI workflows.',
    tagline: 'Vibe Academy Haripur',
    src: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4'
  });

  const handleOpenGeneralVideo = () => {
    setActiveVideoData({
      title: 'What is Vibe Coding?',
      subtitle: 'Learn how developers combine software engineering fundamentals with modern AI workflows.',
      tagline: 'Vibe Academy Haripur',
      src: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4'
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenSuccessVideo = (videoInfo: { title: string; subtitle: string; tagline: string; src: string }) => {
    setActiveVideoData(videoInfo);
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-black flex flex-col font-sans selection:bg-[#c9459c] selection:text-white overflow-x-hidden">
      {/* 1. Header (Vibe Academy Logo, Menu toggle + APPLY FOR COHORT 02 pill) */}
      <Navbar onOpenApply={() => setIsApplyModalOpen(true)} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. 01. What is Vibe Coding */}
        <WhatIsVibeCoding onOpenVideo={handleOpenGeneralVideo} />

        {/* 4. 02. The "Zero to Hero" Roadmap */}
        <Roadmap onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* 5. 03. Curriculum & Pay-As-You-Go Modules */}
        <Modules onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* 6. 05. Why Choose Us? */}
        <WhyChooseUs onOpenVideo={handleOpenSuccessVideo} />

        {/* 7. 06. The Vibe Shift */}
        <VibeShift />

        {/* 8. 07. Team */}
        <Team />

        {/* 9. 08. Contact */}
        <Contact onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* 10. Map */}
        <MapSection />
      </main>

      {/* 11. Footer */}
      <Footer onOpenIntegration={() => setIsIntegrationModalOpen(true)} />

      {/* Application Form Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* Database & WhatsApp Integration Guide Modal */}
      <IntegrationModal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
      />

      {/* Video Lightbox Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={activeVideoData.title}
        subtitle={activeVideoData.subtitle}
        tagline={activeVideoData.tagline}
        videoSrc={activeVideoData.src}
      />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
