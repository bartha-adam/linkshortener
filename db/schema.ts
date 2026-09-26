import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  // Clerk user id; no FK since Clerk users aren't stored in Postgres
  userId: text('user_id').notNull(),
  shortCode: text('short_code').notNull().unique(),
  url: text('url').notNull(),
  clicks: integer('clicks').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
