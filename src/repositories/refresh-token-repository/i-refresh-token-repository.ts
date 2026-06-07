import type { RefreshToken } from "@/database/generated/prisma/client";

export interface IRefreshTokenRepository {
  findRefreshTokenById(id: string): Promise<RefreshToken | null>;
  deleteRefreshTokenById(id: string): Promise<RefreshToken | null>;
  deleteByUserId(userId: string): Promise<void>;
  create(
    userId: string,
    expiresIn: number,
  ): Promise<Pick<RefreshToken, "id" | "expiresIn" | "userId">>;
}
