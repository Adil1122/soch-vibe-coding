import React from 'react';
import { Play } from 'lucide-react';

export interface SuccessStoryItem {
  id: string;
  name: string;
  role: string;
  description: string;
  project: string;
  achievement: string;
  quote: string;
  iconType: 'people' | 'ascent' | 'globe' | 'graph';
}

interface WhyChooseUsProps {
  onSelectStory: (story: SuccessStoryItem) => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onSelectStory }) => {
  const stories: SuccessStoryItem[] = [
    {
      id: 'story-1',
      name: 'Hamza Malik',
      role: 'AgriSense PK • Remote AI Engineer',
      project: 'AgriSense PK Crop Disease Scanner',
      achievement: 'Landed $2,500/mo Remote Role',
      quote: 'Before Vibe Coding, building a full-stack product took 2 months. With the SOCH workflow, I built AgriSense in 10 days.',
      description: 'Built "AgriSense PK"—an AI crop disease diagnosis system in 10 days using SOCH workflows. Secured a $2,500/mo international engineering role.',
      iconType: 'people'
    },
    {
      id: 'story-2',
      name: 'Ayesha Noor',
      role: 'EduVibe PK • Student Founder',
      project: 'EduVibe AI Curriculum Planner',
      achievement: 'Won UOH BIC Incubation Seed Grant',
      quote: 'SOCH gave me the courage to see that Haripur students can compete globally. We launched EduVibe and won our first seed grant.',
      description: "Created 'EduVibe'—an AI automated curriculum planner for schools in KP. Successfully pitched and secured UOH BIC incubation seed funding.",
      iconType: 'ascent'
    },
    {
      id: 'story-3',
      name: 'Bilal Khan',
      role: 'MediFlow • HealthTech Builder',
      project: 'MediFlow Voice-to-Prescription',
      achievement: 'Deployed in 14 Healthcare Clinics',
      quote: 'The deep fundamentals paired with AI acceleration made all the difference. Real software in production.',
      description: 'Engineered "MediFlow", an AI voice-to-prescription clinic assistant now deployed across 14 healthcare centers in Hazara region.',
      iconType: 'globe'
    },
    {
      id: 'story-4',
      name: 'Zubair Ahmed',
      role: 'CloudSync • Systems Specialist',
      project: 'CloudSync Autonomous Agent',
      achievement: '5x Engineering Velocity Shipped',
      quote: 'Directorial engineering completely transformed how I think about architecture, testing, and production deployment.',
      description: 'Shipped a production multi-tenant SaaS with Next.js, Docker, and agentic workflows, compressing 3 months of dev time into 12 days.',
      iconType: 'graph'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Heading (100% matching 5-why-choose-us.PNG) */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] font-poppins tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest text-[#2A6EB4] font-poppins mt-2">
            Cohort 01 Success Stories • Verified Outcomes
          </p>
        </div>

        {/* 4 Cards Grid 100% Matching Layout in 5-why-choose-us.PNG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              {/* Top Dark Container (rounded-[36px], dark charcoal radial background matching 5-why-choose-us.PNG) */}
              <div className="w-full aspect-square max-w-[280px] rounded-[36px] bg-gradient-to-b from-[#242424] to-[#121212] border border-white/10 p-6 flex items-center justify-center relative overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:border-[#2A6EB4]/60 transition-all duration-300 group-hover:-translate-y-1.5">
                {/* Subtle dark texture ring */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />

                {/* Glowing Metallic Skeuomorphic Circular Icon Container matching screenshot */}
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] p-1 shadow-2xl flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform duration-300">
                  {/* Outer metallic ring */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#282828] to-[#141414] border border-white/10 flex items-center justify-center relative">
                    {/* Inner glowing core */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#333333] to-[#1c1c1c] flex items-center justify-center shadow-inner relative">
                      {/* Play overlay badge on hover */}
                      <div className="w-12 h-12 rounded-full bg-[#F38A32] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration/Video pill tag */}
                <div className="absolute bottom-4 bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[10px] font-mono px-3 py-1 rounded-full">
                  ▶ Watch Story Video
                </div>
              </div>

              {/* Title & Description below container matching 5-why-choose-us.PNG */}
              <div className="mt-5 space-y-2 max-w-[260px]">
                <h3 className="font-poppins font-bold text-lg text-[#111827] group-hover:text-[#2A6EB4] transition-colors">
                  {story.name}
                </h3>
                <div className="text-xs font-semibold text-[#F38A32]">
                  {story.role}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
