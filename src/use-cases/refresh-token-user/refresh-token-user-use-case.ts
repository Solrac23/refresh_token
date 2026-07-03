import type { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";
import type { JwtProvider } from "@/provider/jwt/jwt-provider";
import type { IRefreshTokenRepository } from "@/repositories/refresh-token-repository/i-refresh-token-repository";
import type { IUserRepository } from "@/repositories/user-repository/i-user-repository";
import dayjs from "dayjs";
import { createHash } from "node:crypto";

export class RefreshTokenUserUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly generateRefreshToken: GenerateRefreshTokenProvider,
    private readonly userRepository: IUserRepository,
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  public async execute(rawToken: string) {
    const tokenHash = createHash("sha256").update(rawToken).digest("hex");

    const storedToken =
      await this.refreshTokenRepository.findRefreshTokenByHash(tokenHash);

    if (!storedToken) throw new Error("Refresh token not found");

    const isExpired = dayjs().isAfter(dayjs.unix(storedToken?.expiresIn));

    if (isExpired) {
      await this.refreshTokenRepository.deleteByUserId(storedToken.userId);

      throw new Error("Refresh token expired. Please log in again.");
    }

    const user = await this.userRepository.findUserById(storedToken.userId);
    if (!user) throw new Error("Refresh token not found");

    const acessToken = await this.jwtProvider.signToken({
      id: storedToken.userId,
      username: user.username,
      email: user.email,
    });

    const newRefreshToken = await this.generateRefreshToken.execute(user.id);

    return { acessToken, refreshToken: newRefreshToken };
  }
}
