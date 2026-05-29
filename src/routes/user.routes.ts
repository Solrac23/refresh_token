import type { FastifyTypedInstance } from "@/fastify-typed-instance";
import * as z from "zod/mini";
import { authenticate } from "@/middlewares/authenticate";
import { searchUserController } from "@/use-cases/search-user";
import { errorResponseSchema } from "@schemas/error.schema";
import {
  createUserRequestSchema,
  createUserResponseSchema,
  searchUserResponseSchema,
} from "@schemas/user.schema";
import { createUserController } from "@useCases/create-user";

export async function userRoutes(app: FastifyTypedInstance) {
  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: createUserRequestSchema,
        response: {
          201: createUserResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await createUserController.handle(request, reply);
    },
  );

  app.get(
    "/users/:id",
    {
      onRequest: authenticate,
      schema: {
        tags: ["users"],
        description: "Get a user by id",
        params: z.object({ id: z.string() }),
        response: {
          200: searchUserResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await searchUserController.handle(request, reply);
    },
  );
}
