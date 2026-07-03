import * as z from "zod/mini";

export const refreshTokenRequestSchema = z.object({
  refresh_token: z.string().check(z.minLength(64), z.maxLength(64)),
});
