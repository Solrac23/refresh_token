import type { FastifyReply, FastifyRequest } from "fastify";
import type { IAuthenticateUserRequestDTO } from "./authenticate-user-dto";
import type { AuthenticateUserUseCase } from "./authenticate-user-use-case";

export class AuthenticateUserController {
	constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

	public async handle(request: FastifyRequest, reply: FastifyReply) {
		const { username, email, password } =
			request.body as IAuthenticateUserRequestDTO;

		try {
			const token = await this.authenticateUserUseCase.execute({
				username,
				email,
				password,
			});

			return reply.status(201).send(token);
		} catch (err: unknown) {
			if (err instanceof Error) {
				return reply.status(401).send({ error: err.message });
			}
		}
	}
}
