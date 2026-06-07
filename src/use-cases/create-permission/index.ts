import { PermissionRepository } from "@/repositories/permission-repository";
import { CreatepermissionController } from "./create-permission-controller";
import { CreatePermissionUseCase } from "./create-permission-use-case";

const createPermissionUseCase = new CreatePermissionUseCase(
  new PermissionRepository(),
);
const createPermissionController = new CreatepermissionController(
  createPermissionUseCase,
);

export { createPermissionController };
