import React from 'react';
import { Compass, Eye, Sparkles, HeartHandshake, ShieldCheck, ArrowRight, Globe, GraduationCap } from 'lucide-react';

interface MissionVisionProps {
  onOpenApply: () => void;
}

export const MissionVision: React.FC<MissionVisionProps> = ({ onOpenApply }) => {
  const pillars = [
    {
      name: 'SEEK',
      color: '#2A6EB4',
      bgLight: 'bg-[#2A6EB4]/10',
      borderColor: 'border-[#2A6EB4]',
      textColor: 'text-[#2A6EB4]',
      action: 'Discover problems and opportunities.',
      description: 'Train your perception to identify latent market inefficiencies, underserved communities, and breakthrough technical opportunities.',
      icon: Compass
    },
    {
      name: 'OBSERVE',
      color: '#458543',
      bgLight: 'bg-[#458543]/10',
      borderColor: 'border-[#458543]',
      textColor: 'text-[#458543]',
      action: 'Understand reality, users and systems.',
      description: 'Study human behavior, system failure modes, and user friction. True software excellence begins with genuine empathy and analytical clarity.',
      icon: Eye
    },
    {
      name: 'CREATE',
      color: '#F38A32',
      bgLight: 'bg-[#F38A32]/10',
      borderColor: 'border-[#F38A32]',
      textColor: 'text-[#F38A32]',
      action: 'Build solutions using human intelligence and AI.',
      description: 'Combine deep computer science foundations with AI workflows to construct robust, production-ready software 5x faster.',
      icon: Sparkles
    },
    {
      name: 'HOPE',
      color: '#7D52A0',
      bgLight: 'bg-[#7D52A0]/10',
      borderColor: 'border-[#7D52A0]',
      textColor: 'text-[#7D52A0]',
      action: 'Create impact and opportunities for the future.',
      description: 'Generate sustainable economic prosperity, remote global employment, and high-impact technology ventures born right here in Haripur.',
      icon: HeartHandshake
    }
  ];

  const transformationStages = [
    'Student',
    'Learner',
    'Engineer',
    'AI-Accelerated Builder',
    'Problem Solver',
    'Product Creator',
    'Entrepreneur / Global Engineer'
  ];

  return (
    <section id="mission-vision" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#7D52A0]/10 text-[#7D52A0] border border-[#7D52A0]/30 uppercase tracking-wider font-poppins">
            <Globe className="w-3.5 h-3.5 text-[#7D52A0]" />
            <span>The SOCH Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            From Haripur to the World 🇵🇰
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            SOCH is not simply teaching students how to code. It is building a high-velocity technology pipeline and innovation ecosystem backed by the University of Haripur Business Incubation Center.
          </p>
        </div>

        {/* The 4 SOCH Pillars Connected Visually */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-poppins">
              The 4 Pillars of the SOCH Philosophy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div
                  key={pil.name}
                  className={`bg-white rounded-3xl p-7 border-2 ${pil.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
                >
                  <div className="space-y-4">
                    {/* Top: Icon & Name */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${pil.bgLight} ${pil.textColor} flex items-center justify-center font-bold`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className={`font-poppins font-extrabold text-2xl ${pil.textColor} tracking-tight`}>
                        {pil.name}
                      </h3>
                      <p className="text-xs font-bold text-[#1E2A4F] mt-1 font-poppins">
                        {pil.action}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pil.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>SOCH Pillar</span>
                    <span className={pil.textColor}>● Active Focus</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision & Mission Highlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-[#1E2A4F] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#F38A32] text-white uppercase tracking-wider font-poppins">
              Our Vision
            </div>
            <h3 className="text-2xl font-bold font-poppins text-white leading-snug">
              Building a High-Velocity Technology Ecosystem
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              "SOCH aims to build a high-velocity technology ecosystem that transforms local talent into globally competitive innovators, engineers, entrepreneurs, and digital creators."
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#458543]" />
              <span>University of Haripur – Innovation Corridor</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-[#F4F6F9] border-2 border-[#2A6EB4]/30 rounded-3xl p-8 sm:p-10 shadow-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#2A6EB4] text-white uppercase tracking-wider font-poppins">
              Our Mission
            </div>
            <h3 className="text-2xl font-bold font-poppins text-[#1E2A4F] leading-snug">
              Democratizing AI Engineering for Pakistani Youth
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              "To democratize AI engineering and transform local Pakistani talent into globally competitive digital architects who build production-ready software 5x faster using next-generation workflows."
            </p>
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#458543]" />
              <span>Officially backed by University of Haripur (UOH) BIC</span>
            </div>
          </div>
        </div>

        {/* Student Transformation Trajectory (The 7 Stages) */}
        <div className="bg-[#1E2A4F] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#F38A32] uppercase tracking-widest font-poppins">
              The Evolution of a SOCH Engineer
            </span>
            <h3 className="text-2xl font-bold font-poppins text-white">
              The 7-Step Student Journey
            </h3>
            <p className="text-xs text-slate-300">
              How our structured program elevates students into global technology builders.
            </p>
          </div>

          {/* Desktop flow row / Mobile stack */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 overflow-x-auto py-2">
            {transformationStages.map((stage, idx) => (
              <React.Fragment key={stage}>
                <div className="bg-white/10 border border-white/15 px-3.5 py-3 rounded-2xl text-center min-w-[130px] w-full md:w-auto hover:bg-white/20 transition">
                  <div className="text-[10px] font-mono text-[#F38A32] font-bold">0{idx + 1}</div>
                  <div className="text-xs font-poppins font-bold text-white mt-0.5 whitespace-nowrap">
                    {stage}
                  </div>
                </div>
                {idx < transformationStages.length - 1 && (
                  <div className="hidden md:block text-[#2A6EB4] font-bold text-sm">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
