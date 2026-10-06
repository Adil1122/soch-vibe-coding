export interface RoadmapStage {
  number: string;
  title: string;
  focus: string;
  description: string;
  keySkills: string[];
  deliverable: string;
}

export interface ModuleItem {
  number: string;
  category: 'Software Engineering' | 'Modern Development' | 'AI-Powered Engineering' | 'Product Development';
  title: string;
  description: string;
  technologies: string[];
  learningOutcome: string;
}

export interface WhyChooseUsPoint {
  number: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface SuccessStory {
  id: string;
  studentName: string;
  role: string;
  projectBuilt: string;
  quote: string;
  thumbnailUrl: string;
  videoDuration: string;
  achievement: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  socialLink: string;
  avatarSeed: string;
}

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    number: '01',
    title: 'Software Engineering Foundations',
    focus: 'Core Principles',
    description: 'Deconstruct computation, algorithm design, clean architecture, and computer science mental models.',
    keySkills: ['Algorithmic Thinking', 'Clean Code Principles', 'System Boundaries', 'Design Primitives'],
    deliverable: 'Modular algorithmic problem solving library'
  },
  {
    number: '02',
    title: 'Programming & Problem Solving',
    focus: 'Logic & Flow',
    description: 'Master strict typing, object-oriented design, asynchronous paradigms, and defensive programming.',
    keySkills: ['TypeScript / Modern JS', 'Data Structures', 'OOP Patterns', 'Error Boundaries'],
    deliverable: 'High-performance interactive data structure visualizer'
  },
  {
    number: '03',
    title: 'Databases & System Design',
    focus: 'Data Modeling',
    description: 'Architect scalable relational and document data models, indexing, transactions, and caching.',
    keySkills: ['PostgreSQL', 'MongoDB', 'Schema Normalization', 'Query Optimization', 'Redis'],
    deliverable: 'Multi-tenant database schema & query benchmarking suite'
  },
  {
    number: '04',
    title: 'Modern Web Development',
    focus: 'Frontend Architecture',
    description: 'Construct responsive, accessible, high-performance user interfaces with React and Tailwind CSS.',
    keySkills: ['React 19', 'Next.js App Router', 'Tailwind CSS', 'State Management', 'Accessibility (a11y)'],
    deliverable: 'Accessible, responsive design system & interactive component library'
  },
  {
    number: '05',
    title: 'Backend & APIs',
    focus: 'Server-Side Engineering',
    description: 'Design robust RESTful and GraphQL APIs, JWT authentication, role-based authorization, and rate limiting.',
    keySkills: ['Node.js & Express / NestJS', 'REST & OpenAPI Specs', 'Authentication & RBAC', 'Middleware Pipelines'],
    deliverable: 'Production-ready authenticated microservice API with full test coverage'
  },
  {
    number: '06',
    title: 'AI-Assisted Development',
    focus: 'Augmented Engineering',
    description: 'Harness LLMs, Claude, Cursor, GitHub Copilot, and Gemini as continuous pair programmers and code refactoring engines.',
    keySkills: ['Context Windows', 'AI Code Generation', 'Automated Refactoring', 'Test Synthesis', 'Documentation Generation'],
    deliverable: 'Complex full-stack feature built with 4x traditional speed'
  },
  {
    number: '07',
    title: 'Vibe Coding Workflow',
    focus: 'Flow State & Directorial Control',
    description: 'The Andrej Karpathy paradigm: Think → Understand → Direct AI → Build → Test → Review → Improve → Deploy.',
    keySkills: ['Conversational Steering', 'Prompt Architecture', 'Runtime Error Self-Healing', 'Anti-Slop Discipline'],
    deliverable: 'Rapid end-to-end prototype synthesized and polished in a single day'
  },
  {
    number: '08',
    title: 'Real-World Product Development',
    focus: 'Ship Real Solutions',
    description: 'Transform raw market requirements into fully polished software with real user personas, analytics, and telemetry.',
    keySkills: ['Product Scoping', 'MVP Validation', 'User Feedback Loops', 'Payment Gateways', 'Email & Webhooks'],
    deliverable: 'Complete SaaS MVP with live onboarding and checkout flow'
  },
  {
    number: '09',
    title: 'Production & Deployment',
    focus: 'DevOps & Reliability',
    description: 'Automate CI/CD pipelines, Docker containerization, cloud hosting, edge caching, and observability.',
    keySkills: ['Docker & Containers', 'GitHub Actions CI/CD', 'Cloud Infrastructure (AWS/GCP)', 'Monitoring & Logs'],
    deliverable: 'Zero-downtime automated deployment to production with monitoring'
  },
  {
    number: '10',
    title: 'Entrepreneurship & Opportunity',
    focus: 'Global Commercialization',
    description: 'From Haripur to the World! Launching startups, securing freelance contracts, pitching to incubators, and scaling.',
    keySkills: ['Startup Pitching', 'BIC Incubation Access', 'Global Freelance Platforms', 'IP & Business Strategy'],
    deliverable: 'Live commercial product launch & demo day presentation at UOH BIC'
  }
];

export const MODULES_DATA: ModuleItem[] = [
  // Category 1: Software Engineering
  {
    number: 'MOD-01',
    category: 'Software Engineering',
    title: 'Programming Fundamentals & OOP',
    description: 'Master core logic, modular architectures, abstraction layers, and object-oriented principles.',
    technologies: ['TypeScript', 'Memory Models', 'OOP & Classes', 'Functional Patterns'],
    learningOutcome: 'Ability to architect maintainable, typed codebases with rock-solid computational fundamentals.'
  },
  {
    number: 'MOD-02',
    category: 'Software Engineering',
    title: 'Data Structures & Algorithms',
    description: 'Understand algorithmic time/space complexities, tree traversals, graphs, dynamic programming, and search.',
    technologies: ['Big-O Analysis', 'Hash Tables', 'Graphs & Trees', 'Sorting & Searching'],
    learningOutcome: 'Evaluate trade-offs between speed, latency, and memory utilization in critical engineering paths.'
  },
  {
    number: 'MOD-03',
    category: 'Software Engineering',
    title: 'Databases & System Design',
    description: 'Design robust schemas, ACID transactions, relational joins, document models, and distributed caching.',
    technologies: ['PostgreSQL', 'MongoDB', 'Drizzle / Prisma', 'Redis', 'Connection Pooling'],
    learningOutcome: 'Design resilient database architectures that scale from prototype to millions of records.'
  },
  {
    number: 'MOD-04',
    category: 'Software Engineering',
    title: 'Software Design Patterns & Architecture',
    description: 'Implement Factory, Singleton, Strategy, Observer, Repository patterns, and Hexagonal architecture.',
    technologies: ['SOLID Principles', 'Repository Pattern', 'Event-Driven Design', 'Layered Architecture'],
    learningOutcome: 'Produce extensible codebases where features can be added without regressing existing modules.'
  },

  // Category 2: Modern Development
  {
    number: 'MOD-05',
    category: 'Modern Development',
    title: 'Next.js & React 19 Ecosystem',
    description: 'Modern frontend development with Server Components, Client State, streaming SSR, and suspense.',
    technologies: ['Next.js 15', 'React 19', 'Server Actions', 'Routing & Middleware', 'Tailwind CSS'],
    learningOutcome: 'Build hyper-fast, SEO-optimized web applications with seamless client-server coordination.'
  },
  {
    number: 'MOD-06',
    category: 'Modern Development',
    title: 'Backend Engineering & APIs (Node & NestJS)',
    description: 'Develop high-throughput REST and GraphQL backend services with enterprise validation and error handling.',
    technologies: ['Node.js', 'NestJS / Express', 'JWT Auth', 'Swagger / OpenAPI', 'WebSockets'],
    learningOutcome: 'Deploy secure, documented APIs capable of supporting multi-platform web and mobile clients.'
  },
  {
    number: 'MOD-07',
    category: 'Modern Development',
    title: 'State Management & Performance Engineering',
    description: 'Optimize bundle size, Web Vitals, memoization, cache invalidation, and real-time state synchronization.',
    technologies: ['Zustand / Redux', 'TanStack Query', 'Lighthouse Optimization', 'Edge Caching'],
    learningOutcome: 'Achieve 95+ Core Web Vitals and frictionless user experiences across low-bandwidth networks.'
  },

  // Category 3: AI-Powered Engineering
  {
    number: 'MOD-08',
    category: 'AI-Powered Engineering',
    title: 'AI Coding Assistants & Directorial Steering',
    description: 'Integrate tools like Cursor, Claude 3.7, and Gemini into everyday development for 5x implementation velocity.',
    technologies: ['Cursor IDE', 'Claude Code', 'Gemini Flash/Pro', 'Copilot', 'Context Engineering'],
    learningOutcome: 'Transform high-level specifications into functional code without falling into hallucination traps.'
  },
  {
    number: 'MOD-09',
    category: 'AI-Powered Engineering',
    title: 'Prompt Engineering & Autonomous AI Agents',
    description: 'Structure multi-agent workflows, self-healing execution loops, tool calling, and RAG architectures.',
    technologies: ['Agentic Loops', 'Function Calling', 'RAG Pipelines', 'Vector Databases', 'LangChain / GenAI SDK'],
    learningOutcome: 'Construct autonomous AI features that fetch data, invoke APIs, and reason across workflows.'
  },
  {
    number: 'MOD-10',
    category: 'AI-Powered Engineering',
    title: 'AI-Assisted Testing, Debugging & Security',
    description: 'Harness LLMs for automated test generation, fuzzing, static analysis, vulnerability auditing, and bug reproduction.',
    technologies: ['Vitest / Jest', 'Playwright', 'Security Scanning', 'Automated Regression Suites'],
    learningOutcome: 'Deploy automated test suites in minutes, ensuring AI-generated software is production-grade.'
  },

  // Category 4: Product Development
  {
    number: 'MOD-11',
    category: 'Product Development',
    title: 'MVP Scoping, Git & Production Workflows',
    description: 'Manage production branches, semantic versioning, pull request reviews, and product roadmapping.',
    technologies: ['Git / GitHub', 'Branching Strategies', 'PR Workflows', 'Issue Tracking', 'Linear / Agile'],
    learningOutcome: 'Operate with professional engineering discipline inside distributed engineering teams.'
  },
  {
    number: 'MOD-12',
    category: 'Product Development',
    title: 'Cloud Deployment, CI/CD & Production Launch',
    description: 'Dockerize applications, automate tests via GitHub Actions, provision cloud instances, and manage custom domains.',
    technologies: ['Docker', 'GitHub Actions', 'Vercel / Cloud Run', 'DNS & SSL', 'Sentry Monitoring'],
    learningOutcome: 'Take any project from local code to a publicly accessible, zero-downtime global domain.'
  }
];

export const WHY_CHOOSE_US_POINTS: WhyChooseUsPoint[] = [
  {
    number: '01',
    title: 'AI-Accelerated Engineering',
    description: 'Learn how modern engineers leverage AI to dramatically accelerate development velocity by 5x without sacrificing architectural integrity.',
    iconName: 'Zap',
    tag: '5x Velocity'
  },
  {
    number: '02',
    title: 'Real Software, Not Just Tutorials',
    description: 'Students work on practical, production-grade applications that solve real market challenges rather than just watching passive lectures.',
    iconName: 'Laptop',
    tag: '100% Practical'
  },
  {
    number: '03',
    title: 'Engineering Fundamentals',
    description: 'AI does not replace understanding. Students master the foundational computer science required to direct, review, and harden AI-generated software.',
    iconName: 'Cpu',
    tag: 'Deep Foundations'
  },
  {
    number: '04',
    title: 'Production Mindset',
    description: 'Learn how real software is structured, tested, deployed, and maintained with automated CI/CD, telemetry, and security best practices.',
    iconName: 'ShieldCheck',
    tag: 'Ship to Prod'
  },
  {
    number: '05',
    title: 'Entrepreneurial Thinking',
    description: 'Learn how to identify market problems, validate hypotheses, create software solutions, and discover commercial opportunities.',
    iconName: 'TrendingUp',
    tag: 'Founder Mindset'
  },
  {
    number: '06',
    title: 'University-Backed Ecosystem',
    description: 'Officially backed by the University of Haripur Business Incubation Center (BIC), providing academic credibility, co-working facilities, and mentorship.',
    iconName: 'GraduationCap',
    tag: 'UOH BIC Backed'
  },
  {
    number: '07',
    title: 'From Haripur to the World',
    description: 'Build skills and digital products capable of competing in global markets, remote international careers, and top venture ecosystems.',
    iconName: 'Globe',
    tag: 'Global Reach'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    studentName: 'Hamza Malik',
    role: 'Batch 01 Graduate • Software Engineer at CloudSync',
    projectBuilt: 'Built "AgriSense PK" — an AI-powered crop disease detection platform deployed on mobile and web.',
    quote: 'Before Vibe Coding, building a full-stack product took me 2 months. By applying the SOCH workflow, I built and launched AgriSense in 10 days. The mental shift from manual typing to directorial engineering changed my life.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    videoDuration: '3:45',
    achievement: 'Landed $2,500/mo remote engineering role'
  },
  {
    id: 'story-2',
    studentName: 'Ayesha Noor',
    role: 'Batch 01 Graduate • Founder of EduVibe PK',
    projectBuilt: 'Created "EduVibe" — automated curriculum planner for local secondary schools across Khyber Pakhtunkhwa.',
    quote: 'SOCH gave me the courage to see that Haripur students can compete globally. The BIC mentorship and AI-accelerated development curriculum allowed me to pitch and win our first incubation grant.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    videoDuration: '4:12',
    achievement: 'Secured UOH BIC seed funding'
  },
  {
    id: 'story-3',
    studentName: 'Bilal Khan',
    role: 'Batch 01 Graduate • Full-Stack AI Builder',
    projectBuilt: 'Engineered "MediFlow" — clinic appointment, prescription and voice-to-text medical notes assistant.',
    quote: 'The emphasis on engineering fundamentals alongside AI is what makes SOCH unique. You understand the architecture deeply, so you steer AI with precision instead of guessing.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    videoDuration: '2:58',
    achievement: 'Serving 14 clinics across Hazara region'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    category: 'Vibe Coding',
    title: 'What is Vibe Coding? The Andrej Karpathy Paradigm Explained',
    excerpt: 'Explore how conversational software synthesis is transforming development from manual syntax typing to directorial engineering.',
    content: 'In February 2025, Andrej Karpathy coined "Vibe Coding"—the realization that modern developers no longer need to manually write every character of boilerplate code. Instead, by holding the architecture in mind and conversing with AI models, developers can direct software into existence at the speed of thought. However, true vibe coding requires deep engineering fundamentals to review, test, and harden the output.',
    date: 'March 2026',
    readTime: '5 min read',
    author: 'Engr. Adil Khan'
  },
  {
    id: 'post-2',
    category: 'Industry Future',
    title: 'Will AI Replace Software Engineers? The Amplification Thesis',
    excerpt: 'Why AI will not replace engineers, but rather elevate them into digital architects building systems 5x faster.',
    content: 'The fear that AI will replace developers misunderstands the nature of engineering. Code is simply the medium; problem solving, system design, business logic, and security are the essence. At SOCH – Vibe Coding, we teach that AI does not replace the engineer—AI amplifies the engineer. Those who master AI-assisted workflows will easily outpace those who resist.',
    date: 'February 2026',
    readTime: '6 min read',
    author: 'Dr. Zeeshan Haider (UOH BIC)'
  },
  {
    id: 'post-3',
    category: 'Ecosystem',
    title: 'From Haripur to the World: Building Tech Talent in Pakistan',
    excerpt: 'How University of Haripur Business Incubation Center is positioning Pakistani youth to dominate global digital markets.',
    content: 'Geographic barriers are disappearing in software engineering. A developer in Haripur has access to the exact same cutting-edge foundation models as an engineer in San Francisco. Through structured incubation, rigorous computer science foundations, and AI workflows, SOCH is establishing a talent pipeline that connects Pakistani youth directly to international opportunities.',
    date: 'January 2026',
    readTime: '4 min read',
    author: 'SOCH Editorial Board'
  },
  {
    id: 'post-4',
    category: 'Technical Workflow',
    title: 'AI-Accelerated Development: The 8-Step Directorial Loop',
    excerpt: 'A practical breakdown of Think → Understand → Direct AI → Build → Test → Review → Improve → Deploy.',
    content: 'Rather than blindly asking an AI to "build an app", professional vibe coding follows an intentional sequence. First, clarify the architectural constraints. Second, model the data entities. Third, feed surgical prompts with design tokens. Fourth, review the code defensiveness. Fifth, deploy to an isolated preview. This loop ensures 0% hallucination and 100% production readiness.',
    date: 'January 2026',
    readTime: '7 min read',
    author: 'Sarmad Ali (Lead Architect)'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Engr. Adil Khan',
    role: 'Program Director & Lead AI Architect',
    affiliation: 'SOCH – Vibe Coding Lead',
    bio: 'Passionate about democratizing AI engineering workflows. Experienced full-stack architect championing human-AI developer symbiosis.',
    socialLink: 'https://linkedin.com',
    avatarSeed: 'AdilKhan'
  },
  {
    id: 'team-2',
    name: 'Dr. Muhammad Farooq',
    role: 'Director, Business Incubation Center',
    affiliation: 'University of Haripur (BIC)',
    bio: 'Ecosystem builder fostering technology entrepreneurship, university-industry linkages, and commercialization of youth innovations in KP.',
    socialLink: 'https://linkedin.com',
    avatarSeed: 'Farooq'
  },
  {
    id: 'team-3',
    name: 'Zubair Ahmed',
    role: 'Senior Software Engineer & Mentor',
    affiliation: 'Full-Stack Systems Specialist',
    bio: 'Ex-consultant specializing in distributed systems, Next.js architectures, and automated testing pipelines.',
    socialLink: 'https://linkedin.com',
    avatarSeed: 'Zubair'
  },
  {
    id: 'team-4',
    name: 'Fatima Zahra',
    role: 'Product & Community Lead',
    affiliation: 'UOH BIC Venture Associate',
    bio: 'Guiding student founders through user research, pitch deck creation, and community building across the Hazara tech corridor.',
    socialLink: 'https://linkedin.com',
    avatarSeed: 'Fatima'
  }
];
