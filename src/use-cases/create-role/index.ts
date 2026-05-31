import { CreateRoleController } from "./create-role-controller";
import { CreateRoleUseCase } from "./create-role-use-case";

const createRoleUseCase = new CreateRoleUseCase();
const createRoleController = new CreateRoleController(createRoleUseCase);

export { createRoleController };
