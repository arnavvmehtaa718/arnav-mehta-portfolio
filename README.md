# Arnav Mehta — Portfolio

Personal portfolio of **Arnav Mehta**, Full-Stack Developer & AI Engineer based in New Delhi, India. BCA at GGSIPU (9.1 CGPA), national hackathon finalist (ISRO, SIH), McKinsey Forward Program participant.

Built as a single-page application with a horizontal scroll track on desktop and a stacked vertical layout on mobile. Dark aesthetic with lime-green accent (`#C6FF3D`).

## Live sections

- **Hero** — Introduction with static-first-frame hero for fast LCP.
- **What I Do** — Bento grid: Build, Analyse, Explore, Ship.
- **Featured Work** — Project spiral with case studies (EventHub, Saarthi AI, Atlas Travel AI, OceanIQ, Jarvis).
- **Showreels** — Video-in-type project reels.
- **Live on the Web** — Floating cards with a drawn graph line connecting them.
- **Project Index** — Flowing marquee menu of every project.
- **Archive** — Filterable project list including hackathons and internships.
- **Statement** — Approach manifesto with tool logo loops.
- **About** — Editorial scrolly page with portrait, principles, and contact.
- **Journey** — 3D milestone card stack (academic, internships, hackathons).
- **Skills** — Grouped skills with usage receipts, animated logo loop.
- **Proof in Numbers** — 2×2 statistics grid (CGPA, projects, hackathons, certifications).
- **Contact** — Email, LinkedIn, GitHub, résumé, and FormSubmit contact form.

## Tech stack

- **Framework:** React 19 + Vite
- **Animations:** GSAP, Framer Motion, Lenis (smooth scroll)
- **3D / WebGL:** Three.js, @react-three/fiber, @react-three/drei, OGL
- **Styling:** CSS custom properties, self-hosted fonts (Inter Tight, Instrument Serif, JetBrains Mono)
- **Icons:** Simple Icons (via CDN), local SVG assets
- **Lint:** oxlint

## Project structure

```
src/
  Home.jsx          # Main single-page application (all panels)
  App.jsx           # Hash routing, error boundary, loader
  AboutPage.jsx     # Editorial about page
  CaseStudy.jsx     # Per-project case study view
  data.js           # Single source of truth: projects, journey, skills, links, achievements
  main.jsx          # Entry point, StrictMode, font & CSS imports
  index.css         # Design tokens, base styles, reset
  fonts.css         # Self-hosted @font-face declarations
  site-sections.css # Per-section layout and responsive breakpoints
  img.js            # Image srcset / poster helpers
  parts.jsx         # Canvas-drawn project cover art
  squares.js        # Pixel-block square sweep effect
  useOnScreen.js    # IntersectionObserver hook for animation gating
  components/       # Reusable UI and animation components
  assets/           # Additional static assets

public/
  milestones/       # Organisation logos (ISRO, McKinsey, Cisco, etc.)
  tech-icons/       # Skill icon SVGs for LogoLoop
  projects/         # Project screenshots and galleries
  fonts/            # Self-hosted WOFF2 font files
  Arnav_Mehta_Resume.pdf  # Résumé PDF (linked throughout)
  media/resume-preview.png # Résumé preview image (modal)
```

## Setup

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server on `http://localhost:5173` with HMR.

### Production build

```bash
npm run build
```

Outputs to `dist/`. Builds are automatically verified with `vite build`.

### Lint

```bash
npm run lint
```

Runs oxlint with React and oxc plugin rules.

### Preview production build

```bash
npm run preview
```

Serves the `dist/` directory locally.

## Content

All portfolio content lives in `src/data.js` as the single source of truth:

- `projects` — Featured projects with tech stacks, roles, challenges, architecture, and GitHub links.
- `liveWork` — Live sites shown in the "Live on the Web" gallery.
- `archive` — Additional projects, hackathons, and internships.
- `journey` — Milestone cards (education, internships, hackathons, certifications).
- `skills` — Skill groups with usage context ("used in" references).
- `achievements` — Statistics for the "Proof in Numbers" grid.
- `links` — GitHub, LinkedIn, email, résumé, phone.
- `experience` — Work experience entries.
- `hackathons` — Hackathon details.
- `education` — Degree details.
- `professionalDev` — Professional development (McKinsey Forward).

## Branding

- **Name:** Arnav Mehta
- **Title:** Full-Stack Developer & AI Engineer
- **Location:** New Delhi, India
- **Accent color:** `#C6FF3D` (lime green)
- **Background:** `#0a0a0a` (near-black)
- **Fonts:** Inter Tight (sans), Instrument Serif (display italic), JetBrains Mono (mono)

## Contact

- Email: `arnavm.396@gmail.com`
- GitHub: `https://github.com/arnavvmehtaa718`
- LinkedIn: `https://www.linkedin.com/in/arnav-mehta-137583329/`
- Phone: `7834973362`

## License

This is a personal portfolio. Third-party assets (logos, icons, fonts) remain the property of their respective owners. No licence is granted for reuse of personal content, imagery, or résumé.
