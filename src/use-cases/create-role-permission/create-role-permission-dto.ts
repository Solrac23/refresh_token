export interface CreateRolePermissionDTO {
  roleId: string;
  permissions: string[];
}

export interface CreateRolePermissionResponse {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
