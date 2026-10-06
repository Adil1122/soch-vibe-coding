import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  tagline?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  tagline
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2A4F]/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-[#1E2A4F] text-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-700/60 overflow-hidden z-10 my-8">
        {/* Top bar */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#F38A32] uppercase tracking-wider block">
              {tagline || 'SOCH – Vibe Coding Media'}
            </span>
            <h3 className="text-sm sm:text-base font-bold font-poppins text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Player Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {/* Animated visualizer representing the video */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1E2A4F] via-[#090d16] to-[#2A6EB4]/30 flex flex-col items-center justify-center p-8 text-center">
            {/* Ambient glowing tech circle */}
            <div className="w-24 h-24 rounded-full bg-[#F38A32]/20 border border-[#F38A32]/40 flex items-center justify-center shadow-2xl shadow-[#F38A32]/30 mb-4 animate-pulse">
              <Play className="w-10 h-10 text-[#F38A32] fill-current ml-1" />
            </div>

            <div className="max-w-md space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#2A6EB4]/30 text-sky-200 border border-[#2A6EB4]/50">
                Official UOH BIC Studio Recording
              </span>
              <h4 className="text-lg sm:text-xl font-bold font-poppins text-white">
                {title}
              </h4>
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-300">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Bottom playback simulation */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white text-[#F38A32]"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px] text-slate-400">01:14 / 03:45</span>
              </div>

              {/* Fake progress bar */}
              <div className="flex-1 mx-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F38A32] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">1080p HD</span>
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer info inside modal */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#458543]"></span>
            <span>University of Haripur – Business Incubation Center</span>
          </div>
          <span className="text-slate-300 font-medium">From Haripur to the World! 🇵🇰</span>
        </div>
      </div>
    </div>
  );
};
