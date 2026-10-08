import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { SectionPill } from './SectionPill';

interface WhatIsVibeCodingProps {
  onOpenVideo?: () => void;
}

export const WhatIsVibeCoding: React.FC<WhatIsVibeCodingProps> = ({ onOpenVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="what-is-vibe-coding"
      className="pt-12 sm:pt-14 pb-16 sm:pb-20 overflow-hidden relative"
      style={{
        background: 'linear-gradient(180deg, #BEBEBE 0%, #CCCCCC 35%, #CBCBCB 70%, #F2F2F2 100%)'
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Section Tag (Equal distance from Tech Logos ribbon above: pt-12 sm:pt-14) */}
        <div className="flex justify-center">
          <SectionPill label="01. what is vibe coding" variant="light" />
        </div>

        {/* Narrative Heading (Equal distance: mt-5 sm:mt-6) */}
        <h2 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-[22px] font-normal text-black tracking-tight leading-snug font-sans">
          From Haripur to the world! 🇵🇰
        </h2>

        {/* Supporting Text (Equal distance: mt-4 sm:mt-5) */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-[19px] text-[#333333] max-w-3xl mx-auto leading-relaxed font-normal">
          There’s a new wave of innovation coming, and you’re at the center of it. This summer, we’re giving you the tools to dream bigger and build faster. Let’s show the world what we’re capable of. Your life-changing summer starts now.
        </p>
      </div>

      {/* Video section with animated marquee running directly in the center behind the video (Equal distance: mt-12 sm:mt-14) */}
      <div className="relative w-full mt-12 sm:mt-14 py-4 sm:py-6 overflow-hidden flex items-center justify-center">
        {/* Animated Marquee in the vertical and horizontal center directly behind the video */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden">
          <div className="animate-marquee flex items-center gap-14 whitespace-nowrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className="text-6xl sm:text-8xl md:text-[92px] font-[900] uppercase tracking-tight gradient-text shrink-0 select-none"
              >
                What is Vibe Coding? •
              </span>
            ))}
          </div>
        </div>

        {/* Centered Video Player sitting directly on top of the centered marquee */}
        <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6">
          <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden border border-black/15 shadow-2xl bg-black aspect-video group">
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
                className="w-full h-full relative cursor-pointer flex items-center justify-center bg-gradient-to-tr from-black via-[#0a0a0a] to-black"
              >
                {/* Poster / Preview thumbnail */}
                <img
                  src="https://vibeacademy.info/wp-content/uploads/2026/05/cropped-Vibe-Coading-270x270.webp"
                  alt="What is Vibe Coding Preview"
                  className="w-32 h-32 object-contain opacity-40 group-hover:scale-110 transition-transform duration-300"
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
                  <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider bg-black/70 px-4 py-1.5 rounded-full border border-white/20">
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
