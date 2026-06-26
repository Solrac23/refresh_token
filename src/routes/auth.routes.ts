import type { FastifyTypedInstance } from "@/fastify-typed-instance";
import { authRequestSchema, authResponseSchema } from "@schemas/auth.schema";
import { errorResponseSchema } from "@schemas/error.schema";
import { refreshTokenRequestSchema } from "@schemas/refresh-token.schema";
import { authenticateUser } from "@useCases/authenticate-user";
import { refreshTokenController } from "@useCases/refresh-token-user";

export async function authRoutes(app: FastifyTypedInstance) {
  const authController = authenticateUser(app);
  const refreshTokenUserController = refreshTokenController(app);

  app.post(
    "/login",
    {
      schema: {
        tags: ["auth"],
        description: "Login",
        body: authRequestSchema,
        response: {
          200: authResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await authController.handle(request, reply);
    },
  );

  app.post(
    "/refresh-token",
    {
      schema: {
        tags: ["auth"],
        description: "Refresh token",
        body: refreshTokenRequestSchema,
        response: {
          200: authResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await refreshTokenUserController.handle(request, reply);
    },
  );
}
