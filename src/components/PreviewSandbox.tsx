import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Maximize2, Minimize2, Smartphone, Tablet, Monitor, AlertCircle, Terminal } from 'lucide-react';

interface PreviewSandboxProps {
  html: string;
  css: string;
  js: string;
  title?: string;
}

export interface ConsoleLog {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: string;
}

export const PreviewSandbox: React.FC<PreviewSandboxProps> = ({
  html,
  css,
  js,
  title = 'Live Preview'
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // Compile combined document
  const buildSrcDoc = () => {
    // Intercept console messages in iframe
    const consoleInterceptor = `
      <script>
        (function() {
          function sendLog(type, args) {
            try {
              const msg = Array.from(args).map(a => {
                if (typeof a === 'object') {
                  try { return JSON.stringify(a); } catch(e) { return String(a); }
                }
                return String(a);
              }).join(' ');
              window.parent.postMessage({ type: 'SANDBOX_CONSOLE', level: type, text: msg }, '*');
            } catch(e) {}
          }
          const origLog = console.log;
          const origErr = console.error;
          const origWarn = console.warn;
          console.log = function() { origLog.apply(console, arguments); sendLog('log', arguments); };
          console.error = function() { origErr.apply(console, arguments); sendLog('error', arguments); };
          console.warn = function() { origWarn.apply(console, arguments); sendLog('warn', arguments); };

          window.onerror = function(msg, url, line) {
            sendLog('error', [msg + ' (line ' + line + ')']);
            return false;
          };
        })();
      </script>
    `;

    // Ensure CSS and JS are injected safely
    let combined = html;
    if (!combined.includes('<head>')) {
      combined = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${combined}</body></html>`;
    }

    // Inject CSS
    const styleTag = `<style>${css}</style>`;
    // Inject Script
    const scriptTag = `<script>\ntry {\n${js}\n} catch(err) {\nconsole.error(err.message);\n}\n</script>`;

    // Replace or append
    combined = combined.replace('</head>', `${consoleInterceptor}${styleTag}</head>`);
    combined = combined.replace('</body>', `${scriptTag}</body>`);

    return combined;
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildSrcDoc();
    }
  };

  useEffect(() => {
    refreshPreview();
  }, [html, css, js]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'SANDBOX_CONSOLE') {
        const newLog: ConsoleLog = {
          id: Math.random().toString(36).substring(2, 9),
          type: e.data.level,
          message: e.data.text,
          timestamp: new Date().toLocaleTimeString()
        };
        setLogs(prev => [...prev.slice(-49), newLog]);
        if (e.data.level === 'error') {
          setErrorCount(c => c + 1);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const deviceWidthClass =
    deviceMode === 'mobile'
      ? 'max-w-[375px]'
      : deviceMode === 'tablet'
      ? 'max-w-[768px]'
      : 'w-full';

  return (
    <div className={`flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50' : 'h-full'
    }`}>
      {/* Sandbox Header Controls */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-200">{title}</span>
          <span className="hidden sm:inline text-slate-500">| Sandboxed Execution</span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={() => setDeviceMode('desktop')}
            title="Desktop View"
            className={`p-1.5 rounded transition ${deviceMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            title="Tablet View (768px)"
            className={`p-1.5 rounded transition ${deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            title="Mobile View (375px)"
            className={`p-1.5 rounded transition ${deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConsole(!showConsole)}
            title="Toggle Console Drawer"
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-mono transition border ${
              errorCount > 0
                ? 'bg-rose-950/50 border-rose-800 text-rose-300'
                : showConsole
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
            {errorCount > 0 && (
              <span className="bg-rose-600 text-white text-[10px] px-1 rounded-full font-bold">
                {errorCount}
              </span>
            )}
          </button>

          <button
            onClick={refreshPreview}
            title="Re-run Sandbox"
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-slate-950 flex items-center justify-center overflow-auto p-2 relative">
        <div className={`h-full ${deviceWidthClass} transition-all duration-300 bg-black rounded-lg overflow-hidden border border-slate-800/80 shadow-inner flex flex-col`}>
          <iframe
            ref={iframeRef}
            title="Sandbox Output"
            sandbox="allow-scripts allow-modals allow-same-origin"
            className="w-full h-full border-0 bg-transparent"
          />
        </div>
      </div>

      {/* Console Drawer */}
      {showConsole && (
        <div className="h-44 bg-slate-950 border-t border-slate-800 flex flex-col font-mono text-xs">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Sandbox Console Logs ({logs.length})
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => { setLogs([]); setErrorCount(0); }}
                className="text-[11px] text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
              <button
                onClick={() => setShowConsole(false)}
                className="text-[11px] text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {logs.length === 0 ? (
              <div className="text-slate-600 italic py-2">No console messages logged yet. Everything is serene.</div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start gap-2 py-0.5 px-1.5 rounded ${
                    log.type === 'error'
                      ? 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500'
                      : log.type === 'warn'
                      ? 'bg-amber-950/40 text-amber-300 border-l-2 border-amber-500'
                      : 'text-slate-300'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 select-none">{log.timestamp}</span>
                  {log.type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />}
                  <span className="break-all">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
