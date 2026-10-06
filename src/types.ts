export type TabType = 'studio' | 'transformer' | 'library' | 'playbook' | 'healer';

export interface VibeTemplate {
  id: string;
  name: string;
  category: 'productivity' | 'canvas' | 'audio' | 'saas' | 'tools';
  description: string;
  tags: string[];
  html: string;
  css: string;
  js: string;
}

export interface VibeRecipe {
  id: string;
  title: string;
  category: 'Frontend UI' | 'Algorithms & Data' | 'Creative & Audio' | 'Productivity';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  vibeTagline: string;
  summary: string;
  prompt: string;
  architectureNotes: string[];
  starterTemplateId?: string;
}

export interface PromptGenerationConfig {
  thought: string;
  vibeStyle: 'minimalist' | 'modern-saas' | 'cyberpunk' | 'neo-brutalist' | 'retro-terminal';
  framework: 'vanilla-spa' | 'react-vite' | 'nextjs-app' | 'html-canvas';
  complexity: 'prototype' | 'polished-mvp' | 'production-grade';
  includeMockData: boolean;
  includeKeyboardShortcuts: boolean;
  targetAudience: string;
}

export interface GeneratedVibePrompt {
  title: string;
  systemContext: string;
  architectureBlueprint: string;
  fullPrompt: string;
  guidelines: string[];
}
