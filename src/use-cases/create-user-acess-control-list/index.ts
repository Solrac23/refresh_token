import { PermissionRepository } from "@/repositories/permission-repository";
import { RoleRepository } from "@/repositories/role-repository";
import { UserPermissionsRepository } from "@/repositories/user-permissions-repository";
import { UserRepository } from "@/repositories/user-repository";
import { UserRolesRepository } from "@/repositories/user-roles-repository";
import { CreateUserAcessControlListController } from "./create-user-acess-control-list-controller";
import { CreateUserAcessControlListUseCase } from "./create-user-acess-control-list-use-case";

const createUserACLUseCase = new CreateUserAcessControlListUseCase(
	new UserRepository(),
	new PermissionRepository(),
	new RoleRepository(),
	new UserRolesRepository(),
	new UserPermissionsRepository()
);
const createUserACLController = new CreateUserAcessControlListController(
	createUserACLUseCase
);

export { createUserACLController };
