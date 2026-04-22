export interface IAuthenticateUserRequestDTO {
	username: string;
	email: string;
	password: string;
}

export interface IAuthenticateUserResponseDTO {
	token: string;
	refreshToken: {
		id: string;
		expiresIn: number;
		userId: string;
	};
}
