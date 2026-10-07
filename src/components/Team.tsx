import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Team: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const members = [
    {
      name: 'Ijlal Khan',
      role: 'Founder Vibe Academy',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/file.jpg'
    },
    {
      name: 'Muhammad Adil',
      role: 'co-Founder/ Instructor',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/Adil.webp'
    },
    {
      name: 'Dr. Mazhar Rafique',
      role: 'Mentor',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Mazhar.webp'
    },
    {
      name: 'Aneeqa Jadoon',
      role: 'Socail Media Manager',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Aneeqa-scaled.webp'
    },
    {
      name: 'Naveed Rehman',
      role: 'Operational Desk',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/file.webp'
    },
    {
      name: 'Zeeshan Tariq',
      role: 'SEO & Content',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/file.jpg'
    }
  ];

  const handleScroll = (dir: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = dir === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="py-20 md:py-28 bg-black border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Tag & Heading */}
        <div className="text-center space-y-4">
          <span className="section-tag">
            07. Team
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Meet the Vibe Academy Minds
          </h2>
        </div>

        {/* Team Cards Slider */}
        <div className="mt-12 space-y-8">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {members.map((m, idx) => (
              <div
                key={idx}
                className="w-72 sm:w-80 shrink-0 bg-[#141414] border border-white/10 rounded-[35px] overflow-hidden p-4 text-center hover:border-white/30 transition-all duration-300 group"
              >
                <div className="w-full h-80 rounded-[28px] overflow-hidden bg-black/50">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-5 pb-3 space-y-1">
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#78daeb] transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-sm font-medium text-white/60">
                    {m.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Controls Bar (matching reference 100%) */}
          <div className="flex items-center justify-between gap-6 pt-4">
            {/* Multi-color gradient bar */}
            <div
              className="flex-1 h-1 rounded-full opacity-70"
              style={{
                background: 'linear-gradient(to right, #f7d06c, #ff6ac1, #6fa8ff, #ffffff)'
              }}
            />

            {/* Prev & Next Round Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleScroll('left')}
                aria-label="Previous Team Member"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                aria-label="Next Team Member"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer border border-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
