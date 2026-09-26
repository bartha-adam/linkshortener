import { config } from 'dotenv';
config({ path: '.env.local' });

const USER_ID = 'user_3JYuQ3pcOHdTo7tQsWZD094ifzi';

const examples = [
  { shortCode: 'gh-copilot', url: 'https://github.com/features/copilot' },
  { shortCode: 'vscode', url: 'https://code.visualstudio.com' },
  { shortCode: 'nextjs', url: 'https://nextjs.org' },
  { shortCode: 'clerk-dev', url: 'https://clerk.com' },
  { shortCode: 'drizzle-orm', url: 'https://orm.drizzle.team' },
  { shortCode: 'neon-db', url: 'https://neon.tech' },
  { shortCode: 'tailwind', url: 'https://tailwindcss.com' },
  { shortCode: 'shadcn-ui', url: 'https://ui.shadcn.com' },
  { shortCode: 'mdn-js', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { shortCode: 'ts-lang', url: 'https://www.typescriptlang.org' },
];

async function main() {
  const { default: db } = await import('@/db');
  const { links } = await import('@/db/schema');
  const rows = examples.map((e) => ({ ...e, userId: USER_ID }));
  const inserted = await db.insert(links).values(rows).returning();
  console.log(`Inserted ${inserted.length} links for user ${USER_ID}`);
  console.table(inserted);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
