import React from 'react';
import { GraduationCap, Globe, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, GithubIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E2A4F] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand & Affiliation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F38A32] text-white flex items-center justify-center font-poppins font-extrabold text-xl shadow-md">
                S
              </div>
              <div>
                <span className="font-poppins font-bold text-xl text-white tracking-tight">
                  SOCH – Vibe Coding
                </span>
                <p className="text-xs text-[#2A6EB4] font-semibold">
                  Master AI-Accelerated Software Engineering
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              An advanced technology initiative backed by the University of Haripur Business Incubation Center (BIC). 
              Transforming local talent into globally competitive digital architects who build production-ready software 5x faster.
            </p>

            <div className="pt-2 text-xs font-semibold text-[#F38A32] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#F38A32]" />
              <span>From Haripur to the World! 🇵🇰</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#what-is-vibe-coding" className="hover:text-[#F38A32] transition">What is Vibe Coding</a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-[#F38A32] transition">10-Stage Roadmap</a>
              </li>
              <li>
                <a href="#modules" className="hover:text-[#F38A32] transition">Technical Modules</a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-[#F38A32] transition">Why Choose Us</a>
              </li>
              <li>
                <a href="#success-stories" className="hover:text-[#F38A32] transition">Cohort 01 Stories</a>
              </li>
              <li>
                <a href="#mission-vision" className="hover:text-[#F38A32] transition">Mission & Vision (SEEK, OBSERVE, CREATE, HOPE)</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#F38A32] transition">Articles & Insights</a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#F38A32] transition">Leadership & Team</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Campus */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">
              Incubation Campus
            </h4>
            <div className="text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F38A32] shrink-0 mt-0.5" />
                <span>
                  University of Haripur<br />
                  Haripur, Khyber Pakhtunkhwa, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2A6EB4] shrink-0" />
                <a href="mailto:admissions@sochvibecoding.com" className="hover:text-white">
                  admissions@sochvibecoding.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#458543] shrink-0" />
                <a href="tel:+923129582101" className="hover:text-white">
                  +92 312 9582101
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="pt-2 flex items-center gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition">
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} SOCH – Vibe Coding. All rights reserved.</span>
            <span>•</span>
            <span className="text-slate-300">Officially backed by University of Haripur Business Incubation Center (BIC)</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white p-1 rounded transition cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
