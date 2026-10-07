import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

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
    <section id="Curriculum-pricing" className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Tag & Heading */}
        <div className="text-center space-y-4">
          <span className="section-tag">
            03. Modules
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Curriculum &amp; Pay-As-You-Go Modules
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12">
          {/* Left Column: Curriculum Overview */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Curriculum
            </h3>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              it’s a strategic power move for your career. We’re not just another building course; we’re your launchpad into the future of tech, backed by solid stats and a mission to make you unstoppable. Here’s why you need to be with us:
            </p>

            <div className="space-y-4 pt-2">
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                Core Pillars:
              </h4>

              <div className="space-y-3">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#78daeb] shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg text-white/90 font-medium">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Curriculum Button */}
            <div className="pt-6">
              <a
                href="https://vibeacademy.info/wp-content/uploads/2026/05/3-month-curriculum.pdf"
                target="_blank"
                rel="noreferrer"
                className="custom-btn cursor-pointer inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4 mr-1 text-[#78daeb]" />
                <span className="btn-text">Download Curriculum For Free</span>
              </a>
            </div>
          </div>

          {/* Right Column: Pay-As-You-Go Modules & Pricing */}
          <div className="lg:col-span-6 bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Pay-As-You-Go Modules
              </h3>

              {/* Plan Switcher Toggle */}
              <div className="flex items-center bg-black/60 p-1 rounded-full border border-white/20 self-start sm:self-auto">
                <button
                  onClick={() => setPricingPlan('monthly')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                    pricingPlan === 'monthly'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Monthly Tier
                </button>
                <button
                  onClick={() => setPricingPlan('bundle')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                    pricingPlan === 'bundle'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Total Bundle
                </button>
              </div>
            </div>

            {/* Pricing Card Display */}
            {pricingPlan === 'monthly' ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-white/10 pb-6 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#78daeb]">
                    Flexible Enrollment
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white/70">PKR</span>
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                      8,500
                    </span>
                    <span className="text-sm text-white/50">/ Month</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 pt-2">
                    Limited seats available for Batch 1. BIC Lab capacity capped
                  </p>
                </div>

                <div className="space-y-3 text-sm text-white/80">
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

                <button
                  onClick={onOpenApply}
                  className="w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                  }}
                >
                  APPLY FOR COHORT 01
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-b border-white/10 pb-6 space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#c9459c]">
                    Best Value Full Accelerator
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white/70">PKR</span>
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                      25,500
                    </span>
                    <span className="text-sm text-white/50">/ Total Bundle</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 pt-2">
                    Limited seats available for Batch 1. BIC Lab capacity capped
                  </p>
                </div>

                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#78daeb]" />
                    <span>Complete 3-month Zero-to-Hero curriculum access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#78daeb]" />
                    <span>Priority 1-on-1 graduation review &amp; career placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#78daeb]" />
                    <span>Official University of Haripur BIC Certificate</span>
                  </div>
                </div>

                <button
                  onClick={onOpenApply}
                  className="w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                  }}
                >
                  APPLY FOR COHORT 01
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
