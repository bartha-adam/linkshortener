import { desc, eq } from "drizzle-orm";
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