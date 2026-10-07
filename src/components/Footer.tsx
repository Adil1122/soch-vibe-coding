import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white py-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo on Footer */}
          <div className="space-y-2 flex flex-col items-center sm:items-start">
            <a href="#home" className="inline-block">
              <img
                src="https://vibeacademy.info/wp-content/uploads/2024/11/Vibe-.png"
                alt="Vibe Academy Logo"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-xs text-white/60 max-w-sm">
              Office 330 second floor admin block university of haripur, Pakistan
            </p>
          </div>

          {/* Social Links (matching reference icons and links) */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center p-2.5 transition-all"
              aria-label="Facebook"
            >
              <img
                src="https://vibeacademy.info/wp-content/uploads/2026/05/FB.png"
                alt="Facebook"
                className="w-full h-full object-contain filter invert"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center p-2.5 transition-all"
              aria-label="Instagram"
            >
              <img
                src="https://vibeacademy.info/wp-content/uploads/2026/05/insta.png"
                alt="Instagram"
                className="w-full h-full object-contain filter invert"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center p-2.5 transition-all"
              aria-label="LinkedIn"
            >
              <img
                src="https://vibeacademy.info/wp-content/uploads/2026/05/Linkdline.png"
                alt="LinkedIn"
                className="w-full h-full object-contain filter invert"
              />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-3">
          <span>© Vibe Academy 2026 | Backed by the University of Haripur Business Incubation Center (BIC)</span>
          <span>From Haripur to the World! 🇵🇰</span>
        </div>
      </div>
    </footer>
  );
};
