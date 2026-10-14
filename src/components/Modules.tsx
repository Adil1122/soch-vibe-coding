import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { SectionPill } from './SectionPill';

interface ModulesProps {
  onOpenApply: () => void;
}

export const Modules: React.FC<ModulesProps> = ({ onOpenApply }) => {
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'bundle'>('monthly');

  const pillars = [
    'Foundations of Modern Web Development.',
    'MERN Stack Mastery with Next.js.',
    'AI Engineering & Intelligent Workflows'
  ];

  return (
    <section id="Curriculum-pricing" className="py-16 sm:py-20 bg-[#F7F7F7] border-t border-black/5 text-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag & Heading */}
        <div className="text-center">
          <div className="flex justify-center">
            <SectionPill label="03. Modules" variant="light" />
          </div>
          <h2 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-[22px] font-normal text-black tracking-tight leading-snug font-sans">
            Curriculum &amp; Pay-As-You-Go Modules
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12 sm:mt-16">
          {/* Left Column: Curriculum Overview */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-black">
              Curriculum
            </h3>

            <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-normal">
              it’s a strategic power move for your career. We’re not just another building course; we’re your launchpad into the future of tech, backed by solid stats and a mission to make you unstoppable. Here’s why you need to be with us:
            </p>

            <div className="space-y-4 pt-2">
              <h4 className="text-lg sm:text-xl font-bold text-black">
                Core Pillars:
              </h4>

              <div className="space-y-3">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2A6EB4] shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg text-[#222222] font-medium">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Curriculum Button - Transparent with gradient border */}
            <div className="pt-6">
              <a
                href="https://vibeacademy.info/wp-content/uploads/2026/05/3-month-curriculum.pdf"
                target="_blank"
                rel="noreferrer"
                className="vibe-btn-light !px-7 !py-3 !text-xs sm:!text-sm font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#4467b0]" />
                <span>Download Curriculum For Free</span>
              </a>
            </div>
          </div>

          {/* Right Column: Pay-As-You-Go Modules & Pricing */}
          <div className="lg:col-span-6 bg-white border border-black/10 rounded-[35px] p-6 sm:p-10 shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-black">
                Pay-As-You-Go Modules
              </h3>

              {/* Plan Switcher Toggle */}
              <div className="flex items-center bg-[#F2F2F2] p-1 rounded-full border border-black/10 self-start sm:self-auto">
                <button
                  onClick={() => setPricingPlan('monthly')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${pricingPlan === 'monthly'
                    ? 'bg-black text-white shadow-md'
                    : 'text-[#666666] hover:text-black'
                    }`}
                >
                  Monthly Tier
                </button>
                <button
                  onClick={() => setPricingPlan('bundle')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${pricingPlan === 'bundle'
                    ? 'bg-black text-white shadow-md'
                    : 'text-[#666666] hover:text-black'
                    }`}
                >
                  Total Bundle
                </button>
              </div>
            </div>

            {/* Pricing Card Display */}
            {pricingPlan === 'monthly' ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-black/10 pb-6 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#4467b0]">
                    Flexible Enrollment
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-normal text-[#555555]">PKR</span>
                    <span className="text-lg sm:text-xl font-normal text-black tracking-tight" style={{ fontSize: '70px' }}>
                      6,000
                    </span>
                    <span className="text-sm text-[#777777]">/ Month</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#666666] pt-2">
                    Limited seats available for Batch 1. BIC Lab capacity capped
                  </p>
                </div>

                <div className="space-y-3 text-sm text-[#333333]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c9459c]" />
                    <span>Pay month-to-month with complete flexibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c9459c]" />
                    <span>Full access to live lab sessions &amp; recorded archives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c9459c]" />
                    <span>Mentorship desk at University of Haripur BIC</span>
                  </div>
                </div>

                {/* Apply Button - Transparent with gradient border */}
                <button
                  onClick={onOpenApply}
                  className="w-full vibe-btn-light !py-3.5 !text-xs sm:!text-sm font-semibold uppercase tracking-wider flex items-center justify-center"
                >
                  <span>APPLY FOR COHORT 02</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-black/10 pb-6 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#c9459c]">
                    Best Value Full Accelerator
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-normal text-[#555555]">PKR</span>
                    <span className="text-lg sm:text-xl font-normal text-black tracking-tight" style={{ fontSize: '70px' }}>
                      16,500
                    </span>
                    <span className="text-sm text-[#777777]">/ Total Bundle</span>
                  </div>



                  <p className="text-xs sm:text-sm text-[#666666] pt-2">
                    Limited seats available for Batch 1. BIC Lab capacity capped
                  </p>
                </div>

                <div className="space-y-3 text-sm text-[#333333]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4467b0]" />
                    <span>Complete 3-month Zero-to-Hero curriculum access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4467b0]" />
                    <span>Priority 1-on-1 graduation review &amp; career placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4467b0]" />
                    <span>Official University of Haripur BIC Certificate</span>
                  </div>
                </div>

                {/* Apply Button - Transparent with gradient border */}
                <button
                  onClick={onOpenApply}
                  className="w-full vibe-btn-light !py-3.5 !text-xs sm:!text-sm font-semibold uppercase tracking-wider flex items-center justify-center"
                >
                  <span>APPLY FOR COHORT 02</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
