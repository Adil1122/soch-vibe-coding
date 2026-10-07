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
    <section id="road-map" className="py-20 md:py-28 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        {/* Section Tag */}
        <div>
          <span className="section-tag">
            02. Roadmap
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
          The 'Zero to Hero' Roadmap
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
          Ready to go from zero building knowledge to a full-stack AI engineering pro? Our 'Vibe Coding' journey is explicitly engineered to transform you, step-by-step, into an in-demand global tech talent. This isn't just a course; it's your operational blueprint to becoming a digital architect backed by the University of Haripur BIC.
        </p>
      </div>

      {/* Interactive Timeline Container */}
      <div ref={containerRef} className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 relative">
        {/* Center Connecting Vertical Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-2.5 -translate-x-1/2 bg-white/15 rounded-full overflow-hidden z-0">
          <div
            className="w-full transition-all duration-200"
            style={{
              height: `${fillHeight}%`,
              background: 'linear-gradient(180deg, #4467b0, #6b388d, #78daeb, #c9459a)'
            }}
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 sm:space-y-12 relative z-10">
          {stages.map((stage, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={stage.num}
                className="flex flex-col md:flex-row items-center justify-between bg-[#f3f3f3] text-black rounded-[35px] md:rounded-[60px] p-6 sm:p-8 md:p-10 shadow-2xl relative transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* Left Side Content (Desktop) */}
                <div
                  className={`w-full md:w-[44%] flex flex-col ${
                    isEven ? 'md:order-3 md:items-start md:text-left' : 'md:order-1 md:items-end md:text-right'
                  } space-y-3`}
                >
                  <div className="inline-block md:hidden bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit">
                    Stage {stage.num}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black leading-tight">
                    {stage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Center Badge Number (Desktop) */}
                <div className="hidden md:flex order-2 w-12 h-12 rounded-full bg-white text-[#2b2b2b] items-center justify-center font-black text-sm shadow-md border-2 border-black/10 z-20">
                  {stage.num}
                </div>

                {/* Right Side Image Thumbnail */}
                <div
                  className={`w-full md:w-[44%] mt-6 md:mt-0 flex ${
                    isEven ? 'md:order-1 justify-center md:justify-start' : 'md:order-3 justify-center md:justify-end'
                  }`}
                >
                  <div className="w-40 h-40 sm:w-44 sm:h-44 bg-[#2b2b2b] rounded-2xl sm:rounded-3xl p-3 flex items-center justify-center shadow-lg shrink-0">
                    <img
                      src={stage.img}
                      alt={stage.title}
                      className="w-full h-full object-contain filter drop-shadow"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
