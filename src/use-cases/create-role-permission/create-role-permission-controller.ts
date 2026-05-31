import type { CreateRolePermissionUseCase } from "./create-role-permission-use-case";
import type { CreateRolePermissionDTO } from "./create-role-permission-dto";
import type { FastifyReply, FastifyRequest } from "fastify";

export class CreateRolePermissionController {
  constructor(
    private createRolePermissionUseCase: CreateRolePermissionUseCase,
  ) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { roleId } = request.params as CreateRolePermissionDTO;
    const { permissions } = request.body as CreateRolePermissionDTO;
    try {
      const createRolePermissions =
        await this.createRolePermissionUseCase.execute({ roleId, permissions });

      return reply.code(201).send(createRolePermissions);
    } catch (err: unknown) {
      return reply.code(404).send({ error: (err as Error).message });
    }
  }
}
