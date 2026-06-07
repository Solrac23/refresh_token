import { RefreshTokenRepository } from "@/repositories/refresh-token-repository";
import dayjs from "dayjs";

export class GenerateRefreshTokenProvider {
  public async execute(userId: string) {
    if (!userId) throw new Error("Credenciais invalidas");

    const expiresIn = dayjs().add(15, "hours").unix();

    const refreshTokenRepository = new RefreshTokenRepository();
    const generateToken = await refreshTokenRepository.create(
      userId,
      expiresIn,
    );

    return generateToken;
  }
}
