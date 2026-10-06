import React, { useState } from 'react';
import { Play, Check, X as XIcon, ArrowRight, Sparkles, Terminal, ShieldAlert, Cpu } from 'lucide-react';

interface WhatIsVibeCodingProps {
  onOpenVideo: () => void;
  onOpenApply: () => void;
}

export const WhatIsVibeCoding: React.FC<WhatIsVibeCodingProps> = ({ onOpenVideo, onOpenApply }) => {
  const steps = [
    { label: 'Think', desc: 'Identify core problem & customer requirements', color: 'bg-[#2A6EB4]' },
    { label: 'Understand', desc: 'Structure architecture & data contracts', color: 'bg-[#1E2A4F]' },
    { label: 'Direct AI', desc: 'Craft precise architectural prompts & constraints', color: 'bg-[#F38A32]' },
    { label: 'Build', desc: 'Synthesize code & integrate fullstack modules', color: 'bg-[#458543]' },
    { label: 'Test', desc: 'Automated test suites & edge case verification', color: 'bg-[#2A6EB4]' },
    { label: 'Review', desc: 'Code auditing, clean patterns & security checks', color: 'bg-[#7D52A0]' },
    { label: 'Improve', desc: 'Self-healing error fixes & performance polish', color: 'bg-[#F38A32]' },
    { label: 'Deploy', desc: 'Production release, Docker, cloud & monitoring', color: 'bg-[#458543]' }
  ];

  return (
    <section id="what-is-vibe-coding" className="py-20 md:py-28 bg-[#F4F6F9] border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#2A6EB4]/10 text-[#2A6EB4] border border-[#2A6EB4]/30 uppercase tracking-wider font-poppins">
            <Sparkles className="w-3.5 h-3.5 text-[#F38A32]" />
            <span>Core Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            What is Vibe Coding?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Vibe Coding is a modern software engineering approach where developers combine 
            <strong> engineering knowledge</strong>, <strong>problem-solving</strong>, 
            <strong> AI coding assistants</strong>, and <strong>rapid development workflows</strong> to 
            transform ideas into working software faster.
          </p>
        </div>

        {/* Video Feature Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#1E2A4F] group">
            {/* Poster / Thumbnail image with overlay */}
            <div className="aspect-video relative overflow-hidden bg-gradient-to-tr from-[#1E2A4F] via-[#0f172a] to-[#2A6EB4]/40 flex items-center justify-center p-6 text-center">
              {/* Background preview grid lines */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

              <div className="relative z-10 space-y-4 max-w-md">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#F38A32] text-white uppercase tracking-wider">
                  Program Overview Video • 3 Minutes
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white">
                  Discover the SOCH Vibe Coding Workflow
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Watch how our students combine human intent and AI tools to construct production-ready web apps 5x faster at the University of Haripur BIC.
                </p>

                {/* Big Play Button */}
                <div className="pt-2">
                  <button
                    onClick={onOpenVideo}
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F38A32] hover:bg-[#e07b27] text-white shadow-2xl shadow-[#F38A32]/40 transition-all duration-300 hover:scale-110 cursor-pointer"
                    aria-label="Play introductory video"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                </div>
              </div>

              {/* Bottom tag bar */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-slate-300 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 hidden sm:flex">
                <span>🎙️ Featuring: Engr. Adil Khan & Cohort 01 Builders</span>
                <span className="text-[#F38A32] font-semibold">Click to Play Lightbox</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Contrast: What Vibe Coding IS vs NOT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: What Vibe Coding is NOT */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-rose-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <XIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-rose-600 font-bold">Misconception</span>
                <h3 className="text-lg font-bold font-poppins text-[#1E2A4F]">What Vibe Coding is NOT</h3>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 text-xs mt-0.5">✕</span>
                <span><strong>Blindly asking AI to write code:</strong> Hoping an LLM guesses your architecture without constraints or clear domain data structures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 text-xs mt-0.5">✕</span>
                <span><strong>Copy-pasting unverified snippets:</strong> Pasting unread outputs into production, leading to security flaws and brittle regressions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 text-xs mt-0.5">✕</span>
                <span><strong>Avoiding fundamentals:</strong> Thinking AI replaces the need to understand data structures, HTTP cycles, and database modeling.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: What Vibe Coding IS */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-emerald-100">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#458543] flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#458543] font-bold">The Truth</span>
                <h3 className="text-lg font-bold font-poppins text-[#1E2A4F]">What Vibe Coding IS</h3>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#458543] flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
                <span><strong>Directorial engineering:</strong> You define the system boundaries, data contracts, and design tokens; AI handles the boilerplate.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#458543] flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
                <span><strong>Rapid feedback loops:</strong> Instant visual and runtime testing, feeding error logs directly back for surgical self-healing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#458543] flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
                <span><strong>5x Faster delivery:</strong> Taking high-level ideas from concept to live deployment in days rather than months.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The 8-Step Directorial Loop */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#F38A32] uppercase tracking-widest font-poppins">
              The End-to-End Pipeline
            </span>
            <h3 className="text-2xl font-bold font-poppins text-[#1E2A4F]">
              The 8-Step Vibe Coding Directorial Loop
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Every graduate of SOCH executes this continuous rhythm to build production-grade applications.
            </p>
          </div>

          {/* Grid of Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-[#F4F6F9] hover:bg-white border border-slate-200 hover:border-[#2A6EB4] p-3.5 rounded-xl text-center space-y-2 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className={`w-6 h-6 mx-auto rounded-full ${st.color} text-white font-mono text-xs font-bold flex items-center justify-center mb-1.5`}>
                    {idx + 1}
                  </div>
                  <div className="font-poppins font-bold text-xs text-[#1E2A4F]">
                    {st.label}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 leading-snug">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onOpenApply}
              className="inline-flex items-center gap-2 text-xs font-bold font-poppins text-[#F38A32] hover:text-[#e07b27] uppercase tracking-wider"
            >
              <span>Master This Loop in Cohort 02</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
