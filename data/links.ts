import { and, desc, eq, sql } from "drizzle-orm";
import db from "@/db";
import { links } from "@/db/schema";

export function getLinksForUser(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

function generateShortCode() {
  return Math.random().toString(36).slice(2, 8);
}

export async function createLinkForUser(
  userId: string,
  input: { url: string; shortCode?: string }
) {
  if (input.shortCode) {
    const [created] = await db
      .insert(links)
      .values({ userId, url: input.url, shortCode: input.shortCode })
      .returning();
    return created;
  }

  // No short code supplied: generate one, retrying on the rare collision.
  const maxAttempts = 5;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const [created] = await db
        .insert(links)
        .values({ userId, url: input.url, shortCode: generateShortCode() })
        .returning();
      return created;
    } catch (err) {
      if (attempt === maxAttempts - 1) throw err;
    }
  }
  throw new Error("Failed to generate a unique short code");
}

export async function updateLinkForUser(
  userId: string,
  linkId: number,
  input: { url: string }
) {
  const [updated] = await db
    .update(links)
    .set({ url: input.url })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();
  return updated;
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db.select().from(links).where(eq(links.shortCode, shortCode));
  return link;
}

export async function incrementLinkClicks(linkId: number) {
  await db
    .update(links)
    .set({ clicks: sql`${links.clicks} + 1` })
    .where(eq(links.id, linkId));
}

export async function deleteLinkForUser(userId: string, linkId: number) {
  const [deleted] = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();
  return deleted;
}