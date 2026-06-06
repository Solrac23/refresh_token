import { UserRepository } from "@/repositories/user-repository";
import { SearchUserController } from "./search-user-controller";
import { SearchUserUseCase } from "./search-user-use-case";

const searchUserUseCase = new SearchUserUseCase(new UserRepository());
const searchUserController = new SearchUserController(searchUserUseCase);

export { searchUserController, searchUserUseCase };
