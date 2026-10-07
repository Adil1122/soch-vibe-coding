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
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-white tracking-tight leading-[1.1] font-sans">
          Master AI-Accelerated <br />
          Software Engineering
        </h1>

        {/* Subtitle Paragraph (matching reference size and text) */}
        <p className="text-lg sm:text-xl md:text-[21px] text-white/80 max-w-3xl mx-auto leading-relaxed md:leading-[35px] font-normal">
          Ready to go from zero building knowledge to a full-stack AI engineering pro? Our 'Vibe Coding' journey is explicitly engineered to transform you, step-by-step, into an in-demand global tech talent. This isn't just a course; it's your operational blueprint to becoming a digital architect backed by the University of Haripur BIC.
        </p>

        {/* View Course Action Button */}
        <div className="pt-4 flex justify-center">
          <a href="#Curriculum-pricing" className="custom-btn cursor-pointer">
            <span className="btn-text">View Course</span>
            <span className="btn-icon">→</span>
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
