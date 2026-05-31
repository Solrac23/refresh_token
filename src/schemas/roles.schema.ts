import * as z from "zod/mini";

export const createRoleRequestSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
});

export const createRolePermissionRequestSchema = z.object({
  permissions: z.array(z.string()),
});

export const createRoleResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const createRolePermissionResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.union([z.iso.datetime(), z.date()]),
  updatedAt: z.union([z.iso.datetime(), z.date()]),
  permissionsRoles: z.array(
    z.object({
      permission: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        createdAt: z.union([z.iso.datetime(), z.date()]),
        updatedAt: z.union([z.iso.datetime(), z.date()]),
      }),
    }),
  ),
});
