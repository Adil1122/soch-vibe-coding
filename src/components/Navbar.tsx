import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenApply: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const navLinks = [
    { label: '01. What is Vibe Coding', href: '#what-is-vibe-coding' },
    { label: '02. Roadmap', href: '#roadmap' },
    { label: '03. Modules & Curriculum', href: '#modules' },
    { label: '04. Why Choose Us', href: '#why-choose-us' },
    { label: '05. The Vibe Shift', href: '#vibe-shift' },
    { label: '06. The Team', href: '#team' },
    { label: '07. Contact Us', href: '#contact' },
    { label: '08. Campus Map', href: '#map' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 sm:py-3 border-b border-slate-200'
          : 'bg-white/90 backdrop-blur-sm py-3 sm:py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Container matching soch-header.PNG: Logo on left of 3 dots, 3 dots on left of Apply button, Apply in center */}
        <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-6 lg:gap-8">
          {/* Logo on the left of 3 dots with 'Soch Vibe Coding' and 'University of Haripur BIC' below it */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            {/* Reference Vibe Ribbon Logo with fallback */}
            <div className="relative flex items-center justify-center shrink-0">
              <img
                src="https://vibeacademy.info/wp-content/uploads/2024/11/Vibe-.png"
                alt="Soch Vibe Coding Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#1E2A4F] text-white items-center justify-center font-poppins font-extrabold text-base shadow-md shrink-0">
                S
              </div>
            </div>

            {/* Logo Text: 'Soch Vibe Coding' and below it 'University of Haripur BIC' */}
            <div className="flex flex-col text-left">
              <span className="font-poppins font-extrabold text-sm sm:text-base lg:text-lg text-[#1E2A4F] tracking-tight group-hover:text-[#2A6EB4] transition-colors leading-tight whitespace-nowrap">
                Soch Vibe Coding
              </span>
              <span className="font-poppins text-[10px] sm:text-xs font-semibold text-slate-500 tracking-normal leading-tight whitespace-nowrap">
                University of Haripur BIC
              </span>
            </div>
          </a>

          {/* Capsule pill container: 3 dots on the left of Apply button, Apply button in the center */}
          <div className="relative shrink-0" ref={menuContainerRef}>
            <div className="flex items-center bg-[#1E2A4F] text-white rounded-full p-1 pl-2 sm:pl-2.5 pr-1 shadow-md border border-[#1E2A4F]/20 gap-1.5 sm:gap-2.5">
              {/* 3 dots menu toggle button */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={dropdownOpen}
                className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                  dropdownOpen
                    ? 'bg-white/25 text-white ring-2 ring-white/40'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title="Navigation Menu"
              >
                {/* 3 dots for menu */}
                <div className="flex items-center gap-1 px-1">
                  <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                </div>
              </button>

              {/* Capsule divider line */}
              <div className="w-[1px] h-4 bg-white/20"></div>

              {/* Apply Button in center of Header (matching reference gradient border button) */}
              <button
                onClick={onOpenApply}
                className="relative rounded-full p-[1.5px] sm:p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer shadow-sm hover:shadow-md"
                style={{
                  background:
                    'linear-gradient(135deg, #4467b0 0%, #6b388d 35%, #78daeb 70%, #c9459c 100%)'
                }}
              >
                <div className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#1E2A4F] group-hover:bg-[#2A6EB4] transition-colors flex items-center gap-1.5">
                  <span className="text-white text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider font-poppins whitespace-nowrap">
                    APPLY FOR COHORT 02
                  </span>
                </div>
              </button>
            </div>

            {/* Vertical Navigation Menu Opening Directly Underneath the 3 Dots */}
            <div
              className={`absolute left-0 top-full mt-2 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-2 z-50 origin-top-left transition-all duration-200 ease-out ${
                dropdownOpen
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible'
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
              }`}
            >
              <div className="px-3 py-1.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold font-poppins uppercase tracking-wider text-slate-400">
                  Navigation
                </span>
                <span className="text-[10px] text-[#2A6EB4] font-bold uppercase tracking-wide bg-[#2A6EB4]/10 px-2 py-0.5 rounded-md">
                  SOCH UOH
                </span>
              </div>

              <nav className="space-y-0.5">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold font-poppins text-[#1E2A4F] hover:bg-[#F4F6F9] hover:text-[#2A6EB4] transition-colors group"
                  >
                    <span>{item.label}</span>
                    <span className="text-slate-300 group-hover:text-[#2A6EB4] group-hover:translate-x-0.5 transition-all text-xs">
                      →
                    </span>
                  </a>
                ))}
              </nav>

              <div className="pt-2.5 mt-2 border-t border-slate-100 px-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenApply();
                  }}
                  className="w-full py-2.5 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-poppins shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Apply for Cohort 02</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
