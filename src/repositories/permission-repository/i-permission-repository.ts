import type { Permissions } from "@/database/generated/prisma/client";

export interface IPermissionRepository {
	findByName(name: string): Promise<Permissions | null>;
	findByIds(ids: string[]): Promise<Pick<Permissions, "id">[]>;
	create(
		data: Pick<Permissions, "name" | "description">
	): Promise<Pick<Permissions, "id" | "name" | "description">>;
}
