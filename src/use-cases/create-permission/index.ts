import { CreatepermissionController } from "./create-permission-controller";
import { CreatePermissionUseCase } from "./create-permission-use-case";

const createPermissionUseCase = new CreatePermissionUseCase();
const createPermissionController = new CreatepermissionController(
  createPermissionUseCase,
);

export { createPermissionController };
