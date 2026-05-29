import { SearchUserUseCase } from "./search-user-use-case";
import { SearchUserController } from "./search-user-controller";

const searchUserUseCase = new SearchUserUseCase();
const searchUserController = new SearchUserController(searchUserUseCase);

export { searchUserUseCase, searchUserController };
