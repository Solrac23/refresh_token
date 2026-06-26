import type { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    await request.jwtVerify();
  } catch (err: unknown) {
    request.log.error(err);
    return reply.code(401).send({ error: (err as Error).message });
  }
}
