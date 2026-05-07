import type { RefreshToken } from "@/database/generated/prisma/client";

export interface IRefreshTokenRepository {
	findRefreshTokenById(id: string): Promise<RefreshToken | null>;
	deleteRefreshTokenById(id: string): Promise<RefreshToken | null>;
}
