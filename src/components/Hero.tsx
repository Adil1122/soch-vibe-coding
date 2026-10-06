import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Cpu, Terminal, Layers, Play } from 'lucide-react';

interface HeroProps {
  onOpenApply: () => void;
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply, onOpenVideo }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white">
      {/* Subtle background tech accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none select-none -z-10">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#2A6EB4]/5 rounded-full blur-3xl" />
        <div className="absolute top-36 right-1/4 w-96 h-96 bg-[#F38A32]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Credibility & Cohort Tag */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F38A32]/10 text-[#F38A32] border border-[#F38A32]/30 uppercase tracking-wider font-poppins">
                <span className="w-2 h-2 rounded-full bg-[#F38A32] animate-ping"></span>
                Cohort 02 is Now Open
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F4F6F9] text-[#1E2A4F] border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#458543]" />
                <span>University of Haripur – Business Incubation Center</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <span className="block text-sm font-bold uppercase tracking-widest text-[#2A6EB4] font-poppins">
                SOCH – Vibe Coding
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight leading-[1.15]">
                Master AI-Accelerated Software Engineering
              </h1>
            </div>

            {/* Supporting Message */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Learn how to combine software engineering fundamentals, human problem-solving, and AI-powered development workflows to build real-world software dramatically faster.
            </p>

            {/* Key Axiom Pill */}
            <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-[#F4F6F9] border border-slate-200 text-xs sm:text-sm text-[#1E2A4F] font-medium shadow-sm">
              <span className="text-[#F38A32] font-bold">5x Velocity:</span>
              <span>Human Thinking + AI + Engineering = 5x Faster Software Development</span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto px-8 py-4 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-sm font-bold uppercase tracking-wider font-poppins transition-all duration-200 shadow-lg shadow-[#F38A32]/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for Cohort 02</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#roadmap"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#F4F6F9] text-[#1E2A4F] border border-slate-300 rounded-xl text-sm font-semibold font-poppins transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2"
              >
                <span>Explore the Roadmap</span>
              </a>

              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#2A6EB4] hover:text-[#1E2A4F] py-2 px-3 transition cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#2A6EB4]/10 flex items-center justify-center text-[#2A6EB4]">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Intro Video</span>
              </button>
            </div>

            {/* Metrics stats row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1E2A4F] font-poppins">5x</div>
                <div className="text-xs text-slate-500 mt-0.5">Development Speed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#2A6EB4] font-poppins">10</div>
                <div className="text-xs text-slate-500 mt-0.5">Curriculum Stages</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#458543] font-poppins">UOH BIC</div>
                <div className="text-xs text-slate-500 mt-0.5">Official Incubation</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Architecture Element */}
          {/* "Human Intelligence → AI → Engineering → Production" */}
          <div className="lg:col-span-5">
            <div className="bg-[#1E2A4F] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-700/50 relative overflow-hidden">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">soch-workflow.ts</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#F38A32]/20 text-[#F38A32] border border-[#F38A32]/40 px-2 py-0.5 rounded">
                  STAGE 07: VIBE
                </span>
              </div>

              {/* The 4-step Pipeline Diagram */}
              <div className="space-y-3.5">
                {/* Step 1: Human Intelligence */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#2A6EB4] flex items-center justify-center text-white shrink-0 font-bold">
                      🧠
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#2A6EB4] font-bold">Step 01</div>
                      <div className="font-poppins font-semibold text-sm text-white">Human Intelligence</div>
                      <p className="text-[11px] text-slate-400">Problem discovery, user reality & intent</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">INPUT</span>
                </div>

                <div className="text-center text-[#F38A32] text-xs font-bold font-mono">↓ DIRECT & AMPLIFY</div>

                {/* Step 2: AI Assistance */}
                <div className="bg-white/5 border border-[#F38A32]/30 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F38A32] flex items-center justify-center text-white shrink-0 font-bold">
                      ⚡
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#F38A32] font-bold">Step 02</div>
                      <div className="font-poppins font-semibold text-sm text-white">AI Acceleration</div>
                      <p className="text-[11px] text-slate-400">Cursor, Claude 3.7, Gemini, LLM tools</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#F38A32] font-bold">5X SPEED</span>
                </div>

                <div className="text-center text-[#458543] text-xs font-bold font-mono">↓ ARCHITECT & VALIDATE</div>

                {/* Step 3: Software Engineering */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#458543] flex items-center justify-center text-white shrink-0 font-bold">
                      🛠️
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#458543] font-bold">Step 03</div>
                      <div className="font-poppins font-semibold text-sm text-white">Software Engineering</div>
                      <p className="text-[11px] text-slate-400">TypeScript, Next.js, APIs, System Design</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">RIGOR</span>
                </div>

                <div className="text-center text-[#7D52A0] text-xs font-bold font-mono">↓ SHIP TO LIVE USERS</div>

                {/* Step 4: Production */}
                <div className="bg-gradient-to-r from-[#7D52A0]/40 to-[#1E2A4F] border border-[#7D52A0]/50 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#7D52A0] flex items-center justify-center text-white shrink-0 font-bold">
                      🚀
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-purple-300 font-bold">Step 04</div>
                      <div className="font-poppins font-semibold text-sm text-white">Production-Ready Software</div>
                      <p className="text-[11px] text-slate-300">Haripur to Global Markets 🇵🇰</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-[#458543] text-white px-2 py-0.5 rounded">LIVE</span>
                </div>
              </div>

              {/* Thesis summary */}
              <div className="mt-5 pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-slate-300 italic">
                  "AI does not replace the engineer. AI amplifies the engineer."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
