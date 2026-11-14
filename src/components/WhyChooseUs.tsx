import React, { useState, useEffect } from 'react';
import { Play, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { SUCCESS_STORIES } from '../data/websiteData';
import { SectionPill } from './SectionPill';

interface StoryItem {
  id: string | number;
  studentName: string;
  role: string;
  projectBuilt: string;
  quote: string;
  thumbnailUrl: string;
  videoDuration: string;
  achievement: string;
  videoUrl?: string;
}

interface WhyChooseUsProps {
  onOpenVideo?: (videoData: { title: string; subtitle: string; tagline: string; src: string }) => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenVideo }) => {
  const [stories, setStories] = useState<StoryItem[]>(SUCCESS_STORIES);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`/api/success-stories?_t=${Date.now()}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const mapped: StoryItem[] = json.data.map((item: any) => ({
              id: item.id,
              studentName: item.student_name || item.studentName || 'Cohort 01 Student',
              role: item.role || 'Cohort 01 Graduate',
              projectBuilt: item.project_description || item.projectBuilt || 'Built AI-powered application',
              quote: item.student_details || item.quote || '',
              thumbnailUrl: item.thumbnail_url || item.thumbnailUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
              videoDuration: item.video_duration || item.videoDuration || '3:00',
              achievement: item.achievement || '100% Shipped Live Code',
              videoUrl: item.video_url || item.videoUrl
            }));
            setStories(mapped);
          }
        }
      } catch (e) {
        console.warn('Failed to fetch success stories from API, using default stories:', e);
      }
    };
    fetchStories();
  }, []);

  const handlePlayStory = (story: StoryItem) => {
    if (onOpenVideo) {
      onOpenVideo({
        title: `${story.studentName} – ${story.projectBuilt.split('—')[0]}`,
        subtitle: story.quote,
        tagline: 'Cohort 01 Success Story',
        src: story.videoUrl || 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4'
      });
    }
  };

  const storiesCount = stories.length || 1;

  const handlePrev = () => {
    setDesktopIndex((prev) => (prev === 0 ? storiesCount - 1 : prev - 1));
    setMobileIndex((prev) => (prev === 0 ? storiesCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setDesktopIndex((prev) => (prev + 1) % storiesCount);
    setMobileIndex((prev) => (prev + 1) % storiesCount);
  };

  // 3 stories visible in one line on desktop (or fewer if total < 3)
  const visibleDesktopStories = stories.length <= 3
    ? stories
    : [
        stories[desktopIndex % storiesCount],
        stories[(desktopIndex + 1) % storiesCount],
        stories[(desktopIndex + 2) % storiesCount]
      ];

  return (
    <section
      id="why-choose-us"
      className="py-16 sm:py-20 relative border-t border-black/5"
      style={{
        background: 'linear-gradient(180deg, #F2F2F2 0%, #FFFFFF 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag & Heading */}
        <div className="text-center">
          <div className="flex justify-center">
            <SectionPill label="05. Values" variant="light" />
          </div>
          <h2 className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-[22px] font-normal text-black tracking-tight leading-snug font-sans">
            Why Choose Us?
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-[19px] text-[#555555] max-w-2xl mx-auto font-normal">
            Proven Outcomes • Watch real software &amp; careers shipped by our COHORT 01 graduates.
          </p>
        </div>

        {/* COHORT 01 Video Success Stories Slider Container */}
        <div className="space-y-6 mt-12 sm:mt-16">
          <div className="flex items-center justify-between pb-2 border-b border-black/10">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#2A6EB4]" />
              <h3 className="text-base sm:text-lg font-bold text-black">
                Cohort 01 Video Success Stories
              </h3>
            </div>
            <div className="flex items-center gap-4">
              {/* Slider Navigation Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Success Story"
                  className="w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Success Story"
                  className="w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 1. DESKTOP VIEW: In ONE LINE showing exactly 3 cards with slider transition */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {visibleDesktopStories.map((story) => (
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
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-lg font-bold text-black">
                      {story.studentName}
                    </h4>
                    <p className="text-xs font-semibold text-[#2A6EB4] mt-0.5">
                      {story.role}
                    </p>
                  </div>

                  <div className="bg-[#f6f6f6] p-3 rounded-2xl text-xs font-semibold text-[#333333] border border-black/5">
                    {story.projectBuilt}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Dots indicator */}
          <div className="hidden md:flex items-center justify-center gap-2 pt-2">
            {stories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setDesktopIndex(idx)}
                aria-label={`Go to story page ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  desktopIndex === idx ? 'w-8 bg-black' : 'w-2.5 bg-[#cccccc] hover:bg-[#999999]'
                }`}
              />
            ))}
          </div>

          {/* 2. MOBILE VIEW: Slider showing ONLY 1 card at a time in one line */}
          <div className="block md:hidden">
            {stories.map((story, idx) => {
              if (idx !== mobileIndex) return null;
              return (
                <div
                  key={story.id}
                  className="bg-white rounded-[28px] border border-black/10 overflow-hidden shadow-lg transition-all duration-300 flex flex-col animate-in fade-in"
                >
                  {/* Video Thumbnail with Play Button */}
                  <div
                    onClick={() => handlePlayStory(story)}
                    className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                  >
                    <img
                      src={story.thumbnailUrl}
                      alt={story.studentName}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                      <div
                        className="w-13 h-13 rounded-full flex items-center justify-center text-white shadow-2xl"
                        style={{
                          background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                        }}
                      >
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-left">
                    <div>
                      <h4 className="text-lg font-bold text-black">
                        {story.studentName}
                      </h4>
                      <p className="text-xs font-semibold text-[#2A6EB4] mt-0.5">
                        {story.role}
                      </p>
                    </div>

                    <div className="bg-[#f6f6f6] p-3 rounded-2xl text-xs font-semibold text-[#333333] border border-black/5">
                      {story.projectBuilt}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mobile Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMobileIndex(idx)}
                  aria-label={`Go to story ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    mobileIndex === idx ? 'w-7 bg-black' : 'w-2.5 bg-[#cccccc]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
