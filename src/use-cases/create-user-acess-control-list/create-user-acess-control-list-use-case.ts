import type { IPermissionRepository } from "@/repositories/permission-repository";
import type { IRoleRepository } from "@/repositories/role-repository";
import type { IUserPermissionsRepository } from "@/repositories/user-permissions-repository";
import type { IUserRepository } from "@/repositories/user-repository";
import type { IUserRolesRepository } from "@/repositories/user-roles-repository";
import type {
	CreateUserAcessControlListDTO,
	CreateUserAcessControlListResponseDTO,
} from "./create-user-acess-control-list-dto";

export class CreateUserAcessControlListUseCase {
	constructor(
		private repository: IUserRepository,
		private permissionRepository: IPermissionRepository,
		private roleRepository: IRoleRepository,
		private userRolesRepository: IUserRolesRepository,
		private userPermissionsRepository: IUserPermissionsRepository
	) {}

	public async execute({
		userId,
		roles,
		permissions,
	}: CreateUserAcessControlListDTO): Promise<CreateUserAcessControlListResponseDTO | null> {
		const user = await this.repository.findUserById(userId);

		if (!user) {
			throw new Error("User not found");
		}

		const permissionsList =
			await this.permissionRepository.findByIds(permissions);
		const rolesList = await this.roleRepository.findByIds(roles);

		await this.userRolesRepository.assignRoles(
			userId,
			rolesList.map(r => r.id)
		);

		await this.userPermissionsRepository.assignPermissions(
			userId,
			permissionsList.map(p => p.id)
		);

		const updatedUser = await this.repository.findUserById(userId);

		if (!updatedUser) {
			return null;
		}

		return updatedUser;
	}
}
