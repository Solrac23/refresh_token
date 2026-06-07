import type { IRoleRepository } from "@/repositories/role-repository";
import type { CreateRoleDTO } from "./create-role-dto";

export class CreateRoleUseCase {
  constructor(private repository: IRoleRepository) {}

  public async execute({
    name,
    description,
  }: CreateRoleDTO): Promise<CreateRoleDTO> {
    const roleAlreadyExists = await this.repository.findByName(name);

    if (roleAlreadyExists) throw new Error("Role already exists");

    const role = await this.repository.create({ name, description });

    return role;
  }
}
