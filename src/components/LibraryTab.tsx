import React, { useState } from 'react';
import { VIBE_RECIPES } from '../data/recipes';
import { VibeRecipe } from '../types';
import { Search, Copy, Check, Terminal, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export const LibraryTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(VIBE_RECIPES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Frontend UI', 'Creative & Audio', 'Productivity', 'Algorithms & Data'];

  const filteredRecipes = VIBE_RECIPES.filter((r) => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase()) ||
      r.vibeTagline.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (recipe: VibeRecipe) => {
    navigator.clipboard.writeText(recipe.prompt);
    setCopiedId(recipe.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>CURATED RECIPE ARCHIVE</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Battle-Tested Vibe Prompts & Architectures
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Hand-crafted prompt blueprints designed to yield production-ready, zero-defect code on the first attempt.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipes Grid */}
      <div className="space-y-4">
        {filteredRecipes.map((recipe) => {
          const isExpanded = expandedRecipeId === recipe.id;
          return (
            <div
              key={recipe.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
            >
              {/* Card Header Row */}
              <div
                onClick={() => setExpandedRecipeId(isExpanded ? null : recipe.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-850/50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center shrink-0 text-indigo-400 mt-0.5">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-slate-100 text-base">{recipe.title}</h3>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {recipe.category}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        recipe.difficulty === 'Beginner'
                          ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50'
                          : recipe.difficulty === 'Intermediate'
                          ? 'bg-amber-950/70 text-amber-400 border border-amber-800/50'
                          : 'bg-rose-950/70 text-rose-400 border border-rose-800/50'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-300 italic mb-1">"{recipe.vibeTagline}"</p>
                    <p className="text-xs text-slate-400">{recipe.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(recipe);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
                  >
                    {copiedId === recipe.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === recipe.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button className="text-slate-400 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 bg-slate-950/50 space-y-4">
                  {/* Architecture Notes */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Architectural Keys
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {recipe.architectureNotes.map((note, i) => (
                        <div
                          key={i}
                          className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-xs text-slate-300 flex items-start gap-2"
                        >
                          <span className="text-indigo-400 font-bold font-mono">0{i + 1}.</span>
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complete Prompt Box */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Prompt Code
                      </span>
                      <button
                        onClick={() => handleCopy(recipe)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-mono"
                      >
                        {copiedId === recipe.id ? '✓ Copied to clipboard' : 'Click to copy full prompt'}
                      </button>
                    </div>
                    <pre className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                      {recipe.prompt}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
