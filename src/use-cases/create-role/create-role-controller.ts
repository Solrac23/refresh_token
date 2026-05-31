import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateRoleUseCase } from "./create-role-use-case";
import type { CreateRoleDTO } from "./create-role-dto";

export class CreateRoleController {
  constructor(private createRoleUseCase: CreateRoleUseCase) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, description } = request.body as Pick<
        CreateRoleDTO,
        "name" | "description"
      >;

      const result = await this.createRoleUseCase.execute({
        name,
        description,
      });

      return reply.code(201).send(result);
    } catch (err: unknown) {
      return reply.code(400).send({ error: (err as Error).message });
    }
  }
}
