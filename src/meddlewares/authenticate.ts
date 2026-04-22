import type { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
): Promise<void> {
	try {
		await request.jwtVerify();
	} catch (err: unknown) {
		reply.status(401).send({ message: (err as Error).message });
	}
}
