import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIsVibeCoding } from './components/WhatIsVibeCoding';
import { Roadmap } from './components/Roadmap';
import { Modules } from './components/Modules';
import { WhyChooseUs, SuccessStoryItem } from './components/WhyChooseUs';
import { VibeShift } from './components/VibeShift';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { VideoModal } from './components/VideoModal';

export function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoData, setActiveVideoData] = useState({
    title: 'What is Vibe Coding?',
    subtitle: 'Learn how developers combine software engineering fundamentals with modern AI workflows.',
    tagline: 'University of Haripur BIC'
  });

  const handleOpenGeneralVideo = () => {
    setActiveVideoData({
      title: 'What is Vibe Coding?',
      subtitle: 'Learn how developers combine software engineering fundamentals with modern AI workflows.',
      tagline: 'University of Haripur BIC'
    });
    setIsVideoModalOpen(true);
  };

  const handleSelectStoryVideo = (story: SuccessStoryItem) => {
    setActiveVideoData({
      title: `${story.name} — ${story.project}`,
      subtitle: `"${story.quote}" (${story.achievement})`,
      tagline: 'Cohort 01 Success Story Video'
    });
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1E2A4F] flex flex-col font-sans selection:bg-[#F38A32] selection:text-white">
      {/* 1. Header (Centered SOCH Vibe Coding, Apply button, Vertical Menu icon) */}
      <Navbar onOpenApply={() => setIsApplyModalOpen(true)} />

      {/* Main Flow Matching Reference Site Exactly */}
      <main className="flex-1">
        {/* 2. Hero Section (Centered, View Course button only, Full-width Tools marquee) */}
        <Hero />

        {/* 4. What is Vibe Coding (Animation running behind centered video across full width) */}
        <WhatIsVibeCoding onOpenVideo={handleOpenGeneralVideo} />

        {/* 02. The "Zero to Hero" Roadmap (Vertical timeline with progressive line fill & final trophy) */}
        <Roadmap onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* 03. Modules (Curriculum & Pay-As-You-Go Modules 100% matching 1-curriculum.PNG) */}
        <Modules onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* 04. Why Choose Us (100% matching 5-why-choose-us.PNG with Success Stories videos & modal) */}
        <WhyChooseUs onSelectStory={handleSelectStoryVideo} />

        {/* 05. The Vibe Shift (100% matching 4-the-vibe-shift.PNG with neon Pakistan map & carousel) */}
        <VibeShift />

        {/* 07. The Team (Matching reference horizontal slider) */}
        <Team />

        {/* Contact Section (Matching reference design with inquiry form and direct communication) */}
        <Contact onOpenApply={() => setIsApplyModalOpen(true)} />

        {/* Map Section (University of Haripur, Haripur, Khyber Pakhtunkhwa, Pakistan) */}
        <MapSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Application Modal Popup */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* Interactive Responsive Video Modal Lightbox for Intro & Success Stories */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={activeVideoData.title}
        subtitle={activeVideoData.subtitle}
        tagline={activeVideoData.tagline}
      />
    </div>
  );
}

export default App;
