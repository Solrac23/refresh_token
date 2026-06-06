import { UserRolesRepository } from "@/repositories/user-roles-repository";
import type { FastifyReply, FastifyRequest } from "fastify";

export function checkRoles(roles: string[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { id: userId } = request.user;

		const userRolesRepository = new UserRolesRepository();
		const userRoles = await userRolesRepository.findRolesByUserId(userId);

		const hasRole = userRoles.some(r => roles.includes(r));

		if (!hasRole) {
			return reply.code(403).send({ message: "Role denied" });
		}
	};
}
