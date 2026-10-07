import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  tagline?: string;
  videoSrc?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  tagline,
  videoSrc = 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4'
}) => {
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
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-[#101010] text-white w-full max-w-4xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-10 my-8">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#181818] border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#78daeb] uppercase tracking-wider block">
              {tagline || 'Vibe Academy Video'}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close video"
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            src={videoSrc}
          />
        </div>

        {subtitle && (
          <div className="px-6 py-4 bg-[#141414] border-t border-white/10">
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
