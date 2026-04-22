import type { FastifyReply, FastifyRequest } from "fastify";
import type {
	RefreshTokenUserRequestDTO,
	RefreshTokenUserResponseDTO,
} from "./refresh-token-dto";
import type { RefreshTokenUserUseCase } from "./refresh-token-user-use-case";

export class RefreshTokenUserController {
	constructor(
		private readonly refreshTokenUserUseCase: RefreshTokenUserUseCase
	) {}

	public async handle(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<RefreshTokenUserResponseDTO> {
		const { refresh_token } = request.body as RefreshTokenUserRequestDTO;

		try {
			const token = await this.refreshTokenUserUseCase.execute(refresh_token);
			return reply.status(201).send(token);
		} catch (err: unknown) {
			return reply.status(401).send((err as Error).message);
		}
	}
}
