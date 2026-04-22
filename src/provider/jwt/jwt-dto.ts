export interface IJwtPayload {
	id: string;
	username: string;
	email: string;
}

export interface IJwtProvider {
	signToken(payload: IJwtPayload): Promise<string>;
}
