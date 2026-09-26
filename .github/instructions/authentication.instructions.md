---
description: read this before implementing or modifying authentication in the app
---
# Auth (Clerk)

Clerk (`@clerk/nextjs`) is the **only** auth mechanism in this app. Never add NextAuth, custom session/cookie/JWT handling, or any other auth provider.

## Sign in / sign up are always modals

Never link to `/sign-in` or `/sign-up` as full pages. Every trigger must open Clerk's modal:

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

<SignInButton mode="modal" />
<SignUpButton mode="modal" />
```

The catch-all routes `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` must still exist — Clerk needs them as fallback destinations for flows it can't complete in-modal (OAuth redirects, password reset, etc.). Don't route users to them directly and don't delete them.

## `/dashboard` is protected

Enforce this in `proxy.ts` (Next.js 16's middleware file — see `node_modules/next/dist/docs/`), not with page-level checks:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
```

Add new protected routes to the `isProtectedRoute` matcher as they're created — don't gate them only in the page component.

## Signed-in users must skip the homepage

`app/page.tsx` is a Server Component: check auth server-side and redirect before rendering marketing content.

```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = await auth();
  if (isAuthenticated) redirect("/dashboard");
  // ...marketing content
}
```

## General rules

- Server Components/routes: `await auth()` from `@clerk/nextjs/server`. Client Components: `useAuth()` / `useUser()` from `@clerk/nextjs`. Never mix the two.
- Use `isAuthenticated` (not `!!userId`) to check sign-in state — this SDK is Core 3 (`@clerk/nextjs` ^7).
- For conditional UI based on auth/role/plan/permission, use `<Show when="signed-in">` (see `clerk-custom-ui` skill), not `<SignedIn>`/`<SignedOut>`/`<Protect>` (Core 2 API).
- Keep `ClerkProvider` (with the `shadcn` appearance theme) wrapping the app in `app/layout.tsx`.
