import { prisma } from "@/database/lib/prisma";
import type { IUserPermissionsRepository } from "./i-user-permissions-repository";

export class UserPermissionsRepository implements IUserPermissionsRepository {
  public async assignPermissions(
    userId: string,
    permissionIds: string[],
  ): Promise<void> {
    await prisma.usersPermissions.createMany({
      data: permissionIds.map((permissionId) => ({
        userId,
        permissionId,
      })),
      skipDuplicates: true,
    });
  }

  public async findPermissionsByUserId(userId: string): Promise<string[]> {
    const userPermissions = await prisma.usersPermissions.findMany({
      where: {
        userId,
      },
      select: {
        permission: {
          select: {
            name: true,
          },
        },
      },
    });

    return userPermissions.map((p) => p.permission.name);
  }
}
