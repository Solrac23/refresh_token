import type { Permissions, Roles } from "@/database/generated/prisma/client";

export interface RoleWithPermissions {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  permissionsRoles: {
    permission: Permissions;
  }[];
}

export interface IRoleRepository {
  findByName(name: string): Promise<Roles | null>;
  findByIds(ids: string[]): Promise<Pick<Roles, "id">[]>;
  findByIdWithPermissions(id: string): Promise<RoleWithPermissions | null>;
  create(
    data: Pick<Roles, "name" | "description">,
  ): Promise<Pick<Roles, "id" | "name" | "description">>;
  assignPermissions(roleId: string, permissionIds: string[]): Promise<void>;
}
