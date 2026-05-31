import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateUserAcessControlListUseCase } from "./create-user-acess-control-list-use-case";
import type { CreateUserAcessControlListDTO } from "./create-user-acess-control-list-dto";

export class CreateUserAcessControlListController {
  constructor(
    private createUserACLUseCase: CreateUserAcessControlListUseCase,
  ) {}

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { roles, permissions } =
      request.body as CreateUserAcessControlListDTO;
    const { id } = request.user;

    try {
      const result = await this.createUserACLUseCase.execute({
        userId: id,
        roles,
        permissions,
      });
      return reply.code(201).send(result);
    } catch (err: unknown) {
      return reply.code(400).send({ error: (err as Error).message });
    }
  }
}
