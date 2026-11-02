<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

- Read `node_modules/next/dist/docs/` before writing code; this is Next.js 16.4.3 (breaking changes from standard docs).
- `tsx: false` in `components.json`: UI components are `.jsx`, not `.tsx`.
- Experimental flags in `next.config.mjs`: `agentFeedback`, `reactCompiler`, `cacheComponents`, `partialPrefetching`, `turbopack` (with `*.css` loader rule).
- Tailwind v4 via `@tailwindcss/turbopack`; CSS imports in `src/app/globals.css` (`tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`).
- `eslint.config.mjs` uses `eslint-config-next/core-web-vitals`; ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.
- Path alias `@/*` → `src/*` (`jsconfig.json`).
- Font import in `layout.js` (`Lora`) does not match CSS variables (`--font-geist-sans` / `--font-geist-mono`).
