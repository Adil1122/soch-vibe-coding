import React, { useEffect, useRef, useState } from 'react';
import { Trophy, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface RoadmapProps {
  onOpenApply: () => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ onOpenApply }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  const stages = [
    {
      number: '01',
      title: 'Mastering the Logic (Foundations)',
      description: "We kick things off by building your core programming muscles. You'll dive deep into modern web architectures, logical problem-solving, and the power of TypeScript supercharged by AI coding workflows. This is where you learn to think like an engineer, not a syntax compiler",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/1.-Mastering-the-Logic-Foundations.webp',
      badge: 'Core Foundations'
    },
    {
      number: '02',
      title: 'Building Reality (MERN Stack)',
      description: "Ever dreamt of launching production-ready applications? Here, you'll learn to build dynamic, real-world web systems using the MERN Stack (MongoDB, Express.js, React, Node.js), optimized with Next.js. Go from sleek front-ends to robust, scalable backend data layers",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/2.-Building-Reality-MERN-Stack.webp',
      badge: 'Full-Stack Architecture'
    },
    {
      number: '03',
      title: 'Breaking the Matrix (AI Engineering)',
      description: "This is where you level up to autonomous AI workflows. You'll integrate cutting-edge AI tools and engineering techniques into your development process, learning to automate, innovate, and solve complex production scale problems with artificial intelligence.",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/3.-Breaking-the-Matrix-AI-Engineering.webp',
      badge: 'AI Acceleration'
    },
    {
      number: '04',
      title: 'Project Power-Up (Portfolio Building)',
      description: "Theory is cool, but execution is king. Throughout the accelerator, you'll build hands-on projects that culminate in a powerful, market-validated portfolio. These aren't generic lab assignments; they're your real-world battle scars for global hiring managers.",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/4.-Project-Power-Up-Portfolio-Building.webp',
      badge: 'Production Systems'
    },
    {
      number: '05',
      title: 'Launchpad to Success (Career Integration)',
      description: "We don't just teach; we launch tech careers. Backed officially by the University of Haripur Business Incubation Center (BIC), you'll gain elite entry into the job market, rigorous interview prep, and proprietary strategies to land high-paying AI engineering roles.",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/5.-Launchpad-to-Success-Career-Integration.webp',
      badge: 'Career & Incubation'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the timeline has entered the viewport
      const totalH = rect.height;
      const startTrigger = windowHeight * 0.75;
      const currentScroll = startTrigger - rect.top;

      let progress = (currentScroll / totalH) * 100;
      if (progress < 0) progress = 0;
      if (progress > 100) progress = 100;

      setFillHeight(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section id="roadmap" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Tag */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#1E2A4F] text-white font-poppins">
            02. Roadmap
          </span>
        </div>

        {/* Section Heading & Subhead from Reference */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            The "Zero to Hero" Roadmap
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Ready to go from zero building knowledge to a full-stack AI engineering pro? Our 'Vibe Coding' journey is explicitly engineered to transform you, step-by-step, into an in-demand global tech talent. This isn't just a course; it's your operational blueprint to becoming a digital architect backed by the <strong>University of Haripur BIC.</strong>
          </p>
        </div>

        {/* Entire Vertical Roadmap with Progressive Connecting Line */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto pt-8 pb-16">
          {/* Vertical Connecting Line (Centered on Desktop, Left on Mobile) */}
          <div className="absolute top-8 bottom-24 left-6 md:left-1/2 w-2.5 -translate-x-1/2 bg-[#E2E8F0] rounded-full overflow-hidden z-0 shadow-inner">
            <div
              className="w-full transition-all duration-150 ease-out rounded-full"
              style={{
                height: `${fillHeight}%`,
                background: 'linear-gradient(180deg, #4467b0, #6b388d, #78daeb, #c9459a)'
              }}
            />
          </div>

          {/* Timeline Stages (01 to 05) */}
          <div className="space-y-12 sm:space-y-16 relative z-10">
            {stages.map((stage, idx) => {
              const isEven = idx % 2 === 1; // Alternating layout on desktop
              const stageTriggerPct = ((idx + 0.5) / (stages.length + 0.5)) * 100;
              const isPassed = fillHeight >= stageTriggerPct;

              return (
                <div
                  key={stage.number}
                  className={`flex flex-col md:flex-row items-center gap-6 sm:gap-10 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left Side (or Right if Even on Desktop) */}
                  <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                    isEven ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'
                  }`}>
                    <div className="bg-[#F8FAFC] border border-slate-200/90 hover:border-[#2A6EB4]/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                      <div className={`flex items-center gap-2 mb-3 ${
                        isEven ? 'justify-start' : 'justify-start md:justify-end'
                      }`}>
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#1E2A4F] text-white">
                          STAGE {stage.number}
                        </span>
                        <span className="text-[11px] font-semibold text-[#2A6EB4] bg-[#2A6EB4]/10 px-2 py-0.5 rounded-full">
                          {stage.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-poppins text-[#1E2A4F] group-hover:text-[#2A6EB4] transition-colors leading-snug">
                        {stage.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node / Dot with Number Indicator */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 shadow-md ${
                        isPassed
                          ? 'bg-[#1E2A4F] text-white border-[#F38A32] scale-110 ring-4 ring-[#F38A32]/30'
                          : 'bg-white text-slate-500 border-slate-300'
                      }`}
                    >
                      {stage.number}
                    </div>
                  </div>

                  {/* Visual Image / Preview Side */}
                  <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                    isEven ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <div className="bg-[#1E2A4F] rounded-3xl p-3 border-2 border-slate-200 shadow-lg overflow-hidden group hover:scale-[1.02] transition-transform">
                      <div className="aspect-[16/10] bg-slate-900 rounded-2xl overflow-hidden relative flex items-center justify-center">
                        <img
                          src={stage.img}
                          alt={stage.title}
                          onError={(e) => {
                            // Fallback visual illustration if image CDN fails
                            (e.target as HTMLElement).style.opacity = '0.4';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A4F]/80 via-transparent to-transparent flex items-end p-4">
                          <span className="text-white text-xs font-poppins font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#F38A32]" />
                            <span>{stage.title}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Milestone: The Golden Trophy at the Bottom */}
          <div className="pt-16 text-center relative z-20">
            <div className="inline-block relative">
              {/* Connecting stub to trophy */}
              <div className="w-2.5 h-10 bg-[#E2E8F0] mx-auto rounded-full overflow-hidden mb-2">
                <div
                  className="w-full h-full transition-all duration-300"
                  style={{
                    height: fillHeight >= 95 ? '100%' : '0%',
                    background: 'linear-gradient(180deg, #78daeb, #c9459a)'
                  }}
                />
              </div>

              {/* Big Golden Trophy Node */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 ${
                  fillHeight >= 90
                    ? 'bg-gradient-to-tr from-[#F38A32] to-amber-300 text-white scale-110 ring-8 ring-amber-400/20'
                    : 'bg-[#1E2A4F] text-slate-400 border-2 border-slate-300'
                }`}
              >
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              {/* Trophy Description */}
              <div className="mt-6 space-y-2 max-w-md mx-auto">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#458543]/15 text-[#458543] font-poppins">
                  Milestone Completed
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-[#1E2A4F]">
                  Certified AI Software Engineer
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Graduate equipped with market-validated full-stack MERN & AI engineering workflows, portfolio battle scars, and UOH BIC incubation launch credentials.
                </p>

                <div className="pt-4">
                  <button
                    onClick={onOpenApply}
                    className="px-8 py-3.5 bg-[#F38A32] hover:bg-[#e07b27] text-white font-bold font-poppins text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    Start Your Journey in Cohort 02
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
