---
description: read this before implementing or modifying data mutations/server actions in the app
applyTo: **/actions.ts
---
# Server Actions

All data mutations (create/update/delete) **must** go through Server Actions. Never mutate data from a Server Component, a route handler, or directly from the client.

## File location & naming

- Server action files **must** be named `actions.ts` and colocated in the same directory as the component that calls them.
- One `actions.ts` per feature directory — don't centralize all actions in a single top-level file.
- Mark the file with `"use server"` at the top.

## Calling convention

- Server Actions **must** only be called from Client Components (e.g. on form submit, button click). Never call a Server Action from a Server Component.
- Pass explicit, typed arguments to the action — **never** type a parameter as `FormData`. Define a TypeScript type/interface for the input and pass plain values:

```tsx
// app/dashboard/actions.ts
"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createLinkForUser } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(3).max(30),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;
type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

export async function createLink(
  input: CreateLinkInput
): Promise<ActionResult<Awaited<ReturnType<typeof createLinkForUser>>>> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.message };

  const data = await createLinkForUser(userId, parsed.data);
  return { success: true, data };
}
```

```tsx
// app/dashboard/link-form.tsx
"use client";

import { createLink } from "./actions";

async function handleSubmit(url: string, slug: string) {
  await createLink({ url, slug });
}
```

## Required order of operations in every action

1. **Auth check first** — call `await auth()` from `@clerk/nextjs/server` and bail out if there's no signed-in user, before any validation or database work.
2. **Validate with zod** — use `safeParse` (not `parse`) so validation failures don't throw. Never trust raw input.
3. **Call a data helper** — perform the actual mutation through a helper function.

## Never throw — always return a result object

Server actions **must not** throw errors (including letting zod's `parse`/Drizzle exceptions propagate). Wrap every failure path — auth, validation, and data-helper errors (e.g. via try/catch) — and return a discriminated result object instead:

```typescript
type ActionResult<T> = { success: true; data: T } | { success: false; error: string };
```

Callers in Client Components should check `result.success` rather than wrapping the call in `try/catch`.

## Database access

- Server actions **must never** call Drizzle directly (`db.insert`, `db.update`, `db.delete`, etc.).
- All database operations go through helper functions in the `/data` directory, the same helpers used for data fetching. Add mutation helpers there (e.g. `data/links.ts`) alongside existing query helpers, using Drizzle ORM internally.

## Checklist

- [ ] Mutation logic lives in a Server Action — never in a Server Component, route handler, or client-side code
- [ ] File is named `actions.ts`, colocated with the calling component, starts with `"use server"`
- [ ] One `actions.ts` per feature directory (not a single global file)
- [ ] Action is only called from a Client Component
- [ ] Input is a typed parameter (interface/type) — never `FormData`
- [ ] `await auth()` is called first; returns `{ success: false, error }` if no user
- [ ] Input is validated with a zod schema using `safeParse` (not `parse`)
- [ ] All failure paths (auth, validation, data-helper/DB errors) return `{ success: false, error }` instead of throwing
- [ ] Success path returns `{ success: true, data }`
- [ ] Actual mutation goes through a `/data` helper function, not direct Drizzle calls (`db.insert`/`update`/`delete`) in the action
- [ ] New mutation helpers added to `/data` (e.g. `data/links.ts`) use Drizzle internally
