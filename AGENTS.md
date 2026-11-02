<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## High-signal repo facts

- Next.js 16.4.3 (breaking changes from standard docs). Read `node_modules/next/dist/docs/` before editing APIs/file structure.
- `tsx: false` in `components.json`: all UI components use `.jsx`. App pages use `.jsx` too (`Login/page.jsx`, `Create-event/page.jsx`, etc.); only `layout.js` and `app/page.js` are `.js`.
- Tailwind v4 (`tailwindcss` ^4) with `@tailwindcss/turbopack`. CSS entry is `src/app/globals.css` (imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`).
- Path alias: `@/*` → `src/*` (`jsconfig.json`). `next.config.mjs` adds `turbopack.resolveAlias` mapping `@/lib/auth` → `./src/lib/auth.js`.
- Experimental flags in `next.config.mjs`: `agentFeedback`, `reactCompiler: true`, `cacheComponents: false`, `partialPrefetching: false`, `turbopack` with `*.css` loader rule.
- `eslint.config.mjs` uses `eslint-config-next/core-web-vitals`; ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.
- Env vars required (no `.env` file present): `MONGODB_URL` (MongoDB adapter for auth) and `BETTER_AUTH_URL` (client auth base URL). `src/lib/auth.js` creates a MongoDB client with `new MongoClient(process.env.MONGODB_URL)`.
- Auth: `better-auth` + MongoDB adapter (`src/lib/auth.js`). Auth handler at `src/app/api/auth/[...all]/route.js`. Client exports `authClient` and `createAuthClient()` from `src/lib/auth-client.js` — note the second bare `createAuthClient()` call is missing `baseURL` (potential bug).
- Font mismatch: `layout.js` imports `Lora` but assigns it to `--font-geist-sans`; CSS variables use `--font-geist-sans` / `--font-geist-mono`.
- Several `.jsx` pages (`My-events`, `Create-event`) fetch from hardcoded `http://localhost:5000` (expect a separate backend server running on port 5000). `mockEvents.js` provides mock event data.
- Component ownership: `src/components/ui/` = shadcn-style `.jsx` components; `src/components/` = page sections (`BannerSection.jsx`, `Navbar.jsx`, etc.); `src/app/*/page.jsx` = route pages.
- No test scripts or test directory present. Only `lint` script (`eslint`).
