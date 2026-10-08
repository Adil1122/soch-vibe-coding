import React, { useEffect, useRef, useState } from 'react';
import { SectionPill } from './SectionPill';

interface RoadmapProps {
  onOpenApply?: () => void;
}

export const Roadmap: React.FC<RoadmapProps> = ({ onOpenApply }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  const stages = [
    {
      num: '01',
      title: 'Mastering the Logic (Foundations)',
      description:
        "We kick things off by building your core programming muscles. You'll dive deep into modern web architectures, logical problem-solving, and the power of TypeScript supercharged by AI coding workflows. This is where you learn to think like an engineer, not a syntax compiler",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/1.-Mastering-the-Logic-Foundations.webp'
    },
    {
      num: '02',
      title: 'Building Reality (MERN Stack)',
      description:
        "Ever dreamt of launching production-ready applications? Here, you'll learn to build dynamic, real-world web systems using the MERN Stack (MongoDB, Express.js, React, Node.js), optimized with Next.js. Go from sleek front-ends to robust, scalable backend data layers",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/2.-Building-Reality-MERN-Stack.webp'
    },
    {
      num: '03',
      title: 'Breaking the Matrix (AI Engineering)',
      description:
        "This is where you level up to autonomous AI workflows. You'll integrate cutting-edge AI tools and engineering techniques into your development process, learning to automate, innovate, and solve complex production scale problems with artificial intelligence.",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/3.-Breaking-the-Matrix-AI-Engineering.webp'
    },
    {
      num: '04',
      title: 'Project Power-Up (Portfolio Building)',
      description:
        "Theory is cool, but execution is king. Throughout the accelerator, you'll build hands-on projects that culminate in a powerful, market-validated portfolio. These aren't generic lab assignments; they're your real-world battle scars for global hiring managers.",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/4.-Project-Power-Up-Portfolio-Building.webp'
    },
    {
      num: '05',
      title: 'Launchpad to Success (Career Integration)',
      description:
        "We don't just teach; we launch tech careers. Backed officially by the University of Haripur Business Incubation Center (BIC) , you'll gain elite entry into the job market, rigorous interview prep, and proprietary strategies to land high-paying AI engineering roles.",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/5.-Launchpad-to-Success-Career-Integration.webp'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalH = rect.height;
      const progress = ((windowHeight * 0.7 - rect.top) / totalH) * 100;
      setFillHeight(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="road-map"
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 29%, #F2F2F2 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Tag */}
        <div className="flex justify-center">
          <SectionPill label="02. Roadmap" variant="light" />
        </div>

        {/* Heading */}
        <h2 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-[22px] font-normal text-black tracking-tight leading-snug font-sans">
          The 'Zero to Hero' Roadmap
        </h2>

        {/* Description */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-[19px] text-[#444444] max-w-3xl mx-auto leading-relaxed font-normal">
          Ready to go from zero building knowledge to a full-stack AI engineering pro? Our 'Vibe Coding' journey is explicitly engineered to transform you, step-by-step, into an in-demand global tech talent. This isn't just a course; it's your operational blueprint to becoming a digital architect backed by the <strong>University of Haripur BIC.</strong>
        </p>
      </div>

      {/* Interactive Timeline Container */}
      <div ref={containerRef} className="max-w-[1000px] mx-auto px-4 sm:px-6 mt-12 sm:mt-16 relative">
        {/* Desktop: Center Connecting Vertical Line (only line, NO pink circles) */}
        <div
          className="hidden md:block absolute left-1/2 top-4 bottom-20 w-[10px] -translate-x-1/2 bg-[#dddddd] rounded-full overflow-hidden"
          style={{ zIndex: 5 }}
        >
          <div
            className="w-full transition-all duration-300 ease-out"
            style={{
              height: `${fillHeight}%`,
              background: 'linear-gradient(180deg, #4467b0, #6b388d, #78daeb, #c9459a)'
            }}
          />
        </div>

        {/* Mobile: Left-Side Vertical Line (only line, NO pink circles) */}
        <div
          className="block md:hidden absolute left-3 sm:left-4 top-4 bottom-24 w-[5px] bg-[#dddddd] rounded-full overflow-hidden"
          style={{ zIndex: 5 }}
        >
          <div
            className="w-full transition-all duration-300 ease-out"
            style={{
              height: `${fillHeight}%`,
              background: 'linear-gradient(180deg, #4467b0, #6b388d, #78daeb, #c9459a)'
            }}
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-6 sm:space-y-8 relative" style={{ zIndex: 1 }}>
          {stages.map((stage, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={stage.num}
                className="bg-[#f3f3f3] text-black rounded-[35px] md:rounded-[60px] p-6 sm:p-7 md:p-8 shadow-sm hover:shadow-md relative transition-transform duration-300 ml-7 sm:ml-9 md:ml-0"
                style={{ zIndex: 1 }}
              >
                {/* 1. MOBILE LAYOUT: Text at top center aligned, all boxes below text CENTER ALIGNED */}
                <div className="block md:hidden space-y-4">
                  {/* Text on top - Center Aligned */}
                  <div className="text-center space-y-2">
                    <div className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Stage {stage.num}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-black leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Icon box below text, CENTER ALIGNED */}
                  <div className="w-full flex justify-center pt-2">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#2b2b2b] rounded-[18px] p-2 flex items-center justify-center shadow-md">
                      <img
                        src={stage.img}
                        alt={stage.title}
                        className="w-[90%] h-[90%] object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. DESKTOP LAYOUT: Alternating two columns */}
                <div className="hidden md:flex items-center justify-between">
                  {/* Left Side Content (Desktop) */}
                  <div
                    className={`w-[45%] flex ${
                      isEven
                        ? 'flex-col items-end text-right'
                        : 'items-center justify-end gap-4'
                    }`}
                  >
                    {isEven ? (
                      // Even items (02, 04): text on the left
                      <div className="space-y-2">
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-black leading-snug">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-[#333333] leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    ) : (
                      // Odd items (01, 03, 05): icon + number on the left
                      <>
                        <div className="w-[150px] h-[150px] bg-[#2b2b2b] rounded-[18px] p-2 flex items-center justify-center shrink-0 shadow-md">
                          <img
                            src={stage.img}
                            alt={stage.title}
                            className="w-[90%] h-[90%] object-contain"
                          />
                        </div>
                        <span className="bg-white text-[#888] font-bold text-[13px] px-3 py-1.5 rounded-full shadow-sm shrink-0">
                          {stage.num}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Right Side Content (Desktop) */}
                  <div
                    className={`w-[45%] flex ${
                      isEven
                        ? 'items-center justify-start gap-4'
                        : 'flex-col items-start text-left'
                    }`}
                  >
                    {isEven ? (
                      // Even items (02, 04): number + icon on the right
                      <>
                        <span className="bg-white text-[#888] font-bold text-[13px] px-3 py-1.5 rounded-full shadow-sm shrink-0">
                          {stage.num}
                        </span>
                        <div className="w-[150px] h-[150px] bg-[#2b2b2b] rounded-[18px] p-2 flex items-center justify-center shrink-0 shadow-md">
                          <img
                            src={stage.img}
                            alt={stage.title}
                            className="w-[90%] h-[90%] object-contain"
                          />
                        </div>
                      </>
                    ) : (
                      // Odd items (01, 03, 05): text on the right
                      <div className="space-y-2">
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-black leading-snug">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-[#333333] leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Trophy (centered under the line, small authentic size matching reference) */}
        <div className="hidden md:flex relative flex-col items-center justify-center pt-2 pb-2" style={{ zIndex: 10 }}>
          <div className="relative group cursor-pointer flex flex-col items-center">
            <img
              src="https://vibeacademy.info/wp-content/uploads/2026/05/Untitled-design-1-1-814x1024.webp"
              alt="Vibe Academy Haripur Graduation Trophy"
              className="w-11 md:w-12 h-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Mobile Trophy (positioned directly under the left vertical line, small authentic size matching reference) */}
        <div className="flex md:hidden relative items-center justify-start pl-1 sm:pl-1.5 pt-3 pb-2" style={{ zIndex: 10 }}>
          <div className="relative group cursor-pointer flex flex-col items-center">
            <img
              src="https://vibeacademy.info/wp-content/uploads/2026/05/Untitled-design-1-1-814x1024.webp"
              alt="Vibe Academy Haripur Graduation Trophy"
              className="w-7 sm:w-8 h-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
