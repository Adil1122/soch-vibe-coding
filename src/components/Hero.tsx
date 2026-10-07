import React from 'react';
import { ChevronDown } from 'lucide-react';
import { TechLogosBar } from './TechLogosBar';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-0 md:pt-40 md:pb-0 overflow-hidden bg-white">
      {/* Centered Hero Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pb-14 md:pb-20">
        {/* Main Headline (Centered) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight leading-[1.12]">
          Master AI-Accelerated <br />
          Software Engineering
        </h1>

        {/* Supporting Message (Centered) */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Build production-ready software 5x faster using next-generation AI workflows. Officially backed by the UOH Business Incubation Center (BIC)
        </p>

        {/* Action Button: ONLY View Course Button */}
        <div className="pt-4 flex justify-center">
          <a
            href="#modules"
            className="px-9 py-4 bg-[#1E2A4F] hover:bg-[#2A6EB4] text-white rounded-full text-sm font-bold uppercase tracking-wider font-poppins transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View Course</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Technologies & Tools Mastered — FULL WIDTH (Zero Left/Right Margins, 100% Matching Technology-and-Tools.PNG) */}
      <TechLogosBar />
    </section>
  );
};
