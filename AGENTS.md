# Wanderlust

Travel landing page (single page at `src/app/page.tsx`) built with **Next.js 16.4.3 (App Router, `src/` layout)**, React 19, Tailwind CSS v4, and shadcn/ui. No tests, no CI, no env vars currently.

## Commands

- Dev: `npm run dev` (Turbopack, port 3000)
- Lint: `npm run lint` — ESLint 9 flat config in `eslint.config.mjs`; there is **no** `next lint`
- Typecheck: `npx tsc --noEmit` (strict mode, no dedicated script)
- Build: `npm run build`; run lint + typecheck before declaring work done

## Gotchas

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`, `babel-plugin-react-compiler` in deps). Don't add `useMemo`/`useCallback`/`memo`; follow the Rules of React strictly — violations cause build errors.
- **`cacheComponents: true`** — dynamic data (params, searchParams, request time) must be awaited inside `<Suspense>` boundaries; static-only pages won't get request-time data implicitly.
- **Tailwind v4, CSS-first config**: there is no `tailwind.config.*`. Theme tokens, dark variant (`@custom-variant dark`), colors live in `src/app/globals.css` via `@theme inline`. Tailwind compiled through Turbopack loader `@tailwindcss/turbopack` (see `turbopack.rules` in `next.config.ts`) — editing `next.config.ts` turbopack rules requires a dev-server restart.
- **shadcn is Base UI, not Radix**: components use the `base-nova` style, importing primitives as `@base-ui/react/button` (subpath imports) and `cn` from the `"cn"` package. Do not import `@radix-ui/react-*` or `@/lib/utils`. Add components with `npx shadcn@latest add <component>` (config in `components.json`; aliases resolve via `@/*` → `src/*`).
- Font: Josefin Sans loaded in `src/app/layout.tsx` via `next/font/google`; font tokens wired in `globals.css`.
- Brand assets for the page live in `public/images/` (Banner, CTA, illustrations).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
