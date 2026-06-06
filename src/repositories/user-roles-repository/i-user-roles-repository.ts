export interface IUserRolesRepository {
	assignRoles(userId: string, roleIds: string[]): Promise<void>;
	findRolesByUserId(userId: string): Promise<string[]>;
}
