import type { FastifyTypedInstance } from "@/fastify-typed-instance";
import { errorResponseSchema } from "@schemas/error.schema";
import {
	createUserRequestSchema,
	createUserResponseSchema,
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
		}
	);
}
