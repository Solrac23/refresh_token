import type { RefreshToken } from "@/database/generated/prisma/client";
import { prisma } from "@/database/lib/prisma";
import type { IRefreshTokenRepository } from "./i-refresh-token-repository";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  public async findRefreshTokenById(id: string): Promise<RefreshToken | null> {
    return await prisma.refreshToken.findFirst({
      where: {
        id,
      },
    });
  }

  public async deleteRefreshTokenById(
    id: string,
  ): Promise<RefreshToken | null> {
    return await prisma.refreshToken.delete({
      where: {
        id,
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
    expiresIn: number,
  ): Promise<Pick<RefreshToken, "id" | "expiresIn" | "userId">> {
    return await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
      select: {
        id: true,
        expiresIn: true,
        userId: true,
      },
    });
  }
}
