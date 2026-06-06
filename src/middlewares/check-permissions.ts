import { UserPermissionsRepository } from "@/repositories/user-permissions-repository";
import type { FastifyReply, FastifyRequest } from "fastify";

export function checkPermissions(permissions: string[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { id: userId } = request.user;

		const userPermissionsRepository = new UserPermissionsRepository();
		const userPermissions =
			await userPermissionsRepository.findPermissionsByUserId(userId);

		const hasPermission = userPermissions.some(p => permissions.includes(p));

		if (!hasPermission) {
			return reply.code(403).send({ message: "Permission denied" });
		}
	};
}
