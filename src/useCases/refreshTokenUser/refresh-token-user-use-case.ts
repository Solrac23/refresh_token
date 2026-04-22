import { prisma } from "@/database/lib/prisma";
import type { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";
import type { JwtProvider } from "@/provider/jwt/jwt-provider";
import dayjs from "dayjs";

export class RefreshTokenUserUseCase {
	constructor(
		private readonly jwtProvider: JwtProvider,
		private readonly generateRefreshToken: GenerateRefreshTokenProvider
	) {}

	public async execute(refresh_token: string) {
		try {
			const refreshTokenExist = await prisma.refreshToken.findFirst({
				where: {
					id: refresh_token,
				},
			});

			const user = await prisma.user.findFirst({
				where: {
					id: refreshTokenExist?.userId,
				},
				select: {
					username: true,
					email: true,
				},
			});

			if (!refreshTokenExist || !user)
				throw new Error("Refresh token not found");

			const token = await this.jwtProvider.signToken({
				id: refreshTokenExist.id,
				username: user.username,
				email: user.email,
			});

			const refreshTokenExpired = dayjs().isAfter(
				dayjs.unix(refreshTokenExist?.expiresIn)
			);

			if (refreshTokenExpired) {
				await prisma.refreshToken.deleteMany({
					where: {
						userId: refreshTokenExist.userId,
					},
				});

				const newRefreshToken = await this.generateRefreshToken.execute(
					refreshTokenExist.userId
				);

				return { token, refreshToken: newRefreshToken };
			}

			return { token };
		} catch (err: unknown) {
			console.error((err as Error).message);
		}
	}
}
