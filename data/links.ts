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

export async function createLinkForUser(
  userId: string,
  input: { url: string; shortCode: string }
) {
  const [created] = await db
    .insert(links)
    .values({ userId, url: input.url, shortCode: input.shortCode })
    .returning();
  return created;
}