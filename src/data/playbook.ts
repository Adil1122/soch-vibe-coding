export interface PlaybookRule {
  id: number;
  title: string;
  subtitle: string;
  coreRule: string;
  badPractice: string;
  goodPractice: string;
  karpathyQuote?: string;
  promptSnippet: string;
}

export const PLAYBOOK_RULES: PlaybookRule[] = [
  {
    id: 1,
    title: 'Accept the Vibe & Direct Like a Filmmaker',
    subtitle: 'High-level steering beats low-level micro-syntax typing.',
    coreRule: 'Vibe coding is not about writing every line of code by hand. It is about holding the holistic product vision in your mind, steering the AI through conversational iterations, and accepting working code as long as it fulfills the intent.',
    badPractice: 'Trying to dictate every variable name, typing out manual for-loops, or fighting minor implementation quirks that already work.',
    goodPractice: 'Describing user goals, interface hierarchy, edge-case constraints, and observing the running application with your own eyes.',
    karpathyQuote: "I mostly just see stuff, say stuff, run stuff, copy-paste error messages, and it mostly works. It's a whole new vibe.",
    promptSnippet: "Keep the existing architecture, but refine the user flow so clicking any item transitions smoothly to a detail panel without resetting scroll position."
  },
  {
    id: 2,
    title: 'The Self-Healing Loop: Feed Errors Directly',
    subtitle: 'Errors are not setbacks; they are the fastest path to clarity.',
    coreRule: 'When an exception or build error occurs, do not panic or rewrite the entire app. Copy the exact runtime stack trace or console output and feed it back to the AI. Modern LLMs diagnose their own errors with near-100% precision when given raw logs.',
    badPractice: 'Vaguely asking "why did it break?" or attempting multiple blind rewrites without providing the actual error line.',
    goodPractice: 'Pasting the exact compiler or console error output: "Got TypeError: Cannot read properties of undefined (reading `map`) at Line 42".',
    promptSnippet: "I encountered this runtime error in the console:\n```\nUncaught TypeError: Cannot read property 'filter' of undefined at updateList (app.js:68)\n```\nPlease fix this defensively by ensuring the array is guarded with a fallback default."
  },
  {
    id: 3,
    title: 'Zero-Pill UI & Anti-AI Slop Discipline',
    subtitle: 'Avoid generic grey boxes, uniform rounded pill buttons, and AI cliches.',
    coreRule: 'AI models tend to generate safe, generic pastel cards with identical rounded corners. Inject distinct character into your vibe prompts: specify typography weight, intentional density, custom color palettes, and interactive depth.',
    badPractice: 'Asking for "a nice clean UI" which generates generic grey boxes and flat pastel buttons.',
    goodPractice: 'Demanding specific aesthetics: "Deep space cyberpunk with 1px neon borders, mono font labels, high-density data tables, and glassmorphic blur effects."',
    promptSnippet: "Use a dark slate palette (#0f172a), high-contrast cyan accents (#06b6d4), compact tabular data formatting, and subtle glowing hover states instead of generic flat buttons."
  },
  {
    id: 4,
    title: 'Mock Fast, Ship Faster',
    subtitle: 'Do not let complex external databases stall your creative momentum.',
    coreRule: 'When testing a new concept or prototype, start with in-memory arrays, Maps, and localStorage. Verify that the product vibe, animations, and user experience feel magical before spending hours setting up external auth and cloud tables.',
    badPractice: 'Spending days setting up Docker containers, database migrations, and complex ORMs before testing if the app is even fun to use.',
    goodPractice: 'Seeding 10 rich in-memory mock records with full CRUD in localStorage, getting user feedback, then connecting a persistent backend when ready.',
    promptSnippet: "Store all state in React useState and persist to browser localStorage under key 'vibe_app_data'. Pre-seed 8 realistic items so the UI is immediately alive."
  },
  {
    id: 5,
    title: 'The Soch (Thought-to-Reality) Loop',
    subtitle: 'The 4-stage engine: Soch -> Prompt -> Sandbox -> Polish.',
    coreRule: 'Soch (سوچ) is the spark: the raw creative intuition. Translate that spark into structured constraints, test it inside a live sandbox preview, and polish the edges through short conversational loops.',
    badPractice: 'Writing a 2,000-word rigid specification document before touching a single line of running code.',
    goodPractice: 'A rapid 5-minute cycle: draft the core vibe, watch it run in the sandbox, identify what feels off, and prompt a single surgical improvement.',
    promptSnippet: "Phase 1: Build just the interactive canvas and play button. Once that feels great, we will add the recording and export features in Phase 2."
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const VIBE_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "What is Andrej Karpathy's core insight regarding 'Vibe Coding'?",
    options: [
      "Programmers should never touch computers anymore",
      "Software development shifts from manual syntax typing to conversational steering and directorial review",
      "All code must be written in Python only",
      "AI models write 100% bug-free software on the first try without errors"
    ],
    correctIndex: 1,
    explanation: "Vibe coding recognizes that developers now act like creative directors—guiding intent, testing live behavior, and steering the AI through high-level vision rather than typing every syntax character."
  },
  {
    id: 2,
    question: "When your app throws a runtime error in the console, what is the best Vibe Coding practice?",
    options: [
      "Delete the entire project and start over",
      "Feed the exact stack trace and error message directly back to the AI for self-healing",
      "Rewrite all functions manually in C++",
      "Ignore the error and hope it goes away in production"
    ],
    correctIndex: 1,
    explanation: "Modern AI models excel at self-healing when provided with raw error traces, file names, and line numbers."
  },
  {
    id: 3,
    question: "What is the fastest way to validate a new interactive UI vibe before deploying cloud infrastructure?",
    options: [
      "Set up a 5-node Kubernetes cluster",
      "Use rich in-memory mock data and browser localStorage in a live sandbox",
      "Write 500 pages of UML sequence diagrams",
      "Wait 6 months for a database administrator"
    ],
    correctIndex: 1,
    explanation: "In-memory state and localStorage let you instantly evaluate ergonomics, animations, and product viability in minutes."
  }
];
