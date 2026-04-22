import { authenticateUser } from "@/useCases/authenticateUser";
import { createUserController } from "@useCases/createUser";
import type { FastifyInstance } from "fastify";
import { authenticate } from "./meddlewares/authenticate";
import { refreshTokenController } from "./useCases/refreshTokenUser";

export async function routes(app: FastifyInstance) {
	const authController = authenticateUser(app);
	const refreshTokenUserController = refreshTokenController(app);

	app.post("/users", async (request, reply) => {
		return await createUserController.handle(request, reply);
	});

	app.post("/login", async (request, reply) => {
		return await authController.handle(request, reply);
	});

	app.post("/refresh-token", async (request, reply) => {
		return await refreshTokenUserController.handle(request, reply);
	});

	app.get("/courses", { onRequest: authenticate }, async (request, reply) => {
		return reply.send([
			{ id: 1, name: "Course 1" },
			{ id: 2, name: "Course 2" },
			{ id: 3, name: "Course 3" },
		]);
	});
}
