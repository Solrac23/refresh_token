import type { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> {
	try {
		await request.jwtVerify();
	} catch (err: unknown) {
		return reply.status(401).send({ error: (err as Error).message });
	}
}
