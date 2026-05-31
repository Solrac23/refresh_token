import { CreateRolePermissionController } from "./create-role-permission-controller";
import { CreateRolePermissionUseCase } from "./create-role-permission-use-case";

const createRolePermissionUseCase = new CreateRolePermissionUseCase();
const createRolePermissionController = new CreateRolePermissionController(
  createRolePermissionUseCase,
);

export { createRolePermissionController };
