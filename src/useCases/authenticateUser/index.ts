import { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";
import { JwtProvider } from "@/provider/jwt/jwt-provider";
import type { FastifyInstance } from "fastify";
import { Encryption } from "../util/encryption";
import { AuthenticateUserController } from "./authenticate-user-controller";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

export function authenticateUser(app: FastifyInstance) {
	const authenticateUserUseCase = new AuthenticateUserUseCase(
		new Encryption(),
		new JwtProvider(app),
		new GenerateRefreshTokenProvider()
	);

	const authenticateUserController = new AuthenticateUserController(
		authenticateUserUseCase
	);

	return authenticateUserController;
}
