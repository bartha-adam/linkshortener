"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createLinkForUser } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url(),
  shortCode: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9-]+$/, "Only letters, numbers, and hyphens are allowed")
    .optional()
    .or(z.literal("")),
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

  try {
    const data = await createLinkForUser(userId, {
      url: parsed.data.url,
      shortCode: parsed.data.shortCode || undefined,
    });
    revalidatePath("/dashboard");
    return { success: true, data };
  } catch {
    return { success: false, error: "That short code is already taken." };
  }
}
