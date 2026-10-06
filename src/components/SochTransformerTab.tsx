import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Sliders, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { PromptGenerationConfig, GeneratedVibePrompt } from '../types';

export const SochTransformerTab: React.FC = () => {
  const [config, setConfig] = useState<PromptGenerationConfig>({
    thought: 'A high-vibe interactive crypto portfolio tracker that displays simulated live tick updates with smooth SVG sparklines, asset allocation donut chart, and dark cyberpunk glow.',
    vibeStyle: 'cyberpunk',
    framework: 'react-vite',
    complexity: 'polished-mvp',
    includeMockData: true,
    includeKeyboardShortcuts: true,
    targetAudience: 'DeFi traders and crypto aesthetics enthusiasts'
  });

  const [copied, setCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedVibePrompt | null>(null);

  const sampleThoughts = [
    {
      title: 'Crypto Sparkline Tracker',
      text: 'A high-vibe interactive crypto portfolio tracker that displays simulated live tick updates with smooth SVG sparklines, asset allocation donut chart, and dark cyberpunk glow.'
    },
    {
      title: 'Generative Ambient Synth',
      text: 'A browser-based Web Audio ambient soundscape generator with binaural beats, animated breathing mandala, and session streak tracking without any external mp3 files.'
    },
    {
      title: 'Micro-SaaS Invoice & PDF Mock',
      text: 'A sleek minimal invoice creator where indie makers can enter line items, calculate taxes & discounts on the fly, toggle currency symbols, and preview a crisp printable receipt.'
    },
    {
      title: 'Flow Kanban with Local Persistence',
      text: 'A tactile drag-and-drop Kanban task board with custom column tags, search filters, priority badges, and automatic browser localStorage saving.'
    }
  ];

  const handleGenerate = () => {
    const styleDescriptions: Record<string, string> = {
      minimalist: 'Monochrome, ultra-clean whitespace, subtle 1px border lines, high-contrast typography, zero extraneous decoration.',
      'modern-saas': 'Deep slate backdrop (#0f172a), crisp vibrant indigo/violet accents, dense tabular metrics, refined micro-interactions.',
      cyberpunk: 'Dark pitch (#020617) canvas, electric cyan and magenta neon luminescence, glowing accents, monospace tech readouts.',
      'neo-brutalist': 'High-contrast bold borders (2px solid black/white), tactile pill badges, saturated accent blocks, unapologetic geometry.',
      'retro-terminal': 'Green/amber phosphor glow, CRT scanline overlay, monospace ASCII accents, keyboard-driven navigation.'
    };

    const fwInstructions: Record<string, string> = {
      'vanilla-spa': 'Deliver as a pure, self-contained single HTML file with embedded CSS and modern ES6 JavaScript. No bundlers or build steps required.',
      'react-vite': 'Single-file React functional component utilizing standard hooks (useState, useMemo, useEffect, useRef) and Tailwind CSS utility classes.',
      'nextjs-app': 'Modern Next.js App Router component with client state interactivity and structured TypeScript interfaces.',
      'html-canvas': 'High-performance HTML5 Canvas animation loop running at 60 FPS with requestAnimationFrame and resize responsiveness.'
    };

    const systemContext = `You are a Principal Frontend Architect and Vibe Coding Specialist. Your goal is to transform this product concept into an impeccable, production-grade implementation.`;

    const blueprint = `ARCHITECTURAL BLUEPRINT & CONSTRAINTS:
1. Target Paradigm: ${fwInstructions[config.framework]}
2. Vibe & Aesthetic: ${styleDescriptions[config.vibeStyle]}
3. Data Engine: ${config.includeMockData ? 'Pre-populate with 8-12 diverse, realistic mock items stored in React state/localStorage so the interface is fully interactive immediately.' : 'Lightweight state with intuitive empty state illustrations.'}
4. User Experience & Ergonomics: ${config.includeKeyboardShortcuts ? 'Implement keyboard shortcuts (e.g., "/" for quick filter, "Esc" to clear or close modal).' : 'Smooth touch and mouse micro-interactions.'}
5. Target Audience: ${config.targetAudience}
6. Anti-Slop Discipline: Do not output generic pastel placeholders. Build distinctive, purposeful components with thoughtful microcopy.`;

    const full = `${systemContext}

USER BRIEF (RAW SOCH):
"${config.thought}"

${blueprint}

IMPLEMENTATION DELIVERABLES:
1. Write the complete, runnable code from start to finish without truncating with "// ... rest of code".
2. Include defensive error handling so no runtime exceptions crash the application.
3. Make sure all buttons, inputs, and interactive elements have tactile visual feedback and functional event handlers.`;

    setGeneratedPrompt({
      title: `Vibe Prompt: ${config.thought.slice(0, 32)}...`,
      systemContext,
      architectureBlueprint: blueprint,
      fullPrompt: full,
      guidelines: [
        'Strict single-component encapsulation',
        'In-memory state and localStorage synchronization',
        'Zero external asset dependencies (synthesized or native SVG)',
        'Immediate runtime testability'
      ]
    });
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt.fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>SOCH (سوچ) PROMPT SYNTHESIS ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Turn Raw Thoughts into High-Octane Vibe Prompts
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Pour your stream-of-consciousness ideas. Soch automatically structures them with strict architectural constraints, design tokens, and self-healing resilience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Configuration Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Idea Input */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Your Raw Thought (Soch)</span>
              </label>
              <span className="text-xs text-slate-500">Unfiltered natural language</span>
            </div>

            <textarea
              value={config.thought}
              onChange={(e) => setConfig({ ...config, thought: e.target.value })}
              rows={4}
              placeholder="What do you want to build? (e.g. Ambient timer with breathing ring and rain sounds...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
            />

            {/* Presets */}
            <div>
              <span className="text-xs font-medium text-slate-400 mb-2 block">Quick Inspiration Sparks:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleThoughts.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setConfig({ ...config, thought: s.text })}
                    className="text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/50 transition"
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vibe Tuning Parameters */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Vibe Tuning Parameters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Aesthetic Style */}
              <div>
                <label className="text-slate-400 font-medium block mb-1.5">Aesthetic Vibe</label>
                <select
                  value={config.vibeStyle}
                  onChange={(e) => setConfig({ ...config, vibeStyle: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-indigo-500 outline-none"
                >
                  <option value="cyberpunk">Cyberpunk Neon (#020617 / Cyan / Glow)</option>
                  <option value="modern-saas">Modern SaaS (#0f172a / Slate / Indigo)</option>
                  <option value="minimalist">Ultra-Crisp Minimalist (Monochrome)</option>
                  <option value="neo-brutalist">Neo-Brutalist (Bold Borders / High Contrast)</option>
                  <option value="retro-terminal">Retro Terminal (Monospace CRT Glow)</option>
                </select>
              </div>

              {/* Framework Target */}
              <div>
                <label className="text-slate-400 font-medium block mb-1.5">Framework Target</label>
                <select
                  value={config.framework}
                  onChange={(e) => setConfig({ ...config, framework: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-indigo-500 outline-none"
                >
                  <option value="react-vite">React SPA (Vite + Tailwind)</option>
                  <option value="vanilla-spa">Single-File HTML / CSS / JS</option>
                  <option value="nextjs-app">Next.js App Router (TypeScript)</option>
                  <option value="html-canvas">HTML5 Canvas Animation Loop</option>
                </select>
              </div>
            </div>

            {/* Guardrail toggles */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={config.includeMockData}
                  onChange={(e) => setConfig({ ...config, includeMockData: e.target.checked })}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-0 bg-slate-950"
                />
                <span>Seed rich in-memory mock data (never show blank lifeless UI)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={config.includeKeyboardShortcuts}
                  onChange={(e) => setConfig({ ...config, includeKeyboardShortcuts: e.target.checked })}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-0 bg-slate-950"
                />
                <span>Include ergonomic keyboard shortcuts (Search, Escape, Modals)</span>
              </label>
            </div>

            {/* Generate Trigger */}
            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Synthesize Vibe Prompt</span>
            </button>
          </div>
        </div>

        {/* Output Prompt Column */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-semibold text-slate-200">Synthesized Vibe Prompt</span>
              </div>
              {generatedPrompt && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Prompt'}</span>
                </button>
              )}
            </div>

            <div className="flex-1 mt-4">
              {generatedPrompt ? (
                <div className="space-y-4">
                  {/* Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {generatedPrompt.guidelines.map((g, i) => (
                      <span key={i} className="text-[11px] bg-indigo-950/70 border border-indigo-800/60 text-indigo-300 px-2.5 py-0.5 rounded-full">
                        ✓ {g}
                      </span>
                    ))}
                  </div>

                  {/* Code Block Output */}
                  <div className="relative">
                    <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[460px] overflow-y-auto">
                      {generatedPrompt.fullPrompt}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-300 text-sm">No prompt synthesized yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      Adjust your idea and vibe parameters on the left, then click "Synthesize Vibe Prompt" to generate the structured master instructions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
