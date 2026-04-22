import { RefreshTokenUserUseCase } from "./refresh-token-user-use-case";
import { RefreshTokenUserController } from "./refresh-token-user-controller";
import { JwtProvider } from "@/provider/jwt/jwt-provider";
import type { FastifyInstance } from "fastify";
import { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";

export function refreshTokenController(app: FastifyInstance) {
	const refreshTokenUserUseCase = new RefreshTokenUserUseCase(
		new JwtProvider(app),
		new GenerateRefreshTokenProvider()
	);
	const refreshTokenUserController = new RefreshTokenUserController(
		refreshTokenUserUseCase
	);

	return refreshTokenUserController;
}
