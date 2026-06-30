import type { FastifyTypedInstance } from "@/fastify-typed-instance";
import { authenticate } from "@/middlewares/authenticate";
import { checkPermissions } from "@/middlewares/check-permissions";
import { checkRoles } from "@/middlewares/check-roles";
import { errorResponseSchema } from "@/schemas/error.schema";
import {
  createRolePermissionRequestSchema,
  createRolePermissionResponseSchema,
  createRoleRequestSchema,
  createRoleResponseSchema,
} from "@/schemas/roles.schema";
import { createRoleController } from "@/use-cases/create-role";
import { createRolePermissionController } from "@/use-cases/create-role-permission";

export async function rolesRoutes(app: FastifyTypedInstance) {
  app.post(
    "",
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

  app.post(
    "/:roleId/permissions",
    {
      onRequest: [
        authenticate,
        checkRoles(["admin", "super_admin"]),
        checkPermissions(["create_role"]),
      ],
      schema: {
        tags: ["roles"],
        description: "Create role permissions",
        body: createRolePermissionRequestSchema,
        response: {
          201: createRolePermissionResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await createRolePermissionController.handle(request, reply);
    },
  );
}
