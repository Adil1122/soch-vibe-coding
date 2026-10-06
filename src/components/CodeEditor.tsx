import React from 'react';
import { Copy, Check, RotateCcw, FileCode, Sparkles } from 'lucide-react';

interface CodeEditorProps {
  language: 'html' | 'css' | 'js';
  code: string;
  onChange: (value: string) => void;
  onReset?: () => void;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  onChange,
  onReset,
  readOnly = false
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-sm shadow-xl">
      {/* File Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-200">
            {language === 'html' ? 'index.html' : language === 'css' ? 'styles.css' : 'app.js'}
          </span>
          <span className="text-[11px] text-slate-500 font-sans">
            ({lineCount} lines)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              title="Reset file to template initial state"
              className="flex items-center gap-1 px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded text-xs transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded text-xs transition"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Textarea with Line Numbers */}
      <div className="flex-1 flex overflow-hidden relative bg-slate-950">
        {/* Line Numbers Column */}
        <div className="w-12 py-3 bg-slate-950 select-none text-right pr-3 text-slate-600 font-mono text-xs border-r border-slate-900 overflow-hidden shrink-0">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Editable Area */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent text-slate-100 font-mono text-xs leading-6 resize-none outline-none focus:ring-0 overflow-auto whitespace-pre tab-4 selection:bg-indigo-600/40"
          placeholder={`Enter ${language.toUpperCase()} code here...`}
        />
      </div>
    </div>
  );
};
