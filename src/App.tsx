import React, { useState } from 'react';
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

export function App() {
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

      {/* Main Sections (100% clone of vibeacademy.info) */}
      <main className="flex-1">
        {/* 2. Hero Section (Background video, Master AI-Accelerated Software Engineering, View Course, Tech Logos) */}
        <Hero />

        {/* 3. 01. What is Vibe Coding (Haripur to the World, Animated marquee background, Video player) */}
        <WhatIsVibeCoding onOpenVideo={handleOpenGeneralVideo} />

        {/* 4. 02. The "Zero to Hero" Roadmap (5 Stages with scroll-progress gradient fill line) */}
        <Roadmap onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* 5. 03. Curriculum & Pay-As-You-Go Modules (Curriculum pillars, Download PDF, Pricing tiers) */}
        <Modules onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* 6. 05. Why Choose Us? (Values, Local Opportunity, Pakistan's Digital Ascent, Revenue, Salary premium, Cohort 01 Success Stories) */}
        <WhyChooseUs onOpenVideo={handleOpenSuccessVideo} />

        {/* 7. 06. The Vibe Shift (3 Blog Articles: Shaping the Future, Gig Economy, AI Skills) */}
        <VibeShift />

        {/* 8. 07. Team (Meet the Vibe Academy Minds with horizontal carousel and gradient bar) */}
        <Team />

        {/* 9. 08. Contact (Background video, Your Competitors Are Automating, Full application form) */}
        <Contact onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* 10. Map (Full-width University of Haripur BIC Google Map embed) */}
        <MapSection />
      </main>

      {/* 11. Footer (Logo, Social links, Copyright, Back to top) */}
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

export default App;
