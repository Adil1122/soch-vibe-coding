import React from 'react';
import { TEAM_MEMBERS } from '../data/websiteData';
import { Users, ExternalLink, GraduationCap, Award } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 md:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#1E2A4F]/10 text-[#1E2A4F] border border-[#1E2A4F]/20 uppercase tracking-wider font-poppins">
            <Users className="w-3.5 h-3.5 text-[#2A6EB4]" />
            <span>Leadership & Mentors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            Learn From Engineers & Ecosystem Builders
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our team brings together seasoned software architects, university incubation directors, and venture mentors dedicated to your growth.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-[#F4F6F9] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl hover:border-[#2A6EB4]/30 transition-all duration-300 group"
            >
              <div className="space-y-4 text-center">
                {/* Visual Avatar */}
                <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden bg-[#1E2A4F] border-2 border-[#2A6EB4]/30 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-gradient-to-tr from-[#1E2A4F] to-[#2A6EB4] flex items-center justify-center text-white text-2xl font-bold font-poppins">
                    {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                </div>

                <div>
                  <h3 className="font-poppins font-bold text-base text-[#1E2A4F]">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#2A6EB4] mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {member.affiliation}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed text-left">
                  {member.bio}
                </p>
              </div>

              {/* Social Link */}
              <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Mentor</span>
                <a
                  href={member.socialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#2A6EB4] hover:text-[#1E2A4F] font-semibold transition"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>Connect</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
