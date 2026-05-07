import type {
	RefreshTokenUserRequestDTO,
	RefreshTokenUserResponseDTO,
} from "@/use-cases/refresh-token-user/refresh-token-dto";
import type { RefreshTokenUserUseCase } from "@/use-cases/refresh-token-user/refresh-token-user-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

export class RefreshTokenUserController {
	constructor(private refreshTokenUserUseCase: RefreshTokenUserUseCase) {}

	public async handle(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<RefreshTokenUserResponseDTO> {
		const { refresh_token } = request.body as RefreshTokenUserRequestDTO;

		try {
			const token = await this.refreshTokenUserUseCase.execute(refresh_token);
			return reply.code(201).send(token);
		} catch (err: unknown) {
			if (err instanceof Error) {
				return reply.code(400).send({ error: err.message });
			}
			return reply.code(500).send({ error: err });
		}
	}
}
