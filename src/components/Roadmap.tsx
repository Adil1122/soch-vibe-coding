import React, { useState } from 'react';
import { ROADMAP_STAGES, RoadmapStage } from '../data/websiteData';
import { CheckCircle2, ChevronRight, Sparkles, Layers, ArrowRight, Award } from 'lucide-react';

interface RoadmapProps {
  onOpenApply: () => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ onOpenApply }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = ROADMAP_STAGES[activeStageIndex];

  return (
    <section id="roadmap" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#458543]/10 text-[#458543] border border-[#458543]/30 uppercase tracking-wider font-poppins">
            <Layers className="w-3.5 h-3.5 text-[#458543]" />
            <span>Curriculum Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            The 10-Stage Student Journey
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From foundational computational thinking to building, deploying, and monetizing production-ready software with AI acceleration.
          </p>
        </div>

        {/* Desktop Horizontal Milestone Selector (Curved visual journey) */}
        <div className="hidden lg:block relative pb-4">
          {/* Connecting line */}
          <div className="absolute top-7 left-12 right-12 h-1 bg-gradient-to-r from-[#2A6EB4] via-[#F38A32] to-[#7D52A0] rounded-full z-0 opacity-40"></div>

          <div className="grid grid-cols-10 gap-2 relative z-10">
            {ROADMAP_STAGES.map((stg, idx) => {
              const isSelected = activeStageIndex === idx;
              return (
                <button
                  key={stg.number}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'scale-105'
                      : 'hover:opacity-80'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-poppins font-bold text-sm shadow-md transition-all ${
                      isSelected
                        ? 'bg-[#1E2A4F] text-white ring-4 ring-[#F38A32]/40 shadow-lg'
                        : 'bg-[#F4F6F9] text-[#1E2A4F] border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {stg.number}
                  </div>
                  <span className={`text-[11px] font-poppins font-semibold mt-2 line-clamp-2 leading-tight ${
                    isSelected ? 'text-[#1E2A4F] font-bold' : 'text-slate-500'
                  }`}>
                    {stg.title.split(' ')[0]} {stg.title.split(' ')[1] || ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Showcase Card (Desktop & Mobile view) */}
        <div className="bg-[#1E2A4F] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700/60 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#F38A32] text-white">
                  STAGE {activeStage.number} OF 10
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-sky-200">
                  Focus: {activeStage.focus}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
                {activeStage.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeStage.description}
              </p>

              {/* Acquired Skills */}
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-2 font-poppins">
                  Key Skills & Concepts Mastered:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStage.keySkills.map((sk, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-white/10 text-white border border-white/15"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#458543]" />
                      <span>{sk}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverable Box */}
            <div className="w-full lg:w-80 bg-white/10 border border-white/15 p-6 rounded-2xl space-y-3 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F38A32] font-poppins">
                <Award className="w-4 h-4" />
                <span>Capstone Deliverable</span>
              </div>
              <h4 className="text-base font-bold font-poppins text-white">
                {activeStage.deliverable}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every student deploys this milestone to their public portfolio before advancing to the next stage.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenApply}
                  className="w-full py-2.5 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow cursor-pointer"
                >
                  Join Cohort 02
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline (320px to 768px) */}
        <div className="block lg:hidden space-y-4 pt-4">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tap any stage to view details above
            </span>
          </div>

          <div className="relative pl-6 border-l-2 border-[#2A6EB4]/30 space-y-6">
            {ROADMAP_STAGES.map((stg, idx) => {
              const isSelected = activeStageIndex === idx;
              return (
                <div
                  key={stg.number}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E2A4F] text-white border-[#F38A32] shadow-md'
                      : 'bg-[#F4F6F9] border-slate-200 text-[#1E2A4F]'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[31px] top-4 w-4 h-4 rounded-full border-2 border-white ${
                      isSelected ? 'bg-[#F38A32] ring-4 ring-[#F38A32]/30' : 'bg-[#2A6EB4]'
                    }`}
                  />

                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#F38A32]' : 'text-[#2A6EB4]'}`}>
                      STAGE {stg.number}
                    </span>
                    <span className="text-[10px] opacity-75 font-medium">{stg.focus}</span>
                  </div>

                  <h4 className="font-poppins font-bold text-sm">
                    {stg.title}
                  </h4>
                  <p className={`text-xs mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {stg.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
