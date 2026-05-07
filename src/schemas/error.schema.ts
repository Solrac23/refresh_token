import * as z from "zod/mini";

export const errorResponseSchema = z.object({
	error: z.string(),
});
