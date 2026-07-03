import type { RefreshToken } from "@/database/generated/prisma/client";
import { prisma } from "@/database/lib/prisma";
import type { IRefreshTokenRepository } from "./i-refresh-token-repository";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  public async findRefreshTokenByHash(
    tokenHash: string,
  ): Promise<RefreshToken | null> {
    return await prisma.refreshToken.findFirst({
      where: {
        tokenHash,
      },
    });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }

  public async create(
    userId: string,
    tokenHash: string,
    expiresIn: number,
  ): Promise<void> {
    await prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresIn,
      },
    });
  }
}
