import { BaseError } from "@/database/error/util/base-error";
import type { DatabaseStatusErrorType } from "@/database/error/enums/database-status-error";

export class DatabaseError extends BaseError<DatabaseStatusErrorType> {
	public constructor(code: DatabaseStatusErrorType, message: string, cause?: unknown) {
		super({ code, message, cause });
	}
}
