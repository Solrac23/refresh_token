import type { FastifyTypedInstance } from "@/fastify-typed-instance";
import { authenticate } from "@/middlewares/authenticate";
import { checkPermissions } from "@/middlewares/check-permissions";
import { errorResponseSchema } from "@/schemas/error.schema";
import { courseResponseSchema } from "@schemas/course.schema";

export async function courseRoutes(app: FastifyTypedInstance) {
  app.get(
    "/courses",
    {
      onRequest: [authenticate, checkPermissions(["list_courses"])],
      schema: {
        tags: ["courses"],
        description: "Get all courses",
        response: {
          200: courseResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return reply.send([
        { id: 1, name: "Course 1" },
        { id: 2, name: "Course 2" },
        { id: 3, name: "Course 3" },
      ]);
    },
  );
}
