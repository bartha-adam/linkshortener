"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createLinkForUser, deleteLinkForUser, updateLinkForUser } from "@/data/links";

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

const updateLinkSchema = z.object({
  linkId: z.number(),
  url: z.string().url(),
});

type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLink(
  input: UpdateLinkInput
): Promise<ActionResult<Awaited<ReturnType<typeof updateLinkForUser>>>> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.message };

  try {
    const data = await updateLinkForUser(userId, parsed.data.linkId, { url: parsed.data.url });
    if (!data) return { success: false, error: "Link not found." };
    revalidatePath("/dashboard");
    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to update the link." };
  }
}

const deleteLinkSchema = z.object({
  linkId: z.number(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLink(
  input: DeleteLinkInput
): Promise<ActionResult<Awaited<ReturnType<typeof deleteLinkForUser>>>> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.message };

  try {
    const data = await deleteLinkForUser(userId, parsed.data.linkId);
    if (!data) return { success: false, error: "Link not found." };
    revalidatePath("/dashboard");
    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to delete the link." };
  }
}
