export interface Project {
  slug: string;
  title: string;
  role: string;
  period: string;
  technologies: string[];
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  businessImpact: string;
  github: string;
  demo: string;
  metrics?: { label: string; value: string }[];
  screenshots?: string[]; // paths or mock metadata
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  type: 'employment' | 'freelance' | 'project' | 'education';
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; info?: string }[];
}

export interface EngineeringPillar {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export const personalInfo = {
  name: "Dikshant Dak",
  title: "Senior Full Stack Engineer",
  subtitle: "Building Scalable SaaS & Real-Time Event-Driven Architectures",
  valueProp: "Specialized in React 19, Next.js 16, and high-performance Node.js systems. I design decoupled message-broker systems, reliable real-time pipelines, and scalable cloud solutions that drive business value.",
  availability: "Available for full-time roles & high-impact contracts",
  email: "dikshant.dak@gmail.com",
  phone: "+91 9694373681",
  linkedin: "https://linkedin.com/in/dikshant-dak",
  github: "https://github.com/dikshant-dak",
  resumePath: "/Dikshant_Dak_Resume.pdf"
};

export const engineeringPillars: EngineeringPillar[] = [
  {
    title: "Event-Driven Systems",
    subtitle: "Orchestration & Queues",
    description: "Decoupling high-overhead operations (such as Puppeteer PDF engines or async integrations) using message brokers like Apache Kafka and BullMQ.",
    icon: "Cpu"
  },
  {
    title: "Scalable Backends",
    subtitle: "High-Performance API Design",
    description: "Developing robust server architectures in Node.js, Express, and Fastify, secured with relational ledgers and row-level transaction locks in PostgreSQL.",
    icon: "Server"
  },
  {
    title: "Real-Time Mobile Apps",
    subtitle: "Native Offline-Resilience",
    description: "Building React Native applications optimized for latency, featuring offline local-cache queuing (SQLite) synced bidirectionally over WebSockets.",
    icon: "Smartphone"
  },
  {
    title: "Modern Web Architectures",
    subtitle: "Instant Frontend Shells",
    description: "Leveraging Next.js 16 Server Actions, React 19 Suspense boundaries, and selective caching directives to achieve sub-50ms shell delivery.",
    icon: "Layers"
  }
];

export const projects: Project[] = [
  {
    slug: "astro-analysts",
    title: "Astro Analysts",
    role: "Lead System Architect",
    period: "2023 - 2024",
    technologies: ["Next.js 15", "React 19", "Apollo GraphQL", "Apache Kafka", "Puppeteer", "Razorpay", "Nodemailer"],
    description: "Vedic astrology (Kundali) consultation platform with real-time billing and high-fidelity, event-driven PDF report generation.",
    problem: "Generating complex astrology charts and dynamic, multilingual PDF reports on the main HTTP thread caused extreme memory spikes and API timeouts under high load.",
    solution: "Decoupled PDF generation from the client request-response loop using Apache Kafka. Implemented worker queues to consume billing triggers, compile templates, and process PDF reports asynchronously.",
    architecture: "Decoupled Next.js client submitting GraphQL actions to an API server. The API server pushes generation events to Kafka. Worker nodes consume these events, pull coordinates from an calculation engine, compile templates via Handlebars, render using Puppeteer, and email reports automatically.",
    challenges: "Optimizing browser instance management in Puppeteer to handle high concurrent runs. Solved by introducing a generic resource pool for Chrome processes and using lighter astronomical libraries.",
    businessImpact: "Successfully generated over 10,000 multi-page PDF reports monthly, maintaining 99.9% API uptime and reducing initial server response times by 85%.",
    github: "https://github.com/dikshant-dak",
    demo: "https://astroanalysts.com",
    metrics: [
      { label: "Monthly PDFs", value: "10,000+" },
      { label: "Server Response", value: "<1.2s" },
      { label: "Kafka Uptime", value: "99.99%" }
    ],
    screenshots: ["/screenshots/astro_main.png", "/screenshots/astro_kundali.png", "/screenshots/astro_admin.png"]
  },
  {
    slug: "wealth-builders",
    title: "Wealth Builders",
    role: "Full Stack Developer",
    period: "2024",
    technologies: ["Next.js 16", "Fastify", "PostgreSQL", "AWS S3", "Material UI"],
    description: "A secure investment and portfolio management platform featuring automated monthly profit sharing and commission auditing.",
    problem: "Manually calculating Net Asset Value (NAV) updates, recurring monthly agent referral commissions, and payouts was labor-intensive, error-prone, and non-transparent.",
    solution: "Built an automated NAV transaction ledger and commission engine in Fastify and PostgreSQL. Rerouted processing using BullMQ workers, validating accounts against auditable ledgers.",
    architecture: "An append-only database transaction design with row-level locking. Fastify routes compute real-time commission payouts, pushing secure receipts to AWS S3, visualised via React components.",
    challenges: "Ensuring transaction history remains fully immutable and tamper-proof. Developed custom DB triggers that block direct row edits, forcing adjustments through double-entry accounting transactions.",
    businessImpact: "Reduced client accounting overhead by 95% and automated accurate monthly distributions to more than 500 active investors.",
    github: "https://github.com/dikshant-dak",
    // demo: "https://wealthbuilderss.com",
    demo: "https://wealth-builderss.vercel.app",
    metrics: [
      { label: "Accounting Saved", value: "95%" },
      { label: "Active Investors", value: "500+" },
      { label: "Ledger Safety", value: "Audit-Ready" }
    ],
    screenshots: ["/screenshots/wealth_dash.png", "/screenshots/wealth_ledger.png"]
  },
  {
    slug: "skytrek-adventure",
    title: "SkyTrek Adventure",
    role: "Full Stack Developer",
    period: "2024",
    technologies: ["Node.js", "Express", "GraphQL", "Next.js", "AWS EC2/S3", "TypeORM", "Mantine UI", "Supabase PostgreSQL", "Umami"],
    description: "Adventure park and campsite reservation portal with real-time checkout flows, WhatsApp notifications, and analytics.",
    problem: "Outdated booking mechanisms resulted in high abandon rates, double-booked slots, and disjointed client communication during peak holiday seasons.",
    solution: "Designed and built an end-to-end booking engine integrated with PayU, storing state in a Supabase PostgreSQL database, using AWS S3 for media assets. Automated booking updates through the WhatsApp Business API.",
    architecture: "React-based custom booking calendar that queries a Node/Express GraphQL API. Handles transactions securely via Supabase DB. Deployed Umami analytics in Docker containers to track custom funnel metrics.",
    challenges: "Handling double-bookings under concurrent race conditions. Resolved by implementing PostgreSQL row-level locks on inventory slots within transaction blocks.",
    businessImpact: "Drove online reservations up by 40%, streamlined communication overhead, and processed thousands of successful bookings in the first season.",
    github: "https://github.com/dikshant-dak",
    demo: "https://skytrekadventure.com",
    metrics: [
      { label: "Conversion Lift", value: "+40%" },
      { label: "Checkout Speed", value: "Sub-2s" },
      { label: "Notification Rate", value: "100%" }
    ],
    screenshots: ["/screenshots/skytrek_home.png", "/screenshots/skytrek_booking.png"]
  },
  {
    slug: "nextinnings",
    title: "NextInnings",
    role: "React Native Mobile Engineer",
    period: "2024",
    technologies: ["React Native", "Fastify", "PostgreSQL", "Socket.io"],
    description: "Live cricket scoring mobile application supporting profiles, match setup, and sub-100ms ball-by-ball score updates.",
    problem: "Broadcasting match scores with low latency in areas with poor cellular connectivity while ensuring scorer actions are offline-resilient.",
    solution: "Developed scoring engines in React Native synced over Socket.io. Configured client-side state buffering (SQLlite) that queues actions during disconnects and flushes on connection recovery.",
    architecture: "Client mobile app (React Native) keeping direct Socket.io channels with a Fastify server. Fastify broadcasts scores to all listening clients instantly while flushing state to PostgreSQL.",
    challenges: "Resolving synchronization conflicts between scorers and live viewers when network connection drops. Built a state-reconciliation algorithm utilizing logical clocks.",
    businessImpact: "Achieved over 2,000 app installs and maintained latency below 100ms for score delivery during regional tournaments.",
    github: "https://github.com/dikshant-dak",
    demo: "#",
    metrics: [
      { label: "Broadcast Latency", value: "<100ms" },
      { label: "App Installs", value: "2,000+" },
      { label: "Offline Sync", value: "Reliable" }
    ],
    // screenshots: ["cricket_score.jpg", "cricket_admin.jpg"]
  },
  {
    slug: "luxorae-detailing",
    title: "Luxorae Detailing",
    role: "Frontend Engineer",
    period: "2024",
    technologies: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS"],
    description: "Premium B2B portal and interactive hotel directory for a commercial detailing enterprise, featuring client mapping, search, and sorting across Udaipur's hospitality sector.",
    problem: "Hospitality business leads lacked a clean directory to map, search, and catalog detailing partners, resulting in slow operations.",
    solution: "Built a lightning-fast B2B portal using Next.js, featuring client mapping, fuzzy client search, and dynamic item listings with stateful caching.",
    architecture: "Next.js App Router providing Server-Side Rendered catalogs. Client-side state is handled with React hooks and local index lookup structures for search performance.",
    challenges: "Optimizing loading speeds for heavy hotel catalogs and media files. Handled via next/image optimizations and layout-shift-free animations.",
    businessImpact: "Onboarded 15+ premium hotel partners and speeded up local client lookups by 300%.",
    github: "https://github.com/dikshant-dak",
    demo: "https://luxoraedetailing.com",
    metrics: [
      { label: "Partners Onboarded", value: "15+" },
      { label: "Lookup Velocity", value: "+300%" },
      { label: "Performance Rating", value: "100/100" }
    ],
    screenshots: ["/screenshots/luxe_home.png", "/screenshots/luxe_dir.png"]
  },
  {
    slug: "cinematic-suite",
    title: "Cinematic Suite",
    role: "Frontend Developer",
    period: "2023",
    technologies: ["React", "Redux Toolkit", "React Router v6", "SCSS", "TMDB API", "Vite"],
    description: "Responsive movie and TV show exploration catalog featuring trending media, search, genre filters, and trailer modal overlays using TMDB API data.",
    problem: "Repeatedly fetching static configuration parameters and genre metadata on page changes caused redundant network calls and slow page transitions.",
    solution: "Configured Redux Toolkit global state to cache TMDB configuration rules and genre mapping lists. Implemented infinite scrolling and lazy-loaded image lists to maintain smooth scrolling.",
    architecture: "Vite React Single Page Application utilizing React Router v6 for nested route matching. Uses Redux Toolkit for caching and SCSS for responsive layouts.",
    challenges: "Maintaining 60 FPS performance while loading high volumes of list images. Addressed using scroll boundaries and component dynamic render lists.",
    businessImpact: "Delivered a smooth, responsive web application and eliminated duplicate metadata network fetches completely.",
    github: "https://github.com/dikshant-dak",
    demo: "https://cinematicuniverse.netlify.app",
    metrics: [
      { label: "Target FPS", value: "60 FPS" },
      { label: "Load Time", value: "<1.5s" },
      { label: "State Cache", value: "Redux Store" }
    ],
    // screenshots: ["cinematic_home.png", "cinematic_detail.png"]
  },
  {
    slug: "youtube-clone",
    title: "YouTube Clone",
    role: "Frontend Developer",
    period: "2023",
    technologies: ["React", "RapidAPI", "SCSS", "React Router"],
    description: "A responsive video browsing clone platform streaming content using RapidAPI with category views and channel pages.",
    problem: "Handling API rate limits while browsing search, categories, and channels was difficult with high user query volumes.",
    solution: "Constructed unified API fetch helpers with local cache maps to prevent refetches. Optimized layout templates for seamless responsive transitions.",
    architecture: "React SPA calling REST endpoints from RapidAPI, routing views with React Router, styled with custom SCSS utility grids.",
    challenges: "Structuring responsive video grid containers that scale smoothly across mobile, tablet, and desktop viewports.",
    businessImpact: "Provided a highly responsive video streaming clone demonstrating advanced API consumption and UI alignment.",
    github: "https://github.com/dikshant-dak",
    demo: "https://youtube-clone-dikshant.netlify.app",
    metrics: [
      { label: "API Latency", value: "<500ms" },
      { label: "Grid Scaling", value: "Responsive" },
      { label: "Request Cache", value: "Active" }
    ],
    screenshots: ["/screenshots/yt_home.png", "/screenshots/yt_video.png"]
  }
];

export const experienceTimeline: Experience[] = [
  {
    id: "exp-tdc",
    role: "Full Stack Developer",
    company: "TDC Consultancy Pvt. Ltd.",
    location: "India",
    period: "2023 - Present",
    type: "employment",
    highlights: [
      "Contributed to the development of an industry-level ERP software and an e-commerce platform using React.js, Next.js, GraphQL, Express, and PostgreSQL, enhancing product functionality and user experience.",
      "Built and optimized backend job processing pipelines using BullMQ and worker queues to handle asynchronous and scheduled tasks reliably.",
      "Deployed, monitored, and maintained applications on Google Cloud Platform (GCP) and AWS, ensuring scalable and secure infrastructure.",
      "Collaborated with cross-functional teams to implement critical online shopping features, maintaining agile methodologies."
    ]
  },
  {
    id: "exp-freelance",
    role: "Independent Consultant / Architect",
    company: "Freelance",
    location: "Remote",
    period: "2023 - Present",
    type: "freelance",
    highlights: [
      "Designed event-driven Puppeteer PDF reporting structures utilizing Apache Kafka to decouple heavy computing from API servers.",
      "Implemented Net Asset Value (NAV) automated transaction ledgers and agent referral engines.",
      "Engineered mobile cricket scoring frameworks supporting Socket.io and offline local-caching workflows."
    ]
  },
  {
    id: "edu-techno",
    role: "B.Tech in Computer Science Engineering",
    company: "Techno India NJR Institute of Technology",
    location: "India",
    period: "2020 - 2024",
    type: "education",
    highlights: [
      "Graduated with a CGPA of 9.73 / 10",
      "Specialized in Algorithms, Database Systems, Web Architectures, and Cloud Computing."
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React 19 / React.js", level: 95, info: "Expert" },
      { name: "Next.js 16 (App Router)", level: 95, info: "Expert" },
      { name: "TypeScript", level: 90, info: "Advanced" },
      { name: "React Native", level: 85, info: "Advanced" },
      { name: "Tailwind CSS v4", level: 95, info: "Expert" },
      { name: "Redux Toolkit / State", level: 88, info: "Advanced" }
    ]
  },
  {
    category: "Backend & API",
    skills: [
      { name: "Node.js", level: 92, info: "Expert" },
      { name: "Express.js", level: 92, info: "Expert" },
      { name: "Fastify", level: 85, info: "Advanced" },
      { name: "GraphQL / Apollo", level: 88, info: "Advanced" },
      { name: "REST APIs", level: 95, info: "Expert" },
      { name: "Prisma & TypeORM", level: 88, info: "Advanced" }
    ]
  },
  {
    category: "Databases & Queues",
    skills: [
      { name: "PostgreSQL", level: 90, info: "Advanced" },
      { name: "MongoDB", level: 85, info: "Advanced" },
      { name: "Supabase", level: 90, info: "Advanced" },
      { name: "Apache Kafka", level: 80, info: "Intermediate" },
      { name: "BullMQ / Redis", level: 85, info: "Advanced" }
    ]
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3)", level: 88, info: "Advanced" },
      { name: "Google Cloud Platform", level: 82, info: "Advanced" },
      { name: "Docker", level: 85, info: "Advanced" },
      { name: "Git / GitHub Actions", level: 90, info: "Advanced" },
      { name: "Terraform", level: 75, info: "Intermediate" }
    ]
  },
  {
    category: "AI & Modern Engineering",
    skills: [
      { name: "Agentic AI Integration", level: 80, info: "Intermediate" },
      { name: "RAG / Vector Databases", level: 82, info: "Intermediate" },
      { name: "Socket.io (Real-Time)", level: 88, info: "Advanced" },
      { name: "Puppeteer (Automation)", level: 90, info: "Advanced" }
    ]
  }
];

export const techStackDeepDive = [
  {
    title: "Next.js 16 Caching & PPR",
    tech: "Next.js 16 & React 19",
    why: "By using the new 'use cache' directives in combination with React 19 Suspense, I build applications that render static shells instantly (under 50ms) and load dynamic database states concurrently. This guarantees optimal UX while preserving SEO indexing.",
    points: [
      "Eliminates Client-Server hydration waterfalls.",
      "Reduces API response latency on page navigations.",
      "Guarantees stable SEO indexing using pre-rendered shells."
    ]
  },
  {
    title: "Event-Driven Processing",
    tech: "Apache Kafka & BullMQ",
    why: "Decoupling high-overhead computational processes (like Puppeteer PDF renders or recurring distributions) from HTTP route handlers prevents API thread blocking and memory leakage, ensuring high system reliability.",
    points: [
      "API route stays responsive under massive concurrency.",
      "Worker scaling is completely isolated from HTTP servers.",
      "Guarantees that job execution persists even during transient database failure."
    ]
  },
  {
    title: "Relational Ledger Database Architecture",
    tech: "PostgreSQL & Supabase",
    why: "I design database structures that treat transactional integrity as a core feature. By utilizing double-entry append-only ledgers and Row-Level Security, data remains audit-ready and tamper-proof.",
    points: [
      "Avoids race-conditions using PG row-level locking.",
      "Guarantees complete history immutability.",
      "Provides granular secure access keys directly from client UI."
    ]
  }
];
