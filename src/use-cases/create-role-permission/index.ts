import { CreateRolePermissionController } from "./create-role-permission-controller";
import { CreateRolePermissionUseCase } from "./create-role-permission-use-case";

import { PermissionRepository } from "@/repositories/permission-repository";
import { RoleRepository } from "@/repositories/role-repository";

const createRolePermissionUseCase = new CreateRolePermissionUseCase(
  new RoleRepository(),
  new PermissionRepository(),
);
const createRolePermissionController = new CreateRolePermissionController(
  createRolePermissionUseCase,
);

export { createRolePermissionController };
