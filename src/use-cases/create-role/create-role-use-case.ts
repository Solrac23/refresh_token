import { prisma } from "@/database/lib/prisma";
import type { CreateRoleDTO } from "./create-role-dto";

export class CreateRoleUseCase {
  constructor() {}

  public async execute({
    name,
    description,
  }: CreateRoleDTO): Promise<CreateRoleDTO> {
    const roleAlreadyExists = await prisma.roles.findFirst({ where: { name } });

    if (roleAlreadyExists) throw new Error("Role already exists");

    const role = await prisma.roles.create({
      data: { name, description },
      select: { id: true, name: true, description: true },
    });

    return role;
  }
}
