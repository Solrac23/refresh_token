import type { IUserRepository } from "@/repositories/user-repository/i-user-repository";
import type { SearchUserDTO } from "./search-user-dto";

export class SearchUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	public async execute(id: string): Promise<SearchUserDTO> {
		const user = await this.userRepository.findByIdWithoutRelations(id);

		if (!user || user === null) {
			throw new Error("User not found");
		}

		return user;
	}
}
