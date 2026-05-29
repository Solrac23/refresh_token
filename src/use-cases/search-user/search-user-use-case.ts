import { prisma } from "@/database/lib/prisma";
import type { SearchUserDTO } from "./search-user-dto";

export class SearchUserUseCase {
  public async execute(id: string): Promise<SearchUserDTO> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user || user === null) {
      throw new Error("User not found");
    }

    return user;
  }
}
