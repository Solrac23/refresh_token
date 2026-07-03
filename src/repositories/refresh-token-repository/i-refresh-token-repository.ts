import type { RefreshToken } from "@/database/generated/prisma/client";

export interface IRefreshTokenRepository {
  findRefreshTokenByHash(tokenHash: string): Promise<RefreshToken | null>;
  deleteByUserId(userId: string): Promise<void>;
  create(userId: string, tokenHash: string, expiresIn: number): Promise<void>;
}
