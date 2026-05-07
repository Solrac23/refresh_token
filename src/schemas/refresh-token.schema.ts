import * as z from "zod/mini";

export const refreshTokenRequestSchema = z.object({
	refresh_token: z.string().check(z.uuid()),
});
