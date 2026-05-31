import { CreateUserAcessControlListUseCase } from "./create-user-acess-control-list-use-case";
import { CreateUserAcessControlListController } from "./create-user-acess-control-list-controller";
import { UserRepository } from "@/repositories/user-repository";

const createUserACLUseCase = new CreateUserAcessControlListUseCase(
  new UserRepository(),
);
const createUserACLController = new CreateUserAcessControlListController(
  createUserACLUseCase,
);

export { createUserACLController };
