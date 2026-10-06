import { VibeRecipe } from '../types';

export const VIBE_RECIPES: VibeRecipe[] = [
  {
    id: 'recipe-1',
    title: 'Zero-to-One Single File React Prototype',
    category: 'Frontend UI',
    difficulty: 'Beginner',
    vibeTagline: 'Maximum velocity. Zero build friction.',
    summary: 'The ultimate blueprint for instructing an AI to create a self-contained, interactive single-file React component with fluid animations and mock data.',
    prompt: `You are an elite frontend architect and vibe-coding engineer. Build a fully self-contained React application for [INSERT IDEA HERE].

STRICT ARCHITECTURE CONSTRAINTS:
1. Everything in one cohesive module with full TypeScript types.
2. Design System: Dark-mode-first aesthetic with deep slate/indigo background, subtle 1px border glows, crisp typography hierarchy, and smooth hover micro-interactions.
3. State Management: Pure React useState and useMemo with rich, realistic mock data pre-populated so the UI is immediately alive and testable.
4. Resilience: Zero empty states without inviting illustrations or actions. Add keyboard shortcuts (e.g. '/' to focus search, 'Esc' to dismiss modals).
5. Accessibility: Proper ARIA labels, tab index order, and high-contrast color ratios.`,
    architectureNotes: [
      'Avoid separate CSS files; use utility classes or unified stylesheet',
      'Seed at least 6-10 realistic data items with varied states (active, pending, archived)',
      'Keep interactive state in pure React memory; simulate API delay with setTimeout'
    ],
    starterTemplateId: 'saas-calculator'
  },
  {
    id: 'recipe-2',
    title: 'Generative Canvas & Particle Symphony',
    category: 'Creative & Audio',
    difficulty: 'Intermediate',
    vibeTagline: 'Visual flow-state. Mathematical elegance.',
    summary: 'Command the AI to construct an interactive HTML5 Canvas visualizer with vector physics, kinetic trails, mouse attraction, and parameter HUD controls.',
    prompt: `Build an interactive generative canvas experience in HTML5 Canvas and JavaScript.
Concept: [INSERT VISUAL CONCEPT HERE, e.g. Neon Black Hole, Fluid Audio Waveform, Cellular Automata].

REQUIREMENTS:
1. Canvas Engine: Responsive resize handling with devicePixelRatio scaling to prevent blur on Retina displays.
2. Physics / Particles: Minimum 300 active nodes with velocity, dampening, spring forces, and distance-based alpha connections.
3. Interactive HUD: Glassmorphic control overlay with sliders for Speed, Density, Hue, and Gravity Well toggle.
4. Performance: Maintain rock-solid 60 FPS using requestAnimationFrame with delta-time throttling. Clean up listeners on unload.`,
    architectureNotes: [
      'Use semi-transparent fillRect on each tick to create smooth trailing motion',
      'Compute Euclidean distance squared to avoid expensive Math.sqrt in hot loops',
      'Provide touch event fallbacks alongside mousemove for mobile devices'
    ],
    starterTemplateId: 'cyberpunk-vortex'
  },
  {
    id: 'recipe-3',
    title: 'Web Audio Ambient Soundscape Generator',
    category: 'Creative & Audio',
    difficulty: 'Intermediate',
    vibeTagline: 'Synthesized serenity. Zero external mp3 assets needed.',
    summary: 'Direct the AI to synthesize custom soundwaves (pink noise rain, ocean filters, 432Hz binaural hums) directly via the Web Audio API without needing external asset downloads.',
    prompt: `Construct a distraction-free ambient sound & focus workstation using the Web Audio API in vanilla JS / React.

FUNCTIONALITY:
1. Audio Synthesis: Synthesize 3 distinct procedural soundscapes using native AudioContext, BiquadFilterNode, and GainNode:
   - Pink/Brown Noise (Rain shower)
   - Modulated LFO Low-Pass (Ocean swells)
   - Harmonized Sine Oscillators (432Hz deep meditative drone)
2. Controls: Master volume, individual sound channel mixer, and an integrated session pomodoro ring.
3. Safeguard: Unlock AudioContext gracefully on the first user interaction to comply with browser autoplay restrictions.`,
    architectureNotes: [
      'Initialize AudioContext strictly on user click / touch',
      'Use AudioBufferSourceNode with circular buffer for procedural pink noise',
      'Apply smooth gain ramping with linearRampToValueAtTime to prevent audio clicks'
    ],
    starterTemplateId: 'ambient-flow'
  },
  {
    id: 'recipe-4',
    title: 'Data-Dense Kanban & Task Flow',
    category: 'Productivity',
    difficulty: 'Beginner',
    vibeTagline: 'Tactile productivity with zero database latency.',
    summary: 'A prompt blueprint for building a responsive, drag-and-drop Kanban board with column filters, priority badges, and persistent localStorage sync.',
    prompt: `Build a modern, high-density Kanban project management board.

SPECIFICATIONS:
1. Columns: 'Backlog', 'In Progress', 'Code Review', 'Shipped'.
2. Drag & Drop: Smooth drag or click-to-move card workflow with visual drop indicators.
3. Card Details: Title, Markdown description preview, Priority badge (Urgent, High, Medium, Low), Assignee avatar, and Tag pills.
4. Quick Filters: Search input by text, filter by tag, and sort by due date.
5. Storage: Instant synchronization to browser localStorage so edits persist across reloads.`,
    architectureNotes: [
      'Structure state as an object mapping columnId to arrays of task objects',
      'Implement optimist state updates for instant tactile feel',
      'Include an Export JSON / Import JSON utility button for portability'
    ]
  },
  {
    id: 'recipe-5',
    title: 'Self-Contained Mock Database & Query Inspector',
    category: 'Algorithms & Data',
    difficulty: 'Advanced',
    vibeTagline: 'Inspect, query, and join relational data in pure memory.',
    summary: 'Prompt an AI to build a browser-based relational database simulator with SQL-like query parsing, schema table relations, and interactive join inspection.',
    prompt: `Create a browser-based Mock SQL & Relational Schema Visualizer.

KEY CAPABILITIES:
1. Schema Designer: Render 3 interconnected tables (Users, Orders, Products) with foreign key relationships visualized.
2. Query Console: Interactive text input supporting simple queries (SELECT, WHERE, JOIN, ORDER BY, LIMIT) evaluated against in-memory JSON collections.
3. Visual Result Table: Clean table view with column sorting, row pagination, and execution time stats (e.g. 'Query executed in 0.8ms').
4. Sample Query Bookmarks: Pre-made query buttons for 'Top Customers', 'Recent Orders', 'Inventory Low'.`,
    architectureNotes: [
      'Evaluate query clauses sequentially: Filter -> Join -> Project -> Sort',
      'Render foreign keys with connecting SVG lines between table cards',
      'Protect against malformed queries with descriptive inline error hints'
    ]
  },
  {
    id: 'recipe-6',
    title: 'Live Markdown & Thought Stream Studio',
    category: 'Productivity',
    difficulty: 'Beginner',
    vibeTagline: 'Capture ideas at the speed of thought.',
    summary: 'Instant markdown thought capture with split-pane live parsing, word/character metrics, token estimations, and one-click copy.',
    prompt: `Create a distraction-free, high-vibe Markdown ideation workspace for writers and developers.

DETAILS:
1. Split View: Left side is raw markdown editor, right side is live rendered HTML with typography formatting.
2. Metrics Bar: Live word counter, character counter, reading time estimator, and LLM token counter (~1.3x words).
3. Export Options: Copy raw markdown, copy rendered HTML, download as .md file.
4. Aesthetics: Deep slate palette, Monospace code formatting, and subtle glowing highlight accents.`,
    architectureNotes: [
      'Parse standard markdown tags with clean regex replacement or lightweight parser',
      'Debounce metrics calculations on large documents for smooth typing',
      'Persist draft to localStorage with visual auto-save indicator'
    ],
    starterTemplateId: 'thought-stream'
  }
];
