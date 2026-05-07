import { prisma } from "@/database/lib/prisma";
import type { Encryption } from "../util/encryption";
import type { IUserRequestDTO, IUserResponseDTO } from "./create-user-dto";

export class CreateUserUseCase {
	constructor(private encryption: Encryption) {}

	public async execute({
		name,
		username,
		email,
		password,
	}: IUserRequestDTO): Promise<IUserResponseDTO | undefined> {
		const userAlreadyExists = await prisma.user.findFirst({
			where: {
				OR: [{ username }, { email }],
			},
		});

		if (userAlreadyExists) {
			throw new Error("User already exists");
		}

		const hashPassword = await this.encryption.hash(password);

		const user = await prisma.user.create({
			data: {
				name,
				username,
				email,
				password: hashPassword,
			},
			select: {
				id: true,
				name: true,
				username: true,
				email: true,
			},
		});

		return { user };
	}
}
