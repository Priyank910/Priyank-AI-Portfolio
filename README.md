# Priyank Chavda — portfolio

A responsive React + Vite portfolio with an editorial visual system, individual project stories, a printable résumé, an optional Gemini portfolio assistant, and an Express contact API.

## Run locally

Use Node.js 22.13 or later.

```bash
npm ci
npm run dev:client
```

The frontend runs on `http://localhost:5173`. In a second terminal, run the API:

```bash
npm run dev:server
```

Vite proxies `/api` to `http://127.0.0.1:8080`. Without email or Gemini credentials, those features show recoverable errors and preserve the direct email and résumé paths.

To enable external services, copy `.env.example` to `.env` and supply the existing service credentials. Keep `VITE_API_URL` empty for local development with the Vite proxy. Set it to the API origin for a separately hosted production backend. The portfolio assistant uses Gemini, not Isoliq Inno.

## Build and check

```bash
npm run lint
npm run format:check
npm run build
npm run build:server
npm run preview
```

`npm run build` regenerates the printable résumé and sitemap from the shared content, then builds the frontend into `dist`. Run `npm run build:server` after the frontend build if deploying both outputs together; Vite clears `dist` when building. `npm start` starts the bundled Express API.

```bash
npx playwright install chromium
npm run test:e2e
```

The browser suite tests desktop and mobile navigation, project evidence, filters, résumé access, dialog keyboard behavior, contact/assistant success and failure contracts, overflow, and automated WCAG A/AA checks. Contact/AI success tests use explicit network fixtures and never send email or call a model. For an environment with system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`.

## Content and assets

- `src/data/portfolioContext.json` is the shared source for project content, API context, sitemap, and résumé.
- `src/client/portfolio/` contains the layout, pages, dialogs and forms.
- `src/index.css` contains the responsive design tokens and styles.
- `public/images/` contains generated editorial artwork and captured real project screenshots, optimized as WebP.
- `scripts/generate-resume.js` generates `public/resume.html` and the sitemap.
- `public/priyank-chavda-resume.pdf` is the current one-page export. After changing résumé content, open `/resume.html`, use Print / Save as PDF, and replace the PDF.

Isoliq Inno 1 is presented as a small educational research project, with repository evidence and limitations. Its code builds on Andrej Karpathy’s nanoGPT. Daily Ledger's name and first-user story come from Priyank; add its links and technical details to the shared data when available. Existing projects are retained, with technology descriptions corrected against their available repositories.

## Hosting

The frontend is ready for static hosting with SPA route fallback. The existing `vercel.json` routes frontend paths to `index.html`; real static assets are served normally. Configure the production `VITE_API_URL` before the frontend build. Deploy the updated backend as well so the assistant receives the new project context. No production deployment or remote environment changes are performed by local builds.

Fonts are self-hosted through Fontsource; no third-party font requests are needed. Artwork is decorative; project media uses real interface captures. Motion respects reduced-motion preferences. Native dialogs provide focus containment and keyboard dismissal.
