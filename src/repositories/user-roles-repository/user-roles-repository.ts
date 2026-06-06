import { prisma } from "@/database/lib/prisma";
import type { IUserRolesRepository } from "./i-user-roles-repository";

export class UserRolesRepository implements IUserRolesRepository {
	public async assignRoles(userId: string, roleIds: string[]): Promise<void> {
		await prisma.usersRoles.createMany({
			data: roleIds.map(roleId => ({
				userId,
				roleId,
			})),
			skipDuplicates: true,
		});
	}

	public async findRolesByUserId(userId: string): Promise<string[]> {
		const userRoles = await prisma.usersRoles.findMany({
			where: {
				userId,
			},
			select: {
				role: {
					select: {
						name: true,
					},
				},
			},
		});

		return userRoles.map(r => r.role.name);
	}
}
