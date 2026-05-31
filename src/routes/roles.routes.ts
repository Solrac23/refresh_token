import type { FastifyTypedInstance } from "@/fastify-typed-instance";
import { authenticate } from "@/middlewares/authenticate";
import { errorResponseSchema } from "@/schemas/error.schema";
import {
  createRoleRequestSchema,
  createRoleResponseSchema,
} from "@/schemas/roles.schema";
import { createRoleController } from "@/use-cases/create-role";

export async function rolesRoutes(app: FastifyTypedInstance) {
  app.post(
    "/",
    {
      onRequest: authenticate,
      schema: {
        tags: ["roles"],
        description: "Create a new role",
        body: createRoleRequestSchema,
        response: {
          201: createRoleResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await createRoleController.handle(request, reply);
    },
  );
}
