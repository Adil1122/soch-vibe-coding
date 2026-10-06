import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIsVibeCoding } from './components/WhatIsVibeCoding';
import { Roadmap } from './components/Roadmap';
import { Modules } from './components/Modules';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SuccessStories } from './components/SuccessStories';
import { MissionVision } from './components/MissionVision';
import { Blog } from './components/Blog';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { VideoModal } from './components/VideoModal';
import { SuccessStory } from './data/websiteData';
import { Sparkles, ArrowRight } from 'lucide-react';

export function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoModalData, setVideoModalData] = useState({
    title: 'Discover SOCH – Vibe Coding',
    subtitle: 'Combining Software Engineering Foundations with 5x AI Acceleration',
    tagline: 'University of Haripur BIC Showcase'
  });

  const handleOpenApply = () => {
    setIsApplyModalOpen(true);
  };

  const handleOpenGeneralVideo = () => {
    setVideoModalData({
      title: 'Discover SOCH – Vibe Coding',
      subtitle: 'Combining Software Engineering Foundations with 5x AI Acceleration',
      tagline: 'University of Haripur BIC Showcase'
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenSuccessVideo = (story: SuccessStory) => {
    setVideoModalData({
      title: `${story.studentName} — ${story.projectBuilt}`,
      subtitle: `"${story.quote}"`,
      tagline: 'Cohort 01 Graduate Spotlight'
    });
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1E2A4F] flex flex-col font-sans selection:bg-[#F38A32] selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenApply={handleOpenApply} />

      {/* Main One-Page Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onOpenApply={handleOpenApply}
          onOpenVideo={handleOpenGeneralVideo}
        />

        {/* 3. What is Vibe Coding? Section */}
        <WhatIsVibeCoding
          onOpenVideo={handleOpenGeneralVideo}
          onOpenApply={handleOpenApply}
        />

        {/* 4. 10-Stage Roadmap Section */}
        <Roadmap onOpenApply={handleOpenApply} />

        {/* 5. Modules Section */}
        <Modules onOpenApply={handleOpenApply} />

        {/* 6. Why Choose Us Section (01-07 numbered) */}
        <WhyChooseUs onOpenApply={handleOpenApply} />

        {/* 7. Success Stories Subsection (Cohort 01) */}
        <SuccessStories
          onSelectVideo={handleOpenSuccessVideo}
          onOpenApply={handleOpenApply}
        />

        {/* 8. Mission & Vision Section ("From Haripur to the World", SEEK/OBSERVE/CREATE/HOPE) */}
        <MissionVision onOpenApply={handleOpenApply} />

        {/* 9. Blog Section */}
        <Blog />

        {/* 10. Team Section */}
        <Team />

        {/* 11. Contact Section */}
        <Contact onOpenApply={handleOpenApply} />

        {/* 12. Map Section */}
        <MapSection />
      </main>

      {/* 13. Professional Footer */}
      <Footer />

      {/* Modals & Popups */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={videoModalData.title}
        subtitle={videoModalData.subtitle}
        tagline={videoModalData.tagline}
      />

      {/* Sticky Mobile Floating CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
        <div className="bg-[#1E2A4F]/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-2">
          <div className="text-left pl-1">
            <span className="text-[10px] font-bold text-[#F38A32] uppercase tracking-wider block">
              Cohort 02 Open
            </span>
            <span className="text-xs font-bold font-poppins text-white">
              SOCH – Vibe Coding
            </span>
          </div>
          <button
            onClick={handleOpenApply}
            className="px-4 py-2 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-poppins transition shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
