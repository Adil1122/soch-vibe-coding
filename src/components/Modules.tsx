import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface ModulesProps {
  onOpenApply: () => void;
}

export const Modules: React.FC<ModulesProps> = ({ onOpenApply }) => {
  const [activeTier, setActiveTier] = useState<'monthly' | 'bundle'>('monthly');

  const handleDownload = () => {
    const text = `SOCH – Vibe Coding Curriculum Outline
University of Haripur Business Incubation Center (BIC)

Core Pillars:
1. Foundations of Modern Web Development
2. MERN Stack Mastery with Next.js
3. AI Engineering & Intelligent Workflows

Investment:
- Monthly Tier: PKR 8,500
- Total Program Bundle: PKR 25,500
Limited seats available for Cohort 02. BIC Lab capacity capped.`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SOCH-Vibe-Coding-Curriculum.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="modules" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Heading (100% matching 1-curriculum.PNG) */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] font-poppins tracking-tight">
            Curriculum & Pay-As-You-Go Modules
          </h2>
        </div>

        {/* Two-Column Grid matching 1-curriculum.PNG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Curriculum Text & Core Pillars */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-3xl sm:text-4xl font-bold font-poppins text-[#111827]">
              Curriculum
            </h3>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              it’s a strategic power move for your career. We’re not just another building course; we’re your launchpad into the future of tech, backed by solid stats and a mission to make you unstoppable. Here’s why you need to be with us:
            </p>

            <div className="space-y-4 pt-2">
              <h4 className="text-xl sm:text-2xl font-bold font-poppins text-[#111827]">
                Core Pillars:
              </h4>

              <div className="space-y-3">
                {[
                  'Foundations of Modern Web Development.',
                  'MERN Stack Mastery with Next.js.',
                  'AI Engineering & Intelligent Workflows'
                ].map((pillar, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-base sm:text-lg text-slate-800 font-medium">
                    {/* Concentric Target Circle Icon matching reference screenshot */}
                    <span className="w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                    </span>
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Curriculum Button matching pill style in screenshot */}
            <div className="pt-4">
              <button
                onClick={handleDownload}
                className="px-7 py-3 rounded-full border-2 border-[#1E2A4F] hover:border-[#F38A32] text-[#1E2A4F] hover:text-[#F38A32] bg-white font-bold font-poppins text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD CURRICULUM FOR FREE</span>
              </button>
            </div>
          </div>

          {/* Right Column: Switcher & Pricing Card matching 1-curriculum.PNG */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pill Switcher matching screenshot */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTier('monthly')}
                className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider font-poppins transition-all duration-300 shadow cursor-pointer ${
                  activeTier === 'monthly'
                    ? 'text-white shadow-md'
                    : 'bg-white text-slate-800 border-2 border-slate-300 hover:border-slate-400'
                }`}
                style={{
                  background:
                    activeTier === 'monthly'
                      ? 'linear-gradient(135deg, #4467b0 0%, #78daeb 50%, #c9459a 100%)'
                      : undefined
                }}
              >
                MONTHLY TIER
              </button>

              <button
                onClick={() => setActiveTier('bundle')}
                className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider font-poppins transition-all duration-300 shadow cursor-pointer ${
                  activeTier === 'bundle'
                    ? 'text-white shadow-md'
                    : 'bg-white text-slate-800 border-2 border-slate-300 hover:border-slate-400'
                }`}
                style={{
                  background:
                    activeTier === 'bundle'
                      ? 'linear-gradient(135deg, #4467b0 0%, #78daeb 50%, #c9459a 100%)'
                      : undefined
                }}
              >
                TOTAL PROGRAM BUNDLE
              </button>
            </div>

            {/* Pricing Card matching exact rounded container in screenshot */}
            <div className="bg-white rounded-[40px] border border-slate-300 p-8 sm:p-10 shadow-lg space-y-6 transition-all duration-300">
              <div className="space-y-3">
                <h3 className="text-3xl sm:text-4xl font-extrabold font-poppins text-[#111827]">
                  {activeTier === 'monthly' ? 'Monthly Tier' : 'Total Program Bundle'}
                </h3>

                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-bold text-slate-800">
                    PKR
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold font-poppins text-[#c9459a]">
                    {activeTier === 'monthly' ? '8,500' : '25,500'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-medium pt-1">
                  Limited seats available for Batch 1. BIC Lab capacity capped
                </p>
              </div>

              {/* Apply Button Pill matching screenshot */}
              <div className="pt-6">
                <button
                  onClick={onOpenApply}
                  className="w-full py-3.5 rounded-full border-2 border-[#c9459a] hover:bg-[#c9459a] hover:text-white text-[#111827] bg-white text-xs sm:text-sm font-bold uppercase tracking-wider font-poppins transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center"
                >
                  APPLY FOR COHORT 02
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
