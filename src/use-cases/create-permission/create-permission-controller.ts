import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreatePermissionUseCase } from "./create-permission-use-case";
import type { CreatePermissionDTO } from "./create-permission-dto";

export class CreatepermissionController {
  constructor(private createPermissionUseCase: CreatePermissionUseCase) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, description } = request.body as Pick<
        CreatePermissionDTO,
        "name" | "description"
      >;

      const result = await this.createPermissionUseCase.execute({
        name,
        description,
      });

      return reply.code(201).send(result);
    } catch (err: unknown) {
      return reply.code(400).send({ error: (err as Error).message });
    }
  }
}
