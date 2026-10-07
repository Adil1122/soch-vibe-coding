import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const VibeShift: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to Slide 1 (Navigating Pakistan's Gig Economy) matching 4-the-vibe-shift.PNG
  const [selectedPost, setSelectedPost] = useState<{ title: string; desc: string; img: string; date?: string; readTime?: string } | null>(null);

  const slides = [
    {
      id: 0,
      title: 'How Local Developers are Shaping the Future',
      desc: 'Pakistan is no longer just a rising star in the global tech scene; it’s a full-blown supernova, especially when it comes to Artificial Intelligence. From bustling tech hubs in Lahore and Karachi to emerging innovation centers like Haripur, local developers are not just adopting AI—they’re actively shaping its future.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/How-Local-Developers-are-Shaping-the-Future.png',
      readTime: '5 min read',
      date: 'May 2026'
    },
    {
      id: 1,
      title: "Navigating Pakistan's Gig Economy with AI Superpowers",
      desc: 'The freelance game has changed, and if you’re not integrating AI, you’re already playing catch-up. Pakistan’s freelance workforce, already the 4th largest globally, is entering a new era: Freelancing 2.0.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Navigating.png',
      readTime: '6 min read',
      date: 'May 2026'
    },
    {
      id: 2,
      title: 'Why AI Skills are Non-Negotiable for Pakistani Builders in 2026: A Deep Dive',
      desc: 'Let’s be real: the tech landscape of 2026 is vastly different from even a few years ago. For Pakistani coders, having AI skills isn’t a bonus anymore; it’s a fundamental requirement to stay relevant and competitive.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Why-AI-Skills-are-Non-Negotiable-for-Pakistani-Builders.png',
      readTime: '7 min read',
      date: 'May 2026'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[currentIndex];

  return (
    <section id="blogs" className="py-20 md:py-28 bg-[#F2F2F2] border-t border-black/5 text-black relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header (matching 4-the-vibe-shift.PNG 100%) */}
        <div className="text-center space-y-4">
          <div>
            <span className="section-tag-light">
              06. Blog
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-[40px] font-bold text-black tracking-tight leading-snug font-sans">
            The Vibe Shift
          </h2>
          <p className="text-base sm:text-lg md:text-[19px] text-[#555555] max-w-2xl mx-auto font-normal">
            Democratizing AI &amp; Shaping the Next Generation of Pakistani Developers.
          </p>
        </div>

        {/* Carousel Slider (matching 4-the-vibe-shift.PNG 100%) */}
        <div className="relative max-w-5xl mx-auto px-2 sm:px-8 mt-12">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-black hover:text-[#4467b0] transition-colors cursor-pointer select-none"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute -right-2 sm:-right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-black hover:text-[#4467b0] transition-colors cursor-pointer select-none"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
          </button>

          {/* Active Slide Card (2-column layout matching reference photo) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
            {/* Left Column: Image with rounded-[40px] and dark background */}
            <div className="md:col-span-6 flex justify-center">
              <div className="w-full max-w-[420px] aspect-square rounded-[36px] sm:rounded-[44px] overflow-hidden bg-[#090d16] shadow-2xl p-0 border border-black/5 flex items-center justify-center group transition-transform duration-300">
                <img
                  src={currentSlide.img}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: Article Details */}
            <div className="md:col-span-6 space-y-4 text-left">
              <h3 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-black leading-[1.25] tracking-tight">
                {currentSlide.title}
              </h3>

              <p className="text-base sm:text-[17px] text-[#444444] leading-relaxed font-normal pt-1">
                {currentSlide.desc}
              </p>

              {/* Read More button with gradient border */}
              <div className="pt-3">
                <button
                  onClick={() => setSelectedPost(currentSlide)}
                  className="custom-btn-dark cursor-pointer text-sm font-semibold"
                >
                  <span>Read More</span>
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Dots Indicator */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-black'
                    : 'bg-[#cccccc] hover:bg-[#999999]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-black/10 p-6 sm:p-8 z-10 space-y-6 my-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4467b0]">
                The Vibe Shift Article
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 text-black/50 hover:text-black rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
                {selectedPost.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-[#666666]">
                <span>{selectedPost.date || 'May 2026'}</span>
                <span>•</span>
                <span>{selectedPost.readTime || '5 min read'}</span>
              </div>
            </div>

            <div className="text-base text-[#333333] leading-relaxed space-y-4">
              <p>{selectedPost.desc}</p>
              <p>
                In the new paradigm of software development, engineering velocity is augmented by conversational reasoning models and precision steering. Developers who understand software architecture and combine it with AI orchestration achieve unprecedented build velocity.
              </p>
              <div className="p-4 rounded-2xl bg-[#f5f5f5] border border-black/5 text-sm text-[#222222] italic">
                "Vibe coding is not about knowing less computer science; it’s about directing more computational power per thought."
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 bg-black hover:bg-[#333333] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
