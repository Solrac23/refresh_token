import type { FastifyTypedInstance } from "@/fastify-typed-instance";
import { authenticate } from "@/middlewares/authenticate";
import { errorResponseSchema } from "@/schemas/error.schema";
import {
  createPermissionRequestSchema,
  createPermissionResponseSchema,
} from "@/schemas/permissions.schema";
import { createPermissionController } from "@/use-cases/create-permission";

export async function permissionsRoutes(app: FastifyTypedInstance) {
  app.post(
    "",
    {
      onRequest: authenticate,
      schema: {
        tags: ["permissions"],
        description: "Create a new permission",
        body: createPermissionRequestSchema,
        response: {
          201: createPermissionResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await createPermissionController.handle(request, reply);
    },
  );
}
