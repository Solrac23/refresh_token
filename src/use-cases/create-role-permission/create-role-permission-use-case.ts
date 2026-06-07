import type { IPermissionRepository } from "@/repositories/permission-repository";
import type {
  IRoleRepository,
  RoleWithPermissions,
} from "@/repositories/role-repository";
import type { CreateRolePermissionDTO } from "./create-role-permission-dto";

export class CreateRolePermissionUseCase {
  constructor(
    private roleRepository: IRoleRepository,
    private permissionRepository: IPermissionRepository,
  ) {}

  async execute({
    roleId,
    permissions,
  }: CreateRolePermissionDTO): Promise<RoleWithPermissions> {
    const role = await this.roleRepository.findByIdWithPermissions(roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    const permissionsList =
      await this.permissionRepository.findByIds(permissions);

    await this.roleRepository.assignPermissions(
      role.id,
      permissionsList.map((p) => p.id),
    );

    const updatedRole =
      await this.roleRepository.findByIdWithPermissions(roleId);

    if (!updatedRole) {
      throw new Error("Role not found");
    }

    return updatedRole;
  }
}
