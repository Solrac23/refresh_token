import type { User } from "@/database/generated/prisma/client";
import { prisma } from "@/database/lib/prisma";
import type { IUserRepository } from "./i-user-repository";

export class UserRepository implements IUserRepository {
	async findUserById(userId: string): Promise<User | null> {
		return await prisma.user.findFirst({
			where: {
				id: userId,
			},
		});
	}
}
