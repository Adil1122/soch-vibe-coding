import React from 'react';
import { SUCCESS_STORIES, SuccessStory } from '../data/websiteData';
import { Play, Quote, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface SuccessStoriesProps {
  onSelectVideo: (story: SuccessStory) => void;
  onOpenApply: () => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ onSelectVideo, onOpenApply }) => {
  return (
    <section id="success-stories" className="py-20 md:py-28 bg-[#F4F6F9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#458543]/10 text-[#458543] border border-[#458543]/30 uppercase tracking-wider font-poppins">
            <Award className="w-3.5 h-3.5 text-[#458543]" />
            <span>Proven Outcomes • Cohort 01 Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            Success Stories from Cohort 01
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Real software, real startups, real remote careers. See how students from our inaugural batch transformed their software engineering velocity.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail with Play Overlay */}
              <div
                onClick={() => onSelectVideo(story)}
                className="relative aspect-video bg-[#1E2A4F] overflow-hidden cursor-pointer"
              >
                <img
                  src={story.thumbnailUrl}
                  alt={story.studentName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#F38A32] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  {story.videoDuration}
                </div>

                {/* Project Tag */}
                <div className="absolute top-3 left-3 bg-[#1E2A4F]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  {story.projectBuilt.split('—')[0]}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-[#1E2A4F]">
                      {story.studentName}
                    </h3>
                    <p className="text-xs font-medium text-[#2A6EB4]">
                      {story.role}
                    </p>
                  </div>

                  {/* Project built */}
                  <div className="bg-[#F4F6F9] p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700">
                    <strong className="text-[#1E2A4F] block mb-0.5">Project Built:</strong>
                    {story.projectBuilt}
                  </div>

                  {/* Quote */}
                  <div className="relative pl-4 border-l-2 border-[#F38A32] text-xs text-slate-600 italic leading-relaxed">
                    "{story.quote}"
                  </div>
                </div>

                {/* Bottom achievement badge */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#458543] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{story.achievement}</span>
                  </span>
                  <button
                    onClick={() => onSelectVideo(story)}
                    className="text-[#2A6EB4] hover:underline font-semibold text-[11px]"
                  >
                    Watch Story →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cohort 01 Proof Banner */}
        <div className="bg-[#1E2A4F] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#F38A32]/20 text-[#F38A32] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
            100% of Cohort 01 Graduates Shipped Live Software
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our student outcomes prove that when you combine rigorous software engineering fundamentals with modern AI-accelerated workflows, students build real commercial software in weeks instead of years.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenApply}
              className="px-8 py-3.5 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-poppins shadow-lg transition cursor-pointer"
            >
              Apply to Join Cohort 02
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
