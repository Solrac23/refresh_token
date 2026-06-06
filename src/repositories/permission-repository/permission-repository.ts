import type { Permissions } from "@/database/generated/prisma/client";
import { prisma } from "@/database/lib/prisma";
import type { IPermissionRepository } from "./i-permission-repository";

export class PermissionRepository implements IPermissionRepository {
  public async findByName(name: string): Promise<Permissions | null> {
    return await prisma.permissions.findFirst({
      where: { name },
    });
  }

  public async findByIds(ids: string[]): Promise<Pick<Permissions, "id">[]> {
    return await prisma.permissions.findMany({
      where: {
        id: { in: ids },
      },
      select: { id: true },
    });
  }

  public async create(
    data: Pick<Permissions, "name" | "description">,
  ): Promise<Pick<Permissions, "id" | "name" | "description">> {
    return await prisma.permissions.create({
      data: { name: data.name, description: data.description },
      select: { id: true, name: true, description: true },
    });
  }
}
