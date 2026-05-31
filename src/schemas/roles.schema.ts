import * as z from "zod/mini";

export const createRoleRequestSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
});

export const createRoleResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});
