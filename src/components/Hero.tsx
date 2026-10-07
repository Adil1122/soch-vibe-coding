import React from 'react';
import { TechLogosBar } from './TechLogosBar';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-32 sm:pt-40 pb-0 overflow-hidden bg-black">
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
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 my-auto py-12">
        {/* Main Headline (matches 0-top-section.PNG) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold text-white tracking-tight leading-[1.15] font-sans">
          Master AI-Accelerated <br />
          Software Engineering
        </h1>

        {/* Subtitle Paragraph (matches 0-top-section.PNG) */}
        <p className="text-lg sm:text-xl md:text-[21px] text-white/90 max-w-3xl mx-auto leading-relaxed md:leading-[34px] font-normal">
          Build production-ready software 5x faster using next-generation AI workflows. Officially backed by the UOH Business Incubation Center (BIC)
        </p>

        {/* View Course Action Button */}
        <div className="pt-2 flex justify-center">
          <a href="#Curriculum-pricing" className="custom-btn cursor-pointer">
            <span className="btn-text">View Course</span>
          </a>
        </div>
      </div>

      {/* Full-width continuous animated technologies ribbon */}
      <div className="relative z-10 w-full mt-auto">
        <TechLogosBar />
      </div>
    </section>
  );
};
