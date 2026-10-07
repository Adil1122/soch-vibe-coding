import React from 'react';
import { ArrowUp } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, GithubIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E2A4F] text-white py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Address */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-poppins font-extrabold text-2xl text-white tracking-tight">
                SOCH
              </span>
              <span className="text-[#F38A32] text-xl font-bold">•</span>
              <span className="font-poppins font-semibold text-lg text-[#2A6EB4]">
                Vibe Coding
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Office 330, Second Floor, Admin Block, University of Haripur, Khyber Pakhtunkhwa, Pakistan
            </p>
            <p className="text-xs font-semibold text-[#F38A32]">
              From Haripur to the World! 🇵🇰
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#2A6EB4] text-white flex items-center justify-center transition shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#2A6EB4] text-white flex items-center justify-center transition shadow-sm"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#2A6EB4] text-white flex items-center justify-center transition shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-6 border-t border-white/10 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© SOCH – Vibe Coding 2026 | Backed by the UOH Business Incubation Center (BIC).</span>
          <span>Admissions Active for Cohort 02.</span>
        </div>
      </div>
    </footer>
  );
};
