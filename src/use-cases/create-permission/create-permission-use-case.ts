import { prisma } from "@/database/lib/prisma";
import type { CreatePermissionDTO } from "./create-permission-dto";

export class CreatePermissionUseCase {
  constructor() {}

  public async execute({
    name,
    description,
  }: CreatePermissionDTO): Promise<CreatePermissionDTO> {
    const permissionAlreadyExists = await prisma.permission.findFirst({
      where: { name },
    });

    if (permissionAlreadyExists) throw new Error("Permission already exists");

    const permission = await prisma.permission.create({
      data: { name, description },
      select: { id: true, name: true, description: true },
    });

    return permission;
  }
}
