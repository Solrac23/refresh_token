import { prisma } from "@/database/lib/prisma";
import type { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";
import type { JwtProvider } from "@/provider/jwt/jwt-provider";
import type { IRefreshTokenRepository } from "@/repositories/refresh-token-repository/i-refresh-token-repository";
import type { IUserRepository } from "@/repositories/user-repository/i-user-repository";
import dayjs from "dayjs";

export class RefreshTokenUserUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly generateRefreshToken: GenerateRefreshTokenProvider,
    private readonly userRepository: IUserRepository,
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async execute(refresh_token: string) {
    const refreshTokenExist =
      await this.refreshTokenRepository.findRefreshTokenById(refresh_token);

    if (!refreshTokenExist) throw new Error("Refresh token not found");

    const user = await this.userRepository.findUserById(
      refreshTokenExist.userId,
    );

    if (!user) throw new Error("Refresh token not found");

    const token = await this.jwtProvider.signToken({
      id: refreshTokenExist.userId,
      username: user.username,
      email: user.email,
    });

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshTokenExist?.expiresIn),
    );

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshTokenExist.userId,
        },
      });

      const newRefreshToken = await this.generateRefreshToken.execute(
        refreshTokenExist.userId,
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}
