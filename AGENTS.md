<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server on http://localhost:3000 (Turbopack)
- `npm run build` — `next build` (React Compiler enabled). This is the **real verification gate** (no tests exist); it passes on the current tree — run it after meaningful changes.
- `npm run start` — `next start` (production)
- `npm run lint` — `eslint` (config: `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals`). **Fails on a clean checkout**: ~8 pre-existing errors (`react-hooks/set-state-in-effect`, `@next/next/no-html-link-for-pages`) plus many `no-img-element` warnings. That is baseline — don't attribute it to your change, and don't mass-fix unrelated lint errors unasked.

There is NO test script and no test directory. Do not add test commands without agreeing on a test runner first.

## Stack & file conventions

- Next.js 16.4.3 + React 19.3.0, App Router. Pages live under `src/app/*/page.jsx`.
- Everything is `.js`/`.jsx` — `components.json` has `tsx: false`. A `tsconfig.json` exists but lists no TS sources (only `src/lib/auth.js`) and sets `strict: false`. Do not introduce TypeScript.
- Path alias `@/*` → `src/*` (`jsconfig.json`; `next.config.mjs` also maps `@/lib/auth` → `./src/lib/auth.js`).
- Tailwind v4 via `@tailwindcss/turbopack`. CSS entry: `src/app/globals.css` (imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`).
- `reactCompiler: true` in `next.config.mjs`; `babel-plugin-react-compiler` is a devDependency. `cacheComponents: false`, `partialPrefetching: false`.
- Component ownership: `src/components/ui/` = shadcn-style `.jsx`; `src/components/` = page sections; `src/app/*/page.jsx` = route pages. Only `layout.js` and `app/page.js` are `.js` at the app root.
- Route dirs use inconsistent casing — `/Create-event`, `/My-events`, `/Upcoming-Events`, `/JoinedEvents`, `/Login`, `/Register`. `Link href` and `router.push` must match exactly (prod URLs are case-sensitive).

## Auth (better-auth + MongoDB)

- Server: `src/lib/auth.js` creates `new MongoClient(process.env.MONGODB_URL)`, db name `Event`. Throws if `MONGODB_URL` is missing.
- Handler: `src/app/api/auth/[...all]/route.js` (`toNextJsHandler(auth)`, imports `../../../../lib/auth.js` relatively, not via `@/`).
- Client: `src/lib/auth-client.js` exports `authClient` (`createAuthClient({ baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL })`) plus `signIn`, `signUp`, `signOut`, `useSession`. There is only ONE `createAuthClient` call — do not add a second bare one missing `baseURL`.

## Backend API & environment

- Backend runs separately on `http://localhost:5000`. `.env` defines `NEXT_PUBLIC_API_URL=http://localhost:5000`.
- Most pages call `fetch(`${process.env.NEXT_PUBLIC_API_URL}/...`)`, but `src/app/JoinedEvents/page.jsx` and `src/app/Upcoming-Events/[id]/page.jsx` still hardcode `http://localhost:5000`. Prefer the env var when touching these files.
- `.env` contains real secrets (`BETTER_AUTH_SECRET`, `MONGODB_URL`) and is NOT committed (`.gitignore` excludes `.env*`). Client-side vars need the `NEXT_PUBLIC_` prefix. Do not commit new secrets without flagging it.

## Theme system (next-themes)

- `next-themes` is installed and configured via `src/components/ThemeProvider.jsx` (`defaultTheme: "dark"`, `storageKey: "theme"`, `attribute: "class"`, `enableSystem: false`).
- `layout.js` wraps `<Navbar />`, `<ProfileDropdown />`, `<main>`, and `<Footer />` in `ThemeProvider`. The `html` tag gets `scroll-smooth`; `body` gets `transition-colors duration-300`.
- `src/components/ThemeToggle.jsx` renders a Sun (light) / Moon (dark) icon button using lucide-react. It's placed inside `ProfileDropdown.jsx` (after the user info divider).
- Default theme is **Dark** — existing purple/pink/orange gradient design is preserved as `dark:` variants.
- Light mode uses white/light gray backgrounds, dark text (`text-gray-900`), and soft purple accents.
- All pages and reusable components have been updated with `dark:` variants for dark mode and light-mode base classes. Smooth `transition-colors duration-300` applied globally via `globals.css`.
- Theme persists in `localStorage` via `next-themes`; no flicker mitigation script beyond `defaultTheme="dark"` SSR.

## Gotchas

- Font naming is misleading: `layout.js` loads **Lora** (a serif) and applies it site-wide via `lora.className`, but registers it as CSS var `--font-geist-sans` and never applies `lora.variable` (so that var never reaches the page). `globals.css` sets `--font-mono: var(--font-geist-mono)`, which is defined nowhere — `font-mono` falls back. Don't assume Geist is loaded.
- `src/components/RecentEvents.jsx` is dead/broken: commented out of `src/app/page.js`, and it references `mockEvents` from the deleted `src/lib/mockEvents.js` (its import is also commented). Uncommenting it throws — restore a data source first.
- A stray git-tracked directory literally named `@/` sits at the repo root holding copies of `ui/button.jsx` and `ui/dialog.jsx`. Ignore it; the `@/*` alias resolves to `src/*`.
- The root `layout.js` imports `Footer` from `../components/Foder.jsx` — the file really is named `Foder.jsx` (typo). Do not "fix" the import unless you rename the file consistently.
- No CI workflows, no pre-commit hooks, no `opencode.json` instructions file exist in this repo.
