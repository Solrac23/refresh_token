import type { FastifyReply, FastifyRequest } from "fastify";
import type { IUserRequestDTO } from "./create-user-dto";
import type { CreateUserUseCase } from "./create-user-use-case";

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
		} catch (err: unknown) {
			if (err instanceof Error) {
				return reply.code(400).send({ error: err.message });
			}
		}
	}
}
