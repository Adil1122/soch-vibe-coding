import React from 'react';

interface SectionPillProps {
  label: string;
  variant?: 'light' | 'dark';
}

export const SectionPill: React.FC<SectionPillProps> = ({ label, variant = 'light' }) => {
  return (
    <div className={variant === 'dark' ? 'vibe-btn-dark select-none' : 'vibe-btn-light select-none'}>
      <span>{label}</span>
    </div>
  );
};
