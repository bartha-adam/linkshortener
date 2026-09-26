import { auth } from "@clerk/nextjs/server";
import { Link2, MousePointerClick } from "lucide-react";
import { getLinksForUser } from "@/data/links";
import { CreateLinkDialog } from "./create-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();
  const userLinks = userId ? await getLinksForUser(userId) : [];

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600 uppercase dark:text-emerald-400">Linkline</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Your links</h1>
            <p className="mt-3 text-muted-foreground">Manage the links you have shared and track their activity.</p>
          </div>
          <CreateLinkDialog />
        </header>

        {userLinks.length === 0 ? (
          <section className="border border-dashed border-border px-6 py-16 text-center">
            <Link2 className="mx-auto size-6 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">No links yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">Your shortened links will appear here.</p>
          </section>
        ) : (
          <section className="mt-8 overflow-hidden border border-border">
            <ul className="divide-y divide-border">
              {userLinks.map((link) => (
                <li key={link.id} className="grid gap-4 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">/{link.shortCode}</p>
                    <a href={link.url} className="mt-1 block truncate text-sm text-muted-foreground hover:text-foreground hover:underline">
                      {link.url}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground sm:justify-self-end">
                    <MousePointerClick className="size-4" />
                    <span>{link.clicks.toLocaleString()} clicks</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
