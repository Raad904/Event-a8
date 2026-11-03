<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## High-signal repo facts

- Next.js 16.4.3 + React 19.3.0. App Router; pages live under `src/app/*/page.jsx`.
- `tsx: false` in `components.json`: everything is `.js`/`.jsx`, no TypeScript. Path alias `@/*` → `src/*` (`jsconfig.json`).
- Tailwind v4 with `@tailwindcss/turbopack`. CSS entry is `src/app/globals.css` (imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`).
- `next.config.mjs`: `reactCompiler: true` (babel-plugin-react-compiler is a devDependency), `cacheComponents: false`, `partialPrefetching: false`, `turbopack` css loader rule, and `turbopack.resolveAlias` mapping `@/lib/auth` → `./src/lib/auth.js`.
- `eslint.config.mjs` uses `eslint-config-next/core-web-vitals`; ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.
- Scripts (`package.json`): `dev` (`next dev`), `build` (`next build`), `start` (`next start`), `lint` (`eslint`). There is NO test script and no test directory.
- `.env` is present locally with real secrets (`BETTER_AUTH_SECRET`, `NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000`, `MONGODB_URL`). It is NOT committed (`.gitignore` excludes .env*). Client-side env vars need the `NEXT_PUBLIC_` prefix. Do not commit new secrets without flagging it.
- Auth: `better-auth` + `@better-auth/mongo-adapter` (`src/lib/auth.js` creates `new MongoClient(process.env.MONGODB_URL)`, db name `Event`). Auth handler: `src/app/api/auth/[...all]/route.js`. Client: `src/lib/auth-client.js` exports `authClient` (with `baseURL`) and a second bare `createAuthClient()` call missing `baseURL` (likely bug).
- Frontend calls a separate backend on `http://localhost:5000`, hardcoded in `Create-event/page.jsx`, `My-events/page.jsx`, `My-events/[id]/page.jsx`, `Upcoming-Events/page.jsx`, and `components/EditEventDialog.jsx`. `src/lib/mockEvents.js` holds mock event data.
- Component ownership: `src/components/ui/` = shadcn-style `.jsx`; `src/components/` = page sections; `src/app/*/page.jsx` = route pages; only `layout.js` and `app/page.js` are `.js` at the app root.
- Font gotcha: `layout.js` imports `Lora` but assigns it to CSS var `--font-geist-sans`; CSS uses `--font-geist-sans` / `--font-geist-mono`.
