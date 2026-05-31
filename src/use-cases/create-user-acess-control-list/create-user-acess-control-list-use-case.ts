import { prisma } from "@/database/lib/prisma";
import type { UserRepository } from "@/repositories/user-repository";
import type {
  CreateUserAcessControlListDTO,
  CreateUserAcessControlListResponseDTO,
} from "./create-user-acess-control-list-dto";

export class CreateUserAcessControlListUseCase {
  constructor(private repository: UserRepository) {}
  public async execute({
    userId,
    roles,
    permissions,
  }: CreateUserAcessControlListDTO): Promise<CreateUserAcessControlListResponseDTO> {
    const user = await this.repository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const permissionsList = await prisma.permissions.findMany({
      where: {
        id: {
          in: permissions,
        },
      },
      select: {
        id: true,
      },
    });

    const rolesList = await prisma.roles.findMany({
      where: {
        id: {
          in: roles,
        },
      },
      select: {
        id: true,
      },
    });

    await prisma.usersRoles.createMany({
      data: rolesList.map((role) => ({
        userId,
        roleId: role.id,
      })),
      skipDuplicates: true,
    });

    await prisma.usersPermissions.createMany({
      data: permissionsList.map((permission) => ({
        userId,
        permissionId: permission.id,
      })),
      skipDuplicates: true,
    });

    return user;
  }
}
