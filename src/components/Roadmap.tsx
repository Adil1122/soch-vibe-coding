import React, { useEffect, useRef, useState } from 'react';

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
      // Progress calculation to match reference site line fill
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
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 29%, #F2F2F2 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        {/* Section Tag */}
        <div>
          <span className="section-tag-light">
            02. Roadmap
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-[40px] font-bold text-black tracking-tight leading-snug font-sans">
          The 'Zero to Hero' Roadmap
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-[19px] text-[#444444] max-w-3xl mx-auto leading-relaxed font-normal">
          Ready to go from zero building knowledge to a full-stack AI engineering pro? Our 'Vibe Coding' journey is explicitly engineered to transform you, step-by-step, into an in-demand global tech talent. This isn't just a course; it's your operational blueprint to becoming a digital architect backed by the <strong>University of Haripur BIC.</strong>
        </p>
      </div>

      {/* Interactive Timeline Container */}
      <div ref={containerRef} className="max-w-[1000px] mx-auto px-4 sm:px-6 mt-16 sm:mt-24 relative">
        {/* Center Connecting Vertical Line (passes through the center of boxes and terminates right at the Trophy) */}
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

        {/* Timeline Items */}
        <div className="space-y-6 sm:space-y-8 relative" style={{ zIndex: 1 }}>
          {stages.map((stage, idx) => {
            const isEven = idx % 2 === 1; // 01, 03, 05 are odd (false), 02, 04 are even (true)
            const itemThreshold = (idx / stages.length) * 100;
            const isDotActive = fillHeight > itemThreshold;

            return (
              <div
                key={stage.num}
                className="flex flex-col md:flex-row items-center justify-between bg-[#f3f3f3] text-black rounded-[35px] md:rounded-[60px] p-6 sm:p-7 md:p-8 shadow-sm hover:shadow-md relative transition-transform duration-300"
                style={{ zIndex: 1 }}
              >
                {/* Center Glowing Dot for Desktop */}
                <div
                  className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                  style={{
                    width: '24px',
                    height: '24px',
                    background: isDotActive ? '#ff4fd8' : '#ffffff',
                    border: '4px solid #ff1493',
                    zIndex: 10,
                    boxShadow: isDotActive ? '0 0 14px rgba(255, 20, 147, 0.7)' : 'none'
                  }}
                />

                {/* Left Side Content (Desktop) */}
                <div
                  className={`w-full md:w-[45%] flex ${
                    isEven
                      ? 'flex-col items-start md:items-end md:text-right'
                      : 'items-center justify-start md:justify-end gap-4'
                  }`}
                >
                  {isEven ? (
                    // Even items (02, 04): text on the left
                    <div className="space-y-2">
                      <div className="inline-block md:hidden bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                        Stage {stage.num}
                      </div>
                      <h3 className="text-lg sm:text-[20px] font-bold text-black leading-snug">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-[#333333] leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  ) : (
                    // Odd items (01, 03, 05): icon + number on the left
                    <>
                      <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-[160px] md:h-[160px] bg-[#2b2b2b] rounded-[18px] p-2 flex items-center justify-center shrink-0 shadow-md">
                        <img
                          src={stage.img}
                          alt={stage.title}
                          className="w-[90%] h-[90%] object-contain"
                        />
                      </div>
                      <span className="hidden md:inline-flex bg-white text-[#888] font-bold text-xs sm:text-[13px] px-3 py-1.5 rounded-full shadow-sm shrink-0">
                        {stage.num}
                      </span>
                    </>
                  )}
                </div>

                {/* Right Side Content (Desktop) */}
                <div
                  className={`w-full md:w-[45%] mt-4 md:mt-0 flex ${
                    isEven
                      ? 'items-center justify-start gap-4'
                      : 'flex-col items-start text-left'
                  }`}
                >
                  {isEven ? (
                    // Even items (02, 04): number + icon on the right
                    <>
                      <span className="hidden md:inline-flex bg-white text-[#888] font-bold text-xs sm:text-[13px] px-3 py-1.5 rounded-full shadow-sm shrink-0">
                        {stage.num}
                      </span>
                      <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-[160px] md:h-[160px] bg-[#2b2b2b] rounded-[18px] p-2 flex items-center justify-center shrink-0 shadow-md">
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
                      <div className="inline-block md:hidden bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                        Stage {stage.num}
                      </div>
                      <h3 className="text-lg sm:text-[20px] font-bold text-black leading-snug">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-[#333333] leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Vertical Line Terminal / Ending Trophy (Smaller trophy matching reference site) */}
        <div className="relative flex flex-col items-center justify-center pt-4 pb-2" style={{ zIndex: 10 }}>
          {/* Trophy image (Untitled-design-1-1-814x1024.webp from vibeacademy.info) */}
          <div className="relative group cursor-pointer flex flex-col items-center">
            <img
              src="https://vibeacademy.info/wp-content/uploads/2026/05/Untitled-design-1-1-814x1024.webp"
              alt="Vibe Academy Haripur Graduation Trophy"
              className="w-16 sm:w-20 md:w-22 h-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
