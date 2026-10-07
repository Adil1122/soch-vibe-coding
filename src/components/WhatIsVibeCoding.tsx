import React from 'react';
import { Play } from 'lucide-react';

interface WhatIsVibeCodingProps {
  onOpenVideo: () => void;
}

export const WhatIsVibeCoding: React.FC<WhatIsVibeCodingProps> = ({ onOpenVideo }) => {
  return (
    <section id="what-is-vibe-coding" className="py-20 md:py-28 bg-[#F4F6F9] border-t border-slate-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Tag */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#1E2A4F] text-white font-poppins shadow-sm">
            01. what is vibe coding
          </span>
        </div>

        {/* Narrative Heading from Reference Site */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight leading-snug">
            From Haripur to the world! 🇵🇰
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-normal">
            There’s a new wave of innovation coming, and you’re at the center of it. This summer, we’re giving you the tools to dream bigger and build faster. Let’s show the world what we’re capable of. Your life-changing summer starts now.
          </p>
        </div>
      </div>

      {/* Full-width Video Container with Animated WHAT IS VIBE CODING running BEHIND it */}
      <div className="relative w-full mt-12 py-10 px-0 mx-0 overflow-hidden">
        {/* The Animated "WHAT IS VIBE CODING?" Text Running Behind the Video Across Full Width (Zero Margins) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none z-0 select-none opacity-40 md:opacity-50">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-poppins uppercase tracking-wider gradient-vibe-text shrink-0"
              >
                What is Vibe Coding? •
              </span>
            ))}
          </div>
        </div>

        {/* Centered Video Player Positioned in Front of Animation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div
            onClick={onOpenVideo}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#1E2A4F] group cursor-pointer aspect-video flex items-center justify-center transition-all duration-300 hover:shadow-cyan-500/10 hover:shadow-3xl"
          >
            {/* Thumbnail Image & Overlay */}
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
              alt="What is Vibe Coding"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1E2A4F] via-[#1E2A4F]/60 to-transparent" />

            {/* Video content and play button */}
            <div className="relative z-10 text-center space-y-4 p-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#F38A32] text-white uppercase tracking-wider font-poppins shadow">
                Featured Video
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-white">
                What is Vibe Coding?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Discover the modern software engineering approach where developers combine human intuition with AI workflows to build real software 5x faster.
              </p>

              {/* Pulsing play icon */}
              <div className="pt-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F38A32] group-hover:bg-[#e07b27] text-white flex items-center justify-center mx-auto shadow-2xl shadow-[#F38A32]/50 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-slate-300 bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 hidden sm:flex">
              <span>University of Haripur Business Incubation Center</span>
              <span className="text-[#F38A32] font-semibold">Click to Watch Full Video</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
