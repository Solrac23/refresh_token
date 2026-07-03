import type { IRefreshTokenRepository } from "@/repositories/refresh-token-repository";
import dayjs from "dayjs";
import { createHash, randomBytes } from "node:crypto";

export class GenerateRefreshTokenProvider {
  constructor(private refreshTokenRepository: IRefreshTokenRepository) {}

  public async execute(userId: string) {
    if (!userId) throw new Error("Invalid credentials");

    const rawToken: string = randomBytes(32).toString("hex");
    const tokenHash: string = createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expiresIn = dayjs().add(15, "hours").unix();

    await this.refreshTokenRepository.deleteByUserId(userId);

    await this.refreshTokenRepository.create(userId, tokenHash, expiresIn);

    return rawToken;
  }
}
