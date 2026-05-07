import { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";
import { JwtProvider } from "@/provider/jwt/jwt-provider";
import { RefreshTokenRepository } from "@/repositories/refresh-token-repository";
import { UserRepository } from "@/repositories/user-repository";
import type { FastifyInstance } from "fastify";
import { RefreshTokenUserController } from "./refresh-token-user-controller";
import { RefreshTokenUserUseCase } from "./refresh-token-user-use-case";

export function refreshTokenController(app: FastifyInstance) {
	const refreshTokenUserUseCase = new RefreshTokenUserUseCase(
		new JwtProvider(app),
		new GenerateRefreshTokenProvider(),
		new UserRepository(),
		new RefreshTokenRepository()
	);
	const refreshTokenUserController = new RefreshTokenUserController(
		refreshTokenUserUseCase
	);

	return refreshTokenUserController;
}
