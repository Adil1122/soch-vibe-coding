import React, { useState } from 'react';
import { Stethoscope, Sparkles, Copy, Check, AlertCircle, Wrench, ArrowRight } from 'lucide-react';

interface ErrorPreset {
  title: string;
  error: string;
  solutionSummary: string;
  fixPrompt: string;
}

const COMMON_PRESETS: ErrorPreset[] = [
  {
    title: 'Undefined .map() in React / JS',
    error: `Uncaught TypeError: Cannot read properties of undefined (reading 'map')
    at TaskList (app.js:42:18)
    at renderWithHooks (react-dom.development.js:14985)`,
    solutionSummary: 'The state was initialized as undefined or an asynchronous fetch returned null before the list could mount.',
    fixPrompt: `I encountered this runtime error in the console:
\`\`\`
Uncaught TypeError: Cannot read properties of undefined (reading 'map') at TaskList (app.js:42:18)
\`\`\`
Please fix this defensively:
1. Ensure the state has a safe default (e.g. \`items = []\`).
2. Add optional chaining and nullish coalescing: \`items?.map(...) ?? <EmptyState />\`.
3. Provide an engaging empty state with an icon and action button when the list has 0 elements.`
  },
  {
    title: 'AudioContext Autoplay Blocked',
    error: `The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7W8C`,
    solutionSummary: 'Modern browsers block Web Audio from initializing automatically on page load to prevent unwanted noise.',
    fixPrompt: `I received this browser autoplay restriction error:
\`\`\`
The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.
\`\`\`
Please refactor the audio engine:
1. Initialize or call \`audioCtx.resume()\` strictly inside the user's click/touch event handler (e.g. on the "Start" or "Play" button).
2. Never call \`new AudioContext()\` in the global module scope before user interaction.`
  },
  {
    title: 'Maximum Update Depth Exceeded',
    error: `Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.`,
    solutionSummary: 'An onClick handler is executing immediately during render (e.g. `onClick={doAction()}`) instead of passing a function reference `onClick={() => doAction()}`.',
    fixPrompt: `I encountered a React infinite render loop:
\`\`\`
Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside render.
\`\`\`
Please review all event handlers and useEffect hooks:
1. Check that click handlers pass arrow functions: \`onClick={() => handleClick(id)}\` rather than calling immediately \`onClick={handleClick(id)}\`.
2. Ensure any \`useEffect\` with \`setState\` includes proper dependency arrays without cyclical updates.`
  }
];

export const ErrorHealerTab: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState(COMMON_PRESETS[0].error);
  const [codeContext, setCodeContext] = useState('');
  const [copied, setCopied] = useState(false);
  const [healedPrompt, setHealedPrompt] = useState<string | null>(COMMON_PRESETS[0].fixPrompt);

  const handleSelectPreset = (p: ErrorPreset) => {
    setErrorMessage(p.error);
    setHealedPrompt(p.fixPrompt);
  };

  const handleDiagnose = () => {
    if (!errorMessage.trim()) return;

    const generated = `I encountered this runtime error in my application:
\`\`\`
${errorMessage.trim()}
\`\`\`
${codeContext.trim() ? `\nRELEVANT CODE SNIPPET:\n\`\`\`javascript\n${codeContext.trim()}\n\`\`\`\n` : ''}
DIRECTIVE:
1. Analyze the root cause of this error.
2. Provide a surgical, defensive patch that prevents this exception from occurring even under unexpected inputs or async delays.
3. Keep the existing styling and component architecture intact; fix only the underlying failure.`;

    setHealedPrompt(generated);
  };

  const handleCopy = () => {
    if (!healedPrompt) return;
    navigator.clipboard.writeText(healedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Intro */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-2">
          <Stethoscope className="w-4 h-4" />
          <span>VIBE SELF-HEALING DIAGNOSTICIAN</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Surgical Error Healer & Prompt Doctor
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          In Vibe Coding, runtime errors are not failure—they are instant clarity. Paste any console exception or stack trace, and generate an error-neutralizing prompt to feed straight to the model.
        </p>
      </div>

      {/* Quick Presets */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
          Common Vibe Coding Glitches:
        </span>
        <div className="flex flex-wrap gap-2">
          {COMMON_PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSelectPreset(p)}
              className="text-xs bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-xl transition"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Error Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Paste Console Error or Stack Trace</span>
            </label>
            <textarea
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              rows={6}
              placeholder="Paste raw error message here (e.g. Uncaught TypeError...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-rose-300 placeholder-slate-600 focus:outline-none focus:border-rose-500 leading-relaxed"
            />

            <label className="text-xs font-semibold text-slate-400 block pt-1">
              Surrounding Code Snippet (Optional):
            </label>
            <textarea
              value={codeContext}
              onChange={(e) => setCodeContext(e.target.value)}
              rows={3}
              placeholder="Optional: Paste the failing function or line..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />

            <button
              onClick={handleDiagnose}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs transition flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>Generate Surgical Fix Prompt</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Output */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-semibold text-slate-200">Self-Healing Prompt</span>
              </div>
              {healedPrompt && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Fix Prompt'}</span>
                </button>
              )}
            </div>

            <div className="flex-1 mt-4">
              {healedPrompt ? (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-xs text-emerald-300">
                    ✓ Ready to paste back to your coding assistant. Directly addresses root causality without regressing working features.
                  </div>
                  <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                    {healedPrompt}
                  </pre>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-xs text-center p-8">
                  Paste your console error on the left and click "Generate Surgical Fix Prompt"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
