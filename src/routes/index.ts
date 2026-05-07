import * as z from "zod/mini";
import type { FastifyTypedInstance } from "../fastify-typed-instance";
import { authenticate } from "../meddlewares/authenticate";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";

export async function routes(app: FastifyTypedInstance) {
	app.register(userRoutes);
	app.register(authRoutes);
	app.get(
		"/courses",
		{
			onRequest: authenticate,
			schema: {
				tags: ["courses"],
				description: "Get all courses",
				response: {
					200: z.array(
						z.object({
							id: z.number(),
							name: z.string(),
						})
					),
					401: z.object({
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			return reply.send([
				{ id: 1, name: "Course 1" },
				{ id: 2, name: "Course 2" },
				{ id: 3, name: "Course 3" },
			]);
		}
	);
}
