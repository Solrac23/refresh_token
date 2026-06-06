import type { Roles } from "@/database/generated/prisma/client";
import { prisma } from "@/database/lib/prisma";
import type { IRoleRepository, RoleWithPermissions } from "./i-role-repository";

export class RoleRepository implements IRoleRepository {
  public async findByName(name: string): Promise<Roles | null> {
    return await prisma.roles.findFirst({
      where: { name },
    });
  }

  public async findByIds(ids: string[]): Promise<Pick<Roles, "id">[]> {
    return await prisma.roles.findMany({
      where: {
        id: { in: ids },
      },
      select: { id: true },
    });
  }

  public async findByIdWithPermissions(
    id: string,
  ): Promise<RoleWithPermissions | null> {
    return await prisma.roles.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        permissionsRoles: {
          select: {
            permission: true,
          },
        },
      },
    });
  }

  public async create(
    data: Pick<Roles, "name" | "description">,
  ): Promise<Pick<Roles, "id" | "name" | "description">> {
    return await prisma.roles.create({
      data: { name: data.name, description: data.description },
      select: { id: true, name: true, description: true },
    });
  }

  public async assignPermissions(
    roleId: string,
    permissionIds: string[],
  ): Promise<void> {
    await prisma.permissionsRoles.createMany({
      data: permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      })),
      skipDuplicates: true,
    });
  }
}
