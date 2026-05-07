import type { FastifyTypedInstance } from "../fastify-typed-instance";
import { authRoutes } from "./auth.routes";
import { courseRoutes } from "./course.routes";
import { userRoutes } from "./user.routes";

export async function routes(app: FastifyTypedInstance) {
	app.register(userRoutes);
	app.register(authRoutes);
	app.register(courseRoutes);
}
