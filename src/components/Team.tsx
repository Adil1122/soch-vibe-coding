import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionPill } from './SectionPill';

export const Team: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const members = [
    {
      name: 'Ijlal Khan',
      role: 'Founder Vibe Academy',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/ijlalkhan.jpeg'
    },
    {
      name: 'Muhammad Adil',
      role: 'Co-Founder / Instructor',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/Adil.webp'
    },
    {
      name: 'Dr. Mazhar Rafique',
      role: 'Mentor',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Mazhar.webp'
    },
    {
      name: 'Saman Zeb',
      role: 'Socail Media Manager',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Aneeqa-scaled.webp'
    },
    {
      name: 'Rukhsar Adil',
      role: 'Operational Desk',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Aneeqa-scaled.webp'
    },
    {
      name: 'Talal Fayyaz',
      role: 'SEO & Content',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/talal.jpeg'
    },
    {
      name: 'Aliyan Khan',
      role: 'SEO & Content',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/aliyan.jpeg'
    },
    {
      name: 'Haris Khan',
      role: 'SEO & Content',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/haris.jpeg'
    }
  ];

  const handleScroll = (dir: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = dir === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="team"
      className="py-16 sm:py-20 relative"
      style={{
        background: 'linear-gradient(180deg, #F2F2F2 0%, #F2F2F2 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag & Heading */}
        <div className="text-center">
          <div className="flex justify-center">
            <SectionPill label="07. Team" variant="light" />
          </div>
          <h2 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-[22px] font-normal text-black tracking-tight leading-snug font-sans">
            Meet the Vibe Academy Minds
          </h2>
        </div>

        {/* Team Cards Slider */}
        <div className="mt-12 sm:mt-16 space-y-8 max-w-[1200px] mx-auto">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {members.map((m, idx) => (
              <div
                key={idx}
                className="w-72 sm:w-80 shrink-0 text-center transition-all duration-300 group"
              >
                <div className="w-full h-[340px] rounded-[35px] overflow-hidden bg-black/10 shadow-md">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-5 pb-2 space-y-1">
                  <h3 className="text-[28px] sm:text-[34px] font-bold text-[#222222] tracking-tight">
                    {m.name}
                  </h3>
                  <p className="text-[16px] sm:text-[20px] font-normal text-[#777777]">
                    {m.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Controls Bar (matching reference 100%) */}
          <div className="flex items-center justify-between gap-6 pt-6">
            {/* Multi-color gradient line */}
            <div
              className="flex-1 h-[3px] rounded-full"
              style={{
                background: 'linear-gradient(to right, #f7d06c, #ff6ac1, #6fa8ff, #dddddd)'
              }}
            />

            {/* Prev & Next Round Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleScroll('left')}
                aria-label="Previous Team Member"
                className="w-[52px] h-[52px] rounded-full bg-black hover:bg-[#333333] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                aria-label="Next Team Member"
                className="w-[52px] h-[52px] rounded-full bg-black hover:bg-[#333333] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
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
