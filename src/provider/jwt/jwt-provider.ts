import type { FastifyInstance } from "fastify";
import type { IJwtPayload, IJwtProvider } from "./jwt-dto";

export class JwtProvider implements IJwtProvider {
	constructor(private readonly app: FastifyInstance) {}

	public async signToken(payload: IJwtPayload): Promise<string> {
		return this.app.jwt.sign(payload);
	}
}
