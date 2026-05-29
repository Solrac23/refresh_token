import type { FastifyReply, FastifyRequest } from "fastify";
import type { SearchUserUseCase } from "./search-user-use-case";
import type { SearchUserDTO } from "./search-user-dto";

export class SearchUserController {
  constructor(private searchUserUseCase: SearchUserUseCase) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<SearchUserDTO> {
    const { id } = request.params as Pick<SearchUserDTO, "id">;
    try {
      const user = await this.searchUserUseCase.execute(id);

      return reply.code(200).send(user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return reply.code(400).send({ error: err.message });
      }
      return reply.code(500).send({ error: err });
    }
  }
}
