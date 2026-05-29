import * as z from "zod/mini";

export const authRequestSchema = z.object({
  email: z.optional(z.email()),
  username: z.optional(z.string()),
  password: z.string().check(z.minLength(6)),
});

export const authResponseSchema = z.object({
	token: z.jwt({ alg: "HS384" }),
	refreshToken: z.optional(
		z.object({
			id: z.string(),
			expiresIn: z.number(),
			userId: z.string(),
		})
	),
});
