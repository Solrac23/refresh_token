import { RoleRepository } from "@/repositories/role-repository";
import { CreateRoleController } from "./create-role-controller";
import { CreateRoleUseCase } from "./create-role-use-case";

const createRoleUseCase = new CreateRoleUseCase(new RoleRepository());
const createRoleController = new CreateRoleController(createRoleUseCase);

export { createRoleController };
