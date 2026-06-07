import type { IPermissionRepository } from "@/repositories/permission-repository";
import type { CreatePermissionDTO } from "./create-permission-dto";

export class CreatePermissionUseCase {
  constructor(private repository: IPermissionRepository) {}

  public async execute({
    name,
    description,
  }: CreatePermissionDTO): Promise<CreatePermissionDTO> {
    const permissionAlreadyExists = await this.repository.findByName(name);

    if (permissionAlreadyExists) throw new Error("Permission already exists");

    const permission = await this.repository.create({ name, description });

    return permission;
  }
}
