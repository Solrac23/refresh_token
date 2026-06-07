import { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";
import { JwtProvider } from "@/provider/jwt/jwt-provider";
import { RefreshTokenRepository } from "@/repositories/refresh-token-repository";
import { UserRepository } from "@/repositories/user-repository";
import type { FastifyInstance } from "fastify";
import { Encryption } from "../util/encryption";
import { AuthenticateUserController } from "./authenticate-user-controller";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

export function authenticateUser(app: FastifyInstance) {
	const authenticateUserUseCase = new AuthenticateUserUseCase(
		new Encryption(),
		new JwtProvider(app),
		new GenerateRefreshTokenProvider(),
		new UserRepository(),
		new RefreshTokenRepository()
	);

	const authenticateUserController = new AuthenticateUserController(
		authenticateUserUseCase
	);

	return authenticateUserController;
}
