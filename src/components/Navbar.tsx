import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onOpenApply: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'What is Vibe Coding', href: '#what-is-vibe-coding' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Modules', href: '#modules' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Success Stories', href: '#success-stories' },
    { name: 'Mission & Vision', href: '#mission-vision' },
    { name: 'Blog', href: '#blog' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#1E2A4F] text-white flex items-center justify-center font-poppins font-extrabold text-xl shadow-md group-hover:bg-[#2A6EB4] transition-colors ring-2 ring-[#F38A32]/20">
            <span className="text-white">S</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-poppins font-bold text-lg text-[#1E2A4F] tracking-tight">
                SOCH
              </span>
              <span className="text-[#F38A32] font-black">•</span>
              <span className="font-poppins font-semibold text-sm text-[#2A6EB4]">
                Vibe Coding
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-[#458543]" />
              <span>University of Haripur BIC</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-semibold text-[#1E2A4F]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#2A6EB4] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2A6EB4] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Primary CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenApply}
            className="px-5 py-2.5 rounded-xl bg-[#F38A32] hover:bg-[#e07b27] text-white text-xs font-bold uppercase tracking-wider font-poppins transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Apply for Cohort 02</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenApply}
            className="sm:hidden px-3 py-1.5 rounded-lg bg-[#F38A32] text-white text-[11px] font-bold uppercase tracking-wider"
          >
            Apply
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-[#1E2A4F] hover:bg-slate-100 rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-5 animate-fade-in">
          <div className="flex flex-col gap-3 text-sm font-semibold text-[#1E2A4F]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#F4F6F9] hover:text-[#2A6EB4] transition"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-3 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl font-bold font-poppins text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
              >
                <span>Apply for Cohort 02</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
