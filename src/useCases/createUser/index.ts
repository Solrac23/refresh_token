import { CreateUserUseCase } from "./create-user-use-case";
import { Encryption } from "../util/encryption";
import { CreateUserController } from "./create-user-controller";

const createUserUseCase = new CreateUserUseCase(new Encryption());

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase };
