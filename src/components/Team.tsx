import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Team: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const team = [
    {
      name: 'Ijlal Khan',
      role: 'Founder',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-22-at-1.13.04-PM.jpeg'
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
      name: 'Aneeqa Jadoon',
      role: 'Social Media Manager',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Aneeqa-scaled.webp'
    },
    {
      name: 'Naveed Rehman',
      role: 'Operational Desk',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/file.jpg'
    },
    {
      name: 'Zeeshan Tariq',
      role: 'SEO & Content',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/04/file.webp'
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Tag */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#1E2A4F] text-white font-poppins">
            07. Team
          </span>
        </div>

        {/* Section Heading from Reference */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            Meet the Minds Behind SOCH – Vibe Coding
          </h2>
          <p className="text-base text-slate-600">
            Experienced software engineers, researchers, and ecosystem builders backed by the University of Haripur BIC.
          </p>
        </div>

        {/* Team Horizontal Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="min-w-[260px] sm:min-w-[280px] text-center flex-shrink-0 snap-start bg-[#F8FAFC] p-4 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Photo */}
                <div className="w-full h-80 rounded-2xl overflow-hidden bg-slate-200 relative mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = '0.3';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Name */}
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#1E2A4F] group-hover:text-[#2A6EB4] transition-colors">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm font-medium text-slate-500 mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Bar: Gradient Indicator & Navigation Buttons from Reference */}
          <div className="mt-8 flex items-center justify-between gap-6 pt-4 border-t border-slate-100">
            <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-[#f7d06c] via-[#ff6ac1] to-[#6fa8ff] opacity-80" />

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                aria-label="Previous team members"
                className="w-12 h-12 rounded-full bg-[#1E2A4F] hover:bg-[#2A6EB4] text-white flex items-center justify-center transition shadow-md cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                aria-label="Next team members"
                className="w-12 h-12 rounded-full bg-[#1E2A4F] hover:bg-[#2A6EB4] text-white flex items-center justify-center transition shadow-md cursor-pointer"
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
