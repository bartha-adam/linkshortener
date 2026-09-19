import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  BarChart3,
  Check,
  Copy,
  Link2,
  MousePointerClick,
  QrCode,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Link2,
    title: "Branded links",
    description: "Turn long, forgettable URLs into clean links people trust and remember.",
  },
  {
    icon: BarChart3,
    title: "Clear analytics",
    description: "See every click, referrer, and location in one focused view.",
  },
  {
    icon: QrCode,
    title: "Instant QR codes",
    description: "Give every link a scannable companion for print, events, and packaging.",
  },
];

export default async function Home() {
  const { isAuthenticated } = await auth();
  if (isAuthenticated) redirect("/dashboard");

  return (
    <main className="flex-1 overflow-hidden bg-background">
      <section className="relative border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:3rem_3rem]"
        />
        <div className="mx-auto grid min-h-[42rem] max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">
              <Sparkles className="size-3.5 text-amber-500" />
              Links with a little more intention
            </div>
            <p className="mb-5 text-sm font-semibold tracking-[0.18em] text-emerald-600 uppercase dark:text-emerald-400">
              Linkline
            </p>
            <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Short links. Long reach.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Create polished links, share them anywhere, and understand what happens after the click.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto">
                  Start shortening
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign in
                </Button>
              </SignInButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-emerald-500" /> No credit card</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-emerald-500" /> Ready in seconds</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 bg-emerald-500/10 blur-3xl" aria-hidden="true" />
            <div className="border border-border bg-card p-5 shadow-2xl shadow-black/10 sm:p-6">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="flex size-7 items-center justify-center bg-foreground text-background">
                    <Link2 className="size-4" />
                  </span>
                  Linkline
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">Active</span>
              </div>
              <p className="text-sm text-muted-foreground">Your newest link</p>
              <div className="mt-3 border border-border bg-background p-4">
                <p className="truncate text-sm text-muted-foreground">https://newsletter.example.com/issues/launch</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="font-mono text-lg font-semibold text-emerald-600 dark:text-emerald-400">lnk.li/launch</p>
                  <button type="button" aria-label="Copy short link" className="text-muted-foreground transition-colors hover:text-foreground">
                    <Copy className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="border border-border p-4">
                  <p className="text-xs text-muted-foreground">Total clicks</p>
                  <p className="mt-1 text-2xl font-semibold">1,284</p>
                  <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">+18.4% this week</p>
                </div>
              </div>
              <div className="mt-5 flex items-end gap-2 border-t border-border pt-5" aria-hidden="true">
                {[35, 58, 45, 78, 60, 92, 75, 100, 84, 95].map((height, index) => (
                  <span key={index} className="flex-1 bg-emerald-500/70" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600 uppercase dark:text-emerald-400">Built for the follow-through</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Every link, ready for its next job.</h2>
          <p className="text-lg leading-8 text-muted-foreground">The essentials for sharing, measuring, and managing the URLs that matter to your work.</p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="bg-background p-6">
                <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="mt-8 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-muted/50">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 px-6 py-16 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600 uppercase dark:text-emerald-400">Make the next click count</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">A better link starts here.</h2>
          </div>
          <SignUpButton mode="modal">
            <Button size="lg">
              Create your first link
              <MousePointerClick data-icon="inline-end" />
            </Button>
          </SignUpButton>
        </div>
      </section>
    </main>
  );
}
