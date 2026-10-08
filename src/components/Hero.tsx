import React from 'react';
import { TechLogosBar } from './TechLogosBar';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-0 overflow-hidden bg-black text-white">
      {/* Background Video (matching reference 100%) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-35 filter brightness-75 contrast-125"
          src="https://vibeacademy.info/wp-content/uploads/2026/04/14482688_3840_2160_25fps.mp4"
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black pointer-events-none"></div>
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-12">
        {/* Main Headline (matches 0-top-section.PNG) */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-[1.25] font-sans">
          Master AI-Accelerated <br />
          Software Engineering
        </h1>

        {/* Subtitle Paragraph (matches 0-top-section.PNG) */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-[19px] text-white/90 max-w-3xl mx-auto leading-relaxed md:leading-[32px] font-normal">
          Build production-ready software 5x faster using next-generation AI workflows. Officially backed by the UOH Business Incubation Center (BIC)
        </p>

        {/* View Course Action Button (Transparent with gradient border) */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <a
            href="#Curriculum-pricing"
            className="vibe-btn-dark !px-8 !py-3 !text-xs sm:!text-sm font-semibold uppercase tracking-wider"
          >
            <span>View Course</span>
          </a>
        </div>
      </div>

      {/* Full-width continuous animated technologies ribbon - Spaced equally (mt-12 sm:mt-14) */}
      <div className="relative z-10 w-full mt-12 sm:mt-14 border-t border-b border-white/5 bg-black/40 backdrop-blur-sm">
        <TechLogosBar />
      </div>
    </section>
  );
};
