<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Instructions — Link Shortener

This is a Next.js 16 (App Router) link shortener using Clerk for auth, Drizzle ORM over Neon serverless Postgres, and Tailwind CSS v4 + shadcn/base-ui for UI.

Detailed, topic-specific coding standards live in [`docs/`](./docs/). **Read the relevant doc before working in that area** — this file only holds the rules that apply everywhere.

> [!IMPORTANT]
> It is **critical** that you ALWAYS read the relevant individual instructions file(s) in `/docs` **before generating any code**, not just before starting a task. This applies every time you touch a related area, even mid-task. Never rely on memory of a doc's contents from earlier in the conversation — re-read it if there's any doubt.

- Auth: [`docs/authentication.md`](./docs/authentication.md) — read before touching sign-in/sign-up flows, middleware/`proxy.ts` auth checks, session or user data access, Clerk components/hooks, or any protected route/API logic.
- UI components: [`docs/UI.md`](./docs/UI.md) — read before adding or editing any component in `components/`, any page markup/styling, or anything using Tailwind, shadcn, or base-ui.

## Always-on rules

- **Next.js 16 breaking changes are real.** Never assume a Next.js API/file convention from training data is still correct — verify against `node_modules/next/dist/docs/` first (e.g. `middleware.ts` no longer exists; it's `proxy.ts`).
- Use the `@/*` path alias for intra-project imports instead of relative paths.
- Don't introduce new styling systems, state managers, or UI libraries — extend what's already in `package.json`.
- Run `npm run lint` after changes that touch `.ts`/`.tsx` files and fix any reported issues.
- Never commit secrets; environment variables (`DATABASE_URL`, Clerk keys) belong in `.env.local`, which is git-ignored.
- Prefer editing an existing file over creating a new one; only add a new file when the project structure doc calls for it.
- If you introduce a new convention, update the matching file under `docs/` in the same change.
