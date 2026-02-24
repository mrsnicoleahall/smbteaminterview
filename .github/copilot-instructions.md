Project: SMB Landing (React + Vite)

Purpose
- Help AI coding agents make targeted, safe changes to a small React single-page landing site.

Big picture
- Single-page React app built with Vite. Entry: [src/main.jsx](src/main.jsx). Top-level composition: [src/App.jsx](src/App.jsx) mounts a series of presentational sections (Hero, MetricsBar, WhyHomeServices, etc.).
- No client/server API in this repo — static front-end only. External integration points are simple outbound links in [src/components/NavBar.jsx](src/components/NavBar.jsx).

Key workflows
- Start dev server: `npm install` then `npm run dev` (uses `vite`).
- Build for production: `npm run build` then preview with `npm run preview`.
- Linting: `npm run lint` (ESLint config at project root).

Project conventions & patterns (do not invent new patterns)
- Files: React components use .jsx and default exports (e.g. `export default function NavBar(){}` in [src/components/NavBar.jsx](src/components/NavBar.jsx)).
- Scrolling & navigation: sections are anchored with DOM ids and scrolled with `element.scrollIntoView()`; see `sections` array in [src/components/NavBar.jsx](src/components/NavBar.jsx).
- View/visibility detection: the project uses an IntersectionObserver hook `useInView` in [src/hooks/useInView.js](src/hooks/useInView.js). It sets `inView` true and disconnects the observer on first intersect — use this hook for similar reveal animations.
- Component animation approach: inline `style` props with transitions are used (see `AnimatedSection` in [src/App.jsx](src/App.jsx)). Prefer reusing `useInView` instead of adding global animation libraries.
- Canvas animation: `Hero` contains a custom canvas animation (`AnimatedGrid`) and complex UI flows (diagnostic modal, TypeWriter, DiagnosticScan) in [src/components/Hero.jsx](src/components/Hero.jsx). Treat this file as stateful and centralized — small, incremental changes are safest.
- Accessibility: interactive elements often use `onClick` plus `href` anchors; when altering behavior preserve `rel="noopener noreferrer"` and `target="_blank"` for external links and keep `aria-label` on controls like the mobile hamburger.

Where to make common edits
- Text/content: [src/components/Hero.jsx](src/components/Hero.jsx) (hero lines, diagnostics), and other components in [src/components](src/components).
- Layout/CSS: [src/App.css](src/App.css) and [src/index.css](src/index.css).
- New assets: put images/other static files into [src/assets](src/assets) and reference via imports.

Search tips for code navigation
- Find visible-section ids: search for `id="` or the `sections` arrays in `NavBar.jsx`.
- Find animation hooks: search for `useInView` and `IntersectionObserver`.

Notes & constraints
- No unit tests or CI in this repo — changes should be verified by running `npm run dev` locally.
- Keep changes minimal and visual-first; many files are presentational. Avoid restructuring into routers or adding heavy runtime dependencies unless user asks.

If you change behavior in a component, run the dev server and visually verify on Chromium / Safari (macOS). Then run `npm run lint` to catch obvious style issues.

Questions for the owner
- Do you want accessibility (keyboard-focus) improvements in modals and menu controls?
- Should we add a test harness or visual regression checks for the hero canvas and modal flows?

If anything above is unclear or you want the file shortened/expanded, tell me which sections to adjust.
