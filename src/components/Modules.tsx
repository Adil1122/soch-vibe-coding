import React, { useState } from 'react';
import { MODULES_DATA, ModuleItem } from '../data/websiteData';
import { BookOpen, Check, Layers, Sparkles, Code2, Terminal, Cpu, Rocket } from 'lucide-react';

interface ModulesProps {
  onOpenApply: () => void;
}

export const Modules: React.FC<ModulesProps> = ({ onOpenApply }) => {
  const categories = [
    { name: 'All Modules', icon: Layers },
    { name: 'Software Engineering', icon: Code2 },
    { name: 'Modern Development', icon: Terminal },
    { name: 'AI-Powered Engineering', icon: Cpu },
    { name: 'Product Development', icon: Rocket }
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>('All Modules');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const filteredModules = selectedCategory === 'All Modules'
    ? MODULES_DATA
    : MODULES_DATA.filter((m) => m.category === selectedCategory);

  return (
    <section id="modules" className="py-20 md:py-28 bg-[#F4F6F9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#F38A32]/10 text-[#F38A32] border border-[#F38A32]/30 uppercase tracking-wider font-poppins">
            <BookOpen className="w-3.5 h-3.5 text-[#F38A32]" />
            <span>Comprehensive Syllabus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E2A4F] font-poppins tracking-tight">
            Curated Academic & Technical Modules
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Balanced curriculum designed to build both deep computer science comprehension and modern AI-accelerated execution speed.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-poppins whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E2A4F] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F38A32]' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((item) => {
            const isExpanded = expandedModule === item.number;
            return (
              <div
                key={item.number}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#2A6EB4]/40 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2A6EB4] bg-[#2A6EB4]/10 px-2.5 py-1 rounded-md">
                      {item.number}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-[#F4F6F9] px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="font-poppins font-bold text-base text-[#1E2A4F] group-hover:text-[#2A6EB4] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Technologies Pills */}
                  <div className="pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5 font-poppins">
                      Core Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[#F4F6F9] text-slate-700 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Learning Outcome */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-[#458543] uppercase tracking-wider flex items-center gap-1 font-poppins">
                    <Check className="w-3.5 h-3.5" />
                    <span>Learning Outcome:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{item.learningOutcome}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold font-poppins text-[#1E2A4F]">
              Ready to experience this modern curriculum?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Cohort 02 classes commence at the University of Haripur Business Incubation Center.
            </p>
          </div>
          <button
            onClick={onOpenApply}
            className="px-6 py-3 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-poppins shadow transition cursor-pointer"
          >
            Apply for Cohort 02
          </button>
        </div>
      </div>
    </section>
  );
};
