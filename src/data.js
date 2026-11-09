// Single source of content. Everything here comes from Arnav Mehta's rsum.
// Do not add metrics, clients, users or features that were not built.

// Disclaimers shown wherever these projects appear.
export const notes = {
  saarthi: 'Under active development. More features to follow.'
}

// Personal links
export const links = {
  github: 'https://github.com/arnavvmehtaa718',
  linkedin: 'https://www.linkedin.com/in/arnav-mehta-137583329/',
  email: 'arnavm.396@gmail.com',
  resume: '/Arnav_Mehta_Resume.pdf',
  phone: '7834973362',
}

export const proof = [
  {
    k: 'Build',
    slug: 'eventhub',
    body: 'Full-stack apps with React, Next.js, Node.js and FastAPI deployed and live.',
    shot: '/projects/eventhub/eventhub-1.jpg',
    tag: 'EventHub Platform',
  },
  {
    k: 'Analyse',
    slug: 'oceaniq',
    body: 'Maritime procurement analytics with freight forecasting and interactive BI dashboards.',
    shot: '/projects/oceaniq/oceaniq-1.png',
    tag: 'OceanIQ Intelligence',
  },
  {
    k: 'Explore',
    slug: 'saarthi-ai',
    body: 'AI-driven benefits navigator with conversational assistance and dynamic scheme discovery.',
    shot: '/projects/saarthi/saarthi-1.png',
    tag: 'Saarthi AI',
  },
  {
    k: 'Ship',
    body: 'Live on Vercel, Railway, Render with CI/CD and containerized deployments.',
    tech: [
      { name: 'React', icon: 'react', color: '#61dafb' },
      { name: 'Next.js', icon: 'nextdotjs', color: '#ffffff' },
      { name: 'FastAPI', icon: 'fastapi', color: '#009688' },
      { name: 'Docker', icon: 'docker', color: '#2496ed' },
      { name: 'Vercel', icon: 'vercel', color: '#ffffff' },
      { name: 'Railway', icon: 'railway', color: '#ec4899' },
    ],
    tag: 'CI/CD & Cloud',
  },
]

export const projects = [
  {
    slug: 'eventhub',
    usage: ['Browse and discover local events by category', 'Sign up as a user or organizer', 'Create and manage events as an organizer', 'Register for events with responsive ticketing UI', 'View event details with smooth, mobile-first layouts'],
    title: 'EventHub',
    kicker: 'Event discovery & ticketing platform',
    status: 'Completed',
    category: 'Full Stack',
    color: '#c6ff3d',
    shot: '/projects/eventhub/eventhub-1.jpg',
    gallery: [
      '/projects/eventhub/eventhub-1.jpg',
      '/projects/eventhub/eventhub-2.jpg',
      '/projects/eventhub/eventhub-3.jpg',
    ],
    summary: 'A full-stack event discovery and ticketing platform with user and organizer workflows, responsive UI, and cloud deployment.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Vercel', 'Railway'],
    role: 'Built the full platform end-to-end in a 3-member team: frontend, backend APIs and deployment.',
    problem: 'Event discovery was fragmented " users needed one place to find, explore and register for events, while organizers needed tools to manage them.',
    solution: 'A platform with event browsing, organizer dashboards, user registration flows, and REST APIs backed by MongoDB, deployed across Vercel and Railway.',
    features: [
      'Event discovery and filtering by category',
      'User and organizer role-based workflows',
      'Responsive UI with Tailwind CSS',
      'REST APIs with Node.js/Express + MongoDB',
      'Frontend deployed on Vercel, backend on Railway',
    ],
    architecture: [
      ['Frontend', 'Next.js + React + Tailwind CSS'],
      ['Backend', 'Node.js + Express'],
      ['Database', 'MongoDB'],
      ['Deployment', 'Vercel (frontend) + Railway (backend)'],
    ],
    challenges: ['Coordinating user and organizer workflows with role-based access while keeping the UI responsive across devices.'],
    github: 'https://github.com/abhinav8377/event',
    demoUrl: 'https://event-hub.in/',
  },
  {
    slug: 'saarthi-ai',
    usage: ['Search for government schemes by eligibility criteria', 'Upload documents for AI-driven analysis', 'Get eligibility assessment powered by AI', 'Chat with conversational assistant for guidance', 'Manage user profile and authentication'],
    title: 'Saarthi AI',
    kicker: 'Government benefits navigator',
    status: 'In development',
    note: notes.saarthi,
    category: 'AI / Full Stack',
    color: '#3dd9ff',
    shot: '/projects/saarthi/saarthi-1.png',
    gallery: [
      '/projects/saarthi/saarthi-1.png',
      '/projects/saarthi/saarthi-2.png',
      '/projects/saarthi/saarthi-3.png',
    ],
    summary: 'An AI-powered government benefits navigator that helps citizens discover schemes, check eligibility, and get conversational guidance.',
    tech: ['FastAPI', 'Python', 'React', 'AI/ML', 'NLP', 'REST APIs', 'Authentication'],
    role: 'Building the backend, AI-driven analysis pipeline, and eligibility engine.',
    problem: 'Citizens struggle to discover government schemes they qualify for, and the eligibility process is opaque and document-heavy.',
    solution: 'An intelligent platform with scheme search, AI-driven document and eligibility analysis, user profiles, and a conversational assistant.',
    features: [
      'Government scheme search and discovery',
      'AI-driven document analysis for eligibility',
      'Conversational AI assistant for guidance',
      'User profiles and authentication',
      'Eligibility assessment engine',
    ],
    architecture: [
      ['Backend', 'FastAPI (Python)'],
      ['AI', 'LLM-driven eligibility and document analysis'],
      ['Frontend', 'React'],
      ['Auth', 'Session-based authentication'],
    ],
    challenges: ['Making AI eligibility analysis accurate enough for real-world government scheme rules and document formats.'],
    github: 'https://github.com/arnavvmehtaa718/Saarthi-AI',
    demoUrl: 'https://saarthi-ai-dev.vercel.app/',
  },
  {
    slug: 'atlas-travel-ai',
    usage: ['Enter a destination city or region', 'AI collects real-time geospatial and weather data', 'Nearby attractions are clustered by proximity', 'Travel distances are calculated for optimization', 'Receive an optimized multi-day itinerary'],
    title: 'Atlas Travel AI',
    kicker: 'AI-powered travel itinerary planner',
    status: 'Completed',
    category: 'AI / Full Stack',
    color: '#ffd23d',
    shot: '/projects/atlas/atlas-1.png',
    gallery: [
      '/projects/atlas/atlas-1.png',
      '/projects/atlas/atlas-2.png',
      '/projects/atlas/atlas-3.png',
    ],
    summary: 'An AI travel planner that orchestrates real-time APIs for geospatial data, weather and attraction clustering to generate optimized daily itineraries.',
    tech: ['Next.js', 'TypeScript', 'OpenStreetMap API', 'Wikipedia API', 'Open-Meteo API', 'Geospatial Algorithms'],
    role: 'Built the full pipeline: API orchestration, clustering algorithm and itinerary generation.',
    problem: 'Planning a multi-day trip requires manually researching attractions, distances, weather and logistics across multiple sources.',
    solution: 'A Next.js pipeline that collects real-time data from OpenStreetMap, Wikipedia and Open-Meteo, clusters nearby attractions, calculates travel distances, and generates optimized daily itineraries.',
    features: [
      'Real-time geospatial data from OpenStreetMap',
      'Weather integration via Open-Meteo API',
      'Attraction info enrichment from Wikipedia',
      'TypeScript clustering algorithm for nearby attractions',
      'Optimized daily itinerary generation with travel distances',
    ],
    architecture: [
      ['Framework', 'Next.js + TypeScript'],
      ['APIs', 'OpenStreetMap, Wikipedia, Open-Meteo'],
      ['Algorithm', 'Custom clustering + distance optimization'],
      ['Output', 'Structured multi-day itineraries'],
    ],
    challenges: ['Building a reliable clustering algorithm that groups attractions by walkable proximity while respecting daily time constraints.'],
    github: 'https://github.com/arnavvmehtaa718/Atlas-Travel-AI',
    demoUrl: 'https://atlas-travel-agent.vercel.app/',
  },
  {
    slug: 'oceaniq',
    usage: [
      'Freight Forecasting: Random Forest-based freight rate prediction and market outlook.',
      'Charter Timing: Insights to support decisions on when to charter vessels.',
      'Vessel Recommendation: Vessel suitability analysis based on cargo requirements.',
      'Port Analytics: Port selection and operational analysis.',
      'Route Optimization: Maritime route analysis for cargo movement.',
      'Cost & Savings Analysis: Comparative procurement cost analysis.',
      'Risk Intelligence: Identification and assessment of procurement and freight risks.',
      'Contract Strategy: Decision support for chartering and contract planning.',
      'Dynamic Reports: Consolidated procurement analysis and recommendations.',
    ],
    title: 'OceanIQ',
    kicker: 'AI-Powered Maritime Procurement & Chartering Intelligence',
    status: 'In development',
    category: 'AI / Full Stack',
    color: '#3dd9ff',
    shot: '/projects/oceaniq/oceaniq-1.png',
    gallery: [
      '/projects/oceaniq/oceaniq-1.png',
      '/projects/oceaniq/oceaniq-2.png',
      '/projects/oceaniq/oceaniq-3.png',
    ],
    summary: "OceanIQ is an AI-powered maritime platform optimizing bulk-cargo procurement, vessel chartering and route analytics.",
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Python', 'Scikit-learn', 'Random Forest', 'Data Analytics'],
    role: 'Contributed to the backend AI pipeline and data visualization layers.',
    problem: 'Bulk-cargo procurement and chartering decisions were fragmented across spreadsheets and manual analysis.',
    solution: 'Unified decision-intelligence workflow with ML-based freight forecasting, charter timing, vessel recommendation, port analytics, route optimization, cost and risk analysis.',
    features: [
      'Freight Forecasting: Random Forest-based freight rate prediction and market outlook.',
      'Charter Timing: Insights to support decisions on when to charter vessels.',
      'Vessel Recommendation: Vessel suitability analysis based on cargo requirements.',
      'Port Analytics: Port selection and operational analysis.',
      'Route Optimization: Maritime route analysis for cargo movement.',
      'Cost & Savings Analysis: Comparative procurement cost analysis.',
      'Risk Intelligence: Identification and assessment of procurement and freight risks.',
      'Contract Strategy: Decision support for chartering and contract planning.',
      'Dynamic Reports: Consolidated procurement analysis and recommendations.',
    ],
    architecture: [
      ['Frontend', 'React, Next.js, TypeScript, Tailwind CSS'],
      ['ML', 'Python, Scikit-learn, Random Forest'],
      ['Data Analytics', 'Procurement cost, risk and contract analysis'],
      ['Deployment', 'Vercel'],
    ],
    challenges: ['Aligning heterogeneous maritime data into a single forecasting and decision workflow.'],
    github: 'https://github.com/arnavvmehtaa718/OceanIQ',
    demoUrl: 'https://nauniti.vercel.app/',
  },
  {
    slug: 'jarvis',
    usage: [
      '3D knowledge galaxy - every .md note is a glowing star, color-coded by folder, linked by title mentions and shared [[wikilinks]]. Cinematic starfield, bloom, idle camera drift.',
      'Ask your notes - type or speak a question; JARVIS retrieves the most relevant notes, answers in one witty sentence plus the facts (Gemini), then flies the camera to the source note and opens it as proof. Answers drawing on 4+ notes light up the whole cluster instead.',
      'Voice, both directions - Web Speech API output (prefers a British voice, naturally) and webkitSpeechRecognition input with a wake word: say "Jarvis..." to interrupt him mid-sentence (true barge-in), or "Jarvis, brief me" in one breath.',
      'Grow the brain by voice - "remember that..." writes a real markdown note into notes/captures/, births the star live at its most related node with a glow pulse, and flies to it.',
      'Briefings - "good morning" / "brief me" fetches live weather from Open-Meteo (free, no key) for your city plus the state of your second brain.',
      'Time Machine - "what was I doing last Tuesday?" replays your activity log for any day.',
      'Agent hands - "research...", "draft...", "summarize..." produces a plan first and acts only after you say "do it". Deliverables are filed into the galaxy as new notes.',
    ],
    title: 'Jarvis',
    kicker: "An interactive 3D knowledge galaxy with a voice, a brain, and a butler's manners.",
    status: 'In development',
    category: 'AI / Full Stack',
    color: '#a78bfa',
    shot: '/projects/jarvis/jarvis-1.png',
    gallery: [
      '/projects/jarvis/jarvis-1.png',
      '/projects/jarvis/jarvis-2.png',
    ],
    summary: "An interactive 3D knowledge galaxy with a voice, a brain, and a butler's manners - your markdown notes become stars in a force-directed galaxy.",
    tech: ['Python', 'Gemini API', 'Web Speech API', 'Open-Meteo API', '3D Force Graph', 'HTML', 'REST APIs'],
    role: 'Built the Python backend (stdlib graph builder and API server) and the single-page 3D viewer frontend.',
    problem: 'Personal knowledge tools scatter notes across apps, lose context, and never answer back.',
    solution: 'A markdown second brain rendered as a 3D knowledge galaxy with retrieval, voice, briefings, time machine and agent capabilities.',
    features: [
      '3D knowledge galaxy - every .md note is a glowing star, color-coded by folder, linked by title mentions and shared [[wikilinks]]. Cinematic starfield, bloom, idle camera drift.',
      'Ask your notes - type or speak a question; JARVIS retrieves the most relevant notes, answers in one witty sentence plus the facts (Gemini), then flies the camera to the source note and opens it as proof.',
      'Voice, both directions - Web Speech API output (prefers a British voice, naturally) and webkitSpeechRecognition input with a wake word: say "Jarvis..." to interrupt him mid-sentence (true barge-in), or "Jarvis, brief me" in one breath.',
      'Grow the brain by voice - "remember that..." writes a real markdown note into notes/captures/, births the star live at its most related node with a glow pulse.',
      'Briefings - "good morning" / "brief me" fetches live weather from Open-Meteo for your city plus second-brain status.',
      'Time Machine - "what was I doing last Tuesday?" replays the activity log for any day.',
      'Agent hands - "research...", "draft...", "summarize..." produces a plan first and acts only after you say "do it".',
    ],
    architecture: [
      ['Notes', 'markdown notes in notes/, folders become groups'],
      ['build.py', 'stdlib-only scanner -> viewer/graph-data.js'],
      ['server.py', 'stdlib-only HTTP server, port 4700; chat, remember, briefing, settings, timemachine, agent'],
      ['viewer', 'single HTML page (3d-force-graph via CDN)'],
    ],
    challenges: ['Serving the whole app from the Python stdlib while keeping the browser viewer self-contained and the API key server-side only.'],
    github: 'https://github.com/arnavvmehtaa718/JARVIS-AI',
    demoUrl: 'https://jarvis-ai-k1vj.onrender.com/',
  },
]

// Live sites shown as full-bleed screenshots in the "on the web" gallery.
export const liveWork = [
  { t: 'EventHub', d: 'Event discovery and ticketing platform', slug: 'eventhub', shot: '/projects/eventhub/eventhub-1.jpg', url: 'https://github.com/abhinav8377/event', demoUrl: 'https://event-hub.in/' },
  { t: 'Saarthi AI', d: 'AI-powered government benefits navigator', slug: 'saarthi-ai', note: notes.saarthi, shot: '/projects/saarthi/saarthi-1.png', url: 'https://github.com/arnavvmehtaa718/Saarthi-AI', demoUrl: 'https://saarthi-ai-dev.vercel.app/' },
  { t: 'Atlas Travel AI', d: 'Intelligent travel itinerary planner', slug: 'atlas-travel-ai', shot: '/projects/atlas/atlas-1.png', url: 'https://github.com/arnavvmehtaa718/Atlas-Travel-AI', demoUrl: 'https://atlas-travel-agent.vercel.app/' },
  { t: 'Jarvis', d: 'AI personal assistant', slug: 'jarvis', shot: '/projects/jarvis/jarvis-1.png', url: 'https://github.com/arnavvmehtaa718/JARVIS-AI', demoUrl: 'https://jarvis-ai-k1vj.onrender.com/' },
  { t: 'OceanIQ', d: 'AI-Powered Maritime Procurement & Chartering Intelligence', slug: 'oceaniq', shot: '/projects/oceaniq/oceaniq-1.png', url: 'https://github.com/arnavvmehtaa718/OceanIQ', demoUrl: 'https://nauniti.vercel.app/' },
]

export const archive = [
  {
    t: 'RupeeGPT – Financial Voice Assistant',
    c: 'AI / Voice',
    s: 'Live',
    url: 'https://github.com/arnavvmehtaa718/murf-livekit-starter-arnav',
  },
  {
    t: 'NovaCV – CV Builder',
    c: 'Full Stack',
    s: 'Under development',
    url: 'https://github.com/arnavvmehtaa718/novacv',
    demoUrl: 'https://novacv-marketing-website.vercel.app/',
  },
  {
    t: 'Nova-Ring, Built for Client',
    c: 'UI/UX Design',
    s: 'Under development',
    url: 'https://github.com/arnavvmehtaa718/nova-ring',
    demoUrl: 'https://nova-ring-website.vercel.app/',
  },
  {
    t: 'Bitcoin Netinsights',
    c: 'Analytics',
    s: 'Live',
    url: 'https://github.com/arnavvmehtaa718/bitcoin-netinsights',
    demoUrl: 'https://bitcoin-netinsights.vercel.app/',
  },
  {
    t: 'ISRO Hackathon AI Chatbot',
    c: 'AI / NLP',
    s: 'Prototype',
  },
  {
    t: 'SIH 2025 KMRL Doc Automation',
    c: 'AI / ML',
    s: 'Prototype',
  },
  {
    t: 'Cisco Cybersecurity Project',
    c: 'Networking',
    s: 'Internship',
  },
  {
    t: 'Data Analytics Dashboards',
    c: 'Analytics',
    s: 'Training',
  },
]

export const skills = [
  { g: 'Languages', items: ['Python', 'JavaScript', 'C', 'SQL'], used: 'EventHub, Saarthi AI, Atlas Travel AI' },
  { g: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'], used: 'EventHub, Atlas Travel AI' },
  { g: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'MongoDB'], used: 'EventHub, Saarthi AI' },
  { g: 'Data Analytics', items: ['Pandas', 'NumPy', 'Power BI', 'Tableau', 'Excel', 'Statistical Analysis', 'Data Visualization'], used: 'Selfreneur Training' },
  { g: 'AI / ML', items: ['LLMs', 'NLP', 'Knowledge Graphs', 'OCR', 'Semantic Search'], used: 'ISRO Hackathon, SIH 2025, Saarthi AI' },
  { g: 'Tools & Cloud', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Render', 'Railway'], used: 'All projects' },
  { g: 'Networking', items: ['Cisco Packet Tracer', 'Network Topology', 'VPN/SASE', 'Role-based Segmentation'], used: 'Cisco Internship' },
  { g: 'Soft Skills', items: ['Team Collaboration', 'Adaptability', 'Problem Solving', 'Cross-functional Research'], used: 'Hackathons, Agnirva' },
]

export const journey = [
  {
    t: 'Academic Foundation',
    d: 'Bachelor of Computer Applications (BCA) at Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi, 2024–2027. Consistent academic excellence with a CGPA of 9.1.',
    tag: 'Education · 2024–2027',
    logo: '/milestones/academic.svg',
    org: 'GGSIPU',
  },
  {
    t: 'Data Analytics',
    d: 'Selfreneur summer training. Advanced analysis on pricing, sales and regional datasets using Power BI, Tableau, DAX calculations, visual analytics and KPI dashboard engineering.',
    tag: 'Analytics · Training',
    logo: '/milestones/analytics.svg',
    org: 'Selfreneur Analytics',
  },
  {
    t: 'MERN Stack & DevOps Training',
    d: 'Completed an 80-hour MERN Stack Training Programme, along with an additional 8-hour programme covering the Overview of DevOps with Docker.',
    tag: 'Training · Grade A',
    logo: '/milestones/mern.svg',
    org: 'MERN · DevOps',
  },
  {
    t: 'Smart India Hackathon',
    d: 'Developed OceanIQ, a decision-intelligence platform for maritime procurement and chartering, featuring freight forecasting, vessel recommendations, route optimization, port analytics, cost analysis, and risk assessment.',
    tag: 'Hackathon · SIH 2026',
    logo: '/milestones/fastapi.svg',
    org: 'Smart India Hackathon (SIH)',
  },
  {
    t: 'Cybersecurity',
    d: 'Cisco Networking Academy internship. Designed campus network topology, segmentation, attack-surface analysis, and secure hybrid-access architectures with VPN/SASE and Cisco Packet Tracer.',
    tag: 'Security · Internship',
    logo: '/milestones/cisco.svg',
    org: 'Cisco Networking Academy',
  },
  {
    t: 'Professional Development',
    d: 'Selected participant in the McKinsey.org Forward Program, 2026. Intensive professional growth focusing on digital problem-solving, structured leadership, adaptability, and resilience.',
    tag: 'Leadership · 2026',
    logo: '/milestones/mckinsey.svg',
    org: 'McKinsey & Company',
  },
  {
    t: 'Artificial Intelligence',
    d: 'Agnirva AI internship. Conducted cross-functional research across AI and Space domains, contributing directly to organizational knowledge systems, business strategy, and quality assurance.',
    tag: 'AI · Internship',
    logo: '/milestones/agnirva.svg',
    org: 'Agnirva Space AI',
  },
  {
    t: 'ISRO Hackathon',
    d: 'Bharatiya Antariksh Hackathon 2025. Developed an AI-powered information-retrieval chatbot using LLMs, NLP, and dynamic knowledge graphs in an intensive 4-member team.',
    tag: 'Hackathon · Participant',
    logo: '/milestones/isro.svg',
    org: 'ISRO',
  },
  {
    t: 'RBI90',
    d: 'Participated in the Regional Level Round of RBI90Quiz 2024, representing Jagan Institute of Management Studies, New Delhi.',
    tag: 'Quiz · Regional Level',
    logo: '/milestones/rbi.svg',
    org: 'Reserve Bank of India',
  },
  {
    t: 'Collaboration & Growth',
    d: 'Teamwork, adaptability, and cross-functional problem-solving demonstrated through collaborative delivery in EventHub (3-member team) and national-level ISRO and Algorand hackathon teams.',
    tag: 'Collaboration · Mindset',
    logo: '/milestones/algorand.svg',
    org: 'Algorand & Hackathons',
  },
]

export const achievements = [
  { n: '9.1', org: '', label: 'CGPA at GGSIPU', caption: '9.1 CGPA', logo: '' },
  { n: '3+', org: '', label: 'Projects built and shipped', caption: '3+ PROJECTS', logo: '' },
  { n: '5+', org: '', label: 'Hackathons', caption: 'ISRO, SIH, Geek Room', logo: '' },
  { n: '3+', org: '', label: 'McKinsey, Microsoft, EY', caption: 'CERTIFICATIONS', logo: '' },
]

export const experience = [
  {
    title: 'AI Intern',
    company: 'Agnirva',
    period: '',
    description: 'Conducted cross-functional research across AI and Space domains, contributing to knowledge systems, business strategy, and quality assurance.',
  },
  {
    title: 'Data Analytics Summer Training',
    company: 'Selfreneur',
    period: '',
    description: 'Analyzed sales, pricing, returns and regional data using Power BI and Tableau. Created interactive dashboards, KPIs, and applied DAX, data transformation, and visual analytics on Global Certification System datasets.',
  },
  {
    title: 'Cisco Cybersecurity Internship',
    company: 'Cisco Networking Academy',
    period: '',
    description: 'Designed campus network topology, segmentation and attack-surface analysis using Cisco Packet Tracer. Developed secure hybrid-access architecture with role-based segmentation, VPN/SASE concepts, and authentication flows.',
  },
]

export const hackathons = [
  {
    title: 'ISRO Bharatiya Antariksh Hackathon 2025',
    description: 'Developed an AI-powered information-retrieval chatbot using LLMs, NLP and dynamic knowledge graphs. Worked with a 4-member team on semantic search, multilingual queries, document/web extraction and conversational responses.',
  },
  {
    title: 'Smart India Hackathon 2025 – KMRL',
    description: 'Designed an AI-powered document automation system for OCR, multilingual processing, and knowledge extraction. Proposed React + FastAPI + PostgreSQL + Redis/Celery + NLP/OCR pipeline with automated alerts, search, and compliance tracking.',
  },
]

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  university: 'Guru Gobind Singh Indraprastha University',
  location: 'New Delhi',
  period: '2024 – 2027',
  cgpa: '9.1',
}

export const professionalDev = [
  {
    title: 'McKinsey.org Forward Program',
    org: 'McKinsey & Company',
    year: '2026',
    description: 'Selected participant in the McKinsey Forward Program – professional development for emerging talent.',
  },
]

export const stack = ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'MongoDB', 'Python', 'Tailwind CSS', 'Docker', 'Power BI', 'Tableau', 'Git']

export const repos = [
  { n: 'EventHub', u: 'https://github.com/abhinav8377/event', d: 'Event discovery & ticketing: Next.js, Node.js, MongoDB' },
  { n: 'Saarthi AI', u: 'https://github.com/arnavvmehtaa718/Saarthi-AI', d: 'AI government benefits navigator: FastAPI + React' },
  { n: 'Atlas Travel AI', u: 'https://github.com/arnavvmehtaa718/Atlas-Travel-AI', d: 'Travel planner: Next.js, TypeScript, geospatial APIs' },
  { n: 'All repositories', u: 'https://github.com/arnavvmehtaa718', d: 'Everything on my GitHub profile' },
]

// Icons for the skills loop, served by simpleicons.org (slug, label)
export const skillLogos = [
  ['react', 'React'], ['nextdotjs', 'Next.js'], ['javascript', 'JavaScript'], ['python', 'Python'],
  ['nodedotjs', 'Node.js'], ['express', 'Express'], ['fastapi', 'FastAPI'], ['mongodb', 'MongoDB'],
  ['tailwindcss', 'Tailwind CSS'], ['powerbi', 'Power BI'],
  ['docker', 'Docker'], ['git', 'Git'], ['postman', 'Postman'], ['vercel', 'Vercel'],
  ['railway', 'Railway'], ['numpy', 'NumPy'], ['pandas', 'Pandas'], ['cisco', 'Cisco'],
  ['tableau', 'Tableau'],
]
