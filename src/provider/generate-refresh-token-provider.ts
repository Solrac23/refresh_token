import type { IRefreshTokenRepository } from "@/repositories/refresh-token-repository";
import dayjs from "dayjs";

export class GenerateRefreshTokenProvider {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  public async execute(userId: string) {
    if (!userId) throw new Error("Credenciais invalidas");

    const expiresIn = dayjs().add(15, "hours").unix();

    const generateToken = await this.refreshTokenRepository.create(
      userId,
      expiresIn,
    );

    return generateToken;
  }
}
