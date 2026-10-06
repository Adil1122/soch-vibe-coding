import React, { useState } from 'react';
import { STARTER_TEMPLATES } from '../data/templates';
import { VibeTemplate } from '../types';
import { CodeEditor } from './CodeEditor';
import { PreviewSandbox } from './PreviewSandbox';
import { Play, Download, Sparkles, LayoutTemplate, RotateCcw, Share2, Layers } from 'lucide-react';

interface StudioTabProps {
  onSendToTransformer?: (thoughtText: string) => void;
}

export const StudioTab: React.FC<StudioTabProps> = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<VibeTemplate>(STARTER_TEMPLATES[0]);
  const [activeFile, setActiveFile] = useState<'html' | 'css' | 'js'>('js');
  const [htmlCode, setHtmlCode] = useState(STARTER_TEMPLATES[0].html);
  const [cssCode, setCssCode] = useState(STARTER_TEMPLATES[0].css);
  const [jsCode, setJsCode] = useState(STARTER_TEMPLATES[0].js);
  const [splitRatio, setSplitRatio] = useState<'split' | 'code-only' | 'preview-only'>('split');

  const handleSelectTemplate = (tpl: VibeTemplate) => {
    setSelectedTemplate(tpl);
    setHtmlCode(tpl.html);
    setCssCode(tpl.css);
    setJsCode(tpl.js);
  };

  const handleResetCurrentFile = () => {
    if (activeFile === 'html') setHtmlCode(selectedTemplate.html);
    else if (activeFile === 'css') setCssCode(selectedTemplate.css);
    else setJsCode(selectedTemplate.js);
  };

  const handleDownloadBundle = () => {
    // Generate self-contained downloadable HTML
    const singleFile = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${selectedTemplate.name} - Soch Vibe</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, '').replace(/<\/body>[\s\S]*?<\/html>/i, '')}
<script>
${jsCode}
</script>
</body>
</html>`;

    const blob = new Blob([singleFile], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.id}-vibe.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 sm:p-6 gap-4">
      {/* Top Template Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 shrink-0 pl-1 pr-2 border-r border-slate-800">
            <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400" />
            <span>Templates</span>
          </span>
          <div className="flex items-center gap-2">
            {STARTER_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedTemplate.id === tpl.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>{tpl.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 hidden md:inline">
                  {tpl.name.split(' ').slice(1, 3).join(' ')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* View Layout Controls & Export */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          {/* Split Mode Selector */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setSplitRatio('code-only')}
              className={`px-2.5 py-1 rounded transition ${splitRatio === 'code-only' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Code
            </button>
            <button
              onClick={() => setSplitRatio('split')}
              className={`px-2.5 py-1 rounded transition ${splitRatio === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Split
            </button>
            <button
              onClick={() => setSplitRatio('preview-only')}
              className={`px-2.5 py-1 rounded transition ${splitRatio === 'preview-only' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Preview
            </button>
          </div>

          <button
            onClick={handleDownloadBundle}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export HTML</span>
          </button>
        </div>
      </div>

      {/* Main Studio Split Canvas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Left Side: Code Editor Workspace */}
        {splitRatio !== 'preview-only' && (
          <div className={`flex flex-col h-full ${splitRatio === 'code-only' ? 'lg:col-span-12' : 'lg:col-span-6'}`}>
            {/* Multi-file Tabs */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveFile('js')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                    activeFile === 'js'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  app.js
                </button>
                <button
                  onClick={() => setActiveFile('html')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                    activeFile === 'html'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  index.html
                </button>
                <button
                  onClick={() => setActiveFile('css')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                    activeFile === 'css'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  styles.css
                </button>
              </div>

              <div className="text-[11px] text-slate-400 font-sans hidden sm:block">
                ⚡ Instant Hot Reload to sandbox
              </div>
            </div>

            {/* Active Code Editor */}
            <div className="flex-1 min-h-0">
              {activeFile === 'html' && (
                <CodeEditor
                  language="html"
                  code={htmlCode}
                  onChange={setHtmlCode}
                  onReset={handleResetCurrentFile}
                />
              )}
              {activeFile === 'css' && (
                <CodeEditor
                  language="css"
                  code={cssCode}
                  onChange={setCssCode}
                  onReset={handleResetCurrentFile}
                />
              )}
              {activeFile === 'js' && (
                <CodeEditor
                  language="js"
                  code={jsCode}
                  onChange={setJsCode}
                  onReset={handleResetCurrentFile}
                />
              )}
            </div>
          </div>
        )}

        {/* Right Side: Sandboxed Live Preview Runner */}
        {splitRatio !== 'code-only' && (
          <div className={`flex flex-col h-full ${splitRatio === 'preview-only' ? 'lg:col-span-12' : 'lg:col-span-6'}`}>
            <PreviewSandbox
              html={htmlCode}
              css={cssCode}
              js={jsCode}
              title={selectedTemplate.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};
