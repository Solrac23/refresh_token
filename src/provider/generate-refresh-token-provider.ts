import { prisma } from "@/database/lib/prisma";
import dayjs from "dayjs";

export class GenerateRefreshTokenProvider {
  public async execute(userId: string) {
    if (!userId) throw new Error("Credenciais invalidas");

    const expiresIn = dayjs().add(15, "hours").unix();

    const generateToken = await prisma.refreshToken.create({
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

    return generateToken;
  }
}
