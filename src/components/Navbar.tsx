import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

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

  // Close dropdown on outside click or Escape
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
    { label: 'Home', href: '#home' },
    { label: 'Road Map', href: '#road-map' },
    { label: 'Curriculum & Pricing', href: '#Curriculum-pricing' },
    { label: 'Why Choose Us?', href: '#why-choose-us' },
    { label: 'Team', href: '#team' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md py-3 border-b border-white/10 shadow-lg'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between sm:justify-center gap-4 sm:gap-8">
        {/* Left: Vibe Academy Logo (matching reference 100%) */}
        <a href="#home" className="flex items-center gap-2 group shrink-0">
          <img
            src="https://vibeacademy.info/wp-content/uploads/2024/11/Vibe-.png"
            alt="Vibe Academy Logo"
            className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        {/* Center: Reference Pill Capsule [ Menu Toggle | APPLY FOR COHORT 01 ] */}
        <div className="relative shrink-0" ref={menuContainerRef}>
          <div className="flex items-center bg-[#020101]/80 backdrop-blur-md rounded-full border border-white/40 p-1 pl-2.5 sm:pl-3.5 pr-1 gap-2 sm:gap-3 shadow-xl">
            {/* Menu Toggle Button */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={dropdownOpen}
              className="p-1 sm:p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-white/10"
            >
              {dropdownOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <div className="flex flex-col gap-1 w-4 h-4 justify-center items-center">
                  <span className="w-4 h-[2px] bg-white rounded-full"></span>
                  <span className="w-4 h-[2px] bg-white rounded-full"></span>
                  <span className="w-4 h-[2px] bg-white rounded-full"></span>
                </div>
              )}
            </button>

            {/* Apply Button with Gradient Border (matching reference 100%) */}
            <button
              onClick={onOpenApply}
              className="relative rounded-full p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
              }}
            >
              <div className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-full bg-black/60 hover:bg-transparent transition-colors">
                <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider font-sans whitespace-nowrap">
                  APPLY FOR COHORT 02
                </span>
              </div>
            </button>
          </div>

          {/* Vertical Dropdown Navigation (matching reference menu styling) */}
          <div
            className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-3 w-64 bg-[#0a0a0a]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/15 py-3 px-2 z-50 transition-all duration-200 ease-out ${
              dropdownOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
            }`}
          >
            <nav className="space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 mt-2 border-t border-white/10 px-1">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenApply();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
