import React from 'react';
import { Play, Award, CheckCircle2 } from 'lucide-react';
import { SUCCESS_STORIES } from '../data/websiteData';

interface WhyChooseUsProps {
  onOpenVideo?: (videoData: { title: string; subtitle: string; tagline: string; src: string }) => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenVideo }) => {
  const handlePlayStory = (story: typeof SUCCESS_STORIES[0]) => {
    if (onOpenVideo) {
      onOpenVideo({
        title: `${story.studentName} – ${story.projectBuilt.split('—')[0]}`,
        subtitle: story.quote,
        tagline: 'Cohort 01 Success Story',
        src: 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4'
      });
    }
  };

  return (
    <section
      id="why-choose-us"
      className="py-20 md:py-28 relative border-t border-black/5"
      style={{
        background: 'linear-gradient(180deg, #F2F2F2 0%, #FFFFFF 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Tag & Heading */}
        <div className="text-center space-y-4">
          <span className="section-tag-light">
            05. Values
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-[40px] font-bold text-black tracking-tight leading-snug font-sans">
            Why Choose Us?
          </h2>
          <p className="text-base sm:text-lg md:text-[19px] text-[#555555] max-w-2xl mx-auto font-normal">
            Proven Outcomes • Watch real software &amp; careers shipped by our COHORT 01 graduates.
          </p>
        </div>

        {/* COHORT 01 Video Success Stories Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-black/10">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#2A6EB4]" />
              <h3 className="text-lg sm:text-xl font-bold text-black">
                Cohort 01 Video Success Stories
              </h3>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#458543] bg-[#458543]/10 px-3 py-1 rounded-full">
              100% Shipped Live Code
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUCCESS_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-[32px] border border-black/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Video Thumbnail with Play Button */}
                <div
                  onClick={() => handlePlayStory(story)}
                  className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                >
                  <img
                    src={story.thumbnailUrl}
                    alt={story.studentName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                      }}
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {story.videoDuration}
                  </div>

                  {/* Cohort 01 Tag */}
                  <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border border-white/20">
                    Cohort 01 Graduate
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xl font-bold text-black">
                        {story.studentName}
                      </h4>
                      <p className="text-xs font-semibold text-[#2A6EB4] mt-0.5">
                        {story.role}
                      </p>
                    </div>

                    <div className="bg-[#f6f6f6] p-3 rounded-2xl text-xs text-[#333333] border border-black/5">
                      <strong className="text-black block mb-0.5">Project Built:</strong>
                      {story.projectBuilt}
                    </div>

                    <p className="text-xs text-[#555555] italic leading-relaxed border-l-2 border-[#c9459c] pl-3">
                      "{story.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#458543] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{story.achievement}</span>
                    </span>
                    <button
                      onClick={() => handlePlayStory(story)}
                      className="text-black hover:text-[#4467b0] font-semibold text-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>Watch Story</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
