<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — Turbopack dev server at http://localhost:3000
- `npm run build` — `next build` with React Compiler enabled; the real verification gate (no tests exist). Run it after meaningful changes.
- `npm run start` — production server
- `npm run lint` — eslint (`eslint.config.mjs`, extends `eslint-config-next/core-web-vitals`). Baseline on a clean checkout: 8 errors, 15 warnings. Don't attribute those to your change, and don't mass-fix unrelated errors unasked.
- No test script, no test directory. Do not add test commands without agreeing on a test runner first.

## Stack & file conventions

- Next.js 16.4.3 + React 19.3.0, App Router. Pages live under `src/app/*/page.jsx`. Everything is `.js`/`.jsx` — `components.json` has `tsx: false`, `tsconfig.json` lists no TS sources and sets `strict: false`. Do not introduce TypeScript.
- Path alias `@/*` → `src/*` (`jsconfig.json`); `next.config.mjs` also maps `@/lib/auth` → `./src/lib/auth.js`.
- Tailwind v4 via `@tailwindcss/turbopack`. CSS entry: `src/app/globals.css` (imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`).
- `reactCompiler: true`, `cacheComponents: false`, `partialPrefetching: false` in `next.config.mjs`.
- `src/components/ui/` = shadcn-style `.jsx`; `src/components/` = page sections; `src/hooks/` = small client hooks. Only `layout.js` and `app/page.js` are `.js` at the app root.
- Route dirs use inconsistent casing — `/Create-event`, `/My-events`, `/Upcoming-Events`, `/JoinedEvents`, `/Login`, `/Register`. `Link href` and `router.push` must match exactly (prod URLs are case-sensitive).

## Auth (better-auth + MongoDB)

- Server: `src/lib/auth.js` builds `betterAuth` with `@better-auth/mongo-adapter`, db name `Event`; throws if `MONGODB_URL`, `BETTER_AUTH_SECRET`, or `BETTER_AUTH_URL` are missing.
- Handler: `src/app/api/auth/[...all]/route.js` (`toNextJsHandler(auth)`), imports `../../../../lib/auth.js` relatively, not via `@/`.
- Client: `src/lib/auth-client.js` exports `authClient` (`createAuthClient()` with **no arguments** — no `baseURL`), plus `signIn`, `signUp`, `signOut`, `useSession`. `.env` does not define `NEXT_PUBLIC_BETTER_AUTH_URL`, and `BETTER_AUTH_URL` is server-only, so the client auth origin is unresolved. Don't add a second `createAuthClient` call assuming a baseURL will be supplied.

## Environment

- Backend runs separately on `http://localhost:5000`; `.env` defines `NEXT_PUBLIC_API_URL=http://localhost:5000`. Most pages fetch via that env var, but `src/app/JoinedEvents/page.jsx` and `src/app/Upcoming-Events/[id]/page.jsx` hardcode `http://localhost:5000` — prefer the env var when touching these files.
- `.env` contains real secrets (`BETTER_AUTH_SECRET`, `MONGODB_URL`, Google OAuth keys) and is NOT committed (`.gitignore` excludes `.env*`). `BETTER_AUTH_URL` currently points at a Vercel deployment (`https://event-a8.vercel.app`); for local auth, override it to `http://localhost:3000`. Client-side vars need the `NEXT_PUBLIC_` prefix. Do not commit new secrets without flagging it.

## Theme system (next-themes)

- `src/components/ThemeProvider.jsx` (`defaultTheme: "dark"`, `storageKey: "theme"`, `attribute: "class"`, `enableSystem: false`). `layout.js` wraps `Navbar`, `ProfileDropdown`, `<main>`, `Footer` in it; `html` gets `scroll-smooth`, `body` gets `transition-colors duration-300`.
- `ThemeToggle` renders in a fixed div in `layout.js` (`top-8 right-22`), **not** inside `ProfileDropdown` (its import/usage there are commented out).
- Default theme is dark — existing purple/pink/orange gradient design is preserved as `dark:` variants; light mode uses white/light gray backgrounds with `text-gray-900`. Theme persists in `localStorage`; no flicker mitigation beyond `defaultTheme="dark"` SSR.

## Gotchas

- `layout.js` imports `Footer` from `../components/Foder.jsx` — the file really is named `Foder.jsx` (typo). Do not "fix" the import unless you rename the file consistently.
- `src/components/RecentEvents.jsx` is live on the home page and fetches `${process.env.NEXT_PUBLIC_API_URL}/RecentEvents` — it is not dead and does not use `mockEvents`.
- `src/proxy.js` is an auth redirect proxy (no session → `/Login`) for `/My-events`, `/Create-event`, `/My-events/:path`, but it is not wired as Next.js middleware — no `middleware.js` exists.
- Font naming is misleading: `layout.js` loads **Lora** (serif) site-wide via `lora.className` but registers it as `--font-geist-sans` without applying `lora.variable`; `--font-geist-mono` is undefined. Don't assume Geist is loaded.
- A git-tracked directory literally named `@/` sits at the repo root holding copies of `ui/button.jsx` and `ui/dialog.jsx`. Ignore it; the `@/*` alias resolves to `src/*`.
- No CI workflows, no pre-commit hooks, no `opencode.json` instructions file exist in this repo.
