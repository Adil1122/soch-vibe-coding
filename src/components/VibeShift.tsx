import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface VibeShiftArticle {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;
}

export const VibeShift: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalArticle, setModalArticle] = useState<VibeShiftArticle | null>(null);

  const articles: VibeShiftArticle[] = [
    {
      id: 'article-1',
      title: "Navigating Pakistan's Gig Economy with AI Superpowers",
      excerpt: "The freelance game has changed, and if you're not integrating AI, you're already playing catch-up. Pakistan's freelance workforce, already the 4th largest globally, is entering a new era: Freelancing 2.0.",
      fullContent: "The freelance game has changed, and if you're not integrating AI, you're already playing catch-up. Pakistan's freelance workforce, already the 4th largest globally, is entering a new era: Freelancing 2.0.\n\nThis isn't just about finding gigs; it's about leveraging AI Workflows to boost your productivity, expand your service offerings, and command higher rates. Imagine automating tedious tasks, generating code snippets with AI, or even building intelligent solutions for clients—all while working from the comfort of your home in Haripur. We'll explore how Vibe Building equips you with these essential AI superpowers, ensuring you don't just survive but thrive in the hyper-competitive global gig economy. Level up your freelance hustle, for real."
    },
    {
      id: 'article-2',
      title: 'How Local Developers are Shaping the Future',
      excerpt: "Pakistan is no longer just a rising star in the global tech scene; it's a full-blown supernova, especially when it comes to Artificial Intelligence. From bustling tech hubs in Lahore and Karachi to emerging innovation centers like Haripur, local developers are not just adopting AI—they're actively shaping its future.",
      fullContent: "Pakistan is no longer just a rising star in the global tech scene; it's a full-blown supernova, especially when it comes to Artificial Intelligence. From bustling tech hubs in Lahore and Karachi to emerging innovation centers like Haripur, local developers are not just adopting AI—they're actively shaping its future.\n\nThis isn't just about big corporations; it's about a grassroots movement of talented individuals leveraging AI to solve local problems and compete on a global scale. Discover how the University of Haripur BIC is fueling this revolution, and why now is the prime time to jump into AI Engineering Pakistan to be part of this incredible journey. Get ready to witness and contribute to Pakistan's AI-powered destiny. Your impact starts here."
    },
    {
      id: 'article-3',
      title: 'Why AI Skills are Non-Negotiable for Pakistani Builders in 2026: A Deep Dive',
      excerpt: "Let's be real: the tech landscape of 2026 is vastly different from even a few years ago. For Pakistani coders, having AI skills isn't a bonus anymore; it's a fundamental requirement to stay relevant and competitive.",
      fullContent: "Let's be real: the tech landscape of 2026 is vastly different from even a few years ago. For Pakistani coders, having AI skills isn't a bonus anymore; it's a fundamental requirement to stay relevant and competitive.\n\nWith AI engineers earning a 42% salary premium over traditional roles, the message is clear: adapt or get left behind. This deep dive will unpack why mastering AI Engineering is crucial for your career growth, how it opens doors to high-paying opportunities, and why ignoring this trend is a major fumble. We'll also highlight how Full Stack MERN developers, when enhanced with AI, become indispensable assets in any tech team. Don't just build; build smart. Your future depends on it."
    }
  ];

  const current = articles[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="vibe-shift" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Heading (100% matching 4-the-vibe-shift.PNG) */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] font-poppins tracking-tight">
            The Vibe Shift
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Democratizing AI & Shaping the Next Generation of Pakistani Developers.
          </p>
        </div>

        {/* Carousel Container with Left/Right Arrows matching 4-the-vibe-shift.PNG */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous story"
            className="absolute -left-3 sm:-left-6 md:-left-10 z-20 p-2 text-slate-800 hover:text-[#2A6EB4] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
          </button>

          {/* Card Content Grid matching 4-the-vibe-shift.PNG */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center px-4 sm:px-8">
            {/* Left Side: Dark Rounded Card with Glowing Neon Pakistan Map Constellation */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-[420px] aspect-square rounded-[40px] bg-[#0c1222] border border-white/10 p-6 sm:p-8 flex items-center justify-center relative overflow-hidden shadow-2xl">
                {/* Cyber Grid background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

                {/* SVG Glowing Pakistan Map Constellation matching screenshot */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full relative z-10 filter drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                >
                  <defs>
                    <linearGradient id="neonGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Outer Pakistan Map Contour Path */}
                  <path
                    d="M 120 310 L 80 290 L 50 240 L 70 200 L 100 210 L 120 180 L 160 170 L 180 130 L 220 90 L 260 70 L 290 85 L 295 110 L 260 130 L 240 160 L 270 190 L 280 220 L 260 250 L 230 260 L 210 290 L 170 320 L 140 330 Z"
                    fill="none"
                    stroke="url(#neonGreen)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Internal Constellation Network Lines */}
                  <g stroke="#34d399" strokeWidth="1.2" opacity="0.6">
                    <line x1="80" y1="290" x2="120" y2="250" />
                    <line x1="120" y1="250" x2="180" y2="240" />
                    <line x1="180" y1="240" x2="200" y2="200" />
                    <line x1="200" y1="200" x2="220" y2="150" />
                    <line x1="220" y1="150" x2="260" y2="130" />
                    <line x1="260" y1="130" x2="260" y2="70" />
                    <line x1="200" y1="200" x2="160" y2="170" />
                    <line x1="160" y1="170" x2="120" y2="180" />
                    <line x1="120" y1="180" x2="70" y2="200" />
                    <line x1="200" y1="200" x2="240" y2="210" />
                    <line x1="240" y1="210" x2="260" y2="250" />
                    <line x1="200" y1="200" x2="170" y2="280" />
                    <line x1="170" y1="280" x2="120" y2="310" />
                  </g>

                  {/* Constellation Glowing Nodes */}
                  {[
                    [120, 310], [80, 290], [50, 240], [70, 200], [100, 210],
                    [120, 180], [160, 170], [180, 130], [220, 90], [260, 70],
                    [290, 85], [260, 130], [240, 160], [270, 190], [260, 250],
                    [210, 290], [170, 320], [120, 250], [180, 240], [240, 210]
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3" fill="#6ee7b7" />
                  ))}

                  {/* Center Glowing Compass / North Star (representing Haripur Innovation) */}
                  <g transform="translate(200, 200)">
                    <circle cx="0" cy="0" r="28" fill="url(#compassGlow)" />
                    {/* 4 Primary Points */}
                    <polygon points="0,-45 7,-10 45,0 7,10 0,45 -7,10 -45,0 -7,-10" fill="#ffffff" filter="drop-shadow(0 0 8px #38bdf8)" />
                    {/* 4 Secondary Diagonal Points */}
                    <polygon points="0,-25 5,-7 25,0 5,7 0,25 -5,7 -25,0 -5,-7" fill="#38bdf8" transform="rotate(45)" opacity="0.9" />
                    <circle cx="0" cy="0" r="5" fill="#ffffff" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Side: Article Details & Read More matching 4-the-vibe-shift.PNG */}
            <div className="md:col-span-6 space-y-5 text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-poppins text-[#111827] leading-tight">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {current.excerpt}
              </p>

              {/* Read More Pill Button matching 4-the-vibe-shift.PNG */}
              <div className="pt-2">
                <button
                  onClick={() => setModalArticle(current)}
                  className="px-8 py-2.5 rounded-full border border-[#c9459a] hover:bg-[#c9459a] hover:text-white text-[#111827] bg-white text-xs sm:text-sm font-semibold font-poppins transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next story"
            className="absolute -right-3 sm:-right-6 md:-right-10 z-20 p-2 text-slate-800 hover:text-[#2A6EB4] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Reader */}
        {modalArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
              onClick={() => setModalArticle(null)}
              className="fixed inset-0 bg-[#1E2A4F]/75 backdrop-blur-sm"
            />
            <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 space-y-5 my-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-[#c9459a] uppercase tracking-wider font-poppins">
                  The Vibe Shift
                </span>
                <button
                  onClick={() => setModalArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl font-bold font-poppins text-[#111827] leading-tight">
                {modalArticle.title}
              </h3>

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 pt-2">
                {modalArticle.fullContent}
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setModalArticle(null)}
                  className="px-6 py-2.5 bg-[#1E2A4F] hover:bg-[#2A6EB4] text-white rounded-xl text-xs font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
