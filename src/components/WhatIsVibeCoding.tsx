import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface WhatIsVibeCodingProps {
  onOpenVideo?: () => void;
}

export const WhatIsVibeCoding: React.FC<WhatIsVibeCodingProps> = ({ onOpenVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="what-is-vibe-coding" className="py-20 md:py-28 bg-black overflow-hidden relative border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center relative z-10">
        {/* Section Tag */}
        <div>
          <span className="section-tag">
            01. what is vibe coding
          </span>
        </div>

        {/* Narrative Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          From Haripur to the world! 🇵🇰
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          There’s a new wave of innovation coming, and you’re at the center of it. This summer, we’re giving you the tools to dream bigger and build faster. Let’s show the world what we’re capable of. Your life-changing summer starts now.
        </p>
      </div>

      {/* Full-width container with animated gradient marquee text running behind video */}
      <div className="relative w-full mt-12 py-8 overflow-hidden">
        {/* Animated Marquee Background */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none z-0 select-none opacity-45">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-wider gradient-text shrink-0"
              >
                What is Vibe Coding? •
              </span>
            ))}
          </div>
        </div>

        {/* Centered Video Player */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0e0e0e] aspect-video group">
            {isPlaying ? (
              <video
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                src="https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4"
              />
            ) : (
              <div
                onClick={() => {
                  if (onOpenVideo) {
                    onOpenVideo();
                  } else {
                    setIsPlaying(true);
                  }
                }}
                className="w-full h-full relative cursor-pointer flex items-center justify-center bg-gradient-to-tr from-black via-slate-900 to-black"
              >
                {/* Poster / Preview thumbnail */}
                <img
                  src="https://vibeacademy.info/wp-content/uploads/2026/05/cropped-Vibe-Coading-270x270.webp"
                  alt="What is Vibe Coding Preview"
                  className="w-28 h-28 object-contain opacity-40 group-hover:scale-110 transition-transform duration-300"
                />

                {/* Centered Glowing Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 hover:bg-black/25 transition-colors">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                    }}
                  >
                    <Play className="w-9 h-9 fill-white ml-1" />
                  </div>
                  <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider bg-black/60 px-4 py-1 rounded-full border border-white/20">
                    Watch Introduction
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
