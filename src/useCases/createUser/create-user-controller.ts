import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateUserUseCase } from "./create-user-use-case";
import type { IUserRequestDTO } from "./create-user-dto";

export class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	public async handle(request: FastifyRequest, reply: FastifyReply) {
		const { name, username, email, password } = request.body as IUserRequestDTO;

		try {
			const result = await this.createUserUseCase.execute({
				name,
				username,
				email,
				password,
			});

			return reply.code(201).send(result);
		} catch (error) {
			return reply.code(400).send(error);
		}
	}
}
