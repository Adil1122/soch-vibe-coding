import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const VibeShift: React.FC = () => {
  const blogs = [
    {
      title: 'How Local Developers are Shaping the Future',
      desc: 'Pakistan is no longer just a rising star in the global tech scene; it’s a full-blown supernova, especially when it comes to Artificial Intelligence. From bustling tech hubs in Lahore and Karachi to emerging innovation centers like Haripur, local developers are not just adopting AI—they’re actively shaping its future.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/How-Local-Developers-are-Shaping-the-Future.png'
    },
    {
      title: "Navigating Pakistan's Gig Economy with AI Superpowers",
      desc: 'The freelance game has changed, and if you’re not integrating AI, you’re already playing catch-up. Pakistan’s freelance workforce, already the 4th largest globally, is entering a new era: Freelancing 2.0.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Navigating.png'
    },
    {
      title: 'Why AI Skills are Non-Negotiable for Pakistani Builders',
      desc: 'Let’s be real: the tech landscape of 2026 is vastly different from even a few years ago. For Pakistani coders, having AI skills isn’t a bonus anymore; it’s a fundamental requirement to stay relevant and competitive.',
      img: 'https://vibeacademy.info/wp-content/uploads/2026/05/Why-AI-Skills-are-Non-Negotiable-for-Pakistani-Builders.png'
    }
  ];

  return (
    <section id="blogs" className="py-20 md:py-28 bg-[#0a0a0a] border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Tag & Heading */}
        <div className="text-center space-y-4">
          <span className="section-tag">
            06. Blog
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            The Vibe Shift
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Democratizing AI &amp; Shaping the Next Generation of Pakistani Developers.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {blogs.map((blog, idx) => (
            <article
              key={idx}
              className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="w-full aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#78daeb] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed font-normal line-clamp-4">
                    {blog.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#78daeb] group-hover:text-white transition-colors cursor-pointer">
                  <span>Read More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
