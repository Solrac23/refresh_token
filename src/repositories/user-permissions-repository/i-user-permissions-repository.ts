export interface IUserPermissionsRepository {
  assignPermissions(userId: string, permissionIds: string[]): Promise<void>;
  findPermissionsByUserId(userId: string): Promise<string[]>;
}
