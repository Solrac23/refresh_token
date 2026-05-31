import * as z from "zod/mini";

export const createUserRequestSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.email(),
  password: z.string().check(z.minLength(6)),
});

export const createUserACLRequestSchema = z.object({
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
});

export const createUserACLResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  createdAt: z.union([z.iso.datetime(), z.date()]),
  updatedAt: z.union([z.iso.datetime(), z.date()]),
  usersPermissions: z.array(
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
  usersRoles: z.array(
    z.object({
      role: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        createdAt: z.union([z.iso.datetime(), z.date()]),
        updatedAt: z.union([z.iso.datetime(), z.date()]),
      }),
    }),
  ),
});

export const createUserResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
  }),
});

export const searchUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  createdAt: z.union([z.iso.datetime(), z.date()]),
  updatedAt: z.union([z.iso.datetime(), z.date()]),
});
