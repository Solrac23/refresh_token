import { prisma } from "@/database/lib/prisma";
import type {
  CreateRolePermissionDTO,
  CreateRolePermissionResponse,
} from "./create-role-permission-dto";

export class CreateRolePermissionUseCase {
  constructor() {}
  async execute({
    roleId,
    permissions,
  }: CreateRolePermissionDTO): Promise<CreateRolePermissionResponse> {
    const role = await prisma.roles.findFirst({
      where: { id: roleId },
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

    if (!role) {
      throw new Error("Role not found");
    }

    const perssionsList = await prisma.permissions.findMany({
      where: { id: { in: permissions } },
      select: { id: true },
    });

    await prisma.permissionsRoles.createMany({
      data: perssionsList.map((p) => ({
        roleId: role.id,
        permissionId: p.id,
      })),
      skipDuplicates: true,
    });

    return role;
  }
}
