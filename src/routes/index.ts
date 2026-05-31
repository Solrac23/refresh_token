import type { FastifyTypedInstance } from "../fastify-typed-instance";
import { authRoutes } from "./auth.routes";
import { courseRoutes } from "./course.routes";
import { permissionsRoutes } from "./permissions.routes";
import { rolesRoutes } from "./roles.routes";
import { userRoutes } from "./user.routes";

export async function routes(app: FastifyTypedInstance) {
  app.register(userRoutes, {
    prefix: "/users",
  });
  app.register(authRoutes, {
    prefix: "/auth",
  });
  app.register(rolesRoutes, {
    prefix: "/roles",
  });
  app.register(permissionsRoutes, {
    prefix: "/permissions",
  });
  app.register(courseRoutes);
}
