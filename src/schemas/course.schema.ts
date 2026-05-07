import * as z from "zod/mini";

// export const courseRequestSchema = z.object({
// 	name: z.string().check(z.minLength(3)),
// });

export const courseResponseSchema = z.array(
	z.object({
		id: z.number(),
		name: z.string(),
	})
);
