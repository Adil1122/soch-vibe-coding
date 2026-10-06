import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../data/websiteData';
import { Zap, Laptop, Cpu, ShieldCheck, TrendingUp, GraduationCap, Globe, CheckCircle, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenApply: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenApply }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return Zap;
      case 'Laptop': return Laptop;
      case 'Cpu': return Cpu;
      case 'ShieldCheck': return ShieldCheck;
      case 'TrendingUp': return TrendingUp;
      case 'GraduationCap': return GraduationCap;
      case 'Globe': return Globe;
      default: return CheckCircle;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#1E2A4F]/10 text-[#1E2A4F] border border-[#1E2A4F]/20 uppercase tracking-wider font-poppins">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2A6EB4]" />
            <span>The SOCH Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            Why Choose SOCH – Vibe Coding?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We are not a conventional coding academy. We are an advanced university-backed technology initiative preparing students for the real future of software engineering.
          </p>
        </div>

        {/* 7 Distinct Numbered Cards (01 to 07 - correctly ordered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_POINTS.map((pt, idx) => {
            const Icon = getIcon(pt.iconName);
            const isFeatured = idx === 5 || idx === 6; // University & Global
            return (
              <div
                key={pt.number}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 border ${
                  isFeatured
                    ? 'bg-[#1E2A4F] text-white border-slate-700 shadow-xl'
                    : 'bg-[#F4F6F9] text-[#1E2A4F] border-slate-200 hover:border-[#2A6EB4]/50 hover:bg-white hover:shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  {/* Card Top: Number & Tag */}
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xl font-extrabold ${isFeatured ? 'text-[#F38A32]' : 'text-[#2A6EB4]'}`}>
                      {pt.number}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      isFeatured ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-slate-700 border border-slate-200'
                    }`}>
                      {pt.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isFeatured ? 'bg-white/10 text-[#F38A32]' : 'bg-[#1E2A4F] text-white'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`font-poppins font-bold text-lg ${isFeatured ? 'text-white' : 'text-[#1E2A4F]'}`}>
                      {pt.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed ${isFeatured ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pt.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/40 text-[11px] font-medium opacity-80">
                  {idx === 0 && '⚡ 5x faster engineering loops'}
                  {idx === 1 && '📦 Zero filler theory; pure code'}
                  {idx === 2 && '🧠 Understand how code executes'}
                  {idx === 3 && '🔒 Docker, CI/CD, and live releases'}
                  {idx === 4 && '💡 Commercial validation & grants'}
                  {idx === 5 && '🏛️ Academic credit & co-working'}
                  {idx === 6 && '🇵🇰 Haripur to Silicon Valley & beyond'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Strip */}
        <div className="bg-[#F4F6F9] border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold font-poppins text-[#1E2A4F]">
              Be Among the Select Few in Cohort 02
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Cohort 01 proved that Haripur talent can build production-ready systems. Now it's your turn.
            </p>
          </div>
          <button
            onClick={onOpenApply}
            className="px-6 py-3 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-poppins shadow-md transition cursor-pointer shrink-0"
          >
            Apply for Cohort 02
          </button>
        </div>
      </div>
    </section>
  );
};
