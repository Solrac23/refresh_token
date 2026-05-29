import * as z from "zod/mini";

export const createUserRequestSchema = z.object({
	name: z.string(),
	username: z.string(),
	email: z.email(),
	password: z.string().check(z.minLength(6)),
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
