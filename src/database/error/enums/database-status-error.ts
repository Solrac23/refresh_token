enum DatabaseStatusError {
	DATABASE_URL_NOT_DEFINED,
	DATABASE_CONNECTION_ERROR,
}

export type DatabaseStatusErrorType = keyof typeof DatabaseStatusError;
