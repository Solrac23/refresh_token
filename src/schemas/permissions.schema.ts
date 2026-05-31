import * as z from "zod/mini";

export const createPermissionRequestSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
});

export const createPermissionResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});
