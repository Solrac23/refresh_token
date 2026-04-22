import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";

export const jwtPlugin = fp(async (app: FastifyInstance) => {
	app.register(jwt, {
		secret: process.env.JWT_SECRET as string,
		sign: { algorithm: "HS384", expiresIn: process.env.JWT_EXPIRES },
	});
});
