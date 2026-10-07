import React from 'react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      title: 'Local opportunity',
      desc: 'Skip the underpaid junior dev grind. Entry-level AI engineers in Pakistan are pulling PKR 150,000+ monthly. Secure your unfair advantage in a high-demand tech market.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Local-opportunity.webp'
    },
    {
      title: "Pakistan's Digital Ascent+",
      desc: "Position yourself at the absolute center of Pakistan's digital explosion. As global companies outsource complex AI workflows, our local graduates plug directly into contracts.",
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Pakistan-digital-ascent.webp'
    },
    {
      title: 'Record freelance Revenue',
      desc: 'Stop competing on low-value gigs. Pakistani tech freelancers recently cleared a record $557M in just six months. We show you how to capture that premium dollar volume.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Record-breaking-freelance-earning.webp'
    },
    {
      title: 'The Ai salary premium',
      desc: 'Standard development is rapidly commoditizing. Global AI adoption is forcing a massive structural wage premium for builders who can engineer intelligent, automated workflows.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/The-Ai-salary-premium-1.webp'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-black border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Tag & Heading */}
        <div className="text-center space-y-4">
          <span className="section-tag">
            05. Values
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Why Choose Us?
          </h2>
        </div>

        {/* 4 Cards Grid (matching reference 100%) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#78daeb] transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
